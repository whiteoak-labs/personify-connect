Ext.define('Personify.controller.event.events.EventListPanel', {
    extend : 'Personify.base.Controller',
    config : {
        isButtonHide : true,
        havePast : false
    },
    control : {
        eventlisting : {
            itemtap : 'onEventItemTap'
        }
    },
    init : function() {

    },

    setStore : function(store) {
        this.getEventlisting().getController().setStore(store);
    },

    getStore : function() {
        return this.getEventlisting().getStore();
    },

    onTapSearchButton : function(value) {
        var store = this.getEventlisting().getStore();
        this.checkAndCompileFilter();

        store.filter(function(record) {
            didMatch = (record.get('shortName').trim().toLowerCase() + " " + record.get('shortDescription').trim().toLowerCase() + " " + record.get('eventType').trim().toLowerCase() + " " + record.get('location').trim().toLowerCase()
            ).match(value.trim().toLowerCase());

            var speakers = record.SpeakersListEvent;
            speakers.each(function(speaker) {
                didMatch = didMatch || speaker.get('name').trim().toLowerCase().match(value.trim().toLowerCase());
            });

            if (didMatch) {
                return record;
            }
        });
    }, //onTapSeachButton

    onSelectionDateChange : function(date) {
        var store = this.getEventlisting().getStore();
        this.checkAndCompileFilter();

        if (date) {
            store.filter(function(record) {
                var startDate = record.get('startDateTime');
                startDate.setHours(0, 0, 0, 0);
                var endDate = record.get('endDateTime');
                if (startDate <= date && endDate >= date) {
                    return record;
                }
            });
        }
    },

    onChangeCalendarView : function(newDate) {
        var store = this.getEventlisting().getStore();
        this.checkAndCompileFilter();

        if (newDate) {
            store.filter(function(record) {
                var startDate = record.get('startDateTime');
                var endDate = record.get('endDateTime');

                if (startDate.getFullYear() * 100 + startDate.getMonth() <= newDate.getFullYear() * 100 + newDate.getMonth() && newDate.getFullYear() * 100 + newDate.getMonth() <= endDate.getFullYear() * 100 + endDate.getMonth()) {
                    return record;
                }
            });
        }
    },

    onSubmitFilter : function(recordFilter) {
        var store = this.getEventlisting().getStore();
        var formatList = recordFilter.EventFormatListCountStore;
        var locationList = recordFilter.LocationListCountStore;
        var topicList = recordFilter.TopicListCountStore;
        this.checkAndCompileFilter();

        if (formatList && formatList.getAllCount() > 0) {

        }

        if (locationList && locationList.getAllCount() > 0) {
            var location = new Array();

            locationList.each(function(formatRecord) {
                if (formatRecord.get('checked') == 'checked') {
                    location.push(formatRecord.get('code'));
                }
            });

            if (location.length > 0) {
                store.filter(function(record) {
                    var match = true;
                    for (var i = 0; i < location.length; i++) {
                        if (record.get('locationState') != location[i]) {
                            match = false;
                        }
                    }
                    if (match) {
                        return record;
                    }
                });
            }
        }

        if (topicList && topicList.getAllCount() > 0) {
            var topic = new Array();
            var subtopic = new Array();

            topicList.each(function(topicRecord) {
                if (topicRecord.get('checked') == 'checked') {
                    topic.push(topicRecord.get('code'));
                    var subArr = new Array();
                    if (topicRecord.SubcodeListEvent) {
                        topicRecord.SubcodeListEvent.each(function(subRecord) {
                            if (subRecord.get('checked') == 'checked') {
                                subArr.push(subRecord.get('code'));
                            }
                        });
                    }
                    subtopic.push(subArr);
                }
            });

            if (topic.length > 0) {
                store.filter(function(record) {
                    var match = false;
                    var topicListEvent = record.TopicListEvent;

                    topicListEvent.each(function(topicRecord) {
                        var index = Ext.Array.indexOf(topic, topicRecord.get('code'));

                        if (index >= 0) {
                            var subTopicString = subtopic[index];
                            if (subTopicString && subTopicString.length > 0) {
                                var subRecord = topicRecord.SubcodeListEvent;

                                subRecord.each(function(childRecord) {
                                    if (Ext.Array.contains(subTopicString, childRecord.get('code'))) {
                                        match = true;
                                    }
                                });
                            } else {
                                match = true;
                            }
                        }
                    })

                    if (match && topicListEvent.getAllCount() > 0) {
                        return record;
                    }
                });
            }
        }
    },

    checkAndCompileFilter : function() {
        var store = this.getEventlisting().getStore();
        store.clearFilter();
        var records = new Array();

        store.each(function(record) {
            records.push(record);
        });

        this.getEventlisting().showRecord(records);
    },

    onClearFilterListevent : function() {
        var store = this.getEventlisting().getStore();
        store.clearFilter();
        this.getEventlisting().getController().hidePastEvent(store);
    },

    onEventItemTap : function(dataView, index, target, record, e, eOpts) {
        //this.getView().fireEvent('eventitemlistselect',record);
    }
});
