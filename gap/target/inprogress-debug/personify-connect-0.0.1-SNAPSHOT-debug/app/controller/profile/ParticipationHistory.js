Ext.define('Personify.controller.profile.ParticipationHistory', {
    extend: 'Personify.base.Controller',

    requires: [
        'Personify.utils.ItemUtil'
    ],
    
    config: {
        store: null
    },
    
    control: {
        currentCommittee: {},
        futureCommittee: {},
        pastCommittee: {}
    },

    init: function() {
        if (window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Profile Participation History');
        }
    },

    loadContactData: function(contact) {
        var me = this,
            storeManager = Personify.utils.ServiceManager.getStoreManager(),
            participationStoreName = storeManager.getParticipationStore(),
            participationStore = Ext.create(participationStoreName),
            params = {
                MasterCustomerID: contact.get('masterCustomerId'),
                SubCustomerID: (contact.get('subCustomerId') != "") ? contact.get('subCustomerId') : "0"
            };

        me.getView().setMasked({ xtype: 'loadmask' });

        participationStore.setDataRequest(params);
        participationStore.load({
            callback: function() {
                me.setStore(participationStore);
                me.getView().setMasked(false);
            }
        });

        return participationStore;
    },
   
    updateStore: function(newStore) {
        if (this.getView().isDestroyed) {
            return;
        }

        var me = this,
            currentCommittee = me.getCurrentCommittee(),
            futureCommittee = me.getFutureCommittee(),
            pastCommittee = me.getPastCommittee(),
            pastCommitteeStore = Ext.create('Personify.base.Store'),
            currentCommitteeStore = Ext.create('Personify.base.Store'),
            futureCommitteeStore = Ext.create('Personify.base.Store');

        if (newStore.getCount() > 0) {
            if (newStore.getAt(0).CommitteeParticipation && newStore.getAt(0).CommitteeParticipation.getCount() > 0) {
                var committeStore = newStore.getAt(0).CommitteeParticipation;
                var currentDate = new Date();

                committeStore.each(function(record) {
                    if (new Date(record.get('startDate')) > currentDate) {
                        futureCommitteeStore.add(record);
                    } else {
                        currentCommitteeStore.add(record);
                    }
                });
            }

            if (newStore.getAt(0).PastCommitteeParticipation) {
                pastCommitteeStore = newStore.getAt(0).PastCommitteeParticipation;
            }
        }

        currentCommitteeStore.sort('startDate', 'DESC');
        currentCommittee.setStore(currentCommitteeStore);

        futureCommitteeStore.sort('startDate', 'DESC');
        futureCommittee.setStore(futureCommitteeStore);

        pastCommitteeStore.sort('startDate', 'DESC');
        pastCommittee.setStore(pastCommitteeStore);
    }
});