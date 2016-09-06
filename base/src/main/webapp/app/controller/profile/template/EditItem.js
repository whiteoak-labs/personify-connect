Ext.define('Personify.controller.profile.template.EditItem', {
    extend: 'Personify.base.Controller',
    
    control: {
        typeList: {
            change: 'onTypeListChange'
        }
    },
    
    setTypeList: function(listType) {
        Ext.Array.sort(listType);
        var modelList= new Array();
        for( var i=0; i<listType.length; i++) {
           //modelList.push({text: listType[i], value: listType[i]});
           var listItem = listType[i];
           if(listType[i].indexOf(':') >-1)
           {
                modelList.push({value: listType[i].split(':')[0], text: listType[i].split(':')[1]});
           }
           else
           {
                modelList.push({text: listType[i], value: listType[i]});
           }
        }
        this.getTypeList().setOptions(modelList);
    },

    removeTypeList: function(typeListToRemove, originalTypeList) {
        var typeList = Ext.Array.difference(originalTypeList, typeListToRemove);
        //typeList.push(this.getTypeList().getValue());
        typeList.push(this.getTypeList().getValue()+':'+ Personify.utils.ItemUtil.getDesc(originalTypeList,this.getTypeList().getValue()));
        this.setTypeList(typeList);
    },
    
    onTypeListChange: function(field, newValue, oldValue, eOpts) {
        var view = this.getView();
        if(view.getParent() && newValue &&  newValue != oldValue) {
            this.getView().getParent().fireEvent("typelistchange", view, newValue, oldValue); 
        }
    },
    
    onTapDeleteButton: function() {
        var view = this.getView();
        var record = view.getRecord();
        
        if(record == null) {
            Ext.Msg.alert('', "Please select one item to delete.");
        } else {
            Ext.Msg.confirm("Confirmation", "Are you sure you want to delete?", processResult);
            
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if(clickedButton == 'yes'){
                    view.getParent().fireEvent("deleteCommand", record, view);
                }
            };
        }
    },
    
    onValueTextBoxChange: function(thisItem, newValue, oldValue, eOpts) {
//        if(newValue === "") {
//            Ext.Msg.alert('', "Value cannot be blank.");
//            thisItem.setValue(oldValue);
//        }
    },
    
    setRecord: function(record) {
        
    },
    
    validateData: function() {
        
    },
    
    syncRecordWithView: function() {
        
    }
})