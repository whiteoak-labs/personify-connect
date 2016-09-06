Ext.define('Personify.controller.profile.NameEditFormLikeIos', {
    extend: 'Personify.base.Controller',
    
    control: {
        nameFieldSet: true
    },
    
    config: {
        editFields: null,
        currentRecord: null
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
                            required: record.get('required'),
                            labelWidth: '40%',
                            cls: 'nameAndTitleEditText'
                        };
                    } else if (record.get('type') == 'prefix') {
                        var prefixes = me.getCurrentRecord().namePrefixCodeListStore;
                        var prefixOptions = [""]; 
                        
                        for (var i = 0; i < prefixes.getCount(); i++) {
                            var value = prefixes.getAt(i).get('description');
                            prefixOptions.push({ text: value,  value: value });
                        }
                        
                        field = {
                            xtype: 'selectfield',
                            name: record.get('fieldName'),
                            label: record.get('description'),
                            required: record.get('required'),
                            cls: 'nameAndTitleEditText',
                            labelWidth: '40%',
                            options: prefixOptions
                        };
                    } else {
                        var suffixes = me.getCurrentRecord().nameSuffixCodeListStore;
                        var suffixOptions = [""];

                        for (var i = 0; i < suffixes.getCount(); i++) {
                            var value = suffixes.getAt(i).get('description');
                            suffixOptions.push({ text: value,  value: value });
                        }
                        
                        field = {
                            xtype: 'selectfield',
                            name: record.get('fieldName'),
                            label: record.get('description'),
                            required: record.get('required'),
                            cls: 'nameAndTitleEditText',
                            labelWidth: '40%',
                            options: suffixOptions
                        };
                    }
                    
                    me.getNameFieldSet().add(field);
                }
            });
            
            if (this.getCurrentRecord()) {
                this.getView().setValues(this.getCurrentRecord().EntryProfile.getAt(0).NameProfile.getAt(0).getData());
            }
        }
    },
    
    setRecord: function(record) {
        this.setCurrentRecord(record);
        if (record) {
            this.getView().setValues(record.EntryProfile.getAt(0).NameProfile.getAt(0).getData());
        }
    },
    
    saveData: function() {
        var record = this.getView().getRecord();
        if(record) {
            record.set('honorificPrefix', this.getPrefixTextField().getValue());
            record.set('givenName', this.getFirstNameTextField().getValue());
            record.set('honorificSuffix', this.getSuffixTextField().getValue());
            record.set('middleName', this.getMiddleNameTextField().getValue());
            record.set('familyName', this.getLastNameTextField().getValue());
        }
    },
    
    validateData: function() {
        var validateResult = "";
        var editFields = this.getNameFieldSet().getItems().items;
        for (var i = 0; i < editFields.length; i++) {
            if(editFields[i].getRequired() == true && editFields[i].getValue().trim() == "") {
                var tmp = editFields[i].getLabel();
                if(tmp != '') {
                    validateResult = validateResult + tmp;
                }
            }
        }
        return validateResult;
    },
    
    updateParams: function(params) {
        var originalName = this.getCurrentRecord().EntryProfile.getAt(0).NameProfile.getAt(0).getData();
        var nameObject = this.getView().getValues();
        var nameRequest = {};

        var editFields = this.getNameFieldSet().getItems().items;
        for (var i = 0; i < editFields.length; i++) {
            editFields[i].blur();
        }
        
        this.getEditFields().each(function(field) {
            if (field.get('enabled') == true) {
                nameRequest[field.get('requestName')] = nameObject[field.get('fieldName')];
            } else {
                nameRequest[field.get('requestName')] = originalName[field.get('fieldName')];
            }
        });
        
        if (params.Name.length <= 0) {
        	params.Name.push(nameRequest);
        } else {
        	Ext.apply(params.Name[0], nameRequest);
        }
    }
});
