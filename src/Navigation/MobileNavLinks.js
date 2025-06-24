import React from 'react';
import classNames from 'classnames';
// import { div, Grid } from '@mui/material';
// import * as Style from '../styles/MobileNavigation.module.css'
// import MyTitle from '../components/MyTitle';
import { useRouter } from 'next/router';
import CustomText from '@/component/Text/CustomText';
import NavigationData from '@/Contants/NavigationData';

const MobileNavLinks = ({ open }) => {
  const router = useRouter()
  const displayMobileNavLinks = classNames('mobile-nav-wrapper open', {
    open: open,
  });

  const handleNavigation = (url) => {
    router.push({ pathname: url })
  }

  return (
    <div arai-label="mobile navigation" className={displayMobileNavLinks}>
      <div container>
        <div>
          <ul className={''}>
            {
              NavigationData.map((element, index) => (
                <li className={`${''} mobile-link bg-red-500`} key={index} onClick={() => handleNavigation(element.url)}><CustomText text={element.title} className={`sub-title font-weight-400 text-capitalize ${element.id === 4 ? 'orange' : ''}`} /></li>
              ))
            }

          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNavLinks;