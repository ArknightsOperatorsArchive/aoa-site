export const range = (start: number, end: number = 0) => {
    const test = Array(end - start + 1).fill(null).map((_, idx) => start + idx)
    console.log(test)
    return test
}