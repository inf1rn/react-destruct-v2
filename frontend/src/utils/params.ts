export function filterParams<T extends {}>(params: T): Partial<T> {
    const filteredParams = {} as Partial<T>

    for (let param in params) {
        if (params[param] != null && params[param] != undefined) {
            filteredParams[param] = params[param]
        }
    }

    return filteredParams
}