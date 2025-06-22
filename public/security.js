// 🛡️ PROTEÇÃO CONTRA CLICKJACKING
(function () {
  'use strict';
  
  // Impede que o site seja carregado em iframe malicioso
  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  // Proteção adicional contra frame busting
  try {
    if (window.parent && window.parent !== window) {
      window.parent.location = window.location;
    }
  } catch (e) {
    // Bloqueado pelo CSP - isso é bom!
    console.log('Frame busting protection active');
  }
})();