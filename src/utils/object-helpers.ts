export const updateObjectInArray = (items: Array<any>, itemId: number, objPropName: string, newObjProps: {followed: boolean}) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u;
    })
}
