document.addEventListener("click",function(e){
 if(!e.target.classList.contains("assessmentChoice"))return;
 const buttons=document.querySelectorAll(".assessmentChoice");
 const answer=e.target.getAttribute("data-choice");
 const correct=document.getElementById("assessmentBox").getAttribute("data-correct");
 buttons.forEach(function(b){b.classList.remove("selected")});
 e.target.classList.add("selected");
 const out=document.getElementById("assessmentFeedback");
 if(answer===correct){
   out.textContent="Correct. Now explain or demonstrate why your answer fits the learning goal.";
   out.setAttribute("data-result","correct");
 }else{
   out.textContent="Try again. Look back at the learning goal, vocabulary, and model.";
   out.setAttribute("data-result","retry");
 }
});