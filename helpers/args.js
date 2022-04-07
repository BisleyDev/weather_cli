export function getArgs( [exec, file, ...args] ) {
    const obj = {}
    args.forEach((value, idx, arr) => {
        if (value.charAt(0) === '-') {
            if (idx === arr.length - 1) {
                obj[value.substring(1)] = true;
            } else if (arr[idx + 1].charAt(0) !== '-') {
                obj[value.substring(1)] = arr[idx + 1];
            } else {
                obj[value.substring(1)] = true;
            }
        }
    })
    return obj

}