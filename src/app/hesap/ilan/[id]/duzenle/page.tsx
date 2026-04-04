import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import EditJobForm from "./EditJobForm";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "İlanı Düzenle",
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/giris");
  }

  const job = await prisma.jobRequest.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  // Only owner or admin can edit
  if (job.ownerId !== user.id && user.role !== "ADMIN") {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">İlanı Düzenle</h1>
      <EditJobForm job={job} />
    </div>
  );
}
