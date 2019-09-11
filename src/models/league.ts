/* tslint:disable:variable-name max-line-length */
import * as mongoose from 'mongoose';
import * as Joi from '@hapi/joi';
import weekService from '../services/week/week.service';

export const POSITIONS = [
    'QB',
    'RB',
    'WR',
    'TE',
    'K',
    'DST',
];

export const TEAM_COMPOSITION = ['QB', 'RB', 'RB', 'WR', 'WR', 'WR', 'TE', 'K', 'DST'];

export interface Ranking {
    ranking: number;
    name: string;
    team: string;
    opp: string;
    gameTime: string;
}

export const RankingSchema = Joi.object().keys({
    ranking: Joi.number().required(),
    name: Joi.string().required(),
    team: Joi.string().required(),
    opp: Joi.string().required(),
    gameTime: Joi.string().isoDate().allow(null).required(),
}).unknown();

export interface RankingByPosition {
    [position: string]: Ranking;
}

export const RankingByPositionSchema = Joi.object().keys(POSITIONS.reduce((res, pos) => {
    res[pos] = RankingSchema;

    return res;
}, {} as any)).unknown();

export interface TeamWeek {
    id: string;
    passOffenseRank: number;
    rushOffenseRank: number;
    passDefenseRank: number;
    rushDefenseRank: number;
    isHome: boolean;
    spread: number;
    kickoff: string;
}

export const TeamWeekSchema = Joi.object().keys({
    id: Joi.string().required(),
    passOffenseRank: Joi.number().integer().positive().required(),
    rushOffenseRank: Joi.number().integer().positive().required(),
    passDefenseRank: Joi.number().integer().positive().required(),
    rushDefenseRank: Joi.number().integer().positive().required(),
    isHome: Joi.boolean().required(),
    spread: Joi.number().required(),
    kickoff: Joi.string().isoDate().required(),
});

export interface TeamMatchup {
    team: TeamWeek;
    opponent: TeamWeek;
}

export const TeamMatchupSchema = Joi.object().keys({
    team: TeamWeekSchema,
    opponent: TeamWeekSchema,
});

export interface Injury {
    status: string;
    details: string;
}

export const InjurySchema = Joi.object().keys({
    status: Joi.string().required(),
    details: Joi.string().required(),
});

export interface Player {
    id: string;
    position: string;
    name?: string;
    team?: string;
    ranking?: RankingByPosition;
    expired?: boolean;
    byeWeek?: number;
    matchup?: TeamMatchup;
    injury?: Injury;
}

export const PlayerSchema = Joi.object().keys({
    id: Joi.string().allow('').allow(null).required(),
    position: Joi.string().valid(POSITIONS).required(),
    name: Joi.string().allow('').allow(null).optional(),
    team: Joi.string().allow('').allow(null).optional(),
    ranking: RankingByPositionSchema.allow(null).optional(),
    expired: Joi.boolean().allow(null).optional(),
    byeWeek: Joi.number().integer().optional().max(weekService.weeks().length).min(1).allow(null),
    matchup: TeamMatchupSchema.optional().allow(null),
    injury: InjurySchema.optional().allow(null),
}).unknown();

export interface Rankings {
    QB: Ranking[];
    RB: Ranking[];
    WR: Ranking[];
    TE: Ranking[];
    K: Ranking[];
    DST: Ranking[];
    timestamp: string;
    _id: any;
    [position: string]: Ranking | string | any;
}

export interface Players {
    timestamp: number;
    player: Player[];
    _id: any;
}

export interface PlayersById {
    [id: string]: Player;
}

export interface PlayersByPosition {
    [position: string]: Player[];
}

export const PlayersByPositionSchema = Joi.object().keys(POSITIONS.reduce((res, pos) => {
    res[pos] = Joi.array().items(PlayerSchema);

    return res;
}, {} as any)).unknown();

export const TeamPayloadSchema = Joi.array().items(PlayerSchema).length(TEAM_COMPOSITION.length).required();
