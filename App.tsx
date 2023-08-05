import React from 'react';
import { VStack, NativeBaseProvider, Center, Heading, Box, Divider } from 'native-base';
import { ContextProvider, useProvider } from './src/context';
import { getData } from './src/handlers/storage';
import { IP_ADDRESS_KEY } from './src/handlers/constants';
import { IP } from './src/components/IP';

export default function App() {
  // Context
  const { setLocalIpAddress } = useProvider();

  // Methods
  const onCreate = async () => {
    const ip = await getData(IP_ADDRESS_KEY);
    setLocalIpAddress(ip);
  };

  // UseEffect
  React.useEffect(() => {
    onCreate();
  }, []);

  return (
    <ContextProvider>
      <NativeBaseProvider>
        <VStack bg='gray.400'>
          <Box h='50px' />
          <Center> 
            <Heading>PhotoCollector</Heading> 
          </Center>
          <Box h='5px' />
          <Divider />
          <Box h='5px' />
          <IP />
          <Box h='5px' />
          <Divider />
          <Box h='5px' />
          
        </VStack>
      </NativeBaseProvider>
    </ContextProvider>
  );
}