Ext.define('Personify.controller.profile.Session', {
    extend: 'Personify.controller.profile.template.InfoTemplate',
    requires: 'Personify.view.profile.contactinfo.session.SessionList',

    control: {
        infoContainer: true
    },

    setPresenterRecord: function(presenter) {
        this.getInfoContainer().removeAll(true, true);
        if(presenter && presenter.SessionListStore && presenter.SessionListStore.getCount() > 0) {
            var sessionList = Ext.create('Personify.view.profile.contactinfo.session.SessionList', {
                scrollable: null,
                disableSelection: true
            });

            sessionList.setStore(presenter.SessionListStore);
            this.getInfoContainer().add(sessionList);
        }
    }
})