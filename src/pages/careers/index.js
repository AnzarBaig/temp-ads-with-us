import React from 'react';
import Head from 'next/head';
function Page() {

    const canonicalUrl = `https://www.headsupb2b.com/careers`;
    return (
        <>
            <Head>
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <div className='flex items-center justify-center mm:mt-14 ml:mt-0' style={{ height: '100vh', overflow: 'hidden' }}>
                <iframe
                    src="https://app.pyjamahr.com/careers?company=HeadsupB2B&company_uuid=120C08DC2E&isHeaderVisible=true&is_careers_page=true"
                    title="Careers Page"
                    frameBorder="0"
                    scrolling="yes"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            </div>
        </>

    );
}

export default Page;
