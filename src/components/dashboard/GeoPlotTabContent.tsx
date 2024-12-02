import React from 'react';
import { motion } from 'framer-motion';

const GeoPlotTabContent: React.FC = () => {
  const isDesktop = window.innerWidth >= 768;

  return (
    <div className="w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-lg w-full h-full p-4"
      >
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          GeoPlot visualization coming soon
        </div>
      </motion.div>
    </div>
  );
};

export default GeoPlotTabContent;
