import * as MediaLibrary from 'expo-media-library';
import { GRANTED, MAX_AMOUNT_OF_ASSETS } from './constants';
import { getData, saveData } from './storage';

export async function getAssets(mediaType: MediaLibrary.MediaTypeValue): Promise<MediaLibrary.Asset[] | null> {
    try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== GRANTED) {
            return null;
        }

        const assets = await MediaLibrary.getAssetsAsync(
            {
                mediaType: mediaType,
                first: MAX_AMOUNT_OF_ASSETS
            }
        );
        return assets.assets;
    } catch (error) {

    }

    return null;
}

export async function getAssetsNeeded(mediaType: MediaLibrary.MediaTypeValue): Promise<MediaLibrary.Asset[] | null> {
    const assets = await getAssets(mediaType);
    let assetsNeeded: MediaLibrary.Asset[] = [];

    if (assets == null) {
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

export async function getURI(asset: MediaLibrary.Asset): Promise<string> {
    let fileUri = asset.uri;
    if (fileUri.startsWith('ph://')) {
        // Convert the URI with 'ph://' to an URI with 'file://'
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        fileUri = assetInfo.localUri ?? fileUri;
    }

    return fileUri;
}