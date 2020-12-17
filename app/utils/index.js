import accounting from 'accounting';

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

export const formatPhoneNumber = (phoneNumber) => {
    return '+84' + phoneNumber.slice(1, phoneNumber.length);
};
export const moneyFormat = {
    symbol: 'VNĐ',
    format: '%v %s',
    decimal: '0',
    thousand: '.',
    precision: 0,
};

export const formatMoney = (money) => {
    return accounting.formatMoney(money, moneyFormat);
};
