Ext.define('Personify.base.Model', {
    extend: 'Ext.data.Model',
    config: {
    },
    
    inheritableStatics: {
        getTypeService: function(){
            return 'jsonp';
        },
        
        load: function(attributes, config, scope) {
            var me =this,
                proxy = me.getProxy(),
                record = null,
                params = {}, callback, operation,
                idProperty = me.getIdProperty(),
                scope = scope || (config && config.scope) || me,
                typeService,
                dataRequests;
                
            if (Ext.isFunction(config)) {
                config = {
                    callback : config,
                    scope : scope
                };
            }
            
            if (!proxy) {
                Ext.Logger.error('You are trying to load a model that doesn\'t have a Proxy specified');
            }
            
            if (attributes.hasOwnProperty('typeService'))
                typeService = attributes.typeService;
            else
                typeService = me.getTypeService();
            
            switch (typeService) {
                case 'odata':
                    dataRequests = proxy.getDataRequests();
                    
                    if (typeof attributes === 'object') {
                        for (var attributeName in attributes) {
                            dataRequests[attributeName] = attributes[attributeName];
                        }
                    }
                    
                    proxy.setDataRequests(dataRequests);
                    break;
                    
                case 'jsonp':
                    if (typeof attributes === 'object') {
                        dataRequests = attributes;
                        proxy.setJsonData(dataRequests);
                    } else {
                        params[idProperty] = attributes;
                    }
                    
                    break;
            }
            
            config = Ext.apply({}, config);
            config = Ext.applyIf(config, {
                action: 'read',
                params: params,
                model: me
            });
            
            operation = Ext.create('Ext.data.Operation', config);
            callback = function(operation) {
                if (operation.wasSuccessful()) {
                    record = operation.getRecords()[0] || null;
                    Ext.callback(config.success, scope, [record, operation]);
                } else {
                    Ext.callback(config.failure, scope, [record, operation]);
                }
                
                Ext.callback(config.callback, scope, [record, operation]);
            };
            
            proxy.read(operation, callback, me);
        } // load function
    } // inheritableStatics
});
