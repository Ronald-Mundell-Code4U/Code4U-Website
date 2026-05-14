import { Briefcase, Smartphone, Globe2, Heart } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "Extensive",
    label: "Work Experience",
  },
  {
    icon: Heart,
    value: "Flexible",
    label: "Working Conditions",
  },
  {
    icon: Smartphone,
    value: "Mobile + Web",
    label: "Full-Stack Reach",
  },
  {
    icon: Globe2,
    value: "Vancouver",
    label: "+ Remote Worldwide",
  },
];

export function StatsStrip() {
  return (
    <section
      className="border-y border-gray-200/70 dark:border-accent/10 bg-primary-50/40 dark:bg-bg-dark-card"
      aria-label="At a glance"
    >
      <div className="container-page py-8 md:py-10">
        <dl className="grid grid-cols-2 gap-y-8 gap-x-6 md:grid-cols-4 md:gap-x-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-input bg-accent/15 text-primary-700 dark:text-accent">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-text-body dark:text-text-dark-b">
                  {label}
                </dt>
                <dd className="mt-0.5 text-lg font-extrabold tracking-tight text-text-heading dark:text-text-dark-h">
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
