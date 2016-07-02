Ext.define('Personify.model.personify.Directory', {
    extend: 'Personify.base.Model',
    requires: [
        'Personify.model.personify.directory.NameAndRelatedEdit'
    ],
    
    config: {
        fields: [
            {name: 'itemPerPage', type: 'int'},
            {name: 'defaultSearchTerm', type: 'string'},
            {name: 'useAddToMyAddressBookButton', type: 'boolean', convert: function(value) {
                if (value) {
                    value = value.toLowerCase();
                    if (value === 'yes')
                        return true;
                    else
                        return false;
                }
                return false;
            }},
            {name: 'minSearchCharacters', type: 'int', defaultValue: 4},
            'listInfo',
            'listinfoPresenter',
            'listinfoAttendee'
        ],
        associations: [
           {
               type: 'hasMany', 
               model: 'Personify.model.personify.directory.NameAndRelatedEdit',
               autoLoad: true,
               associationKey: 'nameandrelatededit',
               name: 'PhotoAndRelatedEdit'
           },
           {
               type: 'hasMany', 
               model: 'Personify.model.personify.directory.NameAndRelatedEdit',
               autoLoad: true,
               associationKey: 'jobtitleedit',
               name: 'JobTitleEdit'
           }
       ]
    }
});
