import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SECTORS, CITIES } from "@/lib/constants";

export default function Footer() {
  // Popular cities for footer
  const popularCities = CITIES.filter((c) =>
    ["istanbul", "izmir", "bursa", "ankara", "kocaeli", "gaziantep"].includes(c.value)
  );

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Main Footer */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Türkiye&apos;nin fason üretim platformu. Otomotiv, mobilya, tekstil,
              kimya ve daha birçok sektörde iş sahipleri ile fason üreticileri
              buluşturuyoruz.
            </p>
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium text-gray-300">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Komisyon Yok
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 rounded-full text-xs font-medium text-gray-300">
                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                %100 Ücretsiz
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">
                Fason Üretimin Adresi
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium text-gray-300">İletişim:</span>{" "}
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
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Sektörler
            </h3>
            <ul className="space-y-3">
              {SECTORS.map((sector) => (
                <li key={sector.value}>
                  <Link
                    href={`/kategori/${sector.value}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{sector.icon}</span>
                    {sector.label} Fason İlanları
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Popüler Şehirler
            </h3>
            <ul className="space-y-3">
              {popularCities.map((city) => (
                <li key={city.value}>
                  <Link
                    href={`/sehir/${city.value}`}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {city.label} Fason İlanları
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ilanlar"
                  className="text-sm text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-1"
                >
                  Tüm Şehirler
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Hızlı Erişim
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/ilanlar"
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  Tüm İlanlar
                </Link>
              </li>
              <li>
                <Link
                  href="/kayit"
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  Ücretsiz Kayıt Ol
                </Link>
              </li>
              <li>
                <Link
                  href="/giris"
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  Giriş Yap
                </Link>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-3">Fason iş mi arıyorsunuz?</p>
              <Link
                href="/kayit"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ücretsiz İlan Ver
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 font-medium tracking-wide text-center sm:text-left">
              © 2026 FASONBUL TÜM HAKLARI SAKLIDIR. OSTHINKS YAZILIM A.Ş.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-600">
                İletişim:{" "}
                <a
                  href="mailto:info@fasonbul.com"
                  className="text-gray-400 hover:text-primary transition-colors font-medium"
                >
                  info@fasonbul.com
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
