Ext.define('Personify.view.help.Description', {
    extend: 'Ext.Panel',
    xtype: 'descriptionpanel',

    config: {
        title: 'About TMA Resources Connect:',
        items: [
            {
                itemId: 'descriptionTitle',
                html: 'About TMA Resources Connect: <hr class="helpHR"/>',
                cls: 'aboutAPAHeaders'
            }
        ]
    },

    updateTitle: function(title) {
        this.down('#descriptionTitle').setHtml(title + ' <hr class="helpHR"/>');
    }
});
