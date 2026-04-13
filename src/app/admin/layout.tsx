import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | FasonBul",
    template: "%s | FasonBul Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin shell: Full-viewport fixed container that visually isolates admin from public site
  // This creates a complete visual separation without needing route groups
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 overflow-auto">
      {children}
    </div>
  );
}
