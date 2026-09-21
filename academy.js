const STORAGE="nva_academy_progress_v4";
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
function subjectAssessment(subject,lesson){const t=getSubjectAssessment(subject);const i=(lesson-1)%t.a.length;return {question:t.q,answers:t.a,correct:i};}
function esc(x){return String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}
function activityPlan(r){
 return [
  {name:"1. Understand",text:"I can identify or notice the key idea.",key:"understand"},
  {name:"2. Practice",text:"I can try the skill with support if I need it.",key:"practice"},
  {name:"3. Demonstrate",text:"I can show the skill in a way that works for me.",key:"demonstrate"}
 ].map(x=>({...x,done:false}));
}
function getActivity(id){const p=state();return p[id+"_activity"]||activityPlan(current())}
function setActivity(id,plan){const p=state();p[id+"_activity"]=plan;save(p)}
function openLesson(){
 const r=current(),p=state(),v=$("lessonView"),status=p[r.id]||"Not Started",plan=getActivity(r.id);
 v.classList.remove("hidden");
 v.innerHTML=
 '<span class="pill">'+esc(r.grade)+' • '+esc(r.subject)+' • Unit '+r.unit+' • Lesson '+r.lesson+'</span>'+
 '<h2>'+esc(r.title)+'</h2>'+
 '<h3>Learning goal</h3><p>'+esc(r.goal)+'</p>'+
 '<h3>Vocabulary</h3><p>'+r.vocabulary.map(esc).join(" • ")+'</p>'+
 '<h3>Learn</h3><p>'+esc(r.learn)+'</p>'+
 '<h3>Teacher / Caregiver Model</h3><p>'+esc(r.model)+'</p>'+
 '<h3>Practice Together</h3><p>'+esc(r.practice)+'</p>'+
 '<h3>Activity</h3><p>'+esc(r.activity)+'</p>'+
 '<div class="activityCard"><strong>Student activity</strong><p>Complete the three steps in any effective response mode. A checkmark records that the step was completed; it is not a test of communication style.</p>'+
 '<div id="activitySteps">'+plan.map((x,i)=>'<label class="activityStep"><input type="checkbox" data-step="'+i+'" '+(x.done?"checked":"")+'><span><strong>'+esc(x.name)+'</strong><br>'+esc(x.text)+'</span></label>').join("")+'</div>'+
 '<p id="activityFeedback" class="feedback" aria-live="polite">'+plan.filter(x=>x.done).length+' of 3 steps completed.</p></div>'+
 '<h3>Ways to Respond</h3><p>'+esc(r.response)+'</p>'+
 '<h3>Visual Support</h3><p>'+esc(r.visual)+'</p>'+
 '<h3>AAC Support</h3><p>'+esc(r.aac)+'</p>'+
 '<h3>Movement / Regulation Break</h3><p>'+esc(r.break)+'</p>'+
 '<h3>Check for Learning</h3><p>'+esc(r.check)+'</p>'+
 '<h3>Extension</h3><p>'+esc(r.extension)+'</p>'+
 '<div class="actions"><button class="primary" id="done">Mark demonstrated</button><button class="secondary" id="mastered">Mark mastered</button><button class="secondary" id="learning">Mark learning</button><button class="secondary" id="break">Take a break</button></div>'+
 '<p id="status">'+(status==="Not Started"?"Not started":"✓ "+esc(status))+'</p>';
 document.querySelectorAll("[data-step]").forEach(box=>box.onchange=()=>{
   const next=getActivity(r.id);next[+box.dataset.step].done=box.checked;setActivity(r.id,next);
   $("activityFeedback").textContent=next.filter(x=>x.done).length+" of 3 steps completed.";
   if(next.every(x=>x.done) && !state()[r.id]) markMastery("Demonstrated");
 });
 $("done").onclick=()=>markMastery("Demonstrated");
 $("mastered").onclick=()=>markMastery("Mastered");
 $("learning").onclick=()=>markMastery("Learning");
 $("break").onclick=()=>alert(r.break);
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
function masteryLabel(status){return status||"Not Started"}
function renderProgress(){
 const p=state(),total=7*8*10*10;
 const completed=Object.values(p).filter(x=>["Demonstrated","Mastered"].includes(x)).length;
 const mastered=Object.values(p).filter(x=>x==="Mastered").length;
 const v=$("progressView");v.classList.remove("hidden");
 const byGrade=ACADEMY.grades.map((g,i)=>{
   let d=0,m=0,l=0;
   for(const k in p)if(k.startsWith(i+"-")){if(["Demonstrated","Mastered"].includes(p[k]))d++;if(p[k]==="Mastered")m++;if(p[k]==="Learning")l++}
   return {g,d,m,l,total:8*10*10};
 });
 v.innerHTML='<h2>Academy progress</h2><p><strong>'+completed+' of '+total+'</strong> lessons demonstrated or mastered • <strong>'+mastered+'</strong> mastered.</p>'+
 '<div class="activityGrid">'+byGrade.map(x=>'<div class="activityCard"><strong>'+esc(x.g)+'</strong><p>'+x.d+' / '+x.total+' completed</p><p>'+x.m+' mastered • '+x.l+' learning</p><progress max="'+x.total+'" value="'+x.d+'" style="width:100%"></progress></div>').join("")+'</div>'+
 '<div class="actions"><button class="secondary" id="exportProgress">Export progress</button><button class="secondary" id="resetProgress">Reset progress on this device</button></div>'+
 '<p>Progress is stored locally on this device. Export creates a small JSON file you can keep or share with a teacher/caregiver. Mastery stages: Not Started → Learning → Practicing → Demonstrated → Mastered.</p>';
 $("exportProgress").onclick=()=>{
   const blob=new Blob([JSON.stringify({academy:"Neurodivergent Voices Academy",version:4,exported:new Date().toISOString(),progress:state()},null,2)],{type:"application/json"});
   const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="neurodivergent-voices-academy-progress.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
 };
 $("resetProgress").onclick=()=>{
   if(confirm("Reset all Academy progress stored on this device?")){localStorage.removeItem(STORAGE);renderProgress();}
 };
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
function showProgress(){renderProgress();}
function markMastery(status){
 const r=current(),q=state();q[r.id]=status;save(q);
 const s=$("status");if(s)s.textContent="✓ "+masteryLabel(status)+" — progress saved on this device.";
}
document.addEventListener("DOMContentLoaded",populate);