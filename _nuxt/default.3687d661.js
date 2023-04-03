import{_ as G}from"./nuxt-link.c5c8a2f0.js";import{g as y,at as J,d as Q,h as _,j as R,B as h,u as V,a0 as X,a as M,b as U,n as Y,R as ee,S as P,au as te,av as oe,a5 as ae,q as ne,ar as le,Z as j,aw as se,N as re,an as ie,_ as de,al as ce}from"./Dropdown.e94c147a.js";import{D as B,C as p,r as q,j as S,O as pe,N as me,t as fe,P as ue,M as he,m as T,p as b,F as A,z as L,u as xe,K as ge,B as ve,o as z,c as O,s as E,q as F}from"./entry.19f0300e.js";const _e=B({name:"ChevronLeft",render(){return p("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},p("path",{d:"M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z",fill:"currentColor"}))}}),{cubicBezierEaseInOut:v,cubicBezierEaseOut:be,cubicBezierEaseIn:Ce}=J;function we({overflow:e="hidden",duration:t=".3s",originalTransition:n="",leavingDelay:a="0s",foldPadding:l=!1,enterToProps:o=void 0,leaveToProps:d=void 0,reverse:c=!1}={}){const f=c?"leave":"enter",i=c?"enter":"leave";return[y(`&.fade-in-height-expand-transition-${i}-from,
 &.fade-in-height-expand-transition-${f}-to`,Object.assign(Object.assign({},o),{opacity:1})),y(`&.fade-in-height-expand-transition-${i}-to,
 &.fade-in-height-expand-transition-${f}-from`,Object.assign(Object.assign({},d),{opacity:0,marginTop:"0 !important",marginBottom:"0 !important",paddingTop:l?"0 !important":void 0,paddingBottom:l?"0 !important":void 0})),y(`&.fade-in-height-expand-transition-${i}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${v} ${a},
 opacity ${t} ${be} ${a},
 margin-top ${t} ${v} ${a},
 margin-bottom ${t} ${v} ${a},
 padding-top ${t} ${v} ${a},
 padding-bottom ${t} ${v} ${a}
 ${n?","+n:""}
 `),y(`&.fade-in-height-expand-transition-${f}-active`,`
 overflow: ${e};
 transition:
 max-height ${t} ${v},
 opacity ${t} ${Ce},
 margin-top ${t} ${v},
 margin-bottom ${t} ${v},
 padding-top ${t} ${v},
 padding-bottom ${t} ${v}
 ${n?","+n:""}
 `)]}const $e=e=>{const{fontWeight:t,textColor1:n,textColor2:a,textColorDisabled:l,dividerColor:o,fontSize:d}=e;return{titleFontSize:d,titleFontWeight:t,dividerColor:o,titleTextColor:n,titleTextColorDisabled:l,fontSize:d,textColor:a,arrowColor:a,arrowColorDisabled:l,itemMargin:"16px 0 0 0"}},ye={name:"Collapse",common:Q,self:$e},Ne=ye,Ee=_("collapse","width: 100%;",[_("collapse-item",`
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: var(--n-item-margin);
 `,[R("disabled",[h("header","cursor: not-allowed;",[h("header-main",`
 color: var(--n-title-text-color-disabled);
 `),_("collapse-item-arrow",`
 color: var(--n-arrow-color-disabled);
 `)])]),_("collapse-item","margin-left: 32px;"),y("&:first-child","margin-top: 0;"),y("&:first-child >",[h("header","padding-top: 0;")]),R("left-arrow-placement",[h("header",[_("collapse-item-arrow","margin-right: 4px;")])]),R("right-arrow-placement",[h("header",[_("collapse-item-arrow","margin-left: 4px;")])]),h("content-wrapper",[h("content-inner","padding-top: 16px;"),we({duration:"0.15s"})]),R("active",[h("header",[R("active",[_("collapse-item-arrow","transform: rotate(90deg);")])])]),y("&:not(:first-child)","border-top: 1px solid var(--n-divider-color);"),h("header",`
 font-size: var(--n-title-font-size);
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition: color .3s var(--n-bezier);
 position: relative;
 padding: 16px 0 0 0;
 color: var(--n-title-text-color);
 cursor: pointer;
 `,[h("header-main",`
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `),h("header-extra",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),_("collapse-item-arrow",`
 display: flex;
 transition:
 transform .15s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: 18px;
 color: var(--n-arrow-color);
 `)])])]),Re=Object.assign(Object.assign({},M.props),{defaultExpandedNames:{type:[Array,String],default:null},expandedNames:[Array,String],arrowPlacement:{type:String,default:"left"},accordion:{type:Boolean,default:!1},displayDirective:{type:String,default:"if"},onItemHeaderClick:[Function,Array],"onUpdate:expandedNames":[Function,Array],onUpdateExpandedNames:[Function,Array],onExpandedNamesChange:{type:[Function,Array],validator:()=>!0,default:void 0}}),W=ee("n-collapse"),ze=B({name:"Collapse",props:Re,setup(e,{slots:t}){const{mergedClsPrefixRef:n,inlineThemeDisabled:a,mergedRtlRef:l}=V(e),o=q(e.defaultExpandedNames),d=S(()=>e.expandedNames),c=X(d,o),f=M("Collapse","-collapse",Ee,Ne,e,n);function i(u){const{"onUpdate:expandedNames":r,onUpdateExpandedNames:g,onExpandedNamesChange:N}=e;g&&P(g,u),r&&P(r,u),N&&P(N,u),o.value=u}function m(u){const{onItemHeaderClick:r}=e;r&&P(r,u)}function s(u,r,g){const{accordion:N}=e,{value:I}=c;if(N)u?(i([r]),m({name:r,expanded:!0,event:g})):(i([]),m({name:r,expanded:!1,event:g}));else if(!Array.isArray(I))i([r]),m({name:r,expanded:!0,event:g});else{const $=I.slice(),k=$.findIndex(D=>r===D);~k?($.splice(k,1),i($),m({name:r,expanded:!1,event:g})):($.push(r),i($),m({name:r,expanded:!0,event:g}))}}pe(W,{props:e,mergedClsPrefixRef:n,expandedNamesRef:c,slots:t,toggleItem:s});const C=U("Collapse",l,n),w=S(()=>{const{common:{cubicBezierEaseInOut:u},self:{titleFontWeight:r,dividerColor:g,titleTextColor:N,titleTextColorDisabled:I,textColor:$,arrowColor:k,fontSize:D,titleFontSize:H,arrowColorDisabled:K,itemMargin:Z}}=f.value;return{"--n-font-size":D,"--n-bezier":u,"--n-text-color":$,"--n-divider-color":g,"--n-title-font-size":H,"--n-title-text-color":N,"--n-title-text-color-disabled":I,"--n-title-font-weight":r,"--n-arrow-color":k,"--n-arrow-color-disabled":K,"--n-item-margin":Z}}),x=a?Y("collapse",void 0,w,e):void 0;return{rtlEnabled:C,mergedTheme:f,mergedClsPrefix:n,cssVars:a?void 0:w,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),p("div",{class:[`${this.mergedClsPrefix}-collapse`,this.rtlEnabled&&`${this.mergedClsPrefix}-collapse--rtl`,this.themeClass],style:this.cssVars},this.$slots)}}),Se=B({name:"CollapseItemContent",props:{displayDirective:{type:String,required:!0},show:Boolean,clsPrefix:{type:String,required:!0}},setup(e){return{onceTrue:te(me(e,"show"))}},render(){return p(oe,null,{default:()=>{const{show:e,displayDirective:t,onceTrue:n,clsPrefix:a}=this,l=t==="show"&&n,o=p("div",{class:`${a}-collapse-item__content-wrapper`},p("div",{class:`${a}-collapse-item__content-inner`},this.$slots));return l?fe(o,[[ue,e]]):e?o:null}})}}),Ie={title:String,name:[String,Number],disabled:Boolean,displayDirective:String},ke=B({name:"CollapseItem",props:Ie,setup(e){const{mergedRtlRef:t}=V(e),n=ae(),a=ne(()=>{var s;return(s=e.name)!==null&&s!==void 0?s:n}),l=he(W);l||le("collapse-item","`n-collapse-item` must be placed inside `n-collapse`.");const{expandedNamesRef:o,props:d,mergedClsPrefixRef:c,slots:f}=l,i=S(()=>{const{value:s}=o;if(Array.isArray(s)){const{value:C}=a;return!~s.findIndex(w=>w===C)}else if(s){const{value:C}=a;return C!==s}return!0});return{rtlEnabled:U("Collapse",t,c),collapseSlots:f,randomName:n,mergedClsPrefix:c,collapsed:i,mergedDisplayDirective:S(()=>{const{displayDirective:s}=e;return s||d.displayDirective}),arrowPlacement:S(()=>d.arrowPlacement),handleClick(s){l&&!e.disabled&&l.toggleItem(i.value,a.value,s)}}},render(){const{collapseSlots:e,$slots:t,arrowPlacement:n,collapsed:a,mergedDisplayDirective:l,mergedClsPrefix:o,disabled:d}=this,c=j(t.header,{collapsed:a},()=>[this.title]),f=t["header-extra"]||e["header-extra"],i=t.arrow||e.arrow;return p("div",{class:[`${o}-collapse-item`,`${o}-collapse-item--${n}-arrow-placement`,d&&`${o}-collapse-item--disabled`,!a&&`${o}-collapse-item--active`]},p("div",{class:[`${o}-collapse-item__header`,!a&&`${o}-collapse-item__header--active`]},p("div",{class:`${o}-collapse-item__header-main`,onClick:this.handleClick},n==="right"&&c,p("div",{class:`${o}-collapse-item-arrow`,key:this.rtlEnabled?0:1},j(i,{collapsed:a},()=>{var m;return[p(re,{clsPrefix:o},{default:(m=e.expandIcon)!==null&&m!==void 0?m:()=>this.rtlEnabled?p(_e,null):p(ie,null)})]})),n==="left"&&c),se(f,{collapsed:a},m=>p("div",{class:`${o}-collapse-item__header-extra`,onClick:this.handleClick},m))),p(Se,{clsPrefix:o,displayDirective:l,show:!a},t))}}),Pe={class:"flex"},Fe={class:"bg-#F5F5F5 min-h-screen w-25% p-2"},Be=b("div",{class:"i-mdi:plus text-xl"},null,-1),De=[Be],Te=ve('<form action="" id="search" class="relative"><input class="pt-1 pb-1 pr-8 pl-10" type="text"><div class="w-5 p-1 absolute top-0 right-51 bg-none border-none"><div class="i-mdi:equal text-xl"></div></div></form><button class="w-7 h-26px border-none bg-#f5f5f5"><div class="i-mdi:dots-horizontal text-xl"></div></button>',2),je=b("p",{class:"text-green text-lg"},"Get",-1),Ae=b("p",null,"NewReques",-1),Le=b("div",{class:"i-mdi:dots-horizontal text-xl"},null,-1),Ue={__name:"default",setup(e){const t=q([]),n=()=>{let o={title:"New Collection",data:[]};t.value.push(o),console.log(o)},a=[{label:"Add Folder",key:1},{label:"Edit",key:2},{label:"Delete",key:3}],l=(o,d)=>{if(d===1){let c={title:"New Folder",data:[]};t.value[o].data.push(c)}else d===2&&console.log("key 2")};return(o,d)=>{const c=G,f=ke,i=de,m=ce,s=ze;return z(),T("div",Pe,[b("div",Fe,[b("div",{class:"flex"},[b("button",{class:"h-27px border-none bg-#f5f5f5",onClick:n},De),Te]),b("div",null,[(z(!0),T(A,null,L(xe(t),(C,w)=>(z(),O(s,{class:"flex justify-between mt-4",key:w},{default:E(()=>[F(f,{title:"New Collection",name:""},{default:E(()=>[(z(!0),T(A,null,L(C.data,(x,u)=>(z(),O(f,{title:x.title,key:u},{default:E(()=>[F(c,{to:"/detail",class:"flex space-x-2 decoration-none"},{default:E(()=>[je,Ae]),_:1})]),_:2},1032,["title"]))),128))]),_:2},1024),F(m,{placement:"bottom-start",trigger:"click",size:"small",options:a,onSelect:x=>l(w,x)},{default:E(()=>[F(i,{class:"p-2"},{default:E(()=>[Le]),_:1})]),_:2},1032,["onSelect"])]),_:2},1024))),128))])]),ge(o.$slots,"default")])}}};export{Ue as default};
