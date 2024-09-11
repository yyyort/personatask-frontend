import Sidebar from "@/components/sidebar/sidebar";

export default function HomeWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full min-w-full flex">
      <nav>
        <Sidebar />
      </nav>
      <main>{children}</main>
    </div>
  );
}
