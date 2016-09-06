Ext.define('Personify.controller.profile.PhoneEditForm', {
    extend: 'Personify.controller.profile.EditFormTemplate',
    
    control: {
        deleteButton: {
            tap: 'onTapDeleteButton'
        },
        valueTextBox: {
            keyup: 'onTextBoxChange'
        },
        primaryCheckBox: {},
        typeList: {
            change: 'onTypeListChange'
        },
        countryList: {
            
        }
    },
    
    validateData: function() {
//        var phone = this.getValueTextBox().getValue().trim();
//        if(phone == '') {
//            return 'blank';
//        }
//       
//        if(!Personify.utils.ItemUtil.onCheckedPhoneValue(phone)) {
//            return '<div style="text-align: left; margin-left: 20px;">' + phone + '</div>';
//        } else {
//            return '';
//        }
        return '';
    },
    
    syncRecordWithView: function() {
        this.getValueTextBox().blur();

        // get value from view and set to current record
        var view = this.getView();
        var primaryCheckBox = this.getPrimaryCheckBox();
        var valueTextBox = this.getValueTextBox();
        var typeList = this.getTypeList();
        var countryList = this.getCountryList();
        var record = view.getRecord();
        if(record != null) {
            record.set('value',valueTextBox.getValue() );
            record.set('type', typeList.getValue());
            record.set('country', countryList.getValue());
            var type = record.get('type');
            var id = record.get('phoneNumbersId') ? record.get('phoneNumbersId') : type.indexOf('FAX') < 0 ? 'PHONE,' + type : 'FAX,' + type;
            var type = record.get('type').indexOf('FAX') < 0 ? 'PHONE' : 'FAX';
            record.set('phoneNumbersId', id);
            record.set('type', type);
            
        }
    },
    
    setCountryForEmptyItem: function(value) {
        this.getCountryList().setValue(value);
    }
})