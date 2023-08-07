import AsyncStorage from '@react-native-async-storage/async-storage'

export async function saveData(key: string, value: any|string): Promise<boolean> {
    try {
        if (typeof value === 'string') {
            await AsyncStorage.setItem(key, value);
        } else {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }
    } catch (err) {
        return false;
    }
    return true;
}

export async function getData(key: string): Promise<string|null|false> {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (err) {
        return false;
    }
}
