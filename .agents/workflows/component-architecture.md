---
description: Padrão Arquitetural para Componentes de Seção (Baseado no Hero)
---

Este guia define a estrutura obrigatória para o desenvolvimento de novas seções ou refatoração das existentes, garantindo performance, SEO e manutenibilidade.

## 1. Estrutura de Pastas
Cada seção principal (ex: `about`, `locations`, `services`) deve seguir este padrão:

```text
secao/
├── index.tsx         # Orquestrador (Client Component se houver animação)
├── types.ts           # Definições de interfaces
├── _components/      # Subcomponentes privados da seção
│   ├── index.ts      # Barrel export
│   └── sub-comp.tsx
├── hooks/            # Lógica e animações (useGSAP)
│   └── use-secao.ts
└── data/             # Provedor de dados (Server-side)
    └── get-content.ts
```

## 2. Regras de Implementação

### A. Data Fetching (get-content.ts)
- Deve ser uma função `async`.
- Deve retornar um objeto tipado definido no `types.ts`.
- **Objetivo:** Facilitar a migração para Headless CMS sem alterar a UI.

### B. O Componente Principal (index.tsx)
- Recebe os dados como props (vindo de um Server Component como `page.tsx`).
- Se houver animações GSAP ou estados de interação, deve ser `"use client"`.
- Deve utilizar o hook customizado da pasta `hooks/`.

### C. Animações (use-*.ts)
- Utilizar o hook `@gsap/react` (`useGSAP`).
- **PROIBIDO:** Selecionar elementos por ordem de DOM (`Array.from(children)`).
- **OBRIGATÓRIO:** Usar classes específicas para animação (ex: `.secao-animate-item`) para evitar quebras de layout ao adicionar novos elementos.

### D. Subcomponentes (_components/)
- Componentes que precisam ser animados pelo orquestrador pai devem usar `forwardRef`.
- Use `next/image` com `priority={true}` para elementos acima da dobra (Above the Fold).

## 3. Workflow de Criação
1. Defina as interfaces em `types.ts`.
2. Crie o provedor de dados estáticos em `data/`.
3. Desenvolva os subcomponentes em `_components/` com Tailwind.
4. Implemente a lógica de entrada/saída em `hooks/`.
5. Monte tudo no `index.tsx`.
6. Injecte no `page.tsx` injetando os dados via `await get*Content()`.
