const STORAGE="nva_academy_progress_v3";
const $=id=>document.getElementById(id);
const state=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||"{}")}catch(e){return{}}};
const save=p=>localStorage.setItem(STORAGE,JSON.stringify(p));
function populate(){
 const g=$("grade"),s=$("subject");
 ACADEMY.grades.forEach((x,i)=>g.add(new Option(x,i)));
 ACADEMY.subjects.forEach((x,i)=>s.add(new Option(x,i)));
 g.onchange=fillUnits;s.onchange=fillUnits;$("unit").onchange=fillLessons;fillUnits();
}
function fillUnits(){
 const s=ACADEMY.subjects[+$("subject").value],u=$("unit");
 u.innerHTML="";ACADEMY.units[s].forEach((x,i)=>u.add(new Option("Unit "+(i+1)+": "+x,i)));fillLessons();
}
function fillLessons(){
 const l=$("lesson");l.innerHTML="";
 for(let i=0;i<10;i++)l.add(new Option("Lesson "+(i+1)+": "+ACADEMY.lessonSteps[i],i));
}
function current(){return ACADEMY.make(+$("grade").value,+$("subject").value,+$("unit").value,+$("lesson").value)}
function esc(x){return String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}
function openLesson(){
 const r=current(),p=state(),v=$("lessonView");v.classList.remove("hidden");
 v.innerHTML=
 '<span class="pill">'+esc(r.grade)+' • '+esc(r.subject)+' • Unit '+r.unit+' • Lesson '+r.lesson+'</span>'+
 '<h2>'+esc(r.title)+'</h2>'+
 '<h3>Learning goal</h3><p>'+esc(r.goal)+'</p>'+
 '<h3>Vocabulary</h3><p>'+r.vocabulary.map(esc).join(" • ")+'</p>'+
 '<h3>Learn</h3><p>'+esc(r.learn)+'</p>'+
 '<h3>Teacher / Caregiver Model</h3><p>'+esc(r.model)+'</p>'+
 '<h3>Practice Together</h3><p>'+esc(r.practice)+'</p>'+
 '<h3>Activity</h3><p>'+esc(r.activity)+'</p>'+'<div class="activityGrid"><div class="activityCard"><strong>Choose</strong><p>Select a response.</p><button data-action="choose">Choose</button></div><div class="activityCard"><strong>Match / Sort</strong><p>Connect or group examples.</p><button data-action="match">Try it</button></div><div class="activityCard"><strong>Show</strong><p>Demonstrate the skill your way.</p><button data-action="show">Show what you know</button></div></div><div id="activityFeedback" class="feedback" aria-live="polite">Choose an activity to begin.</div>'+
 '<h3>Ways to Respond</h3><p>'+esc(r.response)+'</p>'+
 '<h3>Visual Support</h3><p>'+esc(r.visual)+'</p>'+
 '<h3>AAC Support</h3><p>'+esc(r.aac)+'</p>'+
 '<h3>Movement / Regulation Break</h3><p>'+esc(r.break)+'</p>'+
 '<h3>Check for Learning</h3><p>'+esc(r.check)+'</p>'+
 '<h3>Extension</h3><p>'+esc(r.extension)+'</p>'+
 '<div class="actions"><button class="primary" id="done">Mark demonstrated</button><button class="secondary" id="mastered">Mark mastered</button><button class="secondary" id="break">Take a break</button></div>'+
 '<p id="status">'+(p[r.id]?"✓ Demonstrated":"Not started")+'</p>';
 document.querySelectorAll("[data-action]").forEach(btn=>btn.onclick=()=>{document.querySelectorAll("[data-action]").forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");$("activityFeedback").textContent=btn.dataset.action==="choose"?"Choose: identify one example that matches the learning goal.":btn.dataset.action==="match"?"Match / Sort: connect or group two examples and explain the connection.":"Show: demonstrate the target skill by speaking, pointing, writing, drawing, typing, AAC, matching, building, moving, or another effective mode."});$("done").onclick=()=>markMastery("Demonstrated");$("mastered").onclick=()=>markMastery("Mastered");
 $("break").onclick=()=>alert(r.break);
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
function masteryLabel(status){return status||"Not Started"}
function renderProgress(){
 const p=state(), total=7*8*10*10, done=Object.values(p).filter(x=>x==="Demonstrated"||x==="Mastered").length;
 const v=$("progressView");v.classList.remove("hidden");
 const byGrade=ACADEMY.grades.map((g,i)=>{
   let d=0; for(const k in p){if(k.startsWith(i+"-")&&(p[k]==="Demonstrated"||p[k]==="Mastered"))d++}
   return {g,d,total:8*10*10};
 });
 v.innerHTML='<h2>Academy progress</h2><p><strong>'+done+' of '+total+'</strong> lessons demonstrated or mastered.</p>'+
 '<div class="activityGrid">'+byGrade.map(x=>'<div class="activityCard"><strong>'+esc(x.g)+'</strong><p>'+x.d+' / '+x.total+' completed</p><div role="progressbar" aria-valuenow="'+x.d+'" aria-valuemin="0" aria-valuemax="'+x.total+'"><progress max="'+x.total+'" value="'+x.d+'" style="width:100%"></progress></div></div>').join("")+'</div>'+
 '<p>Progress is stored locally on this device. Mastery stages: Not Started → Learning → Practicing → Demonstrated → Mastered.</p>';
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
function showProgress(){renderProgress();}
function markMastery(status){
 const r=current(),q=state();q[r.id]=status;save(q);
 const s=$("status");if(s)s.textContent="✓ "+masteryLabel(status)+" — progress saved on this device.";
}

document.addEventListener("DOMContentLoaded",populate);