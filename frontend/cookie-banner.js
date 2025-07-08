
(function(){
  if (!localStorage.getItem('cookieConsent')) {
    var banner = document.createElement('div');
    banner.innerHTML = 'This website uses cookies to enhance learning. <button id="acceptCookies">Accept</button>';
    banner.style.position = 'fixed';
    banner.style.bottom = 0;
    banner.style.width = '100%';
    banner.style.backgroundColor = '#003366';
    banner.style.color = 'white';
    banner.style.padding = '10px';
    banner.style.textAlign = 'center';
    document.body.appendChild(banner);
    document.getElementById('acceptCookies').onclick = function() {
      localStorage.setItem('cookieConsent', 'true');
      document.body.removeChild(banner);
    };
  }
})();
