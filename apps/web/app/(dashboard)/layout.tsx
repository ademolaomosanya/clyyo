import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="shell">
      <Sidebar />
      <section className="workspace">{children}</section>
    </main>
  );
}
