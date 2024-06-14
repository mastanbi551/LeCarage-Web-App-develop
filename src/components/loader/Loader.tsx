import React from 'react';
import { Bars, ThreeDots } from 'react-loader-spinner';
import './Loader.scss';


export const Loader = () => {
    return (
        <div className='loader'>
            <ThreeDots
                height="80"
                width="80"
                // radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                //wrapperStyle={{}}
                //wrapperClassName='loader'
                visible={true}
            />
            
        </div>
    );
};