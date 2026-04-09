export interface Procedure {
    title: string;
    description: string;
    icon: string;
    slug: string;
    content: string[];
    imageUrl?: string;
    metaTitle?: string;
    metaDescription?: string;
}

export const allProcedures: Procedure[] = [
    {
        title: "Cirurgia Minimamente Invasiva",
        description: "Técnicas modernas que permitem recuperações mais rápidas, com menos dor pós-operatória e cicatrizes reduzidas.",
        icon: "check",
        slug: "cirurgia-minimamente-invasiva",
        content: [
            "A cirurgia minimamente invasiva da coluna representa um dos maiores avanços da medicina moderna. Diferente das técnicas tradicionais que exigiam grandes incisões, hoje conseguimos tratar diversas patologias através de pequenos cortes.",
            "Utilizamos retratores tubulares e monitorização contínua para preservar a musculatura e os nervos ao redor da coluna. Isso resulta em menos sangramento durante o procedimento e uma dor pós-operatória significativamente menor.",
            "O principal benefício para o paciente é o tempo de recuperação reduzido. Muitos pacientes conseguem caminhar poucas horas após o procedimento e retornar às suas atividades rotineiras muito mais rápido do que na cirurgia aberta convencional."
        ],
        imageUrl: "/images/procedures/minimally-invasive.png",
        metaTitle: "Cirurgia Minimamente Invasiva de Coluna | Dr. Romulo",
        metaDescription: "Saiba como a cirurgia minimamente invasiva da coluna permite uma recuperação mais rápida e menos dor pós-operatória. Agende sua consulta."
    },
    {
        title: "Endoscopia de Coluna",
        description: "Permite menor tempo cirúrgico e melhor visualização pelo aumento da câmera e tela de vídeo.",
        icon: "check",
        slug: "endoscopia-de-coluna",
        content: [
            "A endoscopia de coluna é uma técnica revolucionária onde utilizamos uma micro-câmera de alta definição para visualizar o canal vertebral e os nervos.",
            "Através de uma incisão de aproximadamente 1cm, o endoscópico é inserido, permitindo a remoção de hérnias de disco e descompressão de nervos com extrema precisão, sem a necessidade de grandes agressões aos tecidos sadios.",
            "Por ser um procedimento pouco agressivo, a taxa de sucesso é alta e os riscos de infecção ou complicações cicatriciais são minimizados, sendo muitas vezes realizado sob anestesia local e sedação."
        ],
        imageUrl: "/images/procedures/endoscopy.png",
        metaTitle: "Endoscopia de Coluna: Hernia de Disco e Descompressão | Dr. Romulo",
        metaDescription: "Tratamento moderno para hérnia de disco via endoscopia. Procedimento minimamente invasivo com alta precisão e rápida recuperação."
    },
    {
        title: "Artroplastia Cervical",
        description: "Substituição do disco cervical por uma prótese que reduz dor e mantém a mobilidade natural da coluna",
        icon: "check",
        slug: "artroplastia-cervical",
        content: [
            "A artroplastia cervical consiste na substituição de um disco intervertebral danificado por uma prótese móvel. Diferente da fusão (artrodese), este procedimento visa manter a movimentação natural do pescoço.",
            "Esta tecnologia impede que as vértebras vizinhas sofram uma sobrecarga excessiva, prevenindo o desgaste acelerado dos níveis acima e abaixo do local operado (doença do nível adjacente).",
            "É indicada principalmente para pacientes com hérnias de disco cervicais que não apresentam sinais avançados de instabilidade, permitindo uma vida ativa e sem as restrições de movimento de uma cirurgia de fusão.",
        ],
        imageUrl: "/images/procedures/arthroplasty.png",
        metaTitle: "Artroplastia Cervical e Prótese de Disco | Dr. Romulo",
        metaDescription: "Mantenha a mobilidade do pescoço com a artroplastia cervical. Saiba mais sobre a substituição de disco por prótese com o Dr. Romulo."
    },
    {
        title: "Tratamento Escoliose",
        description: "Correção das curvas anormais patológicas.",
        icon: "check",
        slug: "tratamento-escoliose",
        content: [
            "O tratamento da escoliose envolve o diagnóstico preciso e a correção de curvaturas laterais da coluna que podem afetar a postura e, em casos graves, a função respiratória.",
            "Utilizamos sistemas modernos de fixação e correção tridimensional para alinhar a coluna de forma segura, monitorando a função neurológica em tempo real durante toda a cirurgia.",
            "Nosso objetivo é proporcionar ao paciente uma melhoria estética significativa associada ao equilíbrio sagital e coronal da coluna, garantindo qualidade de vida a longo prazo e prevenindo progressões futuras da deformidade."
        ],
        imageUrl: "/images/procedures/scoliosis.png",
        metaTitle: "Tratamento de Escoliose e Correção de Deformidade | Dr. Romulo",
        metaDescription: "Correção cirúrgica de escoliose com técnicas modernas de fixação tridimensional. Melhore sua postura e qualidade de vida."
    },
    {
        title: "Tratamento Tumores na Coluna",
        description: "Intervenção cirúrgica para garantir estabilidade e proteger as estruturas neurológicas.",
        icon: "check",
        slug: "tratamento-tumores-coluna",
        content: [
            "O manejo de tumores na coluna exige uma abordagem multidisciplinar e altamente técnica. A cirurgia foca na remoção da lesão com a máxima segurança para as raízes nervosas e medula.",
            "Frequentemente, este procedimento envolve a reconstrução e estabilização do segmento vertebral afetado para evitar colapsos e garantir que o paciente mantenha sua capacidade de locomoção.",
            "Atuamos em conjunto com oncologistas para planejar a melhor estratégia de tratamento, integrando a cirurgia com tratamentos complementares quando necessário para o controle da doença."
        ],
        imageUrl: "/images/procedures/tumor.png",
        metaTitle: "Cirurgia de Tumores na Coluna | Dr. Romulo",
        metaDescription: "Tratamento cirúrgico especializado para tumores vertebrais. Segurança neurológica e estabilização da coluna."
    },
    {
        title: "Artrodese de coluna",
        description: "Procedimento para fundir uma vértebra à outra, com o propósito de estabilização do segmento.",
        icon: "check",
        slug: "artrodese-de-coluna",
        content: [
            "A artrodese é um procedimento de estabilização onde conectamos duas ou mais vértebras permanentemente para eliminar movimentos dolorosos ou corrigir instabilidades graves.",
            "Utilizamos parafusos de titânio e enxerto ósseo de última geração para promover a fusão biológica. A técnica pode ser aplicada em casos de espondilolistese, fraturas ou degeneração discal avançada.",
            "Apesar de limitar o movimento de um segmento específico, a artrodese bem indicada proporciona um alívio duradouro da dor incapacitante, permitindo que o paciente retorne a uma vida produtiva e sem a instabilidade mecânica anterior."
        ],
        imageUrl: "/images/procedures/fusion.png",
        metaTitle: "Artrodese de Coluna e Fusão Vertebral | Dr. Romulo",
        metaDescription: "Saiba como a artrodese de coluna pode eliminar dores crônicas através da estabilização de segmentos vertebrais instáveis."
    }
];
