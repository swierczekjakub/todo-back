export type NumBool = 0 | 1;

export interface TodoEntity {
    id?: string;
    name: string;
    isCompleted?: NumBool;
}