export const locationPipes = {
    location: (location: Array<string | undefined>) => location.filter(item => item != undefined).join(", ")
}