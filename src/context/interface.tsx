import { ILanguageJSON, Language } from "../languagues/interface";

export interface IPhotoSyncContext {
    // Attributes
    localIpAddress: string | null,
    service: string | undefined,
    infoMessage: string[],
    amountSended: number | undefined,
    totalAmount: number | undefined,
    language: Language,
    jsonLanguague: ILanguageJSON,

    // React useState Methods
    setLocalIpAddress: (_localIpAddress: string | null) => void,
    setService: (_service: string | undefined) => void,
    setInfoMessage: (_infoMessage: string[]) => void,
    setAmountSended: (_amountSended: number | undefined) => void,
    setTotalAmount: (_totalAmount: number | undefined) => void,
    setLanguage: (_languague: Language) => void,
    setJsonLanguague: (_jsonLanguague: ILanguageJSON) => void,

    // Methods
    handlePhotos: () => Promise<boolean>,
    handleVideos: () => Promise<boolean>,
    handleSelect: () => Promise<boolean>,

};