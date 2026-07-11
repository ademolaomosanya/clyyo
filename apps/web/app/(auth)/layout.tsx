export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="authShell">
      <section className="authAside">
        <div className="brand authBrand">
          <div className="brandMark">C</div>
          <div>
            <strong>Clyyo</strong>
            <span>Event OS</span>
          </div>
        </div>

        <div className="authAsideContent">
          <p className="eyebrow">Built for event operations</p>
          <h2>One place for applications, teams, check-in, sponsors, and analytics.</h2>
          <div className="authStatGrid">
            <div>
              <strong>74%</strong>
              <span>sample check-in rate</span>
            </div>
            <div>
              <strong>96</strong>
              <span>teams formed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="authContent">{children}</section>
    </main>
  );
}
