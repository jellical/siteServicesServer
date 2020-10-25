import { collection, Ref } from 'typesaurus'

import { CreateUpdateTimes } from '../types/createUpdateTimes'
import { User } from './user'

export interface WebSite {
    url: string,
    title: string,
    isActive: boolean,
    timestamps: CreateUpdateTimes,
    user: Ref<User>
}

export const webSites = collection<WebSite>('webSites')


