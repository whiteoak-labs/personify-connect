Ext.define('Personify.view.event.events.EventMonthList', {
    extend: 'Ext.dataview.List',
    xtype: 'tableteventmonthlist',

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
                    '<div class = "eventItemIndex-{#}">{[this.isMembersOnly(values.data.membersOnly)]}</div>',
                    '<div class = "eventDay eventItemIndex-{#}">{[Personify.utils.ItemUtil.getDayEventView(Personify.utils.ItemUtil.convertStringToDate(values.data.startDateTimeString))]}</div>',
                    '<div class = "eventMonth  eventItemIndex-{#}">{[Personify.utils.ItemUtil.getMonthEventView(Personify.utils.ItemUtil.convertStringToDate(values.data.startDateTimeString))]}</div>',
                    '<div style = "-webkit-box-pack: end; -webkit-box-flex: 1.0; display: -webkit-box; -webkit-box-orient: vertical;">',
                    '<div class = "{[Personify.utils.ItemUtil.getMeetingTagCls(values.data.meetingTag)]} eventItemIndex-{#}">{[Personify.utils.ItemUtil.getMeetingTag(values.data.meetingTag)]}</div>',
                    '</div>',
                '</div>',
                '<div class = "eventItemContent eventItemIndex-{#}" style = "-webkit-box-flex: 1.0;">',
                    '<div class = "eventItemIndex-{#}">{[Personify.utils.ItemUtil.getDisplaysTimeWithTimeZoneCode(values.data)]}</div>',
                    '<div class = "eventSummary eventItemIndex-{#}">{[this.displayName(values.data.shortName)]}</div>',
                    '<div class = "locationEvent eventItemIndex-{#}">',
                        '<div class = "eventItemIndex-{#}">{[Personify.utils.ItemUtil.getTypeOfEvent(values.data.eventType)]}</div>',
                        '<div class = "p-text-registered eventItemIndex-{#}" style = "float: right">{[this.isRegistered(values.data.registered)]}</div>',
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

                isRegistered: function(registered) {
                    if (registered) {
                        return 'Registered';
                    } else {
                        return '';
                    }
                },

                isMembersOnly: function(membersOnly) {
                    if (membersOnly == false) {
                        return '';
                    } else {
                        return '<div class = "eventStatus">Member Only</div>';
                    }
                },

                getTypeOfEvent: function(record) {
                    var isConference = record.isConference;
                    var EventType = record.eventType;
                    if (!isConference) {
                        if (EventType == "M") {
                            return 'Meeting';
                        } else if (EventType == "S") {
                            return 'Session';
                        } else
                            return 'Conference';
                    } else
                        return 'Conference';
                }
            }
        ),
        listeners: {
            itemtap: function(list, index, target, record, e, eOpts) {
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
                    this.fireEvent('eventitemtap', record.get('events')[index - 1]);
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
