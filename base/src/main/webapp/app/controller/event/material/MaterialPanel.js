Ext.define('Personify.controller.event.material.MaterialPanel',{
    extend: 'Personify.base.Controller',
    config: {
        startIndex: 0,
        totalMaterialResult: 0
    },
    control: {
        listMaterial: {
           itemtap: 'onTapListMaterial',
           scrollend: 'onNextButtonTap'
        }
    },

    init: function() {
        //var record = this.getView().getRecord();
        //this.setRecord(record);
        var me = this;
        me.showListMaterial();
    },
    showListMaterial: function() {
        var me = this;
        Ext.callback(function() {
            me.setStartIndex(0);
            me.loadMaterialModel();
        }, me, [], 1);
    },
    loadMaterialModel: function() {
        var me = this,
        materialListPanel = me.getListMaterial(),
        record = me.getView().getRecord();
        if(record)
        {
            var titleSession = null;
            materialListPanel.setMasked({xtype:'loadmask'});
            var task = new Ext.util.DelayedTask(function() {
                var storeMaterial = record.MaterialStore;
                                    
                if (storeMaterial) {
                    storeMaterial.clearFilter();
                    me.setTotalMaterialResult(storeMaterial.getCount());
                    var endIndex = me.getStartIndex() + Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageMaterialsList');
                    var currentStore = materialListPanel.getStore();
                    if (!currentStore) {
                        var modelManger = Personify.utils.ServiceManager.getModelManager();
                        currentStore = Ext.create('Ext.data.Store', {
                            model: modelManger.getEventMaterialModel()
                        });
                    }
                    currentStore.suspendEvents();
                    titleSession = record.get('title');
                    if(titleSession) {
                                            
                        for (var i = me.getStartIndex(); i < endIndex; i++) {
                            if (storeMaterial.getAt(i) != null) {
                                materialRecord = storeMaterial.getAt(i);
                                materialRecord.set('titleParent', 'Session: ' + titleSession);
                                currentStore.add(materialRecord);
                            }
                        }
                    }
                    else{
                        titleSession = record.get('shortName');
                        for (var i = me.getStartIndex(); i < endIndex; i++) {
                            if (storeMaterial.getAt(i) != null) {
                                materialRecord = storeMaterial.getAt(i);
                                materialRecord.set('titleParent', 'Event: ' + titleSession);
                                currentStore.add(materialRecord);
                            }
                        }
                    }
                                               
                    currentStore.sync();
                    currentStore.resumeEvents(true);
                    me.getListMaterial().setStore(currentStore);
                    me.getListMaterial().refresh();
                                               
                }
                else{
                    var modelManger = Personify.utils.ServiceManager.getModelManager();
                    var currentStore = Ext.create('Ext.data.Store', {
                        model: modelManger.getEventMaterialModel()
                    });
                    me.getListMaterial().setStore(currentStore);
                    me.getListMaterial().refresh();
                }
                materialListPanel.setMasked(false);
            }, me);
            task.delay(500);
        }
    },
    setRecord: function(record) {
        if(record) {
            var storeMaterial = record.MaterialStore,
                titleSession = null;
            if(storeMaterial) {
                titleSession = record.get('title');
                if(titleSession) {
                    storeMaterial.each(function(record) {
                        if(record != null) {
                            record.set('titleParent', 'Session: ' + titleSession);
                        }
                    });
                } else {
                    titleSession = record.get('shortName');
                    storeMaterial.each(function(record) {
                        if(record != null) {
                            record.set('titleParent', 'Event: ' + titleSession);
                        }
                    });
                }
                this.getListMaterial().setStore(record.MaterialStore);
            }
        }
    },

    onTapListMaterial: function(dataview, index, target, record, e, eOpts) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var url = record.get('url');
        var title = record.get('title');
        var fileName = title;
        if (fileName != '') {
            if(e.target.className.indexOf("btn-email-material") != -1) {//focus on email button
                Personify.utils.PhoneGapHelper.downloadFile(fileName, url, function(attach) {
                    if (window.plugins['emailComposer']) {
                        window.plugins.emailComposer.showEmailComposer('Download file', url, [attach], null, null);
                    }
                });
            } else if (e.target.className.indexOf("btn-ppt-material")) {//focus on download button
                this.getView().setMasked({xtype: 'loadmask'});
                Personify.utils.PhoneGapHelper.downloadFile(fileName, url, function(attach) {
                    if (attach) {
                        var extendFile = attach.substring(attach.lastIndexOf('.'));
                        ExternalFileUtil.openWith(attach, extendFile);
                    }
                    me.getView().setMasked(false);
                });
            }
        } else {
            Ext.Msg.alert('File download', 'We don\'t have information about file location.', Ext.emptyFn);
        }
    },
    onNextButtonTap: function (dataView, index, target, record, event, eOpts) {
        var me = this;
        var materialStore = me.getListMaterial().getStore();
        var currentMaterialItem = 0;
        if (materialStore) {
           currentMaterialItem = materialStore.getCount();
        }
           
        if (currentMaterialItem < me.getTotalMaterialResult()) {
           me.setStartIndex(me.getStartIndex()+(Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageMaterialsList')));
           me.loadMaterialModel();
        }
    }
});