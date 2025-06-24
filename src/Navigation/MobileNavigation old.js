import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import CustomText from '@/component/Text/CustomText';

const MobileNavLinks = ({ open }) => {
  const router = useRouter()
  const displayMobileNavLinks = classNames('mobile-nav-wrapper', {
    open: open,
  });

  


  let navigationData= []
  

  const handleNavigation = (url) => {
    router.push({pathname : url})
  }

  return (
    <div arai-label="mobile navigation" className={displayMobileNavLinks}>
        <div container>
            <div item xs={12}>
                <ul className={'Style.ul'}>
                    {
                        navigationData.map((element, index) =>(
                            <li className={`${Style.li} mobile-link`} key={index} onClick={()=>handleNavigation(element.url)}><CustomText text={element.title}  className={`sub-title font-weight-400 text-capitalize ${element.id === 4 ? 'orange' : ''}`}/></li>
                        ))
                    }
                    
                </ul>
            </div>
        </div>
    </div>
  );
};

export default MobileNavLinks;