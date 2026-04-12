import type { Metadata } from "next";
import "../globals.css";

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
  // This layout replaces the root layout's header/footer for admin routes
  // Admin pages get their own isolated shell
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full bg-gray-900">
        {children}
      </body>
    </html>
  );
}
