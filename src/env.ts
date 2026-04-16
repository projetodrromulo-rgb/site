import WhatsAppButton from "./components/WhatsAppButton";

type EnvResponse = {
  whatsAppNumber: string;
}

export const env = ((): EnvResponse => {
  const whatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5531996689572";

  return {
    whatsAppNumber
  }
})