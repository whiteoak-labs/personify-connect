Ext.define('Personify.controller.profile.EditFormTemplate', {
    extend: 'Personify.controller.profile.template.EditItem',

    control: {
        deleteButton: {
            tap: 'onTapDeleteButton'
        },
        valueTextBox: {
            keyup: 'onTextBoxChange',
            change: 'onValueTextBoxChange',
        },
        primaryCheckBox: {},
        typeList: {
            change: 'onTypeListChange'
        }
    },

    init: function(){
        
    },
        
    onTextBoxChange: function(comp, e, eOpts) {
        var view = this.getView();
        var primaryCheckBox = this.getPrimaryCheckBox();
        var valueTextBox = this.getValueTextBox();
        var typeList = this.getTypeList();
        var record = view.getRecord();
        this.getView().getParent().fireEvent("textboxchange", view, record, null, valueTextBox.getValue(), typeList.getValue());
    },

    hideCountryList: function(value, countryListStore) {
        var countryListComponent = this.getCountryList();

        if(value == false) {
            countryListComponent.setStore(countryListStore);
        }

        countryListComponent.setHidden(value);
    },

    setRecord: function(record) {
        if(record != null) {
            this.getValueTextBox().setValue(record.get('value'));
            this.getTypeList().setValue(record.get('type'));
            this.getPrimaryCheckBox().setHidden(!record.get('primary'));
            if(record.get('country')) {
                this.getCountryList().setValue(record.get('country'));
            }

            // set Show or hidden deleteButton
            if(record.get('primary') == true) {
                this.getDeleteButton().hide();
                this.getPrimaryCheckBox().show();
            } else {
                this.getDeleteButton().show();
                this.getPrimaryCheckBox().hide();
            }
        }

        this.getTypeList().setReadOnly(true);
    },

    reset: function() {
        this.getValueTextBox().setValue('');
        this.getPrimaryCheckBox().setChecked(false);
        this.getView().setRecord(null);
    },

    validate: function() {
        
    },

    syncRecordWithView: function() {
        
    },
           
   getScroller: function(comp)
   {
       if(comp)
       {
            while(1)
           {
                if(comp.getParent())
               {
                    if(comp.getParent().getScroller())
                        return comp.getParent();
                    else
                       comp = comp.getParent();
               }
               else
                break;
           }
       }
   },
});
