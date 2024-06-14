import React from 'react';
import renderer from 'react-test-renderer';
import { ManageBookings } from '../manageBookings/ManageBookings';

describe('ManageBookings', () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <ManageBookings
        statusDropDownData={[]}
        handleCustomerDetailsCollapse={() => { }}
        handlePickupRequestsDetailsCollapse={() => { }}
        handleLimoServiceCollapse={() => { }}
        customerDetailsCollapse={false}
        pickUpRequestDetailsCollapse={false}
        limoServiceCollapse={false}
        backButtonHandler={() => { }}
        bookingsDetailsData={[]}
        bookingsInfo={[]}
        isDisable={false}
        isEditable={false}
        handleInputChange={() => { }}
        archiveButtonHandler={() => { }}
        saveUpdateButtonHandler={() => { }}
        timeslotList={[]}
        serviceTypeInfo={[]}
        carsList={[]}
        getCustomerInfoByEmail={() => { }}
        handleServiceType={() => { }}
        getbookingsByDate={() => { }}
        bookingsByDate={[]}
        handlePlaceSelect={() => { }}
        isPickUp={false}
        isDropOff={false}
        WarehousesList={[]}
        bookingData={{
          uId: '',
          email: '',
          phoneNumber: '',
          bookingId: '',
          bookingStatus: '',
          carId: '',
          licensePlateNumber: '',
          service: '',
          serviceId: '',
          date: '',
          slot: '',
          additionalNote: '',
          representativeRequired: false,
          representativeName: '',
          representativeContact: '',
          limoServiceRequired: false,
          limoPickupLocation: '',
          limoDropOffLocation: '',
          limoServiceDate: '',
          limoServiceTimeSlot: '',
        }}
        isCreate={false}
      />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
