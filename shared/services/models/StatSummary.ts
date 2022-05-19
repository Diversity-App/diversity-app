/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StatItem } from './StatItem';

export type StatSummary = {
    items: Array<StatItem>;
    total: number;
    categories: Array<string>;
    tags: Array<string>;
    tagsRatio: Array<{
        name: string;
        count: number;
    }>;
    categoriesRatio: Array<{
        name: string;
        count: number;
    }>;
};
