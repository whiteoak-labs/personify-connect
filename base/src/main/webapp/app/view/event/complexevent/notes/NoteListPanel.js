Ext.define('Personify.view.event.complexevent.notes.NoteListPanel', {
    extend: 'Ext.Panel',
    xtype: 'notelistpanel',
    controller: 'Personify.controller.event.complexevent.notes.NoteListPanel',

    requires: [
        'Personify.controller.event.complexevent.notes.NoteListPanel',
        'Personify.view.event.complexevent.notes.NoteList'
    ],

    config: {
        layout: 'vbox',
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        docked: 'left',
                        xtype: 'button',
                        text: 'Add New',
                        cls: 'p-button-AddToSchedule',
                        style: 'margin: 10px;',
                        width: '110px',
                        itemId: 'addNewButton',
                        hidden: true
                    },
                    {
                        html: 'Select a Note to view',
                        style: 'margin: 10px; line-height: 35px; font-weight: bold; color: white'
                    },
                    {
                        docked: 'right',
                        xtype: 'button',
                        text: 'Share All',
                        cls: 'p-button-sharewithtitle', 
                        style: 'margin: 10px;',
                        width: '140px',
                        itemId: 'shareAllNote'
                    }
                ]
            },
            {
                xtype: 'panel',
                flex: 1,
                layout: 'fit',
                items: [
                    {
                        xtype: 'notelist',
                        itemId: 'noteList'
                    }
                ]
            }
        ]
    }
});