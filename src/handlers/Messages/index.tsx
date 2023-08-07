import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

import { IMessage } from './interface';
import { getDate } from '../Date';
import { getURI } from '../assets';

export async function getMessage(asset: MediaLibrary.Asset): Promise<IMessage> {
    const date = getDate(asset);
    const uri = await getURI(asset);
    const bytes = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    return {
        data: bytes,
        date,
        filename: asset.filename
    }
}

export async function sendMessage(message: IMessage, path: string): Promise<boolean> {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        await axios.post(path, message, { headers });
    } catch (error) {
        return false;
    }

    return true;
}