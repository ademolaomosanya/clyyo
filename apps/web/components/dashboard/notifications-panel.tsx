import { Bell } from "lucide-react";
import { notifications } from "@/lib/dashboard-data";

export function NotificationsPanel() {
  return (
    <section className="focusCard">
      <div className="sectionHeader compact">
        <div>
          <p className="eyebrow">Inbox</p>
          <h2>Notifications</h2>
        </div>
        <Bell size={18} />
      </div>

      <div className="notificationList">
        {notifications.map((notification) => (
          <button type="button" key={notification}>
            <span />
            {notification}
          </button>
        ))}
      </div>
    </section>
  );
}
