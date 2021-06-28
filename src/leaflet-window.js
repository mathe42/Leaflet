import * as L from '../dist/leaflet-es6.js'

const oldL = window.L;

window.noConflict = function () {
  window.L = oldL;
  return L;
}

// window.L.noConflict = window.noConflict;

// Always export us to window global (see #2364)
window.L = L;