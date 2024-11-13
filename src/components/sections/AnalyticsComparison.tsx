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

const CustomSlider = ({ label, value, onChange, min, max, step, displayValue }: SliderProps) => (
  <div className="w-full mb-8">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-600 text-lg">{label}</span>
      <span className="text-lg font-medium">{displayValue}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

const MiniDashboard = () => {
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
    const TOTAL_PATIENTS = 1020;
    const MAX_POTENTIAL = 50000;

    // Calculate additional revenue from increased active patients
    const additionalActivePatients = (Math.max(0, activePatients - 78) / 100) * TOTAL_PATIENTS;
    const additionalActiveRevenue = additionalActivePatients * revenuePerPatient;

    // Calculate additional revenue from reduced unscheduled patients
    const currentActivePatients = (activePatients / 100) * TOTAL_PATIENTS;
    const improvedSchedulingPatients = (Math.max(0, 22 - unscheduledPatients) / 100) * currentActivePatients;
    const improvedSchedulingRevenue = improvedSchedulingPatients * revenuePerPatient;

    // Total potential additional revenue
    const totalPotential = Math.min(additionalActiveRevenue + improvedSchedulingRevenue, MAX_POTENTIAL);
    setPotentialRevenue(Math.round(totalPotential));
  }, [activePatients, unscheduledPatients, revenuePerPatient]);

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-50">
      <CardContent className="p-6">
        <Tabs defaultValue="demographics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="demographics">
              Demographics
            </TabsTrigger>
            <TabsTrigger value="revenue">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="growth">
              Growth Potential
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
          </TabsContent>

          <TabsContent value="growth">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg">
                  Adjust the sliders below to see how improving key metrics could impact your monthly revenue
                </p>
              </div>

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
                      y="50%"
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
                      y="65%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#6B7280"
                      style={{
                        fontSize: '14px',
                        fontFamily: 'system-ui'
                      }}
                    >
                      Potential Monthly
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-6">
                <CustomSlider
                  label="Total Active Patients"
                  value={activePatients}
                  onChange={setActivePatients}
                  min={0}
                  max={100}
                  step={1}
                  displayValue={`${activePatients}%`}
                />
                
                <CustomSlider
                  label="Unscheduled Active Patients"
                  value={unscheduledPatients}
                  onChange={setUnscheduledPatients}
                  min={0}
                  max={100}
                  step={1}
                  displayValue={`${unscheduledPatients}%`}
                />
                
                <CustomSlider
                  label="Average Revenue Per Patient"
                  value={revenuePerPatient}
                  onChange={setRevenuePerPatient}
                  min={0}
                  max={500}
                  step={5}
                  displayValue={`$${revenuePerPatient}`}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MiniDashboard;