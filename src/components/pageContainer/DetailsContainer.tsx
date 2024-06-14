import React from 'react';
import { PageHeader } from '../pageHeader/PageHeader';
import './PageContainer.scss';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
type DetailsProps = {
    children?: React.ReactElement;
    heading: string;
    isCollapsible?: boolean;
    collapseOnClick?: () => void;
    isEditable?: boolean;
    isEditOnClick?: () => void;
}
export const DetailsContainer = (props: DetailsProps) => {
    return (
        <div className='details-container'>
            <div className='details-container__details-container-header'>
                <PageHeader text={props.heading} name='details-container__details-container-header__heading' />
                {
                    props.isCollapsible &&
                    <MdOutlineKeyboardArrowDown onClick={props.collapseOnClick} className='details-container__details-container-header__collapse-icon' />
                }
                {
                    props.isEditable &&
                    <BsPencil onClick={props.isEditOnClick} className='details-container__details-container-header__edit-icon' />
                }
            </div>
            {props.children}
        </div>
    );
};