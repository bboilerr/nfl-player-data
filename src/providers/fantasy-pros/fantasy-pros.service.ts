import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as moment from 'moment-timezone';
import { Rankings } from '../../models/league';

const URLS_BY_POSITION: any = {
    QB: 'https://www.fantasypros.com/nfl/rankings/qb.php',
    RB: 'https://www.fantasypros.com/nfl/rankings/ppr-rb.php',
    WR: 'https://www.fantasypros.com/nfl/rankings/ppr-wr.php',
    TE: 'https://www.fantasypros.com/nfl/rankings/ppr-te.php',
    K: 'https://www.fantasypros.com/nfl/rankings/k.php',
    DST: 'https://www.fantasypros.com/nfl/rankings/dst.php',
};

@Injectable()
export class FantasyProsService {
    private logger: Logger;

    constructor() {
        this.logger = new Logger('FantasyProsService');
    }

    async getPprRankings(): Promise<Rankings> {
        try {
            const rankings = {} as Rankings;
            for (const position in URLS_BY_POSITION) {
                if (URLS_BY_POSITION.hasOwnProperty(position)) {
                    (rankings as any)[position] = [];
                    const curRankings = (rankings as any)[position];
                    const url = URLS_BY_POSITION[position];
                    this.logger.log(`Getting ranks from ${url}`);
                    const html = await axios.get(url);
                    const $ = cheerio.load(html.data);

                    $('input.wsis[type=checkbox]').each((index, element) => {
                        const ranking = {
                            ranking: parseInt(element.parent.parent.firstChild.firstChild.nodeValue, 10),
                            name: element.attribs['data-name'],
                            team: element.attribs['data-team'],
                            opp: element.attribs['data-opp'].trim(),
                            gameTime: moment(element.attribs['data-kickoff'], 'MM/DD hh:mm a').tz('America/New_York').toISOString(),
                        };

                        curRankings.push(ranking);
                    });
                }
            }

            rankings.timestamp = moment().tz('America/New_York').toISOString();

            return rankings;
        } catch (error) {
            this.logger.error(`Error loading rankings: ${error}`);
            throw error;
        }
    }
}
