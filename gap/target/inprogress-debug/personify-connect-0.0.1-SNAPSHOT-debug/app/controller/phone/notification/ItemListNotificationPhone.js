Ext.define('Personify.controller.phone.notification.ItemListNotificationPhone', {
    extend: 'Personify.base.Controller',

    control: {
        ptoolbarItemListNotificationPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        dateTemplateItemNotificationPhone: true,
        titleTemplateItemNotificationPhone: true,
        descTemplateItemNotificationPhone: true,
        linkTemplateItemNotificationPhone: {
            gotomyorder: 'onGoToMyOrder'
        },
        btnTemplateItemNotificationPhone: {
            tap: 'onTapBtnTemplateItemNotificationPhone'
        }
    },

    init: function() {
        var me = this,
            record = me.getView().getRecord();

        me.getPtoolbarItemListNotificationPhone().getController().setHiddenActionButton(true);
        me.getDateTemplateItemNotificationPhone().setHtml(record.get('startDate'));
        me.getTitleTemplateItemNotificationPhone().setHtml(record.get('description'));
        me.getDescTemplateItemNotificationPhone().setHtml(record.get('descriptionDetails'));
        me.getLinkTemplateItemNotificationPhone().setHtml(record.get('linkLabel'));
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('backToNavigationView', this);
    },

    onTapBtnTemplateItemNotificationPhone: function() {
        var me = this,
            record = me.getView().getRecord(),
            messageId = record.get('messageId');
        Ext.Msg.confirm("", "Are you sure you want to delete ?", processResult);
        function processResult(clickedButton) {
            Ext.Msg.hide();
            if(clickedButton == 'yes') {
                me.getView().fireEvent('deleteItemNotificationPhone', record);
            }
        };
    },

    onGoToMyOrder: function() {
        var record = this.getView().getRecord();
        var link = record.get('hyperLink');
        if (Ext.os.is.Android) {
            window.open(link, '_blank', 'location=yes,enableViewportScale=yes')
        } else {
            window.open(link, '_blank', 'location=no,enableViewportScale=yes')
        }
    }
});
