(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Fc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Es={exports:{}},ji={},js={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xr=Symbol.for("react.element"),Ac=Symbol.for("react.portal"),Uc=Symbol.for("react.fragment"),Bc=Symbol.for("react.strict_mode"),Vc=Symbol.for("react.profiler"),Hc=Symbol.for("react.provider"),Wc=Symbol.for("react.context"),Qc=Symbol.for("react.forward_ref"),Yc=Symbol.for("react.suspense"),Kc=Symbol.for("react.memo"),Xc=Symbol.for("react.lazy"),al=Symbol.iterator;function Gc(e){return e===null||typeof e!="object"?null:(e=al&&e[al]||e["@@iterator"],typeof e=="function"?e:null)}var Cs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zs=Object.assign,Ns={};function Pn(e,t,n){this.props=e,this.context=t,this.refs=Ns,this.updater=n||Cs}Pn.prototype.isReactComponent={};Pn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Pn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ps(){}Ps.prototype=Pn.prototype;function ua(e,t,n){this.props=e,this.context=t,this.refs=Ns,this.updater=n||Cs}var ca=ua.prototype=new Ps;ca.constructor=ua;zs(ca,Pn.prototype);ca.isPureReactComponent=!0;var ll=Array.isArray,_s=Object.prototype.hasOwnProperty,da={current:null},Ts={key:!0,ref:!0,__self:!0,__source:!0};function Ls(e,t,n){var r,i={},o=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(o=""+t.key),t)_s.call(t,r)&&!Ts.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var s=Array(l),f=0;f<l;f++)s[f]=arguments[f+2];i.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:xr,type:e,key:o,ref:a,props:i,_owner:da.current}}function Zc(e,t){return{$$typeof:xr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function pa(e){return typeof e=="object"&&e!==null&&e.$$typeof===xr}function Jc(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var sl=/\/+/g;function Bi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Jc(""+e.key):t.toString(36)}function Vr(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case xr:case Ac:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Bi(a,0):r,ll(i)?(n="",e!=null&&(n=e.replace(sl,"$&/")+"/"),Vr(i,t,n,"",function(f){return f})):i!=null&&(pa(i)&&(i=Zc(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(sl,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",ll(e))for(var l=0;l<e.length;l++){o=e[l];var s=r+Bi(o,l);a+=Vr(o,t,n,s,i)}else if(s=Gc(e),typeof s=="function")for(e=s.call(e),l=0;!(o=e.next()).done;)o=o.value,s=r+Bi(o,l++),a+=Vr(o,t,n,s,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function jr(e,t,n){if(e==null)return e;var r=[],i=0;return Vr(e,r,"","",function(o){return t.call(n,o,i++)}),r}function qc(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Se={current:null},Hr={transition:null},ed={ReactCurrentDispatcher:Se,ReactCurrentBatchConfig:Hr,ReactCurrentOwner:da};function Ms(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:jr,forEach:function(e,t,n){jr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return jr(e,function(){t++}),t},toArray:function(e){return jr(e,function(t){return t})||[]},only:function(e){if(!pa(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Pn;U.Fragment=Uc;U.Profiler=Vc;U.PureComponent=ua;U.StrictMode=Bc;U.Suspense=Yc;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ed;U.act=Ms;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=zs({},e.props),i=e.key,o=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,a=da.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)_s.call(t,s)&&!Ts.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&l!==void 0?l[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){l=Array(s);for(var f=0;f<s;f++)l[f]=arguments[f+2];r.children=l}return{$$typeof:xr,type:e.type,key:i,ref:o,props:r,_owner:a}};U.createContext=function(e){return e={$$typeof:Wc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Hc,_context:e},e.Consumer=e};U.createElement=Ls;U.createFactory=function(e){var t=Ls.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:Qc,render:e}};U.isValidElement=pa;U.lazy=function(e){return{$$typeof:Xc,_payload:{_status:-1,_result:e},_init:qc}};U.memo=function(e,t){return{$$typeof:Kc,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=Hr.transition;Hr.transition={};try{e()}finally{Hr.transition=t}};U.unstable_act=Ms;U.useCallback=function(e,t){return Se.current.useCallback(e,t)};U.useContext=function(e){return Se.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return Se.current.useDeferredValue(e)};U.useEffect=function(e,t){return Se.current.useEffect(e,t)};U.useId=function(){return Se.current.useId()};U.useImperativeHandle=function(e,t,n){return Se.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return Se.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return Se.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return Se.current.useMemo(e,t)};U.useReducer=function(e,t,n){return Se.current.useReducer(e,t,n)};U.useRef=function(e){return Se.current.useRef(e)};U.useState=function(e){return Se.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return Se.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return Se.current.useTransition()};U.version="18.3.1";js.exports=U;var _=js.exports;const td=Fc(_);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nd=_,rd=Symbol.for("react.element"),id=Symbol.for("react.fragment"),od=Object.prototype.hasOwnProperty,ad=nd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ld={key:!0,ref:!0,__self:!0,__source:!0};function Ds(e,t,n){var r,i={},o=null,a=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)od.call(t,r)&&!ld.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:rd,type:e,key:o,ref:a,props:i,_owner:ad.current}}ji.Fragment=id;ji.jsx=Ds;ji.jsxs=Ds;Es.exports=ji;var d=Es.exports,Rs={exports:{}},Oe={},$s={exports:{}},Os={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(j,T){var M=j.length;j.push(T);e:for(;0<M;){var B=M-1>>>1,Z=j[B];if(0<i(Z,T))j[B]=T,j[M]=Z,M=B;else break e}}function n(j){return j.length===0?null:j[0]}function r(j){if(j.length===0)return null;var T=j[0],M=j.pop();if(M!==T){j[0]=M;e:for(var B=0,Z=j.length,P=Z>>>1;B<P;){var L=2*(B+1)-1,A=j[L],R=L+1,O=j[R];if(0>i(A,M))R<Z&&0>i(O,A)?(j[B]=O,j[R]=M,B=R):(j[B]=A,j[L]=M,B=L);else if(R<Z&&0>i(O,M))j[B]=O,j[R]=M,B=R;else break e}}return T}function i(j,T){var M=j.sortIndex-T.sortIndex;return M!==0?M:j.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var s=[],f=[],g=1,v=null,m=3,y=!1,p=!1,k=!1,$=typeof setTimeout=="function"?setTimeout:null,c=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(j){for(var T=n(f);T!==null;){if(T.callback===null)r(f);else if(T.startTime<=j)r(f),T.sortIndex=T.expirationTime,t(s,T);else break;T=n(f)}}function x(j){if(k=!1,h(j),!p)if(n(s)!==null)p=!0,we(b);else{var T=n(f);T!==null&&Qe(x,T.startTime-j)}}function b(j,T){p=!1,k&&(k=!1,c(E),E=-1),y=!0;var M=m;try{for(h(T),v=n(s);v!==null&&(!(v.expirationTime>T)||j&&!de());){var B=v.callback;if(typeof B=="function"){v.callback=null,m=v.priorityLevel;var Z=B(v.expirationTime<=T);T=e.unstable_now(),typeof Z=="function"?v.callback=Z:v===n(s)&&r(s),h(T)}else r(s);v=n(s)}if(v!==null)var P=!0;else{var L=n(f);L!==null&&Qe(x,L.startTime-T),P=!1}return P}finally{v=null,m=M,y=!1}}var S=!1,N=null,E=-1,Q=5,I=-1;function de(){return!(e.unstable_now()-I<Q)}function et(){if(N!==null){var j=e.unstable_now();I=j;var T=!0;try{T=N(!0,j)}finally{T?Fe():(S=!1,N=null)}}else S=!1}var Fe;if(typeof u=="function")Fe=function(){u(et)};else if(typeof MessageChannel<"u"){var en=new MessageChannel,tt=en.port2;en.port1.onmessage=et,Fe=function(){tt.postMessage(null)}}else Fe=function(){$(et,0)};function we(j){N=j,S||(S=!0,Fe())}function Qe(j,T){E=$(function(){j(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(j){j.callback=null},e.unstable_continueExecution=function(){p||y||(p=!0,we(b))},e.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<j?Math.floor(1e3/j):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(j){switch(m){case 1:case 2:case 3:var T=3;break;default:T=m}var M=m;m=T;try{return j()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(j,T){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var M=m;m=j;try{return T()}finally{m=M}},e.unstable_scheduleCallback=function(j,T,M){var B=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?B+M:B):M=B,j){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=M+Z,j={id:g++,callback:T,priorityLevel:j,startTime:M,expirationTime:Z,sortIndex:-1},M>B?(j.sortIndex=M,t(f,j),n(s)===null&&j===n(f)&&(k?(c(E),E=-1):k=!0,Qe(x,M-B))):(j.sortIndex=Z,t(s,j),p||y||(p=!0,we(b))),j},e.unstable_shouldYield=de,e.unstable_wrapCallback=function(j){var T=m;return function(){var M=m;m=T;try{return j.apply(this,arguments)}finally{m=M}}}})(Os);$s.exports=Os;var sd=$s.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ud=_,$e=sd;function w(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Is=new Set,er={};function Jt(e,t){kn(e,t),kn(e+"Capture",t)}function kn(e,t){for(er[e]=t,e=0;e<t.length;e++)Is.add(t[e])}var mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),go=Object.prototype.hasOwnProperty,cd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ul={},cl={};function dd(e){return go.call(cl,e)?!0:go.call(ul,e)?!1:cd.test(e)?cl[e]=!0:(ul[e]=!0,!1)}function pd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function fd(e,t,n,r){if(t===null||typeof t>"u"||pd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ee(e,t,n,r,i,o,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){me[e]=new Ee(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];me[t]=new Ee(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){me[e]=new Ee(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){me[e]=new Ee(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){me[e]=new Ee(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){me[e]=new Ee(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){me[e]=new Ee(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){me[e]=new Ee(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){me[e]=new Ee(e,5,!1,e.toLowerCase(),null,!1,!1)});var fa=/[\-:]([a-z])/g;function ma(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(fa,ma);me[t]=new Ee(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(fa,ma);me[t]=new Ee(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(fa,ma);me[t]=new Ee(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){me[e]=new Ee(e,1,!1,e.toLowerCase(),null,!1,!1)});me.xlinkHref=new Ee("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){me[e]=new Ee(e,1,!1,e.toLowerCase(),null,!0,!0)});function ha(e,t,n,r){var i=me.hasOwnProperty(t)?me[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(fd(t,n,i,r)&&(n=null),r||i===null?dd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var xt=ud.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Cr=Symbol.for("react.element"),rn=Symbol.for("react.portal"),on=Symbol.for("react.fragment"),ga=Symbol.for("react.strict_mode"),vo=Symbol.for("react.profiler"),Fs=Symbol.for("react.provider"),As=Symbol.for("react.context"),va=Symbol.for("react.forward_ref"),xo=Symbol.for("react.suspense"),yo=Symbol.for("react.suspense_list"),xa=Symbol.for("react.memo"),wt=Symbol.for("react.lazy"),Us=Symbol.for("react.offscreen"),dl=Symbol.iterator;function Ln(e){return e===null||typeof e!="object"?null:(e=dl&&e[dl]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Object.assign,Vi;function An(e){if(Vi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Vi=t&&t[1]||""}return`
`+Vi+e}var Hi=!1;function Wi(e,t){if(!e||Hi)return"";Hi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(f){var r=f}Reflect.construct(e,[],t)}else{try{t.call()}catch(f){r=f}e.call(t.prototype)}else{try{throw Error()}catch(f){r=f}e()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var i=f.stack.split(`
`),o=r.stack.split(`
`),a=i.length-1,l=o.length-1;1<=a&&0<=l&&i[a]!==o[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==o[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==o[l]){var s=`
`+i[a].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=a&&0<=l);break}}}finally{Hi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?An(e):""}function md(e){switch(e.tag){case 5:return An(e.type);case 16:return An("Lazy");case 13:return An("Suspense");case 19:return An("SuspenseList");case 0:case 2:case 15:return e=Wi(e.type,!1),e;case 11:return e=Wi(e.type.render,!1),e;case 1:return e=Wi(e.type,!0),e;default:return""}}function wo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case on:return"Fragment";case rn:return"Portal";case vo:return"Profiler";case ga:return"StrictMode";case xo:return"Suspense";case yo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case As:return(e.displayName||"Context")+".Consumer";case Fs:return(e._context.displayName||"Context")+".Provider";case va:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case xa:return t=e.displayName||null,t!==null?t:wo(e.type)||"Memo";case wt:t=e._payload,e=e._init;try{return wo(e(t))}catch{}}return null}function hd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return wo(t);case 8:return t===ga?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Dt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function gd(e){var t=Bs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,o.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function zr(e){e._valueTracker||(e._valueTracker=gd(e))}function Vs(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Bs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ti(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function bo(e,t){var n=t.checked;return ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function pl(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Dt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Hs(e,t){t=t.checked,t!=null&&ha(e,"checked",t,!1)}function ko(e,t){Hs(e,t);var n=Dt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?So(e,t.type,n):t.hasOwnProperty("defaultValue")&&So(e,t.type,Dt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function fl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function So(e,t,n){(t!=="number"||ti(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Un=Array.isArray;function gn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Dt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Eo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(w(91));return ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ml(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(w(92));if(Un(n)){if(1<n.length)throw Error(w(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Dt(n)}}function Ws(e,t){var n=Dt(t.value),r=Dt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function hl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Qs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function jo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Qs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Nr,Ys=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Nr=Nr||document.createElement("div"),Nr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Nr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function tr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Hn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},vd=["Webkit","ms","Moz","O"];Object.keys(Hn).forEach(function(e){vd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Hn[t]=Hn[e]})});function Ks(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Hn.hasOwnProperty(e)&&Hn[e]?(""+t).trim():t+"px"}function Xs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Ks(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var xd=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Co(e,t){if(t){if(xd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(w(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(w(61))}if(t.style!=null&&typeof t.style!="object")throw Error(w(62))}}function zo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var No=null;function ya(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Po=null,vn=null,xn=null;function gl(e){if(e=br(e)){if(typeof Po!="function")throw Error(w(280));var t=e.stateNode;t&&(t=_i(t),Po(e.stateNode,e.type,t))}}function Gs(e){vn?xn?xn.push(e):xn=[e]:vn=e}function Zs(){if(vn){var e=vn,t=xn;if(xn=vn=null,gl(e),t)for(e=0;e<t.length;e++)gl(t[e])}}function Js(e,t){return e(t)}function qs(){}var Qi=!1;function eu(e,t,n){if(Qi)return e(t,n);Qi=!0;try{return Js(e,t,n)}finally{Qi=!1,(vn!==null||xn!==null)&&(qs(),Zs())}}function nr(e,t){var n=e.stateNode;if(n===null)return null;var r=_i(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(w(231,t,typeof n));return n}var _o=!1;if(mt)try{var Mn={};Object.defineProperty(Mn,"passive",{get:function(){_o=!0}}),window.addEventListener("test",Mn,Mn),window.removeEventListener("test",Mn,Mn)}catch{_o=!1}function yd(e,t,n,r,i,o,a,l,s){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(g){this.onError(g)}}var Wn=!1,ni=null,ri=!1,To=null,wd={onError:function(e){Wn=!0,ni=e}};function bd(e,t,n,r,i,o,a,l,s){Wn=!1,ni=null,yd.apply(wd,arguments)}function kd(e,t,n,r,i,o,a,l,s){if(bd.apply(this,arguments),Wn){if(Wn){var f=ni;Wn=!1,ni=null}else throw Error(w(198));ri||(ri=!0,To=f)}}function qt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function tu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function vl(e){if(qt(e)!==e)throw Error(w(188))}function Sd(e){var t=e.alternate;if(!t){if(t=qt(e),t===null)throw Error(w(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return vl(i),e;if(o===r)return vl(i),t;o=o.sibling}throw Error(w(188))}if(n.return!==r.return)n=i,r=o;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=o;break}if(l===r){a=!0,r=i,n=o;break}l=l.sibling}if(!a){for(l=o.child;l;){if(l===n){a=!0,n=o,r=i;break}if(l===r){a=!0,r=o,n=i;break}l=l.sibling}if(!a)throw Error(w(189))}}if(n.alternate!==r)throw Error(w(190))}if(n.tag!==3)throw Error(w(188));return n.stateNode.current===n?e:t}function nu(e){return e=Sd(e),e!==null?ru(e):null}function ru(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ru(e);if(t!==null)return t;e=e.sibling}return null}var iu=$e.unstable_scheduleCallback,xl=$e.unstable_cancelCallback,Ed=$e.unstable_shouldYield,jd=$e.unstable_requestPaint,ie=$e.unstable_now,Cd=$e.unstable_getCurrentPriorityLevel,wa=$e.unstable_ImmediatePriority,ou=$e.unstable_UserBlockingPriority,ii=$e.unstable_NormalPriority,zd=$e.unstable_LowPriority,au=$e.unstable_IdlePriority,Ci=null,ot=null;function Nd(e){if(ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Ci,e,void 0,(e.current.flags&128)===128)}catch{}}var Ze=Math.clz32?Math.clz32:Td,Pd=Math.log,_d=Math.LN2;function Td(e){return e>>>=0,e===0?32:31-(Pd(e)/_d|0)|0}var Pr=64,_r=4194304;function Bn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function oi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=Bn(l):(o&=a,o!==0&&(r=Bn(o)))}else a=n&~i,a!==0?r=Bn(a):o!==0&&(r=Bn(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ze(t),i=1<<n,r|=e[n],t&=~i;return r}function Ld(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Md(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-Ze(o),l=1<<a,s=i[a];s===-1?(!(l&n)||l&r)&&(i[a]=Ld(l,t)):s<=t&&(e.expiredLanes|=l),o&=~l}}function Lo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function lu(){var e=Pr;return Pr<<=1,!(Pr&4194240)&&(Pr=64),e}function Yi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function yr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ze(t),e[t]=n}function Dd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Ze(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function ba(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ze(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var W=0;function su(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var uu,ka,cu,du,pu,Mo=!1,Tr=[],Ct=null,zt=null,Nt=null,rr=new Map,ir=new Map,kt=[],Rd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function yl(e,t){switch(e){case"focusin":case"focusout":Ct=null;break;case"dragenter":case"dragleave":zt=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":rr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ir.delete(t.pointerId)}}function Dn(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=br(t),t!==null&&ka(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function $d(e,t,n,r,i){switch(t){case"focusin":return Ct=Dn(Ct,e,t,n,r,i),!0;case"dragenter":return zt=Dn(zt,e,t,n,r,i),!0;case"mouseover":return Nt=Dn(Nt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return rr.set(o,Dn(rr.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,ir.set(o,Dn(ir.get(o)||null,e,t,n,r,i)),!0}return!1}function fu(e){var t=Bt(e.target);if(t!==null){var n=qt(t);if(n!==null){if(t=n.tag,t===13){if(t=tu(n),t!==null){e.blockedOn=t,pu(e.priority,function(){cu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Wr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Do(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);No=r,n.target.dispatchEvent(r),No=null}else return t=br(n),t!==null&&ka(t),e.blockedOn=n,!1;t.shift()}return!0}function wl(e,t,n){Wr(e)&&n.delete(t)}function Od(){Mo=!1,Ct!==null&&Wr(Ct)&&(Ct=null),zt!==null&&Wr(zt)&&(zt=null),Nt!==null&&Wr(Nt)&&(Nt=null),rr.forEach(wl),ir.forEach(wl)}function Rn(e,t){e.blockedOn===t&&(e.blockedOn=null,Mo||(Mo=!0,$e.unstable_scheduleCallback($e.unstable_NormalPriority,Od)))}function or(e){function t(i){return Rn(i,e)}if(0<Tr.length){Rn(Tr[0],e);for(var n=1;n<Tr.length;n++){var r=Tr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ct!==null&&Rn(Ct,e),zt!==null&&Rn(zt,e),Nt!==null&&Rn(Nt,e),rr.forEach(t),ir.forEach(t),n=0;n<kt.length;n++)r=kt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<kt.length&&(n=kt[0],n.blockedOn===null);)fu(n),n.blockedOn===null&&kt.shift()}var yn=xt.ReactCurrentBatchConfig,ai=!0;function Id(e,t,n,r){var i=W,o=yn.transition;yn.transition=null;try{W=1,Sa(e,t,n,r)}finally{W=i,yn.transition=o}}function Fd(e,t,n,r){var i=W,o=yn.transition;yn.transition=null;try{W=4,Sa(e,t,n,r)}finally{W=i,yn.transition=o}}function Sa(e,t,n,r){if(ai){var i=Do(e,t,n,r);if(i===null)ro(e,t,r,li,n),yl(e,r);else if($d(i,e,t,n,r))r.stopPropagation();else if(yl(e,r),t&4&&-1<Rd.indexOf(e)){for(;i!==null;){var o=br(i);if(o!==null&&uu(o),o=Do(e,t,n,r),o===null&&ro(e,t,r,li,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else ro(e,t,r,null,n)}}var li=null;function Do(e,t,n,r){if(li=null,e=ya(r),e=Bt(e),e!==null)if(t=qt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=tu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return li=e,null}function mu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Cd()){case wa:return 1;case ou:return 4;case ii:case zd:return 16;case au:return 536870912;default:return 16}default:return 16}}var Et=null,Ea=null,Qr=null;function hu(){if(Qr)return Qr;var e,t=Ea,n=t.length,r,i="value"in Et?Et.value:Et.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[o-r];r++);return Qr=i.slice(e,1<r?1-r:void 0)}function Yr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Lr(){return!0}function bl(){return!1}function Ie(e){function t(n,r,i,o,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Lr:bl,this.isPropagationStopped=bl,this}return ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Lr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Lr)},persist:function(){},isPersistent:Lr}),t}var _n={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ja=Ie(_n),wr=ee({},_n,{view:0,detail:0}),Ad=Ie(wr),Ki,Xi,$n,zi=ee({},wr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ca,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==$n&&($n&&e.type==="mousemove"?(Ki=e.screenX-$n.screenX,Xi=e.screenY-$n.screenY):Xi=Ki=0,$n=e),Ki)},movementY:function(e){return"movementY"in e?e.movementY:Xi}}),kl=Ie(zi),Ud=ee({},zi,{dataTransfer:0}),Bd=Ie(Ud),Vd=ee({},wr,{relatedTarget:0}),Gi=Ie(Vd),Hd=ee({},_n,{animationName:0,elapsedTime:0,pseudoElement:0}),Wd=Ie(Hd),Qd=ee({},_n,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Yd=Ie(Qd),Kd=ee({},_n,{data:0}),Sl=Ie(Kd),Xd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Jd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zd[e])?!!t[e]:!1}function Ca(){return Jd}var qd=ee({},wr,{key:function(e){if(e.key){var t=Xd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Yr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ca,charCode:function(e){return e.type==="keypress"?Yr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Yr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ep=Ie(qd),tp=ee({},zi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),El=Ie(tp),np=ee({},wr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ca}),rp=Ie(np),ip=ee({},_n,{propertyName:0,elapsedTime:0,pseudoElement:0}),op=Ie(ip),ap=ee({},zi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),lp=Ie(ap),sp=[9,13,27,32],za=mt&&"CompositionEvent"in window,Qn=null;mt&&"documentMode"in document&&(Qn=document.documentMode);var up=mt&&"TextEvent"in window&&!Qn,gu=mt&&(!za||Qn&&8<Qn&&11>=Qn),jl=" ",Cl=!1;function vu(e,t){switch(e){case"keyup":return sp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var an=!1;function cp(e,t){switch(e){case"compositionend":return xu(t);case"keypress":return t.which!==32?null:(Cl=!0,jl);case"textInput":return e=t.data,e===jl&&Cl?null:e;default:return null}}function dp(e,t){if(an)return e==="compositionend"||!za&&vu(e,t)?(e=hu(),Qr=Ea=Et=null,an=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return gu&&t.locale!=="ko"?null:t.data;default:return null}}var pp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!pp[e.type]:t==="textarea"}function yu(e,t,n,r){Gs(r),t=si(t,"onChange"),0<t.length&&(n=new ja("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Yn=null,ar=null;function fp(e){_u(e,0)}function Ni(e){var t=un(e);if(Vs(t))return e}function mp(e,t){if(e==="change")return t}var wu=!1;if(mt){var Zi;if(mt){var Ji="oninput"in document;if(!Ji){var Nl=document.createElement("div");Nl.setAttribute("oninput","return;"),Ji=typeof Nl.oninput=="function"}Zi=Ji}else Zi=!1;wu=Zi&&(!document.documentMode||9<document.documentMode)}function Pl(){Yn&&(Yn.detachEvent("onpropertychange",bu),ar=Yn=null)}function bu(e){if(e.propertyName==="value"&&Ni(ar)){var t=[];yu(t,ar,e,ya(e)),eu(fp,t)}}function hp(e,t,n){e==="focusin"?(Pl(),Yn=t,ar=n,Yn.attachEvent("onpropertychange",bu)):e==="focusout"&&Pl()}function gp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ni(ar)}function vp(e,t){if(e==="click")return Ni(t)}function xp(e,t){if(e==="input"||e==="change")return Ni(t)}function yp(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var qe=typeof Object.is=="function"?Object.is:yp;function lr(e,t){if(qe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!go.call(t,i)||!qe(e[i],t[i]))return!1}return!0}function _l(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Tl(e,t){var n=_l(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=_l(n)}}function ku(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ku(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Su(){for(var e=window,t=ti();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ti(e.document)}return t}function Na(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function wp(e){var t=Su(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ku(n.ownerDocument.documentElement,n)){if(r!==null&&Na(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Tl(n,o);var a=Tl(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var bp=mt&&"documentMode"in document&&11>=document.documentMode,ln=null,Ro=null,Kn=null,$o=!1;function Ll(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$o||ln==null||ln!==ti(r)||(r=ln,"selectionStart"in r&&Na(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Kn&&lr(Kn,r)||(Kn=r,r=si(Ro,"onSelect"),0<r.length&&(t=new ja("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=ln)))}function Mr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var sn={animationend:Mr("Animation","AnimationEnd"),animationiteration:Mr("Animation","AnimationIteration"),animationstart:Mr("Animation","AnimationStart"),transitionend:Mr("Transition","TransitionEnd")},qi={},Eu={};mt&&(Eu=document.createElement("div").style,"AnimationEvent"in window||(delete sn.animationend.animation,delete sn.animationiteration.animation,delete sn.animationstart.animation),"TransitionEvent"in window||delete sn.transitionend.transition);function Pi(e){if(qi[e])return qi[e];if(!sn[e])return e;var t=sn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Eu)return qi[e]=t[n];return e}var ju=Pi("animationend"),Cu=Pi("animationiteration"),zu=Pi("animationstart"),Nu=Pi("transitionend"),Pu=new Map,Ml="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function $t(e,t){Pu.set(e,t),Jt(t,[e])}for(var eo=0;eo<Ml.length;eo++){var to=Ml[eo],kp=to.toLowerCase(),Sp=to[0].toUpperCase()+to.slice(1);$t(kp,"on"+Sp)}$t(ju,"onAnimationEnd");$t(Cu,"onAnimationIteration");$t(zu,"onAnimationStart");$t("dblclick","onDoubleClick");$t("focusin","onFocus");$t("focusout","onBlur");$t(Nu,"onTransitionEnd");kn("onMouseEnter",["mouseout","mouseover"]);kn("onMouseLeave",["mouseout","mouseover"]);kn("onPointerEnter",["pointerout","pointerover"]);kn("onPointerLeave",["pointerout","pointerover"]);Jt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ep=new Set("cancel close invalid load scroll toggle".split(" ").concat(Vn));function Dl(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,kd(r,t,void 0,e),e.currentTarget=null}function _u(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],s=l.instance,f=l.currentTarget;if(l=l.listener,s!==o&&i.isPropagationStopped())break e;Dl(i,l,f),o=s}else for(a=0;a<r.length;a++){if(l=r[a],s=l.instance,f=l.currentTarget,l=l.listener,s!==o&&i.isPropagationStopped())break e;Dl(i,l,f),o=s}}}if(ri)throw e=To,ri=!1,To=null,e}function K(e,t){var n=t[Uo];n===void 0&&(n=t[Uo]=new Set);var r=e+"__bubble";n.has(r)||(Tu(t,e,2,!1),n.add(r))}function no(e,t,n){var r=0;t&&(r|=4),Tu(n,e,r,t)}var Dr="_reactListening"+Math.random().toString(36).slice(2);function sr(e){if(!e[Dr]){e[Dr]=!0,Is.forEach(function(n){n!=="selectionchange"&&(Ep.has(n)||no(n,!1,e),no(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Dr]||(t[Dr]=!0,no("selectionchange",!1,t))}}function Tu(e,t,n,r){switch(mu(t)){case 1:var i=Id;break;case 4:i=Fd;break;default:i=Sa}n=i.bind(null,t,n,e),i=void 0,!_o||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function ro(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var s=a.tag;if((s===3||s===4)&&(s=a.stateNode.containerInfo,s===i||s.nodeType===8&&s.parentNode===i))return;a=a.return}for(;l!==null;){if(a=Bt(l),a===null)return;if(s=a.tag,s===5||s===6){r=o=a;continue e}l=l.parentNode}}r=r.return}eu(function(){var f=o,g=ya(n),v=[];e:{var m=Pu.get(e);if(m!==void 0){var y=ja,p=e;switch(e){case"keypress":if(Yr(n)===0)break e;case"keydown":case"keyup":y=ep;break;case"focusin":p="focus",y=Gi;break;case"focusout":p="blur",y=Gi;break;case"beforeblur":case"afterblur":y=Gi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=kl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Bd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=rp;break;case ju:case Cu:case zu:y=Wd;break;case Nu:y=op;break;case"scroll":y=Ad;break;case"wheel":y=lp;break;case"copy":case"cut":case"paste":y=Yd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=El}var k=(t&4)!==0,$=!k&&e==="scroll",c=k?m!==null?m+"Capture":null:m;k=[];for(var u=f,h;u!==null;){h=u;var x=h.stateNode;if(h.tag===5&&x!==null&&(h=x,c!==null&&(x=nr(u,c),x!=null&&k.push(ur(u,x,h)))),$)break;u=u.return}0<k.length&&(m=new y(m,p,null,n,g),v.push({event:m,listeners:k}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",m&&n!==No&&(p=n.relatedTarget||n.fromElement)&&(Bt(p)||p[ht]))break e;if((y||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,y?(p=n.relatedTarget||n.toElement,y=f,p=p?Bt(p):null,p!==null&&($=qt(p),p!==$||p.tag!==5&&p.tag!==6)&&(p=null)):(y=null,p=f),y!==p)){if(k=kl,x="onMouseLeave",c="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(k=El,x="onPointerLeave",c="onPointerEnter",u="pointer"),$=y==null?m:un(y),h=p==null?m:un(p),m=new k(x,u+"leave",y,n,g),m.target=$,m.relatedTarget=h,x=null,Bt(g)===f&&(k=new k(c,u+"enter",p,n,g),k.target=h,k.relatedTarget=$,x=k),$=x,y&&p)t:{for(k=y,c=p,u=0,h=k;h;h=nn(h))u++;for(h=0,x=c;x;x=nn(x))h++;for(;0<u-h;)k=nn(k),u--;for(;0<h-u;)c=nn(c),h--;for(;u--;){if(k===c||c!==null&&k===c.alternate)break t;k=nn(k),c=nn(c)}k=null}else k=null;y!==null&&Rl(v,m,y,k,!1),p!==null&&$!==null&&Rl(v,$,p,k,!0)}}e:{if(m=f?un(f):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var b=mp;else if(zl(m))if(wu)b=xp;else{b=gp;var S=hp}else(y=m.nodeName)&&y.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(b=vp);if(b&&(b=b(e,f))){yu(v,b,n,g);break e}S&&S(e,m,f),e==="focusout"&&(S=m._wrapperState)&&S.controlled&&m.type==="number"&&So(m,"number",m.value)}switch(S=f?un(f):window,e){case"focusin":(zl(S)||S.contentEditable==="true")&&(ln=S,Ro=f,Kn=null);break;case"focusout":Kn=Ro=ln=null;break;case"mousedown":$o=!0;break;case"contextmenu":case"mouseup":case"dragend":$o=!1,Ll(v,n,g);break;case"selectionchange":if(bp)break;case"keydown":case"keyup":Ll(v,n,g)}var N;if(za)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else an?vu(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(gu&&n.locale!=="ko"&&(an||E!=="onCompositionStart"?E==="onCompositionEnd"&&an&&(N=hu()):(Et=g,Ea="value"in Et?Et.value:Et.textContent,an=!0)),S=si(f,E),0<S.length&&(E=new Sl(E,e,null,n,g),v.push({event:E,listeners:S}),N?E.data=N:(N=xu(n),N!==null&&(E.data=N)))),(N=up?cp(e,n):dp(e,n))&&(f=si(f,"onBeforeInput"),0<f.length&&(g=new Sl("onBeforeInput","beforeinput",null,n,g),v.push({event:g,listeners:f}),g.data=N))}_u(v,t)})}function ur(e,t,n){return{instance:e,listener:t,currentTarget:n}}function si(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=nr(e,n),o!=null&&r.unshift(ur(e,o,i)),o=nr(e,t),o!=null&&r.push(ur(e,o,i))),e=e.return}return r}function nn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Rl(e,t,n,r,i){for(var o=t._reactName,a=[];n!==null&&n!==r;){var l=n,s=l.alternate,f=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&f!==null&&(l=f,i?(s=nr(n,o),s!=null&&a.unshift(ur(n,s,l))):i||(s=nr(n,o),s!=null&&a.push(ur(n,s,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var jp=/\r\n?/g,Cp=/\u0000|\uFFFD/g;function $l(e){return(typeof e=="string"?e:""+e).replace(jp,`
`).replace(Cp,"")}function Rr(e,t,n){if(t=$l(t),$l(e)!==t&&n)throw Error(w(425))}function ui(){}var Oo=null,Io=null;function Fo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ao=typeof setTimeout=="function"?setTimeout:void 0,zp=typeof clearTimeout=="function"?clearTimeout:void 0,Ol=typeof Promise=="function"?Promise:void 0,Np=typeof queueMicrotask=="function"?queueMicrotask:typeof Ol<"u"?function(e){return Ol.resolve(null).then(e).catch(Pp)}:Ao;function Pp(e){setTimeout(function(){throw e})}function io(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),or(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);or(t)}function Pt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Il(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Tn=Math.random().toString(36).slice(2),it="__reactFiber$"+Tn,cr="__reactProps$"+Tn,ht="__reactContainer$"+Tn,Uo="__reactEvents$"+Tn,_p="__reactListeners$"+Tn,Tp="__reactHandles$"+Tn;function Bt(e){var t=e[it];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ht]||n[it]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Il(e);e!==null;){if(n=e[it])return n;e=Il(e)}return t}e=n,n=e.parentNode}return null}function br(e){return e=e[it]||e[ht],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function _i(e){return e[cr]||null}var Bo=[],cn=-1;function Ot(e){return{current:e}}function X(e){0>cn||(e.current=Bo[cn],Bo[cn]=null,cn--)}function Y(e,t){cn++,Bo[cn]=e.current,e.current=t}var Rt={},ye=Ot(Rt),Pe=Ot(!1),Yt=Rt;function Sn(e,t){var n=e.type.contextTypes;if(!n)return Rt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function _e(e){return e=e.childContextTypes,e!=null}function ci(){X(Pe),X(ye)}function Fl(e,t,n){if(ye.current!==Rt)throw Error(w(168));Y(ye,t),Y(Pe,n)}function Lu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(w(108,hd(e)||"Unknown",i));return ee({},n,r)}function di(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rt,Yt=ye.current,Y(ye,e),Y(Pe,Pe.current),!0}function Al(e,t,n){var r=e.stateNode;if(!r)throw Error(w(169));n?(e=Lu(e,t,Yt),r.__reactInternalMemoizedMergedChildContext=e,X(Pe),X(ye),Y(ye,e)):X(Pe),Y(Pe,n)}var ct=null,Ti=!1,oo=!1;function Mu(e){ct===null?ct=[e]:ct.push(e)}function Lp(e){Ti=!0,Mu(e)}function It(){if(!oo&&ct!==null){oo=!0;var e=0,t=W;try{var n=ct;for(W=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ct=null,Ti=!1}catch(i){throw ct!==null&&(ct=ct.slice(e+1)),iu(wa,It),i}finally{W=t,oo=!1}}return null}var dn=[],pn=0,pi=null,fi=0,Ae=[],Ue=0,Kt=null,dt=1,pt="";function At(e,t){dn[pn++]=fi,dn[pn++]=pi,pi=e,fi=t}function Du(e,t,n){Ae[Ue++]=dt,Ae[Ue++]=pt,Ae[Ue++]=Kt,Kt=e;var r=dt;e=pt;var i=32-Ze(r)-1;r&=~(1<<i),n+=1;var o=32-Ze(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,dt=1<<32-Ze(t)+i|n<<i|r,pt=o+e}else dt=1<<o|n<<i|r,pt=e}function Pa(e){e.return!==null&&(At(e,1),Du(e,1,0))}function _a(e){for(;e===pi;)pi=dn[--pn],dn[pn]=null,fi=dn[--pn],dn[pn]=null;for(;e===Kt;)Kt=Ae[--Ue],Ae[Ue]=null,pt=Ae[--Ue],Ae[Ue]=null,dt=Ae[--Ue],Ae[Ue]=null}var Re=null,De=null,G=!1,Ge=null;function Ru(e,t){var n=Be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ul(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Re=e,De=Pt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Re=e,De=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Kt!==null?{id:dt,overflow:pt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Re=e,De=null,!0):!1;default:return!1}}function Vo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ho(e){if(G){var t=De;if(t){var n=t;if(!Ul(e,t)){if(Vo(e))throw Error(w(418));t=Pt(n.nextSibling);var r=Re;t&&Ul(e,t)?Ru(r,n):(e.flags=e.flags&-4097|2,G=!1,Re=e)}}else{if(Vo(e))throw Error(w(418));e.flags=e.flags&-4097|2,G=!1,Re=e}}}function Bl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Re=e}function $r(e){if(e!==Re)return!1;if(!G)return Bl(e),G=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Fo(e.type,e.memoizedProps)),t&&(t=De)){if(Vo(e))throw $u(),Error(w(418));for(;t;)Ru(e,t),t=Pt(t.nextSibling)}if(Bl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){De=Pt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}De=null}}else De=Re?Pt(e.stateNode.nextSibling):null;return!0}function $u(){for(var e=De;e;)e=Pt(e.nextSibling)}function En(){De=Re=null,G=!1}function Ta(e){Ge===null?Ge=[e]:Ge.push(e)}var Mp=xt.ReactCurrentBatchConfig;function On(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(w(309));var r=n.stateNode}if(!r)throw Error(w(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(a){var l=i.refs;a===null?delete l[o]:l[o]=a},t._stringRef=o,t)}if(typeof e!="string")throw Error(w(284));if(!n._owner)throw Error(w(290,e))}return e}function Or(e,t){throw e=Object.prototype.toString.call(t),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Vl(e){var t=e._init;return t(e._payload)}function Ou(e){function t(c,u){if(e){var h=c.deletions;h===null?(c.deletions=[u],c.flags|=16):h.push(u)}}function n(c,u){if(!e)return null;for(;u!==null;)t(c,u),u=u.sibling;return null}function r(c,u){for(c=new Map;u!==null;)u.key!==null?c.set(u.key,u):c.set(u.index,u),u=u.sibling;return c}function i(c,u){return c=Mt(c,u),c.index=0,c.sibling=null,c}function o(c,u,h){return c.index=h,e?(h=c.alternate,h!==null?(h=h.index,h<u?(c.flags|=2,u):h):(c.flags|=2,u)):(c.flags|=1048576,u)}function a(c){return e&&c.alternate===null&&(c.flags|=2),c}function l(c,u,h,x){return u===null||u.tag!==6?(u=fo(h,c.mode,x),u.return=c,u):(u=i(u,h),u.return=c,u)}function s(c,u,h,x){var b=h.type;return b===on?g(c,u,h.props.children,x,h.key):u!==null&&(u.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===wt&&Vl(b)===u.type)?(x=i(u,h.props),x.ref=On(c,u,h),x.return=c,x):(x=ei(h.type,h.key,h.props,null,c.mode,x),x.ref=On(c,u,h),x.return=c,x)}function f(c,u,h,x){return u===null||u.tag!==4||u.stateNode.containerInfo!==h.containerInfo||u.stateNode.implementation!==h.implementation?(u=mo(h,c.mode,x),u.return=c,u):(u=i(u,h.children||[]),u.return=c,u)}function g(c,u,h,x,b){return u===null||u.tag!==7?(u=Qt(h,c.mode,x,b),u.return=c,u):(u=i(u,h),u.return=c,u)}function v(c,u,h){if(typeof u=="string"&&u!==""||typeof u=="number")return u=fo(""+u,c.mode,h),u.return=c,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Cr:return h=ei(u.type,u.key,u.props,null,c.mode,h),h.ref=On(c,null,u),h.return=c,h;case rn:return u=mo(u,c.mode,h),u.return=c,u;case wt:var x=u._init;return v(c,x(u._payload),h)}if(Un(u)||Ln(u))return u=Qt(u,c.mode,h,null),u.return=c,u;Or(c,u)}return null}function m(c,u,h,x){var b=u!==null?u.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return b!==null?null:l(c,u,""+h,x);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Cr:return h.key===b?s(c,u,h,x):null;case rn:return h.key===b?f(c,u,h,x):null;case wt:return b=h._init,m(c,u,b(h._payload),x)}if(Un(h)||Ln(h))return b!==null?null:g(c,u,h,x,null);Or(c,h)}return null}function y(c,u,h,x,b){if(typeof x=="string"&&x!==""||typeof x=="number")return c=c.get(h)||null,l(u,c,""+x,b);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Cr:return c=c.get(x.key===null?h:x.key)||null,s(u,c,x,b);case rn:return c=c.get(x.key===null?h:x.key)||null,f(u,c,x,b);case wt:var S=x._init;return y(c,u,h,S(x._payload),b)}if(Un(x)||Ln(x))return c=c.get(h)||null,g(u,c,x,b,null);Or(u,x)}return null}function p(c,u,h,x){for(var b=null,S=null,N=u,E=u=0,Q=null;N!==null&&E<h.length;E++){N.index>E?(Q=N,N=null):Q=N.sibling;var I=m(c,N,h[E],x);if(I===null){N===null&&(N=Q);break}e&&N&&I.alternate===null&&t(c,N),u=o(I,u,E),S===null?b=I:S.sibling=I,S=I,N=Q}if(E===h.length)return n(c,N),G&&At(c,E),b;if(N===null){for(;E<h.length;E++)N=v(c,h[E],x),N!==null&&(u=o(N,u,E),S===null?b=N:S.sibling=N,S=N);return G&&At(c,E),b}for(N=r(c,N);E<h.length;E++)Q=y(N,c,E,h[E],x),Q!==null&&(e&&Q.alternate!==null&&N.delete(Q.key===null?E:Q.key),u=o(Q,u,E),S===null?b=Q:S.sibling=Q,S=Q);return e&&N.forEach(function(de){return t(c,de)}),G&&At(c,E),b}function k(c,u,h,x){var b=Ln(h);if(typeof b!="function")throw Error(w(150));if(h=b.call(h),h==null)throw Error(w(151));for(var S=b=null,N=u,E=u=0,Q=null,I=h.next();N!==null&&!I.done;E++,I=h.next()){N.index>E?(Q=N,N=null):Q=N.sibling;var de=m(c,N,I.value,x);if(de===null){N===null&&(N=Q);break}e&&N&&de.alternate===null&&t(c,N),u=o(de,u,E),S===null?b=de:S.sibling=de,S=de,N=Q}if(I.done)return n(c,N),G&&At(c,E),b;if(N===null){for(;!I.done;E++,I=h.next())I=v(c,I.value,x),I!==null&&(u=o(I,u,E),S===null?b=I:S.sibling=I,S=I);return G&&At(c,E),b}for(N=r(c,N);!I.done;E++,I=h.next())I=y(N,c,E,I.value,x),I!==null&&(e&&I.alternate!==null&&N.delete(I.key===null?E:I.key),u=o(I,u,E),S===null?b=I:S.sibling=I,S=I);return e&&N.forEach(function(et){return t(c,et)}),G&&At(c,E),b}function $(c,u,h,x){if(typeof h=="object"&&h!==null&&h.type===on&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Cr:e:{for(var b=h.key,S=u;S!==null;){if(S.key===b){if(b=h.type,b===on){if(S.tag===7){n(c,S.sibling),u=i(S,h.props.children),u.return=c,c=u;break e}}else if(S.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===wt&&Vl(b)===S.type){n(c,S.sibling),u=i(S,h.props),u.ref=On(c,S,h),u.return=c,c=u;break e}n(c,S);break}else t(c,S);S=S.sibling}h.type===on?(u=Qt(h.props.children,c.mode,x,h.key),u.return=c,c=u):(x=ei(h.type,h.key,h.props,null,c.mode,x),x.ref=On(c,u,h),x.return=c,c=x)}return a(c);case rn:e:{for(S=h.key;u!==null;){if(u.key===S)if(u.tag===4&&u.stateNode.containerInfo===h.containerInfo&&u.stateNode.implementation===h.implementation){n(c,u.sibling),u=i(u,h.children||[]),u.return=c,c=u;break e}else{n(c,u);break}else t(c,u);u=u.sibling}u=mo(h,c.mode,x),u.return=c,c=u}return a(c);case wt:return S=h._init,$(c,u,S(h._payload),x)}if(Un(h))return p(c,u,h,x);if(Ln(h))return k(c,u,h,x);Or(c,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,u!==null&&u.tag===6?(n(c,u.sibling),u=i(u,h),u.return=c,c=u):(n(c,u),u=fo(h,c.mode,x),u.return=c,c=u),a(c)):n(c,u)}return $}var jn=Ou(!0),Iu=Ou(!1),mi=Ot(null),hi=null,fn=null,La=null;function Ma(){La=fn=hi=null}function Da(e){var t=mi.current;X(mi),e._currentValue=t}function Wo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function wn(e,t){hi=e,La=fn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ne=!0),e.firstContext=null)}function He(e){var t=e._currentValue;if(La!==e)if(e={context:e,memoizedValue:t,next:null},fn===null){if(hi===null)throw Error(w(308));fn=e,hi.dependencies={lanes:0,firstContext:e}}else fn=fn.next=e;return t}var Vt=null;function Ra(e){Vt===null?Vt=[e]:Vt.push(e)}function Fu(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Ra(t)):(n.next=i.next,i.next=n),t.interleaved=n,gt(e,r)}function gt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var bt=!1;function $a(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Au(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ft(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function _t(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,V&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,gt(e,n)}return i=r.interleaved,i===null?(t.next=t,Ra(r)):(t.next=i.next,i.next=t),r.interleaved=t,gt(e,n)}function Kr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ba(e,n)}}function Hl(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=a:o=o.next=a,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function gi(e,t,n,r){var i=e.updateQueue;bt=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var s=l,f=s.next;s.next=null,a===null?o=f:a.next=f,a=s;var g=e.alternate;g!==null&&(g=g.updateQueue,l=g.lastBaseUpdate,l!==a&&(l===null?g.firstBaseUpdate=f:l.next=f,g.lastBaseUpdate=s))}if(o!==null){var v=i.baseState;a=0,g=f=s=null,l=o;do{var m=l.lane,y=l.eventTime;if((r&m)===m){g!==null&&(g=g.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var p=e,k=l;switch(m=t,y=n,k.tag){case 1:if(p=k.payload,typeof p=="function"){v=p.call(y,v,m);break e}v=p;break e;case 3:p.flags=p.flags&-65537|128;case 0:if(p=k.payload,m=typeof p=="function"?p.call(y,v,m):p,m==null)break e;v=ee({},v,m);break e;case 2:bt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[l]:m.push(l))}else y={eventTime:y,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},g===null?(f=g=y,s=v):g=g.next=y,a|=m;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;m=l,l=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(g===null&&(s=v),i.baseState=s,i.firstBaseUpdate=f,i.lastBaseUpdate=g,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Gt|=a,e.lanes=a,e.memoizedState=v}}function Wl(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(w(191,i));i.call(r)}}}var kr={},at=Ot(kr),dr=Ot(kr),pr=Ot(kr);function Ht(e){if(e===kr)throw Error(w(174));return e}function Oa(e,t){switch(Y(pr,t),Y(dr,e),Y(at,kr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:jo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=jo(t,e)}X(at),Y(at,t)}function Cn(){X(at),X(dr),X(pr)}function Uu(e){Ht(pr.current);var t=Ht(at.current),n=jo(t,e.type);t!==n&&(Y(dr,e),Y(at,n))}function Ia(e){dr.current===e&&(X(at),X(dr))}var J=Ot(0);function vi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ao=[];function Fa(){for(var e=0;e<ao.length;e++)ao[e]._workInProgressVersionPrimary=null;ao.length=0}var Xr=xt.ReactCurrentDispatcher,lo=xt.ReactCurrentBatchConfig,Xt=0,q=null,le=null,ue=null,xi=!1,Xn=!1,fr=0,Dp=0;function ge(){throw Error(w(321))}function Aa(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!qe(e[n],t[n]))return!1;return!0}function Ua(e,t,n,r,i,o){if(Xt=o,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Xr.current=e===null||e.memoizedState===null?Ip:Fp,e=n(r,i),Xn){o=0;do{if(Xn=!1,fr=0,25<=o)throw Error(w(301));o+=1,ue=le=null,t.updateQueue=null,Xr.current=Ap,e=n(r,i)}while(Xn)}if(Xr.current=yi,t=le!==null&&le.next!==null,Xt=0,ue=le=q=null,xi=!1,t)throw Error(w(300));return e}function Ba(){var e=fr!==0;return fr=0,e}function rt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?q.memoizedState=ue=e:ue=ue.next=e,ue}function We(){if(le===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=le.next;var t=ue===null?q.memoizedState:ue.next;if(t!==null)ue=t,le=e;else{if(e===null)throw Error(w(310));le=e,e={memoizedState:le.memoizedState,baseState:le.baseState,baseQueue:le.baseQueue,queue:le.queue,next:null},ue===null?q.memoizedState=ue=e:ue=ue.next=e}return ue}function mr(e,t){return typeof t=="function"?t(e):t}function so(e){var t=We(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=le,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var a=i.next;i.next=o.next,o.next=a}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=a=null,s=null,f=o;do{var g=f.lane;if((Xt&g)===g)s!==null&&(s=s.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:e(r,f.action);else{var v={lane:g,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};s===null?(l=s=v,a=r):s=s.next=v,q.lanes|=g,Gt|=g}f=f.next}while(f!==null&&f!==o);s===null?a=r:s.next=l,qe(r,t.memoizedState)||(Ne=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,q.lanes|=o,Gt|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function uo(e){var t=We(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do o=e(o,a.action),a=a.next;while(a!==i);qe(o,t.memoizedState)||(Ne=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Bu(){}function Vu(e,t){var n=q,r=We(),i=t(),o=!qe(r.memoizedState,i);if(o&&(r.memoizedState=i,Ne=!0),r=r.queue,Va(Qu.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ue!==null&&ue.memoizedState.tag&1){if(n.flags|=2048,hr(9,Wu.bind(null,n,r,i,t),void 0,null),ce===null)throw Error(w(349));Xt&30||Hu(n,t,i)}return i}function Hu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wu(e,t,n,r){t.value=n,t.getSnapshot=r,Yu(t)&&Ku(e)}function Qu(e,t,n){return n(function(){Yu(t)&&Ku(e)})}function Yu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!qe(e,n)}catch{return!0}}function Ku(e){var t=gt(e,1);t!==null&&Je(t,e,1,-1)}function Ql(e){var t=rt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:mr,lastRenderedState:e},t.queue=e,e=e.dispatch=Op.bind(null,q,e),[t.memoizedState,e]}function hr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Xu(){return We().memoizedState}function Gr(e,t,n,r){var i=rt();q.flags|=e,i.memoizedState=hr(1|t,n,void 0,r===void 0?null:r)}function Li(e,t,n,r){var i=We();r=r===void 0?null:r;var o=void 0;if(le!==null){var a=le.memoizedState;if(o=a.destroy,r!==null&&Aa(r,a.deps)){i.memoizedState=hr(t,n,o,r);return}}q.flags|=e,i.memoizedState=hr(1|t,n,o,r)}function Yl(e,t){return Gr(8390656,8,e,t)}function Va(e,t){return Li(2048,8,e,t)}function Gu(e,t){return Li(4,2,e,t)}function Zu(e,t){return Li(4,4,e,t)}function Ju(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function qu(e,t,n){return n=n!=null?n.concat([e]):null,Li(4,4,Ju.bind(null,t,e),n)}function Ha(){}function ec(e,t){var n=We();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Aa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function tc(e,t){var n=We();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Aa(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function nc(e,t,n){return Xt&21?(qe(n,t)||(n=lu(),q.lanes|=n,Gt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ne=!0),e.memoizedState=n)}function Rp(e,t){var n=W;W=n!==0&&4>n?n:4,e(!0);var r=lo.transition;lo.transition={};try{e(!1),t()}finally{W=n,lo.transition=r}}function rc(){return We().memoizedState}function $p(e,t,n){var r=Lt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ic(e))oc(t,n);else if(n=Fu(e,t,n,r),n!==null){var i=ke();Je(n,e,r,i),ac(n,t,r)}}function Op(e,t,n){var r=Lt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ic(e))oc(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var a=t.lastRenderedState,l=o(a,n);if(i.hasEagerState=!0,i.eagerState=l,qe(l,a)){var s=t.interleaved;s===null?(i.next=i,Ra(t)):(i.next=s.next,s.next=i),t.interleaved=i;return}}catch{}finally{}n=Fu(e,t,i,r),n!==null&&(i=ke(),Je(n,e,r,i),ac(n,t,r))}}function ic(e){var t=e.alternate;return e===q||t!==null&&t===q}function oc(e,t){Xn=xi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ac(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ba(e,n)}}var yi={readContext:He,useCallback:ge,useContext:ge,useEffect:ge,useImperativeHandle:ge,useInsertionEffect:ge,useLayoutEffect:ge,useMemo:ge,useReducer:ge,useRef:ge,useState:ge,useDebugValue:ge,useDeferredValue:ge,useTransition:ge,useMutableSource:ge,useSyncExternalStore:ge,useId:ge,unstable_isNewReconciler:!1},Ip={readContext:He,useCallback:function(e,t){return rt().memoizedState=[e,t===void 0?null:t],e},useContext:He,useEffect:Yl,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Gr(4194308,4,Ju.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Gr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Gr(4,2,e,t)},useMemo:function(e,t){var n=rt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=rt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=$p.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var t=rt();return e={current:e},t.memoizedState=e},useState:Ql,useDebugValue:Ha,useDeferredValue:function(e){return rt().memoizedState=e},useTransition:function(){var e=Ql(!1),t=e[0];return e=Rp.bind(null,e[1]),rt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=q,i=rt();if(G){if(n===void 0)throw Error(w(407));n=n()}else{if(n=t(),ce===null)throw Error(w(349));Xt&30||Hu(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Yl(Qu.bind(null,r,o,e),[e]),r.flags|=2048,hr(9,Wu.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=rt(),t=ce.identifierPrefix;if(G){var n=pt,r=dt;n=(r&~(1<<32-Ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=fr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Dp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Fp={readContext:He,useCallback:ec,useContext:He,useEffect:Va,useImperativeHandle:qu,useInsertionEffect:Gu,useLayoutEffect:Zu,useMemo:tc,useReducer:so,useRef:Xu,useState:function(){return so(mr)},useDebugValue:Ha,useDeferredValue:function(e){var t=We();return nc(t,le.memoizedState,e)},useTransition:function(){var e=so(mr)[0],t=We().memoizedState;return[e,t]},useMutableSource:Bu,useSyncExternalStore:Vu,useId:rc,unstable_isNewReconciler:!1},Ap={readContext:He,useCallback:ec,useContext:He,useEffect:Va,useImperativeHandle:qu,useInsertionEffect:Gu,useLayoutEffect:Zu,useMemo:tc,useReducer:uo,useRef:Xu,useState:function(){return uo(mr)},useDebugValue:Ha,useDeferredValue:function(e){var t=We();return le===null?t.memoizedState=e:nc(t,le.memoizedState,e)},useTransition:function(){var e=uo(mr)[0],t=We().memoizedState;return[e,t]},useMutableSource:Bu,useSyncExternalStore:Vu,useId:rc,unstable_isNewReconciler:!1};function Ke(e,t){if(e&&e.defaultProps){t=ee({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Qo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Mi={isMounted:function(e){return(e=e._reactInternals)?qt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ke(),i=Lt(e),o=ft(r,i);o.payload=t,n!=null&&(o.callback=n),t=_t(e,o,i),t!==null&&(Je(t,e,i,r),Kr(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ke(),i=Lt(e),o=ft(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=_t(e,o,i),t!==null&&(Je(t,e,i,r),Kr(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ke(),r=Lt(e),i=ft(n,r);i.tag=2,t!=null&&(i.callback=t),t=_t(e,i,r),t!==null&&(Je(t,e,r,n),Kr(t,e,r))}};function Kl(e,t,n,r,i,o,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,a):t.prototype&&t.prototype.isPureReactComponent?!lr(n,r)||!lr(i,o):!0}function lc(e,t,n){var r=!1,i=Rt,o=t.contextType;return typeof o=="object"&&o!==null?o=He(o):(i=_e(t)?Yt:ye.current,r=t.contextTypes,o=(r=r!=null)?Sn(e,i):Rt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Mi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Xl(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Mi.enqueueReplaceState(t,t.state,null)}function Yo(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},$a(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=He(o):(o=_e(t)?Yt:ye.current,i.context=Sn(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Qo(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&Mi.enqueueReplaceState(i,i.state,null),gi(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function zn(e,t){try{var n="",r=t;do n+=md(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function co(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ko(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Up=typeof WeakMap=="function"?WeakMap:Map;function sc(e,t,n){n=ft(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){bi||(bi=!0,ia=r),Ko(e,t)},n}function uc(e,t,n){n=ft(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Ko(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Ko(e,t),typeof r!="function"&&(Tt===null?Tt=new Set([this]):Tt.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Gl(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Up;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=tf.bind(null,e,t,n),t.then(e,e))}function Zl(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Jl(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ft(-1,1),t.tag=2,_t(n,t,1))),n.lanes|=1),e)}var Bp=xt.ReactCurrentOwner,Ne=!1;function be(e,t,n,r){t.child=e===null?Iu(t,null,n,r):jn(t,e.child,n,r)}function ql(e,t,n,r,i){n=n.render;var o=t.ref;return wn(t,i),r=Ua(e,t,n,r,o,i),n=Ba(),e!==null&&!Ne?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,vt(e,t,i)):(G&&n&&Pa(t),t.flags|=1,be(e,t,r,i),t.child)}function es(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!Ja(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,cc(e,t,o,r,i)):(e=ei(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var a=o.memoizedProps;if(n=n.compare,n=n!==null?n:lr,n(a,r)&&e.ref===t.ref)return vt(e,t,i)}return t.flags|=1,e=Mt(o,r),e.ref=t.ref,e.return=t,t.child=e}function cc(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(lr(o,r)&&e.ref===t.ref)if(Ne=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(Ne=!0);else return t.lanes=e.lanes,vt(e,t,i)}return Xo(e,t,n,r,i)}function dc(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Y(hn,Me),Me|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Y(hn,Me),Me|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,Y(hn,Me),Me|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,Y(hn,Me),Me|=r;return be(e,t,i,n),t.child}function pc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Xo(e,t,n,r,i){var o=_e(n)?Yt:ye.current;return o=Sn(t,o),wn(t,i),n=Ua(e,t,n,r,o,i),r=Ba(),e!==null&&!Ne?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,vt(e,t,i)):(G&&r&&Pa(t),t.flags|=1,be(e,t,n,i),t.child)}function ts(e,t,n,r,i){if(_e(n)){var o=!0;di(t)}else o=!1;if(wn(t,i),t.stateNode===null)Zr(e,t),lc(t,n,r),Yo(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var s=a.context,f=n.contextType;typeof f=="object"&&f!==null?f=He(f):(f=_e(n)?Yt:ye.current,f=Sn(t,f));var g=n.getDerivedStateFromProps,v=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function";v||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||s!==f)&&Xl(t,a,r,f),bt=!1;var m=t.memoizedState;a.state=m,gi(t,r,a,i),s=t.memoizedState,l!==r||m!==s||Pe.current||bt?(typeof g=="function"&&(Qo(t,n,g,r),s=t.memoizedState),(l=bt||Kl(t,n,l,r,m,s,f))?(v||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),a.props=r,a.state=s,a.context=f,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Au(e,t),l=t.memoizedProps,f=t.type===t.elementType?l:Ke(t.type,l),a.props=f,v=t.pendingProps,m=a.context,s=n.contextType,typeof s=="object"&&s!==null?s=He(s):(s=_e(n)?Yt:ye.current,s=Sn(t,s));var y=n.getDerivedStateFromProps;(g=typeof y=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==v||m!==s)&&Xl(t,a,r,s),bt=!1,m=t.memoizedState,a.state=m,gi(t,r,a,i);var p=t.memoizedState;l!==v||m!==p||Pe.current||bt?(typeof y=="function"&&(Qo(t,n,y,r),p=t.memoizedState),(f=bt||Kl(t,n,f,r,m,p,s)||!1)?(g||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,p,s),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,p,s)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=s,r=f):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Go(e,t,n,r,o,i)}function Go(e,t,n,r,i,o){pc(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&Al(t,n,!1),vt(e,t,o);r=t.stateNode,Bp.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=jn(t,e.child,null,o),t.child=jn(t,null,l,o)):be(e,t,l,o),t.memoizedState=r.state,i&&Al(t,n,!0),t.child}function fc(e){var t=e.stateNode;t.pendingContext?Fl(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Fl(e,t.context,!1),Oa(e,t.containerInfo)}function ns(e,t,n,r,i){return En(),Ta(i),t.flags|=256,be(e,t,n,r),t.child}var Zo={dehydrated:null,treeContext:null,retryLane:0};function Jo(e){return{baseLanes:e,cachePool:null,transitions:null}}function mc(e,t,n){var r=t.pendingProps,i=J.current,o=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Y(J,i&1),e===null)return Ho(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,o?(r=t.mode,o=t.child,a={mode:"hidden",children:a},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=a):o=$i(a,r,0,null),e=Qt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Jo(n),t.memoizedState=Zo,e):Wa(t,a));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Vp(e,t,a,r,l,i,n);if(o){o=r.fallback,a=t.mode,i=e.child,l=i.sibling;var s={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Mt(i,s),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=Mt(l,o):(o=Qt(o,a,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,a=e.child.memoizedState,a=a===null?Jo(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=e.childLanes&~n,t.memoizedState=Zo,r}return o=e.child,e=o.sibling,r=Mt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Wa(e,t){return t=$i({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ir(e,t,n,r){return r!==null&&Ta(r),jn(t,e.child,null,n),e=Wa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Vp(e,t,n,r,i,o,a){if(n)return t.flags&256?(t.flags&=-257,r=co(Error(w(422))),Ir(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=$i({mode:"visible",children:r.children},i,0,null),o=Qt(o,i,a,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&jn(t,e.child,null,a),t.child.memoizedState=Jo(a),t.memoizedState=Zo,o);if(!(t.mode&1))return Ir(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(w(419)),r=co(o,r,void 0),Ir(e,t,a,r)}if(l=(a&e.childLanes)!==0,Ne||l){if(r=ce,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,gt(e,i),Je(r,e,i,-1))}return Za(),r=co(Error(w(421))),Ir(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=nf.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,De=Pt(i.nextSibling),Re=t,G=!0,Ge=null,e!==null&&(Ae[Ue++]=dt,Ae[Ue++]=pt,Ae[Ue++]=Kt,dt=e.id,pt=e.overflow,Kt=t),t=Wa(t,r.children),t.flags|=4096,t)}function rs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wo(e.return,t,n)}function po(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function hc(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(be(e,t,r.children,n),r=J.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rs(e,n,t);else if(e.tag===19)rs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Y(J,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&vi(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),po(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&vi(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}po(t,!0,n,null,o);break;case"together":po(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function vt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(w(153));if(t.child!==null){for(e=t.child,n=Mt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Mt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Hp(e,t,n){switch(t.tag){case 3:fc(t),En();break;case 5:Uu(t);break;case 1:_e(t.type)&&di(t);break;case 4:Oa(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;Y(mi,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Y(J,J.current&1),t.flags|=128,null):n&t.child.childLanes?mc(e,t,n):(Y(J,J.current&1),e=vt(e,t,n),e!==null?e.sibling:null);Y(J,J.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return hc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Y(J,J.current),r)break;return null;case 22:case 23:return t.lanes=0,dc(e,t,n)}return vt(e,t,n)}var gc,qo,vc,xc;gc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};qo=function(){};vc=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Ht(at.current);var o=null;switch(n){case"input":i=bo(e,i),r=bo(e,r),o=[];break;case"select":i=ee({},i,{value:void 0}),r=ee({},r,{value:void 0}),o=[];break;case"textarea":i=Eo(e,i),r=Eo(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ui)}Co(n,r);var a;n=null;for(f in i)if(!r.hasOwnProperty(f)&&i.hasOwnProperty(f)&&i[f]!=null)if(f==="style"){var l=i[f];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(er.hasOwnProperty(f)?o||(o=[]):(o=o||[]).push(f,null));for(f in r){var s=r[f];if(l=i!=null?i[f]:void 0,r.hasOwnProperty(f)&&s!==l&&(s!=null||l!=null))if(f==="style")if(l){for(a in l)!l.hasOwnProperty(a)||s&&s.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in s)s.hasOwnProperty(a)&&l[a]!==s[a]&&(n||(n={}),n[a]=s[a])}else n||(o||(o=[]),o.push(f,n)),n=s;else f==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(o=o||[]).push(f,s)):f==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(f,""+s):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(er.hasOwnProperty(f)?(s!=null&&f==="onScroll"&&K("scroll",e),o||l===s||(o=[])):(o=o||[]).push(f,s))}n&&(o=o||[]).push("style",n);var f=o;(t.updateQueue=f)&&(t.flags|=4)}};xc=function(e,t,n,r){n!==r&&(t.flags|=4)};function In(e,t){if(!G)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ve(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Wp(e,t,n){var r=t.pendingProps;switch(_a(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ve(t),null;case 1:return _e(t.type)&&ci(),ve(t),null;case 3:return r=t.stateNode,Cn(),X(Pe),X(ye),Fa(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&($r(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ge!==null&&(la(Ge),Ge=null))),qo(e,t),ve(t),null;case 5:Ia(t);var i=Ht(pr.current);if(n=t.type,e!==null&&t.stateNode!=null)vc(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(w(166));return ve(t),null}if(e=Ht(at.current),$r(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[it]=t,r[cr]=o,e=(t.mode&1)!==0,n){case"dialog":K("cancel",r),K("close",r);break;case"iframe":case"object":case"embed":K("load",r);break;case"video":case"audio":for(i=0;i<Vn.length;i++)K(Vn[i],r);break;case"source":K("error",r);break;case"img":case"image":case"link":K("error",r),K("load",r);break;case"details":K("toggle",r);break;case"input":pl(r,o),K("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},K("invalid",r);break;case"textarea":ml(r,o),K("invalid",r)}Co(n,o),i=null;for(var a in o)if(o.hasOwnProperty(a)){var l=o[a];a==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&Rr(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Rr(r.textContent,l,e),i=["children",""+l]):er.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&K("scroll",r)}switch(n){case"input":zr(r),fl(r,o,!0);break;case"textarea":zr(r),hl(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=ui)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Qs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[it]=t,e[cr]=r,gc(e,t,!1,!1),t.stateNode=e;e:{switch(a=zo(n,r),n){case"dialog":K("cancel",e),K("close",e),i=r;break;case"iframe":case"object":case"embed":K("load",e),i=r;break;case"video":case"audio":for(i=0;i<Vn.length;i++)K(Vn[i],e);i=r;break;case"source":K("error",e),i=r;break;case"img":case"image":case"link":K("error",e),K("load",e),i=r;break;case"details":K("toggle",e),i=r;break;case"input":pl(e,r),i=bo(e,r),K("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ee({},r,{value:void 0}),K("invalid",e);break;case"textarea":ml(e,r),i=Eo(e,r),K("invalid",e);break;default:i=r}Co(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var s=l[o];o==="style"?Xs(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Ys(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&tr(e,s):typeof s=="number"&&tr(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(er.hasOwnProperty(o)?s!=null&&o==="onScroll"&&K("scroll",e):s!=null&&ha(e,o,s,a))}switch(n){case"input":zr(e),fl(e,r,!1);break;case"textarea":zr(e),hl(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Dt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?gn(e,!!r.multiple,o,!1):r.defaultValue!=null&&gn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=ui)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ve(t),null;case 6:if(e&&t.stateNode!=null)xc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(w(166));if(n=Ht(pr.current),Ht(at.current),$r(t)){if(r=t.stateNode,n=t.memoizedProps,r[it]=t,(o=r.nodeValue!==n)&&(e=Re,e!==null))switch(e.tag){case 3:Rr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Rr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[it]=t,t.stateNode=r}return ve(t),null;case 13:if(X(J),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&De!==null&&t.mode&1&&!(t.flags&128))$u(),En(),t.flags|=98560,o=!1;else if(o=$r(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(w(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(w(317));o[it]=t}else En(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ve(t),o=!1}else Ge!==null&&(la(Ge),Ge=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||J.current&1?se===0&&(se=3):Za())),t.updateQueue!==null&&(t.flags|=4),ve(t),null);case 4:return Cn(),qo(e,t),e===null&&sr(t.stateNode.containerInfo),ve(t),null;case 10:return Da(t.type._context),ve(t),null;case 17:return _e(t.type)&&ci(),ve(t),null;case 19:if(X(J),o=t.memoizedState,o===null)return ve(t),null;if(r=(t.flags&128)!==0,a=o.rendering,a===null)if(r)In(o,!1);else{if(se!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=vi(e),a!==null){for(t.flags|=128,In(o,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,e=a.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Y(J,J.current&1|2),t.child}e=e.sibling}o.tail!==null&&ie()>Nn&&(t.flags|=128,r=!0,In(o,!1),t.lanes=4194304)}else{if(!r)if(e=vi(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),In(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!G)return ve(t),null}else 2*ie()-o.renderingStartTime>Nn&&n!==1073741824&&(t.flags|=128,r=!0,In(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(n=o.last,n!==null?n.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ie(),t.sibling=null,n=J.current,Y(J,r?n&1|2:n&1),t):(ve(t),null);case 22:case 23:return Ga(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Me&1073741824&&(ve(t),t.subtreeFlags&6&&(t.flags|=8192)):ve(t),null;case 24:return null;case 25:return null}throw Error(w(156,t.tag))}function Qp(e,t){switch(_a(t),t.tag){case 1:return _e(t.type)&&ci(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Cn(),X(Pe),X(ye),Fa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ia(t),null;case 13:if(X(J),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(w(340));En()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X(J),null;case 4:return Cn(),null;case 10:return Da(t.type._context),null;case 22:case 23:return Ga(),null;case 24:return null;default:return null}}var Fr=!1,xe=!1,Yp=typeof WeakSet=="function"?WeakSet:Set,z=null;function mn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ne(e,t,r)}else n.current=null}function ea(e,t,n){try{n()}catch(r){ne(e,t,r)}}var is=!1;function Kp(e,t){if(Oo=ai,e=Su(),Na(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var a=0,l=-1,s=-1,f=0,g=0,v=e,m=null;t:for(;;){for(var y;v!==n||i!==0&&v.nodeType!==3||(l=a+i),v!==o||r!==0&&v.nodeType!==3||(s=a+r),v.nodeType===3&&(a+=v.nodeValue.length),(y=v.firstChild)!==null;)m=v,v=y;for(;;){if(v===e)break t;if(m===n&&++f===i&&(l=a),m===o&&++g===r&&(s=a),(y=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=y}n=l===-1||s===-1?null:{start:l,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Io={focusedElem:e,selectionRange:n},ai=!1,z=t;z!==null;)if(t=z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z=e;else for(;z!==null;){t=z;try{var p=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(p!==null){var k=p.memoizedProps,$=p.memoizedState,c=t.stateNode,u=c.getSnapshotBeforeUpdate(t.elementType===t.type?k:Ke(t.type,k),$);c.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(x){ne(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,z=e;break}z=t.return}return p=is,is=!1,p}function Gn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&ea(t,n,o)}i=i.next}while(i!==r)}}function Di(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ta(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function yc(e){var t=e.alternate;t!==null&&(e.alternate=null,yc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[it],delete t[cr],delete t[Uo],delete t[_p],delete t[Tp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function wc(e){return e.tag===5||e.tag===3||e.tag===4}function os(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function na(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ui));else if(r!==4&&(e=e.child,e!==null))for(na(e,t,n),e=e.sibling;e!==null;)na(e,t,n),e=e.sibling}function ra(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ra(e,t,n),e=e.sibling;e!==null;)ra(e,t,n),e=e.sibling}var pe=null,Xe=!1;function yt(e,t,n){for(n=n.child;n!==null;)bc(e,t,n),n=n.sibling}function bc(e,t,n){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Ci,n)}catch{}switch(n.tag){case 5:xe||mn(n,t);case 6:var r=pe,i=Xe;pe=null,yt(e,t,n),pe=r,Xe=i,pe!==null&&(Xe?(e=pe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):pe.removeChild(n.stateNode));break;case 18:pe!==null&&(Xe?(e=pe,n=n.stateNode,e.nodeType===8?io(e.parentNode,n):e.nodeType===1&&io(e,n),or(e)):io(pe,n.stateNode));break;case 4:r=pe,i=Xe,pe=n.stateNode.containerInfo,Xe=!0,yt(e,t,n),pe=r,Xe=i;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,a=o.destroy;o=o.tag,a!==void 0&&(o&2||o&4)&&ea(n,t,a),i=i.next}while(i!==r)}yt(e,t,n);break;case 1:if(!xe&&(mn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ne(n,t,l)}yt(e,t,n);break;case 21:yt(e,t,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,yt(e,t,n),xe=r):yt(e,t,n);break;default:yt(e,t,n)}}function as(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Yp),t.forEach(function(r){var i=rf.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Ye(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:pe=l.stateNode,Xe=!1;break e;case 3:pe=l.stateNode.containerInfo,Xe=!0;break e;case 4:pe=l.stateNode.containerInfo,Xe=!0;break e}l=l.return}if(pe===null)throw Error(w(160));bc(o,a,i),pe=null,Xe=!1;var s=i.alternate;s!==null&&(s.return=null),i.return=null}catch(f){ne(i,t,f)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)kc(t,e),t=t.sibling}function kc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ye(t,e),nt(e),r&4){try{Gn(3,e,e.return),Di(3,e)}catch(k){ne(e,e.return,k)}try{Gn(5,e,e.return)}catch(k){ne(e,e.return,k)}}break;case 1:Ye(t,e),nt(e),r&512&&n!==null&&mn(n,n.return);break;case 5:if(Ye(t,e),nt(e),r&512&&n!==null&&mn(n,n.return),e.flags&32){var i=e.stateNode;try{tr(i,"")}catch(k){ne(e,e.return,k)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,a=n!==null?n.memoizedProps:o,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Hs(i,o),zo(l,a);var f=zo(l,o);for(a=0;a<s.length;a+=2){var g=s[a],v=s[a+1];g==="style"?Xs(i,v):g==="dangerouslySetInnerHTML"?Ys(i,v):g==="children"?tr(i,v):ha(i,g,v,f)}switch(l){case"input":ko(i,o);break;case"textarea":Ws(i,o);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var y=o.value;y!=null?gn(i,!!o.multiple,y,!1):m!==!!o.multiple&&(o.defaultValue!=null?gn(i,!!o.multiple,o.defaultValue,!0):gn(i,!!o.multiple,o.multiple?[]:"",!1))}i[cr]=o}catch(k){ne(e,e.return,k)}}break;case 6:if(Ye(t,e),nt(e),r&4){if(e.stateNode===null)throw Error(w(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(k){ne(e,e.return,k)}}break;case 3:if(Ye(t,e),nt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{or(t.containerInfo)}catch(k){ne(e,e.return,k)}break;case 4:Ye(t,e),nt(e);break;case 13:Ye(t,e),nt(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(Ka=ie())),r&4&&as(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(xe=(f=xe)||g,Ye(t,e),xe=f):Ye(t,e),nt(e),r&8192){if(f=e.memoizedState!==null,(e.stateNode.isHidden=f)&&!g&&e.mode&1)for(z=e,g=e.child;g!==null;){for(v=z=g;z!==null;){switch(m=z,y=m.child,m.tag){case 0:case 11:case 14:case 15:Gn(4,m,m.return);break;case 1:mn(m,m.return);var p=m.stateNode;if(typeof p.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,p.props=t.memoizedProps,p.state=t.memoizedState,p.componentWillUnmount()}catch(k){ne(r,n,k)}}break;case 5:mn(m,m.return);break;case 22:if(m.memoizedState!==null){ss(v);continue}}y!==null?(y.return=m,z=y):ss(v)}g=g.sibling}e:for(g=null,v=e;;){if(v.tag===5){if(g===null){g=v;try{i=v.stateNode,f?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=v.stateNode,s=v.memoizedProps.style,a=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=Ks("display",a))}catch(k){ne(e,e.return,k)}}}else if(v.tag===6){if(g===null)try{v.stateNode.nodeValue=f?"":v.memoizedProps}catch(k){ne(e,e.return,k)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;g===v&&(g=null),v=v.return}g===v&&(g=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:Ye(t,e),nt(e),r&4&&as(e);break;case 21:break;default:Ye(t,e),nt(e)}}function nt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(wc(n)){var r=n;break e}n=n.return}throw Error(w(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(tr(i,""),r.flags&=-33);var o=os(e);ra(e,o,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=os(e);na(e,l,a);break;default:throw Error(w(161))}}catch(s){ne(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xp(e,t,n){z=e,Sc(e)}function Sc(e,t,n){for(var r=(e.mode&1)!==0;z!==null;){var i=z,o=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||Fr;if(!a){var l=i.alternate,s=l!==null&&l.memoizedState!==null||xe;l=Fr;var f=xe;if(Fr=a,(xe=s)&&!f)for(z=i;z!==null;)a=z,s=a.child,a.tag===22&&a.memoizedState!==null?us(i):s!==null?(s.return=a,z=s):us(i);for(;o!==null;)z=o,Sc(o),o=o.sibling;z=i,Fr=l,xe=f}ls(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,z=o):ls(e)}}function ls(e){for(;z!==null;){var t=z;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:xe||Di(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xe)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Ke(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Wl(t,o,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Wl(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var f=t.alternate;if(f!==null){var g=f.memoizedState;if(g!==null){var v=g.dehydrated;v!==null&&or(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}xe||t.flags&512&&ta(t)}catch(m){ne(t,t.return,m)}}if(t===e){z=null;break}if(n=t.sibling,n!==null){n.return=t.return,z=n;break}z=t.return}}function ss(e){for(;z!==null;){var t=z;if(t===e){z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,z=n;break}z=t.return}}function us(e){for(;z!==null;){var t=z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Di(4,t)}catch(s){ne(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(s){ne(t,i,s)}}var o=t.return;try{ta(t)}catch(s){ne(t,o,s)}break;case 5:var a=t.return;try{ta(t)}catch(s){ne(t,a,s)}}}catch(s){ne(t,t.return,s)}if(t===e){z=null;break}var l=t.sibling;if(l!==null){l.return=t.return,z=l;break}z=t.return}}var Gp=Math.ceil,wi=xt.ReactCurrentDispatcher,Qa=xt.ReactCurrentOwner,Ve=xt.ReactCurrentBatchConfig,V=0,ce=null,ae=null,fe=0,Me=0,hn=Ot(0),se=0,gr=null,Gt=0,Ri=0,Ya=0,Zn=null,ze=null,Ka=0,Nn=1/0,ut=null,bi=!1,ia=null,Tt=null,Ar=!1,jt=null,ki=0,Jn=0,oa=null,Jr=-1,qr=0;function ke(){return V&6?ie():Jr!==-1?Jr:Jr=ie()}function Lt(e){return e.mode&1?V&2&&fe!==0?fe&-fe:Mp.transition!==null?(qr===0&&(qr=lu()),qr):(e=W,e!==0||(e=window.event,e=e===void 0?16:mu(e.type)),e):1}function Je(e,t,n,r){if(50<Jn)throw Jn=0,oa=null,Error(w(185));yr(e,n,r),(!(V&2)||e!==ce)&&(e===ce&&(!(V&2)&&(Ri|=n),se===4&&St(e,fe)),Te(e,r),n===1&&V===0&&!(t.mode&1)&&(Nn=ie()+500,Ti&&It()))}function Te(e,t){var n=e.callbackNode;Md(e,t);var r=oi(e,e===ce?fe:0);if(r===0)n!==null&&xl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&xl(n),t===1)e.tag===0?Lp(cs.bind(null,e)):Mu(cs.bind(null,e)),Np(function(){!(V&6)&&It()}),n=null;else{switch(su(r)){case 1:n=wa;break;case 4:n=ou;break;case 16:n=ii;break;case 536870912:n=au;break;default:n=ii}n=Tc(n,Ec.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ec(e,t){if(Jr=-1,qr=0,V&6)throw Error(w(327));var n=e.callbackNode;if(bn()&&e.callbackNode!==n)return null;var r=oi(e,e===ce?fe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Si(e,r);else{t=r;var i=V;V|=2;var o=Cc();(ce!==e||fe!==t)&&(ut=null,Nn=ie()+500,Wt(e,t));do try{qp();break}catch(l){jc(e,l)}while(!0);Ma(),wi.current=o,V=i,ae!==null?t=0:(ce=null,fe=0,t=se)}if(t!==0){if(t===2&&(i=Lo(e),i!==0&&(r=i,t=aa(e,i))),t===1)throw n=gr,Wt(e,0),St(e,r),Te(e,ie()),n;if(t===6)St(e,r);else{if(i=e.current.alternate,!(r&30)&&!Zp(i)&&(t=Si(e,r),t===2&&(o=Lo(e),o!==0&&(r=o,t=aa(e,o))),t===1))throw n=gr,Wt(e,0),St(e,r),Te(e,ie()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(w(345));case 2:Ut(e,ze,ut);break;case 3:if(St(e,r),(r&130023424)===r&&(t=Ka+500-ie(),10<t)){if(oi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){ke(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ao(Ut.bind(null,e,ze,ut),t);break}Ut(e,ze,ut);break;case 4:if(St(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-Ze(r);o=1<<a,a=t[a],a>i&&(i=a),r&=~o}if(r=i,r=ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Gp(r/1960))-r,10<r){e.timeoutHandle=Ao(Ut.bind(null,e,ze,ut),r);break}Ut(e,ze,ut);break;case 5:Ut(e,ze,ut);break;default:throw Error(w(329))}}}return Te(e,ie()),e.callbackNode===n?Ec.bind(null,e):null}function aa(e,t){var n=Zn;return e.current.memoizedState.isDehydrated&&(Wt(e,t).flags|=256),e=Si(e,t),e!==2&&(t=ze,ze=n,t!==null&&la(t)),e}function la(e){ze===null?ze=e:ze.push.apply(ze,e)}function Zp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!qe(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function St(e,t){for(t&=~Ya,t&=~Ri,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ze(t),r=1<<n;e[n]=-1,t&=~r}}function cs(e){if(V&6)throw Error(w(327));bn();var t=oi(e,0);if(!(t&1))return Te(e,ie()),null;var n=Si(e,t);if(e.tag!==0&&n===2){var r=Lo(e);r!==0&&(t=r,n=aa(e,r))}if(n===1)throw n=gr,Wt(e,0),St(e,t),Te(e,ie()),n;if(n===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ut(e,ze,ut),Te(e,ie()),null}function Xa(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Nn=ie()+500,Ti&&It())}}function Zt(e){jt!==null&&jt.tag===0&&!(V&6)&&bn();var t=V;V|=1;var n=Ve.transition,r=W;try{if(Ve.transition=null,W=1,e)return e()}finally{W=r,Ve.transition=n,V=t,!(V&6)&&It()}}function Ga(){Me=hn.current,X(hn)}function Wt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,zp(n)),ae!==null)for(n=ae.return;n!==null;){var r=n;switch(_a(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ci();break;case 3:Cn(),X(Pe),X(ye),Fa();break;case 5:Ia(r);break;case 4:Cn();break;case 13:X(J);break;case 19:X(J);break;case 10:Da(r.type._context);break;case 22:case 23:Ga()}n=n.return}if(ce=e,ae=e=Mt(e.current,null),fe=Me=t,se=0,gr=null,Ya=Ri=Gt=0,ze=Zn=null,Vt!==null){for(t=0;t<Vt.length;t++)if(n=Vt[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var a=o.next;o.next=i,r.next=a}n.pending=r}Vt=null}return e}function jc(e,t){do{var n=ae;try{if(Ma(),Xr.current=yi,xi){for(var r=q.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}xi=!1}if(Xt=0,ue=le=q=null,Xn=!1,fr=0,Qa.current=null,n===null||n.return===null){se=1,gr=t,ae=null;break}e:{var o=e,a=n.return,l=n,s=t;if(t=fe,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var f=s,g=l,v=g.tag;if(!(g.mode&1)&&(v===0||v===11||v===15)){var m=g.alternate;m?(g.updateQueue=m.updateQueue,g.memoizedState=m.memoizedState,g.lanes=m.lanes):(g.updateQueue=null,g.memoizedState=null)}var y=Zl(a);if(y!==null){y.flags&=-257,Jl(y,a,l,o,t),y.mode&1&&Gl(o,f,t),t=y,s=f;var p=t.updateQueue;if(p===null){var k=new Set;k.add(s),t.updateQueue=k}else p.add(s);break e}else{if(!(t&1)){Gl(o,f,t),Za();break e}s=Error(w(426))}}else if(G&&l.mode&1){var $=Zl(a);if($!==null){!($.flags&65536)&&($.flags|=256),Jl($,a,l,o,t),Ta(zn(s,l));break e}}o=s=zn(s,l),se!==4&&(se=2),Zn===null?Zn=[o]:Zn.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var c=sc(o,s,t);Hl(o,c);break e;case 1:l=s;var u=o.type,h=o.stateNode;if(!(o.flags&128)&&(typeof u.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Tt===null||!Tt.has(h)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=uc(o,l,t);Hl(o,x);break e}}o=o.return}while(o!==null)}Nc(n)}catch(b){t=b,ae===n&&n!==null&&(ae=n=n.return);continue}break}while(!0)}function Cc(){var e=wi.current;return wi.current=yi,e===null?yi:e}function Za(){(se===0||se===3||se===2)&&(se=4),ce===null||!(Gt&268435455)&&!(Ri&268435455)||St(ce,fe)}function Si(e,t){var n=V;V|=2;var r=Cc();(ce!==e||fe!==t)&&(ut=null,Wt(e,t));do try{Jp();break}catch(i){jc(e,i)}while(!0);if(Ma(),V=n,wi.current=r,ae!==null)throw Error(w(261));return ce=null,fe=0,se}function Jp(){for(;ae!==null;)zc(ae)}function qp(){for(;ae!==null&&!Ed();)zc(ae)}function zc(e){var t=_c(e.alternate,e,Me);e.memoizedProps=e.pendingProps,t===null?Nc(e):ae=t,Qa.current=null}function Nc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Qp(n,t),n!==null){n.flags&=32767,ae=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{se=6,ae=null;return}}else if(n=Wp(n,t,Me),n!==null){ae=n;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);se===0&&(se=5)}function Ut(e,t,n){var r=W,i=Ve.transition;try{Ve.transition=null,W=1,ef(e,t,n,r)}finally{Ve.transition=i,W=r}return null}function ef(e,t,n,r){do bn();while(jt!==null);if(V&6)throw Error(w(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Dd(e,o),e===ce&&(ae=ce=null,fe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ar||(Ar=!0,Tc(ii,function(){return bn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ve.transition,Ve.transition=null;var a=W;W=1;var l=V;V|=4,Qa.current=null,Kp(e,n),kc(n,e),wp(Io),ai=!!Oo,Io=Oo=null,e.current=n,Xp(n),jd(),V=l,W=a,Ve.transition=o}else e.current=n;if(Ar&&(Ar=!1,jt=e,ki=i),o=e.pendingLanes,o===0&&(Tt=null),Nd(n.stateNode),Te(e,ie()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(bi)throw bi=!1,e=ia,ia=null,e;return ki&1&&e.tag!==0&&bn(),o=e.pendingLanes,o&1?e===oa?Jn++:(Jn=0,oa=e):Jn=0,It(),null}function bn(){if(jt!==null){var e=su(ki),t=Ve.transition,n=W;try{if(Ve.transition=null,W=16>e?16:e,jt===null)var r=!1;else{if(e=jt,jt=null,ki=0,V&6)throw Error(w(331));var i=V;for(V|=4,z=e.current;z!==null;){var o=z,a=o.child;if(z.flags&16){var l=o.deletions;if(l!==null){for(var s=0;s<l.length;s++){var f=l[s];for(z=f;z!==null;){var g=z;switch(g.tag){case 0:case 11:case 15:Gn(8,g,o)}var v=g.child;if(v!==null)v.return=g,z=v;else for(;z!==null;){g=z;var m=g.sibling,y=g.return;if(yc(g),g===f){z=null;break}if(m!==null){m.return=y,z=m;break}z=y}}}var p=o.alternate;if(p!==null){var k=p.child;if(k!==null){p.child=null;do{var $=k.sibling;k.sibling=null,k=$}while(k!==null)}}z=o}}if(o.subtreeFlags&2064&&a!==null)a.return=o,z=a;else e:for(;z!==null;){if(o=z,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Gn(9,o,o.return)}var c=o.sibling;if(c!==null){c.return=o.return,z=c;break e}z=o.return}}var u=e.current;for(z=u;z!==null;){a=z;var h=a.child;if(a.subtreeFlags&2064&&h!==null)h.return=a,z=h;else e:for(a=u;z!==null;){if(l=z,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Di(9,l)}}catch(b){ne(l,l.return,b)}if(l===a){z=null;break e}var x=l.sibling;if(x!==null){x.return=l.return,z=x;break e}z=l.return}}if(V=i,It(),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Ci,e)}catch{}r=!0}return r}finally{W=n,Ve.transition=t}}return!1}function ds(e,t,n){t=zn(n,t),t=sc(e,t,1),e=_t(e,t,1),t=ke(),e!==null&&(yr(e,1,t),Te(e,t))}function ne(e,t,n){if(e.tag===3)ds(e,e,n);else for(;t!==null;){if(t.tag===3){ds(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Tt===null||!Tt.has(r))){e=zn(n,e),e=uc(t,e,1),t=_t(t,e,1),e=ke(),t!==null&&(yr(t,1,e),Te(t,e));break}}t=t.return}}function tf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ke(),e.pingedLanes|=e.suspendedLanes&n,ce===e&&(fe&n)===n&&(se===4||se===3&&(fe&130023424)===fe&&500>ie()-Ka?Wt(e,0):Ya|=n),Te(e,t)}function Pc(e,t){t===0&&(e.mode&1?(t=_r,_r<<=1,!(_r&130023424)&&(_r=4194304)):t=1);var n=ke();e=gt(e,t),e!==null&&(yr(e,t,n),Te(e,n))}function nf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Pc(e,n)}function rf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(t),Pc(e,n)}var _c;_c=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Pe.current)Ne=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ne=!1,Hp(e,t,n);Ne=!!(e.flags&131072)}else Ne=!1,G&&t.flags&1048576&&Du(t,fi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Zr(e,t),e=t.pendingProps;var i=Sn(t,ye.current);wn(t,n),i=Ua(null,t,r,e,i,n);var o=Ba();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,_e(r)?(o=!0,di(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,$a(t),i.updater=Mi,t.stateNode=i,i._reactInternals=t,Yo(t,r,e,n),t=Go(null,t,r,!0,o,n)):(t.tag=0,G&&o&&Pa(t),be(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Zr(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=af(r),e=Ke(r,e),i){case 0:t=Xo(null,t,r,e,n);break e;case 1:t=ts(null,t,r,e,n);break e;case 11:t=ql(null,t,r,e,n);break e;case 14:t=es(null,t,r,Ke(r.type,e),n);break e}throw Error(w(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ke(r,i),Xo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ke(r,i),ts(e,t,r,i,n);case 3:e:{if(fc(t),e===null)throw Error(w(387));r=t.pendingProps,o=t.memoizedState,i=o.element,Au(e,t),gi(t,r,null,n);var a=t.memoizedState;if(r=a.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=zn(Error(w(423)),t),t=ns(e,t,r,n,i);break e}else if(r!==i){i=zn(Error(w(424)),t),t=ns(e,t,r,n,i);break e}else for(De=Pt(t.stateNode.containerInfo.firstChild),Re=t,G=!0,Ge=null,n=Iu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(En(),r===i){t=vt(e,t,n);break e}be(e,t,r,n)}t=t.child}return t;case 5:return Uu(t),e===null&&Ho(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Fo(r,i)?a=null:o!==null&&Fo(r,o)&&(t.flags|=32),pc(e,t),be(e,t,a,n),t.child;case 6:return e===null&&Ho(t),null;case 13:return mc(e,t,n);case 4:return Oa(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=jn(t,null,r,n):be(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ke(r,i),ql(e,t,r,i,n);case 7:return be(e,t,t.pendingProps,n),t.child;case 8:return be(e,t,t.pendingProps.children,n),t.child;case 12:return be(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=i.value,Y(mi,r._currentValue),r._currentValue=a,o!==null)if(qe(o.value,a)){if(o.children===i.children&&!Pe.current){t=vt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){a=o.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=ft(-1,n&-n),s.tag=2;var f=o.updateQueue;if(f!==null){f=f.shared;var g=f.pending;g===null?s.next=s:(s.next=g.next,g.next=s),f.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Wo(o.return,n,t),l.lanes|=n;break}s=s.next}}else if(o.tag===10)a=o.type===t.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(w(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Wo(a,n,t),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===t){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}be(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,wn(t,n),i=He(i),r=r(i),t.flags|=1,be(e,t,r,n),t.child;case 14:return r=t.type,i=Ke(r,t.pendingProps),i=Ke(r.type,i),es(e,t,r,i,n);case 15:return cc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ke(r,i),Zr(e,t),t.tag=1,_e(r)?(e=!0,di(t)):e=!1,wn(t,n),lc(t,r,i),Yo(t,r,i,n),Go(null,t,r,!0,e,n);case 19:return hc(e,t,n);case 22:return dc(e,t,n)}throw Error(w(156,t.tag))};function Tc(e,t){return iu(e,t)}function of(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Be(e,t,n,r){return new of(e,t,n,r)}function Ja(e){return e=e.prototype,!(!e||!e.isReactComponent)}function af(e){if(typeof e=="function")return Ja(e)?1:0;if(e!=null){if(e=e.$$typeof,e===va)return 11;if(e===xa)return 14}return 2}function Mt(e,t){var n=e.alternate;return n===null?(n=Be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ei(e,t,n,r,i,o){var a=2;if(r=e,typeof e=="function")Ja(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case on:return Qt(n.children,i,o,t);case ga:a=8,i|=8;break;case vo:return e=Be(12,n,t,i|2),e.elementType=vo,e.lanes=o,e;case xo:return e=Be(13,n,t,i),e.elementType=xo,e.lanes=o,e;case yo:return e=Be(19,n,t,i),e.elementType=yo,e.lanes=o,e;case Us:return $i(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Fs:a=10;break e;case As:a=9;break e;case va:a=11;break e;case xa:a=14;break e;case wt:a=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return t=Be(a,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function Qt(e,t,n,r){return e=Be(7,e,r,t),e.lanes=n,e}function $i(e,t,n,r){return e=Be(22,e,r,t),e.elementType=Us,e.lanes=n,e.stateNode={isHidden:!1},e}function fo(e,t,n){return e=Be(6,e,null,t),e.lanes=n,e}function mo(e,t,n){return t=Be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function lf(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Yi(0),this.expirationTimes=Yi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Yi(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function qa(e,t,n,r,i,o,a,l,s){return e=new lf(e,t,n,l,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Be(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$a(o),e}function sf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Lc(e){if(!e)return Rt;e=e._reactInternals;e:{if(qt(e)!==e||e.tag!==1)throw Error(w(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(_e(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(w(171))}if(e.tag===1){var n=e.type;if(_e(n))return Lu(e,n,t)}return t}function Mc(e,t,n,r,i,o,a,l,s){return e=qa(n,r,!0,e,i,o,a,l,s),e.context=Lc(null),n=e.current,r=ke(),i=Lt(n),o=ft(r,i),o.callback=t??null,_t(n,o,i),e.current.lanes=i,yr(e,i,r),Te(e,r),e}function Oi(e,t,n,r){var i=t.current,o=ke(),a=Lt(i);return n=Lc(n),t.context===null?t.context=n:t.pendingContext=n,t=ft(o,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=_t(i,t,a),e!==null&&(Je(e,i,a,o),Kr(e,i,a)),a}function Ei(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ps(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function el(e,t){ps(e,t),(e=e.alternate)&&ps(e,t)}function uf(){return null}var Dc=typeof reportError=="function"?reportError:function(e){console.error(e)};function tl(e){this._internalRoot=e}Ii.prototype.render=tl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(w(409));Oi(e,t,null,null)};Ii.prototype.unmount=tl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Zt(function(){Oi(null,e,null,null)}),t[ht]=null}};function Ii(e){this._internalRoot=e}Ii.prototype.unstable_scheduleHydration=function(e){if(e){var t=du();e={blockedOn:null,target:e,priority:t};for(var n=0;n<kt.length&&t!==0&&t<kt[n].priority;n++);kt.splice(n,0,e),n===0&&fu(e)}};function nl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Fi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function fs(){}function cf(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var f=Ei(a);o.call(f)}}var a=Mc(t,r,e,0,null,!1,!1,"",fs);return e._reactRootContainer=a,e[ht]=a.current,sr(e.nodeType===8?e.parentNode:e),Zt(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var f=Ei(s);l.call(f)}}var s=qa(e,0,!1,null,null,!1,!1,"",fs);return e._reactRootContainer=s,e[ht]=s.current,sr(e.nodeType===8?e.parentNode:e),Zt(function(){Oi(t,s,n,r)}),s}function Ai(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o;if(typeof i=="function"){var l=i;i=function(){var s=Ei(a);l.call(s)}}Oi(t,a,e,i)}else a=cf(n,t,e,i,r);return Ei(a)}uu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Bn(t.pendingLanes);n!==0&&(ba(t,n|1),Te(t,ie()),!(V&6)&&(Nn=ie()+500,It()))}break;case 13:Zt(function(){var r=gt(e,1);if(r!==null){var i=ke();Je(r,e,1,i)}}),el(e,1)}};ka=function(e){if(e.tag===13){var t=gt(e,134217728);if(t!==null){var n=ke();Je(t,e,134217728,n)}el(e,134217728)}};cu=function(e){if(e.tag===13){var t=Lt(e),n=gt(e,t);if(n!==null){var r=ke();Je(n,e,t,r)}el(e,t)}};du=function(){return W};pu=function(e,t){var n=W;try{return W=e,t()}finally{W=n}};Po=function(e,t,n){switch(t){case"input":if(ko(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=_i(r);if(!i)throw Error(w(90));Vs(r),ko(r,i)}}}break;case"textarea":Ws(e,n);break;case"select":t=n.value,t!=null&&gn(e,!!n.multiple,t,!1)}};Js=Xa;qs=Zt;var df={usingClientEntryPoint:!1,Events:[br,un,_i,Gs,Zs,Xa]},Fn={findFiberByHostInstance:Bt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},pf={bundleType:Fn.bundleType,version:Fn.version,rendererPackageName:Fn.rendererPackageName,rendererConfig:Fn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=nu(e),e===null?null:e.stateNode},findFiberByHostInstance:Fn.findFiberByHostInstance||uf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ur=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ur.isDisabled&&Ur.supportsFiber)try{Ci=Ur.inject(pf),ot=Ur}catch{}}Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=df;Oe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!nl(t))throw Error(w(200));return sf(e,t,null,n)};Oe.createRoot=function(e,t){if(!nl(e))throw Error(w(299));var n=!1,r="",i=Dc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=qa(e,1,!1,null,null,n,!1,r,i),e[ht]=t.current,sr(e.nodeType===8?e.parentNode:e),new tl(t)};Oe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=nu(t),e=e===null?null:e.stateNode,e};Oe.flushSync=function(e){return Zt(e)};Oe.hydrate=function(e,t,n){if(!Fi(t))throw Error(w(200));return Ai(null,e,t,!0,n)};Oe.hydrateRoot=function(e,t,n){if(!nl(e))throw Error(w(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",a=Dc;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Mc(t,null,e,1,n??null,i,!1,o,a),e[ht]=t.current,sr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Ii(t)};Oe.render=function(e,t,n){if(!Fi(t))throw Error(w(200));return Ai(null,e,t,!1,n)};Oe.unmountComponentAtNode=function(e){if(!Fi(e))throw Error(w(40));return e._reactRootContainer?(Zt(function(){Ai(null,null,e,!1,function(){e._reactRootContainer=null,e[ht]=null})}),!0):!1};Oe.unstable_batchedUpdates=Xa;Oe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Fi(n))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return Ai(e,t,n,!1,r)};Oe.version="18.3.1-next-f1338f8080-20240426";function Rc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rc)}catch(e){console.error(e)}}Rc(),Rs.exports=Oe;var sa=Rs.exports,$c,ms=sa;$c=ms.createRoot,ms.hydrateRoot;const ff="/prerak-portfolio/assets/background-portrait-Bd3BrFc_.jpg",mf="/prerak-portfolio/assets/lore-guide-persona-B54Kk0ne.png",hs="/prerak-portfolio/",Ce={name:"Prerak Pandey",title:"Backend / Full-Stack Engineer",tagline:"building game-technology systems",location:"Chicago, IL · Open to Amsterdam / relocation",email:"prerak.pandey7@gmail.com",github:"https://github.com/prerak7-dev",linkedin:"https://www.linkedin.com/in/prerak-pandey",resume:`${hs}Prerak_Pandey_Resume.pdf`,photo:`${hs}profile-photo.png`},lt=[{id:"hero",label:"Intro",title:"Backend + Game Tech",note:"positioning"},{id:"tab-content",label:"Content",title:"Tabbed Portfolio",note:"selected view"},{id:"contact",label:"Contact",title:"Next Step",note:"links"}],hf=[{number:"01",title:"Aegis Animation Pipeline",eyebrow:"Java / Spring Boot / Redis / Kafka",summary:"A backend animation-processing pipeline that ingests mocap, coordinates long-running work through asynchronous services, validates output, and publishes Unreal-importable JSON overlays.",tags:["Java","Spring Boot","Kafka","Redis","JSON","Validation"],bullets:["Kafka-separated ingestion, processing, validation, and publishing flow.","Redis-backed job state for progress tracking, retries, and fault isolation.","JSON overlay output designed for Unreal procedural-animation import.","Built as a game-tech portfolio system for online-service architecture credibility."]},{number:"02",title:"Aegis Motion Plugin",eyebrow:"Unreal Engine C++ / Editor Tooling",summary:"A curve-driven Unreal Engine plugin for procedural animation authoring, runtime pose driving, data-asset workflows, and debug visualization.",tags:["Unreal C++","Data Assets","Editor Tools","Animation Curves","Blueprint API"],bullets:["Procedural motion driver using authored data assets and animation curves.","Runtime smoothing, action playback, debug overlays, and editor-first iteration.","Designed to connect backend-generated animation data to Unreal workflows.","Portfolio centerpiece for technical animation and tools engineering storytelling."]}],gf=[["Data Sources","Mocap · BVH · JSON · client/CMS data"],["Ingest Service","Validation, normalization, job creation"],["Kafka Topics","Async message boundaries between services"],["Processors","Curve generation and overlay shaping"],["Redis State","Progress, metadata, retry/fault isolation"],["JSON Overlays","Unreal-ready procedural animation output"],["Unreal Import","Data assets, curves, runtime driver"]],vf=[["Backend & Services",["Java","Spring Boot","C#",".NET","Node.js","REST APIs","GraphQL"]],["Cloud & Delivery",["AWS","S3","Cognito","IAM","Lambda","Docker","Git","CI/CD"]],["Game Tech",["Unreal Engine C++","Anim Blueprints","Mocap","Data Assets","Editor Tools"]],["Data & DevOps",["Kafka","Redis","SQL/PostgreSQL","MySQL","Logging","Monitoring"]]],xf=[{meta:"Jul 2021 - Apr 2024 / Des Plaines, IL",title:"Web Application Developer",subtitle:"Americaneagle.com",body:"Built and maintained enterprise Sitecore and headless web applications for insurance, nonprofit, medical/scientific, and data-sector clients across CMS integrations, cloud services, CI/CD deployments, reporting tools, and client delivery.",bullets:["Worked across backend services, frontend integration, QA cycles, deployments, and stakeholder-facing delivery.","Translated ambiguous client requirements into maintainable implementation plans and production releases."]},{meta:"Dec 2017 - May 2021 / Mahwah, NJ",title:"Student Data Analyst",subtitle:"Ramapo College of New Jersey",body:"Analyzed academic and non-academic data to support advising allocation, reporting, and student-success planning while automating recurring reporting workflows.",bullets:["Built a practical foundation in data cleaning, analysis, reporting, and operational communication.","Turned institutional data into recommendations that could be used by advising and planning teams."]}],yf=[{meta:"2017 - 2021 / Mahwah, NJ",title:"Ramapo College of New Jersey",subtitle:"Applied computing, analytics, and systems foundation",body:"Developed the academic base for software engineering, data analysis, reporting workflows, and technical communication while working in a student data role.",bullets:["Combined coursework with hands-on institutional data analysis and recurring reporting responsibilities.","Built the habits that now show up in backend design: clarity, traceability, and practical delivery."]},{meta:"Ongoing",title:"Independent Technical Study",subtitle:"Backend systems, game technology, and production tooling",body:"Continues building portfolio systems around async services, cloud delivery, Unreal tooling, procedural animation, and content pipeline architecture.",bullets:["Uses portfolio projects to connect service architecture with game-production workflows.","Focuses on production-adjacent systems that are visible, explainable, and extensible."]}],ho=[{meta:"Photography",title:"Visual Field Notes",subtitle:"Composition, light, cities, landscapes",body:"A personal practice for noticing detail, framing atmosphere, and building a sharper eye for environments and visual storytelling.",bullets:["Street, travel, portrait, and landscape-oriented collections.","Useful creative muscle for game worlds, mood, and presentation."],media:[{type:"photo",src:"",alt:"City light and architectural framing study",meta:"Photo / Urban study",caption:"A placeholder slot for a city, street, or architecture frame with notes about light, texture, and composition."},{type:"photo",src:"",alt:"Landscape atmosphere and depth study",meta:"Photo / Landscape",caption:"A place to collect outdoor compositions, weather, mountain silhouettes, skyline layers, or wide environmental shots."},{type:"video",src:"",poster:"",alt:"Short motion study from a photo walk",meta:"Video / Motion note",caption:"A short clip slot for movement, ambient detail, camera tests, or environmental reference gathered during a walk."}]},{meta:"Writing",title:"Essays, Notes, and Narrative Sketches",subtitle:"Reflection, technical storytelling, creative work",body:"Writing as a way to clarify ideas, document experiences, and shape technical or personal material into something readable and memorable.",bullets:["Short-form reflective writing and project narratives.","A bridge between engineering detail and human context."],media:[{type:"photo",src:"",alt:"Writing desk, draft, or notebook image",meta:"Photo / Draft context",caption:"A visual cover slot for an essay, notebook scan, workspace image, or thematic reference connected to a piece of writing."},{type:"photo",src:"",alt:"Narrative sketch or essay cover image",meta:"Photo / Essay cover",caption:"A caption space for the idea behind a personal essay, technical reflection, project narrative, or creative sketch."},{type:"video",src:"",poster:"",alt:"Reading, voice note, or process clip",meta:"Video / Process",caption:"A video slot for a reading excerpt, process note, recorded thought, or short context clip around a written piece."}]},{meta:"Travel / Adventure",title:"Experience-Led Exploration",subtitle:"Places, movement, and perspective",body:"Travel and adventure experiences feed the portfolio world-building sensibility: routes, weather, terrain, culture, and the feeling of moving through a place.",bullets:["Designed to expand into location-specific stories, galleries, or field logs.","Pairs naturally with photography and writing sections."],media:[{type:"photo",src:"",alt:"Route, trail, or destination field image",meta:"Photo / Field log",caption:"A slot for travel memories, trail references, city routes, or the first image in a location-specific adventure note."},{type:"video",src:"",poster:"",alt:"Adventure movement or travel atmosphere clip",meta:"Video / Movement",caption:"A clip slot for road movement, weather, terrain, arrival moments, or ambient details from a trip."},{type:"photo",src:"",alt:"Culture, food, people, or place detail",meta:"Photo / Place detail",caption:"A caption area for the small details that make a place memorable: textures, signs, rituals, meals, or quiet moments."}]}],Br=[{id:"portfolio",label:"Portfolio Projects",kicker:"01 / Systems",summary:"Selected technical portfolio work with backend architecture, async processing, and Unreal-facing game-technology context.",blocks:[{type:"projects"},{type:"architecture"},{type:"stack"}]},{id:"professional",label:"Professional Timeline",kicker:"02 / Work",summary:"A detailed professional track from data analysis into production web engineering and client-facing delivery.",blocks:[{type:"timeline",eyebrow:"Professional timeline",title:"Production web engineering plus data-analysis roots.",items:xf}]},{id:"education",label:"Education Timeline",kicker:"03 / Learning",summary:"Academic foundation and ongoing technical study behind the engineering, data, and game-technology work.",blocks:[{type:"timeline",eyebrow:"Education timeline",title:"Academic foundation, self-directed study, and technical growth.",items:yf}]},{id:"personal",label:"Personal Projects",kicker:"04 / Outside Work",summary:"Creative and exploratory projects that shape the visual, narrative, and experiential side of the portfolio.",blocks:[{type:"personal",eyebrow:"Personal projects",title:"Photography, writing, travel, and adventure experiences."}]}],wf={0:["Clear","clear"],1:["Mainly clear","clear"],2:["Partly cloudy","cloud"],3:["Overcast","cloud"],45:["Fog","fog"],48:["Rime fog","fog"],51:["Light drizzle","drizzle"],53:["Drizzle","drizzle"],55:["Dense drizzle","rain"],56:["Freezing drizzle","snow"],57:["Dense freezing drizzle","snow"],61:["Slight rain","rain"],63:["Rain","rain"],65:["Heavy rain","heavy-rain"],66:["Freezing rain","snow"],67:["Heavy freezing rain","snow"],71:["Slight snow","snow"],73:["Snow","snow"],75:["Heavy snow","heavy-snow"],77:["Snow grains","snow"],80:["Rain showers","rain"],81:["Rain showers","rain"],82:["Violent rain showers","heavy-rain"],85:["Snow showers","snow"],86:["Heavy snow showers","heavy-snow"],95:["Thunderstorm","storm"],96:["Thunderstorm with hail","storm"],99:["Heavy thunderstorm with hail","storm"]},gs={clear:"Clear glow",cloud:"Cloud cover",fog:"Fog",drizzle:"Drizzle",rain:"Rain","heavy-rain":"Heavy rain",storm:"Lightning",snow:"Snow","heavy-snow":"Heavy snow"},Ft=["snow","rain","storm","cloud","clear"];async function bf(e,t,n){const r=`${e.toFixed(2)}, ${t.toFixed(2)}`;try{const i=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${e}&longitude=${t}&localityLanguage=en`,o=await fetch(i);if(!o.ok)throw new Error("Location lookup failed");const a=await o.json(),l=a.locality||a.city||a.principalSubdivision,s=a.principalSubdivisionCode||a.principalSubdivision,f=a.countryCode||a.countryName;return[l,s,f].filter(Boolean).filter((g,v,m)=>m.indexOf(g)===v).join(", ")||r}catch{return r}}function vs(e=new Date){const t=e.getHours()+e.getMinutes()/60;return t>=5&&t<9?{key:"dawn",label:"Dawn"}:t>=9&&t<17?{key:"day",label:"Day"}:t>=17&&t<20.5?{key:"dusk",label:"Dusk"}:{key:"night",label:"Night"}}function vr(e,t,n){return Math.min(n,Math.max(t,e))}function rl({direction:e="right"}){return d.jsxs("svg",{className:`sketch-pointer ${e}`,viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[d.jsx("path",{className:"sketch-pointer-shadow",d:"M7.2 4.8c4.4 2 7.7 4.2 10.1 7.4-3.2 2.7-6.1 4.8-10.5 6.8.8-4.8.8-9.2.4-14.2Z"}),d.jsx("path",{d:"M6.3 4.2c4.9 2.2 8.4 4.5 11.2 7.9-3.6 3-6.6 5.2-11.6 7.4.9-5.1.9-10 .4-15.3Z"})]})}function xs(){return d.jsx("img",{src:Ce.photo,alt:Ce.name,className:"profile-avatar"})}function Oc({children:e}){return d.jsx("span",{className:"chip",children:e})}function kf(){const[e,t]=_.useState(()=>new Date);return _.useEffect(()=>{const n=window.setInterval(()=>t(new Date),3e4);return()=>window.clearInterval(n)},[]),e}function Sf(){const[e,t]=_.useState(0);return _.useEffect(()=>{const n=()=>{const r=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);t(vr(window.scrollY/r,0,1))};return n(),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),()=>{window.removeEventListener("scroll",n),window.removeEventListener("resize",n)}},[]),e}function Ef(){_.useEffect(()=>{var n,r;const e=()=>{const i=window.visualViewport||window,o=i.width||window.innerWidth,a=i.height||window.innerHeight,l=18,s=document.querySelector(".floating-hud"),f=document.querySelector(".mission-map"),g=s?Math.min(1,(o-l*2)/s.offsetWidth,(a-l*2)/s.offsetHeight):1,v=f?Math.min(.9,(o-l*2)/f.offsetWidth,(a-l*2)/f.offsetHeight):.9;document.documentElement.style.setProperty("--hud-fit-scale",String(vr(g,.42,1))),document.documentElement.style.setProperty("--map-fit-scale",String(vr(v,.42,.9)))};e(),window.addEventListener("resize",e),window.addEventListener("orientationchange",e),(n=window.visualViewport)==null||n.addEventListener("resize",e),(r=window.visualViewport)==null||r.addEventListener("scroll",e);const t=window.setInterval(e,400);return()=>{var i,o;window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e),(i=window.visualViewport)==null||i.removeEventListener("resize",e),(o=window.visualViewport)==null||o.removeEventListener("scroll",e),window.clearInterval(t)}},[])}function jf(){const[e,t]=_.useState(0);return _.useEffect(()=>{const n=()=>{const r=window.innerHeight*.44;let i=0;lt.forEach((o,a)=>{const l=document.getElementById(o.id);if(!l)return;l.getBoundingClientRect().top<=r&&(i=a)}),t(i)};return n(),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),()=>{window.removeEventListener("scroll",n),window.removeEventListener("resize",n)}},[]),e}function Cf(){_.useEffect(()=>{const t=Array.from(document.querySelectorAll("[data-tilt]")).map(n=>{const r=o=>{const a=n.getBoundingClientRect(),l=(o.clientX-a.left)/a.width-.5,s=(o.clientY-a.top)/a.height-.5;n.style.setProperty("--rx",`${(-s*4).toFixed(2)}deg`),n.style.setProperty("--ry",`${(l*5).toFixed(2)}deg`),n.style.setProperty("--mx",`${o.clientX-a.left}px`),n.style.setProperty("--my",`${o.clientY-a.top}px`)},i=()=>{n.style.setProperty("--rx","0deg"),n.style.setProperty("--ry","0deg")};return n.addEventListener("pointermove",r),n.addEventListener("pointerleave",i),()=>{n.removeEventListener("pointermove",r),n.removeEventListener("pointerleave",i)}});return()=>t.forEach(n=>n())},[])}function zf({mode:e,weather:t,weatherPower:n,activeSector:r,scrollProgress:i,timeProfile:o,fallTheme:a,springTheme:l,winterTheme:s}){const f=_.useRef(null),g=_.useRef({x:.55,y:.45,down:!1}),v=_.useRef(new Set),m=_.useRef({mode:e,weather:t,weatherPower:n,activeSector:r,scrollProgress:i,timeProfile:o,fallTheme:a,springTheme:l,winterTheme:s});return _.useEffect(()=>{m.current={mode:e,weather:t,weatherPower:n,activeSector:r,scrollProgress:i,timeProfile:o,fallTheme:a,springTheme:l,winterTheme:s}},[e,t,n,r,i,o,a,l,s]),_.useEffect(()=>{const y=f.current,p=y.getContext("2d"),k=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let $=0,c=window.innerWidth,u=window.innerHeight,h=1;const x=[],b=[];let S="";const N={dawn:["#020202","#181818","#f7f7f7"],day:["#050505","#222222","#ffffff"],dusk:["#010101","#121212","#eeeeee"],night:["#000000","#0c0c0c","#ffffff"]};function E(){c=window.innerWidth,u=window.innerHeight,h=Math.min(window.devicePixelRatio||1,2),y.width=Math.floor(c*h),y.height=Math.floor(u*h),y.style.width=`${c}px`,y.style.height=`${u}px`,p.setTransform(h,0,0,h,0,0),b.length=0,de(!0);for(let P=0;P<120;P+=1)b.push({x:Math.random()*c,y:Math.random()*u*.72,r:Math.random()*1.6+.2,a:Math.random()*.72+.12})}function Q(){return`${m.current.weather}:${Math.round(m.current.weatherPower*20)}`}function I(){const P=m.current.weather,L=P==="fog"||P==="cloud"?.6:P==="heavy-rain"||P==="heavy-snow"||P==="storm"?1.35:1;return Math.floor((k?50:160)*m.current.weatherPower*L)}function de(P=!1){x.length=0,S=Q();const L=I();for(let A=0;A<L;A+=1)x.push(et(Math.random()*c,P?Math.random()*u:-28))}function et(P=Math.random()*c,L=-30){const A=m.current.weather,R=A==="snow"||A==="heavy-snow",O=A==="heavy-rain"||A==="heavy-snow"||A==="storm",D=A==="fog"||A==="cloud",F=A==="clear";return{x:P,y:L,r:D?Math.random()*34+18:F?Math.random()*1.8+.4:R?Math.random()*(O?2.7:2)+.8:Math.random()*(O?1.9:1.3)+.5,vx:D?Math.random()*.46-.23:F?Math.random()*.5-.25:R?Math.random()*1.1-.55:Math.random()*(O?4.6:3.1)-(O?2.3:1.55),vy:D?Math.random()*.18+.02:F?Math.random()*.35+.08:R?Math.random()*(O?2.1:1.5)+.6:Math.random()*(O?6.4:4.6)+(A==="drizzle"?2.2:3.4),life:Math.random()*100,a:D?Math.random()*.08+(A==="fog"?.08:.045):F?Math.random()*.22+.08:R?Math.random()*.48+.22:Math.random()*(O?.56:.42)+.16,pulse:Math.random()*Math.PI*2}}function Fe(P){const L=m.current.fallTheme,A=m.current.springTheme,R=m.current.winterTheme,[O,D,F]=R?["#f8fdff","#bdeeff","#ffffff"]:A?["#edfdf7","#70c9e8","#0b6b4f"]:L?["#f7d39d","#f08a2e","#ffe36f"]:N[m.current.timeProfile.key]||N.night,Le=g.current,oe=p.createLinearGradient(0,0,0,u);oe.addColorStop(0,O),oe.addColorStop(.54,D),oe.addColorStop(1,R?"#e8f7ff":A?"#0b3028":L?"#421321":"#000000"),p.fillStyle=oe,p.fillRect(0,0,c,u);const C=c*(.68+(Le.x-.5)*.07),te=u*(.25+(Le.y-.5)*.05),he=p.createRadialGradient(C,te,0,C,te,c*.48);he.addColorStop(0,R?"rgba(90,150,184,.82)":A||L?`${F}4b`:"rgba(255,255,255,.86)"),he.addColorStop(.18,R?"rgba(90,150,184,.5)":A?"rgba(5,92,65,.28)":L?"rgba(73,19,35,.38)":"rgba(255,255,255,.64)"),he.addColorStop(.44,R?"rgba(90,150,184,.28)":A?"rgba(5,92,65,.12)":L?"rgba(73,19,35,.2)":"rgba(255,255,255,.36)"),he.addColorStop(1,R?"rgba(90,150,184,0)":A?"rgba(5,92,65,0)":L?"rgba(73,19,35,0)":"rgba(255,255,255,0)"),p.fillStyle=he,p.fillRect(0,0,c,u),p.save();const H=m.current.timeProfile.key==="day"?.23:1;b.forEach(je=>{p.beginPath(),p.fillStyle=R?`rgba(255,255,255,${je.a*.42})`:A?`rgba(246,255,255,${je.a*H})`:L?`rgba(255,242,178,${je.a*H})`:`rgba(255,255,255,${je.a*H})`,p.arc(je.x+(Le.x-.5)*22,je.y,je.r,0,Math.PI*2),p.fill()}),p.restore(),en(C,te,P),Qe(P)}function en(P,L,A){const R=m.current.fallTheme,O=m.current.springTheme,D=m.current.winterTheme;p.save(),p.translate(P,L),p.rotate(A*13e-5),p.shadowColor=D?"rgba(90,150,184,.98)":O?"rgba(3,92,60,.76)":R?"rgba(73,19,35,.82)":"rgba(255,255,255,1)",p.shadowBlur=D?42:O?18:R?16:104;for(let F=0;F<5;F+=1)p.beginPath(),p.strokeStyle=D?`rgba(90,150,184,${.9-F*.065})`:O?`rgba(3,92,60,${.56-F*.06})`:R?`rgba(73,19,35,${.62-F*.064})`:`rgba(255,255,255,${1-F*.032})`,p.lineWidth=R||O||D?1.65:3.9,p.arc(0,0,90+F*48,Math.PI*.08,Math.PI*(1.65-F*.05)),p.stroke();for(let F=0;F<16;F+=1)p.rotate(Math.PI/8),p.beginPath(),p.moveTo(132,0),p.lineTo(170,0),p.strokeStyle=D?"rgba(90,150,184,.86)":O?"rgba(2,71,49,.46)":R?"rgba(43,12,24,.5)":"rgba(255,255,255,1)",p.lineWidth=R||O||D?1.45:2.8,p.stroke();p.restore()}function tt(){const P=m.current.fallTheme,L=m.current.springTheme,A=m.current.winterTheme,R=c*.82,O=u*.22,D=p.createRadialGradient(R,O,0,R,O,Math.max(c,u)*.46);A?(D.addColorStop(0,"rgba(248,253,255,.68)"),D.addColorStop(.42,"rgba(189,238,255,.34)"),D.addColorStop(.78,"rgba(255,255,255,.1)")):L?(D.addColorStop(0,"rgba(237,253,247,.64)"),D.addColorStop(.42,"rgba(112,201,232,.34)"),D.addColorStop(.78,"rgba(17,119,86,.1)")):P?(D.addColorStop(0,"rgba(247,211,157,.72)"),D.addColorStop(.42,"rgba(247,211,157,.42)"),D.addColorStop(.78,"rgba(247,211,157,.12)")):(D.addColorStop(0,"rgba(0,0,0,.98)"),D.addColorStop(.5,"rgba(0,0,0,.88)"),D.addColorStop(.8,"rgba(10,10,10,.46)")),D.addColorStop(1,"rgba(2,7,13,0)"),p.save(),p.globalCompositeOperation="source-over",p.fillStyle=D,p.fillRect(0,0,c,u),p.restore()}function we(P){const L=g.current;(m.current.winterTheme?[[u*.48,130,"#dff7ff",.48,.5],[u*.58,96,"#9ed8f2",.7,1.1],[u*.67,72,"#5a96b8",.9,1.7]]:m.current.springTheme?[[u*.48,130,"#70c9e8",.46,.5],[u*.58,96,"#2fb986",.68,1.1],[u*.67,72,"#0b5948",.92,1.7]]:m.current.fallTheme?[[u*.48,130,"#f47c23",.58,.5],[u*.58,96,"#a33a31",.76,1.1],[u*.67,72,"#491323",.96,1.7]]:[[u*.48,130,"#4a4a4a",.58,.5],[u*.58,96,"#2a2a2a",.78,1.1],[u*.67,72,"#080808",.95,1.7]]).forEach(([R,O,D,F,Le])=>{p.beginPath(),p.moveTo(-120,u);for(let oe=-120;oe<=c+140;oe+=90){const C=oe+(L.x-.5)*42*Le,te=R-Math.abs(Math.sin((oe+P*.018)*.006))*O;p.lineTo(C,te),p.lineTo(C+48,R+Math.sin(oe*.04)*7)}p.lineTo(c+140,u),p.closePath(),p.globalAlpha=F,p.fillStyle=D,p.fill(),p.globalAlpha=1})}function Qe(P){const L=u*.18,A=c*.13,R=c*.87;p.save();const O=m.current.fallTheme,D=m.current.springTheme,F=m.current.winterTheme;p.globalAlpha=D||O||F?.55:1,p.strokeStyle=F?"rgba(90,150,184,.68)":D?"rgba(3,92,60,.42)":O?"rgba(73,19,35,.42)":"rgba(255,255,255,.94)",p.lineWidth=D||O||F?2.2:3.8,p.setLineDash([9,18]),p.beginPath(),p.moveTo(A,L),p.bezierCurveTo(c*.28,L-40,c*.44,L+44,c*.55,L+5),p.bezierCurveTo(c*.7,L-42,c*.8,L+52,R,L+8),p.stroke(),p.setLineDash([]),lt.forEach((Le,oe)=>{const C=lt.length===1?0:oe/(lt.length-1),te=A+(R-A)*C,he=L+Math.sin(C*Math.PI*3+P*8e-4)*22,H=oe===m.current.activeSector;p.beginPath(),p.fillStyle=H?F?"rgba(90,150,184,1)":D?"rgba(3,92,60,.94)":O?"rgba(73,19,35,.94)":"rgba(255,255,255,1)":F?"rgba(90,150,184,.68)":D?"rgba(3,92,60,.42)":O?"rgba(73,19,35,.38)":"rgba(255,255,255,.94)",!D&&!O&&!F&&(p.fillStyle=H?"rgba(255,255,255,1)":"rgba(255,255,255,.94)"),p.arc(te,he,!D&&!O&&!F?H?10.5:7:H?8.5:5.5,0,Math.PI*2),p.fill(),p.beginPath(),p.strokeStyle=H?F?"rgba(90,150,184,.84)":D?"rgba(3,92,60,.58)":O?"rgba(73,19,35,.56)":"rgba(255,255,255,.72)":F?"rgba(90,150,184,.42)":D?"rgba(3,92,60,.25)":O?"rgba(73,19,35,.22)":"rgba(255,255,255,.56)",!D&&!O&&!F&&(p.strokeStyle=H?"rgba(255,255,255,1)":"rgba(255,255,255,.76)",p.lineWidth=H?3.2:2.2),p.arc(te,he,!D&&!O&&!F?H?42+Math.sin(P*.004)*5:24:H?34+Math.sin(P*.004)*4:19,0,Math.PI*2),p.stroke()}),p.restore()}function j(){const P=m.current.weather,L=P==="snow"||P==="heavy-snow",A=P==="rain"||P==="heavy-rain"||P==="storm"||P==="drizzle",R=P==="fog"||P==="cloud",O=P==="clear",D=P==="heavy-rain"||P==="heavy-snow"||P==="storm",F=m.current.fallTheme,Le=m.current.springTheme,oe=m.current.winterTheme;if(p.save(),p.globalCompositeOperation=R?"source-over":"lighter",P==="storm"){const C=performance.now(),te=Math.max(0,Math.sin(C*.006)-.91)*6.8+Math.max(0,Math.sin(C*.017+1.8)-.965)*8;if(te>0){const he=oe?"90,150,184":Le?"184,245,95":F?"255,238,72":"255,255,255";p.fillStyle=oe?`rgba(255,255,255,${te*.16})`:Le?`rgba(236,255,247,${te*.14})`:F?`rgba(255,230,132,${te*.14})`:`rgba(255,255,255,${te*.18})`,p.fillRect(0,0,c,u);const H=Math.floor(C/720),je=c*(.28+H*37%46/100),il=Math.sin(H*12.9898)*34,st=[{x:je+il,y:-20}],ol=8;for(let re=1;re<=ol;re+=1){const tn=Math.sin(H*4.7+re*1.94)*48+Math.cos(C*.001+re)*12;st.push({x:je+il*.4+tn,y:u*.62*re/ol})}const Ui=(re,tn,Sr)=>{p.save(),p.shadowColor=`rgba(${he},${re})`,p.shadowBlur=Sr,p.strokeStyle=`rgba(${he},${re})`,p.lineWidth=tn,p.lineJoin="miter",p.lineCap="round",p.beginPath(),st.forEach((Er,Ic)=>{Ic===0?p.moveTo(Er.x,Er.y):p.lineTo(Er.x,Er.y)}),p.stroke(),p.restore()};Ui(Math.min(1,te*.56),9,34),Ui(Math.min(1,te*.86),4.2,18),Ui(1,1.35,4);for(let re=2;re<st.length-1;re+=2){const tn=st[re].x+(re%4===0?-1:1)*(46+re*8),Sr=st[re].y+42+Math.sin(H+re)*18;p.save(),p.shadowColor=`rgba(${he},${Math.min(1,te*.7)})`,p.shadowBlur=14,p.strokeStyle=`rgba(${he},${Math.min(1,te*.72)})`,p.lineWidth=1.4,p.beginPath(),p.moveTo(st[re].x,st[re].y),p.lineTo((st[re].x+tn)*.5+Math.sin(re)*16,(st[re].y+Sr)*.5),p.lineTo(tn,Sr),p.stroke(),p.restore()}}}x.forEach(C=>{const te=g.current,he=te.down?1.55:.86;if(C.life+=.03,C.x+=C.vx*he+(te.x-.5)*(R?.45:L?1.1:A?3.4:.8),C.y+=C.vy*he,L&&(C.x+=Math.sin(C.life+C.y*.02)*.75),R&&(C.x+=Math.sin(C.life*.7+C.y*.004)*.25),O&&(C.y+=Math.sin(C.life+C.x*.02)*.05),(C.y>u+26||C.x<-90||C.x>c+90)&&Object.assign(C,et(Math.random()*c,-28)),R){const H=C.a*(P==="cloud"?.72:1),je=p.createRadialGradient(C.x,C.y,0,C.x,C.y,C.r);je.addColorStop(0,oe?`rgba(255,255,255,${H})`:Le?`rgba(236,255,247,${H})`:F?`rgba(255,228,180,${H})`:`rgba(210,230,238,${H})`),je.addColorStop(1,"rgba(210,230,238,0)"),p.fillStyle=je,p.beginPath(),p.ellipse(C.x,C.y,C.r*1.9,C.r*.58,Math.sin(C.pulse)*.25,0,Math.PI*2),p.fill()}else if(O){const H=C.a*(.45+Math.sin(C.life*2+C.pulse)*.25);p.beginPath(),p.fillStyle=oe?`rgba(90,150,184,${H})`:Le?`rgba(184,245,95,${H})`:F?`rgba(255,232,96,${H})`:`rgba(103,232,249,${H})`,p.arc(C.x,C.y,C.r,0,Math.PI*2),p.fill()}else if(L)p.beginPath(),p.fillStyle=oe?`rgba(255,255,255,${C.a})`:Le?`rgba(246,255,255,${C.a})`:F?`rgba(232,211,168,${C.a})`:`rgba(226,251,255,${C.a})`,p.arc(C.x,C.y,C.r,0,Math.PI*2),p.fill();else{p.strokeStyle=oe?`rgba(90,150,184,${C.a})`:Le?`rgba(80,210,238,${C.a})`:F?`rgba(198,132,67,${C.a})`:`rgba(255,255,255,${C.a})`,p.lineWidth=P==="drizzle"?Math.max(.7,C.r*.7):C.r,p.beginPath(),p.moveTo(C.x,C.y);const H=P==="drizzle"?18:D?48:32;p.lineTo(C.x-18-(te.x-.5)*18,C.y-H),p.stroke()}}),p.restore()}function T(P){S!==Q()&&de(!0);const L=P;Fe(L),we(L),tt(),j(),$=window.requestAnimationFrame(T)}function M(P){g.current.x=vr(P.clientX/c,0,1),g.current.y=vr(P.clientY/u,0,1)}function B(P){v.current.add(P.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(P.code)&&P.preventDefault()}function Z(P){v.current.delete(P.code)}return E(),window.addEventListener("resize",E),window.addEventListener("pointermove",M,{passive:!0}),window.addEventListener("pointerdown",()=>{g.current.down=!0}),window.addEventListener("pointerup",()=>{g.current.down=!1}),window.addEventListener("keydown",B),window.addEventListener("keyup",Z),$=window.requestAnimationFrame(T),()=>{window.cancelAnimationFrame($),window.removeEventListener("resize",E),window.removeEventListener("pointermove",M),window.removeEventListener("keydown",B),window.removeEventListener("keyup",Z)}},[]),d.jsx("canvas",{ref:f,className:"world-backdrop","aria-hidden":"true"})}function Nf({weather:e,setWeather:t,weatherPower:n,setWeatherPower:r,activeSector:i,liveWeather:o,timeProfile:a,weatherStatus:l,weatherError:s,onUseLiveWeather:f,onInteract:g,fallTheme:v,setFallTheme:m,springTheme:y,setSpringTheme:p,winterTheme:k,setWinterTheme:$}){var N;const[c,u]=_.useState(!1),h=(o==null?void 0:o.condition)||`Manual ${gs[e]||e}`,x=()=>{g==null||g();const E=Ft.indexOf(e);t(Ft[((E===-1?0:E)+1)%Ft.length])},b=()=>{g==null||g();const E=Ft.indexOf(e);t(Ft[((E===-1?0:E)-1+Ft.length)%Ft.length])},S=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return d.jsxs("aside",{className:`floating-hud ${c?"collapsed":""}`,"aria-label":"Exploration controls",children:[d.jsx("button",{type:"button",className:"overlay-collapse-button hud-collapse-button","aria-label":c?"Expand explorer HUD":"Collapse explorer HUD","aria-expanded":!c,onClick:()=>u(E=>!E),children:d.jsx(rl,{direction:c?"up":"down"})}),d.jsxs("div",{className:"hud-content","aria-hidden":c,children:[d.jsxs("div",{className:"hud-status",children:[d.jsx("span",{children:"Explorer HUD"}),d.jsxs("strong",{children:[((N=lt[i])==null?void 0:N.label)||"Intro"," sector"]}),d.jsxs("small",{children:[a.label," · ",h]})]}),d.jsxs("div",{className:"hud-row",children:[d.jsx("button",{className:v?"active fall-weather-button":"fall-weather-button",onClick:()=>{g==null||g(),m(E=>!E),p(!1),$(!1)},children:"Fall"}),d.jsx("button",{className:y?"active spring-weather-button":"spring-weather-button",onClick:()=>{g==null||g(),p(E=>!E),m(!1),$(!1)},children:"Spring"}),d.jsx("button",{className:k?"active winter-weather-button":"winter-weather-button",onClick:()=>{g==null||g(),$(E=>!E),m(!1),p(!1)},children:"Winter"})]}),d.jsxs("div",{className:"hud-row particle-cycle-row","aria-label":"Weather particle selector",children:[d.jsx("button",{type:"button",className:"particle-arrow","aria-label":"Previous weather particle",onClick:b,children:"<"}),d.jsx("button",{type:"button",className:"particle-label","aria-label":"Current weather particle",onClick:x,children:gs[e]||e}),d.jsx("button",{type:"button",className:"particle-arrow","aria-label":"Next weather particle",onClick:x,children:">"})]}),d.jsx("div",{className:"hud-row",children:d.jsx("button",{onClick:()=>{g==null||g(),f()},children:l==="loading"?"Syncing…":"Live local weather"})}),d.jsxs("label",{className:"intensity-control",children:[d.jsx("span",{children:"Atmosphere"}),d.jsx("input",{type:"range",min:"0.35",max:"1.7",step:"0.05",value:n,onChange:E=>{g==null||g(),r(Number(E.target.value))}})]}),d.jsx("small",{className:"hud-note",children:o?`${Math.round(o.temp)}° · wind ${Math.round(o.wind)} km/h · ${o.location}`:s||`${S} local browser time · weather optional`})]})]})}function Pf({activeSector:e,activeContentTab:t,hudInteracted:n}){var h;const[r,i]=_.useState(!1),o=((h=lt[e])==null?void 0:h.id)||"hero",a=(t==null?void 0:t.id)||"portfolio",l=_.useMemo(()=>n?o==="hero"?{label:"Intro",title:"The opening marker.",lines:["Use Start exploring to jump into the tabbed lore, or use the left Explore panel to move between Intro, Content, and Contact."]}:o==="contact"?{label:"Contact",title:"Exit routes unlocked.",lines:["You are in the contact zone now. Use the links here when you want the practical exits: resume, GitHub, LinkedIn, or email."]}:a==="portfolio"?{label:"Portfolio",title:"Systems layer.",lines:["Scan the project cards first, then move through Architecture and Technical Stack to see how the systems connect."]}:a==="professional"?{label:"Professional",title:"Timeline controls.",lines:["Click a timeline card to zoom it forward. Click outside the timeline to settle it back into place."]}:a==="education"?{label:"Education",title:"Academic trail.",lines:["Use the same card-click behavior to inspect each academic milestone without leaving the timeline."]}:a==="personal"?{label:"Personal",title:"Media swap trick.",lines:["Switch between Photography, Writing, and Travel. Pick a side media card to swap it into the main display."]}:{label:"Lore Guide",title:"Keep exploring.",lines:["Use the tabs, timeline cards, media swaps, and side navigation to move through the lore at your own pace."]}:{label:"",title:"",lines:["I see you have stumbled upon my lore! I am not an AI here to assist you, but just a mere persona of myself to give you some tips on navigating my lore.","Start with the Explorer HUD on the bottom right. Try a season button, cycle the particle arrows, or move the Atmosphere slider."]},[o,n,a]),[s,f]=_.useState(l),[g,v]=_.useState("entering"),[m,y]=_.useState(0),p=`${l.label}-${l.title}-${l.lines.join("|")}`,k=`${s.label}-${s.title}-${s.lines.join("|")}`,$=s.lines.join(`
`),c=_.useMemo(()=>{let x=m;return s.lines.map(b=>{const S=Math.max(0,Math.min(b.length,x));return x-=b.length+1,b.slice(0,S)})},[s.lines,m]),u=_.useMemo(()=>{let x=0;for(let b=0;b<s.lines.length;b+=1){const S=x+s.lines[b].length;if(m<=S)return b;x=S+1}return Math.max(0,s.lines.length-1)},[s.lines,m]);return _.useEffect(()=>{if(p===k)return;v("exiting");const x=window.setTimeout(()=>{f(l),v("entering")},210);return()=>window.clearTimeout(x)},[k,l,p]),_.useEffect(()=>{y(0);const x=$.length,b=window.setInterval(()=>{y(S=>S>=x?(window.clearInterval(b),S):S+1)},18);return()=>window.clearInterval(b)},[k,$]),d.jsxs("aside",{className:`lore-guide ${r?"collapsed":""}`,"aria-label":"Lore navigation guide",children:[d.jsx("button",{type:"button",className:"lore-guide-toggle","aria-label":r?"Expand lore guide":"Collapse lore guide","aria-expanded":!r,onClick:()=>i(x=>!x),children:d.jsx(rl,{direction:r?"up":"down"})}),d.jsx("div",{className:"lore-guide-face","aria-hidden":"true",children:d.jsx("img",{src:mf,alt:""})}),d.jsxs("div",{className:`lore-guide-copy ${g}`,children:[s.label&&d.jsx("span",{children:s.label}),s.title&&d.jsx("strong",{children:s.title}),c.map((x,b)=>d.jsxs("p",{children:[x,b===u&&d.jsx("span",{className:"lore-type-caret","aria-hidden":"true"})]},`${s.lines[b]}-${b}`))]},k)]})}function _f({activeSector:e,activeContentTab:t}){const[n,r]=_.useState(!1),i=lt.map(o=>o.id==="tab-content"?{...o,label:t.label,title:t.label,note:t.kicker}:o);return d.jsxs("aside",{className:`mission-map ${n?"collapsed":""}`,"aria-label":"Portfolio sector map",children:[d.jsx("button",{type:"button",className:"overlay-collapse-button map-collapse-button","aria-label":n?"Expand side navigation":"Collapse side navigation","aria-expanded":!n,onClick:()=>r(o=>!o),children:d.jsx(rl,{direction:n?"right":"left"})}),d.jsxs("div",{className:"mission-map-content","aria-hidden":n,children:[d.jsx("strong",{children:"Explore"}),i.map((o,a)=>d.jsxs("a",{href:`#${o.id}`,className:e===a?"active":"",children:[d.jsx("span",{children:String(a+1).padStart(2,"0")}),d.jsx("em",{children:o.label})]},o.id))]})]})}function qn({eyebrow:e,title:t,children:n}){return d.jsxs("div",{className:"section-heading split",children:[d.jsxs("div",{children:[d.jsx("p",{className:"eyebrow",children:e}),d.jsx("h2",{children:t})]}),n&&d.jsx("p",{children:n})]})}function Tf({project:e}){return d.jsxs("article",{className:"project-card panel-card","data-tilt":!0,children:[d.jsx("div",{className:"card-glow"}),d.jsxs("div",{className:"project-topline",children:[d.jsx("span",{children:e.number}),d.jsx("em",{children:e.eyebrow})]}),d.jsx("div",{className:"project-visual","aria-hidden":"true",children:["mocap","ingest","kafka","redis","json","unreal"].map((t,n)=>d.jsxs("div",{className:"flow-node",children:[d.jsx("span",{children:t}),n<5&&d.jsx("em",{children:"→"})]},t))}),d.jsx("h3",{children:e.title}),d.jsx("p",{children:e.summary}),d.jsx("div",{className:"chip-row",children:e.tags.map(t=>d.jsx(Oc,{children:t},t))}),d.jsx("ul",{children:e.bullets.map(t=>d.jsx("li",{children:t},t))})]})}function Lf({tabs:e,activeTabId:t,onTabChange:n}){const r=e.find(i=>i.id===t)||e[0];return d.jsx("section",{className:"profile-tabs","aria-label":"Portfolio content tabs",children:d.jsx("div",{className:"profile-tab-list",role:"tablist","aria-label":"Portfolio content categories",children:e.map(i=>d.jsxs("button",{type:"button",id:`profile-tab-${i.id}`,role:"tab","aria-selected":r.id===i.id,"aria-controls":"tab-content",className:r.id===i.id?"active":"",onClick:()=>n(i.id),children:[d.jsx("span",{children:i.kicker}),d.jsx("strong",{children:i.label})]},i.id))})})}function Mf({items:e}){const t=_.useMemo(()=>If(e),[e]),[n,r]=_.useState(null),i=_.useRef(null),o=_.useMemo(()=>Af(t),[t]);return _.useEffect(()=>{r(a=>a==null?null:Math.min(a,Math.max(0,t.length-1)))},[t.length]),_.useEffect(()=>{if(n==null)return;const a=l=>{var s;(s=i.current)!=null&&s.contains(l.target)||r(null)};return document.addEventListener("pointerdown",a),()=>document.removeEventListener("pointerdown",a)},[n]),t.length?d.jsx("div",{ref:i,className:"date-timeline-system",children:d.jsxs("div",{className:"date-timeline-rail","aria-label":"Interactive date timeline infographic",children:[d.jsx("div",{className:"date-timeline-trunk","aria-hidden":"true"}),d.jsx("span",{className:"date-timeline-boundary start",children:o.startLabel}),d.jsx("span",{className:"date-timeline-boundary end",children:o.endLabel}),t.map((a,l)=>{var m;const s=ws(a.startDate,o),f=ws(a.endDate,o),g=Math.min(86,Math.max(14,(s+f)/2)),v=l%2===0?"left":"right";return d.jsxs("button",{type:"button",className:`date-timeline-node ${v} ${l===n?"active":""}`,style:{"--timeline-y":`${g}%`,"--node-color":a.color},"aria-label":`Zoom details for ${a.title}, ${a.rangeLabel}`,"aria-pressed":l===n,onClick:()=>r(l),children:[d.jsx("span",{className:"date-timeline-branch","aria-hidden":"true"}),d.jsxs("span",{className:"date-timeline-orb",children:[d.jsx("em",{children:a.shortStart}),d.jsx("strong",{children:a.title}),d.jsx("small",{children:a.subtitle})]}),d.jsx("span",{className:"date-timeline-icon",children:d.jsx(Df,{name:a.icon})}),d.jsxs("span",{className:"date-timeline-detail-copy",children:[d.jsx("span",{className:"date-timeline-detail-meta",children:a.rangeLabel}),d.jsx("span",{className:"date-timeline-detail-body",children:a.body}),((m=a.bullets)==null?void 0:m.length)>0&&d.jsx("span",{className:"date-timeline-detail-list",children:a.bullets.map(y=>d.jsx("span",{children:y},y))})]})]},`${a.meta}-${a.title}`)})]})}):null}function Df({name:e}){const t={work:"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2Zm-6 0h-4V4h4v2Z",analytics:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM8 17H6v-7h2v7Zm5 0h-2V7h2v10Zm5 0h-2v-4h2v4Z",code:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z",school:"M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13.5L5 12.69V16c0 1.1 3.13 3 7 3s7-1.9 7-3v-3.31l-7 3.81Z",menu_book:"M21 4.5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5C10.55 4.4 8.45 4 6.5 4S2.45 4.4 1 5.5v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 19.95 5.05 19.5 6.5 19.5c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V5.5c-.6-.45-1.25-.75-2-1Z",extension:"M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11Z"};return d.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:d.jsx("path",{d:t[e]||t.work})})}const Rf={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};function ys(e,t=!1){const n=String(e||"").trim();if(!n||/ongoing|present|current/i.test(n))return null;const r=n.match(/^([A-Za-z]{3,})\s+(\d{4})$/);if(r){const o=Rf[r[1].slice(0,3).toLowerCase()]??0;return new Date(Number(r[2]),o+(t?1:0),t?0:1)}const i=n.match(/^(\d{4})$/);return i?new Date(Number(i[1]),t?11:0,t?31:1):null}function $f(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Of(e){return e.toLocaleDateString(void 0,{month:"short",year:"numeric"})}function If(e){let t=null;const n=["#ef4444","#0891b2","#f97316","#a3e635","#f8c84e","#9ca3af"];return e.map((r,i)=>{const o=String(r.meta||"").split("/")[0].trim(),a=/ongoing|present|current/i.test(o),[l,s]=o.includes(" - ")?o.split(" - "):[o,o],f=t?$f(t,1):new Date(new Date().getFullYear(),0,1),g=ys(l)||f,v=a?new Date:ys(s,!0)||g;return t=v,{...r,sourceIndex:i,startDate:g,endDate:v,rangeLabel:a?`${Of(g)} - Present`:o,shortStart:g.getFullYear(),icon:Ff(r),color:n[i%n.length]}}).sort((r,i)=>r.startDate-i.startDate)}function Ff(e){const t=`${e.title} ${e.subtitle}`.toLowerCase();return t.includes("data")||t.includes("analyst")||t.includes("analytics")?"analytics":t.includes("college")||t.includes("education")||t.includes("academic")?"school":t.includes("study")||t.includes("learning")?"menu_book":t.includes("developer")||t.includes("application")||t.includes("software")?"code":t.includes("tool")||t.includes("backend")||t.includes("system")?"extension":"work"}function Af(e){const t=new Date(Math.min(...e.map(r=>r.startDate.getTime()))),n=new Date(Math.max(...e.map(r=>r.endDate.getTime())));return t.setMonth(0,1),n.setMonth(11,31),{start:t,end:n,startLabel:String(t.getFullYear()),endLabel:n.getFullYear()===new Date().getFullYear()?"Present":String(n.getFullYear())}}function ws(e,t){const n=t.end.getTime()-t.start.getTime();return n<=0?0:Math.max(0,Math.min(100,(e.getTime()-t.start.getTime())/n*100))}function Uf(){const[e,t]=_.useState(0),[n,r]=_.useState(0),i=ho[e]||ho[0],o=i.media||[],a=o[n]||o[0];return _.useEffect(()=>{r(0)},[e]),d.jsxs("div",{className:"personal-subtabs",children:[d.jsx("div",{className:"personal-subtab-list",role:"tablist","aria-label":"Personal project categories",children:ho.map((l,s)=>d.jsxs("button",{type:"button",role:"tab","aria-selected":s===e,className:s===e?"active":"",onClick:()=>t(s),children:[d.jsx("span",{children:String(s+1).padStart(2,"0")}),d.jsx("strong",{children:l.meta})]},l.meta))}),d.jsxs("article",{className:"personal-subtab-panel panel-card","data-tilt":!0,children:[d.jsxs("div",{className:"personal-subtab-heading",children:[d.jsx("p",{children:i.meta}),d.jsx("h3",{children:i.title}),d.jsx("span",{children:i.subtitle})]}),d.jsx("p",{className:"personal-subtab-body",children:i.body}),d.jsx(Bf,{project:i,mediaItems:o,activeMedia:a,activeMediaIndex:n,onSelect:r})]})]})}function Bf({project:e,mediaItems:t,activeMedia:n,activeMediaIndex:r,onSelect:i}){const o=e.meta.toLowerCase().replace(/[^a-z0-9]+/g,"-"),a=_.useRef(null),l=_.useRef(new Map),s=t.map((v,m)=>({item:v,index:m})).filter(({index:v})=>v!==r),f=v=>{if(v===r)return;const m=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(m){i(v);return}if(typeof document<"u"&&document.startViewTransition&&!m){document.startViewTransition(()=>{sa.flushSync(()=>i(v))});return}g(v)},g=v=>{const m=r,y=a.current,p=l.current.get(v);if(!y||!p||typeof document>"u"){i(v);return}const k=y.getBoundingClientRect(),$=p.getBoundingClientRect(),c=bs(y,k),u=bs(p,$);sa.flushSync(()=>i(v)),requestAnimationFrame(()=>{var b,S;const h=(b=a.current)==null?void 0:b.getBoundingClientRect(),x=(S=l.current.get(m))==null?void 0:S.getBoundingClientRect();ks(u,$,h),ks(c,k,x||$)})};return n?d.jsxs("div",{className:"personal-media-experience","aria-label":`${e.meta} media and captions`,children:[d.jsxs("figure",{ref:a,className:"personal-featured-media",style:{viewTransitionName:`personal-media-${o}-${r}`},children:[d.jsx(Ss,{item:n,index:r,featured:!0}),d.jsxs("figcaption",{children:[d.jsx("span",{children:n.meta}),d.jsx("strong",{children:n.alt}),d.jsx("p",{children:n.caption})]})]}),d.jsx("div",{className:"personal-media-feed",role:"list","aria-label":`${e.meta} selectable media`,children:s.map(({item:v,index:m})=>d.jsxs("button",{ref:y=>{y?l.current.set(m,y):l.current.delete(m)},style:{viewTransitionName:`personal-media-${o}-${m}`},type:"button",role:"listitem",className:"personal-media-card","aria-pressed":"false",onClick:()=>f(m),children:[d.jsx("span",{className:"personal-media-index",children:String(m+1).padStart(2,"0")}),d.jsx("span",{className:"personal-media-thumb","aria-hidden":"true",children:d.jsx(Ss,{item:v,index:m,compact:!0})}),d.jsxs("span",{className:"personal-media-copy",children:[d.jsx("em",{children:v.meta}),d.jsx("strong",{children:v.alt}),d.jsx("span",{children:v.caption})]})]},`${e.meta}-${v.meta}-${m}`))})]}):null}function bs(e,t){const n=e.cloneNode(!0);return n.classList.add("personal-swap-clone"),Object.assign(n.style,{position:"fixed",left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`,margin:"0",pointerEvents:"none",transformOrigin:"top left",viewTransitionName:"none"}),document.body.appendChild(n),n}function ks(e,t,n){if(!e||!n){e==null||e.remove();return}const r=640,i=n.left-t.left,o=n.top-t.top,a=n.width/Math.max(t.width,1),l=n.height/Math.max(t.height,1);e.animate([{opacity:1,transform:"translate(0, 0) scale(1, 1)"},{opacity:.98,transform:`translate(${i}px, ${o}px) scale(${a}, ${l})`}],{duration:r,easing:"cubic-bezier(.2,.78,.16,1)",fill:"forwards"}),window.setTimeout(()=>{e.remove()},r+80)}function Ss({item:e,index:t,compact:n=!1,featured:r=!1}){const i=e.type==="video";return e.src?i?d.jsx("video",{src:e.src,poster:e.poster||void 0,controls:r,muted:n,preload:"metadata","aria-label":e.alt}):d.jsx("img",{src:e.src,alt:n?"":e.alt,loading:"lazy"}):d.jsxs("span",{className:`personal-media-placeholder ${n?"compact":""}`,"aria-label":n?void 0:e.alt,children:[d.jsxs("span",{children:[i?"Video":"Photo"," ",String(t+1).padStart(2,"0")]}),d.jsx("strong",{children:n?e.type:e.alt})]})}function Vf(){return d.jsxs("section",{className:"tabbed-subsection architecture-panel panel-card","data-tilt":!0,children:[d.jsx(qn,{eyebrow:"Architecture narrative",title:"From motion data to Unreal-ready procedural animation JSON."}),d.jsx("div",{className:"pipeline",children:gf.map(([e,t],n)=>d.jsxs("article",{children:[d.jsx("span",{children:String(n+1).padStart(2,"0")}),d.jsx("h3",{children:e}),d.jsx("p",{children:t})]},e))})]})}function Hf(){return d.jsxs("section",{className:"tabbed-subsection stack-section",children:[d.jsx(qn,{eyebrow:"Technical stack",title:"Backend reliability, cloud delivery, game tooling, and data workflows.",children:"Positioned for online-services expectations - scalable services, cloud delivery, caching, messaging, and clean interfaces - while keeping the Aegis portfolio clearly relevant to game production and content pipelines."}),d.jsx("div",{className:"stack-grid",children:vf.map(([e,t])=>d.jsxs("article",{className:"panel-card","data-tilt":!0,children:[d.jsx("h3",{children:e}),d.jsx("div",{children:t.map(n=>d.jsx(Oc,{children:n},n))})]},e))})]})}function Wf({block:e,tab:t}){return e.type==="projects"?d.jsxs("section",{className:"tabbed-subsection",children:[d.jsx(qn,{eyebrow:"Featured portfolio systems",title:"",children:"Backend architecture, async systems thinking, game-tech context, and production-ready communication."}),d.jsx("div",{className:"project-grid",children:hf.map(n=>d.jsx(Tf,{project:n},n.title))})]}):e.type==="architecture"?d.jsx(Vf,{}):e.type==="stack"?d.jsx(Hf,{}):e.type==="timeline"?d.jsxs("section",{className:"tabbed-subsection",children:[d.jsx(qn,{eyebrow:e.eyebrow,title:e.title,children:t.summary}),d.jsx(Mf,{items:e.items})]}):e.type==="personal"?d.jsxs("section",{className:"tabbed-subsection",children:[d.jsx(qn,{eyebrow:e.eyebrow,title:e.title,children:t.summary}),d.jsx(Uf,{})]}):null}function Qf({tab:e}){return d.jsxs("div",{className:"tab-pane","data-active-tab":e.id,children:[d.jsxs("div",{className:"tab-pane-header",children:[d.jsxs("div",{children:[d.jsx("p",{children:e.kicker}),d.jsx("h2",{children:e.label})]}),d.jsx("span",{children:e.summary})]}),d.jsx("div",{className:"tab-pane-body",children:e.blocks.map((t,n)=>d.jsx(Wf,{block:t,tab:e},`${e.id}-${t.type}-${n}`))})]})}function Yf(e,t,n,r){e==="snow"||e==="heavy-snow"?(t("snowboard"),n(e),r(e==="heavy-snow"?1.62:1.28)):e==="rain"||e==="heavy-rain"||e==="drizzle"||e==="storm"?(t("soccer"),n(e),r(e==="storm"?1.75:e==="heavy-rain"?1.58:e==="drizzle"?.92:1.2)):e==="fog"||e==="cloud"?(t("soccer"),n(e),r(e==="fog"?1.35:.98)):(t("soccer"),n("clear"),r(.72))}function Kf(){const e=kf(),t=_.useMemo(()=>vs(e),[e]),[n,r]=_.useState(null),i=n||t,o=Sf(),a=jf(),[l,s]=_.useState("snowboard"),[f,g]=_.useState("snow"),[v,m]=_.useState(1),[y,p]=_.useState(!1),[k,$]=_.useState(!1),[c,u]=_.useState(!1),[h,x]=_.useState(!1),[b,S]=_.useState("idle"),[N,E]=_.useState(""),[Q,I]=_.useState(null),[de,et]=_.useState(Br[0].id),Fe=Br.find(tt=>tt.id===de)||Br[0];Cf(),Ef(),_.useEffect(()=>{const tt=we=>{var Qe,j;if(we.altKey){if(we.key==="ArrowDown"){we.preventDefault();const T=lt[Math.min(lt.length-1,a+1)];(Qe=document.getElementById(T.id))==null||Qe.scrollIntoView({behavior:"smooth"})}if(we.key==="ArrowUp"){we.preventDefault();const T=lt[Math.max(0,a-1)];(j=document.getElementById(T.id))==null||j.scrollIntoView({behavior:"smooth"})}}};return window.addEventListener("keydown",tt),()=>window.removeEventListener("keydown",tt)},[a]);async function en(){if(!("geolocation"in navigator)){E("Live weather needs browser geolocation support."),S("error");return}S("loading"),E(""),navigator.geolocation.getCurrentPosition(async tt=>{try{const{latitude:we,longitude:Qe}=tt.coords,j=`https://api.open-meteo.com/v1/forecast?latitude=${we}&longitude=${Qe}&current=temperature_2m,weather_code,wind_speed_10m,precipitation,rain,snowfall,cloud_cover,is_day&timezone=auto`,T=await fetch(j);if(!T.ok)throw new Error("Weather request failed");const M=await T.json(),B=M.current||{},[Z,P]=wf[B.weather_code]||["Current weather","clear"],L=await bf(we,Qe,M.timezone),A={condition:Z,kind:P,temp:B.temperature_2m??0,wind:B.wind_speed_10m??0,location:L,code:B.weather_code},R=B.time?vs(new Date(B.time)):null;r(R||(B.is_day===0?{key:"night",label:"Night"}:B.is_day===1?{key:"day",label:"Day"}:null)),I(A),S("synced"),Yf(P,s,g,m)}catch{S("error"),E("Live weather could not be loaded. The scene still uses local time.")}},()=>{S("error"),E("Location permission was not granted. Manual ambience remains active.")},{enableHighAccuracy:!1,timeout:1e4,maximumAge:30*60*1e3})}return d.jsxs("main",{className:`site ${l} ${i.key} ${y?"fall-theme":""} ${k?"spring-theme":""} ${c?"winter-theme":""}`,children:[d.jsx("style",{children:Xf}),d.jsx("style",{children:Gf}),d.jsx("style",{children:Zf}),d.jsx("style",{children:Jf}),d.jsx("style",{children:qf}),d.jsx("style",{children:em}),d.jsx(zf,{mode:l,weather:f,weatherPower:v,activeSector:a,scrollProgress:o,timeProfile:i,fallTheme:y,springTheme:k,winterTheme:c}),d.jsx("div",{className:"portrait-background","aria-hidden":"true",children:d.jsx("img",{src:ff,alt:""})}),d.jsx("div",{className:"ambient-grid","aria-hidden":"true"}),d.jsxs("header",{className:"nav-shell",children:[d.jsxs("a",{className:"brand",href:"#hero",children:[d.jsx(xs,{}),d.jsxs("span",{children:[d.jsx("strong",{children:Ce.name}),d.jsx("small",{children:"Engineer · Builder · Problem Solver"})]})]}),d.jsx("a",{className:"nav-cta",href:Ce.resume,download:!0,children:"Download CV"})]}),d.jsx(_f,{activeSector:a,activeContentTab:Fe}),d.jsx(Nf,{weather:f,setWeather:g,weatherPower:v,setWeatherPower:m,activeSector:a,liveWeather:Q,timeProfile:i,weatherStatus:b,weatherError:N,onUseLiveWeather:en,onInteract:()=>x(!0),fallTheme:y,setFallTheme:p,springTheme:k,setSpringTheme:$,winterTheme:c,setWinterTheme:u}),d.jsx(Pf,{activeSector:a,activeContentTab:Fe,hudInteracted:h}),d.jsx("section",{id:"hero",className:"sector hero-sector",children:d.jsxs("div",{className:"hero-copy",children:[d.jsx("p",{className:"eyebrow",children:"// Backend · Game Tech · Data Systems"}),d.jsx("h1",{children:Ce.name}),d.jsxs("h2",{children:[d.jsx("span",{children:Ce.title})," ",Ce.tagline]}),d.jsx("p",{className:"hero-lede",children:"I build reliable backend services, content pipelines, and developer-facing tools that connect cloud-native engineering with game-production workflows."}),d.jsxs("div",{className:"hero-actions",children:[d.jsx("a",{className:"primary-action",href:"#tab-content",children:"Start exploring →"}),d.jsx("a",{href:Ce.resume,download:!0,children:"Download Resume"}),d.jsx("a",{href:Ce.github,target:"_blank",rel:"noreferrer",children:"GitHub"})]})]})}),d.jsxs("section",{id:"tab-content",className:"sector section-wrap tab-content",role:"tabpanel","aria-labelledby":`profile-tab-${Fe.id}`,children:[d.jsx(Lf,{tabs:Br,activeTabId:de,onTabChange:et}),d.jsx(Qf,{tab:Fe})]}),!1,d.jsxs("footer",{id:"contact",className:"sector footer-shell panel-card","data-tilt":!0,children:[d.jsxs("div",{children:[d.jsx(xs,{}),d.jsx("h2",{children:"Let’s build online systems and game technology that scale."}),d.jsx("p",{children:Ce.location})]}),d.jsxs("div",{className:"contact-links",children:[d.jsx("a",{href:`mailto:${Ce.email}`,children:Ce.email}),d.jsx("a",{href:Ce.linkedin,target:"_blank",rel:"noreferrer",children:"LinkedIn"}),d.jsx("a",{href:Ce.github,target:"_blank",rel:"noreferrer",children:"GitHub"})]})]}),d.jsx("div",{className:"scroll-finish-spacer","aria-hidden":"true"})]})}const Xf=`
:root{color-scheme:dark;font-size:80%;--bg:#02070d;--panel:rgba(5,13,22,.76);--line:rgba(133,239,255,.18);--cyan:#22d3ee;--cyan2:#67e8f9;--gold:#fbbf24;--text:#f8fafc;--muted:#9fb0c7;--radius:32px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--bg);color:var(--text)}a{color:inherit;text-decoration:none}button,input{font:inherit}button{cursor:pointer}.site{position:relative;min-height:92vh;overflow:hidden;background:#02070d}.world-backdrop{position:fixed;inset:0;z-index:0;display:block;background:#02070d}.world-foreground{position:fixed;inset:0;z-index:18;display:block;pointer-events:none;filter:drop-shadow(0 0 18px rgba(34,211,238,.22))}.foreground-fade{position:fixed;left:0;right:0;bottom:0;height:17vh;z-index:17;pointer-events:none;background:linear-gradient(to bottom,rgba(2,7,13,0) 0%,rgba(2,7,13,.08) 42%,rgba(2,7,13,.34) 74%,rgba(2,7,13,.9) 100%);backdrop-filter:blur(.7px);mask-image:linear-gradient(to bottom,transparent 0,#000 42%,#000 100%)}.ambient-grid{pointer-events:none;position:fixed;inset:0;z-index:2;opacity:.78;background:linear-gradient(rgba(34,211,238,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.035) 1px,transparent 1px),radial-gradient(circle at 80% 20%,rgba(34,211,238,.14),transparent 28rem);background-size:72px 72px,72px 72px,auto;mask-image:linear-gradient(to bottom,#000 0%,#000 84%,transparent 100%)}.site:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(2,7,13,.92) 0%,rgba(2,7,13,.46) 42%,rgba(2,7,13,.2) 100%),linear-gradient(to bottom,rgba(2,7,13,.28),rgba(2,7,13,.05) 42%,rgba(2,7,13,.92))}.nav-shell{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:50;display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(1240px,calc(100% - 28px));padding:12px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.6);backdrop-filter:blur(22px);box-shadow:0 24px 90px rgba(0,0,0,.42)}.brand{display:flex;align-items:center;gap:12px;min-width:max-content}.brand strong{display:block;letter-spacing:.18em;text-transform:uppercase;font-size:.82rem}.brand small{display:block;margin-top:2px;color:var(--muted);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase}.nav-shell nav{display:flex;gap:clamp(12px,2.4vw,30px);color:#dbeafe;font-size:.92rem}.nav-shell nav a{opacity:.84;transition:.2s}.nav-shell nav a:hover{color:var(--cyan);opacity:1}.nav-cta{border:1px solid rgba(251,191,36,.36);background:rgba(251,191,36,.1);color:#fde68a;padding:11px 18px;border-radius:999px;font-weight:900;white-space:nowrap}.mark{position:relative;width:38px;height:42px;filter:drop-shadow(0 0 15px rgba(34,211,238,.65));flex:0 0 auto}.mark i{position:absolute;bottom:2px;left:50%;width:4px;height:40px;border-radius:999px;background:linear-gradient(#fef3c7,#22d3ee);transform:translateX(-50%)}.mark i:nth-child(2){left:28%;height:32px;transform:rotate(-25deg)}.mark i:nth-child(3){left:72%;height:32px;transform:rotate(25deg)}.panel-card{position:relative;border:1px solid var(--line);background:linear-gradient(145deg,rgba(7,17,27,.82),rgba(3,8,14,.68));border-radius:var(--radius);box-shadow:0 28px 90px rgba(0,0,0,.38);backdrop-filter:blur(22px);overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .16s ease,border-color .2s ease,opacity .28s ease;will-change:transform,opacity}.panel-card:before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(34,211,238,.16),transparent 42%);opacity:.78;pointer-events:none}.sector,.shortcut-rail{position:relative;z-index:8;width:min(1080px,calc(100% - 120px));margin:0 auto}.hero-sector{min-height:100vh;display:grid;grid-template-columns:minmax(0,.96fr) minmax(260px,.48fr);gap:20px;align-items:end;padding:118px 0 58px}.hero-copy{padding:clamp(22px,4vw,42px)}.eyebrow{margin:0 0 16px;color:var(--cyan);font-size:.78rem;font-weight:1000;letter-spacing:.22em;text-transform:uppercase}.hero-copy h1{margin:0;font-size:clamp(3.6rem,8.4vw,7.4rem);line-height:.82;letter-spacing:-.09em;text-transform:uppercase;text-shadow:0 0 28px rgba(103,232,249,.12)}.hero-copy h2{margin:26px 0 0;max-width:780px;font-size:clamp(1.45rem,2.6vw,2.55rem);line-height:1.05;letter-spacing:-.055em}.hero-copy h2 span,.footer-shell h2{color:var(--gold)}.hero-lede{margin:24px 0 0;max-width:720px;color:#d8e4f5;font-size:1.06rem;line-height:1.78}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hero-actions a{border:1px solid rgba(133,239,255,.24);background:rgba(8,20,31,.78);padding:14px 18px;border-radius:17px;font-weight:1000}.hero-actions .primary-action{border:0;background:linear-gradient(135deg,#67e8f9,#22d3ee);color:#021018;box-shadow:0 0 38px rgba(34,211,238,.28)}.metrics-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:28px}.metrics-row span{border:1px solid rgba(133,239,255,.16);background:rgba(0,0,0,.28);border-radius:18px;padding:14px}.metrics-row strong{display:block}.metrics-row small{display:block;margin-top:4px;color:var(--muted)}.exploration-note{align-self:end;padding:24px}.exploration-note strong{display:block;color:#fde68a;font-size:1.25rem}.exploration-note p,.exploration-note small{display:block;color:#cbd5e1;line-height:1.65;margin:10px 0 0}.floating-hud{position:fixed;right:18px;bottom:18px;z-index:45;width:min(280px,calc(100% - 36px));border:1px solid rgba(133,239,255,.2);border-radius:24px;background:rgba(0,0,0,.5);backdrop-filter:blur(22px);box-shadow:0 22px 80px rgba(0,0,0,.46);padding:14px}.hud-status span{display:block;color:var(--cyan2);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:1000}.hud-status strong{display:block;margin-top:5px}.hud-status small,.hud-note{display:block;color:#cbd5e1;line-height:1.45}.hud-row{display:flex;gap:8px;margin-top:10px}.hud-row button{flex:1;border:1px solid rgba(133,239,255,.2);border-radius:999px;background:rgba(6,15,24,.82);color:#e0f7ff;padding:9px 10px;font-weight:900}.hud-row button.active{border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);box-shadow:0 0 18px rgba(34,211,238,.2)}.intensity-control{display:flex;align-items:center;gap:10px;margin-top:12px;color:#dbeafe;font-weight:900}.intensity-control input{width:100%;accent-color:var(--cyan)}.hud-note{margin-top:10px}.mission-map{position:fixed;left:12px;top:50%;transform:translateY(-50%) scale(.9);transform-origin:left center;z-index:44;display:grid;gap:8px;padding:11px;border:1px solid rgba(133,239,255,.18);border-radius:26px;background:rgba(0,0,0,.42);backdrop-filter:blur(18px)}.mission-map strong{display:block;justify-self:start;color:#fde68a;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;padding:0 4px 4px}.mission-map a{display:grid;grid-template-columns:34px auto;align-items:center;gap:8px;min-width:128px;padding:6px;border:1px solid rgba(133,239,255,.12);border-radius:14px;background:rgba(4,12,20,.7);position:relative}.mission-map a span{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(133,239,255,.16);border-radius:50%;font-size:.75rem;font-weight:1000}.mission-map a em{font-style:normal;white-space:nowrap;color:#dffbff;opacity:.88}.mission-map a.active{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.35)}.mission-map a.active span{border-color:rgba(251,191,36,.4);color:#fde68a}.mission-map a.active em{color:#fde68a}.profile-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(133,239,255,.4);box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18);flex:0 0 auto}.shortcut-rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:-20px;margin-bottom:42px}.shortcut-card{padding:18px;min-height:128px}.shortcut-card span{display:block;color:var(--cyan);font-size:.72rem;text-transform:uppercase;letter-spacing:.16em;font-weight:1000}.shortcut-card strong{display:block;margin-top:10px;font-size:1.1rem;line-height:1.2}.shortcut-card em{display:block;margin-top:14px;color:#fde68a;font-style:normal;font-weight:1000}.section-wrap{padding:62px 0;scroll-margin-top:120px}.section-heading{margin-bottom:28px}.section-heading.split{display:grid;grid-template-columns:1fr minmax(280px,440px);gap:30px;align-items:end}.section-heading h2{margin:0;font-size:clamp(1.8rem,3.3vw,3.15rem);line-height:.96;letter-spacing:-.06em}.section-heading p:not(.eyebrow){margin:0;color:#cbd5e1;line-height:1.72}.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.project-card{padding:24px}.card-glow{position:absolute;inset:auto -20% -40% auto;width:60%;height:70%;background:radial-gradient(circle,rgba(34,211,238,.18),transparent 60%);pointer-events:none}.project-topline{display:flex;align-items:center;gap:12px}.project-topline span{display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(251,191,36,.36);border-radius:16px;color:#fde68a;font-weight:1000}.project-topline em{color:var(--cyan);font-style:normal;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem;font-weight:1000}.project-visual{margin:20px 0;min-height:155px;border:1px solid rgba(133,239,255,.14);border-radius:26px;background:radial-gradient(circle at 50% 40%,rgba(34,211,238,.15),transparent 55%),rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:18px}.flow-node{display:flex;align-items:center;gap:8px}.flow-node span{display:grid;place-items:center;min-width:72px;min-height:54px;border:1px solid rgba(133,239,255,.22);border-radius:16px;color:#dffbff;text-transform:uppercase;font-weight:1000;font-size:.72rem}.flow-node em{color:var(--cyan);font-style:normal}.project-card h3{margin:0;font-size:clamp(1.45rem,2.1vw,2.05rem);letter-spacing:-.04em}.project-card p{color:#d4e3f3;line-height:1.7}.chip-row{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.chip{display:inline-flex;align-items:center;border:1px solid rgba(133,239,255,.17);border-radius:999px;background:rgba(3,10,17,.74);color:#e6fbff;padding:8px 11px;font-size:.82rem;font-weight:850}.project-card ul{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:10px;color:#cbd5e1}.project-card li:before{content:"✓";color:var(--cyan);margin-right:8px}.architecture-panel{padding:38px;border-radius:38px}.pipeline{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.pipeline article{position:relative;border:1px solid rgba(133,239,255,.15);background:rgba(0,0,0,.28);border-radius:24px;padding:18px;min-height:190px}.pipeline article:not(:last-child):after{content:"→";position:absolute;right:-13px;top:50%;transform:translateY(-50%);color:var(--cyan);font-weight:1000;z-index:3}.pipeline span{color:var(--gold);font-weight:1000}.pipeline h3{font-size:1rem}.pipeline p{color:#afc2d7;line-height:1.5;font-size:.9rem}.experience-grid,.stack-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.experience-card,.stack-grid article{padding:24px}.experience-card>p:first-child{margin:0;color:var(--gold);font-weight:900}.experience-card h3{margin:14px 0 4px;font-size:1.7rem}.experience-card h4{margin:0;color:var(--cyan)}.experience-card p:last-child{color:#cbd5e1;line-height:1.72}.stack-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.stack-grid h3{margin:0 0 16px;color:#dffbff}.stack-grid div{display:flex;flex-wrap:wrap;gap:8px}.footer-shell{z-index:8;display:flex;align-items:flex-start;justify-content:space-between;gap:26px;margin:62px auto 20px;padding:32px}.footer-shell>div:first-child{display:grid;justify-items:start;gap:10px}.footer-shell h2{margin:4px 0 0;font-size:clamp(1.8rem,3vw,3rem);letter-spacing:-.045em}.footer-shell p{color:#cbd5e1}.scroll-finish-spacer{position:relative;z-index:3;height:min(42vh,420px)}.contact-links{display:grid;gap:10px;min-width:min(420px,100%)}.contact-links a{border:1px solid rgba(133,239,255,.17);background:rgba(0,0,0,.28);border-radius:18px;padding:14px 16px}@media (max-width:1180px){.mission-map{display:none}.sector,.shortcut-rail{width:min(100% - 44px,1040px)}.hero-sector{grid-template-columns:1fr}.shortcut-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.project-grid,.experience-grid{grid-template-columns:1fr}.stack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline article:not(:last-child):after{display:none}}@media (max-width:760px){:root{font-size:85%}.world-foreground{z-index:7;opacity:.65}.nav-shell{align-items:flex-start;border-radius:28px}.nav-shell nav{display:none}.nav-cta{display:none}.sector,.shortcut-rail{width:min(100% - 22px,1240px)}.hero-sector{padding-top:120px}.hero-copy{padding:28px 20px}.hero-copy h1{font-size:clamp(3.4rem,18vw,6rem)}.metrics-row,.stack-grid,.section-heading.split,.shortcut-rail{grid-template-columns:1fr}.floating-hud{position:relative;right:auto;bottom:auto;width:min(100% - 22px,1240px);height:auto;margin:0 auto 30px;z-index:22;border-radius:28px}.floating-hud .hud-status strong,.floating-hud .hud-status small,.floating-hud .hud-row,.floating-hud .intensity-control,.floating-hud .hud-note{opacity:1;visibility:visible;max-height:220px}.footer-shell{display:block}.contact-links{margin-top:20px}.project-card{padding:18px}.project-visual{justify-content:flex-start}.flow-node span{min-width:62px}}:is(.panel-card,.nav-shell,.nav-cta,.hero-actions a,.metrics-row span,.floating-hud,.hud-row button,.mission-map,.mission-map a,.mission-map a span,.profile-avatar,.shortcut-card,.project-card,.project-topline span,.project-visual,.flow-node span,.chip,.architecture-panel,.pipeline article,.experience-card,.stack-grid article,.footer-shell,.contact-links a){border-radius:0!important;clip-path:polygon(0 0,calc(100% - var(--fold,18px)) 0,100% var(--fold,18px),100% 100%,0 100%)}.profile-avatar{object-fit:cover}.mark i{border-radius:0!important}.nav-shell{--fold:22px}.panel-card,.floating-hud,.mission-map{--fold:24px}.hud-row button,.chip,.nav-cta,.hero-actions a,.contact-links a{--fold:12px}`,Gf=`
.portrait-background{
  position:fixed;
  top:-22px;
  right:-138px;
  z-index:3;
  width:min(64vw,827px);
  height:min(74vh,774px);
  pointer-events:none;
  opacity:.72;
  mix-blend-mode:normal;
  filter:contrast(1.04) brightness(.96);
  mask-image:
    radial-gradient(ellipse at 58% 42%,#000 0%,rgba(0,0,0,.98) 46%,rgba(0,0,0,.72) 65%,rgba(0,0,0,.22) 82%,transparent 96%),
    linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 8%,rgba(0,0,0,.62) 24%,#000 34%,#000 72%,transparent 100%),
    linear-gradient(180deg,transparent 0%,#000 14%,#000 66%,rgba(0,0,0,.36) 84%,transparent 100%);
  mask-composite:intersect;
  -webkit-mask-image:
    radial-gradient(ellipse at 58% 42%,#000 0%,rgba(0,0,0,.98) 46%,rgba(0,0,0,.72) 65%,rgba(0,0,0,.22) 82%,transparent 96%),
    linear-gradient(90deg,transparent 0%,rgba(0,0,0,.08) 8%,rgba(0,0,0,.62) 24%,#000 34%,#000 72%,transparent 100%),
    linear-gradient(180deg,transparent 0%,#000 14%,#000 66%,rgba(0,0,0,.36) 84%,transparent 100%);
  -webkit-mask-composite:source-in, source-in;
}
.portrait-background:after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(ellipse at 100% 100%,rgba(2,7,13,0) 0%,rgba(2,7,13,.16) 46%,rgba(2,7,13,.82) 90%,rgba(2,7,13,1) 100%),
    linear-gradient(90deg,rgba(2,7,13,.88) 0%,rgba(2,7,13,.56) 12%,rgba(2,7,13,.16) 26%,rgba(2,7,13,0) 42%,rgba(2,7,13,0) 100%);
}
.portrait-background img{
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:right top;
  transform-origin:center;
}
@media (max-width:760px){
  .portrait-background{
    top:-12px;
    right:-120px;
    width:min(83vw,528px);
    height:min(53vh,493px);
    opacity:.52;
  }
}
`,Zf=`
@import url("https://fonts.cdnfonts.com/css/soria");
:root{
  --display-font:"Soria","Georgia","Times New Roman",serif;
  --body-font:"Soria","Georgia","Times New Roman",serif;
  --hud-fit-scale:1;
  --map-fit-scale:.9;
  --lore-frame:#2a1710;
  --lore-ring:#8f5b2e;
  --lore-paper:#e5d2ae;
  --lore-paper-hi:rgba(255,255,255,.34);
  --lore-paper-line:rgba(79,47,25,.045);
  --lore-ink:#372016;
  --lore-heading:#24130d;
  --lore-accent:#6c2d1e;
  --lore-face-bg:#120806;
  font-size:88.2%;
  font-family:var(--body-font);
}
body,
button,
input,
a,
p,
small,
strong,
em,
span,
li{
  font-family:var(--body-font);
  font-weight:500;
}
.hero-copy h1,
.hero-copy h2,
.section-heading h2,
.project-card h3,
.footer-shell h2{
  font-family:var(--display-font);
  font-weight:600;
  font-stretch:normal;
  text-transform:uppercase;
  letter-spacing:.01em;
  line-height:1.02;
}
.hero-copy h1{
  font-size:clamp(3.45rem,7vw,6.85rem);
  letter-spacing:.005em;
  max-width:980px;
}
.hero-copy h2{
  font-size:clamp(1.35rem,2.25vw,2.15rem);
  letter-spacing:.01em;
  line-height:1.12;
  max-width:760px;
}
.section-heading h2{
  font-size:clamp(1.8rem,3.05vw,3.1rem);
  line-height:1.08;
}
.eyebrow,
.shortcut-card span,
.project-topline em,
.mission-map strong,
.hud-status span,
.brand strong,
.brand small{
  font-family:var(--display-font);
  font-weight:600;
  letter-spacing:.05em;
}
.hero-lede,
.project-card p,
.experience-card p,
.section-heading p,
.pipeline p{
  font-family:var(--body-font);
  font-weight:500;
  letter-spacing:.008em;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme){
  --bg:#000;
  --panel:rgba(14,14,14,.88);
  --line:rgba(255,255,255,.18);
  --cyan:#f5f5f5;
  --cyan2:#fff;
  --gold:#d9d9d9;
  --text:#f4f4f4;
  --muted:#a6a6a6;
  --lore-frame:#181818;
  --lore-ring:#d7d7d7;
  --lore-paper:#e0e0dc;
  --lore-paper-hi:rgba(255,255,255,.46);
  --lore-paper-line:rgba(0,0,0,.055);
  --lore-ink:#1f1f1f;
  --lore-heading:#080808;
  --lore-accent:#5a5a5a;
  --lore-face-bg:#050505;
  background:
    radial-gradient(circle at 76% 16%,rgba(255,255,255,.18),transparent 30rem),
    radial-gradient(circle at 18% 82%,rgba(96,96,96,.22),transparent 32rem),
    radial-gradient(circle at 50% 22%,rgba(255,255,255,.06),transparent 38rem),
    #000;
  color:var(--text);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme):after{
  background:
    linear-gradient(90deg,rgba(0,0,0,.97) 0%,rgba(18,18,18,.7) 42%,rgba(42,42,42,.22) 100%),
    linear-gradient(to bottom,rgba(255,255,255,.08),rgba(8,8,8,.06) 40%,rgba(0,0,0,.96));
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .ambient-grid{
  opacity:.72;
  background:
    linear-gradient(rgba(255,255,255,.034) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.026) 1px,transparent 1px),
    radial-gradient(circle at 80% 20%,rgba(255,255,255,.18),transparent 29rem);
  background-size:72px 72px,72px 72px,auto;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .portrait-background{
  opacity:.8;
  filter:contrast(1.12) brightness(1.02) grayscale(.1);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .panel-card,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .floating-hud,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .nav-shell{
  border-color:rgba(255,255,255,.16);
  background:linear-gradient(145deg,rgba(24,24,24,.88),rgba(2,2,2,.86));
  box-shadow:0 28px 90px rgba(0,0,0,.66),0 0 34px rgba(255,255,255,.08);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .panel-card:before{
  background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(255,255,255,.12),transparent 44%);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .world-foreground{
  filter:drop-shadow(0 0 24px rgba(255,255,255,.24));
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h1,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h2,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .section-heading h2,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card h3,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .footer-shell h2{
  color:#f2fbf8;
  background:none;
  -webkit-text-fill-color:currentColor;
  text-shadow:0 2px 10px rgba(0,0,0,.7),0 0 24px rgba(255,255,255,.14);
  filter:none;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-copy h2 span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .eyebrow,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .shortcut-card span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-topline em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-status span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map strong,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .shortcut-card em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .brand strong,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .brand small{
  color:#d9d9d9;
  text-shadow:0 0 16px rgba(255,255,255,.16);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-topline span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card>p:first-child,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card h4,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .flow-node em,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card li:before,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline article:after{
  color:#f2fbf8;
  border-color:rgba(255,255,255,.28);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-lede,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .section-heading p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .experience-card p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline p,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-card li,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-note,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-status small{
  color:#d2d2d2;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .nav-cta,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-actions a,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-row button,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .chip,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .contact-links a,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .metrics-row span,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a{
  border-color:rgba(255,255,255,.18);
  background:rgba(18,18,18,.78);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .project-visual,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .pipeline article,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .flow-node span{
  border-color:rgba(255,255,255,.2);
  background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.12),transparent 55%),rgba(0,0,0,.26);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .chip,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .contact-links a{
  border-color:rgba(255,255,255,.2);
  background:rgba(18,18,18,.78);
  color:#f2fbf8;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .card-glow{
  background:radial-gradient(circle,rgba(255,255,255,.14),transparent 62%);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hero-actions .primary-action,
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .hud-row button.active{
  border-color:rgba(255,255,255,.76);
  background:linear-gradient(135deg,#fff,#d8d8d8 54%,#4f4f4f);
  color:#050505;
  box-shadow:0 0 30px rgba(255,255,255,.28),0 0 18px rgba(255,255,255,.12);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a span{
  border-color:rgba(255,255,255,.92);
  color:#fff;
  background:rgba(255,255,255,.24);
  box-shadow:0 0 44px rgba(255,255,255,.68), inset 0 0 22px rgba(255,255,255,.28);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a.active span{
  color:#050505;
  background:#fff;
  border-color:rgba(255,255,255,1);
  box-shadow:0 0 68px rgba(255,255,255,1),0 0 0 4px rgba(255,255,255,.34);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .mission-map a.active em{
  color:#fff;
}
.site.fall-theme{
  --bg:#16090d;
  --panel:rgba(55,24,25,.78);
  --line:rgba(232,211,168,.24);
  --cyan:#c68443;
  --cyan2:#e8d3a8;
  --gold:#d89a45;
  --text:#fff5df;
  --muted:#d9c7a5;
  --lore-frame:#491323;
  --lore-ring:#d89a45;
  --lore-paper:#f0d6a4;
  --lore-paper-hi:rgba(255,245,218,.38);
  --lore-paper-line:rgba(96,39,24,.055);
  --lore-ink:#3a1714;
  --lore-heading:#2b1218;
  --lore-accent:#8b3f24;
  --lore-face-bg:#16090d;
  background:#16090d;
  color:var(--text);
}
.site.fall-theme:after{
  background:
    linear-gradient(90deg,rgba(66,19,33,.7) 0%,rgba(126,50,31,.28) 44%,rgba(240,138,46,.08) 100%),
    linear-gradient(to bottom,rgba(247,211,157,.05),rgba(126,50,31,.06) 42%,rgba(66,19,33,.86));
}
.site.fall-theme .ambient-grid{
  opacity:.58;
  background:
    linear-gradient(rgba(255,227,111,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,227,111,.03) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(255,227,111,.2),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.fall-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(22,9,13,0) 0%,rgba(22,9,13,.1) 42%,rgba(55,24,25,.38) 74%,rgba(22,9,13,.94) 100%);
}
.site.fall-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.fall-theme .panel-card,
.site.fall-theme .floating-hud,
.site.fall-theme .mission-map,
.site.fall-theme .nav-shell{
  border-color:rgba(232,211,168,.24);
  background:linear-gradient(145deg,rgba(89,37,31,.78),rgba(32,13,17,.74));
  box-shadow:0 28px 90px rgba(44,12,12,.44);
}
.site.fall-theme .nav-cta,
.site.fall-theme .hero-actions a,
.site.fall-theme .hud-row button,
.site.fall-theme .chip,
.site.fall-theme .contact-links a,
.site.fall-theme .metrics-row span,
.site.fall-theme .mission-map a{
  border-color:rgba(232,211,168,.22);
  background:rgba(86,37,31,.56);
  color:#fff1d2;
}
.site.fall-theme .hud-row button.active,
.site.fall-theme .fall-weather-button.active,
.site.fall-theme .hero-actions .primary-action{
  border-color:rgba(216,154,69,.72);
  background:linear-gradient(135deg,#e8d3a8,#c68443);
  color:#2b1218;
  box-shadow:0 0 30px rgba(198,132,67,.28);
}
.site.fall-theme .eyebrow,
.site.fall-theme .shortcut-card span,
.site.fall-theme .project-topline em,
.site.fall-theme .hud-status span,
.site.fall-theme .mission-map a.active em,
.site.fall-theme .mission-map a.active span{
  color:#e8d3a8;
}
.site.fall-theme .mission-map a span{
  border-color:rgba(73,19,35,.72);
  color:#e8d3a8;
  background:rgba(73,19,35,.2);
  box-shadow:0 0 18px rgba(73,19,35,.42), inset 0 0 14px rgba(73,19,35,.18);
}
.site.fall-theme .mission-map a.active span{
  border-color:rgba(73,19,35,.98);
  color:#fff1d2;
  background:#491323;
  box-shadow:0 0 30px rgba(73,19,35,.8), 0 0 0 2px rgba(73,19,35,.24);
}
.site.fall-theme .mission-map a.active{
  border-color:rgba(73,19,35,.58);
  background:rgba(73,19,35,.18);
}
.site.fall-theme .section-heading p,
.site.fall-theme .hero-lede,
.site.fall-theme .project-card p,
.site.fall-theme .experience-card p:last-child,
.site.fall-theme .pipeline p{
  color:#eadfc8;
}
.site.spring-theme{
  --bg:#071d1b;
  --panel:rgba(10,45,39,.78);
  --line:rgba(190,255,236,.24);
  --cyan:#50d2ee;
  --cyan2:#ecfff7;
  --gold:#b8f55f;
  --text:#f6fffd;
  --muted:#bfe7dc;
  --lore-frame:#0a4a3f;
  --lore-ring:#b8f55f;
  --lore-paper:#d9f6dd;
  --lore-paper-hi:rgba(255,255,255,.42);
  --lore-paper-line:rgba(10,74,63,.052);
  --lore-ink:#10342f;
  --lore-heading:#06221f;
  --lore-accent:#1f8d7a;
  --lore-face-bg:#071d1b;
  background:#071d1b;
  color:var(--text);
}
.site.spring-theme:after{
  background:
    linear-gradient(90deg,rgba(5,30,36,.76) 0%,rgba(17,119,86,.28) 44%,rgba(112,201,232,.1) 100%),
    linear-gradient(to bottom,rgba(237,253,247,.08),rgba(47,185,134,.08) 42%,rgba(7,29,27,.88));
}
.site.spring-theme .ambient-grid{
  opacity:.62;
  background:
    linear-gradient(rgba(184,245,95,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(80,210,238,.035) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(184,245,95,.22),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.spring-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(7,29,27,0) 0%,rgba(7,29,27,.1) 42%,rgba(10,69,57,.38) 74%,rgba(7,29,27,.94) 100%);
}
.site.spring-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.spring-theme .panel-card,
.site.spring-theme .floating-hud,
.site.spring-theme .mission-map,
.site.spring-theme .nav-shell{
  border-color:rgba(190,255,236,.24);
  background:linear-gradient(145deg,rgba(12,74,63,.78),rgba(5,28,34,.74));
  box-shadow:0 28px 90px rgba(3,24,25,.42);
}
.site.spring-theme .nav-cta,
.site.spring-theme .hero-actions a,
.site.spring-theme .hud-row button,
.site.spring-theme .chip,
.site.spring-theme .contact-links a,
.site.spring-theme .metrics-row span,
.site.spring-theme .mission-map a{
  border-color:rgba(190,255,236,.24);
  background:rgba(8,67,61,.56);
  color:#ecfff7;
}
.site.spring-theme .hud-row button.active,
.site.spring-theme .spring-weather-button.active,
.site.spring-theme .hero-actions .primary-action{
  border-color:rgba(184,245,95,.76);
  background:linear-gradient(135deg,#ecfff7,#b8f55f 48%,#50d2ee);
  color:#06251f;
  box-shadow:0 0 30px rgba(184,245,95,.32);
}
.site.spring-theme .eyebrow,
.site.spring-theme .shortcut-card span,
.site.spring-theme .project-topline em,
.site.spring-theme .hud-status span,
.site.spring-theme .mission-map a.active em,
.site.spring-theme .mission-map a.active span{
  color:#b8f55f;
}
.site.spring-theme .mission-map a span{
  border-color:rgba(3,92,60,.64);
  color:#0b6b4f;
  background:rgba(3,92,60,.12);
  box-shadow:0 0 18px rgba(3,92,60,.32), inset 0 0 14px rgba(3,92,60,.14);
}
.site.spring-theme .mission-map a.active span{
  border-color:rgba(236,255,247,.95);
  color:#ecfff7;
  background:#035c3c;
  box-shadow:0 0 28px rgba(3,92,60,.72), 0 0 0 2px rgba(236,255,247,.2);
}
.site.spring-theme .mission-map a.active{
  border-color:rgba(3,92,60,.52);
  background:rgba(3,92,60,.14);
}
.site.spring-theme .section-heading p,
.site.spring-theme .hero-lede,
.site.spring-theme .project-card p,
.site.spring-theme .experience-card p:last-child,
.site.spring-theme .pipeline p{
  color:#d9f5ec;
}
.site.winter-theme{
  --bg:#e8f7ff;
  --panel:rgba(232,247,255,.78);
  --line:rgba(91,161,199,.28);
  --cyan:#5a96b8;
  --cyan2:#5a96b8;
  --gold:#5a96b8;
  --text:#050505;
  --muted:#050505;
  --lore-frame:#4d7f9c;
  --lore-ring:#5a96b8;
  --lore-paper:#f0fbff;
  --lore-paper-hi:rgba(255,255,255,.72);
  --lore-paper-line:rgba(77,127,156,.065);
  --lore-ink:#050505;
  --lore-heading:#050505;
  --lore-accent:#315e76;
  --lore-face-bg:#d7edf8;
  background:#e8f7ff;
  color:var(--text);
}
.site.winter-theme:after{
  background:
    linear-gradient(90deg,rgba(248,253,255,.62) 0%,rgba(189,238,255,.22) 48%,rgba(111,190,230,.12) 100%),
    linear-gradient(to bottom,rgba(255,255,255,.22),rgba(189,238,255,.1) 44%,rgba(181,226,247,.72));
}
.site.winter-theme .ambient-grid{
  opacity:.56;
  background:
    linear-gradient(rgba(91,161,199,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px),
    radial-gradient(circle at 78% 18%,rgba(255,255,255,.54),transparent 30rem);
  background-size:72px 72px,72px 72px,auto;
}
.site.winter-theme .foreground-fade{
  background:linear-gradient(to bottom,rgba(232,247,255,0) 0%,rgba(232,247,255,.14) 42%,rgba(181,226,247,.42) 74%,rgba(210,239,252,.94) 100%);
}
.site.winter-theme .portrait-background{
  opacity:0;
  visibility:hidden;
}
.site.winter-theme .panel-card,
.site.winter-theme .floating-hud,
.site.winter-theme .mission-map,
.site.winter-theme .nav-shell{
  border-color:rgba(91,161,199,.28);
  background:linear-gradient(145deg,rgba(248,253,255,.82),rgba(177,225,247,.72));
  box-shadow:0 28px 90px rgba(91,161,199,.22),0 0 34px rgba(255,255,255,.32);
}
.site.winter-theme .nav-cta,
.site.winter-theme .hero-actions a,
.site.winter-theme .hud-row button,
.site.winter-theme .chip,
.site.winter-theme .contact-links a,
.site.winter-theme .metrics-row span,
.site.winter-theme .mission-map a{
  border-color:rgba(91,161,199,.28);
  background:rgba(248,253,255,.64);
  color:#050505;
}
.site.winter-theme .hud-row button.active,
.site.winter-theme .winter-weather-button.active,
.site.winter-theme .hero-actions .primary-action{
  border-color:rgba(90,150,184,.9);
  background:linear-gradient(135deg,#fff,#dff7ff 42%,#5a96b8);
  color:#050505;
  box-shadow:0 0 34px rgba(90,150,184,.58);
}
.site.winter-theme .eyebrow,
.site.winter-theme .shortcut-card span,
.site.winter-theme .project-topline em,
.site.winter-theme .hud-status span,
.site.winter-theme .mission-map strong,
.site.winter-theme .mission-map a.active em,
.site.winter-theme .mission-map a.active span{
  color:#050505;
}
.site.winter-theme .hero-copy h1,
.site.winter-theme .hero-copy h2,
.site.winter-theme .hero-copy h2 span,
.site.winter-theme .section-heading h2,
.site.winter-theme .project-card h3,
.site.winter-theme .footer-shell h2,
.site.winter-theme .nav-shell nav,
.site.winter-theme .nav-shell nav a,
.site.winter-theme .brand strong,
.site.winter-theme .brand small,
.site.winter-theme .metrics-row small,
.site.winter-theme .stack-grid h3,
.site.winter-theme .experience-card h4,
.site.winter-theme .pipeline span,
.site.winter-theme .project-topline span,
.site.winter-theme .shortcut-card strong,
.site.winter-theme .shortcut-card em,
.site.winter-theme .project-card li,
.site.winter-theme .project-card ul,
.site.winter-theme .chip,
.site.winter-theme .flow-node span,
.site.winter-theme .flow-node em,
.site.winter-theme .project-visual,
.site.winter-theme .experience-card>p:first-child,
.site.winter-theme .footer-shell p,
.site.winter-theme .contact-links a{
  color:#050505;
}
.site.winter-theme .mission-map a span{
  border-color:rgba(90,150,184,.88);
  color:#050505;
  background:rgba(255,255,255,.52);
  box-shadow:0 0 22px rgba(90,150,184,.58), inset 0 0 14px rgba(255,255,255,.48);
}
.site.winter-theme .mission-map a.active span{
  border-color:rgba(90,150,184,1);
  color:#fff;
  background:#5a96b8;
  box-shadow:0 0 38px rgba(90,150,184,.92),0 0 0 2px rgba(255,255,255,.72);
}
.site.winter-theme .mission-map a.active{
  border-color:rgba(90,150,184,.78);
  background:rgba(255,255,255,.7);
}
.site.winter-theme .section-heading p,
.site.winter-theme .hero-lede,
.site.winter-theme .project-card p,
.site.winter-theme .experience-card p:last-child,
.site.winter-theme .pipeline p,
.site.winter-theme .hud-status small,
.site.winter-theme .hud-note,
.site.winter-theme .brand small,
.site.winter-theme .mission-map a em,
.site.winter-theme .metrics-row small,
.site.winter-theme .project-card li{
  color:#050505;
}
@media (max-width:760px){
  :root{
    font-size:93.71%;
  }
}
`,Jf=`
:is(.project-visual,.architecture-panel,.project-card,.experience-card,.stack-grid article,.footer-shell,.floating-hud,.mission-map,.nav-shell){
  position:relative;
}
:is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  content:"";
  position:absolute;
  top:0;
  right:0;
  width:var(--fold,18px);
  height:var(--fold,18px);
  clip-path:polygon(0 0,100% 100%,0 100%);
  background:linear-gradient(135deg,rgba(255,255,255,.28),rgba(103,232,249,.2) 42%,rgba(2,7,13,.58) 100%);
  border-left:1px solid rgba(133,239,255,.32);
  border-bottom:1px solid rgba(133,239,255,.24);
  box-shadow:-6px 6px 18px rgba(0,0,0,.24);
  pointer-events:none;
  z-index:4;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) :is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  background:linear-gradient(135deg,rgba(255,255,255,.32),rgba(118,118,118,.24) 42%,rgba(2,2,2,.6) 100%);
  border-left:1px solid rgba(255,255,255,.26);
  border-bottom:1px solid rgba(255,255,255,.2);
}
:is(.nav-cta,.hero-actions a,.metrics-row span,.hud-row button,.mission-map a,.mission-map a span,.shortcut-card,.project-topline span,.flow-node span,.chip,.contact-links a){
  clip-path:none!important;
}
:is(.nav-cta,.hero-actions a,.metrics-row span,.hud-row button,.mission-map a,.mission-map a span,.shortcut-card,.project-topline span,.flow-node span,.chip,.contact-links a)::after{
  content:none!important;
}
`,qf=`
.hero-sector{
  min-height:auto!important;
  padding-top:96px!important;
  padding-bottom:28px!important;
}
.section-wrap{
  padding-top:64px!important;
  padding-bottom:64px!important;
}
.scroll-finish-spacer{
  height:0!important;
}
.footer-shell{
  margin-bottom:0!important;
}
.floating-hud{
  position:fixed!important;
  right:18px!important;
  bottom:18px!important;
  left:auto!important;
  top:auto!important;
  width:min(340px,calc(100% - 36px))!important;
  height:auto!important;
  margin:0!important;
  z-index:45!important;
  transform:scale(var(--hud-fit-scale,1))!important;
  transform-origin:right bottom!important;
}
.floating-hud .hud-note{
  white-space:nowrap!important;
}
.lore-guide{
  position:fixed!important;
  left:20px!important;
  bottom:22px!important;
  z-index:46!important;
  display:block!important;
  width:min(520px,calc(100% - 40px))!important;
  min-height:104px!important;
  padding:0 42px 0 78px!important;
  border:0!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  transition:opacity .2s ease,transform .2s ease!important;
}
.lore-guide-toggle{
  position:absolute!important;
  top:15px!important;
  right:10px!important;
  display:grid!important;
  place-items:center!important;
  width:28px!important;
  height:28px!important;
  border:0!important;
  background:transparent!important;
  color:var(--lore-accent)!important;
  padding:0!important;
  z-index:4!important;
}
.lore-guide-face{
  position:absolute;
  left:0;
  top:50%;
  width:104px;
  height:104px;
  overflow:hidden;
  border:3px solid var(--lore-frame);
  background:var(--lore-face-bg);
  border-radius:50%;
  transform:translateY(-50%);
  box-shadow:0 0 0 3px var(--lore-ring),0 9px 0 rgba(0,0,0,.22),0 18px 36px rgba(0,0,0,.46);
  z-index:3;
}
.lore-guide-face:after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 28% 22%,color-mix(in srgb,var(--lore-ring) 26%,transparent),transparent 34%),
    linear-gradient(135deg,rgba(255,255,255,.18),transparent 32%),
    repeating-linear-gradient(-10deg,color-mix(in srgb,var(--lore-ring) 14%,transparent) 0 1px,transparent 1px 9px);
  mix-blend-mode:screen;
  opacity:.5;
  pointer-events:none;
}
.lore-guide-face img{
  width:116%;
  height:116%;
  object-fit:cover;
  object-position:50% 34%;
  transform:translate(-6%,-5%) scale(1.06);
  filter:contrast(1.08) saturate(1.08) brightness(.9);
}
.lore-guide-copy{
  display:grid;
  gap:5px;
  min-width:0;
  min-height:92px;
  padding:14px 22px 14px 42px;
  border:3px solid var(--lore-frame);
  background:
    linear-gradient(180deg,var(--lore-paper-hi),transparent 38%),
    repeating-linear-gradient(0deg,var(--lore-paper-line) 0 1px,transparent 1px 5px),
    var(--lore-paper);
  box-shadow:0 0 0 2px var(--lore-ring),0 10px 0 rgba(0,0,0,.22),0 20px 42px rgba(0,0,0,.36);
  color:var(--lore-ink);
  clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);
  transform-origin:18px 50%;
  animation:loreDialogPop .34s cubic-bezier(.19,1,.22,1) both;
}
.lore-guide-copy > span{
  color:var(--lore-accent);
  font-size:.58rem;
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.lore-guide-copy strong{
  display:block;
  color:var(--lore-heading);
  font-size:.8rem;
  letter-spacing:.02em;
  line-height:1.1;
}
.lore-guide-copy p{
  margin:0;
  min-height:1.05em;
  color:var(--lore-ink);
  font-size:.76rem;
  line-height:1.38;
  opacity:1;
  transform:none;
}
.lore-guide-copy.exiting{
  animation:loreDialogOut .2s ease both;
}
.lore-guide-copy.exiting p{
  animation:loreTextOut .18s ease both;
}
.lore-type-caret{
  display:inline-block;
  width:7px;
  height:1em;
  margin-left:2px;
  vertical-align:-.13em;
  background:var(--lore-accent);
  animation:loreCaretBlink .78s steps(1,end) infinite;
}
.lore-guide.collapsed{
  width:48px!important;
  height:48px!important;
  min-height:48px!important;
  grid-template-columns:1fr!important;
  padding:6px!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.lore-guide.collapsed .lore-guide-face,
.lore-guide.collapsed .lore-guide-copy{
  display:none!important;
}
.lore-guide.collapsed .lore-guide-toggle{
  inset:6px!important;
  width:36px!important;
  height:36px!important;
  color:var(--text)!important;
}
@keyframes loreDialogPop{
  0%{opacity:0;transform:translateX(-12px) scale(.84) rotate(-1.8deg)}
  68%{opacity:1;transform:translateX(2px) scale(1.025) rotate(.5deg)}
  100%{opacity:1;transform:translateX(0) scale(1) rotate(0)}
}
@keyframes loreDialogOut{
  0%{opacity:1;transform:translateX(0) scale(1)}
  100%{opacity:0;transform:translateX(-10px) scale(.92)}
}
@keyframes loreTextOut{
  0%{opacity:1;transform:translateY(0) scale(1)}
  100%{opacity:0;transform:translateY(-4px) scale(.98)}
}
@keyframes loreCaretBlink{
  0%,48%{opacity:1}
  49%,100%{opacity:0}
}
.mission-map{
  position:fixed!important;
  left:12px!important;
  top:50%!important;
  right:auto!important;
  bottom:auto!important;
  width:auto!important;
  transform:translateY(-50%) scale(var(--map-fit-scale,.9))!important;
  transform-origin:left center!important;
  display:grid!important;
  gap:8px!important;
  padding:11px!important;
  clip-path:none!important;
}
.mission-map::after,
.mission-map a::after,
.mission-map a span::after,
.shortcut-card::after,
.profile-avatar::after,
.lore-guide::after{
  content:none!important;
}
.profile-avatar{
  width:72.5px!important;
  height:72.5px!important;
  border-radius:50%!important;
  clip-path:circle(50% at 50% 50%)!important;
  aspect-ratio:1/1!important;
  overflow:hidden!important;
  border:1px solid rgba(133,239,255,.55)!important;
  box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18)!important;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .profile-avatar{
  border-color:rgba(255,255,255,.62)!important;
  box-shadow:0 0 0 2px rgba(0,0,0,.82),0 0 20px rgba(255,255,255,.22)!important;
}
.nav-shell,
.brand{
  overflow:visible!important;
}
.nav-shell{
  height:60px!important;
  min-height:60px!important;
  padding-top:7px!important;
  padding-bottom:7px!important;
  align-items:center!important;
  clip-path:none!important;
  border:0!important;
}
.brand{
  position:relative!important;
  min-height:45px!important;
  padding-left:90px!important;
}
.brand .profile-avatar{
  position:absolute!important;
  left:0!important;
  top:50%!important;
  transform:translateY(-50%)!important;
  z-index:3!important;
}
.nav-shell::after{
  content:none!important;
}
.nav-cta{
  padding-top:9px!important;
  padding-bottom:9px!important;
  line-height:1!important;
}
@media (max-width:760px){
  .lore-guide{
    left:11px!important;
    bottom:11px!important;
    width:min(390px,calc(100% - 22px))!important;
    min-height:86px!important;
    padding:0 38px 0 58px!important;
  }
  .lore-guide-face{
    width:78px;
    height:78px;
  }
  .lore-guide-copy p{
    font-size:.68rem;
  }
  .lore-guide-copy{
    min-height:78px;
    padding:11px 16px 11px 32px;
  }
}
.mission-map a{
  min-width:128px!important;
  padding:6px!important;
  display:grid!important;
  grid-template-columns:34px auto!important;
  gap:8px!important;
  clip-path:none!important;
}
.mission-map a span{
  width:34px!important;
  height:34px!important;
  clip-path:none!important;
}
.shortcut-rail{
  position:relative!important;
  z-index:8!important;
  width:min(1080px,calc(100% - 120px))!important;
  margin:-20px auto 42px!important;
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr))!important;
  gap:14px!important;
}
.shortcut-card{
  min-height:128px!important;
  padding:18px!important;
  clip-path:none!important;
}
@media (max-width:1180px){
  .shortcut-rail{
    width:min(100% - 44px,1040px)!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
  }
}
@media (max-width:760px){
  .hero-sector{
    padding-top:92px!important;
    padding-bottom:24px!important;
  }
  .shortcut-rail{
    width:min(100% - 22px,1240px)!important;
    grid-template-columns:1fr!important;
  }
}
`,em=`
.overlay-collapse-button{
  position:absolute;
  z-index:12;
  display:grid;
  place-items:center;
  width:32px;
  height:32px;
  border:2px solid color-mix(in srgb,var(--cyan) 58%,rgba(255,255,255,.36));
  border-radius:48% 52% 44% 56%/55% 43% 57% 45%;
  background:
    radial-gradient(circle at 36% 30%,rgba(255,255,255,.28),transparent 36%),
    color-mix(in srgb,var(--panel) 68%,rgba(255,255,255,.12));
  color:var(--cyan2);
  font-weight:1000;
  line-height:1;
  box-shadow:3px 4px 0 rgba(0,0,0,.18),inset 0 0 0 1px rgba(255,255,255,.12);
  clip-path:none!important;
}
.overlay-collapse-button::after{
  content:none!important;
}
.overlay-collapse-button:hover{
  border-color:color-mix(in srgb,var(--cyan2) 82%,white);
  background:
    radial-gradient(circle at 36% 30%,rgba(255,255,255,.34),transparent 36%),
    color-mix(in srgb,var(--cyan) 18%,var(--panel));
}
.sketch-pointer{
  width:20px;
  height:20px;
  overflow:visible;
  fill:color-mix(in srgb,currentColor 42%,transparent);
  stroke:currentColor;
  stroke-width:2.1;
  stroke-linecap:round;
  stroke-linejoin:round;
  transform-origin:50% 50%;
  filter:drop-shadow(1px 1px 0 rgba(0,0,0,.24));
}
.sketch-pointer path{
  vector-effect:non-scaling-stroke;
}
.sketch-pointer-shadow{
  fill:rgba(0,0,0,.18);
  stroke:rgba(0,0,0,.22);
  transform:translate(1px,1.2px) rotate(2deg);
}
.sketch-pointer.left{
  transform:rotate(180deg);
}
.sketch-pointer.down{
  transform:rotate(90deg);
}
.sketch-pointer.up{
  transform:rotate(-90deg);
}
.hud-collapse-button{
  top:10px;
  right:10px;
}
.map-collapse-button{
  top:8px;
  right:-17px;
}
.hud-content{
  padding-right:36px;
}
.particle-cycle-row{
  display:grid!important;
  grid-template-columns:40px minmax(0,1fr) 40px;
  gap:6px!important;
}
.particle-cycle-row button{
  min-width:0;
  box-shadow:none!important;
}
.particle-cycle-row .particle-arrow{
  flex:0 0 40px;
  padding:9px 0!important;
  border-color:rgba(133,239,255,.18)!important;
  background:rgba(0,0,0,.28)!important;
  color:#dffbff!important;
}
.particle-cycle-row .particle-label{
  text-align:center;
  border-color:rgba(133,239,255,.18)!important;
  background:rgba(6,15,24,.58)!important;
  color:#e0f7ff!important;
}
.particle-cycle-row .particle-arrow:hover,
.particle-cycle-row .particle-label:hover{
  border-color:rgba(255,255,255,.34)!important;
  background:rgba(255,255,255,.1)!important;
}
.mission-map-content{
  display:grid;
  gap:8px;
}
.floating-hud,
.mission-map{
  transition:width .2s ease,padding .2s ease,transform .2s ease,opacity .2s ease;
}
.floating-hud.collapsed{
  width:48px!important;
  height:48px!important;
  min-height:48px!important;
  padding:6px!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.floating-hud.collapsed::after{
  display:none!important;
}
.floating-hud.collapsed .hud-content{
  display:none!important;
}
.floating-hud.collapsed .hud-collapse-button{
  inset:6px!important;
  width:36px!important;
  height:36px!important;
}
.mission-map.collapsed{
  width:48px!important;
  min-width:48px!important;
  height:48px!important;
  min-height:48px!important;
  padding:6px!important;
  gap:0!important;
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
  backdrop-filter:none!important;
  clip-path:none!important;
  overflow:visible!important;
}
.mission-map.collapsed::after{
  display:none!important;
}
.mission-map.collapsed .mission-map-content{
  display:none!important;
}
.mission-map.collapsed .map-collapse-button{
  inset:6px!important;
  width:36px!important;
  height:36px!important;
}
.floating-hud.collapsed .hud-collapse-button,
.mission-map.collapsed .map-collapse-button,
.floating-hud.collapsed .hud-collapse-button:hover,
.mission-map.collapsed .map-collapse-button:hover{
  border-color:transparent!important;
  background:transparent!important;
  box-shadow:none!important;
}
.floating-hud.collapsed .sketch-pointer,
.mission-map.collapsed .sketch-pointer{
  width:24px;
  height:24px;
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 36%,transparent)) drop-shadow(1px 1px 0 rgba(0,0,0,.28));
}
.tab-content{
  display:grid;
  gap:0;
  padding-top:28px!important;
}
.tab-pane{
  position:relative;
  display:grid;
  gap:38px;
  margin:0;
  padding:36px 34px 34px;
  border:1px solid rgba(255,255,255,.18);
  border-top-color:rgba(255,255,255,.13);
  background:
    linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018)),
    rgba(0,0,0,.28);
  box-shadow:0 24px 88px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.06);
  clip-path:none;
  overflow:hidden;
}
.tab-pane:before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:3px;
  background:linear-gradient(90deg,var(--gold),rgba(255,255,255,.44),transparent);
  opacity:.82;
}
.tab-pane-header{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(230px,.4fr) minmax(0,1fr);
  gap:34px;
  align-items:end;
  padding:0 0 26px;
  border-bottom:1px solid rgba(255,255,255,.14);
}
.tab-pane-header p{
  margin:0 0 8px;
  color:var(--gold);
  font-size:.74rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.tab-pane-header h2{
  margin:0;
  color:#f2fbf8;
  font-size:clamp(1.7rem,2.9vw,3rem);
  line-height:1.02;
  text-transform:uppercase;
}
.tab-pane-header span{
  color:#d2d2d2;
  line-height:1.64;
}
.tab-pane-body{
  position:relative;
  z-index:2;
  display:grid;
  gap:52px;
}
.tabbed-subsection{
  display:grid;
  gap:30px;
}
.tabbed-subsection .section-heading{
  margin-bottom:0;
}
.tab-content .project-grid,
.tab-content .experience-grid,
.tab-content .stack-grid{
  gap:30px;
}
.tab-content .project-card,
.tab-content .experience-card,
.tab-content .stack-grid article{
  padding:32px;
}
.tab-content .project-visual{
  margin:26px 0;
}
.tab-content .chip-row{
  gap:10px;
  margin:24px 0;
}
.tab-content .project-card ul{
  gap:14px;
  margin-top:24px;
}
.tab-content .architecture-panel{
  padding:44px;
}
.tab-content .architecture-panel{
  margin-top:0;
}
.tab-content .experience-card p:not(:first-child){
  color:#cbd5e1;
  line-height:1.72;
}
.tab-content .experience-card ul{
  display:grid;
  gap:12px;
  margin:20px 0 0;
  padding:0;
  list-style:none;
  color:#cbd5e1;
}
.tab-content .experience-card li:before{
  content:"/";
  color:var(--cyan);
  margin-right:8px;
}
.date-timeline-system{
  --sketch-accent:var(--cyan);
  --sketch-ink:#6f7374;
  --sketch-paper:rgba(248,249,244,.22);
  display:grid;
  gap:24px;
}
.date-timeline-controls{
  display:grid;
  grid-template-columns:42px minmax(0,1fr) 42px;
  gap:14px;
  align-items:stretch;
}
.date-timeline-controls button{
  border:2px solid color-mix(in srgb,var(--sketch-ink) 72%,transparent);
  border-radius:48% 52% 45% 55%/54% 46% 56% 44%;
  background:color-mix(in srgb,var(--sketch-paper) 58%,transparent);
  color:#101414;
  font-weight:1000;
  box-shadow:3px 4px 0 rgba(0,0,0,.14);
  clip-path:none!important;
}
.date-timeline-controls button:hover{
  border-color:var(--sketch-accent);
  background:color-mix(in srgb,var(--sketch-accent) 10%,rgba(255,255,255,.28));
}
.date-timeline-controls div{
  min-width:0;
  border:2px solid color-mix(in srgb,var(--sketch-ink) 68%,transparent);
  border-radius:10px 7px 12px 8px/8px 12px 7px 10px;
  background:
    repeating-linear-gradient(0deg,transparent 0 17px,rgba(111,115,116,.055) 18px 19px),
    color-mix(in srgb,var(--sketch-paper) 54%,transparent);
  padding:15px 18px;
  box-shadow:5px 6px 0 rgba(0,0,0,.12);
}
.date-timeline-controls span{
  display:block;
  color:var(--sketch-accent);
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.date-timeline-controls strong{
  display:block;
  margin-top:5px;
  color:#101414;
  font-size:clamp(1.1rem,1.8vw,1.55rem);
  line-height:1.04;
  text-transform:uppercase;
}
.date-timeline-rail{
  position:relative;
  min-height:650px;
  border:3px solid color-mix(in srgb,var(--sketch-ink) 76%,transparent);
  border-radius:12px 7px 14px 8px/8px 13px 7px 12px;
  background:
    linear-gradient(90deg,rgba(111,115,116,.025) 0 2px,transparent 2px 78px),
    repeating-linear-gradient(0deg,transparent 0 54px,rgba(111,115,116,.035) 55px 57px,transparent 58px 116px),
    radial-gradient(circle at 48% 8%,color-mix(in srgb,var(--sketch-accent) 6%,transparent),transparent 26%),
    var(--sketch-paper);
  box-shadow:8px 10px 0 rgba(0,0,0,.08);
  overflow:visible;
}
.date-timeline-rail:before{
  content:"";
  position:absolute;
  inset:30px 28px;
  opacity:.62;
  background:
    repeating-linear-gradient(180deg,color-mix(in srgb,var(--sketch-ink) 70%,transparent) 0 12px,transparent 13px 30px);
  background-position:left center;
  background-repeat:no-repeat;
  background-size:3px 100%;
  pointer-events:none;
}
.date-timeline-rail:after{
  content:"";
  position:absolute;
  left:12%;
  right:12%;
  bottom:28px;
  height:4px;
  border-top:4px solid color-mix(in srgb,var(--sketch-ink) 72%,transparent);
  border-radius:50%;
  transform:rotate(-.8deg);
  pointer-events:none;
}
.date-timeline-trunk{
  position:absolute;
  left:50%;
  top:52px;
  bottom:58px;
  width:28px;
  border-left:6px solid color-mix(in srgb,var(--sketch-ink) 82%,transparent);
  border-right:3px dashed color-mix(in srgb,var(--sketch-ink) 44%,transparent);
  border-radius:48% 52% 50% 50%;
  background:transparent;
  box-shadow:3px 0 0 color-mix(in srgb,var(--sketch-accent) 18%,transparent);
  transform:translateX(-50%) rotate(-1.3deg);
}
.date-timeline-trunk:before,
.date-timeline-trunk:after{
  content:"";
  position:absolute;
  left:50%;
  width:112px;
  height:0;
  border-top:3px dashed color-mix(in srgb,var(--sketch-ink) 46%,transparent);
  background:transparent;
  transform-origin:left center;
}
.date-timeline-trunk:before{
  top:31%;
  transform:rotate(-24deg);
}
.date-timeline-trunk:after{
  top:67%;
  transform:rotate(24deg);
}
.date-timeline-boundary{
  position:absolute;
  color:color-mix(in srgb,var(--sketch-ink) 84%,#111);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.date-timeline-boundary.start{
  top:18px;
  left:50%;
  transform:translateX(calc(-100% - 22px));
}
.date-timeline-boundary.end{
  right:50%;
  bottom:18px;
  transform:translateX(calc(100% + 22px));
}
.date-timeline-node{
  position:absolute;
  top:var(--timeline-y);
  width:min(240px,32%);
  border:0;
  background:transparent;
  color:#cbd5e1;
  padding:0;
  clip-path:none!important;
  overflow:visible;
  transform:translateY(-50%);
  cursor:pointer;
}
.date-timeline-node.active{
  z-index:4;
}
.date-timeline-node.left{
  left:calc(50% - min(280px,38%));
  text-align:right;
}
.date-timeline-node.right{
  right:calc(50% - min(280px,38%));
  text-align:left;
}
.date-timeline-branch{
  position:absolute;
  top:50%;
  width:clamp(44px,8vw,94px);
  height:0;
  border-top:4px solid color-mix(in srgb,var(--node-color) 58%,var(--sketch-ink));
  border-radius:50%;
  background:transparent;
  transform:translateY(-50%);
}
.date-timeline-node.left .date-timeline-branch{
  left:100%;
  transform:translateY(-50%) rotate(3.5deg);
}
.date-timeline-node.right .date-timeline-branch{
  right:100%;
  transform:translateY(-50%) rotate(-3.5deg);
}
.date-timeline-orb{
  position:relative;
  display:grid;
  align-content:center;
  justify-items:center;
  width:100%;
  aspect-ratio:1/1;
  max-width:230px;
  margin-inline:auto;
  border:4px solid color-mix(in srgb,var(--node-color) 56%,var(--sketch-ink));
  border-radius:49% 51% 46% 54%/52% 47% 53% 48%;
  background:
    radial-gradient(circle at 36% 28%,rgba(255,255,255,.18),transparent 24%),
    color-mix(in srgb,var(--node-color) 42%,rgba(255,255,255,.18));
  color:#101414;
  padding:28px;
  box-shadow:7px 8px 0 rgba(0,0,0,.12),inset 0 0 0 2px rgba(255,255,255,.3);
  transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;
}
.date-timeline-orb:before,
.date-timeline-orb:after{
  content:"";
  position:absolute;
  inset:8px;
  border:2px solid color-mix(in srgb,var(--sketch-ink) 52%,transparent);
  border-radius:52% 48% 50% 50%/47% 53% 49% 51%;
  transform:rotate(-4deg);
  pointer-events:none;
}
.date-timeline-orb:after{
  inset:15px;
  border-style:dashed;
  opacity:.36;
  transform:rotate(5deg);
}
.date-timeline-node.left .date-timeline-orb{
  transform:rotate(-1.4deg);
}
.date-timeline-node.right .date-timeline-orb{
  transform:rotate(1.2deg);
}
.date-timeline-orb em{
  position:relative;
  z-index:1;
  display:block;
  color:inherit;
  font-style:normal;
  font-size:clamp(1.45rem,3vw,2.35rem);
  font-weight:1000;
  letter-spacing:.02em;
}
.date-timeline-orb em:after{
  content:"";
  display:block;
  width:70%;
  max-width:120px;
  margin:10px auto 9px;
  border-top:3px dotted color-mix(in srgb,var(--sketch-ink) 52%,transparent);
}
.date-timeline-orb strong{
  position:relative;
  z-index:1;
  display:block;
  color:inherit;
  font-size:clamp(.78rem,1.4vw,1.05rem);
  line-height:1.14;
  text-transform:uppercase;
}
.date-timeline-orb small{
  position:relative;
  z-index:1;
  display:block;
  max-width:170px;
  margin-top:8px;
  color:rgba(16,20,20,.72);
  font-size:.72rem;
  line-height:1.32;
}
.date-timeline-icon{
  position:absolute;
  display:grid;
  place-items:center;
  right:-8px;
  bottom:8%;
  width:62px;
  height:62px;
  border:3px solid color-mix(in srgb,var(--sketch-ink) 58%,transparent);
  border-radius:46% 54% 51% 49%/52% 46% 54% 48%;
  background:color-mix(in srgb,var(--node-color) 24%,rgba(255,255,255,.5));
  box-shadow:4px 5px 0 rgba(0,0,0,.14);
  transform:rotate(4deg);
}
.date-timeline-node.left .date-timeline-icon{
  right:auto;
  left:-8px;
  transform:rotate(-5deg);
}
.date-timeline-icon svg{
  width:32px;
  height:32px;
  fill:color-mix(in srgb,var(--node-color) 72%,#000);
}
.date-timeline-node:hover .date-timeline-orb,
.date-timeline-node:focus-visible .date-timeline-orb{
  filter:saturate(1.08);
  box-shadow:8px 10px 0 rgba(0,0,0,.16),0 0 0 6px color-mix(in srgb,var(--node-color) 22%,transparent),inset 0 0 0 2px rgba(255,255,255,.38);
}
.date-timeline-node.left:hover .date-timeline-orb,
.date-timeline-node.left:focus-visible .date-timeline-orb{
  transform:rotate(-1.4deg) scale(1.04);
}
.date-timeline-node.right:hover .date-timeline-orb,
.date-timeline-node.right:focus-visible .date-timeline-orb{
  transform:rotate(1.2deg) scale(1.04);
}
.date-timeline-detail-copy{
  position:absolute;
  top:50%;
  display:block;
  width:min(300px,34vw);
  border:2px solid color-mix(in srgb,var(--sketch-ink) 70%,transparent);
  border-radius:8px 13px 7px 11px/12px 7px 13px 8px;
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 14%,rgba(255,255,255,.22)),rgba(255,255,255,.16)),
    var(--sketch-paper);
  box-shadow:6px 7px 0 rgba(0,0,0,.08);
  color:#252a2b;
  padding:12px 14px;
  text-align:left;
  transform:translateY(-50%);
  pointer-events:auto;
  cursor:pointer;
  transform-origin:center;
  transition:transform .22s ease,box-shadow .22s ease,background .22s ease,border-color .22s ease;
}
.date-timeline-detail-copy:before{
  content:"";
  position:absolute;
  top:50%;
  width:48px;
  border-top:4px solid color-mix(in srgb,var(--node-color) 58%,var(--sketch-accent));
  border-radius:50%;
  opacity:.72;
}
.date-timeline-node.left .date-timeline-detail-copy{
  left:calc(100% + clamp(58px,8vw,118px));
  transform:translateY(-50%) rotate(1.1deg);
}
.date-timeline-node.left.active .date-timeline-detail-copy{
  z-index:5;
  border-color:color-mix(in srgb,var(--node-color) 76%,var(--sketch-ink));
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 22%,rgba(255,255,255,.34)),rgba(255,255,255,.24)),
    var(--sketch-paper);
  box-shadow:16px 18px 0 rgba(0,0,0,.16),0 0 0 8px color-mix(in srgb,var(--node-color) 18%,transparent),0 24px 54px rgba(0,0,0,.18);
  transform:translateY(-50%) rotate(1.1deg) scale(1.5);
}
.date-timeline-node.left .date-timeline-detail-copy:before{
  left:-52px;
  transform:rotate(-7deg);
}
.date-timeline-node.right .date-timeline-detail-copy{
  right:calc(100% + clamp(58px,8vw,118px));
  text-align:right;
  transform:translateY(-50%) rotate(-1.1deg);
}
.date-timeline-node.right.active .date-timeline-detail-copy{
  z-index:5;
  border-color:color-mix(in srgb,var(--node-color) 76%,var(--sketch-ink));
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--node-color) 22%,rgba(255,255,255,.34)),rgba(255,255,255,.24)),
    var(--sketch-paper);
  box-shadow:16px 18px 0 rgba(0,0,0,.16),0 0 0 8px color-mix(in srgb,var(--node-color) 18%,transparent),0 24px 54px rgba(0,0,0,.18);
  transform:translateY(-50%) rotate(-1.1deg) scale(1.5);
}
.date-timeline-node.right .date-timeline-detail-copy:before{
  right:-52px;
  transform:rotate(7deg);
}
.date-timeline-detail-meta{
  display:block;
  color:color-mix(in srgb,var(--node-color) 70%,#111);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.02em;
  text-transform:uppercase;
}
.date-timeline-detail-body{
  display:block;
  margin-top:8px;
  color:inherit;
  font-size:.84rem;
  font-weight:800;
  line-height:1.45;
}
.date-timeline-detail-list{
  display:grid;
  gap:5px;
  margin-top:9px;
}
.date-timeline-detail-list span{
  display:block;
  color:inherit;
  font-size:.76rem;
  font-weight:800;
  line-height:1.35;
  opacity:.82;
}
.date-timeline-detail-list span:before{
  content:"~";
  margin-right:6px;
  color:color-mix(in srgb,var(--node-color) 70%,#111);
  font-weight:1000;
}
.site.winter-theme .tab-content .project-card p,
.site.winter-theme .tab-content .project-card ul,
.site.winter-theme .tab-content .project-card li,
.site.winter-theme .tab-content .experience-card p,
.site.winter-theme .tab-content .experience-card ul,
.site.winter-theme .tab-content .experience-card li,
.site.winter-theme .tab-content .section-heading p:not(.eyebrow),
.site.winter-theme .tab-content .stack-grid article,
.site.winter-theme .tab-content .stack-grid h3,
.site.winter-theme .tab-pane-header span,
.site.winter-theme .date-timeline-controls button,
.site.winter-theme .date-timeline-controls strong,
.site.winter-theme .date-timeline-boundary{
  color:#050505;
}
.site.winter-theme .date-timeline-controls div,
.site.winter-theme .date-timeline-rail{
  border-color:rgba(90,150,184,.28);
}
.site.winter-theme .date-timeline-controls button{
  border-color:rgba(90,150,184,.28);
  background:rgba(255,255,255,.58);
}
.site.fall-theme .date-timeline-system{
  --sketch-accent:#d89a45;
}
.site.spring-theme .date-timeline-system{
  --sketch-accent:#2fb986;
}
.site.winter-theme .date-timeline-system{
  --sketch-accent:#5a96b8;
  --sketch-paper:rgba(244,250,252,.2);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-node{
  --node-color:#f2fbf8!important;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-orb{
  color:#050505;
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-orb small{
  color:rgba(5,5,5,.72);
}
.site:not(.fall-theme):not(.spring-theme):not(.winter-theme) .date-timeline-icon svg{
  fill:#2b2b2b;
}
.site.fall-theme .date-timeline-node{
  --node-color:#d89a45!important;
}
.site.spring-theme .date-timeline-node{
  --node-color:#2fb986!important;
}
.site.winter-theme .date-timeline-node{
  --node-color:#5a96b8!important;
}
.site.winter-theme .date-timeline-trunk,
.site.winter-theme .date-timeline-branch{
  background:rgba(90,150,184,.34);
}
.site.winter-theme .date-timeline-orb{
  color:#050505;
}
.site.winter-theme .date-timeline-orb small{
  color:rgba(5,5,5,.72);
}
.site.winter-theme .date-timeline-detail-copy,
.site.winter-theme .date-timeline-detail-meta,
.site.winter-theme .date-timeline-detail-list span:before{
  color:#050505;
}
.site.winter-theme .tab-pane{
  border-color:rgba(90,150,184,.28);
  background:linear-gradient(180deg,rgba(255,255,255,.72),rgba(232,247,255,.48));
}
.site.winter-theme .profile-tab-list{
  border-color:rgba(90,150,184,.28);
  background:linear-gradient(180deg,rgba(255,255,255,.82),rgba(232,247,255,.58));
}
.site.winter-theme .profile-tab-list button.active{
  background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(232,247,255,.72));
  box-shadow:inset 0 3px 0 #5a96b8;
}
.site.winter-theme .profile-tab-list button.active:after{
  background:rgba(238,248,255,.96);
}
.site.winter-theme .tab-pane-header h2,
.site.winter-theme .tab-pane-header span{
  color:#050505;
}
@media (max-width:760px){
  .tab-pane{
    padding:22px;
    gap:28px;
  }
  .tab-pane-header{
    grid-template-columns:1fr;
    gap:18px;
    padding-bottom:20px;
  }
  .tab-pane-body{
    gap:36px;
  }
  .tabbed-subsection{
    gap:24px;
  }
  .tab-content .project-grid,
  .tab-content .experience-grid,
  .tab-content .stack-grid{
    gap:22px;
  }
  .tab-content .project-card,
  .tab-content .experience-card,
  .tab-content .stack-grid article{
    padding:24px;
  }
  .date-timeline-rail{
    min-height:620px;
  }
  .date-timeline-node{
    width:38%;
  }
  .date-timeline-detail-copy{
    width:36vw;
    padding:10px;
    font-size:.72rem;
  }
  .date-timeline-node.left .date-timeline-detail-copy{
    left:calc(100% + 18px);
  }
  .date-timeline-node.right .date-timeline-detail-copy{
    right:calc(100% + 18px);
  }
  .date-timeline-detail-body{
    font-size:.72rem;
    line-height:1.3;
  }
  .date-timeline-detail-list{
    display:none;
  }
  .date-timeline-orb{
    padding:20px;
  }
  .date-timeline-orb em{
    font-size:1.45rem;
  }
  .date-timeline-orb strong{
    font-size:.68rem;
  }
  .date-timeline-icon{
    width:48px;
    height:48px;
  }
  .date-timeline-icon svg{
    width:25px;
    height:25px;
  }
}
.personal-subtabs{
  display:grid;
  grid-template-columns:minmax(180px,.28fr) minmax(0,1fr);
  gap:28px;
  align-items:stretch;
}
.personal-subtab-list{
  display:grid;
  align-content:start;
  gap:12px;
}
.personal-subtab-list button{
  position:relative;
  display:grid;
  gap:7px;
  border:1px solid rgba(255,255,255,.16);
  background:
    linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.015)),
    rgba(0,0,0,.2);
  color:var(--text);
  padding:16px 16px 15px;
  text-align:left;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
  transition:background .2s ease,border-color .2s ease,transform .2s ease;
}
.personal-subtab-list button:hover{
  border-color:rgba(255,255,255,.32);
  background:rgba(255,255,255,.09);
  transform:translateX(4px);
}
.personal-subtab-list button.active{
  border-color:color-mix(in srgb,var(--gold) 62%,rgba(255,255,255,.2));
  background:
    linear-gradient(135deg,color-mix(in srgb,var(--gold) 18%,transparent),rgba(255,255,255,.035)),
    rgba(0,0,0,.26);
  box-shadow:inset 4px 0 0 var(--gold),0 12px 34px rgba(0,0,0,.18);
}
.personal-subtab-list button span{
  color:var(--gold);
  font-size:.68rem;
  letter-spacing:.1em;
}
.personal-subtab-list button strong{
  font-size:1rem;
  line-height:1.1;
}
.personal-subtab-panel{
  display:grid;
  gap:24px;
  min-height:320px;
  padding:34px;
  clip-path:none!important;
}
.personal-subtab-heading{
  display:grid;
  gap:10px;
  max-width:760px;
}
.personal-subtab-heading p{
  margin:0;
  color:var(--gold);
  font-size:.74rem;
  letter-spacing:.12em;
  text-transform:uppercase;
}
.personal-subtab-heading h3{
  margin:0;
  color:#f2fbf8;
  font-size:clamp(1.85rem,3.2vw,3.3rem);
  line-height:.96;
  text-transform:uppercase;
}
.personal-subtab-heading span,
.personal-subtab-body{
  color:#d2d2d2;
  line-height:1.72;
}
.personal-subtab-body{
  max-width:820px;
  margin:0;
  font-size:1.02rem;
}
.personal-media-experience{
  display:grid;
  grid-template-columns:minmax(0,1.1fr) minmax(260px,.62fr);
  gap:22px;
  align-items:start;
}
.personal-featured-media{
  position:sticky;
  top:106px;
  display:grid;
  margin:0;
  border:1px solid rgba(255,255,255,.14);
  background:
    linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),
    rgba(0,0,0,.18);
  overflow:hidden;
  clip-path:polygon(0 0,calc(100% - 26px) 0,100% 26px,100% 100%,0 100%);
  box-shadow:0 26px 70px rgba(0,0,0,.18);
}
.personal-featured-media:before{
  content:"";
  position:absolute;
  inset:14px;
  border:1px solid rgba(255,255,255,.12);
  pointer-events:none;
  z-index:2;
}
.personal-featured-media > img,
.personal-featured-media > video,
.personal-featured-media > .personal-media-placeholder{
  width:100%;
  height:clamp(320px,44vw,540px);
}
.personal-featured-media img,
.personal-featured-media video,
.personal-media-thumb img,
.personal-media-thumb video{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
}
.personal-featured-media figcaption{
  display:grid;
  gap:9px;
  padding:22px 24px 24px;
  color:#d8e4f5;
  line-height:1.55;
}
.personal-featured-media figcaption span,
.personal-media-copy em,
.personal-media-placeholder span{
  color:var(--gold);
  font-size:.72rem;
  font-style:normal;
  font-weight:1000;
  letter-spacing:.12em;
  text-transform:uppercase;
}
.personal-featured-media figcaption strong{
  color:#f8fafc;
  font-size:clamp(1.35rem,2.4vw,2.25rem);
  line-height:1.04;
  text-transform:uppercase;
}
.personal-featured-media figcaption p{
  margin:0;
}
.personal-media-feed{
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:12px;
}
::view-transition-group(*){
  animation-duration:.58s;
  animation-timing-function:cubic-bezier(.2,.78,.16,1);
}
::view-transition-old(*),
::view-transition-new(*){
  animation-duration:.58s;
  animation-timing-function:cubic-bezier(.2,.78,.16,1);
  mix-blend-mode:normal;
}
.personal-swap-clone{
  z-index:9999!important;
  box-sizing:border-box;
  filter:drop-shadow(0 24px 46px rgba(0,0,0,.34));
  will-change:transform,opacity;
}
.personal-media-card{
  position:relative;
  display:grid;
  grid-template-columns:auto 92px minmax(0,1fr);
  gap:14px;
  align-items:stretch;
  width:100%;
  border:1px solid rgba(255,255,255,.12);
  background:
    linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.012)),
    rgba(0,0,0,.16);
  color:var(--text);
  padding:10px;
  text-align:left;
  overflow:hidden;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
  transition:translate .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease;
  will-change:translate;
}
.personal-media-card:hover{
  border-color:color-mix(in srgb,var(--gold) 58%,rgba(255,255,255,.18));
  background:
    linear-gradient(135deg,color-mix(in srgb,var(--gold) 14%,transparent),rgba(255,255,255,.03)),
    rgba(0,0,0,.24);
  translate:-5px 0;
  box-shadow:0 18px 42px rgba(0,0,0,.16);
}
.personal-media-index{
  display:grid;
  place-items:center;
  width:34px;
  color:var(--gold);
  font-weight:1000;
  font-size:.72rem;
  letter-spacing:.08em;
}
.personal-media-thumb{
  position:relative;
  display:block;
  min-height:92px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(0,0,0,.2);
  overflow:hidden;
}
.personal-media-copy{
  display:grid;
  align-content:center;
  gap:7px;
  min-width:0;
}
.personal-media-copy strong{
  color:#f8fafc;
  line-height:1.15;
  text-transform:uppercase;
}
.personal-media-copy span{
  color:#d8e4f5;
  line-height:1.45;
  font-size:.9rem;
}
.personal-media-placeholder{
  display:grid;
  align-content:center;
  justify-items:start;
  gap:12px;
  padding:28px;
  color:#f8fafc;
  background:
    linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.015)),
    radial-gradient(circle at 22% 18%,color-mix(in srgb,var(--gold) 18%,transparent),transparent 36%),
    repeating-linear-gradient(-12deg,rgba(255,255,255,.055) 0 1px,transparent 1px 18px),
    rgba(0,0,0,.24);
}
.personal-media-placeholder strong{
  max-width:560px;
  font-size:clamp(1.35rem,2.6vw,2.25rem);
  line-height:1.04;
  text-transform:uppercase;
}
.personal-media-placeholder.compact{
  width:100%;
  height:100%;
  min-height:92px;
  justify-items:center;
  text-align:center;
  padding:12px;
}
.personal-media-placeholder.compact span{
  font-size:.58rem;
}
.personal-media-placeholder.compact strong{
  font-size:.8rem;
}
.profile-tabs{
  position:relative;
  z-index:3;
  width:100%;
  max-width:none;
  margin:0;
  padding:0;
}
.profile-tab-list{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:0;
  border:1px solid rgba(255,255,255,.18);
  border-bottom:0;
  background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.18));
  box-shadow:0 18px 70px rgba(0,0,0,.22);
}
.profile-tab-list button{
  position:relative;
  min-height:74px;
  border:0;
  border-right:1px solid rgba(255,255,255,.12);
  border-bottom:1px solid rgba(255,255,255,.13);
  background:rgba(0,0,0,.18);
  color:var(--text);
  padding:14px 16px 13px;
  text-align:left;
  clip-path:none;
  transition:background .2s ease,color .2s ease,box-shadow .2s ease;
}
.profile-tab-list button:last-child{
  border-right:0;
}
.profile-tab-list button:hover{
  background:rgba(255,255,255,.12);
}
.profile-tab-list button.active{
  border-bottom-color:transparent;
  background:
    linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02)),
    rgba(0,0,0,.28);
  box-shadow:inset 0 3px 0 var(--gold);
}
.profile-tab-list button.active:after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  bottom:-1px;
  height:1px;
  background:rgba(8,14,20,.98);
}
.profile-tab-list button span{
  display:block;
  color:var(--gold);
  font-size:.66rem;
  letter-spacing:.07em;
  text-transform:uppercase;
}
.profile-tab-list button strong{
  display:block;
  margin-top:8px;
  font-size:.96rem;
  line-height:1.1;
}
.profile-tab-panel{
  position:relative;
  z-index:2;
  display:grid;
  grid-template-columns:minmax(190px,.34fr) minmax(0,1fr);
  gap:16px;
  margin-top:14px;
  padding-top:16px;
  border-top:1px solid rgba(255,255,255,.13);
}
.profile-tab-intro p,
.profile-tab-section h4,
.profile-tab-item p{
  margin:0;
  color:var(--gold);
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.profile-tab-intro h3{
  margin:9px 0 10px;
  font-size:clamp(1.25rem,2vw,1.8rem);
  line-height:1.06;
  letter-spacing:.01em;
  text-transform:uppercase;
}
.profile-tab-intro span,
.profile-tab-item span,
.profile-tab-item li{
  color:#d2d2d2;
  line-height:1.45;
  font-size:.92rem;
}
.profile-tab-sections{
  display:grid;
  gap:14px;
}
.profile-tab-section h4{
  margin-bottom:10px;
}
.profile-tab-items{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
}
.profile-tab-item{
  display:grid;
  gap:6px;
  padding:0 0 10px 12px;
  border-left:1px solid rgba(255,255,255,.22);
  border-bottom:1px solid rgba(255,255,255,.1);
}
.profile-tab-item h5{
  margin:0;
  color:#f2fbf8;
  font-size:1rem;
  line-height:1.16;
}
.profile-tab-item strong{
  color:var(--cyan2);
  font-size:.84rem;
}
.profile-tab-item ul{
  display:grid;
  gap:6px;
  margin:3px 0 0;
  padding:0;
  list-style:none;
}
.profile-tab-item li:before{
  content:"/";
  color:var(--gold);
  margin-right:7px;
}
.site.fall-theme .profile-tab-list,
.site.spring-theme .profile-tab-list{
  border-color:var(--line);
  background:rgba(255,255,255,.06);
}
.site.fall-theme .profile-tab-list button,
.site.spring-theme .profile-tab-list button{
  border-right-color:var(--line);
  border-bottom-color:var(--line);
  background:rgba(255,255,255,.04);
}
.site.fall-theme .profile-tab-list button.active,
.site.spring-theme .profile-tab-list button.active{
  border-bottom-color:transparent;
  background:rgba(255,255,255,.12);
}
.site.fall-theme .profile-tab-list button.active:after,
.site.spring-theme .profile-tab-list button.active:after{
  background:rgba(8,14,20,.98);
}
.site.winter-theme .profile-tab-list button,
.site.winter-theme .personal-subtab-list button,
.site.winter-theme .personal-subtab-heading h3,
.site.winter-theme .personal-subtab-heading span,
.site.winter-theme .personal-subtab-body,
.site.winter-theme .personal-media-placeholder,
.site.winter-theme .personal-featured-media figcaption,
.site.winter-theme .personal-featured-media figcaption strong,
.site.winter-theme .personal-media-copy,
.site.winter-theme .personal-media-copy strong,
.site.winter-theme .personal-media-copy span,
.site.winter-theme .profile-tab-intro span,
.site.winter-theme .profile-tab-item span,
.site.winter-theme .profile-tab-item li,
.site.winter-theme .profile-tab-item h5,
.site.winter-theme .profile-tab-item strong{
  color:#050505;
}
@media (max-width:1180px){
  .profile-tabs{
    max-width:none;
  }
  .profile-tab-list{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .profile-tab-panel{
    grid-template-columns:1fr;
  }
  .personal-media-experience{
    grid-template-columns:1fr;
  }
  .personal-featured-media{
    position:relative;
    top:auto;
  }
}
@media (max-width:760px){
  .profile-tabs{
    margin:0;
    padding:0;
  }
  .profile-tab-list{
    grid-template-columns:1fr;
  }
  .profile-tab-items{
    grid-template-columns:1fr;
  }
  .personal-subtabs{
    grid-template-columns:1fr;
  }
  .personal-subtab-list{
    grid-template-columns:1fr;
  }
  .personal-subtab-panel{
    padding:24px;
  }
  .personal-featured-media > img,
  .personal-featured-media > video,
  .personal-featured-media > .personal-media-placeholder{
    height:clamp(260px,72vw,360px);
  }
  .personal-featured-media figcaption{
    padding:18px;
  }
  .personal-media-card{
    grid-template-columns:auto 74px minmax(0,1fr);
    gap:10px;
  }
  .personal-media-thumb,
  .personal-media-placeholder.compact{
    min-height:74px;
  }
  .personal-media-copy span{
    display:none;
  }
  .profile-tab-list button{
    min-height:62px;
  }
}
`;$c(document.getElementById("root")).render(d.jsx(td.StrictMode,{children:d.jsx(Kf,{})}));
