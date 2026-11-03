/**
 * Utilitários compartilhados para manipulação de datas e visibilidade de publicações do blog.
 */

/**
 * Retorna o timestamp (ms) do final do dia atual (23:59:59.999) no fuso de Brasília.
 * Permite que artigos com data de publicação de hoje sejam exibidos no dia planejado,
 * ocultando apenas publicações com agendamento para dias futuros (a partir de amanhã).
 */
export function getEndOfTodayBrazil(): number {
    const now = new Date();
    const brazilDateStr = now.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
    return new Date(`${brazilDateStr}T23:59:59.999-03:00`).getTime();
}

/**
 * Converte diferentes formatos de data do post (ISO, DD-MM-YYYY, etc.) para timestamp numérico.
 */
export function parsePostDate(dateStr?: string): number {
    if (!dateStr) return 0;
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const [d, m, y] = dateStr.split("-");
        return new Date(`${y}-${m}-${d}`).getTime();
    }
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? 0 : timestamp;
}

/**
 * Verifica se um post deve estar visível com base na data de publicação.
 * Retorna true se não houver data definida (0) ou se a data for até o final do dia de hoje (Brasília).
 * Retorna false se o post estiver agendado para uma data futura (a partir de amanhã).
 */
export function isPostPublished(dateStr?: string, endOfToday: number = getEndOfTodayBrazil()): boolean {
    const postTime = parsePostDate(dateStr);
    return postTime === 0 || postTime <= endOfToday;
}

