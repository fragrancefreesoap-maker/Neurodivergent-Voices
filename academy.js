// Self-contained fallback so the lesson opener still works if the data file is delayed or cached.
if(typeof window.ACADEMY==="undefined"){
  window.ACADEMY={
    grades:["Pre-K","Kindergarten","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5"],
    subjects:["Language Arts & Reading","Mathematics","Science","Social Studies","Art","Music","Social-Emotional Learning","Physical Education & Movement"],
    units:{},
    lessonSteps:["Explore","Learn","Practice","Apply","Explain","Create","Compare","Solve","Show What You Know","Reflect"}
  };
  ACADEMY.subjects.forEach(function(s){ACADEMY.units[s]=Array.from({length:10},function(_,i){return "Unit "+(i+1);});});
  ACADEMY.make=function(g,s,u,l){
    const grade=ACADEMY.grades[g]||"Grade";
    const subject=ACADEMY.subjects[s]||"Learning";
    const unit=ACADEMY.units[subject][u]||("Unit "+(u+1));
    const step=ACADEMY.lessonSteps[l]||"Practice";
    const topic=subject==="Mathematics"?"numbers, patterns, and problem solving":
      subject==="Science"?"observations, evidence, and explanations":
      subject==="Language Arts & Reading"?"reading, language, and communication":
      subject==="Social Studies"?"people, places, communities, and evidence":
      subject==="Art"?"lines, shapes, materials, and creative expression":
      subject==="Music"?"sound, rhythm, movement, and musical expression":
      subject==="Social-Emotional Learning"?"communication, self-advocacy, regulation, and relationships":
      "movement, coordination, safety, and physical activity";
    return {id:grade+"-"+subject+"-"+u+"-"+l,grade,subject,unit:u+1,lesson:l+1,
      title:unit+" — Lesson "+(l+1)+": "+step,
      goal:grade+" learners will "+step.toLowerCase()+" "+topic+".",
      vocabulary:[subject.split(" ")[0],"practice","strategy","evidence"],
      learn:"Today we will explore "+topic+" using clear examples, visuals, and choices.",
      model:"The teacher or caregiver models one example, thinks aloud, and checks for understanding.",
      practice:"Work through one example together. The learner may speak, point, write, draw, type, use AAC, match, build, or move.",
      activity:"Complete a short task connected to the learning goal, then choose a way to demonstrate understanding.",
      response:"Use any effective communication mode: speech, AAC, pointing, selecting, writing, typing, drawing, building, or movement.",
      visual:"Use a first-then card, example, picture, symbol, checklist, or step-by-step model.",
      aac:"Offer core words such as help, more, same, different, again, finished, yes, and no.",
      break:"Take a movement, sensory, quiet, water, or position-change break whenever needed.",
      check:"Demonstrate the learning goal with support as needed.",
      extension:"Try another example or apply the skill in a familiar real-world situation."
    };
  };
}
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
 const g=Number($("grade").value),s=Number($("subject").value),u=Number($("unit").value),l=Number($("lesson").value);
 if(typeof ACADEMY.make==="function"){
   try{
     const made=ACADEMY.make(g,s,u,l);
     if(made)return made;
   }catch(err){console.warn("Generated lesson failed; using fallback lesson.",err)}
 }
 const grade=(ACADEMY.grades||[])[g]||"Learner";
 const subject=(ACADEMY.subjects||[])[s]||"Learning";
 const unitTitle=((ACADEMY.units||{})[subject]||[])[u]||("Unit "+(u+1));
 const step=(ACADEMY.lessonSteps||[])[l]||("Lesson "+(l+1));
 const n=l+1;
 return {
   id:[g,s,u,l].join("-"),grade,subject,unit:u+1,unitTitle,lesson:n,
   title:unitTitle+" — "+step+" — Lesson "+n,
   goal:"I can explore and practice "+unitTitle.toLowerCase()+".",
   vocabulary:[unitTitle,step,"example"],
   learn:"Today we will explore "+unitTitle.toLowerCase()+" through a clear example and guided practice.",
   model:"The teacher or caregiver models one example, then pauses so the learner can respond.",
   practice:"Try the same idea together using words, pictures, objects, movement, writing, typing, pointing, or AAC.",
   activity:"Complete one short example connected to "+unitTitle.toLowerCase()+".",
   response:"Show what you know in any effective mode: speak, point, select, type, write, draw, match, build, move, sign, demonstrate, or use AAC.",
   visual:"Use a picture, object, diagram, written example, gesture, or step card to make the idea visible.",
   aac:"Offer core words such as help, more, same, different, again, finished, yes, no, and the lesson vocabulary.",
   break:"Pause for movement, sensory regulation, water, quiet time, or a change of position.",
   check:"Demonstrate the target with support as needed.",
   extension:"Try a new example, explain a strategy, create an example, or apply the skill in a familiar setting."
 };
}
function openLesson(){
 try{
  const status=$("academyStatus"); if(status)status.textContent="Opening lesson…";
  const r=makeLesson(), p=getProgress(), v=$("lessonView");
  if(!r)throw new Error("No lesson was returned.");
  const g=Number($("grade").value),s=Number($("subject").value),u=Number($("unit").value),l=Number($("lesson").value);
  const question=(typeof makeQuestion==="function")?makeQuestion(g,r.subject,u,l,r.goal):{
    question:"Which response best demonstrates today's learning goal?",
    answers:["A response connected to the lesson","An unrelated response","No response"],
    correct:0
  };
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
   '<div class="activityGrid">'+
     '<div class="activityCard"><strong>Choose</strong><p>Answer a quick-check question.</p><button type="button" data-step="choose">Start</button></div>'+
     '<div class="activityCard"><strong>Match / Sort</strong><p>Classify the lesson idea.</p><button type="button" data-step="match">Start</button></div>'+
     '<div class="activityCard"><strong>Show What You Know</strong><p>Demonstrate the skill your way.</p><button type="button" data-step="show">Start</button></div>'+
   '</div>'+
   '<div id="activityFeedback" class="feedback">Complete all three activity types.</div>'+
   "<h3>Ways to Respond</h3><p>"+esc(r.response)+"</p>"+
   "<h3>Visual Support</h3><p>"+esc(r.visual)+"</p>"+
   "<h3>AAC Support</h3><p>"+esc(r.aac)+"</p>"+
   "<h3>Movement / Regulation Break</h3><p>"+esc(r.break)+"</p>"+
   "<h3>Check for Learning</h3><p>"+esc(r.check)+"</p>"+
   "<h3>Extension</h3><p>"+esc(r.extension)+"</p>"+
   '<div class="actions"><button class="primary" id="done" type="button">Mark demonstrated</button></div><p id="status">'+(p[r.id]?"✓ Demonstrated":"Not started")+"</p>";

  const activityState={choose:false,match:false,show:false};
  function updateFeedback(){
    const n=Object.values(activityState).filter(Boolean).length;
    $("activityFeedback").textContent=n===3?"✓ All three activity types completed. You can now mark the lesson demonstrated.":"You have completed "+n+" of 3 activity types.";
  }
  function addChoiceButtons(box,answers,handler){
    box.innerHTML="<div class=\"exerciseChoices\"></div><p class=\"exerciseResult\" aria-live=\"polite\"></p>";
    const choices=box.querySelector(".exerciseChoices");
    choices.innerHTML=answers.map((x,i)=>'<button type="button" class="exerciseChoice" data-choice="'+i+'">'+esc(x)+"</button>").join("");
    choices.querySelectorAll(".exerciseChoice").forEach(btn=>btn.onclick=()=>handler(Number(btn.dataset.choice),box));
  }

  document.querySelectorAll("[data-step]").forEach(b=>b.onclick=()=>{
    const type=b.dataset.step, card=b.closest(".activityCard");
    let box=card.querySelector(".exerciseBox");
    if(!box){box=document.createElement("div");box.className="exerciseBox";card.appendChild(box);}
    if(type==="choose"){
      box.innerHTML="<p><strong>"+esc(question.question)+"</strong></p>";
      const answers=question.answers||[];
      addChoiceButtons(box,answers,(choice,el)=>{
        el.querySelectorAll(".exerciseChoice").forEach(x=>x.classList.remove("selected"));
        el.querySelector('[data-choice="'+choice+'"]').classList.add("selected");
        const ok=choice===Number(question.correct);
        el.querySelector(".exerciseResult").textContent=ok?"✓ Correct. You matched the lesson goal.":"Try again. Look back at the learning goal and model.";
        if(ok){activityState.choose=true;updateFeedback();}
      });
    }else if(type==="match"){
      box.innerHTML="<p><strong>Sort this idea:</strong> Does it directly match the lesson goal?</p>";
      addChoiceButtons(box,["Matches the goal","Does not match the goal"],(choice,el)=>{
        el.querySelectorAll(".exerciseChoice").forEach(x=>x.classList.remove("selected"));
        el.querySelector('[data-choice="'+choice+'"]').classList.add("selected");
        const ok=choice===0;
        el.querySelector(".exerciseResult").textContent=ok?"✓ Correct sort.":"Try again: connect the choice to the learning goal.";
        if(ok){activityState.match=true;updateFeedback();}
      });
    }else{
      box.innerHTML="<p><strong>Show what you know:</strong> Choose a way to demonstrate the skill.</p>";
      addChoiceButtons(box,["Speak / explain","Point / select / match","Write / type / draw","Build / move / demonstrate","Use AAC"],(choice,el)=>{
        el.querySelectorAll(".exerciseChoice").forEach(x=>x.classList.remove("selected"));
        el.querySelector('[data-choice="'+choice+'"]').classList.add("selected");
        el.querySelector(".exerciseResult").textContent="✓ Demonstration method recorded. Complete the demonstration with a teacher, caregiver, or independently as appropriate.";
        activityState.show=true;updateFeedback();
      });
    }
    box.scrollIntoView({behavior:"smooth",block:"center"});
  });

  $("done").onclick=()=>{
    if(!Object.values(activityState).every(Boolean)){
      $("activityFeedback").textContent="Finish Choose, Match / Sort, and Show What You Know before marking the lesson demonstrated.";
      return;
    }
    const q=getProgress();q[r.id]="Demonstrated";setProgress(q);
    $("status").textContent="✓ Demonstrated — progress saved on this device.";
    if(status)status.textContent="Lesson complete — progress saved.";
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
document.addEventListener("DOMContentLoaded",()=>{
 try{
   populate();
   const status=$("academyStatus");
   if(status)status.textContent="Ready — choose a lesson and tap Open lesson.";
 }catch(e){
   showError(e);
   console.error("Academy startup error:",e);
 }
});