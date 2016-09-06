Ext.define('Personify.view.event.advertising.AdvertisingPanel', {
    extend: 'Ext.dataview.List',
    xtype: 'advertisingpanel',
    config: {
        style: 'background-color: transparent; height: 100px;',
        itemId: 'listEventItem',
        xtype: 'list',
        inline: { wrap: false },
        itemCls: 'p-advertisingpanel-itemCls',
        deferEmptyText: false,
        emptyText: '<div class="x-list-emptytext">No Sponsor</div>',
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        itemTpl: new Ext.XTemplate('<img alt="{sponsorName}" src="{[this.checkImg(values.imageURL)]}" width="auto" height="90px"/>',
            {
                checkImg: function(imageURL){
                    return imageURL ? imageURL :'resources/images/noAdv.png'
                }
            }
        )
    }
});
