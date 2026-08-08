export interface Testimonial {
    id: number;
    name: string;
    text: string;
    rating: number;
    location: string;
}

export const allTestimonials: Testimonial[] = [
    {
        id: 1,
        name: "Clezio F.",
        text: "Muito bom! Equipe ótima e muito atenciosos.",
        rating: 5,
        location: "Google Reviews",
    },
    {
        id: 2,
        name: "Rosangela C.",
        text: "O Dr. Rômulo tratou minha coluna com excelência! Realizou um procedimento de radiofrequência para denervação lombar, com melhora significativa das dores. Médico extremamente atencioso e dedicado.",
        rating: 5,
        location: "Google Reviews",
    },
    {
        id: 3,
        name: "Christopher S. T.",
        text: "Gostaria de agradecer ao Dr. Rômulo e a toda a sua equipe pelo carinho e atenção recebidos desde a marcação até o pós-operatório da cirurgia. Todo o cuidado prestado foi impecável.",
        rating: 5,
        location: "Google Reviews · Local Guide",
    },
    {
        id: 4,
        name: "André A.",
        text: "Fiz um procedimento de denervação na coluna com o Dr. Rômulo e me sinto muito melhor e sem dores. O procedimento foi super tranquilo com alta no mesmo dia. Equipe nota 10, recomendo demais!",
        rating: 5,
        location: "Google Reviews",
    },
];
