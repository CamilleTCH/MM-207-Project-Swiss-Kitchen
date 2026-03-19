const find = (query, source = document) => {
    let items = source.querySelectorAll(query);
    if (items.length > 1) {
        return items;
    }
    return items[0] ?? null;
}

export default find