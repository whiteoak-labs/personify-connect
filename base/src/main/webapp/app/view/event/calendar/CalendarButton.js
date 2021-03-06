Ext.define('Personify.view.event.calendar.CalendarButton', {
    extend: 'Ext.Container',
    controller: 'Personify.controller.event.calendar.CalendarButton',
    xtype: 'calendarbutton',
    requires: [
        'Personify.controller.event.calendar.CalendarButton',
        'Ext.field.Select'
    ],

    config: {
        layout: 'hbox',
        cls:'p-fieldset-nameeditform',
        items: [
            {
                flex: 1,
                xtype: 'selectfield',
                itemId: 'selectMonth',
                cls: 'p-selectfield-selectMonth',
                options: [
                    {text: 'January',  value: '0'},
                    {text: 'February', value: '1'},
                    {text: 'March',  value: '2'},
                    {text: 'April',  value: '3'},
                    {text: 'May', value: '4'},
                    {text: 'June',  value: '5'},
                    {text: 'July',  value: '6'},
                    {text: 'August', value: '7'},
                    {text: 'September',  value: '8'},
                    {text: 'October',  value: '9'},
                    {text: 'November', value: '10'},
                    {text: 'December',  value: '11'}
                ]
            },
            {
                flex: 1,
                xtype: 'selectfield',
                itemId: 'selectYear',
                cls: 'p-selectfield-selectYear'
            }
        ]
    }
    
});