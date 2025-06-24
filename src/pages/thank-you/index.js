import React, { useState, useEffect } from "react";
import { FaCheckSquare } from "react-icons/fa";
import ReactConfetti from "react-confetti";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

function Index() {
    const Router = useRouter();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isConfettiVisible, setIsConfettiVisible] = useState(true);


    useEffect(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    setTimeout(() => {
        Router.push("/");
    }, 5000);
    const canonicalUrl = `https://www.headsupb2b.com/thank-you`;
    return (
        <div>
            <Head>
                <script dangerouslySetInnerHTML={{
                    __html: `  gtag('event', 'conversion', {
                    'send_to': 'AW-11484520855/-V9vCPG46q8ZEJfDn-Qq',
                    'value': 1.0,
                    'currency': 'INR'
                });` }} />
                <link rel="canonical" href={canonicalUrl} />

            </Head>


            <div className="flex flex-col item-center justify-center min-w-screen border border-gray-300 bg-white rounded-3xl sm:min-w-sm lg:min-w-lg xl:min-w-xl">
                <ReactConfetti
                    width={size.width}
                    height={size.height}
                    tweenDuration={1000}
                />
                <div className="border border-red-300 bg-gray-200 py-48">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaCheckSquare color="#5E3F99" className="h-16 w-16 mt-20 md:mt-20 lg:mt-16 xl:mt-2" />
                    </div>
                    <div className="font-bold text-center text-headupb2b py-4 text-lg md:text-lg lg:text-xl xl:text-3xl">
                        Thank you for the request, we'll get back to you soon.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
