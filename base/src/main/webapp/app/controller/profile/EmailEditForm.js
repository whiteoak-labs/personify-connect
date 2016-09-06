Ext.define('Personify.controller.profile.EmailEditForm', {
    extend: 'Personify.controller.profile.EditFormTemplate',
    
    requires: [
        'Personify.utils.ItemUtil'
    ],
    
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
        }
    },
    
    validateData: function() {
        var email = this.getValueTextBox().getValue().trim();
        if(email == '') {
            return 'blank';
        }
        if(!Personify.utils.ItemUtil.onCheckedEmailValue(email)) {
            return '<div style="text-align: left; margin-left: 20px;">' + email + '</div>';
        } else {
            return '';
        }
    },
    
    syncRecordWithView: function() {
        this.getValueTextBox().blur();

        // get value from view and set to current record
        var view = this.getView();
        var primaryCheckBox = this.getPrimaryCheckBox();
        var valueTextBox = this.getValueTextBox();
        var typeList = this.getTypeList();
        var record = view.getRecord();
        if(record != null){
            record.set('value',valueTextBox.getValue() );
            record.set('type', typeList.getValue());

            // create id for this, type == PHONE
            var type = record.get('type');
            var id = record.get('emailsId') ? record.get('emailsId') : 'EMAIL,' + type;
            var type = 'EMAIL';
            record.set('emailsId', id);
            record.set('type', type);
        }
    }
});
