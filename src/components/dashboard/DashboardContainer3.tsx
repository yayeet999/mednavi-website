import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, Users } from 'lucide-react';

const DashboardContainer3 = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <Tabs defaultValue="regional" className="h-full flex flex-col [&>div]:bg-transparent">
        <div className="flex justify-center">
          <div className="bg-[#1E2433] rounded-[14px] w-full max-w-[320px] md:max-w-none md:min-w-[632px] h-[28px] md:h-[40px] flex items-center px-1.5 md:px-2 mx-1">
            <TabsList className="flex bg-transparent h-[24px] md:h-[36px] gap-1 md:gap-1.5 w-full">
              <TabsTrigger 
                value="regional" 
                className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
              >
                <MapPin className="w-2 h-2 md:w-4 md:h-4" />
                Regional
              </TabsTrigger>
              <TabsTrigger 
                value="geoplot" 
                className="w-[calc(50%-2px)] rounded-lg h-[20px] md:h-[31px] text-[8px] md:text-xs font-normal flex items-center justify-center gap-1 md:gap-2 text-gray-300 data-[state=active]:bg-white data-[state=active]:text-[#1C2434] md:data-[state=active]:shadow-sm hover:bg-white/10 hover:text-white data-[state=active]:hover:bg-white data-[state=active]:hover:text-[#1C2434] transition-all duration-200"
              >
                <Users className="w-2 h-2 md:w-4 md:h-4" />
                GeoPlot
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-[#103d68] mt-1 md:mt-2">
          <TabsContent value="regional" className="h-full m-0">
            {/* Regional content will go here */}
          </TabsContent>

          <TabsContent value="geoplot" className="h-full m-0">
            {/* GeoPlot content will go here */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardContainer3;
