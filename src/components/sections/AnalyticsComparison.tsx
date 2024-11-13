'use client'
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Users, DollarSign } from 'lucide-react';

const demographicsData = [
  { month: 'Jan', patients: 120, newPatients: 25 },
  { month: 'Feb', patients: 150, newPatients: 30 },
  { month: 'Mar', patients: 180, newPatients: 35 },
  { month: 'Apr', patients: 170, newPatients: 28 },
  { month: 'May', patients: 190, newPatients: 40 },
  { month: 'Jun', patients: 210, newPatients: 45 }
];

const revenueData = [
  { month: 'Jan', revenue: 45000, collections: 42000 },
  { month: 'Feb', revenue: 48000, collections: 45000 },
  { month: 'Mar', revenue: 52000, collections: 49000 },
  { month: 'Apr', revenue: 49000, collections: 47000 },
  { month: 'May', revenue: 55000, collections: 52000 },
  { month: 'Jun', revenue: 58000, collections: 55000 }
];

const MiniDashboard = () => {
  const [activeTab, setActiveTab] = useState('demographics');
  
  const StatCard = ({ title, value, trend }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <p className={`text-sm mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </p>
    </div>
  );

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-50">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs - Vertical on desktop, horizontal on mobile */}
          <Tabs
            defaultValue="demographics"
            orientation="vertical"
            className="lg:w-48 w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="lg:flex-col h-auto bg-white">
              <TabsTrigger
                value="demographics"
                className="w-full flex items-center gap-2 justify-start px-4"
              >
                <Users size={18} />
                <span className="hidden lg:inline">Demographics</span>
              </TabsTrigger>
              <TabsTrigger
                value="revenue"
                className="w-full flex items-center gap-2 justify-start px-4"
              >
                <DollarSign size={18} />
                <span className="hidden lg:inline">Revenue</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Content Area */}
          <div className="flex-1">
            {/* Demographics Content */}
            {activeTab === 'demographics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StatCard
                    title="Total Patients"
                    value="1,020"
                    trend={12}
                  />
                  <StatCard
                    title="New Patients"
                    value="203"
                    trend={8}
                  />
                </div>
                <div className="bg-white p-4 rounded-lg h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={demographicsData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="newPatients"
                        stroke="#16a34a"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Revenue Content */}
            {activeTab === 'revenue' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StatCard
                    title="Monthly Revenue"
                    value="$58,000"
                    trend={15}
                  />
                  <StatCard
                    title="Collections"
                    value="$55,000"
                    trend={10}
                  />
                </div>
                <div className="bg-white p-4 rounded-lg h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563eb"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="collections"
                        stroke="#16a34a"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniDashboard;