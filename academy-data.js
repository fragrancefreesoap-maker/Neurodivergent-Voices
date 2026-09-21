/* Neurodivergent Voices Academy — student-facing lesson engine
   7 grades × 8 subjects × 10 units × 10 lessons = 5,600 pathways.
   Content is generated from grade-specific academic progressions and concrete lesson sequences.
*/
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
gradeLevel:{
"Pre-K":"Explore concrete objects, pictures, sounds, movement, and simple choices.",
"Kindergarten":"Use concrete examples, pictures, counting, short texts, and guided practice.",
"Grade 1":"Build foundational skills with models, examples, and repeated guided practice.",
"Grade 2":"Apply skills to short examples, problems, texts, and familiar real-world situations.",
"Grade 3":"Explain ideas, use evidence or models, and solve multi-step tasks with support as needed.",
"Grade 4":"Compare, analyze, organize evidence, and communicate ideas with increasing independence.",
"Grade 5":"Apply concepts, justify thinking with evidence, solve multi-step tasks, and create original responses."
},
progressions:{
"Language Arts & Reading":[
["hear and play with syllables and beginning sounds","blend and segment simple sounds","identify and use common letter-sound patterns","read short words and sentences with increasing accuracy","retell and sequence events using details","identify main ideas and key details in informational text","answer questions and explain thinking using text evidence","write organized responses with a beginning, middle, and ending","use sentence structure, grammar, and punctuation to communicate clearly","gather information from more than one source and share it clearly"],
["letters, names, rhymes, and sound patterns","uppercase and lowercase letters and common sounds","short vowels, consonants, blends, and digraphs","high-frequency words and connected text","characters, setting, problem, events, and solution","labels, captions, headings, diagrams, and facts","prediction, connection, question, inference, and evidence","sentences, paragraphs, details, and revision","nouns, verbs, adjectives, capitalization, and punctuation","questions, source features, notes, and presentation"],
["sound","letter","word","sentence","story","fact","evidence","paragraph","grammar","source"]
],
"Mathematics":[
["count objects and say number names in order","represent numbers with objects, drawings, and numerals","solve addition and subtraction situations","use equal groups, arrays, and sharing to model multiplication and division","represent and compare fractions and decimals","measure length, time, weight, capacity, and area using appropriate units","identify, compose, decompose, and describe two- and three-dimensional shapes","recognize patterns and represent unknowns with symbols or rules","collect, represent, read, and discuss data","choose strategies, model thinking, solve, and check multi-step problems"],
["counting and cardinality","place value and base-ten structure","addition and subtraction strategies","multiplication, division, and equal groups","fraction and decimal models","measurement units and tools","attributes of shapes and spatial relationships","patterns, rules, and unknown quantities","tables, picture graphs, line plots, and graphs","models, equations, estimation, and checking"],
["number","place value","operation","group","fraction","unit","shape","pattern","data","strategy"]
],
"Science":[
["observe carefully, ask questions, and use evidence","identify needs, traits, structures, and life cycles of living things","describe patterns in Earth, sky, land, water, and space","observe and describe properties, changes, and interactions of physical systems","identify matter, energy, and transformations in everyday systems","describe pushes, pulls, motion, and effects of forces","observe weather patterns and describe climate-related patterns","model relationships among organisms and their environments","define a problem, test ideas, and improve a design","connect science ideas to health, technology, homes, communities, and nature"],
["observation and question","living things and life cycles","Earth, sun, moon, and patterns","properties and changes","matter and energy","force and motion","weather and climate","food webs and ecosystems","criteria, constraints, prototypes, and revision","science in daily life"],
["observe","question","model","matter","energy","force","weather","ecosystem","design","evidence"]
],
"Social Studies":[
["describe self, family, classroom, and community roles","compare family and community traditions and responsibilities","use maps, symbols, directions, and geographic features","identify rules, rights, responsibilities, and ways people participate","describe how local, state, and national government roles connect","sequence events and use timelines to study change over time","compare cultures and perspectives respectfully","distinguish needs and wants and describe choices and resources","identify ways people contribute to and improve communities","ask questions, use sources, and create an evidence-based project"],
["identity and roles","families and communities","maps and geography","rules and civic participation","government roles","chronology and historical evidence","culture and perspective","needs, wants, resources, and choices","service and citizenship","questions, sources, evidence, and presentation"],
["community","map","rule","government","timeline","culture","choice","resource","citizen","source"]
],
"Art":[
["notice and make lines and basic shapes","mix, name, compare, and use colors","identify and create textures","show form, space, foreground, and background","create and extend visual patterns","draw from observation, imagination, and memory","use painting tools and techniques intentionally","combine papers, materials, textures, and found objects","observe and discuss art from different people and cultures respectfully","plan, make, revise, and reflect on an original artwork"],
["line and shape","color families and mixing","visual and tactile texture","form and space","repetition and pattern","observation and composition","brushes, tools, layers, and techniques","collage and mixed media","artist, culture, context, and interpretation","planning, revision, and reflection"],
["line","shape","color","texture","space","pattern","drawing","painting","culture","create"]
],
"Music":[
["notice and describe sounds and silence","keep and identify a steady beat","compare fast and slow tempos","compare loud and soft dynamics","trace, sing, hum, or play simple melodic patterns","identify instrument families and sound sources","use movement to respond to musical elements","listen to and discuss music from different cultures and contexts respectfully","create a short rhythm, melody, soundscape, or song","share music and reflect on the process"],
["sound and silence","steady beat","tempo","dynamics","melody","instrument families","movement response","culture and context","composition","performance and reflection"],
["sound","beat","tempo","dynamics","melody","instrument","movement","culture","compose","perform"]
],
"Social-Emotional Learning":[
["notice personal preferences, strengths, interests, and needs","name or communicate feelings and body signals in accessible ways","use multiple communication modes and clarify needs","build relationships using consent, boundaries, listening, and repair","identify needs, accommodations, choices, and self-advocacy strategies","use a flexible sequence for solving everyday problems","choose regulation, sensory, movement, or quiet strategies that support participation","recognize that people can have different perspectives without requiring agreement","practice routines, planning, transitions, and independence with supports","reflect on growth, celebrate strengths, and choose a next step"],
["strengths and preferences","feelings and body signals","communication and AAC","boundaries and relationships","self-advocacy","problem-solving","regulation and breaks","perspective","routines and independence","reflection"],
["strength","signal","communication","boundary","advocacy","problem","regulation","perspective","routine","growth"]
],
"Physical Education & Movement":[
["notice body position, personal space, and movement choices","hold and shift balance in different positions","walk, run, hop, skip, jump, or move in accessible ways","coordinate eyes, hands, feet, objects, and space","build strength and endurance through safe, adaptable activities","match movement to rhythm, music, or a visual cue","practice games with clear choices, adaptations, and shared rules","identify safe movement spaces, equipment use, and body signals","practice hydration, rest, sleep, nutrition, and joyful movement concepts","set a personal movement goal and track progress"],
["body awareness and space","static and dynamic balance","locomotor movement","coordination","strength and endurance","rhythm and movement","games and rules","safety","healthy habits","personal goal"],
["body","balance","travel","coordinate","strength","rhythm","game","safety","habit","goal"]
]},
lessonSteps:["Notice","Model","Try Together","Practice","Apply","Explain","Create","Compare","Show What You Know","Reflect"],
make(g,s,u,l){
const grade=this.grades[g],subject=this.subjects[s],unit=this.units[subject][u],n=l+1;
const p=this.progressions[subject][g===0?0:1];
const scoped=this.gradeScopes[grade][subject][u];
const objective=scoped, concept=p[1][u], vocab=p[2][u];
const step=this.lessonSteps[l], title=this.titles(subject,u,l);
const goal=g<=1?"I can "+objective+".":g<=3?"I can "+objective+" and explain my thinking.":"I can "+objective+" and support my thinking with an example, model, or evidence.";
const examples={
"Pre-K":["Use objects, pictures, gestures, movement, or a short demonstration.","Choose from two or three clear options and repeat the model."],
"Kindergarten":["Use pictures, manipulatives, read-alouds, and short demonstrations.","Pause between steps and repeat the key idea."],
"Grade 1":["Use a worked example, visual steps, and guided practice.","Try the skill with one new example."],
"Grade 2":["Use a model, then solve or create a similar example.","Explain or demonstrate one strategy."],
"Grade 3":["Study an example, identify the important information, and apply the skill.","Explain the strategy with words, symbols, drawing, movement, or AAC."],
"Grade 4":["Compare examples, organize evidence, and apply the concept independently when ready.","Explain why the strategy or evidence fits."],
"Grade 5":["Analyze an example, apply the concept to a new situation, and justify the response.","Create or revise a response using evidence or a clear model."]
}[grade];
const task=this.task(subject,concept,n);
return {id:[g,s,u,l].join("-"),grade,subject,unit:u+1,unitTitle:unit,lesson:n,title:title+" — Lesson "+n,focus:step,goal,vocabulary:[vocab,concept,"example"],learn:"Today we will work with "+concept+". "+examples[0],model:"Look at or listen to this model: "+task.model,practice:"Try the same idea together. "+examples[1],activity:task.activity,response:"Show what you know in any effective mode: speak, point, select, type, write, draw, match, build, move, sign, demonstrate, or use AAC.",visual:"Make the learning visible with a picture, object, number line, timeline, diagram, gesture, written example, or step card.",aac:"Offer core words and topic words such as: more, same, different, help, again, finished, I think, show me, yes, no. Add the specific vocabulary above.",break:"Pause for movement, sensory regulation, water, quiet time, or a change of position. Return when ready.",check:"Demonstrate the target with support as needed. Record: Not Started, Learning, Practicing, Demonstrated, or Mastered.",extension:"Try a new example, explain a different strategy, create your own example, or apply the skill in a real-world setting."};
},
titles(subject,u,l){
const names={
"Language Arts & Reading":["Sound Detectives","Letter-Sound Lab","Word Meaning Studio","Fluency Path","Story Builders","Fact Finders","Text Thinkers","Writing Studio","Language Detectives","Research Lab"],
"Mathematics":["Number Lab","Place-Value Builder","Operation Workshop","Equal-Groups Lab","Fraction & Decimal Studio","Measurement Lab","Shape & Space Studio","Pattern Lab","Data Studio","Problem-Solving Lab"],
"Science":["Scientist's Notebook","Living Things Lab","Earth & Sky Watch","Matter & Motion Lab","Matter & Energy Lab","Forces Lab","Weather Watch","Ecosystem Lab","Engineering Studio","Science in Our World"],
"Social Studies":["Community Connections","Family & Community Stories","Map Makers","Civic Life Lab","Government in Action","History & Time Lab","Culture & Perspectives","Choices & Resources","Community Action","Inquiry Studio"],
"Art":["Line & Shape Studio","Color Studio","Texture Lab","Form & Space Studio","Pattern Studio","Drawing Studio","Painting Studio","Mixed-Media Studio","Art & Culture Studio","Creative Studio"],
"Music":["Sound Studio","Beat Lab","Tempo Lab","Dynamics Lab","Melody Studio","Instrument Lab","Movement & Music","Music & Culture","Composer Studio","Performance Studio"],
"Social-Emotional Learning":["Strengths Studio","Body & Feeling Clues","Communication Lab","Connection Lab","Self-Advocacy Studio","Problem-Solving Lab","Regulation Toolbox","Perspective Studio","Routine Lab","Growth Studio"],
"Physical Education & Movement":["Body Awareness Lab","Balance Lab","Movement Path","Coordination Lab","Strength & Endurance Lab","Rhythm & Movement","Game Skills Lab","Safety Lab","Healthy Habits Lab","Personal Goals Lab"]};
return names[subject][u]+" — "+this.lessonSteps[l];
},
task(subject,concept,n){
const generic=[
"Look at a clear example of "+concept+", then identify the part that matches today's goal.",
"Sort, match, order, label, or demonstrate examples connected to "+concept+".",
"Complete one short challenge using "+concept+" and choose a response mode that works for you.",
"Compare two examples and show one way they are alike or different.",
"Create or build an example of "+concept+" using available materials or a digital tool.",
"Apply "+concept+" to a familiar real-world situation.",
"Explain or demonstrate a strategy for working with "+concept+".",
"Find an example of "+concept+" in a text, object, picture, sound, movement, or environment.",
"Try the skill with a new example and revise your response if needed.",
"Share one thing you learned and one thing you can try next."
];
return {model:"A teacher or caregiver models one clear example of "+concept+" before the learner tries it.",activity:generic[(n-1)%generic.length]};
}
};
// Subject-specific assessment templates. Each lesson gets a question format matched to its subject.
const ASSESSMENT_TEMPLATES={
"Language Arts & Reading":{q:"Which detail best supports the reading or language skill in this lesson?",a:["The detail that directly matches the skill","An unrelated detail","A detail from a different topic"]},
"Mathematics":{q:"Which strategy best helps solve today's math problem?",a:["A strategy that represents the numbers and operations","Guessing without checking","Ignoring the quantities"]},
"Science":{q:"Which observation or piece of evidence best supports today's science idea?",a:["Evidence that can be observed, measured, or modeled","A random guess","An unrelated opinion"]},
"Social Studies":{q:"Which source or example best helps answer today's social studies question?",a:["A relevant map, document, image, timeline, or firsthand account","An unrelated object","A guess with no source"]},
"Art":{q:"Which choice best demonstrates today's art skill?",a:["A deliberate use of the featured art element or technique","An unrelated material choice","Skipping the featured technique"]},
"Music":{q:"Which musical choice best demonstrates today's skill?",a:["Using the featured beat, rhythm, melody, tempo, dynamics, or form","Ignoring the musical element","Making a choice unrelated to the music"]},
"Social-Emotional Learning":{q:"Which response best demonstrates today's learning skill?",a:["A communication, regulation, boundary, or problem-solving strategy that fits the situation","Ignoring the situation","Assuming what another person feels without checking"]},
"Physical Education & Movement":{q:"Which choice best demonstrates today's movement skill?",a:["Using the featured movement skill with attention to safety and personal needs","Ignoring safety","Stopping without trying an adapted option"]}
};
function getSubjectAssessment(subject){return ASSESSMENT_TEMPLATES[subject]||ASSESSMENT_TEMPLATES["Language Arts & Reading"];}

// Concrete, grade-aware question generation. Templates vary by subject and grade so lessons can produce a usable quick-check immediately.
function makeQuestion(grade,subject,unit,lesson,goal){
 const g=grade, n=lesson, u=unit;
 const bank={
 "Mathematics":[
  ["Which representation best shows the numbers in this problem?",["A model with the quantities labeled","An unrelated picture","No representation"],0],
  ["Which operation or strategy matches the problem?",["The operation named by the situation","A random operation","No operation"],0],
  ["What should you do first?",["Identify what is known and what must be found","Skip the problem","Change the numbers"],0],
  ["Which answer can be checked with the original problem?",["An answer that makes the equation or model true","Any number","A blank answer"],0]
 ],
 "Language Arts & Reading":[
  ["Which detail best supports the main idea or reading skill?",["A detail directly connected to the text","An unrelated detail","A detail not in the text"],0],
  ["What should a reader do to understand an unfamiliar word?",["Use context, word parts, or a reference tool","Ignore the word","Choose a meaning at random"],0],
  ["Which response uses evidence from the text?",["A response that points to a specific detail","A response with no text evidence","A response about another topic"],0],
  ["Which sentence best communicates one clear idea?",["A complete sentence focused on the topic","A collection of unrelated words","A sentence with no clear idea"],0]
 ],
 "Science":[
  ["Which is the best evidence for the science idea?",["An observation, measurement, or model","A guess with no observation","An unrelated fact"],0],
  ["What should a scientist do before making a conclusion?",["Collect and examine evidence","Choose an answer first","Ignore observations"],0],
  ["Which change or pattern could be tested or observed?",["A measurable change related to the question","A random event","Something that cannot be observed"],0],
  ["Which model best represents the system being studied?",["A model showing the relevant parts and relationships","An unrelated drawing","A blank model"],0]
 ],
 "Social Studies":[
  ["Which source would best help answer the question?",["A relevant map, timeline, document, image, or firsthand account","An unrelated source","A guess"],0],
  ["Which detail is evidence of how a community works?",["A documented role, rule, resource, or institution","An unrelated detail","A personal guess"],0],
  ["What helps explain why an event happened?",["Evidence about causes and circumstances","A random opinion","A detail from an unrelated event"],0],
  ["Which action shows civic participation?",["A constructive action that responds to a shared community issue","Ignoring the issue","Changing the evidence"],0]
 ],
 "Art":[
  ["Which choice best demonstrates the featured art element or technique?",["Use it deliberately in the artwork","Avoid it completely","Use an unrelated technique"],0],
  ["What can an artist change to create emphasis?",["Line, color, value, size, placement, or contrast","Nothing","Only the title"],0],
  ["Which step supports revision?",["Look at the work, identify a change, and try it","Never review the work","Discard the idea immediately"],0],
  ["Which response describes artwork using evidence?",["Point to visible choices and explain their effect","Only say it is good","Guess the artist's thoughts"],0]
 ],
 "Music":[
  ["Which choice demonstrates the featured musical element?",["Use the beat, rhythm, melody, tempo, dynamics, or form intentionally","Ignore it","Use an unrelated element"],0],
  ["What should a performer do to keep a steady beat?",["Listen, count, tap, or move consistently","Change randomly","Stop after every beat"],0],
  ["Which change can make music sound different?",["Changing tempo or dynamics","Changing nothing","Ignoring the sound"],0],
  ["Which response uses musical evidence?",["Describe what you hear using musical vocabulary","Only say you like it","Talk about an unrelated topic"],0]
 ],
 "Social-Emotional Learning":[
  ["Which response best fits a need or communication situation?",["Communicate the need using a preferred effective mode","Hide the need","Assume another person's need"],0],
  ["What is a useful first step in a challenging situation?",["Notice the situation and identify what support is needed","React without checking","Ignore safety"],0],
  ["Which choice respects a boundary?",["Ask, listen to the response, and adjust","Continue after a no","Assume consent"],0],
  ["Which strategy can support regulation?",["Use a chosen sensory, movement, communication, or quiet strategy","Force one strategy on everyone","Ignore the person's signals"],0]
 ],
 "Physical Education & Movement":[
  ["Which choice best demonstrates safe movement?",["Use appropriate space, equipment, and an adapted movement when needed","Ignore safety","Use equipment unsafely"],0],
  ["What helps improve a movement skill?",["Practice the movement with feedback and appropriate repetition","Never practice","Change the goal every attempt"],0],
  ["Which choice supports sustained activity?",["Use pacing, water, rest, and movement breaks as needed","Ignore body signals","Avoid all recovery"],0],
  ["Which response shows progress toward a movement goal?",["Compare attempts using a simple measure","Guess without observing","Change the goal without recording"],0]
 ]};
 const list=bank[subject]||bank["Language Arts & Reading"];
 const item=list[(u+n+g)%list.length];
 return {question:item[0],answers:item[1],correct:item[2],goal:goal};
}
