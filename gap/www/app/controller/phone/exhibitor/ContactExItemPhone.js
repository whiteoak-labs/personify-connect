Ext.define('Personify.controller.phone.exhibitor.ContactExItemPhone', {
    extend: 'Personify.base.Controller',

    control: {
        ptoolbarContactExhibitor: {
            onNavigationButtonTap: 'onTapNavigationButton'
        }
    },

    init: function() {
        var me = this;
        me.callParent(arguments);
        me.getPtoolbarContactExhibitor().getController().setHiddenActionButton(true);
    },

    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    }
});