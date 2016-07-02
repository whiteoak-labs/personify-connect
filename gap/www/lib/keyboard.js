/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
   
var Keyboard = function() {
};

Keyboard.prototype.shrinkView = function(shrink) {
    cordova.exec(null, null, "Keyboard", "shrinkView", [shrink]);
};

Keyboard.prototype.hideFormAccessoryBar = function(hide) {
    cordova.exec(null, null, "Keyboard", "hideFormAccessoryBar", [hide]);
};

Keyboard.prototype.disableScrollingInShrinkView = function(disable) {
    cordova.exec(null, null, "Keyboard", "disableScrollingInShrinkView", [disable]);
};

Keyboard.isVisible = false;

Keyboard.install = function(){
    if (typeof window.plugins == "undefined") window.plugins = {};
    if (typeof window.plugins.keyboard == "undefined") window.plugins.keyboard = new Keyboard();
    return window.plugins.keyboard;
};

cordova.addConstructor(Keyboard.install);
