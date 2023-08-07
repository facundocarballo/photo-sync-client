import React from "react";
import * as MediaLibrary from 'expo-media-library';
import { Center, Button, HStack, Box, InfoIcon, Spacer } from "native-base";
import { Alert } from "../alert";
import { getAssets } from "../../handlers/assets";
import { PHOTO_MEDIA_TYPE, VIDEO_MEDIA_TYPE } from "../../handlers/constants";
import { saveData } from "../../handlers/storage";
import { useProvider } from "../../context";

export const Reset = () => {
    // Context
    const { jsonLanguague } = useProvider();
    // Attributes
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    // Methods 
    const handleReset = async () => { 
        let arr: MediaLibrary.Asset[] = [];
        const images = await getAssets(PHOTO_MEDIA_TYPE);
        const videos = await getAssets(VIDEO_MEDIA_TYPE);
        images?.forEach((img) => arr.push(img));
        videos?.forEach((vid) => arr.push(vid));

        for (const asset of arr) {
            await saveData(asset.id, null);
        }
    };

    return (
        <>
            <Alert
                title={jsonLanguague.reset_title}
                info={jsonLanguague.reset_info}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <HStack w='full'>
                <Spacer />
                <Center w='80%'>
                    <Button w='80%' onPress={handleReset} bg='red.500'>{jsonLanguague.reset_title}</Button>
                </Center>
                <Spacer />
                <Button bg='gray.200' onPress={() => setIsOpen(true)}>
                    <InfoIcon />
                </Button>
                <Box w='10px' />
            </HStack>
        </>
    );
};