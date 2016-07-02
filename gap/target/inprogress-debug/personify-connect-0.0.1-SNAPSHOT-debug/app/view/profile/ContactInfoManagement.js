Ext.define('Personify.view.profile.ContactInfoManagement', {
    extend: 'Ext.Panel',
    xtype: 'contactinfomanagement',
    controller: 'Personify.controller.profile.ContactInfoManagement',
    
    requires: [
        'Personify.controller.profile.ContactInfoManagement',
        'Personify.view.profile.contactinfo.EditToolBox',
        'Personify.view.profile.ContactInfo'
    ],
    config: {
        flex: 1,
        countryListStore: null,
        staffList: null,
        callTopicList: null,
        callSubjectList: {},
        callTypeList: null,
        canedit: true,
        editmode: false,
        scrollable: null,
        viewmode: 'myProfie',
        enableEditToolBox: true,
        layout: 'vbox',
        items: [
            {
                xtype: 'edittoolbox',
                itemId: 'editToolBox',
                height: 54
            },
            {
                flex: 7,
                scrollable: true,
                xtype: 'contactinfo',
                layout: 'vbox',
                itemId: 'contactinfo'
            }
        ]
    },

    applyCanedit: function(newValue) {
        this.getController().setCanedit(newValue);
        
    },

    applyRecord: function(record) {
        if (record) {
            this.getController().setRecord(record);
        }
    },
    
    applyEditmode: function(newValue) {
        this.getController().setEditmode(newValue);
    },
    
    updateEnableEditToolBox: function(newValue) {
        this.getController().updateEnableEditToolBox(newValue);
    },

    applyViewmode: function(newValue) {
    }
});
