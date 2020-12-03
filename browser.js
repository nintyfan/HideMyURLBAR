browser.menus.create({title: 'Navigation', id: 'Special', contexts: ['page', 'tab']}); 

function newPopup(tab)
{

   browser.browserAction.openPopup();
}

browser.tabs.onHighlighted.addListener(function (info) {

   newPopup(info.tabId);
});

browser.menus.onClicked.addListener( function (info, tab) {
    
		// console.log(tab.title);
  newPopup(tab.id);
  
});
