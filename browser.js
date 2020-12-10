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

function send_home_to_tab(tab_id, value)
{
  console.log(tab_id);
  console.log(value);
  return browser.tabs.sendMessage(
    tab_id,
    {type: 'home', homeURI: value});
}

function updateHomeURL(value)
{
  browser.tabs.query({
  }).then(tabs => {
    
    browser.tabs.query({}).then(tabs => {
      let promises = []
      for (let tab of tabs) {
        promises.push(send_home_to_tab(tab.id, value));
      }
      Promise.all(promises);
      
      return Promise.resolve(true);
    });
  });
}

var home_uri = null;

function get_home_uri()
{
  console.log(home_uri);
  return home_uri;
}

browser.browserSettings.homepageOverride.get({}).then(result => {
  console.log(result.value);
  var addr = result.value.split("=");
  addr.shift();
  addr = addr.join("=");
  home_uri = addr;
  
  updateHomeURL(get_home_uri());
});


browser.webNavigation.onCompleted.addListener(function (object) {
  
  send_home_to_tab(object.tabId, get_home_uri());
});

browser.browserSettings.homepageOverride.onChange.addListener(function (data) {

  var addr = data.value;
  var addr = addr.value.split("=");
  addr.shift();
  addr = addr.join("=");
  home_uri = addr;
  updateHomeURL(get_home_uri());
});
console.log(home_uri);
browser.runtime.onMessage.addListener(function (data, sender) {

  var tab_id = tab_id;
  if (sender && sender.tab)
    tab_id = sender.tab.id;

  var a = null;
  if (data.type === "GetHome") {
  

    send_home_to_tab(tab_id, get_home_uri());
    return Promise.resolve(get_home_uri());
  }
  else if (data.type === "home") {
    
    var a = browser.browserSettings.homepageOverride.get({}).then(result => {
      var a = browser.tabs.executeScript(tab_id, {code:
      'window.location = "' + home_uri+'"'});
    });
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
