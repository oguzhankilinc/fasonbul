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
    JOB_OWNER: "bg-blue-500/20 text-blue-400",
    MANUFACTURER: "bg-purple-500/20 text-purple-400",
    ADMIN: "bg-red-500/20 text-red-400",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Kullanıcılar ({users.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Kullanıcı
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Rol
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Şehir
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                İlan
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                Kayıt
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    {user.companyName && (
                      <p className="text-xs text-gray-500">{user.companyName}</p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">
                  {user.city ? getCityLabel(user.city) : "-"}
                </td>
                <td className="py-3 px-4 text-sm text-white">
                  {user._count.jobRequests}
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">
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
