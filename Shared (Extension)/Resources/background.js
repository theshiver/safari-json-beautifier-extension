chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    console.log('Headers received:', details.responseHeaders);
    for (let header of details.responseHeaders) {
      if (header.name.toLowerCase() === 'content-type' && header.value.toLowerCase().includes('application/json')) {
        chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
        break;
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
