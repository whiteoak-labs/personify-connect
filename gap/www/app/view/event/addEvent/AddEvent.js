Ext.define('Personify.view.event.addEvent.AddEvent', {
    extend: 'Ext.Container',
    xtype: 'addevent',
    controller: 'Personify.controller.event.addevent.AddEvent',
    requires: [
        'Personify.controller.event.addevent.AddEvent',
        'Ext.ux.field.DateTimePicker'
    ],
    config: {
        cls: 'p-panel-addOrFilterPanel panel-left',
        xtype: 'formpanel',
        width: '50%',
        height: '90%',
        modal: true,
        hideOnMaskTap: true,
        right: 0,
        top: 0,
        zIndex: 9,
        showAnimation: {
            type: 'slide'
        },
        items: [
            {
                layout: 'hbox',
                cls: 'filterClosePanel',
                docked: 'top',
                items: [
                    {
                        html: 'Add Personal Event to Schedule',
                        itemId: 'addEventTitle'
                    },
                    {
                        xtype: 'button',
                        docked: 'right',
                        cls: 'p-close-button',
                        text: 'X',
                        itemId: 'addEventClose'
                    }
                ]
            },
            {
                html: 'Event Information: ',
                cls: 'addEventLabel'
            },
            {
                xtype: 'textfield',
                placeHolder: 'Event Name',
                itemId: 'eventTitle',
                cls: 'p-textbox-border'
            },
            {
                xtype: 'textfield',
                itemId: 'eventLocation',
                placeHolder: 'Location',
                cls: 'p-textbox-border',
                style: 'margin-bottom:10px'
            },
            {
                xtype: 'textareafield',
                itemId: 'eventDescription',
                placeHolder: 'Details',
                maxRows: 3,
                cls: 'p-textareafield-border'
            },
            {
                html: 'Duration: ',
                cls: 'addEventLabel'
            },
            {
                layout: 'vbox',
                cls: 'complex-event-content-view',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        cls: 'segmented-button-container',
                        style:'margin-bottom:5px',
                        allowMultiple: false,
                        items: [
                            {
                                text: 'Single Day',
                                cls: 'event-schedule-tab',
                                itemId: 'singledayButton',
                                pressed: true
                            },
                            {
                                text: 'Multiple Days',
                                itemId: 'multipledayButton',
                                cls: 'my-schedule-tab'
                            }
                        ]
                    },
                    {
                        layout: 'card',
                        itemId: 'eventDayCard',
                        cls: 'complex-event-content-card',
                        height: 162,
                        items: [
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        baseCls:'p-fieldset-picker',
                                        items: [
                                            {
                                                itemId: 'bothDatePicker',
                                                xtype: 'datetimepickerfield',
                                                name: 'bothDate',
                                                label: 'Date',
                                                dateTimeFormat: 'm/d/Y',
                                                value: new Date(),
                                                picker: {
                                                    zIndex: 15,
                                                    modal: true,
                                                    hideOnMaskTap: true,
                                                    yearFrom: new Date().getFullYear(),
                                                    yearTo: new Date().getFullYear() + 5,
                                                    minuteInterval : 1,
                                                    ampm : true,
                                                    useTitles: true,
                                                    slotOrder: ['month', 'day', 'year']
                                                }
                                            }
                                         ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        baseCls:'p-fieldset-picker',
                                        items: [
                                            {
                                                itemId: 'singleStartTime',
                                                xtype: 'datetimepickerfield',
                                                name: 'bothDate',
                                                label: 'Start Time',
                                                dateTimeFormat: 'h:i A',
                                                value: new Date(),
                                                picker: {
                                                    zIndex: 15,
                                                    modal: true,
                                                    hideOnMaskTap: true,
                                                    yearFrom: new Date().getFullYear(),
                                                    yearTo: new Date().getFullYear() + 5,
                                                    minuteInterval : 1,
                                                    ampm : true,
                                                    useTitles: true,
                                                    slotOrder: ['hour','minute','ampm']
                                                }
                                            }
                                         ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        baseCls:'p-fieldset-picker',
                                        items: [
                                            {
                                                itemId: 'singleEndTime',
                                                xtype: 'datetimepickerfield',
                                                name: 'bothDate',
                                                label: 'End Time',
                                                dateTimeFormat: 'h:i A',
                                                value: new Date(),
                                                picker: {
                                                    zIndex: 15,
                                                    modal: true,
                                                    hideOnMaskTap: true,
                                                    yearFrom: new Date().getFullYear(),
                                                    yearTo: new Date().getFullYear() + 5,
                                                    minuteInterval : 1,
                                                    ampm : true,
                                                    useTitles: true,
                                                    slotOrder: ['hour','minute','ampm']
                                                }
                                            }
                                         ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        baseCls:'p-fieldset-picker',
                                        items: [
                                            {
                                                itemId: 'startDatePicker',
                                                xtype: 'datetimepickerfield',
                                                name: 'startDate',
                                                label: 'Start Date',
                                                value: new Date(),
                                                picker: {
                                                    zIndex: 15,
                                                    hideOnMaskTap: true,
                                                    yearFrom: new Date().getFullYear(),
                                                    yearTo: new Date().getFullYear() + 5,
                                                    minuteInterval : 1,
                                                    ampm : true,
                                                    useTitles: true,
                                                    slotOrder: ['month', 'day', 'year','hour','minute','ampm']
                                                }
                                            }
                                         ]
                                    },
                                    {
                                        xtype: 'fieldset',
                                        baseCls:'p-fieldset-picker',
                                        items: [
                                            {
                                                itemId: 'endDatePicker',
                                                xtype: 'datetimepickerfield',
                                                name: 'endDate',
                                                label: 'End Date',
                                                value: new Date(),
                                                picker: {
                                                    zIndex: 15,
                                                    hideOnMaskTap: true,
                                                    yearFrom: new Date().getFullYear(),
                                                    yearTo: new Date().getFullYear() + 5,
                                                    minuteInterval : 1,
                                                    ampm : true,
                                                    useTitles: true,
                                                    slotOrder: ['month', 'day', 'year','hour','minute','ampm']
                                                }
                                            }
                                         ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },//tabpanel
            {
                xtype:'container',
                items:[
                    {
                        xtype: 'button',
                        itemId: 'addPersonalEventButton',
                        text: 'Add Personal Event',
                        cls: 'addEventSavebt',
                        centered: true
                    }
                ]
            }
        ]
    }
});
