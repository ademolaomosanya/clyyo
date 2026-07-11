import { MapPin } from "lucide-react";
import { events } from "@/lib/dashboard-data";

export function EventsTable() {
  return (
    <section className="boardSection">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Pipeline</p>
          <h2>Upcoming events</h2>
        </div>
        <button type="button">Create event</button>
      </div>

      <div className="eventTable" role="table" aria-label="Upcoming events">
        <div className="eventRow tableHead" role="row">
          <span>Event</span>
          <span>Date</span>
          <span>Applications</span>
          <span>Registrations</span>
          <span>Check-in</span>
          <span>Status</span>
        </div>

        {events.map((event) => (
          <div className="eventRow" role="row" key={event.title}>
            <div className="eventName">
              <div className={`eventThumb ${event.accent}`} />
              <div>
                <strong>{event.title}</strong>
                <span>
                  {event.type} · <MapPin size={13} /> {event.location}
                </span>
              </div>
            </div>
            <span>{event.date}</span>
            <span>{event.applications}</span>
            <span>{event.registrations}</span>
            <span>{event.checkIns}</span>
            <span className={`status ${event.status.toLowerCase()}`}>{event.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
