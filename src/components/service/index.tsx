import { CheckIcon, HStack, Select, Box, Spacer, Button, VStack, Center, Text } from "native-base";
import { useProvider } from "../../context";
import { SERVICE_PHOTOS, SERVICE_SELECT, SERVICE_VIDEOS } from "../../handlers/constants";

export const Service = () => {
    // Context
    const { service, setService } = useProvider();

    // Methods
    const handleService = async () => { };

    // Components
    return (
        <>
            <VStack bg='gray.200'>
                <Center>
                    <Text>Select the service that you want to use</Text>
                </Center>
                <Box h='10px' />
                <HStack w='full'>
                    <Box w='10px' />
                    <Select
                        selectedValue={service}
                        minWidth='60%'
                        minHeight='50px'
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
                    <Button
                        bg='blue.500'
                        minW='100px'
                        fontSize='20px'
                        fontWeight='bold'
                        onPress={handleService}>
                        Send
                    </Button>
                    <Box w='10px' />
                </HStack>
            </VStack>
        </>
    );
};