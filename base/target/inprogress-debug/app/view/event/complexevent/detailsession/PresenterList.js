Ext.define('Personify.view.event.complexevent.detailsession.PresenterList', {
    extend: 'Ext.Container',
    xtype: 'presenterlistdetail',
    requires: [
        'Personify.controller.event.complexevent.detailsession.PresenterList',
        'Personify.view.event.complexevent.detailsession.PresenterListTemplate'
    ],

    controller: 'Personify.controller.event.complexevent.detailsession.PresenterList',

    config: {
        layout: 'vbox',
        cls: 'presenterlistdetail',
        meetingRecord: null,
        items: [
            {
                flex: 1,
                itemId: 'listSessionPresenter',
                xtype: 'list',
                cls: 'p-list-presentersession',
                pressedCls: 'p-list-pressed-presentersession',
                selectedCls: 'p-list-pressed-presentersession',
                grouped: true,
                indexBar: {
                    direction: 'horizontal'
                },
                emptyText: '<div class="p-presenter-emptyText">No Presenter</div>',
                itemCls: 'listSessionPresenterItems',
                itemTpl:  null
            }
        ]
    },

    initialize: function() {
        var template = Ext.create('Personify.view.event.complexevent.detailsession.PresenterListTemplate');
        this.down("#listSessionPresenter").setItemTpl (new Ext.XTemplate(template.element.dom.innerHTML, {
                    checkTitleNull: function(jobTitle) {
                        if(jobTitle == null || jobTitle == "") {
                            return '';
                        } else {
                            return 'Title: ' + '<b>' + jobTitle + '</b>';
                        }
                    }
                }));

        this.callParent(arguments);
        template.destroy();
    }
});