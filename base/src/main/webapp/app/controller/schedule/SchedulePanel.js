Ext.define('Personify.controller.schedule.SchedulePanel',{
    extend: 'Personify.base.Controller',
    config: {
        isButtonHide: true,
        havePast: false
    },
    control: {
        eventlisting: {
            itemtouchstart: 'onItemTouchStart',
            itemtouchend: 'onItemTouchEnd'
        }
    },
    init: function(){

    },

    onItemTouchStart: function(dataview, index, target, record, e, eOpts) {
        if (e.target.className.indexOf('x-button') < 0) {
            target.addCls('x-item-pressed');
        }
    },

    onItemTouchEnd: function(dataview, index, target, record, e, eOpts) {
        target.removeCls('x-item-pressed');
    },

    setStore: function(store) {
        if(store.getCount() <= 0) {
            this.getEventlisting().setEmptyText('<div class="emptyText">Currently, there are no events in your schedule. <br> You may add an event by selecting an event and choosing ‘Add to My Schedule’</div>');
        }
        this.getEventlisting().getController().setStore(store);
    },

    getStore: function(){
        return this.getEventlisting().getStore();
    },

    onTapSearchButton: function(value) {
        var store = this.getEventlisting().getStore();

        store.filter(function(record) {
            didMatch =  (record.get('title').trim().toLowerCase() + " "
                            + record.get('description').trim().toLowerCase() + " "
                            + record.get('type').trim().toLowerCase() + " "
                            + record.get('speakerName').trim().toLowerCase()
                        ).match(value.trim().toLowerCase());
            if (didMatch) {
                return record;
            }
        });
        
        this.getEventlisting().getController().showPastEvent(store);
    },//onTapSeachButton

    onSelectionDateChange: function(date) {
        var store = this.getEventlisting().getStore();

        if (date) {
            store.filter(function(record) {
                var startDate = record.get('startDateTime');
                var temp = new Date(startDate);
                temp.setHours(0,0,0,0);
                var endDate = record.get('endDateTime');
                if (temp <= date && endDate >= date) {
                    return record;
                }
            });
        }
        
        this.getEventlisting().getController().showPastEvent(store);
    },

    onChangeCalendarView: function(newDate) {
        var store = this.getEventlisting().getStore();

        if (newDate) {
            store.filter(function(record) {
                var startDate = record.get('startDateTime');
                var endDate = record.get('endDateTime');

                if (startDate.getFullYear() * 100 + startDate.getMonth() <= newDate.getFullYear() * 100 + newDate.getMonth() &&
                    newDate.getFullYear() * 100 + newDate.getMonth() <= endDate.getFullYear() * 100 + endDate.getMonth()) {
                    return record;
                }
            });
        }
        
        this.getEventlisting().getController().showPastEvent(store);
    },

    onSubmitFilter: function(recordFilter) {
        var store = this.getEventlisting().getStore();
        var formatList =  recordFilter.EventFormatListCountStore;
        var locationList =  recordFilter.LocationListCountStore;
        var topicList =  recordFilter.TopicListCountStore;
        if(formatList && formatList.getAllCount() > 0){

        }
        if(locationList && locationList.getAllCount() > 0){
            var location = new Array();
            locationList.each(function(formatRecord){
                if(formatRecord.get('checked') == 'checked'){
                    location.push(formatRecord.get('code'));
                }
            });
            if(location.length > 0){
                store.filter(function (record){
                    var match = true;
                    for(var i = 0; i < location.length; i++){
                        if(record.get('locationState') != location[i]){
                            match = false;
                        }
                    }
                    if(match){
                        return record;
                    }
                });
            }
        }
        if(topicList && topicList.getAllCount() > 0){
            var topic = new Array();
            var subtopic = new Array();
            topicList.each(function(topicRecord){
                if(topicRecord.get('checked') == 'checked'){
                    topic.push(topicRecord.get('code'));
                    var subArr = new Array();
                    if(topicRecord.SubcodeListEvent){
                        topicRecord.SubcodeListEvent.each(function(subRecord){
                            if(subRecord.get('checked') == 'checked'){
                                subArr.push(subRecord.get('code'));
                            }
                        });
                    }
                    subtopic.push(subArr);
                }
            });
            if(topic.length > 0){
                store.filter(function (record){
                    var match = true;
                    var topicListEvent = record.TopicListEvent;
                    var topictemp = new Array();
                    for(var i =0; i < topic.length ;i++){
                        topictemp.push(topic[i]);
                    }
                    topicListEvent.each( function(topicRecord){
                        Ext.Array.remove(topictemp,topicRecord.get('code'));
                    });
                    if(topictemp.length != 0){
                        match = false;
                    }else{
                        topicListEvent.each( function(topicRecord){
                            var index = Ext.Array.indexOf(topic, topicRecord.get('code'));
                            var subTopicString = subtopic[index];
                            if(subTopicString && subTopicString.length > 0){
                                var subRecord = topicRecord.SubcodeListEvent;
                                subRecord.each(function (childRecord){
                                    Ext.Array.remove(subTopicString, childRecord.get('code'));
                                });
                                if(subTopicString.length != 0){
                                    match = false;
                                }
                            }
                        });
                    }
                    if(match && topicListEvent.getAllCount() > 0){
                        return record;
                    }
                });
            }
        }
    },

    onClearFilterListevent: function() {
        var store = this.getEventlisting().getStore();
        store.clearFilter();
        this.getEventlisting().getController().hidePastEvent(store);
    }
});
