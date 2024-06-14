import React, {useEffect} from 'react';
import './Home.scss';
import {ConstantStrings, ImagesPath} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { BackgroundImageContainer, LeCarageLogo } from '../../components';

export const Home = ()=>{
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
           return navigate('/login');
          }, 3000);
          return () => clearTimeout(timer);
    });
    return(
        <BackgroundImageContainer imageSource={ImagesPath.splashimg} >
            <>
                <div className='home_page'>
                    <LeCarageLogo source={ImagesPath.lecaragelogo} altText='lecarage_logo' name="home_page_logo" />
                    <p>{ConstantStrings.splash_message}</p>
                
                </div>
                <div className='footer_text'>
                    <p>{ConstantStrings.lecarage_website}</p>
                </div>
            </>
           
        </BackgroundImageContainer>

        
    );
};