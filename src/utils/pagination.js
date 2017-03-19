export function getOffset (page, limit) {
    return Math.ceil((page - 1) * limit);
}
