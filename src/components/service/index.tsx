import React from "react";
import { CheckIcon, HStack, Select, Box, Spacer, Button, VStack, Center, Text, InfoIcon } from "native-base";
import { useProvider } from "../../context";
import { ERROR_IMAGE_PICKER, SERVICE_PHOTOS, SERVICE_SELECT, SERVICE_VIDEOS } from "../../handlers/constants";
import { Alert } from "../alert";

export const Service = () => {
    // Context
    const {
        service,
        infoMessage,

        setService,
        handlePhotos,
        handleVideos,
        handleSelect,
        setInfoMessage
    } = useProvider();

    // Attributes
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    // Methods
    const handleService = async () => {
        let res: boolean = false;
        let info: string[] = [];
        setInfoMessage([]); // adding this line, the component of the messages render perfectly.
        switch (service) {
            case SERVICE_PHOTOS:
                await handlePhotos();
                break;
            case SERVICE_VIDEOS:
                await handleVideos();
                break;
            case SERVICE_SELECT:
                res = await handleSelect();
                if (!res) {
                    info = infoMessage;
                    info.push(ERROR_IMAGE_PICKER);
                    setInfoMessage(info);
                }
                break;
        }
    };

    // Components
    return (
        <>
            <Alert
                title="Service"
                info="This app have three services that you can use to send your photos and videos to your computer. You can send all the photos of your smartphone (SEND PHOTOS [ALL]). You can send all the videos that you have in your smartphone (SEND VIDEOS [ALL]). You can send some selected photos and videos of your smartphone (Select some Photos/Videos)."
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <VStack bg='gray.200'>
                <HStack w='full'>
                    <Spacer />
                    <Center>
                        <Text>Select the service that you want to use</Text>
                    </Center>
                    <Spacer />
                    <Button bg='gray.200' onPress={() => setIsOpen(true)}>
                        <InfoIcon />
                    </Button>
                    <Box w='10px' />
                </HStack>
                <Box h='10px' />
                <HStack w='full'>
                    <Box w='10px' />
                    <Select
                        selectedValue={service}
                        minWidth='60%'
                        minHeight='40px'
                        accessibilityLabel="Choose Service"
                        placeholder="Choose Service"
                        _selectedItem={{
                            bg: 'blue.300',
                            endIcon: <CheckIcon size='4' />
                        }}
                        mt={1}
                        onValueChange={itemValue => setService(itemValue)}
                    >
                        <Select.Item label="Send Photos [ALL]" value={SERVICE_PHOTOS} />
                        <Select.Item label="Send Videos [ALL]" value={SERVICE_VIDEOS} />
                        <Select.Item label="Select some Photos/Videos" value={SERVICE_SELECT} />
                    </Select>
                    <Spacer />
                    <Center>
                        <Button
                            bg='blue.500'
                            minW='100px'
                            h='40px'
                            fontWeight='bold'
                            onPress={handleService}>
                            Send
                        </Button>
                    </Center>
                    <Box w='10px' />
                </HStack>
            </VStack>
        </>
    );
};