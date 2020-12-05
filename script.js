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
function load_page(uri)
{
  browser.runtime.sendMessage({type: 'goto', uri: uri});
  // Hack. If you allow this window to stay open, further invocation didn't pass
  window.close();
}

function on_order_page_load(el, event)
{
  
  if (event.keyCode == 13) {
    var val = el.value;
    if (!val.includes('://')) {
    
      val = 'http://' + val;
    }
    load_page(val);
    return true;
  }
  
  return false;
}

window.addEventListener('load', function (event) {
  document.querySelector("#back_btn").addEventListener('click', function (event) {
    
    browser.runtime.sendMessage({type: 'back'});
    
    return false;
  }, true);
 
  document.querySelector("#forward_btn").addEventListener('click', function (event) {
    
    browser.runtime.sendMessage({type: 'forward'});
    
    return false;
  }, true);
  
  document.querySelector("#refresh_btn").addEventListener('click', function (event) {
    
    browser.runtime.sendMessage({type: 'reload'});
    
    return false;
  }, true);
  document.querySelector("#home_btn").addEventListener('click', function (event) {
    
    browser.runtime.sendMessage({type: 'home'});
    
    return false;
  }, true);
  document.querySelector("#goto").addEventListener('keyup', function (event) {
    
    on_order_page_load(this, event);
    
    return false;
  }, true);
}, true);
