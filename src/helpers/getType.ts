function getType(value: any) {
    return Object.prototype.toString.call(value).split(' ')[1].slice(0, -1);
}

export default getType;
