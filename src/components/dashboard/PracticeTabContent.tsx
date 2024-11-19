import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, DollarSign, Stethoscope } from 'lucide-react';

const PracticeTabContent = () => {
  return (
    <div className="h-full w-full bg-gray-100">
      <Tabs defaultValue="demographics" className="h-full flex flex-col">
        {/* Tabs Container - Narrow Dark Background */}
        <div className="px-3 py-2">
          <TabsList className="w-full bg-[#1C2434] rounded-full p-1 flex justify-between gap-0.5">
            <TabsTrigger 
              value="demographics"
              className="rounded-full px-2 py-1 text-[10px] font-normal flex items-center justify-center gap-1
                text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                transition-all duration-200"
            >
              <Users className="w-2.5 h-2.5" />
              Demographics
            </TabsTrigger>
            <TabsTrigger 
              value="financials"
              className="rounded-full px-2 py-1 text-[10px] font-normal flex items-center justify-center gap-1
                text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                transition-all duration-200"
            >
              <DollarSign className="w-2.5 h-2.5" />
              Financials
            </TabsTrigger>
            <TabsTrigger 
              value="procedures"
              className="rounded-full px-2 py-1 text-[10px] font-normal flex items-center justify-center gap-1
                text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                transition-all duration-200"
            >
              <Stethoscope className="w-2.5 h-2.5" />
              Procedures
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content Area with Fixed Height and Scrolling */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="demographics" className="h-full m-0">
            <div className="h-full px-3 pb-3 overflow-y-auto">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Total Patients</div>
                  <div className="text-xl font-medium">2,547</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Active Patients</div>
                  <div className="text-xl font-medium">1,842</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">New This Month</div>
                  <div className="text-xl font-medium">128</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Growth Rate</div>
                  <div className="text-xl font-medium">+12.5%</div>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="bg-white rounded-lg p-3">
                <div className="text-[13px] text-gray-500 mb-2">Patient Growth</div>
                <div className="h-[140px] flex items-center justify-center text-[11px] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="h-full m-0">
            <div className="h-full px-3 pb-3 overflow-y-auto">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Revenue</div>
                  <div className="text-xl font-medium">$124.5k</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Expenses</div>
                  <div className="text-xl font-medium">$67.8k</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Net Profit</div>
                  <div className="text-xl font-medium">$56.7k</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-[13px] text-gray-500">Growth</div>
                  <div className="text-xl font-medium">+12.4%</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-white rounded-lg p-3">
                <div className="text-[13px] text-gray-500 mb-2">Financial Trends</div>
                <div className="h-[140px] flex items-center justify-center text-[11px] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="h-full m-0">
            <div className="h-full px-3 pb-3 overflow-y-auto">
              {/* Distribution Chart */}
              <div className="bg-white rounded-lg p-3 mb-3">
                <div className="text-[13px] text-gray-500 mb-2">Procedure Distribution</div>
                <div className="h-[140px] flex items-center justify-center text-[11px] text-gray-400">
                  Pie Chart
                </div>
              </div>

              {/* Recent Procedures List */}
              <div className="bg-white rounded-lg p-3">
                <div className="text-[13px] text-gray-500 mb-2">Recent Procedures</div>
                <div className="space-y-2">
                  {['Cleaning', 'Check-up', 'Filling', 'Root Canal'].map((proc, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded p-2">
                      <span className="text-[11px]">{proc}</span>
                      <span className="text-[10px] text-gray-500">Today</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PracticeTabContent;