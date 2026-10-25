const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const C=window.LEO_CONFIG||{},TZ=C.timezone||'Asia/Tashkent',TG=C.telegram||'kaishi_tattoo';
const T={
en:{tag:'TASHKENT · BY APPOINTMENT',n1:'Home',n2:'About',n3:'Ideas',n4:'Booking',n5:'Contact',book:'Book now',view:'See the ideas',
h1:'Ink is<br><em>identity.</em>',lead:'Bold lines. Unforgettable presence. Pick an idea from the collection or bring your own — Leo will make it yours.',
t1:'680+ ideas',t1p:'Pick any single design — or bring your own idea.',t2:'Easy booking',t2p:'Pick a day, Leo messages you to agree on the time.',t3:'Custom work',t3p:'Your idea and style, with Leo guiding size and placement.',t4:'Follow Leo',t4p:'Instagram, TikTok and Telegram.',
a0:'The artist',a1:'Line. Ink.<br><em>Legacy.</em>',a2:'Leo tattoos with calculated detail and a clear, bold line — from choosing the idea to placing it on the body.',a3:'Only a few sessions a week, so every piece gets full attention.',
s1:'Choose an idea',s2:'Pick a day',s3:'Leo contacts you',s4:'Get tattooed',
g1:'Ideas',g2:'A collection of styles Leo can tattoo for you — fine line, tribal, lettering, symbols and more. Open a sheet and pick one exact design, or describe your own idea when booking.',gb:'Choose a design from this sheet',dz:'Sheet',
b1:'Book your session',b2:'By appointment only · Sunday – Thursday, 13:00 – 22:00 · Tashkent. Pick a day and send your details — Leo will message you to agree on the exact time.',
fn:'Full name *',fp:'Phone / WhatsApp *',fc:'Telegram or Instagram username (optional)',fe:'Email (optional)',fi:'Describe your idea: size, colour, body placement… (optional)',
pb:'Choose a design (optional)',pbc:'Change design',pbh:'Have your own picture? Send it to Leo on Telegram @'+TG+'.',dpT:'Choose one design',dpH:'Tap a design to select it.',
ok:'I agree to be contacted about my booking.',send:'Send booking request',
wk:['Sun','Mon','Tue','Wed','Thu'],mo:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
pick:'Choose a day.',sel:'Selected day:',offline:'Online booking is being set up. Please message Leo on Telegram for now.',
need:'Please choose a day.',need2:'Enter your name and phone number.',need3:'Please accept the contact consent.',sending:'Sending…',
done:'Request sent! Leo will contact you to confirm the time.',fail:'Could not send. Please try again or message Leo on Telegram.',many:'Too many requests. Please wait a little or message Leo on Telegram.',tg:'Message Leo on Telegram',busy:'Busy',closedMsg:'Sorry, Leo has just marked this day as busy. Please choose another day.',design:'Design',
f0:'Before you book',q1:'No idea yet — can I pick from the collection?',a_1:'Yes. Open any sheet in “Ideas” and press “Choose a design from this sheet”, or use “Choose a design” in the booking form. Only the design you pick is sent to Leo.',q2:'Can I change size or colour?',a_2:'Of course. Write it in the description box. Leo reviews every detail with you before the session.',q3:'How does booking work?',a_3:'Choose a day and send your details. Your request goes straight to Leo on Telegram, and he contacts you to agree on the exact time.',q4:'I have my own picture or design',a_4:'Great — send the picture to Leo on Telegram @'+TG+' and tell him what you want. You can still book a day here first.',
ft:'Strong ink. A design that looks like you.',emailLabel:'Email Leo',loc:'Tashkent, Uzbekistan',tk1:'Tattoo by appointment',tk2:'Made for your story',tk3:'Your idea. Leo’s line.'},
ru:{tag:'ТАШКЕНТ · ПО ЗАПИСИ',n1:'Главная',n2:'О мастере',n3:'Идеи',n4:'Запись',n5:'Контакты',book:'Записаться',view:'Смотреть идеи',
h1:'Тату —<br><em>это ты.</em>',lead:'Смелая линия. Запоминающийся образ. Выберите идею из коллекции или принесите свою — Лео сделает её вашей.',
t1:'680+ идей',t1p:'Выберите любой отдельный эскиз — или принесите свою идею.',t2:'Лёгкая запись',t2p:'Выберите день — Лео напишет вам и согласует время.',t3:'Индивидуальная работа',t3p:'Ваша идея и стиль — Лео поможет с размером и местом.',t4:'Подписаться',t4p:'Instagram, TikTok и Telegram.',
a0:'Мастер',a1:'Линия. Чернила.<br><em>Стиль.</em>',a2:'Лео создаёт татуировки с точной детализацией и чёткой смелой линией — от выбора идеи до нанесения на тело.',a3:'Всего несколько сеансов в неделю — поэтому каждой работе уделяется полное внимание.',
s1:'Выберите идею',s2:'Выберите день',s3:'Лео свяжется с вами',s4:'Сеанс татуировки',
g1:'Идеи',g2:'Коллекция стилей, которые Лео может набить для вас: тонкие линии, трайбл, надписи, символы и другое. Откройте лист и выберите один конкретный эскиз — или опишите свою идею при записи.',gb:'Выбрать эскиз с этого листа',dz:'Лист',
b1:'Запись на сеанс',b2:'Только по записи · Воскресенье – четверг, 13:00 – 22:00 · Ташкент. Выберите день и отправьте данные — Лео напишет вам и согласует точное время.',
fn:'Имя и фамилия *',fp:'Телефон / WhatsApp *',fc:'Ник в Telegram или Instagram (по желанию)',fe:'Email (по желанию)',fi:'Опишите идею: размер, цвет, место на теле… (по желанию)',
pb:'Выбрать эскиз (по желанию)',pbc:'Изменить эскиз',pbh:'Есть своя картинка? Отправьте её Лео в Telegram @'+TG+'.',dpT:'Выберите один эскиз',dpH:'Нажмите на эскиз, чтобы выбрать его.',
ok:'Согласен(на), чтобы со мной связались по записи.',send:'Отправить заявку',
wk:['Вс','Пн','Вт','Ср','Чт'],mo:['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],
pick:'Выберите день.',sel:'Выбранный день:',offline:'Онлайн-запись настраивается. Пока напишите Лео в Telegram.',
need:'Выберите день.',need2:'Введите имя и телефон.',need3:'Подтвердите согласие на связь.',sending:'Отправка…',
done:'Заявка отправлена! Лео свяжется с вами, чтобы подтвердить время.',fail:'Не удалось отправить. Попробуйте ещё раз или напишите Лео в Telegram.',many:'Слишком много заявок. Подождите немного или напишите Лео в Telegram.',tg:'Написать Лео в Telegram',busy:'Занято',closedMsg:'Извините, Лео только что отметил этот день как занятый. Выберите другой день.',design:'Эскиз',
f0:'Перед записью',q1:'Нет идеи — можно выбрать из коллекции?',a_1:'Да. Откройте любой лист в разделе «Идеи» и нажмите «Выбрать эскиз с этого листа» или используйте кнопку «Выбрать эскиз» в форме. Лео получит только выбранный вами эскиз.',q2:'Можно изменить размер или цвет?',a_2:'Конечно. Напишите об этом в описании. Лео обсудит все детали с вами до сеанса.',q3:'Как работает запись?',a_3:'Выберите день и отправьте данные. Заявка сразу приходит Лео в Telegram, и он свяжется с вами, чтобы согласовать точное время.',q4:'У меня своя картинка или эскиз',a_4:'Отлично — отправьте картинку Лео в Telegram @'+TG+' и напишите, что хотите. День можно забронировать здесь заранее.',
ft:'Сильные работы. Тату, которое похоже на вас.',emailLabel:'Написать Лео',loc:'Ташкент, Узбекистан',tk1:'Тату по записи',tk2:'Для вашей истории',tk3:'Ваша идея. Линия Лео.'},
uz:{tag:'TOSHKENT · OLDINDAN YOZILISH BILAN',n1:'Bosh sahifa',n2:'Usta haqida',n3:'Gʻoyalar',n4:'Bron',n5:'Aloqa',book:'Bron qilish',view:'Gʻoyalarni koʻrish',
h1:'Tatu —<br><em>bu siz.</em>',lead:'Jasur chiziq. Esda qoladigan obraz. Kolleksiyadan gʻoya tanlang yoki oʻzingiznikini olib keling — Leo uni sizniki qiladi.',
t1:'680+ gʻoya',t1p:'Istalgan bitta eskizni tanlang — yoki oʻz gʻoyangizni olib keling.',t2:'Oson bron',t2p:'Kunni tanlang — Leo sizga yozib, vaqtni kelishadi.',t3:'Individual ish',t3p:'Gʻoya va uslubingiz — oʻlcham va joyni tanlashda Leo yordam beradi.',t4:'Obuna boʻling',t4p:'Instagram, TikTok va Telegram.',
a0:'Usta',a1:'Chiziq. Siyoh.<br><em>Uslub.</em>',a2:'Leo tatularni aniq detallar va ravshan, jasur chiziq bilan ishlaydi — gʻoyani tanlashdan tanaga tushirishgacha.',a3:'Haftasiga bir necha seans — shuning uchun har bir ishga toʻliq eʼtibor beriladi.',
s1:'Gʻoyani tanlang',s2:'Kunni tanlang',s3:'Leo siz bilan bogʻlanadi',s4:'Tatu seansi',
g1:'Gʻoyalar',g2:'Leo siz uchun qila oladigan uslublar toʻplami: nozik chiziq, tribal, yozuvlar, belgilar va boshqalar. Varaqni oching va aynan bitta eskizni tanlang — yoki bron paytida oʻz gʻoyangizni yozing.',gb:'Shu varaqdan eskiz tanlash',dz:'Varaq',
b1:'Seansni bron qiling',b2:'Faqat oldindan yozilish bilan · Yakshanba – payshanba, 13:00 – 22:00 · Toshkent. Kunni tanlab, maʼlumotlaringizni yuboring — Leo sizga yozib, aniq vaqtni kelishadi.',
fn:'Ism va familiya *',fp:'Telefon / WhatsApp *',fc:'Telegram yoki Instagram nik (ixtiyoriy)',fe:'Email (ixtiyoriy)',fi:'Gʻoyangizni yozing: oʻlcham, rang, tanadagi joy… (ixtiyoriy)',
pb:'Eskiz tanlash (ixtiyoriy)',pbc:'Eskizni oʻzgartirish',pbh:'Oʻz rasmingiz bormi? Uni Leoga Telegramda yuboring: @'+TG+'.',dpT:'Bitta eskizni tanlang',dpH:'Tanlash uchun eskizni bosing.',
ok:'Bron boʻyicha men bilan bogʻlanishlariga roziman.',send:'Soʻrov yuborish',
wk:['Yak','Dush','Sesh','Chor','Pay'],mo:['yan','fev','mar','apr','may','iyn','iyl','avg','sen','okt','noy','dek'],
pick:'Kunni tanlang.',sel:'Tanlangan kun:',offline:'Onlayn bron sozlanmoqda. Hozircha Leoga Telegramda yozing.',
need:'Kunni tanlang.',need2:'Ism va telefon raqamini kiriting.',need3:'Aloqa uchun rozilikni tasdiqlang.',sending:'Yuborilmoqda…',
done:'Soʻrov yuborildi! Leo vaqtni tasdiqlash uchun siz bilan bogʻlanadi.',fail:'Yuborib boʻlmadi. Qayta urinib koʻring yoki Leoga Telegramda yozing.',many:'Soʻrovlar juda koʻp. Biroz kuting yoki Leoga Telegramda yozing.',tg:'Leoga Telegramda yozish',busy:'Band',closedMsg:'Kechirasiz, Leo bu kunni hozirgina band deb belgiladi. Boshqa kunni tanlang.',design:'Eskiz',
f0:'Bron qilishdan oldin',q1:'Gʻoyam yoʻq — kolleksiyadan tanlasam boʻladimi?',a_1:'Ha. «Gʻoyalar» boʻlimida istalgan varaqni oching va «Shu varaqdan eskiz tanlash» tugmasini bosing yoki formadagi «Eskiz tanlash» tugmasidan foydalaning. Leoga faqat siz tanlagan eskiz yuboriladi.',q2:'Oʻlcham yoki rangni oʻzgartirsam boʻladimi?',a_2:'Albatta. Buni tavsifda yozing. Leo seansdan oldin barcha tafsilotlarni siz bilan koʻrib chiqadi.',q3:'Bron qanday ishlaydi?',a_3:'Kunni tanlab, maʼlumotlaringizni yuboring. Soʻrov darhol Leoga Telegramda keladi va u aniq vaqtni kelishish uchun siz bilan bogʻlanadi.',q4:'Mening oʻz rasmim yoki eskizim bor',a_4:'Ajoyib — rasmni Leoga Telegramda @'+TG+' yuboring va nima xohlashingizni yozing. Kunni shu yerda oldindan bron qilishingiz mumkin.',
ft:'Kuchli ishlar. Sizga oʻxshagan tatu.',emailLabel:'Leoga email yuborish',loc:'Toshkent, Oʻzbekiston',tk1:'Oldindan yozilish bilan tatu',tk2:'Sizning hikoyangiz uchun',tk3:'Gʻoya sizdan. Chiziq Leodan.'},
};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let L=['en','ru','uz'].includes(store.get('lang'))?store.get('lang'):'ru';
const TH=window.LEO_THUMB||(id=>`<img src="img/d/th/${id}.jpg" alt="" loading="lazy">`);
const t=k=>T[L][k],pad=n=>String(n).padStart(2,'0'),G=window.GALLERY||[],D=window.DESIGNS||[];
function applyLang(){document.documentElement.lang=L;store.set('lang',L);
 document.title=({en:'ЛЕО Tattoo — Tashkent tattoo artist',ru:'ЛЕО Tattoo — тату-мастер в Ташкенте',uz:'ЛЕО Tattoo — Toshkentdagi tatu ustasi'})[L];
 document.querySelector('meta[name="description"]').content=({en:'Tattoo artist Leo in Tashkent. 680+ design ideas, custom work and online booking by appointment.',ru:'Тату-мастер Лео в Ташкенте. 680+ идей эскизов, индивидуальные работы и онлайн-запись.',uz:'Toshkentdagi tatu ustasi Leo. 680+ eskiz gʻoyasi, individual ishlar va onlayn bron.'})[L];
 $$('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));$$('[data-i18n-html]').forEach(e=>e.innerHTML=t(e.dataset.i18nHtml));
 $$('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));$$('#grid img').forEach((img,i)=>img.alt=`${t('dz')} ${pad(i+1)}`);
 $$('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===L));renderPick();renderWeek();}
$$('.lang button').forEach(b=>b.onclick=()=>{L=b.dataset.l;applyLang()});
$('#burger').onclick=()=>$('#menu').classList.toggle('open');$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
const toast=m=>{const n=$('#toast');n.textContent=m;n.classList.add('show');setTimeout(()=>n.classList.remove('show'),3200)};
$$('[data-tg]').forEach(a=>{a.href='https://t.me/'+TG});
// ---- gallery (sheets) + lightbox
$('#grid').innerHTML=G.map(g=>`<figure data-n="${pad(g[0])}" data-i="${g[0]}"><img src="img/t/${pad(g[0])}.jpg" width="${g[1]}" height="${g[2]}" loading="lazy" alt="${t('dz')} ${pad(g[0])}"></figure>`).join('');
let cur=1;const lb=$('#lb');
function show(n){cur=((n-1+G.length)%G.length)+1;$('#lbi').src=`img/g/${pad(cur)}.jpg`;$('#lbt').textContent=`${t('dz')} ${pad(cur)} / ${G.length}`}
$('#grid').onclick=e=>{const f=e.target.closest('figure');if(f){show(+f.dataset.i);lb.hidden=false;document.body.style.overflow='hidden'}};
const close=()=>{lb.hidden=true;document.body.style.overflow=''};
$('#lbx').onclick=close;$('#lbp').onclick=()=>show(cur-1);$('#lbn').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)close()};
$('#lbb').onclick=()=>{close();location.hash='#booking';openPicker(cur)};
addEventListener('keydown',e=>{if(!dp.hidden){if(e.key==='Escape')closePicker();return}if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
// ---- design picker (one exact design out of a sheet)
const dp=$('#dp');let design='',dpSheet=1;
$('#dpTabs').innerHTML=D.map(([s,n])=>`<button type="button" data-s="${s}"><img src="img/t/${pad(s)}.jpg" alt="" loading="lazy"><b>${pad(s)}</b><small>${n}</small></button>`).join('');
function renderSheet(s){dpSheet=s;$$('#dpTabs button').forEach(b=>b.classList.toggle('on',+b.dataset.s===s));
 const n=(D.find(x=>x[0]===s)||[0,0])[1];
 $('#dpGrid').innerHTML=Array.from({length:n},(_,i)=>{const id=`${pad(s)}-${pad(i+1)}`;return `<button type="button" data-id="${id}" class="${id===design?'on':''}" aria-label="${t('design')} ${id}">${TH(id)}<span>${id}</span></button>`}).join('');
 $('#dpGrid').scrollTop=0;const tab=$(`#dpTabs [data-s="${s}"]`);if(tab){const bar=$('#dpTabs');bar.scrollLeft=tab.offsetLeft-bar.clientWidth/2+tab.offsetWidth/2}}
function openPicker(s){renderSheet(s||(design?+design.slice(0,2):1));dp.hidden=false;document.body.style.overflow='hidden'}
function closePicker(){dp.hidden=true;document.body.style.overflow=''}
$('#dpTabs').onclick=e=>{const b=e.target.closest('button');if(b)renderSheet(+b.dataset.s)};
$('#dpGrid').onclick=e=>{const b=e.target.closest('button');if(!b)return;design=b.dataset.id;renderPick();closePicker();$('#pb').scrollIntoView({block:'center'})};
$('#dpTabs').style.position='relative';
$('#dpx').onclick=closePicker;dp.onclick=e=>{if(e.target===dp)closePicker()};
$('#pb').onclick=()=>openPicker();$('#ppx').onclick=()=>{design='';renderPick()};
function renderPick(){$('#pp').hidden=!design;$('#pb').textContent=t(design?'pbc':'pb');if(design){$('#ppi').innerHTML=TH(design);$('#ppt').textContent=`${t('design')} ${design}`}}
// ---- booking: day only (Sun–Thu), sent to Leo's Telegram via the booking endpoint
const live=!!(C.bookingEndpoint||window.LEO_SEND),WEEKS=8;
function nowTZ(){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));return{key:`${p.year}-${p.month}-${p.day}`,mins:+p.hour*60+ +p.minute}}
const addD=(k,n)=>{const d=new Date(k+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const dow=k=>new Date(k+'T12:00:00Z').getUTCDay(),fmt=k=>{const[,m,d]=k.split('-');return `${+d} ${t('mo')[+m-1]}`};
let off=0,day=null,closed=new Set();
async function loadClosed(){if(!live)return;if(window.LEO_CLOSED){closed=new Set(window.LEO_CLOSED());renderWeek();return}try{const r=await fetch(C.bookingEndpoint.replace(/\/?$/,'/')+'closed',{cache:'no-store'});const j=await r.json();closed=new Set(j.closed||[]);renderWeek()}catch(e){}}
const weekStart=()=>{const n=nowTZ().key;return addD(n,-dow(n)+off*7)};
const closedDay=k=>{const n=nowTZ();return k<n.key||(k===n.key&&n.mins>=21*60)||closed.has(k)};
function renderWeek(){const s=weekStart();$('#wl').textContent=`${fmt(s)} — ${fmt(addD(s,4))}`;$('#pw').disabled=off<=0;$('#nw').disabled=off>=WEEKS;
 $('#days').innerHTML=t('wk').map((w,i)=>{const k=addD(s,i);const busy=closed.has(k)&&k>=nowTZ().key;return `<button type="button" class="day${k===day?' selected':''}${busy?' busy':''}" data-k="${k}" ${closedDay(k)?'disabled':''}${busy?` title="${t('busy')}"`:''}><small>${w}</small><b>${fmt(k)}</b>${busy?`<em>✕ ${t('busy')}</em>`:''}</button>`}).join('');
 if(day&&closedDay(day))day=null;$('#hint').textContent=!live?t('offline'):day?`${t('sel')} ${t('wk')[dow(day)]}, ${fmt(day)}`:t('pick');}
$('#days').onclick=e=>{const b=e.target.closest('.day');if(!b||b.disabled)return;day=b.dataset.k;$$('.day').forEach(x=>x.classList.toggle('selected',x===b));renderWeek()};
$('#pw').onclick=()=>{off--;renderWeek()};$('#nw').onclick=()=>{off++;renderWeek()};
setInterval(()=>{if(document.visibilityState==='visible'){renderWeek();loadClosed()}},60_000);addEventListener('focus',loadClosed);loadClosed();
const say=(m,c)=>{const e=$('#msg');e.className='msg '+(c||'');e.innerHTML='';e.append(m)};
const tgLink=()=>Object.assign(document.createElement('a'),{href:'https://t.me/'+TG,target:'_blank',rel:'noopener',textContent:t('tg')});
const withTg=txt=>{const m=document.createElement('span');m.append(txt+' ');m.append(tgLink());return m};
$('#bf').onsubmit=async e=>{e.preventDefault();if($('#hp').value)return;
 if(!live)return say(withTg(t('offline')),'err');
 const d={name:$('#fn').value.trim(),phone:$('#fp').value.trim(),contact:$('#fc').value.trim(),email:$('#fe').value.trim(),idea:$('#fi').value.trim(),design,day,lang:L};
 if(!day)return say(t('need'),'err');if(d.name.length<2||d.phone.replace(/\D/g,'').length<7)return say(t('need2'),'err');if(!$('#ok').checked)return say(t('need3'),'err');
 const sb=$('#sb');sb.disabled=true;say(t('sending'));
 try{const r=window.LEO_SEND?await window.LEO_SEND(d):await fetch(C.bookingEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
  const j=await r.json().catch(()=>({}));
  if(j.error==='closed'){await loadClosed();return say(t('closedMsg'),'err')}
  if(!r.ok||!j.ok)return say(withTg(t(r.status===429?'many':'fail')),'err');
  say(withTg(`${t('done')} (${j.ref})`),'ok');toast('✓');e.target.reset();design='';day=null;renderPick();renderWeek();
 }catch(err){say(withTg(t('fail')),'err')}finally{sb.disabled=false}};
// ---- space background
(function(){const c=$('#stars'),x=c.getContext('2d');let w,h,S=[];const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight;S=Array.from({length:Math.min(140,w/9)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.2,p:Math.random()*6,v:Math.random()*.15+.03}))};rs();addEventListener('resize',rs);
 const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 (function f(t){x.clearRect(0,0,w,h);S.forEach(s=>{s.y-=still?0:s.v;if(s.y<0)s.y=h;x.globalAlpha=.35+.45*Math.sin(t/900+s.p);x.fillStyle=s.r>1?'#ff4a3d':'#f1e4d6';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});if(!still)requestAnimationFrame(f)})(0)})();
window.LEO_REFRESH=loadClosed;
applyLang();
