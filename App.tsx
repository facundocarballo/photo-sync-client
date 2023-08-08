import React from 'react';
import { VStack, NativeBaseProvider, Center, Heading, Box, Spacer, HStack } from 'native-base';
import { ContextProvider } from './src/context';
import { IP } from './src/components/IP';
import { Service } from './src/components/service';
import { Reset } from './src/components/reset';
import { Sending } from './src/components/sending';
import { Messages } from './src/components/messages';
import { TheDivider } from './src/components/divider';
import { SelectLanguages } from './src/components/languages';

export default function App() {
  return (
    <ContextProvider>
      <NativeBaseProvider>
        <>
          <VStack bg='gray.200'>
            <Box h='70px' />
            <HStack w='full'>
              <Spacer />
              <Center>
                <Heading>PhotoSync</Heading>
              </Center>
              <Spacer />
              <SelectLanguages />
              <Box w='10px' />
            </HStack>
            <TheDivider />
            <IP />
            <TheDivider />
            <Service />
            <TheDivider />
            <Reset />
            <TheDivider />
            <Sending />
            <TheDivider />
            <Messages />
            <TheDivider />
          </VStack>
        </>
      </NativeBaseProvider>
    </ContextProvider>
  );
}