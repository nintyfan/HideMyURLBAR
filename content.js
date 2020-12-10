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

  var box =document.createElement("div");
  var sp_pos = 'bottom';
  let span = document.createElement("span");
  let root = span.attachShadow({ mode: "closed" });
  let div = document.createElement('div');

  /*var url = browser.extension.getURL('/');
  
  var head = document.createElement('head');
  
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('href', url + '/style.css');
  
  var script = document.createElement('script');
  script.setAttribute('src', url + '/script.js');
  
  head.appendChild(style);
  head.appendChild(script);
  root.appendChild(head);
  */
  //box.style.display = 'none';  
  
  div.innerText = window.location.href;
  root.appendChild(div);
  
  span.style.background = 'yellow';
  span.style.color = 'red';
  span.style.position = 'fixed';
  span.style.right = '0';
  span.style.bottom = '0';
  div.addEventListener('mouseover', function (event) {
  
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
 // alert(browser.runtime.id);
  var el = document.createElement('button');
  el.innerText = '^More';
  el.style.background = 'green';
  el.style.fontSize = '150%';
  el.style.fontWeight = 'bold';
  root.appendChild(el);
  root.appendChild(box);
  el.addEventListener('click', function (event) {

    
    fetch( browser.extension.getURL('nav.html'))
    .then(response => {
      var parser = new DOMParser();
      response.text().then(text => {
        var doc = parser.parseFromString(text, 'text/html');
        //var head = doc.getElementsByTagName('head')[0];
        //var base = doc.createElement('base');
        //base.setAttribute('src', browser.extension.getURL('/'));
        //head.prepend(base);
        
        console.log(doc);
        box.appendChild(doc.documentElement.cloneNode(true));//page;
        extend(root, true);
        box.style.display = 'block';
      });
    }).catch(error => alert('Error'));
    //box.innerHTML = page;
    //box.style.display = 'block'
   // box.src = 'nav.html';
//       box.src = browser.extension.getURL('./nav.html');
 
    }, true);
  console.log(root);
  document.documentElement.appendChild(span);
}
