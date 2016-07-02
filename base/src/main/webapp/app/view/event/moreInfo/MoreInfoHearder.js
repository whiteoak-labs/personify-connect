Ext.define('Personify.view.event.moreInfo.MoreInfoHearder', {
    extend: 'Ext.Container',
    xtype: 'moreInfoHearder',
    config: {
        layout:'vbox',
        items: [
            {
                layout: 'hbox',
                items: [
                    {
                        cls: 'caltd',
                        layout:'vbox',
                        items: [
                            {
                                itemId: 'eventDay'
                            },
                            {
                                itemId: 'eventMonth',
                                cls: 'eventMonth'
                            },
                            {
                                html:'Member only',
                                style: 'background: green;font-size:14px;'
                            }
                        ]
                    },
                    {
                        layout:'vbox',
                        width:250,
                        style: 'padding: 5px;color:#000000; font-size:12px;',
                        items:[
                            {
                                itemId:'eventSummary',
                                cls:'eventSummary',
                                style: 'font-size:12px;'
                            },
                            {
                                itemId: 'timeAndlocation'
                            },
                            {
                                xtype:'button',
                                text: 'Register Now',
                                itemId:'registerButton',
                                cls:'buttonMoreinfoPanel'
                            }
                        ]
                    }
                    
                ]
            },
            {
                layout:'vbox',
                style: 'color:#000000;',
                items: [
                    {
                        layout:'hbox',
                        items: [
                            {
                                html:'Dates :'
                            },
                            {
                                itemId:'datesEvent',
                                style:'padding-left:20px;'
                            }
                        ]
                    },
                    {
                        layout:'hbox',
                        items: [
                            {
                                html: 'List Price :',
                                itemId:'labelListPriceEvent'
                            },
                            {
                                itemId:'listPriceEvent',
                                style:'padding-left:20px;'
                            }
                        ]
                    },
                    {
                        layout:'hbox',
                        items: [
                            {
                                html: 'Member Price :',
                                itemId:'labelMemberPriceEvent'
                            },
                            {
                                itemId:'memberPriceEvent',
                                style:'padding-left:20px;'
                            }
                        ]
                    }
                ]
            },
            {
                layout:'vbox',
                items: [
                    {
                        cls:'AddToScheduleButton',
                        xtype:'button',
                        width: 150,
                        itemId: 'addToScheduleButton',
                        docked:'left',
                        html:'<div class="addToScheduleLabel">Add to my <br>Schedule</div>'
                    },
                    {
                        html: 'Export To Calendar',
                        xtype:'button',
                        itemId: 'exportToCalendarButton',
                        cls:'bannerMoreButton'
                    },
                    {
                        html: 'Share',
                        xtype:'button',
                        itemId: 'shareButton',
                        cls:'bannerMoreButton'
                    }
                ]
            }
        ]
    }
});