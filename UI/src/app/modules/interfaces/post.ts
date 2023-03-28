import { ITypes } from "./type";
import { IUser } from "./user";
export interface IPost{
    PostId: number,
    Type: ITypes,
    User: IUser,
    CreationDate: string | Date,
    PostTitle: string,
    PostPhoto: string,
    PostContent: string
}