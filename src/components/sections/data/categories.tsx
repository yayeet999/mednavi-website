import { Stethoscope, DollarSign, Settings, Smile } from 'lucide-react';
import { CategoryDefinition } from '../types/commandCenter.types';

export const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

export const categories: CategoryDefinition[] = [
  {
    key: 'procedural',
    label: 'Procedural Metrics',
    icon: <Stethoscope className="w-6 h-6 text-blue-600" aria-label="Procedural Metrics" />,
    userPrompt: "Show me procedural performance insights",
    initialAIResponse: {
      summary: "Your procedural metrics indicate high treatment success rates and a balanced distribution across preventive, restorative, and cosmetic procedures.",
      chartType: 'pie',
      chartData: [
        { name: 'Preventive', value: 45 },
        { name: 'Restorative', value: 30 },
        { name: 'Cosmetic', value: 15 },
        { name: 'Orthodontic', value: 10 }
      ],
      metrics: [
        { label: "Avg. Treatment Success", value: "94%", trend: "+2%", benchmark: "90%" },
        { label: "First-Time Fix", value: "91%", trend: "+3%", benchmark: "85%" },
        { label: "Patient Wait Time", value: "10 min", trend: "-5%", benchmark: "12 min" }
      ],
      insights: [
        "Preventive procedures form the bulk of treatments.",
        "Restorative treatments show above-average success rates.",
        "Cosmetic procedures present a growth opportunity."
      ],
      suggestions: [
        "Compare success rates over last quarter",
        "Focus on improving cosmetic uptake",
        "Analyze procedure-specific profit margins"
      ]
    },
    refinedAIResponses: {
      "Compare success rates over last quarter": {
        summary: "Compared to last quarter, success rates improved across all procedures, with cosmetic treatments showing the largest gain.",
        chartType: 'bar',
        chartData: [
          { category: 'Preventive', lastQ: 92, thisQ: 94 },
          { category: 'Restorative', lastQ: 88, thisQ: 90 },
          { category: 'Cosmetic', lastQ: 75, thisQ: 83 },
          { category: 'Orthodontic', lastQ: 80, thisQ: 85 }
        ],
        metrics: [
          { label: "Overall Success Increase", value: "+4%", trend: "+4%", benchmark: "Industry +2%" },
          { label: "Cosmetic Growth", value: "+8%", trend: "+8%", benchmark: "+5%" },
          { label: "Patient Satisfaction", value: "95%", trend: "+3%", benchmark: "92%" }
        ],
        insights: [
          "Cosmetic segment sees significant improvement.",
          "Preventive care remains consistently high-performing.",
          "Shorter patient wait times correlate with higher satisfaction."
        ],
        suggestions: [
          "Drill down into cosmetic factors",
          "Assess impact of staff training",
          "View seasonal trends"
        ]
      },
      "Focus on improving cosmetic uptake": {
        summary: "To boost cosmetic procedure uptake, consider promotional packages, personalized treatment plans, and timely follow-ups.",
        chartType: 'line',
        chartData: [
          { month: 'Jan', cosmetic: 40 },
          { month: 'Feb', cosmetic: 42 },
          { month: 'Mar', cosmetic: 45 },
          { month: 'Apr', cosmetic: 50 },
          { month: 'May', cosmetic: 55 }
        ],
        metrics: [
          { label: "Current Cosmetic Share", value: "15%", trend: "+5%", benchmark: "Avg 10%" },
          { label: "Potential Increase", value: "+10%", trend: "+10%", benchmark: "Goal 25%" },
          { label: "ROI Projection", value: "High", trend: "+", benchmark: "Baseline" }
        ],
        insights: [
          "Promotions during peak seasons drive interest.",
          "Educating patients on procedure benefits boosts acceptance.",
          "Loyalty programs increase repeat cosmetic treatments."
        ],
        suggestions: [
          "Explore patient feedback data",
          "Identify top-performing staff",
          "Check insurance coverage patterns"
        ]
      },
      "Analyze procedure-specific profit margins": {
        summary: "Profit margins are highest in restorative and cosmetic procedures. Adjusting pricing or promoting these services could improve profitability.",
        chartType: 'bar',
        chartData: [
          { category: 'Preventive', profit: 20 },
          { category: 'Restorative', profit: 35 },
          { category: 'Cosmetic', profit: 40 },
          { category: 'Orthodontic', profit: 25 }
        ],
        metrics: [
          { label: "Highest Margin", value: "Cosmetic", trend: "+10%", benchmark: "Restorative" },
          { label: "Revenue/Procedure", value: "$850 avg", trend: "+5%", benchmark: "$800" },
          { label: "Margin Stability", value: "Stable", trend: "0%", benchmark: "Baseline" }
        ],
        insights: [
          "Cosmetic procedures yield highest margins.",
          "Restorative also profitable; consider package deals.",
          "Preventive drives volume but offers lower margin."
        ],
        suggestions: [
          "Optimize pricing strategies",
          "Correlate margins with patient demographics",
          "Project long-term profit trends"
        ]
      }
    }
  },
  {
    key: 'financial',
    label: 'Financial Insights',
    icon: <DollarSign className="w-6 h-6 text-blue-600" aria-label="Financial Insights" />,
    userPrompt: "Show me financial performance insights",
    initialAIResponse: {
      summary: "Your financial metrics indicate steady revenue growth, improving insurance claim turnaround, and strong collection rates.",
      chartType: 'line',
      chartData: [
        { month: 'Jan', revenue: 200000 },
        { month: 'Feb', revenue: 210000 },
        { month: 'Mar', revenue: 220000 },
        { month: 'Apr', revenue: 230000 },
        { month: 'May', revenue: 245000 }
      ],
      metrics: [
        { label: "Monthly Revenue Growth", value: "+5%", trend: "+5%", benchmark: "+3%" },
        { label: "Collection Rate", value: "98%", trend: "+1%", benchmark: "95%" },
        { label: "Claim Processing Time", value: "2 days", trend: "-10%", benchmark: "3 days" }
      ],
      insights: [
        "Revenue growth outpacing benchmark.",
        "Collection efficiency is high.",
        "Insurance claims processed faster than industry average."
      ],
      suggestions: [
        "Break down revenue by service type",
        "Analyze overhead reduction",
        "Forecast next quarter revenue"
      ]
    },
    refinedAIResponses: {
      "Break down revenue by service type": {
        summary: "Restorative and cosmetic treatments drive the most revenue. Preventive adds volume but yields lower returns.",
        chartType: 'pie',
        chartData: [
          { name: 'Preventive', value: 25 },
          { name: 'Restorative', value: 35 },
          { name: 'Cosmetic', value: 30 },
          { name: 'Other', value: 10 }
        ],
        metrics: [
          { label: "Cosmetic Revenue Share", value: "30%", trend: "+5%", benchmark: "25%" },
          { label: "Restorative Share", value: "35%", trend: "+2%", benchmark: "30%" },
          { label: "Preventive Yield", value: "Low", trend: "0%", benchmark: "Baseline" }
        ],
        insights: [
          "Cosmetic and restorative are key profit drivers.",
          "Optimize preventive pricing for better margins.",
          "Consider focusing marketing on cosmetic services."
        ],
        suggestions: [
          "Check patient demographic segmentation",
          "Compare YOY growth in each category",
          "Identify cost-saving opportunities"
        ]
      }
    }
  },
  {
    key: 'operations',
    label: 'Operations & Efficiency',
    icon: <Settings className="w-6 h-6 text-blue-600" aria-label="Operations & Efficiency" />,
    userPrompt: "Show me operational efficiency insights",
    initialAIResponse: {
      summary: "Operations are streamlined, with efficient staff utilization, short patient wait times, and minimal equipment downtime.",
      chartType: 'bar',
      chartData: [
        { category: 'Staff Utilization', value: 90 },
        { category: 'Chair Utilization', value: 85 },
        { category: 'Equipment Uptime', value: 95 },
        { category: 'Wait Times', value: 10 }
      ],
      metrics: [
        { label: "Staff Utilization", value: "90%", trend: "+5%", benchmark: "85%" },
        { label: "Equipment Downtime", value: "2%", trend: "-1%", benchmark: "5%" },
        { label: "Avg Wait Time", value: "10 min", trend: "-2 min", benchmark: "12 min" }
      ],
      insights: [
        "High staff and chair utilization rates.",
        "Equipment downtime is minimal.",
        "Short wait times enhance patient satisfaction."
      ],
      suggestions: [
        "Optimize staff scheduling",
        "Analyze equipment maintenance logs",
        "Correlate utilization with patient satisfaction"
      ]
    },
    refinedAIResponses: {}
  },
  {
    key: 'patients',
    label: 'Patient Engagement',
    icon: <Smile className="w-6 h-6 text-blue-600" aria-label="Patient Engagement" />,
    userPrompt: "Show me patient engagement insights",
    initialAIResponse: {
      summary: "Patients show high satisfaction and strong follow-up compliance. Loyalty programs and preventive reminders boost revisits.",
      chartType: 'line',
      chartData: [
        { month: 'Jan', satisfaction: 88 },
        { month: 'Feb', satisfaction: 89 },
        { month: 'Mar', satisfaction: 91 },
        { month: 'Apr', satisfaction: 92 },
        { month: 'May', satisfaction: 93 }
      ],
      metrics: [
        { label: "Satisfaction Rate", value: "93%", trend: "+5%", benchmark: "85%" },
        { label: "Follow-up Compliance", value: "90%", trend: "+4%", benchmark: "80%" },
        { label: "Loyalty Program Uptake", value: "60%", trend: "+10%", benchmark: "50%" }
      ],
      insights: [
        "Steady improvement in patient satisfaction.",
        "Effective follow-ups increase revisit rates.",
        "Loyalty programs drive repeat appointments."
      ],
      suggestions: [
        "Drill into loyalty program demographics",
        "Compare satisfaction by treatment type",
        "Assess impact of follow-up reminders on revenue"
      ]
    },
    refinedAIResponses: {}
  }
]; 