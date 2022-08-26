import { FormattedMessage } from 'react-intl';

export default function DecideEventStatus(a, b, c) {
    if (a === null)
        return <FormattedMessage id='manage.unknown' />
    else {
        const year1 = a.slice(0, 4)
        const year2 = c.slice(0, 4)
        if (year1 !== year2) {
            if (year1 > year2)
                return <FormattedMessage id='manage.coming-soon' />
        } else {
            const month1 = a.slice(5, 7)
            const month2 = c.slice(5, 7)
            if (month1 !== month2) {
                if (month1 > month2)
                    return <FormattedMessage id='manage.coming-soon' />
            } else {
                const date1 = a.slice(8, 10)
                const date2 = c.slice(8, 10)
                if (date1 !== date2) {
                    if (date1 > date2)
                        return <FormattedMessage id='manage.coming-soon' />
                } else {
                    return <FormattedMessage id='manage.in-progress' />
                }
            }
        }

        if (b === null)
            return <FormattedMessage id='manage.ended' />
        else {
            const year1 = b.slice(0, 4)
            const year2 = c.slice(0, 4)
            if (year1 !== year2) {
                if (year1 > year2)
                    return <FormattedMessage id='manage.in-progress' />
                else
                    return <FormattedMessage id='manage.ended' />
            } else {
                const month1 = b.slice(5, 7)
                const month2 = c.slice(5, 7)
                if (month1 !== month2) {
                    if (month1 > month2)
                        return <FormattedMessage id='manage.in-progress' />
                    else
                        return <FormattedMessage id='manage.ended' />
                } else {
                    const date1 = b.slice(8, 10)
                    const date2 = c.slice(8, 10)
                    if (date1 !== date2) {
                        if (date1 > date2)
                            return <FormattedMessage id='manage.in-progress' />
                        else
                            return <FormattedMessage id='manage.ended' />
                    } else {
                        return <FormattedMessage id='manage.in-progress' />
                    }
                }
            }
        }
    }
}