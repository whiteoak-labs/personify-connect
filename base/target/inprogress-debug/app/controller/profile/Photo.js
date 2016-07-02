Ext.define('Personify.controller.profile.Photo', {
    extend: 'Personify.base.Controller',
    control: {
        imageFrame: {
            
        },
        editButton: {
            'tap': 'onEditPictureTapped'
        }
    },
    config: {
        record: null
    },
    
    updateRecord: function(record) {
        var  photoStore = record.EntryProfile.getAt(0).PhotosProfile;
        if(photoStore.getCount() != 0 && photoStore.getAt(0).get('value') != "") {
            if (Personify.utils.Configuration.profilePictureTimestamp) {
                this.getImageFrame().setSrc(photoStore.getAt(0).get('value') + "?_dc=" + Personify.utils.Configuration.profilePictureTimestamp);
            } else {
                this.getImageFrame().setSrc(photoStore.getAt(0).get('value'));
            }
        } else {
            this.getImageFrame().setSrc('img/directory/defaultAvatar.png');
        }
        this.updateEditMode(false);
    },
    
    setPresenterRecord: function(presenter) {
        if(presenter && presenter.get('imageURL') && presenter.get('imageURL') != '') {
            this.getImageFrame().setSrc(presenter.get('imageURL'));
        } else {
            this.getImageFrame().setSrc('img/directory/defaultAvatar.png');
        }
    },
    
    updateEditMode: function (newValue) {
        if(this.getView()) {
            if (newValue == true) {
                this.getEditButton().show();
            } else {
                this.getEditButton().hide();
            }
        }
    },
    
    onEditPictureTapped: function() {
        var me = this;
        
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading',
            indicator: true,
            centered: true,
            fullscreen: true
        });
        
        navigator.camera.getPicture(function(response) {
            Ext.callback(me.uploadImage, me, [response]);
        }, me.onPhotoDataError, {
            quality : 50,
            allowEdit: true,
            sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType : navigator.camera.DestinationType.FILE_URI,
            encodingType : navigator.camera.EncodingType.PNG
        });
    },
    
    uploadImage: function(imageURI) {
        var me = this;
        var fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        var options = new FileUploadOptions();
        options.fileKey = "fileToUpload";
        options.fileName = fileName;
        options.mimeType = "image/png";
        options.chunkedMode = false;

        var headers = Personify.utils.ServiceManager.getHeaders();
        
        if (headers["Authorization"]) {
            options.headers = {"Authorization": headers["Authorization"]};
        }

        var profile = me.getRecord().EntryProfile.first();

        options.params = {
            'masterCustomerId': profile.get('masterCustomerId'),
            'subCustomerId': profile.get('subCustomerId')
        };

        var fileTransfer = new FileTransfer();
        fileTransfer.upload(imageURI, Personify.utils.ServiceManager.getUrlWS('utilFileUpload'), 
            function(result) {
                Ext.Viewport.setMasked(false);

                if (JSON.parse(result.response.toLowerCase()) == false) {
                    Ext.Msg.alert('', 'Cannot upload image, please try again later', Ext.emptyFn);
                } else {
                    Ext.Msg.alert('', 'Your profile picture has been updated', Ext.emptyFn);
                    var photo = me.getRecord().EntryProfile.first().PhotosProfile.first();

                    if (photo) {
                        me.getImageFrame().setSrc('img/directory/defaultAvatar.png');
                        var image = me.getImageFrame();
                        Personify.utils.Configuration.profilePictureTimestamp = Ext.Date.now();
                        Ext.callback(image.setSrc, image, [photo.get('value') + '?_dc=' + Personify.utils.Configuration.profilePictureTimestamp], 1000);
                    }
                    if(Ext.os.is.Android){
                        window.plugins.androidHelper.clearHistory();
                    }
                }
            },
            function(e) {
                Ext.Msg.alert('', 'Cannot upload image, please try again later', Ext.emptyFn);
                Ext.Viewport.setMasked(false);
            },
            options
        );
    },
    
    onPhotoDataError: function(message) {
        Ext.Viewport.setMasked(false);
    }
});
