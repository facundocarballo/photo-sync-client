import { IDate } from "../Date/interface";

export interface IMessage {
    data: string,
    date: IDate,
    filename: string
}