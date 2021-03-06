Ext.define('Personify.view.attendee.AttendeesList', {
           extend: 'Ext.dataview.DataView',
           xtype: 'attendeeslist',
           
           config: {
           baseCls: 'materialList',
           emptyText: '<div class = "p-emptyText-phone">No Attendee</div>',
           deferEmptyText: false,
           pressedCls: 'allExhibitorListItemPressed',
           selectedCls: '',
           scrollable: true,
           itemCls: 'allExhibitorListItem',
           //grouped: true,
           scrollToTopOnRefresh: false,
           indexBar: false,//{
           //direction: 'horizontal'
        //},
        deferEmptyText: false,
        emptyText: '<div class="p-presenter-emptyText">No Attendee</div>',
        itemTpl: new Ext.XTemplate(
            '<table width="100%">' +
                '<tr width="100%">' +
                    '<td width="84px" height="86px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="84px" height="86px"/></td>' +
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
});