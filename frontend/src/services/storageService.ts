export const saveToStorage = (key: string, val: any) => {
    localStorage[key] = JSON.stringify(val);
}

export const loadFromStorage = (key: string) => {
    var val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}




