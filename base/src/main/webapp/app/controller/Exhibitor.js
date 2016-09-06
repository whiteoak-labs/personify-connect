Ext.define('Personify.controller.Exhibitor', {
    extend: 'Personify.base.Controller',

    control: {
        segmentedbutton: true,
        segmentButtonAllExhibitor: {
            tap: 'onTapSegBtnAllEx'
        },
        segmentButtonMyExhibitor: {
            tap: 'onTapSegBtnMyEx'
        },
        panelExhibitorList: {
            onexhibitortap: 'ontapAllExhibitorItem'
        },
        allExhibitorList: {
           updateExhibitorStore: 'updateExhibitorStore',
           updateAddMyScheduleButton: 'updateAddMyScheduleButton',
           //nextbuttontap: 'onNextButtonTap',
           onsearchexhibitoritem: 'onSearchExhibitorItem',
           onclearicontapex: 'onClearicontapEx'
        },
        myExhibitorList: {
            updateExhibitorStore: 'updateExhibitorStore',
           onsearchexhibitoritem: 'onSearchMyExhibitorItem',
           onclearicontapex: 'onClearicontapMyEx'
        }
    },

    config: {
        exhibitorStore: null,
        allExhibitorStore: null,
        params: null,
        totalExhibitorResult: 0,
           currProductId: null,
           startPoint: 0,
           endPoint:0,
           scrollDown: true
    },

    init: function() {
        if(navigator.onLine && window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Exhibitor List');
        }
    },

    setRecord: function(record) {
        var me = this;
        var view = this.getView();

        if (view && !view.isDestroyed) {
           var scroller = this.getAllExhibitorList().getController().getExhibitorList().getScrollable().getScroller();
           scroller.on('scrollend', this.onNnListScrollEnd, this);
           scroller.on('scrollstart', this.onNnListScrollStart, this);
            this.getAllExhibitorList().setRecord(record);
            this.getMyExhibitorList().setRecord(record);
            //this.getView().setRecord(record);

            if (record) {
                me.setCurrProductId(record.get('productID') || null);
                if (record.ExhibitorStore) {
                    me.setAllExhibitorStore(record.ExhibitorStore);
                    me.showListExhibitor(record);
                    //this.setExhibitorStore(record.ExhibitorStore);
                    //this.getAllExhibitorFromSql(record, function(exhibitorStore) {
                    //      me.setExhibitorData(exhibitorStore);
                    //});
                } /*else {
                    var me = this,
                    exhibitorListPanel = me.getAllExhibitorList();
           
                    exhibitorListPanel.setMasked({xtype:'loadmask'});
                    this.onGetData(record);
                }*/
            }
        }
    },
    showListExhibitor: function(record) {
        var me = this;
        Ext.callback(function() {
            var searchTerm = '';
            var attributes = {
                SearchTerm: searchTerm,
                StartIndex: 0
            };
            me.setParams(attributes);
            me.loadExhibitorModel(record);
        }, me, [], 1);
    },
    loadExhibitorModel: function(record) {
        var me = this,
        exhibitorListPanel = me.getAllExhibitorList();
        
        exhibitorListPanel.setMasked({xtype:'loadmask'});
        var task = new Ext.util.DelayedTask(function() {
                                        
            var storeExhibitor = me.getAllExhibitorStore();
            if(storeExhibitor) {
                storeExhibitor.clearFilter();
                if(me.getParams()['SearchTerm'].trim() != '')
                {
                    storeExhibitor.setRemoteFilter(false);
                    storeExhibitor.filter(function(record) {
                        didMatch = (record.get('name').trim().toLowerCase() + " "
                        + record.get('boothNos').trim().toLowerCase() + " "
                        ).match(me.getParams()['SearchTerm'].trim().toLowerCase());
                                          
                        if(didMatch)
                            return record;
                    });
                }
                if (storeExhibitor) {
                    var currentUser = Personify.utils.Configuration.getCurrentUser(),
                    productId = me.getCurrProductId(),
                    customerId = currentUser.get('masterCustomerId'),
                    subCustomerId = currentUser.get('subCustomerId');
                    me.setTotalExhibitorResult(storeExhibitor.getCount());
                    var endIndex = me.getParams()['StartIndex'] + Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageExhibitorsList');
                    var currentStore = exhibitorListPanel.getStore();
                    if(currentStore)
                    {
                        if(me.getParams()['SearchTerm'] != '' && me.getParams()['StartIndex'] == 1)
                        {
                            currentStore.removeAll();
                            currentStore = null;
                        }
                    }
                                        
                    if(!currentStore)
                    {
                        var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                        storeExhibitorName = storeManager.getExhibitorStore();
                        currentStore = Ext.create(storeExhibitorName);
                    }
                    currentStore.suspendEvents();
                    currentStore.removeAll();
                    for (var i = me.getParams()['StartIndex']; i < endIndex; i++) {
                        if (storeExhibitor.getAt(i) != null) {
                            if (currentUser && currentUser.isLogged()) {
                                me.setAgendaFlag(storeExhibitor.getAt(i),productId,customerId,subCustomerId)
                            }
                            currentStore.add(storeExhibitor.getAt(i));
                        }
                    }
                    currentStore.sync();
                    currentStore.resumeEvents(true);
                    exhibitorListPanel.setStore(currentStore);
                    me.getAllExhibitorList().getController().getExhibitorList().refresh();
                    if(me.getScrollDown())
                        me.getAllExhibitorList().getController().getExhibitorList().getScrollable().getScroller().scrollTo(0,0);
                    else
                        me.getAllExhibitorList().getController().getExhibitorList().getScrollable().getScroller().scrollToEnd();
                }
            }
            else{
                var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                storeExhibitorName = storeManager.getExhibitorStore();
                var currentStore = Ext.create(storeExhibitorName);
                exhibitorListPanel.setStore(currentStore);
                me.getAllExhibitorList().getController().getExhibitorList().refresh();
            }
            exhibitorListPanel.setMasked(false);
        }, me);
        task.delay(100);
    },
    setAgendaFlag: function(record,productId,customerId, subCustomerId)
    {
        Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
            if(typeof result == 'object' && result.length > 0) {
                for(var i = 0; i < result.length; i++) {
                    if(result[i].exhibitorId == record.get('recordId')) {
                        record.set('isAdded', true);
                    }
                }
            }
        });
    },
    /*setExhibitorData: function(exhibitorStore) {
        this.getAllExhibitorList().setStore(exhibitorStore);

        var storeManager = Personify.utils.ServiceManager.getStoreManager(),
            storeExhibitorName = storeManager.getExhibitorStore(),
            myExhibitorStore = Ext.create(storeExhibitorName);

        exhibitorStore.each(function(record) {
            myExhibitorStore.add(record);
        });

        this.getMyExhibitorList().setStore(myExhibitorStore);
    },
*/
    onGetData: function(record,callback) {
        var me = this,
            attributesExhibitorStore = {
                "ItemsPerPage": "100000",
                "XbtID": record.get('xbtProductID'),
                "XbtParentProduct": record.get('xbtParentProduct'),
                "StartIndex": "0",
                "XbtProductCode": record.get('xbtProductCode')
            },
            storeManager = Personify.utils.ServiceManager.getStoreManager(),
            storeExhibitorName = storeManager.getExhibitorStore(),
            storeAllExhibitor = Ext.create(storeExhibitorName);

        storeAllExhibitor.setDataRequest(attributesExhibitorStore);

        storeAllExhibitor.load({
            callback: function(records, operation, success) {
                //me.setExhibitorData(storeAllExhibitor);
                if(success)
                {
                    record.ExhibitorStore=storeAllExhibitor;
                    me.setAllExhibitorStore(storeAllExhibitor);
                    me.showListExhibitor(record);
                               
                }
            },
            scope: me
        });
    },

    onTapSegBtnAllEx: function() {
        var card = this.getPanelExhibitorList(),
            item = this.getAllExhibitorList();
        card.setActiveItem(item);
    },

    onTapSegBtnMyEx: function() {
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser(),
            card = me.getPanelExhibitorList(),
            item = me.getMyExhibitorList(),
           exStore = me.getAllExhibitorStore();

        if (currentUser && currentUser.isLogged()) {
           var storeManager = Personify.utils.ServiceManager.getStoreManager(),
           storeExhibitorName = storeManager.getExhibitorStore(),
           myExhibitorStore = Ext.create(storeExhibitorName);
           
           me.getMyExhibitorStore(exStore,currentUser,myExhibitorStore,function(store) {
                me.getMyExhibitorList().getController().getSearchFieldExhibitor().getController().clearSearchField();
                //me.getMyExhibitorList().getController().getBtnClearFilter().setDisabled(true);
                item.setStore(store);
                card.setActiveItem(item);
            });
           
        } else {
            var allitemsg = this.getSegmentButtonAllExhibitor(),
                segmentedbutton = me.getSegmentedbutton();
            segmentedbutton.setPressedButtons(allitemsg);
            Personify.utils.ItemUtil.needToLogin();
        }
    },
    getMyExhibitorStore: function(exStore, currentUser,myExhibitorStore,callback)
    {
        var me=this;
        if(exStore && exStore.getCount())
        {
           exStore.clearFilter();
           var productId = me.getCurrProductId(),
           customerId = currentUser.get('masterCustomerId'),
           subCustomerId = currentUser.get('subCustomerId');
           Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
                if(typeof result == 'object' && result.length > 0) {
                    exStore.each(function(recordEx){
                        for(var i = 0; i < result.length; i++) {
                            if(result[i].exhibitorId == recordEx.get('recordId')) {
                                recordEx.set('isAdded', true);
                                myExhibitorStore.add(recordEx);                                 
                            }
                        }
                    });
                }
                if (typeof callback == 'function') {
                    callback(myExhibitorStore);
                }
            });
        }
    },
    /*getAllExhibitorFromSql: function(record, callback) {
        var currentUser = Personify.utils.Configuration.getCurrentUser(),
            storeAllExhibitor = this.getExhibitorStore();

        if (currentUser && currentUser.isLogged()) {
            var productId = record.get('productID') || null,
                customerId = currentUser.get('masterCustomerId'),
                subCustomerId = currentUser.get('subCustomerId');
            Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
                if(typeof result == 'object' && result.length > 0) {
                    storeAllExhibitor.each(function(recordEx) {
                        for(var i = 0; i < result.length; i++) {
                            if(result[i].exhibitorId == recordEx.get('recordId')) {
                                recordEx.set('isAdded', true);
                            }
                        }
                    });
                }

                if (typeof callback == 'function') {
                    callback(storeAllExhibitor);
                }
            });
        } else {
            if (typeof callback == 'function') {
                callback(storeAllExhibitor);
            }
        }
    },
*/
    ontapAllExhibitorItem: function(record) {
        this.getView().fireEvent('onexhibitortap', record);
    },

    updateExhibitorStore: function(){
        var record = this.getView().getRecord();
        this.getAllExhibitorFromSql(record);
    },

    onTapInMySchedule: function(record) {
        this.getAllExhibitorList().getController().onTapBtnDelProductAllExhibitor(record);
    },

    updateAddMyScheduleButton: function(record) {
        this.getView().fireEvent('updateAddMyScheduleButton', record);
    },
    onNextButtonTap: function() {
        var me = this;
        var exhibitorStore = me.getAllExhibitorList().getStore();
        var currentExhibitorItem = 0;
        if (exhibitorStore) {
           currentExhibitorItem = exhibitorStore.getCount();
        }
        if (currentExhibitorItem < me.getTotalExhibitorResult()) {
           me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageExhibitorsList'));
           var record1 = me.getView().getRecord();
           me.loadExhibitorModel(record1);
        }
    },
    onSearchExhibitorItem: function(newText) {
        var me = this,
        exhibitorlistpanel = me.getAllExhibitorList();
        me.getParams()['SearchTerm'] = newText;
        me.getParams()['StartIndex'] = 0;
        exhibitorlistpanel.getController().getExhibitorList().getStore().removeAll();
        var record1 = me.getView().getRecord();
        me.loadExhibitorModel(record1);
        //exhibitorlistpanel.getController().getBtnClearFilter().setDisabled(false);
    },
    onClearicontapEx : function() {
        var me = this,
        exhibitorlistpanel = me.getAllExhibitorList();
        me.getParams()['SearchTerm'] = '';
        me.getParams()['StartIndex'] = 0;
        exhibitorlistpanel.getController().getExhibitorList().getStore().removeAll();
        var record1 = me.getView().getRecord();
        me.loadExhibitorModel(record1);
        exhibitorlistpanel.getController().getSearchFieldExhibitor().getController().clearSearchField();
        exhibitorlistpanel.getController().getExhibitorList().deselectAll();
        //exhibitorlistpanel.getController().getBtnClearFilter().setDisabled(true);
    },
    onSearchMyExhibitorItem: function(newText) {
        var me = this,
        exhibitorlistStore = me.getMyExhibitorList().getStore();
        if(newText.trim() != '' || newText.trim() != null) {
           //me.getMyExhibitorList().getController().getBtnClearFilter().setDisabled(false);
           exhibitorlistStore.filter(function(record) {
                didMatch = (record.get('name').trim().toLowerCase() + " "
                    + record.get('boothNos').trim().toLowerCase() + " "
                    ).match(newText.trim().toLowerCase());
                                 
                if(didMatch)
                    return record;
            });
        }
        
    },
    onClearicontapMyEx : function() {
        var me = this,
        myExhibitorlistpanel = me.getMyExhibitorList();
        myExhibitorlistpanel.getStore().clearFilter();
        myExhibitorlistpanel.getController().getSearchFieldExhibitor().getController().clearSearchField();
        myExhibitorlistpanel.getController().getExhibitorList().deselectAll();
        //myExhibitorlistpanel.getController().getBtnClearFilter().setDisabled(true);
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
        var exhibitorStore = me.getAllExhibitorList().getStore();
        var currentExhibitorItem = 0;
        if (exhibitorStore) {
           currentExhibitorItem = exhibitorStore.getCount();
        }

        if (bottom === y && isScrollDown) {
           //this.onNextButtonTap();           
           var endIndex = me.getParams()['StartIndex']+ parseInt(Personify.utils.Configuration.getConfiguration().first().EventsStore.get('itemsPerPageExhibitorsList'));
           if(endIndex>me.getTotalExhibitorResult())
                endIndex =me.getTotalExhibitorResult();
           if (endIndex < me.getTotalExhibitorResult()) {
                me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + parseInt(Personify.utils.Configuration.getConfiguration().first().EventsStore.get('itemsPerPageExhibitorsList'));
                var record1 = me.getView().getRecord();
                me.loadExhibitorModel(record1);
           }
        }
        else if (top === y && !isScrollDown) {
           if (me.getParams()['StartIndex'] >= parseInt(Personify.utils.Configuration.getConfiguration().first().EventsStore.get('itemsPerPageExhibitorsList'))) {
                me.getParams()['StartIndex'] = me.getParams()['StartIndex'] - parseInt(Personify.utils.Configuration.getConfiguration().first().EventsStore.get('itemsPerPageExhibitorsList'));
           
                var record1 = me.getView().getRecord();
                me.loadExhibitorModel(record1);
           }
        }
    },
    onNnListScrollStart : function(scroller, x, y) {
        var me = this;
        me.setStartPoint(y);
    }
});
