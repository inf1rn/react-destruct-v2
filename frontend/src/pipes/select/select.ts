export const selectPipes = {
    options: (options: Array<{
        [key in string]: any
    }>, labelKey: string, valueKey: string) => options.map(option => ({
        label: option[labelKey],
        value: String(option[valueKey])
    }))
}