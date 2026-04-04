import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata = {
  title: "Şifre Değiştir",
};

export default async function ChangePasswordPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Şifre Değiştir</h1>
      <ChangePasswordForm userId={user.id} />
    </div>
  );
}
