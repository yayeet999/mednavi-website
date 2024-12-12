'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Bot } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { categories } from './data/categories';
import { renderAIMessage, renderUserMessage } from './components/MessageComponents';
import { ConversationMessage } from './types/commandCenter.types';

const CONTAINER_HEIGHT = 'calc(100vh - 240px)';

const formatBulletPoints = (content: string): { leftColumn: string[], rightColumn: string[] } => {
  if (!content.includes('•')) return { leftColumn: [], rightColumn: [] };

  const bullets = content
    .split('\n')
    .filter(line => line.trim().startsWith('•'))
    .map(line => line.trim());

  const midPoint = Math.ceil(bullets.length / 2);
  
  return {
    leftColumn: bullets.slice(0, midPoint),
    rightColumn: bullets.slice(midPoint)
  };
};

const renderAnalysisReport = (category: string | null) => {
  if (!category) return null;

  const reports = {
    financial: {
      title: "Dental Practice Financial Performance Analysis",
      summary: "Comprehensive analysis of practice financial metrics, revenue streams, and growth opportunities.",
      sections: [
        {
          title: "Executive Summary",
          content: "The dental practice demonstrates strong financial performance with a 15.2% year-over-year revenue growth. Monthly revenue averages $125.8K, with consistent growth in high-value procedures and efficient insurance claim processing."
        },
        {
          title: "Revenue Analysis",
          content: "Primary revenue streams show healthy diversification:\n• Preventive Care: 35% of revenue\n• Restorative Procedures: 30%\n• Cosmetic Treatments: 25%\n• Specialty Services: 10%\n\nThe practice maintains an impressive 98% collection rate, significantly above the industry average of 94%."
        },
        {
          title: "Cost Management",
          content: "Operating expenses are well-controlled:\n• Staff Costs: 28% of revenue\n• Supplies: 12%\n• Equipment: 15%\n• Overhead: 20%\n\nCost per patient acquisition shows a 10% reduction from previous year."
        },
        {
          title: "Insurance and Claims",
          content: "Insurance claim efficiency metrics:\n• Average claim processing time: 2 days\n• Clean claim submission rate: 96%\n• Claim rejection rate: < 2%\n• Insurance AR days: 15 (industry best practice)"
        },
        {
          title: "Growth Opportunities",
          content: "Key areas for financial optimization:\n1. Expand cosmetic service offerings (projected 30% margin increase)\n2. Implement membership program for fee-for-service patients\n3. Optimize procedure mix for higher profitability\n4. Enhance automated billing processes"
        }
      ]
    },
    patients: {
      title: "Patient Engagement and Satisfaction Analysis",
      summary: "In-depth evaluation of patient metrics, satisfaction levels, and engagement strategies.",
      sections: [
        {
          title: "Executive Summary",
          content: "Patient satisfaction metrics show exceptional performance with a 93% satisfaction rate. Active patient base has grown by 8.3% year-over-year, with strong retention and referral rates."
        },
        {
          title: "Patient Demographics",
          content: "Patient population analysis:\n• Total Active Patients: 3,450\n• Age Distribution: 25-35 (30%), 36-50 (45%), 51+ (25%)\n• Insurance Type: PPO (60%), Fee-for-service (25%), Other (15%)\n• Average Patient Lifetime: 7.2 years"
        },
        {
          title: "Satisfaction Metrics",
          content: "Key satisfaction indicators:\n• Overall Satisfaction: 93%\n• Treatment Satisfaction: 95%\n• Staff Interaction: 97%\n• Scheduling Ease: 92%\n• Facility Rating: 94%"
        },
        {
          title: "Patient Engagement",
          content: "Engagement strategy effectiveness:\n• Appointment Reminder Response: 89%\n• Newsletter Open Rate: 45%\n• Patient Portal Usage: 78%\n• Review Response Rate: 65%\n• Social Media Engagement: 40%"
        },
        {
          title: "Retention Analysis",
          content: "Patient retention metrics:\n1. Annual Retention Rate: 85%\n2. Preventive Care Compliance: 82%\n3. Treatment Plan Acceptance: 75%\n4. Referral Rate: 45%"
        }
      ]
    },
    operations: {
      title: "Operational Efficiency and Workflow Analysis",
      summary: "Detailed assessment of practice operations, workflow optimization, and resource utilization.",
      sections: [
        {
          title: "Executive Summary",
          content: "Practice operations demonstrate strong efficiency metrics with 90% chair utilization and minimal patient wait times. Staff productivity and equipment utilization exceed industry benchmarks."
        },
        {
          title: "Resource Utilization",
          content: "Key utilization metrics:\n• Chair Utilization: 90%\n• Staff Productivity: 95%\n• Equipment Usage: 85%\n• Supply Management: 92% efficiency\n• Facility Space Usage: 88%"
        },
        {
          title: "Workflow Efficiency",
          content: "Operational workflow analysis:\n• Average Patient Wait Time: 8 minutes\n• Treatment Room Turnover: 12 minutes\n• Patient Check-in Time: 3 minutes\n• Procedure Scheduling Accuracy: 96%"
        },
        {
          title: "Staff Performance",
          content: "Staff efficiency indicators:\n• Provider Productivity: 95%\n• Support Staff Efficiency: 92%\n• Training Completion Rate: 100%\n• Cross-training Level: 85%"
        },
        {
          title: "Technology Integration",
          content: "System utilization metrics:\n1. Digital Records Adoption: 100%\n2. Automated Scheduling: 95%\n3. Digital Imaging Usage: 100%\n4. Practice Management Software: 90%"
        }
      ]
    },
    procedural: {
      title: "Procedural Analytics and Treatment Efficiency",
      summary: "Comprehensive analysis of procedure mix, treatment outcomes, and clinical efficiency.",
      sections: [
        {
          title: "Executive Summary",
          content: "Procedure analytics show optimal mix of preventive and restorative treatments, with high success rates and efficient delivery. Treatment acceptance rates exceed industry standards."
        },
        {
          title: "Procedure Mix Analysis",
          content: "Treatment distribution:\n• Preventive: 45%\n• Restorative: 30%\n• Cosmetic: 15%\n• Specialty: 10%\n\nAll categories show positive growth trends and high patient satisfaction."
        },
        {
          title: "Clinical Outcomes",
          content: "Success metrics by procedure type:\n• Restorative Procedures: 98%\n• Endodontic Treatments: 95%\n• Implant Success Rate: 97%\n• Periodontal Treatments: 94%"
        },
        {
          title: "Treatment Planning",
          content: "Planning effectiveness:\n• Treatment Acceptance Rate: 85%\n• Plan Completion Rate: 80%\n• Average Treatment Duration: -10% vs benchmark\n• Follow-up Compliance: 88%"
        },
        {
          title: "Quality Metrics",
          content: "Quality assurance measures:\n• Infection Control Compliance: 100%\n• Procedure Documentation: 98%\n• Patient Safety Incidents: 0\n• Clinical Guidelines Adherence: 100%"
        }
      ]
    }
  };

  const selectedReport = reports[category as keyof typeof reports];
  if (!selectedReport) return null;

  return (
    <div className="space-y-4 px-2" key={`report-container-${category}`}>
      <TypeAnimation
        sequence={[selectedReport.title]}
        wrapper="h2"
        speed={99}
        cursor={false}
        className="text-xl font-semibold text-gray-900"
      />
      
      <TypeAnimation
        sequence={[selectedReport.summary]}
        wrapper="p"
        speed={99}
        cursor={false}
        className="text-sm text-gray-600"
      />
      
      {selectedReport.sections.map((section, index) => {
        const hasBullets = section.content.includes('•');
        const { leftColumn, rightColumn } = hasBullets ? formatBulletPoints(section.content) : { leftColumn: [], rightColumn: [] };
        
        return (
          <div key={`${category}-section-${index}`} className="bg-white rounded-lg border border-gray-200 p-3">
            <TypeAnimation
              sequence={[section.title]}
              wrapper="h3"
              speed={99}
              cursor={false}
              className="text-lg font-medium text-gray-900 mb-2"
            />
            
            {hasBullets ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <TypeAnimation
                    sequence={[leftColumn.join('\n')]}
                    wrapper="div"
                    speed={99}
                    cursor={false}
                    className="text-sm text-gray-700 whitespace-pre-line"
                  />
                </div>
                <div className="space-y-1">
                  <TypeAnimation
                    sequence={[rightColumn.join('\n')]}
                    wrapper="div"
                    speed={99}
                    cursor={false}
                    className="text-sm text-gray-700 whitespace-pre-line"
                  />
                </div>
              </div>
            ) : (
              <TypeAnimation
                sequence={[section.content]}
                wrapper="div"
                speed={99}
                cursor={false}
                className="text-sm text-gray-700 whitespace-pre-line"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function CommandCenter() {
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = useCallback((catKey: string) => {
    const category = categories.find(c => c.key === catKey);
    if (!category) return;

    setActiveCategory(catKey);

    const userMsg: ConversationMessage = {
      role: 'user',
      content: category.userPrompt
    };

    const aiMsg: ConversationMessage = {
      role: 'ai',
      content: '',
      data: category.initialAIResponse
    };

    setConversation([userMsg, aiMsg]);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    if (!activeCategory) return;
    const category = categories.find(c => c.key === activeCategory);
    if (!category) return;

    const refinedResponse = category.refinedAIResponses?.[suggestion];
    if (!refinedResponse) {
      const aiMsg: ConversationMessage = { 
        role: 'ai',
        content: '',
        data: { 
          summary: "No further data for that suggestion.",
          chartType: null,
          chartData: [],
          metrics: [],
          insights: [],
          suggestions: []
        } 
      };
      setConversation(prev => [...prev, aiMsg]);
      return;
    }

    const aiMsg: ConversationMessage = {
      role: 'ai',
      content: '',
      data: refinedResponse
    };
    setConversation(prev => [...prev, aiMsg]);
  }, [activeCategory]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Panel - Chat Interface */}
        <div className="col-span-5">
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 h-[CONTAINER_HEIGHT]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center gap-2 p-4 border-b border-gray-200">
                <Bot className="w-5 h-5 text-blue-500" />
                <h2 className="font-medium">Practice Analytics</h2>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => handleCategoryClick(category.key)}
                    className={`flex flex-col items-start p-3 rounded-lg border transition-colors ${
                      activeCategory === category.key
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-gray-600">
                      {category.icon}
                      <span className="text-sm font-medium">{category.title}</span>
                    </div>
                    <span className="mt-1 text-xs text-gray-500">{category.description}</span>
                  </button>
                ))}
              </div>

              {/* Conversation */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversation.map((msg, idx) => (
                  <div key={idx}>
                    {msg.role === 'user' 
                      ? renderUserMessage(msg)
                      : renderAIMessage({ msg, onSuggestionClick: handleSuggestionClick })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Analysis Report */}
        <div className="col-span-7">
          <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 h-[CONTAINER_HEIGHT]">
            <div className="flex flex-col h-full">
              {/* Report Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {renderAnalysisReport(activeCategory)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 