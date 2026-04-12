import { prisma } from "@/lib/prisma";
import { getCityLabel } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Kullanıcılar",
};

interface UserData {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  phone: string | null;
  city: string | null;
  role: string;
  createdAt: Date;
  _count: {
    jobRequests: number;
  };
}

function UserTable({ users, showJobCount = false }: { users: UserData[]; showJobCount?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
              Kullanıcı
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
              Firma
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
              Şehir
            </th>
            {showJobCount && (
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                İlan
              </th>
            )}
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
                  {user.phone && (
                    <p className="text-xs text-gray-500">{user.phone}</p>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {user.companyName || "-"}
              </td>
              <td className="py-3 px-4 text-sm text-gray-400">
                {user.city ? getCityLabel(user.city) : "-"}
              </td>
              {showJobCount && (
                <td className="py-3 px-4 text-sm text-white">
                  {user._count.jobRequests}
                </td>
              )}
              <td className="py-3 px-4 text-sm text-gray-400">
                {formatDate(user.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

  const jobOwners = users.filter((u) => u.role === "JOB_OWNER");
  const manufacturers = users.filter((u) => u.role === "MANUFACTURER");

  return (
    <div className="space-y-10">
      {/* İlan Veren Firmalar Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">
            İlan Veren Firmalar
          </h2>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400">
            {jobOwners.length}
          </span>
        </div>

        {jobOwners.length === 0 ? (
          <div className="text-center py-8 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400">Henüz ilan veren firma bulunmuyor.</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <UserTable users={jobOwners} showJobCount />
          </div>
        )}
      </section>

      {/* Fason Üreticiler / Atölyeler Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">
            Fason Üreticiler / Atölyeler
          </h2>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-400">
            {manufacturers.length}
          </span>
        </div>

        {manufacturers.length === 0 ? (
          <div className="text-center py-8 bg-gray-800/50 rounded-lg">
            <p className="text-gray-400">Henüz fason üretici bulunmuyor.</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <UserTable users={manufacturers} />
          </div>
        )}
      </section>
    </div>
  );
}
