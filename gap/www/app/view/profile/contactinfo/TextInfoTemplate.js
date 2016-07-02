Ext.define('Personify.view.profile.contactinfo.TextInfoTemplate',{
    extend: 'Ext.dataview.component.DataItem',
    requires:['Ext.field.Text'],
    xtype:'textinfotemplate',
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
        }, Ext.field.Text, this.getNameItem());
    },

    updateNameItem: function(newNameItem, oldNameItem) {
        if (oldNameItem) {
            this.remove(oldNameItem);
        }

        if (newNameItem) {
            this.add(newNameItem);
        }
    },
    setReadOnly:function(value){
    	this.setReadOnly(value);
    }
});