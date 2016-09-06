Ext.define('Personify.view.event.complexevent.notes.AddNote', {
    extend: 'Ext.Panel',
    xtype: 'addnotepanel',
    controller: 'Personify.controller.event.complexevent.notes.AddNote',
    requires: 'Personify.controller.event.complexevent.notes.AddNote',

    config: {
        layout: 'vbox',
        eventId: null,
        sessionId: null,
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                xtype: 'panel',
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
            }
        ]
    }
});