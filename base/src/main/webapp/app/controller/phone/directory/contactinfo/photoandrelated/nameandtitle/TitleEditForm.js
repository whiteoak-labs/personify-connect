Ext.define('Personify.controller.phone.directory.contactinfo.photoandrelated.nameandtitle.TitleEditForm', {
    extend: 'Personify.controller.profile.TitleEditFormLikeIos',
    
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
                            required: record.get('required')
                        };
                    }
                    me.getTitleFieldSet().add(field);
                }
            });
            
            if (this.getCurrentRecord()) {
                this.getView().setValues(this.getCurrentRecord().EntryProfile.getAt(0).getData());
            }
        }
    }
})