/* Kitchen Cost Pro - المرحلة 1 */
const sb = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

const I18N = {
ar:{app_name:'كيتشن كوست برو',email:'اسم المستخدم (حروف إنجليزية أو أرقام)',password:'الكود (6 أرقام أو أكتر)',full_name:'الاسم الكامل',login:'تسجيل الدخول',signup:'إنشاء حساب',logout:'خروج',
 dashboard:'لوحة التحكم',ingredients:'المكونات',categories:'التصنيفات',suppliers:'الموردون',branches:'الفروع',users:'المستخدمون والصلاحيات',audit:'سجل التدقيق',settings:'الإعدادات',
 add:'إضافة',edit:'تعديل',save:'حفظ',cancel:'إلغاء',search:'بحث...',archive:'أرشفة',restore:'استعادة',actions:'إجراءات',
 code:'الكود',name:'الاسم',name_ar:'الاسم بالعربية',name_en:'الاسم بالإنجليزية',category_id:'التصنيف',base_unit_id:'الوحدة الأساسية',purchase_unit_id:'وحدة الشراء',
 conversion_factor:'معامل التحويل (1 وحدة شراء = ؟ وحدة أساسية)',min_stock:'الحد الأدنى للمخزون',preferred_supplier_id:'المورد المفضل',track_expiry:'تتبع الصلاحية',
 storage_location:'مكان التخزين',notes:'ملاحظات',last_price:'آخر سعر شراء',avg_price:'متوسط سعر الشراء',description:'الوصف',is_active:'نشط',
 phone:'الهاتف',address:'العنوان',tax_no:'الرقم الضريبي',is_central:'مطبخ مركزي',role:'الدور',branches_assigned:'الفروع المسموحة',
 date:'التاريخ',user:'المستخدم',action:'الإجراء',table:'الجدول',record:'السجل',details:'التفاصيل',old_value:'القيمة السابقة',new_value:'القيمة الجديدة',
 language:'اللغة',default_language:'اللغة الافتراضية للتطبيق',my_language:'لغتي المفضلة',currency:'العملة',saved:'تم الحفظ',no_data:'لا توجد بيانات',
 total_branches:'عدد الفروع',total_items:'عدد المكونات',total_suppliers:'عدد الموردين',recent_activity:'آخر النشاطات',confirm_archive:'تأكيد تغيير الحالة؟',
 role_owner:'المالك',role_accounting_manager:'مدير الحسابات',role_operations_manager:'مدير العمليات',role_branch_manager:'مدير فرع',role_storekeeper:'أمين مخزن',role_chef:'شيف / مدير إنتاج',role_employee:'موظف',
 check_email:'تم إنشاء الحساب. افحص بريدك لتأكيده ثم سجّل الدخول.',coming:'المراحل القادمة: الإنتاج، المخزون، المشتريات، التحويلات، المصروفات، الكومبو، التقارير.'},
en:{app_name:'Kitchen Cost Pro',email:'Username (letters or numbers)',password:'Code (6+ characters)',full_name:'Full name',login:'Sign in',signup:'Sign up',logout:'Sign out',
 dashboard:'Dashboard',ingredients:'Ingredients',categories:'Categories',suppliers:'Suppliers',branches:'Branches',users:'Users & Permissions',audit:'Audit Log',settings:'Settings',
 add:'Add',edit:'Edit',save:'Save',cancel:'Cancel',search:'Search...',archive:'Archive',restore:'Restore',actions:'Actions',
 code:'Code',name:'Name',name_ar:'Arabic name',name_en:'English name',category_id:'Category',base_unit_id:'Base unit',purchase_unit_id:'Purchase unit',
 conversion_factor:'Conversion factor (1 purchase unit = ? base units)',min_stock:'Minimum stock',preferred_supplier_id:'Preferred supplier',track_expiry:'Track expiry',
 storage_location:'Storage location',notes:'Notes',last_price:'Last purchase price',avg_price:'Average purchase price',description:'Description',is_active:'Active',
 phone:'Phone',address:'Address',tax_no:'Tax number',is_central:'Central kitchen',role:'Role',branches_assigned:'Assigned branches',
 date:'Date',user:'User',action:'Action',table:'Table',record:'Record',details:'Details',old_value:'Previous value',new_value:'New value',
 language:'Language',default_language:'Application default language',my_language:'My preferred language',currency:'Currency',saved:'Saved',no_data:'No data',
 total_branches:'Branches',total_items:'Ingredients',total_suppliers:'Suppliers',recent_activity:'Recent activity',confirm_archive:'Confirm status change?',
 role_owner:'Owner',role_accounting_manager:'Accounting Manager',role_operations_manager:'Operations Manager',role_branch_manager:'Branch Manager',role_storekeeper:'Storekeeper',role_chef:'Chef / Production Manager',role_employee:'Employee',
 check_email:'Account created. Check your email to confirm, then sign in.',coming:'Coming next: production, inventory, purchases, transfers, expenses, combos, reports.'}
};
Object.assign(I18N.ar, RI18N.ar); Object.assign(I18N.en, RI18N.en);
const ROLES=['owner','accounting_manager','operations_manager','branch_manager','storekeeper','chef','employee'];

let lang = localStorage.getItem('lang') || 'ar';
let me = null, perms = new Set(), page = 'dashboard';
const REF = {units:[],ingredient_categories:[],suppliers:[],branches:[]};

const t = k => (I18N[lang] && I18N[lang][k]) || k;
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nf = n => new Intl.NumberFormat(lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:2}).format(n ?? 0);
const df = d => new Intl.DateTimeFormat(lang==='ar'?'ar-EG':'en-GB',{dateStyle:'medium',timeStyle:'short'}).format(new Date(d));
const nm = r => !r ? '' : (lang==='ar' ? (r.name_ar || r.name_en) : (r.name_en || r.name_ar));
const refLabel = (tbl,id) => nm(REF[tbl].find(x => x.id === id));
const has = p => !p || (me && me.role==='owner') || perms.has(p);

function applyLang(){ document.documentElement.lang = lang; document.documentElement.dir = lang==='ar' ? 'rtl' : 'ltr'; document.title = t('app_name'); }
function toast(msg, err){
  const d = document.createElement('div'); d.className = 'toast' + (err ? ' err' : ''); d.textContent = msg;
  document.body.appendChild(d); setTimeout(() => d.remove(), 3200);
}
function openModal(html){
  const o = document.createElement('div'); o.className = 'ov'; o.innerHTML = '<div class="md">' + html + '</div>';
  o.addEventListener('click', e => { if (e.target === o) o.remove(); });
  document.body.appendChild(o); return o;
}
async function setLang(l){
  lang = l; localStorage.setItem('lang', l); applyLang();
  if (me) { await sb.rpc('set_my_lang', {l}); me.lang = l; render(); } else renderAuth();
}

/* ---------- الدخول ---------- */
function langBtn(){ return `<button class="btn g s" onclick="setLang('${lang==='ar'?'en':'ar'}')">${lang==='ar'?'English':'العربية'}</button>`; }

const userVal = () => ($('#a_email').value || '').trim().toLowerCase();
const toEmail = () => userVal() + '@kitchen-cost.app';
function okUser(){
  if (!/^[a-z0-9._-]{3,30}$/.test(userVal())) { toast(lang==='ar' ? 'اسم المستخدم: 3 إلى 30 حرف إنجليزي أو أرقام فقط' : 'Username: 3-30 letters or numbers only', true); return false; }
  if (($('#a_pass').value || '').length < 6) { toast(lang==='ar' ? 'الكود لازم يكون 6 على الأقل' : 'Code must be at least 6 characters', true); return false; }
  return true;
}
function renderAuth(){
  applyLang();
  $('#app').innerHTML = `<div class="auth"><div class="card">
    <div class="bar"><h1>${t('app_name')}</h1>${langBtn()}</div>
    <div class="fl"><label>${t('full_name')}</label><input id="a_name"></div>
    <div class="fl"><label>${t('email')}</label><input id="a_email" type="text" autocomplete="username" autocapitalize="off" autocorrect="off" dir="ltr"></div>
    <div class="fl"><label>${t('password')}</label><input id="a_pass" type="password" autocomplete="current-password"></div>
    <div class="bar"><button class="btn" id="a_in">${t('login')}</button><button class="btn g" id="a_up">${t('signup')}</button></div>
  </div></div>`;
  $('#a_in').onclick = async () => {
    if (!okUser()) return;
    const {error} = await sb.auth.signInWithPassword({email:toEmail(), password:$('#a_pass').value});
    if (error) return toast(error.message, true);
    boot();
  };
  $('#a_up').onclick = async () => {
    if (!okUser()) return;
    const {data,error} = await sb.auth.signUp({email:toEmail(), password:$('#a_pass').value, options:{data:{full_name:$('#a_name').value.trim()}}});
    if (error) return toast(error.message, true);
    if (data.session) boot(); else toast(t('check_email'));
  };
}

/* ---------- التحميل الأولي ---------- */
async function loadRefs(){
  for (const k of Object.keys(REF)) {
    const {data} = await sb.from(k).select('*').order(k==='units'?'code':'name_ar');
    REF[k] = data || [];
    if (k === 'units') { const o = ['kg','g','l','ml','piece','box','carton','pack','bottle']; const ix = u => o.includes(u.code) ? o.indexOf(u.code) : 99; REF.units.sort((x,y) => ix(x) - ix(y)); }
  }
}
async function boot(){
  applyLang();
  const {data:{session}} = await sb.auth.getSession();
  if (!session) return renderAuth();
  const {data:p,error} = await sb.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
  if (error || !p) { toast(error ? error.message : 'Profile not found', true); await sb.auth.signOut(); return renderAuth(); }
  if (!p.is_active) { await sb.auth.signOut(); toast('Account disabled', true); return renderAuth(); }
  me = p; lang = p.lang || lang; localStorage.setItem('lang', lang); applyLang();
  const {data:rp} = await sb.from('role_permissions').select('permission').eq('role', p.role);
  perms = new Set((rp || []).map(x => x.permission));
  await loadRefs();
  render();
}

/* ---------- الهيكل ---------- */
const NAV = [
  {k:'dashboard',i:'▦'},{k:'items',l:'ingredients',i:'🧂'},{k:'categories',i:'🏷️'},{k:'suppliers',i:'🚚'},{k:'recipes',i:'🍲'},
  {k:'branches',i:'🏬'},{k:'users',i:'👥',owner:true},{k:'audit',i:'📜',perm:'audit.view'},{k:'settings',i:'⚙️'}
];
function render(){
  const items = NAV.filter(n => (!n.owner || me.role==='owner') && has(n.perm));
  $('#app').innerHTML = `<div class="shell">
    <aside class="side" id="side"><h2>${t('app_name')}</h2>
      ${items.map(n => `<button class="nav ${page===n.k?'on':''}" data-p="${n.k}"><span>${n.i}</span>${t(n.l||n.k)}</button>`).join('')}
    </aside>
    <div class="main">
      <div class="top"><button class="btn g s" id="menuBtn">☰</button><span class="sp"></span>
        <span>${esc(me.full_name)} · ${t('role_'+me.role)}</span>${langBtn()}<button class="btn g s" id="out">${t('logout')}</button></div>
      <div class="content" id="content"></div>
    </div></div>`;
  document.querySelectorAll('.nav').forEach(b => b.onclick = () => { page = b.dataset.p; recipeView = null; render(); });
  $('#menuBtn').onclick = () => $('#side').classList.toggle('open');
  $('#out').onclick = async () => { await sb.auth.signOut(); me = null; renderAuth(); };
  route();
}
function route(){
  if (MODULES[page]) return renderCrud(page);
  ({dashboard:pageDashboard, recipes:pageRecipes, users:pageUsers, audit:pageAudit, settings:pageSettings}[page] || pageDashboard)();
}

/* ---------- وحدات CRUD العامة ---------- */
const MODULES = {
  items:{table:'items',title:'ingredients',perm:'items.manage',cols:['thumb','code','name','category_id','base_unit_id','last_price','yield_pct','usable_cost','min_stock','is_active'],
    fields:[{k:'code',type:'text',req:1},{k:'name_ar',type:'text',req:1},{k:'name_en',type:'text'},
      {k:'category_id',type:'ref',ref:'ingredient_categories'},{k:'base_unit_id',type:'ref',ref:'units',req:1},{k:'purchase_unit_id',type:'ref',ref:'units'},
      {k:'conversion_factor',type:'number',def:1},{k:'min_stock',type:'number',def:0},{k:'preferred_supplier_id',type:'ref',ref:'suppliers'},
      {k:'storage_location',type:'text'},{k:'track_expiry',type:'check'},{k:'yield_pct',type:'number',def:100},{k:'emoji',type:'text'},{k:'image_url',type:'image'},
      {k:'last_price',type:'number',perm:'items.price',def:0},{k:'avg_price',type:'number',perm:'items.price',def:0},
      {k:'description',type:'area'},{k:'notes',type:'area'},{k:'is_active',type:'check',def:true}]},
  categories:{table:'ingredient_categories',title:'categories',perm:'items.manage',cols:['name','is_active'],
    fields:[{k:'name_ar',type:'text',req:1},{k:'name_en',type:'text'},{k:'is_active',type:'check',def:true}]},
  suppliers:{table:'suppliers',title:'suppliers',perm:'suppliers.manage',cols:['name','phone','email','is_active'],
    fields:[{k:'name_ar',type:'text',req:1},{k:'name_en',type:'text'},{k:'phone',type:'text'},{k:'email',type:'text'},
      {k:'address',type:'text'},{k:'tax_no',type:'text'},{k:'notes',type:'area'},{k:'is_active',type:'check',def:true}]},
  branches:{table:'branches',title:'branches',perm:'branches.manage',cols:['code','name','address','is_central','is_active'],
    fields:[{k:'code',type:'text',req:1},{k:'name_ar',type:'text',req:1},{k:'name_en',type:'text'},{k:'address',type:'text'},
      {k:'is_central',type:'check'},{k:'is_active',type:'check',def:true}]}
};
const REFTABLE = {category_id:'ingredient_categories',base_unit_id:'units',purchase_unit_id:'units',preferred_supplier_id:'suppliers'};

function cell(m, r, c){
  if (c === 'thumb') return thumb(r);
  if (c === 'usable_cost') return nf((Number(r.last_price)||0) / ((Number(r.yield_pct)||100)/100));
  if (c === 'yield_pct') return nf(r.yield_pct) + '%';
  if (c === 'name') return esc(nm(r)) + demoTag(r);
  if (REFTABLE[c]) return esc(refLabel(REFTABLE[c], r[c]));
  const f = m.fields.find(x => x.k === c) || {};
  if (f.type === 'check') return `<span class="tag ${r[c]?'':'off'}">${r[c] ? '✓' : '✗'}</span>`;
  if (f.type === 'number') return nf(r[c]);
  return esc(r[c]);
}
async function renderCrud(key){
  const m = MODULES[key], can = has(m.perm);
  const {data,error} = await sb.from(m.table).select('*').order('created_at',{ascending:false});
  if (error) return $('#content').innerHTML = `<div class="card">${esc(error.message)}</div>`;
  const rows = data || [];
  $('#content').innerHTML = `<div class="bar"><h1>${t(m.title)}</h1><input id="q" placeholder="${t('search')}" style="max-width:220px">
    ${can ? `<button class="btn" id="add">+ ${t('add')}</button>` : ''}</div>
    <div class="card tw"><table><thead><tr>${m.cols.map(c => `<th>${t(c)}</th>`).join('')}${can?`<th>${t('actions')}</th>`:''}</tr></thead><tbody id="tb"></tbody></table></div>`;
  const draw = () => {
    const q = $('#q').value.trim().toLowerCase();
    const list = rows.filter(r => !q || JSON.stringify(r).toLowerCase().includes(q));
    $('#tb').innerHTML = list.length ? list.map(r => `<tr>${m.cols.map(c => `<td>${cell(m,r,c)}</td>`).join('')}
      ${can?`<td><button class="btn s g" data-e="${r.id}">${t('edit')}</button> <button class="btn s g" data-a="${r.id}">${r.is_active?t('archive'):t('restore')}</button></td>`:''}</tr>`).join('')
      : `<tr><td colspan="99">${t('no_data')}</td></tr>`;
    document.querySelectorAll('[data-e]').forEach(b => b.onclick = () => form(m, key, rows.find(x => x.id === b.dataset.e)));
    document.querySelectorAll('[data-a]').forEach(b => b.onclick = async () => {
      if (!confirm(t('confirm_archive'))) return;
      const r = rows.find(x => x.id === b.dataset.a);
      const {error} = await sb.from(m.table).update({is_active: !r.is_active}).eq('id', r.id);
      if (error) return toast(error.message, true);
      await loadRefs(); renderCrud(key);
    });
  };
  $('#q').oninput = draw; draw();
  if (can) $('#add').onclick = () => form(m, key, null);
}
function fieldHtml(f, v){
  const id = 'f_' + f.k; let inp;
  if (f.type === 'ref') inp = `<select id="${id}"><option value=""></option>${REF[f.ref].map(r => `<option value="${r.id}" ${r.id===v?'selected':''}>${esc(nm(r))}</option>`).join('')}</select>`;
  else if (f.type === 'check') inp = `<input type="checkbox" id="${id}" ${v?'checked':''}>`;
  else if (f.type === 'image') inp = (v ? `<div style="margin-bottom:6px"><img src="${esc(v)}" class="th" style="width:64px;height:64px"></div>` : '') + `<input type="file" id="${id}" accept="image/png,image/jpeg,image/webp">`;
  else if (f.type === 'area') inp = `<textarea id="${id}" rows="2">${esc(v)}</textarea>`;
  else inp = `<input id="${id}" type="${f.type==='number'?'number':'text'}" step="any" value="${esc(v)}">`;
  return `<div class="fl"><label>${t(f.k)}${f.req?' *':''}</label>${inp}</div>`;
}
function form(m, key, rec, after){
  const fields = m.fields.filter(f => has(f.perm));
  const o = openModal(`<h3>${rec ? t('edit') : t('add')}</h3>${fields.map(f => fieldHtml(f, rec ? rec[f.k] : f.def)).join('')}
    <div class="bar"><button class="btn" id="sv">${t('save')}</button><button class="btn g" id="cn">${t('cancel')}</button></div>`);
  o.querySelector('#cn').onclick = () => o.remove();
  o.querySelector('#sv').onclick = async () => {
    const body = {};
    for (const f of fields) {
      const el = o.querySelector('#f_' + f.k);
      if (f.type === 'image') { const file = el.files && el.files[0]; if (file) { const url = await uploadImage(file); if (!url) return; body[f.k] = url; } continue; }
      let v = f.type === 'check' ? el.checked : el.value.trim();
      if (f.type === 'number') v = v === '' ? null : Number(v);
      if (v === '') v = null;
      if (f.req && (v === null || v === '')) return toast(t(f.k) + ' *', true);
      body[f.k] = v;
    }
    const q = rec ? sb.from(m.table).update(body).eq('id', rec.id) : sb.from(m.table).insert(body);
    const {error} = await q;
    if (error) return toast(error.message, true);
    o.remove(); toast(t('saved')); await loadRefs(); if (after) after(); else renderCrud(key);
  };
}

/* ---------- الصفحات الخاصة ---------- */
async function count(tbl){ const {count:c} = await sb.from(tbl).select('*',{count:'exact',head:true}); return c || 0; }
async function pageDashboard(){
  const [b,i,s,rc] = await Promise.all([count('branches'), count('items'), count('suppliers'), count('recipes')]);
  let act = '';
  if (has('audit.view')) {
    const {data} = await sb.from('audit_logs').select('*').order('created_at',{ascending:false}).limit(8);
    act = `<div class="card tw"><h3>${t('recent_activity')}</h3><table><tbody>${(data||[]).map(a =>
      `<tr><td>${df(a.created_at)}</td><td>${esc(a.user_name)}</td><td>${esc(a.action)}</td><td>${esc(a.table_name)}</td></tr>`).join('')}</tbody></table></div>`;
  }
  $('#content').innerHTML = `<div class="bar"><h1>${t('dashboard')}</h1></div>
    <div class="grid"><div class="card stat"><b>${nf(b)}</b><span>${t('total_branches')}</span></div>
    <div class="card stat"><b>${nf(i)}</b><span>${t('total_items')}</span></div>
    <div class="card stat"><b>${nf(s)}</b><span>${t('total_suppliers')}</span></div>
    <div class="card stat"><b>${nf(rc)}</b><span>${t('total_recipes')}</span></div></div>${act}
    <p style="color:var(--mu)">${t('coming')}</p>`;
}
async function pageUsers(){
  const [{data:ps},{data:ub}] = await Promise.all([sb.from('profiles').select('*').order('created_at'), sb.from('user_branches').select('*')]);
  $('#content').innerHTML = `<div class="bar"><h1>${t('users')}</h1></div><div class="card tw"><table><thead><tr>
    <th>${t('full_name')}</th><th>${t('role')}</th><th>${t('is_active')}</th><th>${t('branches_assigned')}</th></tr></thead><tbody>
    ${(ps||[]).map(p => `<tr><td>${esc(p.full_name)}</td>
      <td><select data-r="${p.id}" ${p.id===me.id?'disabled':''}>${ROLES.map(r => `<option value="${r}" ${p.role===r?'selected':''}>${t('role_'+r)}</option>`).join('')}</select></td>
      <td><input type="checkbox" data-s="${p.id}" ${p.is_active?'checked':''} ${p.id===me.id?'disabled':''}></td>
      <td>${REF.branches.map(b => `<label style="margin-inline-end:10px"><input type="checkbox" data-b="${p.id}|${b.id}" ${(ub||[]).some(x => x.user_id===p.id && x.branch_id===b.id)?'checked':''}> ${esc(nm(b))}</label>`).join('')}</td></tr>`).join('')}
    </tbody></table></div>`;
  const done = ({error}) => error ? toast(error.message, true) : toast(t('saved'));
  document.querySelectorAll('[data-r]').forEach(e => e.onchange = async () => done(await sb.from('profiles').update({role:e.value}).eq('id', e.dataset.r)));
  document.querySelectorAll('[data-s]').forEach(e => e.onchange = async () => done(await sb.from('profiles').update({is_active:e.checked}).eq('id', e.dataset.s)));
  document.querySelectorAll('[data-b]').forEach(e => e.onchange = async () => {
    const [u,b] = e.dataset.b.split('|');
    done(e.checked ? await sb.from('user_branches').insert({user_id:u, branch_id:b})
                   : await sb.from('user_branches').delete().eq('user_id',u).eq('branch_id',b));
  });
}
async function pageAudit(){
  const {data,error} = await sb.from('audit_logs').select('*').order('created_at',{ascending:false}).limit(200);
  if (error) return $('#content').innerHTML = `<div class="card">${esc(error.message)}</div>`;
  const rows = data || [];
  $('#content').innerHTML = `<div class="bar"><h1>${t('audit')}</h1></div><div class="card tw"><table><thead><tr>
    <th>${t('date')}</th><th>${t('user')}</th><th>${t('action')}</th><th>${t('table')}</th><th>${t('details')}</th></tr></thead><tbody>
    ${rows.map((a,i) => `<tr><td>${df(a.created_at)}</td><td>${esc(a.user_name)}</td><td>${esc(a.action)}</td><td>${esc(a.table_name)}</td>
      <td><button class="btn s g" data-d="${i}">${t('details')}</button></td></tr>`).join('') || `<tr><td colspan="5">${t('no_data')}</td></tr>`}</tbody></table></div>`;
  document.querySelectorAll('[data-d]').forEach(b => b.onclick = () => {
    const a = rows[b.dataset.d];
    openModal(`<h3>${esc(a.table_name)} · ${esc(a.action)}</h3><p>${t('old_value')}</p><pre>${esc(JSON.stringify(a.old_value,null,2))}</pre>
      <p>${t('new_value')}</p><pre>${esc(JSON.stringify(a.new_value,null,2))}</pre>`);
  });
}
async function pageSettings(){
  const {data} = await sb.from('app_settings').select('*');
  const dl = (data||[]).find(x => x.key==='default_language');
  const cur = (data||[]).find(x => x.key==='currency');
  const canSet = has('settings.manage');
  $('#content').innerHTML = `<div class="bar"><h1>${t('settings')}</h1></div><div class="card" style="max-width:480px">
    <div class="fl"><label>${t('my_language')}</label><select id="ml"><option value="ar">العربية</option><option value="en">English</option></select></div>
    <div class="fl"><label>${t('default_language')}</label><select id="dl" ${canSet?'':'disabled'}><option value="ar">العربية</option><option value="en">English</option></select></div>
    <div class="fl"><label>${t('currency')}</label><input value="${esc(cur ? cur.value : 'EGP')}" disabled></div></div>`;
  $('#ml').value = lang; $('#ml').onchange = e => setLang(e.target.value);
  $('#dl').value = dl ? dl.value : 'ar';
  $('#dl').onchange = async e => {
    const {error} = await sb.from('app_settings').update({value:e.target.value}).eq('key','default_language');
    error ? toast(error.message, true) : toast(t('saved'));
  };
}

sb.auth.onAuthStateChange(ev => { if (ev === 'SIGNED_OUT') { me = null; renderAuth(); } });
boot();
