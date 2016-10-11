Ext.define('Personify.controller.phone.news.DetailPanel', {
    extend: 'Personify.base.Controller',

    control: {
        sourceDetailPanelPhone: true,
        publicDetailPanelPhone: true,
        shareNewsButton: {
            tap: 'onTapShareNewsButton'
        }
    },
    
    config: {
        record: null,
        feedRecord: null
    },
    
    updateRecord: function(record) {
        if (record) {
            var date = record.get('date');
            if (date) {
                var dateText = Ext.Date.format(date, 'F, j, Y');
                this.getPublicDetailPanelPhone().setHtml('<div class="p-phone-panel-informationofnews">Published: </div>' + dateText);
            }
        }
    },
    
    updateFeedRecord: function(record) {
        if (record) {
            var name = record.get('name');
            this.getSourceDetailPanelPhone().setHtml('<div class="p-phone-panel-informationofnews">Source: </div>' + name);
        }
    },
    
    onTapShareNewsButton: function() {
        var me = this;
        if (window.plugins.socialsharing && window.plugins.socialsharing['shareWithOptions']) {
        	var body = '';
        	var url = '';
        	var data = me.getRecord();
                
        	if (data) {
        		body = data.get('title') + " " + data.get('description');
        		url = data.get('link');
        	}
                
        	var opts = {
        		message: body,
               	url: url
        	};
                
        	window.plugins.socialsharing.shareWithOptions(opts, Ext.emptyFn, Ext.emptyFn);               
        }
    }
});
