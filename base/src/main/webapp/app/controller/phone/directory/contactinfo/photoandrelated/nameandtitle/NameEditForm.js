Ext.define('Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.NameEditForm', {
    extend: 'Personify.controller.profile.NameEditFormLikeIos',
    
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
                            cls:'p-phone-field-directory-editform',
                            name: record.get('fieldName'),
                            label: record.get('description'),
                            required: record.get('required'),
                            labelWidth: '40%'
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
                            cls:'p-phone-field-directory-editform',
                            name: record.get('fieldName'),
                            label: record.get('description'),
                            required: record.get('required'),
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
                            cls:'p-phone-field-directory-editform',
                            name: record.get('fieldName'),
                            label: record.get('description'),
                            required: record.get('required'),
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
    }
});
