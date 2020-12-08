
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
