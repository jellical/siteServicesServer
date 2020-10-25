import { newTimestamp } from '../config/db'

export interface CreateUpdateTimes {
    created: typeof newTimestamp,
    lastUpdated: typeof newTimestamp
}