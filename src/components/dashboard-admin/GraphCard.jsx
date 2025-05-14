import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

/**
 * @param {string} title 
 * @param {{label: string, value: number}[]} data
 * @param {'bar'|'pie'} type 
 * @param {object} [options] 
 * @param {string} [color] 
 */
export function GraphCard({ title, data = [], type = 'bar', options = {}, color }) {

  const defaultColors = [
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 205, 86, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(201, 203, 207, 0.6)'
  ];

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const barColor = color || 'rgba(54, 162, 235, 0.6)';
  const barBorderColor = color ? color : 'rgba(54, 162, 235, 1)';

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        ...(type === 'bar'
          ? {
              backgroundColor: labels.map(() => barColor),
              borderColor: labels.map(() => barBorderColor),
              borderWidth: 1
            }
          : { backgroundColor: defaultColors, borderColor: defaultColors.map(c => c.replace('0.6', '1')) })
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
    ...options,
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    },
    ...options,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {type === 'bar' ? (
        <Bar data={chartData} options={barOptions} />
      ) : (
        <div className="w-full max-w-xs mx-auto" style={{ height: '250px' }}>
          <Pie data={chartData} options={pieOptions} />
        </div>
      )}
    </div>
  );
}