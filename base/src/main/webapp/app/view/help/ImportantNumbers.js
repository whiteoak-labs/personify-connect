Ext.define('Personify.view.help.ImportantNumbers', {
    extend: 'Ext.Panel',
    xtype: 'importantnumberspanel',
    requires: 'Personify.view.profile.contactinfo.phone.PhoneList',

    config: {
        title: 'Important Numbers:',
        items: [
            {
                itemId: 'importantNumbersTitle',
                html: 'Important Numbers: <hr class="helpHR"/>',
                cls: 'aboutAPAHeaders'
            },
            {
                xtype: 'phonelist',
                itemId: 'phoneList',
                cls: 'p-about-information'
            }
        ]
    },

    updateTitle: function(title) {
        this.down('#importantNumbersTitle').setHtml(title + ' <hr class="helpHR"/>');
    },

    updateStore: function(store) {
        this.down('#phoneList').setStore(store);
    }
});
