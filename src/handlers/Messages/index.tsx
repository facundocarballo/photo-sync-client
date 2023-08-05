import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

import { IMessage } from './interface';
import { getDate } from '../Date';
import { getURI } from '../assets';
import { useProvider } from '../../context';
import { ERROR_AMOUNT_SENDED_UNDEFINED, ERROR_SENDING_MESSAGE } from '../constants';

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
    const { amountSended, setAmountSended, infoMessage, setInfoMessage } = useProvider();
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        await axios.post(path, message, { headers });
        if (amountSended == undefined) {
            let info = infoMessage;
            info.push(ERROR_AMOUNT_SENDED_UNDEFINED);
            setInfoMessage(info);
            return false;
        }
        let amountSendedAux = amountSended + 1;
        setAmountSended(amountSendedAux);
    } catch (error) {
        let info = infoMessage;
        info.push(ERROR_SENDING_MESSAGE);
        setInfoMessage(info);
        return false;
    }

    return true;
}