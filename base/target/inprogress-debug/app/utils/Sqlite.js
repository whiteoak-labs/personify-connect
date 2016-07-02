Ext.define('Personify.utils.Sqlite', {
    db: null,
    statics: {
           init: function() {
               Personify.utils.Sqlite.db = window.sqlitePlugin.openDatabase("Personify", "1.0", "Personify", -1);
               //Personify.utils.Sqlite.db = window.openDatabase("Personifyaaa", "1.0", "Personifyeee", -1);
               Personify.utils.Sqlite.createTableData();
           },
           
           initNotes: function() {
               Personify.utils.Sqlite.db = window.sqlitePlugin.openDatabase("Personify", "1.0", "Personify", -1);
               //Personify.utils.Sqlite.db = window.openDatabse("Personify", "1.0", "Personify", -1);
               Personify.utils.Sqlite.createTableNotes();
           },
           
           initExhibitor: function() {
               Personify.utils.Sqlite.db = window.sqlitePlugin.openDatabase("Personify", "1.0", "Personify", -1);
               Personify.utils.Sqlite.createTableExhibitor();
           },
           
           initNotification: function() {
               Personify.utils.Sqlite.db = window.sqlitePlugin.openDatabase("Personify", "1.0", "Personify", -1);
               Personify.utils.Sqlite.createTableNotification();
           },

           initImage: function() {
               Personify.utils.Sqlite.db = window.sqlitePlugin.openDatabase("Personify", "1.0", "Personify", -1);
               Personify.utils.Sqlite.createTableImage();
           },
           
           createTableData: function() {
               Personify.utils.Sqlite.db.transaction(function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS DataCache (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, date TEXT, datarequest TEXT, url TEXT, data TEXT, currentUser TEXT, isInvalid INTEGER DEFAULT 0)');
               });
           },
           
           createTableImage: function() {
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Image (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, url TEXT, name TEXT, uuid TEXT)');
               });
           },
           
           createTableNotes: function() {
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Notes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, date TEXT, sessionId TEXT, eventId TEXT)');
               });
           },
           
           createTableExhibitor: function() {
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Exhibitor (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, exhibitorId TEXT, eventId TEXT, customerId TEXT, subcustomerId TEXT)');
               });
           },
           
           createTableNotification: function() {
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Notification (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, messageId INTEGER, isDeleted INTEGER)');
               });
           },
           
           insertTableData: function(datarequest, url, data) {
               Personify.utils.Sqlite.init();
               var now = new Date();
               var currentUser = Personify.utils.Configuration.getCurrentProfileUser();
               if(!currentUser) currentUser = Personify.utils.Configuration.getCurrentUser();
               var user = "";
               if(currentUser)
                    user = currentUser.get('masterCustomerId')+":"+currentUser.get('subCustomerId');
               Personify.utils.Sqlite.db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO DataCache (date, datarequest, url, data, currentUser) VALUES(?,?,?,?,?)',
                           [now, datarequest, url, data, user],
                        function(tx, res) {
                            
                        }, function(e) {
                            throw e;
                        });
               });
           },
           
           getTableData: function(url, dataRequest, callback) {
               Personify.utils.Sqlite.init();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql("SELECT * FROM DataCache WHERE url = ? AND datarequest = ? ORDER BY id DESC LIMIT 1", [url, dataRequest],
                        function(tx, res) {
                           if (res.rows.length > 0) {
                               callback(res.rows.item(0).data);
                           } else {
                               callback(false);
                           }
                            
                        }, function(e) {
                            callback(false);
                        });
               });
           },
           
           invalidateProfileCache:function()
           {
               Personify.utils.Sqlite.init();
               var url1 = Personify.utils.ServiceManager.getUrlWS('profileGet'), url2 = Personify.utils.ServiceManager.getUrlWS('profileUpdate');
               var currentUser = Personify.utils.Configuration.getCurrentUser();
               var user = "";
               if(currentUser)
                   user = currentUser.get('masterCustomerId')+":"+currentUser.get('subCustomerId');
               Personify.utils.Sqlite.db.transaction(function(tx) {
                     tx.executeSql("UPDATE DataCache SET isInvalid = 1 WHERE (url = ?  OR url = ?) AND currentUser = ?", [url1, url2, user],
                       function(tx, res) {
                       }, function(e) {
                       });
                 });
           },
           
           getProfileData: function(dataRequest, callback) {
           Personify.utils.Sqlite.init();
           var url1 = Personify.utils.ServiceManager.getUrlWS('profileGet'), url2 = Personify.utils.ServiceManager.getUrlWS('profileUpdate');

           var currentUser = Personify.utils.Configuration.getCurrentProfileUser();
           if(!currentUser) currentUser = Personify.utils.Configuration.getCurrentUser();
           var user = "";
           if(currentUser)
                user = currentUser.get('masterCustomerId')+":"+currentUser.get('subCustomerId');
           Personify.utils.Sqlite.db.transaction(function(tx) {
                 tx.executeSql("SELECT * FROM DataCache WHERE ((url = ? AND datarequest = ?) OR url =?) AND currentUser = ? AND isInvalid = 0 ORDER BY id DESC LIMIT 1", [url1, dataRequest, url2, user],
                       function(tx, res) {
                           if (res.rows.length > 0) {
                               var rowDateStr = res.rows.item(0).date;
                               var rowDate = Date.parse(rowDateStr);
                               if(rowDate)
                               {
                                   var hours = (new Date() - new Date(rowDate))/3600000;
                                    if(hours < 24)
                                   {
                                        callback(res.rows.item(0).data);
                                   }
                                   else
                                    callback(false);
                               }
                               else
                               {
                                   callback(false);
                               }
                           } else {
                               callback(false);
                           }
                           }, function(e) {
                               callback(false);
                       });
                 });
           },
           
           insertTableNotes: function(title, description, sessionId, eventId, noteId, callback) {
               Personify.utils.Sqlite.initNotes();
               if (noteId) {
                   var date = new Date();
                   Personify.utils.Sqlite.db.transaction(function(tx) {
                       tx.executeSql('UPDATE Notes SET title = ?, description = ?, date = ? WHERE id = ?', [title, description, date, noteId],
                           function(tx, res) {
                               callback(true);
                           }, function(e) {
                               callback(false);
                           });
                   });
               } else {
                   var date = new Date();
                   Personify.utils.Sqlite.db.transaction(function(tx) {
                       tx.executeSql('INSERT INTO Notes (title, description, date, sessionId, eventId) VALUES(?,?,?,?,?)', [title, description, date, sessionId, eventId],
                           function(tx, res) {
                               callback(true);
                           }, function(e) {
                               callback(false);
                           });
                   });
               }
           },
           
           getAllNotes: function(sessionId, eventId, callback) {
               Personify.utils.Sqlite.initNotes();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   if (sessionId) {
                       tx.executeSql("SELECT * FROM Notes WHERE sessionId = ? AND eventId = ?", [sessionId, eventId], 
                       function(tx, res) {
                           var data = [];
                           for (var i = 0; i < res.rows.length; i++) {
                               data.push(res.rows.item(i));
                           }
                           callback(data);
                       }, function(e) {
                           callback(false);
                       });
                   } else {
                       tx.executeSql("SELECT * FROM Notes WHERE eventId = ?", [eventId], 
                       function(tx, res) {
                           var data = [];
                           for (var i = 0; i < res.rows.length; i++) {
                               data.push(res.rows.item(i));
                           }
                           callback(data);
                       }, function(e) {
                           callback(false);
                       });
                   }
               });
           },
           
           deleteMyNote: function(noteId, callback) {
               Personify.utils.Sqlite.initNotes();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('DELETE FROM Notes WHERE id = ?', 
                   [noteId], 
                   function(tx, res) {
                       callback(true);
                   }, function(e) {
                       callback(false);
                   });
               });
           },
           insertTableExhibitor: function(exhibitorId, eventId, customerId, subCustomerId, callback) {
               Personify.utils.Sqlite.initExhibitor();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('INSERT INTO Exhibitor (exhibitorId, eventId, customerId, subcustomerId) VALUES(?,?,?,?)', 
                   [exhibitorId, eventId, customerId, subCustomerId], 
                   function(tx, res) {
                       if (typeof callback == 'function') {
                           callback(true);
                       }
                   }, function(e) {
                       if (typeof callback == 'function') {
                           callback(false);
                       }
                   });
               });
           },
           
           getMyExhibitor: function(eventId, customerId, subCustomerId, callback) {
               Personify.utils.Sqlite.initExhibitor();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql("SELECT * FROM Exhibitor WHERE eventId = ? AND customerId = ? AND subcustomerId = ?", 
                   [eventId, customerId, subCustomerId], 
                   function(tx, res) {
                       if (typeof callback == 'function') {
                           var data = [];
                           for (var i = 0; i < res.rows.length; i++) {
                               data.push(res.rows.item(i));
                           }
                           callback(data);
                       }
                   }, function(e) {
                       if (typeof callback == 'function') {
                           callback(false);
                       }
                   });
               });
           },
           
           deleteMyExhibitor: function(exhibitorId, productId, customerId, subCustomerId, callback) {
               Personify.utils.Sqlite.initExhibitor();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('DELETE FROM Exhibitor WHERE exhibitorId = ? AND eventId = ? AND customerId = ? AND subcustomerId = ?', 
                   [exhibitorId, productId, customerId, subCustomerId], 
                   function(tx, res) {
                       callback(true);
                   }, function(e) {
                       callback(false);
                   });
               });
           },
           
           insertTableNotification: function(messageId, isDeleted, callback) {
               Personify.utils.Sqlite.initNotification();
               Personify.utils.Sqlite.getCountNotificationByMessageId(messageId, function(count) {
                   if (count > 0) { //update
                       Personify.utils.Sqlite.updateNotification(messageId, isDeleted, function(success) {
                           if (success) {
                               if (typeof callback == 'function') {
                                   callback(true);
                               }
                           } else {
                               if (typeof callback == 'function') {
                                   callback(false);
                               }
                           }
                       });
                   } else { //insert
                       Personify.utils.Sqlite.db.transaction(function(tx) {
                           tx.executeSql('INSERT INTO Notification (messageId, isDeleted) VALUES (?,?)', [messageId, isDeleted], 
                               function(tx, res) {
                                   if (typeof callback == 'function') {
                                       callback(true);
                                   }
                               }, function(e) {
                                   if (typeof callback == 'function') {
                                       callback(false);
                                   }
                           });
                       });
                   }
               });
           },
           
           getNotification: function(callback) {
               Personify.utils.Sqlite.initNotification();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('SELECT * FROM Notification', [],
                   function(tx, res) {
                       if (typeof callback == 'function') {
                           var data = [];
                           for (var i = 0; i < res.rows.length; i++) {
                               data.push(res.rows.item(i));
                           }
                           callback(data);
                       }
                   }, function(e) {
                       if (typeof callback == 'function') {
                           callback(false);
                       }
                   });
               });
           },
           
           updateNotification: function(messageId, isDeleted, callback) {
               Personify.utils.Sqlite.initNotification();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('UPDATE Notification SET isDeleted = ? WHERE messageId = ?', [isDeleted, messageId], 
                   function(tx, res) {
                       if (typeof callback == 'function') {
                           callback(true);
                       } 
                   }, function(e) {
                       if (typeof callback == 'function') {
                           callback(false);
                       }
                   });
               });
           },
           
           getCountNotificationByMessageId: function(messageId, callback) {
               Personify.utils.Sqlite.initNotification();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('SELECT * FROM Notification WHERE messageId = ?', [messageId], 
                   function(tx, res) {
                       if (typeof callback == 'function') {
                           callback(res.rows.length);
                       }
                   }, function(e) {
                       if (typeof callback == 'function') {
                           callback(0);
                       }
                   });
               });
           },

            getCountNotes: function(sessionId, eventId, callback) {
                Personify.utils.Sqlite.initNotes();
                Personify.utils.Sqlite.db.transaction(function(tx) {
                    tx.executeSql('SELECT * FROM Notes WHERE sessionId = ? AND eventId = ?', [sessionId, eventId],
                        function(tx, res) {
                            if (typeof callback == 'function') {
                                callback(res.rows.length);
                            }
                        }, function(e) {
                            if (typeof callback == 'function') {
                                callback(0);
                            }
                        }
                    );
                });
            },
           
           insertTableImage: function(url, name, uuid) {
               Personify.utils.Sqlite.initImage();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('INSERT INTO Image (url, name, uuid) VALUES (?,?,?)', [url, name, uuid], 
                   function(tx, res) {
                       
                   }, function(e) {

                   });
               });
           },
           
           getTableImage: function(url, callback) {
               Personify.utils.Sqlite.initImage();
               Personify.utils.Sqlite.db.transaction(function(tx) {
                   tx.executeSql('SELECT * FROM Image WHERE url = ?', [url], 
                       function(tx, res) {
                           if (typeof callback == 'function') {
                               var data = [];
                               for (var i = 0; i < res.rows.length; i++) {
                                   data.push(res.rows.item(i));
                               }
                               callback(data);
                           }
                       }, function(e) {
                           
                       });
               });
           },
    }
});
