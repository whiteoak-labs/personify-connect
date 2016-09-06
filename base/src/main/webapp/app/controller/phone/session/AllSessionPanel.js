Ext.define('Personify.controller.phone.session.AllSessionPanel', {
    extend: 'Personify.base.Controller',
    config: {
           sessionDates: null,
           currentDate: null,
           dateIndex: 0,
           itemsPerPage: 10,
           totalAllSessions: 0,
           totalDateWiseAllSessions: 0,
           startIndex:0,
           searchTerm:'',
           dateFormat:'m/d/y',
           totalResultDateWise:0,
           startPoint: 0,
           endPoint:0,
           scrollDown: true,
           datewiseAllExhibitors:null,
           btnFilterByTrack: null,
           trackValue:null
    },

    control: {
        allSessionTitleBar: true,
        allSessionList: {
            itemtap: 'onSessionItemTap'
        },
        previousButton: {
            tap: 'onBackSegmentButton'

        },
        dateTimeLabel: true,
        totalEventLabel:true,
        sessionHeader: true,
        nextButton:{
            tap: 'onNextSegmentButton'
        },
        searchFieldAllSessionPanelPhone: {
            onTextChange: 'onTextChangeAllSessionPanelPhone'
        },
        searchWithFilter:
        {
           onFilterSession:'onFilterSession',
           onTapSearchSession:'onTapSearchSession'
        },
        filterListEventSchedule: {
           filterbytrack: 'onFilterByTrack',
           show:'showPopupPanel',
           hide:'hidePopupPanel',
        },
        filterTextLabel: true   
   
    },

    setRecord: function(record){
        var itemperpage=Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageSession');
        this.setItemsPerPage(itemperpage);
           
        var scroller = this.getAllSessionList().getScrollable().getScroller();
        scroller.on('scrollend', this.onNnListScrollEnd, this);
        scroller.on('scrollstart', this.onNnListScrollStart, this);
           
        if (record) {
            this.getAllSessionTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 48));
            if(record.SessionStore && record.SessionStore.getCount() > 0){
                //// Create Dates Array from SessionDatesStore
                ///this.getArrayDates(record.SessionDatesStore);
                this.getArrayDates();
                this.onSelectDefaultDate();
           
                this.getFilterListEventSchedule().setRecord(record);
            }else{
                this.getDateTimeLabel().setHtml("");
                if (navigator.onLine)
                {
                    this.onGetData(record,0);
                }
            }
        }
        else
        {
            this.getDateTimeLabel().setHtml("");
        }
    },
    onGetData: function(record, arraySessionID){
        var me = this;
        me.getAllSessionList().setMasked({xtype:'loadmask'});
           
        var currentUser = Personify.utils.Configuration.getCurrentUser();
           var attributes = {
                "MeetingID": record.get('productID'),
                "IsStaffMember": currentUser? currentUser.isStaffMember().toString() : false,
                "IsMember": currentUser ? currentUser.isMember().toString() : false,
                "ItemsPerPage": "100000",
                "StartIndex": "1",
                "SessionDate": "",
           
                //// Following Attributes were added on Tablet
                "MasterCustomerID" : currentUser ? currentUser.get('masterCustomerId') : '',
                "SubCustomerID" : currentUser ? currentUser.get('subCustomerId') : '0'
           };
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var storeSessionName = storeManager.getSessionListStore();
         
           var storeSession = Ext.create(storeSessionName);
           var sessionStore = Ext.create(storeSessionName);
           var storeAgenda = Ext.getStore('agendaStoreListMain');
           storeSession.setDataRequest(attributes);

           storeSession.load({
            callback: function(records, operation, success) {
                 if (records.length > 0) {
                    storeSession.each(function(recordSession) {
                        if (storeAgenda) {
                            for (var i = 0; i < storeAgenda.getCount(); i++) {
                                var recordAgenda = storeAgenda.getAt(i);
                                if (recordAgenda.get('sessionID') == recordSession.get('sessionID')) {
                                    if (!recordSession.get('isAdded')) {
                                        recordSession.set('isAdded', true);
                                        break;
                                    }
                                }
                            };
                        }
                                      
                        recordSession.set('productID',record.get('productID'));
                                      
                        record.SessionStore = Ext.create(storeManager.getSessionStore());
                        record.SessionStore= records[0].SessionsStore;
                        record.SessionDatesStore = records[0].SessionDatesStore;
                        sessionStore.add(recordSession);
                        sessionStore.sync();
                                      
                        me.getArrayDates();
                        me.onSelectDefaultDate();
                    });
                    me.getAllSessionList().setStore(storeSession);
                    /////record.SessionStore = sessionStore;
                             
                    me.getAllSessionList().setMasked(false);
                }
                else
               {
                   me.getAllSessionList().setMasked(false);
               }
            },
            scope: this
        }); 
    },

    getArrayDates: function(){
           //// set Null to local variable
           this.setDatewiseAllExhibitors(null);
           var record = this.getView().getRecord();
           var sessionDatesStore = record.SessionStore;
           if(sessionDatesStore){
                sessionDatesStore.clearFilter();
                sessionDatesStore.setRemoteFilter(false);
                var newDates = new Array();
                sessionDatesStore.each(function(recordSession){
                if(recordSession){
                    var startDate = Personify.utils.ItemUtil.convertStringToDateSession(recordSession.get('startDateTimeString'));
                    ////var startDate = Personify.utils.ItemUtil.convertStringToDateSession(recordSession.get('StartDate'));
                    if(!Personify.utils.ItemUtil.checkDateInDateArray(newDates, startDate)){
                        newDates.push(startDate);
                    }
                }
            });
            newDates.sort( function(date1, date2){
                return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
            })
            this.setSessionDates(newDates);
        }
    },

    onSelectDefaultDate: function() {
        var me = this;
        var dates = this.getSessionDates();
        var current = new Date();
        var isHaveCurrent = false;
        var index = 0;
        Ext.Array.each(dates, function(value) {
           
            if (Ext.Date.format(value, me.getDateFormat()) == Ext.Date.format(current, me.getDateFormat())) {
                isHaveCurrent = true;
                current = value;
                me.setDateIndex(index);
            }
            index++;
        });

        if (dates && dates.length > 0) {
            this.getSessionHeader().show();
            if (isHaveCurrent) {
                this.onFilterByDate(current);
            } else {
                this.onFilterByDate(dates[this.getDateIndex()]);
            }
        } else {
            this.getSessionHeader().hide();
        }
           this.updateShowHidebutton();
    },

    onFilterByDate: function(date) {
      
        var me = this;
        ///var store = this.getAllSessionList().getStore();       
       
        //// set Null to local variable
        this.setDatewiseAllExhibitors(null);
           
        this.getDateTimeLabel().setHtml(Ext.Date.format(date, 'F d, Y'));
           
        var record = this.getView().getRecord();
        var store = record.SessionStore;
           
        if(store){
            store.clearFilter();
           
            store.setRemoteFilter(false);
           
            //// Filter the store
            me.updateFilter(store);
           
            this.setCurrentDate(date);
           
            store.filter(function(record) {
                var startDate = Personify.utils.ItemUtil.convertStringToDateSession(record.get('startDateTimeString'));
              
                if(Ext.Date.format(startDate, me.getDateFormat()) == Ext.Date.format(date, me.getDateFormat())){
                    return record;
                }
            });
            /* Sorting is already done on view */
            store.sort({
                sorterFn: function(record1, record2) {
                    var date1 = Personify.utils.ItemUtil.convertStringToDateSession(record1.get('startDateTimeString'));
                    var date2 = Personify.utils.ItemUtil.convertStringToDateSession(record2.get('startDateTimeString'));

                    if (date1 > date2) {
                        return 1;
                    } else if (date1 < date2) {
                        return -1;
                    } else {
                        var title1 = record1.get('title');
                        var title2 = record2.get('title');

                        return title1 > title2 ? 1 : (title1 == title2 ? 0 : -1);
                    }
                },
                direction: 'ASC'
            });
           
            ////this.getDateTimeLabel().setHtml(Ext.Date.format(date, 'F d, Y'));
           
            /* Commented as per the requirement on 10 April 2014
            this.getTotalEventLabel().setHtml(store.getCount() + ' Events');
            */
           
           /* Performance Related Enhancements */
           
           //// Set Date Wise Store
           this.setDatewiseAllExhibitors(store);
           
            if (!store || store.getCount() == 0) {
                 /* Commented as per the requirement on 10 April 2014
                this.getTotalEventLabel().setHtml("");
                 */
                this.setTotalResultDateWise(0);
            }
            else
            {           
                this.setTotalResultDateWise(store.getCount());
                this.setStartIndex(0);
                this.loadAllSessions(this.getSearchTerm(),true,store);
            }
           ///store.clearFilter();
           
        /* End Performance Related Enhancements */
   
       }       
    },

    onBackSegmentButton: function(){
        var index = this.getDateIndex();
        var dates = this.getSessionDates();
        if(index > 0){
            this.setDateIndex(index - 1);
            this.onFilterByDate(dates[index - 1]);
            this.updateShowHidebutton();
        }
    },

    onNextSegmentButton: function(){
        var index = this.getDateIndex();
        var dates = this.getSessionDates();
        if(index < this.getSessionDates().length){
            this.setDateIndex(index + 1);
            this.onFilterByDate(dates[index + 1]);
            this.updateShowHidebutton();
        }
    },

    updateShowHidebutton: function() {
        var index = this.getDateIndex();
        if(index > 0) {
            this.getPreviousButton().setDisabled(false);
        } else {
            this.getPreviousButton().setDisabled(true);
        }
        if(index + 1 < this.getSessionDates().length) {
            this.getNextButton().setDisabled(false);
        } else {
            this.getNextButton().setDisabled(true);
        }
    },

    onSessionItemTap: function(view, index, target, record, e) {
           this.getView().getParent().fireEvent('onsessiontap', record);
    },
           
    /* Performance related enhancement */
           
    onScrollEndAllSessions:function()
    {
            var me=this;
           
            me.getAllSessionList().setMasked({xtype:'loadmask'});
           
            var index = this.getDateIndex();
            var date = this.getSessionDates()[index];
           
            var store = me.getDatewiseAllExhibitors();
            if(store)
            {
                 me.loadAllSessions(this.getSearchTerm(),false,store);
            }
            else
            {
                /// Remove the loader
                me.getAllSessionList().setMasked(false);
            }
    },
    loadAllSessions:function(searchText,resetStartIndex,sessionStore)
    {
            var me = this;      
           
            me.getAllSessionList().setMasked({xtype:'loadmask'});
           
            //// Set Start Index
            var startIndex=resetStartIndex ? 0 : parseInt(me.getStartIndex());
            
            //// Retrieve store from control
            var allsessionStore=me.getAllSessionList().getStore();
           
            if(allsessionStore==null)
            {
                    var storeManager = Personify.utils.ServiceManager.getStoreManager();
                    var storeSessionName = storeManager.getSessionStore();
                    allsessionStore = Ext.create(storeSessionName);
            }
            
           /* if ((resetStartIndex || me.getStartIndex()===0) && allsessionStore!=null)
            {
                    //// Clear the existing Records
                    ////me.getAllSessionList().getStore().destroy();
                    allsessionStore.removeAll();
                    allsessionStore.sync();
            }*/
            //// Set Last Index
            var lastIndex=parseInt(startIndex) + parseInt(me.getItemsPerPage());
                      
            //// If Last Index is greater than store records then set the count of records as last index
            if (lastIndex>sessionStore.getCount())
            {
                lastIndex=sessionStore.getCount();
            }
            
            if (lastIndex>0 && startIndex<lastIndex)
            {
                    var task = new Ext.util.DelayedTask(function()
                    {
                                                        
                        //// Fetch next records from store that is filtered by date
                        var nextRecords = sessionStore.getRange(startIndex, (lastIndex-1));
            
                        //// Add new records to the store that is already added to control
                        allsessionStore.removeAll();
                        allsessionStore.sync();
                        allsessionStore.add(nextRecords);
                                                        
                        me.getAllSessionList().setStore(allsessionStore);
            
                        //// Reset start index
                        ////me.setStartIndex(lastIndex);
                                                        
                        if(me.getScrollDown())
                        {
                                me.getAllSessionList().getScrollable().getScroller().scrollTo(0,0);
                        }
                        else
                        {
                                var indextoSelect=allsessionStore.getCount();
                                me.getAllSessionList().scrollToRecord(allsessionStore.getAt((parseInt(indextoSelect)-1)));
                        }
                                                        
                        /// Remove the loader
                        me.getAllSessionList().setMasked(false);
                    }, me);
                    task.delay(100);
            }
            else
            {
                    allsessionStore.removeAll();
                    allsessionStore.sync();
                    allsessionStore.add(allsessionStore);
                    me.getAllSessionList().setStore(allsessionStore);
                    /// Remove the loader
                    me.getAllSessionList().setMasked(false);
            }
    },
    onNnListScrollEnd : function(scroller, x, y) {
           var me = this;
           me.setEndPoint(y);
           var bottom = scroller.maxPosition.y;
           var top = scroller.minPosition.y;
           var isScrollDown = false;
                if(me.getStartPoint() < me.getEndPoint())
                {
                    isScrollDown = true;
                }
                else if(me.getStartPoint() > me.getEndPoint()){
                    isScrollDown = false;
                }
                else
                {
                        if(me.getStartPoint() == 0 && me.getEndPoint() == 0)
                        {
                            isScrollDown = false;
                        }
                        else
                        {
                            isScrollDown = true;
                        }
                }
        
                me.setScrollDown(isScrollDown);
           
                if (bottom === y && isScrollDown)
                {
                     var endIndex = parseInt(me.getStartIndex()) + parseInt(me.getItemsPerPage());
                     if(endIndex>me.getTotalResultDateWise())
                     {
                           endIndex=me.getTotalResultDateWise();
                     }
                     if (endIndex < me.getTotalResultDateWise())
                     {
                          me.setStartIndex(parseInt(me.getStartIndex()) + parseInt(me.getItemsPerPage()));
                          me.onScrollEndAllSessions();
                     }
               }
               else if (top === y && !isScrollDown)
               {
                     if (me.getStartIndex() >= parseInt(me.getItemsPerPage()))
                     {
                          me.setStartIndex(parseInt(me.getStartIndex()) - parseInt(me.getItemsPerPage()));
                          me.onScrollEndAllSessions();
                     }
               }
           },
    onNnListScrollStart : function(scroller, x, y) {
           var me = this;
           me.setStartPoint(y);
    },
    onTextChangeAllSessionPanelPhone: function(value){
           this.setSearchTerm(value);
           this.takeAwayDaysNoResults();
    },
    takeAwayDaysNoResults: function(){
           var me = this;
           me.setStartIndex(0);
           var record = me.getView().getRecord();
           var store = record.SessionStore;
           this.setDateIndex(0);
           store.clearFilter();
           
           //// Filter the Store
           this.updateFilter(store);
           
           //// Get the Filtered Dates from store
           this.getArrayDatesonSearch(store);
           if (this.getSessionDates() !=null && this.getSessionDates().length>0)
           {
                this.onSelectDefaultDate();
           }
           else
           {
                me.getSessionHeader().hide();
                me.updateShowHidebutton();
                var curStore = me.getAllSessionList().getStore();
                if(curStore){
                    me.getAllSessionList().getStore().removeAll();
                }
       }
           
    },
    updateFilter: function (store) {
           var searchValue = this.getSearchTerm();
           var tracks = this.getTrackValue();
           if(searchValue){
                store.filter( function(record){
                        var searchData = record.get('title') + " " + record.get('location');
                        if(record.SpeakerSession){
                        record.SpeakerSession.each(function(speaker){
                                            searchData = searchData + " " + speaker.get('name') + " "
                                            + speaker.get('firstName') + " " + speaker.get('lastName')
                                            + " " + speaker.get('jobTitle') + " " + speaker.get('employer');
                                        });
                        }
                        if(searchData.toLowerCase().match(searchValue.trim().toLowerCase())){
                             return record;
                        }
                });
           }
           
           if(tracks != null){
           store.filter( function(record){
                        var haveData = false;
                        record.TrackSession.each(function(trackRecord){
                                            if(trackRecord.get('descr').trim().toLowerCase() == tracks.trim().toLowerCase()){
                                                 haveData = true;
                                                }
                                        });
                    if(haveData){
                        return record;
                    }
                });
           }
    },
    getArrayDatesonSearch: function(sessionDatesStore){
           //// set Null to local variable
           this.setDatewiseAllExhibitors(null);
           
           var newDates = new Array();
           if(sessionDatesStore){
                sessionDatesStore.each(function(recordSession){
                if(recordSession)
                {
                    var startDate = Personify.utils.ItemUtil.convertStringToDateSession(recordSession.get('startDateTimeString'));
                    if(!Personify.utils.ItemUtil.checkDateInDateArray(newDates, startDate))
                    {
                        newDates.push(startDate);
                    }
               }
           });
           newDates.sort( function(date1, date2){
                return date1 > date2 ? 1 : (date1 == date2 ? 0 : -1);
            })
        }
           
       this.setSessionDates(newDates);
  },
    /* Functionality for Filter By Tracks */
           
    onTapSearchSession:function()
    {
           var me = this;
           var searchSessionPanel = me.getSearchFieldAllSessionPanelPhone();
           if(searchSessionPanel.isHidden()) {
                searchSessionPanel.setHidden(false);
           } else {
                searchSessionPanel.setHidden(true);
           }
    },
           
    onFilterSession: function(button) {           
           this.getFilterListEventSchedule().showBy(button);
           button.setZIndex(8);
           this.setBtnFilterByTrack(button);
    },
           
    onFilterByTrack: function(text){
           this.setTrackValue(text);
           if(text != null){
                this.getFilterTextLabel().setHtml('Viewing: ' + text);
           }else{
                this.getFilterTextLabel().setHtml('');
           }
           
           this.takeAwayDaysNoResults();
           this.getBtnFilterByTrack().setZIndex(0);
           
   },
           
    showPopupPanel: function(obj) {
           Personify.utils.BackHandler.pushActionAndTarget('forceHide', this, obj);
    },
           
    hidePopupPanel: function(obj) {
           Personify.utils.BackHandler.popActionAndTarget('forceHide', this, obj);
    },
           
    forceHide: function(obj) {
           obj.hide();
    }

           
    /* End Functionality for Filter By Tracks */
       
});
