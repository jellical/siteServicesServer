import { collection, Ref } from 'typesaurus'
import { CreateUpdateTimes } from '../types/createUpdateTimes'
import { User } from './user'

export interface AuthToken {
    isActive: boolean,
    user: Ref<User>,
    timestamps: CreateUpdateTimes
}

export const authTokens = collection<AuthToken>('authTokens')