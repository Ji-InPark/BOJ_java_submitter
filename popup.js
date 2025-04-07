const toggle = document.getElementById("toggleSwitch");
const statusText = document.getElementById("statusText");
const submitButton = document.querySelector("body > div.wrapper > div.container.content > div.row > div:nth-child(2) > ul > li:nth-child(2) > a");

async function updateUI() {
  const {fastSubmit: fastSubmit} = await chrome.storage.local.get("fastSubmit");
  const isEnabled = fastSubmit === true;

  toggle.checked = isEnabled;
  statusText.textContent = isEnabled ? "빠른 제출 ON" : "빠른 제출 OFF";
}

async function toggleBlocking() {
  const {fastSubmit: fastSubmit} = await chrome.storage.local.get("fastSubmit");

  if (fastSubmit) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1]
    });
  } else {
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [{
        "id": 1,
        "priority": 1,
        "action": {"type": "block"},
        "condition": {
          "urlFilter": "codemirror.min.js",
          "resourceTypes": ["script"]
        }
      }]
    });
  }

  await chrome.storage.local.set({fastSubmit: !fastSubmit});
  updateUI();
}


toggle.addEventListener("change", toggleBlocking);
updateUI();
