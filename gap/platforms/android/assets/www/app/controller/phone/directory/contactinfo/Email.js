Ext.define('Personify.controller.phone.directory.contactinfo.Email', {
    extend: 'Personify.controller.profile.Email',

    requires: [
        'Personify.view.phone.directory.contactinfo.EmailList',
        'Personify.view.phone.directory.contactinfo.EmailEditForm'
    ],

    config: {
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '\n- Wrong email format:',
        blankErrorMessage: '- Email field cannot be empty'
    },

    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            textboxchange: 'onTextboxChange',
            deleteCommand: 'onDeleteCommand'
        }, 
        emailTitle: true
    },

    setRecord: function(record) {
        if(record) {
            if (this.getIsEditing()) {
                this.updateEditMode(true);
                return;
            }

            if(record.EntryProfile.getAt(0).EmailsProfile.getCount() > 0) {
                this.getInfoContainer().removeAll(true, true);
                var emailList = Ext.create('Personify.view.phone.directory.contactinfo.EmailList', {
                    scrollable: null,
                    disableSelection: true
                });
                emailList.setStore(record.EntryProfile.getAt(0).EmailsProfile);
                this.getInfoContainer().add(emailList);
                this.getView().setHidden(false);
            } else {
                this.getView().setHidden(true);
            }
        }
    },

    updateEditMode: function(value) {
    	var me = this;
        me.getView().setHidden(false);
        me.getInfoContainer().removeAll(true, true);

        if(value == true) {
            var typeListToRemove = new Array(),
            	recordCopy = me.getView().getRecord(),
            	storeEmailList = recordCopy.EntryProfile.getAt(0).EmailsProfile;
            me.setTypeList(recordCopy.get('emailLocationList').split(','));
            storeEmailList.each(function(record) {
                var emailEditForm = Ext.create('Personify.view.phone.directory.contactinfo.EmailEditForm');
                emailEditForm.getController().setTypeList(me.getTypeList());
                emailEditForm.setRecord(record);
                me.getInfoContainer().add(emailEditForm);
                typeListToRemove.push(record.get('type'));
            });
            me.setTypeListToRemove(typeListToRemove);
            me.addEmptyItem();
            me.updateTypeListForAllEditItems();
        } else {
            me.setRecord(me.getView().getRecord());
        }
    },

    addEmptyItem: function() {
        var typeListForNewItem = this.checkTypeList();
        
        if(typeListForNewItem.length == 0) {
            this.setCanAddMoreFlag(false);
            return;
        } else {
            this.setCanAddMoreFlag(true);
        }
        
        var editPanel = this.getInfoContainer();
        var typeListForNewItem = Ext.Array.difference(this.getTypeList(), this.getTypeListToRemove());
        
        var itemViewEmpty = Ext.create('Personify.view.phone.directory.contactinfo.EmailEditForm');
        itemViewEmpty.getController().setTypeList(typeListForNewItem);
        
        this.getTypeListToRemove().push(typeListForNewItem[0]);
        editPanel.add(itemViewEmpty);
    },

    updateTitleClass: function(newClass) {
        this.getEmailTitle().setCls(newClass);
    }
});