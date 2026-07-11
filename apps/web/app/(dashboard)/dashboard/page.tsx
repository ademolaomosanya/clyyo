import { EventsTable } from "@/components/dashboard/events-table";
import { MetricCard } from "@/components/dashboard/metric-card";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { ReadinessPanel } from "@/components/dashboard/readiness-panel";
import { SchedulePanel } from "@/components/dashboard/schedule-panel";
import { Topbar } from "@/components/dashboard/topbar";
import { metrics } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <>
      <Topbar eyebrow="Organizer dashboard" title="Events overview" />

      <section className="dashboardGrid">
        <div className="mainColumn">
          <section className="metricGrid" aria-label="Dashboard metrics">
            {metrics.map((metric) => (
              <MetricCard
                delta={metric.delta}
                icon={metric.icon}
                key={metric.label}
                label={metric.label}
                tone={metric.tone}
                value={metric.value}
              />
            ))}
          </section>

          <EventsTable />
        </div>

        <aside className="sideColumn">
          <SchedulePanel />
          <NotificationsPanel />
          <ReadinessPanel />
        </aside>
      </section>
    </>
  );
}
