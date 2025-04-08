(async () => {
  const {fastSubmit} = await chrome.storage.local.get("fastSubmit");

  changeSubmitButtonText(fastSubmit);
})();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && "fastSubmit" in changes) {
    const newValue = changes.fastSubmit.newValue;

    changeSubmitButtonText(newValue);
  }
});

function changeSubmitButtonText(fastSubmit) {
  const submitButton = document.querySelector("body > div.wrapper > div.container.content > div.row > div:nth-child(2) > ul > li:nth-child(2) > a")
  if (!submitButton) return;

  submitButton.text = fastSubmit ? '빠른 제출' : '제출';
}