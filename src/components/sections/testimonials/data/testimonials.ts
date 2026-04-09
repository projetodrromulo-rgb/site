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
        name: "Clara M.",
        text: "O acompanhamento com a Dra. Ana transformou minha forma de lidar com a ansiedade. Hoje me sinto muito mais plena e no controle da minha vida.",
        rating: 5,
        location: "Rio de Janeiro, RJ",
    },
    {
        id: 2,
        name: "Ricardo S.",
        text: "A abordagem integrativa e o uso da hipnose me ajudaram a superar traumas que eu carregava há anos. Sou muito grato por todo o acolhimento.",
        rating: 5,
        location: "São Paulo, SP",
    },
    {
        id: 3,
        name: "Fernanda L.",
        text: "As sessões de psicoterapia e o trabalho com o Pathwork trouxeram uma clareza que eu nunca achei possível. Uma profissional excepcional.",
        rating: 5,
        location: "Belo Horizonte, MG",
    },
    {
        id: 4,
        name: "Patrícia G.",
        text: "Sempre me senti ouvida e compreendida. A Dra. Ana Maria tem uma sensibilidade única que faz toda a diferença no processo de cura.",
        rating: 5,
        location: "Salvador, BA",
    },
    {
        id: 5,
        name: "Juliana C.",
        text: "A integração entre a medicina e a psicoterapia me deu a segurança que eu precisava. O atendimento é humano, ético e transformador.",
        rating: 5,
        location: "Curitiba, PR",
    },
];
