chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if (request.update === "update"){
      chrome.tabs.insertCSS({
        code: request.cssRemoved
      });
      chrome.tabs.insertCSS({
        code: request.cssRemaining
      });
    }
  }
);
