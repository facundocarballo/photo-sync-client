import { Center, Button } from "native-base";

export const Reset = () => {
    // Methods 
    const handleReset = async () => {};

    return (
        <>
            <Center>
                <Button w='80%' onPress={handleReset} bg='red.500'>RESET ALL</Button>
            </Center>
        </>
    );
};