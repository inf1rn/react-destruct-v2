export class Cookie {
    name: string

    constructor(name: string) {
        this.name = name
    }

    getValue(): string | null {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + this.name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : null;
    }

    setValue(value: string | number, days = 30) {
        document.cookie = `${this.name}=${value};max-age=${3600 * 24 * days};Path=/;`
    }
}