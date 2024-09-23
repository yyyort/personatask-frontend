import PathBreadcrumbs from "@/components/path-breadcrumbs";
import Sidebar from "@/components/sidebar/sidebar";
import AuthWrapper from "./auth-wrapper";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-full flex">
      <nav>
        <Sidebar />
      </nav>
      <main className="w-full max-h-screen p-10 overflow-auto">
        <PathBreadcrumbs />
        <AuthWrapper>{children}</AuthWrapper>
      </main>
    </div>
  );
}
