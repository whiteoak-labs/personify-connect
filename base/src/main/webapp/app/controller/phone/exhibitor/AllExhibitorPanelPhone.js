Ext.define('Personify.controller.phone.exhibitor.AllExhibitorPanelPhone', {
    extend: 'Personify.base.Controller',
    config:
    {
       itemsPerPage: 10,
       totalExhibitor: 0,
       startIndex:0,
       searchTerm:'',
       allExhibitorStore:null,
       startPoint: 0,
       endPoint:0,
       scrollDown: true
    },

    control: {
        allExhibitorTitleBar: true,
        searchFieldAllExhibitorPanelPhone: {
            /////onClearIconTap: 'onClearIconTapAllExhibitorPanelPhone',
            onTextChange: 'onTextChangeAllExhibitorPanelPhone'
        },
        btnOpenMyExhibitorsList: {
            tap: 'onTapBtnOpenMyExhibitorsList'
        },
        allExhibitorListPhone: {
            itemtap: 'onTapAllExhibitorListPhoneItem'
        }
    },

    setRecord: function(record) {
           
           var scroller = this.getAllExhibitorListPhone().getScrollable().getScroller();
           scroller.on('scrollend', this.onNnListScrollEnd, this);
           scroller.on('scrollstart', this.onNnListScrollStart, this);
           
           var itemperpage=Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageExhibitorsList');
           this.setItemsPerPage(itemperpage);
           this.setAllExhibitorStore(null);
           
           if (record) {
                var storeAllExhibitor = record.ExhibitorStore;
                this.getAllExhibitorTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(record.get('shortName'), 48));
                if (storeAllExhibitor) {
                        this.setStartIndex(0);
                        this.setAllExhibitorStore(storeAllExhibitor);
                        this.loadAllExhibitors('', true);
                    } else {
                        ////this.onGetData(record);
                }
           }
    },

    onGetData: function(record) {
          
         /*  var me = this,
           attributesExhibitorStore = {
                "ItemsPerPage": "100000",
                "XbtID": record.get('xbtProductID'),
                "XbtParentProduct": record.get('xbtParentProduct'),
                "StartIndex": "0",
                "XbtProductCode": record.get('xbtProductCode')
           },
           storeManager = Personify.utils.ServiceManager.getStoreManager(),
           storeExhibitorListName = storeManager.getExhibitorListStore(),
           storeAllExhibitorList = Ext.create(storeExhibitorListName);
           
           var allExhibitorListPanel=this.getAllExhibitorListPhone();
           allExhibitorListPanel.setMasked({xtype:'loadmask'});
           
           storeAllExhibitorList.setDataRequest(attributesExhibitorStore);
           record.ExhibitorStore = storeAllExhibitorList;
           storeAllExhibitorList.load({
                        callback: function(records, operation, success) {
                        if(records.length > 0) {
                                  ////me.getAllExhibitorListPhone().setStore(record.ExhibitorStore);
                                  ////this.updateLayoutExhibitorList();
                                  me.setAllExhibitorStore(storeAllExhibitorList);
                                  allExhibitorListPanel.setMasked(false);
                                  me.loadAllExhibitors('', true);
                                }
                             },
                         scope: me
                    });*/
    },

    /*onClearIconTapAllExhibitorPanelPhone: function() {
     
        this.getAllExhibitorListPhone().getStore().clearFilter();
        this.getAllExhibitorListPhone().deselectAll();
        this.updateLayoutExhibitorList();
    },*/

    onTextChangeAllExhibitorPanelPhone: function(newText) {
        /* Performance Enhancements */
       
        this.loadAllExhibitors(newText,true);
           
        /* End Performance Enhancements */
    },

    onTapBtnOpenMyExhibitorsList: function() {
        this.getView().fireEvent('openMyExhibitorsList');
        this.getSearchFieldAllExhibitorPanelPhone().getController().clearSearchField();
    },

    onTapAllExhibitorListPhoneItem: function(me, index, target, record, e, eOpts) {
        this.getView().fireEvent('onTapAllExhibitorListPhoneItem', record);
    },

    updateLayoutExhibitorList: function() {
        var list = this.getAllExhibitorListPhone().getViewItems();
        for (var i = 0, length = list.length; i < length; i++) {
            if (i % 2 === 0) {
                list[i].addCls('presenterlistitemeven');
            } else {
                list[i].addCls('presenterlistitemodd');
            }
        }
    },
    /* Performance Enhancements */
    onScrollEndAllExhibitor:function()
    {
        this.loadAllExhibitors(this.getSearchTerm(),false);
    },
           
    loadAllExhibitors:function(searchText,resetStartIndex)
    {
           
       var me=this;
       var delayTime=100;
           
           
       //// Get Exhibitor Store with Complete Records
       var allExhibitorStoreMain=me.getAllExhibitorStore();
           
       if(allExhibitorStoreMain)
       {
           allExhibitorStoreMain.setRemoteFilter(false);
           allExhibitorStoreMain.clearFilter();
           
           var allExhibitorListPanel=this.getAllExhibitorListPhone();
           allExhibitorListPanel.setMasked({xtype:'loadmask'});
           
                //// Get Exhibitor Store From View. It has recently filtered or paging Records.
                var allExhibitorStoreFiltered = allExhibitorListPanel.getStore();
                if(resetStartIndex)
                {
                      me.setStartIndex(0);
                }
                                               
                //// Set Search Term
                me.setSearchTerm(searchText);
                                              
                //// If view does not have store then create the same
                if(allExhibitorStoreFiltered==null)
                {
                        var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                        storeExhibitorName = storeManager.getExhibitorListStore();
                        allExhibitorStoreFiltered = Ext.create(storeExhibitorName);
                }
           
                 if(allExhibitorStoreMain.getCount()>0)
                 {
                    if(searchText.trim() != '')
                    {
                           allExhibitorStoreMain.clearFilter();
                           allExhibitorStoreMain.filter(function(record) {
                                      didMatch = (record.get('name').trim().toLowerCase() + " "
                                    + record.get('boothNos').trim().toLowerCase() + " "
                                      ).match(searchText.trim().toLowerCase());
                                                        
                                      if(didMatch)
                                              return record;
                                 });
                     }
                                               
                     //// Get count of All Records
                    var allExhibitorStoreMainCount=allExhibitorStoreMain.getCount();
                    //// Used in Scrolling
                    me.setTotalExhibitor(allExhibitorStoreMainCount);
           
                    if(me.getStartIndex()<allExhibitorStoreMainCount)
                    {
                        var task = new Ext.util.DelayedTask(function()
                        {
                             var lastIndex=parseInt(me.getStartIndex())+parseInt(me.getItemsPerPage());
                             if(lastIndex>allExhibitorStoreMainCount)
                             {
                                    lastIndex=allExhibitorStoreMainCount;
                             }
                                                            
                                //// Fetch next records from store that is filtered by date
                                var nextRecords = allExhibitorStoreMain.getRange(parseInt(me.getStartIndex()), (lastIndex-1));
                                //// Clear the existing Records
                                allExhibitorStoreFiltered.removeAll();
                                allExhibitorStoreFiltered.sync();
                                      
                                /// Added next records
                                allExhibitorStoreFiltered.add(nextRecords);
                                allExhibitorListPanel.setStore(allExhibitorStoreFiltered);
                                
                                                         
                                if(me.getScrollDown())
                                {
                                        allExhibitorListPanel.getScrollable().getScroller().scrollTo(0,0);
                                }
                                else
                                {
                                       var indextoSelect=allExhibitorStoreFiltered.getCount();
                                        allExhibitorListPanel.scrollToRecord(allExhibitorStoreFiltered.getAt((parseInt(indextoSelect)-1)));
                                }
                                                            
                                allExhibitorListPanel.refresh();
                                                        
                                 me.updateLayoutExhibitorList();
                                 allExhibitorListPanel.deselectAll();
                                 allExhibitorListPanel.setMasked(false);
                                 allExhibitorListPanel=null;
                                 allExhibitorStoreMain=null;
                                                            
                           }, me);
                            task.delay(delayTime);
                        }
                        else
                        {
                             //// Clear the existing Records
                             allExhibitorStoreFiltered.removeAll();
                             allExhibitorStoreFiltered.sync();

                             allExhibitorListPanel.setStore(allExhibitorStoreFiltered);
                             allExhibitorListPanel.refresh();
                             allExhibitorListPanel.deselectAll();
                             allExhibitorListPanel.setMasked(false);
                             allExhibitorListPanel=null;
                             allExhibitorStoreMain=null;
                        }
                }
            else
            {
                //// Clear the existing Records
                allExhibitorStoreFiltered.removeAll();
                allExhibitorStoreFiltered.sync();
           
                allExhibitorListPanel.setStore(allExhibitorStoreFiltered);
                allExhibitorListPanel.refresh();
                allExhibitorListPanel.setMasked(false);
                allExhibitorListPanel=null;
                allExhibitorStoreMain=null;
            }
        }
    },
           
    clearLocalStore:function()
    {
           this.setAllExhibitorStore(null);
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
           
           if (bottom === y && isScrollDown) {
                var endIndex = parseInt(me.getStartIndex()) + parseInt(me.getItemsPerPage());
                if(endIndex>me.getTotalExhibitor())
                {
                    endIndex=me.getTotalExhibitor();
                }
                if (endIndex < me.getTotalExhibitor()) {
                    me.setStartIndex(parseInt(me.getStartIndex()) + parseInt(me.getItemsPerPage()));
                    me.onScrollEndAllExhibitor();
           
                }
           }
           else if (top === y && !isScrollDown) {
                if (me.getStartIndex() >= parseInt(me.getItemsPerPage())) {
                    me.setStartIndex(parseInt(me.getStartIndex()) - parseInt(me.getItemsPerPage()));
                    me.onScrollEndAllExhibitor();
                }
           }
    },
    onNnListScrollStart : function(scroller, x, y) {
           var me = this;
           me.setStartPoint(y);
    }
           
    /* End Performance Enhancements */

});
