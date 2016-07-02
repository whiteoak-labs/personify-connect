Ext.define('Personify.controller.event.complexevent.sessions.eventschedule.EventList',{
    extend: 'Personify.base.Controller',
    control: {
        view: {
            itemtap: 'onSelectSessionItem',
            itemtouchstart: 'onItemTouchStart',
            itemtouchend: 'onItemTouchEnd'
        }
    },
    
    onSelectSessionItem: function(item, index, target, record, e, eOpts) {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        if (e.target.className.indexOf('x-button') >= 0) {
            if (!Personify.utils.PhoneGapHelper.checkConnection()) {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
            }
            var logged = currentUser? currentUser.isLogged() : false;
            if (logged) {
                if (record.get('isAdded')) {
                    me.getView().fireEvent('deletesession', {record: record});
                } else {
                    this.getView().fireEvent('addsessiontoagenda',record);
                }
                me.getView().deselectAll();
            } else {
                Personify.utils.ItemUtil.needToLogin();
            }
        } else {
            this.getView().fireEvent('oneventitemtap', item, index, target, record, e, eOpts);
        }
    },
    
    onItemTouchStart: function(dataview, index, target, record, e, eOpts) {
        if (e.target.className.indexOf('x-button') < 0) {
            target.addCls('x-item-pressed');
        }
    },
    
    onItemTouchEnd: function(dataview, index, target, record, e, eOpts) {
        target.removeCls('x-item-pressed');
    }
});