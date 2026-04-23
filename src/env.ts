import WhatsAppButton from "./components/WhatsAppButton";

type EnvResponse = {
  whatsAppNumber: string | undefined;
  instagramUrl: string | undefined;
}

export const env = ((): EnvResponse => {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;

  return {
    whatsAppNumber,
    instagramUrl
  }
})