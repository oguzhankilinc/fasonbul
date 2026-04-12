import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nasıl Çalışır? | FasonBul",
  description:
    "FasonBul nasıl çalışır? Ücretsiz kayıt olun, ilan verin, doğru üreticilerle buluşun. Adım adım platform kullanım rehberi.",
};

export default function NasilCalisirPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Nasıl Çalışır?</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nasıl Çalışır?
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            FasonBul ile fason üretim ortağınızı bulmak çok kolay. 3 basit adımda
            başlayın.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="card flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Ücretsiz Kayıt Olun
              </h2>
              <p className="text-secondary mb-4">
                E-posta adresiniz ve temel bilgilerinizle hızlıca hesap
                oluşturun. Kayıt işlemi sadece 1 dakika sürer ve tamamen
                ücretsizdir.
              </p>
              <ul className="text-sm text-secondary space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Gizli ücret yok
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Komisyon yok
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Sonsuza kadar ücretsiz
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                İlanınızı Oluşturun
              </h2>
              <p className="text-secondary mb-4">
                Fason iş talebinizi detaylıca açıklayın. Sektör, şehir ve iş
                detaylarını girerek ilanınızı yayına gönderin.
              </p>
              <ul className="text-sm text-secondary space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  7 farklı sektör seçeneği
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  81 il genelinde yayın
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Aciliyet durumu belirtme
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Üreticilerle Buluşun
              </h2>
              <p className="text-secondary mb-4">
                İlanınız onaylandıktan sonra yayına girer. İlgili üreticiler
                ilanınızı görür ve sizinle doğrudan iletişime geçer.
              </p>
              <ul className="text-sm text-secondary space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Doğrudan telefon ile iletişim
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  WhatsApp desteği
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Aracı yok, direkt anlaşma
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                FasonBul gerçekten ücretsiz mi?
              </h3>
              <p className="text-secondary text-sm">
                Evet, FasonBul&apos;u kullanmak tamamen ücretsizdir. İlan vermek,
                ilan görüntülemek ve iletişime geçmek için hiçbir ücret
                ödenmez. Gizli ücret veya komisyon yoktur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                İlanım ne kadar süre yayında kalır?
              </h3>
              <p className="text-secondary text-sm">
                İlanlar varsayılan olarak 30 gün boyunca yayında kalır. Süre
                dolduğunda ilanınız otomatik olarak pasif duruma geçer.
                İsterseniz ilanınızı yenileyebilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                İlanım onaylanması ne kadar sürer?
              </h3>
              <p className="text-secondary text-sm">
                İlanlar genellikle aynı gün içinde incelenir ve onaylanır.
                Onaylanan ilanlar hemen yayına girer ve üreticiler tarafından
                görüntülenebilir hale gelir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Hangi sektörlerde ilan verebilirim?
              </h3>
              <p className="text-secondary text-sm">
                Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el işi
                sektörlerinde ilan verebilirsiniz. Her sektör için özelleşmiş
                kategoriler mevcuttur.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Ücretsiz kayıt olun ve ilk ilanınızı 2 dakikada oluşturun.
            Türkiye genelindeki üreticilere ulaşın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kayit"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Ücretsiz Kayıt Ol
            </Link>
            <Link
              href="/ilanlar"
              className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border-2 border-white/40 px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-colors"
            >
              İlanları İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
