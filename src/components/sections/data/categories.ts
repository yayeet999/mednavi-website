import React from 'react';
import { BeakerIcon, CurrencyDollarIcon, CogIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { CategoryDefinition } from '../types/commandCenter.types';

export const categories: CategoryDefinition[] = [
  {
    key: 'procedural',
    title: 'Clinical Performance',
    description: 'Track procedure success rates and patient outcomes',
    icon: React.createElement(BeakerIcon, { className: "w-4 h-4" }),
    userPrompt: 'Show me clinical performance metrics',
    initialAIResponse: {
      summary: 'Clinical metrics show strong performance across all procedure types with high success rates.',
      metrics: [
        {
          label: 'Success Rate',
          value: '94%',
          trend: '+2%',
          benchmark: '90%'
        },
        {
          label: 'First-Time Fix',
          value: '91%',
          trend: '+3%',
          benchmark: '85%'
        },
        {
          label: 'Wait Time',
          value: '10 min',
          trend: '-2 min',
          benchmark: '12 min'
        }
      ],
      chartType: 'bar',
      chartData: [
        { name: 'Root Canals', value: 98 },
        { name: 'Implants', value: 96 },
        { name: 'Crowns', value: 99 },
        { name: 'Fillings', value: 97 }
      ],
      insights: [
        'High success rates across all procedures',
        'Wait times below industry average',
        'Strong first-time fix rate'
      ],
      suggestions: [
        'Maintain high success standards',
        'Continue staff training program',
        'Monitor patient satisfaction'
      ]
    },
    refinedAIResponses: {}
  },
  {
    key: 'financial',
    title: 'Financial Analytics',
    description: 'Monitor revenue and financial trends',
    icon: React.createElement(CurrencyDollarIcon, { className: "w-4 h-4" }),
    userPrompt: 'Show me financial performance metrics',
    initialAIResponse: {
      summary: 'Your financial metrics indicate steady revenue growth, improving insurance claim turnaround, and strong collection rates.',
      metrics: [
        {
          label: 'Monthly Growth',
          value: '+5%',
          trend: '+5%',
          benchmark: '+3%'
        },
        {
          label: 'Collection Rate',
          value: '98%',
          trend: '+1%',
          benchmark: '95%'
        },
        {
          label: 'Processing Time',
          value: '2 days',
          trend: '-10%',
          benchmark: '3 days'
        }
      ],
      chartType: 'line',
      chartData: [
        { name: 'Jan', value: 85 },
        { name: 'Feb', value: 89 },
        { name: 'Mar', value: 92 },
        { name: 'Apr', value: 95 },
        { name: 'May', value: 98 },
        { name: 'Jun', value: 100 }
      ],
      insights: [
        'Revenue growth outpacing benchmark.',
        'Collection efficiency is high.',
        'Insurance claims processed faster than industry average.'
      ],
      suggestions: [
        'Maintain collection efficiency',
        'Monitor claim processing',
        'Review growth trends'
      ]
    },
    refinedAIResponses: {}
  },
  {
    key: 'operations',
    title: 'Practice Operations',
    description: 'Track efficiency and resource usage',
    icon: React.createElement(CogIcon, { className: "w-4 h-4" }),
    userPrompt: 'Show me operational efficiency insights',
    initialAIResponse: {
      summary: 'Operations are streamlined, with efficient staff utilization, short patient wait times, and minimal equipment downtime.',
      metrics: [
        {
          label: 'Staff Utilization',
          value: '90%',
          trend: '+5%',
          benchmark: '85%'
        },
        {
          label: 'Equipment Downtime',
          value: '2%',
          trend: '-1%',
          benchmark: '5%'
        },
        {
          label: 'Avg Wait Time',
          value: '10 min',
          trend: '-2 min',
          benchmark: '12 min'
        }
      ],
      chartType: 'bar',
      chartData: [
        { name: 'Staff Utilization', value: 90 },
        { name: 'Chair Occupancy', value: 85 },
        { name: 'Schedule Adherence', value: 92 },
        { name: 'Equipment Uptime', value: 98 }
      ],
      insights: [
        'High staff and chair utilization rates',
        'Equipment downtime is minimal',
        'Short wait times enhance patient satisfaction'
      ],
      suggestions: [
        'Optimize staff scheduling',
        'Analyze equipment maintenance logs',
        'Correlate utilization with satisfaction'
      ]
    },
    refinedAIResponses: {}
  },
  {
    key: 'patients',
    title: 'Patient Analytics',
    description: 'Monitor satisfaction and retention',
    icon: React.createElement(UserGroupIcon, { className: "w-4 h-4" }),
    userPrompt: 'Show me patient satisfaction metrics',
    initialAIResponse: {
      summary: 'Patient satisfaction metrics show high overall satisfaction and strong retention rates.',
      metrics: [
        {
          label: 'Satisfaction',
          value: '4.8/5',
          trend: '+0.3',
          benchmark: '4.5/5'
        },
        {
          label: 'Retention',
          value: '95%',
          trend: '+2%',
          benchmark: '90%'
        },
        {
          label: 'Referrals',
          value: '+15%',
          trend: '+5%',
          benchmark: '+10%'
        }
      ],
      chartType: 'pie',
      chartData: [
        { name: 'Very Satisfied', value: 75 },
        { name: 'Satisfied', value: 20 },
        { name: 'Neutral', value: 4 },
        { name: 'Unsatisfied', value: 1 }
      ],
      insights: [
        'Patient satisfaction exceeds targets',
        'Strong retention rates maintained',
        'Referral program showing results'
      ],
      suggestions: [
        'Continue satisfaction surveys',
        'Enhance referral program',
        'Monitor feedback trends'
      ]
    },
    refinedAIResponses: {}
  }
]; 