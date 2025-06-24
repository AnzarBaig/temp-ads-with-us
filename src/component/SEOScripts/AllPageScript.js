export const allPageScript = () => {
    return {
        __html: `
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Headsup B2B",
        "url": "https://www.headsupb2b.com	/",
        "logo": "https://www.headsupb2b.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-dark.67589a8e.jpg&w=1200&q=75",
       "description": "
      Headsup B2B is an integrated online B2B Marketplace for various kinds of raw materials. It is a full scale platform providing enhanced procurement solutions with competitive prices for a wide variety of products." ,
       "address": {
          "@type": "PostalAddress",
          "streetAddress": "A4 , Adhchini Road, Sri Aurobindo Marg, Sarvodaya Enclave",
          "addressLocality": "Hauz Khas, New Delhi",
          "postOfficeBoxNumber": "110017",
          "addressRegion": "IN"
        },
        "contactPoint": [{
          "@type": "ContactPoint",
          "telephone": "72101 99772",
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": "en"
        },{
          "@type": "ContactPoint",
          "telephone": "93133 06060",
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": "en"
        }],
        "sameAs": [
          "https://www.facebook.com/headsupb2b",
          "https://www.instagram.com/headsupb2b/",
          "https://twitter.com/headsupb2b/",
         "https://www.linkedin.com/company/headsupb2b/"
         
        ]
      }
    `}
}