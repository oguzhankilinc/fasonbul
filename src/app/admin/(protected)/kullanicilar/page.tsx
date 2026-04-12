import { prisma } from "@/lib/prisma";
import { getCityLabel } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Kullanıcılar",
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      companyName: true,
      phone: true,
      city: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          jobRequests: true,
        },
      },
    },
  });

  const roleLabels: Record<string, string> = {
    JOB_OWNER: "İş Sahibi",
    MANUFACTURER: "Üretici",
    ADMIN: "Admin",
  };

  const roleColors: Record<string, string> = {
    JOB_OWNER: "badge-primary",
    MANUFACTURER: "badge-success",
    ADMIN: "badge-error",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Kullanıcılar ({users.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Kullanıcı
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Rol
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Şehir
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                İlan
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                Kayıt
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-secondary">{user.email}</p>
                    {user.companyName && (
                      <p className="text-xs text-secondary">{user.companyName}</p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={roleColors[user.role]}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-secondary">
                  {user.city ? getCityLabel(user.city) : "-"}
                </td>
                <td className="py-3 px-4 text-sm text-foreground">
                  {user._count.jobRequests}
                </td>
                <td className="py-3 px-4 text-sm text-secondary">
                  {formatDate(user.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
