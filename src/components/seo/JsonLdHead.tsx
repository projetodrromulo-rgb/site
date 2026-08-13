interface JsonLdHeadProps {
    id: string;
    schema: any;
}

export default function JsonLdHead({ id, schema }: JsonLdHeadProps) {
    if (!schema) return null;

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

