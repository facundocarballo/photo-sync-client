import { VStack, Text, Box, Center, Heading } from "native-base";
import { useProvider } from "../../context";
import { v4 as uuidv4 } from 'uuid';

export const Messages = () => {
    // Context
    const { infoMessage } = useProvider();

    // Component
    return (
        <>
            {
                infoMessage.length > 0 ?
                    <Center>
                        <Heading>
                            Messages from the Server
                        </Heading>
                    </Center> : null
            }
            {
                infoMessage.map((msg, idx) =>
                    <VStack key={idx}>
                        <Box h='5px' />
                        <Text paddingX={2}>{msg}</Text>
                    </VStack>)
            }
        </>
    );
};