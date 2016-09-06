Ext.define('Personify.view.phone.directory.DirectoryList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'directorylistphone',
    controller: 'Personify.controller.phone.directory.directorylist.DirectoryList',
    requires: 'Personify.controller.phone.directory.directorylist.DirectoryList',

    config: {
        baseCls: 'listNotificationPhone',
        emptyText: '<div class = "p-emptyText-phone" style = "color: black">No Contact</div>',
        deferEmptyText: false,
        pressedCls: 'listNotificationPhone-selected',
        selectedCls: 'listNotificationPhone-selected',
        scrollable: true,
        scrollToTopOnRefresh: false,
        itemCls: 'directoryphoneitem',
        itemTpl: new Ext.XTemplate(
            '<table width="100%">' +
                '<tr width="100%">' +
                    '<td width="40px" height="40px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="40px" height="40px"/></td>' +
                    '<td width="80%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[this.checkFirstNameNull(values.firstName)]}{[Personify.utils.ItemUtil.checkStringNull(values.lastName)]}</b></p>' +
                                                                  '<p>{[this.checkEmployerNameNull(values.employerName)]}{[Personify.utils.ItemUtil.checkStringNull(values.address)]}</p></td>' +
                    '<td width="40px" style="padding: 0px 10px;"><p>{[this.showMemberIcon(values.isMember)]}</p></td>' +
                '</tr>' +
            '</table>',
            {
                checkFirstNameNull: function(firstName) {
                    if(firstName == null || firstName == "") {
                        return '';
                    } else {
                        return firstName + ' ';
                    }
                },

                checkEmployerNameNull: function(employerName) {
                    if(employerName == null || employerName == "") {
                        return '';
                    } else {
                        return employerName + ', ';
                    }
                },

                showMemberIcon: function(isMember) {
                    if(Personify.utils.Configuration.getCurrentUser().isStaffMember()) {
                        if(isMember == true) {
                            return '<img src="resources/icons/mem-18x.png"  width ="20px" height = "20px"/>';
                        } else {
                            return '';
                        }
                    }
                }
            }
        )
    }
})