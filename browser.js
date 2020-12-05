/*
 *    HideMyURLBar - a program that reduces space usage by hiding Firefox urlbar
 *    Copyright (C) 2020 Sławomir Lach <slawek@lach.art.pl>
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 * 
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 * 
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
 */

browser.menus.create({title: 'Navigation', id: 'Special', contexts: ['page', 'tab']}); 

var tab_id;

function newPopup(tab)
{
  tab_id = tab;
   browser.browserAction.openPopup();
}



browser.menus.onClicked.addListener( function (info, tab) {
    
		// console.log(tab.title);
  newPopup(tab.id);
  
});

browser.runtime.onMessage.addListener(data => {

  var a = null;
  if (data.type === "home") {
    
    var a = browser.browserSettings.homepageOverride.get({}).then(result => {
      console.log(result.value);
      var addr = result.value.split("=");
      addr.shift();
      addr = addr.join("=");
      var a = browser.tabs.executeScript(tab_id, {code:
      'window.location = "' + addr +'"'});
    });
    //var a = browser.tabs.executeScript(tab_id, {code: 'location.href = "about:home";'});
    //var a = browser.tabs.executeScript(tab_id, {code: 'window.home();'});
  }
  else if (data.type === "reload") {
    
    var a = browser.tabs.executeScript(tab_id, {code: 'window.location.reload(true);'});
  }
  else  if (data.type === "back") {
  
    var a = browser.tabs.executeScript(tab_id, {code: 'window.history.back();'});
  }
  else  if (data.type === "forward") {
  
    var a = browser.tabs.executeScript(tab_id, {code: 'window.history.forward();'});
  }
  else if (data.type === 'goto')   {
    var a = browser.tabs.executeScript(tab_id, {code: 'window.location = "' + encodeURI(data.uri) + '";'});
  }
  if (a) a.then(function (result) {}, function (result) {});
  return Promise.resolve(false);                                    
});
