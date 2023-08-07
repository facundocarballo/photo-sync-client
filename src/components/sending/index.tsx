import { Center, Text, Progress } from "native-base";
import { useProvider } from "../../context";
import { SERVICE_SELECT } from "../../handlers/constants";

export const Sending = () => {
    // Context
    const { amountSended, totalAmount, service, jsonLanguague } = useProvider();

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
                        <Text>{jsonLanguague.sending_title} {amountSended} of {totalAmount} {service == SERVICE_SELECT ? null : service}</Text>
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