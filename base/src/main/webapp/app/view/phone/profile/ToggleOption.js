Ext.define('Personify.view.phone.profile.ToggleOption', {
    extend: 'Ext.Panel',
    xtype: 'toggleoptionphone',
    
    controller: 'Personify.controller.phone.profile.ToggleOption',
    requires: 'Personify.controller.phone.profile.ToggleOption',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'container',
                items:[
                    {
                        html: 'Privacy:',
                        cls: 'p-phone-membersettingtitle'
                    },
                    {
                        xtype: 'togglefield',
                        itemId: 'toggleDirectory',
                        label: 'Include in Print Directory',
                        labelWidth: '65%',
                        labelCls: 'p-phone-toggle-lable-profileprivacy',
                        cls: 'p-phone-toggle-profileprivacy'
                    },
                    {
                        xtype: 'togglefield',
                        itemId: 'toggleMobileDirectory',
                        label: 'In Web/Mobile Directory',
                        labelWidth: '65%',
                        labelCls: 'p-phone-toggle-lable-profileprivacy',
                        cls: 'p-phone-toggle-profileprivacy'
                    }
                ]
            }
        ]
    },
   updateRecord: function(record) {
       if(record) {
           this.getController().setRecord(record);
       }
   }
});