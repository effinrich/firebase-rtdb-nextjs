 import { Html, Head, Main, NextScript } from "next/document";
import { Container } from '@chakra-ui/react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script
          src="https://cdn.softgen.ai/script.js"
          async
          data-softgen-monitoring="true"
        /> */}
      </Head>
      <body>
      <Container fluid={true}>
        <Main />
        <NextScript />
      </Container>
      </body>
    </Html>
  );
}
