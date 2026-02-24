export default function Hero({ title, subtitle, ctaText }: { title: string; subtitle: string; ctaText: string }) {
    return (
        <section className="bg-white section-padding text-center">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#232323] leading-tight tracking-tight">
                    {title}
                </h1>
                <p className="text-xl text-[#666666] font-medium leading-relaxed max-w-2xl mx-auto">
                    {subtitle}
                </p>
                <div className="pt-4">
                    <button className="btn-primary text-lg px-12 py-5 shadow-xl shadow-[#0088C8]/20">
                        {ctaText}
                    </button>
                    <p className="mt-4 text-xs font-bold text-[#666666] uppercase tracking-widest">
                        TESTE GRÁTIS POR 35 DIAS • SEM CARTÃO DE CRÉDITO
                    </p>
                </div>
            </div>

            {/* Visual Placeholder (Estilo Imagem do Produto) */}
            <div className="mt-16 max-w-5xl mx-auto px-4">
                <div className="bg-[#F2F4F7] rounded-2xl aspect-video border border-[#E6E6E6] shadow-2xl flex items-center justify-center p-8">
                    <div className="bg-white w-full h-full rounded-xl shadow-inner border border-[#E6E6E6] flex flex-col p-4 md:p-8 space-y-4">
                        <div className="w-1/3 h-6 bg-[#0088C8]/10 rounded-full" />
                        <div className="grid grid-cols-4 gap-4">
                            <div className="h-24 bg-[#F8F8F8] rounded-lg" />
                            <div className="h-24 bg-[#F8F8F8] rounded-lg" />
                            <div className="h-24 bg-[#F8F8F8] rounded-lg" />
                            <div className="h-24 bg-[#F8F8F8] rounded-lg" />
                        </div>
                        <div className="flex-1 bg-[#F8F8F8] rounded-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
}
