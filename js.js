var init = function init() {
  var debeep = document.getElementById('beep')
  debeep.addEventListener('change', handleDebeep);

  var picker = document.getElementById('picker')
  picker.addEventListener('change', handleVinylPicker);

  var paintPicker = document.getElementById('paintPicker')
  paintPicker.addEventListener('change', handlePaintPicker);

  window.addEventListener('resize', handleResize);

  loadSVGs();
  handleResize();
};

var handleResize = function handleResize(){
  var sandbox = document.getElementById('sandbox').offsetHeight;
  var wrapper = document.getElementById('wrapper');
  wrapper.style.height = sandbox + 'px';
};

var handleDebeep = function handleDebeep(e) {
  var beeps = document.querySelectorAll('.beep');
  Array.prototype.forEach.call(beeps, function(el, i){

    if (e.target.checked) {
      addClass(el, 'is-hidden');
    } else {
      removeClass(el, 'is-hidden');
    }
  });
};


var handlePaintPicker = function handlePaintPicker(e) {
  var svgpaths = document.querySelectorAll('.paintsvg path, .paintsvg rect, .paintsvg polygon');
  document.getElementById('paintColor').textContent = e.target.value;
  Array.prototype.forEach.call(svgpaths, function(el, i){
    el.style.fill = e.target.value;
  });
};

var handleVinylPicker = function handleVinylPicker(e) {
  var svgpaths = document.querySelectorAll('.bulbsvg path, .bulbsvg rect, .bulbsvg polygon');
  document.getElementById('vinylColor').textContent = e.target.value;
  Array.prototype.forEach.call(svgpaths, function(el, i){
    el.style.fill = e.target.value;
  });
};

var loadSVGs = function loadSVGs() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET","light_bulbs.svg",false);
  xhr.overrideMimeType("image/svg+xml");
  xhr.send("");
  document.getElementById("bulbContainer").appendChild(xhr.responseXML.documentElement);
  xhr.open("GET","paint.svg",false);
  xhr.overrideMimeType("image/svg+xml");
  xhr.send("");
  document.getElementById("paintContainer").appendChild(xhr.responseXML.documentElement);
}

var addClass= function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};

var removeClass = function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

var ready = function ready(fn) {
  // if (document.readyState != 'loading'){
  //   fn();
  // } else {
  //   document.addEventListener('DOMContentLoaded', fn);
  // }
  window.addEventListener('load', fn, true);
}

ready(init);
