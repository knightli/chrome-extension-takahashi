// @ts-ignore
function viewAsSlideshow(tab) {

  if ((tab.url || '').indexOf('.md') > 0 || (tab.url || '').indexOf('/markdown?plain=true&linebreak=false&anchor=false') > 0) {
    let msg = getRemarkMessage();
    console.log('markdown -> slide, msg:'+msg);
    chrome.tabs.sendMessage(tab.id, { message: msg });
  }
  else if ( (tab.url || '').indexOf('https://yuque.alibaba-inc.com')==0 || (tab.url || '').indexOf('https://yuque.com')==0 ) {
    getCurrentTab((function(t) {
      if(t){
        window.open(urlFormat(t.url) + "/markdown?plain=true&linebreak=false&anchor=false", "_blank")
      }
    }));
  }
  else {
    console.log('other conditions');
  }

  
}

function getCurrentTab(e: (arg0: chrome.tabs.Tab | null) => any) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (function(t) {
    e && e(t.length ? t[0] : null)
  }));
}

function urlFormat(e: string | undefined) {
  if(e){
    return e.includes("yuque") ? e.replace("/edit", "") : e;
  }
  return e;
}

chrome.pageAction.onClicked.addListener(viewAsSlideshow);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if ((tab.url || '').indexOf('.md') > 0 || (tab.url || '').indexOf('/markdown?plain=true&linebreak=false&anchor=false') > 0) {
// @ts-ignore
    chrome.tabs.sendMessage(tab.id, { message: 'is-markdown' }, function (response) {
      response && response.isMarkdown && chrome.pageAction.show(tabId);
    });
  }
  else if ( (tab.url || '').indexOf('https://yuque.alibaba-inc.com')==0 || (tab.url || '').indexOf('https://yuque.com')==0 ){
    chrome.pageAction.show(tabId);
  }else {
    console.log(tab.url);
  }
});

var __remarkMode = 'takahashi';

function refreshRemarkMode() {
  console.log('refreshRemarkMode');
  if(chrome.storage) {
    chrome.storage.sync.get(['remarkMode'], function(result) {
      if (result.remarkMode) {
        __remarkMode = result.remarkMode;
      }
    });
  }
}

function getRemarkMessage() {
  return __remarkMode + '-it';
}

refreshRemarkMode();

chrome.storage.onChanged.addListener(function (changes, namespace) {
  refreshRemarkMode();
});