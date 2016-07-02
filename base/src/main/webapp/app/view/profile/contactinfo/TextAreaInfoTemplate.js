Ext.define('Personify.view.profile.contactinfo.TextAreaInfoTemplate',{
    extend: 'Ext.dataview.component.DataItem',
    requires:['Ext.field.TextArea'],
    xtype:'textareainfotemplate',
    readOnly:true,
    config: {
           nameItem: true,
        /* Config for components item*/
        dataMap: {
            getNameItem: {
                setLabel: 'title',
                setPlaceHolder:'placeholder',
                setValue:'value',
                setRequired:'require'
            }
        }
    },

    applyNameItem: function(config) {
        return Ext.factory({
                readOnly:true
            }, 
            'Ext.field.TextArea',
            this.getNameItem()
        );
    },

    updateNameItem: function(newNameItem, oldNameItem) {
        if (oldNameItem) {
            this.remove(oldNameItem);
        }

        if (newNameItem) {
            this.add(newNameItem);
        }
    }
});