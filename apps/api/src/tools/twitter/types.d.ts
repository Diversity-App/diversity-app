export interface ILiked {
    data: { id: string; text: string }[];
    meta: { result_count: number; next_token?: string; previous_token?: string };
}
