Ext.define('Personify.model.twitter.User',{
    extend: 'Personify.base.Model',
    config: {
        fields: [
            {name: 'id', type: 'date', allowNull:false},
            {name: 'id_str', type: 'string', allowNull:false},
            {name: 'name', type: 'string', allowNull:false},
            {name: 'screen_name', type: 'string', allowNull:false},
            {name: 'location', type: 'string', allowNull:false},
            {name: 'description', type: 'boolean',allowNull:false},
            {name: 'url', type: 'string',allowNull:false},
            {name: 'protected', type: 'string', allowNull:false},
            {name: 'followers_count', type: 'string', allowNull:false},
            {name: 'friends_count', type: 'string', allowNull:false},
            {name: 'listed_count', type: 'string', allowNull:false},
            {name: 'created_at', type: 'string', allowNull:false},
            {name: 'favourites_count', type: 'string', allowNull:false},
            {name: 'utc_offset', type: 'string', allowNull:false},
            {name: 'time_zone', type: 'string', allowNull:false},
            {name: 'geo_enabled', type: 'boolean', allowNull:false},
            {name: 'verified', type: 'boolean', allowNull:false},
            {name: 'statuses_count', type: 'boolean', allowNull:false},
            {name: 'lang', type: 'boolean', allowNull:false},
            {name: 'contributors_enabled', type: 'boolean', allowNull:false},
            {name: 'is_translator', type: 'boolean', allowNull:false},
            {name: 'profile_background_color', type: 'boolean', allowNull:false},
            {name: 'profile_background_image_url', type: 'boolean', allowNull:false},
            {name: 'profile_background_image_url_https', type: 'boolean', allowNull:false},
            {name: 'profile_background_tile', type: 'boolean', allowNull:false},
            {name: 'profile_image_url', type: 'boolean', allowNull:false},
            {name: 'profile_image_url_https', type: 'boolean', allowNull:false},
            {name: 'profile_link_color', type: 'boolean', allowNull:false},
            {name: 'profile_sidebar_border_color', type: 'boolean', allowNull:false},
            {name: 'profile_sidebar_fill_color', type: 'boolean', allowNull:false},
            {name: 'profile_text_color', type: 'boolean', allowNull:false},
            {name: 'profile_use_background_image', type: 'boolean', allowNull:false},
            {name: 'default_profile', type: 'boolean', allowNull:false},
            {name: 'default_profile_image', type: 'boolean', allowNull:false},
            {name: 'following', type: 'boolean', allowNull:false},
            {name: 'follow_request_sent', type: 'boolean', allowNull:false},
            {name: 'notifications', type: 'boolean', allowNull:false}
        ]
    }
});
