import React from "react";
import { VStack, HStack, Box, Spacer, Text, Button, Center, InfoIcon } from "native-base";
import { useProvider } from "../../context";
import { Alert } from "../alert";

export const IP = () => {
    // Context
    const { localIpAddress, setLocalIpAddress } = useProvider();

    // Attributes
    const [isOpen, setIsOpen] = React.useState<boolean>(false);


    // Methods
    const handleGetIpAddress = async () => { }

    // Component
    return (
        <>
            <Alert
                title="IP Address"
                info="This app needs the IP Address of your computer where it's running the server to connect with."
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
                    <Button w='80%' bg='blue.500' onPress={handleGetIpAddress}>GET IP ADDRESS</Button>
                </Center>
            </VStack>
        </>
    );
};