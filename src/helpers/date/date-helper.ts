export const americanToBrazilianFormat = (date: string): string => {
    return date.split('-').reverse().join('/')
}