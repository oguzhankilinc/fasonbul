"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";

export default function SuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("created") === "true") {
      setToastMessage("İlanınız başarıyla oluşturuldu! Admin onayından sonra yayınlanacak.");
      setShowToast(true);
      // Clean up URL
      router.replace("/hesap/ilanlarim", { scroll: false });
    }
    if (searchParams.get("updated") === "true") {
      setToastMessage("İlanınız başarıyla güncellendi!");
      setShowToast(true);
      router.replace("/hesap/ilanlarim", { scroll: false });
    }
  }, [searchParams, router]);

  if (!showToast) return null;

  return (
    <Toast
      message={toastMessage}
      type="success"
      duration={5000}
      onClose={() => setShowToast(false)}
    />
  );
}
