Ext.define('Personify.model.personify.About', {
    extend: 'Personify.base.Model',
    requires: [
        'Personify.model.jsonp.profile.Addresses',
        'Personify.model.personify.about.Contacts',
        'Personify.model.jsonp.profile.PhoneNumbers',
        'Personify.model.jsonp.profile.Urls',
        'Personify.model.jsonp.profile.Emails'
    ],
    
    config: {
        fields: [
            {name: 'title', type: 'string', defaultValue: 'TMA Resources Connect'},
            {name: 'descriptionTitle', type: 'string', defaultValue: 'About TMA Resources Connect:'},
            {name: 'description', type: 'string'},
            {name: 'version', type: 'string'},
            {name: 'logoUrl', type: 'string'},
            {name: 'appUrl', type: 'string'},
            {name: 'appShareTitle', type: 'string'},
            {name: 'appShareText', type: 'string'},
            {name: 'importantNumbersTitle', type: 'string', defaultValue: 'Important Numbers:'},
            {name: 'addressesTitle', type: 'string', defaultValue: 'Addresses:'},
            {name: 'websitesTitle', type: 'string', defaultValue: 'Websites:'},
            {name: 'emailTitle', type: 'string', defaultValue: 'Emails:'},
            {name: 'enableConfigSettings', type: 'boolean', defaultValue: false}
        ],
        associations: [
           {
               type: 'hasMany', 
               model: 'Personify.model.jsonp.profile.Addresses',
               autoLoad: true,
               associationKey: 'addresses',
               name: 'Addresses'
           },
           {
               type: 'hasMany', 
               model: 'Personify.model.personify.about.Contacts',
               autoLoad: true,
               associationKey: 'contacts',
               name: 'Contacts'
           },
           {
               type: 'hasMany', 
               model: 'Personify.model.jsonp.profile.PhoneNumbers',
               autoLoad: true,
               associationKey: 'numbers',
               name: 'Numbers'
           },
           {
               type: 'hasMany', 
               model: 'Personify.model.jsonp.profile.Emails',
               autoLoad: true,
               associationKey: 'email',
               name: 'Email'
           },
           {
               type: 'hasMany', 
               model: 'Personify.model.jsonp.profile.Urls',
               autoLoad: true,
               associationKey: 'website',
               name: 'Website'
           },
           {
               type: 'belongsTo', 
               model: 'Personify.model.personify.Personify',
               autoLoad: true,
               associationKey: 'about',
               name: 'About'
           }
       ]
    }
});
