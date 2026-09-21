const ACADEMY={
grades:["Pre-K","Kindergarten","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5"],
subjects:["Language Arts & Reading","Mathematics","Science","Social Studies","Art","Music","Social-Emotional Learning","Physical Education & Movement"],
units:{
"Language Arts & Reading":["Foundations & Phonological Awareness","Letter-Sound Connections","Vocabulary & Meaning","Reading Fluency","Story Elements","Informational Text","Comprehension Strategies","Writing & Composition","Grammar & Language","Research & Communication"],
"Mathematics":["Numbers & Counting","Place Value","Addition & Subtraction","Multiplication & Division","Fractions & Decimals","Measurement","Geometry","Patterns & Algebraic Thinking","Data & Graphing","Problem Solving"],
"Science":["Scientific Thinking","Life Science","Earth & Space","Physical Science","Matter & Energy","Forces & Motion","Weather & Climate","Ecosystems","Engineering & Design","Science in Everyday Life"],
"Social Studies":["Self & Community","Families & Communities","Maps & Geography","Civics","Government","History & Time","Culture & Perspectives","Economics","Community & Citizenship","Inquiry & Projects"],
"Art":["Lines & Shapes","Color","Texture","Form & Space","Pattern","Drawing","Painting","Collage & Mixed Media","Art & Culture","Creative Projects"],
"Music":["Sound & Listening","Beat & Rhythm","Tempo","Dynamics","Melody","Instruments","Movement & Music","Music & Culture","Creating Music","Performance & Reflection"],
"Social-Emotional Learning":["Self-Awareness","Feelings & Body Signals","Communication","Relationships","Self-Advocacy","Problem Solving","Regulation & Breaks","Perspective Taking","Routines & Independence","Reflection & Growth"],
"Physical Education & Movement":["Body Awareness","Balance","Locomotor Movement","Coordination","Strength & Endurance","Rhythm & Movement","Games & Rules","Safety","Healthy Habits","Personal Goals"]
},
lessonFocus:{
"Language Arts & Reading":["notice","identify","match","sort","blend","read","sequence","explain","create","apply"],
"Mathematics":["count","represent","compare","add","subtract","multiply","divide","measure","model","solve"],
"Science":["observe","question","classify","describe","predict","test","explain","analyze","design","communicate"],
"Social Studies":["identify","describe","compare","locate","sequence","explain","interpret","evaluate","participate","investigate"],
"Art":["notice","trace","combine","choose","texture","draw","paint","arrange","interpret","create"],
"Music":["listen","identify","keep","compare","change","sing/hum","play","move","compose","perform"],
"Social-Emotional Learning":["notice","name","communicate","connect","advocate","choose","regulate","understand","practice","reflect"],
"Physical Education & Movement":["notice","balance","travel","coordinate","strengthen","rhythmically move","play","protect","practice","set"]
},
make(g,s,u,l){
const grade=this.grades[g],subject=this.subjects[s],unit=this.units[subject][u],focus=this.lessonFocus[subject][l],n=l+1;
const level=g<=1?"with concrete examples and adult support":g<=3?"using examples, visuals, and guided practice":"using examples, evidence, and increasing independence";
const goal="I can "+focus+" "+unit.toLowerCase()+" "+level+".";
const titles={
"Language Arts & Reading":["Sound Hunt","Letter & Picture Match","Meaning Makers","Fluency Path","Story Map","Fact Finder","Think About the Text","Build a Paragraph","Language Detectives","Share What You Learned"],
"Mathematics":["Number Lab","Place-Value Builder","Add It","Take It Away","Groups & Equal Shares","Fraction Models","Measure It","Shape & Space","Pattern Lab","Math Problem Studio"],
"Science":["Scientist's Eyes","Living or Nonliving?","Earth & Sky","Matter Lab","Energy Around Us","Motion Test","Weather Watch","Ecosystem Connections","Design Challenge","Science in Our World"],
"Social Studies":["Me & My Community","Family Stories","Map Makers","Community Rules","How Government Works","Then & Now","Many Perspectives","Needs, Wants & Choices","Community Action","Inquiry Project"],
"Art":["Line Explorer","Color Mixer","Texture Detective","Shape Into Form","Pattern Maker","Drawing From Observation","Painting With Purpose","Mixed-Media Studio","Art Around Us","Create & Reflect"],
"Music":["Sound Detective","Beat Builders","Fast or Slow?","Loud or Soft?","Melody Makers","Instrument Families","Move With Music","Music & Culture","Compose a Short Piece","Share Your Music"],
"Social-Emotional Learning":["Notice Myself","Body & Feeling Clues","Communication Choices","Connection Skills","My Needs Matter","Problem-Solving Steps","Regulation Toolbox","Different Perspectives","Routine Builder","Look Back & Grow"],
"Physical Education & Movement":["Body Check-In","Balance Lab","Traveling Moves","Coordination Challenge","Build Strength","Move to the Beat","Game Skills","Move Safely","Healthy Movement","My Personal Goal"]
};
const title=(titles[subject]||[])[u]||unit;
return {id:[g,s,u,l].join("-"),grade,subject,unit:u+1,unitTitle:unit,lesson:n,title:title+" — Lesson "+n,goal,vocabulary:[unit.split(" & ")[0].toLowerCase(),"practice","show"],teach:"Start with a clear model. Use a picture, object, demonstration, read-aloud, or example. Pause for processing time and repeat the key idea.",practice:"Try the skill together. Reduce the choices, use a visual, repeat the model, or take a movement break when helpful.",activity:"Complete one short task connected to the learning goal. You may work seated, standing, moving, drawing, typing, selecting, matching, speaking, signing, or using AAC.",response:"Show what you know in a way that works for you: speaking, pointing, selecting, writing, typing, drawing, AAC, matching, building, moving, or demonstrating.",support:"Visual directions; read-aloud; repetition; processing time; reduced choices; step-by-step directions; movement break; quiet reset.",check:"Demonstrate the target skill with support as needed. Record the result as Not Started, Learning, Practicing, Demonstrated, or Mastered.",extension:"If ready, try the same skill with a new example, greater independence, or a real-world application."};
}
};