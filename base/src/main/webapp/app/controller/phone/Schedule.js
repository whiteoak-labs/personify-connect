Ext.define('Personify.controller.phone.Schedule', {
    extend: 'Personify.base.Controller',
    control: {
        scheduleNavigationView: true,
        myschedulePanel: {
            live:true,
            listeners: {
                requestopendetail: 'openView',
                backtomain: 'onBackToMain',
                removeagenda: 'onRemoveAgenda',
                requestchangeview: 'onRequestChangeView'
            }
        }
    },

    onLoadData: function() {
        this.getMyschedulePanel().getController().onGetData();
    },

    openView: function(view, config) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBack, this);
        view.addListener('backtomain', this.onBackToMain, this);
        view.addListener('requestchangeview', this.onRequestChangeView, this);
        view.addListener('requestopendetail', this.openView, this);
        view.addListener('removeagenda', this.onRemoveAgenda, this);
        view.addListener('addagenda', this.onAddAgenda, this);
        view.addListener('refreshagenda', this.onRefreshAgenda, this);

        if (config) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }

        var scheduleNavigationView = this.getScheduleNavigationView();
        if (scheduleNavigationView.getActiveItem().xtype != view.xtype) {
            scheduleNavigationView.push(view);
        }
    },

    onRequestChangeView: function(view, config) {
        this.getView().fireEvent('requestchangeview', view, config);
    },

    onBack: function() {
        var me = this,
            scheduleNavigationView = me.getScheduleNavigationView();
        scheduleNavigationView.pop();

        if (!scheduleNavigationView.getActiveItem().getController()['getExpandEvent']) {
            return;
        }

        var eventPanelViewController =  scheduleNavigationView.getActiveItem().getController(),
            itemExpanded = eventPanelViewController.getExpandEvent(),
            eventRecord = eventPanelViewController.getEventRecord(),
            index = 0;

        eventPanelViewController.setFlagSelected(false);
        eventPanelViewController.setItemSelected(false);

        if (itemExpanded != null) {
            for (var item in eventRecord) {
                if (index === itemExpanded) {
                    Ext.Viewport.setMasked({xtype: 'loadmask',  message: 'Loading...'});

                    setTimeout(function() {
                        if (Ext.get(eventPanelViewController.getSelectScheduleItem().getViewItems()[index].id.trim()).down('.p-filter-button-new')) {
                            eventPanelViewController.getSelectScheduleItem().select(eventRecord[item]);
                        }

                        Ext.Viewport.setMasked(false);
                    }, 100);
                    break;
                }
                index++;
            }
        }
    },

    onRefreshAgenda: function(record, add, callback) {
        var me = this,
            scheduleNavigationView = me.getScheduleNavigationView(),
            itemNumber = scheduleNavigationView.getInnerItems().length;

        if (itemNumber > 1) {
            scheduleNavigationView.popToRoot();
        }

        var view = scheduleNavigationView.getActiveItem();

        if (view.getItemId() == 'myschedulePanel') {
            this.getView().fireEvent('refreshagenda', function(success, appointmentId, records) {
                view.getController().addOrRemoveByMeetingRecord(record, add, records);
                if (typeof callback === 'function') {
                    callback(success, null, true);
                }
            });
        }
    },

    onBackToMain: function(){
        this.getView().fireEvent('backtomain');
    },

    onRemoveAgenda: function(record, callback) {
        var me = this;
        this.getView().fireEvent('removeagenda', record, function(success, appointmentId, records) {
            me.getMyschedulePanel().getController().addOrRemoveByMeetingRecord(record, false, records);
            callback(success);
        });
    },

    onAddAgenda: function(record, eventId, callback) {
        var me = this;
        this.getView().fireEvent('addagenda', record, eventId, function(success, appointmentId, records) {
            me.getMyschedulePanel().getController().addOrRemoveByMeetingRecord(record, true, records);
            callback(success, appointmentId);
        });
    }
});
