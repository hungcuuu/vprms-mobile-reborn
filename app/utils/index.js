export const updateObject = (oldState, newProps) => {
    return { ...oldState, ...newProps };
};

export const normalizeString = (value) => {
    return value
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};
