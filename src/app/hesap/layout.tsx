import { redirect } from "next/navigation";
import { getCurrentUser, removeAuthCookie } from "@/lib/auth";
import AccountSidebar from "./AccountSidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    // Clear stale/invalid cookie to prevent redirect loop
    // This happens when middleware passes (valid JWT) but user is not in DB
    await removeAuthCookie();
    redirect("/giris");
  }

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <AccountSidebar user={user} />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">{children}</main>
      </div>
    </div>
  );
}
