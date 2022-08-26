export default function CompareDate(a, b) {
    const year1 = a.slice(0, 4)
    const year2 = b.slice(0, 4)
    if (year1 !== year2) {
        if (year1 > year2)
            return false
        else
            return true
    } else {
        const month1 = a.slice(5, 7)
        const month2 = b.slice(5, 7)
        if (month1 !== month2) {
            if (month1 > month2)
                return false
            else
                return true
        } else {
            const date1 = a.slice(8, 10)
            const date2 = b.slice(8, 10)
            if (date1 !== date2) {
                if (date1 > date2)
                    return false
                else
                    return true
            } else {
                return true
            }
        }
    }
}