import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useChartStore } from '@/store/useChartStore';

const CandlestickChart: React.FC = () => {
  const { candles } = useChartStore();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (candles.length > 0) {
      const data = candles.map((candle) => [
        candle.time,
        candle.open,
        candle.high,
        candle.low,
        candle.close
      ]);
      setChartData(data);
    }
  }, [candles]);

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Gráfico de Velas',
      align: 'center',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (value: string) => {
          
          const date = new Date(parseInt(value)); 
          return date.toLocaleTimeString(); 
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: (value: number) => value.toFixed(2)
      }
    }
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={[{ data: chartData }]} 
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandlestickChart;
