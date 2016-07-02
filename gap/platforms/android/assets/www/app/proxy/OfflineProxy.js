Ext.define('Personify.proxy.OfflineProxy', {
    extend: 'Ext.data.proxy.Server',
    alias: 'proxy.offlineproxy',
    
    constructor: function (config) {
        this.callParent(arguments);
    },
    
    doRequest: function(operation, callback, scope) {
        var me = this;
        var url = me.config.url;
        var dataRequest = JSON.stringify(me.config.jsonData);
        var request = me.buildRequest(operation);
      
        //get data from sqlite
        Personify.utils.Sqlite.getTableData(url, dataRequest, function(rawData) {
            var response = {};
            if (typeof(rawData) == 'string') {
                response = Ext.decode(rawData);
                me.processResponse(true, operation, request, response, callback, scope);
            } else {
                me.processResponse(false, operation, request, response, callback, scope);
             }
        });
        return request;
    }
});
