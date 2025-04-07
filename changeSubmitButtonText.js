(async () => {
  const {fastSubmit} = await chrome.storage.local.get("fastSubmit");

  const submitButton = document.querySelector("body > div.wrapper > div.container.content > div.row > div:nth-child(2) > ul > li:nth-child(2) > a")
  submitButton.text = fastSubmit ? '빠른 제출' : '제출';
})();