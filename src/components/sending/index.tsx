import { VStack, Center, Text, Progress } from "native-base";
import { useProvider } from "../../context";
import { SERVICE_SELECT } from "../../handlers/constants";

export const Sending = () => {
    // Context
    const { amountSended, totalAmount, service } = useProvider();

    // Methods
    const getProgessAmount = () => {
        if (amountSended == undefined || totalAmount == undefined) return 0;
        return Math.trunc((amountSended * 100) / totalAmount);
    }


    // Component
    return (
        <>
            {
                amountSended != undefined && amountSended > 0 ?
                    <Center>
                        <Text>Sending {amountSended} of {totalAmount} {service == SERVICE_SELECT ? null : service}</Text>
                        <Progress
                            h='20px'
                            w='90%'
                            colorScheme='darkBlue'
                            bg='gray.100'
                            value={getProgessAmount()}
                            mx='4'
                        />
                    </Center> : null
            }
        </>
    );
};