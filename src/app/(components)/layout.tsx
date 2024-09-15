import PathBreadcrumbs from "@/components/path-breadcrumbs";
import Sidebar from "@/components/sidebar/sidebar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="min-h-full min-w-full flex">
      <nav>
        <Sidebar />
      </nav>
      <main className="w-full min-h-full p-10">
        <PathBreadcrumbs />
        {children}
      </main>
    </div>
  )
}
