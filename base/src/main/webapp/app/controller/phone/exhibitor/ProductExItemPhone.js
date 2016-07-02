Ext.define('Personify.controller.phone.exhibitor.ProductExItemPhone', {
    extend: 'Personify.base.Controller',

    control: {
        ptoolbarProductExhibitor: {
            onNavigationButtonTap: 'onTapNavigationButton'
        }
    },

    init: function() {
        var me = this;
        me.callParent(arguments);
        me.getPtoolbarProductExhibitor().getController().setHiddenActionButton(true);
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    }
});