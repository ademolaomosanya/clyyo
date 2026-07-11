type AuthPanelProps = {
  mode: "login" | "register";
};

const roleOptions = ["participant", "organizer", "sponsor"] as const;

export function AuthPanel({ mode }: AuthPanelProps) {
  const isRegister = mode === "register";

  return (
    <section className="authPanel">
      <div className="authHeader">
        <p className="eyebrow">{isRegister ? "Create account" : "Welcome back"}</p>
        <h1>{isRegister ? "Start managing events with Clyyo" : "Sign in to Clyyo"}</h1>
        <p>
          {isRegister
            ? "Create a role-aware account for events, applications, teams, check-in, and sponsor workflows."
            : "Access your events, teams, notifications, and organizer tools."}
        </p>
      </div>

      <form className="authForm">
        {isRegister ? (
          <label>
            <span>Name</span>
            <input autoComplete="name" placeholder="Ada Builder" type="text" />
          </label>
        ) : null}

        <label>
          <span>Email</span>
          <input autoComplete="email" placeholder="you@example.com" type="email" />
        </label>

        <label>
          <span>Password</span>
          <input autoComplete={isRegister ? "new-password" : "current-password"} placeholder="••••••••" type="password" />
        </label>

        {isRegister ? (
          <label>
            <span>Role</span>
            <select defaultValue="participant">
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <button type="button">{isRegister ? "Create account" : "Sign in"}</button>
      </form>

      <p className="authSwitch">
        {isRegister ? "Already have an account?" : "New to Clyyo?"}{" "}
        <a href={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create account"}</a>
      </p>
    </section>
  );
}
