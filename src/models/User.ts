import {collection} from 'typesaurus'

export type User = {
    name:string,
    email:string,
    password:string
}

export const users = collection<User>('users')


