var AP = (function(){
  var a = document.createElement("video"), autoplay = 0, k = 5, p = 1, url = null;
  var f = {
    info: function(i) { console.info(i); },
    onerror: function() {
      console.log("AP error", a.error);
      if (a.error.code == 3)
        setTimeout(f.load, 150);
      if (p)
        a.onpause();
    },
    load: function() {
      if (url && k > 0) {
        a.src = url;
        a.load();
        k--;
      }
    },
    onloadedmetadata: function() {
      f.info("AP: Metadata loaded.");
      k = 5;
      if (p) {
        a.pause();
        a.onpause();
      }
      else 
        a.play();
    },
    pause: function() {
      a.pause();
      a.src = "silence.mp3";
      a.load();
      p = 1;
    },
    play: function() { k = 5; p = 0; f.load(); }
  };
  var g = {
    a: a,
    bind: function(u) {
      for (var x in u)
        a[x] = u[x];
    },
    pause: f.pause,
    paused: function() {
      return p;
    },
    toggle: function() {
      p ? f.play() : f.pause();
    },
    setUrl: function(u) {
      if (!a.paused)
        a.pause();
      p = 1;
      url = u;
      f.info("AP: URL: " + u);
      if (autoplay)
        f.play();
    },
    setVol: function(v) {
      if (true) {
        a.volume = v;
      }
    },
    init: function(a) {
      autoplay = a ? 1 : 0;
    }
  };
  a.preload = "metadata";
  a.onloadedmetadata = f.onloadedmetadata;
  a.onerror = f.onerror;
  return g;
})();