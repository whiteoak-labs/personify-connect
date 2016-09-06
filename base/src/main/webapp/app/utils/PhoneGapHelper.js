Ext.define('Personify.utils.PhoneGapHelper', {
    alias : 'PhoneGapHelper',
    singleton : true,

    config: {
        isonline: null
    },

    isOnLine: function() {
        return navigator.onLine;
    },

    addEventListener: function(event, callback) {
        document.addEventListener(event, callback, false);
    },

    checkConnection: function() {
        if (this.getIsonline() == null) {
            this.setIsonline(this.isOnLine());
        }
           return this.getIsonline();
    },

    listenerConnection: function() {
        var me = this;
        if (me.checkConnection() == false) {
            Personify.utils.ServiceManager.updateManager('offline');
        }
        window.addEventListener("online", me.callbackFn(me, me.onOnLine), false);
        window.addEventListener("offline", me.callbackFn(me, me.onOffLine), false);
    },

    callbackFn: function(scope,fn){
        return function () {
            fn.apply(scope, arguments);
        };
    },

    onOnLine: function() {
        this.setIsonline(true);
        Personify.utils.ServiceManager.updateManager('json');
    },

    onOffLine: function() {
        this.setIsonline(false);
        Personify.utils.ServiceManager.updateManager('offline');
        var loadMask = Ext.ComponentQuery.query('loadmask');
        for (var i = 0; i < loadMask.length; i++) {
            loadMask[i].destroy();
        }
    },

    downloadFile: function(fileName, url, callback) {
        var me = this;
        var onFail = function(error) {
            console.log("Download file error: " +  error);
        };
        var onFileSystemSuccess = function(fileSystem) {
           // alert("hererer");
			var extendFile = url.substring(url.lastIndexOf('.'));
		//	alert("hererer222");
          //  var reader = new FileReader();
          //  reader.onloadend = function(evt) {
		//	alert("333333");
               // if (evt.target.result == null) {
                    fileSystem.root.getFile(fileName, {create : true, exclusive: false},
                function(fileEntry) {
				//alert("4444444");
                    //var msgAlert = Ext.Msg.alert('File download', 'Downloading ...', Ext.emptyFn);
                    var path = fileEntry.toURL().replace(fileName, "");
                    fileEntry.remove();
                    path = path + fileName;// + extendFile;
                    var fileTransfer = new FileTransfer();
                    fileTransfer.download(
                        encodeURI(url),
                        path,
                        function(file) {
                            if (typeof callback == 'function') {
                                //msgAlert.hide();
                                callback(path);
                            }
                        },
                        function(error) {
                           callback();
                           Ext.Msg.alert('File download', 'File download failed', Ext.emptyFn);
                           console.log("Download error: " + error);
                        }
                    );
                }, onFail);
                //} else {
                    callback(fileSystem.root.toURL() + "/" + fileName);
                //}
            //};
           // reader.readAsDataURL(fileSystem.root.toURL() + "/" + fileName);
        };

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFail);
    },

    isFileExists: function(path, callback) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            if (evt.target.result == null) {
                if (callback) {
                    callback(false);
                }
            } else {
                if (callback) {
                    callback(true);
                }
            }
        };
        reader.readAsDataURL(path);
    },

    writeFile: function(filePath, content) {
        var gotFileSystem = function(fileSystem) {
            fileSystem.root.getFile(filePath, {create: true, exclusive: false}, gotFileEntry, onFail);
        };
        var gotFileEntry = function(fileEntry) {
            fileEntry.createWriter(function(writer) {
                writer.write(content);
            }, onFail);
        };
        var onFail = function() {

        };
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, onFail);
    },

    downloadQueue: function(items) {
        var me = this;
        if (items['url'].length > 0) {
            var url = items['url'][0];
            var fileName = items['uuid'][0];
            var name = url.substring(url.lastIndexOf('/'));
            me.downloadFile(fileName, url, function(path) {
                Personify.utils.Sqlite.insertTableImage(url, name, fileName);
                items['url'] = items['url'].slice(1, items['url'].length - 1);
                items['uuid'] = items['uuid'].slice(1, items['uuid'].length - 1);
                downloadQueue(items);
            });
        }
    },

    randomUUID: function() {
        var s = [], itoh = '0123456789ABCDEF';

        // Make array of random hex digits. The UUID only has 32 digits in it, but we
        // allocate an extra items to make room for the '-'s we'll be inserting.
        for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);

        // Conform to RFC-4122, section 4.4
        s[14] = 4;  // Set 4 high bits of time_high field to version
        s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence

        // Convert to hex chars
        for (var i = 0; i <36; i++) s[i] = itoh[s[i]];

        // Insert '-'s
        s[8] = s[13] = s[18] = s[23] = '-';

        return s.join('');
    },

    downloadMapImage: function(mapData) {
        var arrayPromise = [];
        for (var i = 0, length = mapData.maps.length; i < length; i++) {
            var item = mapData.maps[i];
            var imageUrl = item.image;

            if (imageUrl.indexOf('http://') == 0 || imageUrl.indexOf('https://') == 0) {
                var promise = function(imageUrl, item) {
                    var deferred = Ext.create('Deft.promise.Deferred');
                    Personify.utils.PhoneGapHelper.checkMapImage(imageUrl, item, deferred);
                    return deferred.promise;
                };
                arrayPromise.push(promise(imageUrl, item));
            }
        }

        Deft.Promise.all(arrayPromise).then({
            success: function() {

            },
            failure: function() {

            }
        });
    },

    checkMapImage: function(imageUrl, item, deferred) {
        var rootDirectory = "PersonifyCaches/";
        Personify.utils.Sqlite.getTableImage(imageUrl, function(imageData) {
            if (imageData.length > 0) {//downloaded
                var onFileSystemSuccess = function (fileSystem) {
                    item.image = fileSystem.root.fullPath + "/" + rootDirectory + imageData[0].name;
                    deferred.resolve();
                };
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, Ext.emptyFn);
            } else {
                var extendFile = imageUrl.substring(imageUrl.lastIndexOf('.'));
                var fileName = Personify.utils.PhoneGapHelper.randomUUID() + extendFile;
                var path = rootDirectory + fileName;
                Personify.utils.PhoneGapHelper.downloadFile(path, imageUrl, function(filePath) {
                    Personify.utils.Sqlite.insertTableImage(imageUrl, fileName, '');
                    item.image = filePath;
                    deferred.resolve();
                });
            }
        });
    }
});
