Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.Loader.setPath({
    'Personify': './app'
});

if(!openDatabase) {
	//lets mock openDatabase
	openDatabase = function(name, version, description, size, callback){
		return {
			transaction: {}
		};
	};
}
