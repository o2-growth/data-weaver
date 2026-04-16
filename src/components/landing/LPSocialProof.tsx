const segments = [
  "Indústria",
  "Varejo",
  "Serviços B2B",
  "Tecnologia",
  "Saúde",
  "Construção Civil",
  "Agronegócio",
  "Educação",
  "Logística",
  "Franquias",
  "E-commerce",
  "Alimentação",
];

export function LPSocialProof() {
  const list = [...segments, ...segments];
  return (
    <section className="relative py-16 bg-[#0D0D0D] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7EBF8E]">
          Aplicável a empresas de qualquer porte e segmento
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-3 w-max animate-marquee"
          style={{ willChange: "transform" }}
        >
          {list.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#606060] text-sm whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent" />
      </div>
    </section>
  );
}
