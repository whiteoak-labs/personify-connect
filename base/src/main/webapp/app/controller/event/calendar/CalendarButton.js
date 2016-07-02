Ext.define('Personify.controller.event.calendar.CalendarButton',{
    extend: 'Personify.base.Controller',
    control: {
        selectYear: {
            change: 'onChangeSelectYear'
        },
        selectMonth: {
            change: 'onChangeSelectMonth'
        }
    },
    
    init: function(){
        this.onShowSelectYear(2012, 2014);
        this.onShowCurrentDate();
    },
    
    onShowSelectYear: function(begin, end){
        var modelList= new Array();
        var selectYear = this.getSelectYear();
        for( var i = begin; i <= end; i++) {
           modelList.push({text: i, value: i});
        }
        selectYear.setOptions(modelList);
    },
    
    onShowCurrentDate: function (){
        var today = new Date();
        this.getSelectYear().setValue(today.getFullYear());
        this.getSelectMonth().setValue(today.getMonth());
    },
    
    onChangeSelectYear: function(select, newValue, oldValue, eOpts){
        var month = this.getSelectMonth().getValue();
        var newDate = new Date();
        newDate.setDate(1);
        newDate.setMonth(month);
        newDate.setFullYear(newValue)
        
        var oldDate = new Date();
        oldDate.setDate(1);
        oldDate.setMonth(month);
        oldDate.setFullYear(oldValue)
        
        this.getView().fireEvent('changecalendarview', newDate, oldDate);
    },
    
    onChangeSelectMonth: function(select, newValue, oldValue, eOpts){
        var year = this.getSelectYear().getValue();
        
        var newDate = new Date();
        newDate.setDate(1);
        newDate.setMonth(newValue);
        newDate.setFullYear(year)
        
        var oldDate = new Date();
        oldDate.setDate(1);
        oldDate.setMonth(oldValue);
        oldDate.setFullYear(year)
        
        this.getView().fireEvent('changecalendarview', newDate, oldDate);
    }
});