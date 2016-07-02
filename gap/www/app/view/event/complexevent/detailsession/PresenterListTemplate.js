Ext.define('Personify.view.event.complexevent.detailsession.PresenterListTemplate', {
    extend: 'Ext.Container',
    config: {
        layout: 'hbox',
        items: [
            {
                html: '<img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}"/>',
                cls: 'p-container-imgpresenterlist'
            },
            {
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            flex: 1,
            items:[
                {
                    html: '{[Personify.utils.ItemUtil.checkStringNull(values.name)]}',
                    cls: 'p-container-presentername',
                    style: 'font-weight: bold'
                },
                {
                    html: '{[this.checkTitleNull(values.jobTitle)]}',
                    cls: 'p-container-presenterjobtitle'
                }
            ]
            }
        ]
    }
});