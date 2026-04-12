import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | FasonBul",
  description:
    "FasonBul KVKK Aydınlatma Metni. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında haklarınız ve veri işleme süreçlerimiz hakkında bilgi edinin.",
};

export default function KVKKPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-secondary mb-6">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">KVKK Aydınlatma Metni</span>
        </nav>

        <div className="card">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-secondary mb-2">
            6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
          </p>
          <p className="text-secondary mb-8">
            Son güncelleme: 1 Ocak 2026
          </p>

          <div className="prose prose-sm max-w-none text-secondary space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                1. Veri Sorumlusu
              </h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
                uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla
                aşağıda bilgileri verilen şirketimiz tarafından işlenmektedir:
              </p>
              <div className="mt-3 p-4 bg-muted rounded-xl">
                <p><strong>Şirket Unvanı:</strong> OSTHINKS YAZILIM A.Ş.</p>
                <p className="mt-1"><strong>E-posta:</strong> info@fasonbul.com</p>
                <p className="mt-1"><strong>Platform:</strong> fasonbul.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                2. İşlenen Kişisel Veriler
              </h2>
              <p>
                FasonBul platformu üzerinden aşağıdaki kişisel verileriniz
                işlenmektedir:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, şehir</li>
                <li><strong>Şirket Bilgileri:</strong> Şirket/işletme unvanı</li>
                <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifreli parola</li>
                <li><strong>İşlem Bilgileri:</strong> İlan içerikleri, iş talepleri</li>
                <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı bilgileri, oturum verileri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                3. Kişisel Verilerin İşlenme Amaçları
              </h2>
              <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Üyelik işlemlerinin gerçekleştirilmesi</li>
                <li>Platform hizmetlerinin sunulması</li>
                <li>İlan yayınlama ve yönetim süreçlerinin yürütülmesi</li>
                <li>İş sahipleri ile fason üreticiler arasında iletişim sağlanması</li>
                <li>Kullanıcı taleplerinin karşılanması</li>
                <li>Platform güvenliğinin sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Hizmet kalitesinin iyileştirilmesi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                4. Kişisel Verilerin İşlenmesinin Hukuki Sebepleri
              </h2>
              <p>
                Kişisel verileriniz, KVKK&apos;nın 5. ve 6. maddelerinde belirtilen
                aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Açık rızanızın bulunması</li>
                <li>Sözleşmenin kurulması ve ifası için gerekli olması</li>
                <li>Hukuki yükümlülüğün yerine getirilmesi</li>
                <li>Meşru menfaatlerimiz için zorunlu olması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                5. Kişisel Verilerin Aktarılması
              </h2>
              <p>
                Kişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda
                ve KVKK&apos;nın 8. ve 9. maddelerine uygun olarak:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Yasal zorunluluklar kapsamında kamu kurum ve kuruluşlarına</li>
                <li>Teknik altyapı hizmeti aldığımız iş ortaklarına</li>
                <li>Hukuki süreçlerde avukatlar ve danışmanlara</li>
              </ul>
              <p className="mt-2">aktarılabilmektedir.</p>
              <p className="mt-3 font-medium text-foreground">
                İlan bilgileriniz, platformun doğası gereği diğer kullanıcılar
                tarafından görüntülenebilir. Bu bilgilerin paylaşımı, hizmetin
                sunulması için zorunludur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                6. Kişisel Verilerin Toplanma Yöntemi
              </h2>
              <p>Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Platform üzerinden yapılan kayıt ve form işlemleri</li>
                <li>İlan oluşturma ve düzenleme süreçleri</li>
                <li>Çerezler ve otomatik veri toplama teknolojileri</li>
                <li>E-posta ve iletişim kanalları</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                7. KVKK Kapsamındaki Haklarınız
              </h2>
              <p>
                KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>
                  Kişisel verilerinizin işlenme amacını ve bunların amacına
                  uygun kullanılıp kullanılmadığını öğrenme
                </li>
                <li>
                  Yurt içinde veya yurt dışında kişisel verilerinizin
                  aktarıldığı üçüncü kişileri bilme
                </li>
                <li>
                  Kişisel verilerinizin eksik veya yanlış işlenmiş olması
                  hâlinde bunların düzeltilmesini isteme
                </li>
                <li>
                  KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde
                  kişisel verilerinizin silinmesini veya yok edilmesini isteme
                </li>
                <li>
                  Düzeltme, silme veya yok etme işlemlerinin kişisel
                  verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme
                </li>
                <li>
                  İşlenen verilerinizin münhasıran otomatik sistemler
                  vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun
                  ortaya çıkmasına itiraz etme
                </li>
                <li>
                  Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle
                  zarara uğramanız hâlinde zararın giderilmesini talep etme
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                8. Başvuru Yöntemi
              </h2>
              <p>
                Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki
                yöntemlerle başvurabilirsiniz:
              </p>
              <div className="mt-3 p-4 bg-muted rounded-xl">
                <p>
                  <strong>E-posta:</strong>{" "}
                  <a
                    href="mailto:info@fasonbul.com"
                    className="text-primary hover:underline"
                  >
                    info@fasonbul.com
                  </a>
                </p>
                <p className="mt-2 text-sm">
                  Başvurunuzda kimliğinizi tespit edici bilgiler, kullanmak
                  istediğiniz hak ve talebinizin detayları yer almalıdır.
                </p>
              </div>
              <p className="mt-3">
                Başvurularınız en geç 30 gün içinde ücretsiz olarak
                sonuçlandırılacaktır. İşlemin ayrıca bir maliyet gerektirmesi
                hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen
                tarifedeki ücret alınabilir.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                9. Değişiklikler
              </h2>
              <p>
                Bu aydınlatma metni, yasal düzenlemeler veya veri işleme
                süreçlerimizdeki değişiklikler doğrultusunda güncellenebilir.
                Güncel metin her zaman bu sayfada yayınlanacaktır.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
