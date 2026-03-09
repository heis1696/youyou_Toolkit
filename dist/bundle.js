var Et=Object.defineProperty;var U=(t,e)=>()=>(t&&(e=t(t=0)),e);var J=(t,e)=>{for(var r in e)Et(t,r,{get:e[r],enumerable:!0})};var vt={};J(vt,{DEFAULT_API_PRESETS:()=>gt,DEFAULT_SETTINGS:()=>W,STORAGE_KEYS:()=>P,deepMerge:()=>X,getCurrentPresetName:()=>S,loadApiPresets:()=>u,loadSettings:()=>x,saveApiPresets:()=>w,saveSettings:()=>V,setCurrentPresetName:()=>I});function _t(){try{let t=typeof window.parent<"u"?window.parent:window;if(t.SillyTavern?.getContext){let r=t.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings}if(t.extension_settings)return t.extension_settings;let e=t.jQuery||window.jQuery;return null}catch(t){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",t),null}}function ft(){try{let t=typeof window.parent<"u"?window.parent:window;if(typeof t.saveSettings=="function")return t.saveSettings;if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(typeof e.saveSettings=="function")return e.saveSettings;if(typeof e.saveSettingsDebounced=="function")return e.saveSettingsDebounced}return null}catch{return null}}function A(){let t=_t(),e="youyou_toolkit";return t?(t[e]||(t[e]={}),{getItem:r=>{let a=t[e][r];return typeof a=="string"?a:a?JSON.stringify(a):null},setItem:(r,a)=>{t[e][r]=a;let n=ft();if(n)try{n()}catch(i){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",i)}},removeItem:r=>{delete t[e][r];let a=ft();if(a)try{a()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:r=>{try{return localStorage.getItem(r)}catch{return null}},setItem:(r,a)=>{try{localStorage.setItem(r,a)}catch(n){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",n)}},removeItem:r=>{try{localStorage.removeItem(r)}catch{}},_isTavern:!1})}function bt(t,e=null){if(!t||typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function mt(t,e="{}"){try{return JSON.stringify(t)}catch{return e}}function x(){let e=A().getItem(P.SETTINGS);if(e){let r=bt(e,null);if(r&&typeof r=="object")return X(JSON.parse(JSON.stringify(W)),r)}return JSON.parse(JSON.stringify(W))}function V(t){A().setItem(P.SETTINGS,mt(t))}function u(){let e=A().getItem(P.API_PRESETS);if(e){let r=bt(e,null);if(Array.isArray(r))return r}return JSON.parse(JSON.stringify(gt))}function w(t){A().setItem(P.API_PRESETS,mt(t))}function S(){return A().getItem(P.CURRENT_PRESET)||""}function I(t){A().setItem(P.CURRENT_PRESET,t||"")}function X(t,e){let r=n=>n&&typeof n=="object"&&!Array.isArray(n),a={...t};return r(t)&&r(e)&&Object.keys(e).forEach(n=>{r(e[n])?n in t?a[n]=X(t[n],e[n]):Object.assign(a,{[n]:e[n]}):Object.assign(a,{[n]:e[n]})}),a}var P,W,gt,j=U(()=>{P={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},W={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},gt=[]});var et={};J(et,{API_STATUS:()=>Mt,fetchAvailableModels:()=>tt,getApiConfig:()=>m,getEffectiveApiConfig:()=>Yt,sendApiRequest:()=>xt,testApiConnection:()=>Z,updateApiConfig:()=>F,validateApiConfig:()=>L});function m(){return x().apiConfig||{}}function F(t){let e=x();e.apiConfig={...e.apiConfig,...t},V(e)}function L(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Yt(t=""){let e=x();if(t){let a=(e.apiPresets||[]).find(n=>n.name===t);if(a&&a.apiConfig)return{...a.apiConfig,presetName:a.name}}return e.apiConfig||{}}function jt(t,e={}){let r=e.apiConfig||m();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:!1,...e.extraParams}}async function xt(t,e={},r=null){let a=e.apiConfig||m(),n=a.useMainApi,i=L(a);if(!i.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${i.errors.join(", ")}`);return n?await zt(t,e,r):await Rt(t,a,e,r)}async function zt(t,e,r){let a=typeof window.parent<"u"?window.parent:window;if(!a.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await a.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function Rt(t,e,r,a){let n=jt(t,{apiConfig:e,...r}),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let c=await fetch(e.url,{method:"POST",headers:i,body:JSON.stringify(n),signal:a});if(!c.ok){let Tt=await c.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${c.status}): ${Tt}`)}let l=await c.json(),b="";if(l.choices&&l.choices[0]?.message?.content)b=l.choices[0].message.content;else if(l.content)b=l.content;else if(l.text)b=l.text;else if(l.response)b=l.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(l).slice(0,200)}`);return b.trim()}async function Z(t=null){let e=t||m(),r=Date.now();try{await xt([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let n=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(a){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${a.message}`,latency:Date.now()-r}}}async function tt(t=null){let e=t||m();return e.useMainApi?await Nt():await Ot(e)}async function Nt(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ot(t){if(!t.url||!t.apiKey)return[];try{let r=`${t.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,a=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!a.ok)return[];let n=await a.json();return n.data&&Array.isArray(n.data)?n.data.map(i=>i.id||i.name).filter(Boolean).sort():[]}catch{return[]}}var Mt,Q=U(()=>{j();Mt={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var ht={};J(ht,{createPreset:()=>wt,createPresetFromCurrentConfig:()=>lt,deletePreset:()=>st,duplicatePreset:()=>Ut,exportPresets:()=>ct,generateUniquePresetName:()=>N,getActiveConfig:()=>ot,getActivePresetName:()=>K,getAllPresets:()=>rt,getPreset:()=>R,getPresetNames:()=>at,importPresets:()=>B,presetExists:()=>z,renamePreset:()=>Dt,switchToPreset:()=>it,updatePreset:()=>nt,validatePreset:()=>Jt});function rt(){return u()}function at(){return u().map(e=>e.name)}function R(t){return!t||typeof t!="string"?null:u().find(r=>r.name===t)||null}function z(t){return!t||typeof t!="string"?!1:u().some(r=>r.name===t)}function wt(t){let{name:e,description:r,apiConfig:a}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=e.trim();if(z(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let i={name:n,description:r||"",apiConfig:{url:a?.url||"",apiKey:a?.apiKey||"",model:a?.model||"",useMainApi:a?.useMainApi??!0,max_tokens:a?.max_tokens||4096,temperature:a?.temperature??.7,top_p:a?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},c=u();return c.push(i),w(c),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:i}}function nt(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=u(),a=r.findIndex(c=>c.name===t);if(a===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=r[a],i={...n,...e,name:n.name,updatedAt:Date.now()};return e.apiConfig&&(i.apiConfig={...n.apiConfig,...e.apiConfig}),r[a]=i,w(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:i}}function st(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=u(),r=e.findIndex(a=>a.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),w(e),S()===t&&I(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Dt(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!z(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(z(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let a=u(),n=a.find(i=>i.name===t);return n&&(n.name=r,n.updatedAt=Date.now(),w(a),S()===t&&I(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Ut(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),a=R(t);if(!a)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(z(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(a)),name:r,createdAt:Date.now(),updatedAt:Date.now()},i=u();return i.push(n),w(i),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:n}}function it(t){if(!t)return I(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=R(t);return e?(I(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function K(){return S()}function ot(){let t=S();if(t){let r=R(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:x().apiConfig||{}}}function ct(t=null){if(t){let r=R(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=u();return JSON.stringify(e,null,2)}function B(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=Array.isArray(r)?r:[r];if(a.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=u(),i=0;for(let c of a){if(!c.name||typeof c.name!="string"||!c.apiConfig||typeof c.apiConfig!="object")continue;let l=n.findIndex(b=>b.name===c.name);l>=0?e.overwrite&&(c.updatedAt=Date.now(),n[l]=c,i++):(c.createdAt=c.createdAt||Date.now(),c.updatedAt=Date.now(),n.push(c),i++)}return i>0&&w(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}function lt(t,e=""){let r=x();return wt({name:t,description:e,apiConfig:r.apiConfig})}function Jt(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function N(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=u(),r=new Set(e.map(n=>n.name));if(!r.has(t))return t;let a=1;for(;r.has(`${t} (${a})`);)a++;return`${t} (${a})`}var yt=U(()=>{j()});var kt={};J(kt,{getCurrentTab:()=>Zt,getStyles:()=>Xt,render:()=>v,setCurrentTab:()=>te});function p(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function y(t,e,r=3e3){let a=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(a.toastr){a.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}console.log(`[${t.toUpperCase()}] ${e}`)}function E(){if(T)return T;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return T=window.parent.jQuery,T}catch{}return window.jQuery&&(T=window.jQuery),T}function O(){return o&&o.length>0}function Ft(){return`<div class="yyt-tab-nav">${[{id:"api",name:"API\u914D\u7F6E",icon:"fa-plug"},{id:"presets",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark"},{id:"test",name:"\u8FDE\u63A5\u6D4B\u8BD5",icon:"fa-flask"}].map(r=>`
    <div class="yyt-tab-item ${C===r.id?"active":""}" data-tab="${r.id}">
      <i class="fa-solid ${r.icon}"></i>
      <span>${r.name}</span>
    </div>
  `).join("")}</div>`}function Lt(){switch(C){case"api":return Qt();case"presets":return Kt();case"test":return Bt();default:return""}}function Qt(){let t=m(),r=ot().presetName;return`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-circle-info"></i>
          <span>\u5F53\u524D\u72B6\u6001</span>
        </div>
        <div class="yyt-status-bar">
          ${r?`<span class="yyt-badge yyt-badge-info">\u4F7F\u7528\u9884\u8BBE: ${p(r)}</span>`:'<span class="yyt-badge yyt-badge-default">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</span>'}
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API\u914D\u7F6E</span>
        </div>
        
        <div class="yyt-form-group">
          <label class="yyt-checkbox-label">
            <input type="checkbox" id="${s}-use-main-api" ${t.useMainApi?"checked":""}>
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
          </label>
          <div class="yyt-hint">\u52FE\u9009\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</div>
        </div>
        
        <div id="${s}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${s}-api-url">API URL</label>
              <input type="text" class="yyt-input" id="${s}-api-url" 
                     value="${p(t.url||"")}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${s}-api-key">API Key</label>
              <div class="yyt-input-group">
                <input type="password" class="yyt-input" id="${s}-api-key" 
                       value="${p(t.apiKey||"")}" 
                       placeholder="sk-...">
                <button class="yyt-btn yyt-btn-icon" id="${s}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${s}-model">\u6A21\u578B</label>
              <div class="yyt-input-group">
                <input type="text" class="yyt-input" id="${s}-model" 
                       value="${p(t.model||"")}" 
                       placeholder="gpt-4">
                <button class="yyt-btn yyt-btn-secondary" id="${s}-load-models" title="\u52A0\u8F7D\u6A21\u578B\u5217\u8868">
                  <i class="fa-solid fa-refresh"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label for="${s}-max-tokens">Max Tokens</label>
              <input type="number" class="yyt-input" id="${s}-max-tokens" 
                     value="${t.max_tokens||4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label for="${s}-temperature">Temperature</label>
              <input type="number" class="yyt-input" id="${s}-temperature" 
                     value="${t.temperature??.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${s}-top-p">Top P</label>
              <input type="number" class="yyt-input" id="${s}-top-p" 
                     value="${t.top_p??.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <div class="yyt-panel-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${s}-reset-api-config">
          <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
        </button>
        <button class="yyt-btn yyt-btn-primary" id="${s}-save-api-config">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
        </button>
      </div>
    </div>
  `}function Kt(){let t=rt(),e=K(),r=t.length>0?t.map(a=>`
        <div class="yyt-preset-item ${a.name===e?"active":""}" data-preset-name="${p(a.name)}">
          <div class="yyt-preset-info">
            <div class="yyt-preset-name">${p(a.name)}</div>
            <div class="yyt-preset-desc">${p(a.description||"\u65E0\u63CF\u8FF0")}</div>
            <div class="yyt-preset-meta">
              ${a.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${p(a.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
            </div>
          </div>
          <div class="yyt-preset-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="activate" title="\u6FC0\u6D3B">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="edit" title="\u7F16\u8F91">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="duplicate" title="\u590D\u5236">
              <i class="fa-solid fa-copy"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="\u5220\u9664">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join(""):'<div class="yyt-empty-state"><i class="fa-solid fa-inbox"></i><p>\u6682\u65E0\u9884\u8BBE</p></div>';return`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-list"></i>
          <span>\u9884\u8BBE\u5217\u8868</span>
          <span class="yyt-count-badge">${t.length}</span>
        </div>
        
        <div class="yyt-preset-list">
          ${r}
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-plus-circle"></i>
          <span>\u521B\u5EFA\u9884\u8BBE</span>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <input type="text" class="yyt-input" id="${s}-new-preset-name" 
                   placeholder="\u9884\u8BBE\u540D\u79F0" value="${N("\u65B0\u9884\u8BBE")}">
          </div>
          <button class="yyt-btn yyt-btn-primary" id="${s}-create-preset">
            <i class="fa-solid fa-plus"></i> \u4ECE\u5F53\u524D\u914D\u7F6E\u521B\u5EFA
          </button>
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-file-import"></i>
          <span>\u5BFC\u5165/\u5BFC\u51FA</span>
        </div>
        
        <div class="yyt-button-row">
          <button class="yyt-btn yyt-btn-secondary" id="${s}-export-presets">
            <i class="fa-solid fa-download"></i> \u5BFC\u51FA\u5168\u90E8
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${s}-import-presets">
            <i class="fa-solid fa-upload"></i> \u5BFC\u5165
          </button>
          <input type="file" id="${s}-import-file" accept=".json" style="display:none">
        </div>
      </div>
    </div>
  `}function Bt(){let t=m(),e=at(),r=K(),a=e.length>0?e.map(n=>`<option value="${p(n)}" ${n===r?"selected":""}>${p(n)}</option>`).join(""):"";return`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-vial"></i>
          <span>\u8FDE\u63A5\u6D4B\u8BD5</span>
        </div>
        
        <div class="yyt-form-group">
          <label for="${s}-test-preset">\u9009\u62E9\u914D\u7F6E</label>
          <select class="yyt-select" id="${s}-test-preset">
            <option value="">\u5F53\u524DAPI\u914D\u7F6E</option>
            ${a}
          </select>
        </div>
        
        <div class="yyt-form-group">
          <label for="${s}-test-message">\u6D4B\u8BD5\u6D88\u606F</label>
          <textarea class="yyt-textarea" id="${s}-test-message" rows="3" 
                    placeholder="\u8F93\u5165\u6D4B\u8BD5\u6D88\u606F...">Hello, this is a test message.</textarea>
        </div>
        
        <div class="yyt-button-row">
          <button class="yyt-btn yyt-btn-primary" id="${s}-run-test">
            <i class="fa-solid fa-play"></i> \u8FD0\u884C\u6D4B\u8BD5
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${s}-test-connection">
            <i class="fa-solid fa-wifi"></i> \u6D4B\u8BD5\u8FDE\u63A5
          </button>
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-terminal"></i>
          <span>\u6D4B\u8BD5\u7ED3\u679C</span>
        </div>
        
        <div class="yyt-result-box" id="${s}-test-result">
          <div class="yyt-result-placeholder">
            <i class="fa-solid fa-arrow-up"></i>
            <p>\u8FD0\u884C\u6D4B\u8BD5\u540E\u7ED3\u679C\u5C06\u663E\u793A\u5728\u8FD9\u91CC</p>
          </div>
        </div>
      </div>
    </div>
  `}function Ht(){let t=E();if(!t||!O()){console.warn("[YouYouToolkit] bindEvents: jQuery\u6216\u5BB9\u5668\u4E0D\u53EF\u7528");return}switch(o.find(".yyt-tab-item").off("click").on("click",function(){let e=t(this).data("tab");e&&e!==C&&(C=e,v())}),C){case"api":Gt();break;case"presets":qt();break;case"test":Wt();break}}function Gt(){let t=E();!t||!O()||(o.find(`#${s}-use-main-api`).on("change",function(){let e=t(this).is(":checked"),r=o.find(`#${s}-custom-api-fields`);e?r.addClass("yyt-disabled").find("input, button").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button").prop("disabled",!1)}),o.find(`#${s}-toggle-key-visibility`).on("click",function(){let e=o.find(`#${s}-api-key`),r=e.attr("type");e.attr("type",r==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),o.find(`#${s}-load-models`).on("click",async function(){let e=t(this),r=o.find(`#${s}-model`);e.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=$t(),n=await tt(a);if(n.length>0){let i=o.find(`#${s}-model-select`);i.length===0&&(i=t(`<select class="yyt-select" id="${s}-model-select">`).insertAfter(r),r.hide()),i.empty(),n.forEach(c=>{i.append(`<option value="${p(c)}">${p(c)}</option>`)}),i.off("change").on("change",function(){r.val(t(this).val())}),y("success",`\u5DF2\u52A0\u8F7D ${n.length} \u4E2A\u6A21\u578B`)}else y("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){y("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{e.prop("disabled",!1).find("i").removeClass("fa-spin")}}),o.find(`#${s}-save-api-config`).on("click",function(){let e=$t(),r=L(e);if(!r.valid&&!e.useMainApi){y("error",r.errors.join(", "));return}F(e),y("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),o.find(`#${s}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(F({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),v(),y("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}))}function qt(){let t=E();!t||!O()||(o.find(".yyt-preset-item").on("click",function(e){let a=t(this).data("preset-name"),n=t(e.target).closest("[data-action]").data("action");if(n)switch(e.stopPropagation(),n){case"activate":let i=it(a);y(i.success?"success":"error",i.message),i.success&&v();break;case"edit":Vt(a);break;case"duplicate":let c=N(a);confirm(`\u786E\u5B9A\u8981\u590D\u5236\u9884\u8BBE "${a}" \u4E3A "${c}" \u5417\uFF1F`)&&(B(JSON.stringify([{...getPreset(a),name:c}])),v());break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${a}" \u5417\uFF1F`)){let l=st(a);y(l.success?"info":"error",l.message),l.success&&v()}break}}),o.find(`#${s}-create-preset`).on("click",function(){let e=o.find(`#${s}-new-preset-name`).val().trim();if(!e){y("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let r=lt(e);y(r.success?"success":"error",r.message),r.success&&(o.find(`#${s}-new-preset-name`).val(N("\u65B0\u9884\u8BBE")),v())}),o.find(`#${s}-export-presets`).on("click",function(){try{let e=ct(),r=new Blob([e],{type:"application/json"}),a=URL.createObjectURL(r),n=document.createElement("a");n.href=a,n.download=`youyou_toolkit_presets_${Date.now()}.json`,n.click(),URL.revokeObjectURL(a),y("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(e){y("error",`\u5BFC\u51FA\u5931\u8D25: ${e.message}`)}}),o.find(`#${s}-import-presets`).on("click",function(){o.find(`#${s}-import-file`).click()}),o.find(`#${s}-import-file`).on("change",async function(e){let r=e.target.files[0];if(r){try{let a=await r.text(),n=B(a,{overwrite:!0});y(n.success?"success":"error",n.message),n.imported>0&&v()}catch(a){y("error",`\u5BFC\u5165\u5931\u8D25: ${a.message}`)}t(this).val("")}}))}function Wt(){let t=E();!t||!O()||(o.find(`#${s}-test-connection`).on("click",async function(){let e=t(this),r=o.find(`#${s}-test-result`),a=o.find(`#${s}-test-preset`).val();e.prop("disabled",!0),r.html('<div class="yyt-loading"><i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u6D4B\u8BD5\u8FDE\u63A5...</div>');try{let n=a?getPreset(a)?.apiConfig:m(),i=await Z(n);r.html(`
        <div class="yyt-result ${i.success?"yyt-result-success":"yyt-result-error"}">
          <i class="fa-solid ${i.success?"fa-check-circle":"fa-times-circle"}"></i>
          <div>
            <div class="yyt-result-title">${i.success?"\u8FDE\u63A5\u6210\u529F":"\u8FDE\u63A5\u5931\u8D25"}</div>
            <div class="yyt-result-message">${p(i.message)}</div>
          </div>
        </div>
      `)}catch(n){r.html(`
        <div class="yyt-result yyt-result-error">
          <i class="fa-solid fa-times-circle"></i>
          <div>
            <div class="yyt-result-title">\u6D4B\u8BD5\u5931\u8D25</div>
            <div class="yyt-result-message">${p(n.message)}</div>
          </div>
        </div>
      `)}finally{e.prop("disabled",!1)}}),o.find(`#${s}-run-test`).on("click",async function(){let e=t(this),r=o.find(`#${s}-test-result`),a=o.find(`#${s}-test-message`),n=o.find(`#${s}-test-preset`).val(),i=a.val().trim();if(!i){y("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6D88\u606F");return}e.prop("disabled",!0),r.html('<div class="yyt-loading"><i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u53D1\u9001\u8BF7\u6C42...</div>');try{let{sendApiRequest:c}=await Promise.resolve().then(()=>(Q(),et)),l=n?getPreset(n)?.apiConfig:m(),b=await c([{role:"user",content:i}],{apiConfig:l});r.html(`
        <div class="yyt-result yyt-result-success">
          <div class="yyt-result-title">\u54CD\u5E94\u6210\u529F</div>
          <div class="yyt-result-content">${p(b)}</div>
        </div>
      `)}catch(c){r.html(`
        <div class="yyt-result yyt-result-error">
          <i class="fa-solid fa-times-circle"></i>
          <div>
            <div class="yyt-result-title">\u8BF7\u6C42\u5931\u8D25</div>
            <div class="yyt-result-message">${p(c.message)}</div>
          </div>
        </div>
      `)}finally{e.prop("disabled",!1)}}))}function $t(){return!E()||!O()?{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}:{url:o.find(`#${s}-api-url`).val()?.trim()||"",apiKey:o.find(`#${s}-api-key`).val()||"",model:o.find(`#${s}-model`).val()?.trim()||"",useMainApi:o.find(`#${s}-use-main-api`).is(":checked"),max_tokens:parseInt(o.find(`#${s}-max-tokens`).val())||4096,temperature:parseFloat(o.find(`#${s}-temperature`).val())??.7,top_p:parseFloat(o.find(`#${s}-top-p`).val())??.9}}function Vt(t){let e=getPreset(t);if(!e)return;let r=prompt("\u7F16\u8F91\u9884\u8BBE\u63CF\u8FF0:",e.description||"");r!==null&&(nt(t,{description:r}),y("success","\u9884\u8BBE\u5DF2\u66F4\u65B0"),v())}function v(t){let e=E();if(!e){console.error("[YouYouToolkit] jQuery not available");return}if(t&&(typeof t=="string"?o=e(t):t&&t.jquery?o=t:t&&(o=e(t))),!o||!o.length){console.error("[YouYouToolkit] Container not found or invalid");return}let r=`
    <div class="yyt-api-manager">
      ${Ft()}
      <div class="yyt-tab-content">
        ${Lt()}
      </div>
    </div>
  `;o.html(r),Ht()}function Xt(){return`
    /* ============================================================
       YouYou Toolkit - \u73B0\u4EE3\u5316UI\u6837\u5F0F
       ============================================================ */
    
    /* CSS\u53D8\u91CF\u5B9A\u4E49 */
    .yyt-api-manager {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-success-glow: rgba(74, 222, 128, 0.3);
      --yyt-error: #f87171;
      --yyt-error-glow: rgba(248, 113, 113, 0.3);
      --yyt-warning: #fbbf24;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-surface-active: rgba(255, 255, 255, 0.08);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
      --yyt-radius: 12px;
      --yyt-radius-sm: 8px;
      --yyt-radius-lg: 16px;
      --yyt-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
      --yyt-shadow-glow: 0 0 20px var(--yyt-accent-glow);
      
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    /* Tab\u5BFC\u822A - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-tab-nav {
      display: flex;
      gap: 6px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: var(--yyt-radius);
      margin-bottom: 20px;
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-tab-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      border-radius: var(--yyt-radius-sm);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--yyt-text-secondary);
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-tab-item::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    
    .yyt-tab-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-tab-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-tab-item.active::before {
      opacity: 1;
    }
    
    .yyt-tab-item i {
      font-size: 14px;
      transition: transform 0.25s ease;
    }
    
    .yyt-tab-item:hover i {
      transform: scale(1.1);
    }
    
    .yyt-tab-item span {
      position: relative;
      z-index: 1;
    }
    
    .yyt-tab-content {
      flex: 1;
      overflow: auto;
      padding-right: 4px;
    }
    
    .yyt-tab-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .yyt-tab-content::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-tab-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    
    .yyt-tab-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    
    /* \u9762\u677F */
    .yyt-panel {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .yyt-panel-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, transparent 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
      transition: border-color 0.2s ease;
    }
    
    .yyt-panel-section:hover {
      border-color: var(--yyt-border-strong);
    }
    
    /* \u6807\u9898 */
    .yyt-section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-section-title i {
      color: var(--yyt-accent);
      font-size: 16px;
      filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
    }
    
    .yyt-count-badge {
      font-size: 11px;
      padding: 3px 10px;
      border-radius: 20px;
      background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
      color: var(--yyt-accent);
      font-weight: 600;
      border: 1px solid rgba(123, 183, 255, 0.2);
    }
    
    /* \u72B6\u6001\u680F */
    .yyt-status-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 18px;
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.08) 0%, rgba(123, 183, 255, 0.02) 100%);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid rgba(123, 183, 255, 0.15);
    }
    
    /* \u5FBD\u7AE0 */
    .yyt-badge {
      display: inline-flex;
      align-items: center;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    
    .yyt-badge-small {
      padding: 3px 10px;
      font-size: 11px;
    }
    
    .yyt-badge-info {
      background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
      color: var(--yyt-accent);
      border: 1px solid rgba(123, 183, 255, 0.25);
      box-shadow: 0 2px 10px rgba(123, 183, 255, 0.15);
    }
    
    .yyt-badge-default {
      background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text-secondary);
      border: 1px solid var(--yyt-border);
    }
    
    /* \u8868\u5355 */
    .yyt-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .yyt-form-group label {
      font-size: 13px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
      letter-spacing: 0.3px;
    }
    
    .yyt-form-row {
      display: flex;
      gap: 14px;
    }
    
    .yyt-form-row-2col > .yyt-form-group {
      flex: 1;
    }
    
    .yyt-flex-1 {
      flex: 1;
    }
    
    /* \u8F93\u5165\u6846 - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-input,
    .yyt-select,
    .yyt-textarea {
      padding: 12px 16px;
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      color: var(--yyt-text);
      font-size: 14px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .yyt-input:hover,
    .yyt-select:hover,
    .yyt-textarea:hover {
      border-color: rgba(255, 255, 255, 0.2);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    }
    
    .yyt-input:focus,
    .yyt-select:focus,
    .yyt-textarea:focus {
      outline: none;
      border-color: var(--yyt-accent);
      background: linear-gradient(180deg, rgba(123, 183, 255, 0.05) 0%, rgba(123, 183, 255, 0.02) 100%);
      box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .yyt-input::placeholder,
    .yyt-textarea::placeholder {
      color: var(--yyt-text-muted);
    }
    
    .yyt-input-group {
      display: flex;
      gap: 10px;
    }
    
    .yyt-input-group .yyt-input {
      flex: 1;
    }
    
    /* \u590D\u9009\u6846 */
    .yyt-checkbox-label {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 12px 16px;
      background: var(--yyt-surface);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid var(--yyt-border);
      transition: all 0.2s ease;
    }
    
    .yyt-checkbox-label:hover {
      background: var(--yyt-surface-hover);
      border-color: var(--yyt-border-strong);
    }
    
    .yyt-checkbox-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: var(--yyt-accent);
    }
    
    .yyt-hint {
      font-size: 12px;
      color: var(--yyt-text-muted);
      padding-left: 4px;
    }
    
    .yyt-disabled {
      opacity: 0.4;
      pointer-events: none;
      filter: grayscale(0.5);
    }
    
    .yyt-button-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    /* \u9762\u677F\u5E95\u90E8 */
    .yyt-panel-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 20px;
      margin-top: 4px;
      border-top: 1px solid var(--yyt-border);
    }
    
    /* \u6309\u94AE - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      border: none;
      border-radius: var(--yyt-radius-sm);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      letter-spacing: 0.3px;
    }
    
    .yyt-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
    .yyt-btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, var(--yyt-surface-hover) 100%);
      border-color: var(--yyt-border-strong);
      transform: translateY(-1px);
    }
    
    .yyt-btn-danger {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
      color: var(--yyt-error);
      border: 1px solid rgba(248, 113, 113, 0.25);
    }
    
    .yyt-btn-danger:hover {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.25) 0%, rgba(248, 113, 113, 0.1) 100%);
      box-shadow: 0 4px 15px var(--yyt-error-glow);
    }
    
    .yyt-btn-icon {
      padding: 10px;
      min-width: 40px;
    }
    
    .yyt-btn-small {
      padding: 8px 12px;
      font-size: 12px;
    }
    
    .yyt-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
    
    /* \u9884\u8BBE\u5217\u8868 - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-preset-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 300px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .yyt-preset-list::-webkit-scrollbar {
      width: 6px;
    }
    
    .yyt-preset-list::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-preset-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    
    .yyt-preset-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    
    .yyt-preset-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateX(4px);
    }
    
    .yyt-preset-item.active {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      border-color: rgba(123, 183, 255, 0.35);
      box-shadow: 0 0 20px var(--yyt-accent-soft), inset 0 1px 0 rgba(123, 183, 255, 0.1);
    }
    
    .yyt-preset-info {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-preset-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .yyt-preset-desc {
      font-size: 12px;
      color: var(--yyt-text-muted);
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .yyt-preset-meta {
      display: flex;
      gap: 8px;
    }
    
    .yyt-preset-actions {
      display: flex;
      gap: 6px;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    
    .yyt-preset-item:hover .yyt-preset-actions {
      opacity: 1;
    }
    
    /* \u7A7A\u72B6\u6001 */
    .yyt-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 20px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-empty-state i {
      font-size: 56px;
      margin-bottom: 20px;
      opacity: 0.4;
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
    }
    
    .yyt-empty-state p {
      font-size: 15px;
      letter-spacing: 0.5px;
    }
    
    /* \u6D4B\u8BD5\u7ED3\u679C - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-result-box {
      min-height: 160px;
      padding: 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
      font-family: 'SF Mono', 'Consolas', 'Monaco', monospace;
    }
    
    .yyt-result-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 120px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-result-placeholder i {
      font-size: 28px;
      margin-bottom: 12px;
      opacity: 0.5;
      animation: yytFloat 2s ease-in-out infinite;
    }
    
    @keyframes yytFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    
    .yyt-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: var(--yyt-accent);
      font-size: 14px;
    }
    
    .yyt-loading i {
      font-size: 18px;
    }
    
    .yyt-result {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
    
    .yyt-result i {
      font-size: 22px;
      margin-top: 2px;
    }
    
    .yyt-result-success {
      padding: 16px;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.02) 100%);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid rgba(74, 222, 128, 0.2);
    }
    
    .yyt-result-success i {
      color: var(--yyt-success);
      filter: drop-shadow(0 0 8px var(--yyt-success-glow));
    }
    
    .yyt-result-error {
      padding: 16px;
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.1) 0%, rgba(248, 113, 113, 0.02) 100%);
      border-radius: var(--yyt-radius-sm);
      border: 1px solid rgba(248, 113, 113, 0.2);
    }
    
    .yyt-result-error i {
      color: var(--yyt-error);
      filter: drop-shadow(0 0 8px var(--yyt-error-glow));
    }
    
    .yyt-result-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 6px;
      color: var(--yyt-text);
    }
    
    .yyt-result-message {
      font-size: 13px;
      color: var(--yyt-text-secondary);
      line-height: 1.5;
    }
    
    .yyt-result-content {
      font-size: 13px;
      color: var(--yyt-text);
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 220px;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.25);
      padding: 14px 16px;
      border-radius: var(--yyt-radius-sm);
      margin-top: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      line-height: 1.6;
    }
    
    /* \u52A8\u753B */
    @keyframes yytFadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-panel-section {
      animation: yytFadeSlideIn 0.3s ease-out backwards;
    }
    
    .yyt-panel-section:nth-child(1) { animation-delay: 0s; }
    .yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
    .yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }
  `}function Zt(){return C}function te(t){C=t}var s,C,o,T,Pt=U(()=>{Q();yt();j();s="youyou_toolkit";C="api",o=null,T=null});var f="youyou_toolkit",ut="0.2.0",_=`${f}-menu-item`,pt=`${f}-menu-container`,ee=`${f}-popup`,k=typeof window.parent<"u"?window.parent:window,H=null,h=null,G=null,Y=null;async function M(){try{return H=await Promise.resolve().then(()=>(j(),vt)),h=await Promise.resolve().then(()=>(Q(),et)),G=await Promise.resolve().then(()=>(yt(),ht)),Y=await Promise.resolve().then(()=>(Pt(),kt)),!0}catch(t){return console.warn(`[${f}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,t),!1}}function g(...t){console.log(`[${f}]`,...t)}function Ct(...t){console.error(`[${f}]`,...t)}function re(){let t=`${f}-styles`,e=k.document||document;if(e.getElementById(t))return;let r=`
    /* ============================================================
       YouYou Toolkit - \u73B0\u4EE3\u5316\u5F39\u7A97\u6837\u5F0F
       ============================================================ */
    
    /* CSS\u53D8\u91CF */
    :root {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-error: #f87171;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
    }
    
    /* \u83DC\u5355\u9879\u6837\u5F0F */
    #${pt} {
      display: flex;
      align-items: center;
    }
    
    #${_} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${_}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${_} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${_}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${_} span {
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    
    /* \u5F39\u7A97\u906E\u7F69 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      animation: yytFadeIn 0.25s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* \u5F39\u7A97\u4E3B\u4F53 */
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: 
        radial-gradient(ellipse at top, rgba(123, 183, 255, 0.08) 0%, transparent 50%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 30%),
        #0d1117;
      border: 1px solid var(--yyt-border-strong);
      border-radius: 20px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.7),
        0 0 60px rgba(123, 183, 255, 0.1);
      width: 680px;
      min-height: 480px;
      max-width: 92vw;
      max-height: 88vh;
      z-index: 10000;
      animation: yytSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: var(--yyt-text);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    @keyframes yytSlideIn {
      from { 
        opacity: 0; 
        transform: translate(-50%, -50%) scale(0.92) translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translate(-50%, -50%) scale(1) translateY(0); 
      }
    }
    
    /* \u5F39\u7A97\u5934\u90E8 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
      border-bottom: 1px solid var(--yyt-border);
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 17px;
      font-weight: 700;
      color: var(--yyt-text);
      letter-spacing: 0.3px;
    }
    
    .yyt-popup-title i {
      font-size: 18px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 10px var(--yyt-accent-glow));
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: 1px solid var(--yyt-border);
      border-radius: 10px;
      background: var(--yyt-surface);
      color: var(--yyt-text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      font-size: 14px;
    }
    
    .yyt-popup-close:hover {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(248, 113, 113, 0.08) 100%);
      border-color: rgba(248, 113, 113, 0.35);
      color: #f87171;
      transform: rotate(90deg);
    }
    
    /* \u5F39\u7A97\u5185\u5BB9 */
    .yyt-popup-body {
      flex: 1;
      padding: 24px;
      overflow: auto;
    }
    
    .yyt-popup-body::-webkit-scrollbar {
      width: 8px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    /* \u5F39\u7A97\u5E95\u90E8 */
    .yyt-popup-footer {
      padding: 18px 24px;
      background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
      border-top: 1px solid var(--yyt-border);
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    /* \u6309\u94AE */
    .yyt-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.3px;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, var(--yyt-surface-hover) 100%);
      border-color: var(--yyt-border-strong);
      transform: translateY(-1px);
    }
    
    /* \u4E3B\u5BFC\u822A\u6837\u5F0F */
    .yyt-nav {
      display: flex;
      gap: 8px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 14px;
      margin-bottom: 24px;
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--yyt-text-secondary);
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-nav-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-nav-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-nav-item i {
      font-size: 15px;
      transition: transform 0.25s ease;
    }
    
    .yyt-nav-item:hover i {
      transform: scale(1.15);
    }
    
    /* \u9875\u9762\u5185\u5BB9 */
    .yyt-page {
      display: none;
      animation: yytPageIn 0.3s ease-out;
    }
    
    @keyframes yytPageIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-page.active {
      display: block;
    }
    
    /* \u6B22\u8FCE\u9875\u9762 */
    .yyt-welcome {
      text-align: center;
      padding: 50px 30px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 12px 0;
      font-size: 26px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 50%, var(--yyt-accent) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: yytGradient 3s linear infinite;
    }
    
    @keyframes yytGradient {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
    
    .yyt-welcome p {
      color: var(--yyt-text-secondary);
      line-height: 1.7;
      margin: 0 0 20px 0;
      font-size: 15px;
    }
    
    .yyt-version {
      font-size: 12px;
      color: var(--yyt-text-muted);
      margin-top: 35px;
      padding: 10px 20px;
      background: var(--yyt-surface);
      border-radius: 20px;
      display: inline-block;
      border: 1px solid var(--yyt-border);
      letter-spacing: 0.5px;
    }
    
    .yyt-features {
      text-align: left;
      max-width: 450px;
      margin: 30px auto;
    }
    
    .yyt-feature-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 12px;
      margin-bottom: 10px;
      border: 1px solid var(--yyt-border);
      transition: all 0.25s ease;
    }
    
    .yyt-feature-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(123, 183, 255, 0.2);
      transform: translateX(6px);
    }
    
    .yyt-feature-item i {
      color: var(--yyt-accent);
      font-size: 22px;
      width: 28px;
      filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      transition: transform 0.25s ease;
    }
    
    .yyt-feature-item:hover i {
      transform: scale(1.1);
    }
    
    .yyt-feature-item span {
      color: var(--yyt-text);
      font-size: 14px;
      font-weight: 500;
    }
  `,a=e.createElement("style");a.id=t,a.textContent=r,(e.head||e.documentElement).appendChild(a),g("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var d=null,$=null,ae="welcome";function q(){d&&(d.remove(),d=null),$&&($.remove(),$=null),g("\u5F39\u7A97\u5DF2\u5173\u95ED")}function At(t){ae=t;let e=k.jQuery||window.jQuery;if(!(!e||!d)&&(e(d).find(".yyt-nav-item").removeClass("active"),e(d).find(`.yyt-nav-item[data-page="${t}"]`).addClass("active"),e(d).find(".yyt-page").removeClass("active"),e(d).find(`.yyt-page[data-page="${t}"]`).addClass("active"),t==="api"&&Y)){let r=e(d).find("#youyou_toolkit-api-container");r.length&&Y.render(r)}}function St(){if(d){g("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let t=k.jQuery||window.jQuery,e=k.document||document;if(!t){Ct("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}$=e.createElement("div"),$.className="yyt-popup-overlay",$.addEventListener("click",n=>{n.target===$&&q()}),e.body.appendChild($);let r=`
    <div class="yyt-popup" id="${ee}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${ut}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-nav">
          <div class="yyt-nav-item active" data-page="welcome">
            <i class="fa-solid fa-home"></i>
            <span>\u9996\u9875</span>
          </div>
          <div class="yyt-nav-item" data-page="api">
            <i class="fa-solid fa-plug"></i>
            <span>API\u7BA1\u7406</span>
          </div>
        </div>
        
        <div class="yyt-page active" data-page="welcome">
          <div class="yyt-welcome">
            <h2>\u{1F6E0}\uFE0F \u6B22\u8FCE\u4F7F\u7528 YouYou \u5DE5\u5177\u7BB1</h2>
            <p>\u8FD9\u662F\u4E00\u4E2A\u4E3A SillyTavern \u8BBE\u8BA1\u7684\u5DE5\u5177\u63D2\u4EF6\u6846\u67B6\u3002</p>
            
            <div class="yyt-features">
              <div class="yyt-feature-item">
                <i class="fa-solid fa-plug"></i>
                <span>API\u8FDE\u63A5\u7BA1\u7406 - \u652F\u6301\u81EA\u5B9A\u4E49API\u548C\u4E3BAPI\u5207\u6362</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-bookmark"></i>
                <span>\u9884\u8BBE\u7BA1\u7406 - \u4FDD\u5B58\u548C\u5207\u6362\u591A\u5957API\u914D\u7F6E</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-flask"></i>
                <span>\u8FDE\u63A5\u6D4B\u8BD5 - \u9A8C\u8BC1API\u914D\u7F6E\u662F\u5426\u6B63\u786E</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-file-import"></i>
                <span>\u5BFC\u5165\u5BFC\u51FA - \u65B9\u4FBF\u5907\u4EFD\u548C\u5206\u4EAB\u914D\u7F6E</span>
              </div>
            </div>
            
            <div class="yyt-version">
              \u63D2\u4EF6ID: ${f}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${f}-api-container"></div>
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${f}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,a=e.createElement("div");a.innerHTML=r,d=a.firstElementChild,e.body.appendChild(d),t(d).find(".yyt-popup-close").on("click",q),t(d).find(`#${f}-close-btn`).on("click",q),t(d).find(".yyt-nav-item").on("click",function(){let n=t(this).data("page");n&&At(n)}),g("\u5F39\u7A97\u5DF2\u6253\u5F00")}function D(){let t=k.jQuery||window.jQuery;if(!t){Ct("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(D,1e3);return}let e=k.document||document,r=t("#extensionsMenu",e);if(!r.length){g("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(D,2e3);return}if(t(`#${pt}`,r).length>0){g("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let n=t(`<div class="extension_container interactable" id="${pt}" tabindex="0"></div>`),i=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${_}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,c=t(i);c.on("click",async function(l){l.stopPropagation(),g("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let b=t("#extensionsMenuButton",e);b.length&&r.is(":visible")&&b.trigger("click"),St()}),n.append(c),r.append(n),g("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var dt={version:ut,id:f,init:It,openPopup:St,closePopup:q,switchPage:At,addMenuItem:D,getStorage:()=>H,getApiConnection:()=>h,getPresetManager:()=>G,getUiComponents:()=>Y,async getApiConfig(){return await M(),H?H.loadSettings().apiConfig:null},async saveApiConfig(t){return await M(),h?(h.updateApiConfig(t),!0):!1},async getPresets(){return await M(),G?G.getAllPresets():[]},async sendApiRequest(t,e){if(await M(),h)return h.sendApiRequest(t,e);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await M(),h?h.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function It(){if(g(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${ut}`),re(),await M()){if(g("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),Y){let r=k.document||document,a=`${f}-ui-styles`;if(!r.getElementById(a)){let n=r.createElement("style");n.id=a,n.textContent=Y.getStyles(),(r.head||r.documentElement).appendChild(n)}}}else g("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let e=k.document||document;e.readyState==="loading"?e.addEventListener("DOMContentLoaded",()=>{setTimeout(D,1e3)}):setTimeout(D,1e3),g("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=dt,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=dt}catch{}var fe=dt;It();g("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{fe as default};
