import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';
import { COLORS } from '../data/categories';

export const renderChart = (dataObj: any) => {
  if (!dataObj.chartType) return null;
  const { chartType, chartData } = dataObj;

  switch (chartType) {
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie dataKey="value" data={chartData} innerRadius={50} outerRadius={80} paddingAngle={5}>
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    case 'line':
      const lineDataKey = Object.keys(chartData[0]).find(k => k !== 'month');
      return (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey={lineDataKey as string} 
              stroke="#2563eb" 
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    case 'bar':
      const barKeys = Object.keys(chartData[0]).filter(k => !['category', 'month', 'name'].includes(k));
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            {barKeys.map((keyName, i) => (
              <Bar key={i} dataKey={keyName} fill={COLORS[i % COLORS.length]} isAnimationActive={true} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
}; 