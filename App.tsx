import { VStack, NativeBaseProvider, Center, Heading, Box } from 'native-base';
import { ContextProvider } from './src/context';

export default function App() {
  return (
    <ContextProvider>
      <NativeBaseProvider>
        <VStack bg='gray.400'>
          <Box h='50px' />
          <Center> 
            <Heading>PhotoCollector</Heading> 
          </Center>
        </VStack>
      </NativeBaseProvider>
    </ContextProvider>
  );
}