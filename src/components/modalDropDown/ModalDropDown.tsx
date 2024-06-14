import React from 'react';
import './Modal.scss';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import { Details } from '../header/headerstate/HeaderStateInterface';

interface modalProps {
  showModal: boolean;
  onModalToggle: () => void;
  profileInfo: Details[];
  warehousesInfo: string[];
  onSelectHandler?: (value: Details) => void;
  handleUserProfile: (value: Details) => void;
}
export const ModalDropDown = ({
  showModal,
  onModalToggle,
  profileInfo,
  warehousesInfo,
  handleUserProfile,
}: modalProps) => {

  const onSelectHandler = async (value: Details) => {
      if (value !== null) {
        handleUserProfile(value);
        onModalToggle();
      }
  };

  return (
    <Modal
      isOpen={showModal}
      toggle={onModalToggle}
      className={'modal-md modal-primary'}
    >
      <ModalHeader toggle={onModalToggle}>Location/Warehouse</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={12}>
            <UncontrolledDropdown direction='down'className='profile-Filter-dropdown'>
              <span
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  float: 'left',
                  marginBottom: '5px',
                }}
              >
                Please select an Location/Warehouse and Role:
              </span>
              <DropdownToggle className='width' caret>
                <span>Select Location/Warehouse and Role</span>
              </DropdownToggle>
              <DropdownMenu  className='warehouseSwitchDropdown dropwidth ' >
                {warehousesInfo.map((location: string) => (
                  <UncontrolledDropdown key={location} direction='end' className='margntop'>
                    <DropdownToggle caret  className='dropdownToggle'>
                      <span
                        style={{
                          width: '100%',
                          marginRight: '5px',
                          padding: '4px;'
                        }}
                      >
                        {location}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu className='roleSwitchDropdown'>
                      {profileInfo && profileInfo
                        .filter(
                          (userInfo: Details) =>
                            userInfo.warehouseLabel === location
                        )
                        .map((role: Details) => {
                          return (
                            <DropdownItem
                              key={role.userTypeLabel}
                              onClick={onSelectHandler.bind(this, role)}
                              className="dropdownitem"
                              style={{
                                display: 'flex',
                                justifyContent: 'left',  
   

                              }}
                            >
                              <span>{role.userTypeLabel}</span>
                            </DropdownItem>
                          );
                        })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        
      </ModalFooter>
    </Modal>
  );
};
