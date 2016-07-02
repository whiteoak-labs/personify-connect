(function() {
    var head = document.head;

    function addMeta(name, content) {
        var meta = document.createElement('meta');

        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        head.appendChild(meta);
    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        if (device.model == "Nexus 7") {
            addMeta('viewport', 'width=device-width, initial-scale=1.0, maximun-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi');
        }
    }
})();