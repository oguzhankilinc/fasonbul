// Main sectors - exactly 7 as specified
export const SECTORS = [
  { value: "otomotiv", label: "Otomotiv", icon: "🚗" },
  { value: "mobilya", label: "Mobilya", icon: "🪑" },
  { value: "tekstil", label: "Tekstil", icon: "🧵" },
  { value: "kimya", label: "Kimya", icon: "🧪" },
  { value: "baski-matbaa", label: "Baskı – Matbaa", icon: "🖨️" },
  { value: "paketleme", label: "Paketleme", icon: "📦" },
  { value: "el-isi", label: "El İşi", icon: "✋" },
] as const;

export const CITIES = [
  { value: "adana", label: "Adana" },
  { value: "adiyaman", label: "Adıyaman" },
  { value: "afyonkarahisar", label: "Afyonkarahisar" },
  { value: "agri", label: "Ağrı" },
  { value: "aksaray", label: "Aksaray" },
  { value: "amasya", label: "Amasya" },
  { value: "ankara", label: "Ankara" },
  { value: "antalya", label: "Antalya" },
  { value: "ardahan", label: "Ardahan" },
  { value: "artvin", label: "Artvin" },
  { value: "aydin", label: "Aydın" },
  { value: "balikesir", label: "Balıkesir" },
  { value: "bartin", label: "Bartın" },
  { value: "batman", label: "Batman" },
  { value: "bayburt", label: "Bayburt" },
  { value: "bilecik", label: "Bilecik" },
  { value: "bingol", label: "Bingöl" },
  { value: "bitlis", label: "Bitlis" },
  { value: "bolu", label: "Bolu" },
  { value: "burdur", label: "Burdur" },
  { value: "bursa", label: "Bursa" },
  { value: "canakkale", label: "Çanakkale" },
  { value: "cankiri", label: "Çankırı" },
  { value: "corum", label: "Çorum" },
  { value: "denizli", label: "Denizli" },
  { value: "diyarbakir", label: "Diyarbakır" },
  { value: "duzce", label: "Düzce" },
  { value: "edirne", label: "Edirne" },
  { value: "elazig", label: "Elazığ" },
  { value: "erzincan", label: "Erzincan" },
  { value: "erzurum", label: "Erzurum" },
  { value: "eskisehir", label: "Eskişehir" },
  { value: "gaziantep", label: "Gaziantep" },
  { value: "giresun", label: "Giresun" },
  { value: "gumushane", label: "Gümüşhane" },
  { value: "hakkari", label: "Hakkari" },
  { value: "hatay", label: "Hatay" },
  { value: "igdir", label: "Iğdır" },
  { value: "isparta", label: "Isparta" },
  { value: "istanbul", label: "İstanbul" },
  { value: "izmir", label: "İzmir" },
  { value: "kahramanmaras", label: "Kahramanmaraş" },
  { value: "karabuk", label: "Karabük" },
  { value: "karaman", label: "Karaman" },
  { value: "kars", label: "Kars" },
  { value: "kastamonu", label: "Kastamonu" },
  { value: "kayseri", label: "Kayseri" },
  { value: "kilis", label: "Kilis" },
  { value: "kirikkale", label: "Kırıkkale" },
  { value: "kirklareli", label: "Kırklareli" },
  { value: "kirsehir", label: "Kırşehir" },
  { value: "kocaeli", label: "Kocaeli" },
  { value: "konya", label: "Konya" },
  { value: "kutahya", label: "Kütahya" },
  { value: "malatya", label: "Malatya" },
  { value: "manisa", label: "Manisa" },
  { value: "mardin", label: "Mardin" },
  { value: "mersin", label: "Mersin" },
  { value: "mugla", label: "Muğla" },
  { value: "mus", label: "Muş" },
  { value: "nevsehir", label: "Nevşehir" },
  { value: "nigde", label: "Niğde" },
  { value: "ordu", label: "Ordu" },
  { value: "osmaniye", label: "Osmaniye" },
  { value: "rize", label: "Rize" },
  { value: "sakarya", label: "Sakarya" },
  { value: "samsun", label: "Samsun" },
  { value: "sanliurfa", label: "Şanlıurfa" },
  { value: "siirt", label: "Siirt" },
  { value: "sinop", label: "Sinop" },
  { value: "sirnak", label: "Şırnak" },
  { value: "sivas", label: "Sivas" },
  { value: "tekirdag", label: "Tekirdağ" },
  { value: "tokat", label: "Tokat" },
  { value: "trabzon", label: "Trabzon" },
  { value: "tunceli", label: "Tunceli" },
  { value: "usak", label: "Uşak" },
  { value: "van", label: "Van" },
  { value: "yalova", label: "Yalova" },
  { value: "yozgat", label: "Yozgat" },
  { value: "zonguldak", label: "Zonguldak" },
] as const;

export const JOB_STATUS = {
  DRAFT: "DRAFT",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  ACTIVE: "ACTIVE",
  PASSIVE: "PASSIVE",
  EXPIRED: "EXPIRED",
  REJECTED: "REJECTED",
} as const;

export const USER_ROLE = {
  JOB_OWNER: "JOB_OWNER",
  MANUFACTURER: "MANUFACTURER",
  ADMIN: "ADMIN",
} as const;

// User role labels for UI - using "Fason Üretici" instead of generic "Üretici"
export const USER_ROLE_LABELS: Record<string, string> = {
  JOB_OWNER: "İş Sahibi",
  MANUFACTURER: "Fason Üretici",
  ADMIN: "Admin",
};

export const ACTION_TYPE = {
  PHONE_VIEW: "PHONE_VIEW",
  WHATSAPP_CLICK: "WHATSAPP_CLICK",
} as const;

export const URGENCY_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "acil", label: "Acil" },
  { value: "cok-acil", label: "Çok Acil" },
] as const;

// Pagination
export const ITEMS_PER_PAGE = 12;
export const FEATURED_PER_SECTOR = 10;
export const MAX_FEATURED_TOTAL = 70;

export type Sector = (typeof SECTORS)[number]["value"];
export type City = (typeof CITIES)[number]["value"];
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type ActionType = (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];

export function getSectorLabel(value: string): string {
  return SECTORS.find((s) => s.value === value)?.label || value;
}

export function getSectorIcon(value: string): string {
  return SECTORS.find((s) => s.value === value)?.icon || "📋";
}

export function getCityLabel(value: string): string {
  return CITIES.find((c) => c.value === value)?.label || value;
}

export function getUrgencyLabel(value: string): string {
  return URGENCY_OPTIONS.find((u) => u.value === value)?.label || value;
}

export function getUserRoleLabel(role: string): string {
  return USER_ROLE_LABELS[role] || role;
}
