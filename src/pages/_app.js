import Layout from "@/Layout/Layout";
import { getLanguage, setLanguage } from "@/storage/storage";
import "@/styles/globals.css";
import "@/styles/icon.css";
import 'animate.css'
import '@fontsource-variable/montserrat';
import { useEffect } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
// import { AnimatePresence, motion, progress } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Head from "next/head";
import { allPageScript } from "@/component/SEOScripts/AllPageScript";

const client = new ApolloClient({
  uri: "https://admin.headsupb2b.com/graphql",
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient()


function schema() {
  return {
    __html: `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11484520855');
    `
  }
}

export default function App({ Component, pageProps, router }) {

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren"
  };
  useEffect(() => {
    let cl = getLanguage()
    if (cl === undefined || cl === null) {
      setLanguage('en')
    }

  }, [])

  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/66c5b5d0ea492f34bc0875d5/1i5q4sef7';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);


  return (
    <AnimatePresence>


      <Head>

        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11484520855"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0 , maximum-scale=5.0" />
        <script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={schema()}
          key="gtag"
        />
      </Head>


      {/* 
      <script
        type="text/javascript"
        src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
        id="aisensy-wa-widget"
        widget-id="mI32y8"
      >
      </script> */}

      <script
        strategy="lazyOnload"
        type="application/ld+json"
        dangerouslySetInnerHTML={allPageScript()}
        key="jsonld"
      />


      {/* <motion.div
        transition={spring}
        key={router.pathname}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        id="page-transition-container"> */}
      <ApolloProvider client={client}>
        {/* <Layout>
          {}
          <Component {...pageProps} />
        </Layout> */}
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApolloProvider>
      {/* </motion.div> */}
    // </AnimatePresence>
  )
}
