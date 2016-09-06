Ext.define('Personify.view.presenter.PresenterList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'presenterlist',

    config: {
        baseCls: 'materialList',
        pressedCls: 'allExhibitorListItemPressed',
        selectedCls: '',
        itemCls: 'allExhibitorListItem',
        scrollable: true,
        scrollToTopOnRefresh: false,
        //grouped: true,
        indexBar: false,//{
        //    direction: 'horizontal'
        //},
        deferEmptyText: false,
        emptyText: '<div class="p-presenter-emptyText">No Presenter</div>',
        itemTpl: new Ext.XTemplate(
            '<table width="100%">' +
                '<tr width="100%">' +
                    '<td width="84px" height="86px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="84px" height="86px"/></td>' +
                    '<td width="90%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[Personify.utils.ItemUtil.checkStringNull(values.name)]}</b></p>' +
                                                                  '<p>{[this.checkTitleNull(values.jobTitle)]}</p></td>' +
                '</tr>' +
            '</table>',
            {
                checkTitleNull: function(jobTitle) {
                    if(jobTitle == null || jobTitle == "") {
                        return '';
                    } else {
                        return 'Title: ' + '<b>' + jobTitle + '</b>';
                    }
                }
            }
        )
    }
});
