import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  Compass,
  MapPin,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  Zap
} from "lucide-react";

const liveSignals = [
  { label: "Registered", value: "1,248" },
  { label: "Checked in", value: "74%" },
  { label: "Teams", value: "96" }
];

const eventCards = [
  {
    title: "Clyyo Hack Lagos",
    type: "Hackathon",
    date: "Sep 18-20",
    location: "Lagos",
    status: "Teams forming"
  },
  {
    title: "Builder Systems Conf",
    type: "Conference",
    date: "Oct 04",
    location: "Accra + Remote",
    status: "Early access"
  },
  {
    title: "AI Product Weekend",
    type: "Workshop",
    date: "Oct 22",
    location: "Nairobi",
    status: "Applications open"
  }
];

const operationCards = [
  {
    title: "Discover",
    body: "Participants browse events, register, join teams, and keep their schedule in one place.",
    icon: Compass
  },
  {
    title: "Match",
    body: "Organizers form balanced teams with skill, timezone, interest, and capacity signals.",
    icon: UsersRound
  },
  {
    title: "Check in",
    body: "Staff scan QR passes at the door while attendance updates live across the workspace.",
    icon: QrCode
  },
  {
    title: "Measure",
    body: "Sponsors and organizers see attendance, engagement, reviews, leads, and reports.",
    icon: BarChart3
  }
];

const journeySteps = [
  "Browse events",
  "Apply or register",
  "Join the right team",
  "Scan in at venue",
  "Review after event"
];

const proofStats = [
  { value: "12K+", label: "Attendees checked in" },
  { value: "340+", label: "Events powered" },
  { value: "98%", label: "Check-in accuracy" },
  { value: "4.9/5", label: "Organizer rating" }
];

export default function LandingPage() {
  return (
    <main className="novaLanding">
      <header className="novaNav">
        <a className="novaBrand" href="/">
          <span>
            <Sparkles size={20} />
          </span>
          Clyyo
        </a>

        <nav className="novaLinks" aria-label="Public navigation">
          <a href="#discover">Discover</a>
          <a href="#platform">Platform</a>
          <a href="#proof">Proof</a>
        </nav>

        <div className="novaActions">
          <a href="/login">Log in</a>
          <a className="novaButton novaButtonSmall" href="/register">
            Get started
          </a>
        </div>
      </header>

      <section className="novaHero">
        <div className="novaHeroCopy">
          <div className="novaSignal">
            <Zap size={16} />
            Public beta for hackathons and conferences
          </div>
          <h1>
            Turn every event into a living <span>network.</span>
          </h1>
          <p>
            Clyyo helps participants discover events, organizers run operations, teams find each other, staff scan QR
            check-ins, and sponsors see what worked.
          </p>
          <div className="novaHeroActions">
            <a className="novaButton" href="/register">
              Start for free
              <ArrowRight size={19} />
            </a>
            <a className="novaButton novaButtonGhost" href="/dashboard">
              Open demo dashboard
            </a>
          </div>
        </div>

        <div className="novaConsole" aria-label="Clyyo live event operating system preview">
          <div className="novaConsoleTop">
            <div>
              <small>Live workspace</small>
              <strong>Clyyo Hack Lagos 2026</strong>
            </div>
            <span>
              <Bell size={16} />
              18 updates
            </span>
          </div>

          <div className="novaCommandGrid">
            <section className="novaDiscoverPanel">
              <div className="novaPanelHeader">
                <Search size={17} />
                Browse events
              </div>
              {eventCards.map((event) => (
                <article key={event.title}>
                  <div>
                    <strong>{event.title}</strong>
                    <span>{event.type} - {event.date}</span>
                  </div>
                  <p>
                    <MapPin size={14} />
                    {event.location}
                  </p>
                  <em>{event.status}</em>
                </article>
              ))}
            </section>

            <section className="novaMapPanel">
              <div className="novaOrbit" aria-hidden="true">
                {Array.from({ length: 22 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <div className="novaTeamCard">
                <UsersRound size={18} />
                <strong>Team matching</strong>
                <p>24 participants need final placement</p>
              </div>
            </section>

            <section className="novaOpsPanel">
              {liveSignals.map((signal) => (
                <article key={signal.label}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </article>
              ))}
              <div className="novaQrCard">
                <QrCode size={28} />
                <div>
                  <strong>Gate A ready</strong>
                  <span>QR scanner synced</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="novaMarquee" aria-label="Clyyo workflow">
        {journeySteps.map((step) => (
          <span key={step}>
            <CheckCircle2 size={18} />
            {step}
          </span>
        ))}
      </section>

      <section className="novaDiscover" id="discover">
        <div className="novaSectionTitle">
          <p>For participants</p>
          <h2>Event discovery is part of the product, not a side quest.</h2>
        </div>

        <div className="novaBrowseStage">
          <div className="novaPhone">
            <div className="novaPhoneTop" />
            <strong>Explore events</strong>
            <div className="novaPhoneSearch">
              <Search size={15} />
              Hackathons near me
            </div>
            {eventCards.map((event) => (
              <article key={event.title}>
                <span>{event.type}</span>
                <strong>{event.title}</strong>
                <p>{event.location} - {event.date}</p>
              </article>
            ))}
          </div>

          <div className="novaDiscoverCopy">
            <h3>Participants know what to do next.</h3>
            <p>
              They can find events, register, answer application questions, join a team, receive updates, scan in, and
              leave a review after the event ends.
            </p>
            <div>
              <span>
                <Star size={17} />
                Personalized recommendations
              </span>
              <span>
                <CalendarDays size={17} />
                Saved schedules
              </span>
              <span>
                <QrCode size={17} />
                Mobile check-in pass
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="novaPlatform" id="platform">
        <div className="novaSectionTitle">
          <p>For organizers</p>
          <h2>One operating layer from registration to post-event insight.</h2>
        </div>

        <div className="novaCardGrid">
          {operationCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title}>
                <Icon size={25} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="novaProof" id="proof">
        {proofStats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="novaFinal">
        <div>
          <ShieldCheck size={30} />
          <h2>Build the event people remember.</h2>
          <p>
            Start with discovery, registration, teams, check-in, sponsor visibility, reviews, and analytics in one
            connected workspace.
          </p>
          <a className="novaButton" href="/register">
            Create your workspace
            <ArrowRight size={19} />
          </a>
        </div>
      </section>

      <footer className="novaFooter">
        <a className="novaBrand" href="/">
          <span>
            <Sparkles size={20} />
          </span>
          Clyyo
        </a>
        <nav aria-label="Footer navigation">
          <a href="#discover">Discover</a>
          <a href="#platform">Platform</a>
          <a href="/login">Privacy</a>
          <a href="/login">Terms</a>
        </nav>
        <p>&copy; 2026 Clyyo. All rights reserved.</p>
      </footer>
    </main>
  );
}
