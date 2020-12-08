
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
    if (browser.runtime)
       load_page(val);
    else
      window.location.href = val;
    return true;
  }
  
  return false;
}

window.addEventListener('load', function (event) {
  document.querySelector("#back_btn").addEventListener('click', function (event) {
    
    if ( browser.runtime)
      browser.runtime.sendMessage({type: 'back'});
    else
      window.history.back();
    return false;
  }, true);
 
  document.querySelector("#forward_btn").addEventListener('click', function (event) {
    
    if (true == sl_lach_art_pl_apps_firefox_addon_hide_my_urlbar)
      browser.runtime.sendMessage({type: 'forward'});
    else
      window.history.forward();
    return false;
  }, true);
  
  document.querySelector("#refresh_btn").addEventListener('click', function (event) {
  
    if (true == sl_lach_art_pl_apps_firefox_addon_hide_my_urlbar)
      browser.runtime.sendMessage({type: 'reload'});
    else
      window.history.reload(true);
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
    
    on_order_page_load(this, event);
    
    return false;
  }, true);
}, true);
