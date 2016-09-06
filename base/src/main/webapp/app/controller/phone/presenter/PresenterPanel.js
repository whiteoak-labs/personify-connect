Ext.define('Personify.controller.phone.presenter.PresenterPanel',{
    extend: 'Personify.base.Controller',
    requires: 'Personify.view.phone.directory.ContactInfoManagement',
    config:
    {
        itemsPerPage: 10,
        totalPresenters: 0,
        startIndex:0,
        searchTerm:'',
        presenterStore:null
    },

    control: {
        ptoolbarPresentersPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        presenterlistpanelphone: {
            selectpresentersitem: 'onSelectPresenter',
           onScrollEndPresenter: 'onScrollEndPresenter',
           loadpresenters:'loadPresenters'
        },
        presenterTitleBar: true
    },

    init: function() {
           
           
        this.getPtoolbarPresentersPhone().getController().setHiddenActionButton(true);
        var record = this.getView().getRecord();
        var title = '';

        if (record.get('shortName')) {
           title = record.get('shortName');
        } else {
            if (record.get('title')) {
                title = record.get('title');
            }
        }
           
        ///// Set Item Per Page
        var itemperpage=Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPagePresentersList');
        this.setItemsPerPage(itemperpage);
        this.setPresenterStore(null);
           
        this.getPresenterTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
        this.setRecord(record);
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    },

    setRecord: function(record) {
           var me=this;
           me.setSearchTerm('');
           
        if(record.SpeakersListEvent){
           
           ///console.log('record.SpeakersListEvent : ' + record.SpeakersListEvent.getCount());
           
           record.SpeakersListEvent.setSorters({
                      sorterFn: function(record1, record2) {
                      var firstName1 = record1.get('lastName')? record1.get('lastName'): record1.get('name');
                      var firstName2 = record2.get('lastName')? record2.get('lastName'): record2.get('name');
                      var fName1 = firstName1;
                      var fName2 = firstName2;
                      return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
                      }
                                               });
           record.SpeakersListEvent.setRemoteFilter(false);
           record.SpeakersListEvent.clearFilter();
           
           me.setPresenterStore(record.SpeakersListEvent);
           
           this.loadPresenters('',true);
           
        } else if(record.SpeakerSession){
           ///console.log('record.SpeakerSession : ' + record.SpeakerSession.getCount());
           
           record.SpeakerSession.setSorters({
                                               sorterFn: function(record1, record2) {
                                               var firstName1 = record1.get('lastName')? record1.get('lastName'): record1.get('name');
                                               var firstName2 = record2.get('lastName')? record2.get('lastName'): record2.get('name');
                                               var fName1 = firstName1;
                                               var fName2 = firstName2;
                                               return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
                                               }
                                               });
           record.SpeakerSession.setRemoteFilter(false);
           record.SpeakerSession.clearFilter();

           me.setPresenterStore(record.SpeakerSession);
           
           this.loadPresenters('',true);
        }
        
    },

    onSelectPresenter: function(record) {
        var me = this;
        if(record) {
            var storeManager = Personify.utils.ServiceManager.getStoreManager(),
                storeName = storeManager.getCustomerBiographyStore(),
                store = Ext.create(storeName);
            store.setDataRequest(record);
            me.getView().setMasked({xtype:'loadmask'});
            store.load({
                callback: function(records, operation, success) {
                    var bioRecord = null;
                    if(records.length > 0) {
                        bioRecord = records[0];
                    }

                    me.getView().fireEvent('requestopendetail','Personify.view.phone.directory.ContactInfoManagement', {
                        record: me.getView().config.record,
                        listOfInfo: Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoPresenter'),
                        bio: bioRecord,
                        presenterRecord: record
                    });
                    me.getView().setMasked(false);
                },
                scope: me
            });
        }
    },
           
    /* Performance Enhancement */
           
    onScrollEndPresenter:function()
    {
           this.loadPresenters(this.getSearchTerm(),false);
    },
    
    loadPresenters:function(searchText,resetStartIndex)
    {
           
          var me=this;
           
           var presenterStoreMain=me.getPresenterStore();
           
           if(presenterStoreMain)
           {
           
                var presenterlistpanelphone = this.getPresenterlistpanelphone();
           
                presenterlistpanelphone.setMasked({xtype:'loadmask'});
         
                presenterStoreMain.setRemoteFilter(false);
                presenterStoreMain.clearFilter();
           
                var presenterStoreFiltered = presenterlistpanelphone.getController().getStore();
           
                if(resetStartIndex)
                {
                    me.setStartIndex(0);
                }
           
          
                me.setSearchTerm(searchText);
           
                if(presenterStoreFiltered==null)
                {
                    var modelManger = Personify.utils.ServiceManager.getModelManager();
                    presenterStoreFiltered = Ext.create('Ext.data.Store', {
                                               model: modelManger.getEventSpeakerModel()
                                               });
                }
                else if(resetStartIndex)
                {
                        //// Clear the existing data
                        ///record.MeetingRegistrantStore.data.clear();
                        presenterStoreFiltered.removeAll();
                        presenterStoreFiltered.sync();
                }
           
                if(presenterStoreMain.getCount()>0)
                {
                    if(searchText.trim() != '') {
                        presenterStoreMain.filter(function(record) {
                                 didMatch = (record.get('name').trim().toLowerCase() + " "
                                             + record.get('jobTitle').trim().toLowerCase() + " "
                                             ).match(searchText.trim().toLowerCase());
                                 
                                 if(didMatch)
                                 return record;
                                 });
           
                    }
                    var presenterStoreMainCount=presenterStoreMain.getCount();
           
                    if(me.getStartIndex()<presenterStoreMainCount)
                    {
                        var task = new Ext.util.DelayedTask(function()
                        {
           
                                var lastIndex=parseInt(me.getStartIndex())+parseInt(me.getItemsPerPage());
                                if(lastIndex>presenterStoreMainCount)
                                {
                                    lastIndex=presenterStoreMainCount;
                                }
           
                                /*for(var iCounter=me.getStartIndex();iCounter<lastIndex;iCounter++)
                                 {
                                    presenterStoreFiltered.add(presenterStoreMain.getAt(iCounter));
                                  }*/
           
           
                                    presenterStoreFiltered.add(presenterStoreMain.getRange(me.getStartIndex(),(lastIndex-1)));
           
                                    me.setStartIndex(lastIndex);
           
                                    presenterStoreFiltered.sync();
                                    presenterStoreFiltered.resumeEvents(true);
           
                                    presenterlistpanelphone.getController().setStore(presenterStoreFiltered);
                                    presenterlistpanelphone.getController().refresh();
                                    presenterlistpanelphone.setMasked(false);
                                    presenterlistpanelphone=null;
                           }, me);
                           task.delay(100);
           
                     }
                     else
                     {
                        presenterlistpanelphone.setMasked(false);
                        presenterlistpanelphone=null;
                     }
                }
                else
                {
                    presenterlistpanelphone.setMasked(false);
                    presenterlistpanelphone=null;
                }
           
           }
        }
    
    /* End Performance Enhancement */
});
