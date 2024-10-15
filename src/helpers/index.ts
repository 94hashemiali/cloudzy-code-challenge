export function persianToEnglishNumber(number) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return number?.split('')?.map((char) => {
        const digit = persianDigits?.indexOf(char);
        return digit !== -1 ? digit?.toString() : char;
    })?.join('');
}