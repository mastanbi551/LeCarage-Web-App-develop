import React from 'react';
import { PageHeader } from '../pageHeader/PageHeader';
import './PageContainer.scss';

type PageContainerProps = {
    backIcon?: boolean,
    backIconOnClick?: () => void,
    mainHeadingName: string
    children: React.ReactElement,
}

export const PageContainer = (props: PageContainerProps) => {
    return (
        <div className='page-container-details'>
            <div className='page-container-details__header-content'>
                <PageHeader text={props.mainHeadingName} name='page-container-details__header-content__heading' backIcon={props.backIcon} backIconOnClick={props.backIconOnClick}/>
            </div>
            {props.children}
        </div>
    );
};