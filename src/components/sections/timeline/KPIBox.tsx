import React from 'react';

export const renderKPIBox = (index: number) => (
  <div className="grid grid-cols-2 gap-4 p-6 h-full">
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Revenue</div>
      <div className="text-xl font-semibold text-gray-800">${(Math.random() * 100000).toFixed(0)}k</div>
      <div className="text-xs text-green-500">+{(Math.random() * 20).toFixed(1)}%</div>
    </div>
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Users</div>
      <div className="text-xl font-semibold text-gray-800">{(Math.random() * 1000).toFixed(0)}k</div>
      <div className="text-xs text-blue-500">+{(Math.random() * 15).toFixed(1)}%</div>
    </div>
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Conversion</div>
      <div className="text-xl font-semibold text-gray-800">{(Math.random() * 100).toFixed(1)}%</div>
      <div className="text-xs text-green-500">+{(Math.random() * 10).toFixed(1)}%</div>
    </div>
    <div className="space-y-2">
      <div className="text-sm text-gray-500">Growth</div>
      <div className="text-xl font-semibold text-gray-800">{(Math.random() * 50).toFixed(1)}%</div>
      <div className="text-xs text-blue-500">+{(Math.random() * 12).toFixed(1)}%</div>
    </div>
  </div>
);
