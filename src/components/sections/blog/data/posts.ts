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
    },
    {
        slug: "hernia-de-disco-sintomas-prevencao",
        title: "Hérnia de Disco: Como Identificar e Prevenir",
        excerpt: "Aprenda a reconhecer os sinais da hérnia de disco e quais hábitos adotar para evitar crises de dor intensa...",
        content: `
            <p>A hérnia de disco ocorre quando parte do disco intervertebral sai de sua posição normal e comprime os nervos.</p>
            <h2>Como Identificar?</h2>
            <p>Os principais sintomas incluem dor que irradia para as pernas ou braços, formigamento e fraqueza muscular.</p>
            <h2>Prevenção</h2>
            <ul>
                <li>Manter o peso ideal</li>
                <li>Praticar exercícios de fortalecimento do core</li>
                <li>Cuidar da ergonomia no trabalho</li>
            </ul>
        `,
        date: "15 Jan, 2024",
        category: "Prevenção",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "estenose-canal-vertebral-guia",
        title: "Estenose de Canal: Entenda o Estreitamento da Coluna",
        excerpt: "Saiba por que o envelhecimento pode causar o estreitamento do canal vertebral e como tratar essa condição...",
        content: `
            <p>A estenose é o estreitamento dos espaços dentro da coluna, o que pode causar pressão sobre os nervos.</p>
            <h2>Sinais Comuns</h2>
            <p>Dor e cãibras nas pernas ao caminhar, que melhoram ao sentar ou inclinar-se para frente.</p>
            <h2>Tratamento</h2>
            <p>Pode variar de fisioterapia e medicações até procedimentos minimamente invasivos para descompressão.</p>
        `,
        date: "12 Jan, 2024",
        category: "Cirurgia",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f13c5b3c2?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "espondilolistese-quando-vertebra-escorrega",
        title: "Espondilolistese: Quando as Vértebras Escorregam",
        excerpt: "Entenda as causas do deslocamento vertebral e como evitar que a condição evolua para uma cirurgia...",
        content: `
            <p>Ocorre quando uma vértebra desliza sobre a outra, podendo causar instabilidade mecânica e compressão nervosa.</p>
            <h2>Identificação</h2>
            <p>Dor lombar persistente, rigidez muscular e, em casos mais graves, alteração na forma de caminhar.</p>
            <h2>Como Prevenir</h2>
            <p>Fortalecimento muscular específico e evitar movimentos de hiperextensão repetitiva sem preparo físico.</p>
        `,
        date: "08 Jan, 2024",
        category: "Prevenção",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "escoliose-em-jovens-sinais-alerta",
        title: "Escoliose em Jovens: Sinais de Alerta e Tratamento",
        excerpt: "O diagnóstico precoce da escoliose idiopática juvenil é fundamental para evitar cirurgias complexas no futuro...",
        content: `
            <p>A escoliose é uma curvatura lateral da coluna que surge frequentemente durante o estirão de crescimento.</p>
            <h2>Sinais de Alerta</h2>
            <ul>
                <li>Ombros desalinhados</li>
                <li>Um lado da cintura mais alto que o outro</li>
                <li>Assimetria nas costas ao inclinar para frente</li>
            </ul>
            <p>O tratamento pode envolver observação, uso de coletes ou cirurgia corretiva.</p>
        `,
        date: "02 Jan, 2024",
        category: "Prevenção",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "cifose-acentuada-postura-saude",
        title: "Cifose Acentuada: Postura e Saúde Vertebral",
        excerpt: "Saiba a diferença entre má postura e a cifose de Scheuermann, e como tratar o desvio da coluna...",
        content: `
            <p>A cifose é o aumento da curvatura torácica, popularmente conhecida como corcunda.</p>
            <h2>Identificação</h2>
            <p>Além da alteração visual, o paciente pode apresentar dor nas costas e fadiga muscular intensa ao final do dia.</p>
            <h2>Prevenção</h2>
            <p>Reeducação postural, exercícios de alongamento da cadeia anterior e fortalecimento da musculatura extensora.</p>
        `,
        date: "28 Dez, 2023",
        category: "Bem-estar",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1550628988-ef4ff822550e?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "bico-de-papagaio-osteofitose-causas",
        title: "Bico de Papagaio: O que é a Osteofitose?",
        excerpt: "Entenda por que o corpo cria esses crescimentos ósseos e se eles são sempre motivo de preocupação...",
        content: `
            <p>Os osteófitos são crescimentos ósseos que surgem como resposta ao desgaste crônico das articulações da coluna.</p>
            <h2>Como Identificar?</h2>
            <p>Geralmente associado à artrose, causa rigidez matinal e dor que piora com o esforço físico.</p>
            <h2>Prevenção</h2>
            <p>Manter-se ativo, evitar sobrecargas articulares e manter uma dieta rica em nutrientes para a saúde óssea.</p>
        `,
        date: "22 Dez, 2023",
        category: "Prevenção",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "mielopatia-cervical-sinais-neurologicos",
        title: "Mielopatia Cervical: Atenção aos Sinais Neurológicos",
        excerpt: "A compressão da medula no pescoço pode causar perdas motoras graves. Saiba como identificar os sinais precoces...",
        content: `
            <p>A mielopatia ocorre quando o canal medular no pescoço fica tão estreito que comprime a medula espinhal.</p>
            <h2>Sinais Críticos</h2>
            <ul>
                <li>Dificuldade para abotoar camisas</li>
                <li>Perda de equilíbrio ao caminhar</li>
                <li>Fraqueza súbita nas mãos</li>
            </ul>
            <p>Nesses casos, a avaliação cirúrgica costuma ser urgente para evitar a progressão da lesão.</p>
        `,
        date: "15 Dez, 2023",
        category: "Cirurgia",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1579154235602-4c0001880996?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "osteoporose-coluna-como-evitar-fraturas",
        title: "Osteoporose e Coluna: Como Evitar Fraturas",
        excerpt: "A osteoporose pode causar fraturas silenciosas na coluna. Entenda como prevenir a perda de massa óssea...",
        content: `
            <p>A osteoporose torna os ossos frágeis e suscetíveis a fraturas mesmo em pequenos traumas.</p>
            <h2>Como Identificar?</h2>
            <p>Muitas vezes silenciosa, pode se manifestar por uma redução na altura do paciente ou dor súbita intensa.</p>
            <h2>Prevenção</h2>
            <p>Ingestão adequada de Cálcio, Vitamina D e exercícios de impacto controlado (musculação).</p>
        `,
        date: "10 Dez, 2023",
        category: "Prevenção",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "discite-perigo-infeccao-vertebral",
        title: "Discite: O Perigo das Infecções Vertebrais",
        excerpt: "Saiba como infecções podem atingir os discos intervertebrais e a importância do diagnóstico rápido...",
        content: `
            <p>A discite é uma infecção bacteriana do disco, que pode causar dor extrema e febre.</p>
            <h2>Identificando o Risco</h2>
            <p>Dor nas costas profunda que não melhora com o repouso, associada a suores noturnos e mal-estar geral.</p>
            <p>O tratamento precoce com antibióticos é crucial para evitar danos permanentes à estrutura da coluna.</p>
        `,
        date: "05 Dez, 2023",
        category: "Cirurgia",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    },
    {
        slug: "cauda-equina-emergencia-cirurgica",
        title: "Cauda Equina: A Emergência que Você Precisa Conhecer",
        excerpt: "A síndrome da cauda equina é uma das poucas emergências reais na coluna. Saiba quando correr para o hospital...",
        content: `
            <p>Esta síndrome ocorre quando há uma compressão maciça das raízes nervosas no final da coluna lombar.</p>
            <h2>Sinais de Emergência</h2>
            <ul>
                <li>Perda de controle da urina ou fezes</li>
                <li>Dormência na região das nádegas (anestesia em sela)</li>
                <li>Fraqueza grave nas pernas</li>
            </ul>
            <p>Requer cirurgia imediata, geralmente nas primeiras 24-48 horas, para evitar sequelas permanentes.</p>
        `,
        date: "01 Dez, 2023",
        category: "Cirurgia",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f13c5b3c2?auto=format&fit=crop&q=80&w=800",
        author: "Dr. Rômulo Olivera",
        authorRole: "Ortopedia & Cirurgia da Coluna"
    }
];
