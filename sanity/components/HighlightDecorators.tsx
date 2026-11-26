import React from "react";

export function YellowHighlightIcon() {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.25em",
                height: "1.25em",
                borderRadius: "4px",
                backgroundColor: "#fde68a",
                color: "#78350f",
                fontWeight: 800,
                fontSize: "0.75em",
                lineHeight: 1,
            }}
            title="Marca-texto Amarelo (Removido)"
        >
            −
        </span>
    );
}

export function YellowHighlightDecorator({ children }: { children: React.ReactNode }) {
    return (
        <mark
            style={{
                backgroundColor: "#fef08a",
                color: "#0f172a",
                padding: "0.05em 0.2em",
                borderRadius: "3px",
            }}
        >
            {children}
        </mark>
    );
}

export function GreenHighlightIcon() {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.25em",
                height: "1.25em",
                borderRadius: "4px",
                backgroundColor: "#a7f3d0",
                color: "#064e3b",
                fontWeight: 800,
                fontSize: "0.75em",
                lineHeight: 1,
            }}
            title="Marca-texto Verde (Adicionado)"
        >
            +
        </span>
    );
}

export function GreenHighlightDecorator({ children }: { children: React.ReactNode }) {
    return (
        <mark
            style={{
                backgroundColor: "#bbf7d0",
                color: "#0f172a",
                padding: "0.05em 0.2em",
                borderRadius: "3px",
            }}
        >
            {children}
        </mark>
    );
}

