export const Urls = {
    //Base url
    baseUrl: 'https://europe-west1-lecaragebeta.cloudfunctions.net/lecarageuserapi/api/',
    bookingsUrl: 'https://europe-west1-lecaragebeta.cloudfunctions.net/lecaragebookingapi/api/',
    uploadurl: 'https://europe-west1-tdglobal-dev.cloudfunctions.net/fileStorageApi/upload/public?subDomain=gocity',
    //Login end points
    login: 'auth/authuser',
    forgotPassword: 'auth/recoverpassword',
    otpValidation:'auth/verifyotp',
    resetPassword: 'auth/resetpassword',
    adminUserProfile: 'admin/adminuserprofile',
    adminMenus: 'admin/adminMenus',
    adminUsers: 'admin/adminUsers',
    customers: 'admin/customers',
    fetauresList: 'admin/featureslist',
    featuresAccessList: 'admin/featureaccesslist',
    registercustomer:'admin/registercustomer',
    editCustomer:'admin/updateregisteredcustomer',
    adminUser: 'admin/adminuser',
    adminUserTypes: 'admin/usertypes',
    userStatus: 'admin/userstatus',
    viewcustomer:'admin/viewcustomer',
    createusertype: 'admin/createusertype',
    updateusertype: 'admin/updateusertype',
    deleteusertype: 'admin/deleteusertype',
    deleteAdminUser: 'admin/adminuser',
    deleteCustomer: 'admin/customer',
    userTypes: 'admin/usertypeslist',
    viewUserType: 'admin/viewusertype',
    viewAdminUser: 'admin/viewAdminUser',
    carmake: 'car/carmake',
    carmodel: 'car/carmodel',
    carmodelbymake: 'car/carmodelbymake',
    carcolor: 'car/carcolor',
    warehouse: 'admin/warehouse',
    carstatus: 'admin/carstatus',
    addCar: 'admin/addcar',
    allcars: 'admin/allcars',
    getCarByID: 'admin/car',
    deleteCar: 'admin/car',
    updateCar: 'admin/updatecar',
    linkedCar: 'customer/cars',
    unlinkedCar:'admin/unlinkedcars',
    allBookings: 'booking/allbookings',
    getCustomerCarsByEmail: 'booking/customercars',
    getTimeSlots: 'booking/timeslots',
    bookingServices: 'booking/bookingservices',
    customerCars: 'customer/cars',
    bookingForDate: 'booking/bookingfordate',
    getBookinginfo: 'booking/bookinginfo',
    bookingStatus: 'booking/bookingstatus',
    createBooking: 'booking/create',
    updateBooking: 'booking/update',
    customersList: 'booking/customerslist',
  };

export const MethodType = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const HeaderType = {
  contentType: 'Content-Type',
  applicationjson: 'application/json',
  apikey: 'BW3c3zUtvA5ynJwzZ4Wc44pUUvtNA3rrMet5efPu8dcdhghgvhHm',
  authorization: 'Authorization'
};

export const ApiKeys = {
  apikey: 'BW3c3zUtvA5ynJwzZ4Wc44pUUvtNA3rrMet5efPu8dcdhghgvhHm',
  bookingsApikey: 'BW3c3zUtvA5ynJwzZ4Wc44pUUwsNA3rrMet5efPu8dcdhghgvhHm',
  googleApiKey: 'AIzaSyCwdhMyTi9fBrH9EqYOqjREExPKTz0atxs',
  uploadApiKey: 'DYnyC9gqx46j8rjZ0zophhk0in2Q9C2M',
};