Ext.define('Personify.view.directory.directorylist.DirectoryList', {
    extend : 'Ext.dataview.DataView',
    xtype : 'directorylist',
    controller: 'Personify.controller.directory.DirectoryList',
    requires: 'Personify.controller.directory.DirectoryList',
    config : {
        baseCls: 'p-list-directorylist',
        pressedCls: 'p-list-directorylist-pressed',
        selectedCls: 'p-list-directorylist-select',
        deferEmptyText: false,
        emptyText: '<div class="p-presenter-emptyText">No Name</div>',
        scrollable: true,
        scrollToTopOnRefresh: false,
        itemTpl: new Ext.XTemplate(
            '<table width="100%">' +
                '<tr width="100%">' +
                    '<td class="p-image-imgDirectoryList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="60px" height="60px"/></td>' +
                    '<td width="70%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[this.checkFirstNameNull(values.firstName)]}{[Personify.utils.ItemUtil.checkStringNull(values.lastName)]}</b></p>' +
                                                                  '<p>{[this.checkEmployerNameNull(values.employerName)]}{[Personify.utils.ItemUtil.checkStringNull(values.address)]}</p></td>' +
                    '<td width="40px" style="padding: 0px 10px;">{[this.showMemberIcon(values.isMember)]}</td>' +
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
});