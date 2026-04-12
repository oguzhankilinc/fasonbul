import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda | FasonBul",
  description:
    "FasonBul hakkında bilgi edinin. Türkiye'nin fason üretim platformu olarak misyonumuz, vizyonumuz ve değerlerimiz.",
};

export default function HakkimizdaPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Hakkımızda</span>
        </nav>

        <div className="card">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Hakkımızda
          </h1>

          <div className="prose prose-lg max-w-none text-secondary space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                FasonBul Nedir?
              </h2>
              <p>
                FasonBul, Türkiye&apos;nin en kapsamlı fason üretim platformudur.
                İş sahipleri ile fason üreticileri tek bir çatı altında
                buluşturarak, üretim süreçlerini kolaylaştırıyoruz.
              </p>
              <p className="mt-3">
                Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el işi
                sektörlerinde faaliyet gösteren binlerce üretici ve iş sahibi,
                FasonBul üzerinden birbirleriyle buluşuyor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Misyonumuz
              </h2>
              <p>
                Türkiye&apos;deki üretim kapasitesini en verimli şekilde kullanmak
                ve iş sahiplerinin doğru üreticilere ulaşmasını sağlamak.
                Komisyonsuz, aracısız ve şeffaf bir platform sunarak üretim
                ekosistemini güçlendirmek.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Vizyonumuz
              </h2>
              <p>
                Türkiye&apos;nin ve bölgenin en büyük fason üretim platformu olmak.
                Üreticilerin kapasitelerini değerlendirmelerine, iş sahiplerinin
                ise güvenilir üretim ortakları bulmalarına yardımcı olmak.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Neden FasonBul?
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    %100 Ücretsiz
                  </h3>
                  <p className="text-sm">
                    İlan vermek ve görüntülemek tamamen ücretsiz. Hiçbir gizli
                    ücret veya komisyon yok.
                  </p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Doğrudan İletişim
                  </h3>
                  <p className="text-sm">
                    Aracı olmadan direkt iş sahibi veya üreticiyle iletişime
                    geçin.
                  </p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    Türkiye Geneli
                  </h3>
                  <p className="text-sm">
                    81 ilde binlerce üretici ve iş sahibine ulaşın.
                  </p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    7 Sektör
                  </h3>
                  <p className="text-sm">
                    Otomotiv, mobilya, tekstil, kimya, baskı, paketleme ve el
                    işi sektörlerinde hizmet.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Şirket Bilgileri
              </h2>
              <div className="bg-muted rounded-xl p-6">
                <p>
                  <strong>Şirket Unvanı:</strong> OSTHINKS YAZILIM A.Ş.
                </p>
                <p className="mt-2">
                  <strong>Platform:</strong> fasonbul.com
                </p>
                <p className="mt-2">
                  <strong>E-posta:</strong>{" "}
                  <a
                    href="mailto:info@fasonbul.com"
                    className="text-primary hover:underline"
                  >
                    info@fasonbul.com
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-border text-center">
            <p className="text-secondary mb-4">
              Sorularınız için bizimle iletişime geçin
            </p>
            <Link href="/iletisim" className="btn-primary">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
