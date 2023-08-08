import React from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker";
import { IPhotoSyncContext } from './interface';
import { findAsset, getAssetsNeeded, saveAsset } from '../handlers/assets';
import { ERROR_AMOUNT_SENDED_UNDEFINED, ERROR_NO_ASSETS, ERROR_SAVING_DATA, ERROR_SENDING_MESSAGE, IMAGE_ENDPOINT, PHOTO_MEDIA_TYPE, PORT, VIDEO_ENDPOINT, VIDEO_MEDIA_TYPE } from '../handlers/constants';
import { getMessage, sendMessage } from '../handlers/Messages';
import { ILanguageJSON, Language } from '../languagues/interface';
import EN from '../languagues/en.json';


// Context Initialization
const PhotoSyncContext = React.createContext<IPhotoSyncContext>({
    // Attributes
    localIpAddress: null,
    service: undefined,
    infoMessage: [],
    amountSended: 0,
    totalAmount: 0,
    language: "en",
    jsonLanguague: EN,

    // React useState Methods
    setLocalIpAddress: () => { },
    setService: () => { },
    setInfoMessage: () => { },
    setAmountSended: () => { },
    setTotalAmount: () => { },
    setLanguage: () => { },
    setJsonLanguague: () => { },

    // Methods
    handlePhotos: async () => false,
    handleVideos: async () => false,
    handleSelect: async () => false

});

// Context Creation
export const ContextProvider: React.FC<any> = (props: any) => {
    // React.useState Variables
    const [localIpAddress, setLocalIpAddress] = React.useState<string | null>(null);
    const [service, setService] = React.useState<string | undefined>(undefined);
    const [infoMessage, setInfoMessage] = React.useState<string[]>([]);
    const [amountSended, setAmountSended] = React.useState<number | undefined>(0);
    const [totalAmount, setTotalAmount] = React.useState<number | undefined>(0);
    const [language, setLanguage] = React.useState<Language>("en");
    const [jsonLanguague, setJsonLanguague] = React.useState<ILanguageJSON>(EN);

    // Variables


    // Methods
    function getImgPath(): string {
        return `http://${localIpAddress}:${PORT}/${IMAGE_ENDPOINT}`;
    }

    function getVideoPath(): string {
        return `http://${localIpAddress}:${PORT}/${VIDEO_ENDPOINT}`;
    }

    async function sendAssets(path: string, assetsToSend: MediaLibrary.Asset[]): Promise<boolean> {
        let res: boolean = false;
        let info: string[] = [];

        for (const asset of assetsToSend) {
            const message = await getMessage(asset);

            res = await sendMessage(message, path);
            if (!res) {
                info = infoMessage;
                info.push(ERROR_SENDING_MESSAGE);
                setInfoMessage(info);
                return false;
            }

            res = await saveAsset(asset);
            if (!res) {
                info = infoMessage;
                info.push(ERROR_SAVING_DATA);
                setInfoMessage(info);
                return false;
            }

            if (amountSended == undefined) {
                info = infoMessage;
                info.push(ERROR_AMOUNT_SENDED_UNDEFINED);
                setInfoMessage(info);
                return false;
            };

            setAmountSended(prevAmountSended => prevAmountSended != undefined ? prevAmountSended + 1 : undefined);
        }

        return true;
    }

    async function handlePhotos(): Promise<boolean> {
        const assets = await getAssetsNeeded(PHOTO_MEDIA_TYPE);
        if (assets == null) {
            let info = infoMessage;
            info.push(ERROR_NO_ASSETS);
            setInfoMessage(info);
            return false;
        }
        setTotalAmount(assets.length);
        return await sendAssets(getImgPath(), assets);
    }

    async function handleVideos(): Promise<boolean> {
        const assets = await getAssetsNeeded(VIDEO_MEDIA_TYPE);
        if (assets == null) {
            let info = infoMessage;
            info.push(ERROR_NO_ASSETS);
            setInfoMessage(info);
            return false;
        }
        setTotalAmount(assets.length);
        return await sendAssets(getImgPath(), assets);
    }

    async function handleSelect(): Promise<boolean> {
        let assetsToSend: MediaLibrary.Asset[] = [];

        // Get All assets to send
        const images = await getAssetsNeeded(PHOTO_MEDIA_TYPE);
        const videos = await getAssetsNeeded(VIDEO_MEDIA_TYPE);
        if (images == null && videos == null) {
            let info = infoMessage;
            info.push(`All of your photos and videos are stored in the server. If you want to send it again, press the RESET Button.`);
            setInfoMessage(info);
            return true;
        }

        images?.forEach(img => assetsToSend.push(img));
        videos?.forEach(vid => assetsToSend.push(vid));

        // Get ImagePickerAsset
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
        });

        const assets = result.assets;

        if (assets == null) {
            let info = infoMessage;
            info.push(ERROR_NO_ASSETS);
            setInfoMessage(info);
            return false;
        }

        setTotalAmount(assets.length);

        for (const asset of assets) {
            const assetFinded = findAsset(asset.assetId, assetsToSend);
            if (assetFinded == null) {
                let info = infoMessage;
                info.push(`This asset is already in your computer. Asset ID: ${asset.assetId}`);
                setInfoMessage(info);
            } else {
                const message = await getMessage(assetFinded);
                await sendMessage(message, asset.duration == null ? getImgPath() : getVideoPath());
                await saveAsset(assetFinded);
            }
        }

        assetsToSend = [];
        return true;
    }

    const values = {
        localIpAddress,
        service,
        infoMessage,
        amountSended,
        totalAmount,
        language,
        jsonLanguague,

        setLocalIpAddress,
        setService,
        setInfoMessage,
        setAmountSended,
        setTotalAmount,
        setLanguage,
        setJsonLanguague,

        handlePhotos,
        handleVideos,
        handleSelect,
    };

    return <PhotoSyncContext.Provider value={values}>{props.children}</PhotoSyncContext.Provider>
};

export function useProvider(): IPhotoSyncContext {
    const context = React.useContext(PhotoSyncContext);
    if (!context) throw new Error('useProvider have to be inside of the PhotoSyncContext');
    return context;
}