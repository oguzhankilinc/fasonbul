import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "Profil Ayarları",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Profil Ayarları</h1>
      <ProfileForm user={user} />
    </div>
  );
}
