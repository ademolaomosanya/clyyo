import { ChevronRight, Sparkles } from "lucide-react";
import { navItems } from "@/lib/dashboard-data";

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="brand">
        <div className="brandMark">C</div>
        <div>
          <strong>Clyyo</strong>
          <span>Event OS</span>
        </div>
      </div>

      <nav className="navList">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <a className={item.active ? "navItem active" : "navItem"} href="#" key={item.label}>
              <Icon size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebarPanel">
        <div className="miniIcon">
          <Sparkles size={18} />
        </div>
        <strong>Team matching</strong>
        <span>18 participants need balanced teams.</span>
        <button type="button">
          Open queue
          <ChevronRight size={15} />
        </button>
      </div>
    </aside>
  );
}
