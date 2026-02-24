'use client';

export function ThemedTable({ headers, data, onAction }: { headers: string[], data: any[], onAction?: (id: string) => void }) {
    return (
        <div className="bg-white border border-[#E6E6E6] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#F8F8F8] border-b border-[#E6E6E6]">
                        <tr>
                            {headers.map((h, i) => (
                                <th key={i} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#666666]">
                                    {h}
                                </th>
                            ))}
                            {onAction && <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#666666] text-right text-transparent">Ações</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E6E6]">
                        {data.map((row, i) => (
                            <tr key={i} className="hover:bg-[#F2F4F7] transition-colors group">
                                {Object.values(row).map((val: any, j) => (
                                    <td key={j} className="px-6 py-5 text-sm font-medium text-[#232323]">
                                        {val}
                                    </td>
                                ))}
                                {onAction && (
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => onAction(row.id)}
                                            className="text-[#0088C8] font-bold text-xs hover:underline uppercase tracking-tighter"
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function ThemedField({ label, placeholder, error, type = "text" }: { label: string; placeholder: string; error?: string; type?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-black text-[#232323] uppercase tracking-widest">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className={`input-simples ${error ? 'border-red-500 ring-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-[10px] font-bold uppercase">{error}</p>}
        </div>
    );
}
