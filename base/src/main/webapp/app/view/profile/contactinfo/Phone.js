Ext.define('Personify.view.profile.contactinfo.Phone', {
    extend: 'Ext.Container',
    alias: 'widget.phone',
    xtype: 'phone',
    controller: 'Personify.controller.profile.Phone',
    requires: [
        'Personify.controller.profile.Phone',
        'Personify.view.profile.contactinfo.EditFormTemplate',
        'Personify.store.jsonp.profile.PhoneNumbers'
    ],
    config: {
        comunicationlist: null,
        countryListStore: null,
        layout: 'hbox',
        cls: 'contact-info-item--main-container',
        items: [
            {
                flex: 1,
                xtype: 'container',
                cls: 'contact-info-item--right-panel-container',
                items: [
                    {
                        layout: 'hbox',
                        cls: 'contact-info-item--left-panel-container',
                        items: [
                            {
                                cls: 'lblContactInfo',
                                html: 'Phone Numbers'
                            },
                            {
                                xtype: 'button',
                                itemId: 'editPhoneButton',
                                baseCls: 'btnEdit',
                                hidden: true
                            }
                        ]
                    },
                    {
                        itemId: 'infoContainer'
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    },

    updateEditmode: function(newValue, oldValue) {
        if(oldValue == true || oldValue == false)
            this.getController().setEditing(newValue);
    },

    updateStore: function(newStore) {
        this.getController().setStore(newStore);
    }
});
