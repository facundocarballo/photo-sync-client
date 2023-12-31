import React from "react";
import { VStack, HStack, Box, Spacer, Text, Button, Center, InfoIcon, Input } from "native-base";
import { useProvider } from "../../context";
import { Alert } from "../alert";
import { getData, saveData } from "../../handlers/storage";
import { ERROR_GETTING_DATA, ERROR_SAVING_DATA, IP_ADDRESS_KEY } from "../../handlers/constants";

export const IP = () => {
    // Context
    const {
        localIpAddress,
        infoMessage,
        jsonLanguague,
        setLocalIpAddress,
        setInfoMessage
    } = useProvider();

    // Attributes
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [ipAddress, setIpAddress] = React.useState<string>('');

    // Methods
    const handleSaveIP = async () => {
        setLocalIpAddress(ipAddress);
        const res = await saveData(IP_ADDRESS_KEY, ipAddress);
        if (!res) {
            let info = infoMessage;
            info.push(ERROR_SAVING_DATA);
            setInfoMessage(info);
        }
    }

    const onCreate = async () => {
        const ip = await getData(IP_ADDRESS_KEY);
        if (ip == false) {
            let info = infoMessage;
            info.push(ERROR_GETTING_DATA);
            setInfoMessage(info);
            return;
        }
        setLocalIpAddress(ip);
    };

    // UseEffect
    React.useEffect(() => {
        onCreate();
    }, []);

    // Component
    return (
        <>
            <Alert
                title={jsonLanguague.ip_address_title}
                info={jsonLanguague.ip_address_info}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <VStack>
                <HStack w='full'>
                    <Spacer />
                    <Center>
                        <Text>
                            {
                                localIpAddress == null ?
                                    jsonLanguague.ip_address_get_msg :
                                    `${jsonLanguague.ip_address_title}: ${localIpAddress}`
                            }
                        </Text>
                    </Center>
                    <Spacer />
                    <Button bg='gray.200' onPress={() => setIsOpen(true)}>
                        <InfoIcon />
                    </Button>
                    <Box w='10px' />
                </HStack>
                <Center>

                </Center>
                <Box h='10px' />
                <HStack w='full'>
                    <Center w='80%'>
                        <Input
                            placeholder="192.168.1.39"
                            value={ipAddress}
                            onChangeText={setIpAddress}
                            w='80%'
                            padding={3}
                            borderRadius={10}
                        />
                    </Center>
                    <Button bg='blue.500' onPress={handleSaveIP}>{jsonLanguague.ip_address_save}</Button>
                </HStack>

            </VStack>
        </>
    );
};