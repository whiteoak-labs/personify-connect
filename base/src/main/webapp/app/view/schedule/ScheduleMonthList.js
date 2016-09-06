Ext.define('Personify.view.schedule.ScheduleMonthList', {
    extend: 'Ext.dataview.List',
    xtype: 'tabletschedulemonthlist',

    config: {
        baseCls: 'selectedFieldButtonNews',
        scrollToTopOnRefresh: false,
        itemTpl: new Ext.XTemplate(
            '<tpl if = "expanded">',
            '<div class = "p-filter-button-new-enabled">{[this.formatMonth(values.month, values.year)]}',
            '</div>',
            '<tpl for = "events">',
            '<div class = "eventItems eventItemPanel-{#}" style = "width: 100%; float: left; background: none; padding-bottom: 3px; display: -webkit-box;">',
                '<div class = "dayInfoPanel" style = "display: -webkit-box; -webkit-box-orient: vertical;">',
                    '<div class = "eventDay eventItemIndex-{#}">{[Personify.utils.ItemUtil.getDayEventView(values.data.startDateTime)]}</div>',
                    '<div class = "eventMonth  eventItemIndex-{#}">{[Personify.utils.ItemUtil.getMonthEventView(values.data.startDateTime)]}</div>',
                    '<div style = "-webkit-box-pack: end; -webkit-box-flex: 1.0; display: -webkit-box; -webkit-box-orient: vertical;">',
                        '<div class = "eventStatus eventItemIndex-{#}">{[this.getType(values.data)]}</div>',
                    '</div>',
                '</div>',
                '<div class = "eventItemContent eventItemIndex-{#}" style = "-webkit-box-flex: 1.0;">',
                    '<div class = "eventItemIndex-{#}">{[Personify.utils.ItemUtil.getDisplayTimeForEvent(values.data.startDateTimeString, values.data.endDateTimeString)]}</div>',
                    '<div class = "eventSummary eventItemIndex-{#}">{[this.displayName(values.data.title)]}</div>',
                    '<div class = "locationEvent eventItemIndex-{#}">',
                        '<div class = "eventLocation eventItemIndex-{#}">{[this.displayName(values.data.location)]}</div>',
                            '<div style="float:right" class="x-button-normal x-button p-phone-button-removeschedule removebutton-{#} eventItemIndex-{#}">',
                            '<span class="x-button-label removebutton-{#} eventItemIndex-{#}">Remove</span>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '</tpl>',
            '<tpl else>',
                '<div class = "p-filter-button-new">{[this.formatMonth(values.month, values.year)]}',
                '</div>',
            '</tpl>',
            {
                displayName: function(shortName) {
                    return shortName;
                },

                formatMonth: function(month, year) {
                    var d = new Date('01/01/2013');
                    d.setFullYear(year);
                    d.setMonth(month);
                    return Ext.Date.format(d, 'F, Y');
                },

                isMembersOnly: function(membersOnly) {
                    if (membersOnly == false) {
                        return '';
                    } else {
                        return '<div class = "eventStatus">Member Only</div>';
                    }
                },

                getType: function(values) {
                    var type = values.type;
                    var meetingId = values.meetingId;
                    var sessionID = values.sessionID;

                    if (type.toUpperCase() == 'PERSONAL') {
                        return "PERSONAL ";
                    } else {
                        if (sessionID && sessionID != 0) {
                            return "SESSION ";
                        } else {
                            return "MEETING";
                        }
                    }
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
                    if (classList[i].indexOf('eventItemIndex') >= 0) {
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
                    this.fireEvent('eventitemlistselect', record.get('events')[index - 1]);
                } else if (isButton) {
                    this.fireEvent('removeagenda', record.get('events')[index -1]);
                } else {
                    record.set('expanded', !record.get('expanded'));
                }
            },

            itemtouchstart: function(list, indexParent, target, record, e, eOpts ) {
                var isItem = false;
                var index = null;
                var classList = e.target.classList;

                for (var i = 0, length = classList.length; i < length; i++) {
                    if (classList[i].indexOf('eventItemIndex') >= 0) {
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

                    panelElement.addCls('p-dataview-pressed');
                }
            },

            itemtouchend: function(list, indexParent, target, record, e, eOpts ) {
                var isItem = false;
                var index = null;
                var classList = e.target.classList;

                for (var i = 0, length = classList.length; i < length; i++) {
                    if (classList[i].indexOf('eventItemIndex') >= 0) {
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

                    panelElement.removeCls('p-dataview-pressed');
                }
            }
        }
    }
});
