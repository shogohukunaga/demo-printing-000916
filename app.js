const menu=document.querySelector('.menu');
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.open=false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary').focus()}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
const toggle=document.querySelector('#motion-toggle');
function motionState(){document.body.classList.toggle('motion-paused',paused);if(toggle){toggle.textContent=paused?'動きを再開する ▷':'動きを止める Ⅱ';toggle.setAttribute('aria-pressed',String(paused))}}
toggle?.addEventListener('click',()=>{paused=!paused;motionState()});
reduced.addEventListener('change',e=>{paused=e.matches;motionState()});motionState();
setInterval(()=>{if(paused||document.hidden||document.querySelector('.detail-panel:target')||menu?.open)return;document.querySelectorAll('.cycle').forEach(e=>{const a=[...e.querySelectorAll('.cycle-art')];const n=a.findIndex(v=>v.classList.contains('active'));a[n].classList.remove('active');a[(n+1)%a.length].classList.add('active')})},2000);
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.strengths li,.company-card,.service-card').forEach((e,i)=>{e.style.animationDelay=(i%5)*.09+'s';io.observe(e)});
function parallax(){if(paused||reduced.matches)return;const s=document.querySelector('.service-section');if(!s)return;const r=s.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const shift=Math.min(160,Math.max(-80,(innerHeight*.5-r.top)*.13));document.querySelectorAll('.parallax').forEach((e,i)=>e.style.transform=`translateY(${-shift*(i%2?.7:1)}px)`)}
let queued=false;addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{parallax();queued=false})}},{passive:true});
let opener=null;let activePanel=null;
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=document.getElementById(a.hash.slice(1));if(target?.classList.contains('detail-panel'))opener=a}));
function panelState(){activePanel=document.querySelector('.detail-panel:target');document.querySelectorAll('.detail-panel').forEach(p=>{if(p===activePanel){p.setAttribute('role','dialog');p.setAttribute('aria-modal','true');p.setAttribute('aria-label',p.querySelector('h2')?.innerText.replaceAll('\n',' ')||'詳細');p.tabIndex=-1;p.scrollTop=0;requestAnimationFrame(()=>p.querySelector('.detail-close').focus({preventScroll:true}))}else{p.removeAttribute('aria-modal');p.removeAttribute('role')}})}
addEventListener('hashchange',panelState);panelState();
document.addEventListener('keydown',e=>{const region=activePanel|| (menu?.open?menu:null);if(!region)return;if(e.key==='Escape'&&activePanel){e.preventDefault();const back=activePanel.querySelector('.detail-close').getAttribute('href');location.hash=back;opener?.focus({preventScroll:true})}if(e.key==='Tab'){const nodes=[...region.querySelectorAll('a,button,summary')].filter(n=>n.getClientRects().length);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
