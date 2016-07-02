Ext.define('Personify.view.phone.presenter.PresenterListPanel', {
    extend: 'Ext.Panel',
    xtype: 'presenterlistpanelphone',
    controller: 'Personify.controller.phone.presenter.PresenterListPanel',
    requires: [
        'Personify.controller.phone.presenter.PresenterListPanel',
        'Personify.view.SearchFieldWithSearchKeyBoard'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        items: [
            {
                itemId: 'searchFieldPresenterPhone',
                cls: 'p-phone-search-field',
                xtype: 'searchfieldwithsearchkeyboard',
                placeHolder: 'Search Presenters'
            },
            {
                flex: 1,
                itemId: 'presenterList',
                xtype: 'list',
                baseCls: 'listNotificationPhone',
                emptyText: '<div class = "p-emptyText-phone">No Presenter</div>',
                deferEmptyText: false,
                pressedCls: 'listNotificationPhone-selected',
                selectedCls: 'listNotificationPhone-selected',
                scrollable: true,
                itemCls: 'presenterlistitem',
                grouped: true,
                itemTpl: new Ext.XTemplate(
                    '<table width="100%">' +
                        '<tr width="100%">' +
                            '<td width="40px" height="40px" class="img-allExhibitorList"><img src="{[Personify.utils.ItemUtil.displayImage(values.imageURL)]}" width="40px" height="40px"/></td>' +
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
        ]
    }
});
