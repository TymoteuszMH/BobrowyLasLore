import { ITypes } from "./type";
import { IUser } from "./user";
export interface IPost{
    PostId: any,
    Type: ITypes[],
    Author: IUser[],
    CreationDate: string | Date,
    PostTitle: string,
    PostPhoto: string,
    PostContent: string
}