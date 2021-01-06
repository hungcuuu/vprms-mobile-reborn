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

export const calculateServicePrice = serviceList => {
    const servicesPrice = serviceList.reduce((curr, service) => {
        const { servicePrice } = service;
        return curr + servicePrice;
    }, 0);

    const partsPrice = serviceList.reduce((curr, service) => {
        const { parts } = service;

        const partsPrice = parts.reduce((curr, part) => {
            return curr + part.price * part.quantity;
        }, 0);

        return curr + partsPrice;
    }, 0);

    return {
        services: servicesPrice,
        partsPrice: partsPrice,
        total: servicesPrice + partsPrice,
    };
};
export const calculatePackagePrice = packageList => {
    const packagePrice = packageList.reduce((curr, _package) => {
        const { services } = _package;
        return curr + calculateServicePrice(services).total;
    }, 0);
    console.log(packagePrice);
    return {
        total: packagePrice,
    };
};
export const calculateReviewPrice = (serviceList, packageList) => {
    const servicesPrice = serviceList.reduce((curr, service) => {
        const { price } = service;
        return curr + price;
    }, 0);

    const partsPrice = serviceList.reduce((curr, service) => {
        const { parts } = service;
        const partsPrice = parts.reduce((curr, part) => {
            return curr + part.price * part.quantity;
        }, 0);

        return curr + partsPrice;
    }, 0);
    const packagePrice = packageList.reduce((curr, _package) => {
        const { totalPrice } = _package;
        return curr + totalPrice;
    }, 0);
    return {
        packagePrice: packagePrice,
        services: servicesPrice,
        partsPrice: partsPrice,
        total: servicesPrice + partsPrice + packagePrice,
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
