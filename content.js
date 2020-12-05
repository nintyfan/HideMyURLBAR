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
if (document.documentElement.attachShadow) {

  var sp_pos = 'bottom';
  let span = document.createElement("span");
  let root = span.attachShadow({ mode: "closed" });
  let div = document.createElement('div');
  
  
  div.innerText = window.location.href;
  root.appendChild(div);
  
  span.style.background = 'yellow';
  span.style.color = 'red';
  span.style.position = 'fixed';
  span.style.right = '0';
  span.style.bottom = '0';
  span.addEventListener('mouseover', function (event) {
  
    if ('bottom' == sp_pos) {
    
      span.style.top = '0';
      span.style.bottom = 'initial'; 
      sp_pos = 'top';
    }
    else {
    
      sp_pos = 'bottom';
      span.style.top = 'initial';
      span.style.bottom = '0';
    }
  }, true);
  
  document.documentElement.appendChild(span);
}
