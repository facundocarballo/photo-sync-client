import { VStack, Text, Box, Center, Heading } from "native-base";
import { useProvider } from "../../context";

export const Messages = () => {
    // Context
    const { infoMessage, jsonLanguague } = useProvider();

    // Component
    return (
        <>
            {
                infoMessage.length > 0 ?
                    <Center>
                        <Heading>
                            {jsonLanguague.messages_title}
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