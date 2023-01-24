export interface User {
    id: number,
    firstName: string,
    lastName: string,
    age: number
}

export enum LoadingState {
    Idle,
    Pending,
    Succeeded,
    Failed
}