Ext.define('Personify.controller.phone.directory.contactinfo.ContactInfo', {
    extend: 'Personify.controller.profile.ContactInfo',

    control: {
        infoPanelsContainer: true
    },

    requires: [
        'Personify.view.phone.directory.contactinfo.PhotoAndRelated',
        'Personify.view.phone.directory.contactinfo.Phone',
        'Personify.view.phone.directory.contactinfo.Email',
        'Personify.view.phone.directory.contactinfo.Address',
        'Personify.view.phone.directory.contactinfo.Website',
        'Personify.view.phone.directory.contactinfo.Session',
        'Personify.view.phone.directory.contactinfo.Bio'
    ],

    config: {
        mapping: {
            'photoAndRelated' : 'Personify.view.phone.directory.contactinfo.PhotoAndRelated',
            'phone' : 'Personify.view.phone.directory.contactinfo.Phone',
            'email' : 'Personify.view.phone.directory.contactinfo.Email',
            'address' : 'Personify.view.phone.directory.contactinfo.Address',
            'website': 'Personify.view.phone.directory.contactinfo.Website',
            'bio' : 'Personify.view.phone.directory.contactinfo.Bio',
            'session' : 'Personify.view.phone.directory.contactinfo.Session'
        },
        isEditing: false
    },

    setRecord: function(record) {
        if(record) {
            var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
            if((listInfoPanels != null) && (listInfoPanels.length != 0)) {
                for(var i = 0; i < listInfoPanels.length; i++) {
                    listInfoPanels[i].setRecord(record);
                }
            }
        }
    },

    showListInfo: function(listInfo) {
        var me = this;

        if(me.getView() && listInfo && listInfo.length != 0) {
            var mapping = me.getMapping(),
                infoContainer = me.getInfoPanelsContainer();
            infoContainer.removeAll(true, true);

            for(var j = 0; j < listInfo.length; j++) {
                var view = mapping[listInfo[j]];
                if (view) {
                    infoContainer.add(Ext.create(view, {
                        controllerConfig: {
                            isEditing: me.getIsEditing(),
                            countryListStore: me.getCountryListStore()
                        }
                    }));
                }
            }

            infoContainer.setHidden(false);
        }
    },

    setEditmode: function(value) {
        this.setIsEditing(value);
        if(value == true) {
            var listInfoPanels = this.getInfoPanelsContainer().getItems().items;
            if((listInfoPanels != null) && (listInfoPanels.length != 0)) {
                for (var i = 0; i < listInfoPanels.length; i++) {
                    listInfoPanels[i].getController().updateEditMode(value, this.getCountryListStore());
                }
            }
        }
    },

    updateContactInfoTitleClass: function(className) {
        var infoPanelsContainer = this.getInfoPanelsContainer();
        var items = infoPanelsContainer.getItems().items;
        for(var i = 0; i < items.length; i++) {
            if(items[i].xtype == 'emailphone' || items[i].xtype == 'websitephone') {
                items[i].getController().updateTitleClass(className);
            }
        }
    }
})