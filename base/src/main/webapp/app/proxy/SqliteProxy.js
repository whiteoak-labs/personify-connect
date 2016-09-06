Ext.define('Personify.proxy.SqliteProxy', {
    extend: 'Ext.data.proxy.Server',
    alias: 'proxy.sqliteproxy',
    
    constructor: function (config) {
        this.callParent(arguments);
    },
    
    doRequest: function(operation, callback, scope) {
        var me = this;
        var request = me.buildRequest(operation);
        var sessionId = me.config.jsonData.sessionId || '';
        var eventId = me.config.jsonData.eventId;
      
        //get data from sqlite
        Personify.utils.Sqlite.getAllNotes(sessionId, eventId, function(rawData) {
            var response = {};
            if (rawData != false) {
                response = rawData;
                me.processResponse(true, operation, request, response, callback, scope);
            } else {
                me.processResponse(false, operation, request, response, callback, scope);
             }
        });
        return request;
    }
});
