import StatCounter from "@/components/StatCounter";

interface Stat {
  label: string;
  value: string;
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-page grid grid-cols-2 divide-x divide-border py-8 sm:grid-cols-4">
        {stats.map((s) => (
          <StatCounter key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}