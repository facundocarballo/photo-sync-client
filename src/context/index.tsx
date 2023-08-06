import React from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from "expo-image-picker";
import { IPhotoSyncContext } from './interface';
import { findAsset, getAssetsNeeded, saveAsset, sendAssets } from '../handlers/assets';
import { IMAGE_ENDPOINT, PHOTO_MEDIA_TYPE, PORT, VIDEO_ENDPOINT, VIDEO_MEDIA_TYPE } from '../handlers/constants';
import { getMessage, sendMessage } from '../handlers/Messages';


// Context Initialization
const PhotoSyncContext = React.createContext<IPhotoSyncContext>({
    // Attributes
    localIpAddress: null,
    service: undefined,
    infoMessage: [],
    amountSended: 0,
    totalAmount: 0,
    assetsToSend: [],

    // React useState Methods
    setLocalIpAddress: () => { },
    setService: () => { },
    setInfoMessage: () => { },
    setAmountSended: () => { },
    setTotalAmount: () => { },

    // Methods
    handlePhotos: async () => false,
    handleVideos: async () => false,
    handleSelect: async () => false

});

// Context Creation
export const ContextProvider: React.FC<any> = (props:any) => {
    // React.useState Variables
    const [localIpAddress, setLocalIpAddress] = React.useState<string | null>(null);
    const [service, setService] = React.useState<string | undefined>(undefined);
    const [infoMessage, setInfoMessage] = React.useState<string[]>([]);
    const [amountSended, setAmountSended] = React.useState<number | undefined>(0);
    const [totalAmount, setTotalAmount] = React.useState<number | undefined>(0);

    // Variables
    let assetsToSend: MediaLibrary.Asset[] = [];

    // Methods
    function getImgPath(): string {
        return `http://${localIpAddress}:${PORT}/${IMAGE_ENDPOINT}`;
    }

    function getVideoPath(): string {
        return `http://${localIpAddress}:${PORT}/${VIDEO_ENDPOINT}`;
    }

    async function handlePhotos(): Promise<boolean> {
        const assets = await getAssetsNeeded(PHOTO_MEDIA_TYPE);
        if (assets == null) return false;

        setTotalAmount(assetsToSend.length);
        const res = await sendAssets(getImgPath());
        assetsToSend = [];

        return res;
    }

    async function handleVideos(): Promise<boolean> {
        const assets = await getAssetsNeeded(VIDEO_MEDIA_TYPE);
        if (assets == null) return false;

        setTotalAmount(assetsToSend.length);
        const res = await sendAssets(getImgPath());
        assetsToSend = [];

        return res;
    }

    async function handleSelect(): Promise<boolean> {
        // Get All assets to send
        const images = await getAssetsNeeded(PHOTO_MEDIA_TYPE);
        const videos = await getAssetsNeeded(VIDEO_MEDIA_TYPE);
        if (images == null || videos == null) return false;

        images.forEach(img => assetsToSend.push(img));
        videos.forEach(vid => assetsToSend.push(vid));

        // Get ImagePickerAsset
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
        });

        const assets = result.assets;

        if (assets == null) return false;

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

    const values = React.useMemo(() => ({
        localIpAddress,
        service,
        infoMessage,
        amountSended,
        totalAmount,
        assetsToSend,
        
        setLocalIpAddress,
        setService,
        setInfoMessage,
        setAmountSended,
        setTotalAmount,

        handlePhotos,
        handleVideos,
        handleSelect,
    }), []);

    return <PhotoSyncContext.Provider value={values}>{props.children}</PhotoSyncContext.Provider>
};

export function useProvider(): IPhotoSyncContext {
    const context = React.useContext(PhotoSyncContext);
    if (!context) throw new Error('useProvider have to be inside of the PhotoSyncContext');
    return context;
}