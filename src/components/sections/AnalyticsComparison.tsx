'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp } from 'lucide-react';

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
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (isReverse) {
      onChange(Math.min(newValue, defaultValue));
    } else {
      onChange(Math.max(newValue, defaultValue));
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 text-lg">{label}</span>
        <span className="text-lg font-medium">{displayValue}</span>
      </div>
      <div className="relative h-2">
        <div 
          className="absolute w-full h-full rounded-full overflow-hidden"
          style={{
            background: isReverse
              ? `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(value/max)*100}%, rgb(37 99 235) ${(value/max)*100}%, rgb(37 99 235) ${(defaultValue/max)*100}%, #e5e7eb ${(defaultValue/max)*100}%, #e5e7eb 100%)`
              : `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(defaultValue/max)*100}%, rgb(37 99 235) ${(defaultValue/max)*100}%, rgb(37 99 235) ${(value/max)*100}%, #e5e7eb ${(value/max)*100}%, #e5e7eb 100%)`
          }}
        />
        <div
          className="absolute w-1 h-4 bg-blue-900 rounded-full top-1/2 -mt-2"
          style={{ left: `${(defaultValue/max)*100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute h-5 w-5 bg-white rounded-full shadow-md border border-gray-300 top-1/2 transform -translate-y-1/2"
          style={{ left: `calc(${(value/max)*100}% - 10px)` }}
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
    const additionalActivePatients = Math.max(0, activePatients - 78) / 100 * TOTAL_PATIENTS;
    const additionalActiveRevenue = additionalActivePatients * revenuePerPatient;

    const currentActivePatients = (activePatients / 100) * TOTAL_PATIENTS;
    const improvedSchedulingPatients = Math.max(0, 22 - unscheduledPatients) / 100 * currentActivePatients;
    const improvedSchedulingRevenue = improvedSchedulingPatients * revenuePerPatient;

    const totalPotential = Math.min(additionalActiveRevenue + improvedSchedulingRevenue, 50000);
    setPotentialRevenue(Math.round(totalPotential));
  }, [activePatients, unscheduledPatients, revenuePerPatient]);

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-50">
      <CardContent className="p-6">
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="flex w-full h-12 mb-6 bg-slate-900 p-1 rounded-xl overflow-hidden">
            <TabsTrigger 
              value="growth"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-400 rounded-lg transition-all duration-200
                data-[state=active]:bg-white data-[state=active]:text-blue-900 hover:text-gray-200
                lg:gap-2 lg:text-base sm:text-sm sm:gap-0"
            >
              <TrendingUp className="w-4 h-4 lg:block hidden" />
              <span>Growth Potential</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="growth">
            <div>
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg">
                  Adjust the sliders below to see how improving key metrics could impact your monthly revenue
                </p>
              </div>

              <div className="flex flex-col lg:flex-row lg:space-x-8 lg:items-stretch">
                <div className="lg:w-2/5 mb-8 lg:mb-0">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                    <div className="flex-grow flex items-center justify-center relative">
                      <ResponsiveContainer width="100%" height={300}>
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
                          >
                            <tspan
                              x="50%"
                              dy="-0.2em"
                              fontSize="18"
                              fill="#111827"
                            >
                              +
                            </tspan>
                            <tspan
                              x="50%"
                              dy="1.2em"
                              fontSize="24"
                              fontWeight="bold"
                              fill="#111827"
                            >
                              ${potentialRevenue.toLocaleString()}
                            </tspan>
                          </text>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-lg font-medium text-[#1e3a8a] mt-4 text-center">
                      Potential improvements in revenue powered by mednavi's data-driven insights
                    </p>
                  </div>
                </div>

                <div className="lg:w-3/5">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
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