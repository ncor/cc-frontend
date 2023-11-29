export function excludeEmptyRecords(object: Record<string, any>) {
    return Object.fromEntries(Object.entries(object).filter(r => r[0]));
}
