Ext.define('Personify.utils.modelmanager.ModelJsonpManager', {
    extend: 'Personify.utils.ModelManager',
    requires: ['Personify.utils.ModelManager'],
    
    config: {
        userModel: 'Personify.model.jsonp.User',
        userAddressModel: 'Personify.model.jsonp.user.Address',
        userEmailModel: 'Personify.model.jsonp.user.Email',
        userNameModel: 'Personify.model.jsonp.user.Name',
        userRoleModel: 'Personify.model.jsonp.user.Role',
        
        staffModel: 'Personify.model.jsonp.Staff',
        
        sessionModel: 'Personify.model.jsonp.SessionList',
        sessionCoordModel: 'Personify.model.jsonp.session.Coord',
        sessionFloorPlanModel: 'Personify.model.jsonp.session.FloorPlan',
        sessionSpeakerModel: 'Personify.model.jsonp.session.Speaker',
        sessionTrackModel: 'Personify.model.jsonp.session.Track',
        eventSpeakerModel: 'Personify.model.jsonp.calendar.eventList.SpeakersList',
        eventMaterialModel: 'Personify.model.jsonp.calendar.eventList.MaterialList',
        relationshipModel: 'Personify.model.jsonp.relationship.Relationship',
        relationshipManagementModel: 'Personify.model.jsonp.relationship.RelationshipManagement',
        
        contactModel: 'Personify.model.jsonp.contactlisting.Contact',
        contactManagementModel: 'Personify.model.jsonp.contactlisting.ContactManagement',
        
        contactDetailModel: 'Personify.model.jsonp.contactlisting.ContactDetail',
        contactDetailManagementModel: 'Personify.model.jsonp.contactlisting.ContactDetailManagement',
        
        referenceModel: 'Personify.model.jsonp.Reference',
        
        purchaseHistoryModel: 'Personify.model.jsonp.PurchaseHistory',
        purchaseModel: 'Personify.model.jsonp.purchaseHistory.Purchase',
        purchaseSubSystemModel: 'Personify.model.jsonp.purchaseHistory.SubSystem',
        
        profileModel: 'Personify.model.jsonp.Profile',
        profileAddressesModel: 'Personify.model.jsonp.profile.Addresses',
        profileCompanyContactModel: 'Personify.model.jsonp.profile.CompanyContact',
        profileEmailsModel: 'Personify.model.jsonp.profile.Emails',
        profileEntryModel: 'Personify.model.jsonp.profile.Entry',
        profileGeoModel: 'Personify.model.jsonp.profile.Geo',
        profileNameModel: 'Personify.model.jsonp.profile.Name',
        profileOrganizationModel: 'Personify.model.jsonp.profile.Organization',
        profilePhoneNumbersModel: 'Personify.model.jsonp.profile.PhoneNumbers',
        profilePhotosModel: 'Personify.model.jsonp.profile.Photos',
        profileDisplayOptionModel: 'Personify.model.base.profile.ProfileDisplayOption',
        profileRolesModel: 'Personify.model.jsonp.profile.Roles',
        profileTypeModel: 'Personify.model.base.profile.Type',
        profileUrlsModel: 'Personify.model.jsonp.profile.Urls',
        profileNameCodeList: 'Personify.model.jsonp.profile.NameCodeList',
        
        productModel: 'Personify.model.jsonp.product.Product',
        productClassModel: 'Personify.model.jsonp.product.ProductClass',
        productListModel: 'Personify.model.jsonp.product.ProductList',
        
        presenterModel: 'Personify.model.jsonp.Presenter',
        
        participationModel: 'Personify.model.jsonp.Participation',
        participationCommitteeModel: 'Personify.model.jsonp.participation.Committee',
        
        notificationModel: 'Personify.model.jsonp.Notification',
        noteModel: 'Personify.model.jsonp.Note',
        
        materialModel: 'Personify.model.jsonp.Material',
        
        iCalendarModel: 'Personify.model.jsonp.ICalendar',
        
        calendarEventModel: 'Personify.model.jsonp.calendar.Event',

        eventMonth: 'Personify.model.jsonp.calendar.EventMonth',
        
        filterFormatModel: 'Personify.model.jsonp.FilterFormat',
        
        filterLocationModel: 'Personify.model.jsonp.FilterLocation',
        
        exhibitorModel: 'Personify.model.jsonp.Exhibitor',
        
        exhibitorListModel: 'Personify.model.jsonp.ExhibitorList',

        directoryModel: 'Personify.model.jsonp.Directory',
        
        directoryManagementModel: 'Personify.model.jsonp.DirectoryManagement',
           
        attendeeManagementModel: 'Personify.model.jsonp.AttendeeManagement',
        
        eventMenuModel:'Personify.model.jsonp.EventMenu',
         
        customerModel: 'Personify.model.jsonp.Customer',
         
        countryModel: 'Personify.model.jsonp.Country',
        
        communityModel: 'Personify.model.jsonp.Community',
        
        contactModel: 'Personify.model.jsonp.Contact',
        
        cartModel: 'Personify.model.jsonp.Cart', 
        
        agendaModel: 'Personify.model.jsonp.Agenda',
        
        addToShoppingCartModel:'Personify.model.jsonp.store.AddToShoppingCart',
        
        shoppingCartModel: 'Personify.model.jsonp.store.ShoppingCart',
        
        orderTrue: 'Personify.model.jsonp.store.OrderTrue',
        
        orderFalse: 'Personify.model.jsonp.store.OrderFalse',

        saveRating: 'Personify.model.jsonp.SaveRating'
    },

    constructor: function(config) {
        this.initConfig(config);
    }
});
