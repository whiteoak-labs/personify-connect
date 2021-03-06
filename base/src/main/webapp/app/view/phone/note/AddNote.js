Ext.define('Personify.view.phone.note.AddNote', {
    extend: 'Ext.Panel',
    xtype: 'addnotepanelphone',
    controller: 'Personify.controller.phone.note.AddNote',
    requires: 'Personify.controller.phone.note.AddNote',

    config: {
        layout: 'vbox',
        eventId: null,
        sessionId: null,
        noteId: null,
        record: null,
        title: null,
        isNoteList: null,
        isAddNew: null,
        items: [
            {
                xtype: 'ptoolbar',
                title: 'Notes',
                itemId: 'eventToolbar'
            },
            {
                flex: 1,
                layout: 'vbox',
                style: 'background-color: white; padding: 10px;',
                items: [
                    {
                        height: 50,
                        xtype: 'textfield',
                        maxLength: 300,
                        placeHolder: 'Enter Title',
                        itemId: 'inputTitleNote',
                        cls: 'inputTitleOneNote',
                        autoCapitalize: true
                    },
                    {
                        flex: 1,
                        scrollable: true,
                        xtype: 'panel',
                        itemId: 'panelOfContent',
                        items: [
                            {
                                xtype: 'textareafield',
                                placeHolder: 'Tap to type',
                                itemId: 'inputDescriptionNote',
                                cls: 'inputDescriptionNote',
                                maxLength: 3000
                            }
                        ]
                    }
                ]
            },
            {
                layout: 'vbox',
                docked: 'bottom',
                flex: 1,
                cls: 'p-phone-panel-button-note',
                items:[
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-eventdetail-savetocalendar',
                        text: 'Share Current',
                        itemId: 'shareCurrentButton'
                    },
                    {
                        xtype: 'button',
                        cls: 'p-phone-button-eventdetail-regiter',
                        text: 'Delete',
                        pressedCls: 'p-phone-button-red-pressing',
                        itemId: 'deleteNoteButton',
                        hidden: true
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        this.fireEvent('updaterecord');
    }
});
