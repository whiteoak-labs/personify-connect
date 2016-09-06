Ext.define('Personify.utils.BackHandler', {
    actions: null,
    targets: null,
    args: null,

    statics: {
           getTop:function() {
               return Personify.utils.BackHandler.actions !=null ? Personify.utils.BackHandler.actions.length : 0;
           },
           
           pushActionAndTarget:function(newAction, newTarget)
           {
                    if(Personify.utils.BackHandler.actions == null)
                   {
                       Personify.utils.BackHandler.actions = new Array();
                       Personify.utils.BackHandler.targets = new Array();
                       Personify.utils.BackHandler.args = new Array();
                   }
           
                   var indexAcion = Personify.utils.BackHandler.actions.lastIndexOf(newAction);
                   var indexTarget = Personify.utils.BackHandler.targets.lastIndexOf(newTarget);
                    var newsrgs = Array.prototype.slice.call(arguments, 2);
           
               if(indexAcion == indexTarget && newsrgs == Personify.utils.BackHandler.args[indexAcion]) return;
           
                   Personify.utils.BackHandler.args.push(newsrgs);
                   Personify.utils.BackHandler.actions.push(newAction);
                   Personify.utils.BackHandler.targets.push(newTarget);
           },
           
           popActionAndTarget:function(oldAction, oldTarget)
           {
               var arrayLength = Personify.utils.BackHandler.getTop();
               if(arrayLength > 0)
               {
                   var indexAcion = Personify.utils.BackHandler.actions.lastIndexOf(oldAction);
                   var indexTarget = Personify.utils.BackHandler.targets.lastIndexOf(oldTarget);
                   if(indexAcion == indexTarget && indexTarget == arrayLength-1)
                   {
                       Personify.utils.BackHandler.args.pop();
                       Personify.utils.BackHandler.actions.pop();
                       Personify.utils.BackHandler.targets.pop();
                   }
               }
           },
           
           clearAllActions:function()
           {
                if(Personify.utils.BackHandler.getTop() > 0)
               {
                   Personify.utils.BackHandler.args.length = 0;
                   Personify.utils.BackHandler.actions.length = 0;
                   Personify.utils.BackHandler.targets.length = 0;
               }
           },
           
           popActions:function(index)
           {
               if(Personify.utils.BackHandler.getTop() >= index)
               {
                   Personify.utils.BackHandler.args.length = index;
                   Personify.utils.BackHandler.actions.length = index;
                   Personify.utils.BackHandler.targets.length = index;
               }
           },
           
           executeFunctionAtTop:function(willExecute)
           {
               var targetObj = Personify.utils.BackHandler.targets.pop();
               var actionObj =Personify.utils.BackHandler.actions.pop();
               var argsObj = Personify.utils.BackHandler.args.pop();
                if(targetObj && typeof targetObj[actionObj] == 'function'  && willExecute)
               {
                   targetObj[actionObj].apply(targetObj, argsObj);
               }
           },
           
           onBackKeyDown:function(eve) {
               var shouldExecute = true;
                if(Ext.Msg.isHidden() == false)
               {
                   shouldExecute = false;
                    Ext.Msg.hide();
               }
           
               if(shouldExecute)
               {
                   var components = Ext.ComponentQuery.query('picker, actionsheet, panel[cls=x-select-overlay]');
                   Ext.each(components, function(obj, index) {
                        if(obj.isHidden() == false)
                            {
                                shouldExecute = false;
                                obj.hide();
                            }
                    });
               }
           
//               else if(document.activeElement.type == "text" || document.activeElement.type == "textarea" || document.activeElement.type == "password" || document.activeElement.type == "search")
//               {
//                    document.activeElement.blur();
//               }
               if(Personify.utils.BackHandler.getTop() > 0 && shouldExecute)
               {
                       eve.preventDefault();
                       Personify.utils.BackHandler.executeFunctionAtTop(true);
               }
        },
    }
});
