import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Şartları | FasonBul",
  description:
    "FasonBul kullanım şartları ve koşulları. Platform kuralları, kullanıcı yükümlülükleri ve hizmet şartları hakkında bilgi edinin.",
};

export default function KullanimSartlariPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Kullanım Şartları</span>
        </nav>

        <div className="card">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Kullanım Şartları
          </h1>
          <p className="text-secondary mb-8">
            Son güncelleme: 1 Ocak 2026
          </p>

          <div className="prose prose-sm max-w-none text-secondary space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Genel Hükümler
              </h2>
              <p>
                Bu kullanım şartları, FasonBul platformunu (fasonbul.com)
                kullanımınızı düzenlemektedir. Platformu kullanarak bu şartları
                kabul etmiş sayılırsınız.
              </p>
              <p className="mt-2">
                FasonBul, OSTHINKS YAZILIM A.Ş. tarafından işletilen bir fason
                üretim iş ilanları platformudur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. Hizmet Tanımı
              </h2>
              <p>
                FasonBul, iş sahipleri ile fason üreticileri bir araya getiren
                bir platformdur. Platform aracılığıyla:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>İş sahipleri fason üretim talepleri yayınlayabilir</li>
                <li>Fason üreticiler iş ilanlarını görüntüleyebilir</li>
                <li>Taraflar doğrudan iletişime geçebilir</li>
              </ul>
              <p className="mt-3 font-medium text-foreground">
                FasonBul, taraflar arasında aracılık yapmaz ve komisyon almaz.
                İşlemler doğrudan taraflar arasında gerçekleşir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Kullanıcı Yükümlülükleri
              </h2>
              <p>Platform kullanıcıları aşağıdaki yükümlülüklere uymayı kabul eder:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Doğru ve güncel bilgi sağlamak</li>
                <li>Hesap bilgilerini gizli tutmak</li>
                <li>Platformu yasal amaçlarla kullanmak</li>
                <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                <li>Spam veya yanıltıcı içerik paylaşmamak</li>
                <li>Platform güvenliğini tehlikeye atacak eylemlerden kaçınmak</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. İlan Kuralları
              </h2>
              <p>Yayınlanan ilanlar aşağıdaki kurallara uygun olmalıdır:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>İlanlar gerçek fason üretim taleplerine yönelik olmalıdır</li>
                <li>Yanıltıcı veya sahte bilgi içermemelidir</li>
                <li>Yasal olmayan ürün veya hizmetlere yönelik olmamalıdır</li>
                <li>Uygun sektör kategorisi seçilmelidir</li>
                <li>İletişim bilgileri doğru olmalıdır</li>
              </ul>
              <p className="mt-3">
                FasonBul, kurallara uymayan ilanları yayından kaldırma ve
                kullanıcı hesaplarını askıya alma hakkını saklı tutar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. İlan Onay Süreci
              </h2>
              <p>
                Tüm ilanlar yayınlanmadan önce FasonBul ekibi tarafından
                incelenir. Onaylanan ilanlar belirli bir süre (varsayılan 30
                gün) boyunca yayında kalır. Süresi dolan ilanlar otomatik olarak
                pasif duruma geçer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Sorumluluk Reddi
              </h2>
              <p>
                FasonBul, kullanıcılar arasındaki iş ilişkilerinden, anlaşmalardan
                veya anlaşmazlıklardan sorumlu değildir. Platform yalnızca
                tarafların buluşmasını sağlayan bir araçtır.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>İlan içeriklerinin doğruluğu ilan sahibinin sorumluluğundadır</li>
                <li>Taraflar arası ticari ilişkiler platformdan bağımsızdır</li>
                <li>Ödeme ve teslimat konuları taraflar arasında çözülür</li>
                <li>Platform kesintileri için sorumluluk kabul edilmez</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. Fikri Mülkiyet
              </h2>
              <p>
                FasonBul platformunun tasarımı, logosu, içeriği ve yazılımı
                OSTHINKS YAZILIM A.Ş.&apos;nin mülkiyetindedir. İzinsiz kullanım,
                kopyalama veya dağıtım yasaktır.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Hesap Sonlandırma
              </h2>
              <p>
                Kullanıcılar istedikleri zaman hesaplarını kapatabilir.
                FasonBul, kullanım şartlarını ihlal eden hesapları önceden
                bildirimde bulunmaksızın askıya alabilir veya sonlandırabilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Değişiklikler
              </h2>
              <p>
                Bu kullanım şartları zaman zaman güncellenebilir. Önemli
                değişiklikler platformda duyurulacaktır. Değişikliklerden
                sonra platformu kullanmaya devam etmeniz, yeni şartları kabul
                ettiğiniz anlamına gelir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                10. Uygulanacak Hukuk
              </h2>
              <p>
                Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir.
                Uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri
                yetkilidir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                11. İletişim
              </h2>
              <p>
                Kullanım şartlarıyla ilgili sorularınız için:
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
          </div>
        </div>
      </div>
    </div>
  );
}
