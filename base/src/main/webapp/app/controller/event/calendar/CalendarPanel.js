Ext.define('Personify.controller.event.calendar.CalendarPanel',{
    extend: 'Personify.base.Controller',
    requires: ['Ext.ux.TouchCalendarView'],

    config: {
        selectedDate: null
    },
    control: {
        calendarButton: {
            changecalendarview: 'onChangeCalendarView'
        },
        calendar: {
            selectiondatechange: 'onSelectDateCell'
        },
        calendarText: {
            
        }
    },
    init: function(){
        this.onLoadCalendarData(null);
    },
    onChangeCalendarView: function(newDate, oldDate) {
        this.setSelectedDate(newDate);
        this.onChangeCalendarBox(newDate, oldDate);
        this.getView().fireEvent('onchangecalendarview',newDate);
    },
    
    onChangeCalendarBox: function (newDate, oldDate){
        this.setSelectedDate(newDate);
        var CalendarBox = this.getCalendar().child('CalendarBox');
        var months = Personify.utils.ItemUtil.getMonthsBetweenTwoDates(newDate, oldDate);
        CalendarBox.refreshDelta(months);
    },
    
    onLoadCalendarData: function(eventStore) {
        var calendar = {
            xtype: 'CalendarBox',
            viewMode: 'month',
            startEventField: 'startDateTime',
            endEventField: 'endDateTime',
            weekStart: 0,
            eventStore: eventStore,
            plugins: [Ext.create('Ext.ux.TouchCalendarSimpleEvents')]
        };
        this.getCalendar().removeAll(true);
        this.getCalendar().add(calendar);
    },
    
    onSelectDateCell: function(newDate){
        this.getView().fireEvent('selectiondatechange', newDate);
    },
    
    onBackCurrentDate: function(){
        this.onRemoveSelectDate();
        this.getCalendarButton().getController().onShowCurrentDate();
    },
    
    onRemoveSelectDate: function(){
        this.getCalendar().child('CalendarBox').removeSelectCell();
    },
    
    setTextOrHideCalendarText: function(value){
        if(value){
            this.getCalendarText().setHtml(value);
        }else{
            this.getCalendarText().hide();
        }
    }
});