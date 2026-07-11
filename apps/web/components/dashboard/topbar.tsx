import { Bell, CircleUserRound, Search } from "lucide-react";

type TopbarProps = {
  eyebrow: string;
  title: string;
};

export function Topbar({ eyebrow, title }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>

      <div className="topbarActions">
        <label className="searchBox">
          <Search size={17} />
          <input aria-label="Search" placeholder="Search events, teams, attendees" />
        </label>
        <button className="iconButton" aria-label="Notifications" type="button">
          <Bell size={18} />
        </button>
        <button className="profileButton" type="button">
          <CircleUserRound size={18} />
          Ademola
        </button>
      </div>
    </header>
  );
}
