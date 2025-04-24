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

export function GraphCard({ title, data, type = 'bar' }) {
  // Tamanhos personalizados para o gráfico de pizza
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
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {type === 'bar' ? (
        <Bar data={data} />
      ) : (
        <div className="w-full max-w-xs mx-auto" style={{ height: '250px' }}>
          <Pie data={data} options={pieOptions} />
        </div>
      )}
    </div>
  );
}
