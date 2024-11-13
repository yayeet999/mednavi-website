'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, BarChart2, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
}

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  defaultValue: number;
  isReverse?: boolean;
}

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

const CustomSlider = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step, 
  displayValue, 
  defaultValue,
  isReverse = false 
}: SliderProps) => {
  const handleChange = (newValue: number) => {
    if (isReverse) {
      onChange(newValue > defaultValue ? defaultValue : newValue);
    } else {
      onChange(newValue < defaultValue ? defaultValue : newValue);
    }
  };

  const getLockedStyle = () => {
    if (isReverse) {
      const percentage = (value / max) * 100;
      return `linear-gradient(to right, 
        rgba(37, 99, 235, 0.1) 0%,
        rgba(37, 99, 235, 0.1) ${percentage}%,
        rgba(229, 231, 235, 0.5) ${percentage}%,
        rgba(229, 231, 235, 0.5) ${(defaultValue / max) * 100}%,
        rgba(229, 231, 235, 0.1) ${(defaultValue / max) * 100}%,
        rgba(229, 231, 235, 0.1) 100%)`;
    } else {
      const percentage = (value / max) * 100;
      return `linear-gradient(to right, 
        rgba(229, 231, 235, 0.1) 0%,
        rgba(229, 231, 235, 0.1) ${(defaultValue / max) * 100}%,
        rgba(37, 99, 235, 0.5) ${(defaultValue / max) * 100}%,
        rgba(37, 99, 235, 0.5) ${percentage}%,
        rgba(229, 231, 235, 0.1) ${percentage}%,
        rgba(229, 231, 235, 0.1) 100%)`;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 text-lg">{label}</span>
        <span className="text-lg font-medium">{displayValue}</span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-200">
        <div className="absolute inset-0 rounded-full" style={{ background: getLockedStyle() }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          className="absolute h-4 w-4 top-1/2 -mt-2 -ml-2 bg-white rounded-full shadow border border-gray-300"
          style={{ left: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
};

const MiniDashboard = () => {
  const TOTAL_PATIENTS = 315;
  const [activePatients, setActivePatients] = useState(78);
  const [unscheduledPatients, setUnscheduledPatients] = useState(22);
  const [revenuePerPatient, setRevenuePerPatient] = useState(285);
  const [potentialRevenue, setPotentialRevenue] = useState(0);

  const StatCard = ({ title, value, trend }: StatCardProps) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <p className={`text-sm mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </p>
    </div>
  );

  useEffect(() => {
    // Calculate additional revenue from increased active patients
    const additionalActivePatients = (Math.max(0, activePatients - 78) / 100) * TOTAL_PATIENTS;
    const additionalActiveRevenue = additionalActivePatients * revenuePerPatient;

    // Calculate additional revenue from reduced unscheduled patients
    const currentActivePatients = (activePatients / 100) * TOTAL_PATIENTS;
    const improvedSchedulingPatients = (Math.max(0, 22 - unscheduledPatients) / 100) * currentActivePatients;
    const improvedSchedulingRevenue = improvedSchedulingPatients * revenuePerPatient;

    // Total potential additional revenue
    const totalPotential = Math.min(additionalActiveRevenue + improvedSchedulingRevenue, 50000);
    setPotentialRevenue(Math.round(totalPotential));
  }, [activePatients, unscheduledPatients, revenuePerPatient]);

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-50">
      <CardContent className="p-6">
        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-slate-900 p-1.5 rounded-xl shadow-md">
            <TabsTrigger 
              value="demographics"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-400 data-[state=active]:bg-gray-200 data-[state=active]:text-blue-900 transition-all duration-200 hover:text-gray-200"
            >
              <Users className="w-4 h-4" />
              <span>Demographics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="revenue"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-400 data-[state=active]:bg-gray-200 data-[state=active]:text-blue-900 transition-all duration-200 hover:text-gray-200"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Revenue</span>
            </TabsTrigger>
            <TabsTrigger 
              value="growth"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-400 data-[state=active]:bg-gray-200 data-[state=active]:text-blue-900 transition-all duration-200 hover:text-gray-200"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Growth Potential</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="demographics">
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <StatCard
                  title="Total Active Patients"
                  value="78%"
                  trend={5}
                />
                <StatCard
                  title="Unscheduled Active"
                  value="22%"
                  trend={-3}
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md h-64">
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
          </TabsContent>

          <TabsContent value="revenue">
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <StatCard
                  title="Avg Revenue/Patient"
                  value="$285"
                  trend={7}
                />
                <StatCard
                  title="Avg Profit/Patient"
                  value="$180"
                  trend={4}
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md h-64">
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
          </TabsContent>

          <TabsContent value="growth">
            <div>
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg">
                  Adjust the sliders below to see how improving key metrics could impact your monthly revenue
                </p>
              </div>

              <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="lg:w-2/5 mb-8 lg:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Potential', value: potentialRevenue },
                              { name: 'Remaining', value: 50000 - potentialRevenue }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                          >
                            <Cell fill="#2563eb" />
                            <Cell fill="#e5e7eb" />
                          </Pie>
                          <text
                            x="50%"
                            y="45%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#111827"
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              fontFamily: 'system-ui'
                            }}
                          >
                            ${potentialRevenue.toLocaleString()}
                          </text>
                          <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#6B7280"
                            style={{
                              fontSize: '13px',
                              fontFamily: 'system-ui'
                            }}
                          >
                            Potential
                          </text>
                          <text
                            x="50%"
                            y="70%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#6B7280"
                            style={{
                              fontSize: '13px',
                              fontFamily: 'system-ui'
                            }}
                          >
                            Monthly
                          </text>
                          <text
                            x="50%"
                            y="80%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#6B7280"
                            style={{
                              fontSize: '13px',
                              fontFamily: 'system-ui'
                            }}
                          >
                            Improvement
                          </text>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm font-semibold text-[#1e3a8a] text-center mt-4">
                      Potential improvements in revenue powered by mednavi's data-driven insights
                    </p>
                  </div>
                </div>

                <div className="lg:w-3/5">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-8">
                      <div className="relative">
                        <CustomSlider
                          label="Total Active Patients"
                          value={activePatients}
                          onChange={setActivePatients}
                          min={0}
                          max={100}
                          step={1}
                          displayValue={`${activePatients}%`}
                          defaultValue={78}
                        />
                        {activePatients > 78 && (
                          <p className="text-sm text-green-600 mt-1">
                            ↑ (+{(activePatients - 78).toFixed(1)}% increase)
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <CustomSlider
                          label="Unscheduled Active Patients"
                          value={unscheduledPatients}
                          onChange={setUnscheduledPatients}
                          min={0}
                          max={100}
                          step={1}
                          displayValue={`${unscheduledPatients}%`}
                          defaultValue={22}
                          isReverse={true}
                        />
                        {unscheduledPatients < 22 && (
                          <p className="text-sm text-green-600 mt-1">
                            ↓ ({(22 - unscheduledPatients).toFixed(1)}% fewer unscheduled)
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <CustomSlider
                          label="Average Revenue Per Patient"
                          value={revenuePerPatient}
                          onChange={setRevenuePerPatient}
                          min={0}
                          max={500}
                          step={5}
                          displayValue={`$${revenuePerPatient}`}
                          defaultValue={285}
                        />
                        {revenuePerPatient > 285 && (
                          <p className="text-sm text-green-600 mt-1">
                            ↑ (+${revenuePerPatient - 285} more per patient)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MiniDashboard;