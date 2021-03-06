Ext.define('Personify.view.event.complexevent.notes.NoteList', {
    extend: 'Ext.dataview.List',
    xtype: 'notelist',
    requires: [
        'Personify.store.base.Note',
        'Personify.view.event.complexevent.notes.NoteItem'
    ],

    config: {
        cls: 'notelist',
        itemCls: 'notelistitem',
        
        deferEmptyText: false,
        emptyText: '',
        store: null,
        itemTpl: null
    },

    initialize: function() {
        var template = Ext.create('Personify.view.event.complexevent.notes.NoteItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML));
        this.callParent(arguments);
        template.destroy();
    }
});
