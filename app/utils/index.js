import accounting from 'accounting';

export const updateObject = (oldState, newProps) => {
    return { ...oldState, ...newProps };
};
export const secondToMiliSecond = value => {
    return value * 1000;
};
export const toTimeString = value => {
    return new Date(secondToMiliSecond(value)).toLocaleTimeString();
};

export const calculateRequestPrice = request => {
    const { services } = request;

    const servicesPrice = services.reduce((curr, service) => {
        const { price, parts } = service;
        const partsPrice = parts.reduce((curr, part) => {
            return curr + part.priceEach * part.quantity;
        }, 0);

        return curr + price + partsPrice;
    }, 0);
    return {
        services: servicesPrice,
        total: servicesPrice,
    };
};
export const normalizeString = value => {
    return value
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

export const formatPhoneNumber = phoneNumber => {
    return '+84' + phoneNumber.slice(1, phoneNumber.length);
};
export const moneyFormat = {
    symbol: 'VNĐ',
    format: '%v %s',
    decimal: '0',
    thousand: '.',
    precision: 0,
};

export const formatMoney = money => {
    return accounting.formatMoney(money, moneyFormat);
};
