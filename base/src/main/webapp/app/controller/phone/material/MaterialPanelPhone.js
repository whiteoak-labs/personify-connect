Ext.define('Personify.controller.phone.material.MaterialPanelPhone',{
    extend: 'Personify.base.Controller',
    config:
    {
           totalMaterialResult: 1000,
           startIndex:0
     },

    control: {
        ptoolbarMaterialPanelPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        materialListPhone: {
            itemtap: 'onTapMaterialListPhone'
            ,scrollend: 'onScrollEndMaterial'
        },
        materialTitleBar: true
    },

    init: function() {
        this.getPtoolbarMaterialPanelPhone().getController().setHiddenActionButton(true);
        var record = this.getView().getRecord();

        var title = '';

        if (record.get('shortName')) {
            title = record.get('shortName');
        } else {
            if (record.get('title')) {
                title = record.get('title');
            }
        }
        this.getMaterialTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
        ///this.setRecord(record);
        
        this.setStartIndex(0);
        this.loadMaterials();
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
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
           
           
           
                this.getMaterialListPhone().setStore(record.MaterialStore);
            }
        }
    },

    onTapMaterialListPhone: function(dataview, index, target, record, e, eOpts) {
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }
        var me = this;
        var url = record.get('url');
        var title = record.get('title');
        var fileName = title;
        if (fileName != '') {
            if (e.target.className.indexOf("btn-email-material") != -1) {//focus on email button
                Personify.utils.PhoneGapHelper.downloadFile(fileName, url, function(attach) {
                    if(window.plugins['emailComposer']) {
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
           
    /* Performance related enhancements */
           
    onScrollEndMaterial:function(dataView, index, target, record, event, eOpts) {
           var me = this;
           var materialStore = me.getMaterialListPhone().getStore();
           var currentMaterialItem = 0;
           if (materialStore) {
                currentMaterialItem = materialStore.getCount();
           }
           
           if (currentMaterialItem < me.getTotalMaterialResult()) {
                me.setStartIndex(me.getStartIndex()+(Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageMaterialsList')));
                    me.loadMaterials();
           }
    },
           
loadMaterials: function() {
    var me = this,
    materialListPanel = me.getMaterialListPhone(),
    record = me.getView().getRecord();
    if(record)
    {
        var titleSession = null;
        materialListPanel.setMasked({xtype:'loadmask'});
        var task = new Ext.util.DelayedTask(function()
        {
            var storeMaterial = record.MaterialStore;
            if (storeMaterial)
            {
                 storeMaterial.clearFilter();
                 me.setTotalMaterialResult(storeMaterial.getCount());
                 var endIndex = me.getStartIndex() + Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('itemsPerPageMaterialsList');
                  var currentStore = materialListPanel.getStore();
                  if (!currentStore)
                   {
                       var modelManger = Personify.utils.ServiceManager.getModelManager();
                       currentStore = Ext.create('Ext.data.Store', {
                                                   model: modelManger.getEventMaterialModel()
                                                });
                    }
                    currentStore.suspendEvents();
                    titleSession = record.get('title');
                    if(titleSession)
                        {
                            for (var i = me.getStartIndex(); i < endIndex; i++)
                            {
                              if (storeMaterial.getAt(i) != null)
                              {
                                 materialRecord = storeMaterial.getAt(i);
                                 materialRecord.set('titleParent', 'Session: ' + titleSession);
                                 currentStore.add(materialRecord);
                              }
                             }
                         }
                         else{
                              titleSession = record.get('shortName');
                              for (var i = me.getStartIndex(); i < endIndex; i++)
                              {
                               if (storeMaterial.getAt(i) != null)
                                {
                                    materialRecord = storeMaterial.getAt(i);
                                    materialRecord.set('titleParent', 'Event: ' + titleSession);
                                    currentStore.add(materialRecord);
                                 }
                              }
                         }
                                               
                        currentStore.sync();
                        currentStore.resumeEvents(true);
                        materialListPanel.setStore(currentStore);
                        materialListPanel.refresh();          
           
                    }
                   materialListPanel.setMasked(false);
                   materialListPanel=null;
              }, me);
              task.delay(100);
           }
           
          
        }
           
    /* End Performance related enhancements */
});