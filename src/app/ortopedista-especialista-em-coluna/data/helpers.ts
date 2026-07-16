export function getAboutParagraphs(locationPrefix: string, clinicName: string): string[] {
  return [
    `Sou o Dr. Rômulo Oliveira, Médico Ortopedista Especialista em Coluna ${locationPrefix}. Minha missão é tratar condições como hérnia de disco e ciatalgia, devolvendo sua mobilidade e bem-estar através de medicina baseada em evidências.`,
    `Minha Trajetória e Abordagem:`,
    `✅ Formação Sólida: Especialista pela SBOT com fellowship em Cirurgia da Coluna (Hospital da Baleia).`,
    `✅ Tratamento Moderno: Foco em abordagens conservadoras e cirurgias minimamente invasivas para uma recuperação segura.`,
    `✅ Local de Atendimento: ${clinicName}.`
  ];
}

export function getCtaOverride(locationPrefix: string) {
  return {
    title: "Precisa de uma avaliação médica especializada?",
    description: `Agende sua consulta com um especialista em coluna ${locationPrefix} e dê o primeiro passo para o seu tratamento adequado.`
  };
}

export function getHeroDescription(locationPrefix: string, clinicLocation: string) {
  return `Médico Ortopedista Especialista em Coluna ${locationPrefix}. Especialista em cirurgia de coluna minimamente invasiva com foco em rápida recuperação, alívio da dor e atendimento humanizado. Avaliações disponíveis ${clinicLocation}.`;
}

export function getHeroCtaText(locationPrefix: string) {
  return `Agendar Consulta ${locationPrefix}`;
}
