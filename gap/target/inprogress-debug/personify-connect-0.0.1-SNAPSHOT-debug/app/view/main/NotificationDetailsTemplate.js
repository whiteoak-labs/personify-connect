Ext.define('Personify.view.main.NotificationDetailsTemplate', {
    extend: 'Ext.dataview.DataView',
    xtype: 'notificationdetailstemplate',
    
    config: {
        baseCls: 'notification-details-template',
        styleHtmlContent: true,
        itemTpl: new Ext.XTemplate(
            '<div class="notification-details-template-date">{startDate}</div>',
            '<div class="notification-details-template-description">{description}</div>',
            '<div class="notification-details-template-description-details">{[this.getContent(values.descriptionDetails)]}</div>',
            '<div class="notification-details-template-link">{linkLabel}</div>',
            {
                getContent: function(text) {
                    while(text.indexOf("\r\n\r\n") != -1) {
                        text = text.replace("\r\n\r\n", "<br />");
                    }
                    return text;
                }
            }
        ),
        listeners: {
            itemtap: function(me, index, target, record, e, eOpts) {
                if (e.target.className.indexOf('notification-details-template-link') != -1) {
                    this.fireEvent('onOpenHyberLink', record);
                }
            }
        }
    }
});
