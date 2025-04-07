(async () => {
  const {fastSubmit} = await chrome.storage.local.get("fastSubmit");

  console.log('fastSubmit', fastSubmit);

  if (fastSubmit) {
    let submissionObserver = new MutationObserver(() => {
      const input = document.querySelector('textarea#copy');
      if (!input) {
        console.log('input is required');
        const textarea = document.createElement('textarea');
        textarea.id = 'copy';
        document.body.appendChild(textarea);
        return;
      }

      input.focus();

      setTimeout(() => {
        navigator.clipboard.readText().then((clipText) => {
          if (!!input.value) return;

          input.value = clipText;

          let pastedText = input.value;

          console.log(pastedText);

          if (!pastedText) return;

          pastedText = pastedText.replace(/package (.*?);/g, '');
          pastedText = pastedText.replace(/public class (.*?) {/g, 'public class Main {');

          console.log(pastedText);

          document.querySelector('textarea#source').value = pastedText;

          document.querySelector('form#submit_form').submit();
        });
      }, 1000);
    });

    submissionObserver.observe(document, {childList: true, subtree: true});
  } else {
    document.addEventListener("paste", function (e) {
      e.preventDefault();
      var pastedText = undefined;
      if (window.clipboardData && window.clipboardData.getData) {
        pastedText = window.clipboardData.getData('Text');
      } else if (e.clipboardData && e.clipboardData.getData) {
        pastedText = e.clipboardData.getData('text/plain');
      }

      pastedText = pastedText.replace(/package (.*?);/g, '')
      pastedText = pastedText.replace(/public class (.*?) {/g, 'public class Main {')

      e.target.value = pastedText;
    }, true);
  }
})();
