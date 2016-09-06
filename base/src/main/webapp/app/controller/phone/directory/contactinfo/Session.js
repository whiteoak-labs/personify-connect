Ext.define('Personify.controller.phone.directory.contactinfo.Session', {
    extend: 'Personify.controller.profile.Session',
    requires: 'Personify.view.phone.directory.contactinfo.session.SessionList',

    control: {
        infoContainer: true
    },

    setPresenterRecord: function(presenter) {
        this.getInfoContainer().removeAll(true, true);
        if(presenter && presenter.SessionListStore && presenter.SessionListStore.getCount() > 0) {
            var sessionList = Ext.create('Personify.view.phone.directory.contactinfo.session.SessionList', {
                scrollable: null,
                disableSelection: true
            });

            sessionList.setStore(presenter.SessionListStore);
            this.getInfoContainer().add(sessionList);
        }
    }
})