import * as MediaLibrary from 'expo-media-library';

export interface IPhotoSyncContext {
    // Attributes
    localIpAddress: string | null,
    service: string | undefined,
    infoMessage: string[],
    amountSended: number | undefined,
    totalAmount: number | undefined,
    assetsToSend: MediaLibrary.Asset[] | undefined,
    alertIsOpen: boolean,
    alertTitle: string,
    alertInfo: string,

    // React useState Methods
    setLocalIpAddress: (_localIpAddress: string | null) => void,
    setService: (_service: string | undefined) => void,
    setInfoMessage: (_infoMessage: string[]) => void,
    setAmountSended: (_amountSended: number | undefined) => void,
    setTotalAmount: (_totalAmount: number | undefined) => void,
    setAlertIsOpen: (_alertIsOpen: boolean) => void,
    setAlertTitle: (_alertTitle: string) => void,
    setAlertInfo: (_alertInfo: string) => void,

    // Methods
    handlePhotos: () => Promise<boolean>,
    handleVideos: () => Promise<boolean>,
    handleSelect: () => Promise<boolean>,


    // AlertDialog


}