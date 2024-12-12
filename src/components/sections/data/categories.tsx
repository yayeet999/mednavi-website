import { DollarSign, Settings, Users } from 'lucide-react';
import { TbDental } from 'react-icons/tb';
import { CategoryDefinition } from '../types/commandCenter.types';

export const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];

export const categories: CategoryDefinition[] = [
  {
    key: 'procedural',
    title: 'Procedural Metrics',
    description: 'Track and analyze dental procedures',
    icon: <TbDental className="w-6 h-6 text-blue-600" aria-label="Procedural Metrics" />,
    userPrompt: "Show me procedural performance insights",
    initialAIResponse: {
      summary: "Your procedural metrics indicate high treatment success rates and a balanced distribution across preventive, restorative, and cosmetic procedures!",
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
      ]
    }
  },
  {
    key: 'financial',
    title: 'Financial Insights',
    description: 'Monitor revenue and financial metrics',
    icon: <DollarSign className="w-6 h-6 text-blue-600" aria-label="Financial Insights" />,
    userPrompt: "Show me financial performance insights",
    initialAIResponse: {
      summary: "Your financial metrics indicate steady revenue growth, improving insurance claim turnaround, and strong collection rates!",
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
      ]
    }
  },
  {
    key: 'operations',
    title: 'Operations & Efficiency',
    description: 'Monitor operational efficiency',
    icon: <Settings className="w-6 h-6 text-blue-600" aria-label="Operations & Efficiency" />,
    userPrompt: "Show me operational efficiency insights",
    initialAIResponse: {
      summary: "Operations are streamlined, with efficient staff utilization, short patient wait times, and minimal equipment downtime!",
      chartType: 'line',
      chartData: [
        { month: 'Jan', ratio: 12, demand: 'high' },
        { month: 'Feb', ratio: 10, demand: 'medium' },
        { month: 'Mar', ratio: 8, demand: 'low' },
        { month: 'Apr', ratio: 15, demand: 'high' },
        { month: 'May', ratio: 14, demand: 'high' },
        { month: 'Jun', ratio: 9, demand: 'medium' }
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
      ]
    }
  },
  {
    key: 'patients',
    title: 'Patient Population',
    description: 'Analyze your patient demographics',
    icon: <Users className="w-6 h-6 text-blue-600" aria-label="Patient Population" />,
    userPrompt: "Analyze my practice's patient population",
    initialAIResponse: {
      summary: "An analysis of your practice's patient population can unlock valuable insights such as popular procedures per age group and potentially underrepresented demographics!",
      chartType: 'bar',
      chartData: [
        { 
          month: 'Jan',
          maleAdult: 25,
          maleChild: 10,
          femaleAdult: 30,
          femaleChild: 12
        },
        { 
          month: 'Feb',
          maleAdult: 28,
          maleChild: 15,
          femaleAdult: 32,
          femaleChild: 14
        },
        { 
          month: 'Mar',
          maleAdult: 30,
          maleChild: 12,
          femaleAdult: 35,
          femaleChild: 15
        },
        { 
          month: 'Apr',
          maleAdult: 32,
          maleChild: 14,
          femaleAdult: 38,
          femaleChild: 16
        },
        { 
          month: 'May',
          maleAdult: 35,
          maleChild: 16,
          femaleAdult: 40,
          femaleChild: 18
        },
        { 
          month: 'Jun',
          maleAdult: 38,
          maleChild: 18,
          femaleAdult: 42,
          femaleChild: 20
        }
      ],
      metrics: [
        { label: "Age Group 25-34", value: "35%", trend: "+8%", benchmark: "30%" },
        { label: "New Patients", value: "42/mo", trend: "+12%", benchmark: "35/mo" },
        { label: "Patient Retention", value: "88%", trend: "+3%", benchmark: "82%" }
      ],
      insights: [
        "Millennials form the largest patient segment.",
        "Senior demographic shows growth potential.",
        "Family units drive recurring visits."
      ]
    }
  }
]; 