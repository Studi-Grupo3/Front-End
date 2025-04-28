import { GraphCard } from './GraphCard';

export function ChartSection({ charts = [] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {charts.map((chart, index) => (
        <GraphCard
          key={index}
          title={chart.title}
          type={chart.type}
          data={chart.data}
          options={chart.options}
        />
      ))}
    </section>
  );
}
