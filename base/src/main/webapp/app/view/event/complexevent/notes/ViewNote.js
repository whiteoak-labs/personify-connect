Ext.define('Personify.view.event.complexevent.notes.ViewNote', {
    extend: 'Ext.Panel',
    xtype: 'viewnotepanel',
    controller: 'Personify.controller.event.complexevent.notes.ViewNote',
    requires: [
        'Personify.controller.event.complexevent.notes.ViewNote',
        'Personify.view.event.complexevent.notes.AddNote'
    ],

    config: {
        layout: 'vbox',
        record: null,
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                docked: 'top',
                xtype: 'panel',
                items: [
                    {
                        docked: 'left',
                        xtype: 'button',
                        text: 'Add New',
                        cls: 'p-button-AddToSchedule',
                        style: 'margin: 10px;',
                        width: '110px',
                        itemId: 'addNewButton'
                    },
                    {
                        docked: 'right',
                        xtype: 'button',
                        text: 'Share Current',
                        cls: 'p-button-sharewithtitle', 
                        style: 'margin: 10px;',
                        width: '140px',
                        itemId: 'shareCurrentButton'
                    },
                    {
                        docked: 'right',
                        xtype: 'button',
                        text: 'Delete',
                        cls: 'p-button-cancelNote',
                        itemId: 'deleteNoteButton',
                        hidden: true
                    }
                ]
            },
            {
                itemId: 'addNotePanel',
                xtype: 'addnotepanel',
                flex: 1
            }
        ]
    }
});