Ext.define('Personify.controller.profile.PhoneList', {
    extend: 'Personify.base.Controller',
    control: {
        view: {
            itemtap: 'onItemTapPhoneList'
        }
    }, //end config
    
    onItemTapPhoneList: function(list, index, target, record, e, eOpts) {
        if (!Ext.os.is.Tablet && !Ext.os.is.Desktop) {
            var actionSheet = Ext.create("Ext.ActionSheet", {
                width: '250px',
                height: '143px',
                style: 'margin-top: -20px;',
                left: '20%',
                hideOnMaskTap: true,
                items: [
                    {
                        text: 'Call Phone',
                        handler: function() {
                            actionSheet.hide();
                            window.plugins.phoneDialer.dial(record.get('value'));
                        }
                    },
                    {
                        text: 'SMS',
                        handler: function() {
                            actionSheet.hide();
                            if (window.plugins['smsComposer'])
                                window.plugins.smsComposer.showSMSComposer(record.get('value'), null);
                        }
                    },
                    {
                        text: 'Cancel',
                        ui: 'confirm',
                        handler: function() {
                            actionSheet.hide();
                        }
                    }
                ]
            });
            Ext.Viewport.add(actionSheet);
            actionSheet.showBy(target);
        }
    }
});