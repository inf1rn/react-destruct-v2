export const formatDate = (date: string | number | Date, type: "locale" | "iso" = "locale") => {
    switch (type) {
        case "locale": {
            return new Date(date).toLocaleDateString("ru-RU")
        }
        case "iso": {
            return new Date(date).toISOString().slice(0, 10)
        }
    }
}

export const roundDate = (date: Date | string | number) => {
    const roundedDate = new Date(date)
    roundedDate.setUTCHours(0, 0, 0, 0)
    roundedDate.setHours(0, 0, 0, 0)
    return roundedDate
}

export const getMonthName = (month: number) => {
    switch (month) {
        case 0: {
            return "янв"
        }
        case 1: {
            return "фев"
        }
        case 2: {
            return "мар"
        }
        case 3: {
            return "апр"
        }
        case 4: {
            return "май"
        }
        case 5: {
            return "июн"
        }
        case 6: {
            return "июл"
        }
        case 7: {
            return "авг"
        }
        case 8: {
            return "сен"
        }
        case 9: {
            return "окт"
        }
        case 10: {
            return "ноя"
        }
        case 11: {
            return "дек"
        }

    }
}

export const subtractDate = (days: number, date = new Date) => {
    date.setDate(date.getDate() - days);

    return date;
}