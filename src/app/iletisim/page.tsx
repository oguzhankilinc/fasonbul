import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim | FasonBul",
  description:
    "FasonBul ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bize ulaşın.",
};

export default function IletisimPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">İletişim</span>
        </nav>

        <div className="card">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            İletişim
          </h1>

          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-lg">
              FasonBul ekibine ulaşmak için aşağıdaki iletişim kanallarını
              kullanabilirsiniz. Sorularınız, önerileriniz veya geri
              bildirimleriniz için bize yazmaktan çekinmeyin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Email Card */}
            <div className="bg-gradient-to-br from-primary-light/50 to-white rounded-2xl p-6 border border-primary/10">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                E-posta
              </h2>
              <p className="text-secondary text-sm mb-3">
                Genel sorularınız ve destek talepleriniz için
              </p>
              <a
                href="mailto:info@fasonbul.com"
                className="text-primary hover:text-primary-hover font-semibold text-lg"
              >
                info@fasonbul.com
              </a>
            </div>

            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-success-light/50 to-white rounded-2xl p-6 border border-success/10">
              <div className="w-12 h-12 bg-success-light rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Yanıt Süresi
              </h2>
              <p className="text-secondary text-sm mb-3">
                Mesajlarınıza en kısa sürede dönüş yapıyoruz
              </p>
              <p className="text-success font-semibold text-lg">
                24 saat içinde
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="mt-10 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Şirket Bilgileri
            </h2>
            <div className="bg-muted rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary mb-1">Şirket Unvanı</p>
                  <p className="font-semibold text-foreground">
                    OSTHINKS YAZILIM A.Ş.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Platform</p>
                  <p className="font-semibold text-foreground">fasonbul.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-10 pt-8 border-t border-border text-center">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Sık Sorulan Sorular
            </h2>
            <p className="text-secondary mb-4">
              Platform hakkında merak ettikleriniz için
            </p>
            <Link href="/nasil-calisir" className="btn-primary">
              Nasıl Çalışır?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
