function remarkIt() {
  // Chrome wraps raw text content in a pre
  var pre = document.querySelector('pre');

  if (pre) {
    var url = document.location.href.split(/[\#\?]/, 2)[0];
    var fileName = url.split('/').slice(-1)[0];

    var win = window.open('', fileName, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=' + (screen.width) + ', height=' + (screen.height) + ', top=0, left=0');
    // @ts-ignore
    win.document.write('<!doctype html>' +
      '<head><title>' + fileName + '</title></head><body>' +
      '<link rel="stylesheet" href="' + chrome.extension.getURL('vendor/remark/remark.css') + '">' +
      '<pre id="source">' + pre.innerHTML + '</pre>' +
      '<script src="' + chrome.extension.getURL('vendor/remark/remark.js') + '"></script>' +
      '<script src="' + chrome.extension.getURL('vendor/remark/init.js') + '"></script>' +
      '</body></html>');
  }
}

function takahashiIt() {
  // Chrome wraps raw text content in a pre
  var pre = document.querySelector('pre');

  if (pre) {
    var url = document.location.href.split(/[\#\?]/, 2)[0];
    var fileName = url.split('/').slice(-1)[0];

    var win = window.open('', fileName);
    // @ts-ignore
    win.document.write('<!doctype html>' +
      '<head><title>' + fileName + '</title>' +
      '<link rel="stylesheet" href="' + chrome.extension.getURL('vendor/takahashi/common.css') + '">' +
      '<link rel="stylesheet" title=light href="' + chrome.extension.getURL('vendor/takahashi/light.css') + '">' +
      '<link rel="alternate stylesheet" title=dark href="' + chrome.extension.getURL('vendor/takahashi/dark.css') + '">' +
      '<link rel="alternate stylesheet" title=EVA href="' + chrome.extension.getURL('vendor/takahashi/eva.css') + '">' +
      '<link rel="alternate stylesheet" title=debug href="' + chrome.extension.getURL('vendor/takahashi/debug.css') + '">' +
      '<link rel="stylesheet" title=light href="' + chrome.extension.getURL('vendor/takahashi/prismjs/themes/prism.css') + '">' +
      '<link rel="alternate stylesheet" title=dark href="' + chrome.extension.getURL('vendor/takahashi/prismjs/themes/prism-twilight.css') + '">' +
      '<link rel="alternate stylesheet" title=EVA href="' + chrome.extension.getURL('vendor/takahashi/prismjs/themes/prism-tomorrow.css') + '">' +
      '</head><body>' +
      '<pre id="source">' + pre.innerHTML + '</pre>' +
      '<script src="' + chrome.extension.getURL('vendor/takahashi/prismjs/prism-core.min.js') + '"></script>' +
      '<script src="' + chrome.extension.getURL('vendor/takahashi/prismjs/prism-autoloader.min.js') + '"></script>' +
      '<script src="' + chrome.extension.getURL('vendor/takahashi/prism-file-highlight.js') + '"></script>' +
      '<script src="' + chrome.extension.getURL('vendor/takahashi/takahashi.js') + '"></script>' +
      '<script src="' + chrome.extension.getURL('vendor/takahashi/init.js') + '"></script>' +
      '</body></html>');
  }
}

function isMarkdown(sendResponse: { (response?: any): void; (arg0: { isMarkdown: boolean; }): void; }) {
  // If there is no title element, we're looking at a raw
  // file... It's a hack, but it's pretty effective.
  var result = !document.getElementsByTagName('title').length;

  sendResponse({ isMarkdown: result });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'remark-it') {
    remarkIt();
  } else if(request.message === 'takahashi-it') {
    takahashiIt();
  } else if (request.message === 'is-markdown') {
    isMarkdown(sendResponse);
  }
});
