export class Utils {
    public static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    public static randomDate(min: Date, max: Date): Date {
        return new Date(
            min.getTime() + Math.random() * (max.getTime() - min.getTime())
        );
    }

    public static randomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static randomAlphaString(len: number): string {
        return Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, len);
    }
}
