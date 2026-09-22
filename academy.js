const STORAGE="nva_academy_progress_v4";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function getProgress(){try{return JSON.parse(localStorage.getItem(STORAGE)||"{}")}catch(e){return {}}}
function setProgress(p){localStorage.setItem(STORAGE,JSON.stringify(p))}
function showError(e){
 const v=$("lessonView"); if(!v)return;
 v.classList.remove("hidden");
 v.innerHTML="<h2>Lesson loading error</h2><p>The Academy page loaded, but the lesson engine reported an error.</p><p><strong>"+esc(e&&e.message?e.message:e)+"</strong></p><button type=\"button\" onclick=\"location.reload()\">Refresh Academy</button>";
}
function populate(){
 if(typeof ACADEMY==="undefined") throw new Error("Academy data file did not load.");
 const g=$("grade"),s=$("subject"),u=$("unit"),l=$("lesson");
 if(!g||!s||!u||!l) throw new Error("Academy controls were not found.");
 g.innerHTML=""; s.innerHTML=""; u.innerHTML=""; l.innerHTML="";
 (ACADEMY.grades||[]).forEach((x,i)=>g.add(new Option(x,i)));
 (ACADEMY.subjects||[]).forEach((x,i)=>s.add(new Option(x,i)));
 g.onchange=fillUnits; s.onchange=fillUnits; u.onchange=fillLessons;
 fillUnits();
 const b=$("openLessonBtn"); if(b)b.onclick=openLesson;
 const p=$("progressBtn"); if(p)p.onclick=showProgress;
}
function fillUnits(){
 const s=$("subject"),u=$("unit");
 const subject=ACADEMY.subjects[Number(s.value)];
 u.innerHTML="";
 ((ACADEMY.units&&ACADEMY.units[subject])||[]).forEach((x,i)=>u.add(new Option("Unit "+(i+1)+": "+x,i)));
 fillLessons();
}
function fillLessons(){
 const l=$("lesson"); l.innerHTML="";
 const steps=ACADEMY.lessonSteps||[];
 for(let i=0;i<10;i++)l.add(new Option("Lesson "+(i+1)+(steps[i]?": "+steps[i]:""),i));
}
function makeLesson(){
 if(typeof ACADEMY.make!=="function") throw new Error("Academy lesson generator is unavailable.");
 return ACADEMY.make(Number($("grade").value),Number($("subject").value),Number($("unit").value),Number($("lesson").value));
}
function openLesson(){
 try{
  const r=makeLesson(), p=getProgress(), v=$("lessonView");
  if(!r)throw new Error("No lesson was returned.");
  v.classList.remove("hidden");
  v.innerHTML=
   '<span class="pill">'+esc(r.grade)+" • "+esc(r.subject)+" • Unit "+esc(r.unit)+" • Lesson "+esc(r.lesson)+"</span>"+
   "<h2>"+esc(r.title)+"</h2>"+
   "<h3>Learning goal</h3><p>"+esc(r.goal)+"</p>"+
   "<h3>Vocabulary</h3><p>"+(r.vocabulary||[]).map(esc).join(" • ")+"</p>"+
   "<h3>Learn</h3><p>"+esc(r.learn)+"</p>"+
   "<h3>Teacher / Caregiver Model</h3><p>"+esc(r.model)+"</p>"+
   "<h3>Practice Together</h3><p>"+esc(r.practice)+"</p>"+
   "<h3>Activity</h3><p>"+esc(r.activity)+"</p>"+
   '<div class="activityGrid"><div class="activityCard"><strong>Choose</strong><p>Select a response that fits the learning goal.</p><button type="button" data-step="choose">Start</button></div><div class="activityCard"><strong>Match / Sort</strong><p>Connect or group examples.</p><button type="button" data-step="match">Start</button></div><div class="activityCard"><strong>Show What You Know</strong><p>Demonstrate the skill in your preferred way.</p><button type="button" data-step="show">Start</button></div></div>'+
   '<div id="activityFeedback" class="feedback">Complete the three activity steps.</div>'+
   "<h3>Ways to Respond</h3><p>"+esc(r.response)+"</p>"+
   "<h3>Visual Support</h3><p>"+esc(r.visual)+"</p>"+
   "<h3>AAC Support</h3><p>"+esc(r.aac)+"</p>"+
   "<h3>Movement / Regulation Break</h3><p>"+esc(r.break)+"</p>"+
   "<h3>Check for Learning</h3><p>"+esc(r.check)+"</p>"+
   "<h3>Extension</h3><p>"+esc(r.extension)+"</p>"+
   '<div class="actions"><button class="primary" id="done" type="button">Mark demonstrated</button></div><p id="status">'+(p[r.id]?"✓ Demonstrated":"Not started")+"</p>";
  const done={choose:false,match:false,show:false};
  document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{
   done[b.dataset.step]=true;b.classList.add("selected");
   const n=Object.values(done).filter(Boolean).length;
   $("activityFeedback").textContent=n===3?"✓ All three activities completed. You can mark this lesson demonstrated.":n+" of 3 activity steps completed.";
  });
  $("done").onclick=()=>{
   if(!Object.values(done).every(Boolean)){ $("activityFeedback").textContent="Complete Choose, Match / Sort, and Show What You Know first."; return; }
   const q=getProgress();q[r.id]="Demonstrated";setProgress(q);$("status").textContent="✓ Demonstrated — progress saved on this device.";
  };
  v.scrollIntoView({behavior:"smooth",block:"start"});
 }catch(e){showError(e);console.error(e)}
}
function showProgress(){
 const p=getProgress(),v=$("progressView"); if(!v)return;
 v.classList.remove("hidden");
 v.innerHTML="<h2>Academy progress</h2><p><strong>"+Object.keys(p).length+"</strong> lessons demonstrated.</p><p>Progress is saved on this device.</p>";
 v.scrollIntoView({behavior:"smooth",block:"start"});
}
document.addEventListener("DOMContentLoaded",()=>{try{populate()}catch(e){showError(e);console.error(e)}});