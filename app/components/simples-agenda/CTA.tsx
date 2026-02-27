export default function CTA({ title, buttonText }: { title: string; buttonText: string }) {
    return (
        <section className="bg-[#0088C8] section-padding text-center">
            <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                    {title}
                </h2>
                <button className="bg-white text-[#0088C8] hover:bg-[#F2F4F7] font-black text-lg py-5 px-12 rounded-lg shadow-2xl transition-all active:scale-95 uppercase tracking-wider">
                    {buttonText}
                </button>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                    Sem compromisso • Teste todas as funções
                </p>
            </div>
        </section>
    );
}
