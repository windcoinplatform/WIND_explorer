const LOCALES = ['ru-Ru', 'en-GB', 'en-US'];

export default class DateTime {
    instant;
    date;
    time;

    constructor(timestamp) {
        this.instant = new Date(timestamp);
        this.date = this.instant.toLocaleDateString(LOCALES);
        this.time = this.instant.toLocaleTimeString(LOCALES);
    }

    toLongString() {
        return this.time + ', ' + this.date;
    }
}
