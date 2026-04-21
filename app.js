// ===== NutriSmart AI — App Logic =====
(function(){
'use strict';

// --- State ---
let userData = JSON.parse(localStorage.getItem('ns_user')) || null;
let dietPlan = JSON.parse(localStorage.getItem('ns_plan')) || null;
let favorites = JSON.parse(localStorage.getItem('ns_favs')) || [];
let weightLog = JSON.parse(localStorage.getItem('ns_weight')) || [];

function save(){ localStorage.setItem('ns_user',JSON.stringify(userData)); localStorage.setItem('ns_plan',JSON.stringify(dietPlan)); localStorage.setItem('ns_favs',JSON.stringify(favorites)); localStorage.setItem('ns_weight',JSON.stringify(weightLog)); }

// --- Navigation ---
document.querySelectorAll('.nav-link').forEach(btn=>{
  btn.addEventListener('click',()=>navigateTo(btn.dataset.page));
});

function navigateTo(page){
  document.querySelectorAll('.nav-link').forEach(b=>{b.classList.remove('active')});
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  if(page==='dashboard') renderDashboard();
  if(page==='profile') renderProfile();
}

// --- Onboarding ---
let currentStep = 1;
const $form = document.getElementById('onboarding-form');
const $hero = document.getElementById('hero-section');
const $features = document.getElementById('features-section');

document.getElementById('btn-get-started').addEventListener('click',showForm);
document.getElementById('btn-dash-start')?.addEventListener('click',()=>{navigateTo('home');showForm();});
document.getElementById('btn-profile-start')?.addEventListener('click',()=>{navigateTo('home');showForm();});

function showForm(){ $hero.classList.add('hidden'); $features.classList.add('hidden'); $form.classList.remove('hidden'); }

function goStep(n){
  currentStep=n;
  document.querySelectorAll('.form-section').forEach(s=>s.classList.remove('active'));
  document.getElementById('step-'+n).classList.add('active');
  document.querySelectorAll('.step-dot').forEach((d,i)=>{
    d.classList.remove('active','done');
    if(i+1===n) d.classList.add('active');
    else if(i+1<n) d.classList.add('done');
  });
}

document.getElementById('btn-step1-next').addEventListener('click',()=>{
  const name=gv('input-name'),age=gv('input-age'),gender=gv('input-gender'),h=gv('input-height'),w=gv('input-weight'),act=gv('input-activity');
  if(!name||!age||!gender||!h||!w||!act) return toast('Please fill all fields','error');
  goStep(2);
});
document.getElementById('btn-step2-back').addEventListener('click',()=>goStep(1));
document.getElementById('btn-step2-next').addEventListener('click',()=>goStep(3));
document.getElementById('btn-step3-back').addEventListener('click',()=>goStep(2));

document.getElementById('btn-generate').addEventListener('click',()=>{
  const diet=gv('input-diet'),goal=gv('input-goal');
  if(!diet||!goal) return toast('Please fill diet type and goal','error');
  collectAndGenerate();
});

function gv(id){ return document.getElementById(id).value.trim(); }

function collectAndGenerate(){
  const conditions=[];
  document.querySelectorAll('#conditions-grid input:checked').forEach(c=>conditions.push(c.value));
  const h=+gv('input-height'), w=+gv('input-weight');
  const bmi=+(w/((h/100)**2)).toFixed(1);

  userData={
    name:gv('input-name'), age:+gv('input-age'), gender:gv('input-gender'),
    height:h, weight:w, bmi, activity:gv('input-activity'),
    conditions, allergies:gv('input-allergies').split(',').map(s=>s.trim()).filter(Boolean),
    sleep:+gv('input-sleep')||7, water:+gv('input-water')||8,
    diet:gv('input-diet'), eatout:gv('input-eatout'), schedule:gv('input-schedule'), goal:gv('input-goal'),
    createdAt:new Date().toISOString()
  };

  dietPlan = generateDietPlan(userData);
  if(!weightLog.length) weightLog.push({date:new Date().toISOString().slice(0,10),weight:userData.weight});
  save();
  toast('AI diet plan generated! 🎉','success');
  navigateTo('dashboard');
}

// --- AI Diet Plan Generator ---
function generateDietPlan(u){
  const cal = calcCalories(u);
  const protein = Math.round(cal*0.25/4);
  const carbs = Math.round(cal*0.45/4);
  const fat = Math.round(cal*0.30/9);
  const meals = buildMeals(u, cal);
  return { calories:cal, protein, carbs, fat, meals, generatedAt:new Date().toISOString() };
}

function calcCalories(u){
  let bmr;
  if(u.gender==='male') bmr=10*u.weight+6.25*u.height-5*u.age+5;
  else bmr=10*u.weight+6.25*u.height-5*u.age-161;
  const mult={sedentary:1.2,moderate:1.55,active:1.725,very_active:1.9};
  let tdee=Math.round(bmr*(mult[u.activity]||1.4));
  if(u.goal==='lose') tdee-=400;
  else if(u.goal==='gain') tdee+=350;
  return tdee;
}

// Meal database
const DB = {
  breakfast:{
    veg:[
      {name:'Oatmeal with Berries & Nuts',cal:320,p:12,c:48,f:10},
      {name:'Vegetable Poha with Peanuts',cal:290,p:8,c:45,f:9},
      {name:'Moong Dal Chilla with Chutney',cal:260,p:14,c:35,f:7},
      {name:'Greek Yogurt Parfait with Granola',cal:340,p:15,c:42,f:12},
      {name:'Whole Wheat Toast with Avocado',cal:310,p:10,c:38,f:14},
      {name:'Idli Sambar with Coconut Chutney',cal:280,p:10,c:46,f:6},
      {name:'Smoothie Bowl with Seeds',cal:300,p:11,c:40,f:11}
    ],
    nonveg:[
      {name:'Egg White Omelette with Veggies',cal:280,p:22,c:12,f:15},
      {name:'Scrambled Eggs on Whole Wheat Toast',cal:350,p:20,c:30,f:16},
      {name:'Chicken Sausage Wrap',cal:380,p:24,c:32,f:14},
      {name:'Smoked Salmon Bagel',cal:360,p:22,c:34,f:13}
    ],
    vegan:[
      {name:'Chia Pudding with Coconut Milk',cal:290,p:8,c:32,f:15},
      {name:'Tofu Scramble with Spinach',cal:270,p:18,c:15,f:16},
      {name:'Banana Peanut Butter Smoothie',cal:340,p:12,c:44,f:14}
    ]
  },
  lunch:{
    veg:[
      {name:'Brown Rice with Dal & Mixed Veggies',cal:450,p:16,c:65,f:12},
      {name:'Quinoa Salad with Chickpeas',cal:420,p:18,c:55,f:14},
      {name:'Paneer Tikka Wrap with Raita',cal:480,p:22,c:48,f:18},
      {name:'Rajma Chawal with Salad',cal:460,p:18,c:62,f:10},
      {name:'Vegetable Biryani with Curd',cal:440,p:14,c:60,f:14},
      {name:'Mushroom & Spinach Pasta',cal:430,p:15,c:55,f:16}
    ],
    nonveg:[
      {name:'Grilled Chicken Breast with Rice',cal:480,p:38,c:45,f:12},
      {name:'Fish Curry with Brown Rice',cal:460,p:34,c:48,f:10},
      {name:'Turkey Lettuce Wraps',cal:380,p:32,c:22,f:16},
      {name:'Chicken Stir-Fry with Noodles',cal:470,p:30,c:50,f:14}
    ],
    vegan:[
      {name:'Lentil Soup with Crusty Bread',cal:400,p:20,c:56,f:8},
      {name:'Buddha Bowl with Tahini',cal:440,p:16,c:52,f:18},
      {name:'Black Bean Tacos',cal:420,p:18,c:54,f:14}
    ]
  },
  dinner:{
    veg:[
      {name:'Palak Paneer with 2 Rotis',cal:420,p:20,c:42,f:18},
      {name:'Mixed Vegetable Soup & Garlic Bread',cal:350,p:12,c:44,f:12},
      {name:'Stuffed Bell Peppers with Quinoa',cal:380,p:14,c:48,f:14},
      {name:'Tofu Stir-Fry with Steamed Rice',cal:400,p:18,c:50,f:12},
      {name:'Chole with Jeera Rice',cal:440,p:16,c:58,f:14}
    ],
    nonveg:[
      {name:'Baked Salmon with Asparagus',cal:420,p:36,c:18,f:22},
      {name:'Chicken Tikka with Mint Chutney',cal:400,p:34,c:20,f:18},
      {name:'Grilled Fish Tacos',cal:390,p:30,c:32,f:16},
      {name:'Egg Curry with Brown Rice',cal:430,p:22,c:48,f:16}
    ],
    vegan:[
      {name:'Vegetable Thai Curry with Rice',cal:410,p:12,c:55,f:16},
      {name:'Grilled Portobello Mushroom Bowl',cal:360,p:14,c:40,f:16}
    ]
  },
  snacks:{
    veg:[
      {name:'Mixed Nuts & Dried Fruits (30g)',cal:170,p:5,c:15,f:11},
      {name:'Apple Slices with Almond Butter',cal:190,p:4,c:22,f:10},
      {name:'Roasted Makhana',cal:120,p:4,c:18,f:3},
      {name:'Fruit Salad with Honey',cal:140,p:2,c:32,f:1},
      {name:'Hummus with Carrot Sticks',cal:160,p:6,c:18,f:7}
    ],
    nonveg:[
      {name:'Boiled Eggs (2)',cal:155,p:13,c:1,f:11},
      {name:'Chicken Strips with Hummus',cal:200,p:18,c:12,f:8}
    ],
    vegan:[
      {name:'Trail Mix (40g)',cal:180,p:6,c:16,f:12},
      {name:'Rice Cakes with Avocado',cal:160,p:3,c:20,f:8}
    ]
  }
};

function buildMeals(u, totalCal){
  const dtype = (u.diet==='veg'||u.diet==='eggetarian') ? 'veg' : u.diet==='vegan'?'vegan':'nonveg';
  const pick=(pool, type)=>{
    let list = pool[type] || pool.veg;
    if(type==='eggetarian') list = [...pool.veg,...(pool.nonveg||[]).filter(m=>/egg/i.test(m.name))];
    // Filter allergies
    if(u.allergies.length) list = list.filter(m=>!u.allergies.some(a=>m.name.toLowerCase().includes(a.toLowerCase())));
    // Condition-aware filtering
    if(u.conditions.includes('diabetes')) list = list.filter(m=>m.c < 60);
    if(u.conditions.includes('heart_disease')) list = list.filter(m=>m.f < 20);
    return list.length ? list[Math.floor(Math.random()*list.length)] : {name:'Custom Meal',cal:300,p:15,c:35,f:10};
  };

  return [
    {type:'Breakfast', time:'8:00 AM', emoji:'🌅', ...pick(DB.breakfast,dtype)},
    {type:'Lunch', time:'1:00 PM', emoji:'☀️', ...pick(DB.lunch,dtype)},
    {type:'Snack', time:'4:30 PM', emoji:'🍎', ...pick(DB.snacks,dtype)},
    {type:'Dinner', time:'7:30 PM', emoji:'🌙', ...pick(DB.dinner,dtype)}
  ];
}

// --- Dashboard Rendering ---
function renderDashboard(){
  const $nodata=document.getElementById('dash-nodata'), $content=document.getElementById('dash-content');
  if(!userData||!dietPlan){ $nodata.classList.remove('hidden'); $content.classList.add('hidden'); return; }
  $nodata.classList.add('hidden'); $content.classList.remove('hidden');

  // Stats
  document.getElementById('stat-calories').textContent = dietPlan.calories;
  document.getElementById('stat-protein').textContent = dietPlan.protein+'g';
  document.getElementById('stat-carbs').textContent = dietPlan.carbs+'g';
  document.getElementById('stat-fat').textContent = dietPlan.fat+'g';

  // Tip
  document.getElementById('daily-tip').textContent = randomTip();

  // Risk Alerts
  renderAlerts();

  // Meals
  const $ml = document.getElementById('meal-list');
  $ml.innerHTML = dietPlan.meals.map(m=>`
    <div class="meal-item">
      <h4>${m.emoji} ${m.type} <button class="btn btn-sm btn-secondary" style="margin-left:auto;padding:2px 8px;font-size:.75rem" onclick="toggleFav('${m.name}')">⭐</button></h4>
      <div class="meal-time">${m.time}</div>
      <div class="meal-foods">${m.name}</div>
      <div class="meal-cal">${m.cal} kcal · P:${m.p}g · C:${m.c}g · F:${m.f}g</div>
    </div>`).join('');

  // Health Insights
  renderInsights();

  // Quick Meals
  renderQuickMeals();

  // Favorites
  renderFavorites();

  // Weight Chart
  drawWeightChart();
}

function renderAlerts(){
  const $el = document.getElementById('risk-alerts');
  if(!userData.conditions.length){ $el.innerHTML=''; return; }
  const alerts=[];
  if(userData.conditions.includes('diabetes')) alerts.push('Avoid high-sugar foods like sweets, sugary drinks, and white bread. Your plan limits carbs per meal.');
  if(userData.conditions.includes('hypertension')) alerts.push('Limit sodium intake. Avoid processed foods, pickles, and excess salt.');
  if(userData.conditions.includes('heart_disease')) alerts.push('Low-fat meals recommended. Avoid fried foods, full-fat dairy, and red meat.');
  if(userData.conditions.includes('cholesterol')) alerts.push('Avoid trans fats and saturated fats. Opt for olive oil and lean proteins.');
  if(userData.conditions.includes('thyroid')) alerts.push('Limit soy products and cruciferous vegetables if on thyroid medication.');
  $el.innerHTML = alerts.map(a=>`<div class="alert-banner"><span class="alert-icon">⚠️</span><p>${a}</p></div>`).join('');
}

function renderInsights(){
  const $el = document.getElementById('health-insights');
  const bmi = userData.bmi;
  let bmiStatus, bmiClass;
  if(bmi<18.5){ bmiStatus='Underweight'; bmiClass='warn'; }
  else if(bmi<25){ bmiStatus='Normal'; bmiClass='good'; }
  else if(bmi<30){ bmiStatus='Overweight'; bmiClass='warn'; }
  else { bmiStatus='Obese'; bmiClass='bad'; }

  const items = [
    {dot:bmiClass, text:`<strong>BMI: ${bmi}</strong> — ${bmiStatus}`},
    {dot:userData.water>=8?'good':'warn', text:`<strong>Water:</strong> ${userData.water} glasses/day ${userData.water<8?'— Try to drink more!':''}`},
    {dot:userData.sleep>=7?'good':'warn', text:`<strong>Sleep:</strong> ${userData.sleep}h/night ${userData.sleep<7?'— Aim for 7-8 hours':'— Great!'}`},
    {dot:userData.eatout==='rarely'||userData.eatout==='weekly'?'good':'warn', text:`<strong>Eating out:</strong> ${userData.eatout} ${userData.eatout==='frequent'||userData.eatout==='daily'?'— Consider cooking more meals at home':''}`}
  ];
  $el.innerHTML = items.map(i=>`<div class="insight-item"><div class="insight-dot ${i.dot}"></div><p>${i.text}</p></div>`).join('');
}

function renderQuickMeals(){
  const hr = new Date().getHours();
  let period, meals;
  const dtype = (userData.diet==='veg'||userData.diet==='eggetarian')?'veg':userData.diet==='vegan'?'vegan':'nonveg';

  if(hr<11){ period='Morning'; meals=DB.breakfast[dtype]||DB.breakfast.veg; }
  else if(hr<15){ period='Afternoon'; meals=DB.lunch[dtype]||DB.lunch.veg; }
  else if(hr<18){ period='Evening'; meals=DB.snacks[dtype]||DB.snacks.veg; }
  else { period='Night'; meals=DB.dinner[dtype]||DB.dinner.veg; }

  document.getElementById('time-context').textContent = `${period} suggestions`;
  const picks = meals.sort(()=>Math.random()-0.5).slice(0,3);
  document.getElementById('quick-meals').innerHTML = picks.map(m=>`
    <div class="quick-meal-card" onclick="toggleFav('${m.name}')">
      <div class="qm-time">${period}</div>
      <h4>${m.name}</h4>
      <p>${m.cal} kcal · P:${m.p}g · C:${m.c}g · F:${m.f}g</p>
    </div>`).join('');
}

function renderFavorites(){
  const $el = document.getElementById('fav-chips');
  if(!favorites.length){ $el.innerHTML='<p style="color:var(--text-muted);font-size:.85rem">No favorites saved yet. Click ⭐ to save meals.</p>'; return; }
  $el.innerHTML = favorites.map(f=>`<span class="fav-chip">${f} <span class="remove" onclick="removeFav('${f}')">✕</span></span>`).join('');
}

window.toggleFav = function(name){
  if(favorites.includes(name)) favorites=favorites.filter(f=>f!==name);
  else favorites.push(name);
  save(); renderFavorites(); toast(favorites.includes(name)?'Added to favorites ⭐':'Removed from favorites','success');
};
window.removeFav = function(name){ favorites=favorites.filter(f=>f!==name); save(); renderFavorites(); };

// --- Weight Chart (Canvas) ---
function drawWeightChart(){
  const canvas = document.getElementById('weight-chart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * 2; canvas.height = 400;
  ctx.scale(2,2);
  const W = rect.width, H = 200;

  ctx.clearRect(0,0,W,H);
  if(weightLog.length<2){
    ctx.fillStyle='#64748b'; ctx.font='14px Inter'; ctx.textAlign='center';
    ctx.fillText('Log more weight entries to see your chart',W/2,H/2);
    return;
  }

  const weights = weightLog.map(e=>e.weight);
  const min=Math.min(...weights)-2, max=Math.max(...weights)+2;
  const padL=40,padR=20,padT=20,padB=30;
  const gW=W-padL-padR, gH=H-padT-padB;

  // Grid
  ctx.strokeStyle='rgba(148,163,184,.1)'; ctx.lineWidth=1;
  for(let i=0;i<5;i++){
    const y=padT+gH*i/4;
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y); ctx.stroke();
    ctx.fillStyle='#64748b'; ctx.font='11px Inter'; ctx.textAlign='right';
    ctx.fillText((max-(max-min)*i/4).toFixed(1),padL-6,y+4);
  }

  // Line
  const grad = ctx.createLinearGradient(0,padT,0,H-padB);
  grad.addColorStop(0,'#10b981'); grad.addColorStop(1,'#3b82f6');
  ctx.strokeStyle=grad; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.beginPath();
  weights.forEach((w,i)=>{
    const x=padL+gW*i/(weights.length-1);
    const y=padT+gH*(1-(w-min)/(max-min));
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });
  ctx.stroke();

  // Dots
  weights.forEach((w,i)=>{
    const x=padL+gW*i/(weights.length-1);
    const y=padT+gH*(1-(w-min)/(max-min));
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);
    ctx.fillStyle='#10b981'; ctx.fill();
    ctx.strokeStyle='#0f172a'; ctx.lineWidth=2; ctx.stroke();
  });
}

// --- Profile ---
function renderProfile(){
  const $nodata=document.getElementById('profile-nodata'), $content=document.getElementById('profile-content');
  if(!userData){ $nodata.classList.remove('hidden'); $content.classList.add('hidden'); return; }
  $nodata.classList.add('hidden'); $content.classList.remove('hidden');

  document.getElementById('profile-avatar').textContent = userData.name.charAt(0).toUpperCase();
  document.getElementById('profile-name').textContent = userData.name;
  document.getElementById('profile-bmi-label').textContent = `BMI: ${userData.bmi} · Goal: ${({lose:'Lose Weight',maintain:'Maintain',gain:'Gain Muscle',health:'Better Health'})[userData.goal]}`;

  const row=(l,v)=>`<div class="data-row"><span class="data-label">${l}</span><span class="data-value">${v}</span></div>`;
  document.getElementById('profile-basic-data').innerHTML = [
    row('Age',userData.age+' years'), row('Gender',userData.gender),
    row('Height',userData.height+' cm'), row('Weight',userData.weight+' kg'),
    row('BMI',userData.bmi), row('Activity',userData.activity)
  ].join('');

  document.getElementById('profile-health-data').innerHTML = [
    row('Conditions', userData.conditions.length?userData.conditions.join(', '):'None'),
    row('Allergies', userData.allergies.length?userData.allergies.join(', '):'None')
  ].join('');

  document.getElementById('profile-lifestyle-data').innerHTML = [
    row('Diet',userData.diet), row('Sleep',userData.sleep+'h'),
    row('Water',userData.water+' glasses'), row('Eating Out',userData.eatout),
    row('Schedule',userData.schedule)
  ].join('');
}

// --- Regenerate ---
document.getElementById('btn-regenerate')?.addEventListener('click',()=>{
  if(!userData) return;
  dietPlan = generateDietPlan(userData);
  save(); renderDashboard();
  toast('New meal plan generated! 🔄','success');
});

// --- Weight Logging ---
document.getElementById('btn-log-weight')?.addEventListener('click',()=>document.getElementById('modal-weight').classList.add('open'));
document.getElementById('btn-cancel-weight')?.addEventListener('click',()=>document.getElementById('modal-weight').classList.remove('open'));
document.getElementById('btn-save-weight')?.addEventListener('click',()=>{
  const w=+document.getElementById('input-log-weight').value;
  if(!w||w<20||w>300) return toast('Enter a valid weight','error');
  weightLog.push({date:new Date().toISOString().slice(0,10),weight:w});
  userData.weight=w; userData.bmi=+(w/((userData.height/100)**2)).toFixed(1);
  save(); document.getElementById('modal-weight').classList.remove('open');
  renderDashboard(); toast('Weight logged! 📈','success');
});

// --- Delete Data ---
document.getElementById('btn-delete-data')?.addEventListener('click',()=>document.getElementById('modal-delete').classList.add('open'));
document.getElementById('btn-cancel-delete')?.addEventListener('click',()=>document.getElementById('modal-delete').classList.remove('open'));
document.getElementById('btn-confirm-delete')?.addEventListener('click',()=>{
  localStorage.removeItem('ns_user'); localStorage.removeItem('ns_plan');
  localStorage.removeItem('ns_favs'); localStorage.removeItem('ns_weight');
  userData=null; dietPlan=null; favorites=[]; weightLog=[];
  document.getElementById('modal-delete').classList.remove('open');
  toast('All data deleted','success'); navigateTo('home');
  $hero.classList.remove('hidden'); $features.classList.remove('hidden'); $form.classList.add('hidden');
  goStep(1);
});

// --- Edit Profile ---
document.getElementById('btn-edit-profile')?.addEventListener('click',()=>{
  navigateTo('home'); showForm();
  // Pre-fill form
  document.getElementById('input-name').value=userData.name;
  document.getElementById('input-age').value=userData.age;
  document.getElementById('input-gender').value=userData.gender;
  document.getElementById('input-height').value=userData.height;
  document.getElementById('input-weight').value=userData.weight;
  document.getElementById('input-activity').value=userData.activity;
  document.getElementById('input-allergies').value=userData.allergies.join(', ');
  document.getElementById('input-sleep').value=userData.sleep;
  document.getElementById('input-water').value=userData.water;
  document.getElementById('input-diet').value=userData.diet;
  document.getElementById('input-eatout').value=userData.eatout;
  document.getElementById('input-schedule').value=userData.schedule;
  document.getElementById('input-goal').value=userData.goal;
  userData.conditions.forEach(c=>{
    const cb=document.querySelector(`#conditions-grid input[value="${c}"]`);
    if(cb) cb.checked=true;
  });
});

// --- Tips ---
const tips=[
  'Drinking a glass of water 30 minutes before meals can help with portion control.',
  'Eating slowly helps your brain register fullness, reducing overeating.',
  'Adding a handful of nuts to your diet provides healthy fats and keeps you satiated.',
  'Colorful plates are healthier plates — aim for 3+ colors of vegetables per meal.',
  'Replace sugary drinks with herbal tea or infused water for better hydration.',
  'Meal prepping on weekends can save time and prevent unhealthy takeout choices.',
  'Getting 7-8 hours of sleep improves metabolism and reduces cravings.',
  'A 15-minute walk after meals can improve digestion and blood sugar levels.',
  'Fermented foods like yogurt and kimchi support gut health.',
  'Starting your day with protein keeps you fuller longer than carb-heavy breakfasts.',
  'Fiber-rich foods like oats, lentils, and vegetables promote heart health.',
  'Mindful eating — chewing slowly and savoring each bite — improves digestion.',
  'Replacing refined grains with whole grains boosts fiber and nutrient intake.',
  'Healthy snacking between meals prevents energy crashes and overeating at dinner.'
];
function randomTip(){ return tips[Math.floor(Math.random()*tips.length)]; }

// --- Toast ---
function toast(msg,type='success'){
  const $c=document.getElementById('toast-container');
  const $t=document.createElement('div');
  $t.className='toast '+type;
  $t.innerHTML=`<span>${type==='success'?'✅':'❌'}</span> ${msg}`;
  $c.appendChild($t);
  setTimeout(()=>{$t.style.opacity='0';$t.style.transition='opacity .3s';setTimeout(()=>$t.remove(),300);},3000);
}

// --- Init ---
if(userData && dietPlan){
  $hero.classList.remove('hidden'); $features.classList.remove('hidden');
}

})();
