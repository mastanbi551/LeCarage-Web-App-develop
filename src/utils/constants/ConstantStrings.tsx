
export const ConstantStrings = {
    splash_message: 'LUXURY CAR RESIDENCE CAR CLUB & PETROL HEADS COMMUNITY',
    lecarage_website: 'LeCarage.com',
    loginPageHeading: 'Log In',
    emailPlaceholder: 'Enter Email',
    passwordPlaceholder: 'Enter Password',
    otpVerificationPageHeading: 'Enter Your OTP',
    otpVerificationPlaceholder: 'Enter 6-digit OTP',
    otpVerificationPage: {
        content: 'Please enter your verification code ',
    },
    fillInThefield: 'Fill in the below field',
    codeverifyMessage: 'A verification code will be sent to your email',
    enterEmail: 'Enter your email address',
    enterMobile: 'Mobile Number',
    header: {
        myProfileContent: 'My Profile'
    },
    resetPassword: 'Reset Password',
    newPasswordPlaceholder: 'Enter New Password',
    confirmNewPasswordPlaceholder: 'Confirm New Password',
    manageUserType: {
        userTypeDetails: 'User Type Details',
        userTypeId: 'User Type ID',
        userTypeName: 'User Type Name',
        description: 'Description',
        feature1: 'Feature1',
        feature2: 'Feature2',
        feature3: 'Feature3',
        userTypeActions: 'User Type Actions',
        status: 'Status',
        uniqueId: 'Unique ID',
        archive: 'Archive',
        saveAndUpdate: 'Save & Update'
    },

    manageCustomer: {
        mainHeading: 'Customer',
        userDetailsHeading: 'Customer Details',
        userTypeActionsHeading: 'User Type Actions',
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email Address',
        cellPhoneNumber: 'CellPhone Number',
        password: 'Password',

        userAddressDetails: {
            userAddressHeading: 'Customer Address',
            address: 'Address Type',
            streetName: 'Street Name',
            houseApartmentNo: 'House Apartment no',
            postalCode: 'Postal Code',
            cityName: 'City',
            addAddressButton: 'ADD ADDRESS'
        },

        carsDetails: {
            carsLinkedHeading: 'Cars Linked',
            car: 'Car',
            numberPlate: ' License No. Plate',
            make: 'Make',
            color: 'Color',
            model: 'Model',
            location: 'Location',
            subscriptionType: 'Subscription Type',
            carStatus: 'Car Status',
            customerId: 'Customer ID',
            additionalNotes: 'Additional Notes',
            addCarButton: 'Link CAR',
        },

        paymentDetailsHeading: 'Payment Details',
        cardHolderName: 'Card Holder Name',
        bankNumber: 'Bank Number'
    },

    manageCar: {
        carsLinkedHeading: 'Cars Linked',
        car: 'Car',
        numberPlate: 'Number Plate',
        make: 'Car Make',
        color: 'Car Color',
        model: 'Car Model',
        location: 'Location',
        subscriptionType: 'Subscription Type',
        carStatus: 'Car Status',
        customerId: 'Customer ID',
        additionalNotes: 'Additional Notes',
        addCarButton: 'ADD CAR',
        description: 'Description',
        stalling: 'Stalling'
    },


    manageUser: {
        mainHeading: 'User',
        userDetailsHeading: 'User Details',
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email Address',
        cellPhoneNumber: 'CellPhone Number',
        password: 'Password',
        userTypeActionsHeading: 'User Type Actions',

    },

    manageBookings: {
        mainHeading: 'Booking Request',
        bookingDetailsHeading: 'Customer Details',
        pickUpRequestDetails: 'Booking Details:',
        limoDetailsHeading: 'Limo Service',
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email Address',
        cellPhoneNumber: 'CellPhone Number',
        dateTime: 'Suggest New Date & Time:',
        message: 'Please Provide Reason:',
        warehouseLocation: 'Warehouse Location',
        customers: 'Customer',

        bookingDetails: {
            serviceType: 'Service Type',
            customerCars: 'Customer Cars',
            bookingDate: 'Booking Date',
            bookingTimeSlots: 'Time Slots',
            additionalNotes: 'Additional Notes',
            representativeName: 'Representative Name',
            representativePhoneNumber: 'Representative Phone Number',
        },

        limoServiceDetails: {
            pickUpLocation: 'Pick-Up Location',
            timebet: 'Time Between',
            date: 'Date',
            dropOffLocation: 'Drop-Off Location ',



        }
    }
};

export const userTypesFilterBy = ['User Type', 'Status'];
export const usersFilterBy = ['User Type', 'Status'];
export const customerFilterBy = ['Status'];
export const CarFilterBY = ['Location', 'Status'];
export const BookingFilterBy = ['Service', 'Status'];

export const AccessTypes = {
    readOnlyAccess: 'Read Only',
    fullAccess: 'Full Access',
    noAccess: 'No Access'
};

export const routeNames = {
    userManagement: 'User Management',
    usertypes: 'User Types',
    users: 'Users',
    customers: 'Customers',
    cars: 'Cars'
};

export const responseStatus = {
    success: 'success',
    fail: 'fail'
};
