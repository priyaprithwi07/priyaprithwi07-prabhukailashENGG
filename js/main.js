/* ============================================================
   PKEC – Main JavaScript v2.0
   ============================================================ */

(function(){

  /* ── Mobile Nav ── */
  window.toggleNav = function(){
    var nav = document.querySelector('.main-nav ul');
    if(nav) nav.classList.toggle('open');
  };
  document.addEventListener('click', function(e){
    if(!e.target.closest('.main-hdr')){
      var nav = document.querySelector('.main-nav ul');
      if(nav) nav.classList.remove('open');
    }
  });

  /* ── Scroll events ── */
  var scrBtn = document.querySelector('.scroltop');
  window.addEventListener('scroll', function(){
    if(scrBtn) scrBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  /* ── Tab switching ── */
  window.showTab = function(id, el){
    document.querySelectorAll('.md-panel').forEach(function(p){ p.classList.remove('active'); });
    document.querySelectorAll('.md-tab').forEach(function(t){ t.classList.remove('active'); });
    var panel = document.getElementById('tab-' + id);
    if(panel) panel.classList.add('active');
    if(el) el.classList.add('active');
  };

  /* ── Feedback panel switching ── */
  window.showFb = function(id, el){
    document.querySelectorAll('.fb-panel').forEach(function(p){ p.classList.remove('active'); });
    document.querySelectorAll('.fb-tab-btn').forEach(function(t){ t.classList.remove('active'); });
    var panel = document.getElementById('fb-' + id);
    if(panel) panel.classList.add('active');
    if(el) el.classList.add('active');
  };

  /* ── Star rating ── */
  window.rate = function(rowId, n){
    var btns = document.querySelectorAll('#' + rowId + ' .star-btn');
    btns.forEach(function(b, i){ b.classList.toggle('lit', i < n); });
  };

  /* ── Grievance Form submit ── */
  window.submitGrievance = function(){
    var decl = document.getElementById('gf_decl');
    if(!decl || !decl.checked){ alert('Please accept the declaration before submitting.'); return; }
    var required = ['gf_name','gf_roll','gf_mob','gf_email','gf_sub','gf_desc'];
    for(var i=0; i<required.length; i++){
      var el = document.getElementById(required[i]);
      if(!el || !el.value.trim()){ alert('Please fill all required fields.'); el && el.focus(); return; }
    }
    var token = 'GRC-' + Math.floor(Math.random()*90000+10000);
    var tEl = document.getElementById('gf_token');
    if(tEl) tEl.textContent = token;
    var s = document.getElementById('gf_success');
    if(s){ s.style.display='block'; s.scrollIntoView({behavior:'smooth',block:'center'}); }
  };

  window.clearGF = function(){
    document.querySelectorAll('.gf-wrap input,.gf-wrap select,.gf-wrap textarea').forEach(function(el){
      if(el.type==='radio'||el.type==='checkbox'){ el.checked = el.defaultChecked; }
      else{ el.value = ''; }
    });
    var s = document.getElementById('gf_success');
    if(s) s.style.display = 'none';
  };

  /* ── Feedback submit ── */
  window.submitFb = function(id){
    var el = document.getElementById(id);
    if(el){ el.style.display='block'; el.scrollIntoView({behavior:'smooth',block:'center'}); }
  };

  /* ── Contact form submit ── */
  window.submitContact = function(){
    var n = document.getElementById('c_name');
    var e = document.getElementById('c_email');
    var m = document.getElementById('c_msg');
    if(!n||!n.value.trim()){ alert('Please enter your name.'); return; }
    if(!e||!e.value.trim()){ alert('Please enter your email.'); return; }
    if(!m||!m.value.trim()){ alert('Please enter your message.'); return; }
    var s = document.getElementById('contact_success');
    if(s){ s.style.display='block'; s.scrollIntoView({behavior:'smooth',block:'center'}); }
    if(n) n.value=''; if(e) e.value=''; if(m) m.value='';
  };

  /* ── Payment mode select ── */
  window.selPay = function(el){
    document.querySelectorAll('.pay-mode').forEach(function(e){ e.classList.remove('sel'); });
    el.classList.add('sel');
  };

  /* ── Scroll-to-top ── */
  window.scrollTop = function(){ window.scrollTo({top:0,behavior:'smooth'}); };

  /* ── Counter animation ── */
  function animateCounters(){
    document.querySelectorAll('[data-count]').forEach(function(el){
      var target = parseInt(el.dataset.count);
      var suffix = el.dataset.suffix || '';
      var dur = 1400, step = Math.ceil(target/50), cur=0;
      var timer = setInterval(function(){
        cur += step;
        if(cur>=target){ cur=target; clearInterval(timer); }
        el.textContent = cur.toLocaleString() + suffix;
      }, dur/50);
    });
  }
  var counted = false;
  var ob = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting && !counted){ counted=true; animateCounters(); }
  },{threshold:0.3});
  var heroStats = document.querySelector('.hero-right');
  if(heroStats) ob.observe(heroStats);

})();
