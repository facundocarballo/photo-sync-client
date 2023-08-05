import AsyncStorage from '@react-native-async-storage/async-storage'
import { useProvider } from '../context';
import { ERROR_GETTING_DATA, ERROR_SAVING_DATA } from './constants';

export async function saveData(key: string, value: any): Promise<boolean> {
    const { infoMessage, setInfoMessage } = useProvider();
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        let info = infoMessage;
        info.push(ERROR_SAVING_DATA);
        setInfoMessage(info);
        return false;
    }
    return true;
}

export async function getData(key: string): Promise<string|null> {
    const { infoMessage, setInfoMessage } = useProvider();
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (err) {
        let info = infoMessage;
        info.push(ERROR_GETTING_DATA);
        setInfoMessage(info);
    }
    return null;
}
