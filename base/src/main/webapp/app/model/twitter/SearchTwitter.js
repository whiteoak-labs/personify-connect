Ext.define('Personify.model.twitter.SearchListTwitter',{
    extend: 'Personify.base.Model',
    requires:[],
    config: {
        fields: [
            {name: 'created_at', type: 'date', allowNull:false,convert: function(value){
                    var date = new Date(value);
                    return Ext.Date.format(date, 'Y-m-d H:i:s');
            }},
            {name: 'id', type: 'string', allowNull:false},
            {name: 'id_str', type: 'string', allowNull:false},
            {name: 'text', type: 'string', allowNull:false},
            {name: 'source', type: 'string', allowNull:false},
            {name: 'truncated', type: 'boolean',allowNull:false},
            {name: 'in_reply_to_status_id', type: 'string',allowNull:false},
            {name: 'in_reply_to_status_id_str', type: 'string', allowNull:false},
            {name: 'in_reply_to_user_id', type: 'string', allowNull:false},
            {name: 'in_reply_to_user_id_str', type: 'string', allowNull:false},
            {name: 'in_reply_to_screen_name', type: 'string', allowNull:false},
            {name: 'geo', type: 'string', allowNull:false},
            {name: 'coordinates', type: 'string', allowNull:false},
            {name: 'place', type: 'string', allowNull:false},
            {name: 'contributors', type: 'string', allowNull:false},
            {name: 'retweet_count', type: 'int', allowNull:false},
            {name: 'favorited', type: 'boolean', allowNull:false},
            {name: 'retweeted', type: 'boolean', allowNull:false},
            {name: 'user'}
        ]
    }
});
