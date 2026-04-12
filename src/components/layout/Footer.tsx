import Link from "next/link";
import Logo from "@/components/ui/Logo";
import TrustBadges from "@/components/ui/TrustBadges";
import { SECTORS, CITIES } from "@/lib/constants";

export default function Footer() {
  // Popular cities for footer
  const popularCities = CITIES.filter((c) =>
    ["istanbul", "izmir", "bursa", "ankara", "kocaeli", "gaziantep"].includes(c.value)
  );

  return (
    <footer className="bg-gray-50 border-t border-border mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-secondary leading-relaxed mb-4">
              Türkiye&apos;nin fason üretim platformu. Otomotiv, mobilya, tekstil,
              kimya ve daha birçok sektörde iş sahipleri ile fason üreticileri
              buluşturuyoruz.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">
                Fason Üretimin Adresi
              </p>
              <p className="text-sm text-secondary">
                <span className="font-medium">İletişim:</span>{" "}
                <a
                  href="mailto:info@fasonbul.com"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  info@fasonbul.com
                </a>
              </p>
            </div>
          </div>

          {/* Sectors */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Sektörler</h3>
            <ul className="space-y-2.5">
              {SECTORS.map((sector) => (
                <li key={sector.value}>
                  <Link
                    href={`/kategori/${sector.value}`}
                    className="text-sm text-secondary hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span>{sector.icon}</span>
                    {sector.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Popüler Şehirler</h3>
            <ul className="space-y-2.5">
              {popularCities.map((city) => (
                <li key={city.value}>
                  <Link
                    href={`/sehir/${city.value}`}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ilanlar"
                  className="text-sm text-primary hover:text-primary-hover font-medium"
                >
                  Tüm Şehirler →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/ilanlar"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Tüm İlanlar
                </Link>
              </li>
              <li>
                <Link
                  href="/kayit"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Kayıt Ol
                </Link>
              </li>
              <li>
                <Link
                  href="/giris"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Giriş Yap
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href="/nasil-calisir"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Nasıl Çalışır?
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
            <Link
              href="/gizlilik"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/kullanim-sartlari"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              Kullanım Şartları
            </Link>
            <Link
              href="/kvkk"
              className="text-sm text-secondary hover:text-primary transition-colors"
            >
              KVKK Aydınlatma Metni
            </Link>
          </div>
          {/* Trust Badges */}
          <div className="mb-6">
            <TrustBadges />
          </div>
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary font-medium tracking-wide">
              © 2026 FASONBUL TÜM HAKLARI SAKLIDIR. OSTHINKS YAZILIM A.Ş.
            </p>
            <p className="text-sm text-secondary">
              İletişim:{" "}
              <a
                href="mailto:info@fasonbul.com"
                className="text-primary hover:text-primary-hover transition-colors font-medium"
              >
                info@fasonbul.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
