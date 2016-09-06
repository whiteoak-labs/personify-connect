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
           var ref = null;
        if (Ext.os.is.Android) {
            ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        } else {
            ref = window.open(url, '_blank', 'location=yes,enableViewportScale=yes');
        }
       Personify.utils.BackHandler.pushActionAndTarget('close', ref);
       ref.addEventListener('exit', function() {
        Personify.utils.BackHandler.popActionAndTarget('close', ref);
        });
    }
});