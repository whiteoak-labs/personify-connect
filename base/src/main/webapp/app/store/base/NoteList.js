Ext.define('Personify.store.base.NoteList', {
    extend: 'Personify.base.Store',
    requires: 'Personify.proxy.SqliteProxy',
    
    config: {
        model: 'Personify.model.base.Note',
        listeners:{
            beforeload:function(){
                this.onBeforeLoad();
            }
        }
    },
    
    onBeforeLoad:function() {
        var me = this;
        var dataRequest = this.getDataRequest();
        var proxy = {
            type : 'sqliteproxy',
            url: 'aaa',
            jsonData: dataRequest,
            reader: {
                type: 'json'
            }
        };
        me.setProxy(proxy);
    }
});
