var sl_lach_art_pl_apps_firefox_addon_hide_my_urlbar = true;

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
