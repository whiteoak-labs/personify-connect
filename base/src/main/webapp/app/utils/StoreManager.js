Ext.define('Personify.utils.StoreManager', {
    config: {
        userStore: 'Personify.store.base.User',

        staffStore: 'Personify.store.base.Staff',

        sessionStore: 'Personify.store.base.Session',
           
           sessionListStore: 'Personify.store.base.SessionList',
           
        scheduleStore: 'Personify.store.base.Schedule',

        purchaseHistoryStore: 'Personify.store.base.PurchaseHistory',

        profileStore: 'Personify.store.base.Profile',

        productStore: 'Personify.store.base.product.Product',

        productClassStore: 'Personify.store.base.product.ProductClass',

        productListStore: 'Personify.store.base.product.ProductList',

        presenterStore: 'Personify.store.base.Presenter',

        attendeeStore: 'Personify.store.base.Attendee',

        participationStore: 'Personify.store.base.Participation',

        notificationStore: 'Personify.store.base.Notification',

        noteStore: 'Personify.store.base.Note',

        noteListStore: 'Personify.store.base.NoteList',

        materialStore: 'Personify.store.base.Material',

        iCalendarStore: 'Personify.store.base.ICalendar',

        exhibitorStore: 'Personify.store.base.Exhibitor',
           
        exhibitorListStore: 'Personify.store.jsonp.ExhibitorList',
        

        eventMenuStore: 'Personify.store.base.EventMenu',

        directoryStore: 'Personify.store.base.Directory',

        deleteCommunicationStore: 'Personify.store.base.DeleteCommunication',

        deleteAddressStore:'Personify.store.base.DeleteAddress',

        customerStore: 'Personify.store.base.Customer',

        countryStore: 'Personify.store.base.Country',

        stateStore: 'Personify.store.base.State',

        callTypeStore: 'Personify.store.base.contactlisting.CallType',

        callTopicStore: 'Personify.store.base.contactlisting.CallTopic',

        callSubjectStore: 'Personify.store.base.contactlisting.CallSubject',

        communityStore: 'Personify.store.base.Community',

        contactStore: 'Personify.store.base.Contact',

        cartStore: 'Personify.store.base.Cart',

        agendaStore: 'Personify.store.base.Agenda',

        addToShoppingCartStore:'Personify.store.base.store.AddToShoppingCart',

        shoppingCartStore: 'Personify.store.base.store.ShoppingCart',

        updateProfileStore: 'Personify.store.base.profile.UpdateProfile',

        yahooRssStore: 'Personify.store.news.YahooRss',

        newStore: 'Personify.store.news.News',

        orderTrue: 'Personify.store.base.store.OrderTrue',

        orderFalse: 'Personify.store.base.store.OrderFalse',

        uploadImage: 'Personify.store.base.store.UploadImage',

        customerBiographyStore: 'Personify.store.jsonp.CustomerBiography',

        profileAuthenticationUrl: 'Personify.store.base.profile.AuthenticationUrl'
    },

    constructor: function(config) {
        this.initConfig(config);
    }
});
