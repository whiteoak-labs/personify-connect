Ext.define('Personify.controller.event.complexevent.sessions.myschedule.MyScheduleList',{
    extend: 'Personify.base.Controller',
    control: {
        view: {
            itemtap: 'onSelectSessionItem',
            itemtouchstart: 'onItemTouchStart',
            itemtouchend: 'onItemTouchEnd'
        }
    },
    
    onSelectSessionItem: function(item, index, target, record, e, eOpts){
        var me = this;
        if (e.target.className.indexOf('x-button') >= 0) {
            if (!Personify.utils.PhoneGapHelper.checkConnection()) {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
            }

            var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);

            Ext.Msg.confirm('', message.msg , processResult);
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if(clickedButton == 'yes'){
                    me.getView().fireEvent('deletesession', {record: record, callback: function() {
                        if (me.getView().getStore().getCount() == 1) {
                            me.getView().hide();

                            Ext.callback(function() {
                                me.getView().show();
                            }, me, [], 1000);
                        }
                        Ext.Msg.alert('', 'Personal session has been removed.');
                    }});
                    me.getView().deselectAll();
                }
            }
        }else{
            if (record.get('type').toUpperCase() == 'PERSONAL') {
                var me = this;
                var panel = Ext.Viewport.add([{
                    xtype: 'personalagenda',
                    record: record,
                    listeners: {
                        removeagenda: function(record, msgSuccess) {
                            me.getView().fireEvent('deletesession', record, msgSuccess);
                        }
                    }
                }]);
                panel.show();
            } else
                this.getView().fireEvent('oneventitemtap', item, index, target, record, e, eOpts);
        }
    },
    
    onItemTouchStart: function(dataview, index, target, record, e, eOpts){
        if (e.target.className.indexOf('x-button') < 0) {
            target.addCls('x-item-pressed');
        }
    },
    
    onItemTouchEnd: function(dataview, index, target, record, e, eOpts){
        target.removeCls('x-item-pressed');
    }
});