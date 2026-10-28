const MENU_ID = "search-google-maps";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Search Google Maps for \"%s\"",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !info.selectionText) return;

  // Addresses copied off pages often span lines; collapse to one line.
  const query = info.selectionText.replace(/\s+/g, " ").trim();
  if (!query) return;

  chrome.tabs.create({
    url: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query),
    index: tab ? tab.index + 1 : undefined,
    openerTabId: tab ? tab.id : undefined
  });
});
