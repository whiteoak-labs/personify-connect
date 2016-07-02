Ext.define('Personify.controller.schedule.PersonalAgenda',{
    extend: 'Personify.base.Controller',
    control: {
        eventDay: true,
        eventMonth: true,
        timeDisplay: true,
        eventName: true,
        location: true,
        eventType: true,
        eventDescription:true,
        removeAgendaButton: {
            tap: 'onRemoveAgendaButtonTap'
        },
        titlePersonalAgenda:{}
    },//control
    
    init: function(){
        var record = this.getView().getRecord();
        this.setRecord(record);
    },
    
    setRecord: function(record){
        if(record){
            var utils = Personify.utils.ItemUtil;
            this.getEventDay().setHtml(utils.getDayEventView(record.get('startDateTime')));
            this.getEventMonth().setHtml(utils.getMonthEventView(record.get('startDateTime')));
            this.getTimeDisplay().setHtml(utils.getDisplayTimeForEvent(record.get('startDateTimeString'), record.get('endDateTimeString')));
            this.getEventName().setHtml(record.get('title'));
            this.getEventType().setHtml(record.get('type'));
            this.getLocation().setHtml(record.get('location'));
            this.getEventDescription().setHtml('<b>Event Description: </b><br>' + record.get('description'));
            this.getTitlePersonalAgenda().setHtml('Personal Event');
            if (record.get('type').toUpperCase() == 'PERSONAL') {
                if (record.get('meetingId').trim() != "" && record.get('meetingId') != 0) {
                    this.getTitlePersonalAgenda().setHtml('Personal Session');
                }
                
            }
        }
    },
    
    onRemoveAgendaButtonTap: function() {
        var me = this;
        var record = this.getView().getRecord();

        var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);

        Ext.Msg.confirm('', message.msg, processResult);
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if (clickedButton == 'yes') {
                    me.getView().fireEvent('removeagenda', record, message.msgSuccess);
                    me.getView().destroy();
                    Ext.Msg.alert('', message.msgSuccess);
                }
            }
    }
});