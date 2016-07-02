Ext.define('Personify.controller.event.material.MaterialPanel',{
    extend: 'Personify.base.Controller',

    control: {
        listMaterial: {
            itemtap: 'onTapListMaterial'
        }
    },

    init: function() {
        var record = this.getView().getRecord();
        this.setRecord(record);
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
    }
});