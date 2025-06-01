import React from 'react';

interface ChartProps {
  data: number[];
  labels: string[];
  title?: string;
  type?: 'bar' | 'line';
  height?: number;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  data,
  labels,
  title,
  type = 'bar',
  height = 200,
  className = '',
}) => {
  const maxValue = Math.max(...data) || 100;
  
  // Find the appropriate step value based on the max value
  const getStepValue = (max: number) => {
    if (max <= 10) return 1;
    if (max <= 100) return 10;
    if (max <= 1000) return 100;
    return Math.pow(10, Math.floor(Math.log10(max)));
  };
  
  const step = getStepValue(maxValue);
  const steps = Math.ceil(maxValue / step) + 1;
  
  // Generate y-axis labels
  const yAxisLabels = Array.from({ length: steps }, (_, i) => i * step);
  
  return (
    <div className={`flex flex-col ${className}`}>
      {title && <h3 className="text-base font-medium text-gray-700 mb-2">{title}</h3>}
      <div 
        className="relative" 
        style={{ height: `${height}px` }}
      >
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
          {yAxisLabels.reverse().map((label, i) => (
            <div key={i} className="flex items-center">
              <span>{label}</span>
            </div>
          ))}
        </div>
        
        {/* Chart grid and bars/lines */}
        <div className="absolute left-12 right-0 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {yAxisLabels.map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full border-t border-gray-200"
                style={{ top: `${(i / (steps - 1)) * 100}%` }}
              ></div>
            ))}
          </div>
          
          {/* Chart content */}
          <div className="absolute inset-0 flex items-end">
            {data.map((value, i) => {
              const heightPercent = (value / (maxValue + step)) * 100;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  {type === 'bar' ? (
                    <div 
                      className="w-3/4 bg-blue-500 rounded-t transition-all duration-500 ease-in-out hover:bg-blue-600"
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  ) : (
                    <div className="w-full h-full relative">
                      {i > 0 && (
                        <div 
                          className="absolute bg-blue-500 h-0.5 origin-left transform"
                          style={{ 
                            bottom: `${heightPercent}%`,
                            left: '-50%',
                            width: '100%',
                            transformOrigin: 'left',
                            rotate: `${Math.atan2(
                              (data[i] - data[i-1]) / maxValue * height, 
                              height / data.length
                            )}rad`
                          }}
                        ></div>
                      )}
                      <div 
                        className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1 -translate-y-1"
                        style={{ 
                          bottom: `${heightPercent}%`,
                          left: '50%'
                        }}
                      ></div>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">{labels[i]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;