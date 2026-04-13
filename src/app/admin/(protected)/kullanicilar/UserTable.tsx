"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCityLabel } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { deleteUserAdmin } from "@/actions/admin";

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

interface UserTableProps {
  users: UserData[];
  showJobCount?: boolean;
}

export default function UserTable({ users, showJobCount = false }: UserTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (user: UserData) => {
    const jobCountText = user._count.jobRequests > 0
      ? `\n\nDikkat: Bu kullanıcının ${user._count.jobRequests} adet ilanı var ve bunlar da silinecek.`
      : "";

    const confirmed = confirm(
      `"${user.name}" kullanıcısını silmek istediğinize emin misiniz?${jobCountText}\n\nBu işlem geri alınamaz.`
    );

    if (!confirmed) return;

    setDeletingId(user.id);

    try {
      const result = await deleteUserAdmin(user.id);

      if (result.error) {
        alert(result.error);
      } else {
        router.refresh();
      }
    } catch (error) {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      console.error("[ADMIN] Delete user failed:", error);
    } finally {
      setDeletingId(null);
    }
  };

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
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">
              İşlem
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
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => handleDelete(user)}
                  disabled={deletingId === user.id}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === user.id ? "Siliniyor..." : "Sil"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
