Ext.define('Personify.utils.storemanager.StoreOfflineManager', {
    extend: 'Personify.utils.StoreManager',
    requires: ['Personify.utils.StoreManager'],
    
    config: {
        agendaStore: 'Personify.store.offline.Agenda',

        attendeeStore: 'Personify.store.offline.Attendee',

        customerBiographyStore: 'Personify.store.offline.CustomerBiography',

        countryStore: 'Personify.store.offline.Country',

        eventListStore :'Personify.store.offline.calendar.Event',

        eventMonthStore: 'Personify.store.offline.calendar.EventMonth',

        exhibitorStore: 'Personify.store.offline.Exhibitor',

        iCalendarStore: 'Personify.store.offline.ICalendar',

        isUserRegisterStore: 'Personify.store.offline.IsUserRegister',
        
        sessionStore: 'Personify.store.offline.Session',

           sessionListStore: 'Personify.store.offline.SessionList',
           
        sessionDetailStore: 'Personify.store.offline.SessionDetail',

        presenterStore: 'Personify.store.offline.Presenter',

        profileTypeStore: 'Personify.store.base.profile.Type',

        profileEmailsStore: 'Personify.store.offline.profile.Emails',

           profileUrlsStore: 'Personify.store.offline.profile.Urls',
           
           profileStore: 'Personify.store.offline.Profile',
    },

    constructor: function(config) {
        this.initConfig(config);
    }
});
