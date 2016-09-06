Ext.define('Personify.view.exhibitor.ExhibitorList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'allExhibitorList',

    config: {
        baseCls: 'materialList',
        pressedCls: 'allExhibitorListItemPressed',
        selectedCls: '',
        itemCls: 'allExhibitorListItem',
        scrollable: true,
        scrollToTopOnRefresh: false,
        //grouped: true,
        indexBar: false,//{
        //   direction: 'horizontal'
        //},
        deferEmptyText: false,        
        emptyText: '<div class="p-presenter-emptyText">No Exhibitor</div>',
        itemTpl: new Ext.XTemplate(
            '<table width="100%">' +
                '<tr width="100%">' +
                    '<td width="84px" height="86px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="84px" height="86px"/></td>' +
                    '<td width="70%" class="cont-allExhibitorList"><p style="margin-bottom: 5px;"><b>{[Personify.utils.ItemUtil.checkStringNull(values.name)]}</b></p>' +
                                                                  '{[this.checkBoothNull(values.boothNos)]}' +
                                                                  '<p>{[Personify.utils.ItemUtil.checkStringNull(values.webSiteURL)]}</p></td>' +
                    '<td width="20%" "align="center"><button width="100px" class="{[this.changeButtonCls(values.isAdded)]}">{[this.changeButtonText(values.isAdded)]}</button></td>' +
                '</tr>' +
            '</table>',
            {
                checkBoothNull: function(boothNos) {
                    if(boothNos == null || boothNos == "") {
                        return '';
                    } else {
                        return '<p>Booth: ' + '<b>' + boothNos + '</b></p>';
                    }
                },

                changeButtonCls: function(isAdded) {
                    if(isAdded) {
                        return 'p-button-red-inlist-exhibitor';
                    } else {
                        return 'p-button-blue-inlist-exhibitor';
                    }
                },

                changeButtonText: function(isAdded) {
                    if(isAdded) {
                        return 'Remove Exhibitor';
                    } else {
                        return 'Add Exhibitor';
                    }
                }
            }
        ),

        listeners: {
            itemtap: function(me, index, target, record, e, eOpts) {
                if(e.target.className.indexOf('button') >= 0) {
                    me.fireEvent('onTapBtnDelProductAllExhibitor', record);
                } else {
                    me.fireEvent('tapAllExhibitorItem', me, index, target, record, e, eOpts);
                }
            },

            itemtouchstart: function(dataview, index, target, record, e, eOpts) {
                if(e.target.className.indexOf('button') < 0) {
                    target.addCls('allExhibitorListItemPressed');
                }
            },

            itemtouchend: function(dataview, index, target, record, e, eOpts) {
                target.removeCls('allExhibitorListItemPressed');
            }
        }
    }
});