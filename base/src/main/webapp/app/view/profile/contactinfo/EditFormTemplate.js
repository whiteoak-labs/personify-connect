Ext.define('Personify.view.profile.contactinfo.EditFormTemplate', {
    extend: 'Ext.Container',
    xtype: 'editform',
    controller: 'Personify.controller.profile.EditFormTemplate',
    requires: 'Personify.controller.profile.EditFormTemplate',

    config: {
        record: null,
        typeList: null,
        pack: 'center',
        align: 'center',
        layout: 'hbox',
        baseCls: 'p-fieldset-nameeditform p-editformtemplate',
        items: [
            {
                flex: 2,
                xtype: 'selectfield',
                itemId: 'typeList',
                store: null,
                cls: 'nameAndTitleEditText',
                inputCls : 'p-selectfield-input-cls',
                options: [
                    {
                        text: 'First Option',
                        value: 'first'
                    }, {
                        text: 'Second Option',
                        value: 'second'
                    }, {
                        text: 'Third Option',
                        value: 'third'
                    }
                ]
            },
            {
                flex: 4,
                xtype: 'textfield',
                itemId: 'valueTextBox',
                cls: 'nameAndTitleEditText',
                placeHolder: 'Value',
                name: 'firstName',
                autoCapitalize: false,
            },
            {
                xtype: 'panel',
                cls: 'p-panel-deleteandmainicon',
                width: 40,
                items: [
                    {
                        xtype:'button',
                        itemId: 'deleteButton',
                        pressedCls:'p-button-delete-editTempelate-pressing',
                        cls: 'p-button-delete-editTempelate',
                        hidden: true
                    },
                    {
                        itemId: 'primaryCheckBox',
                        html: 'Main',
                        cls: 'p-div-profile-address-main',
                        style: 'margin-left: -4px;',
                        hidden: true
                    }
                ]
            }
        ]
    },//end config
    
    updateRecord: function(record) {
        if(record) {
            this.getController().setRecord(record);
        }
    },
    
    applyTypeList: function(record) {
        this.getController().setTypeList(record);
    }
});