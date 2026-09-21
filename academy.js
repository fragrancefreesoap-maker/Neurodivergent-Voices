const STORAGE="nva_academy_progress_v2";
const $=id=>document.getElementById(id);
const state=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||"{}")}catch(e){return{}}};
const save=p=>localStorage.setItem(STORAGE,JSON.stringify(p));
function populate(){
 const g=$("grade"),s=$("subject");
 ACADEMY.grades.forEach((x,i)=>g.add(new Option(x,i)));
 ACADEMY.subjects.forEach((x,i)=>s.add(new Option(x,i)));
 g.onchange=fillUnits;s.onchange=fillUnits;$("unit").onchange=fillLessons;fillUnits();
}
function fillUnits(){const s=ACADEMY.subjects[+$("subject").value],u=$("unit");u.innerHTML="";ACADEMY.units[s].forEach((x,i)=>u.add(new Option("Unit "+(i+1)+": "+x,i)));fillLessons();}
function fillLessons(){const l=$("lesson");l.innerHTML="";for(let i=0;i<10;i++)l.add(new Option("Lesson "+(i+1),i));}
function current(){return ACADEMY.make(+$("grade").value,+$("subject").value,+$("unit").value,+$("lesson").value)}
function openLesson(){
 const r=current(),p=state(),v=$("lessonView");v.classList.remove("hidden");
 v.innerHTML='<span class="pill">'+r.grade+' • '+r.subject+' • Unit '+r.unit+'</span><h2>'+r.title+'</h2><h3>Learning goal</h3><p>'+r.goal+'</p><h3>Vocabulary</h3><p>'+r.vocabulary.join(" • ")+'</p><h3>Learn</h3><p>'+r.teach+'</p><h3>Practice</h3><p>'+r.practice+'</p><h3>Activity</h3><p>'+r.activity+'</p><h3>Ways to respond</h3><p>'+r.response+'</p><h3>Supports</h3><p>'+r.support+'</p><h3>Check for learning</h3><p>'+r.check+'</p><h3>Extension</h3><p>'+r.extension+'</p><div class="actions"><button class="primary" id="done">Mark demonstrated</button><button class="secondary" id="break">Take a break</button></div><p id="status">'+(p[r.id]?"✓ Demonstrated":"Not started")+'</p>';
 $("done").onclick=()=>{const q=state();q[r.id]="Demonstrated";save(q);$("status").textContent="✓ Demonstrated — progress saved on this device."};
 $("break").onclick=()=>alert("Break time: stretch, breathe, move, get water, or use a quiet space. Return when you are ready.");
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
function showProgress(){
 const done=Object.keys(state()).length,total=7*8*10*10,v=$("progressView");v.classList.remove("hidden");
 v.innerHTML='<h2>Academy progress</h2><p><strong>'+done+' of '+total+'</strong> lessons demonstrated.</p><p>Progress is saved on this device.</p><p>Mastery stages: Not Started → Learning → Practicing → Demonstrated → Mastered.</p>';
 window.scrollTo({top:v.offsetTop-80,behavior:"smooth"});
}
document.addEventListener("DOMContentLoaded",populate);