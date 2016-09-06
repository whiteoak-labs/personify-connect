Ext.define('Personify.controller.phone.schedule.PersonalAgenda', {
    extend: 'Personify.base.Controller',
    control: {
        eventToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        titleOfEvent: true,
        description: true,
        location: true,
        timeDisplay: true,
        numberOfDate: true,
        monthAndYear: true,
        deleteAgendaButton: {
            tap: 'onDeleteAgendaButtonTap'
        }
    },
    init: function() {
        this.getEventToolbar().getController().setHiddenActionButton(true);
        var record = this.getView().getRecord();
        this.setRecord(record);
    },
    
    setRecord: function(record){
         if(record){
            var utils = Personify.utils.ItemUtil;
            var day = Ext.Date.format(record.get('startDateTime'), 'j') + '<sup class= "p-phone-itemlist-eventday-ordinalsuffix">'+Ext.Date.format(record.get('startDateTime'), 'S') + '</sup>';
            this.getNumberOfDate().setHtml(day);
            this.getMonthAndYear().setHtml(Ext.Date.format(record.get('startDateTime'), 'M Y'));
            this.getTimeDisplay().setHtml(utils.getDisplayTimeForEvent(record.get('startDateTimeString'), record.get('endDateTimeString')));
            this.getTitleOfEvent().setHtml(record.get('title'));
            this.getLocation().setHtml(record.get('location'));
            this.getDescription().setHtml(record.get('description'));
        }
    },
    
    onBack: function() {
        var me = this;
            thisView = me.getView();
        thisView.fireEvent('back',this);
    },
    
    onDeleteAgendaButtonTap: function(){
        var me = this;
        var record = this.getView().getRecord();
        
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var record = this.getView().getRecord();

        var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);
        
        Ext.Msg.confirm('', message.msg, processResult);
        function processResult(clickedButton) {
            Ext.Msg.hide();
            if(clickedButton == 'yes'){
                Ext.Viewport.setMasked({xtype: 'loadmask'});
                me.getView().fireEvent('removeagenda', me.getView().getRecord(), function(success) {
                    if(success) {
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('', message.msgSuccess, Ext.emptyFn);
                    }
                    me.getView().fireEvent('refreshagenda', me.getView().getRecord(), false);
                });
            }
        }
    }
});
