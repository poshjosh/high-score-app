export const joinClassNames = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
}
