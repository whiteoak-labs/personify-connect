Ext.define('Personify.controller.event.filter.FilterPanel',{
    extend: 'Personify.base.Controller',
    control: {
        submitFilter: {
            tap: 'onSubmitFilterTap'
        },
        filterTopic: {
            
        },
        filterLocation: {
            
        }
    },//control
    init: function() {
        var record = this.getView().getRecord()
        this.setRecord(record);
    },
    setRecord: function(record) {
        if(record){
            var topic = this.getFilterTopic().getController();
            var location = this.getFilterLocation().getController();
            topic.setLabel('Topic');
            location.setLabel('Location (State)');
            if(record){
                topic.setStoreData(record.TopicListCountStore);
                location.setStoreData(record.LocationListCountStore);
            }
        }
    },
    
    onSubmitFilterTap: function(){
        var record = this.getView().getRecord();
        this.getView().fireEvent('onsubmitfilter',record);
        this.getView().destroy();
    }
});