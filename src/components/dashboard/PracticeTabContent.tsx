import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, DollarSign, Stethoscope } from 'lucide-react';

const PracticeTabContent = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Tabs defaultValue="demographics" className="h-full flex flex-col">
        {/* Tabs Container with Overflow Control */}
        <div className="overflow-hidden -mx-2">
          <div className="w-[calc(100%+16px)] bg-[#1C2434] px-2 h-[32px] rounded-lg flex items-center">
            <TabsList className="w-full bg-transparent flex justify-between gap-1 items-center h-[28px]">
              <TabsTrigger 
                value="demographics"
                className="flex-1 rounded-lg px-1 h-[24px] text-[9px] font-normal flex items-center justify-center gap-1
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                  transition-all duration-200"
              >
                <Users className="w-2.5 h-2.5" />
                Demographics
              </TabsTrigger>
              <TabsTrigger 
                value="financials"
                className="flex-1 rounded-lg px-1 h-[24px] text-[9px] font-normal flex items-center justify-center gap-1
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                  transition-all duration-200"
              >
                <DollarSign className="w-2.5 h-2.5" />
                Financials
              </TabsTrigger>
              <TabsTrigger 
                value="procedures"
                className="flex-1 rounded-lg px-1 h-[24px] text-[9px] font-normal flex items-center justify-center gap-1
                  text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                  transition-all duration-200"
              >
                <Stethoscope className="w-2.5 h-2.5" />
                Procedures
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-100 mt-2">
          <TabsContent value="demographics" className="h-full m-0">
            <div className="h-full p-2 overflow-y-auto">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Total Patients</div>
                  <div className="text-xs font-medium mt-0.5">2,547</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Active Patients</div>
                  <div className="text-xs font-medium mt-0.5">1,842</div>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="bg-white rounded-lg p-2 mt-2 h-[120px] shadow-sm">
                <div className="text-[9px] text-gray-500">Patient Growth</div>
                <div className="h-[90px] flex items-center justify-center text-[9px] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="h-full m-0">
            <div className="h-full p-2 overflow-y-auto">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Revenue</div>
                  <div className="text-xs font-medium mt-0.5">$124.5k</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Expenses</div>
                  <div className="text-xs font-medium mt-0.5">$67.8k</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Net Profit</div>
                  <div className="text-xs font-medium mt-0.5">$56.7k</div>
                </div>
                <div className="bg-white rounded-lg p-2 h-[48px] shadow-sm">
                  <div className="text-[9px] text-gray-500">Growth</div>
                  <div className="text-xs font-medium mt-0.5">+12.4%</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-white rounded-lg p-2 mt-2 h-[120px] shadow-sm">
                <div className="text-[9px] text-gray-500">Financial Trends</div>
                <div className="h-[90px] flex items-center justify-center text-[9px] text-gray-400">
                  Chart Area
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="h-full m-0">
            <div className="h-full p-2 overflow-y-auto">
              {/* Distribution Chart */}
              <div className="bg-white rounded-lg p-2 h-[120px] shadow-sm">
                <div className="text-[9px] text-gray-500">Procedure Distribution</div>
                <div className="h-[90px] flex items-center justify-center text-[9px] text-gray-400">
                  Pie Chart
                </div>
              </div>

              {/* Recent Procedures List */}
              <div className="bg-white rounded-lg p-2 mt-2 shadow-sm">
                <div className="text-[9px] text-gray-500 mb-1">Recent Procedures</div>
                <div className="space-y-1.5">
                  {['Cleaning', 'Check-up', 'Filling', 'Root Canal'].map((proc, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-1.5">
                      <span className="text-[9px]">{proc}</span>
                      <span className="text-[8px] text-gray-500">Today</span>
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
