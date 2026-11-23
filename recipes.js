/* Kitchen Cost Pro - المرحلة 2: الوصفات والتكلفة ونسبة الناتج (يُحمَّل قبل app.js) */

const RI18N = {
ar:{
 recipes:'الوصفات', total_recipes:'عدد الوصفات', add_recipe:'إضافة وصفة', recipe:'الوصفة',
 category:'التصنيف', servings:'عدد الوجبات', prep_minutes:'وقت التحضير (دقيقة)', cook_minutes:'وقت الطبخ (دقيقة)',
 instructions:'طريقة التحضير', operating_cost:'تكاليف التشغيل (لكل دفعة)', packaging_cost:'تكاليف التغليف (لكل دفعة)',
 other_cost:'مصاريف أخرى (لكل دفعة)', selling_price:'سعر بيع الوجبة', emoji:'رمز تعبيري (إيموجي)', image_url:'صورة (اختياري)',
 thumb:'🖼️', yield_pct:'نسبة الناتج %', usable_cost:'تكلفة الوحدة القابلة للاستخدام', demo:'تجريبي',
 last_price:'سعر الشراء لكل وحدة أساسية (مثلًا لكل كجم)', avg_price:'متوسط سعر الشراء لكل وحدة أساسية',
 back:'رجوع', duplicate:'نسخ الوصفة', min:'دقيقة', per_batch:'للدفعة', per_serving:'للوجبة',
 ing_list:'المكونات', qty:'الكمية', unit:'الوحدة', price_base:'سعر الوحدة الأساسية', yield:'نسبة الناتج',
 usable_unit_cost:'تكلفة الوحدة المستخدمة', raw_needed:'الكمية الخام للشراء', line_cost:'التكلفة', share:'النسبة',
 add_ingredient:'إضافة مكوّن', choose_item:'اختر مكوّنًا', remove:'حذف',
 total_ing:'إجمالي تكلفة المكونات', total_cost:'إجمالي تكلفة الدفعة', cost_per_serving:'تكلفة الوجبة',
 gross_profit:'الربح للوجبة', profit_margin:'هامش الربح', food_cost_pct:'نسبة التكلفة الغذائية',
 calc_title:'حاسبة سعر البيع', target_margin_pct:'هامش الربح المستهدف %', target_fc_pct:'نسبة التكلفة الغذائية المستهدفة %',
 suggest_margin:'السعر المقترح حسب هامش الربح', suggest_fc:'السعر المقترح حسب التكلفة الغذائية', apply_price:'اعتماد السعر',
 formulas:'طريقة الحساب',
 f1:'تكلفة المكوّن = الكمية ÷ نسبة الناتج × سعر الوحدة الأساسية.',
 f2:'تكلفة الوجبة = (المكونات + التشغيل + التغليف + مصاريف أخرى) ÷ عدد الوجبات.',
 f3:'هامش الربح = (سعر البيع − تكلفة الوجبة) ÷ سعر البيع. أما نسبة التكلفة الغذائية = تكلفة المكونات للوجبة ÷ سعر البيع. وهما مقياسان مختلفان.',
 f4:'السعر حسب الهامش = تكلفة الوجبة ÷ (1 − الهامش). والسعر حسب التكلفة الغذائية = تكلفة المكونات للوجبة ÷ النسبة المستهدفة.',
 note_live:'التكلفة محسوبة بالأسعار الحالية للمكونات، وبتتغير تلقائيًا لما تعدّل السعر أو نسبة الناتج.',
 note_demo:'الأسعار ونسب الناتج في البيانات التجريبية أرقام تقديرية للتجربة. عدّلها بأرقامك الفعلية من شاشة المكونات.',
 unit_warn:'وحدة غير متوافقة مع الوحدة الأساسية للمكوّن', no_ings:'لا توجد مكونات بعد', archived:'مؤرشفة',
 img_bad_type:'نوع الصورة غير مسموح (jpg أو png أو webp فقط)', img_too_big:'حجم الصورة أكبر من 2 ميجابايت',
 currency_sym:'ج.م', copy_suffix:'(نسخة)', dup_done:'تم نسخ الوصفة', show_archived:'عرض المؤرشفة',
 base_unit_short:'وحدة'
},
en:{
 recipes:'Recipes', total_recipes:'Recipes', add_recipe:'Add recipe', recipe:'Recipe',
 category:'Category', servings:'Servings', prep_minutes:'Prep time (min)', cook_minutes:'Cook time (min)',
 instructions:'Instructions', operating_cost:'Operating cost (per batch)', packaging_cost:'Packaging cost (per batch)',
 other_cost:'Other costs (per batch)', selling_price:'Selling price per serving', emoji:'Emoji icon', image_url:'Image (optional)',
 thumb:'🖼️', yield_pct:'Yield %', usable_cost:'Usable unit cost', demo:'Demo',
 last_price:'Purchase price per base unit (e.g. per kg)', avg_price:'Average price per base unit',
 back:'Back', duplicate:'Duplicate recipe', min:'min', per_batch:'per batch', per_serving:'per serving',
 ing_list:'Ingredients', qty:'Quantity', unit:'Unit', price_base:'Base unit price', yield:'Yield',
 usable_unit_cost:'Usable unit cost', raw_needed:'Raw quantity to buy', line_cost:'Cost', share:'Share',
 add_ingredient:'Add ingredient', choose_item:'Choose ingredient', remove:'Remove',
 total_ing:'Total ingredient cost', total_cost:'Total batch cost', cost_per_serving:'Cost per serving',
 gross_profit:'Profit per serving', profit_margin:'Profit margin', food_cost_pct:'Food cost %',
 calc_title:'Selling price calculator', target_margin_pct:'Target profit margin %', target_fc_pct:'Target food cost %',
 suggest_margin:'Suggested price by profit margin', suggest_fc:'Suggested price by food cost %', apply_price:'Apply price',
 formulas:'How it is calculated',
 f1:'Ingredient cost = quantity ÷ yield × base unit price.',
 f2:'Cost per serving = (ingredients + operating + packaging + other) ÷ servings.',
 f3:'Profit margin = (price − cost per serving) ÷ price. Food cost % = ingredient cost per serving ÷ price. They are different measures.',
 f4:'Price by margin = cost per serving ÷ (1 − margin). Price by food cost = ingredient cost per serving ÷ target %.',
 note_live:'Costs use current ingredient prices and update automatically when a price or yield changes.',
 note_demo:'Prices and yields in the demo data are rough sample numbers. Replace them with your real figures in Ingredients.',
 unit_warn:'Unit is not compatible with the ingredient base unit', no_ings:'No ingredients yet', archived:'Archived',
 img_bad_type:'Image type not allowed (jpg, png or webp only)', img_too_big:'Image is larger than 2 MB',
 currency_sym:'EGP', copy_suffix:'(copy)', dup_done:'Recipe duplicated', show_archived:'Show archived',
 base_unit_short:'unit'
}};

const RECIPE_MODULE = {table:'recipes', fields:[
  {k:'code',type:'text',req:1},{k:'name_ar',type:'text',req:1},{k:'name_en',type:'text'},
  {k:'category',type:'text'},{k:'emoji',type:'text'},{k:'image_url',type:'image'},
  {k:'servings',type:'number',req:1,def:1},{k:'prep_minutes',type:'number'},{k:'cook_minutes',type:'number'},
  {k:'operating_cost',type:'number',def:0},{k:'packaging_cost',type:'number',def:0},{k:'other_cost',type:'number',def:0},
  {k:'selling_price',type:'number',def:0},{k:'instructions',type:'area'},{k:'notes',type:'area'}
]};

let recipeView = null;      // رقم الوصفة المفتوحة
let showArchivedRecipes = false;

/* ---------- حسابات التكلفة (دوال نقية) ---------- */
function calcLine(ing, item, unitsById){
  const unit = unitsById[ing.unit_id], base = item && unitsById[item.base_unit_id];
  if (!item || !unit || !base) return {qtyBase:0, price:0, yieldF:1, usableUnitCost:0, rawNeeded:0, cost:0, mismatch:true};
  const mismatch = unit.kind !== base.kind;
  const qtyBase = mismatch ? 0 : Number(ing.qty) * Number(unit.to_base) / Number(base.to_base);
  const price = Number(item.last_price) || 0;
  const yieldF = (Number(item.yield_pct) || 100) / 100;
  const usableUnitCost = price / yieldF;
  return {qtyBase, price, yieldF, usableUnitCost, rawNeeded: qtyBase / yieldF, cost: qtyBase * usableUnitCost, mismatch};
}
function calcRecipe(rec, lines, itemsById, unitsById){
  const rows = lines.map(l => ({line:l, item:itemsById[l.item_id], ...calcLine(l, itemsById[l.item_id], unitsById)}));
  const ing = rows.reduce((s,r) => s + r.cost, 0);
  const batch = ing + Number(rec.operating_cost||0) + Number(rec.packaging_cost||0) + Number(rec.other_cost||0);
  const servings = Number(rec.servings) || 1;
  const perServing = batch / servings, ingPerServing = ing / servings;
  const price = Number(rec.selling_price) || 0;
  rows.forEach(r => r.share = ing > 0 ? r.cost / ing * 100 : 0);
  return {rows, ing, batch, servings, perServing, ingPerServing, price,
          profit: price - perServing,
          margin: price > 0 ? (price - perServing) / price * 100 : null,
          foodCostPct: price > 0 ? ingPerServing / price * 100 : null};
}
const priceByMargin = (perServing, m) => (m >= 0 && m < 100) ? perServing / (1 - m/100) : null;
const priceByFoodCost = (ingPerServing, f) => f > 0 ? ingPerServing / (f/100) : null;

/* ---------- عرض ---------- */
const money = n => nf(n) + ' ' + t('currency_sym');
const nq = n => new Intl.NumberFormat(lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:3}).format(n ?? 0);
const pct = n => n === null || n === undefined ? '—' : nf(n) + '%';
function thumb(r, big){
  if (r.image_url) return `<img src="${esc(r.image_url)}" class="${big?'rimgbig':'th'}" alt="">`;
  return `<span class="${big?'embig':'em'}">${esc(r.emoji || '🍽️')}</span>`;
}
const demoTag = r => r && r.is_demo ? ` <span class="tag demo">${t('demo')}</span>` : '';

async function uploadImage(file){
  if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { toast(t('img_bad_type'), true); return null; }
  if (file.size > 2 * 1024 * 1024) { toast(t('img_too_big'), true); return null; }
  const ext = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type];
  const path = (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2)) + '.' + ext;
  const {error} = await sb.storage.from('images').upload(path, file, {contentType:file.type, upsert:false});
  if (error) { toast(error.message, true); return null; }
  return sb.storage.from('images').getPublicUrl(path).data.publicUrl;
}

async function pageRecipes(){
  const [ri, rr, rl] = await Promise.all([
    sb.from('items').select('*'),
    sb.from('recipes').select('*').order('created_at', {ascending:false}),
    sb.from('recipe_ingredients').select('*').order('sort_order')
  ]);
  const err = ri.error || rr.error || rl.error;
  if (err) return $('#content').innerHTML = `<div class="card">${esc(err.message)}</div>`;
  const items = ri.data || [], recs = rr.data || [], lines = rl.data || [];
  const itemsById = Object.fromEntries(items.map(i => [i.id, i]));
  const unitsById = Object.fromEntries(REF.units.map(u => [u.id, u]));
  const ctx = {items, recs, lines, itemsById, unitsById};
  if (recipeView) {
    const rec = recs.find(r => r.id === recipeView);
    if (rec) return recipeDetails(rec, ctx);
    recipeView = null;
  }
  recipeList(ctx);
}

function recipeList(ctx){
  const can = has('recipes.manage');
  $('#content').innerHTML = `<div class="bar"><h1>${t('recipes')}</h1>
    <input id="q" placeholder="${t('search')}" style="max-width:220px">
    <label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="arch" ${showArchivedRecipes?'checked':''}> ${t('show_archived')}</label>
    ${can ? `<button class="btn" id="add">+ ${t('add_recipe')}</button>` : ''}</div>
    <p style="color:var(--mu);margin-top:0">${t('note_demo')}</p><div class="rgrid" id="rg"></div>`;
  const draw = () => {
    const q = $('#q').value.trim().toLowerCase();
    const list = ctx.recs.filter(r => (showArchivedRecipes || r.is_active) && (!q || JSON.stringify(r).toLowerCase().includes(q)));
    $('#rg').innerHTML = list.map(r => {
      const c = calcRecipe(r, ctx.lines.filter(l => l.recipe_id === r.id), ctx.itemsById, ctx.unitsById);
      return `<div class="card rcard" data-r="${r.id}" style="${r.is_active?'':'opacity:.55'}">
        <div class="rimg">${thumb(r, true)}</div>
        <h3 style="margin:10px 0 2px">${esc(nm(r))}${demoTag(r)}${r.is_active?'':` <span class="tag off">${t('archived')}</span>`}</h3>
        <div style="color:var(--mu);font-size:13px">${esc(r.category||'')} · ${nf(r.servings)} ${t('servings')}</div>
        <div class="kv"><span>${t('cost_per_serving')}</span><b>${money(c.perServing)}</b></div>
        <div class="kv"><span>${t('selling_price')}</span><b>${money(c.price)}</b></div>
        <div class="kv"><span>${t('profit_margin')}</span><b>${pct(c.margin)}</b></div></div>`;
    }).join('') || `<div class="card">${t('no_data')}</div>`;
    document.querySelectorAll('[data-r]').forEach(e => e.onclick = () => { recipeView = e.dataset.r; pageRecipes(); });
  };
  $('#q').oninput = draw; draw();
  $('#arch').onchange = e => { showArchivedRecipes = e.target.checked; draw(); };
  if (can) $('#add').onclick = () => form(RECIPE_MODULE, 'recipes', null, () => pageRecipes());
}

function recipeDetails(rec, ctx){
  const can = has('recipes.manage');
  const myLines = ctx.lines.filter(l => l.recipe_id === rec.id);
  const c = calcRecipe(rec, myLines, ctx.itemsById, ctx.unitsById);
  const unitOpts = sel => REF.units.map(u => `<option value="${u.id}" ${u.id===sel?'selected':''}>${esc(nm(u))}</option>`).join('');
  const usedIds = new Set(myLines.map(l => l.item_id));
  const baseName = it => it ? nm(ctx.unitsById[it.base_unit_id]) : '';

  const rows = c.rows.map(r => `<tr>
    <td>${thumb(r.item||{})} ${esc(nm(r.item))}${demoTag(r.item)}</td>
    <td>${can ? `<input type="number" step="any" min="0" value="${r.line.qty}" data-q="${r.line.id}" style="width:90px">
         <select data-u="${r.line.id}" style="width:110px">${unitOpts(r.line.unit_id)}</select>`
       : `${nq(r.line.qty)} ${esc(nm(ctx.unitsById[r.line.unit_id]))}`}
       ${r.mismatch ? `<div style="color:var(--bad);font-size:12px">⚠ ${t('unit_warn')}</div>` : ''}</td>
    <td>${money(r.price)} / ${esc(baseName(r.item))}</td>
    <td>${pct(r.yieldF*100)}</td>
    <td>${money(r.usableUnitCost)} / ${esc(baseName(r.item))}</td>
    <td>${nq(r.rawNeeded)} ${esc(baseName(r.item))}</td>
    <td><b>${money(r.cost)}</b></td><td>${pct(r.share)}</td>
    ${can ? `<td><button class="btn s g" data-del="${r.line.id}">✕</button></td>` : ''}</tr>`).join('');

  const addRow = can ? `<div class="bar" style="margin-top:12px">
    <select id="ai" style="max-width:220px"><option value="">${t('choose_item')}</option>
      ${ctx.items.filter(i => i.is_active && !usedIds.has(i.id)).map(i => `<option value="${i.id}">${esc((i.emoji||'')+' '+nm(i))}</option>`).join('')}</select>
    <input id="aq" type="number" step="any" min="0" placeholder="${t('qty')}" style="max-width:110px">
    <select id="au" style="max-width:140px">${unitOpts(null)}</select>
    <button class="btn" id="aadd">+ ${t('add_ingredient')}</button></div>` : '';

  const stat = (l, v) => `<div class="card stat"><b style="font-size:20px">${v}</b><span>${l}</span></div>`;
  $('#content').innerHTML = `
    <div class="bar"><button class="btn g s" id="back">‹ ${t('back')}</button><h1>${esc(nm(rec))}${demoTag(rec)}</h1>
      ${can ? `<button class="btn g s" id="edit">${t('edit')}</button><button class="btn g s" id="dup">${t('duplicate')}</button>
               <button class="btn g s" id="arc">${rec.is_active ? t('archive') : t('restore')}</button>` : ''}</div>
    <div class="card" style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
      <div class="rimg" style="width:160px;flex-shrink:0">${thumb(rec, true)}</div>
      <div style="flex:1;min-width:200px">
        <div>${t('category')}: <b>${esc(rec.category||'—')}</b></div>
        <div>${t('servings')}: <b>${nf(rec.servings)}</b></div>
        <div>${t('prep_minutes')}: <b>${rec.prep_minutes ?? '—'}</b> · ${t('cook_minutes')}: <b>${rec.cook_minutes ?? '—'}</b></div>
        ${rec.notes ? `<div style="color:var(--mu)">${esc(rec.notes)}</div>` : ''}</div></div>

    <div class="card tw" style="margin-top:12px"><h3 style="margin-top:0">${t('ing_list')}</h3>
      <table><thead><tr><th>${t('name')}</th><th>${t('qty')}</th><th>${t('price_base')}</th><th>${t('yield')}</th>
        <th>${t('usable_unit_cost')}</th><th>${t('raw_needed')}</th><th>${t('line_cost')}</th><th>${t('share')}</th>${can?'<th></th>':''}</tr></thead>
        <tbody>${rows || `<tr><td colspan="9">${t('no_ings')}</td></tr>`}</tbody></table>${addRow}</div>

    <div class="grid" style="margin-top:12px">
      ${stat(t('total_ing'), money(c.ing))}
      ${stat(t('operating_cost'), money(rec.operating_cost))}
      ${stat(t('packaging_cost'), money(rec.packaging_cost))}
      ${stat(t('other_cost'), money(rec.other_cost))}
      ${stat(t('total_cost'), money(c.batch))}
      ${stat(t('cost_per_serving'), money(c.perServing))}
      ${stat(t('selling_price'), money(c.price))}
      ${stat(t('gross_profit'), money(c.profit))}
      ${stat(t('profit_margin'), pct(c.margin))}
      ${stat(t('food_cost_pct'), pct(c.foodCostPct))}</div>

    <div class="card"><h3 style="margin-top:0">${t('calc_title')}</h3>
      <div class="grid" style="margin-bottom:0">
        <div class="fl"><label>${t('target_margin_pct')}</label><input id="tm" type="number" step="any" min="0" max="99" value="${c.margin===null?30:Math.round(c.margin)}">
          <div style="margin-top:6px">${t('suggest_margin')}: <b id="tmr"></b></div>
          ${can ? `<button class="btn s g" id="tma" style="margin-top:6px">${t('apply_price')}</button>` : ''}</div>
        <div class="fl"><label>${t('target_fc_pct')}</label><input id="tf" type="number" step="any" min="1" max="100" value="${c.foodCostPct===null?30:Math.round(c.foodCostPct)}">
          <div style="margin-top:6px">${t('suggest_fc')}: <b id="tfr"></b></div>
          ${can ? `<button class="btn s g" id="tfa" style="margin-top:6px">${t('apply_price')}</button>` : ''}</div></div></div>

    ${rec.instructions ? `<div class="card" style="margin-top:12px"><h3 style="margin-top:0">${t('instructions')}</h3><div style="white-space:pre-wrap">${esc(rec.instructions)}</div></div>` : ''}
    <div class="card" style="margin-top:12px;color:var(--mu);font-size:13px"><b>${t('formulas')}</b>
      <div>${t('f1')}</div><div>${t('f2')}</div><div>${t('f3')}</div><div>${t('f4')}</div>
      <div style="margin-top:6px">${t('note_live')}</div></div>`;

  const reload = () => pageRecipes();
  $('#back').onclick = () => { recipeView = null; pageRecipes(); };
  const calcSuggest = () => {
    const a = priceByMargin(c.perServing, Number($('#tm').value)), b = priceByFoodCost(c.ingPerServing, Number($('#tf').value));
    $('#tmr').textContent = a === null ? '—' : money(a); $('#tfr').textContent = b === null ? '—' : money(b);
    return [a, b];
  };
  $('#tm').oninput = calcSuggest; $('#tf').oninput = calcSuggest; calcSuggest();
  if (!can) return;
  const run = async (q, ok) => { const {error} = await q; if (error) return toast(error.message, true); if (ok) toast(t('saved')); reload(); };
  const apply = i => async () => { const v = calcSuggest()[i]; if (v === null) return;
    await run(sb.from('recipes').update({selling_price: Math.round(v*100)/100}).eq('id', rec.id), true); };
  $('#tma').onclick = apply(0); $('#tfa').onclick = apply(1);
  $('#edit').onclick = () => form(RECIPE_MODULE, 'recipes', rec, reload);
  $('#arc').onclick = () => confirm(t('confirm_archive')) && run(sb.from('recipes').update({is_active: !rec.is_active}).eq('id', rec.id));
  $('#dup').onclick = async () => {
    const code = rec.code + '-C' + Math.floor(100 + Math.random()*900);
    const {id, created_at, is_demo, ...rest} = rec;
    const {data, error} = await sb.from('recipes').insert({...rest, code, name_ar: rec.name_ar + ' ' + I18N.ar.copy_suffix,
      name_en: rec.name_en ? rec.name_en + ' ' + I18N.en.copy_suffix : null, is_demo:false}).select().single();
    if (error) return toast(error.message, true);
    if (myLines.length) {
      const {error:e2} = await sb.from('recipe_ingredients').insert(myLines.map(l => ({recipe_id:data.id, item_id:l.item_id, qty:l.qty, unit_id:l.unit_id, sort_order:l.sort_order})));
      if (e2) return toast(e2.message, true);
    }
    toast(t('dup_done')); recipeView = data.id; reload();
  };
  document.querySelectorAll('[data-q]').forEach(e => e.onchange = () => {
    const v = Number(e.value); if (!(v > 0)) return toast(t('qty') + ' > 0', true);
    run(sb.from('recipe_ingredients').update({qty:v}).eq('id', e.dataset.q));
  });
  document.querySelectorAll('[data-u]').forEach(e => e.onchange = () => run(sb.from('recipe_ingredients').update({unit_id:e.value}).eq('id', e.dataset.u)));
  document.querySelectorAll('[data-del]').forEach(e => e.onclick = () => confirm(t('confirm_archive')) && run(sb.from('recipe_ingredients').delete().eq('id', e.dataset.del)));
  $('#ai').onchange = e => { const it = ctx.itemsById[e.target.value]; if (it) $('#au').value = it.base_unit_id; };
  $('#aadd').onclick = () => {
    const item_id = $('#ai').value, qty = Number($('#aq').value), unit_id = $('#au').value;
    if (!item_id || !(qty > 0)) return toast(t('choose_item') + ' / ' + t('qty'), true);
    run(sb.from('recipe_ingredients').insert({recipe_id:rec.id, item_id, qty, unit_id, sort_order: myLines.length + 1}));
  };
}
