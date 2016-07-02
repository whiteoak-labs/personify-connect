Ext.define('Personify.proxy.RestService', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.restservice',
    
    config: {
        // disable paging and caching params
        enablePagingParams: false,
        noCache: false,
        
        /**
         * @cfg {Boolean} appendId
         * True to automatically append the ID of a Model instance when performing a request based on that single instance.
         * See Rest proxy intro docs for more details. Defaults to true.
         */
        appendId: true,
        /**
         * @cfg {String} format
         * Optional data format to send to the server when making any request (e.g. 'json'). See the Rest proxy intro docs
         * for full details. Defaults to null.
         */
        format: null,

        jsonData: null,
        /**
         * @cfg {Boolean} batchActions
         * True to batch actions of a particular type when synchronizing the store. Defaults to false.
         */
        batchActions: false,

        timeout: 30000,
        
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'PUT',
            destroy: 'DELETE'
        }
    },

    /**
     * Specialized version of buildUrl that incorporates the {@link #appendId} and {@link #format} options into the
     * generated url. Override this to provide further customizations, but remember to call the superclass buildUrl so
     * that additional parameters like the cache buster string are appended.
     * @param {Object} request
     */
    buildUrl: function(request) {
        var me        = this,
            operation = request.getOperation(),
            records   = operation.getRecords() || [],
            record    = records[0],
            model     = me.getModel(),
            idProperty= model.getIdProperty(),
            format    = me.getFormat(),
            url       = me.getUrl(request),
            params    = request.getParams() || {},
            id        = (record && !record.phantom) ? record.getId() : params[idProperty];

        if (me.getAppendId() && id) {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            url += id;
            delete params[idProperty];
        }

        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }

            url += format;
        }

        request.setUrl(url);

        return me.callParent([request]);
    },
    
    /**
     * Performs Ajax request.
     * @protected
     */
    doRequest: function(operation, callback, scope) {
        var me = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            jsonData = this.getJsonData();

        request.setConfig({
            headers  : me.getHeaders(),
            timeout  : me.getTimeout(),
            method   : me.getMethod(request),
            callback : me.createRequestCallback(request, operation, callback, scope),
            scope    : me,
            proxy    : me,
            jsonData: jsonData
        });

        if (operation.getWithCredentials() || me.getWithCredentials()) {
            request.setWithCredentials(true);
            request.setUsername(me.getUserName());
            request.setPassword(me.getPassword());
        }
        
        // We now always have the writer prepare the request
        request = writer.write(request);

        Ext.Ajax.request(request.getCurrentConfig());

        return request;
    },
    
    /**
     * This method handles the processing of the response and is usually overridden by subclasses to
     * do additional processing.
     * @param {Boolean} success Wether or not this request was successful
     * @param {Ext.data.Operation} operation The operation we made this request for
     * @param {Ext.data.Request} request The request that was made
     * @param {Object} response The response that we got
     * @param {Function} callback The callback to be fired onces the response is processed
     * @param {Object} scope The scope in which we call the callback
     * @protected
     */
    processResponse: function(success, operation, request, response, callback, scope) {
        var me = this,
            action = operation.getAction(),
            reader, resultSet;

        if (success === true) {
            reader = me.getReader();
            //var objImageUrl = me.browseImageUrlInObject([], Ext.decode(response.responseText));
            //Personify.utils.PhoneGapHelper.downloadQueue(objImageUrl.array);
            me.executeSql(request, response);

            try {
                resultSet = reader.process(response);
            } catch(e) {
                operation.setException(e.message);

                me.fireEvent('exception', this, response, operation);
                return;
            }

            // This could happen if the model was configured using metaData
            if (!operation.getModel()) {
                operation.setModel(this.getModel());
            }

            if (operation.process(action, resultSet, request, response) === false) {
                this.fireEvent('exception', this, response, operation);
            }
        } else {
            me.setException(operation, response);
            /**
             * @event exception
             * Fires when the server returns an exception
             * @param {Ext.data.proxy.Proxy} this
             * @param {Object} response The response from the AJAX request
             * @param {Ext.data.Operation} operation The operation that triggered request
             */
            me.fireEvent('exception', this, response, operation);
        }

        //this callback is the one that was passed to the 'read' or 'write' function above
        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }

        me.afterRequest(request, success);
    },
    
    executeSql: function(request, response) {
        var jsonData = JSON.stringify(request.getJsonData());
        var url = request.getUrl();
        var data = response.responseText;
        Personify.utils.Sqlite.insertTableData(jsonData, url, data);
    },
    
    browseImageUrlInObject: function(array, obj) {
        var me = this;
        for (var key in obj) {
            if (typeof(key) == "object") {
                me.browseImageUrlInObject(array, obj[key]);
            } else {
                if (key == "imageURL") {
                    var temp = obj[key];
                    Personify.utils.Sqlite.getTableImage(temp, function(res) {
                        if (res.rows.length == 0) {
                            //download image
                            var uuid = Personify.utils.PhoneGapHelper.randomUUID();
                            array['url'].push(temp);
                            array['uuid'].push(uuid);
                            //update later
                            obj[key] = 'data\\resources\\' + uuid + temp.substring(temp.lastIndexOf('.'));
                        }
                    });
                }
            }
        }
        return {
            'array': array,
            'obj': obj
        };
    }
});