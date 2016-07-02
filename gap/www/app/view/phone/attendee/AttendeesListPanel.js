Ext.define('Personify.view.phone.attendee.AttendeesListPanel', {
    extend: 'Ext.Panel',
    xtype: 'attendeeslistpanelphone',
    controller: 'Personify.controller.phone.attendee.AttendeesListPanel',
    requires: [
        'Personify.controller.phone.attendee.AttendeesListPanel',
        'Personify.view.SearchFieldWithSearchKeyBoard'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                html: 'TMA Resources Annual Users Group Conference',
                cls: 'p-phone-panel-sessiontmaresources',
                itemId: 'titleEventOfAttendeesList'
            },
            {
                itemId: 'searchFieldAttendeePhone',
                cls: 'p-phone-search-field',
                xtype: 'searchfieldwithsearchkeyboard',
                placeHolder: 'Search Attendees'
            },
            {
                flex: 1,
                itemId: 'attendeesList',
                xtype: 'list',
                baseCls: 'listNotificationPhone',
                emptyText: '<div class = "p-emptyText-phone">No Attendee</div>',
                deferEmptyText: false,
                pressedCls: 'listNotificationPhone-selected',
                selectedCls: 'listNotificationPhone-selected',
                scrollable: true,
                grouped: true,
                itemCls: 'presenterlistitem',
                itemTpl: new Ext.XTemplate(
                    '<table width="100%">' +
                        '<tr width="100%">' +
                            '<td width="40px" height="40px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="40px" height="40px"/></td>' +
                            '<td width="90%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[this.checkFirstNameNull(values.firstName)]}{[Personify.utils.ItemUtil.checkStringNull(values.lastName)]}</b></p>' +
                                                                          '<p>{[Personify.utils.ItemUtil.checkStringNull(values.employerName)]}</p></td>' +
                        '</tr>' +
                    '</table>',
                    {
                        checkFirstNameNull: function(firstName) {
                            if(firstName == null || firstName == "") {
                                return '';
                            } else {
                                return firstName + ' ';
                            }
                        }
                    }
                )
            }
        ]
    }
});
