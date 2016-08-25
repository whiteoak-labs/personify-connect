cordova.define("net.dynagility.personify.social", function(require, exports, module) { //
//  social.js
//
//  Cameron Lerch
//  Sponsored by Brightflock: http://brightflock.com
//

function Social() {
};

Social.prototype.available = function(callback) {
    cordova.exec(callback, null, "Social", "available", []);
};

Social.prototype.share = function(message, url, image) {
    cordova.exec(null, null, "Social", "share", [message, image, url]);
};
    
Social.install = function() {
    if (!window.plugins) {
        window.plugins = {};	
    }

    window.plugins.social = new Social();
    return window.plugins.social;
};

cordova.addConstructor(Social.install);

});
