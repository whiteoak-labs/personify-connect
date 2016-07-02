Ext.define('Personify.controller.phone.directory.contactinfo.Website', {
    extend: 'Personify.controller.profile.Website',

    requires: [
        'Personify.view.phone.directory.contactinfo.WebsiteList',
        'Personify.view.phone.directory.contactinfo.WebsiteEditForm'
    ],

    config: {
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong website format:',
        blankErrorMessage: '- Website field cannot be empty'
    },

    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            textboxchange: 'onTextboxChange',
            deleteCommand: 'onDeleteCommand'
        },
        websitesTitle: true
    },

    setRecord: function(record) {
        if(record) {
            if (this.getIsEditing()) {
                this.updateEditMode(true);
                return;
            }

            if(record.EntryProfile.getAt(0).UrlsProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                var websiteList = Ext.create('Personify.view.phone.directory.contactinfo.WebsiteList', {
                    scrollable: null,
                    disableSelection: true
                });
                websiteList.setStore(record.EntryProfile.getAt(0).UrlsProfile);
                this.getInfoContainer().add(websiteList);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
        }
    },

    updateEditMode: function(value) {
        this.getView().setHidden(false);

        me = this;
        this.getInfoContainer().removeAll(true, true);
        
        if(value == true) {
            var typeListToRemove = new Array();
            //var recordCopy = this.getView().getRecord().copy();
            var recordCopy = this.getView().getRecord();
            
            //Get the type list and store to global paramemeter
            this.setTypeList(recordCopy.get('urlLocationList').split(','));
            
            //create list of edit form and add to edit panel
            var storeWebsiteList = recordCopy.EntryProfile.getAt(0).UrlsProfile;
            storeWebsiteList.each(function(record) {
                var websiteEditForm = Ext.create('Personify.view.phone.directory.contactinfo.WebsiteEditForm');
                websiteEditForm.getController().setTypeList(me.getTypeList());
                websiteEditForm.setRecord(record);
                me.getInfoContainer().add(websiteEditForm);
                
                typeListToRemove.push(record.get('type'));
            });
            this.setTypeListToRemove(typeListToRemove);
            
            this.addEmptyItem();
            this.updateTypeListForAllEditItems();
            
        }
        else {
            this.setRecord(this.getView().getRecord());
        }
    },
    
    addEmptyItem: function(){
        var typeListForNewItem = this.checkTypeList();
        
        if(typeListForNewItem.length == 0) {
            this.setCanAddMoreFlag(false);
            return;
        } else {
            this.setCanAddMoreFlag(true);
        }
        
        var editPanel = this.getInfoContainer();
        var typeListForNewItem = Ext.Array.difference(this.getTypeList(), this.getTypeListToRemove());
        
        var itemViewEmpty = Ext.create('Personify.view.phone.directory.contactinfo.WebsiteEditForm');
        itemViewEmpty.getController().setTypeList(typeListForNewItem);
        
        this.getTypeListToRemove().push(typeListForNewItem[0]);
        editPanel.add(itemViewEmpty);
    },
    
    updateTitleClass: function(newClass){
        this.getWebsitesTitle().setCls(newClass);
    }
});