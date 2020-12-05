
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
