"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Section } from "./ui/Section";
import { portfolioData } from "@/lib/data";
import { getSocialIcon } from "./icons/SocialIcons";

export function Contact() {
    const [personal, setPersonal] = useState(portfolioData.personal);
    const [social, setSocial] = useState(portfolioData.social);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch("/api/data", { cache: "no-store" });
                if (response.ok) {
                    const data = await response.json();
                    if (data.personal) setPersonal(data.personal);
                    if (data.social && data.social.length > 0) setSocial(data.social);
                }
            } catch (error) {
                console.error("Failed to load contact data:", error);
            }
        };
        loadData();
    }, []);

    const whatsappNumber = (personal as typeof personal & { whatsapp?: string }).whatsapp?.replace(/[^0-9]/g, "") || "5511999999999";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.")}`;

    return (
        <Section
            id="contato"
            title="Contato"
            subtitle="Vamos criar algo incrível juntos"
            variant="dark"
        >
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="space-y-10"
                >
                    {/* Social Links */}
                    <div className="text-center">
                        <p className="text-[#8A8A9A] text-sm mb-5 font-medium">Redes Sociais</p>
                        <div className="flex gap-3 justify-center">
                            {social.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        scale: 1.1,
                                        boxShadow: "0 0 25px rgba(188,210,0,0.25)",
                                    }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(14,14,26,0.9) 0%, rgba(6,6,16,0.95) 100%)",
                                        border: "1px solid rgba(188,210,0,0.15)",
                                        color: "#8A8A9A",
                                    }}
                                >
                                    <span className="text-xl transition-colors duration-200 group-hover:text-[#bcd200]">
                                        {getSocialIcon(item.name)}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <motion.div
                        className="relative p-8 md:p-10 rounded-2xl overflow-hidden text-center"
                        style={{
                            background: "linear-gradient(135deg, rgba(14,14,26,0.98) 0%, rgba(6,6,16,0.99) 100%)",
                            border: "1px solid rgba(37,211,102,0.15)",
                        }}
                    >
                        {/* Top glow */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(37,211,102,0.5), transparent)",
                            }}
                        />

                        <motion.span
                            className="text-5xl md:text-6xl inline-block mb-4"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            💬
                        </motion.span>

                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                            Pronto para o próximo jackpot?
                        </h3>
                        <p className="text-[#8A8A9A] text-sm md:text-base mb-8">
                            Vamos criar algo épico juntos. Clique abaixo e fale comigo direto no WhatsApp!
                        </p>

                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 0 40px rgba(37,211,102,0.35)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-base cursor-pointer transition-all relative overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                                color: "#fff",
                                boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                                }}
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                            />
                            <span className="relative z-10 flex items-center gap-3 text-lg">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Falar no WhatsApp
                            </span>
                        </motion.a>
                    </motion.div>

                    {/* Decorative element */}
                    <motion.div
                        className="relative p-5 rounded-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, rgba(188,210,0,0.05) 0%, rgba(6,6,16,0.9) 100%)",
                            border: "1px solid rgba(188,210,0,0.1)",
                        }}
                    >
                        <div className="flex items-center gap-4 justify-center">
                            <motion.span
                                className="text-3xl"
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                🎰
                            </motion.span>
                            <div>
                                <p className="text-white font-semibold text-sm">Resposta rápida garantida</p>
                                <p className="text-[#8A8A9A] text-xs">Normalmente respondo em poucos minutos</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
}
