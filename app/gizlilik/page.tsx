import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | FasonBul",
  description:
    "FasonBul gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinin.",
};

export default function GizlilikPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Gizlilik Politikası</span>
        </nav>

        <div className="card">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gizlilik Politikası
          </h1>
          <p className="text-secondary mb-8">
            Son güncelleme: 1 Ocak 2026
          </p>

          <div className="prose prose-sm max-w-none text-secondary space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Giriş
              </h2>
              <p>
                FasonBul olarak, kullanıcılarımızın gizliliğine önem veriyoruz.
                Bu Gizlilik Politikası, platformumuzu kullanırken toplanan
                kişisel verilerin nasıl işlendiğini, saklandığını ve
                korunduğunu açıklamaktadır.
              </p>
              <p className="mt-2">
                FasonBul, OSTHINKS YAZILIM A.Ş. tarafından işletilmektedir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Toplanan Veriler
              </h2>
              <p>Platformumuzda aşağıdaki kişisel veriler toplanabilir:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Ad, soyad ve şirket unvanı</li>
                <li>E-posta adresi</li>
                <li>Telefon numarası</li>
                <li>Şehir bilgisi</li>
                <li>İlan içerikleri ve iş talepleri</li>
                <li>IP adresi ve tarayıcı bilgileri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Verilerin Kullanım Amaçları
              </h2>
              <p>Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Kullanıcı hesabı oluşturma ve yönetimi</li>
                <li>İlan yayınlama ve eşleştirme hizmetleri</li>
                <li>İş sahipleri ile fason üreticiler arasında iletişim sağlama</li>
                <li>Platform güvenliğinin sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Hizmet kalitesinin iyileştirilmesi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Çerezler (Cookies)
              </h2>
              <p>
                FasonBul, kullanıcı deneyimini geliştirmek için çerezler
                kullanmaktadır. Çerezler, oturum yönetimi ve site
                tercihlerinizin hatırlanması için kullanılır. Tarayıcı
                ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Veri Güvenliği
              </h2>
              <p>
                Kişisel verilerinizi korumak için endüstri standardı güvenlik
                önlemleri uygulamaktayız. Verileriniz şifreli bağlantılar
                (SSL/TLS) üzerinden iletilmekte ve güvenli sunucularda
                saklanmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Üçüncü Taraflarla Paylaşım
              </h2>
              <p>
                Kişisel verileriniz, yasal zorunluluklar dışında üçüncü
                taraflarla paylaşılmaz. İlan bilgileriniz, platformun doğası
                gereği diğer kullanıcılar tarafından görüntülenebilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Veri Saklama Süresi
              </h2>
              <p>
                Kişisel verileriniz, hizmet sunumu için gerekli olan süre
                boyunca ve yasal yükümlülüklerimiz çerçevesinde saklanır.
                Hesabınızı silmeniz halinde verileriniz makul süre içinde
                sistemlerimizden kaldırılır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Haklarınız
              </h2>
              <p>
                KVKK kapsamındaki haklarınız için{" "}
                <Link href="/kvkk" className="text-primary hover:underline">
                  KVKK Aydınlatma Metni
                </Link>{" "}
                sayfamızı inceleyebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. İletişim
              </h2>
              <p>
                Gizlilik politikamızla ilgili sorularınız için bizimle
                iletişime geçebilirsiniz:
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
              <p className="mt-1">
                <strong>Şirket:</strong> OSTHINKS YAZILIM A.Ş.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Değişiklikler
              </h2>
              <p>
                Bu gizlilik politikası zaman zaman güncellenebilir.
                Değişiklikler bu sayfada yayınlanacak ve önemli değişiklikler
                için kullanıcılarımız bilgilendirilecektir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
