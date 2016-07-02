Ext.define('Personify.utils.storemanager.StoreJsonpManager', {
    extend: 'Personify.utils.StoreManager',
    requires: [
        'Personify.utils.StoreManager',
        'Personify.store.jsonp.UploadImage',
        'Personify.store.jsonp.profile.AuthenticationUrl'
    ],

    config: {
        userStore: 'Personify.store.jsonp.User',

        staffStore: 'Personify.store.jsonp.Staff',

        sessionDetailStore: 'Personify.store.jsonp.SessionDetail',

        sessionStore: 'Personify.store.jsonp.Session',

        purchaseHistoryStore: 'Personify.store.jsonp.PurchaseHistory',

        profileStore: 'Personify.store.jsonp.Profile',

        profileUpdatingStore: 'Personify.store.jsonp.ProfileUpdating',

        profileAddressesStore: 'Personify.store.jsonp.profile.Addresses',

        profileCompanyContactStore: 'Personify.store.jsonp.profile.CompanyContact',

        profileEmailsStore: 'Personify.store.jsonp.profile.Emails',

        profileEntryStore: 'Personify.store.jsonp.profile.Entry',

        profileGeoStore: 'Personify.store.jsonp.profile.Geo',

        profileNameStore: 'Personify.store.jsonp.profile.Name',

        profileOrganizationStore: 'Personify.store.jsonp.profile.Organization',

        profilePhoneNumbersStore: 'Personify.store.jsonp.profile.PhoneNumbers',

        profilePhotosStore: 'Personify.store.jsonp.profile.Photos',

        profileDisplayOptionStore: 'Personify.store.base.profile.ProfileDisplayOption',

        profileRolesStore: 'Personify.store.jsonp.profile.Roles',

        profileTypeStore: 'Personify.store.base.profile.Type',

        profileUrlsStore: 'Personify.store.jsonp.profile.Urls',

        profileRelationshipStore: 'Personify.store.jsonp.profile.Relationship',

        profileContactTrackingStore: 'Personify.store.jsonp.profile.ContactTracking',

        profileContactListingStore: 'Personify.store.jsonp.profile.ContactListing',

        productStore: 'Personify.store.jsonp.product.Product',

        productListStore: 'Personify.store.jsonp.ProductList',

        presenterStore: 'Personify.store.jsonp.Presenter',

        attendeeStore: 'Personify.store.jsonp.Attendee',

        participationStore: 'Personify.store.jsonp.Participation',

        materialStore: 'Personify.store.jsonp.Material',

        iCalendarStore: 'Personify.store.jsonp.ICalendar',

        eventListStore :'Personify.store.jsonp.calendar.Event',

        eventMonthStore: 'Personify.store.jsonp.calendar.EventMonth',

        exhibitorStore: 'Personify.store.jsonp.Exhibitor',

        directoryStore: 'Personify.store.jsonp.Directory',

        customerStore: 'Personify.store.jsonp.Customer',

        agendaStore: 'Personify.store.jsonp.Agenda',

        shoppingCartStore: 'Personify.store.jsonp.store.ShoppingCart',

        addCartStore: 'Personify.store.jsonp.store.AddToShoppingCart',

        countryStore: 'Personify.store.jsonp.Country',

        stateStore: 'Personify.store.jsonp.State',

        callTypeStore: 'Personify.store.jsonp.contactlisting.CallType',

        callTopicStore: 'Personify.store.jsonp.contactlisting.CallTopic',

        callSubjectStore: 'Personify.store.jsonp.contactlisting.CallSubject',

        notificationStore: 'Personify.store.jsonp.Notification',

        updateProfileStore: 'Personify.store.jsonp.profile.UpdateProfile',

        mobileGetShoppingCartUrl: 'Personify.store.jsonp.store.ShoppingCartUrl',

        isUserRegisterStore: 'Personify.store.jsonp.IsUserRegister',

        orderTrue: 'Personify.store.jsonp.store.OrderTrue',

        orderFalse: 'Personify.store.jsonp.store.OrderFalse',

        uploadImage: 'Personify.store.jsonp.UploadImage',

        customerMeetingAgenda: 'Personify.store.jsonp.AddNewCustomerMeetingAgenda',

        saveCustomerMeetingAgenda: 'Personify.store.jsonp.SaveCustomerMeetingAgenda',

        objectDeleteMeetingAgenda: 'Personify.store.jsonp.GetObjectDeleteMeetingAgenda',

        saveDeleteMeetingAgenda: 'Personify.store.jsonp.SaveDeleteMeetingAgenda',

        inquiryStore: 'Personify.store.jsonp.Inquiry',

        customerBiographyStore: 'Personify.store.jsonp.CustomerBiography',

        profileAuthenticationUrl : 'Personify.store.jsonp.profile.AuthenticationUrl',

        saveRating: 'Personify.store.jsonp.SaveRating'
    },

    constructor: function(config) {
        this.initConfig(config);
    }
});
