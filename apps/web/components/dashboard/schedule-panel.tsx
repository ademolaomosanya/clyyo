import { CalendarDays } from "lucide-react";
import { schedule } from "@/lib/dashboard-data";

export function SchedulePanel() {
  return (
    <section className="focusCard">
      <div className="sectionHeader compact">
        <div>
          <p className="eyebrow">Today</p>
          <h2>Schedule</h2>
        </div>
        <CalendarDays size={18} />
      </div>

      <div className="scheduleList">
        {schedule.map((item) => (
          <div className="scheduleItem" key={item.title}>
            <time>{item.time}</time>
            <div>
              <strong>{item.title}</strong>
              <span>{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
