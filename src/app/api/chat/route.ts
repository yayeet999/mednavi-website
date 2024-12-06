import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Expanded topic validation keywords with related terms and concepts
const validTopics = [
  // Core MedNavi terms
  'dental', 'dentist', 'practice', 'patient', 'revenue', 'analytics', 'mednavi',
  'appointment', 'metrics', 'dashboard', 'benchmark', 'kpi', 'performance',
  'scheduling', 'insurance', 'treatment', 'data', 'report', 'billing',
  
  // Related analytical terms
  'analysis', 'regional', 'trend', 'compare', 'tracking', 'monitor',
  'statistics', 'growth', 'improvement', 'optimization', 'efficiency',
  
  // Business terms
  'business', 'management', 'strategy', 'planning', 'goals', 'profit',
  'income', 'expenses', 'cost', 'roi', 'investment',
  
  // Practice operations
  'staff', 'team', 'schedule', 'booking', 'cancellation', 'no-show',
  'hygiene', 'procedure', 'treatment', 'service',
  
  // Data-related terms
  'visualization', 'chart', 'graph', 'report', 'insight', 'prediction',
  'forecast', 'measure', 'track', 'analyze'
];

// Improved query validation function
function isValidQuery(query: string): boolean {
  const lowercaseQuery = query.toLowerCase();
  
  // Direct topic match
  if (validTopics.some(topic => lowercaseQuery.includes(topic))) {
    return true;
  }
  
  // Check for analytical questions
  if (lowercaseQuery.startsWith('how') || 
      lowercaseQuery.startsWith('what') || 
      lowercaseQuery.startsWith('can') || 
      lowercaseQuery.startsWith('does') ||
      lowercaseQuery.includes('explain') ||
      lowercaseQuery.includes('tell me about')) {
    return true;
  }
  
  // Check for comparison questions
  if (lowercaseQuery.includes('compare') ||
      lowercaseQuery.includes('difference') ||
      lowercaseQuery.includes('versus') ||
      lowercaseQuery.includes('vs')) {
    return true;
  }
  
  return false;
}

const systemPrompt = `You are a friendly and helpful AI assistant for MedNavi, a dental practice analytics platform. 

PERSONALITY TRAITS:
- Be warm and welcoming in your responses
- Show enthusiasm for helping dental practices improve
- Recognize and engage with related topics, even if not explicitly mentioned
- Be understanding and helpful when users ask unclear questions

RESPONSE GUIDELINES:
1. Answer questions about MedNavi's features, dental analytics, and practice management
2. Interpret questions contextually - users may ask about features without mentioning MedNavi directly
3. For unclear questions, try to understand the dental practice context first
4. If a question is completely unrelated to dental practices or analytics, politely redirect:
   "I'd be happy to help you with questions about dental practice analytics and management. Could you please ask something related to these topics?"
5. Keep responses professional but friendly
6. Never provide medical advice or specific patient information

KNOWLEDGE BASE:
MedNavi Overview:
MedNavi is an advanced analytics platform for dental practices that provides personalized, data-driven business plans and real-time monitoring dashboards. It combines actionable insights, advanced benchmarking, and AI to offer consultation-level services at an affordable cost.

Core Features:
1. Personalized Business Plans
- Custom strategies based on practice-specific data and goals
- Continuous monitoring and dynamic plan adjustments
- Real-time progress tracking

2. Real-Time Data Monitoring
- Live dashboards for revenue, demographics, and KPIs
- Appointment trends and operational metrics
- Instant access to critical performance data

3. Regional Benchmarking
- Aggregated regional averages for key metrics
- Privacy-protected performance comparisons
- Filtered results by practice size, revenue, or location

4. AI-Driven Insights
- Natural language query processing
- Instant access to visualized trends
- Simplified data interaction via chatbot

5. Privacy and Security
- Full patient data anonymization
- Encrypted data handling
- Aggregated benchmarking for privacy
- Industry-standard security protocols

Key Metrics Tracked:
- Financial Performance (revenue, procedure data, growth trends)
- Patient Analytics (retention, demographics, acquisition)
- Appointment Metrics (no-shows, scheduling efficiency)
- Regional Trends (benchmarks, procedure volumes)

Use Cases:
- Performance benchmarking against regional averages
- Trend analysis and macro insights
- Goal-specific business planning
- Easy data querying via AI interface

User Benefits:
- Consultation-level insights at affordable pricing
- Real-time performance monitoring
- Data-driven decision making
- Streamlined analytics access

Guidelines:
- Provide very brief, direct responses about MedNavi's capabilities
- Keep responses professional and focused on dental practice management
- Do not provide specific patient information or HIPAA-protected data
- Focus on practical applications and benefits
- IMPORTANT: Your responses MUST be very brief and concise, limited to 120 tokens maximum (about 90 words). Provide direct, focused answers.`;

const limiter = rateLimit({
  interval: 5000, // 5 seconds
  uniqueTokenPerInterval: 500
});

export async function POST(req: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(req, 1, 'CACHE_TOKEN');
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait 5 seconds.' },
        { status: 429 }
      );
    }

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Input limit check (100 tokens ≈ 75 words ≈ 400 characters)
    if (lastMessage.content.length > 400) {
      return NextResponse.json(
        { error: 'Message too long. Please keep your message shorter.' },
        { status: 400 }
      );
    }

    // Check if query is on-topic
    if (!isValidQuery(lastMessage.content)) {
      return NextResponse.json({
        content: "I'd be happy to help you with questions about dental practice analytics and management. Could you please ask something related to these topics?"
      });
    }

    // Content moderation
    const moderationResponse = await openai.moderations.create({
      input: lastMessage.content,
    });

    if (moderationResponse.results[0].flagged) {
      return NextResponse.json({
        content: "I'd be happy to help you with questions about dental practice analytics and management. Could you please ask something related to these topics?"
      });
    }

    // Keep only last 5 messages
    const recentMessages = messages.slice(-5);

    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        { 
          role: "system", 
          content: systemPrompt + "\nIMPORTANT: If the user's question is not about dental practices or analytics, respond ONLY with the friendly redirection message." 
        },
        ...recentMessages
      ],
      temperature: 0.7, // Slightly increased for more natural responses
      max_tokens: 120,
      presence_penalty: 0.6,
      frequency_penalty: 0.2,
      user: req.headers.get('x-user-id') || 'anonymous',
    });

    // Ensure response is within limits (120 tokens ≈ 90 words ≈ 500 characters)
    const responseContent = response.choices[0]?.message?.content || '';
    if (responseContent.length > 500) {
      const truncatedContent = responseContent.slice(0, 500) + '...';
      return NextResponse.json({ content: truncatedContent });
    }

    return NextResponse.json({
      content: responseContent
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'There was an error processing your request' },
      { status: 500 }
    );
  }
} 