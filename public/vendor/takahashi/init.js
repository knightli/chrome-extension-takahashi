void function() {
  'use strict' // for Chrome 47-
  
  if (typeof fetch !== 'function') {
    alert('Sorry, your browser is too low!')
    return
  }
  
  var pre = document.querySelector('pre');
  var content = pre.innerHTML;
  pre.style.display = "none";

  takahashi(content);

}();