Ext.define('Personify.view.exhibitor.AboutExhibitorPanel', {
    extend: 'Ext.Panel',
    xtype: 'aboutExhibitorPanel',
    requires: 'Personify.view.exhibitor.AboutExhibitorItem',

    config: {
        cls: 'productExhibitorItem',
        record: null,
        scrollable: true,
        flex: 1,
        tpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.exhibitor.AboutExhibitorItem');
        this.setTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});