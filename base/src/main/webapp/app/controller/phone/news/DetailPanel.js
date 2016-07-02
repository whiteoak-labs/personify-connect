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
        if (window.plugins.social && window.plugins.social['available']) {
            window.plugins.social.available(function(result) {
                if (result == 1) {
                    var body = '';
                    var url = '';
                    var data = me.getRecord();
                    if (data) {
                        body = data.get('title') + " " + data.get('description');
                        url = data.get('link');
                    }
                    window.plugins.social.share(body, url, '');
                } else {
                    Ext.Msg.alert('', 'Social network plugins is not supported.', Ext.emptyFn);
                }
            });
        }
    }
});
