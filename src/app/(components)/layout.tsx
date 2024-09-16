import PathBreadcrumbs from "@/components/path-breadcrumbs";
import Sidebar from "@/components/sidebar/sidebar";
import AuthWrapper from "./auth-wrapper";

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
        <AuthWrapper>{children}</AuthWrapper>
      </main>
    </div>
  );
}
