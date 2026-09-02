document.getElementById('year').textContent = new Date().getFullYear();

(function(){
  const messages = [
    "Hello there!",
    "Glad you stopped by",
    "Almost ready to meet you",
    "Pardon the dust ✨",
    "Building something nice"
  ];
  const el = document.getElementById('bubbleText');
  let mi = 0, ci = 0, deleting = false;

  function tick(){
    const cur = messages[mi];
    if(deleting){
      el.textContent = cur.substring(0, ci--);
      if(ci < 0){
        deleting = false;
        mi = (mi + 1) % messages.length;
        setTimeout(tick, 480);
        return;
      }
      setTimeout(tick, 32);
    } else {
      el.textContent = cur.substring(0, ci++);
      if(ci > cur.length){
        deleting = true;
        setTimeout(tick, 2400);
        return;
      }
      setTimeout(tick, 72 + Math.random() * 50);
    }
  }
  tick();
})();

(function(){
  const num = document.getElementById('progNum');
  const bar = document.getElementById('progBar');
  let p = 30;
  function bump(){
    p += (Math.random() * 1.6 - 0.4);
    if(p > 72) p = 22;
    if(p < 18) p = 22;
    const v = Math.max(18, Math.floor(p));
    num.textContent = v;
    bar.style.width = v + '%';
  }
  setInterval(bump, 3800);
})();

(function(){
  if(window.matchMedia('(pointer: coarse)').matches) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const blobs = document.querySelectorAll('.blob');
  let tx = 0, ty = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function loop(){
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;
    blobs.forEach((b, i) => {
      const f = (i + 1) * 14;
      b.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
})();