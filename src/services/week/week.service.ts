/* tslint:disable:max-line-length */
import * as Moment from 'moment-timezone';
import { extendMoment, DateRange } from 'moment-range';
const moment = extendMoment(Moment);
import { Injectable } from '@nestjs/common';

@Injectable()
class WeekService {
    private nflWeeks: DateRange[] = [
        moment.range(moment('2019-01-01', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-09-10', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-09-10', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-09-17', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-09-17', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-09-24', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-09-24', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-10-01', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-10-01', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-10-08', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-10-08', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-10-15', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-10-15', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-10-22', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-10-22', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-10-29', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-10-29', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-11-05', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-11-05', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-11-12', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-11-12', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-11-19', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-11-19', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-11-26', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-11-26', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-12-03', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-12-03', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-12-10', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-12-10', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-12-17', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-12-17', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-12-24', 'YYYY-MM-DD').tz('America/New_York')),
        moment.range(moment('2019-12-24', 'YYYY-MM-DD').tz('America/New_York'), moment('2019-12-30', 'YYYY-MM-DD').tz('America/New_York')),
    ];

    /**
     * Returns the current NFL week. The maximum this will return is week 17.
     */
    currentWeek(): number {
        let week = 1;
        for (const weekRange of this.nflWeeks) {
            if (weekRange.contains(moment().tz('America/New_York'))) {
                break;
            }
            week++;
        }

        return Math.min(week, this.nflWeeks.length);
    }

    getWeekFromDate(date: Moment.Moment): number {
        let week = 1;
        for (const weekRange of this.nflWeeks) {
            if (weekRange.contains(date)) {
                return week;
            }
            week++;
        }

        return 0;
    }

    weeks(): any[] {
        return this.nflWeeks.map((x, index) => {
            return { week: index + 1, weekRange: x };
        });
    }
}

const weekService = new WeekService();

export default weekService;
