Ext.define('Personify.view.phone.notification.ListNotificationPhone', {
    extend: 'Ext.dataview.List',
    xtype: 'listNotificationPhone',

    config: {
        baseCls: 'listNotificationPhone',
        emptyText: '<div class = "p-emptyText-phone">No Notification</div>',
        deferEmptyText: false,
        pressedCls: 'listNotificationPhone-selected',
        selectedCls: 'listNotificationPhone-selected',
        scrollable: true,
        grouped: false,
        itemTpl: new Ext.XTemplate(
            '<table width="95%" class="table-item-listNotificationPhone">' +
                '<tr width="100%">' +
                    '<td width="98%" class="date-item-listNotificationPhone">{[Personify.utils.ItemUtil.timeAgoInWords(values.startDate)]}</td>' +
                    '<td width="2%" rowspan="2" align="center"><img class="img-item-listNotificationPhone" src="resources/icons/phone/next-arrow-grey.png"/></td>' +
                '</tr>' +
                '<tr width="98%">' +
                    '<td width="100%" class="desc-item-listNotificationPhone {[Personify.utils.ItemUtil.getClsTitleItemNotificationPhone(values.isRead)]}">{descriptionDetails}</td>' +
                '</tr>' +
            '</table>'
        )
    }
});