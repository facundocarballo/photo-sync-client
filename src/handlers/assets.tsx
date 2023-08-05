import * as MediaLibrary from 'expo-media-library';
import { ERROR_ASSETS_TO_SEND_UNDEFINED, ERROR_GETTING_ASSETS, ERROR_GETTING_ASSETS_NEEDEDS, GRANTED, MAX_AMOUNT_OF_ASSETS, MEDIA_LIBRARY_PERMISSION_DENEID } from './constants';
import { useProvider } from '../context';
import { getData, saveData } from './storage';
import { getMessage, sendMessage } from './Messages';

export async function getAssets(mediaType: MediaLibrary.MediaTypeValue) {
    const { infoMessage, setInfoMessage } = useProvider();
    try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== GRANTED) {
            let info = infoMessage;
            info.push(MEDIA_LIBRARY_PERMISSION_DENEID);
            setInfoMessage(info);
            return undefined;
        }

        const assets = await MediaLibrary.getAssetsAsync(
            {
                mediaType: mediaType,
                first: MAX_AMOUNT_OF_ASSETS
            }
        );
        return assets.assets;
    } catch (error) {
        let info = infoMessage;
        info.push(ERROR_GETTING_ASSETS);
        setInfoMessage(info);
    }

    return undefined;
}

export async function getAssetsNeeded(mediaType: MediaLibrary.MediaTypeValue): Promise<MediaLibrary.Asset[] | null> {
    const { infoMessage, setInfoMessage } = useProvider();
    const assets = await getAssets(mediaType);
    let assetsNeeded: MediaLibrary.Asset[] = [];

    if (assets == undefined) {
        let info = infoMessage;
        info.push(ERROR_GETTING_ASSETS_NEEDEDS);
        setInfoMessage(info);
        return null;
    }

    for (const asset of assets) {
        const isSended = await getData(asset.id);
        if (isSended == null) {
            assetsNeeded.push(asset);
        }
    }

    return assetsNeeded;
}

export function findAsset(id: string | null | undefined, assets: MediaLibrary.Asset[]): MediaLibrary.Asset | null {
    if (id == null || id == undefined) return null;

    for (const asset of assets) {
        if (asset.id == id) {
            return asset;
        }
    }
    return null;
}

export async function saveAsset(asset: MediaLibrary.Asset): Promise<boolean> {
    return await saveData(asset.id, true);
}

export async function sendAssets(path: string): Promise<boolean> {
    const { assetsToSend, infoMessage, setInfoMessage } = useProvider();
    if (assetsToSend == undefined) {
        let info = infoMessage;
        info.push(`Error sending assets. ${ERROR_ASSETS_TO_SEND_UNDEFINED}`);
        setInfoMessage(info);
        return false;
    }

    for (const asset of assetsToSend) {
        const message = await getMessage(asset);
        await sendMessage(message, path);
        await saveAsset(asset);
    }

    return true;
}

export async function getURI(asset: MediaLibrary.Asset): Promise<string> {
    let fileUri = asset.uri;
    if (fileUri.startsWith('ph://')) {
        // Convert the URI with 'ph://' to an URI with 'file://'
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        fileUri = assetInfo.localUri ?? fileUri;
    }

    return fileUri;
}