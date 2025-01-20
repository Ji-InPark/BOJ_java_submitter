document.addEventListener("paste", function (e) {
  e.preventDefault();
  var pastedText = undefined;
  if (window.clipboardData && window.clipboardData.getData) { // IE
    pastedText = window.clipboardData.getData('Text');
  } else if (e.clipboardData && e.clipboardData.getData) {
    pastedText = e.clipboardData.getData('text/plain');
  }

  pastedText = pastedText.replace(/package (.*?);/g,  '')
  pastedText = pastedText.replace(/public class (.*?) {/g,  'public class Main {')

  e.target.value = pastedText;
}, true);