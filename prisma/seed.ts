import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create AdminUser for separate admin authentication
  const adminUserPassword = await bcrypt.hash("Admin123!", 12);
  const adminUser = await prisma.adminUser.upsert({
    where: { email: "admin@fasonbul.com" },
    update: {},
    create: {
      email: "admin@fasonbul.com",
      name: "Site Admin",
      role: "ADMIN",
      passwordHash: adminUserPassword,
    },
  });
  console.log("AdminUser created:", adminUser.email);

  // Create admin user (legacy - for User table)
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@fasonbul.com" },
    update: {},
    create: {
      email: "admin@fasonbul.com",
      name: "Admin",
      role: "ADMIN",
      passwordHash: adminPassword,
    },
  });
  console.log("Admin user created:", admin.email);

  // Create a sample job owner
  const ownerPassword = await bcrypt.hash("test123", 12);
  const owner = await prisma.user.upsert({
    where: { email: "owner@test.com" },
    update: {},
    create: {
      email: "owner@test.com",
      name: "Ahmet Yılmaz",
      companyName: "Yılmaz Endüstri",
      role: "JOB_OWNER",
      phone: "5321234567",
      city: "istanbul",
      passwordHash: ownerPassword,
    },
  });
  console.log("Job owner created:", owner.email);

  // Create a sample manufacturer (Fason Üretici)
  const manufacturerPassword = await bcrypt.hash("test123", 12);
  const manufacturer = await prisma.user.upsert({
    where: { email: "manufacturer@test.com" },
    update: {},
    create: {
      email: "manufacturer@test.com",
      name: "Mehmet Demir",
      companyName: "Demir Üretim",
      role: "MANUFACTURER",
      phone: "5329876543",
      city: "bursa",
      passwordHash: manufacturerPassword,
    },
  });
  console.log("Fason Üretici created:", manufacturer.email);

  // Create sample active job listings with new sectors
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const jobs = [
    // Otomotiv
    {
      ownerId: owner.id,
      sector: "otomotiv",
      city: "istanbul",
      title: "Otomotiv plastik parça kalıp işi için fason üretici arıyoruz",
      description:
        "Otomotiv sektöründe kullanılacak plastik parçaların kalıp ve enjeksiyon işleri için deneyimli fason üretici arıyoruz. Yıllık 50.000 adet üretim kapasitesi gereklidir. ISO sertifikalı firmalar tercih edilecektir. Kalıplar tarafımızdan temin edilecektir.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "acil",
      status: "ACTIVE",
      isFeatured: true,
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "otomotiv",
      city: "kocaeli",
      title: "Araç koltuk kılıfı dikimi için atölye aranıyor",
      description:
        "Ticari araçlar için 1000 takım koltuk kılıfı diktirilecektir. Kumaş ve kalıp tarafımızdan sağlanacaktır. Dikiş kalitesine önem veren, referanslı firmalardan teklif bekliyoruz.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    // Mobilya
    {
      ownerId: owner.id,
      sector: "mobilya",
      city: "bursa",
      title: "Mobilya montaj ve paketleme işi için fason firma",
      description:
        "Ofis mobilyaları üretimimiz için montaj ve paketleme işlerini yapacak fason firma arıyoruz. Aylık ortalama 500 adet masa ve 1000 adet sandalye montajı yapılacaktır. Kendi tesisinde çalışabilecek firmalar tercih edilir.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      isFeatured: true,
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "mobilya",
      city: "kayseri",
      title: "Koltuk iskelet imalatı fason üretici arıyoruz",
      description:
        "Koltuk takımları için ahşap iskelet imalatı yaptırmak istiyoruz. Ayda 200 takım kapasiteli firmalardan teklif bekliyoruz. Malzeme tarafımızdan karşılanacaktır.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "acil",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    // Tekstil
    {
      ownerId: owner.id,
      sector: "tekstil",
      city: "denizli",
      title: "Havlu ve bornoz dokuma işi için tesis arıyoruz",
      description:
        "Otel grubu için aylık 10.000 adet havlu ve 2.000 adet bornoz dokutmak istiyoruz. Yüksek kalite standartlarına uygun üretim yapan tesislerden teklif bekliyoruz. İş süreklilik gösterecektir.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "cok-acil",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "tekstil",
      city: "gaziantep",
      title: "Kumaş boyama ve apre işleri için fason tesis",
      description:
        "Aylık 20 ton pamuklu kumaş boyama ve apre işlerimiz için fason tesis arıyoruz. Reaktif boya ile çalışabilecek, çevre sertifikalı tesisler tercih edilir.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    // Kimya
    {
      ownerId: owner.id,
      sector: "kimya",
      city: "izmir",
      title: "Kozmetik ürün dolumu için fason üretici",
      description:
        "Cilt bakım ürünlerimizin dolum ve paketleme işleri için GMP sertifikalı fason üretici arıyoruz. Aylık 50.000 adet üretim kapasitesi gerekmektedir. Formül tarafımızdan sağlanacaktır.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "acil",
      status: "ACTIVE",
      isFeatured: true,
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "kimya",
      city: "ankara",
      title: "Temizlik ürünleri üretimi fason iş",
      description:
        "Endüstriyel temizlik ürünleri üretimi için fason tesis arıyoruz. Karıştırma, dolum ve etiketleme işlemlerini yapabilecek kapasitede olmalıdır. Formülasyonlar hazır.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    // Baskı-Matbaa
    {
      ownerId: owner.id,
      sector: "baski-matbaa",
      city: "istanbul",
      title: "Karton kutu ve ambalaj baskısı için matbaa",
      description:
        "Gıda ürünlerimiz için karton kutu ve ambalaj baskısı yaptırmak istiyoruz. Aylık 100.000 adet kutu üretimi gerekli. Ofset ve flekso baskı yapabilen tesislerden teklif bekliyoruz.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "baski-matbaa",
      city: "konya",
      title: "Etiket baskısı fason iş",
      description:
        "Ürün etiketleri için fason baskı hizmeti arıyoruz. Çeşitli boyutlarda, yapışkanlı etiket baskısı yapılacaktır. Aylık yaklaşık 500.000 adet etiket ihtiyacımız var.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "acil",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    // Paketleme
    {
      ownerId: owner.id,
      sector: "paketleme",
      city: "antalya",
      title: "Gıda paketleme ve etiketleme hizmeti",
      description:
        "Kurutulmuş meyve ve kuruyemiş ürünlerimizin paketleme ve etiketleme işleri için fason üretici arıyoruz. Gıda güvenliği sertifikası olan tesisler tercih edilir. Aylık 20 ton ürün işlenecektir.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "cok-acil",
      status: "ACTIVE",
      isFeatured: true,
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "paketleme",
      city: "mersin",
      title: "Shrink ambalaj ve kolileme işi",
      description:
        "Pet şişe ürünlerimiz için shrink ambalaj ve kolileme işleri yapılacaktır. Günlük 10.000 adet kapasiteli tesislerden teklif bekliyoruz.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    // El İşi
    {
      ownerId: owner.id,
      sector: "el-isi",
      city: "istanbul",
      title: "El yapımı takı montajı için ev hanımları/atölyeler",
      description:
        "Takı markamız için boncuk dizimi ve montaj işleri yaptırmak istiyoruz. Evden çalışabilir veya atölye ortamında. Detaylı ve özenli çalışabilen kişi veya gruplardan teklif bekliyoruz. Malzeme tarafımızdan sağlanır.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
    {
      ownerId: owner.id,
      sector: "el-isi",
      city: "nevsehir",
      title: "Seramik boyama ve dekorlama işi",
      description:
        "Hediyelik seramik ürünlerimizin elle boyama ve dekorlama işleri için fason atölye arıyoruz. Kapadokya temalı tasarımlar yapılacaktır. Sanatsal yeteneği olan ekiplerden teklif bekliyoruz.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "acil",
      status: "ACTIVE",
      approvedAt: now,
      expiresAt,
    },
  ];

  for (const job of jobs) {
    await prisma.jobRequest.create({ data: job });
  }
  console.log("Sample jobs created:", jobs.length);

  // Create a pending job
  await prisma.jobRequest.create({
    data: {
      ownerId: owner.id,
      sector: "mobilya",
      city: "eskisehir",
      title: "Ahşap masa üretimi için fason atölye",
      description:
        "500 adet ahşap masa üretimi için fason atölye arıyoruz. Tasarım ve teknik çizimler hazır, malzeme temin edilebilir. Tecrübeli firmalardan teklif bekliyoruz. CNC kesim yapabilen atölyeler tercih edilir.",
      phone: "5321234567",
      whatsapp: "5321234567",
      urgency: "normal",
      status: "PENDING_APPROVAL",
    },
  });
  console.log("Sample pending job created");

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
