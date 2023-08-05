import * as MediaLibrary from 'expo-media-library';
import { IDate } from './interface';

export function getDate(asset: MediaLibrary.Asset): IDate {
    const creationDate = new Date(asset.creationTime);
    const day = creationDate.getDate();
    const month = creationDate.getMonth() + 1;
    const year = creationDate.getFullYear();
    return {
        day: `${day}/`,
        month: `${month}/`,
        year: `${year}/`
    };
}