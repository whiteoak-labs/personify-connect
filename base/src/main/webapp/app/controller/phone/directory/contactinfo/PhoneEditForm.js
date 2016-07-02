Ext.define('Personify.controller.phone.directory.contactinfo.PhoneEditForm', {
    extend: 'Personify.controller.profile.PhoneEditForm',
    
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
    }
});