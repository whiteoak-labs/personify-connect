Ext.define('Personify.controller.presenter.PresenterPanel',{
    extend: 'Personify.base.Controller',
    config: {
           params: null,
           totalPresenterResult: 0
    },
    control: {
        presenterListPanel: {
            selectpresentersitem: 'onSelectPresenter',
           nextbuttontap: 'onNextButtonTap',
           searchkeyup: 'onSearchKeyUp',
           searchclearicontap: 'onSearchClearIconTap'
        },
        presenterProfile: {
           closeinfopanel: 'onClosePresenterDetailsButton'
        }
    },

    init: function() {
        var me = this;
        me.getView().getRecord().SpeakersListEvent.setSorters({
            sorterFn: function(record1, record2) {
                var firstName1 = record1.get('lastName')? record1.get('lastName'): record1.get('name');
                var firstName2 = record2.get('lastName')? record2.get('lastName'): record2.get('name');
                var fName1 = firstName1;
                var fName2 = firstName2;
                return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
            }
        });
        me.showListPresenter();
    },

    showListPresenter: function() {
        //var presenterListPanel = this.getPresenterListPanel();
        //var record = this.getView().getRecord();
        //presenterListPanel.setRecord(record);
        var me = this;
        Ext.callback(function() {
                        
            var itemsPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPagePresentersList');
            var searchTerm = '';
                        
            var attributes = {
                SearchTerm: searchTerm,
                StartIndex: 0
            };
            me.setParams(attributes);
            me.loadPresenterModel();
        }, me, [], 1);
    },
    loadPresenterModel: function() {
        var me = this,
        presenterListPanel = me.getPresenterListPanel(),
        record = me.getView().getRecord();
        presenterListPanel.setMasked({xtype:'loadmask'});
           var task = new Ext.util.DelayedTask(function() {
        
        var storePresenter = record.SpeakersListEvent;
        if(storePresenter) {
            storePresenter.clearFilter();
            if(me.getParams()['SearchTerm'].trim() != '')
            {
           
                storePresenter.setRemoteFilter(false);
                storePresenter.filter(function(record) {
                    didMatch = (record.get('name').trim().toLowerCase() + " "
                        + record.get('jobTitle').trim().toLowerCase() + " "
                        ).match(me.getParams()['SearchTerm'].trim().toLowerCase());
                                 
                    if(didMatch)
                        return record;
                });
            }
            if (storePresenter) {
                me.setTotalPresenterResult(storePresenter.getCount());
                var endIndex = me.getParams()['StartIndex'] + Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPagePresentersList');
                var currentStore = presenterListPanel.getController().getPresenterList().getStore();
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
                    var modelManger = Personify.utils.ServiceManager.getModelManager();
                    currentStore = Ext.create('Ext.data.Store', {
                        model: modelManger.getEventSpeakerModel()
                    });
                }
                currentStore.suspendEvents();
                for (var i = me.getParams()['StartIndex']; i < endIndex; i++) {
                    if (storePresenter.getAt(i) != null) {
                        currentStore.add(storePresenter.getAt(i));
                    }
                }
                currentStore.sync();
                currentStore.resumeEvents(true);
                presenterListPanel.getController().setStore(currentStore);
                presenterListPanel.getController().refresh();
            }
        }
        else{
            var modelManger = Personify.utils.ServiceManager.getModelManager();
            var currentStore = Ext.create('Ext.data.Store', {
                model: modelManger.getEventSpeakerModel()
            });
            presenterListPanel.getController().setStore(currentStore);
            presenterListPanel.getController().refresh();
        }
        presenterListPanel.setMasked(false);
        }, me);
        task.delay(500);
    },

    onSelectPresenter: function(record) {
        if(record) {
            var presenterDetailsPanel = this.getPresenterProfile();
            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var storeName = storeManager.getCustomerBiographyStore();
            var store = Ext.create(storeName);
            store.setDataRequest(record);
            this.getView().setMasked({xtype:'loadmask'});
            var me = this;
            store.load({
                callback: function(records, operation, success) {
                    //if (success) {
                        presenterDetailsPanel.setListOfInfo(Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('listinfoPresenter'));
                        presenterDetailsPanel.getController().getCloseContactPanel().show();

                        if (records.length > 0) {
                            presenterDetailsPanel.getController().setBioInfo(records[0]);
                        } else {
                            presenterDetailsPanel.getController().setBioInfo(null);
                        }

                        presenterDetailsPanel.getController().setPresenterRecord(record);
                        me.getView().setActiveItem(1);
                    //} else {
                    //    Ext.Msg.alert('', 'This presenter has no information.', Ext.emptyFn);
                    //}
                    me.getView().setMasked(false);
                },
                scope: this
            });
           
           Personify.utils.BackHandler.pushActionAndTarget('onClosePresenterDetailsButton', this);
        }
    },

    onClosePresenterDetailsButton: function() {
        this.getView().setActiveItem(0);
        Ext.Viewport.setMasked(false);
       Personify.utils.BackHandler.popActionAndTarget('onClosePresenterDetailsButton', this);
    },
    onNextButtonTap: function(record) {
        var me = this;
        var PresenterStore = me.getPresenterListPanel().getController().getPresenterList().getStore();
        var currentPresenterItem = 0;
        if (PresenterStore) {
           currentPresenterItem = PresenterStore.getCount();
        }
           
        if (currentPresenterItem < me.getTotalPresenterResult()) {
           me.getParams()['StartIndex'] = me.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPagePresentersList'));
           me.loadPresenterModel();
        }
    },
    onSearchKeyUp: function(newText) {
        var me = this,
        presenterlistpanel = me.getPresenterListPanel();
           
        if(navigator.onLine && window.plugins.app47) {
           window.plugins.app47.sendGenericEvent('Presenter Search');
        }
           
        me.getParams()['SearchTerm'] = newText;
        me.getParams()['StartIndex'] = 0;
        presenterlistpanel.getController().getPresenterList().getStore().removeAll();
        me.loadPresenterModel();
        //presenterlistpanel.getController().getBtnClearFilter().setDisabled(false);
    },
    onSearchClearIconTap : function() {
        var me = this,
        presenterlistpanel = me.getPresenterListPanel();
        me.getParams()['SearchTerm'] = '';
        me.getParams()['StartIndex'] = 0;
        presenterlistpanel.getController().getPresenterList().getStore().removeAll();
        me.loadPresenterModel();
        //presenterlistpanel.getController().getBtnClearFilter().setDisabled(true);
        presenterlistpanel.getController().getSearchFieldPresenter().getController().clearSearchField();
        presenterlistpanel.getController().getPresenterList().deselectAll();
    }
});
