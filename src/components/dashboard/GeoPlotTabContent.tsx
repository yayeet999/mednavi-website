import React from 'react';
import { motion } from 'framer-motion';

interface GeoPlotTabContentProps {
  selectedZip?: string | null;
}

const GeoPlotTabContent: React.FC<GeoPlotTabContentProps> = ({ selectedZip }) => {
  const isDesktop = window.innerWidth >= 768;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full h-full bg-white rounded-lg overflow-hidden"
    >
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          GeoPlot visualization coming soon
        </div>
      </div>
    </motion.div>
  );
};

export default GeoPlotTabContent;
