Ext.define('Personify.controller.profile.WebsiteEditForm', {
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
        var website = this.getValueTextBox().getValue().trim();
        if(website == '') {
            return 'blank';
        }
       
        return '';
    },
    
    syncRecordWithView: function() {
        this.getValueTextBox().blur();

        var view = this.getView();
        var primaryCheckBox = this.getPrimaryCheckBox();
        var valueTextBox = this.getValueTextBox();
        var typeList = this.getTypeList();
        var record = view.getRecord();
        if(record != null){
            record.set('value',valueTextBox.getValue() );
            record.set('type', typeList.getValue());

            var type = record.get('type');
            var id = record.get('urlId') ? record.get('urlId') : 'WEB,' + type;
            var type = 'URL';
            record.set('urlId', id);
            record.set('type', type);
        }
    }
});
