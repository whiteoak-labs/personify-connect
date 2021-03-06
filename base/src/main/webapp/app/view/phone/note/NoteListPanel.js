Ext.define('Personify.view.phone.note.NoteListPanel', {
    extend: 'Ext.Panel',
    xtype: 'notelistpanelphone',
    controller: 'Personify.controller.phone.note.NoteListPanel',

    requires: [
        'Personify.controller.phone.note.NoteListPanel',
        'Personify.view.phone.note.NoteItem'
    ],

    config: {
        layout: 'vbox',
        eventId: null,
        sessionId: null,
        title: null,
        store: null,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Notes',
                itemId: 'eventToolbar'
            },
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'noteTitleBar'
            },
            {
                xtype: 'button',
                text: 'Share All',
                cls: 'p-phone-button-shareallnote',
                pressedCls: 'p-phone-button-blue-pressing',
                itemId: 'shareAllNote'
            },
            {
                xtype: 'panel',
                flex: 1,
                layout: 'fit',
                items: [
                    {
                        xtype: 'list',
                        itemId: 'noteList',
                        cls: 'p-phone-list-note',
                        pressedCls: 'p-phone-common-list-selected',
                        selectedCls: 'p-phone-common-list-selected',
                        itemCls: 'p-phone-item-note',
                        margin: '0px 0px 50px 0px',
                        deferEmptyText: false,
                        emptyText: '<div class="p-presenter-emptyText">No Note</div>',
                        store: null,
                        itemTpl: null
                    }
                ]
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.phone.note.NoteItem');
        this.down("#noteList").setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));

        this.callParent(arguments);
        template.destroy();
    },

    updateStore: function(store) {
        if (store) {
            this.getController().updateListNote(store);
        }
    }
});
