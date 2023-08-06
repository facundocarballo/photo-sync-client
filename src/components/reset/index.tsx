import React from "react";
import { Center, Button, HStack, Box, InfoIcon, Spacer } from "native-base";
import { Alert } from "../alert";

export const Reset = () => {

    // Attributes
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    // Methods 
    const handleReset = async () => { };

    return (
        <>
            <Alert
                title="RESET"
                info="This RESET Button will delete of the memory all the photos that you sended. So you can sended again. Because the app when sends a photo or video will mark that item as sended and will ignore that item to send on future request."
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <HStack w='full'>
                <Spacer />
                <Center w='80%'>
                    <Button w='80%' onPress={handleReset} bg='red.500'>RESET ALL</Button>
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