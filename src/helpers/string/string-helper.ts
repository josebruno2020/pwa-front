export default class StringHelper {
    static onlyNumbers(str: string) {
        return str?.replace(/[^\d]/g, '')
    }
}