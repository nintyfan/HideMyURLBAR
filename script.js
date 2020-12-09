
function load_page(uri)
{
  browser.runtime.sendMessage({type: 'goto', uri: uri});
  // Hack. If you allow this window to stay open, further invocation didn't pass
  window.close();
}

function on_order_page_load(el, event, contentScript)
{
  
  if (event.keyCode == 13) {
    var val = el.value;
    if (!val.includes('://')) {
    
      val = 'http://' + val;
    }
    if (undefined == contentScript)
       load_page(val);
    else
      window.location.href = val;
    return true;
  }
  
  return false;
}

function extend(element, contentScript)
{
  var document = element;
  document.querySelector("#back_btn").addEventListener('click', function (event) {
  
    if ( undefined == contentScript) {
      browser.runtime.sendMessage({type: 'back'});
    }
    else
    {
      top.history.back();
    }
    return false;
  }, true);
  
  document.querySelector("#forward_btn").addEventListener('click', function (event) {
    
    if (undefined == contentScript)
      browser.runtime.sendMessage({type: 'forward'});
    else
      top.history.forward();
    return false;
  }, true);
  
  document.querySelector("#refresh_btn").addEventListener('click', function (event) {
    
    if (undefined == contentScript)
      browser.runtime.sendMessage({type: 'reload'});
    else
      top.location.reload(true);
    return false;
  }, true);
  document.querySelector("#home_btn").addEventListener('click', function (event) {
    if (true == sl_lach_art_pl_apps_firefox_addon_hide_my_urlbar)
      browser.runtime.sendMessage({type: 'home'});
    else {
      
      
      var a = browser.browserSettings.homepageOverride.get({}).then(result => {
        console.log(result.value);
        var addr = result.value.split("=");
        addr.shift();
        addr = addr.join("=");
        var a = browser.tabs.executeScript(tab_id, {code:
          'window.location = "' + addr +'"'});
      });
    }
    return false;
  }, true);
  document.querySelector("#goto").addEventListener('keyup', function (event) {
    
    on_order_page_load(this, event, contentScript);
    
    return false;
  }, true);
}

window.addEventListener('load', function (event) {

   extend(document);  
}, true);
