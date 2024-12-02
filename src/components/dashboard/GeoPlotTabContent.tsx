import React from 'react';
import { motion } from 'framer-motion';

const GeoPlotTabContent: React.FC = () => {
  const isDesktop = window.innerWidth >= 768;
  
  // Use key to force new instance and prevent style cleanup issues
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden">
      <motion.div
        key="geoplot-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex flex-col"
      >
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          GeoPlot visualization coming soon
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(GeoPlotTabContent);
