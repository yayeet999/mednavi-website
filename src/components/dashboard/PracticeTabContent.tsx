import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, DollarSign, Stethoscope } from 'lucide-react';

const PracticeTabContent = () => {
  return (
    <div className="h-full w-full p-3 md:p-4">
      <Tabs defaultValue="demographics" className="h-full">
        {/* Tabs Container - Centered */}
        <div className="flex justify-center mb-4">
          <TabsList className="flex w-fit bg-[#1C2434] rounded-full p-1">
            <TabsTrigger 
              value="demographics"
              className="rounded-full px-3.5 py-1 text-[10px] md:text-[11px] font-normal flex items-center gap-1.5
                text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                transition-all duration-200"
            >
              <Users className="w-[11px] h-[11px]" />
              Demographics
            </TabsTrigger>
            <TabsTrigger 
              value="financials"
              className="rounded-full px-3.5 py-1 text-[10px] md:text-[11px] font-normal flex items-center gap-1.5
                text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                transition-all duration-200"
            >
              <DollarSign className="w-[11px] h-[11px]" />
              Financials
            </TabsTrigger>
            <TabsTrigger 
              value="procedures"
              className="rounded-full px-3.5 py-1 text-[10px] md:text-[11px] font-normal flex items-center gap-1.5
                text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434]
                transition-all duration-200"
            >
              <Stethoscope className="w-[11px] h-[11px]" />
              Procedures
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content Areas - Each with sample layout */}
        <div className="h-[calc(100%-48px)] overflow-y-auto">
          <TabsContent value="demographics" className="h-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-3">
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">Total Patients</div>
                <div className="text-sm font-medium">2,547</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">Active Patients</div>
                <div className="text-sm font-medium">1,842</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">New This Month</div>
                <div className="text-sm font-medium">128</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 md:p-3 h-[120px] md:h-[180px]">
              <div className="text-[11px] text-gray-500 mb-2">Patient Growth</div>
              {/* Chart placeholder */}
              <div className="h-full bg-white/50 rounded flex items-center justify-center text-[11px] text-gray-400">
                Chart Area
              </div>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="h-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">Revenue</div>
                <div className="text-sm font-medium">$124.5k</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">Expenses</div>
                <div className="text-sm font-medium">$67.8k</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">Net Profit</div>
                <div className="text-sm font-medium">$56.7k</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-3">
                <div className="text-[11px] text-gray-500">Growth</div>
                <div className="text-sm font-medium">+12.4%</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 md:p-3 h-[120px] md:h-[180px]">
              <div className="text-[11px] text-gray-500 mb-2">Financial Trends</div>
              {/* Chart placeholder */}
              <div className="h-full bg-white/50 rounded flex items-center justify-center text-[11px] text-gray-400">
                Chart Area
              </div>
            </div>
          </TabsContent>

          <TabsContent value="procedures" className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              <div className="bg-gray-50 rounded-lg p-2 md:p-3 h-[140px] md:h-[200px]">
                <div className="text-[11px] text-gray-500 mb-2">Procedure Distribution</div>
                {/* Chart placeholder */}
                <div className="h-full bg-white/50 rounded flex items-center justify-center text-[11px] text-gray-400">
                  Pie Chart
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 md:p-3 h-[140px] md:h-[200px]">
                <div className="text-[11px] text-gray-500 mb-2">Recent Procedures</div>
                <div className="space-y-2">
                  {['Cleaning', 'Check-up', 'Filling', 'Root Canal'].map((proc, i) => (
                    <div key={i} className="flex justify-between items-center bg-white/50 rounded p-1.5">
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