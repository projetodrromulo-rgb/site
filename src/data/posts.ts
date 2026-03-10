export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    author: string;
    authorRole: string;
}

export const allPosts: Post[] = [
    {
        slug: "importancia-check-up-anual",
        title: "A importância do check-up anual para longevidade",
        excerpt: "Entenda por que exames preventivos são a base de uma vida saudável e quais os principais indicadores...",
        content: `
            <p>O check-up anual é muito mais do que uma bateria de exames de rotina. É uma ferramenta estratégica para monitorar sua saúde e detectar precocemente possíveis alterações no organismo.</p>
            <h2>Por que fazer?</h2>
            <p>A detecção antecipada de doenças como hipertensão, diabetes e alterações cardíacas aumenta drasticamente as chances de sucesso no tratamento e garante uma melhor qualidade de vida.</p>
            <blockquote>
                "Cuidar da saúde preventivamente é o investimento com o maior retorno que você pode fazer por si mesmo."
            </blockquote>
            <h2>Principais Indicadores</h2>
            <ul>
                <li>Hemograma completo</li>
                <li>Perfil lipídico (colesterol e triglicerídeos)</li>
                <li>Glicemia de jejum</li>
                <li>Avaliação da função renal e hepática</li>
            </ul>
        `,
        date: "10 Out, 2023",
        category: "Prevenção",
        readTime: "5 min",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw49NqvFyh8zPDAEqo4uN2QHpLwe8QnF0Az36S6t0JZTprF4ICzmF7IxWjE3oRAhjKkYvR5QUs8hPoiKaVG3ZDawURxvJuruXUowtjaf2xpFguLOqlCQh4Z4Jp7gwQEVsVnXFo6c9nvB1UFTX-5-XZ3SQamnEL2wuaSl0Q8JHXkCs_Gp2b3tLbUR-5cdve5CCmNxJfppfA7k_wArifgV_YK7TTRgwTKTiobcPrbSa5C_njgYsIONJPh6Op-2xzbLvAd7eanBlLusU",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "tecnologias-cirurgia-minimamente-invasiva",
        title: "Novas tecnologias em cirurgia minimamente invasiva",
        excerpt: "Como a robótica e as novas técnicas estão reduzindo o tempo de recuperação e aumentando a precisão...",
        content: `
            <p>A evolução da medicina trouxe recursos que pareciam ficção científica há poucos anos. A cirurgia de coluna minimamente invasiva é um dos maiores exemplos disso.</p>
            <h2>A Revolução Robótica</h2>
            <p>Com o auxílio de sistemas de navegação e braços robóticos, o cirurgião consegue realizar intervenções com precisão milimétrica, preservando tecidos saudáveis em volta da coluna.</p>
            <h2>Benefícios para o Paciente</h2>
            <ul>
                <li>Menor tempo de internação</li>
                <li>Recuperação acelerada</li>
                <li>Redução significativa de cicatrizes</li>
                <li>Menor risco de infecções</li>
            </ul>
        `,
        date: "05 Out, 2023",
        category: "Cirurgia",
        readTime: "4 min",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEJmroRFXb95P2PcQwnfmSju-p9KYj1vOGx59AXCrWxvvAcBnTyxO3J_HLAV_0CNgIoqwdlC6A27nsPmde6NVgWXTH0TTsm5NEQDBhgB5x7PlET7hIw0M4GR9qQS13VNlkBr8lFAiuYIoH-jNXZee2kkZ9MS33sYQNkUpFJirTJaWEfWPeM4p6Saz7bV9ze_hW6U1-FULa8P9kOZQsSaXjru7aMTtT5YMIX8SCOOyPygAS77WItvgoZKs2wQYye-oPxuyekxaquhA",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "dicas-vida-equilibrada",
        title: "Dicas práticas para uma vida equilibrada",
        excerpt: "Pequenas mudanças no dia a dia que podem gerar grandes impactos na sua saúde mental e física...",
        content: `
            <p>Encontrar o equilíbrio na correria moderna não é fácil, mas é essencial para evitar o esgotamento físico e mental.</p>
            <h2>Mantenha o Foco no Essencial</h2>
            <p>Práticas simples de mindfulness, alimentação balanceada e o respeito aos ciclos de sono são os pilares da longevidade.</p>
            <blockquote>
                "Saúde não é apenas a ausência de doença, mas o equilíbrio total entre mente, corpo e espírito."
            </blockquote>
        `,
        date: "28 Set, 2023",
        category: "Bem-estar",
        readTime: "6 min",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDApUT7otkpQCZBVUWTD1PzvbDoyTS1BLZy0Jqzwl-a_TsniVpLnFJ_1DigkGCbwHgK9G-I01IT-3tRlmXQBfzAPW-Pxbtz0kaJzalbKripwluzOExhkImOJC-TcRE-1nErcS0e-vv7th0Kvz7VNnUPWINF0xI1RqMi9gjX7fFmv4wxX4iE-xiNPAS8XIMWHFG9hCik8_-t0FsYON_Qd4ntKmE_8Xw3W5afRL3C0lfajk9bS-F-fJz9qbG-igvSPHca_u8OB3agAHc",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "prevencao-cardiovascular-jovens",
        title: "Prevenção cardiovascular em adultos jovens",
        excerpt: "O que você precisa saber sobre saúde do coração antes dos 40 anos para evitar problemas futuros...",
        content: `
            <p>Muitos acreditam que problemas cardíacos são exclusividade da terceira idade, mas o estilo de vida moderno está mudando essa realidade.</p>
            <h2>Comece Agora</h2>
            <p>O controle da pressão arterial e do colesterol deve começar cedo. Hábitos sedimentados aos 20 e 30 anos definem a saúde do coração nas décadas seguintes.</p>
        `,
        date: "15 Set, 2023",
        category: "Prevenção",
        readTime: "7 min",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6GvWMJvkI6hjrMjG-rLdt89rq3UTXAU-C8A8WXAGy4RggyYoPPyAmk_hSHxQ61_paIl2J3884lWgI2v3RpWls5wAeAKJKIhzjDtfzcC5-3sYt2U_NsGWnNSI8mVPMXv31bYdhIsXyqjooSKoRWuP_iuJ6Tcj5NOINXfyAOqJ3HMx4JH2VZ_mAJqRAyRj_TIuOmTugxbdeKHjL-8Y0VWw-xj92HnVqd7z4tFp52vdBjjakEmT78FJvgKlp7nQL9en_rLrIvTQpcms",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "guia-recuperacao-pos-operatoria",
        title: "Guia de recuperação pós-operatória segura",
        excerpt: "Passo a passo para garantir que seu processo de cura seja eficiente e livre de complicações comuns...",
        content: `
            <p>O sucesso de uma cirurgia de coluna depende 50% do procedimento e 50% da dedicação do paciente no pós-operatório.</p>
            <h2>Cuidados Essenciais</h2>
            <p>Siga rigorosamente as orientações médicas sobre movimentação, uso de medicação e repouso absoluto quando necessário.</p>
        `,
        date: "02 Set, 2023",
        category: "Cirurgia",
        readTime: "5 min",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwNAszAuToQImLHn_zbY3jiP02MVtymKrmvaJJvaQsTnNDc1FFg_U8ylaeGuTq4B_VmE2Rz3jVF7l5JYpSOv8akz__1_CxJojd5Bq8sD5-Pl2CT8YTnF5KlVQg8SzwdTywSpo0dP7Z2pNIshveAYGuMIkCNoT2jNl4s9KGn4rQhHGzWg7NksKwhErkV_jDCFhK7LaxJO7mKM-hFO_u3JurWS9WYeA8tzCReYuyRqY3a82xhH_5WhNiKEqqv-Q0xc2eIGAn003iU3M",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "alimentacao-estrategica-longevidade",
        title: "Alimentação estratégica e longevidade celular",
        excerpt: "Quais alimentos realmente combatem o envelhecimento precoce e fortalecem o sistema imunológico...",
        content: `
            <p>Você é o que você come. Alimentos ricos em antioxidantes e anti-inflamatórios são a base de uma vida longa e produtiva.</p>
            <h2>Superalimentos</h2>
            <p>Frutas vermelhas, vegetais de folhas escuras, peixes ricos em ômega-3 e nozes devem fazer parte da sua dieta cotidiana.</p>
        `,
        date: "20 Ago, 2023",
        category: "Bem-estar",
        readTime: "4 min",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRvA7a3To3qBQd2G23kKEsj4j2pXz3s8wrTE42SKlt8rDJKnWc08DYSqGIFwmaLY-jabNs_OZVRgsh_yj3KGQqjWeviv1CETXrweRvvsV1Yr2BbchJ032Dwm0dXIyouPgkLf7YKE9rY-MzeyZ6ZRMqS4NubqLeezU6TV3rmpzaysGyIceGu70Q629gj9fsOLnzBfT4xLRrsR1UH2gcs8Y82Yf6VJKFPZPQps3gF3wcsvSgF4IXE_gfJHLukm9gk3rDZr4Zr3apXXs",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    }
];
