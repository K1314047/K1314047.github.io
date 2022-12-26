var last = new Date();
var lastSecond = 0;
var delta = 0;

function lerp(o,t,p) { return o + (t-o) * p; }

var sDeg = 0;
function seconds(s,ms) {

  var target = s/60 * 360;
  if (target===0 && sDeg > 300) { sDeg = -6; } // Wrapping
  sDeg = lerp(sDeg,target,delta*24);

  hs.transform('R '+sDeg+',71,71');
  hts.transform('R '+(sDeg*-1)+',71,71');

}

var mDeg = 0;
function minutes(m,s) {
  var target = m/60 * 360;
  if (target===0 && mDeg > 300) { mDeg = -6; } // Wrapping
  mDeg = lerp(mDeg,target,delta*24);
  hm.transform('T0,0 R '+mDeg+',71,71');
  htm.transform('T0,0 R '+(mDeg*-1)+',71,71');
}

function hours(h,m) {
  var deg = (h+(m/60))/12 * 360;
  hh.transform('T0,0 R '+deg+',71,71');
  hth.transform('T0,0 R '+(deg*-1)+',71,71');
}

function updateTimes(s,m,h) {

  var i,
  elS = document.getElementsByClassName('displayS'),
  elM = document.getElementsByClassName('displayM'),
  elH = document.getElementsByClassName('displayH');

  function pad(num) {
    var str = num.toString();
    return str.length>1 ? str : '0'+str;
  }

  for (i=0; i<elS.length; i++) { elS[i].innerHTML = pad(s); }
  for (i=0; i<elM.length; i++) { elM[i].innerHTML = pad(m); }
  for (i=0; i<elH.length; i++) { elH[i].innerHTML = pad(h); }

}

function draw() {

  var now = new Date();
  delta = (now.getTime()-last.getTime()) / 1000;
  last = now;

  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var ms = now.getMilliseconds();

  seconds(s,ms);
  minutes(m,s);
  hours(h,m);

  if (s !== lastSecond) { updateTimes(s,m,h); }
  lastSecond = s;

  window.requestAnimationFrame(draw);

}

var c = Snap('#clock');
var hs = c.select('#handS');
var hts = c.select('#handTextS');
var hm = c.select('#handM');
var htm = c.select('#handTextM');
var hh = c.select('#handH');
var hth = c.select('#handTextH');

if (hs && hm && hh) {

  draw();

} else {

  console.log('Not all elements could be found.');

}