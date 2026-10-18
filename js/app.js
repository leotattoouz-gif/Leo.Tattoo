const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const C=window.LEO_CONFIG||{},TZ=C.timezone||'Asia/Tashkent';
const T={
en:{tag:'INK FOR LIFE.',n1:'Home',n2:'About',n3:'Gallery',n4:'Booking',n5:'Contact',book:'Book now',view:'View gallery',
h1:'Ink is<br><em>identity.</em>',lead:'Bold lines. Unforgettable presence. Pick a design or build your own idea with Leo.',
t1:'Flash designs',t1p:'22 ready-made designs to choose from.',t2:'Easy booking',t2p:'Pick a day and hour, Leo confirms.',t3:'Custom work',t3p:'Your idea and style, with Leo guiding placement.',t4:'Follow Leo',t4p:'Instagram, TikTok and Telegram.',
a0:'The artist',a1:'Line. Ink.<br><em>Legacy.</em>',a2:'Leo draws tattoos with calculated detail and a clear, bold line — from choosing the idea to placing it on the body.',a3:'No random pieces. A confident choice, made to last.',
s1:'Choose a design',s2:'Book a time',s3:'Leo confirms',s4:'Get tattooed',
g1:'The archive',g2:'These are a few options, not the only designs. Choose one or describe your own idea when booking.',gb:'Book this design',dz:'Design',
b1:'Book your session',b2:'Sunday – Thursday, 13:00 – 22:00 (Tashkent time). Pick a slot and send your request.',
fn:'Full name',fp:'Phone / WhatsApp',fc:'Telegram or Instagram (optional)',fe:'Email (optional)',fi:'Describe the idea you have in mind. Leo will help decide the best placement.',ok:'I agree to be contacted about my booking.',send:'Send booking request',
wk:['Sun','Mon','Tue','Wed','Thu'],mo:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
pick:'Choose a day first.',pick2:'Choose an hour.',sel:'Selected:',load:'Loading available times…',loaderr:'Could not verify availability. No booking can be submitted right now.',offline:'Online booking is not configured yet. Message Leo on Telegram.',
need:'Please choose a day and hour.',need2:'Enter your name and phone number.',need3:'Please accept the contact consent.',sending:'Sending…',
done:'Request received! Leo will confirm your slot by phone or Telegram.',notifyFail:'The booking is saved, but the email alert could not be sent. Please message Leo with your booking reference.',taken:'Someone just took this time. Please choose another.',many:'Too many open requests on this number. Contact Leo directly.',fail:'Could not send. Please try again or message Leo on Telegram.',tg:'Message Leo on Telegram',
f0:'Before you book',q1:'No design yet — can I pick from the gallery?',a_1:'Yes. Open any design in the gallery and press “Book this design”.',q2:'Can I change size or colour?',a_2:'Describe it in the booking form. Leo reviews every detail with you before the session.',q3:'How does booking work?',a_3:'Choose a free slot and send your details. Taken slots disappear for everyone. Leo confirms by phone or Telegram.',q4:'What should I write in the request?',a_4:'Describe your idea, preferred size and colours. Leo will help decide the placement. A gallery design is added automatically when selected.',
ft:'Strong ink. A design that looks like you.',emailLabel:'Email Leo',tk1:'Custom tattoo art',tk2:'Made for your story',tk3:'No copies. All you.'},
ru:{tag:'ТАТУ НА ВСЮ ЖИЗНЬ.',n1:'Главная',n2:'О мастере',n3:'Галерея',n4:'Запись',n5:'Контакты',book:'Записаться',view:'Смотреть галерею',
h1:'Тату —<br><em>это ты.</em>',lead:'Смелая линия. Запоминающийся образ. Выберите эскиз или создайте свою идею вместе с Лео.',
t1:'Готовые эскизы',t1p:'22 готовых дизайна на выбор.',t2:'Лёгкая запись',t2p:'Выберите день и час — Лео подтвердит.',t3:'Индивидуальная работа',t3p:'Ваша идея и стиль — Лео поможет выбрать место.',t4:'Подписаться',t4p:'Instagram, TikTok и Telegram.',
a0:'Мастер',a1:'Линия. Чернила.<br><em>Стиль.</em>',a2:'Лео создаёт татуировки с точной детализацией и чёткой смелой линией — от выбора идеи до нанесения на тело.',a3:'Никаких случайных работ. Уверенный выбор на всю жизнь.',
s1:'Выберите эскиз',s2:'Выберите время',s3:'Лео подтвердит запись',s4:'Сеанс татуировки',
g1:'Архив',g2:'Это лишь несколько вариантов, а не весь выбор. Выберите эскиз или опишите свою идею при записи.',gb:'Записаться с этим эскизом',dz:'Эскиз',
b1:'Запись на сеанс',b2:'Воскресенье – четверг, 13:00 – 22:00 (время Ташкента). Выберите время и отправьте заявку.',
fn:'Имя и фамилия',fp:'Телефон / WhatsApp',fc:'Telegram или Instagram (по желанию)',fe:'Email (по желанию)',fi:'Опишите вашу идею тату. Лео поможет выбрать подходящее место.',ok:'Согласен(на), чтобы со мной связались по записи.',send:'Отправить заявку',
wk:['Вс','Пн','Вт','Ср','Чт'],mo:['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'],
pick:'Сначала выберите день.',pick2:'Выберите час.',sel:'Выбрано:',load:'Загружаем свободное время…',loaderr:'Не удалось проверить расписание. Сейчас нельзя отправить заявку.',offline:'Онлайн-запись ещё не настроена. Напишите Лео в Telegram.',
need:'Выберите день и час.',need2:'Введите имя и телефон.',need3:'Подтвердите согласие на связь.',sending:'Отправка…',
done:'Заявка получена! Лео подтвердит время по телефону или в Telegram.',notifyFail:'Заявка сохранена, но уведомление по email не отправилось. Напишите Лео в Telegram и укажите номер заявки.',taken:'Это время только что заняли. Выберите другое.',many:'Слишком много активных заявок с этого номера. Свяжитесь с Лео напрямую.',fail:'Не удалось отправить. Попробуйте ещё раз или напишите Лео в Telegram.',tg:'Написать Лео в Telegram',
f0:'Перед записью',q1:'Нет эскиза — можно выбрать из галереи?',a_1:'Да. Откройте любой эскиз в галерее и нажмите «Записаться с этим эскизом».',q2:'Можно изменить размер или цвет?',a_2:'Опишите это в форме записи. Лео обсудит все детали с вами до сеанса.',q3:'Как работает запись?',a_3:'Выберите свободное время и отправьте данные. Занятые слоты исчезают для всех. Лео подтвердит по телефону или в Telegram.',q4:'Что написать в заявке?',a_4:'Опишите идею, желаемый размер и цвета. Лео поможет выбрать место для тату. Если вы выбрали эскиз из галереи, он добавится автоматически.',
ft:'Сильные работы. Тату, которое похоже на вас.',emailLabel:'Написать Лео',tk1:'Авторские татуировки',tk2:'Для вашей истории',tk3:'Без копий. Только вы.'},
uz:{tag:'UMRBOD BOʻLADIGAN TATU.',n1:'Bosh sahifa',n2:'Usta haqida',n3:'Galereya',n4:'Bron',n5:'Aloqa',book:'Bron qilish',view:'Galereyani koʻrish',
h1:'Tatu —<br><em>bu siz.</em>',lead:'Jasur chiziq. Esda qoladigan obraz. Eskizni tanlang yoki gʻoyangizni Leo bilan birga yarating.',
t1:'Tayyor eskizlar',t1p:'Tanlash uchun 22 ta tayyor dizayn.',t2:'Oson bron',t2p:'Kun va soatni tanlang — Leo tasdiqlaydi.',t3:'Individual ish',t3p:'Gʻoya va uslubingiz — joy tanlashda Leo yordam beradi.',t4:'Obuna boʻling',t4p:'Instagram, TikTok va Telegram.',
a0:'Usta',a1:'Chiziq. Siyoh.<br><em>Uslub.</em>',a2:'Leo tatularni aniq detallar va ravshan, jasur chiziq bilan ishlaydi — gʻoyani tanlashdan tanaga tushirishgacha.',a3:'Tasodifiy ishlar yoʻq. Umrga moʻljallangan ishonchli tanlov.',
s1:'Eskizni tanlang',s2:'Vaqtni bron qiling',s3:'Leo tasdiqlaydi',s4:'Tatu seansi',
g1:'Arxiv',g2:'Bular bir nechta variant, barcha dizaynlar emas. Birini tanlang yoki bron paytida oʻz gʻoyangizni yozing.',gb:'Shu eskiz bilan bron qilish',dz:'Eskiz',
b1:'Seansni bron qiling',b2:'Yakshanba – payshanba, 13:00 – 22:00 (Toshkent vaqti). Vaqtni tanlab, soʻrov yuboring.',
fn:'Ism va familiya',fp:'Telefon / WhatsApp',fc:'Telegram yoki Instagram (ixtiyoriy)',fe:'Email (ixtiyoriy)',fi:'Tatu gʻoyangizni yozing. Leo mos joyni tanlashda yordam beradi.',ok:'Bron boʻyicha men bilan bogʻlanishlariga roziman.',send:'Soʻrov yuborish',
wk:['Yak','Dush','Sesh','Chor','Pay'],mo:['yan','fev','mar','apr','may','iyn','iyl','avg','sen','okt','noy','dek'],
pick:'Avval kunni tanlang.',pick2:'Soatni tanlang.',sel:'Tanlandi:',load:'Boʻsh vaqtlar yuklanmoqda…',loaderr:'Jadvalni tekshirib boʻlmadi. Hozir bron soʻrovi yuborilmaydi.',offline:'Onlayn bron hali sozlanmagan. Leoga Telegram orqali yozing.',
need:'Kun va soatni tanlang.',need2:'Ism va telefon raqamini kiriting.',need3:'Aloqa uchun rozilikni tasdiqlang.',sending:'Yuborilmoqda…',
done:'Soʻrov qabul qilindi! Leo vaqtni telefon yoki Telegram orqali tasdiqlaydi.',notifyFail:'Bron saqlandi, ammo email xabari yuborilmadi. Ariza raqamini yozib, Leoga Telegram orqali xabar bering.',taken:'Bu vaqt hozirgina band qilindi. Boshqasini tanlang.',many:'Bu raqamdan juda koʻp faol soʻrov bor. Leo bilan toʻgʻridan-toʻgʻri bogʻlaning.',fail:'Yuborib boʻlmadi. Qayta urinib koʻring yoki Leoga Telegramda yozing.',tg:'Leoga Telegramda yozish',
f0:'Bron qilishdan oldin',q1:'Eskizim yoʻq — galereyadan tanlasam boʻladimi?',a_1:'Ha. Galereyada istalgan eskizni oching va «Shu eskiz bilan bron qilish» tugmasini bosing.',q2:'Oʻlcham yoki rangni oʻzgartirsam boʻladimi?',a_2:'Buni bron formasida yozing. Leo seansdan oldin barcha tafsilotlarni siz bilan koʻrib chiqadi.',q3:'Bron qanday ishlaydi?',a_3:'Boʻsh vaqtni tanlab, maʼlumotlarni yuboring. Band vaqtlar hamma uchun yopiladi. Leo telefon yoki Telegram orqali tasdiqlaydi.',q4:'Soʻrovga nima yozish kerak?',a_4:'Gʻoyangiz, xohlagan oʻlcham va ranglarni yozing. Joy tanlashda Leo yordam beradi. Galereyadan eskiz tanlasangiz, u avtomatik qoʻshiladi.',
ft:'Kuchli ishlar. Sizga oʻxshagan tatu.',emailLabel:'Leoga email yuborish',tk1:'Mualliflik tatu sanʼati',tk2:'Sizning hikoyangiz uchun',tk3:'Nusxa yoʻq. Faqat siz.'},
};
const savedLang=localStorage.lang;let L=['en','ru','uz'].includes(savedLang)?savedLang:'ru';
const t=k=>T[L][k];
function applyLang(){document.documentElement.lang=L;document.documentElement.dir='ltr';localStorage.lang=L;document.title=({en:'ЛЕО Tattoo — Ink Is Identity',ru:'ЛЕО Tattoo — тату как индивидуальность',uz:'ЛЕО Tattoo — oʻziga xos tatu'})[L];document.querySelector('meta[name="description"]').content=({en:'Bold tattoo art, a curated flash gallery, and online appointment booking with Leo.',ru:'Авторские татуировки, галерея эскизов и онлайн-запись к Лео.',uz:'Oʻziga xos tatu dizaynlari, eskizlar galereyasi va Leo bilan onlayn bron.'})[L];
 $$('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));$$('[data-i18n-html]').forEach(e=>e.innerHTML=t(e.dataset.i18nHtml));
 $$('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));$$('#grid img').forEach((img,i)=>img.alt=`${t('dz')} ${pad(i+1)}`);$$('.lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===L));
 renderWeek();}
const pad=n=>String(n).padStart(2,'0'),G=window.GALLERY||[];
if(C.ownerEmail){$('#owner-email').href=`mailto:${C.ownerEmail}`;$('#owner-email [data-owner-address]').textContent=C.ownerEmail}
$$('.lang button').forEach(b=>b.onclick=()=>{L=b.dataset.l;applyLang()});
$('#burger').onclick=()=>$('#menu').classList.toggle('open');$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
const toast=m=>{const n=$('#toast');n.textContent=m;n.classList.add('show');setTimeout(()=>n.classList.remove('show'),3200)};
// ---- gallery + lightbox
$('#grid').innerHTML=G.map(g=>`<figure data-n="${pad(g[0])}" data-i="${g[0]}"><img src="img/t/${pad(g[0])}.jpg" width="${g[1]}" height="${g[2]}" loading="lazy" alt="${t('dz')} ${pad(g[0])}"></figure>`).join('');
let cur=1;const lb=$('#lb');
function show(n){cur=((n-1+G.length)%G.length)+1;$('#lbi').src=`img/g/${pad(cur)}.jpg`;$('#lbt').textContent=`${t('dz')} ${pad(cur)} / ${G.length}`}
$('#grid').onclick=e=>{const f=e.target.closest('figure');if(f){show(+f.dataset.i);lb.hidden=false;document.body.style.overflow='hidden'}};
const close=()=>{lb.hidden=true;document.body.style.overflow=''};
$('#lbx').onclick=close;$('#lbp').onclick=()=>show(cur-1);$('#lbn').onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)close()};
$('#lbb').onclick=()=>{$('#fd').value=cur;close();location.hash='#booking'};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
// ---- booking
const TIMES=['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];
const live=!!(C.supabaseUrl&&C.supabaseAnonKey);
function nowTZ(){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));return{key:`${p.year}-${p.month}-${p.day}`,mins:+p.hour*60+ +p.minute}}
const addD=(k,n)=>{const d=new Date(k+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const dow=k=>new Date(k+'T12:00:00Z').getUTCDay(),fmt=k=>{const[,m,d]=k.split('-');return `${+d} ${t('mo')[+m-1]}`};
let off=0,day=null,time=null,taken=new Set(),availabilityReady=false;
const weekStart=()=>{const n=nowTZ().key;return addD(n,-dow(n)+off*7)};
async function rpc(fn,body){const r=await fetch(`${C.supabaseUrl.replace(/\/$/,'')}/rest/v1/rpc/${fn}`,{method:'POST',headers:{apikey:C.supabaseAnonKey,Authorization:'Bearer '+C.supabaseAnonKey,'Content-Type':'application/json'},body:JSON.stringify(body)});if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}
async function loadTaken(){taken=new Set();availabilityReady=false;if(!live){$('#hint').textContent=t('offline');return}const s=weekStart();$('#hint').textContent=t('load');try{(await rpc('get_taken_slots',{p_from:s,p_to:addD(s,4)})).forEach(x=>taken.add(x.day+'_'+x.time));availabilityReady=true;$('#hint').textContent='';if(day&&time&&taken.has(day+'_'+time)){time=null;$('#hint').textContent=t('taken')}}catch(e){$('#hint').textContent=t('loaderr')}}
let loadingWeek=false;
async function renderWeek(){if(loadingWeek)return;loadingWeek=true;try{const s=weekStart(),n=nowTZ();$('#wl').textContent=`${fmt(s)} — ${fmt(addD(s,4))}`;$('#pw').disabled=off<=0;$('#nw').disabled=off>=12;
 $('#days').innerHTML=t('wk').map((w,i)=>{const k=addD(s,i);return `<button type="button" class="day${k===day?' selected':''}" data-k="${k}" ${k<n.key?'disabled':''}><small>${w}</small><b>${fmt(k)}</b></button>`}).join('');
 await loadTaken();renderSlots()}finally{loadingWeek=false}}
function renderSlots(){const n=nowTZ();if(!live||!availabilityReady){$('#slots').innerHTML='';return}if(!day||dow(day)>4||day<weekStart()||day>addD(weekStart(),4)){day=null;$('#slots').innerHTML='';if(!$('#hint').textContent)$('#hint').textContent=t('pick');return}
 $('#slots').innerHTML=TIMES.map(x=>{const past=day===n.key&&+x.slice(0,2)*60<=n.mins,tk=taken.has(day+'_'+x);return `<button type="button" class="slot${x===time?' selected':''}${tk?' taken':''}" data-t="${x}" ${past||tk?'disabled':''}>${x}</button>`}).join('')}
$('#days').onclick=e=>{const b=e.target.closest('.day');if(!b)return;day=b.dataset.k;time=null;$$('.day').forEach(x=>x.classList.toggle('selected',x===b));$('#hint').textContent=t('pick2');renderSlots()};
$('#slots').onclick=e=>{const b=e.target.closest('.slot');if(!b)return;time=b.dataset.t;$$('.slot').forEach(x=>x.classList.toggle('selected',x===b));$('#hint').textContent=`${t('sel')} ${fmt(day)}, ${time}`};
$('#pw').onclick=()=>{off--;renderWeek()};$('#nw').onclick=()=>{off++;renderWeek()};
setInterval(()=>{if(document.visibilityState==='visible')renderWeek()},30_000);addEventListener('focus',()=>renderWeek());
const say=(m,c)=>{const e=$('#msg');e.className='msg '+(c||'');e.innerHTML='';e.append(m)};
async function notify(d,ref){if(!C.web3formsKey)return false;try{const message=[`Booking reference: ${ref}`,`Name: ${d.name}`,`Phone: ${d.phone}`,`Telegram / Instagram: ${d.contact||'—'}`,`Email: ${d.email||'—'}`,`Tattoo idea: ${d.idea||'—'}`,`Gallery design: ${d.design||'Custom idea'}`,`Appointment: ${d.day} at ${d.time}`,`Language: ${L}`].join('\n');const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:C.web3formsKey,subject:`New tattoo booking — ${d.day} ${d.time}`,from_name:'ЛЕО Tattoo website',name:d.name,phone:d.phone,contact:d.contact,email:d.email||undefined,date:d.day,time:d.time,design:d.design||'custom',idea:d.idea,language:L,reference:ref,message})});const result=await r.json().catch(()=>({}));return r.ok&&result.success!==false}catch(e){return false}}
$('#bf').onsubmit=async e=>{e.preventDefault();if($('#hp').value)return;
 if(!live||!availabilityReady)return say(t(!live?'offline':'loaderr'),'err');
 const d={name:$('#fn').value.trim(),phone:$('#fp').value.trim(),contact:$('#fc').value.trim(),email:$('#fe').value.trim(),idea:$('#fi').value.trim(),design:$('#fd').value,day,time};
 if(!day||!time)return say(t('need'),'err');if(d.name.length<2||d.phone.length<5)return say(t('need2'),'err');if(!$('#ok').checked)return say(t('need3'),'err');
 const sb=$('#sb');sb.disabled=true;say(t('sending'));let ref='';
 try{const r=await rpc('create_booking',{p_name:d.name,p_phone:d.phone,p_contact:d.contact,p_email:d.email,p_idea:d.idea,p_design:d.design,p_lang:L,p_day:day,p_time:time});
   if(!r.ok){if(r.error==='taken'){await renderWeek();time=null;return say(t('taken'),'err')}return say(t(r.error==='too_many'?'many':'fail'),'err')}ref='LT-'+r.id;
  const emailSent=await notify(d,ref);
  const m=document.createElement('span');m.append(`${t('done')} ${ref?'('+ref+') ':''}`);m.append(Object.assign(document.createElement('a'),{href:'https://t.me/'+C.telegram,target:'_blank',rel:'noopener',textContent:t('tg')}));
  if(!emailSent)m.append(' '+t('notifyFail')+' ');say(m,emailSent?'ok':'warn');toast('✓');e.target.reset();time=null;await renderWeek();
 }catch(err){const m=document.createElement('span');m.append(t('fail')+' ');
  m.append(Object.assign(document.createElement('a'),{href:'https://t.me/'+C.telegram,target:'_blank',rel:'noopener',textContent:t('tg')}));say(m,'err')}
 finally{sb.disabled=false}};
// ---- space background
(function(){const c=$('#stars'),x=c.getContext('2d');let w,h,S=[];const rs=()=>{w=c.width=innerWidth;h=c.height=innerHeight;S=Array.from({length:Math.min(140,w/9)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.2,p:Math.random()*6,v:Math.random()*.15+.03}))};rs();addEventListener('resize',rs);
 const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 (function f(t){x.clearRect(0,0,w,h);S.forEach(s=>{s.y-=still?0:s.v;if(s.y<0)s.y=h;x.globalAlpha=.35+.45*Math.sin(t/900+s.p);x.fillStyle=s.r>1?'#ff4a3d':'#f1e4d6';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});if(!still)requestAnimationFrame(f)})(0)})();
applyLang();
