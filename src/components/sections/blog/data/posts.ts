import { post as ciaticoPost } from "./posts/dor-no-nervo-ciatico-causas-e-tratamentos";
import { post as tumoresPost } from "./posts/tumores-na-coluna-diagnostico-e-seguranca";
import { post as artrosePost } from "./posts/artrose-da-coluna-desgaste-e-qualidade-de-vida";
import { post as fraturaPost } from "./posts/fratura-vertebral-causas-e-recuperacao-segura";
import { post as espondilolistesePost } from "./posts/espondilolistese-o-que-fazer-quando-a-vertebra-escorrega";
import { post as escoliosePost } from "./posts/escoliose-diagnostico-e-tratamento-em-diferentes-fases-da-vida";
import { post as lombalgiaPost } from "./posts/lombalgia-entenda-as-causas-da-dor-lombar";
import { post as herniaPost } from "./posts/hernia-de-disco-causas-e-tratamentos-modernos";
import { post as estenosePost } from "./posts/estenose-de-canal-vertebral-causas-e-sintomas";

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
    ciaticoPost,
    tumoresPost,
    artrosePost,
    fraturaPost,
    espondilolistesePost,
    escoliosePost,
    lombalgiaPost,
    herniaPost,
    estenosePost
];
