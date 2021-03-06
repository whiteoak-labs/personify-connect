Ext.define('Personify.view.profile.contactinfo.AddressEditForm', {
	extend : 'Ext.Panel',
	xtype : 'addressEditForm',
	controller : 'Personify.controller.profile.AddressEditForm',
	requires : 'Personify.controller.profile.AddressEditForm',

	config : {
		stateDictionary : {},
		scrollable : null,
		store : null,
		record : null,
		typeListAd : null,
		layout : 'hbox',
		items : [{
			xtype : 'container',
			flex : 1,
			baseCls : 'p-fieldset-nameeditform p-editformtemplate',
			items : [{
				flex : 1,
				xtype : 'checkboxfield',
				itemId : 'checkBoxPrimary',
				label : 'Primary',
				checked : false,
				cls : 'p-addressEditForm',
				disabled : true,
				hidden : true
			}, {
				flex : 1,
				xtype : 'selectfield',
				itemId : 'typeList',
				label : 'Type',
				cls : 'p-addressEditForm',
				inputCls : 'p-selectfield-input-cls',
				autoCapitalize : true
			}, {
				xtype : 'textfield',
				itemId : 'txtFieldStreetAd',
				cls : 'p-addressEditForm',
				label : 'Street Address:'
			}, {
				xtype : 'textfield',
				itemId : 'txtFieldAd2',
				cls : 'p-addressEditForm',
				label : 'Address 2:'
			}, {
				xtype : 'textfield',
				itemId : 'txtFieldAd3',
				cls : 'p-addressEditForm',
				label : 'Address 3:'
			}, {
				xtype : 'textfield',
				itemId : 'txtFieldAd4',
				cls : 'p-addressEditForm',
				label : 'Address 4:'
			}, {
				xtype : 'container',
				flex : 1,
				items : [{
					xtype : 'selectfield',
					itemId : 'regionList',
					store : null,
					autoSelect : false,
					cls : 'p-addressEditForm',
					label : 'State/Province:'
				}]
			}, {
				xtype : 'container',
				flex : 1,
				items : [{
					xtype : 'textfield',
					itemId : 'txtLocalityAd',
					cls : 'p-addressEditForm',
					label : 'City:'
				}]
			}, {
				xtype : 'container',
				flex : 1,
				items : [{
					xtype : 'selectfield',
					itemId : 'countryList',
					store : null,
					cls : 'p-addressEditForm',
					label : 'Country:'
				}]
			}, {
				xtype : 'container',
				flex : 1,
				items : [{
					xtype : 'textfield',
					itemId : 'txtFieldPostalCodeAd',
					cls : 'p-addressEditForm',
					label : 'Zip/Postal Code:'
				}]
			}]
		}, {
			xtype : 'panel',
			style : 'width: 40px; margin-top: 8px; padding-left:10px',
			items : [{
				xtype : 'button',
				itemId : 'deleteButtonAd',
				cls : 'p-button-delete-editTempelate',
				hidden : false
			}, {
				itemId : 'primaryCheckBox',
				html : 'Main',
				cls : 'p-phone-editform-main',
				style : 'margin-left: -4px; font-weight: bold',
				hidden : true
			}]
		}] // end items address edit form
	}, // end config

	updateRecord : function(record) {
		if (record) {
			this.getController().setRecord(record);
		}
	}
}); 