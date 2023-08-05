import { VStack, HStack, Box, Spacer, Text, Button, Center } from "native-base";
import { useProvider } from "../../context";

export const IP = () => {
    // Context
    const { localIpAddress, setLocalIpAddress } = useProvider();

    // Methods
    const handleGetIpAddress = async () => { }

    // Component
    return (
        <>
            <VStack>
                <Center>
                    <Text>
                        {
                            localIpAddress == null ?
                                `You have to GET the IP Address of your server.` :
                                `The IP Address saved in this smartphone is: ${localIpAddress}`
                        }
                    </Text>
                </Center>
                <Box h='10px' />
                <Center>
                    <Button w='80%' bg='blue.500' onPress={handleGetIpAddress}>GET IP ADDRESS</Button>
                </Center>
            </VStack>
        </>
    );
};