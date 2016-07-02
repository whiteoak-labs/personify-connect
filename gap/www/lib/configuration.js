(function() {
    if (!window.Personify) {
        Personify = {};
    }

    if (!Personify.utils) {
        Personify.utils = {};
    }

    if (!Personify.utils.wsmanager) {
        Personify.utils.wsmanager = {};
    }

    Personify.utils.wsmanager.WSManager = {
        protocol: 'http://',
        server: '204.71.142.78',
        path: 'DSJson/PersonifyData.svc',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW46YWRtaW4='
        },
        endpoints: {
            // directory web service
            directoryEntries: 'MobileGetDirectoryListing',
            directoryEmployees: 'MobileGetEmployeeList',
            directoryStaffs: 'MobileGetStaffList',
            inquiry: 'MobileAddNewContactRecord',

            // events web service
            eventMeetings: 'MobileGetMeetingListing',
            eventRegistered: 'MobileIsUserRegistered',
            eventSessions: 'MobileGetMeetingSessionList',
            eventAgenda: 'MobileGetMeetingAgenda',
            eventSessionDetails: 'MobileGetSessionDetail',
            eventSessionRating: 'ProductStarRatingAddNew',
            eventExhibitors: 'MobileGetExhibitorData',
            eventRegistrants: 'MobileSearchMeetingRegistrants',
            eventGetEmptyMeetingAgenda: "Create?EntityName='CustomerMeetingAgenda'",
            eventSaveMeetingAgenda: "Save?EntityName='CustomerMeetingAgenda'",
            eventGetDeleteMeetingAgenda: "CustomerMeetingAgendas()?$filter=AppointmentId eq ",
            eventSaveDeleteMeetingAgenda: "Delete?EntityName='CustomerMeetingAgenda'",
            customerBiography: "CusBiographies",

            // store web service
            storeProducts: 'MobileGetProductList',
            storeProductDetail: 'MobileGetProductDetail',
            storeShoppingCart: 'MobileGetShoppingCartSummary',
            storeShoppingCartAdd: 'MobileAddToCart',
            storeShoppingCartUrl: 'MobileGetShoppingCartURL',
            storeOrder: 'MobileApplyPaymentAndSaveOrder',

            // profile web service
            profileGet: 'MobileGetProfile',
            profileAuthenticationUrl: 'MobileGetAutheBusinessURL',
            profileContacts: 'MobileGetContactListing',
            profileContactDetails: 'MobileGetContactItemDetail',
            profilePurchases: 'MobileGetPurchaseHistory',
            profileParticipations: 'MobileGetParticipationInfo',
            profileRelationships: 'MobileGetRelationships',

            // profile updating web service
            profileUpdate: 'MobileAddUpdateProfile',
            profileAddressDelete: 'MobileDeleteAddress',
            profileContactAdd: 'MobileAddNewContactRecord',
            profileCommunicationDelete: 'MobileDeleteCommunication',
            profileImageUpdate: 'UploadCusImage',

            // user web service
            userLogin: 'MobileValidateUserCredentials',
            userNotifications: 'MobileGetNotificationMessages',
            userPreferences: 'MobileGetCustomerPreferences',

            // utility web service
            utilCountries: 'Countries?$filter=ActiveFlag%20eq%20true',
            utilStates: 'States',
            utilFileUpload: "UploadCusImageMobile",
            utilCallType: "ApplicationCodes?$filter=SubsystemString eq 'MRM' and Type eq ('CALL_TYPE')",
            utilCallTopic: "ApplicationCodes?$filter=SubsystemString eq 'MRM' and Type eq ('CALL_TOPIC')",
            utilCallSubject: "ApplicationSubcodes"
        }
    };
})();
