export const required = (value: string) => {
    return value ? undefined : "Field is required!";
}

export const maxLength = (maxLength: number) => (value: string) =>  {
    return value.length > maxLength ? `Max length is ${maxLength} symbols!` : undefined;
}