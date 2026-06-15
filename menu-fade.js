/* Dégradé d'indication de défilement sur les menus (barre du haut .navbar + sous-menu .hub-nav).
   Affiche un fondu sur le bord gauche et/ou droit UNIQUEMENT quand le menu déborde de l'écran,
   et seulement du côté où il reste du contenu à faire défiler (rien sur grand écran). */
(function () {
  var FADE = 26; // largeur du fondu, en pixels

  function applyFade(el) {
    var max = el.scrollWidth - el.clientWidth; // dépassement horizontal
    var mask = 'none';
    if (max > 4) {
      var left = el.scrollLeft > 2;            // du contenu caché à gauche ?
      var right = el.scrollLeft < max - 2;     // du contenu caché à droite ?
      if (left && right) {
        mask = 'linear-gradient(to right, transparent 0, #000 ' + FADE + 'px, #000 calc(100% - ' + FADE + 'px), transparent 100%)';
      } else if (right) {
        mask = 'linear-gradient(to right, #000 calc(100% - ' + FADE + 'px), transparent 100%)';
      } else if (left) {
        mask = 'linear-gradient(to right, transparent 0, #000 ' + FADE + 'px)';
      }
    }
    el.style.webkitMaskImage = mask;
    el.style.maskImage = mask;
  }

  var menus = document.querySelectorAll('.navbar, .hub-nav');

  function refreshAll() {
    for (var i = 0; i < menus.length; i++) applyFade(menus[i]);
  }

  for (var i = 0; i < menus.length; i++) {
    (function (el) {
      el.addEventListener('scroll', function () { applyFade(el); }, { passive: true });
    })(menus[i]);
  }

  refreshAll();
  window.addEventListener('resize', refreshAll);
  window.addEventListener('load', refreshAll); // recalcule une fois les polices chargées
})();
