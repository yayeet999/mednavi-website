import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ReferenceLine
} from 'recharts';

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];
const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Special handling for staff/patient ratio
    if (payload[0]?.payload?.demand) {
      return (
        <div className="bg-white px-3 py-2 shadow-lg border border-gray-100 rounded-md">
          <p className="text-xs font-medium text-gray-900">{label}</p>
          <p className="text-xs text-gray-600">
            Staff/Patient Ratio: {payload[0].value}
          </p>
          <p className="text-xs mt-1" style={{
            color: payload[0].payload.demand === 'high' ? '#DC2626' :
                   payload[0].payload.demand === 'medium' ? '#F59E0B' : '#10B981'
          }}>
            {payload[0].payload.demand.charAt(0).toUpperCase() + payload[0].payload.demand.slice(1)} Demand
          </p>
        </div>
      );
    }
    
    // Special handling for patient demographics
    if (payload[0]?.payload?.maleAdult !== undefined) {
      return (
        <div className="bg-white px-3 py-2 shadow-lg border border-gray-100 rounded-md">
          <p className="text-xs font-medium text-gray-900">{label}</p>
          <div className="mt-1">
            <p className="text-xs text-blue-600">Male: {payload[0].payload.maleAdult + payload[0].payload.maleChild}</p>
            <p className="text-[10px] text-blue-400 ml-2">Adult: {payload[0].payload.maleAdult}</p>
            <p className="text-[10px] text-blue-400 ml-2">Child: {payload[0].payload.maleChild}</p>
          </div>
          <div className="mt-1">
            <p className="text-xs text-pink-600">Female: {payload[0].payload.femaleAdult + payload[0].payload.femaleChild}</p>
            <p className="text-[10px] text-pink-400 ml-2">Adult: {payload[0].payload.femaleAdult}</p>
            <p className="text-[10px] text-pink-400 ml-2">Child: {payload[0].payload.femaleChild}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white px-2 py-1 shadow-lg border border-gray-100 rounded-md">
        <p className="text-xs font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-gray-600">
            {entry.name || entry.dataKey}: {entry.value}
            {typeof entry.value === 'number' && !entry.name && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-[10px] font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const renderChart = (data: any) => {
  const chartHeight = '100%';
  const chartMinHeight = 160;

  switch (data.chartType) {
    case 'line':
      // Special handling for staff/patient ratio
      if (data.chartData[0]?.ratio !== undefined) {
        return (
          <div className="w-full h-full min-h-[160px]">
            <ResponsiveContainer width="100%" height={chartHeight} minHeight={chartMinHeight}>
              <LineChart data={data.chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  dy={5}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  domain={[0, 20]}
                  label={{ 
                    value: 'Staff Demand Ratio', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: '10px', fill: '#6B7280' }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="ratio"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#2563EB' }}
                />
                {/* Add reference lines for demand levels */}
                <ReferenceLine y={12} stroke="#DC2626" strokeDasharray="3 3" />
                <ReferenceLine y={10} stroke="#F59E0B" strokeDasharray="3 3" />
                <ReferenceLine y={8} stroke="#10B981" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      }

      return (
        <div className="w-full h-full min-h-[160px]">
          <ResponsiveContainer width="100%" height={chartHeight} minHeight={chartMinHeight}>
            <LineChart data={data.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                dy={5}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2563EB' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case 'pie':
      return (
        <div className="w-full h-full min-h-[160px]">
          <ResponsiveContainer width="100%" height={chartHeight} minHeight={chartMinHeight}>
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data.chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={70}
                innerRadius={45}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.chartData.map((entry: any, index: number) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {data.chartData.map((entry: any, index: number) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full mr-1.5"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-[10px] text-gray-600 font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'bar':
      // Special handling for patient demographics
      if (data.chartData[0]?.maleAdult !== undefined) {
        return (
          <div className="w-full h-full min-h-[160px]">
            <ResponsiveContainer width="100%" height={chartHeight} minHeight={chartMinHeight}>
              <BarChart data={data.chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  interval={0}
                  dy={5}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                  label={{ 
                    value: 'New Monthly Patients', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: '10px', fill: '#6B7280' }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="maleAdult" stackId="male" fill="#3B82F6" name="Male Adult" />
                <Bar dataKey="maleChild" stackId="male" fill="#93C5FD" name="Male Child" />
                <Bar dataKey="femaleAdult" stackId="female" fill="#EC4899" name="Female Adult" />
                <Bar dataKey="femaleChild" stackId="female" fill="#F9A8D4" name="Female Child" />
                <Legend
                  wrapperStyle={{ fontSize: '10px' }}
                  iconSize={8}
                  iconType="circle"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }

      return (
        <div className="w-full h-full min-h-[160px]">
          <ResponsiveContainer width="100%" height={chartHeight} minHeight={chartMinHeight}>
            <BarChart data={data.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                interval={0}
                dy={5}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#3B82F6" radius={[2, 2, 0, 0]}>
                {data.chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return null;
  }
}; 