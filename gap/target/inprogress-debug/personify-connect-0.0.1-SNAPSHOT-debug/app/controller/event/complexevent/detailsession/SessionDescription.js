Ext.define('Personify.controller.event.complexevent.detailsession.SessionDescription',{
    extend: 'Personify.base.Controller',
    control: {
        descriptionSession: true
    },

    init: function(){
           
        var record = this.getView().getRecord();
        this.setRecord(record);
    },
    
    setRecord: function(record) {
        if(record){
            this.getDescriptionSession().setHtml(record.get('description'));
        }
    }
});