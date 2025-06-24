import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
// import { useEffect } from "react";
export default function Document() {
  function TagManager() {
    return {
      __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PWPLHZGR')
      `
    }
  }
  function GTag() {
    return {
      __html: `
      window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
          
                    gtag('config', 'G-EL9S9Y3SXG');
      `
    }
  }

  function metaPixel() {
    return {
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '468463856066805');
        fbq('track', 'PageView');
      `,
    };
  }

  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={TagManager()} />
        <script dangerouslySetInnerHTML={GTag()} />
        <script dangerouslySetInnerHTML={metaPixel()} />

        {/* <script dangerouslySetInnerHTML={Hotjar()} /> */}
        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EL9S9Y3SXG" strategy="lazyOnload"></Script> */}

      </Head>

      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWPLHZGR" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
