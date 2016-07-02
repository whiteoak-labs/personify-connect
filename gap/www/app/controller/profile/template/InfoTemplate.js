Ext.define('Personify.controller.profile.template.InfoTemplate', {
    extend: 'Personify.controller.profile.template.InfoInterface',
    
    control: {
        infoContainer: {
            typelistchange: 'onTypeListChange',
            textboxchange: 'onTextboxChange',
            deleteCommand: 'onDeleteCommand'
        }
    },
    
    config: {
        typeList: null,
        typeListToRemove: null,
        recordsForDelete: new Array(),
        errorMessage: '',
        blankErrorMessage: '',
        canAddMoreFlag: null,
        isEditing: false
    },
    
    reset: function() {
        this.setTypeList(null);
        this.setTypeListToRemove(null);
        this.setRecordsForDelete(new Array());
    },
    
    onTypeListChange: function(currentEditItem, newType, oldType) {
        Ext.Array.remove(this.getTypeListToRemove(), oldType);
        this.getTypeListToRemove().push(newType);
        this.updateTypeListForAllEditItems();
    },
    
    //remove all the existed type from global list
    updateTypeListForAllEditItems: function() {
        var editItems = this.getInfoContainer().getItems().items;
        for (var i = 0; i < editItems.length; i++) {
            editItems[i].getController().removeTypeList(Ext.Array.clone(this.getTypeListToRemove()), this.getTypeList());
        }
    },
    
    updateEditMode: function(value, countryListStore) {
        this.callParent(arguments);
        this.reset();
    },
    
    setRecord: function(record) {
        
    },
    checkTypeList: function() {
        var typeList = Ext.Array.clone(this.getTypeList());
        var typeListToRemove = this.getTypeListToRemove();
        var tmp = Ext.Array.difference(typeList, typeListToRemove);
        return tmp;
    },
    
    addEmptyItem: function() {
        
    },
    
    onTextboxChange: function(view, record, primaryCheckBox, valueTextBox, typeList) {
        
    },
    
    onDeleteCommand: function(record, ItemToDelete) {
        
    },
    
    validateData: function() {
        var hasBlankValue = false;
        var wrongFormatArray = new Array();
        var validateResult;
        var editItems = this.getInfoContainer().getItems().items;
        for (var i = 0; i < editItems.length-1; i++) {
            validateResult = editItems[i].getController().validateData();
            if(validateResult == 'blank') {
                hasBlankValue = true;
            } else {
                if(validateResult != '') {
                    wrongFormatArray.push(validateResult);
                }
            }
        }
        if(wrongFormatArray.length != 0) {
            Ext.Array.insert(wrongFormatArray, 0, '<div style="text-align: left;">' + this.getErrorMessage() + '</div>');
         }
        
        if(hasBlankValue == true) {
            wrongFormatArray.push('<div style="text-align: left;">' + this.getBlankErrorMessage() + '</div>');
        }
        return wrongFormatArray;
    },
    
    updateAllRecordsForEditItems: function() {
        var editItems = this.getInfoContainer().getItems().items;
        for (var i = 0; i < editItems.length; i++) {
            editItems[i].getController().syncRecordWithView();
        }
    },
    
    updateParams: function(params) {
        
    }
})