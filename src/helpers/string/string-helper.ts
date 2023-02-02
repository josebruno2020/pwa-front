export default class StringHelper {
  static onlyNumbers(str: string) {
    return str?.replace(/[^\d]/g, "");
  }

  static formatDate(date: string): string {
    return date.split("/").reverse().join("-");
  }
}
