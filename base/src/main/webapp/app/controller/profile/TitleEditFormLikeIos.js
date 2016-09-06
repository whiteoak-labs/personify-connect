Ext.define('Personify.controller.profile.TitleEditFormLikeIos', {
    extend: 'Personify.base.Controller',
    
    control: {
        titleFieldSet: {
            
        }
    },
    
    config: {
        editFields: null,
        currentRecord: null
    },
    
    saveData: function() {
        var record = this.getView().getRecord();
        if(record) {
            record.set('jobTitle', this.getTitleTextField().getValue());
        }
        
    },
    
    setListOfInfo: function(listInfo) {
        if (this.getView() && listInfo && listInfo.length != 0) {
            var me = this;
            this.setEditFields(listInfo);
            
            listInfo.each(function(record) {
                if (record.get('enabled') == true) {
                    var field = null;
                    
                    if (record.get('type') == 'text') {
                        field = {
                            xtype: 'textfield',
                            name: record.get('fieldName'),
                            label: record.get('description'),
                            labelWidth: '40%',
                            required: record.get('required'),
                            cls: 'nameAndTitleEditText'
                        };
                    }
                    me.getTitleFieldSet().add(field);
                }
            });
            
            if (this.getCurrentRecord()) {
                this.getView().setValues(this.getCurrentRecord().EntryProfile.getAt(0).getData());
            }
        }
    },
    
    setRecord: function(record) {
        this.setCurrentRecord(record);
        if (record) {
            this.getView().setValues(record.EntryProfile.getAt(0).getData());
        }
    },
    
    validateData: function() {
        return "";
    },
    
    updateParams: function(params) {
        var originalEntry = this.getCurrentRecord().EntryProfile.getAt(0).getData();
        var titleObject = this.getView().getValues();
        var titleRequest = {};

        var editFields = this.getTitleFieldSet().getItems().items;
        for (var i = 0; i < editFields.length; i++) {
            editFields[i].blur();
        }
        
        this.getEditFields().each(function(field) {
            if (field.get('enabled') == true) {
                titleRequest[field.get('requestName')] = titleObject[field.get('fieldName')];
            } else {
                titleRequest[field.get('requestName')] = originalEntry[field.get('fieldName')];
            }
        });
        
        Ext.apply(params, titleRequest);
    }
});
