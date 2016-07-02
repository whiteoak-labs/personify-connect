Ext.define('Personify.utils.updateparams.Jsonp', {
            xtype : 'updateparamsjsonp',
            
            statics : {
                getUpdateProfileParams: function(record) {
                    var entry = record.EntryProfile.getAt(0);
                    var urls = new Array();
                    
                    for (var i=0;i<entry.UrlsProfile.getCount();i++)
                    {
                        var url = {
                            "InternalKey": entry.UrlsProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.UrlsProfile.getAt(i).get('navigationKey'),
                            "Id": entry.UrlsProfile.getAt(i).get('urlId'),
                            "Value": entry.UrlsProfile.getAt(i).get('value'),
                            "Type": entry.UrlsProfile.getAt(i).get('type'),
                            "Primary": entry.UrlsProfile.getAt(i).get('primary'),
                            "MarkForDelete": (entry.UrlsProfile.getAt(i).get('markForDelete') == null) ? false : entry.UrlsProfile.getAt(i).get('markForDelete'),
                            "ProfileEmails": entry.UrlsProfile.getAt(i).get('profileEmails'),
                            "ProfileRoles": entry.UrlsProfile.getAt(i).get('profileRoles'),
                            "Urls": null, //TODO
                            "Emails": entry.UrlsProfile.getAt(i).get('emails'),
                            "Roles": entry.UrlsProfile.getAt(i).get('roles')
                        }
                        urls[i] = url;
                    }
                    
                    var phoneNumbers = new Array();
                    for (var i=0;i<entry.PhoneNumbersProfile.getCount();i++)
                    {
                        var phoneNumber = {
                            "InternalKey": entry.PhoneNumbersProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.PhoneNumbersProfile.getAt(i).get('navigationKey'),
                            "Id": entry.PhoneNumbersProfile.getAt(i).get('phoneNumbersId'),
                            "Value": entry.PhoneNumbersProfile.getAt(i).get('value'),
                            "Type": entry.PhoneNumbersProfile.getAt(i).get('type'),
                            "Primary": entry.PhoneNumbersProfile.getAt(i).get('primary'),
                            "MarkForDelete": (entry.PhoneNumbersProfile.getAt(i).get('markForDelete') == null) ? false : entry.PhoneNumbersProfile.getAt(i).get('markForDelete'),
                            "Country": entry.PhoneNumbersProfile.getAt(i).get('country'),
                            "PhoneNumbers": null //TODO
                        }
                        phoneNumbers[i] = phoneNumber;
                    }
                    
                    var organizations = new Array();
                    for (var i=0;i<entry.OrganizationProfile.getCount();i++)
                    {
                        var organization = {
                            "InternalKey": entry.OrganizationProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.OrganizationProfile.getAt(i).get('navigationKey'),
                            "Name": entry.OrganizationProfile.getAt(i).get('name'),
                            "Department": entry.OrganizationProfile.getAt(i).get('department'),
                            "Title": entry.OrganizationProfile.getAt(i).get('title'),
                            "Type": entry.OrganizationProfile.getAt(i).get('type'),
                            "StartDate": entry.OrganizationProfile.getAt(i).get('startDate'),
                            "EndDate": entry.OrganizationProfile.getAt(i).get('endDate'),
                            "Location": entry.OrganizationProfile.getAt(i).get('location'),
                            "Description": entry.OrganizationProfile.getAt(i).get('description'),
                            "Organization": null //TODO
                        }
                        organizations[i] = organization;
                    }
                    
                    var photos = new Array();
                    for (var i=0;i<entry.PhotosProfile.getCount();i++)
                    {
                        var photo = {
                            "InternalKey":entry.PhotosProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.PhotosProfile.getAt(i).get('navigationKey'),
                            "Value": entry.PhotosProfile.getAt(i).get('value'),
                            "Type": entry.PhotosProfile.getAt(i).get('type'),
                            "Photos": null //TODO
                        }
                        photos[i] = photo;
                    }
                    
                    var companyContacts = new Array();
                    for (var i=0;i<entry.CompanyContactProfile.getCount();i++)
                    {
                        var companyContact = {
                             "InternalKey": entry.CompanyContactProfile.getAt(i).get('internalKey'),
                             "NavigationKey": entry.CompanyContactProfile.getAt(i).get('navigationKey'),
                             "MasterCustomerId": entry.CompanyContactProfile.getAt(i).get('masterCustomerId'),
                             "SubCustomerId": entry.CompanyContactProfile.getAt(i).get('subCustomerId'),
                             "Name": entry.CompanyContactProfile.getAt(i).get('name'),
                             "Email": entry.CompanyContactProfile.getAt(i).get('email'),
                             "Phone": entry.CompanyContactProfile.getAt(i).get('phone'),
                             "CompanyContact": null //TODO
                        }
                        companyContacts[i] = companyContact;
                    }
                    
                    var names = new Array();
                    for (var i=0;i<entry.NameProfile.getCount();i++)
                    {
                        var name = {
                         "InternalKey": entry.NameProfile.getAt(i).get('internalKey'),
                         "NavigationKey": entry.NameProfile.getAt(i).get('navigationKey'),
                         "Formatted": entry.NameProfile.getAt(i).get('formatted'),
                         "FamilyName": entry.NameProfile.getAt(i).get('familyName'),
                         "GivenName": entry.NameProfile.getAt(i).get('givenName'),
                         "MiddleName": entry.NameProfile.getAt(i).get('middleName'),
                         "HonorificPrefix": entry.NameProfile.getAt(i).get('honorificPrefix'),
                         "HonorificSuffix": entry.NameProfile.getAt(i).get('honorificSuffix'),
                         "ProfileName": entry.NameProfile.getAt(i).get('profileName'),
                         "Name": null //TODO
                        }
                        names[i] = name;
                    }
                    
                    var emails = new Array();
                    for (var i=0;i<entry.EmailsProfile.getCount();i++)
                    {
                        var email = {
                            "InternalKey": entry.EmailsProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.EmailsProfile.getAt(i).get('navigationKey'),
                            "Id": entry.EmailsProfile.getAt(i).get('emailsId'),
                            "Value": entry.EmailsProfile.getAt(i).get('value'),
                            "Type": entry.EmailsProfile.getAt(i).get('type'),
                            "Primary": entry.EmailsProfile.getAt(i).get('primary'),
                            "MarkForDelete": (entry.EmailsProfile.getAt(i).get('markForDelete') == null) ? false : entry.EmailsProfile.getAt(i).get('markForDelete'),
                            "ProfileEmails": entry.EmailsProfile.getAt(i).get('profileEmails'),
                            "ProfileRoles": entry.EmailsProfile.getAt(i).get('profileRoles'),
                            "Urls": entry.EmailsProfile.getAt(i).get('urls'),
                            "Emails": null, //TODO
                            "Roles": entry.EmailsProfile.getAt(i).get('roles')
                        }
                        emails[i] = email;
                    }
                    var roles = new Array();
                    for (var i=0;i<entry.RolesProfile.getCount();i++)
                    {
                        var role = {
                            "InternalKey": entry.RolesProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.RolesProfile.getAt(i).get('navigationKey'),
                            "Id": entry.RolesProfile.getAt(i).get('roleId'),
                            "Value": entry.RolesProfile.getAt(i).get('value'),
                            "Type": entry.RolesProfile.getAt(i).get('type'),
                            "Primary": entry.RolesProfile.getAt(i).get('primary'),
                            "MarkForDelete": (entry.RolesProfile.getAt(i).get('markForDelete') == null ) ? false : entry.RolesProfile.getAt(i).get('markForDelete'),
                            "ProfileEmails": entry.RolesProfile.getAt(i).get('profileEmails'),
                            "ProfileRoles":  entry.RolesProfile.getAt(i).get('profileRoles'),
                            "Urls": entry.RolesProfile.getAt(i).get('urls'),
                            "Emails": entry.RolesProfile.getAt(i).get('emails'),
                            "Roles": null //TODO
                        }
                        roles[i] = role;
                    }
                    
                    var addresses = new Array();
                    for (var i=0;i<entry.AddressesProfile.getCount();i++)
                    {
                        var address = {
                            "InternalKey": entry.AddressesProfile.getAt(i).get('internalKey'),
                            "NavigationKey": entry.AddressesProfile.getAt(i).get('navigationKey'),
                            "Id": entry.AddressesProfile.getAt(i).get('addressesId'),
                            "Type": entry.AddressesProfile.getAt(i).get('type'),
                            "StreetAddress": entry.AddressesProfile.getAt(i).get('streetAddress'),
                            "Address2": entry.AddressesProfile.getAt(i).get('address2'),
                            "Address3": entry.AddressesProfile.getAt(i).get('address3'),
                            "Address4": entry.AddressesProfile.getAt(i).get('address4'),
                            "Locality": entry.AddressesProfile.getAt(i).get('locality'),
                            "Region": entry.AddressesProfile.getAt(i).get('region'),
                            "PostalCode": entry.AddressesProfile.getAt(i).get('postalCode'),
                            "Country": entry.AddressesProfile.getAt(i).get('country'),
                            "Formatted": entry.AddressesProfile.getAt(i).get('formatted'),
                            "CanEdit": true,
                            "Primary": entry.AddressesProfile.getAt(i).get('primary'),
                            "MarkForDelete": (entry.AddressesProfile.getAt(i).get('markForDelete') == null) ? false : entry.AddressesProfile.getAt(i).get('markForDelete'),
                            "Address": entry.AddressesProfile.getAt(i).get('address'),
                            "ProfileAddresses": entry.AddressesProfile.getAt(i).get('profileAddress'),
                            "Addresses":null, //TODO
                            "Geo":null //TODO
                        }
                        addresses[i] = address;
                    }
                    
                    return params = {
                        "InternalKey": entry.get('internalKey'),
                        "NavigationKey":entry.get('navigationKey'),
                        "Credentials":entry.get('credentials'),
                        "Type":entry.get('type'),
                        "Id": entry.get('entryId'),
                        "MasterCustomerId":entry.get('masterCustomerId'),
                        "SubCustomerId": entry.get('subCustomerId'),
                        "EncrMasterCustomerId": entry.get('encrMasterCustomerId'),
                        "EncrSubCustomerId": entry.get('encrSubCustomerId'),
                        "DisplayName":entry.get('displayName'),
                        "OrganizationId": entry.get('organizationId'),
                        "OrganizationUnitId": entry.get('organizationUnitId'),
                        "PreferredCurrency": entry.get('preferredCurrency'),
                        "JobTitle": entry.get('jobTitle'),
                        "CCType": entry.get('ccType'),
                        "CCNumber": entry.get('ccNumber'),
                        "ModOper": entry.get('modOper'),
                        "UserKey": entry.get('userKey'),
        
                        "Urls": urls,
                        "PhoneNumbers": phoneNumbers,
                        "Organization": organizations,
                        "Photos": photos,
                        "CompanyContact": companyContacts,
                        "Name": names,
                        "Emails": emails,
                        "Roles": roles,
                        "Addresses": addresses,
                        "Entry": null //TODO
                    }; 
                }
            }
        })