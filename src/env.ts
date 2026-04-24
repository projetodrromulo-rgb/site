import WhatsAppButton from "./components/WhatsAppButton";

type EnvResponse = {
  whatsAppNumber: string;
  instagramUrl: string | undefined;
}

export const env = ((): EnvResponse => {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5531996689572";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return {
    whatsAppNumber,
    instagramUrl
  }
})