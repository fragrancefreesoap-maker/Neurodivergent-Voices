const STORAGE="nva_academy_progress_v4";
const $=id=>document.getElementById(id);
const STATES=["Not Started","Learning","Practicing","Demonstrated","Mastered"];
const state=()=>{try{const p=JSON.parse(localStorage.getItem(STORAGE)||"{}");return migrate(p)}catch(e){return{}}};
const save=p=>localStorage.setItem(STORAGE,JSON.stringify(p));
function migrate(p){
  let changed=false;
  Object.keys(p).forEach(k=>{
    if(typeof p[k]==="string"){
      p[k]={status:p[k],attempts:0,correct:0,bestScore:0,lastAttempt:null};
      changed=true;
    }
  });
  if(changed)save(p);
  return p;
}
function record(id){return state()[id]||{status:"Not Started",attempts:0,correct:0,bestScore:0,lastAttempt:null};}
function populate(){
 const g=$("grade"),s=$("subject");
 ACADEMY.grades.forEach((x,i)=>g.add(new Option(x,i)));
 ACADEMY.subjects.forEach((x,i)=>s.add(new Option(x,i)));
 const sg=localStorage.getItem("nva_selected_grade"),ss=localStorage.getItem("nva_selected_subject");
 if(sg!==null)g.value=sg;if(ss!==null)s.value=ss;
 g.onchange=()=>{localStorage.setItem("nva_selected_grade",g.value);fillUnits()};
 s.onchange=()=>{localStorage.setItem("nva_selected_subject",s.value);fillUnits()};
 $("unit").onchange=fillLessons;fillUnits();
}
function fillUnits(){
 const s=ACADEMY.subjects[+$("subject").value],u=$("unit");u.innerHTML="";
 ACADEMY.units[s].forEach((x,i)=>u.add(new Option("Unit "+(i+1)+": "+x,i)));
 fillLessons();
}
function fillLessons(){
 const l=$("lesson");l.innerHTML="";
 for(let i=0;i<10;i++)l.add(new Option("Lesson "+(i+1)+": "+ACADEMY.lessonSteps[i],i));
}
function current(){return ACADEMY.make(+$("grade").value,+$("subject").value,+$("unit").value,+$("lesson").value)}
function esc(x){return String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]))}
function activityPlan(){return[
 {name:"1. Understand",text:"I can identify or notice the key idea.",done:false},
 {name:"2. Practice",text:"I can try the skill with support if I need it.",done:false},
 {name:"3. Demonstrate",text:"I can show the skill in a way that works for me.",done:false}
]}
function getActivity(id){return state()[id+"_activity"]||activityPlan()}
function setActivity(id,plan){const p=state();p[id+"_activity"]=plan;save(p)}
function buildQuestion(r){
 const correct="A response that directly demonstrates: "+r.goal;
 const alternatives=[
  "A response that does not address today's learning goal.",
  "A guess without an example, model, or evidence.",
  "A response about a different topic."
 ];
 const all=[correct,...alternatives];
 const shift=(r.lesson+r.unit+parseInt($("grade").value,10))%all.length;
 const answers=all.map((x,i)=>all[(i+shift)%all.length]);
 return {question:"Which choice best demonstrates today's learning goal?",answers,correct:answers.indexOf(correct)};
}
function assessmentHTML(r){
 const q=buildQuestion(r);
 return '<div class="activityCard" id="assessmentBox" data-correct="'+q.correct+'"><h3>Quick Check</h3><p>'+esc(q.question)+'</p><div class="assessmentChoices">'+
 q.answers.map((a,i)=>'<button type="button" class="assessmentChoice" data-choice="'+i+'">'+esc(a)+'</button>').join("")+
 '</div><p id="assessmentFeedback" class="feedback" aria-live="polite">Choose an answer. You can retry as many times as needed.</p></div>';
}
function openLesson(){
 const r=current(),rec=record(r.id),plan=getActivity(r.id),v=$("lessonView");v.classList.remove("hidden");
 v.innerHTML='<span class="pill">'+esc(r.grade)+' • '+esc(r.subject)+' • Unit '+r.unit+' • Lesson '+r.lesson+'</span>'+
 '<h2>'+esc(r.title)+'</h2><p><strong>Lesson focus:</strong> '+esc(r.focus)+'</p>'+
 '<h3>Learning goal</h3><p>'+esc(r.goal)+'</p><h3>Vocabulary</h3><p>'+r.vocabulary.map(esc).join(" • ")+'</p>'+
 '<h3>Learn</h3><p>'+esc(r.learn)+'</p><h3>Teacher / Caregiver Model</h3><p>'+esc(r.model)+'</p>'+
 '<h3>Practice Together</h3><p>'+esc(r.practice)+'</p><h3>Activity</h3><p>'+esc(r.activity)+'</p>'+
 '<div class="activityCard"><strong>Student activity</strong><p>Complete these steps in any effective response mode. The checklist records participation; it is not a test of communication style.</p>'+
 '<div id="activitySteps">'+plan.map((x,i)=>'<label class="activityStep"><input type="checkbox" data-step="'+i+'" '+(x.done?"checked":"")+'><span><strong>'+esc(x.name)+'</strong><br>'+esc(x.text)+'</span></label>').join("")+
 '</div><p id="activityFeedback" class="feedback">'+plan.filter(x=>x.done).length+' of 3 steps completed.</p></div>'+
 '<h3>Ways to Respond</h3><p>'+esc(r.response)+'</p><h3>Visual Support</h3><p>'+esc(r.visual)+'</p>'+
 '<h3>AAC Support</h3><p>'+esc(r.aac)+'</p><h3>Movement / Regulation Break</h3><p>'+esc(r.break)+'</p>'+
 assessmentHTML(r)+
 '<p id="masteryMessage" class="feedback">Current stage: <strong>'+esc(rec.status)+'</strong> • '+rec.attempts+' attempts • '+rec.correct+' correct.</p>'+
 '<div class="actions"><button class="secondary" id="break">Take a break</button><button class="secondary" id="practiceAgain">Practice Again</button><button class="primary hidden" id="nextLesson">Next Lesson →</button></div>';
 document.querySelectorAll("[data-step]").forEach(box=>box.onchange=()=>{
   const next=getActivity(r.id);next[+box.dataset.step].done=box.checked;setActivity(r.id,next);
   $("activityFeedback").textContent=next.filter(x=>x.done).length+" of 3 steps completed.";
 });
 document.querySelectorAll(".assessmentChoice").forEach(btn=>btn.onclick=()=>answerQuestion(r,btn));
 $("break").onclick=()=>alert(r.break);
 $("practiceAgain").onclick=()=>openLesson();
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
function answerQuestion(r,button){
 const box=$("assessmentBox"),buttons=document.querySelectorAll(".assessmentChoice"),feedback=$("assessmentFeedback"),correct=+box.dataset.correct,chosen=+button.dataset.choice;
 buttons.forEach(b=>{b.classList.remove("selected");b.disabled=false});button.classList.add("selected");
 const p=state(),rec=record(r.id);rec.attempts++;rec.lastAttempt=new Date().toISOString();
 if(chosen===correct){
   rec.correct++;rec.bestScore=Math.max(rec.bestScore,100);
   rec.status=rec.correct>=2?"Mastered":"Demonstrated";
   feedback.textContent=rec.status==="Mastered"?"Correct — mastery demonstrated.":"Correct — you demonstrated the learning goal. Try once more to reach Mastered.";
   feedback.dataset.result="correct";
 }else{
   rec.status="Practicing";
   feedback.textContent="Not yet. Try again. Look at the learning goal, model, and vocabulary.";
   feedback.dataset.result="retry";
 }
 p[r.id]=rec;save(p);
 $("masteryMessage").innerHTML="Current stage: <strong>"+esc(rec.status)+"</strong> • "+rec.attempts+" attempts • "+rec.correct+" correct.";
 if(rec.status==="Mastered"||rec.status==="Demonstrated")$("nextLesson").classList.remove("hidden");
 if(rec.status==="Mastered")$("nextLesson").textContent="Next Lesson →";
 $("nextLesson").onclick=()=>goNext(r);
}
function goNext(r){
 let g=+$("grade").value,s=+$("subject").value,u=+$("unit").value,l=+$("lesson").value;
 l++;if(l>=10){l=0;u++;if(u>=10){u=0;s++;if(s>=8){s=0;g++;if(g>=7){alert("You reached the end of this grade and subject path. Choose another path from the dashboard.");return}}}}
 $("grade").value=g;$("subject").value=s;fillUnits();$("unit").value=u;fillLessons();$("lesson").value=l;openLesson();
}
function renderProgress(){
 const p=state(),v=$("progressView"),lessonKeys=Object.keys(p).filter(k=>/^\d+-\d+-\d+-\d+$/.test(k));
 const total=5600,dem=lessonKeys.filter(k=>["Demonstrated","Mastered"].includes(p[k].status)).length,mas=lessonKeys.filter(k=>p[k].status==="Mastered").length;
 v.classList.remove("hidden");v.innerHTML='<h2>Academy progress</h2><p><strong>'+dem+' of '+total+'</strong> lessons demonstrated or mastered • <strong>'+mas+'</strong> mastered.</p>'+
 '<div class="activityGrid">'+ACADEMY.grades.map((g,i)=>{let d=0,m=0,l=0;lessonKeys.forEach(k=>{if(k.startsWith(i+"-")){if(["Demonstrated","Mastered"].includes(p[k].status))d++;if(p[k].status==="Mastered")m++;if(p[k].status==="Learning")l++}});return '<div class="activityCard"><strong>'+esc(g)+'</strong><p>'+d+' / 800 completed</p><p>'+m+' mastered • '+l+' learning</p><progress max="800" value="'+d+'" style="width:100%"></progress></div>'}).join("")+'</div>'+
 '<div class="actions"><button class="secondary" id="exportProgress">Export progress</button><button class="secondary" id="resetProgress">Reset device progress</button></div>'+
 '<p>Mastery path: Not Started → Learning → Practicing → Demonstrated → Mastered. Progress is stored on this device.</p>';
 $("exportProgress").onclick=()=>{const blob=new Blob([JSON.stringify({academy:"Neurodivergent Voices Academy",version:4,exported:new Date().toISOString(),progress:p},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="neurodivergent-voices-academy-progress.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
 $("resetProgress").onclick=()=>{if(confirm("Reset all Academy progress stored on this device?")){localStorage.removeItem(STORAGE);renderProgress()}};
}
function showProgress(){renderProgress()}
document.addEventListener("DOMContentLoaded",populate);