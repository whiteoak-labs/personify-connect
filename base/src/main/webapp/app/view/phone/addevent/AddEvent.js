Ext.define('Personify.view.phone.addevent.AddEvent', {
    extend: 'Ext.Panel',
    xtype: 'addeventpanelphone',
    controller: 'Personify.controller.phone.addevent.AddEvent',
    
    requires: [
        'Personify.controller.phone.addevent.AddEvent',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.schedule.ScheduleList',
        'Ext.ux.field.DateTimePicker'
    ],
    config: {
        layout: 'vbox',
        cls: 'p-phone-background-white',
        items: [
            {
                xtype: 'ptoolbar',
                title: '+ Personal Event',
                itemId: 'eventToolbar'
            },
            {
                xtype: 'container',
                cls: 'p-phone-parentcontainer',
                layout: 'vbox',
                flex: 1,
                items:[
                    {
                        html: 'Event Information:',
                        cls: 'p-phone-addpersonalevent'
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: 'Event Name',
                        itemId: 'eventTitle',
                        cls: 'p-phone-field-eventday'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'eventLocation',
                        placeHolder: 'Location',
                        cls: 'p-phone-field-eventday'
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'eventDescription',
                        placeHolder: 'Details',
                        maxRows: 3,
                        cls: 'p-textareafield-border',
                       style: 'margin-top: 5px;'
                    },
                    {
                        html: 'Duration:',
                        cls: 'p-phone-addpersonalevent',
                        style: 'margin-top: 10px;'
                    },
                    {
                        layout: 'vbox',
                        cls: 'p-phone-panel-addeventduration',
                        items: [
                            {
                                xtype: 'segmentedbutton',
                                cls: 'p-phone-addevent-segmentedcontainer',
                                allowMultiple: false,
                                items: [
                                    {
                                        text: 'Single Day',
                                        cls: 'p-phone-segmenteditems-singleday',
                                        pressedCls: '',
                                        itemId: 'singledayButton',
                                        pressed: true
                                    },
                                    {
                                        text: 'Multiple Days',
                                        itemId: 'multipledayButton',
                                        cls: 'p-phone-segmenteditems-mutipledays',
                                        pressedCls: ''
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
                                        cls: 'p-phone-eventdaycard-fieldset',
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                cls:'p-phone-field-eventday',
                                                items: [
                                                    {
                                                        itemId: 'bothDatePicker',
                                                        xtype: 'datetimepickerfield',
                                                        name: 'bothDate',
                                                        label: 'Date',
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
                                                cls:'p-phone-field-eventday',
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
                                                cls:'p-phone-field-eventday',
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
                                        cls: 'p-phone-eventdaycard-fieldset',
                                        items: [
                                            {
                                                xtype: 'fieldset',
                                                cls:'p-phone-field-eventday',
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
                                                cls:'p-phone-field-eventday',
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
                    }
                ]
            }
        ]
    }//end config
});