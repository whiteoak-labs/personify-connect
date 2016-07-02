Ext.define('Personify.controller.profile.WebsiteList', {
    extend: 'Personify.base.Controller',
    control: {
        view: {
            itemtap: 'onItemTapWebsiteList'
        }
    },
    
    onItemTapWebsiteList: function(listView, index, target, record, e, eOpts) {
        var url = record.getData().value.toLowerCase();
        if ((url.indexOf('http://') !== 0) && (url.indexOf('https://') !== 0)) {
            url = "http://" + url;
        }
        if (Ext.os.is.Android) {
            window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            window.open(url, '_blank', 'location=no,enableViewportScale=yes');
        }
    }
});