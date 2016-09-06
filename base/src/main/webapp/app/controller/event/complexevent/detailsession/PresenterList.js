Ext.define('Personify.controller.event.complexevent.detailsession.PresenterList',{
    extend: 'Personify.base.Controller',
    config: {
        startIndex: 0,
        totalPresenterResult: 0
    },
    control: {
        listSessionPresenter: {
            itemtap: 'onPresenterItemTap',
           scrollend: 'onNextButtonTap'
        }
    },

    init: function(){
        //var record = this.getView().getRecord();
        //this.setRecord(record);
        var me = this;
           if(me.getView().getRecord().SpeakerSession)
           {
        me.getView().getRecord().SpeakerSession.setSorters({
            sorterFn: function(record1, record2) {
                var firstName1 = record1.get('name');
                var firstName2 = record2.get('name');
                var fName1 = firstName1;
                var fName2 = firstName2;
                return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
            }
        });
           }
        me.showListPresenter();
    },
    showListPresenter: function() {
        var me = this;
        Ext.callback(function() {
            me.setStartIndex(0);
            me.loadPresenterModel();
        }, me, [], 1);
    },
    loadPresenterModel: function() {
        var me = this,
        presenterListPanel = me.getListSessionPresenter(),
        record = me.getView().getRecord();
        presenterListPanel.setMasked({xtype:'loadmask'});
        var task = new Ext.util.DelayedTask(function() {
        
        var storePresenter = record.SpeakerSession;
                                               
        if (storePresenter) {
            storePresenter.clearFilter();
            me.setTotalPresenterResult(storePresenter.getCount());
            var endIndex = me.getStartIndex() + Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPagePresentersList');
            var currentStore = presenterListPanel.getStore();
                                            
            if (!currentStore) {
                var modelManger = Personify.utils.ServiceManager.getModelManager();
                currentStore = Ext.create('Ext.data.Store', {
                    model: modelManger.getEventSpeakerModel()
                });
            }
            currentStore.suspendEvents();
            for (var i = me.getStartIndex(); i < endIndex; i++) {
                if (storePresenter.getAt(i) != null) {
                    currentStore.add(storePresenter.getAt(i));
                }
                
            }
            //if(currentStore.getCount()>0)
            //{
                currentStore.setGrouper({
                    groupFn: function(record) {
                        return record.get('name')[0];
                    }
                });
                currentStore.setSorters({
                    sorterFn: function(record1, record2) {
                        var firstName1 = record1.get('name');
                        var firstName2 = record2.get('name');
                        var fName1 = firstName1[0];
                        var fName2 = firstName2[0];
                        return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
                    }
                });
                currentStore.setRemoteFilter(false);
                currentStore.clearFilter();
            //}
            currentStore.sync();
            currentStore.resumeEvents(true);
            me.getListSessionPresenter().setStore(currentStore);
            me.getListSessionPresenter().refresh();
        }
        else{                    
            var modelManger = Personify.utils.ServiceManager.getModelManager();
            var currentStore = Ext.create('Ext.data.Store', {
                model: modelManger.getEventSpeakerModel()
            });
            me.getListSessionPresenter().setStore(currentStore);
            me.getListSessionPresenter().refresh();
        }
        presenterListPanel.setMasked(false);
        }, me);
        task.delay(500);
    },
           
           
    setRecord: function(record){
        if (record) {
            if (record.SpeakerSession) {
                var store = record.SpeakerSession;

                store.setGrouper({
                    groupFn: function(record) {
                        return record.get('name')[0];
                    }
                });
                store.setSorters({
                    sorterFn: function(record1, record2) {
                        var firstName1 = record1.get('name');
                        var firstName2 = record2.get('name');
                        var fName1 = firstName1[0];
                        var fName2 = firstName2[0];
                        return fName1 > fName2 ? 1 : (fName1 == fName2 ? 0 : -1);
                    }
                });
                store.setRemoteFilter(false);
                store.clearFilter();
                this.getListSessionPresenter().setStore(store);
            }
        }
    },
    
    onPresenterItemTap: function(arg1, arg2, arg3, record) {
        if(record) {
            this.getView().fireEvent('showPresenterDetails', record);
        }
    },
    onNextButtonTap: function (dataView, index, target, record, event, eOpts) {
        var me = this;
        var PresenterStore = me.getListSessionPresenter().getStore();
        var currentPresenterItem = 0;
        if (PresenterStore) {
           currentPresenterItem = PresenterStore.getCount();
        }
           
        if (currentPresenterItem < me.getTotalPresenterResult()) {
           me.setStartIndex(me.getStartIndex()+(Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPagePresentersList')));
           me.loadPresenterModel();
        }
    }
});