import { collection, Ref } from 'typesaurus'
import { CreateUpdateTimes } from '../types/createUpdateTimes'

export interface User {
    id?: string,
    ref?: Ref<User>
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    timestamps: CreateUpdateTimes
}

export const users = collection<User>('users')


