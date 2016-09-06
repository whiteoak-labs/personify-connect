Ext.define('Personify.controller.phone.badge.Badge',{
    extend: 'Personify.base.Controller',
    control: {
        badgeCode:{},
        badgeName: {},
        badgeJobTitle: {},
        badgeAssociation:{},
        badgeTitleBar:{},

        ptoolbarBadgePanelPhone: {
            onNavigationButtonTap: 'onTapNavigationButton'
        },
        view: {
            painted: 'onPainted'
        }
    },
    init: function(){
        this.getPtoolbarBadgePanelPhone().getController().getActionButton().setText('More');
        this.getPtoolbarBadgePanelPhone().getController().setHiddenActionButton(true);
        var record = this.getView().getRecord();
        var title = '';

        if (record.get('shortName')) {
            title = record.get('shortName');
        } else {
            if (record.get('title')) {
                title = record.get('title');
            }
        }
        this.getBadgeTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
        this.getData();
    },
    onTapNavigationButton: function() {
        this.getView().fireEvent('back', this);
    },
    onPainted: function(){
        var record =  this.getView().getRecord();
        var badgeData = record.get('badgeData');
        var elementId = this.getBadgeCode().element.id;
        jQuery('#'+elementId).qrcode({width: 180,height: 180,text: badgeData});
    },
    getData: function() {
        var me = this,
            profileView = me.getView(),
            storeManager = Personify.utils.ServiceManager.getStoreManager(),
            profileStore = Ext.create(storeManager.getProfileStore()),
            currentUser = Personify.utils.Configuration.getCurrentUser(),
            profileDisplayOptionStore = currentUser.getProfileDisplayOptionStore();

        var isStaff = currentUser.isStaffMember(),
            attributes = {
                "MasterCustomerId": currentUser.get('masterCustomerId'),
                "SubCustomerId": currentUser.get('subCustomerId'),
                "ReqMasterCustomerId": currentUser.get('masterCustomerId'),
                "ReqSubCustomerId": currentUser.get('subCustomerId'),
                "IsStaff": isStaff,
                "RecordType": ""
            };

        profileStore.setDataRequest(attributes);

        profileStore.on('load', function(store, records) {
            var objValue = profileStore.getAt(0).EntryProfile.getData().getAt(0);
            me.getBadgeJobTitle().setHtml(objValue.get('jobTitle'));
            me.getBadgeName().setHtml(objValue.get('displayName'));
        });

        profileStore.load();
    }
});