import React from "react";
import { VStack, HStack, Box, Spacer, Text, Button, Center, InfoIcon, Input } from "native-base";
import { useProvider } from "../../context";
import { Alert } from "../alert";
import { saveData } from "../../handlers/storage";
import { IP_ADDRESS_KEY } from "../../handlers/constants";

export const IP = () => {
    // Context
    const { localIpAddress, setLocalIpAddress } = useProvider();

    // Attributes
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [ipAddress, setIpAddress] = React.useState<string>('');


    // Methods
    const handleSaveIP = async () => {
        setLocalIpAddress(ipAddress);
        await saveData(IP_ADDRESS_KEY, ipAddress);
    }

    // Component
    return (
        <>
            <Alert
                title="IP Address"
                info="This app needs the IP Address of your computer where it's running the server to connect with. Check the Desktop App to see your IP Address."
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
                                    `You have to GET the IP Address of your server.` :
                                    `The IP Address saved in this smartphone is: ${localIpAddress}`
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
                <Center>
                    <Input
                    placeholder="192.168.1.39"
                    value={ipAddress}
                    onChangeText={setIpAddress}
                    w='60%'
                    padding={3}
                    borderRadius={10}
                    />
                    <Button bg='blue.500' onPress={handleSaveIP}>SAVE</Button>
                </Center>
            </VStack>
        </>
    );
};