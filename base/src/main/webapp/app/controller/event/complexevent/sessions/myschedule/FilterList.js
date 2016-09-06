Ext.define('Personify.controller.event.complexevent.sessions.myschedule.FilterList', {
    extend: 'Personify.base.Controller',

    control: {
        updateList: {
            itemtap: 'onUpdateListTap'
        },
        clearFilterByTrack: {
            tap: 'clearFilterByTrack'
        },
           filterType: true
    },//control

    onUpdateListTap: function(dataView, index, target, record, event, eOpts){
        if(this.getFilterType().getHtml()=='store')
        {
           this.getView().fireEvent("filterbytrack", record.get('description'), record.get('text'));
        }
        else
        {
           this.getView().fireEvent("filterbytrack", record.get('text'));
        }
        this.getView().hide();
    },

    setRecord: function(record){
        if(record.ConferenceTrackListEvent)
        {
           this.getUpdateList().setStore(record.ConferenceTrackListEvent);
        }else{
           var data = new Array();
           var trackArray = record.get('conferenceTracks').split(',');
           for(var i = 0; i < trackArray.length; i++){
                if(trackArray[i].trim() != ""){
                    data.push({text: trackArray[i].trim(), value: trackArray[i].trim()});
                }
           }
           if(data.length > 0){
                this.getUpdateList().setData(data);
           }
        }
    },

    clearFilterByTrack: function(){
        this.getUpdateList().deselectAll();
        this.getView().fireEvent("filterbytrack", null);
        this.getView().hide();
    },
    
    setButtonText: function(value){
        this.getClearFilterByTrack().setText(value);
    },
           setFilterType: function(value){
           this.getFilterType().setHtml(value);
           }
           
});