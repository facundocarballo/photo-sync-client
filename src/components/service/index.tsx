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
        jsonLanguague,
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
                title={jsonLanguague.service_title}
                info={jsonLanguague.service_info}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <VStack bg='gray.200'>
                <HStack w='full'>
                    <Spacer />
                    <Center>
                        <Text>{jsonLanguague.service_select_msg}</Text>
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
                        placeholder={jsonLanguague.service_select_placeholder}
                        _selectedItem={{
                            bg: 'blue.300',
                            endIcon: <CheckIcon size='4' />
                        }}
                        mt={1}
                        onValueChange={itemValue => setService(itemValue)}
                    >
                        <Select.Item
                            label={jsonLanguague.service_select_photos_label}
                            value={SERVICE_PHOTOS}
                        />
                        <Select.Item
                            label={jsonLanguague.service_select_videos_label}
                            value={SERVICE_VIDEOS}
                        />
                        <Select.Item
                            label={jsonLanguague.service_select_select_label}
                            value={SERVICE_SELECT}
                        />
                    </Select>
                    <Spacer />
                    <Center>
                        <Button
                            bg='blue.500'
                            minW='100px'
                            h='40px'
                            fontWeight='bold'
                            onPress={handleService}>
                            {jsonLanguague.service_send}
                        </Button>
                    </Center>
                    <Box w='10px' />
                </HStack>
            </VStack>
        </>
    );
};