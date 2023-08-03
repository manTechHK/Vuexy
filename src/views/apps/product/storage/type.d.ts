import type { Except } from 'type-fest';

export interface BrokenProduct{
    id:         string,
    numProduct: number,
    location:   string,
    date:       string,
    description: string,
}
export type NewBrokenProduct = Except<BrokenProduct, 'id'>