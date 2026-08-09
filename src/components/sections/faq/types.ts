export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
  cityName?: string;
  whatsAppNumber?: string;
}
