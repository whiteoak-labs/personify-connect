Ext.define('Personify.view.phone.exhibitor.ListExhibitorPhone', {
    extend: 'Ext.dataview.List',
    xtype: 'listExhibitorPhone',

    config: {
        baseCls: 'listNotificationPhone',
        emptyText: '<div class = "p-emptyText-phone">No Exhibitor</div>',
        deferEmptyText: false,
        pressedCls: 'listNotificationPhone-selected',
        selectedCls: 'listNotificationPhone-selected',
        scrollable: true,
        itemCls: 'presenterlistitem',
        grouped: true,

        itemTpl: new Ext.XTemplate(
            '<table width="100%">' +
                '<tr width="100%">' +
                    '<td width="40px" height="40px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="40px" height="40px"/></td>' +
                    '<td width="60%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[Personify.utils.ItemUtil.checkStringNull(values.name)]}</b></p>' +
                                                                  '<p>{[Personify.utils.ItemUtil.checkStringNull(values.webSiteURL)]}</p></td>' +
                    '<td width="30%" class="cont-allExhibitorList"><p>{[this.checkBoothNull(values.boothNos)]}</p></td>' +
                '</tr>' +
            '</table>',
            {
                checkBoothNull: function(boothNos) {
                    if(boothNos == null || boothNos == "") {
                        return '';
                    } else {
                        return 'Booth: ' + '<b>' + boothNos + '</b>';
                    }
                }
            }
        )
    }
});
