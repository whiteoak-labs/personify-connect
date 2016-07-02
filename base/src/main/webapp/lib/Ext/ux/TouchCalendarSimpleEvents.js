Ext.define('Ext.ux.TouchCalendarSimpleEvents', {
  extend: 'Ext.mixin.Observable',
    startEventField: 'startDateTime',
    endEventField: 'endDateTime',
    multiEventDots: true,
    wrapperCls: 'simple-event-wrapper',
    eventDotCls: 'simple-event',
    dotWidth: 6,
    eventTpl:   ['<span class="{wrapperCls}">',
        '<tpl for="events">',
            '<span class="{[parent.eventDotCls]}"></span>',
        '</tpl>',
    '</span>'].join(''),
    
    /**
     * Function used to filter the store for each of the displayed dates
     * @method
     * @private
     * @param {Object} record - current record
     * @param {Object} id - ID of passed in record
     * @param {Object} currentDate - date we are currently dealing while looping Calendar's dateCollection property
     */
    filterFn: function(record, id, currentDate){
      if (arguments.length===2){
        currentDate = id;
      }
        var startDate = Ext.Date.clearTime(this.formatDate(record.get(this.startEventField)), true).getTime(),
            endDate = Ext.Date.clearTime(this.formatDate(record.get(this.endEventField)), true).getTime(),
            currentDate = Ext.Date.clearTime(currentDate, true).getTime();
                                
        return (startDate <= currentDate) && (endDate >= currentDate);
    },
    
    init: function(calendar){
        this.calendar = calendar; // cache the parent calendar
        this.calendar.simpleEventsPlugin = this; // cache the plugin instance on the calendar itself
        
//        this.wrapperCls = (this.multiEventDots ? 'simple-event-wrapper-multi' : 'simple-event-wrapper' );
//        this.eventDotCls = (this.multiEventDots ? 'simple-event-multi' : 'simple-event');
        
        this.calendar.showEvents = this.showEvents;
        this.calendar.hideEvents = this.hideEvents;
        this.calendar.removeEvents = this.removeEvents;
        
        // After the calendar's refreshed we must refresh the events
        this.calendar.refresh = Ext.Function.createSequence(this.calendar.refresh, this.refreshEvents, this);
        this.calendar.syncHeight = Ext.Function.createSequence(this.calendar.syncHeight, this.refreshEvents, this);
    },

    
    /**
     * Function to execute when the Calendar is refreshed.
     * It loops through the Calendar's current dateCollection and gets all Events
     * for the current date and inserts the appropriate markup
     * @method
     * @private
     * @return {void}
     */
    refreshEvents: function(){
        if (!this.disabled) {
            var datesStore = this.calendar.getStore();
            var store = this.calendar.eventStore;
            if(store){
                var t = 0;
                if (datesStore) {
                    
                    this.removeEvents(); // remove the event dots already existing
                    // loop through Calendar's current dateCollection
                    datesStore.each(function(dateObj){
                        var date = dateObj.get('date');
                        
                        var cell = this.calendar.getDateCell(date); // get the table cell for the current date
                        if (cell) {
                            var me = this;
                            store.each(
                                function(record){
                                    var startDate = Ext.Date.clearTime(record.get('startDateTime')).getTime();
                                    var endDate = Ext.Date.clearTime(record.get('endDateTime')).getTime();
                                    var currentDate = date.getTime();
                                    var register = record.get('registered');
                                    if((startDate <= currentDate) && (endDate >= currentDate)){
                                        var t =  new Ext.XTemplate(me.eventTpl).append(cell, {
                                            events: (me.multiEventDots ? store.getRange().slice(0, 1) : ['event']),
                                            wrapperCls: me.wrapperCls,
                                            eventDotCls: register ? 'simple-schedule' :me.eventDotCls
                                        }, true);
                                        var Xdistance = register ? cell.getWidth()/3 :cell.getWidth()*2/3;
                                        t.setX((cell.getX() + Xdistance));
                                        t.setY((cell.getY() + cell.getHeight()) - (t.getHeight() + (cell.getHeight()*0.1)) );
                                    }
                                }
                            )
                        }
                        store.clearFilter();
                        t++;
                    }, this);
                }
            }
        }
    },
    
    /**
     * Hides all the event markers
     * This is added to the parent Calendar's class so must be executed via the parent
     * @method
     * @return {void}
     */
    hideEvents: function(){
        this.simpleEventsPlugin.disabled = true;
        
        this.calendar.element.select('span.' + this.wrapperCls).hide();
    },
    
    /**
     * Shows all the event markers
     * This is added to the parent Calendar's class so must be executed via the parent
     * @method
     * @return {void}
     */
    showEvents: function(){
        this.simpleEventsPlugin.disabled = false;
        
        this.calendar.element.select('span.' + this.wrapperCls).show();
    },
    /**
     * Removes all the event markers and their markup
     * This is added to the parent Calendar's class so must be executed via the parent
     * @method
     * @return {void}
     */
    removeEvents: function(){
        if(this.calendar.element){
            this.calendar.element.select('span.' + this.wrapperCls).clear();
        }
    },
    formatDate:function(icalStr){
        var bits = xmlDate.split(/[-T:]/g);
        var d = new Date(bits[0], bits[1]-1, bits[2]);
        d.setHours(bits[3], bits[4], bits[5]);
        return d;
    }   
});