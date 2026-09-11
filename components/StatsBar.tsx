import StatCounter from "@/components/StatCounter";

interface Stat {
  label: string;
  value: string;
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-b border-border bg-background">
      {/* md: instead of sm: for the 4-column split — at 640px a row of four
          large numbers like "11,24,000+" doesn't have room to breathe, which
          is what was forcing them to overflow into each other. */}
      <div className="container-page grid grid-cols-2 gap-y-8 divide-x divide-border py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-y-0">
        {stats.map((s) => (
          <div key={s.label} className="min-w-0 px-4 first:pl-0 last:pr-0">
            <StatCounter value={s.value} label={s.label} />
          </div>
        ))}
      </div>
    </section>
  );
}