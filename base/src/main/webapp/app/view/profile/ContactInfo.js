Ext.define('Personify.view.profile.ContactInfo', {
    extend: 'Ext.Panel',
    xtype: 'contactinfo',
    controller: 'Personify.controller.profile.ContactInfo',

    requires: [
        'Personify.controller.profile.ContactInfo',
        'Personify.view.profile.contactinfo.Phone',
        'Personify.view.profile.contactinfo.Email',
        'Personify.view.profile.contactinfo.Address',
        'Personify.view.profile.contactinfo.Website',
        'Personify.view.profile.contactinfo.Bio',
        'Personify.view.profile.contactinfo.Session',
        'Personify.view.profile.contactinfo.PhotoAndRelated'
    ],

    inject:{
        currentUser: 'currentUser'
    },

    config: {
        countryListStore: null,
        itemId: 'contactInfo',
        oldRecord: null,
        currentUser: null,
        editmode: false,
        store: null,
        listOfInfo: null,
        layout: 'vbox',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [
            {
                xtype: 'panel',
                items: [
                    {
                        xtype: 'button',
                        cls: 'p-close-button',
                        style: 'margin: 10px;',
                        text: 'X',
                        docked: 'right',
                        itemId: 'closeContactPanel',
                        hidden: true
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'panel',
                layout: 'vbox',
                itemId: 'infoPanelsContainer',
                hidden: true,
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                }
            }
        ]
    },

    applyEditmode: function(newValue, oldValue) {
        this.getController().updateEditmode(newValue, oldValue);
    },

    updateRecord: function(record, oldRecord) {
        if(record) {
            this.getController().setRecord(record);
        }
    },

    updateListOfInfo: function(newValue) {
        this.getController().showListInfo(newValue);
    }
});