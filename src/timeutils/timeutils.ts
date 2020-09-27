export class TimeUtils {
    static readonly secondsInHour = 60*60
    static readonly secondsInDay = 60*60*24

    static get ts(): number { return Math.round(this.tsMs / 1000) }
    static get tsMs(): number { return Date.now() }

    static get utcDate() {
        let date = new Date()

        return {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            day: date.getUTCDay(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds(),
            millis: date.getUTCMilliseconds(),
        }
    }

    static get utcToday() {
        let date = this.utcDate

        return {
            hoursPassed: date.hours + date.minutes / 60 + date.seconds / 3600,
            secondsPassed: date.hours * 3600 + date.minutes * 60 + date.seconds
        }
    }

    static get todayTs() {
        return this.dayTs(new Date())
    }

    static get tomorrowTs() {
        return this.todayTs + this.secondsInDay
    }

    static dayTs(date: Date) {
        return Math.round((new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))).getTime() / 1000)
    }

    static secondsTill(s: number): number {
        const currentSeconds = this.utcToday.secondsPassed

        return s - currentSeconds + (currentSeconds < s ? 0 : this.secondsInDay)
    }

    static isBetweenSeconds(s1: number, s2: number): boolean {
        const currentSeconds = this.utcToday.secondsPassed

        return s1 < s2 ? currentSeconds > s1 && currentSeconds < s2 : currentSeconds > s2 && currentSeconds < s1 + this.secondsInDay
    }

    static timeStrToSeconds(timeStr: string): number {
        let comps = timeStr.split(':')
        let multis = [3600, 60, 1]
        var seconds = 0

        for (let i in comps) {
            seconds += parseInt(comps[i]) * multis[i]
        }

        return seconds
    }

    static sleep(s: number) { return this.msleep(s*1000)) }
    static msleep(ms: number) { return new Promise<void>(resolve => setTimeout(resolve, ms)) }
}