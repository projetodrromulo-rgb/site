---
name: seed-sanity
description: >
  Exporta e popula dados estruturados e de mídia do ambiente local diretamente para o Sanity CMS
  utilizando scripts offline (CLI) de forma segura, sem expor endpoints de API na web.
---

# Sanity CMS Data Seeding Skill

Esta skill fornece instruções e padrões claros para popular, migrar e atualizar de forma segura as informações institucionais e de mídia do Dr. Rômulo Oliveira diretamente para o Sanity CMS a partir do ambiente de desenvolvimento.

## Por que usar esta Skill?
* **Segurança**: Evita expor rotas de API públicas (`/api/seed`) que poderiam ser abusadas para limpar ou sobrescrever o banco de dados.
* **Idempotência**: Todos os scripts de seeding usam IDs pré-definidos (ex: `about-content`), garantindo que a execução contínua atualize o conteúdo existente sem duplicar registros.
* **Velocidade**: Carregamento instantâneo de assets de imagem locais (`public/images/*`) com associação automática de referências no CMS.

## Como Executar

Para popular ou atualizar o banco de dados do Sanity com os dados locais do projeto, utilize o script npm configurado:

```bash
npm run seed
```

> [!IMPORTANT]
> Certifique-se de que o arquivo `.env` contenha as seguintes variáveis devidamente configuradas antes de rodar o comando:
> ```env
> NEXT_PUBLIC_SANITY_PROJECT_ID=seu_id_do_projeto
> NEXT_PUBLIC_SANITY_DATASET=production
> SANITY_API_WRITE_TOKEN=seu_token_com_permissao_de_escrita
> ```

---

## Como Estender o Seeding para Novas Seções (Ex: Hero Section)

Quando novas seções do site forem migradas para o Sanity CMS, você deve estender o script local em [seed.ts](file:///home/maironvilela/projetos/site-doutor-romulo/scripts/seed.ts) seguindo os passos abaixo:

### 1. Definir a estrutura do documento
Prepare o objeto do novo documento com seu respectivo ID fixo e campos:

```typescript
const heroDoc = {
    _type: "hero",
    _id: "hero-content", // ID fixo para evitar duplicidade
    title: "Tratamento Especializado da Coluna",
    subtitle: "Cirurgias minimamente invasivas com foco no seu bem-estar.",
    // Adicione os outros campos conforme o schema do Sanity
};
```

### 2. Carregar assets (se houver)
Se a nova seção possuir imagens locais na pasta `public/`:

```typescript
const localHeroImage = path.join(process.cwd(), "public", "images", "hero-bg.webp");
if (fs.existsSync(localHeroImage)) {
    const buffer = fs.readFileSync(localHeroImage);
    const asset = await writeClient.assets.upload("image", buffer, { filename: "hero-bg.webp" });
    heroDoc.backgroundImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id }
    };
}
```

### 3. Executar o upsert no script `main()` de [seed.ts](file:///home/maironvilela/projetos/site-doutor-romulo/scripts/seed.ts)
```typescript
console.log("📤 Enviando documento 'hero' para o Sanity...");
await writeClient.createOrReplace(heroDoc);
```

---

## Verificação e Auditoria
Após a execução do script:
1. Acesse o **Sanity Studio** local ou em produção.
2. Verifique se o respectivo documento foi populado com as informações e referências corretas.
3. Se necessário, edite os dados diretamente no painel visual do Sanity.
