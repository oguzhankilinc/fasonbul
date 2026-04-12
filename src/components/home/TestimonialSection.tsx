import Image from "next/image";

interface Testimonial {
  name: string;
  company: string;
  city: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Mehmet Yılmaz",
    company: "Yılmaz Mobilya",
    city: "Bursa",
    quote:
      "3 gün içinde doğru üreticiyi bulduk. Daha önce haftalarca telefon açıyorduk, şimdi ilanı veriyoruz, üreticiler bize ulaşıyor.",
    avatar: "/avatars/avatar-1.svg",
  },
  {
    name: "Ayşe Kaya",
    company: "Kaya Tekstil",
    city: "Denizli",
    quote:
      "Komisyon yok, aracı yok derken inanmamıştık. Gerçekten ücretsiz ve direkt üreticiyle anlaştık. Çok memnunuz.",
    avatar: "/avatars/avatar-2.svg",
  },
  {
    name: "Ali Demir",
    company: "Demir Otomotiv",
    city: "Kocaeli",
    quote:
      "Acil bir siparişimiz vardı, FasonBul sayesinde aynı gün 4 farklı atölyeden teklif aldık. İş hayatımızı kolaylaştırdı.",
    avatar: "/avatars/avatar-3.svg",
  },
];

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-lg">
      {initials}
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Kullanıcılarımız Ne Diyor?
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Binlerce iş sahibi ve üretici FasonBul&apos;u tercih ediyor
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-primary/20 mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-secondary text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <AvatarPlaceholder name={testimonial.name} />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-secondary">
                    {testimonial.company} • {testimonial.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-10">
          <p className="text-sm text-secondary">
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-4 h-4 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Türkiye genelinde 1000+ başarılı eşleşme
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
