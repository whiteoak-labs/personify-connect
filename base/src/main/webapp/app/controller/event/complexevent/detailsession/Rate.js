Ext.define('Personify.controller.event.complexevent.detailsession.Rate', {
    extend: 'Personify.base.Controller',

    control: {
        titleRate: true,
        inputRating: true,
        inputRatingComment: {
            keyup: 'onTextChange',
            change: 'onTextChange',
            show: 'onClearText',
            clearicontap: 'onClearText'
        },
        saveRatingComment: {
            tap: 'onTapSaveRatingCommentButton'
        },
        panelOfContent: {},
        closeButton: {
            tap: 'onCloseRateTaped'
        }
    },

    config: {
        screenHeight : 0
    },

    init: function() {
        var rateTitleValue = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('rateTitleBar');
        if (rateTitleValue) {
            this.getTitleRate().setHtml(rateTitleValue);
        }

        if (this.getView().getShowCloseButton()) {
            this.getCloseButton().show();
        }

        if (Ext.os.is.Android) {
            this.setScreenHeight(Ext.getBody().getHeight());
        }
           
    },

    onTapSaveRatingCommentButton: function() {
        this.getInputRatingComment().blur();
        if (!Personify.utils.PhoneGapHelper.checkConnection()) {
            Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
            return;
        }

        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();

        if (currentUser && currentUser.isLogged()) {
            Ext.Viewport.setMasked({xtype: 'loadmask'});
            var me = this;
            var comments = me.getInputRatingComment().getValue();
            var starRating = me.getInputRating().getValue() + 1;
            var productId = this.getView().getRecord() ? this.getView().getRecord().get('sessionID') : null;

            if (!productId) {
                productId = this.getView().getRecord() ? this.getView().getRecord().get('productID') : null;
            }

            var storeManager = Personify.utils.ServiceManager.getStoreManager();
            var saveRatingStoreName = storeManager.getSaveRating();
            var saveRating = Ext.create(saveRatingStoreName);

            var attributes = {
                "InternalKey": null,
                "NavigationKey": null,
                "MasterCustomerId": currentUser.get('masterCustomerId'),
                "SubCustomerId": currentUser.get('subCustomerId'),
                "StarRating": starRating,
                "Comments": comments,
                "ProductId": productId
            }

            saveRating.setDataRequest(attributes);

            saveRating.load({
                callback: function(records, operation, success) {
                    if (success) {
                        Ext.Msg.alert('', 'This session has been rated.');
                        me.resetForm();
                        Ext.Viewport.setMasked(false);
                    } else {
                        Ext.Msg.alert('', 'Please select a star rating and/or enter your comments.');
                        Ext.Viewport.setMasked(false);
                    }
                },
                scope: this
            })
        } else {
            Personify.utils.ItemUtil.needToLogin();
            return;
        }
    },

    resetForm: function() {
        var me = this;
        me.getInputRatingComment().setValue("");
        me.getInputRating().setValue(-1);
    },

    onTextChange: function(field) {
        var textarea = Ext.DomQuery.select("textarea",field.element.dom)[0];
        var scrollHeight = textarea.scrollHeight;
        var clientHeight = textarea.clientHeight;
        var selectionEnd = textarea.selectionEnd;
        var textLength = textarea.textLength;

        if (clientHeight < scrollHeight) {
            this.getInputRatingComment().setHeight(scrollHeight);
            if (selectionEnd == textLength) {
                this.getInputRatingComment().getParent().getScrollable().getScroller().scrollToEnd();
            } else {
                var scroll = this.inputRatingComment().getParent().getScrollable().getScroller();
                scroll.scrollBy(0, scrollHeight - clientHeight);
            }
        }
    },

    onClearText: function() {
        this.inputRatingComment().setHeight(82);
        this.inputRatingComment().getParent().getScrollable().getScroller().scrollToTop();
    },

    onCloseRateTaped: function() {
        this.getView().fireEvent('close');
    }
});
