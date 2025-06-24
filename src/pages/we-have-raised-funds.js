import React from 'react'
import TeamImage from '../assets/funds/team.png'
import FounderImage from '../assets/funds/founder.jpg'
import Image from 'next/image'
import DownloadableImageWithHoverIcon from '@/component/DownloadableImageWithHoverIcon'

export default function WeHaveRaisedFunds() {
    return (
        <div className='ms:mt-10 ms:mx-6 t:mx-20 l:mx-20 ll:mx-20 imac:px-44 4k:px-56 mb-10'>
            <div className=''>
                <h1 className='text-black mt-8 text-center text-4xl ms:font-bold ms:text-4xl l:font-bold py-4' style={{ lineHeight: 1.5 }}>
                    Digital marketplace Headsup B2B has raised INR 18.89 CR in investments led by Harendra Singh Family Office.
                </h1>
                <span className="" style={{ textAlign: 'justify' }}>
                    Headsup B2B, a bootstrapped venture with over INR 100 crores in lifetime revenue,
                    has raised this funding to fuel its growth. Raised funds will be deployed in
                    team development with a focus on 100+ senior and mid level hirings across India,
                    improving the tech-enabled full stack platform in B2B space which will cater
                    from discovery to fulfillment and financing in the near future, exploring new vertical
                    commerce avenues, and expanding cross-border business.
                </span>
            </div>
            <div className='flex mt-10 ms:flex-col t:flex-row' style={{}}>
                {/* <div><Image src={FounderImage} height={600} /></div> */}
                <div><DownloadableImageWithHoverIcon imageURL={FounderImage} height={600} /></div>
                <div className='ms:mt-3 t:mt-0'><DownloadableImageWithHoverIcon imageURL={TeamImage} height={600} /></div>
                {/* <div className='ms:mt-3 t:mt-0'><Image src={TeamImage} height={600} /></div> */}
            </div>
            <div className='flex mt-10 justify-center'>
                <iframe
                    src="https://firebasestorage.googleapis.com/v0/b/headsupb2b-6b244.appspot.com/o/fund-raised.pdf?alt=media"
                    width="100%"
                    height="500"
                    style={{ border: 'none' }}
                ></iframe>
                {/* <object class="pdf" type="application/pdf" data="https://firebasestorage.googleapis.com/v0/b/headsupb2b-6b244.appspot.com/o/fund-raised.pdf?alt=media" width="800" height="800" /> */}
            </div>
        </div>
    )
}
