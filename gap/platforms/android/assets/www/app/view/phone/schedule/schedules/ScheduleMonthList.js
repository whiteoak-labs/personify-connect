Ext.define('Personify.view.phone.schedule.schedules.ScheduleMonthList', {
    extend: 'Ext.dataview.List',
    xtype: 'schedulelistmonth',

    config: {
        baseCls: 'selectedFieldButtonNews',
        scrollToTopOnRefresh: false,
        deferEmptyText: false,
        emptyText: '<div class="phone-emptyText">Currently, there are no events in your schedule.<br>You may add an event by selecting an event and choosing ‘Add to My Schedule’</div>',
        itemTpl: new Ext.XTemplate(
            '<tpl if="expanded">',
                '<div class="p-filter-button-new-enabled">{[this.formatMonth(values.month, values.year)]}',
                '</div>',
                '<tpl for="events">',
                    '<div class="event-item-phone eventItemPanel-{#} eventItem-{#}" style = "display: -webkit-box; width: 100%; float: left;">',
                        '<div style = "display: -webkit-box; -webkit-box-orient: vertical;" class = "p-phone-itemlist-eventday eventItem-{#}">{[Ext.Date.format(values.data.startDateTime, "j")]}<sup class = "p-phone-itemlist-eventday-ordinalsuffix eventItem-{#}">{[Ext.Date.format(values.data.startDateTime, "S")]}</sup></div>',
                        '<div style = "-webkit-box-flex: 1.0;" class = "p-phone-itemlist-eventcontent eventItem-{#}">',
                            '<div class="eventItem-{#}">{[Personify.utils.ItemUtil.getDisplayTimeForEvent(values.data.startDateTimeString, values.data.endDateTimeString)]}</div>',
                            '<div class="p-phone-event-name eventItem-{#}">{data.title}</div>',
                            '<div class="p-phone-event-location-registered eventItem-{#}">',
                                '<div style = "float:left" class = "p-phone-event-location eventItem-{#}">{data.location}</div>',
                                '<div style = "float:right; margin-right: 20px" class = "x-button-normal x-button p-phone-button-removeschedule removebutton-{#}">',
                                    '<span class="x-button-label removebutton-{#}">Remove</span>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</tpl>',
            '<tpl else>',
                '<div class="p-filter-button-new">{[this.formatMonth(values.month, values.year)]}',
                '</div>',
            '</tpl>',
            {
                formatMonth: function(month, year) {
                    var d = new Date('01/01/2013');
                    d.setFullYear(year);
                    d.setMonth(month);
                    return Ext.Date.format(d, 'F, Y');
                }
            }
        ),
        listeners: {
            itemtap: function(list, index, target, record, e, eOpts) {
                var isItem = false;
                var index = null;
                var isButton = false;
                var classList = e.target.classList;

                for (var i = 0, length = classList.length; i < length; i++) {
                    if (classList[i].indexOf('eventItem') >= 0) {
                        isItem = true;
                        index = classList[i].split('-')[1];
                        break;
                    } else {
                        if (classList[i].indexOf('removebutton') >= 0) {
                            isButton = true;
                            index = classList[i].split('-')[1];
                            break;
                        }
                    }
                }

                if (isItem) {
                    this.fireEvent('eventitemtap', record.get('events')[index - 1]);
                } else if (isButton) {
                    this.fireEvent('removeitem', record.get('events')[index -1]);
                } else {
                    record.set('expanded', !record.get('expanded'));
                }
            },

            itemtouchstart: function(list, indexParent, target, record, e, eOpts ) {
                var isItem = false;
                var index = null;
                var classList = e.target.classList;

                for (var i = 0, length = classList.length; i < length; i++) {
                    if (classList[i].indexOf('eventItem') >= 0) {
                        isItem = true;
                        index = classList[i].split('-')[1];
                        break;
                    }
                }

                if (isItem) {
                    var classPanel = '.eventItemPanel-' + index;
                    var parentElement = list.getItemAt(indexParent);
                    var panelElement = '';

                    if (Ext.isElement(parentElement)) {
                        parentElement = Ext.get(parentElement);
                    }

                    if (parentElement) {
                        if (parentElement.isComponent) {
                            panelElement = parentElement.renderElement.down(classPanel);
                        } else {
                            panelElement = parentElement.down(classPanel);
                        }
                    }

                    panelElement.addCls('p-phone-common-list-selected');
                }
            },

            itemtouchend: function(list, indexParent, target, record, e, eOpts ) {
                var isItem = false;
                var index = null;
                var classList = e.target.classList;

                for (var i = 0, length = classList.length; i < length; i++) {
                    if (classList[i].indexOf('eventItem') >= 0) {
                        isItem = true;
                        index = classList[i].split('-')[1];
                        break;
                    }
                }

                if (isItem) {
                    var classPanel = '.eventItemPanel-' + index;
                    var parentElement = list.getItemAt(indexParent);
                    var panelElement = '';

                    if (Ext.isElement(parentElement)) {
                        parentElement = Ext.get(parentElement);
                    }

                    if (parentElement) {
                        if (parentElement.isComponent) {
                            panelElement = parentElement.renderElement.down(classPanel);
                        } else {
                            panelElement = parentElement.down(classPanel);
                        }
                    }

                    panelElement.removeCls('p-phone-common-list-selected');
                }
            }
        }
    }
});
