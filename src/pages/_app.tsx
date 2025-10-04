import type { AppProps } from 'next/app'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
