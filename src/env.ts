import WhatsAppButton from "./components/WhatsAppButton";

type EnvResponse = {
  whatsAppNumber: string;
  instagramUrl: string | undefined;
  ctaWhatsappText: string;
  revalidate: number;
}

export const env = ((): EnvResponse => {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5531996689572";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const ctaWhatsappText = process.env.NEXT_PUBLIC_CTA_WHATSAPP_TEXT || "";
  const revalidate = Number(process.env.SANITY_REVALIDATE_TIME) || 3600;

  return {
    whatsAppNumber,
    instagramUrl,
    ctaWhatsappText,
    revalidate
  };

})