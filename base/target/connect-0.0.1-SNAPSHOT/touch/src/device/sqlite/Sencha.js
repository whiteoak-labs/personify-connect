Ext.define("Ext.device.sqlite.Sencha",{openDatabase:function(b){if(b.name==null){Ext.Logger.error("Ext.device.SQLite#openDatabase: You must specify a `name` of the database.");return null}if(b.version==null){Ext.Logger.error("Ext.device.SQLite#openDatabase: You must specify a `version` of the database.");return null}if(b.displayName==null){Ext.Logger.error("Ext.device.SQLite#openDatabase: You must specify a `displayName` of the database.");return null}if(b.estimatedSize==null){Ext.Logger.error("Ext.device.SQLite#openDatabase: You must specify a `estimatedSize` of the database.");return null}var c=null;var a=Ext.device.Communicator.send({command:"SQLite#openDatabase",sync:true,name:b.name,version:b.version,displayName:b.displayName,estimatedSize:b.estimatedSize,callbacks:{creationCallback:!b.creationCallback?null:function(){b.creationCallback.call(b.scope||this,c)}},scope:b.scope||this});if(a){if(a.error){Ext.Logger.error(a.error);return null}c=Ext.create("Ext.device.sqlite.Database",a.id,a.version);return c}return null}},function(){Ext.define("Ext.device.sqlite.Database",{id:0,version:null,constructor:function(b,a){this.id=b;this.version=a},getVersion:function(){return Ext.device.Communicator.send({command:"SQLite#getVersion",sync:true,databaseId:this.id})},transaction:function(a){if(!a.callback){Ext.Logger.error("Ext.device.sqlite.Database#transaction: You must specify a `callback` callback.");return null}var b=this;Ext.device.Communicator.send({command:"SQLite#createTransaction",databaseId:this.id,readOnly:a.readOnly,callbacks:{success:function(c){var d=null;var j=null;var f=Ext.create("Ext.device.sqlite.SQLTransaction",c);j=Ext.device.Communicator.send({command:"SQLite#beginTransaction",sync:true,transactionId:f.id});if(!j&&a.preflight){j=a.preflight.call(a.scope||this)}if(!j){try{f.active=true;a.callback.call(a.scope||this,f)}catch(h){d=h}finally{f.active=false}}var g=f.statements;while(!(d||j)&&g.length>0){var i=g.shift();var l=Ext.device.Communicator.send({command:"SQLite#executeStatement",sync:true,transactionId:f.id,databaseId:b.id,version:b.version,sqlStatement:i.sqlStatement,arguments:JSON.stringify(i.arguments)});if(l){if(l.error){j=l.error}else{if(i.callback){var k=Ext.create("Ext.device.sqlite.SQLResultSet",l);try{f.active=true;i.callback.call(i.scope||this,f,k)}catch(h){d=h}finally{f.active=false}}}}if(j&&i.failure){try{f.active=true;if(!i.failure.call(i.scope||this,f,j)){j=null}}catch(h){d=h}finally{f.active=false}}}if(!(d||j)){j=Ext.device.Communicator.send({command:"SQLite#commitTransaction",sync:true,transactionId:f.id});if(!j){if(a.postflight){a.postflight.call(a.scope||this)}if(a.success){a.success.call(a.scope||this)}}}if(d||j){g.splice(0,g.length);Ext.device.Communicator.send({command:"SQLite#rollbackTransaction",sync:true,transactionId:f.id});if(d){throw d}else{if(a.failure){a.failure.call(a.scope||this,j)}}}},failure:function(c){if(a.failure){a.failure.call(a.scope||this,c)}}},scope:a.scope||this})},readTransaction:function(a){this.transaction(Ext.apply(a,{readOnly:true}))},changeVersion:function(a){if(a.oldVersion==null){Ext.Logger.error("Ext.device.SQLite#changeVersion: You must specify an `oldVersion` of the database.");return null}if(a.newVersion==null){Ext.Logger.error("Ext.device.SQLite#changeVersion: You must specify a `newVersion` of the database.");return null}this.transaction(Ext.apply(a,{preflight:function(){return a.oldVersion==this.getVersion()?null:"Unable to change version: version mismatch"},postflight:function(){var b=Ext.device.Communicator.send({command:"SQLite#setVersion",sync:true,databaseId:this.id,version:a.newVersion});if(b){this.version=a.newVersion}}}))}},function(){Ext.define("Ext.device.sqlite.SQLTransaction",{id:0,active:false,statements:null,constructor:function(a){this.id=a;this.statements=new Array()},executeSql:function(a){if(!this.active){Ext.Logger.error("Ext.device.sqlite.SQLTransaction#executeSql: An attempt was made to use a SQLTransaction that is no longer usable.");return null}if(a.sqlStatement==null){Ext.Logger.error("Ext.device.sqlite.SQLTransaction#executeSql: You must specify a `sqlStatement` for the transaction.");return null}this.statements.push({sqlStatement:a.sqlStatement,arguments:a.arguments,callback:a.callback,failure:a.failure,scope:a.scope})}},function(){Ext.define("Ext.device.sqlite.SQLResultSet",{insertId:0,rowsAffected:0,rows:null,constructor:function(a){this.insertId=a.insertId;this.rowsAffected=a.rowsAffected;this.rows=Ext.create("Ext.device.sqlite.SQLResultSetRowList",a)},getInsertId:function(){if(this.insertId!=0){return this.insertId}else{Ext.Logger.error("Ext.device.sqlite.SQLResultSet#getInsertId: An SQLTransaction did not insert a row.");return null}},getRowsAffected:function(){return this.rowsAffected},getRows:function(){return this.rows}},function(){Ext.define("Ext.device.sqlite.SQLResultSetRowList",{names:null,rows:null,constructor:function(a){this.names=a.names;this.rows=a.rows},getLength:function(){return this.rows.length},item:function(a){if(a<this.getLength()){var b={};var c=this.rows[a];this.names.forEach(function(e,d){b[e]=c[d]});return b}return null}})})})})});