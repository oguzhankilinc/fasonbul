import { Resend } from "resend";

// Lazy initialization of Resend client
let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[MAIL] RESEND_API_KEY not configured - emails will be skipped");
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

// Base URL for links in emails - normalized without trailing slash
function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BASE_URL || "https://fasonbul.com";
  return url.replace(/\/+$/, ""); // Remove trailing slashes
}

// Build absolute URL from path - handles leading slashes safely
function buildUrl(path: string): string {
  const base = getBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

// Email sender configuration
function getFromEmail(): string {
  return process.env.EMAIL_FROM || "FasonBul <noreply@fasonbul.com>";
}

// Shared email footer - called at runtime
function getEmailFooter(): string {
  return `
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
  <p style="color: #6b7280; font-size: 12px; margin: 0;">
    Bu e-posta FasonBul tarafindan gonderilmistir.<br />
    <a href="${getBaseUrl()}" style="color: #f97316;">fasonbul.com</a> - Turkiye'nin Fason Uretim Platformu
  </p>
`;
}

// Shared email wrapper - called at runtime
function wrapEmail(content: string): string {
  const logoUrl = buildUrl("/logo/fasonbul-logo.png");
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <img src="${logoUrl}" alt="FasonBul" style="height: 40px;" />
  </div>
  ${content}
  ${getEmailFooter()}
</body>
</html>
`;
}

// ============================================
// EMAIL TYPES
// ============================================

export type EmailResult = {
  success: boolean;
  error?: string;
};

// ============================================
// 1. WELCOME EMAIL
// ============================================
export async function sendWelcomeEmail(
  email: string,
  name: string,
  role: string
): Promise<EmailResult> {
  const isJobOwner = role === "JOB_OWNER";
  const roleText = isJobOwner ? "is sahibi" : "fason uretici";
  const actionText = isJobOwner
    ? "Hemen ilk ilaninizi olusturarak fason uretici aramaya baslayabilirsiniz."
    : "Aktif ilanlari inceleyerek sizin icin uygun fason is firsatlarini kesfedebilirsiniz.";

  const html = wrapEmail(`
    <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">
      Hos Geldiniz, ${name}!
    </h1>
    <p style="color: #374151; margin-bottom: 16px;">
      FasonBul'a ${roleText} olarak kaydiniz basariyla tamamlandi.
    </p>
    <p style="color: #374151; margin-bottom: 24px;">
      ${actionText}
    </p>
    <div style="margin-bottom: 24px;">
      <a href="${buildUrl("/hesap")}"
         style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Hesabima Git
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px;">
      FasonBul'da komisyon yok, araci yok. Dogrudan iletisim kurun, anlasmanizi yapin.
    </p>
  `);

  const resend = getResend();
  if (!resend) {
    console.log("[MAIL] Skipping welcome email - no API key configured");
    return { success: true }; // Don't block user flow
  }

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "FasonBul'a Hos Geldiniz!",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[MAIL] Welcome email failed:", error);
    return { success: false, error: String(error) };
  }
}

// ============================================
// 2. PASSWORD RESET EMAIL
// ============================================
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
): Promise<EmailResult> {
  const resetUrl = buildUrl(`/sifre-sifirla?token=${resetToken}`);

  const html = wrapEmail(`
    <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">
      Sifre Sifirlama
    </h1>
    <p style="color: #374151; margin-bottom: 16px;">
      Merhaba ${name},
    </p>
    <p style="color: #374151; margin-bottom: 24px;">
      FasonBul hesabiniz icin sifre sifirlama talebinde bulundunuz.
      Asagidaki butona tiklayarak yeni sifrenizi belirleyebilirsiniz.
    </p>
    <div style="margin-bottom: 24px;">
      <a href="${resetUrl}"
         style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Sifremi Sifirla
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
      Bu baglanti 1 saat icinde gecerliliğini yitirecektir.
    </p>
    <p style="color: #6b7280; font-size: 14px;">
      Eger bu istegi siz yapmadiysiniz, bu e-postayi dikkate almayiniz.
    </p>
    <p style="color: #9ca3af; font-size: 12px; margin-top: 24px; word-break: break-all;">
      Buton calismiyorsa bu linki kopyalayin: ${resetUrl}
    </p>
  `);

  const resend = getResend();
  if (!resend) {
    console.log("[MAIL] Skipping password reset email - no API key configured");
    console.log(`[MAIL] Reset URL would be: ${resetUrl}`);
    return { success: true }; // Don't block user flow
  }

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "FasonBul - Sifre Sifirlama",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[MAIL] Password reset email failed:", error);
    return { success: false, error: String(error) };
  }
}

// ============================================
// 3. JOB SUBMITTED (PENDING REVIEW) EMAIL
// ============================================
export async function sendJobSubmittedEmail(
  email: string,
  name: string,
  jobTitle: string
): Promise<EmailResult> {
  const html = wrapEmail(`
    <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">
      Ilaniniz Alindi
    </h1>
    <p style="color: #374151; margin-bottom: 16px;">
      Merhaba ${name},
    </p>
    <p style="color: #374151; margin-bottom: 8px;">
      <strong>"${jobTitle}"</strong> baslikli ilaniniz basariyla alindi ve incelemeye gonderildi.
    </p>
    <p style="color: #374151; margin-bottom: 24px;">
      Ekibimiz ilaninizi en kisa surede inceleyecek. Onay sonrasi ilan yayina alinacak ve size bilgi verilecektir.
    </p>
    <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        <strong>Not:</strong> Inceleme sureci genellikle 24 saat icinde tamamlanir.
      </p>
    </div>
    <div style="margin-bottom: 24px;">
      <a href="${buildUrl("/hesap/ilanlarim")}"
         style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Ilanlarimi Gor
      </a>
    </div>
  `);

  const resend = getResend();
  if (!resend) {
    console.log("[MAIL] Skipping job submitted email - no API key configured");
    return { success: true }; // Don't block user flow
  }

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "FasonBul - Ilaniniz Incelemede",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[MAIL] Job submitted email failed:", error);
    return { success: false, error: String(error) };
  }
}

// ============================================
// 4. JOB APPROVED (NOW LIVE) EMAIL
// ============================================
export async function sendJobApprovedEmail(
  email: string,
  name: string,
  jobTitle: string,
  jobId: string
): Promise<EmailResult> {
  const jobUrl = buildUrl(`/ilan/${jobId}`);

  const html = wrapEmail(`
    <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">
      Ilaniniz Yayinda!
    </h1>
    <p style="color: #374151; margin-bottom: 16px;">
      Merhaba ${name},
    </p>
    <p style="color: #374151; margin-bottom: 24px;">
      Tebrikler! <strong>"${jobTitle}"</strong> baslikli ilaniniz onaylandi ve artik yayinda.
    </p>
    <div style="background-color: #d1fae5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="color: #065f46; margin: 0; font-size: 14px;">
        Ilaniniz 30 gun boyunca aktif kalacaktir. Bu sure sonunda otomatik olarak pasife alinir.
      </p>
    </div>
    <div style="margin-bottom: 16px;">
      <a href="${jobUrl}"
         style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Ilanimi Goruntule
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px;">
      Ilaninizi hesabinizdan istediginiz zaman duzenleyebilir veya pasife alabilirsiniz.
    </p>
  `);

  const resend = getResend();
  if (!resend) {
    console.log("[MAIL] Skipping job approved email - no API key configured");
    return { success: true }; // Don't block user flow
  }

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "FasonBul - Ilaniniz Yayinda!",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[MAIL] Job approved email failed:", error);
    return { success: false, error: String(error) };
  }
}

// ============================================
// 5. JOB REJECTED EMAIL
// ============================================
export async function sendJobRejectedEmail(
  email: string,
  name: string,
  jobTitle: string
): Promise<EmailResult> {
  const html = wrapEmail(`
    <h1 style="color: #111827; font-size: 24px; margin-bottom: 16px;">
      Ilaniniz Hakkinda
    </h1>
    <p style="color: #374151; margin-bottom: 16px;">
      Merhaba ${name},
    </p>
    <p style="color: #374151; margin-bottom: 24px;">
      <strong>"${jobTitle}"</strong> baslikli ilaniniz inceleme sonucunda yayinlanamadi.
    </p>
    <div style="background-color: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="color: #991b1b; margin: 0 0 8px 0; font-size: 14px;">
        <strong>Olasi nedenler:</strong>
      </p>
      <ul style="color: #991b1b; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Ilan icerigi yeterince aciklayici olmayabilir</li>
        <li>Iletisim bilgileri eksik veya hatali olabilir</li>
        <li>Ilan kurallarina uygun olmayan icerik bulunabilir</li>
      </ul>
    </div>
    <p style="color: #374151; margin-bottom: 24px;">
      Ilaninizi duzenleyerek tekrar gonderebilirsiniz. Duzenlediginizde otomatik olarak yeniden incelemeye alinacaktir.
    </p>
    <div style="margin-bottom: 24px;">
      <a href="${buildUrl("/hesap/ilanlarim")}"
         style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
        Ilanimi Duzenle
      </a>
    </div>
    <p style="color: #6b7280; font-size: 14px;">
      Sorulariniz icin info@fasonbul.com adresinden bize ulasabilirsiniz.
    </p>
  `);

  const resend = getResend();
  if (!resend) {
    console.log("[MAIL] Skipping job rejected email - no API key configured");
    return { success: true }; // Don't block user flow
  }

  try {
    await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "FasonBul - Ilaniniz Hakkinda Bilgilendirme",
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("[MAIL] Job rejected email failed:", error);
    return { success: false, error: String(error) };
  }
}
