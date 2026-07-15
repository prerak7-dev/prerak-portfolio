import{W as hu,S as Ms,a as gu,P as vu,b as xu,N as yu,C as wu,c as bu,T as ku,B as ju,d as bn,M as Su,e as hl,L as zu,f as Eu,D as Cu}from"./three-lNa-yRei.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();function Pu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ls={exports:{}},No={},Is={exports:{}},A={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hn=Symbol.for("react.element"),Nu=Symbol.for("react.portal"),Tu=Symbol.for("react.fragment"),Ru=Symbol.for("react.strict_mode"),_u=Symbol.for("react.profiler"),Mu=Symbol.for("react.provider"),Lu=Symbol.for("react.context"),Iu=Symbol.for("react.forward_ref"),Au=Symbol.for("react.suspense"),Du=Symbol.for("react.memo"),Ou=Symbol.for("react.lazy"),gl=Symbol.iterator;function Fu(e){return e===null||typeof e!="object"?null:(e=gl&&e[gl]||e["@@iterator"],typeof e=="function"?e:null)}var As={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ds=Object.assign,Os={};function Sr(e,t,r){this.props=e,this.context=t,this.refs=Os,this.updater=r||As}Sr.prototype.isReactComponent={};Sr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Sr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Fs(){}Fs.prototype=Sr.prototype;function ma(e,t,r){this.props=e,this.context=t,this.refs=Os,this.updater=r||As}var ha=ma.prototype=new Fs;ha.constructor=ma;Ds(ha,Sr.prototype);ha.isPureReactComponent=!0;var vl=Array.isArray,$s=Object.prototype.hasOwnProperty,ga={current:null},Us={key:!0,ref:!0,__self:!0,__source:!0};function Bs(e,t,r){var n,o={},i=null,a=null;if(t!=null)for(n in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)$s.call(t,n)&&!Us.hasOwnProperty(n)&&(o[n]=t[n]);var l=arguments.length-2;if(l===1)o.children=r;else if(1<l){for(var s=Array(l),p=0;p<l;p++)s[p]=arguments[p+2];o.children=s}if(e&&e.defaultProps)for(n in l=e.defaultProps,l)o[n]===void 0&&(o[n]=l[n]);return{$$typeof:hn,type:e,key:i,ref:a,props:o,_owner:ga.current}}function $u(e,t){return{$$typeof:hn,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function va(e){return typeof e=="object"&&e!==null&&e.$$typeof===hn}function Uu(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var xl=/\/+/g;function Yo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Uu(""+e.key):t.toString(36)}function Hn(e,t,r,n,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case hn:case Nu:a=!0}}if(a)return a=e,o=o(a),e=n===""?"."+Yo(a,0):n,vl(o)?(r="",e!=null&&(r=e.replace(xl,"$&/")+"/"),Hn(o,t,r,"",function(p){return p})):o!=null&&(va(o)&&(o=$u(o,r+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(xl,"$&/")+"/")+e)),t.push(o)),1;if(a=0,n=n===""?".":n+":",vl(e))for(var l=0;l<e.length;l++){i=e[l];var s=n+Yo(i,l);a+=Hn(i,t,r,s,o)}else if(s=Fu(e),typeof s=="function")for(e=s.call(e),l=0;!(i=e.next()).done;)i=i.value,s=n+Yo(i,l++),a+=Hn(i,t,r,s,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function kn(e,t,r){if(e==null)return e;var n=[],o=0;return Hn(e,n,"","",function(i){return t.call(r,i,o++)}),n}function Bu(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ve={current:null},Wn={transition:null},Hu={ReactCurrentDispatcher:ve,ReactCurrentBatchConfig:Wn,ReactCurrentOwner:ga};function Hs(){throw Error("act(...) is not supported in production builds of React.")}A.Children={map:kn,forEach:function(e,t,r){kn(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return kn(e,function(){t++}),t},toArray:function(e){return kn(e,function(t){return t})||[]},only:function(e){if(!va(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};A.Component=Sr;A.Fragment=Tu;A.Profiler=_u;A.PureComponent=ma;A.StrictMode=Ru;A.Suspense=Au;A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hu;A.act=Hs;A.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=Ds({},e.props),o=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=ga.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)$s.call(t,s)&&!Us.hasOwnProperty(s)&&(n[s]=t[s]===void 0&&l!==void 0?l[s]:t[s])}var s=arguments.length-2;if(s===1)n.children=r;else if(1<s){l=Array(s);for(var p=0;p<s;p++)l[p]=arguments[p+2];n.children=l}return{$$typeof:hn,type:e.type,key:o,ref:i,props:n,_owner:a}};A.createContext=function(e){return e={$$typeof:Lu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Mu,_context:e},e.Consumer=e};A.createElement=Bs;A.createFactory=function(e){var t=Bs.bind(null,e);return t.type=e,t};A.createRef=function(){return{current:null}};A.forwardRef=function(e){return{$$typeof:Iu,render:e}};A.isValidElement=va;A.lazy=function(e){return{$$typeof:Ou,_payload:{_status:-1,_result:e},_init:Bu}};A.memo=function(e,t){return{$$typeof:Du,type:e,compare:t===void 0?null:t}};A.startTransition=function(e){var t=Wn.transition;Wn.transition={};try{e()}finally{Wn.transition=t}};A.unstable_act=Hs;A.useCallback=function(e,t){return ve.current.useCallback(e,t)};A.useContext=function(e){return ve.current.useContext(e)};A.useDebugValue=function(){};A.useDeferredValue=function(e){return ve.current.useDeferredValue(e)};A.useEffect=function(e,t){return ve.current.useEffect(e,t)};A.useId=function(){return ve.current.useId()};A.useImperativeHandle=function(e,t,r){return ve.current.useImperativeHandle(e,t,r)};A.useInsertionEffect=function(e,t){return ve.current.useInsertionEffect(e,t)};A.useLayoutEffect=function(e,t){return ve.current.useLayoutEffect(e,t)};A.useMemo=function(e,t){return ve.current.useMemo(e,t)};A.useReducer=function(e,t,r){return ve.current.useReducer(e,t,r)};A.useRef=function(e){return ve.current.useRef(e)};A.useState=function(e){return ve.current.useState(e)};A.useSyncExternalStore=function(e,t,r){return ve.current.useSyncExternalStore(e,t,r)};A.useTransition=function(){return ve.current.useTransition()};A.version="18.3.1";Is.exports=A;var k=Is.exports;const Wu=Pu(k);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vu=k,Yu=Symbol.for("react.element"),Xu=Symbol.for("react.fragment"),Qu=Object.prototype.hasOwnProperty,Ku=Vu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Gu={key:!0,ref:!0,__self:!0,__source:!0};function Ws(e,t,r){var n,o={},i=null,a=null;r!==void 0&&(i=""+r),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(n in t)Qu.call(t,n)&&!Gu.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)o[n]===void 0&&(o[n]=t[n]);return{$$typeof:Yu,type:e,key:i,ref:a,props:o,_owner:Ku.current}}No.Fragment=Xu;No.jsx=Ws;No.jsxs=Ws;Ls.exports=No;var c=Ls.exports,Vs={exports:{}},_e={},Ys={exports:{}},Xs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(P,T){var R=P.length;P.push(T);e:for(;0<R;){var F=R-1>>>1,J=P[F];if(0<o(J,T))P[F]=T,P[R]=J,R=F;else break e}}function r(P){return P.length===0?null:P[0]}function n(P){if(P.length===0)return null;var T=P[0],R=P.pop();if(R!==T){P[0]=R;e:for(var F=0,J=P.length,Qt=J>>>1;F<Qt;){var oe=2*(F+1)-1,ie=P[oe],Le=oe+1,Tt=P[Le];if(0>o(ie,R))Le<J&&0>o(Tt,ie)?(P[F]=Tt,P[Le]=R,F=Le):(P[F]=ie,P[oe]=R,F=oe);else if(Le<J&&0>o(Tt,R))P[F]=Tt,P[Le]=R,F=Le;else break e}}return T}function o(P,T){var R=P.sortIndex-T.sortIndex;return R!==0?R:P.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var s=[],p=[],h=1,g=null,m=3,x=!1,v=!1,w=!1,E=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(P){for(var T=r(p);T!==null;){if(T.callback===null)n(p);else if(T.startTime<=P)n(p),T.sortIndex=T.expirationTime,t(s,T);else break;T=r(p)}}function y(P){if(w=!1,f(P),!v)if(r(s)!==null)v=!0,Ee(S);else{var T=r(p);T!==null&&me(y,T.startTime-P)}}function S(P,T){v=!1,w&&(w=!1,d(z),z=-1),x=!0;var R=m;try{for(f(T),g=r(s);g!==null&&(!(g.expirationTime>T)||P&&!I());){var F=g.callback;if(typeof F=="function"){g.callback=null,m=g.priorityLevel;var J=F(g.expirationTime<=T);T=e.unstable_now(),typeof J=="function"?g.callback=J:g===r(s)&&n(s),f(T)}else n(s);g=r(s)}if(g!==null)var Qt=!0;else{var oe=r(p);oe!==null&&me(y,oe.startTime-T),Qt=!1}return Qt}finally{g=null,m=R,x=!1}}var b=!1,C=null,z=-1,M=5,_=-1;function I(){return!(e.unstable_now()-_<M)}function L(){if(C!==null){var P=e.unstable_now();_=P;var T=!0;try{T=C(!0,P)}finally{T?D():(b=!1,C=null)}}else b=!1}var D;if(typeof u=="function")D=function(){u(L)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,ze=Y.port2;Y.port1.onmessage=L,D=function(){ze.postMessage(null)}}else D=function(){E(L,0)};function Ee(P){C=P,b||(b=!0,D())}function me(P,T){z=E(function(){P(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(P){P.callback=null},e.unstable_continueExecution=function(){v||x||(v=!0,Ee(S))},e.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<P?Math.floor(1e3/P):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return r(s)},e.unstable_next=function(P){switch(m){case 1:case 2:case 3:var T=3;break;default:T=m}var R=m;m=T;try{return P()}finally{m=R}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(P,T){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var R=m;m=P;try{return T()}finally{m=R}},e.unstable_scheduleCallback=function(P,T,R){var F=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?F+R:F):R=F,P){case 1:var J=-1;break;case 2:J=250;break;case 5:J=1073741823;break;case 4:J=1e4;break;default:J=5e3}return J=R+J,P={id:h++,callback:T,priorityLevel:P,startTime:R,expirationTime:J,sortIndex:-1},R>F?(P.sortIndex=R,t(p,P),r(s)===null&&P===r(p)&&(w?(d(z),z=-1):w=!0,me(y,R-F))):(P.sortIndex=J,t(s,P),v||x||(v=!0,Ee(S))),P},e.unstable_shouldYield=I,e.unstable_wrapCallback=function(P){var T=m;return function(){var R=m;m=T;try{return P.apply(this,arguments)}finally{m=R}}}})(Xs);Ys.exports=Xs;var qu=Ys.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ju=k,Re=qu;function j(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Qs=new Set,Gr={};function Wt(e,t){vr(e,t),vr(e+"Capture",t)}function vr(e,t){for(Gr[e]=t,e=0;e<t.length;e++)Qs.add(t[e])}var it=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xi=Object.prototype.hasOwnProperty,Zu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yl={},wl={};function ed(e){return xi.call(wl,e)?!0:xi.call(yl,e)?!1:Zu.test(e)?wl[e]=!0:(yl[e]=!0,!1)}function td(e,t,r,n){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return n?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function rd(e,t,r,n){if(t===null||typeof t>"u"||td(e,t,r,n))return!0;if(n)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,r,n,o,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=n,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var ce={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ce[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ce[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ce[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ce[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ce[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ce[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ce[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ce[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ce[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var xa=/[\-:]([a-z])/g;function ya(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(xa,ya);ce[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(xa,ya);ce[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(xa,ya);ce[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ce[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});ce.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ce[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function wa(e,t,r,n){var o=ce.hasOwnProperty(t)?ce[t]:null;(o!==null?o.type!==0:n||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(rd(t,r,o,n)&&(r=null),n||o===null?ed(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):o.mustUseProperty?e[o.propertyName]=r===null?o.type===3?!1:"":r:(t=o.attributeName,n=o.attributeNamespace,r===null?e.removeAttribute(t):(o=o.type,r=o===3||o===4&&r===!0?"":""+r,n?e.setAttributeNS(n,t,r):e.setAttribute(t,r))))}var ct=Ju.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,jn=Symbol.for("react.element"),Zt=Symbol.for("react.portal"),er=Symbol.for("react.fragment"),ba=Symbol.for("react.strict_mode"),yi=Symbol.for("react.profiler"),Ks=Symbol.for("react.provider"),Gs=Symbol.for("react.context"),ka=Symbol.for("react.forward_ref"),wi=Symbol.for("react.suspense"),bi=Symbol.for("react.suspense_list"),ja=Symbol.for("react.memo"),ut=Symbol.for("react.lazy"),qs=Symbol.for("react.offscreen"),bl=Symbol.iterator;function Cr(e){return e===null||typeof e!="object"?null:(e=bl&&e[bl]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,Xo;function Ar(e){if(Xo===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Xo=t&&t[1]||""}return`
`+Xo+e}var Qo=!1;function Ko(e,t){if(!e||Qo)return"";Qo=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var n=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){n=p}e.call(t.prototype)}else{try{throw Error()}catch(p){n=p}e()}}catch(p){if(p&&n&&typeof p.stack=="string"){for(var o=p.stack.split(`
`),i=n.stack.split(`
`),a=o.length-1,l=i.length-1;1<=a&&0<=l&&o[a]!==i[l];)l--;for(;1<=a&&0<=l;a--,l--)if(o[a]!==i[l]){if(a!==1||l!==1)do if(a--,l--,0>l||o[a]!==i[l]){var s=`
`+o[a].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=a&&0<=l);break}}}finally{Qo=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Ar(e):""}function nd(e){switch(e.tag){case 5:return Ar(e.type);case 16:return Ar("Lazy");case 13:return Ar("Suspense");case 19:return Ar("SuspenseList");case 0:case 2:case 15:return e=Ko(e.type,!1),e;case 11:return e=Ko(e.type.render,!1),e;case 1:return e=Ko(e.type,!0),e;default:return""}}function ki(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case er:return"Fragment";case Zt:return"Portal";case yi:return"Profiler";case ba:return"StrictMode";case wi:return"Suspense";case bi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Gs:return(e.displayName||"Context")+".Consumer";case Ks:return(e._context.displayName||"Context")+".Provider";case ka:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ja:return t=e.displayName||null,t!==null?t:ki(e.type)||"Memo";case ut:t=e._payload,e=e._init;try{return ki(e(t))}catch{}}return null}function od(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ki(t);case 8:return t===ba?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function zt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Js(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function id(e){var t=Js(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),n=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var o=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){n=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(a){n=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Sn(e){e._valueTracker||(e._valueTracker=id(e))}function Zs(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),n="";return e&&(n=Js(e)?e.checked?"true":"false":e.value),e=n,e!==r?(t.setValue(e),!0):!1}function no(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ji(e,t){var r=t.checked;return K({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function kl(e,t){var r=t.defaultValue==null?"":t.defaultValue,n=t.checked!=null?t.checked:t.defaultChecked;r=zt(t.value!=null?t.value:r),e._wrapperState={initialChecked:n,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ec(e,t){t=t.checked,t!=null&&wa(e,"checked",t,!1)}function Si(e,t){ec(e,t);var r=zt(t.value),n=t.type;if(r!=null)n==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(n==="submit"||n==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?zi(e,t.type,r):t.hasOwnProperty("defaultValue")&&zi(e,t.type,zt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function jl(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var n=t.type;if(!(n!=="submit"&&n!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function zi(e,t,r){(t!=="number"||no(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Dr=Array.isArray;function ur(e,t,r,n){if(e=e.options,t){t={};for(var o=0;o<r.length;o++)t["$"+r[o]]=!0;for(r=0;r<e.length;r++)o=t.hasOwnProperty("$"+e[r].value),e[r].selected!==o&&(e[r].selected=o),o&&n&&(e[r].defaultSelected=!0)}else{for(r=""+zt(r),t=null,o=0;o<e.length;o++){if(e[o].value===r){e[o].selected=!0,n&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Ei(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(j(91));return K({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Sl(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(j(92));if(Dr(r)){if(1<r.length)throw Error(j(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:zt(r)}}function tc(e,t){var r=zt(t.value),n=zt(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),n!=null&&(e.defaultValue=""+n)}function zl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function rc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ci(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?rc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var zn,nc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,n,o){MSApp.execUnsafeLocalFunction(function(){return e(t,r,n,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(zn=zn||document.createElement("div"),zn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=zn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var $r={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ad=["Webkit","ms","Moz","O"];Object.keys($r).forEach(function(e){ad.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$r[t]=$r[e]})});function oc(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||$r.hasOwnProperty(e)&&$r[e]?(""+t).trim():t+"px"}function ic(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var n=r.indexOf("--")===0,o=oc(r,t[r],n);r==="float"&&(r="cssFloat"),n?e.setProperty(r,o):e[r]=o}}var ld=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pi(e,t){if(t){if(ld[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(j(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(j(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(j(61))}if(t.style!=null&&typeof t.style!="object")throw Error(j(62))}}function Ni(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ti=null;function Sa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ri=null,dr=null,fr=null;function El(e){if(e=xn(e)){if(typeof Ri!="function")throw Error(j(280));var t=e.stateNode;t&&(t=Lo(t),Ri(e.stateNode,e.type,t))}}function ac(e){dr?fr?fr.push(e):fr=[e]:dr=e}function lc(){if(dr){var e=dr,t=fr;if(fr=dr=null,El(e),t)for(e=0;e<t.length;e++)El(t[e])}}function sc(e,t){return e(t)}function cc(){}var Go=!1;function pc(e,t,r){if(Go)return e(t,r);Go=!0;try{return sc(e,t,r)}finally{Go=!1,(dr!==null||fr!==null)&&(cc(),lc())}}function Jr(e,t){var r=e.stateNode;if(r===null)return null;var n=Lo(r);if(n===null)return null;r=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(j(231,t,typeof r));return r}var _i=!1;if(it)try{var Pr={};Object.defineProperty(Pr,"passive",{get:function(){_i=!0}}),window.addEventListener("test",Pr,Pr),window.removeEventListener("test",Pr,Pr)}catch{_i=!1}function sd(e,t,r,n,o,i,a,l,s){var p=Array.prototype.slice.call(arguments,3);try{t.apply(r,p)}catch(h){this.onError(h)}}var Ur=!1,oo=null,io=!1,Mi=null,cd={onError:function(e){Ur=!0,oo=e}};function pd(e,t,r,n,o,i,a,l,s){Ur=!1,oo=null,sd.apply(cd,arguments)}function ud(e,t,r,n,o,i,a,l,s){if(pd.apply(this,arguments),Ur){if(Ur){var p=oo;Ur=!1,oo=null}else throw Error(j(198));io||(io=!0,Mi=p)}}function Vt(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function uc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Cl(e){if(Vt(e)!==e)throw Error(j(188))}function dd(e){var t=e.alternate;if(!t){if(t=Vt(e),t===null)throw Error(j(188));return t!==e?null:e}for(var r=e,n=t;;){var o=r.return;if(o===null)break;var i=o.alternate;if(i===null){if(n=o.return,n!==null){r=n;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===r)return Cl(o),e;if(i===n)return Cl(o),t;i=i.sibling}throw Error(j(188))}if(r.return!==n.return)r=o,n=i;else{for(var a=!1,l=o.child;l;){if(l===r){a=!0,r=o,n=i;break}if(l===n){a=!0,n=o,r=i;break}l=l.sibling}if(!a){for(l=i.child;l;){if(l===r){a=!0,r=i,n=o;break}if(l===n){a=!0,n=i,r=o;break}l=l.sibling}if(!a)throw Error(j(189))}}if(r.alternate!==n)throw Error(j(190))}if(r.tag!==3)throw Error(j(188));return r.stateNode.current===r?e:t}function dc(e){return e=dd(e),e!==null?fc(e):null}function fc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=fc(e);if(t!==null)return t;e=e.sibling}return null}var mc=Re.unstable_scheduleCallback,Pl=Re.unstable_cancelCallback,fd=Re.unstable_shouldYield,md=Re.unstable_requestPaint,q=Re.unstable_now,hd=Re.unstable_getCurrentPriorityLevel,za=Re.unstable_ImmediatePriority,hc=Re.unstable_UserBlockingPriority,ao=Re.unstable_NormalPriority,gd=Re.unstable_LowPriority,gc=Re.unstable_IdlePriority,To=null,Je=null;function vd(e){if(Je&&typeof Je.onCommitFiberRoot=="function")try{Je.onCommitFiberRoot(To,e,void 0,(e.current.flags&128)===128)}catch{}}var Ye=Math.clz32?Math.clz32:wd,xd=Math.log,yd=Math.LN2;function wd(e){return e>>>=0,e===0?32:31-(xd(e)/yd|0)|0}var En=64,Cn=4194304;function Or(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function lo(e,t){var r=e.pendingLanes;if(r===0)return 0;var n=0,o=e.suspendedLanes,i=e.pingedLanes,a=r&268435455;if(a!==0){var l=a&~o;l!==0?n=Or(l):(i&=a,i!==0&&(n=Or(i)))}else a=r&~o,a!==0?n=Or(a):i!==0&&(n=Or(i));if(n===0)return 0;if(t!==0&&t!==n&&!(t&o)&&(o=n&-n,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(n&4&&(n|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=n;0<t;)r=31-Ye(t),o=1<<r,n|=e[r],t&=~o;return n}function bd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function kd(e,t){for(var r=e.suspendedLanes,n=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Ye(i),l=1<<a,s=o[a];s===-1?(!(l&r)||l&n)&&(o[a]=bd(l,t)):s<=t&&(e.expiredLanes|=l),i&=~l}}function Li(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function vc(){var e=En;return En<<=1,!(En&4194240)&&(En=64),e}function qo(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function gn(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ye(t),e[t]=r}function jd(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var n=e.eventTimes;for(e=e.expirationTimes;0<r;){var o=31-Ye(r),i=1<<o;t[o]=0,n[o]=-1,e[o]=-1,r&=~i}}function Ea(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var n=31-Ye(r),o=1<<n;o&t|e[n]&t&&(e[n]|=t),r&=~o}}var $=0;function xc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var yc,Ca,wc,bc,kc,Ii=!1,Pn=[],vt=null,xt=null,yt=null,Zr=new Map,en=new Map,ft=[],Sd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Nl(e,t){switch(e){case"focusin":case"focusout":vt=null;break;case"dragenter":case"dragleave":xt=null;break;case"mouseover":case"mouseout":yt=null;break;case"pointerover":case"pointerout":Zr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":en.delete(t.pointerId)}}function Nr(e,t,r,n,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:r,eventSystemFlags:n,nativeEvent:i,targetContainers:[o]},t!==null&&(t=xn(t),t!==null&&Ca(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function zd(e,t,r,n,o){switch(t){case"focusin":return vt=Nr(vt,e,t,r,n,o),!0;case"dragenter":return xt=Nr(xt,e,t,r,n,o),!0;case"mouseover":return yt=Nr(yt,e,t,r,n,o),!0;case"pointerover":var i=o.pointerId;return Zr.set(i,Nr(Zr.get(i)||null,e,t,r,n,o)),!0;case"gotpointercapture":return i=o.pointerId,en.set(i,Nr(en.get(i)||null,e,t,r,n,o)),!0}return!1}function jc(e){var t=Mt(e.target);if(t!==null){var r=Vt(t);if(r!==null){if(t=r.tag,t===13){if(t=uc(r),t!==null){e.blockedOn=t,kc(e.priority,function(){wc(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Vn(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Ai(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var n=new r.constructor(r.type,r);Ti=n,r.target.dispatchEvent(n),Ti=null}else return t=xn(r),t!==null&&Ca(t),e.blockedOn=r,!1;t.shift()}return!0}function Tl(e,t,r){Vn(e)&&r.delete(t)}function Ed(){Ii=!1,vt!==null&&Vn(vt)&&(vt=null),xt!==null&&Vn(xt)&&(xt=null),yt!==null&&Vn(yt)&&(yt=null),Zr.forEach(Tl),en.forEach(Tl)}function Tr(e,t){e.blockedOn===t&&(e.blockedOn=null,Ii||(Ii=!0,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,Ed)))}function tn(e){function t(o){return Tr(o,e)}if(0<Pn.length){Tr(Pn[0],e);for(var r=1;r<Pn.length;r++){var n=Pn[r];n.blockedOn===e&&(n.blockedOn=null)}}for(vt!==null&&Tr(vt,e),xt!==null&&Tr(xt,e),yt!==null&&Tr(yt,e),Zr.forEach(t),en.forEach(t),r=0;r<ft.length;r++)n=ft[r],n.blockedOn===e&&(n.blockedOn=null);for(;0<ft.length&&(r=ft[0],r.blockedOn===null);)jc(r),r.blockedOn===null&&ft.shift()}var mr=ct.ReactCurrentBatchConfig,so=!0;function Cd(e,t,r,n){var o=$,i=mr.transition;mr.transition=null;try{$=1,Pa(e,t,r,n)}finally{$=o,mr.transition=i}}function Pd(e,t,r,n){var o=$,i=mr.transition;mr.transition=null;try{$=4,Pa(e,t,r,n)}finally{$=o,mr.transition=i}}function Pa(e,t,r,n){if(so){var o=Ai(e,t,r,n);if(o===null)li(e,t,n,co,r),Nl(e,n);else if(zd(o,e,t,r,n))n.stopPropagation();else if(Nl(e,n),t&4&&-1<Sd.indexOf(e)){for(;o!==null;){var i=xn(o);if(i!==null&&yc(i),i=Ai(e,t,r,n),i===null&&li(e,t,n,co,r),i===o)break;o=i}o!==null&&n.stopPropagation()}else li(e,t,n,null,r)}}var co=null;function Ai(e,t,r,n){if(co=null,e=Sa(n),e=Mt(e),e!==null)if(t=Vt(e),t===null)e=null;else if(r=t.tag,r===13){if(e=uc(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return co=e,null}function Sc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hd()){case za:return 1;case hc:return 4;case ao:case gd:return 16;case gc:return 536870912;default:return 16}default:return 16}}var ht=null,Na=null,Yn=null;function zc(){if(Yn)return Yn;var e,t=Na,r=t.length,n,o="value"in ht?ht.value:ht.textContent,i=o.length;for(e=0;e<r&&t[e]===o[e];e++);var a=r-e;for(n=1;n<=a&&t[r-n]===o[i-n];n++);return Yn=o.slice(e,1<n?1-n:void 0)}function Xn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Nn(){return!0}function Rl(){return!1}function Me(e){function t(r,n,o,i,a){this._reactName=r,this._targetInst=o,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(r=e[l],this[l]=r?r(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Nn:Rl,this.isPropagationStopped=Rl,this}return K(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Nn)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Nn)},persist:function(){},isPersistent:Nn}),t}var zr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ta=Me(zr),vn=K({},zr,{view:0,detail:0}),Nd=Me(vn),Jo,Zo,Rr,Ro=K({},vn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ra,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Rr&&(Rr&&e.type==="mousemove"?(Jo=e.screenX-Rr.screenX,Zo=e.screenY-Rr.screenY):Zo=Jo=0,Rr=e),Jo)},movementY:function(e){return"movementY"in e?e.movementY:Zo}}),_l=Me(Ro),Td=K({},Ro,{dataTransfer:0}),Rd=Me(Td),_d=K({},vn,{relatedTarget:0}),ei=Me(_d),Md=K({},zr,{animationName:0,elapsedTime:0,pseudoElement:0}),Ld=Me(Md),Id=K({},zr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ad=Me(Id),Dd=K({},zr,{data:0}),Ml=Me(Dd),Od={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$d={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ud(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$d[e])?!!t[e]:!1}function Ra(){return Ud}var Bd=K({},vn,{key:function(e){if(e.key){var t=Od[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Xn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ra,charCode:function(e){return e.type==="keypress"?Xn(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Hd=Me(Bd),Wd=K({},Ro,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ll=Me(Wd),Vd=K({},vn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ra}),Yd=Me(Vd),Xd=K({},zr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qd=Me(Xd),Kd=K({},Ro,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Gd=Me(Kd),qd=[9,13,27,32],_a=it&&"CompositionEvent"in window,Br=null;it&&"documentMode"in document&&(Br=document.documentMode);var Jd=it&&"TextEvent"in window&&!Br,Ec=it&&(!_a||Br&&8<Br&&11>=Br),Il=" ",Al=!1;function Cc(e,t){switch(e){case"keyup":return qd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var tr=!1;function Zd(e,t){switch(e){case"compositionend":return Pc(t);case"keypress":return t.which!==32?null:(Al=!0,Il);case"textInput":return e=t.data,e===Il&&Al?null:e;default:return null}}function ef(e,t){if(tr)return e==="compositionend"||!_a&&Cc(e,t)?(e=zc(),Yn=Na=ht=null,tr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Ec&&t.locale!=="ko"?null:t.data;default:return null}}var tf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!tf[e.type]:t==="textarea"}function Nc(e,t,r,n){ac(n),t=po(t,"onChange"),0<t.length&&(r=new Ta("onChange","change",null,r,n),e.push({event:r,listeners:t}))}var Hr=null,rn=null;function rf(e){$c(e,0)}function _o(e){var t=or(e);if(Zs(t))return e}function nf(e,t){if(e==="change")return t}var Tc=!1;if(it){var ti;if(it){var ri="oninput"in document;if(!ri){var Ol=document.createElement("div");Ol.setAttribute("oninput","return;"),ri=typeof Ol.oninput=="function"}ti=ri}else ti=!1;Tc=ti&&(!document.documentMode||9<document.documentMode)}function Fl(){Hr&&(Hr.detachEvent("onpropertychange",Rc),rn=Hr=null)}function Rc(e){if(e.propertyName==="value"&&_o(rn)){var t=[];Nc(t,rn,e,Sa(e)),pc(rf,t)}}function of(e,t,r){e==="focusin"?(Fl(),Hr=t,rn=r,Hr.attachEvent("onpropertychange",Rc)):e==="focusout"&&Fl()}function af(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return _o(rn)}function lf(e,t){if(e==="click")return _o(t)}function sf(e,t){if(e==="input"||e==="change")return _o(t)}function cf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Qe=typeof Object.is=="function"?Object.is:cf;function nn(e,t){if(Qe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(n=0;n<r.length;n++){var o=r[n];if(!xi.call(t,o)||!Qe(e[o],t[o]))return!1}return!0}function $l(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ul(e,t){var r=$l(e);e=0;for(var n;r;){if(r.nodeType===3){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=$l(r)}}function _c(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?_c(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mc(){for(var e=window,t=no();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=no(e.document)}return t}function Ma(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function pf(e){var t=Mc(),r=e.focusedElem,n=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&_c(r.ownerDocument.documentElement,r)){if(n!==null&&Ma(r)){if(t=n.start,e=n.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=r.textContent.length,i=Math.min(n.start,o);n=n.end===void 0?i:Math.min(n.end,o),!e.extend&&i>n&&(o=n,n=i,i=o),o=Ul(r,i);var a=Ul(r,n);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>n?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var uf=it&&"documentMode"in document&&11>=document.documentMode,rr=null,Di=null,Wr=null,Oi=!1;function Bl(e,t,r){var n=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Oi||rr==null||rr!==no(n)||(n=rr,"selectionStart"in n&&Ma(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Wr&&nn(Wr,n)||(Wr=n,n=po(Di,"onSelect"),0<n.length&&(t=new Ta("onSelect","select",null,t,r),e.push({event:t,listeners:n}),t.target=rr)))}function Tn(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var nr={animationend:Tn("Animation","AnimationEnd"),animationiteration:Tn("Animation","AnimationIteration"),animationstart:Tn("Animation","AnimationStart"),transitionend:Tn("Transition","TransitionEnd")},ni={},Lc={};it&&(Lc=document.createElement("div").style,"AnimationEvent"in window||(delete nr.animationend.animation,delete nr.animationiteration.animation,delete nr.animationstart.animation),"TransitionEvent"in window||delete nr.transitionend.transition);function Mo(e){if(ni[e])return ni[e];if(!nr[e])return e;var t=nr[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Lc)return ni[e]=t[r];return e}var Ic=Mo("animationend"),Ac=Mo("animationiteration"),Dc=Mo("animationstart"),Oc=Mo("transitionend"),Fc=new Map,Hl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ct(e,t){Fc.set(e,t),Wt(t,[e])}for(var oi=0;oi<Hl.length;oi++){var ii=Hl[oi],df=ii.toLowerCase(),ff=ii[0].toUpperCase()+ii.slice(1);Ct(df,"on"+ff)}Ct(Ic,"onAnimationEnd");Ct(Ac,"onAnimationIteration");Ct(Dc,"onAnimationStart");Ct("dblclick","onDoubleClick");Ct("focusin","onFocus");Ct("focusout","onBlur");Ct(Oc,"onTransitionEnd");vr("onMouseEnter",["mouseout","mouseover"]);vr("onMouseLeave",["mouseout","mouseover"]);vr("onPointerEnter",["pointerout","pointerover"]);vr("onPointerLeave",["pointerout","pointerover"]);Wt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Wt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Wt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Wt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Wt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Fr));function Wl(e,t,r){var n=e.type||"unknown-event";e.currentTarget=r,ud(n,t,void 0,e),e.currentTarget=null}function $c(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var n=e[r],o=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var a=n.length-1;0<=a;a--){var l=n[a],s=l.instance,p=l.currentTarget;if(l=l.listener,s!==i&&o.isPropagationStopped())break e;Wl(o,l,p),i=s}else for(a=0;a<n.length;a++){if(l=n[a],s=l.instance,p=l.currentTarget,l=l.listener,s!==i&&o.isPropagationStopped())break e;Wl(o,l,p),i=s}}}if(io)throw e=Mi,io=!1,Mi=null,e}function B(e,t){var r=t[Hi];r===void 0&&(r=t[Hi]=new Set);var n=e+"__bubble";r.has(n)||(Uc(t,e,2,!1),r.add(n))}function ai(e,t,r){var n=0;t&&(n|=4),Uc(r,e,n,t)}var Rn="_reactListening"+Math.random().toString(36).slice(2);function on(e){if(!e[Rn]){e[Rn]=!0,Qs.forEach(function(r){r!=="selectionchange"&&(mf.has(r)||ai(r,!1,e),ai(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Rn]||(t[Rn]=!0,ai("selectionchange",!1,t))}}function Uc(e,t,r,n){switch(Sc(t)){case 1:var o=Cd;break;case 4:o=Pd;break;default:o=Pa}r=o.bind(null,t,r,e),o=void 0,!_i||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),n?o!==void 0?e.addEventListener(t,r,{capture:!0,passive:o}):e.addEventListener(t,r,!0):o!==void 0?e.addEventListener(t,r,{passive:o}):e.addEventListener(t,r,!1)}function li(e,t,r,n,o){var i=n;if(!(t&1)&&!(t&2)&&n!==null)e:for(;;){if(n===null)return;var a=n.tag;if(a===3||a===4){var l=n.stateNode.containerInfo;if(l===o||l.nodeType===8&&l.parentNode===o)break;if(a===4)for(a=n.return;a!==null;){var s=a.tag;if((s===3||s===4)&&(s=a.stateNode.containerInfo,s===o||s.nodeType===8&&s.parentNode===o))return;a=a.return}for(;l!==null;){if(a=Mt(l),a===null)return;if(s=a.tag,s===5||s===6){n=i=a;continue e}l=l.parentNode}}n=n.return}pc(function(){var p=i,h=Sa(r),g=[];e:{var m=Fc.get(e);if(m!==void 0){var x=Ta,v=e;switch(e){case"keypress":if(Xn(r)===0)break e;case"keydown":case"keyup":x=Hd;break;case"focusin":v="focus",x=ei;break;case"focusout":v="blur",x=ei;break;case"beforeblur":case"afterblur":x=ei;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=_l;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Rd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=Yd;break;case Ic:case Ac:case Dc:x=Ld;break;case Oc:x=Qd;break;case"scroll":x=Nd;break;case"wheel":x=Gd;break;case"copy":case"cut":case"paste":x=Ad;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Ll}var w=(t&4)!==0,E=!w&&e==="scroll",d=w?m!==null?m+"Capture":null:m;w=[];for(var u=p,f;u!==null;){f=u;var y=f.stateNode;if(f.tag===5&&y!==null&&(f=y,d!==null&&(y=Jr(u,d),y!=null&&w.push(an(u,y,f)))),E)break;u=u.return}0<w.length&&(m=new x(m,v,null,r,h),g.push({event:m,listeners:w}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",m&&r!==Ti&&(v=r.relatedTarget||r.fromElement)&&(Mt(v)||v[at]))break e;if((x||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,x?(v=r.relatedTarget||r.toElement,x=p,v=v?Mt(v):null,v!==null&&(E=Vt(v),v!==E||v.tag!==5&&v.tag!==6)&&(v=null)):(x=null,v=p),x!==v)){if(w=_l,y="onMouseLeave",d="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(w=Ll,y="onPointerLeave",d="onPointerEnter",u="pointer"),E=x==null?m:or(x),f=v==null?m:or(v),m=new w(y,u+"leave",x,r,h),m.target=E,m.relatedTarget=f,y=null,Mt(h)===p&&(w=new w(d,u+"enter",v,r,h),w.target=f,w.relatedTarget=E,y=w),E=y,x&&v)t:{for(w=x,d=v,u=0,f=w;f;f=Kt(f))u++;for(f=0,y=d;y;y=Kt(y))f++;for(;0<u-f;)w=Kt(w),u--;for(;0<f-u;)d=Kt(d),f--;for(;u--;){if(w===d||d!==null&&w===d.alternate)break t;w=Kt(w),d=Kt(d)}w=null}else w=null;x!==null&&Vl(g,m,x,w,!1),v!==null&&E!==null&&Vl(g,E,v,w,!0)}}e:{if(m=p?or(p):window,x=m.nodeName&&m.nodeName.toLowerCase(),x==="select"||x==="input"&&m.type==="file")var S=nf;else if(Dl(m))if(Tc)S=sf;else{S=af;var b=of}else(x=m.nodeName)&&x.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(S=lf);if(S&&(S=S(e,p))){Nc(g,S,r,h);break e}b&&b(e,m,p),e==="focusout"&&(b=m._wrapperState)&&b.controlled&&m.type==="number"&&zi(m,"number",m.value)}switch(b=p?or(p):window,e){case"focusin":(Dl(b)||b.contentEditable==="true")&&(rr=b,Di=p,Wr=null);break;case"focusout":Wr=Di=rr=null;break;case"mousedown":Oi=!0;break;case"contextmenu":case"mouseup":case"dragend":Oi=!1,Bl(g,r,h);break;case"selectionchange":if(uf)break;case"keydown":case"keyup":Bl(g,r,h)}var C;if(_a)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else tr?Cc(e,r)&&(z="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(z="onCompositionStart");z&&(Ec&&r.locale!=="ko"&&(tr||z!=="onCompositionStart"?z==="onCompositionEnd"&&tr&&(C=zc()):(ht=h,Na="value"in ht?ht.value:ht.textContent,tr=!0)),b=po(p,z),0<b.length&&(z=new Ml(z,e,null,r,h),g.push({event:z,listeners:b}),C?z.data=C:(C=Pc(r),C!==null&&(z.data=C)))),(C=Jd?Zd(e,r):ef(e,r))&&(p=po(p,"onBeforeInput"),0<p.length&&(h=new Ml("onBeforeInput","beforeinput",null,r,h),g.push({event:h,listeners:p}),h.data=C))}$c(g,t)})}function an(e,t,r){return{instance:e,listener:t,currentTarget:r}}function po(e,t){for(var r=t+"Capture",n=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Jr(e,r),i!=null&&n.unshift(an(e,i,o)),i=Jr(e,t),i!=null&&n.push(an(e,i,o))),e=e.return}return n}function Kt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Vl(e,t,r,n,o){for(var i=t._reactName,a=[];r!==null&&r!==n;){var l=r,s=l.alternate,p=l.stateNode;if(s!==null&&s===n)break;l.tag===5&&p!==null&&(l=p,o?(s=Jr(r,i),s!=null&&a.unshift(an(r,s,l))):o||(s=Jr(r,i),s!=null&&a.push(an(r,s,l)))),r=r.return}a.length!==0&&e.push({event:t,listeners:a})}var hf=/\r\n?/g,gf=/\u0000|\uFFFD/g;function Yl(e){return(typeof e=="string"?e:""+e).replace(hf,`
`).replace(gf,"")}function _n(e,t,r){if(t=Yl(t),Yl(e)!==t&&r)throw Error(j(425))}function uo(){}var Fi=null,$i=null;function Ui(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bi=typeof setTimeout=="function"?setTimeout:void 0,vf=typeof clearTimeout=="function"?clearTimeout:void 0,Xl=typeof Promise=="function"?Promise:void 0,xf=typeof queueMicrotask=="function"?queueMicrotask:typeof Xl<"u"?function(e){return Xl.resolve(null).then(e).catch(yf)}:Bi;function yf(e){setTimeout(function(){throw e})}function si(e,t){var r=t,n=0;do{var o=r.nextSibling;if(e.removeChild(r),o&&o.nodeType===8)if(r=o.data,r==="/$"){if(n===0){e.removeChild(o),tn(t);return}n--}else r!=="$"&&r!=="$?"&&r!=="$!"||n++;r=o}while(r);tn(t)}function wt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ql(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Er=Math.random().toString(36).slice(2),qe="__reactFiber$"+Er,ln="__reactProps$"+Er,at="__reactContainer$"+Er,Hi="__reactEvents$"+Er,wf="__reactListeners$"+Er,bf="__reactHandles$"+Er;function Mt(e){var t=e[qe];if(t)return t;for(var r=e.parentNode;r;){if(t=r[at]||r[qe]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Ql(e);e!==null;){if(r=e[qe])return r;e=Ql(e)}return t}e=r,r=e.parentNode}return null}function xn(e){return e=e[qe]||e[at],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function or(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(j(33))}function Lo(e){return e[ln]||null}var Wi=[],ir=-1;function Pt(e){return{current:e}}function H(e){0>ir||(e.current=Wi[ir],Wi[ir]=null,ir--)}function U(e,t){ir++,Wi[ir]=e.current,e.current=t}var Et={},fe=Pt(Et),ke=Pt(!1),Ft=Et;function xr(e,t){var r=e.type.contextTypes;if(!r)return Et;var n=e.stateNode;if(n&&n.__reactInternalMemoizedUnmaskedChildContext===t)return n.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in r)o[i]=t[i];return n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function je(e){return e=e.childContextTypes,e!=null}function fo(){H(ke),H(fe)}function Kl(e,t,r){if(fe.current!==Et)throw Error(j(168));U(fe,t),U(ke,r)}function Bc(e,t,r){var n=e.stateNode;if(t=t.childContextTypes,typeof n.getChildContext!="function")return r;n=n.getChildContext();for(var o in n)if(!(o in t))throw Error(j(108,od(e)||"Unknown",o));return K({},r,n)}function mo(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Et,Ft=fe.current,U(fe,e),U(ke,ke.current),!0}function Gl(e,t,r){var n=e.stateNode;if(!n)throw Error(j(169));r?(e=Bc(e,t,Ft),n.__reactInternalMemoizedMergedChildContext=e,H(ke),H(fe),U(fe,e)):H(ke),U(ke,r)}var tt=null,Io=!1,ci=!1;function Hc(e){tt===null?tt=[e]:tt.push(e)}function kf(e){Io=!0,Hc(e)}function Nt(){if(!ci&&tt!==null){ci=!0;var e=0,t=$;try{var r=tt;for($=1;e<r.length;e++){var n=r[e];do n=n(!0);while(n!==null)}tt=null,Io=!1}catch(o){throw tt!==null&&(tt=tt.slice(e+1)),mc(za,Nt),o}finally{$=t,ci=!1}}return null}var ar=[],lr=0,ho=null,go=0,Ie=[],Ae=0,$t=null,rt=1,nt="";function Rt(e,t){ar[lr++]=go,ar[lr++]=ho,ho=e,go=t}function Wc(e,t,r){Ie[Ae++]=rt,Ie[Ae++]=nt,Ie[Ae++]=$t,$t=e;var n=rt;e=nt;var o=32-Ye(n)-1;n&=~(1<<o),r+=1;var i=32-Ye(t)+o;if(30<i){var a=o-o%5;i=(n&(1<<a)-1).toString(32),n>>=a,o-=a,rt=1<<32-Ye(t)+o|r<<o|n,nt=i+e}else rt=1<<i|r<<o|n,nt=e}function La(e){e.return!==null&&(Rt(e,1),Wc(e,1,0))}function Ia(e){for(;e===ho;)ho=ar[--lr],ar[lr]=null,go=ar[--lr],ar[lr]=null;for(;e===$t;)$t=Ie[--Ae],Ie[Ae]=null,nt=Ie[--Ae],Ie[Ae]=null,rt=Ie[--Ae],Ie[Ae]=null}var Te=null,Ne=null,W=!1,Ve=null;function Vc(e,t){var r=De(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function ql(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Te=e,Ne=wt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Te=e,Ne=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=$t!==null?{id:rt,overflow:nt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=De(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Te=e,Ne=null,!0):!1;default:return!1}}function Vi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Yi(e){if(W){var t=Ne;if(t){var r=t;if(!ql(e,t)){if(Vi(e))throw Error(j(418));t=wt(r.nextSibling);var n=Te;t&&ql(e,t)?Vc(n,r):(e.flags=e.flags&-4097|2,W=!1,Te=e)}}else{if(Vi(e))throw Error(j(418));e.flags=e.flags&-4097|2,W=!1,Te=e}}}function Jl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Te=e}function Mn(e){if(e!==Te)return!1;if(!W)return Jl(e),W=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ui(e.type,e.memoizedProps)),t&&(t=Ne)){if(Vi(e))throw Yc(),Error(j(418));for(;t;)Vc(e,t),t=wt(t.nextSibling)}if(Jl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(j(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Ne=wt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Ne=null}}else Ne=Te?wt(e.stateNode.nextSibling):null;return!0}function Yc(){for(var e=Ne;e;)e=wt(e.nextSibling)}function yr(){Ne=Te=null,W=!1}function Aa(e){Ve===null?Ve=[e]:Ve.push(e)}var jf=ct.ReactCurrentBatchConfig;function _r(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(j(309));var n=r.stateNode}if(!n)throw Error(j(147,e));var o=n,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var l=o.refs;a===null?delete l[i]:l[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(j(284));if(!r._owner)throw Error(j(290,e))}return e}function Ln(e,t){throw e=Object.prototype.toString.call(t),Error(j(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Zl(e){var t=e._init;return t(e._payload)}function Xc(e){function t(d,u){if(e){var f=d.deletions;f===null?(d.deletions=[u],d.flags|=16):f.push(u)}}function r(d,u){if(!e)return null;for(;u!==null;)t(d,u),u=u.sibling;return null}function n(d,u){for(d=new Map;u!==null;)u.key!==null?d.set(u.key,u):d.set(u.index,u),u=u.sibling;return d}function o(d,u){return d=St(d,u),d.index=0,d.sibling=null,d}function i(d,u,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<u?(d.flags|=2,u):f):(d.flags|=2,u)):(d.flags|=1048576,u)}function a(d){return e&&d.alternate===null&&(d.flags|=2),d}function l(d,u,f,y){return u===null||u.tag!==6?(u=gi(f,d.mode,y),u.return=d,u):(u=o(u,f),u.return=d,u)}function s(d,u,f,y){var S=f.type;return S===er?h(d,u,f.props.children,y,f.key):u!==null&&(u.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ut&&Zl(S)===u.type)?(y=o(u,f.props),y.ref=_r(d,u,f),y.return=d,y):(y=eo(f.type,f.key,f.props,null,d.mode,y),y.ref=_r(d,u,f),y.return=d,y)}function p(d,u,f,y){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=vi(f,d.mode,y),u.return=d,u):(u=o(u,f.children||[]),u.return=d,u)}function h(d,u,f,y,S){return u===null||u.tag!==7?(u=Dt(f,d.mode,y,S),u.return=d,u):(u=o(u,f),u.return=d,u)}function g(d,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=gi(""+u,d.mode,f),u.return=d,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case jn:return f=eo(u.type,u.key,u.props,null,d.mode,f),f.ref=_r(d,null,u),f.return=d,f;case Zt:return u=vi(u,d.mode,f),u.return=d,u;case ut:var y=u._init;return g(d,y(u._payload),f)}if(Dr(u)||Cr(u))return u=Dt(u,d.mode,f,null),u.return=d,u;Ln(d,u)}return null}function m(d,u,f,y){var S=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return S!==null?null:l(d,u,""+f,y);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case jn:return f.key===S?s(d,u,f,y):null;case Zt:return f.key===S?p(d,u,f,y):null;case ut:return S=f._init,m(d,u,S(f._payload),y)}if(Dr(f)||Cr(f))return S!==null?null:h(d,u,f,y,null);Ln(d,f)}return null}function x(d,u,f,y,S){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(f)||null,l(u,d,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case jn:return d=d.get(y.key===null?f:y.key)||null,s(u,d,y,S);case Zt:return d=d.get(y.key===null?f:y.key)||null,p(u,d,y,S);case ut:var b=y._init;return x(d,u,f,b(y._payload),S)}if(Dr(y)||Cr(y))return d=d.get(f)||null,h(u,d,y,S,null);Ln(u,y)}return null}function v(d,u,f,y){for(var S=null,b=null,C=u,z=u=0,M=null;C!==null&&z<f.length;z++){C.index>z?(M=C,C=null):M=C.sibling;var _=m(d,C,f[z],y);if(_===null){C===null&&(C=M);break}e&&C&&_.alternate===null&&t(d,C),u=i(_,u,z),b===null?S=_:b.sibling=_,b=_,C=M}if(z===f.length)return r(d,C),W&&Rt(d,z),S;if(C===null){for(;z<f.length;z++)C=g(d,f[z],y),C!==null&&(u=i(C,u,z),b===null?S=C:b.sibling=C,b=C);return W&&Rt(d,z),S}for(C=n(d,C);z<f.length;z++)M=x(C,d,z,f[z],y),M!==null&&(e&&M.alternate!==null&&C.delete(M.key===null?z:M.key),u=i(M,u,z),b===null?S=M:b.sibling=M,b=M);return e&&C.forEach(function(I){return t(d,I)}),W&&Rt(d,z),S}function w(d,u,f,y){var S=Cr(f);if(typeof S!="function")throw Error(j(150));if(f=S.call(f),f==null)throw Error(j(151));for(var b=S=null,C=u,z=u=0,M=null,_=f.next();C!==null&&!_.done;z++,_=f.next()){C.index>z?(M=C,C=null):M=C.sibling;var I=m(d,C,_.value,y);if(I===null){C===null&&(C=M);break}e&&C&&I.alternate===null&&t(d,C),u=i(I,u,z),b===null?S=I:b.sibling=I,b=I,C=M}if(_.done)return r(d,C),W&&Rt(d,z),S;if(C===null){for(;!_.done;z++,_=f.next())_=g(d,_.value,y),_!==null&&(u=i(_,u,z),b===null?S=_:b.sibling=_,b=_);return W&&Rt(d,z),S}for(C=n(d,C);!_.done;z++,_=f.next())_=x(C,d,z,_.value,y),_!==null&&(e&&_.alternate!==null&&C.delete(_.key===null?z:_.key),u=i(_,u,z),b===null?S=_:b.sibling=_,b=_);return e&&C.forEach(function(L){return t(d,L)}),W&&Rt(d,z),S}function E(d,u,f,y){if(typeof f=="object"&&f!==null&&f.type===er&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case jn:e:{for(var S=f.key,b=u;b!==null;){if(b.key===S){if(S=f.type,S===er){if(b.tag===7){r(d,b.sibling),u=o(b,f.props.children),u.return=d,d=u;break e}}else if(b.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===ut&&Zl(S)===b.type){r(d,b.sibling),u=o(b,f.props),u.ref=_r(d,b,f),u.return=d,d=u;break e}r(d,b);break}else t(d,b);b=b.sibling}f.type===er?(u=Dt(f.props.children,d.mode,y,f.key),u.return=d,d=u):(y=eo(f.type,f.key,f.props,null,d.mode,y),y.ref=_r(d,u,f),y.return=d,d=y)}return a(d);case Zt:e:{for(b=f.key;u!==null;){if(u.key===b)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){r(d,u.sibling),u=o(u,f.children||[]),u.return=d,d=u;break e}else{r(d,u);break}else t(d,u);u=u.sibling}u=vi(f,d.mode,y),u.return=d,d=u}return a(d);case ut:return b=f._init,E(d,u,b(f._payload),y)}if(Dr(f))return v(d,u,f,y);if(Cr(f))return w(d,u,f,y);Ln(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(r(d,u.sibling),u=o(u,f),u.return=d,d=u):(r(d,u),u=gi(f,d.mode,y),u.return=d,d=u),a(d)):r(d,u)}return E}var wr=Xc(!0),Qc=Xc(!1),vo=Pt(null),xo=null,sr=null,Da=null;function Oa(){Da=sr=xo=null}function Fa(e){var t=vo.current;H(vo),e._currentValue=t}function Xi(e,t,r){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===r)break;e=e.return}}function hr(e,t){xo=e,Da=sr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(be=!0),e.firstContext=null)}function Fe(e){var t=e._currentValue;if(Da!==e)if(e={context:e,memoizedValue:t,next:null},sr===null){if(xo===null)throw Error(j(308));sr=e,xo.dependencies={lanes:0,firstContext:e}}else sr=sr.next=e;return t}var Lt=null;function $a(e){Lt===null?Lt=[e]:Lt.push(e)}function Kc(e,t,r,n){var o=t.interleaved;return o===null?(r.next=r,$a(t)):(r.next=o.next,o.next=r),t.interleaved=r,lt(e,n)}function lt(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var dt=!1;function Ua(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Gc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ot(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function bt(e,t,r){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,O&2){var o=n.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),n.pending=t,lt(e,r)}return o=n.interleaved,o===null?(t.next=t,$a(n)):(t.next=o.next,o.next=t),n.interleaved=t,lt(e,r)}function Qn(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,Ea(e,r)}}function es(e,t){var r=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,r===n)){var o=null,i=null;if(r=r.firstBaseUpdate,r!==null){do{var a={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};i===null?o=i=a:i=i.next=a,r=r.next}while(r!==null);i===null?o=i=t:i=i.next=t}else o=i=t;r={baseState:n.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:n.shared,effects:n.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function yo(e,t,r,n){var o=e.updateQueue;dt=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,l=o.shared.pending;if(l!==null){o.shared.pending=null;var s=l,p=s.next;s.next=null,a===null?i=p:a.next=p,a=s;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==a&&(l===null?h.firstBaseUpdate=p:l.next=p,h.lastBaseUpdate=s))}if(i!==null){var g=o.baseState;a=0,h=p=s=null,l=i;do{var m=l.lane,x=l.eventTime;if((n&m)===m){h!==null&&(h=h.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,w=l;switch(m=t,x=r,w.tag){case 1:if(v=w.payload,typeof v=="function"){g=v.call(x,g,m);break e}g=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=w.payload,m=typeof v=="function"?v.call(x,g,m):v,m==null)break e;g=K({},g,m);break e;case 2:dt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[l]:m.push(l))}else x={eventTime:x,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(p=h=x,s=g):h=h.next=x,a|=m;if(l=l.next,l===null){if(l=o.shared.pending,l===null)break;m=l,l=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(h===null&&(s=g),o.baseState=s,o.firstBaseUpdate=p,o.lastBaseUpdate=h,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);Bt|=a,e.lanes=a,e.memoizedState=g}}function ts(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var n=e[t],o=n.callback;if(o!==null){if(n.callback=null,n=r,typeof o!="function")throw Error(j(191,o));o.call(n)}}}var yn={},Ze=Pt(yn),sn=Pt(yn),cn=Pt(yn);function It(e){if(e===yn)throw Error(j(174));return e}function Ba(e,t){switch(U(cn,t),U(sn,e),U(Ze,yn),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ci(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ci(t,e)}H(Ze),U(Ze,t)}function br(){H(Ze),H(sn),H(cn)}function qc(e){It(cn.current);var t=It(Ze.current),r=Ci(t,e.type);t!==r&&(U(sn,e),U(Ze,r))}function Ha(e){sn.current===e&&(H(Ze),H(sn))}var X=Pt(0);function wo(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var pi=[];function Wa(){for(var e=0;e<pi.length;e++)pi[e]._workInProgressVersionPrimary=null;pi.length=0}var Kn=ct.ReactCurrentDispatcher,ui=ct.ReactCurrentBatchConfig,Ut=0,Q=null,ee=null,re=null,bo=!1,Vr=!1,pn=0,Sf=0;function pe(){throw Error(j(321))}function Va(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Qe(e[r],t[r]))return!1;return!0}function Ya(e,t,r,n,o,i){if(Ut=i,Q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Kn.current=e===null||e.memoizedState===null?Pf:Nf,e=r(n,o),Vr){i=0;do{if(Vr=!1,pn=0,25<=i)throw Error(j(301));i+=1,re=ee=null,t.updateQueue=null,Kn.current=Tf,e=r(n,o)}while(Vr)}if(Kn.current=ko,t=ee!==null&&ee.next!==null,Ut=0,re=ee=Q=null,bo=!1,t)throw Error(j(300));return e}function Xa(){var e=pn!==0;return pn=0,e}function Ge(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return re===null?Q.memoizedState=re=e:re=re.next=e,re}function $e(){if(ee===null){var e=Q.alternate;e=e!==null?e.memoizedState:null}else e=ee.next;var t=re===null?Q.memoizedState:re.next;if(t!==null)re=t,ee=e;else{if(e===null)throw Error(j(310));ee=e,e={memoizedState:ee.memoizedState,baseState:ee.baseState,baseQueue:ee.baseQueue,queue:ee.queue,next:null},re===null?Q.memoizedState=re=e:re=re.next=e}return re}function un(e,t){return typeof t=="function"?t(e):t}function di(e){var t=$e(),r=t.queue;if(r===null)throw Error(j(311));r.lastRenderedReducer=e;var n=ee,o=n.baseQueue,i=r.pending;if(i!==null){if(o!==null){var a=o.next;o.next=i.next,i.next=a}n.baseQueue=o=i,r.pending=null}if(o!==null){i=o.next,n=n.baseState;var l=a=null,s=null,p=i;do{var h=p.lane;if((Ut&h)===h)s!==null&&(s=s.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),n=p.hasEagerState?p.eagerState:e(n,p.action);else{var g={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};s===null?(l=s=g,a=n):s=s.next=g,Q.lanes|=h,Bt|=h}p=p.next}while(p!==null&&p!==i);s===null?a=n:s.next=l,Qe(n,t.memoizedState)||(be=!0),t.memoizedState=n,t.baseState=a,t.baseQueue=s,r.lastRenderedState=n}if(e=r.interleaved,e!==null){o=e;do i=o.lane,Q.lanes|=i,Bt|=i,o=o.next;while(o!==e)}else o===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function fi(e){var t=$e(),r=t.queue;if(r===null)throw Error(j(311));r.lastRenderedReducer=e;var n=r.dispatch,o=r.pending,i=t.memoizedState;if(o!==null){r.pending=null;var a=o=o.next;do i=e(i,a.action),a=a.next;while(a!==o);Qe(i,t.memoizedState)||(be=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),r.lastRenderedState=i}return[i,n]}function Jc(){}function Zc(e,t){var r=Q,n=$e(),o=t(),i=!Qe(n.memoizedState,o);if(i&&(n.memoizedState=o,be=!0),n=n.queue,Qa(rp.bind(null,r,n,e),[e]),n.getSnapshot!==t||i||re!==null&&re.memoizedState.tag&1){if(r.flags|=2048,dn(9,tp.bind(null,r,n,o,t),void 0,null),ne===null)throw Error(j(349));Ut&30||ep(r,t,o)}return o}function ep(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function tp(e,t,r,n){t.value=r,t.getSnapshot=n,np(t)&&op(e)}function rp(e,t,r){return r(function(){np(t)&&op(e)})}function np(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Qe(e,r)}catch{return!0}}function op(e){var t=lt(e,1);t!==null&&Xe(t,e,1,-1)}function rs(e){var t=Ge();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:un,lastRenderedState:e},t.queue=e,e=e.dispatch=Cf.bind(null,Q,e),[t.memoizedState,e]}function dn(e,t,r,n){return e={tag:e,create:t,destroy:r,deps:n,next:null},t=Q.updateQueue,t===null?(t={lastEffect:null,stores:null},Q.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(n=r.next,r.next=e,e.next=n,t.lastEffect=e)),e}function ip(){return $e().memoizedState}function Gn(e,t,r,n){var o=Ge();Q.flags|=e,o.memoizedState=dn(1|t,r,void 0,n===void 0?null:n)}function Ao(e,t,r,n){var o=$e();n=n===void 0?null:n;var i=void 0;if(ee!==null){var a=ee.memoizedState;if(i=a.destroy,n!==null&&Va(n,a.deps)){o.memoizedState=dn(t,r,i,n);return}}Q.flags|=e,o.memoizedState=dn(1|t,r,i,n)}function ns(e,t){return Gn(8390656,8,e,t)}function Qa(e,t){return Ao(2048,8,e,t)}function ap(e,t){return Ao(4,2,e,t)}function lp(e,t){return Ao(4,4,e,t)}function sp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function cp(e,t,r){return r=r!=null?r.concat([e]):null,Ao(4,4,sp.bind(null,t,e),r)}function Ka(){}function pp(e,t){var r=$e();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Va(t,n[1])?n[0]:(r.memoizedState=[e,t],e)}function up(e,t){var r=$e();t=t===void 0?null:t;var n=r.memoizedState;return n!==null&&t!==null&&Va(t,n[1])?n[0]:(e=e(),r.memoizedState=[e,t],e)}function dp(e,t,r){return Ut&21?(Qe(r,t)||(r=vc(),Q.lanes|=r,Bt|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,be=!0),e.memoizedState=r)}function zf(e,t){var r=$;$=r!==0&&4>r?r:4,e(!0);var n=ui.transition;ui.transition={};try{e(!1),t()}finally{$=r,ui.transition=n}}function fp(){return $e().memoizedState}function Ef(e,t,r){var n=jt(e);if(r={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null},mp(e))hp(t,r);else if(r=Kc(e,t,r,n),r!==null){var o=ge();Xe(r,e,n,o),gp(r,t,n)}}function Cf(e,t,r){var n=jt(e),o={lane:n,action:r,hasEagerState:!1,eagerState:null,next:null};if(mp(e))hp(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,l=i(a,r);if(o.hasEagerState=!0,o.eagerState=l,Qe(l,a)){var s=t.interleaved;s===null?(o.next=o,$a(t)):(o.next=s.next,s.next=o),t.interleaved=o;return}}catch{}finally{}r=Kc(e,t,o,n),r!==null&&(o=ge(),Xe(r,e,n,o),gp(r,t,n))}}function mp(e){var t=e.alternate;return e===Q||t!==null&&t===Q}function hp(e,t){Vr=bo=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function gp(e,t,r){if(r&4194240){var n=t.lanes;n&=e.pendingLanes,r|=n,t.lanes=r,Ea(e,r)}}var ko={readContext:Fe,useCallback:pe,useContext:pe,useEffect:pe,useImperativeHandle:pe,useInsertionEffect:pe,useLayoutEffect:pe,useMemo:pe,useReducer:pe,useRef:pe,useState:pe,useDebugValue:pe,useDeferredValue:pe,useTransition:pe,useMutableSource:pe,useSyncExternalStore:pe,useId:pe,unstable_isNewReconciler:!1},Pf={readContext:Fe,useCallback:function(e,t){return Ge().memoizedState=[e,t===void 0?null:t],e},useContext:Fe,useEffect:ns,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Gn(4194308,4,sp.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Gn(4194308,4,e,t)},useInsertionEffect:function(e,t){return Gn(4,2,e,t)},useMemo:function(e,t){var r=Ge();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var n=Ge();return t=r!==void 0?r(t):t,n.memoizedState=n.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},n.queue=e,e=e.dispatch=Ef.bind(null,Q,e),[n.memoizedState,e]},useRef:function(e){var t=Ge();return e={current:e},t.memoizedState=e},useState:rs,useDebugValue:Ka,useDeferredValue:function(e){return Ge().memoizedState=e},useTransition:function(){var e=rs(!1),t=e[0];return e=zf.bind(null,e[1]),Ge().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var n=Q,o=Ge();if(W){if(r===void 0)throw Error(j(407));r=r()}else{if(r=t(),ne===null)throw Error(j(349));Ut&30||ep(n,t,r)}o.memoizedState=r;var i={value:r,getSnapshot:t};return o.queue=i,ns(rp.bind(null,n,i,e),[e]),n.flags|=2048,dn(9,tp.bind(null,n,i,r,t),void 0,null),r},useId:function(){var e=Ge(),t=ne.identifierPrefix;if(W){var r=nt,n=rt;r=(n&~(1<<32-Ye(n)-1)).toString(32)+r,t=":"+t+"R"+r,r=pn++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=Sf++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Nf={readContext:Fe,useCallback:pp,useContext:Fe,useEffect:Qa,useImperativeHandle:cp,useInsertionEffect:ap,useLayoutEffect:lp,useMemo:up,useReducer:di,useRef:ip,useState:function(){return di(un)},useDebugValue:Ka,useDeferredValue:function(e){var t=$e();return dp(t,ee.memoizedState,e)},useTransition:function(){var e=di(un)[0],t=$e().memoizedState;return[e,t]},useMutableSource:Jc,useSyncExternalStore:Zc,useId:fp,unstable_isNewReconciler:!1},Tf={readContext:Fe,useCallback:pp,useContext:Fe,useEffect:Qa,useImperativeHandle:cp,useInsertionEffect:ap,useLayoutEffect:lp,useMemo:up,useReducer:fi,useRef:ip,useState:function(){return fi(un)},useDebugValue:Ka,useDeferredValue:function(e){var t=$e();return ee===null?t.memoizedState=e:dp(t,ee.memoizedState,e)},useTransition:function(){var e=fi(un)[0],t=$e().memoizedState;return[e,t]},useMutableSource:Jc,useSyncExternalStore:Zc,useId:fp,unstable_isNewReconciler:!1};function Be(e,t){if(e&&e.defaultProps){t=K({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Qi(e,t,r,n){t=e.memoizedState,r=r(n,t),r=r==null?t:K({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Do={isMounted:function(e){return(e=e._reactInternals)?Vt(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var n=ge(),o=jt(e),i=ot(n,o);i.payload=t,r!=null&&(i.callback=r),t=bt(e,i,o),t!==null&&(Xe(t,e,o,n),Qn(t,e,o))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var n=ge(),o=jt(e),i=ot(n,o);i.tag=1,i.payload=t,r!=null&&(i.callback=r),t=bt(e,i,o),t!==null&&(Xe(t,e,o,n),Qn(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=ge(),n=jt(e),o=ot(r,n);o.tag=2,t!=null&&(o.callback=t),t=bt(e,o,n),t!==null&&(Xe(t,e,n,r),Qn(t,e,n))}};function os(e,t,r,n,o,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,a):t.prototype&&t.prototype.isPureReactComponent?!nn(r,n)||!nn(o,i):!0}function vp(e,t,r){var n=!1,o=Et,i=t.contextType;return typeof i=="object"&&i!==null?i=Fe(i):(o=je(t)?Ft:fe.current,n=t.contextTypes,i=(n=n!=null)?xr(e,o):Et),t=new t(r,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Do,e.stateNode=t,t._reactInternals=e,n&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function is(e,t,r,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,n),t.state!==e&&Do.enqueueReplaceState(t,t.state,null)}function Ki(e,t,r,n){var o=e.stateNode;o.props=r,o.state=e.memoizedState,o.refs={},Ua(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Fe(i):(i=je(t)?Ft:fe.current,o.context=xr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Qi(e,t,i,r),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Do.enqueueReplaceState(o,o.state,null),yo(e,r,o,n),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function kr(e,t){try{var r="",n=t;do r+=nd(n),n=n.return;while(n);var o=r}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function mi(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Gi(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var Rf=typeof WeakMap=="function"?WeakMap:Map;function xp(e,t,r){r=ot(-1,r),r.tag=3,r.payload={element:null};var n=t.value;return r.callback=function(){So||(So=!0,aa=n),Gi(e,t)},r}function yp(e,t,r){r=ot(-1,r),r.tag=3;var n=e.type.getDerivedStateFromError;if(typeof n=="function"){var o=t.value;r.payload=function(){return n(o)},r.callback=function(){Gi(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(r.callback=function(){Gi(e,t),typeof n!="function"&&(kt===null?kt=new Set([this]):kt.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),r}function as(e,t,r){var n=e.pingCache;if(n===null){n=e.pingCache=new Rf;var o=new Set;n.set(t,o)}else o=n.get(t),o===void 0&&(o=new Set,n.set(t,o));o.has(r)||(o.add(r),e=Vf.bind(null,e,t,r),t.then(e,e))}function ls(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ss(e,t,r,n,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=ot(-1,1),t.tag=2,bt(r,t,1))),r.lanes|=1),e)}var _f=ct.ReactCurrentOwner,be=!1;function he(e,t,r,n){t.child=e===null?Qc(t,null,r,n):wr(t,e.child,r,n)}function cs(e,t,r,n,o){r=r.render;var i=t.ref;return hr(t,o),n=Ya(e,t,r,n,i,o),r=Xa(),e!==null&&!be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,st(e,t,o)):(W&&r&&La(t),t.flags|=1,he(e,t,n,o),t.child)}function ps(e,t,r,n,o){if(e===null){var i=r.type;return typeof i=="function"&&!nl(i)&&i.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=i,wp(e,t,i,n,o)):(e=eo(r.type,null,n,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var a=i.memoizedProps;if(r=r.compare,r=r!==null?r:nn,r(a,n)&&e.ref===t.ref)return st(e,t,o)}return t.flags|=1,e=St(i,n),e.ref=t.ref,e.return=t,t.child=e}function wp(e,t,r,n,o){if(e!==null){var i=e.memoizedProps;if(nn(i,n)&&e.ref===t.ref)if(be=!1,t.pendingProps=n=i,(e.lanes&o)!==0)e.flags&131072&&(be=!0);else return t.lanes=e.lanes,st(e,t,o)}return qi(e,t,r,n,o)}function bp(e,t,r){var n=t.pendingProps,o=n.children,i=e!==null?e.memoizedState:null;if(n.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},U(pr,Ce),Ce|=r;else{if(!(r&1073741824))return e=i!==null?i.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,U(pr,Ce),Ce|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},n=i!==null?i.baseLanes:r,U(pr,Ce),Ce|=n}else i!==null?(n=i.baseLanes|r,t.memoizedState=null):n=r,U(pr,Ce),Ce|=n;return he(e,t,o,r),t.child}function kp(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function qi(e,t,r,n,o){var i=je(r)?Ft:fe.current;return i=xr(t,i),hr(t,o),r=Ya(e,t,r,n,i,o),n=Xa(),e!==null&&!be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,st(e,t,o)):(W&&n&&La(t),t.flags|=1,he(e,t,r,o),t.child)}function us(e,t,r,n,o){if(je(r)){var i=!0;mo(t)}else i=!1;if(hr(t,o),t.stateNode===null)qn(e,t),vp(t,r,n),Ki(t,r,n,o),n=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var s=a.context,p=r.contextType;typeof p=="object"&&p!==null?p=Fe(p):(p=je(r)?Ft:fe.current,p=xr(t,p));var h=r.getDerivedStateFromProps,g=typeof h=="function"||typeof a.getSnapshotBeforeUpdate=="function";g||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==n||s!==p)&&is(t,a,n,p),dt=!1;var m=t.memoizedState;a.state=m,yo(t,n,a,o),s=t.memoizedState,l!==n||m!==s||ke.current||dt?(typeof h=="function"&&(Qi(t,r,h,n),s=t.memoizedState),(l=dt||os(t,r,l,n,m,s,p))?(g||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=s),a.props=n,a.state=s,a.context=p,n=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{a=t.stateNode,Gc(e,t),l=t.memoizedProps,p=t.type===t.elementType?l:Be(t.type,l),a.props=p,g=t.pendingProps,m=a.context,s=r.contextType,typeof s=="object"&&s!==null?s=Fe(s):(s=je(r)?Ft:fe.current,s=xr(t,s));var x=r.getDerivedStateFromProps;(h=typeof x=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==g||m!==s)&&is(t,a,n,s),dt=!1,m=t.memoizedState,a.state=m,yo(t,n,a,o);var v=t.memoizedState;l!==g||m!==v||ke.current||dt?(typeof x=="function"&&(Qi(t,r,x,n),v=t.memoizedState),(p=dt||os(t,r,p,n,m,v,s)||!1)?(h||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(n,v,s),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(n,v,s)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=v),a.props=n,a.state=v,a.context=s,n=p):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),n=!1)}return Ji(e,t,r,n,i,o)}function Ji(e,t,r,n,o,i){kp(e,t);var a=(t.flags&128)!==0;if(!n&&!a)return o&&Gl(t,r,!1),st(e,t,i);n=t.stateNode,_f.current=t;var l=a&&typeof r.getDerivedStateFromError!="function"?null:n.render();return t.flags|=1,e!==null&&a?(t.child=wr(t,e.child,null,i),t.child=wr(t,null,l,i)):he(e,t,l,i),t.memoizedState=n.state,o&&Gl(t,r,!0),t.child}function jp(e){var t=e.stateNode;t.pendingContext?Kl(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Kl(e,t.context,!1),Ba(e,t.containerInfo)}function ds(e,t,r,n,o){return yr(),Aa(o),t.flags|=256,he(e,t,r,n),t.child}var Zi={dehydrated:null,treeContext:null,retryLane:0};function ea(e){return{baseLanes:e,cachePool:null,transitions:null}}function Sp(e,t,r){var n=t.pendingProps,o=X.current,i=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(o&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),U(X,o&1),e===null)return Yi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=n.children,e=n.fallback,i?(n=t.mode,i=t.child,a={mode:"hidden",children:a},!(n&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=$o(a,n,0,null),e=Dt(e,n,r,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ea(r),t.memoizedState=Zi,e):Ga(t,a));if(o=e.memoizedState,o!==null&&(l=o.dehydrated,l!==null))return Mf(e,t,a,n,l,o,r);if(i){i=n.fallback,a=t.mode,o=e.child,l=o.sibling;var s={mode:"hidden",children:n.children};return!(a&1)&&t.child!==o?(n=t.child,n.childLanes=0,n.pendingProps=s,t.deletions=null):(n=St(o,s),n.subtreeFlags=o.subtreeFlags&14680064),l!==null?i=St(l,i):(i=Dt(i,a,r,null),i.flags|=2),i.return=t,n.return=t,n.sibling=i,t.child=n,n=i,i=t.child,a=e.child.memoizedState,a=a===null?ea(r):{baseLanes:a.baseLanes|r,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~r,t.memoizedState=Zi,n}return i=e.child,e=i.sibling,n=St(i,{mode:"visible",children:n.children}),!(t.mode&1)&&(n.lanes=r),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n}function Ga(e,t){return t=$o({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function In(e,t,r,n){return n!==null&&Aa(n),wr(t,e.child,null,r),e=Ga(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Mf(e,t,r,n,o,i,a){if(r)return t.flags&256?(t.flags&=-257,n=mi(Error(j(422))),In(e,t,a,n)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=n.fallback,o=t.mode,n=$o({mode:"visible",children:n.children},o,0,null),i=Dt(i,o,a,null),i.flags|=2,n.return=t,i.return=t,n.sibling=i,t.child=n,t.mode&1&&wr(t,e.child,null,a),t.child.memoizedState=ea(a),t.memoizedState=Zi,i);if(!(t.mode&1))return In(e,t,a,null);if(o.data==="$!"){if(n=o.nextSibling&&o.nextSibling.dataset,n)var l=n.dgst;return n=l,i=Error(j(419)),n=mi(i,n,void 0),In(e,t,a,n)}if(l=(a&e.childLanes)!==0,be||l){if(n=ne,n!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(n.suspendedLanes|a)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,lt(e,o),Xe(n,e,o,-1))}return rl(),n=mi(Error(j(421))),In(e,t,a,n)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Yf.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Ne=wt(o.nextSibling),Te=t,W=!0,Ve=null,e!==null&&(Ie[Ae++]=rt,Ie[Ae++]=nt,Ie[Ae++]=$t,rt=e.id,nt=e.overflow,$t=t),t=Ga(t,n.children),t.flags|=4096,t)}function fs(e,t,r){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),Xi(e.return,t,r)}function hi(e,t,r,n,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:r,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=n,i.tail=r,i.tailMode=o)}function zp(e,t,r){var n=t.pendingProps,o=n.revealOrder,i=n.tail;if(he(e,t,n.children,r),n=X.current,n&2)n=n&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&fs(e,r,t);else if(e.tag===19)fs(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}n&=1}if(U(X,n),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(r=t.child,o=null;r!==null;)e=r.alternate,e!==null&&wo(e)===null&&(o=r),r=r.sibling;r=o,r===null?(o=t.child,t.child=null):(o=r.sibling,r.sibling=null),hi(t,!1,o,r,i);break;case"backwards":for(r=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&wo(e)===null){t.child=o;break}e=o.sibling,o.sibling=r,r=o,o=e}hi(t,!0,r,null,i);break;case"together":hi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function qn(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function st(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Bt|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(j(153));if(t.child!==null){for(e=t.child,r=St(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=St(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Lf(e,t,r){switch(t.tag){case 3:jp(t),yr();break;case 5:qc(t);break;case 1:je(t.type)&&mo(t);break;case 4:Ba(t,t.stateNode.containerInfo);break;case 10:var n=t.type._context,o=t.memoizedProps.value;U(vo,n._currentValue),n._currentValue=o;break;case 13:if(n=t.memoizedState,n!==null)return n.dehydrated!==null?(U(X,X.current&1),t.flags|=128,null):r&t.child.childLanes?Sp(e,t,r):(U(X,X.current&1),e=st(e,t,r),e!==null?e.sibling:null);U(X,X.current&1);break;case 19:if(n=(r&t.childLanes)!==0,e.flags&128){if(n)return zp(e,t,r);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),U(X,X.current),n)break;return null;case 22:case 23:return t.lanes=0,bp(e,t,r)}return st(e,t,r)}var Ep,ta,Cp,Pp;Ep=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};ta=function(){};Cp=function(e,t,r,n){var o=e.memoizedProps;if(o!==n){e=t.stateNode,It(Ze.current);var i=null;switch(r){case"input":o=ji(e,o),n=ji(e,n),i=[];break;case"select":o=K({},o,{value:void 0}),n=K({},n,{value:void 0}),i=[];break;case"textarea":o=Ei(e,o),n=Ei(e,n),i=[];break;default:typeof o.onClick!="function"&&typeof n.onClick=="function"&&(e.onclick=uo)}Pi(r,n);var a;r=null;for(p in o)if(!n.hasOwnProperty(p)&&o.hasOwnProperty(p)&&o[p]!=null)if(p==="style"){var l=o[p];for(a in l)l.hasOwnProperty(a)&&(r||(r={}),r[a]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Gr.hasOwnProperty(p)?i||(i=[]):(i=i||[]).push(p,null));for(p in n){var s=n[p];if(l=o!=null?o[p]:void 0,n.hasOwnProperty(p)&&s!==l&&(s!=null||l!=null))if(p==="style")if(l){for(a in l)!l.hasOwnProperty(a)||s&&s.hasOwnProperty(a)||(r||(r={}),r[a]="");for(a in s)s.hasOwnProperty(a)&&l[a]!==s[a]&&(r||(r={}),r[a]=s[a])}else r||(i||(i=[]),i.push(p,r)),r=s;else p==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(i=i||[]).push(p,s)):p==="children"?typeof s!="string"&&typeof s!="number"||(i=i||[]).push(p,""+s):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Gr.hasOwnProperty(p)?(s!=null&&p==="onScroll"&&B("scroll",e),i||l===s||(i=[])):(i=i||[]).push(p,s))}r&&(i=i||[]).push("style",r);var p=i;(t.updateQueue=p)&&(t.flags|=4)}};Pp=function(e,t,r,n){r!==n&&(t.flags|=4)};function Mr(e,t){if(!W)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var n=null;r!==null;)r.alternate!==null&&(n=r),r=r.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,n=0;if(t)for(var o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags&14680064,n|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)r|=o.lanes|o.childLanes,n|=o.subtreeFlags,n|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=n,e.childLanes=r,t}function If(e,t,r){var n=t.pendingProps;switch(Ia(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ue(t),null;case 1:return je(t.type)&&fo(),ue(t),null;case 3:return n=t.stateNode,br(),H(ke),H(fe),Wa(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Mn(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ve!==null&&(ca(Ve),Ve=null))),ta(e,t),ue(t),null;case 5:Ha(t);var o=It(cn.current);if(r=t.type,e!==null&&t.stateNode!=null)Cp(e,t,r,n,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!n){if(t.stateNode===null)throw Error(j(166));return ue(t),null}if(e=It(Ze.current),Mn(t)){n=t.stateNode,r=t.type;var i=t.memoizedProps;switch(n[qe]=t,n[ln]=i,e=(t.mode&1)!==0,r){case"dialog":B("cancel",n),B("close",n);break;case"iframe":case"object":case"embed":B("load",n);break;case"video":case"audio":for(o=0;o<Fr.length;o++)B(Fr[o],n);break;case"source":B("error",n);break;case"img":case"image":case"link":B("error",n),B("load",n);break;case"details":B("toggle",n);break;case"input":kl(n,i),B("invalid",n);break;case"select":n._wrapperState={wasMultiple:!!i.multiple},B("invalid",n);break;case"textarea":Sl(n,i),B("invalid",n)}Pi(r,i),o=null;for(var a in i)if(i.hasOwnProperty(a)){var l=i[a];a==="children"?typeof l=="string"?n.textContent!==l&&(i.suppressHydrationWarning!==!0&&_n(n.textContent,l,e),o=["children",l]):typeof l=="number"&&n.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&_n(n.textContent,l,e),o=["children",""+l]):Gr.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&B("scroll",n)}switch(r){case"input":Sn(n),jl(n,i,!0);break;case"textarea":Sn(n),zl(n);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(n.onclick=uo)}n=o,t.updateQueue=n,n!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=rc(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof n.is=="string"?e=a.createElement(r,{is:n.is}):(e=a.createElement(r),r==="select"&&(a=e,n.multiple?a.multiple=!0:n.size&&(a.size=n.size))):e=a.createElementNS(e,r),e[qe]=t,e[ln]=n,Ep(e,t,!1,!1),t.stateNode=e;e:{switch(a=Ni(r,n),r){case"dialog":B("cancel",e),B("close",e),o=n;break;case"iframe":case"object":case"embed":B("load",e),o=n;break;case"video":case"audio":for(o=0;o<Fr.length;o++)B(Fr[o],e);o=n;break;case"source":B("error",e),o=n;break;case"img":case"image":case"link":B("error",e),B("load",e),o=n;break;case"details":B("toggle",e),o=n;break;case"input":kl(e,n),o=ji(e,n),B("invalid",e);break;case"option":o=n;break;case"select":e._wrapperState={wasMultiple:!!n.multiple},o=K({},n,{value:void 0}),B("invalid",e);break;case"textarea":Sl(e,n),o=Ei(e,n),B("invalid",e);break;default:o=n}Pi(r,o),l=o;for(i in l)if(l.hasOwnProperty(i)){var s=l[i];i==="style"?ic(e,s):i==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&nc(e,s)):i==="children"?typeof s=="string"?(r!=="textarea"||s!=="")&&qr(e,s):typeof s=="number"&&qr(e,""+s):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Gr.hasOwnProperty(i)?s!=null&&i==="onScroll"&&B("scroll",e):s!=null&&wa(e,i,s,a))}switch(r){case"input":Sn(e),jl(e,n,!1);break;case"textarea":Sn(e),zl(e);break;case"option":n.value!=null&&e.setAttribute("value",""+zt(n.value));break;case"select":e.multiple=!!n.multiple,i=n.value,i!=null?ur(e,!!n.multiple,i,!1):n.defaultValue!=null&&ur(e,!!n.multiple,n.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=uo)}switch(r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}}n&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ue(t),null;case 6:if(e&&t.stateNode!=null)Pp(e,t,e.memoizedProps,n);else{if(typeof n!="string"&&t.stateNode===null)throw Error(j(166));if(r=It(cn.current),It(Ze.current),Mn(t)){if(n=t.stateNode,r=t.memoizedProps,n[qe]=t,(i=n.nodeValue!==r)&&(e=Te,e!==null))switch(e.tag){case 3:_n(n.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&_n(n.nodeValue,r,(e.mode&1)!==0)}i&&(t.flags|=4)}else n=(r.nodeType===9?r:r.ownerDocument).createTextNode(n),n[qe]=t,t.stateNode=n}return ue(t),null;case 13:if(H(X),n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(W&&Ne!==null&&t.mode&1&&!(t.flags&128))Yc(),yr(),t.flags|=98560,i=!1;else if(i=Mn(t),n!==null&&n.dehydrated!==null){if(e===null){if(!i)throw Error(j(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(j(317));i[qe]=t}else yr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ue(t),i=!1}else Ve!==null&&(ca(Ve),Ve=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(n=n!==null,n!==(e!==null&&e.memoizedState!==null)&&n&&(t.child.flags|=8192,t.mode&1&&(e===null||X.current&1?te===0&&(te=3):rl())),t.updateQueue!==null&&(t.flags|=4),ue(t),null);case 4:return br(),ta(e,t),e===null&&on(t.stateNode.containerInfo),ue(t),null;case 10:return Fa(t.type._context),ue(t),null;case 17:return je(t.type)&&fo(),ue(t),null;case 19:if(H(X),i=t.memoizedState,i===null)return ue(t),null;if(n=(t.flags&128)!==0,a=i.rendering,a===null)if(n)Mr(i,!1);else{if(te!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=wo(e),a!==null){for(t.flags|=128,Mr(i,!1),n=a.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),t.subtreeFlags=0,n=r,r=t.child;r!==null;)i=r,e=n,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return U(X,X.current&1|2),t.child}e=e.sibling}i.tail!==null&&q()>jr&&(t.flags|=128,n=!0,Mr(i,!1),t.lanes=4194304)}else{if(!n)if(e=wo(a),e!==null){if(t.flags|=128,n=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Mr(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!W)return ue(t),null}else 2*q()-i.renderingStartTime>jr&&r!==1073741824&&(t.flags|=128,n=!0,Mr(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(r=i.last,r!==null?r.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=q(),t.sibling=null,r=X.current,U(X,n?r&1|2:r&1),t):(ue(t),null);case 22:case 23:return tl(),n=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==n&&(t.flags|=8192),n&&t.mode&1?Ce&1073741824&&(ue(t),t.subtreeFlags&6&&(t.flags|=8192)):ue(t),null;case 24:return null;case 25:return null}throw Error(j(156,t.tag))}function Af(e,t){switch(Ia(t),t.tag){case 1:return je(t.type)&&fo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return br(),H(ke),H(fe),Wa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ha(t),null;case 13:if(H(X),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(j(340));yr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(X),null;case 4:return br(),null;case 10:return Fa(t.type._context),null;case 22:case 23:return tl(),null;case 24:return null;default:return null}}var An=!1,de=!1,Df=typeof WeakSet=="function"?WeakSet:Set,N=null;function cr(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(n){G(e,t,n)}else r.current=null}function ra(e,t,r){try{r()}catch(n){G(e,t,n)}}var ms=!1;function Of(e,t){if(Fi=so,e=Mc(),Ma(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var n=r.getSelection&&r.getSelection();if(n&&n.rangeCount!==0){r=n.anchorNode;var o=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{r.nodeType,i.nodeType}catch{r=null;break e}var a=0,l=-1,s=-1,p=0,h=0,g=e,m=null;t:for(;;){for(var x;g!==r||o!==0&&g.nodeType!==3||(l=a+o),g!==i||n!==0&&g.nodeType!==3||(s=a+n),g.nodeType===3&&(a+=g.nodeValue.length),(x=g.firstChild)!==null;)m=g,g=x;for(;;){if(g===e)break t;if(m===r&&++p===o&&(l=a),m===i&&++h===n&&(s=a),(x=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=x}r=l===-1||s===-1?null:{start:l,end:s}}else r=null}r=r||{start:0,end:0}}else r=null;for($i={focusedElem:e,selectionRange:r},so=!1,N=t;N!==null;)if(t=N,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,N=e;else for(;N!==null;){t=N;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var w=v.memoizedProps,E=v.memoizedState,d=t.stateNode,u=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:Be(t.type,w),E);d.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(y){G(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,N=e;break}N=t.return}return v=ms,ms=!1,v}function Yr(e,t,r){var n=t.updateQueue;if(n=n!==null?n.lastEffect:null,n!==null){var o=n=n.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&ra(t,r,i)}o=o.next}while(o!==n)}}function Oo(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var n=r.create;r.destroy=n()}r=r.next}while(r!==t)}}function na(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Np(e){var t=e.alternate;t!==null&&(e.alternate=null,Np(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[qe],delete t[ln],delete t[Hi],delete t[wf],delete t[bf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Tp(e){return e.tag===5||e.tag===3||e.tag===4}function hs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Tp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function oa(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=uo));else if(n!==4&&(e=e.child,e!==null))for(oa(e,t,r),e=e.sibling;e!==null;)oa(e,t,r),e=e.sibling}function ia(e,t,r){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(n!==4&&(e=e.child,e!==null))for(ia(e,t,r),e=e.sibling;e!==null;)ia(e,t,r),e=e.sibling}var ae=null,We=!1;function pt(e,t,r){for(r=r.child;r!==null;)Rp(e,t,r),r=r.sibling}function Rp(e,t,r){if(Je&&typeof Je.onCommitFiberUnmount=="function")try{Je.onCommitFiberUnmount(To,r)}catch{}switch(r.tag){case 5:de||cr(r,t);case 6:var n=ae,o=We;ae=null,pt(e,t,r),ae=n,We=o,ae!==null&&(We?(e=ae,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):ae.removeChild(r.stateNode));break;case 18:ae!==null&&(We?(e=ae,r=r.stateNode,e.nodeType===8?si(e.parentNode,r):e.nodeType===1&&si(e,r),tn(e)):si(ae,r.stateNode));break;case 4:n=ae,o=We,ae=r.stateNode.containerInfo,We=!0,pt(e,t,r),ae=n,We=o;break;case 0:case 11:case 14:case 15:if(!de&&(n=r.updateQueue,n!==null&&(n=n.lastEffect,n!==null))){o=n=n.next;do{var i=o,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&ra(r,t,a),o=o.next}while(o!==n)}pt(e,t,r);break;case 1:if(!de&&(cr(r,t),n=r.stateNode,typeof n.componentWillUnmount=="function"))try{n.props=r.memoizedProps,n.state=r.memoizedState,n.componentWillUnmount()}catch(l){G(r,t,l)}pt(e,t,r);break;case 21:pt(e,t,r);break;case 22:r.mode&1?(de=(n=de)||r.memoizedState!==null,pt(e,t,r),de=n):pt(e,t,r);break;default:pt(e,t,r)}}function gs(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Df),t.forEach(function(n){var o=Xf.bind(null,e,n);r.has(n)||(r.add(n),n.then(o,o))})}}function Ue(e,t){var r=t.deletions;if(r!==null)for(var n=0;n<r.length;n++){var o=r[n];try{var i=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:ae=l.stateNode,We=!1;break e;case 3:ae=l.stateNode.containerInfo,We=!0;break e;case 4:ae=l.stateNode.containerInfo,We=!0;break e}l=l.return}if(ae===null)throw Error(j(160));Rp(i,a,o),ae=null,We=!1;var s=o.alternate;s!==null&&(s.return=null),o.return=null}catch(p){G(o,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)_p(t,e),t=t.sibling}function _p(e,t){var r=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ue(t,e),Ke(e),n&4){try{Yr(3,e,e.return),Oo(3,e)}catch(w){G(e,e.return,w)}try{Yr(5,e,e.return)}catch(w){G(e,e.return,w)}}break;case 1:Ue(t,e),Ke(e),n&512&&r!==null&&cr(r,r.return);break;case 5:if(Ue(t,e),Ke(e),n&512&&r!==null&&cr(r,r.return),e.flags&32){var o=e.stateNode;try{qr(o,"")}catch(w){G(e,e.return,w)}}if(n&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,a=r!==null?r.memoizedProps:i,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&ec(o,i),Ni(l,a);var p=Ni(l,i);for(a=0;a<s.length;a+=2){var h=s[a],g=s[a+1];h==="style"?ic(o,g):h==="dangerouslySetInnerHTML"?nc(o,g):h==="children"?qr(o,g):wa(o,h,g,p)}switch(l){case"input":Si(o,i);break;case"textarea":tc(o,i);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var x=i.value;x!=null?ur(o,!!i.multiple,x,!1):m!==!!i.multiple&&(i.defaultValue!=null?ur(o,!!i.multiple,i.defaultValue,!0):ur(o,!!i.multiple,i.multiple?[]:"",!1))}o[ln]=i}catch(w){G(e,e.return,w)}}break;case 6:if(Ue(t,e),Ke(e),n&4){if(e.stateNode===null)throw Error(j(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(w){G(e,e.return,w)}}break;case 3:if(Ue(t,e),Ke(e),n&4&&r!==null&&r.memoizedState.isDehydrated)try{tn(t.containerInfo)}catch(w){G(e,e.return,w)}break;case 4:Ue(t,e),Ke(e);break;case 13:Ue(t,e),Ke(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Za=q())),n&4&&gs(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(de=(p=de)||h,Ue(t,e),de=p):Ue(t,e),Ke(e),n&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&e.mode&1)for(N=e,h=e.child;h!==null;){for(g=N=h;N!==null;){switch(m=N,x=m.child,m.tag){case 0:case 11:case 14:case 15:Yr(4,m,m.return);break;case 1:cr(m,m.return);var v=m.stateNode;if(typeof v.componentWillUnmount=="function"){n=m,r=m.return;try{t=n,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(w){G(n,r,w)}}break;case 5:cr(m,m.return);break;case 22:if(m.memoizedState!==null){xs(g);continue}}x!==null?(x.return=m,N=x):xs(g)}h=h.sibling}e:for(h=null,g=e;;){if(g.tag===5){if(h===null){h=g;try{o=g.stateNode,p?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=g.stateNode,s=g.memoizedProps.style,a=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=oc("display",a))}catch(w){G(e,e.return,w)}}}else if(g.tag===6){if(h===null)try{g.stateNode.nodeValue=p?"":g.memoizedProps}catch(w){G(e,e.return,w)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;h===g&&(h=null),g=g.return}h===g&&(h=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Ue(t,e),Ke(e),n&4&&gs(e);break;case 21:break;default:Ue(t,e),Ke(e)}}function Ke(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Tp(r)){var n=r;break e}r=r.return}throw Error(j(160))}switch(n.tag){case 5:var o=n.stateNode;n.flags&32&&(qr(o,""),n.flags&=-33);var i=hs(e);ia(e,i,o);break;case 3:case 4:var a=n.stateNode.containerInfo,l=hs(e);oa(e,l,a);break;default:throw Error(j(161))}}catch(s){G(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ff(e,t,r){N=e,Mp(e)}function Mp(e,t,r){for(var n=(e.mode&1)!==0;N!==null;){var o=N,i=o.child;if(o.tag===22&&n){var a=o.memoizedState!==null||An;if(!a){var l=o.alternate,s=l!==null&&l.memoizedState!==null||de;l=An;var p=de;if(An=a,(de=s)&&!p)for(N=o;N!==null;)a=N,s=a.child,a.tag===22&&a.memoizedState!==null?ys(o):s!==null?(s.return=a,N=s):ys(o);for(;i!==null;)N=i,Mp(i),i=i.sibling;N=o,An=l,de=p}vs(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,N=i):vs(e)}}function vs(e){for(;N!==null;){var t=N;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:de||Oo(5,t);break;case 1:var n=t.stateNode;if(t.flags&4&&!de)if(r===null)n.componentDidMount();else{var o=t.elementType===t.type?r.memoizedProps:Be(t.type,r.memoizedProps);n.componentDidUpdate(o,r.memoizedState,n.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&ts(t,i,n);break;case 3:var a=t.updateQueue;if(a!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}ts(t,a,r)}break;case 5:var l=t.stateNode;if(r===null&&t.flags&4){r=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&r.focus();break;case"img":s.src&&(r.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var g=h.dehydrated;g!==null&&tn(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}de||t.flags&512&&na(t)}catch(m){G(t,t.return,m)}}if(t===e){N=null;break}if(r=t.sibling,r!==null){r.return=t.return,N=r;break}N=t.return}}function xs(e){for(;N!==null;){var t=N;if(t===e){N=null;break}var r=t.sibling;if(r!==null){r.return=t.return,N=r;break}N=t.return}}function ys(e){for(;N!==null;){var t=N;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{Oo(4,t)}catch(s){G(t,r,s)}break;case 1:var n=t.stateNode;if(typeof n.componentDidMount=="function"){var o=t.return;try{n.componentDidMount()}catch(s){G(t,o,s)}}var i=t.return;try{na(t)}catch(s){G(t,i,s)}break;case 5:var a=t.return;try{na(t)}catch(s){G(t,a,s)}}}catch(s){G(t,t.return,s)}if(t===e){N=null;break}var l=t.sibling;if(l!==null){l.return=t.return,N=l;break}N=t.return}}var $f=Math.ceil,jo=ct.ReactCurrentDispatcher,qa=ct.ReactCurrentOwner,Oe=ct.ReactCurrentBatchConfig,O=0,ne=null,Z=null,le=0,Ce=0,pr=Pt(0),te=0,fn=null,Bt=0,Fo=0,Ja=0,Xr=null,ye=null,Za=0,jr=1/0,et=null,So=!1,aa=null,kt=null,Dn=!1,gt=null,zo=0,Qr=0,la=null,Jn=-1,Zn=0;function ge(){return O&6?q():Jn!==-1?Jn:Jn=q()}function jt(e){return e.mode&1?O&2&&le!==0?le&-le:jf.transition!==null?(Zn===0&&(Zn=vc()),Zn):(e=$,e!==0||(e=window.event,e=e===void 0?16:Sc(e.type)),e):1}function Xe(e,t,r,n){if(50<Qr)throw Qr=0,la=null,Error(j(185));gn(e,r,n),(!(O&2)||e!==ne)&&(e===ne&&(!(O&2)&&(Fo|=r),te===4&&mt(e,le)),Se(e,n),r===1&&O===0&&!(t.mode&1)&&(jr=q()+500,Io&&Nt()))}function Se(e,t){var r=e.callbackNode;kd(e,t);var n=lo(e,e===ne?le:0);if(n===0)r!==null&&Pl(r),e.callbackNode=null,e.callbackPriority=0;else if(t=n&-n,e.callbackPriority!==t){if(r!=null&&Pl(r),t===1)e.tag===0?kf(ws.bind(null,e)):Hc(ws.bind(null,e)),xf(function(){!(O&6)&&Nt()}),r=null;else{switch(xc(n)){case 1:r=za;break;case 4:r=hc;break;case 16:r=ao;break;case 536870912:r=gc;break;default:r=ao}r=Up(r,Lp.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function Lp(e,t){if(Jn=-1,Zn=0,O&6)throw Error(j(327));var r=e.callbackNode;if(gr()&&e.callbackNode!==r)return null;var n=lo(e,e===ne?le:0);if(n===0)return null;if(n&30||n&e.expiredLanes||t)t=Eo(e,n);else{t=n;var o=O;O|=2;var i=Ap();(ne!==e||le!==t)&&(et=null,jr=q()+500,At(e,t));do try{Hf();break}catch(l){Ip(e,l)}while(!0);Oa(),jo.current=i,O=o,Z!==null?t=0:(ne=null,le=0,t=te)}if(t!==0){if(t===2&&(o=Li(e),o!==0&&(n=o,t=sa(e,o))),t===1)throw r=fn,At(e,0),mt(e,n),Se(e,q()),r;if(t===6)mt(e,n);else{if(o=e.current.alternate,!(n&30)&&!Uf(o)&&(t=Eo(e,n),t===2&&(i=Li(e),i!==0&&(n=i,t=sa(e,i))),t===1))throw r=fn,At(e,0),mt(e,n),Se(e,q()),r;switch(e.finishedWork=o,e.finishedLanes=n,t){case 0:case 1:throw Error(j(345));case 2:_t(e,ye,et);break;case 3:if(mt(e,n),(n&130023424)===n&&(t=Za+500-q(),10<t)){if(lo(e,0)!==0)break;if(o=e.suspendedLanes,(o&n)!==n){ge(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Bi(_t.bind(null,e,ye,et),t);break}_t(e,ye,et);break;case 4:if(mt(e,n),(n&4194240)===n)break;for(t=e.eventTimes,o=-1;0<n;){var a=31-Ye(n);i=1<<a,a=t[a],a>o&&(o=a),n&=~i}if(n=o,n=q()-n,n=(120>n?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*$f(n/1960))-n,10<n){e.timeoutHandle=Bi(_t.bind(null,e,ye,et),n);break}_t(e,ye,et);break;case 5:_t(e,ye,et);break;default:throw Error(j(329))}}}return Se(e,q()),e.callbackNode===r?Lp.bind(null,e):null}function sa(e,t){var r=Xr;return e.current.memoizedState.isDehydrated&&(At(e,t).flags|=256),e=Eo(e,t),e!==2&&(t=ye,ye=r,t!==null&&ca(t)),e}function ca(e){ye===null?ye=e:ye.push.apply(ye,e)}function Uf(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var n=0;n<r.length;n++){var o=r[n],i=o.getSnapshot;o=o.value;try{if(!Qe(i(),o))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function mt(e,t){for(t&=~Ja,t&=~Fo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Ye(t),n=1<<r;e[r]=-1,t&=~n}}function ws(e){if(O&6)throw Error(j(327));gr();var t=lo(e,0);if(!(t&1))return Se(e,q()),null;var r=Eo(e,t);if(e.tag!==0&&r===2){var n=Li(e);n!==0&&(t=n,r=sa(e,n))}if(r===1)throw r=fn,At(e,0),mt(e,t),Se(e,q()),r;if(r===6)throw Error(j(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,_t(e,ye,et),Se(e,q()),null}function el(e,t){var r=O;O|=1;try{return e(t)}finally{O=r,O===0&&(jr=q()+500,Io&&Nt())}}function Ht(e){gt!==null&&gt.tag===0&&!(O&6)&&gr();var t=O;O|=1;var r=Oe.transition,n=$;try{if(Oe.transition=null,$=1,e)return e()}finally{$=n,Oe.transition=r,O=t,!(O&6)&&Nt()}}function tl(){Ce=pr.current,H(pr)}function At(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,vf(r)),Z!==null)for(r=Z.return;r!==null;){var n=r;switch(Ia(n),n.tag){case 1:n=n.type.childContextTypes,n!=null&&fo();break;case 3:br(),H(ke),H(fe),Wa();break;case 5:Ha(n);break;case 4:br();break;case 13:H(X);break;case 19:H(X);break;case 10:Fa(n.type._context);break;case 22:case 23:tl()}r=r.return}if(ne=e,Z=e=St(e.current,null),le=Ce=t,te=0,fn=null,Ja=Fo=Bt=0,ye=Xr=null,Lt!==null){for(t=0;t<Lt.length;t++)if(r=Lt[t],n=r.interleaved,n!==null){r.interleaved=null;var o=n.next,i=r.pending;if(i!==null){var a=i.next;i.next=o,n.next=a}r.pending=n}Lt=null}return e}function Ip(e,t){do{var r=Z;try{if(Oa(),Kn.current=ko,bo){for(var n=Q.memoizedState;n!==null;){var o=n.queue;o!==null&&(o.pending=null),n=n.next}bo=!1}if(Ut=0,re=ee=Q=null,Vr=!1,pn=0,qa.current=null,r===null||r.return===null){te=1,fn=t,Z=null;break}e:{var i=e,a=r.return,l=r,s=t;if(t=le,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=s,h=l,g=h.tag;if(!(h.mode&1)&&(g===0||g===11||g===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var x=ls(a);if(x!==null){x.flags&=-257,ss(x,a,l,i,t),x.mode&1&&as(i,p,t),t=x,s=p;var v=t.updateQueue;if(v===null){var w=new Set;w.add(s),t.updateQueue=w}else v.add(s);break e}else{if(!(t&1)){as(i,p,t),rl();break e}s=Error(j(426))}}else if(W&&l.mode&1){var E=ls(a);if(E!==null){!(E.flags&65536)&&(E.flags|=256),ss(E,a,l,i,t),Aa(kr(s,l));break e}}i=s=kr(s,l),te!==4&&(te=2),Xr===null?Xr=[i]:Xr.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var d=xp(i,s,t);es(i,d);break e;case 1:l=s;var u=i.type,f=i.stateNode;if(!(i.flags&128)&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(kt===null||!kt.has(f)))){i.flags|=65536,t&=-t,i.lanes|=t;var y=yp(i,l,t);es(i,y);break e}}i=i.return}while(i!==null)}Op(r)}catch(S){t=S,Z===r&&r!==null&&(Z=r=r.return);continue}break}while(!0)}function Ap(){var e=jo.current;return jo.current=ko,e===null?ko:e}function rl(){(te===0||te===3||te===2)&&(te=4),ne===null||!(Bt&268435455)&&!(Fo&268435455)||mt(ne,le)}function Eo(e,t){var r=O;O|=2;var n=Ap();(ne!==e||le!==t)&&(et=null,At(e,t));do try{Bf();break}catch(o){Ip(e,o)}while(!0);if(Oa(),O=r,jo.current=n,Z!==null)throw Error(j(261));return ne=null,le=0,te}function Bf(){for(;Z!==null;)Dp(Z)}function Hf(){for(;Z!==null&&!fd();)Dp(Z)}function Dp(e){var t=$p(e.alternate,e,Ce);e.memoizedProps=e.pendingProps,t===null?Op(e):Z=t,qa.current=null}function Op(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=Af(r,t),r!==null){r.flags&=32767,Z=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{te=6,Z=null;return}}else if(r=If(r,t,Ce),r!==null){Z=r;return}if(t=t.sibling,t!==null){Z=t;return}Z=t=e}while(t!==null);te===0&&(te=5)}function _t(e,t,r){var n=$,o=Oe.transition;try{Oe.transition=null,$=1,Wf(e,t,r,n)}finally{Oe.transition=o,$=n}return null}function Wf(e,t,r,n){do gr();while(gt!==null);if(O&6)throw Error(j(327));r=e.finishedWork;var o=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(j(177));e.callbackNode=null,e.callbackPriority=0;var i=r.lanes|r.childLanes;if(jd(e,i),e===ne&&(Z=ne=null,le=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Dn||(Dn=!0,Up(ao,function(){return gr(),null})),i=(r.flags&15990)!==0,r.subtreeFlags&15990||i){i=Oe.transition,Oe.transition=null;var a=$;$=1;var l=O;O|=4,qa.current=null,Of(e,r),_p(r,e),pf($i),so=!!Fi,$i=Fi=null,e.current=r,Ff(r),md(),O=l,$=a,Oe.transition=i}else e.current=r;if(Dn&&(Dn=!1,gt=e,zo=o),i=e.pendingLanes,i===0&&(kt=null),vd(r.stateNode),Se(e,q()),t!==null)for(n=e.onRecoverableError,r=0;r<t.length;r++)o=t[r],n(o.value,{componentStack:o.stack,digest:o.digest});if(So)throw So=!1,e=aa,aa=null,e;return zo&1&&e.tag!==0&&gr(),i=e.pendingLanes,i&1?e===la?Qr++:(Qr=0,la=e):Qr=0,Nt(),null}function gr(){if(gt!==null){var e=xc(zo),t=Oe.transition,r=$;try{if(Oe.transition=null,$=16>e?16:e,gt===null)var n=!1;else{if(e=gt,gt=null,zo=0,O&6)throw Error(j(331));var o=O;for(O|=4,N=e.current;N!==null;){var i=N,a=i.child;if(N.flags&16){var l=i.deletions;if(l!==null){for(var s=0;s<l.length;s++){var p=l[s];for(N=p;N!==null;){var h=N;switch(h.tag){case 0:case 11:case 15:Yr(8,h,i)}var g=h.child;if(g!==null)g.return=h,N=g;else for(;N!==null;){h=N;var m=h.sibling,x=h.return;if(Np(h),h===p){N=null;break}if(m!==null){m.return=x,N=m;break}N=x}}}var v=i.alternate;if(v!==null){var w=v.child;if(w!==null){v.child=null;do{var E=w.sibling;w.sibling=null,w=E}while(w!==null)}}N=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,N=a;else e:for(;N!==null;){if(i=N,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Yr(9,i,i.return)}var d=i.sibling;if(d!==null){d.return=i.return,N=d;break e}N=i.return}}var u=e.current;for(N=u;N!==null;){a=N;var f=a.child;if(a.subtreeFlags&2064&&f!==null)f.return=a,N=f;else e:for(a=u;N!==null;){if(l=N,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Oo(9,l)}}catch(S){G(l,l.return,S)}if(l===a){N=null;break e}var y=l.sibling;if(y!==null){y.return=l.return,N=y;break e}N=l.return}}if(O=o,Nt(),Je&&typeof Je.onPostCommitFiberRoot=="function")try{Je.onPostCommitFiberRoot(To,e)}catch{}n=!0}return n}finally{$=r,Oe.transition=t}}return!1}function bs(e,t,r){t=kr(r,t),t=xp(e,t,1),e=bt(e,t,1),t=ge(),e!==null&&(gn(e,1,t),Se(e,t))}function G(e,t,r){if(e.tag===3)bs(e,e,r);else for(;t!==null;){if(t.tag===3){bs(t,e,r);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(kt===null||!kt.has(n))){e=kr(r,e),e=yp(t,e,1),t=bt(t,e,1),e=ge(),t!==null&&(gn(t,1,e),Se(t,e));break}}t=t.return}}function Vf(e,t,r){var n=e.pingCache;n!==null&&n.delete(t),t=ge(),e.pingedLanes|=e.suspendedLanes&r,ne===e&&(le&r)===r&&(te===4||te===3&&(le&130023424)===le&&500>q()-Za?At(e,0):Ja|=r),Se(e,t)}function Fp(e,t){t===0&&(e.mode&1?(t=Cn,Cn<<=1,!(Cn&130023424)&&(Cn=4194304)):t=1);var r=ge();e=lt(e,t),e!==null&&(gn(e,t,r),Se(e,r))}function Yf(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Fp(e,r)}function Xf(e,t){var r=0;switch(e.tag){case 13:var n=e.stateNode,o=e.memoizedState;o!==null&&(r=o.retryLane);break;case 19:n=e.stateNode;break;default:throw Error(j(314))}n!==null&&n.delete(t),Fp(e,r)}var $p;$p=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||ke.current)be=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return be=!1,Lf(e,t,r);be=!!(e.flags&131072)}else be=!1,W&&t.flags&1048576&&Wc(t,go,t.index);switch(t.lanes=0,t.tag){case 2:var n=t.type;qn(e,t),e=t.pendingProps;var o=xr(t,fe.current);hr(t,r),o=Ya(null,t,n,e,o,r);var i=Xa();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,je(n)?(i=!0,mo(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ua(t),o.updater=Do,t.stateNode=o,o._reactInternals=t,Ki(t,n,e,r),t=Ji(null,t,n,!0,i,r)):(t.tag=0,W&&i&&La(t),he(null,t,o,r),t=t.child),t;case 16:n=t.elementType;e:{switch(qn(e,t),e=t.pendingProps,o=n._init,n=o(n._payload),t.type=n,o=t.tag=Kf(n),e=Be(n,e),o){case 0:t=qi(null,t,n,e,r);break e;case 1:t=us(null,t,n,e,r);break e;case 11:t=cs(null,t,n,e,r);break e;case 14:t=ps(null,t,n,Be(n.type,e),r);break e}throw Error(j(306,n,""))}return t;case 0:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Be(n,o),qi(e,t,n,o,r);case 1:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Be(n,o),us(e,t,n,o,r);case 3:e:{if(jp(t),e===null)throw Error(j(387));n=t.pendingProps,i=t.memoizedState,o=i.element,Gc(e,t),yo(t,n,null,r);var a=t.memoizedState;if(n=a.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=kr(Error(j(423)),t),t=ds(e,t,n,r,o);break e}else if(n!==o){o=kr(Error(j(424)),t),t=ds(e,t,n,r,o);break e}else for(Ne=wt(t.stateNode.containerInfo.firstChild),Te=t,W=!0,Ve=null,r=Qc(t,null,n,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(yr(),n===o){t=st(e,t,r);break e}he(e,t,n,r)}t=t.child}return t;case 5:return qc(t),e===null&&Yi(t),n=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,a=o.children,Ui(n,o)?a=null:i!==null&&Ui(n,i)&&(t.flags|=32),kp(e,t),he(e,t,a,r),t.child;case 6:return e===null&&Yi(t),null;case 13:return Sp(e,t,r);case 4:return Ba(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=wr(t,null,n,r):he(e,t,n,r),t.child;case 11:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Be(n,o),cs(e,t,n,o,r);case 7:return he(e,t,t.pendingProps,r),t.child;case 8:return he(e,t,t.pendingProps.children,r),t.child;case 12:return he(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(n=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value,U(vo,n._currentValue),n._currentValue=a,i!==null)if(Qe(i.value,a)){if(i.children===o.children&&!ke.current){t=st(e,t,r);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){a=i.child;for(var s=l.firstContext;s!==null;){if(s.context===n){if(i.tag===1){s=ot(-1,r&-r),s.tag=2;var p=i.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?s.next=s:(s.next=h.next,h.next=s),p.pending=s}}i.lanes|=r,s=i.alternate,s!==null&&(s.lanes|=r),Xi(i.return,r,t),l.lanes|=r;break}s=s.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(j(341));a.lanes|=r,l=a.alternate,l!==null&&(l.lanes|=r),Xi(a,r,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}he(e,t,o.children,r),t=t.child}return t;case 9:return o=t.type,n=t.pendingProps.children,hr(t,r),o=Fe(o),n=n(o),t.flags|=1,he(e,t,n,r),t.child;case 14:return n=t.type,o=Be(n,t.pendingProps),o=Be(n.type,o),ps(e,t,n,o,r);case 15:return wp(e,t,t.type,t.pendingProps,r);case 17:return n=t.type,o=t.pendingProps,o=t.elementType===n?o:Be(n,o),qn(e,t),t.tag=1,je(n)?(e=!0,mo(t)):e=!1,hr(t,r),vp(t,n,o),Ki(t,n,o,r),Ji(null,t,n,!0,e,r);case 19:return zp(e,t,r);case 22:return bp(e,t,r)}throw Error(j(156,t.tag))};function Up(e,t){return mc(e,t)}function Qf(e,t,r,n){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(e,t,r,n){return new Qf(e,t,r,n)}function nl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Kf(e){if(typeof e=="function")return nl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ka)return 11;if(e===ja)return 14}return 2}function St(e,t){var r=e.alternate;return r===null?(r=De(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function eo(e,t,r,n,o,i){var a=2;if(n=e,typeof e=="function")nl(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case er:return Dt(r.children,o,i,t);case ba:a=8,o|=8;break;case yi:return e=De(12,r,t,o|2),e.elementType=yi,e.lanes=i,e;case wi:return e=De(13,r,t,o),e.elementType=wi,e.lanes=i,e;case bi:return e=De(19,r,t,o),e.elementType=bi,e.lanes=i,e;case qs:return $o(r,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ks:a=10;break e;case Gs:a=9;break e;case ka:a=11;break e;case ja:a=14;break e;case ut:a=16,n=null;break e}throw Error(j(130,e==null?e:typeof e,""))}return t=De(a,r,t,o),t.elementType=e,t.type=n,t.lanes=i,t}function Dt(e,t,r,n){return e=De(7,e,n,t),e.lanes=r,e}function $o(e,t,r,n){return e=De(22,e,n,t),e.elementType=qs,e.lanes=r,e.stateNode={isHidden:!1},e}function gi(e,t,r){return e=De(6,e,null,t),e.lanes=r,e}function vi(e,t,r){return t=De(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Gf(e,t,r,n,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=qo(0),this.expirationTimes=qo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qo(0),this.identifierPrefix=n,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function ol(e,t,r,n,o,i,a,l,s){return e=new Gf(e,t,r,l,s),t===1?(t=1,i===!0&&(t|=8)):t=0,i=De(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:n,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ua(i),e}function qf(e,t,r){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Zt,key:n==null?null:""+n,children:e,containerInfo:t,implementation:r}}function Bp(e){if(!e)return Et;e=e._reactInternals;e:{if(Vt(e)!==e||e.tag!==1)throw Error(j(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(je(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(j(171))}if(e.tag===1){var r=e.type;if(je(r))return Bc(e,r,t)}return t}function Hp(e,t,r,n,o,i,a,l,s){return e=ol(r,n,!0,e,o,i,a,l,s),e.context=Bp(null),r=e.current,n=ge(),o=jt(r),i=ot(n,o),i.callback=t??null,bt(r,i,o),e.current.lanes=o,gn(e,o,n),Se(e,n),e}function Uo(e,t,r,n){var o=t.current,i=ge(),a=jt(o);return r=Bp(r),t.context===null?t.context=r:t.pendingContext=r,t=ot(i,a),t.payload={element:e},n=n===void 0?null:n,n!==null&&(t.callback=n),e=bt(o,t,a),e!==null&&(Xe(e,o,a,i),Qn(e,o,a)),a}function Co(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ks(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function il(e,t){ks(e,t),(e=e.alternate)&&ks(e,t)}function Jf(){return null}var Wp=typeof reportError=="function"?reportError:function(e){console.error(e)};function al(e){this._internalRoot=e}Bo.prototype.render=al.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(j(409));Uo(e,t,null,null)};Bo.prototype.unmount=al.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ht(function(){Uo(null,e,null,null)}),t[at]=null}};function Bo(e){this._internalRoot=e}Bo.prototype.unstable_scheduleHydration=function(e){if(e){var t=bc();e={blockedOn:null,target:e,priority:t};for(var r=0;r<ft.length&&t!==0&&t<ft[r].priority;r++);ft.splice(r,0,e),r===0&&jc(e)}};function ll(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ho(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function js(){}function Zf(e,t,r,n,o){if(o){if(typeof n=="function"){var i=n;n=function(){var p=Co(a);i.call(p)}}var a=Hp(t,n,e,0,null,!1,!1,"",js);return e._reactRootContainer=a,e[at]=a.current,on(e.nodeType===8?e.parentNode:e),Ht(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof n=="function"){var l=n;n=function(){var p=Co(s);l.call(p)}}var s=ol(e,0,!1,null,null,!1,!1,"",js);return e._reactRootContainer=s,e[at]=s.current,on(e.nodeType===8?e.parentNode:e),Ht(function(){Uo(t,s,r,n)}),s}function Wo(e,t,r,n,o){var i=r._reactRootContainer;if(i){var a=i;if(typeof o=="function"){var l=o;o=function(){var s=Co(a);l.call(s)}}Uo(t,a,e,o)}else a=Zf(r,t,e,o,n);return Co(a)}yc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Or(t.pendingLanes);r!==0&&(Ea(t,r|1),Se(t,q()),!(O&6)&&(jr=q()+500,Nt()))}break;case 13:Ht(function(){var n=lt(e,1);if(n!==null){var o=ge();Xe(n,e,1,o)}}),il(e,1)}};Ca=function(e){if(e.tag===13){var t=lt(e,134217728);if(t!==null){var r=ge();Xe(t,e,134217728,r)}il(e,134217728)}};wc=function(e){if(e.tag===13){var t=jt(e),r=lt(e,t);if(r!==null){var n=ge();Xe(r,e,t,n)}il(e,t)}};bc=function(){return $};kc=function(e,t){var r=$;try{return $=e,t()}finally{$=r}};Ri=function(e,t,r){switch(t){case"input":if(Si(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var n=r[t];if(n!==e&&n.form===e.form){var o=Lo(n);if(!o)throw Error(j(90));Zs(n),Si(n,o)}}}break;case"textarea":tc(e,r);break;case"select":t=r.value,t!=null&&ur(e,!!r.multiple,t,!1)}};sc=el;cc=Ht;var em={usingClientEntryPoint:!1,Events:[xn,or,Lo,ac,lc,el]},Lr={findFiberByHostInstance:Mt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},tm={bundleType:Lr.bundleType,version:Lr.version,rendererPackageName:Lr.rendererPackageName,rendererConfig:Lr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ct.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=dc(e),e===null?null:e.stateNode},findFiberByHostInstance:Lr.findFiberByHostInstance||Jf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var On=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!On.isDisabled&&On.supportsFiber)try{To=On.inject(tm),Je=On}catch{}}_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=em;_e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ll(t))throw Error(j(200));return qf(e,t,null,r)};_e.createRoot=function(e,t){if(!ll(e))throw Error(j(299));var r=!1,n="",o=Wp;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=ol(e,1,!1,null,null,r,!1,n,o),e[at]=t.current,on(e.nodeType===8?e.parentNode:e),new al(t)};_e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(j(188)):(e=Object.keys(e).join(","),Error(j(268,e)));return e=dc(t),e=e===null?null:e.stateNode,e};_e.flushSync=function(e){return Ht(e)};_e.hydrate=function(e,t,r){if(!Ho(t))throw Error(j(200));return Wo(null,e,t,!0,r)};_e.hydrateRoot=function(e,t,r){if(!ll(e))throw Error(j(405));var n=r!=null&&r.hydratedSources||null,o=!1,i="",a=Wp;if(r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(i=r.identifierPrefix),r.onRecoverableError!==void 0&&(a=r.onRecoverableError)),t=Hp(t,null,e,1,r??null,o,!1,i,a),e[at]=t.current,on(e),n)for(e=0;e<n.length;e++)r=n[e],o=r._getVersion,o=o(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,o]:t.mutableSourceEagerHydrationData.push(r,o);return new Bo(t)};_e.render=function(e,t,r){if(!Ho(t))throw Error(j(200));return Wo(null,e,t,!1,r)};_e.unmountComponentAtNode=function(e){if(!Ho(e))throw Error(j(40));return e._reactRootContainer?(Ht(function(){Wo(null,null,e,!1,function(){e._reactRootContainer=null,e[at]=null})}),!0):!1};_e.unstable_batchedUpdates=el;_e.unstable_renderSubtreeIntoContainer=function(e,t,r,n){if(!Ho(r))throw Error(j(200));if(e==null||e._reactInternals===void 0)throw Error(j(38));return Wo(e,t,r,!1,n)};_e.version="18.3.1-next-f1338f8080-20240426";function Vp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vp)}catch(e){console.error(e)}}Vp(),Vs.exports=_e;var rm=Vs.exports,Yp,Ss=rm;Yp=Ss.createRoot,Ss.hydrateRoot;const nm="/prerak-portfolio/assets/lore-guide-persona-kgNOHx1r.webp",om=new Set(["github.com","www.github.com","linkedin.com","www.linkedin.com"]);function Yt(e,t=new WeakSet){return!e||typeof e!="object"||t.has(e)||(t.add(e),Object.freeze(e),Object.values(e).forEach(r=>Yt(r,t))),e}function sl(e){return String(e??"").replace(/[\u0000-\u001F\u007F]/g,"").trim()}function we(e,t){const r=String(e).replace(/\/?$/,"/"),n=sl(t).replace(/^\/+/,"");if(!/^[\w./-]+$/.test(n)||n.includes(".."))throw new Error(`Unsafe asset path: ${t}`);return`${r}${n}`}function to(e){const t=new URL(e);if(t.protocol!=="https:"||!om.has(t.hostname.toLowerCase()))throw new Error(`External URL is not allowlisted: ${e}`);return t.toString()}function Xp(e){const t=sl(e);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))throw new Error(`Invalid email address: ${e}`);return`mailto:${t}`}function Po(e){const t=sl(e),r=/^https:\/\//i.test(t);if(r&&to(t),/^\s*javascript:/i.test(t))throw new Error("Unsafe javascript: link blocked");return r?{target:"_blank",rel:"noreferrer noopener"}:{}}function im({profile:e,projects:t,personalProjects:r}){to(e.github),to(e.linkedin),Xp(e.email),t.forEach(n=>{var o;(o=n.actions)==null||o.forEach(i=>{if(/^https:\/\//i.test(i.href)&&to(i.href),/^\s*javascript:/i.test(i.href))throw new Error(`Unsafe project action link: ${i.label}`)})}),r.forEach(n=>{var o;(o=n.media)==null||o.forEach(i=>{["src","poster"].forEach(a=>{if(i[a]&&/^\s*javascript:/i.test(i[a]))throw new Error(`Unsafe media ${a} in ${n.meta}`)})})})}const zs="/prerak-portfolio/",mn={name:"Prerak Pandey",title:"Backend / Full-Stack Engineer",tagline:"building game-technology systems",location:"Chicago, IL · Open to Amsterdam / relocation",email:"prerak.pandey7@gmail.com",github:"https://github.com/prerak7-dev",linkedin:"https://www.linkedin.com/in/prerak-pandey",resume:we(zs,"Prerak_Pandey_Resume.pdf"),photo:we(zs,"profile-photo.png")},am=[{id:"hero",label:"Intro",title:"Backend + Game Tech",note:"positioning"},{id:"tab-content",label:"Content",title:"Tabbed Portfolio",note:"selected view"},{id:"contact",label:"Contact",title:"Next Step",note:"links"}],cl=[{number:"01",title:"Aegis Animation Pipeline",eyebrow:"Java / Spring Boot / Redis / Kafka",architectureKey:"pipeline",summary:"Designed an asynchronous processing system that decouples motion-data ingestion, transformation, job state, validation, and Unreal export.",tags:["Java","Spring Boot","Kafka","Redis","JSON","Validation"],flow:["mocap","ingest","kafka","redis","json","unreal"],caseStudy:[["Problem","Motion data work can become brittle when ingestion, processing, retries, and export concerns live in the same path."],["Role","Designed the service boundaries, job-state model, validation flow, and Unreal-facing output contract."],["Architecture","Spring Boot services communicate across Kafka topics while Redis tracks progress, metadata, retries, and failure state."],["Decision","Kept async boundaries explicit so processing can fail, retry, or be inspected without blocking ingest or export."],["Evidence","Repository includes the pipeline source, service structure, JSON overlay contract, and validation-oriented implementation."],["Result","A traceable path from uploaded motion data to Unreal-importable procedural animation overlays."]],bullets:["Kafka-separated ingestion, processing, validation, and publishing flow.","Redis-backed job state for progress tracking, retries, and fault isolation.","JSON overlay output designed for Unreal procedural-animation import.","Clear async boundaries between service responsibilities and Unreal-facing artifacts."],actions:[{label:"View repository",href:"https://github.com/prerak7-dev/AegisMotionSandbox"},{label:"See architecture",href:"#pipeline-architecture"}]},{number:"02",title:"Aegis Motion Plugin",eyebrow:"Unreal Engine C++ / Editor Tooling",architectureKey:"plugin",summary:"A curve-driven Unreal Engine plugin for procedural animation authoring, runtime pose driving, data-asset workflows, and debug visualization.",tags:["Unreal C++","Data Assets","Editor Tools","Animation Curves","Blueprint API"],flow:["data asset","curves","driver","blueprint","debug","runtime"],caseStudy:[["Problem","Procedural animation tools need authorable data, runtime controls, and editor visibility to be useful during iteration."],["Role","Built the Unreal-side tool surface: data assets, runtime driver behavior, debug overlays, and Blueprint-facing integration."],["Architecture","Animation curves and data assets drive runtime pose behavior while editor tooling keeps iteration inspectable."],["Decision","Favored explicit authored assets over hidden runtime assumptions so designers and engineers can reason about motion changes."],["Evidence","Repository contains the Unreal sandbox and plugin work that connects generated motion data to in-engine workflows."],["Result","A practical bridge from backend-generated animation data into Unreal authoring and runtime experimentation."]],bullets:["Procedural motion driver using authored data assets and animation curves.","Runtime smoothing, action playback, debug overlays, and editor-first iteration.","Designed to connect backend-generated animation data to Unreal workflows.","Exposes motion behavior through practical editor and Blueprint-facing surfaces."],actions:[{label:"View repository",href:"https://github.com/prerak7-dev/AegisMotionSandbox"},{label:"See architecture",href:"#plugin-architecture"}]},{number:"03",title:"Aegis Telemetry Analytics Tool",eyebrow:"Analytics / Telemetry / Tooling",architectureKey:"telemetry",summary:"A telemetry analytics project for turning event streams and gameplay/system signals into inspectable trends, operational questions, and engineering feedback.",tags:["Telemetry","Analytics","Data Modeling","Dashboards","Developer Tools"],flow:["events","ingest","model","query","signals","insight"],caseStudy:[["Problem","Raw telemetry is difficult to use when events are not shaped into clear questions, trends, and decisions."],["Role","Built the project as a separate analytics-focused proof point to show data workflow, product thinking, and engineering range beyond the animation pipeline."],["Architecture","Synthetic traffic flows into a FastAPI collector, through Redpanda topics, into a realtime processor, then into ClickHouse tables that power the Streamlit dashboard."],["Decision","Keeps the analytics surface separate from the animation pipeline so the work shows a different production-adjacent context."],["Evidence","Repository provides the implementation space for telemetry modeling, analysis views, and documentation as the tool evolves."],["Result","Adds a distinct data-platform project beside the Aegis game-tech systems and broadens the technical evidence set."]],bullets:["Frames telemetry as product and engineering evidence, not just raw event logging.","Separates event shape, analysis questions, and presentation concerns.","Adds a third project context beyond animation pipeline and Unreal plugin work.","Designed to grow into dashboards, test fixtures, sample events, and benchmark notes."],actions:[{label:"View repository",href:"https://github.com/prerak7-dev/AegisTelemetryAnalyticTool"},{label:"See architecture",href:"#telemetry-architecture"}]}],lm=[["Data Sources","Mocap · BVH · JSON · client/CMS data"],["Ingest Service","Validation, normalization, job creation"],["Kafka Topics","Async message boundaries between services"],["Processors","Curve generation and overlay shaping"],["Redis State","Progress, metadata, retry/fault isolation"],["JSON Overlays","Unreal-ready procedural animation output"],["Unreal Import","Data assets, curves, runtime driver"]],Qp=[["Data Sources","Motion files, JSON payloads, or client data enter the system as source records."],["Ingest Service","The Spring Boot service validates the request, normalizes the payload, and creates a trackable job."],["Kafka Topics","Each major step publishes or consumes messages so slow processing does not block ingestion."],["Processors","Worker services transform the source data into curve and overlay data for procedural animation."],["Redis State","Redis stores job progress, metadata, retry state, and failure details that the API can report."],["JSON Overlays","The pipeline writes Unreal-facing JSON that describes the generated procedural motion output."],["Unreal Import","The Unreal side can turn the exported data into assets, curves, and runtime driver inputs."]],Kp=[["Attach Component","Add UAegisProceduralActionComponent to the character that owns procedural action state."],["Action Asset","Create or import a UAegisProceduralActionAsset that defines timing, curves, and affected channels."],["Gameplay Trigger","In the Character Blueprint, call StartAction when input or gameplay state should trigger the action."],["Anim Driver","Place the Aegis procedural motion driver after the base locomotion pose in the Anim Blueprint."],["State Binding","Point the driver at the character/component state so runtime playback can read active action data."],["Runtime Inspect","Play in editor and use debug tools to inspect timing, curves, and applied transforms."]],Gp=["Locomotion State Machine","Cached Base Pose","Aegis Procedural Motion Driver","Output Pose"],qp=["Confirm that the character owns an AegisProceduralActionComponent.","Confirm that StartAction is called with a valid action asset.","Confirm that normalized time moves from 0 to 1.","Confirm that expected curve channels have keys.","Confirm that the affected bone names match the active skeleton.","Confirm that debug scrub mode is disabled during normal runtime playback."],Jp=[["Simulator","A synthetic gameplay/server/network generator produces local demo traffic for normal load, physics spikes, login surges, replication overload, and weekend-event meltdowns."],["FastAPI Collector","Collector endpoints receive telemetry events, accept supported source profiles, validate request shape, and expose health and metrics endpoints."],["Redpanda Topics","Kafka-compatible topics decouple event collection from processing and model the partitioned stream used by a live-service backend."],["Realtime Processor","Python processors consume events, run rolling-window aggregation, score incidents, and attach evidence for recommendations."],["ClickHouse Storage","ClickHouse stores raw events, aggregates, quality failures, incidents, snapshots, and optional production tables for realtime OLAP queries."],["Streamlit Dashboard","The dashboard reads ClickHouse data for command-center views, incident drilldowns, data quality, scaling readiness, rules, timelines, and analyst tooling."]],Zp=["Use regional collectors and partitioned Kafka-compatible streams when traffic grows beyond one local collector.","Keep hot realtime aggregates in ClickHouse and move older or cheaper data to warm/cold storage paths.","Apply backpressure and adaptive sampling so collector overload does not hide the most important telemetry.","Use recommendation rules, evidence, confidence, owners, validation plans, and guardrail metrics to make incidents actionable.","Production path: Kubernetes, Flink or Kafka Streams, ClickHouse clusters, object storage, OpenAPI contracts, Prometheus, Grafana, and SLO dashboards."],eu=[["Backend & Services",["Java","Spring Boot","C#",".NET","Node.js","REST APIs","GraphQL"]],["Cloud & Delivery",["AWS","S3","Cognito","IAM","Lambda","Docker","Git","CI/CD"]],["Game Tech",["Unreal Engine C++","Anim Blueprints","Mocap","Data Assets","Editor Tools"]],["Data & DevOps",["Kafka","Redis","SQL/PostgreSQL","MySQL","Logging","Monitoring"]]],tu={pipeline:[["Backend Runtime",["Java","Spring Boot","REST APIs","Validation","Service Boundaries"]],["Async Processing",["Kafka","Topic Design","Workers","Retries","Fault Isolation"]],["State & Output",["Redis","Job Progress","JSON Overlays","Unreal Import Contract"]],["Developer Evidence",["Repository Structure","Pipeline Docs","Sample Payloads","Implementation Notes"]]],plugin:[["Unreal Runtime",["Unreal Engine C++","Actor Components","Anim Blueprint Nodes","Runtime Pose Flow"]],["Authoring Model",["Data Assets","Animation Curves","Blueprint API","StartAction Trigger"]],["Debugging",["Console Variables","Driver Logs","Debug Visualization","Normalized Time Checks"]],["Integration Surface",["Locomotion Additive Layer","Skeleton/Bone Mapping","Editor Iteration"]]],telemetry:[["Collection & Stream",["FastAPI","Redpanda","Kafka-Compatible Topics","Source Profiles"]],["Processing & Storage",["Python Processors","Rolling Windows","ClickHouse","Raw + Aggregate Tables"]],["Analysis Surface",["Streamlit","Incident Drilldowns","Data Quality","Scaling Readiness"]],["Production Readiness",["OpenAPI","Prometheus","Grafana","Load Tests","Recommendation Rules"]]]},pl=[{meta:"Jul 2021 - Apr 2024 / Des Plaines, IL",title:"Web Application Developer",subtitle:"Americaneagle.com",body:"Built and maintained enterprise Sitecore and headless web applications for insurance, nonprofit, medical/scientific, and data-sector clients across CMS integrations, cloud services, CI/CD deployments, reporting tools, and client delivery.",bullets:["Worked across backend services, frontend integration, QA cycles, deployments, and stakeholder-facing delivery.","Translated ambiguous client requirements into maintainable implementation plans and production releases."]},{meta:"Dec 2017 - May 2021 / Mahwah, NJ",title:"Student Data Analyst",subtitle:"Ramapo College of New Jersey",body:"Analyzed academic and non-academic data to support advising allocation, reporting, and student-success planning while automating recurring reporting workflows.",bullets:["Built a practical foundation in data cleaning, analysis, reporting, and operational communication.","Turned institutional data into recommendations that could be used by advising and planning teams."]}],ul=[{meta:"2017 - 2021 / Mahwah, NJ",title:"Ramapo College of New Jersey",subtitle:"Applied computing, analytics, and systems foundation",body:"Developed the academic base for software engineering, data analysis, reporting workflows, and technical communication while working in a student data role.",bullets:["Combined coursework with hands-on institutional data analysis and recurring reporting responsibilities.","Built the habits that now show up in backend design: clarity, traceability, and practical delivery."]},{meta:"Ongoing",title:"Independent Technical Study",subtitle:"Backend systems, game technology, and production tooling",body:"Continues building systems around async services, cloud delivery, Unreal tooling, procedural animation, and content pipeline architecture.",bullets:["Connects service architecture with game-production workflows through hands-on systems work.","Focuses on production-adjacent systems that are visible, explainable, and extensible."]}],dl=[{meta:"Photography",title:"Visual Field Notes",subtitle:"Composition, light, cities, landscapes",body:"A personal practice for noticing detail, framing atmosphere, and building a sharper eye for environments and visual storytelling.",bullets:["Street, travel, portrait, and landscape-oriented collections.","Useful creative muscle for game worlds, mood, and presentation."],media:[{type:"photo",src:"",alt:"City light and architectural framing study",meta:"Photo / Urban study",caption:"Hard light, architecture, and street geometry treated as studies in rhythm, texture, and composition."},{type:"photo",src:"",alt:"Landscape atmosphere and depth study",meta:"Photo / Landscape",caption:"Wide environmental frames focused on weather, mountain silhouettes, skyline layers, and atmospheric depth."},{type:"video",src:"",poster:"",alt:"Short motion study from a photo walk",meta:"Video / Motion note",caption:"Short motion notes preserve camera movement, ambient detail, and environmental reference gathered on foot."}]},{meta:"Writing",title:"Essays, Notes, and Narrative Sketches",subtitle:"Reflection, technical storytelling, creative work",body:"Writing as a way to clarify ideas, document experiences, and shape technical or personal material into something readable and memorable.",bullets:["Short-form reflective writing and project narratives.","A bridge between engineering detail and human context."],media:[{type:"photo",src:"",alt:"Writing desk, draft, or notebook image",meta:"Photo / Draft context",caption:"Draft context connects an essay or notebook fragment to the workspace, references, and questions behind it."},{type:"photo",src:"",alt:"Narrative sketch or essay cover image",meta:"Photo / Essay cover",caption:"Essay covers frame the central idea behind a technical reflection, project narrative, or creative sketch."},{type:"video",src:"",poster:"",alt:"Reading, voice note, or process clip",meta:"Video / Process",caption:"Process notes can pair a reading excerpt or recorded thought with the written piece that followed it."}]},{meta:"Travel / Adventure",title:"Experience-Led Exploration",subtitle:"Places, movement, and perspective",body:"Travel and adventure experiences feed the portfolio world-building sensibility: routes, weather, terrain, culture, and the feeling of moving through a place.",bullets:["Designed to expand into location-specific stories, galleries, or field logs.","Pairs naturally with photography and writing sections."],media:[{type:"photo",src:"",alt:"Route, trail, or destination field image",meta:"Photo / Field log",caption:"Routes, trail references, and arrival frames anchor each location-specific field log."},{type:"video",src:"",poster:"",alt:"Adventure movement or travel atmosphere clip",meta:"Video / Movement",caption:"Movement studies hold the weather, terrain, road rhythm, and arrival moments that still images leave between frames."},{type:"photo",src:"",alt:"Culture, food, people, or place detail",meta:"Photo / Place detail",caption:"Small details make a place specific: textures, signs, rituals, meals, and quiet moments between destinations."}]}],sm=[{id:"portfolio",label:"Engineering Case Studies",kicker:"01 / Systems",summary:"Selected technical work with direct repositories, architecture decisions, implementation evidence, and Unreal-facing game-technology context.",blocks:[{type:"projects"}]},{id:"professional",label:"Professional Timeline",kicker:"02 / Work",summary:"A detailed professional track from data analysis into production web engineering and client-facing delivery.",blocks:[{type:"timeline",eyebrow:"Professional timeline",title:"Production web engineering plus data-analysis roots.",items:pl},{type:"stack"}]},{id:"education",label:"Education Timeline",kicker:"03 / Learning",summary:"Academic foundation and ongoing technical study behind the engineering, data, and game-technology work.",blocks:[{type:"timeline",eyebrow:"Education timeline",title:"Academic foundation, self-directed study, and technical growth.",items:ul}]},{id:"personal",label:"Personal Projects",kicker:"04 / Outside Work",summary:"Creative and exploratory projects that shape the visual, narrative, and experiential side of the portfolio.",blocks:[{type:"personal",eyebrow:"Personal projects",title:"Photography, writing, travel, and adventure experiences."}]}],cm={0:["Clear","clear"],1:["Mainly clear","clear"],2:["Partly cloudy","cloud"],3:["Overcast","cloud"],45:["Fog","fog"],48:["Rime fog","fog"],51:["Light drizzle","drizzle"],53:["Drizzle","drizzle"],55:["Dense drizzle","rain"],56:["Freezing drizzle","snow"],57:["Dense freezing drizzle","snow"],61:["Slight rain","rain"],63:["Rain","rain"],65:["Heavy rain","heavy-rain"],66:["Freezing rain","snow"],67:["Heavy freezing rain","snow"],71:["Slight snow","snow"],73:["Snow","snow"],75:["Heavy snow","heavy-snow"],77:["Snow grains","snow"],80:["Rain showers","rain"],81:["Rain showers","rain"],82:["Violent rain showers","heavy-rain"],85:["Snow showers","snow"],86:["Heavy snow showers","heavy-snow"],95:["Thunderstorm","storm"],96:["Thunderstorm with hail","storm"],99:["Heavy thunderstorm with hail","storm"]},pm={clear:"Clear glow",cloud:"Cloud cover",fog:"Fog",drizzle:"Drizzle",rain:"Rain","heavy-rain":"Heavy rain",storm:"Lightning",snow:"Snow","heavy-snow":"Heavy snow"},um=["snow","rain","storm","cloud","clear"];im({profile:mn,projects:cl,personalProjects:dl});[mn,am,cl,lm,Qp,Kp,Gp,qp,Jp,Zp,eu,tu,pl,ul,dl,sm,cm,pm,um].forEach(e=>Yt(e));const se=[{id:"intro",index:"00",navLabel:"Intro",eyebrow:"The threshold",title:"Systems built for the worlds behind the screen.",guide:"I build backend and full-stack systems for game technology, production tooling, and observable services. This threshold sets the focus for everything ahead."},{id:"projects",index:"01",navLabel:"Case Studies",eyebrow:"Engineering systems",title:"Proof attached to every claim.",guide:"In Case Studies, I unpack three evidence-led builds: an asynchronous animation pipeline, an Unreal procedural motion plugin, and a telemetry analytics tool. I have recorded the problem, my role, the difficult decisions, and the result for each one."},{id:"professional",index:"02",navLabel:"Experience",eyebrow:"Professional record",title:"Production work, traced through time.",guide:"In Experience, I trace my professional work across enterprise web delivery and data analysis, including my responsibilities, the production context, and the technical stack I used along the way."},{id:"education",index:"03",navLabel:"Education",eyebrow:"Learning record",title:"A foundation that keeps moving.",guide:"In Education, I connect my computer science foundation with the independent learning I continue in backend architecture, real-time systems, Unreal tooling, and game technology."},{id:"personal",index:"04",navLabel:"Field Notes",eyebrow:"Outside the system",title:"Photography, writing, and journeys in progress.",guide:"In Field Notes, I share photography, writing, and travel or adventure work. These are the observation, storytelling, and curiosity that I carry alongside engineering."},{id:"contact",index:"05",navLabel:"Contact",eyebrow:"The next transmission",title:"Build the next system together.",guide:"In Contact, I have gathered my email, GitHub, LinkedIn, and resume. Reach out when you want to talk about engineering, platforms, online services, tooling, or game technology."}],fl={pipeline:{label:"Asynchronous motion pipeline",description:"A developer-readable path from source motion to a validated Unreal import artifact.",steps:Qp,notes:["Kafka keeps slow transforms off the ingest request path.","Redis makes progress, retries, and failures inspectable.","The JSON boundary isolates backend processing from Unreal authoring."]},plugin:{label:"Additive Unreal runtime",description:"A short-lived procedural action layer that remains separate from the locomotion state machine.",steps:Kp,placement:Gp,notes:qp,command:"aegis.Motion.DebugProceduralDriver 0"},telemetry:{label:"Realtime telemetry intelligence",description:"A local-to-production path from synthetic game events to incidents, evidence, and scaling decisions.",steps:Jp,notes:Zp}},Kr=[{id:"default",label:"Monochrome",short:"M",atmosphere:"Windblown sand"},{id:"fall",label:"Fall",short:"F",atmosphere:"Autumn leaf drift"},{id:"spring",label:"Spring",short:"S",atmosphere:"Leaves and blossoms"},{id:"winter",label:"Winter",short:"W",atmosphere:"Tundra snowfall"}],dm=[{id:"clear",label:"Dust"},{id:"cloud",label:"Haze"},{id:"rain",label:"Rain"},{id:"storm",label:"Storm"},{id:"snow",label:"Snow"}],Pe={projects:cl,professionalTimeline:pl,educationTimeline:ul,personalProjects:dl,stackGroups:eu,projectStacks:tu};Yt(se);Yt(fl);Yt(Kr);Yt(dm);Yt(Pe);const ro=24,fm=["cinematic/ui/text-distress-mask.png"],ru=["pipeline","plugin","telemetry"],mm=["systems","chronology","field","surface","particles","topologySlab","topologyRope","controlSlab","wayfinderSlab","loreSlab"];function hm(e){return Array.from({length:ro},(t,r)=>`cinematic/${e}/gateway/frames/frame-${String(r).padStart(2,"0")}.webp`)}function Fn(e){return Object.freeze({gatewayFrames:hm(e),systems:`cinematic/${e}/systems.webp`,chronology:`cinematic/${e}/chronology.webp`,field:`cinematic/${e}/field.webp`,surface:`cinematic/${e}/surface.webp`,particles:`cinematic/${e}/particles.${e==="default"?"png":"webp"}`,topologySlab:`cinematic/${e}/topology-slab.png`,topologyRope:`cinematic/${e}/topology-rope.png`,controlSlab:`cinematic/${e}/ui/control-slab.webp`,wayfinderSlab:`cinematic/${e}/ui/wayfinder-slab.webp`,loreSlab:`cinematic/${e}/ui/lore-slab.webp`,artifacts:Object.freeze(Object.fromEntries(ru.map(t=>[t,`cinematic/${e}/artifacts/${t}.webp`])))})}const pa=Object.freeze({default:Fn("default"),fall:Fn("fall"),spring:Fn("spring"),winter:Fn("winter")});function Xt(e){return pa[e]||pa.default}function gm(e){const t=Xt(e);return[...t.gatewayFrames,...mm.map(r=>t[r]),...ru.map(r=>t.artifacts[r])]}function vm(e){return[...fm.map(t=>({filename:t,decode:!0})),...Object.entries(pa).flatMap(([t])=>gm(t).map(r=>({filename:r,decode:t===e})))]}const V=Object.freeze({sectionHeadingDelay:120,tabsDelay:1150,tabStagger:180,initialProjectDelay:2450,identityDelay:0,proofDelay:1900,proofStagger:170,topologyHeadingDelay:3450,topologySlabsDelay:4200,stackDelay:5300,stackStagger:180,projectEnterDuration:6500,projectExitDuration:2300,identityExitDelay:780,proofExitDelay:650,proofExitStagger:130,topologyHeadingExitDelay:500,topologySlabsExitDelay:300,stackExitDelay:0,stackExitStagger:120}),Es=Object.freeze({selectedIndex:0,displayedIndex:0,phase:"idle",entryDelay:V.initialProjectDelay,cycle:0});function xm(e){return window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:e}function ym(e,t){const[r,n]=k.useState(Es),o=k.useRef(Es),i=k.useRef(e),a=k.useRef(0),l=k.useRef(new Set),s=k.useCallback(x=>{n(v=>{const w=typeof x=="function"?x(v):x;return o.current=w,w})},[]),p=k.useCallback(()=>{l.current.forEach(x=>window.clearTimeout(x)),l.current.clear()},[]),h=k.useCallback((x,v)=>{const w=window.setTimeout(()=>{l.current.delete(w),x()},xm(v));l.current.add(w)},[]),g=k.useCallback(x=>{h(()=>{i.current&&s(v=>v.phase==="entering"?{...v,phase:"visible"}:v)},x+V.projectEnterDuration)},[h,s]);k.useEffect(()=>{if(i.current=e,p(),!e)return s(v=>({...v,phase:"idle"})),p;const x=a.current;return s(v=>({...v,selectedIndex:x,displayedIndex:x,phase:"entering",entryDelay:V.initialProjectDelay,cycle:v.cycle+1})),g(V.initialProjectDelay),p},[e,p,g,s]);const m=k.useCallback(x=>{const v=Math.min(Math.max(0,x),Math.max(0,t-1)),w=o.current;if(w.phase==="exiting"){a.current=v,s({...w,selectedIndex:v});return}if(v===w.displayedIndex&&w.phase!=="exiting"){a.current=v,s({...w,selectedIndex:v});return}if(a.current=v,p(),!i.current){s({...w,selectedIndex:v,displayedIndex:v,phase:"idle"});return}s({...w,selectedIndex:v,phase:"exiting"}),h(()=>{if(!i.current)return;const E=a.current;s(d=>({...d,selectedIndex:E,displayedIndex:E,phase:"entering",entryDelay:0,cycle:d.cycle+1})),g(0)},V.projectExitDuration)},[p,t,h,g,s]);return{...r,selectProject:m}}const Jt={progress:0,scenePosition:0,activeIndex:0,direction:1},ua=new Set;function wm(e){Jt.progress=e.progress,Jt.scenePosition=e.scenePosition,Jt.activeIndex=e.activeIndex,Jt.direction=e.direction,ua.forEach(t=>t(Jt))}function wn(e){return ua.add(e),e(Jt),()=>ua.delete(e)}function nu(e,t=0,r=1){return Math.min(r,Math.max(t,e))}function da(e){const t=nu(e);return t*t*t*(t*(t*6-15)+10)}function $n(e,t,r){return da((e-t)/r)}function ou(e){return we("/prerak-portfolio/",e)}function Gt({x:e=0,y:t=0,depth:r=0,scale:n=1}){return`translate3d(${e}%, ${t}%, ${r}px) scale(${n})`}function qt(e,t,r){e&&(e.style.opacity=String(t),e.style.transform=r)}function Un({filename:e,className:t,plateRef:r}){return c.jsx("div",{ref:r,className:`environment-plate ${t}`,"aria-hidden":"true",children:c.jsx("img",{src:ou(e),alt:"",draggable:"false",decoding:"async",loading:"eager"})})}function bm({filenames:e,frameRefs:t,imageRefs:r,plateRef:n}){return c.jsx("div",{ref:n,className:"environment-plate gateway-sequence-plate","aria-hidden":"true",children:e.map((o,i)=>c.jsx("div",{ref:a=>{t.current[i]=a},className:"gateway-sequence-frame",style:{opacity:i===0?1:0,visibility:i===0?"visible":"hidden"},"aria-hidden":"true",children:c.jsx("img",{ref:a=>{r.current[i]=a},src:ou(o),alt:"",draggable:"false",decoding:"async",loading:"eager",fetchPriority:i<4?"high":"auto"})},o))})}function km(e){return e?(e.complete?Promise.resolve():new Promise(r=>{e.addEventListener("load",r,{once:!0}),e.addEventListener("error",r,{once:!0})})).then(async()=>{if(e.naturalWidth)try{await e.decode()}catch{}}):Promise.resolve()}function jm({theme:e,onReady:t,systemsOverlay:r=null}){const n=Xt(e),o=k.useRef(null),i=k.useRef(null),a=k.useRef(null),l=k.useRef(null),s=k.useRef(null),p=k.useRef(null),h=k.useRef(null),g=k.useRef(null),m=k.useRef([]),x=k.useRef([]),v=k.useRef([]);return k.useEffect(()=>{let w=!1;const E=x.current.slice(0,n.gatewayFrames.length);return Promise.all(E.map(km)).then(()=>{w||window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>{w||t==null||t()})})}),()=>{w=!0}},[n.gatewayFrames,t]),k.useLayoutEffect(()=>(m.current.forEach(E=>{E&&(E.style.opacity="0",E.style.visibility="hidden")}),v.current=[],wn(({scenePosition:E,direction:d})=>{const u=o.current;if(!u)return;const f=d>0?1:-1,y=da(E/.82),S=y*(ro-1),b=Math.floor(S),C=Math.min(ro-1,b+1),z=S-b,M=z>1e-4&&C!==b?[b,C]:[b];v.current.forEach(T=>{if(M.includes(T))return;const R=m.current[T];R&&(R.style.opacity="0",R.style.visibility="hidden")});const _=m.current[b];if(_&&(_.style.visibility="visible",_.style.opacity="1"),M.length===2){const T=m.current[C];T&&(T.style.visibility="visible",T.style.opacity=String(z))}v.current=M;const I=$n(E,.56,.44),L=$n(E,1.2,.8),D=$n(E,3.2,.8),Y=$n(E,4.2,.8),ze=Math.max(Math.sin(I*Math.PI),Math.sin(L*Math.PI),Math.sin(D*Math.PI),Math.sin(Y*Math.PI)),Ee=Math.sin(E*.72)*.34,me=Math.cos(E*.54)*.1,P=1.005+y*.24+I*.19;if(u.classList.toggle("direction-forward",f>0),u.classList.toggle("direction-backward",f<0),u.classList.toggle("transition-active",ze>.001),u.classList.toggle("transition-idle",ze<=.001),u.style.setProperty("--environment-parallax-x",`${Ee}%`),u.style.setProperty("--environment-parallax-y",`${me}%`),u.style.setProperty("--transition-pulse",ze.toFixed(4)),u.style.setProperty("--travel-direction",String(f)),i.current){const T=Math.abs(1-E),R=nu((.52-T)/(.52-.14)),F=da(R);i.current.style.setProperty("--environment-parallax-x",`${Ee}%`),i.current.style.setProperty("--environment-parallax-y",`${me}%`),i.current.style.setProperty("--project-scene-reveal",F.toFixed(4))}qt(a.current,1-I,Gt({x:-I*f*.7,y:-y*.7,depth:I*82,scale:P})),qt(l.current,I*(1-L),Gt({x:(1-I)*f*1.25-L*f*.7,y:(1-I)*.38-L*.42,depth:(1-I)*-72+L*46,scale:1.095-I*.07+L*.07})),qt(s.current,I*(1-L),Gt({x:(1-I)*f*1.25-L*f*.7,y:(1-I)*.38-L*.42,depth:(1-I)*-72+L*46,scale:1.095-I*.07+L*.07})),qt(p.current,L*(1-D),Gt({x:(1-L)*f*1.15-D*f*.7,y:(1-L)*.34-D*.42,depth:(1-L)*-68+D*46,scale:1.09-L*.065+D*.07})),qt(h.current,D*(1-Y),Gt({x:(1-D)*f*1.15-Y*f*.7,y:(1-D)*.34-Y*.42,depth:(1-D)*-68+Y*46,scale:1.09-D*.065+Y*.07})),qt(g.current,Y,Gt({x:(1-Y)*f*1.1,y:(1-Y)*.3,depth:(1-Y)*-64,scale:1.09-Y*.055}))})),[e]),c.jsxs(c.Fragment,{children:[c.jsxs("div",{ref:o,className:"cinematic-environment direction-forward transition-idle","aria-hidden":"true",children:[c.jsxs("div",{className:"cinematic-image-stage",children:[c.jsx(bm,{filenames:n.gatewayFrames,frameRefs:m,imageRefs:x,plateRef:a}),c.jsx(Un,{filename:n.systems,className:"systems-plate",plateRef:l}),c.jsx(Un,{filename:n.chronology,className:"chronology-plate",plateRef:p}),c.jsx(Un,{filename:n.field,className:"field-plate",plateRef:h}),c.jsx(Un,{filename:n.gatewayFrames[ro-1],className:"return-gateway-plate",plateRef:g})]}),c.jsx("div",{className:"environment-transition-veil"}),c.jsx("div",{className:"environment-volumetrics"}),c.jsx("div",{className:"environment-vignette"})]}),r&&c.jsx("div",{ref:i,className:"cinematic-systems-overlay",children:c.jsx("div",{className:"cinematic-image-stage",children:c.jsx("div",{ref:s,className:"environment-plate systems-overlay-plate",children:r})})})]})}function Sm(){return c.jsx("img",{src:mn.photo,alt:mn.name,className:"profile-avatar"})}const He=Object.freeze({default:{mode:0,size:26,opacity:.4,alphaCutoff:.25,density:1.12,saturation:.38,brightness:.96,tint:12103061},spring:{mode:1,size:31,opacity:.45,alphaCutoff:.09,density:1.15,saturation:.58,brightness:.96,tint:13688003},fall:{mode:2,size:32,opacity:.46,alphaCutoff:.09,density:1.13,saturation:.65,brightness:.98,tint:13803898},winter:{mode:3,size:27,opacity:.44,alphaCutoff:.07,density:1.18,saturation:.25,brightness:1.04,tint:15200498}}),zm=`
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  uniform float uThemeMode;
  uniform float uIntensity;
  attribute float aSize;
  attribute float aSeed;
  attribute float aSprite;
  varying float vRotation;
  varying float vSeed;
  varying float vSprite;
  varying float vDepthFade;

  const float TAU = 6.28318530718;

  float wrap(float value, float radius) {
    return mod(value + radius, radius * 2.0) - radius;
  }

  void main() {
    vec3 animated = position;
    float phase = aSeed * TAU;
    float speed = 0.72 + uIntensity * 0.28;
    float rotation = phase;

    if (uThemeMode < 0.5) {
      animated.x = wrap(position.x + uTime * (0.18 + aSeed * 0.24) * speed, 10.0);
      animated.y += sin(uTime * 0.42 + phase + position.x * 0.24) * (0.1 + aSeed * 0.24);
      animated.z += sin(uTime * 0.18 + phase) * 0.22;
      rotation += uTime * (0.08 + aSeed * 0.18);
    } else if (uThemeMode < 1.5) {
      animated.x = wrap(position.x + uTime * (0.12 + aSeed * 0.22) * speed + sin(uTime * 0.58 + phase) * 0.55, 10.0);
      animated.y = wrap(position.y - uTime * (0.035 + aSeed * 0.055) * speed + sin(uTime * 0.74 + phase + position.x * 0.31) * (0.22 + aSeed * 0.42), 6.8);
      animated.z += cos(uTime * 0.38 + phase) * 0.42;
      rotation += uTime * (0.42 + aSeed * 1.12) + sin(uTime * 0.72 + phase) * 0.8;
    } else if (uThemeMode < 2.5) {
      animated.x = wrap(position.x + uTime * (0.22 + aSeed * 0.32) * speed + sin(uTime * 0.47 + phase) * (0.48 + aSeed * 0.7), 10.0);
      animated.y = wrap(position.y - uTime * (0.12 + aSeed * 0.2) * speed + cos(uTime * 0.61 + phase) * 0.38, 6.8);
      animated.z += sin(uTime * 0.55 + phase + position.y * 0.2) * 0.58;
      rotation += uTime * (0.68 + aSeed * 1.55) + sin(uTime * 0.9 + phase) * 1.05;
    } else {
      animated.x = wrap(position.x + uTime * (0.035 + aSeed * 0.08) * speed + sin(uTime * (0.28 + aSeed * 0.34) + phase) * (0.24 + aSeed * 0.52), 10.0);
      animated.y = wrap(position.y - uTime * (0.1 + aSeed * 0.14) * speed, 6.8);
      animated.z += cos(uTime * 0.36 + phase) * 0.32;
      rotation += uTime * (0.06 + aSeed * 0.22);
    }

    vRotation = rotation;
    vSeed = aSeed;
    vSprite = aSprite;
    vec4 viewPosition = modelViewMatrix * vec4(animated, 1.0);
    float viewDepth = -viewPosition.z;
    float perspective = clamp(5.5 / max(1.0, viewDepth), 0.46, 1.18);
    vDepthFade = 1.0 - smoothstep(9.0, 22.0, viewDepth);
    gl_PointSize = uBaseSize * aSize * uPixelRatio * perspective;
    gl_Position = projectionMatrix * viewPosition;
  }
`,Em=`
  uniform sampler2D uAtlas;
  uniform float uOpacity;
  uniform float uAlphaCutoff;
  uniform float uIntensity;
  uniform float uDensity;
  uniform float uSaturation;
  uniform float uBrightness;
  uniform vec3 uTint;
  varying float vRotation;
  varying float vSeed;
  varying float vSprite;
  varying float vDepthFade;

  mat2 rotate2d(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    float visibleFraction = clamp((0.16 + uIntensity * 0.23) * uDensity, 0.14, 0.62);
    if (vSeed > visibleFraction) discard;

    vec2 localUv = rotate2d(vRotation) * (gl_PointCoord - 0.5) + 0.5;
    if (localUv.x < 0.0 || localUv.x > 1.0 || localUv.y < 0.0 || localUv.y > 1.0) discard;

    float sprite = floor(vSprite);
    float column = mod(sprite, 4.0);
    float row = floor(sprite / 4.0);
    vec2 atlasUv = (vec2(column, row) + localUv) * 0.25;
    vec4 texel = texture2D(uAtlas, atlasUv);
    float luminance = dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722));
    vec3 graded = mix(vec3(luminance), texel.rgb, uSaturation);
    graded = mix(graded, graded * uTint, 0.24) * uBrightness;
    float alphaVariation = 0.76 + 0.24 * sin(vSeed * 93.7);
    float depthOpacity = mix(0.46, 1.0, vDepthFade);
    float alpha = smoothstep(uAlphaCutoff, min(0.98, uAlphaCutoff + 0.24), texel.a)
      * uOpacity
      * alphaVariation
      * depthOpacity;
    if (alpha < 0.009) discard;
    gl_FragColor = vec4(graded, alpha);
  }
`;function Cm(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Pm(e=420){const t=Cm(4817),r=new Float32Array(e*3),n=new Float32Array(e),o=new Float32Array(e),i=new Float32Array(e);for(let l=0;l<e;l+=1)r[l*3]=(t()-.5)*20,r[l*3+1]=(t()-.5)*13.6,r[l*3+2]=-2.5-t()*15.5,n[l]=.46+t()*.72,o[l]=t(),i[l]=Math.floor(t()*16);const a=new ju;return a.setAttribute("position",new bn(r,3)),a.setAttribute("aSize",new bn(n,1)),a.setAttribute("aSeed",new bn(o,1)),a.setAttribute("aSprite",new bn(i,1)),a}function Nm(){const e=new Cu(new Uint8Array([255,255,255,0]),1,1);return e.needsUpdate=!0,e}function Tm(e){return e.colorSpace=Ms,e.wrapS=hl,e.wrapT=hl,e.minFilter=zu,e.magFilter=Eu,e.generateMipmaps=!0,e.needsUpdate=!0,e}async function Rm(){const e=new ku,t=await Promise.all(Object.keys(He).map(async r=>{const n=we("/prerak-portfolio/",Xt(r).particles);try{return[r,Tm(await e.loadAsync(n))]}catch{return[r,Nm()]}}));return Object.fromEntries(t)}function Cs(e,t,r){const n=He[r]||He.default;e.uniforms.uAtlas.value=t[r]||t.default,e.uniforms.uBaseSize.value=n.size,e.uniforms.uThemeMode.value=n.mode,e.uniforms.uOpacity.value=n.opacity,e.uniforms.uAlphaCutoff.value=n.alphaCutoff,e.uniforms.uDensity.value=n.density,e.uniforms.uSaturation.value=n.saturation,e.uniforms.uBrightness.value=n.brightness,e.uniforms.uTint.value.setHex(n.tint)}function _m({theme:e,atmospherePower:t,onReady:r}){const n=k.useRef(null),o=k.useRef({scenePosition:0,theme:e,atmospherePower:t}),i=k.useRef(r);return k.useEffect(()=>{o.current.theme=e,o.current.atmospherePower=t},[e,t]),k.useEffect(()=>wn(({scenePosition:a})=>{o.current.scenePosition=a}),[]),k.useEffect(()=>{i.current=r},[r]),k.useEffect(()=>{const a=n.current;if(!a)return;let l=!1,s=0,p,h,g,m,x,v={};const w={x:0,y:0},E=u=>{w.x=u.clientX/window.innerWidth-.5,w.y=u.clientY/window.innerHeight-.5};return(async()=>{var I;p=new hu({antialias:!1,alpha:!0,powerPreference:"high-performance"});const u=Math.min(window.devicePixelRatio||1,1.35);if(p.setPixelRatio(u),p.setClearColor(0,0),p.outputColorSpace=Ms,p.domElement.className="spatial-world-canvas",p.domElement.setAttribute("aria-hidden","true"),a.appendChild(p.domElement),v=await Rm(),l){Object.values(v).forEach(L=>L.dispose());return}const f=new gu,y=new vu(46,1,.1,40);y.position.set(0,0,5.5),m=Pm(),x=new xu({uniforms:{uTime:{value:0},uPixelRatio:{value:u},uBaseSize:{value:He.default.size},uThemeMode:{value:He.default.mode},uIntensity:{value:1},uAtlas:{value:v.default},uOpacity:{value:He.default.opacity},uAlphaCutoff:{value:He.default.alphaCutoff},uDensity:{value:He.default.density},uSaturation:{value:He.default.saturation},uBrightness:{value:He.default.brightness},uTint:{value:new wu(He.default.tint)}},vertexShader:zm,fragmentShader:Em,transparent:!0,depthWrite:!1,depthTest:!1,blending:yu});const S=new bu(m,x);S.frustumCulled=!1,f.add(S),Cs(x,v,o.current.theme);const b=()=>{if(!p)return;const L=Math.max(1,a.clientWidth),D=Math.max(1,a.clientHeight);p.setSize(L,D,!1),y.aspect=L/D,y.updateProjectionMatrix(),x.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio||1,1.35)};g=b,h=typeof ResizeObserver=="function"?new ResizeObserver(b):null,h==null||h.observe(a),window.addEventListener("resize",b),window.addEventListener("pointermove",E,{passive:!0}),b(),Object.values(v).forEach(L=>p.initTexture(L)),p.compile(f,y),p.render(f,y),(I=i.current)==null||I.call(i);const C=window.matchMedia("(prefers-reduced-motion: reduce)").matches,z=performance.now();let M=o.current.theme;const _=L=>{if(l||(s=window.requestAnimationFrame(_),document.hidden))return;const D=o.current,Y=Su.clamp(Number(D.atmospherePower)||1,.35,1.7);D.theme!==M&&(M=D.theme,Cs(x,v,M)),x.uniforms.uTime.value=C?0:(L-z)*.001,x.uniforms.uIntensity.value=Y;const ze=C?0:w.x*.2,Ee=C?0:-w.y*.12;y.position.x+=(ze-y.position.x)*.028,y.position.y+=(Ee-y.position.y)*.028,y.lookAt(y.position.x*.1,y.position.y*.1,-5),S.rotation.y=C?0:D.scenePosition*.004,p.render(f,y)};s=window.requestAnimationFrame(_)})(),()=>{l=!0,window.cancelAnimationFrame(s),h==null||h.disconnect(),window.removeEventListener("pointermove",E),g&&window.removeEventListener("resize",g),m==null||m.dispose(),x==null||x.dispose(),Object.values(v).forEach(u=>u.dispose()),p==null||p.dispose(),p==null||p.domElement.remove()}},[]),c.jsx("div",{ref:n,className:"spatial-world","aria-hidden":"true"})}const Mm={photography:"18% 48%",writing:"51% 76%",travel:"76% 58%"},Lm=.56,Im=1320,Am=620,iu=.19,au=.22,Dm=iu+au+.01,Om=.1;function Ir(e){const t=Math.max(0,Math.min(1,e));return t*t*t*(t*(t*6-15)+10)}function Ps(e,t){const r=e-t,n=Math.abs(r),o=.14,i=.52,a=Math.max(0,Math.min(1,(i-n)/(i-o))),l=a*a*a*(a*(a*6-15)+10),s=(p,h=1e3)=>Math.round(p*h)/h;return{"--scene-opacity":s(l,1e4),"--scene-shift":`${s(Math.max(-90,Math.min(90,r*115)))}px`,"--scene-shift-x":`${s(Math.max(-70,Math.min(70,r*85)))}px`,"--scene-scale":s(.975+l*.025,1e4),"--scene-reveal":s(l,1e4)}}function Ot({direction:e="right"}){return c.jsx("span",{className:`triangle-pointer ${e}`,"aria-hidden":"true"})}function lu(e,t=14,r=!0,n=0){const[o,i]=k.useState(0);return k.useEffect(()=>{if(i(0),!r||!e)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){i(e.length);return}let a=0;const l=window.setTimeout(()=>{a=window.setInterval(()=>{i(s=>s>=e.length?(window.clearInterval(a),s):s+1)},t)},n);return()=>{window.clearTimeout(l),window.clearInterval(a)}},[n,r,t,e]),r?e.slice(0,o):""}function su(e,t=14,r=!0,n=0){const o=e.join(""),i=lu(o,t,r,n);let a=0,l=-1;const s=e.map((p,h)=>{const g=i.slice(a,a+p.length);return a+=p.length,l===-1&&i.length<a&&(l=h),g});return{activeSegment:l,isComplete:i.length===o.length,segments:s}}function cu(e,{phase:t,enterDelay:r=0,exitDelay:n=0,enterSpeed:o=8,exitSpeed:i=4}){const a=e.join(""),[l,s]=k.useState(0);k.useEffect(()=>{let x=0,v=0;const w=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(t==="idle"){s(0);return}if(t==="visible"){s(a.length);return}const E=t==="entering";E&&s(0);const d=E?a.length:0,u=E?r:n,f=E?o:i;return x=window.setTimeout(()=>{if(w){s(d);return}v=window.setInterval(()=>{s(y=>{const S=E?Math.min(d,y+1):Math.max(d,y-1);return S===d&&window.clearInterval(v),S})},f)},w?0:u),()=>{window.clearTimeout(x),window.clearInterval(v)}},[r,o,n,i,a,t]);let p=0;const h=e.map(x=>{const v=a.slice(0,l).slice(p,p+x.length);return p+=x.length,v}),g=t==="exiting"?Math.max(0,h.reduce((x,v,w)=>v?w:x,0)):Math.max(0,e.findIndex((x,v)=>l<e.slice(0,v+1).join("").length)),m=t==="entering"&&l<a.length||t==="exiting"&&l>0;return{activeSegment:g,isAnimating:m,segments:h}}function fa({activeSegment:e,index:t,isAnimating:r}){return r&&e===t?c.jsx("span",{className:"case-type-caret","aria-hidden":"true"}):null}function pu(e=0){return{"--case-artifact-enter-delay":`${e+V.identityDelay+320}ms`,"--case-artifact-exit-delay":`${V.identityExitDelay}ms`,"--case-topology-enter-delay":`${e+V.topologySlabsDelay}ms`,"--case-topology-exit-delay":`${V.topologySlabsExitDelay}ms`}}function Fm({activeIndex:e,collapsed:t,onCollapsedChange:r,onSelect:n}){const o=k.useRef(null);k.useEffect(()=>{if(!window.matchMedia("(max-width: 760px)").matches)return;const a=window.requestAnimationFrame(()=>{const l=o.current,s=l==null?void 0:l.querySelector('[role="tab"][aria-selected="true"]');if(!l||!s)return;const p=s.offsetLeft-(l.clientWidth-s.offsetWidth)/2;l.scrollTo({left:Math.max(0,p),behavior:"smooth"})});return()=>window.cancelAnimationFrame(a)},[e]);const i=a=>{var l;(l=o.current)==null||l.scrollBy({left:a*Math.max(180,o.current.clientWidth*.7),behavior:"smooth"})};return c.jsxs("nav",{className:`chapter-rail ${t?"is-collapsed":""}`,"aria-label":"Portfolio chapters",children:[c.jsx("button",{type:"button",className:"chapter-collapse","aria-label":t?"Expand chapter navigation":"Collapse chapter navigation","aria-expanded":!t,onClick:()=>r(!t),children:c.jsx(Ot,{direction:t?"right":"left"})}),c.jsx("button",{type:"button",className:"chapter-scroll-arrow previous","aria-label":"Previous chapters",onClick:()=>i(-1),children:c.jsx(Ot,{direction:"left"})}),c.jsx("div",{ref:o,className:"chapter-rail-list",role:"tablist","aria-label":"Spatial portfolio chapters",children:se.map((a,l)=>c.jsxs("button",{type:"button",role:"tab","aria-selected":l===e,className:l===e?"active":"",onClick:()=>n(l),children:[c.jsx("span",{children:a.index}),c.jsx("strong",{children:a.navLabel})]},a.id))}),c.jsx("button",{type:"button",className:"chapter-scroll-arrow next","aria-label":"Next chapters",onClick:()=>i(1),children:c.jsx(Ot,{direction:"right"})})]})}function uu({activeIndex:e,className:t,label:r,children:n}){const o=k.useRef(null),i=a=>{var l;(l=o.current)==null||l.scrollBy({left:a*Math.max(150,o.current.clientWidth*.72),behavior:"smooth"})};return k.useEffect(()=>{if(!window.matchMedia("(max-width: 760px)").matches)return;const a=window.requestAnimationFrame(()=>{const l=o.current,s=l==null?void 0:l.querySelector('[role="tab"][aria-selected="true"]');if(!l||!s)return;const p=s.offsetLeft-(l.clientWidth-s.offsetWidth)/2;l.scrollTo({left:Math.max(0,p),behavior:"smooth"})});return()=>window.cancelAnimationFrame(a)},[e]),c.jsxs("div",{className:`scrollable-tab-shell ${t}-shell`,children:[c.jsx("button",{type:"button",className:"embedded-tab-arrow previous","aria-label":`Previous ${r}`,onClick:()=>i(-1),children:c.jsx(Ot,{direction:"left"})}),c.jsx("div",{ref:o,className:t,role:"tablist","aria-label":r,children:n}),c.jsx("button",{type:"button",className:"embedded-tab-arrow next","aria-label":`Next ${r}`,onClick:()=>i(1),children:c.jsx(Ot,{direction:"right"})})]})}function $m({profile:e,onIntro:t}){return c.jsxs("header",{className:"archive-header",children:[c.jsxs("button",{type:"button",className:"archive-identity",onClick:t,"aria-label":"Return to introduction",children:[c.jsx(Sm,{}),c.jsxs("span",{children:[c.jsx("strong",{children:e.name}),c.jsx("small",{children:"Backend / Game Technology"})]})]}),c.jsxs("div",{className:"archive-header-actions",children:[c.jsx("a",{href:e.github,...Po(e.github),children:"GitHub"}),c.jsx("a",{className:"archive-header-primary",href:e.resume,download:!0,children:"Resume"})]})]})}function Um({activeIndex:e,theme:t,onThemeChange:r,atmospherePower:n,onAtmospherePowerChange:o,onThemeChosen:i}){const[a,l]=k.useState(()=>window.matchMedia("(max-width: 1120px), (max-height: 780px)").matches),s=Kr.find(p=>p.id===t)||Kr[0];return c.jsxs("aside",{className:`spatial-hud ${a?"is-collapsed":""}`,"aria-label":"Scene wayfinder",children:[c.jsx("button",{type:"button",className:"hud-collapse","aria-label":a?"Expand explorer HUD":"Collapse explorer HUD","aria-expanded":!a,onClick:()=>l(p=>!p),children:c.jsx(Ot,{direction:a?"up":"down"})}),c.jsxs("div",{className:"spatial-hud-content",children:[c.jsxs("div",{className:"hud-coordinate",children:[c.jsx("span",{children:"Wayfinder"}),c.jsx("strong",{children:se[e].navLabel}),c.jsxs("small",{children:[s.label," passage"]})]}),c.jsx("div",{className:"hud-theme-row",role:"group","aria-label":"Environment theme",children:Kr.map(p=>c.jsxs("button",{type:"button",className:t===p.id?"active":"","aria-pressed":t===p.id,title:p.label,onClick:()=>{i(),r(p.id)},children:[c.jsx("i",{className:`theme-swatch ${p.id}`}),c.jsx("span",{children:p.label})]},p.id))}),c.jsxs("div",{className:"hud-atmosphere-row",children:[c.jsx("span",{children:"Air and weather"}),c.jsx("strong",{children:s.atmosphere})]}),c.jsxs("label",{className:"hud-intensity",children:[c.jsx("span",{children:"Presence"}),c.jsx("input",{type:"range",min:"0.35",max:"1.7",step:"0.05",value:n,onChange:p=>{o(Number(p.target.value))}})]})]})]})}function Bm({activeIndex:e,introGuideReady:t,themePromptCompleted:r,theme:n}){const[o,i]=k.useState(!0),[a,l]=k.useState(!1);k.useEffect(()=>{if(!t){i(!0),l(!1);return}i(!1);const g=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=window.setTimeout(()=>l(!0),g?0:Am);return()=>window.clearTimeout(m)},[t]);const s=t?r?se[e].guide:"Before I guide you through my work, start with the Wayfinder. Switch between Monochrome, Fall, Spring, and Winter, then choose the atmosphere you want to carry through my portfolio.":"",p=lu(s,14,a),h=t?a?"is-ready":"is-opening":"is-awaiting";return c.jsxs("aside",{className:`spatial-lore-guide ${o?"is-collapsed":""} ${h} theme-${n}`,"aria-label":"Lore navigation guide",children:[c.jsx("div",{className:"lore-medallion","aria-hidden":"true",children:c.jsx("img",{src:nm,alt:""})}),c.jsx("div",{className:"lore-parchment","aria-hidden":o,children:c.jsxs("p",{children:[p,a&&c.jsx("span",{className:"lore-caret","aria-hidden":"true"})]})}),c.jsx("button",{type:"button",className:"lore-toggle","aria-label":t?o?"Expand lore guide":"Collapse lore guide":"Lore guide waiting for introduction","aria-expanded":!o,disabled:!t,onClick:()=>i(g=>!g),children:c.jsx(Ot,{direction:o?"right":"left"})})]})}function ml({chapter:e,signal:t}){return c.jsxs("div",{className:"chapter-heading",children:[c.jsxs("div",{children:[c.jsxs("p",{children:["Chapter ",e.index,": ",e.eyebrow]}),c.jsx("h2",{children:e.title})]}),t&&c.jsx("span",{children:t})]})}function Hm({isActive:e}){const t=se[1],r=[`Chapter ${t.index}: ${t.eyebrow}`,t.title,"Repositories, decisions, outcomes"],{activeSegment:n,isComplete:o,segments:i}=su(r,10,e,V.sectionHeadingDelay),a=l=>e&&!o&&n===l?c.jsx("span",{className:"case-type-caret","aria-hidden":"true"}):null;return c.jsxs("div",{className:"chapter-heading case-study-heading",children:[c.jsxs("div",{children:[c.jsxs("p",{"aria-label":r[0],children:[i[0],a(0)]}),c.jsxs("h2",{"aria-label":r[1],children:[i[1],a(1)]})]}),c.jsxs("span",{"aria-label":r[2],children:[i[2],a(2)]})]})}function Wm({isActive:e,profile:t,onEnter:r,onGuideReady:n}){const o=k.useRef(null),i=k.useRef(null),a=k.useRef(null),l=k.useRef({controlled:!1,first:-1,last:-1,scale:-1,x:"",y:"",copyX:"",copyY:"",gateOpacity:-1,gateScale:-1,gateCounterX:"",gateCounterY:""}),s=t.name.trim().split(/\s+/),p=s[0],h=s.slice(1).join(" "),g=["Chicago: the path begins here","Backend / Full-Stack Engineer","building game-technology systems.","Reliable services, content pipelines, Unreal tooling, and telemetry systems designed to make complex production workflows observable and usable."],{activeSegment:m,isComplete:x,segments:v}=su(g,14,e,1900),w=E=>e&&!x&&m===E?c.jsx("span",{className:"intro-caret","aria-hidden":"true"}):null;return k.useEffect(()=>{if(!e||!x)return;const E=window.matchMedia("(prefers-reduced-motion: reduce)").matches,d=window.setTimeout(n,E?0:Im);return()=>window.clearTimeout(d)},[e,x,n]),k.useLayoutEffect(()=>wn(({progress:E,scenePosition:d})=>{const u=o.current,f=i.current,y=a.current;if(!u)return;const S=Math.max(0,Math.min(1,E*Math.max(1,se.length-1))),b=l.current;if(!b.controlled&&S>.003&&(b.controlled=!0,u.classList.add("is-scroll-controlled")),!b.controlled)return;const C=Ir(S/.16),z=Ir((S-.085)/.16);C!==b.first&&(C===0||C===1||Math.abs(C-b.first)>.001)&&(b.first=C,u.style.setProperty("--intro-first-shift",`${(C*125).toFixed(3)}%`)),z!==b.last&&(z===0||z===1||Math.abs(z-b.last)>.001)&&(b.last=z,u.style.setProperty("--intro-last-shift",`${(z*125).toFixed(3)}%`));const M=Ir(d/.82),_=1.005+M*.24,I=Math.sin(d*.72)*.34,L=Math.cos(d*.54)*.1-M*.7;Math.abs(_-b.scale)>1e-4&&(b.scale=_,u.style.setProperty("--intro-gate-scale",_.toFixed(5)));const D=`${I.toFixed(4)}%`;D!==b.x&&(b.x=D,u.style.setProperty("--intro-gate-x",D));const Y=`${L.toFixed(4)}%`;Y!==b.y&&(b.y=Y,u.style.setProperty("--intro-gate-y",Y));const ze=Math.max(-70,Math.min(70,-d*85)),Ee=Math.max(-90,Math.min(90,-d*115));if(f){const me=Ir((S-iu)/au),P=window.innerWidth<=760?108:48,T=`calc(${(-ze).toFixed(3)}px + ${(me*P).toFixed(3)}vw)`,R=`${(-Ee).toFixed(3)}px`;T!==b.copyX&&(b.copyX=T,f.style.setProperty("--intro-copy-exit-x",T)),R!==b.copyY&&(b.copyY=R,f.style.setProperty("--intro-copy-exit-y",R))}if(y){const me=Ir((S-Dm)/Om),P=Math.pow(1-me,1.15),T=1+me*.28;Math.abs(P-b.gateOpacity)>.001&&(b.gateOpacity=P,y.style.setProperty("--intro-gate-scroll-opacity",P.toFixed(4))),Math.abs(T-b.gateScale)>.001&&(b.gateScale=T,y.style.setProperty("--intro-gate-scroll-scale",T.toFixed(4)));const R=`${(-ze).toFixed(3)}px`,F=`${(-Ee).toFixed(3)}px`;R!==b.gateCounterX&&(b.gateCounterX=R,y.style.setProperty("--intro-gate-counter-x",R)),F!==b.gateCounterY&&(b.gateCounterY=F,y.style.setProperty("--intro-gate-counter-y",F)),y.style.pointerEvents=me>.08?"none":"auto"}}),[]),c.jsxs("div",{className:`intro-chapter-content ${e?"is-active":""} ${x?"is-copy-complete":""}`,"aria-live":"off",children:[c.jsxs("h1",{ref:o,className:"intro-gate-name","aria-label":t.name,children:[c.jsx("span",{className:"intro-name-word intro-name-first","aria-hidden":"true",children:c.jsx("span",{children:p})}),c.jsx("span",{className:"intro-name-word intro-name-last","aria-hidden":"true",children:c.jsx("span",{children:h})})]}),c.jsxs("div",{ref:i,className:"intro-copy-stage",children:[c.jsxs("p",{className:"intro-coordinate","aria-label":g[0],children:[v[0],w(0)]}),c.jsxs("p",{className:"intro-role","aria-label":`${g[1]} ${g[2]}`,children:[c.jsxs("span",{children:[v[1],w(1)]}),c.jsx("br",{}),c.jsxs("span",{children:[v[2],w(2)]})]}),c.jsxs("p",{className:"intro-summary","aria-label":g[3],children:[v[3],w(3)]}),c.jsx("div",{className:"intro-actions",children:c.jsx("a",{href:t.resume,download:!0,children:"Download resume"})}),c.jsxs("div",{className:"intro-status","aria-hidden":"true",children:[c.jsx("span",{children:"Three crafted systems"}),c.jsx("span",{children:"Scroll to walk the path"})]})]}),c.jsx("div",{className:"intro-gate-entry",children:c.jsxs("div",{ref:a,className:"intro-gate-scroll-shell",children:[c.jsx("span",{className:"intro-gate-backlight","aria-hidden":"true"}),c.jsx("button",{className:"intro-gate-cta",type:"button",onClick:r,children:"Enter the archive"})]})})]})}function Vm({entryDelay:e,project:t}){const r=Pe.projectStacks[t.architectureKey]||[];return c.jsx("div",{className:"compact-stack","aria-label":`${t.title} technical stack`,children:r.slice(0,3).map(([n,o],i)=>c.jsxs("div",{style:{"--stack-enter-delay":`${e+V.stackDelay+i*V.stackStagger}ms`,"--stack-exit-delay":`${V.stackExitDelay+(2-i)*V.stackExitStagger}ms`},children:[c.jsx("span",{children:n}),c.jsx("p",{children:o.slice(0,4).join(" / ")})]},n))})}function Ym({cycle:e,entryDelay:t,isInteractive:r,onOpenArchitecture:n,project:o,sequencePhase:i,theme:a}){const l=fl[o.architectureKey],s=Xt(a),p=we("/prerak-portfolio/",s.topologySlab),h=we("/prerak-portfolio/",s.topologyRope),g=["System topology",l.label],{activeSegment:m,isAnimating:x,segments:v}=cu(g,{phase:i,enterDelay:t+V.topologyHeadingDelay,exitDelay:V.topologyHeadingExitDelay,enterSpeed:9,exitSpeed:4}),w=r&&i==="visible";return c.jsxs("aside",{className:`project-topology-stage case-sequence-${i} ${w?"is-interactive":""}`,style:{...pu(t),"--topology-slab-image":`url("${p}")`,"--topology-rope-image":`url("${h}")`},"aria-label":`${l.label} flowchart`,"aria-hidden":!w,...w?{}:{inert:""},children:[c.jsxs("div",{className:"topology-heading",children:[c.jsxs("span",{"aria-label":g[0],children:[v[0],c.jsx(fa,{activeSegment:m,index:0,isAnimating:x})]}),c.jsxs("strong",{"aria-label":g[1],children:[v[1],c.jsx(fa,{activeSegment:m,index:1,isAnimating:x})]})]}),c.jsx("ol",{className:"project-flowchart",style:{"--flow-count":l.steps.length},children:l.steps.map(([E,d],u)=>c.jsx("li",{style:{"--flow-index":u},children:c.jsxs("button",{type:"button",title:d,"aria-label":`${String(u+1).padStart(2,"0")}. ${E}: ${d}`,onClick:n,children:[c.jsx("span",{children:String(u+1).padStart(2,"0")}),c.jsx("strong",{children:E})]})},E))},`${o.title}-${e}`),c.jsx(Vm,{entryDelay:t,project:o})]})}function Xm({entryDelay:e,project:t,sequencePhase:r}){const n=[t.number,t.eyebrow,t.title,t.summary],{activeSegment:o,isAnimating:i,segments:a}=cu(n,{phase:r,enterDelay:e+V.identityDelay,exitDelay:V.identityExitDelay,enterSpeed:7,exitSpeed:3}),l=s=>c.jsx(fa,{activeSegment:o,index:s,isAnimating:i});return c.jsxs("header",{className:"project-identity-copy","aria-live":"off",children:[c.jsxs("div",{className:"project-overline",children:[c.jsxs("span",{"aria-label":n[0],children:[a[0],l(0)]}),c.jsxs("em",{"aria-label":n[1],children:[a[1],l(1)]})]}),c.jsxs("h3",{"aria-label":n[2],children:[a[2],l(2)]}),c.jsxs("p",{className:"project-summary","aria-label":n[3],children:[a[3],l(3)]})]})}function Qm({cycle:e,displayedProjectIndex:t,entryDelay:r,isActive:n,onOpenArchitecture:o,onProjectChange:i,selectedProjectIndex:a,sequencePhase:l,theme:s}){const p=Pe.projects[t],h=p.caseStudy.filter(([m])=>["Problem","Role","Decision","Result"].includes(m)),g=we("/prerak-portfolio/",Xt(s).artifacts[p.architectureKey]);return c.jsxs("div",{className:`chapter-content projects-chapter-content ${n?"is-sequence-active":""}`,style:pu(r),children:[c.jsx(Hm,{isActive:n}),c.jsx(uu,{activeIndex:a,className:"project-switcher",label:"Engineering case studies",children:Pe.projects.map((m,x)=>c.jsxs("button",{type:"button",role:"tab","aria-selected":x===a,className:x===a?"active":"",style:{"--case-tab-enter-delay":`${V.tabsDelay+x*V.tabStagger}ms`},onClick:()=>i(x),children:[c.jsx("span",{children:m.number}),c.jsx("strong",{children:m.title.replace("Aegis ","")})]},m.title))}),c.jsxs("div",{className:`project-spatial-grid project-case-layout case-sequence-${l}`,"aria-busy":l!=="visible",...l!=="visible"?{inert:""}:{},children:[c.jsx(Xm,{entryDelay:r,project:p,sequencePhase:l}),c.jsxs("div",{className:`project-artifact-stage artifact-${p.architectureKey}`,"aria-hidden":"true",children:[c.jsx("div",{className:"artifact-orbit artifact-orbit-outer"}),c.jsx("div",{className:"artifact-orbit artifact-orbit-inner"}),c.jsx("img",{src:g,alt:"",draggable:"false"}),c.jsxs("span",{children:[p.number," / physical system model"]})]}),c.jsx("dl",{className:"project-proof-grid",children:h.map(([m,x],v)=>c.jsxs("div",{style:{"--proof-enter-delay":`${r+V.proofDelay+v*V.proofStagger}ms`,"--proof-exit-delay":`${V.proofExitDelay+(h.length-1-v)*V.proofExitStagger}ms`},children:[c.jsx("dt",{children:m}),c.jsx("dd",{children:x})]},m))}),c.jsxs("div",{className:"project-action-row",children:[c.jsx("a",{href:p.actions[0].href,...Po(p.actions[0].href),children:"View repository"}),c.jsx("button",{type:"button",onClick:o,children:"Open topology"})]})]},`${p.title}-${e}`)]})}function Km({project:e,onClose:t}){const r=k.useRef(null),n=fl[e.architectureKey],o=Pe.projectStacks[e.architectureKey]||[];return k.useEffect(()=>{var l;const i=document.activeElement;document.body.classList.add("archive-dialog-open"),(l=r.current)==null||l.focus();const a=s=>{s.key==="Escape"&&t()};return window.addEventListener("keydown",a),()=>{var s;document.body.classList.remove("archive-dialog-open"),window.removeEventListener("keydown",a),(s=i==null?void 0:i.focus)==null||s.call(i)}},[t]),c.jsx("div",{className:"architecture-dialog-backdrop",role:"presentation",onMouseDown:i=>i.target===i.currentTarget&&t(),children:c.jsxs("section",{className:"architecture-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"architecture-dialog-title",children:[c.jsxs("header",{children:[c.jsxs("div",{children:[c.jsxs("p",{children:[e.number," / Developer topology"]}),c.jsx("h2",{id:"architecture-dialog-title",children:e.title})]}),c.jsx("button",{ref:r,type:"button",className:"dialog-close","aria-label":"Close architecture",onClick:t,children:c.jsx("span",{"aria-hidden":"true"})})]}),c.jsx("p",{className:"architecture-dialog-summary",children:n.description}),c.jsx("dl",{className:"architecture-case-study",children:e.caseStudy.map(([i,a])=>c.jsxs("div",{children:[c.jsx("dt",{children:i}),c.jsx("dd",{children:a})]},i))}),c.jsx("div",{className:"architecture-step-grid",children:n.steps.map(([i,a],l)=>c.jsxs("article",{children:[c.jsx("span",{children:String(l+1).padStart(2,"0")}),c.jsx("h3",{children:i}),c.jsx("p",{children:a})]},i))}),n.placement&&c.jsxs("div",{className:"architecture-placement",children:[c.jsx("span",{children:"Recommended Anim Blueprint placement"}),c.jsx("div",{children:n.placement.map((i,a)=>c.jsxs("strong",{children:[i,a<n.placement.length-1?"  >":""]},i))})]}),c.jsxs("div",{className:"architecture-notes",children:[n.command&&c.jsx("code",{children:n.command}),c.jsx("ul",{children:n.notes.map(i=>c.jsx("li",{children:i},i))})]}),c.jsx("div",{className:"architecture-stack-grid","aria-label":`${e.title} technical stack`,children:o.map(([i,a])=>c.jsxs("div",{children:[c.jsx("span",{children:i}),c.jsx("p",{children:a.join(" / ")})]},i))})]})})}function Ns({chapterIndex:e,items:t,selectedIndex:r,onSelect:n,showStack:o=!1}){const i=t[r]||t[0],a=t.map(l=>l.meta.split("/")[0].trim());return c.jsxs("div",{className:"chapter-content timeline-chapter-content",children:[c.jsx(ml,{chapter:se[e],signal:e===2?"Production craft and growth":"Study, practice, continuation"}),c.jsxs("div",{className:"spatial-timeline",children:[c.jsxs("div",{className:"timeline-axis","aria-hidden":"true",children:[c.jsx("span",{children:a[a.length-1]}),c.jsx("i",{}),c.jsx("span",{children:a[0]})]}),c.jsx("div",{className:"timeline-waypoints",role:"tablist","aria-label":`${se[e].navLabel} timeline`,children:t.map((l,s)=>c.jsxs("button",{type:"button",role:"tab","aria-selected":s===r,className:s===r?"active":"",onClick:()=>n(s),children:[c.jsx("span",{children:l.meta.split("/")[0].trim()}),c.jsx("i",{}),c.jsx("strong",{children:l.title}),c.jsx("small",{children:l.subtitle})]},`${l.meta}-${l.title}`))}),c.jsxs("article",{className:"timeline-focus-card",children:[c.jsx("p",{children:i.meta}),c.jsx("h3",{children:i.title}),c.jsx("strong",{children:i.subtitle}),c.jsx("span",{children:i.body}),c.jsx("ul",{children:i.bullets.map(l=>c.jsx("li",{children:l},l))})]},i.title)]}),o&&c.jsx("div",{className:"professional-stack-strip",children:Pe.stackGroups.map(([l,s])=>c.jsxs("div",{children:[c.jsx("span",{children:l}),c.jsx("p",{children:s.slice(0,5).join(" / ")})]},l))})]})}function Gm({item:e,index:t,title:r,theme:n}){if(e.src&&e.type==="video")return c.jsx("video",{controls:!0,preload:"metadata",poster:e.poster||void 0,"aria-label":e.alt,children:c.jsx("source",{src:e.src})});if(e.src)return c.jsx("img",{src:e.src,alt:e.alt});const o=r.toLowerCase().includes("writing")?"writing":r.toLowerCase().includes("travel")||r.toLowerCase().includes("adventure")?"travel":"photography",i=Xt(n).field,a=Mm[o],l={"--field-image":`url("${we("/prerak-portfolio/",i)}")`,"--field-position":a};return c.jsxs("div",{className:`field-note-placeholder field-${o}`,style:l,"aria-label":e.alt,children:[c.jsx("span",{children:String(t+1).padStart(2,"0")}),c.jsx("i",{}),c.jsx("strong",{children:r}),c.jsx("small",{children:"Curated field plate"})]})}function qm({activeCollectionIndex:e,onCollectionChange:t,theme:r}){const[n,o]=k.useState([0,0,0]),i=Pe.personalProjects[e],a=n[e]||0,l=i.media[a]||i.media[0],s=p=>{o(h=>h.map((g,m)=>m===e?p:g))};return c.jsxs("div",{className:"chapter-content personal-chapter-content",children:[c.jsx(ml,{chapter:se[4],signal:"Photography, essays, journeys"}),c.jsx(uu,{activeIndex:e,className:"personal-switcher",label:"Personal collections",children:Pe.personalProjects.map((p,h)=>c.jsxs("button",{type:"button",role:"tab","aria-selected":h===e,className:h===e?"active":"",onClick:()=>t(h),children:[c.jsxs("span",{children:["0",h+1]}),c.jsx("strong",{children:p.meta})]},p.meta))}),c.jsxs("div",{className:"personal-spatial-grid",children:[c.jsxs("article",{className:"personal-feature",children:[c.jsx("div",{className:"personal-feature-art",children:c.jsx(Gm,{item:l,index:a,title:i.meta,theme:r})}),c.jsxs("div",{className:"personal-feature-caption",children:[c.jsx("span",{children:l.meta}),c.jsx("p",{children:l.caption})]})]},`${i.meta}-${a}`),c.jsxs("aside",{className:"personal-collection-copy",children:[c.jsx("p",{children:i.subtitle}),c.jsx("h3",{children:i.title}),c.jsx("span",{children:i.body}),c.jsx("div",{className:"personal-media-index",children:i.media.map((p,h)=>c.jsxs("button",{type:"button",className:h===a?"active":"","aria-pressed":h===a,onClick:()=>s(h),children:[c.jsx("span",{children:String(h+1).padStart(2,"0")}),c.jsx("strong",{children:p.meta})]},`${p.meta}-${h}`))})]})]})]})}function Jm({profile:e}){return c.jsxs("div",{className:"chapter-content contact-chapter-content",children:[c.jsx(ml,{chapter:se[5],signal:"Chicago, Amsterdam, or remote"}),c.jsxs("div",{className:"contact-transmission",children:[c.jsx("p",{children:"Open to backend, platform, online-services, tools, and game-technology conversations."}),c.jsx("a",{className:"contact-email",href:Xp(e.email),children:e.email}),c.jsxs("div",{className:"contact-grid",children:[c.jsxs("a",{href:e.github,...Po(e.github),children:[c.jsx("span",{children:"01"}),c.jsx("strong",{children:"GitHub"}),c.jsx("small",{children:"Source and repositories"})]}),c.jsxs("a",{href:e.linkedin,...Po(e.linkedin),children:[c.jsx("span",{children:"02"}),c.jsx("strong",{children:"LinkedIn"}),c.jsx("small",{children:"Professional record"})]}),c.jsxs("a",{href:e.resume,download:!0,children:[c.jsx("span",{children:"03"}),c.jsx("strong",{children:"Resume"}),c.jsx("small",{children:"PDF / current"})]})]})]})]})}function Zm({activeIndex:e}){const t=k.useRef(null);return k.useLayoutEffect(()=>wn(({progress:r})=>{t.current&&(t.current.textContent=String(Math.round(r*100)).padStart(3,"0"))}),[]),c.jsxs("div",{className:"archive-progress","aria-hidden":"true",children:[c.jsx("span",{children:se[e].index}),c.jsx("div",{children:se.map((r,n)=>c.jsx("i",{className:n<=e?"active":""},r.id))}),c.jsx("strong",{ref:t,children:"000"})]})}const eh=k.memo($m),th=k.memo(Fm),rh=k.memo(Bm),nh=k.memo(Um),oh=k.memo(Km);function ih({profile:e,activeIndex:t,goToChapter:r,theme:n,setTheme:o,atmospherePower:i,setAtmospherePower:a,experienceVisible:l,onWorldReady:s,onEnvironmentReady:p}){const[h,g]=k.useState(!1),[m,x]=k.useState(!1),[v,w]=k.useState(0),[E,d]=k.useState(0),[u,f]=k.useState(0),[y,S]=k.useState(null),[b,C]=k.useState(!1),z=k.useRef([]),M=l&&t===1,{cycle:_,displayedIndex:I,entryDelay:L,phase:D,selectedIndex:Y,selectProject:ze}=ym(M,Pe.projects.length),Ee=k.useCallback(()=>r(0),[r]),me=k.useCallback(()=>x(!0),[]),P=k.useCallback(()=>g(!0),[]),T=k.useCallback(()=>S(null),[]),R=k.useCallback(()=>{S(Pe.projects[I])},[I]),F=k.useMemo(()=>[c.jsx(Wm,{isActive:l&&t===0,profile:e,onEnter:()=>r(1),onGuideReady:me}),c.jsx(Qm,{cycle:_,displayedProjectIndex:I,entryDelay:L,isActive:M,onProjectChange:ze,onOpenArchitecture:R,selectedProjectIndex:Y,sequencePhase:D,theme:n}),c.jsx(Ns,{chapterIndex:2,items:Pe.professionalTimeline,selectedIndex:v,onSelect:w,showStack:!0}),c.jsx(Ns,{chapterIndex:3,items:Pe.educationTimeline,selectedIndex:E,onSelect:d}),c.jsx(qm,{activeCollectionIndex:u,onCollectionChange:f,theme:n}),c.jsx(Jm,{profile:e})],[u,E,t,v,I,l,r,R,me,e,_,L,D,M,ze,Y,n]),J=k.useMemo(()=>c.jsx(Ym,{cycle:_,entryDelay:L,isInteractive:M,onOpenArchitecture:R,project:Pe.projects[I],sequencePhase:D,theme:n}),[I,R,_,L,D,M,n]),Qt=k.useMemo(()=>{const oe=Xt(n);return{"--surface-image":`url("${we("/prerak-portfolio/",oe.surface)}")`,"--control-slab-image":`url("${we("/prerak-portfolio/",oe.controlSlab)}")`,"--wayfinder-slab-image":`url("${we("/prerak-portfolio/",oe.wayfinderSlab)}")`,"--lore-slab-image":`url("${we("/prerak-portfolio/",oe.loreSlab)}")`,"--text-distress-mask":`url("${we("/prerak-portfolio/","cinematic/ui/text-distress-mask.png")}")`}},[n]);return k.useLayoutEffect(()=>wn(({scenePosition:oe})=>{z.current.forEach((ie,Le)=>{if(!ie)return;const Tt=Math.abs(Le-oe)<Lm;if(ie.classList.toggle("near",Tt),!Tt)return;const du=Ps(Le,oe);Object.entries(du).forEach(([fu,mu])=>{ie.style.setProperty(fu,String(mu))})})}),[]),c.jsxs("div",{className:`archive-viewport theme-${n} rail-${b?"collapsed":"expanded"}`,style:Qt,children:[c.jsx(jm,{theme:n,onReady:p,systemsOverlay:J}),c.jsx("div",{className:"archive-color-grade","aria-hidden":"true"}),c.jsx(_m,{theme:n,atmospherePower:i,onReady:s}),c.jsx("div",{className:"archive-grain","aria-hidden":"true"}),c.jsx(eh,{profile:e,onIntro:Ee}),c.jsx(th,{activeIndex:t,collapsed:b,onCollapsedChange:C,onSelect:r}),c.jsx("main",{className:"archive-scene-stack","aria-live":"polite",children:F.map((oe,ie)=>c.jsx("section",{ref:Le=>{z.current[ie]=Le},className:`archive-scene scene-${se[ie].id} ${ie===0?"near":""} ${ie===t?"active":""}`,style:Ps(ie,ie===0?0:-1),"aria-hidden":ie!==t,...ie!==t?{inert:""}:{},children:oe},se[ie].id))}),c.jsx(rh,{activeIndex:t,introGuideReady:m,themePromptCompleted:h,theme:n}),c.jsx(nh,{activeIndex:t,theme:n,onThemeChange:o,atmospherePower:i,onAtmospherePowerChange:a,onThemeChosen:P}),c.jsx(Zm,{activeIndex:t}),y&&c.jsx(oh,{project:y,onClose:T})]})}function Vo(e,t,r){return Math.min(r,Math.max(t,e))}const Bn=.2,ah=215,Ts=1e-4,Rs=Object.freeze({progress:0,scenePosition:0,activeIndex:0,direction:1});function lh(e){const t=Vo(e,0,1);return t*t*t*(t*(t*6-15)+10)}function sh(e,t){const r=Math.max(0,t-1),n=Vo(e,0,r);if(n>=r)return r;const o=Math.floor(n),i=n-o;if(i<=Bn)return o;if(i>=1-Bn)return o+1;const a=(i-Bn)/(1-Bn*2);return o+lh(a)}function ch(e,t){const r=Vo(window.scrollY/t,0,1),n=r*Math.max(0,e-1),o=sh(n,e);return{progress:r,scenePosition:o,activeIndex:Math.min(e-1,Math.max(0,Math.round(o)))}}function ph(e){const[t,r]=k.useState(0),n=k.useRef(0),o=k.useRef(0),i=k.useRef(0),a=k.useRef(1),l=k.useRef(Rs),s=k.useRef(Rs),p=k.useRef(t);k.useEffect(()=>{const g=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=w=>{o.current=0;const E=l.current,d=s.current,u=i.current?Math.min(64,Math.max(1,w-i.current)):16.67;i.current=w;const f=g?1:1-Math.exp(-u/ah),y=d.progress-E.progress,S=d.scenePosition-E.scenePosition,b=Math.abs(y)<Ts&&Math.abs(S)<Ts,C=b?d.progress:E.progress+y*f,z=b?d.scenePosition:E.scenePosition+S*f,M={progress:C,scenePosition:z,activeIndex:Math.min(e-1,Math.max(0,Math.round(z))),direction:d.direction};l.current=M,wm(M),M.activeIndex!==p.current&&(p.current=M.activeIndex,r(M.activeIndex)),b||(o.current=window.requestAnimationFrame(m))},x=()=>{const w=ch(e,a.current),E=window.scrollY,d=n.current,u=E>d?1:E<d?-1:s.current.direction;n.current=E,s.current={...w,direction:u},o.current||(i.current=0,o.current=window.requestAnimationFrame(m))},v=()=>{a.current=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),x()};return n.current=window.scrollY,v(),window.addEventListener("scroll",x,{passive:!0}),window.addEventListener("resize",v),()=>{window.removeEventListener("scroll",x),window.removeEventListener("resize",v),o.current&&window.cancelAnimationFrame(o.current),o.current=0,i.current=0}},[e]);const h=k.useCallback((g,m="smooth")=>{const x=Vo(g,0,Math.max(0,e-1)),v=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),w=e<=1?0:x/(e-1),E=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:w*v,behavior:E?"auto":m})},[e]);return{activeIndex:t,goToChapter:h}}const uh=`
  :root {
    color-scheme: dark;
    font-family: "Barlow Condensed", "Arial Narrow", sans-serif;
    background: #080806;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  * {
    box-sizing: border-box;
    letter-spacing: 0;
  }

  html {
    min-width: 320px;
    background: #080806;
    scrollbar-width: none;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    overflow-x: hidden;
    background: #080806;
  }

  body.archive-dialog-open {
    overflow: hidden;
  }

  button,
  a,
  input {
    font: inherit;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button {
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .archive-app {
    --font-engraved: "Barlow Condensed", "Agency FB", "Arial Narrow", sans-serif;
    --font-display: var(--font-engraved);
    --font-body: var(--font-engraved);
    --font-inscription: var(--font-engraved);
    --surface-text-shadow: 0 -1px 0 rgba(0, 0, 0, .96), 0 1px 0 rgba(255, 237, 199, .26), 0 2px 6px rgba(0, 0, 0, .74);
    --active-material-filter: brightness(1.28) saturate(1.08);
    --bg: #080806;
    --ink: #f0eadf;
    --muted: #b8b0a3;
    --faint: #777168;
    --accent: #d6b36b;
    --accent-rgb: 214, 179, 107;
    --mountain: #34312d;
    --surface: rgba(17, 16, 14, 0.68);
    --surface-strong: rgba(11, 10, 9, 0.9);
    --panel-ink: #f0eadf;
    --panel-muted: #aaa294;
    --line: rgba(228, 200, 149, 0.24);
    --line-strong: rgba(228, 200, 149, 0.58);
    --parchment: #d6c7a6;
    --parchment-ink: #211d17;
    --danger: #e59467;
    --world-mix: rgba(8, 8, 6, .32);
    position: relative;
    min-height: 100vh;
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--ink);
  }

  .archive-app.theme-fall {
    --surface-text-shadow: 0 -1px 0 rgba(20, 3, 7, .98), 0 1px 0 rgba(255, 215, 181, .24), 0 2px 7px rgba(20, 3, 7, .76);
    --active-material-filter: brightness(1.32) saturate(1.12);
    --bg: #110709;
    --ink: #f4e8df;
    --muted: #c9a99e;
    --faint: #866d68;
    --accent: #d9824d;
    --accent-rgb: 217, 130, 77;
    --mountain: #491523;
    --surface: rgba(38, 11, 18, 0.74);
    --surface-strong: rgba(23, 7, 11, 0.93);
    --panel-ink: #f4e8df;
    --panel-muted: #c6a89c;
    --line: rgba(217, 130, 77, 0.27);
    --line-strong: rgba(217, 130, 77, 0.64);
    --parchment: #c49b78;
    --parchment-ink: #2b1017;
    --world-mix: rgba(73, 21, 35, .28);
  }

  .archive-app.theme-spring {
    --surface-text-shadow: 0 -1px 0 rgba(0, 16, 11, .98), 0 1px 0 rgba(219, 244, 204, .24), 0 2px 7px rgba(0, 18, 12, .74);
    --active-material-filter: brightness(1.3) saturate(1.08);
    --bg: #05100d;
    --ink: #eaf1e8;
    --muted: #a7c0b3;
    --faint: #667e73;
    --accent: #a5cb75;
    --accent-rgb: 165, 203, 117;
    --mountain: #0b5948;
    --surface: rgba(7, 35, 28, 0.72);
    --surface-strong: rgba(4, 22, 17, 0.93);
    --panel-ink: #edf4eb;
    --panel-muted: #a9c2b4;
    --line: rgba(165, 203, 117, 0.25);
    --line-strong: rgba(165, 203, 117, 0.62);
    --parchment: #bdcaa5;
    --parchment-ink: #0a261e;
    --world-mix: rgba(11, 89, 72, .22);
  }

  .archive-app.theme-winter {
    --surface-text-shadow: 0 -1px 0 rgba(0, 0, 0, .44), 0 1px 0 rgba(255, 255, 255, .88), 0 0 8px rgba(235, 245, 248, .42);
    --active-material-filter: brightness(1.2) contrast(1.02);
    --bg: #071015;
    --ink: #edf5f7;
    --muted: #050505;
    --faint: #050505;
    --accent: #050505;
    --accent-rgb: 5, 5, 5;
    --mountain: #263f4d;
    --surface: rgba(207, 220, 225, 0.78);
    --surface-strong: rgba(221, 231, 234, 0.93);
    --panel-ink: #050505;
    --panel-muted: #050505;
    --line: rgba(0, 0, 0, 0.34);
    --line-strong: rgba(0, 0, 0, 0.72);
    --parchment: #b9cbd1;
    --parchment-ink: #050505;
    --world-mix: rgba(38, 63, 77, .28);
  }

  .theme-winter .chapter-rail-list button.active,
  .theme-winter .archive-header-actions .archive-header-primary,
  .theme-winter .project-action-row a {
    color: #f4f7f8;
  }

  .archive-app.theme-winter .intro-gate-cta,
  .archive-app.theme-winter .intro-gate-cta:hover {
    color: #050505;
    font-weight: 700;
    text-shadow:
      0 1px 0 rgba(255, 255, 255, .78),
      0 -1px 0 rgba(0, 0, 0, .48),
      0 0 1px rgba(0, 0, 0, .72);
  }

  .theme-winter .chapter-heading p,
  .theme-winter .chapter-heading > span {
    text-shadow: 0 1px 1px rgba(255, 255, 255, .76), 0 0 7px rgba(235, 245, 248, .48);
  }

  .archive-app,
  .archive-app * {
    font-family: var(--font-engraved) !important;
  }

  .archive-scroll-track {
    position: relative;
    z-index: 0;
    pointer-events: none;
  }

  .archive-scroll-marker {
    position: absolute;
    left: 0;
    width: 1px;
    height: 1px;
  }

  .archive-viewport {
    position: fixed;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    overflow: clip;
    isolation: isolate;
    background: var(--bg);
    color: var(--ink);
  }

  .cinematic-environment {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    background: #050504;
    perspective: 1600px;
  }

  .cinematic-image-stage {
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100vw, 177.68vh);
    aspect-ratio: 1672 / 941;
    transform: translate(-50%, -50%) translate3d(var(--environment-parallax-x), var(--environment-parallax-y), 0);
    transform-origin: 50% 56%;
    transform-style: preserve-3d;
  }

  .environment-plate {
    position: absolute;
    inset: 0;
    transform-origin: 50% 55%;
    transition: none;
    backface-visibility: hidden;
    will-change: opacity, transform;
  }

  .environment-plate img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: fill;
    user-select: none;
  }

  .gateway-sequence-plate {
    z-index: 1;
    contain: paint;
  }
  .gateway-sequence-frame {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
  }
  .gateway-sequence-frame img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: fill;
  }
  .systems-plate { z-index: 2; }
  .chronology-plate { z-index: 3; }
  .field-plate { z-index: 4; }
  .return-gateway-plate { z-index: 5; }

  .environment-transition-veil {
    position: absolute;
    inset: -12%;
    z-index: 6;
    opacity: calc(var(--transition-pulse) * .72);
    pointer-events: none;
    background:
      radial-gradient(ellipse at 50% 56%, rgba(var(--accent-rgb), .18), transparent 34%),
      radial-gradient(ellipse at 50% 54%, transparent 18%, rgba(0, 0, 0, .46) 58%, rgba(0, 0, 0, .72) 100%);
    transform: scale(calc(.96 + var(--transition-pulse) * .06));
    transform-origin: 50% 55%;
    transition: none;
  }

  .transition-idle .environment-transition-veil { opacity: 0; }

  .environment-volumetrics {
    position: absolute;
    inset: 0;
    z-index: 7;
    opacity: .72;
    background:
      linear-gradient(104deg, transparent 0 21%, rgba(var(--accent-rgb), .08) 42%, transparent 61%),
      linear-gradient(180deg, rgba(0,0,0,.12), transparent 38%, rgba(0,0,0,.38));
    mix-blend-mode: screen;
  }

  .environment-vignette {
    position: absolute;
    inset: -2px;
    z-index: 8;
    background:
      linear-gradient(90deg, rgba(2,2,2,.72) 0%, transparent 30%, transparent 73%, rgba(2,2,2,.58) 100%),
      linear-gradient(180deg, rgba(0,0,0,.55) 0%, transparent 27%, transparent 68%, rgba(0,0,0,.72) 100%);
    box-shadow: inset 0 0 15vw rgba(0,0,0,.48);
  }

  .archive-color-grade {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(var(--accent-rgb), .025), transparent 44%, rgba(0,0,0,.1));
    mix-blend-mode: soft-light;
    opacity: .5;
  }

  .theme-fall .archive-color-grade,
  .theme-spring .archive-color-grade,
  .theme-winter .archive-color-grade { background-color: transparent; }

  .spatial-world {
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  .spatial-world-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .archive-grain {
    display: none;
  }

  .archive-header {
    position: absolute;
    z-index: 8;
    top: 22px;
    left: 28px;
    right: 28px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0;
  }

  .archive-identity {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: 0 0 11px;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  .archive-identity .profile-avatar {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border: 0;
    border-radius: 50%;
    filter: none;
    box-shadow: 0 9px 22px rgba(0, 0, 0, .42);
  }

  .theme-fall .archive-identity .profile-avatar,
  .theme-spring .archive-identity .profile-avatar,
  .theme-winter .archive-identity .profile-avatar { filter: none; }

  .archive-identity span {
    display: grid;
    gap: 2px;
  }

  .archive-identity strong {
    font-family: "Arial Narrow", "Segoe UI", sans-serif;
    font-size: 19.87px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .archive-identity small {
    color: var(--muted);
    font-family: Consolas, monospace;
    font-size: 12.42px;
    text-transform: uppercase;
  }

  .archive-header-actions {
    display: flex;
    align-items: center;
    gap: 7px;
    padding-bottom: 10px;
  }

  .archive-header-actions a {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    border: 1px solid var(--line);
    background: rgba(5, 5, 4, 0.28);
    color: var(--ink);
    font-size: 14.9px;
    text-transform: uppercase;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
  }

  .archive-header-actions a:hover {
    border-color: var(--line-strong);
    background: rgba(var(--accent-rgb), 0.1);
  }

  .archive-header-actions .archive-header-primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #0a0907;
  }

  .chapter-rail {
    position: absolute;
    z-index: 9;
    left: 24px;
    top: 50%;
    width: 112px;
    transform: translateY(-50%);
    transition: width 400ms cubic-bezier(.2,.8,.2,1), transform 400ms cubic-bezier(.2,.8,.2,1);
  }

  .chapter-rail-list {
    display: grid;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    overflow: hidden;
    transition: opacity 240ms ease, transform 400ms cubic-bezier(.2,.8,.2,1);
  }

  .chapter-rail-list button {
    position: relative;
    width: 100%;
    min-height: 52px;
    display: grid;
    grid-template-columns: 25px 1fr;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    border: 0;
    border-bottom: 1px solid var(--line);
    background: rgba(6, 6, 5, 0.36);
    color: var(--muted);
    cursor: pointer;
    text-align: left;
    transition: background 180ms ease, color 180ms ease;
  }

  .chapter-rail-list button:last-child { border-bottom: 0; }
  .chapter-rail-list button:hover { background: rgba(var(--accent-rgb), 0.09); color: var(--ink); }

  .chapter-rail-list button.active {
    background: var(--accent);
    color: #090806;
  }

  .chapter-rail-list button.active::after {
    content: "";
    position: absolute;
    right: -8px;
    top: calc(50% - 7px);
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 8px solid var(--accent);
  }

  .chapter-rail-list span {
    font-family: Consolas, monospace;
    font-size: 12.42px;
  }

  .chapter-rail-list strong {
    font-size: 13.66px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .chapter-collapse {
    position: absolute;
    left: 100%;
    top: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .chapter-rail.is-collapsed { width: 0; }
  .chapter-rail.is-collapsed .chapter-rail-list { opacity: 0; transform: translateX(-120px); pointer-events: none; }
  .chapter-scroll-arrow { display: none; }

  .triangle-pointer {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    transition: transform 380ms cubic-bezier(.2,.8,.2,1);
  }

  .triangle-pointer.right { border-width: 6px 0 6px 9px; border-color: transparent transparent transparent currentColor; }
  .triangle-pointer.left { border-width: 6px 9px 6px 0; border-color: transparent currentColor transparent transparent; }
  .triangle-pointer.down { border-width: 9px 6px 0; border-color: currentColor transparent transparent; }
  .triangle-pointer.up { border-width: 0 6px 9px; border-color: transparent transparent currentColor; }

  .chapter-collapse:focus-visible,
  .hud-collapse:focus-visible,
  .lore-toggle:focus-visible {
    outline: 0;
  }

  .chapter-collapse:focus-visible .triangle-pointer,
  .hud-collapse:focus-visible .triangle-pointer,
  .lore-toggle:focus-visible .triangle-pointer {
    filter: drop-shadow(0 0 4px var(--accent));
    transform: scale(1.22);
  }

  .archive-scene-stack {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
  }

  .archive-scene {
    position: absolute;
    inset: 94px 386px 160px 152px;
    opacity: var(--scene-opacity);
    transform:
      translate3d(var(--scene-shift-x), var(--scene-shift), 0)
      scale(var(--scene-scale));
    transform-origin: 50% 54%;
    transform-style: flat;
    pointer-events: none;
    visibility: hidden;
    backface-visibility: hidden;
    will-change: opacity, transform;
  }

  .archive-scene::before {
    display: none;
  }

  .archive-scene.active {
    pointer-events: auto;
  }

  .archive-scene.active .chapter-heading { animation: none; }
  .archive-scene.active .project-spatial-grid,
  .archive-scene.active .spatial-timeline,
  .archive-scene.active .personal-spatial-grid,
  .archive-scene.active .contact-transmission { animation: none; }

  .archive-scene.near {
    visibility: visible;
  }

  .chapter-content {
    height: 100%;
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 14px;
  }

  .chapter-heading {
    min-width: 0;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 30px;
    padding-bottom: 12px;
    border-bottom: 0;
  }

  .chapter-heading > div { min-width: 0; }

  .chapter-heading p,
  .chapter-heading > span {
    margin: 0 0 6px;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 12.42px;
    text-transform: uppercase;
  }

  .chapter-heading h2 {
    max-width: 780px;
    margin: 0;
    font-family: "Arial Narrow", "Segoe UI", sans-serif;
    font-size: 37.26px;
    line-height: 1.04;
    font-weight: 650;
    text-transform: uppercase;
  }

  .chapter-heading > span {
    flex: 0 0 auto;
    color: var(--muted);
    text-align: right;
  }

  .intro-chapter-content {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .intro-gate-name {
    --intro-name-size: 64px;
    --intro-first-shift: 0%;
    --intro-last-shift: 0%;
    --intro-gate-scale: 1.005;
    --intro-gate-x: 0%;
    --intro-gate-y: .1%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    width: max(100vw, 177.68vh);
    aspect-ratio: 1672 / 941;
    margin: 0;
    color: color-mix(in srgb, var(--ink) 78%, var(--mountain));
    pointer-events: none;
    text-transform: uppercase;
    transform:
      translate(-50%, -50%)
      translate3d(var(--intro-gate-x), var(--intro-gate-y), 0)
      scale(var(--intro-gate-scale));
    transform-origin: 50% 55%;
  }

  .intro-name-word {
    position: absolute;
    top: calc(11.15% - var(--intro-name-size) + 9px);
    height: calc(var(--intro-name-size) - 9px);
    overflow: hidden;
    padding: 0 4px;
    font-family: var(--font-display);
    font-size: var(--intro-name-size);
    font-weight: 700;
    line-height: .92;
    -webkit-text-stroke: 1px rgba(0, 0, 0, .22);
    text-shadow:
      0 -1px 0 rgba(255, 255, 255, .24),
      0 2px 1px rgba(0, 0, 0, .88),
      0 10px 16px rgba(0, 0, 0, .54);
    filter: contrast(1.04) saturate(.72);
  }

  .intro-name-first {
    right: 51.75%;
    text-align: right;
    transform: matrix(.982, -.187, -.052, .999, 0, 0);
    transform-origin: 100% 100%;
  }

  .intro-name-last {
    left: 51.17%;
    text-align: left;
    transform: matrix(.982, .187, .052, .999, 0, 0);
    transform-origin: 0 100%;
  }

  .intro-name-word > span {
    display: block;
    transform: translate3d(0, 125%, 0);
    transform-origin: 50% 100%;
  }

  .intro-chapter-content.is-active .intro-name-first > span {
    animation: gateNameEmerge 1050ms cubic-bezier(.2,.76,.18,1) 140ms both;
  }

  .intro-chapter-content.is-active .intro-name-last > span {
    animation: gateNameEmerge 1050ms cubic-bezier(.2,.76,.18,1) 700ms both;
  }

  .intro-gate-name.is-scroll-controlled .intro-name-word > span {
    animation: none !important;
  }

  .intro-gate-name.is-scroll-controlled .intro-name-first > span {
    transform: translate3d(0, var(--intro-first-shift), 0);
  }

  .intro-gate-name.is-scroll-controlled .intro-name-last > span {
    transform: translate3d(0, var(--intro-last-shift), 0);
  }

  .intro-copy-stage {
    --intro-copy-exit-x: 0px;
    --intro-copy-exit-y: 0px;
    position: absolute;
    z-index: 3;
    top: 20%;
    right: clamp(30px, 3.4vw, 58px);
    width: min(340px, 26vw);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    pointer-events: auto;
    transform: translate3d(var(--intro-copy-exit-x), var(--intro-copy-exit-y), 0);
    will-change: transform;
  }

  .intro-coordinate {
    flex: 0 0 auto;
    margin: 0 0 14px;
    min-height: 1.25em;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 13.66px;
  }

  .intro-role {
    flex: 0 0 auto;
    width: 100%;
    margin: 0;
    min-height: 2.44em;
    font-family: Georgia, serif;
    font-size: 27px;
    line-height: 1.18;
    color: var(--ink);
  }

  .intro-summary {
    flex: 0 0 auto;
    max-width: 100%;
    margin: 14px 0 0;
    min-height: 3.1em;
    color: var(--muted);
    font-size: 18px;
    line-height: 1.45;
  }

  .intro-caret {
    width: 7px;
    height: 7px;
    display: inline-block;
    margin-left: 7px;
    background: var(--accent);
    transform: rotate(45deg);
    vertical-align: .14em;
    animation: loreBlink 800ms steps(1, end) infinite;
  }

  .intro-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    flex: 0 0 auto;
    margin-top: 14px;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, 14px, 0);
    transition: opacity 420ms ease, transform 620ms cubic-bezier(.16,.8,.2,1), visibility 0ms linear 620ms;
  }

  .intro-chapter-content.is-copy-complete .intro-actions {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 100ms, 100ms, 0ms;
  }

  .intro-actions a,
  .intro-gate-cta,
  .project-action-row a,
  .project-action-row button {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
    border: 1px solid var(--line-strong);
    background: rgba(5, 5, 4, 0.42);
    color: var(--ink);
    cursor: pointer;
    font-size: 14.9px;
    font-weight: 650;
    text-transform: uppercase;
    transition: background 180ms ease, color 180ms ease, transform 180ms ease;
  }

  .intro-gate-cta,
  .project-action-row a {
    background: var(--accent);
    border-color: var(--accent);
    color: #090806;
  }

  .intro-actions a:hover,
  .intro-gate-cta:hover,
  .project-action-row a:hover,
  .project-action-row button:hover { transform: translateY(-2px); }

  .intro-gate-entry {
    position: absolute;
    top: 77.2%;
    left: 50%;
    z-index: 1;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    isolation: isolate;
    transform: translate3d(-50%, 18px, 0) scale(.94);
    transform-origin: 50% 50%;
    transition:
      opacity 520ms ease,
      transform 780ms cubic-bezier(.16, .8, .2, 1),
      visibility 0ms linear 780ms;
  }

  .intro-chapter-content.is-copy-complete .intro-gate-entry {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate3d(-50%, 0, 0) scale(1);
    transition-delay: 720ms, 640ms, 0ms;
  }

  .intro-gate-scroll-shell {
    position: relative;
    display: grid;
    place-items: center;
    opacity: var(--intro-gate-scroll-opacity, 1);
    transform:
      translate3d(
        var(--intro-gate-counter-x, 0px),
        var(--intro-gate-counter-y, 0px),
        0
      )
      scale(var(--intro-gate-scroll-scale, 1));
    transform-origin: 50% 50%;
    will-change: opacity, transform;
  }

  .intro-gate-backlight {
    position: absolute;
    left: 50%;
    bottom: 42%;
    z-index: -1;
    width: 4px;
    height: 158px;
    background: color-mix(in srgb, var(--accent) 84%, white);
    opacity: .76;
    filter: blur(3px);
    box-shadow:
      0 0 12px 4px color-mix(in srgb, var(--accent) 60%, transparent),
      0 -32px 34px 10px color-mix(in srgb, var(--accent) 28%, transparent),
      0 24px 30px 7px color-mix(in srgb, var(--accent) 34%, transparent);
    transform: translateX(-50%) scaleY(.28);
    transform-origin: 50% 100%;
    transition: opacity 700ms ease, transform 920ms cubic-bezier(.16, .8, .2, 1);
  }

  .intro-chapter-content.is-copy-complete .intro-gate-backlight {
    transform: translateX(-50%) scaleY(1);
    transition-delay: 590ms;
  }

  .intro-gate-cta {
    position: relative;
    z-index: 2;
    min-width: 180px;
    letter-spacing: .02em;
  }

  .intro-status {
    width: auto;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 12px;
    flex: 0 0 auto;
    margin-top: 14px;
    color: var(--faint);
    font-family: Consolas, monospace;
    font-size: 11.18px;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, 10px, 0);
    transition: opacity 420ms ease, transform 620ms cubic-bezier(.16,.8,.2,1), visibility 0ms linear 620ms;
  }

  .intro-chapter-content.is-copy-complete .intro-status {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 240ms, 240ms, 0ms;
  }

  .intro-status i { height: 1px; background: var(--line); }

  .projects-chapter-content {
    grid-template-rows: auto auto minmax(0, 1fr);
  }

  .scrollable-tab-shell { min-width: 0; }
  .embedded-tab-arrow { display: none; }

  .project-switcher,
  .personal-switcher {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border: 0;
    background: var(--surface-image) center 54% / cover no-repeat;
    box-shadow: none;
  }

  .project-switcher button,
  .personal-switcher button {
    min-width: 0;
    min-height: 46px;
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    gap: 8px;
    padding: 7px 12px;
    border: 0;
    border-right: 1px solid var(--line);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    text-align: left;
    transition: background 180ms ease, color 180ms ease;
  }

  .project-switcher button:last-child,
  .personal-switcher button:last-child { border-right: 0; }
  .project-switcher button:hover,
  .personal-switcher button:hover { background: rgba(var(--accent-rgb), 0.08); color: var(--ink); }
  .project-switcher button.active,
  .personal-switcher button.active { background: var(--accent); color: #090806; }
  .project-switcher span,
  .personal-switcher span { font-family: Consolas, monospace; font-size: 12.42px; }
  .project-switcher strong,
  .personal-switcher strong { overflow: hidden; font-size: 14.9px; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }

  .project-spatial-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.7fr);
    gap: 14px;
    animation: chapterMaterialize 1100ms cubic-bezier(.16,.76,.22,1) both;
  }

  .project-evidence-panel,
  .project-topology-preview,
  .timeline-focus-card,
  .personal-feature,
  .personal-collection-copy {
    min-width: 0;
    min-height: 0;
    border: 1px solid var(--line);
    background: var(--surface);
    color: var(--panel-ink);
    backdrop-filter: blur(16px);
    box-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
  }

  .project-evidence-panel {
    display: grid;
    grid-template-rows: auto auto auto minmax(0, 1fr);
    gap: 10px;
    padding: 18px 20px;
    overflow: visible;
  }

  .project-overline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    color: var(--panel-muted);
    font-family: Consolas, monospace;
    font-size: 12.42px;
    text-transform: uppercase;
  }

  .project-overline span { color: var(--accent); }
  .project-overline em { overflow: hidden; font-style: normal; text-overflow: ellipsis; white-space: nowrap; }

  .project-evidence-panel h3 {
    margin: 0;
    font-family: "Arial Narrow", "Segoe UI", sans-serif;
    font-size: 33.53px;
    line-height: 1;
    text-transform: uppercase;
  }

  .project-summary {
    margin: 0;
    color: var(--panel-muted);
    font-size: 17.39px;
    line-height: 1.45;
  }

  .project-proof-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: stretch;
    gap: 1px;
    margin: 0;
    background: var(--line);
    border: 1px solid var(--line);
  }

  .project-proof-grid div {
    min-width: 0;
    padding: 10px 11px;
    background: var(--surface-strong);
  }

  .project-proof-grid dt {
    margin-bottom: 5px;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 11.18px;
    text-transform: uppercase;
  }

  .project-proof-grid dd {
    margin: 0;
    color: var(--panel-ink);
    font-size: 13.66px;
    line-height: 1.36;
  }

  .project-action-row { display: flex; gap: 8px; }
  .project-action-row a,
  .project-action-row button { min-height: 36px; padding: 0 14px; font-size: 12.42px; }
  .project-action-row button { color: var(--panel-ink); }

  .project-topology-preview {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    padding: 16px;
    overflow: hidden;
  }

  .topology-heading { display: grid; gap: 4px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
  .topology-heading span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .topology-heading strong { font-size: 16.15px; text-transform: uppercase; }

  .project-topology-preview ol {
    min-height: 0;
    display: grid;
    align-content: center;
    gap: 0;
    margin: 0;
    padding: 6px 0;
    list-style: none;
  }

  .project-topology-preview li {
    position: relative;
    display: grid;
    grid-template-columns: 34px 1fr;
    align-items: center;
    min-height: 29px;
    border-bottom: 1px solid var(--line);
    color: var(--panel-ink);
  }

  .project-topology-preview li:last-child { border-bottom: 0; }
  .project-topology-preview li span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; }
  .project-topology-preview li strong { font-size: 12.42px; font-weight: 600; text-transform: uppercase; }

  .compact-stack {
    display: grid;
    gap: 6px;
    padding-top: 9px;
    border-top: 1px solid var(--line);
  }

  .compact-stack div { min-width: 0; display: grid; grid-template-columns: 105px 1fr; gap: 8px; }
  .compact-stack span { color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .compact-stack p { overflow: hidden; margin: 0; color: var(--panel-muted); font-size: 9.94px; text-overflow: ellipsis; white-space: nowrap; }

  .timeline-chapter-content {
    grid-template-rows: auto minmax(0, 1fr) auto;
  }

  .spatial-timeline {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
    grid-template-rows: 28px minmax(0, 1fr);
    gap: 10px 20px;
  }

  .timeline-axis {
    grid-column: 1;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    color: var(--muted);
    font-family: Consolas, monospace;
    font-size: 11.18px;
  }

  .timeline-axis i {
    height: 1px;
    background: var(--line-strong);
  }

  .timeline-waypoints {
    grid-column: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .timeline-waypoints button {
    position: relative;
    min-width: 0;
    display: grid;
    grid-template-rows: auto 1fr auto auto;
    align-items: end;
    padding: 17px;
    border: 1px solid var(--line);
    background: rgba(7, 7, 6, 0.4);
    color: var(--muted);
    cursor: pointer;
    text-align: left;
    overflow: hidden;
    transition: border-color 220ms ease, background 220ms ease, transform 260ms cubic-bezier(.2,.8,.2,1);
  }

  .timeline-waypoints button::before {
    content: "";
    position: absolute;
    inset: auto -30% 18% 35%;
    height: 1px;
    background: var(--line);
    transform: rotate(-18deg);
  }

  .timeline-waypoints button:hover { border-color: var(--line-strong); transform: translateY(-3px); }
  .timeline-waypoints button.active { background: rgba(var(--accent-rgb), 0.16); border-color: var(--accent); color: var(--ink); }
  .timeline-waypoints button > span { align-self: start; color: var(--accent); font-family: Consolas, monospace; font-size: 13.66px; }
  .timeline-waypoints button > i { width: 54px; height: 54px; align-self: center; justify-self: center; border: 1px solid var(--line-strong); border-radius: 50%; background: var(--mountain); box-shadow: inset 0 0 0 8px rgba(0,0,0,.16); }
  .timeline-waypoints button strong { position: relative; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 22.36px; line-height: 1; text-transform: uppercase; }
  .timeline-waypoints button small { position: relative; margin-top: 7px; color: var(--muted); font-size: 12.42px; line-height: 1.25; }

  .timeline-focus-card {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 22px;
    animation: chapterMaterialize 1100ms cubic-bezier(.16,.76,.22,1) both;
  }

  .timeline-focus-card > p { margin: 0 0 10px; color: var(--accent); font-family: Consolas, monospace; font-size: 12.42px; text-transform: uppercase; }
  .timeline-focus-card h3 { margin: 0; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 33.53px; line-height: 1; text-transform: uppercase; }
  .timeline-focus-card > strong { margin-top: 7px; color: var(--panel-muted); font-family: Georgia, serif; font-size: 17.39px; font-weight: 400; }
  .timeline-focus-card > span { margin-top: 14px; color: var(--panel-muted); font-size: 14.9px; line-height: 1.46; }
  .timeline-focus-card ul { display: grid; gap: 7px; margin: 14px 0 0; padding: 0; list-style: none; }
  .timeline-focus-card li { position: relative; padding-left: 14px; font-size: 12.42px; line-height: 1.42; }
  .timeline-focus-card li::before { content: ""; position: absolute; left: 0; top: 5px; width: 6px; height: 1px; background: var(--accent); }

  .professional-stack-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .professional-stack-strip div { min-width: 0; padding: 8px 10px; background: rgba(7,7,6,.72); }
  .professional-stack-strip span { display: block; margin-bottom: 4px; color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .professional-stack-strip p { overflow: hidden; margin: 0; color: var(--muted); font-size: 9.94px; text-overflow: ellipsis; white-space: nowrap; }

  .personal-chapter-content { grid-template-rows: auto auto minmax(0, 1fr); }

  .personal-spatial-grid {
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1.32fr) minmax(300px, .68fr);
    gap: 14px;
  }

  .personal-feature {
    display: grid;
    grid-template-rows: minmax(0, 1fr) auto;
    overflow: hidden;
    animation: mediaRelocate 900ms cubic-bezier(.16,.76,.22,1) both;
  }

  .personal-feature-art { min-height: 0; overflow: hidden; background: #090908; }
  .personal-feature-art img,
  .personal-feature-art video { width: 100%; height: 100%; display: block; object-fit: cover; }

  .field-note-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 190px;
    display: grid;
    place-content: center;
    justify-items: center;
    gap: 8px;
    color: var(--ink);
    overflow: hidden;
    background:
      linear-gradient(150deg, transparent 0 38%, rgba(var(--accent-rgb), .24) 38.2% 38.8%, transparent 39% 100%),
      linear-gradient(22deg, var(--mountain), #080807 64%);
  }

  .field-note-placeholder::before,
  .field-note-placeholder::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(var(--accent-rgb), .35);
    transform: rotate(34deg);
  }

  .field-note-placeholder::before { width: 210px; height: 210px; }
  .field-note-placeholder::after { width: 110px; height: 110px; }
  .field-note-placeholder span { position: relative; z-index: 1; font-family: Consolas, monospace; font-size: 12.42px; }
  .field-note-placeholder i { position: relative; z-index: 1; width: 1px; height: 48px; background: var(--accent); }
  .field-note-placeholder strong { position: relative; z-index: 1; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 28.57px; text-transform: uppercase; }
  .field-note-placeholder small { position: relative; z-index: 1; color: var(--muted); font-size: 11.18px; text-transform: uppercase; }

  .personal-feature-caption { display: grid; grid-template-columns: 130px 1fr; gap: 14px; padding: 12px 15px; border-top: 0; }
  .personal-feature-caption span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .personal-feature-caption p { margin: 0; color: var(--panel-muted); font-size: 12.42px; line-height: 1.4; }

  .personal-collection-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 19px;
  }

  .personal-collection-copy > p { margin: 0; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .personal-collection-copy h3 { margin: 8px 0 0; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 31.05px; line-height: 1; text-transform: uppercase; }
  .personal-collection-copy > span { margin-top: 12px; color: var(--panel-muted); font-size: 14.9px; line-height: 1.48; }

  .personal-media-index { display: grid; gap: 5px; margin-top: 16px; }
  .personal-media-index button { min-width: 0; display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 7px; min-height: 35px; padding: 0 9px; border: 1px solid var(--line); background: transparent; color: var(--panel-muted); cursor: pointer; text-align: left; }
  .personal-media-index button:hover,
  .personal-media-index button.active { background: rgba(var(--accent-rgb), .14); border-color: var(--accent); color: var(--panel-ink); }
  .personal-media-index span { color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; }
  .personal-media-index strong { overflow: hidden; font-size: 11.18px; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }

  .contact-chapter-content { grid-template-rows: auto minmax(0, 1fr); }

  .contact-transmission {
    width: min(900px, 88%);
    align-self: center;
    justify-self: center;
  }

  .contact-transmission > p { max-width: 620px; margin: 0; color: var(--muted); font-family: Georgia, serif; font-size: 22.36px; line-height: 1.45; }
  .contact-email { display: block; width: max-content; max-width: 100%; margin-top: 18px; color: var(--ink); font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 44.71px; line-height: 1; text-transform: uppercase; border-bottom: 1px solid var(--accent); overflow-wrap: anywhere; }

  .contact-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin-top: 30px; border: 1px solid var(--line); background: var(--line); }
  .contact-grid a { min-width: 0; display: grid; grid-template-columns: 30px 1fr; grid-template-rows: auto auto; gap: 4px 8px; padding: 18px; background: var(--surface); transition: background 180ms ease, transform 180ms ease; }
  .contact-grid a:hover { background: rgba(var(--accent-rgb), .18); transform: translateY(-3px); }
  .contact-grid span { grid-row: 1 / span 2; color: var(--accent); font-family: Consolas, monospace; font-size: 12.42px; }
  .contact-grid strong { font-size: 17.39px; text-transform: uppercase; }
  .contact-grid small { color: var(--muted); font-size: 11.18px; }

  .spatial-hud {
    position: absolute;
    z-index: 11;
    right: 24px;
    bottom: 22px;
    width: 344px;
    border: 1px solid var(--line-strong);
    background: var(--surface-strong);
    color: var(--panel-ink);
    backdrop-filter: blur(18px);
    transition: transform 420ms cubic-bezier(.2,.8,.2,1), opacity 220ms ease;
  }

  .hud-collapse {
    position: absolute;
    right: 0;
    bottom: 100%;
    width: 34px;
    height: 28px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    color: var(--accent);
    cursor: pointer;
  }

  .spatial-hud-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    max-height: 320px;
    padding: 12px;
    overflow: hidden;
    transition: max-height 420ms cubic-bezier(.2,.8,.2,1), padding 420ms cubic-bezier(.2,.8,.2,1), opacity 180ms ease;
  }

  .spatial-hud.is-collapsed { transform: translateY(calc(100% + 22px)); }
  .spatial-hud.is-collapsed .spatial-hud-content { max-height: 0; padding-top: 0; padding-bottom: 0; opacity: 0; }

  .hud-coordinate { display: grid; grid-template-columns: 1fr auto; gap: 3px 10px; padding-bottom: 8px; border-bottom: 1px solid var(--line); }
  .hud-coordinate span,
  .hud-coordinate small { font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .hud-coordinate span { color: var(--accent); }
  .hud-coordinate strong { grid-row: 1 / span 2; grid-column: 2; align-self: center; font-size: 14.9px; text-transform: uppercase; }
  .hud-coordinate small { color: var(--panel-muted); }

  .hud-theme-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 3px; }
  .hud-theme-row button { min-width: 0; min-height: 32px; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 0 4px; border: 1px solid var(--line); background: transparent; color: var(--panel-muted); cursor: pointer; }
  .hud-theme-row button.active { border-color: var(--accent); color: var(--panel-ink); background: rgba(var(--accent-rgb), .13); }
  .hud-theme-row button span { overflow: hidden; font-size: 9.94px; text-overflow: ellipsis; text-transform: uppercase; }
  .theme-swatch { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 50%; background: #716c63; }
  .theme-swatch.fall { background: #491523; }
  .theme-swatch.spring { background: #0b5948; }
  .theme-swatch.winter { background: #263f4d; }

  .hud-atmosphere-row {
    min-height: 32px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
    padding: 0 9px;
    border: 1px solid var(--line);
  }
  .hud-atmosphere-row span { color: var(--panel-muted); font-size: 9.94px; text-transform: uppercase; }
  .hud-atmosphere-row strong { color: var(--accent); font-size: 11.18px; text-align: right; text-transform: uppercase; }

  .hud-intensity { display: grid; grid-template-columns: 80px 1fr; align-items: center; gap: 8px; color: var(--panel-muted); font-size: 11.18px; text-transform: uppercase; }
  .hud-intensity input { width: 100%; accent-color: var(--accent); }

  .spatial-lore-guide {
    position: absolute;
    z-index: 12;
    left: 24px;
    bottom: 22px;
    width: min(500px, calc(100vw - 410px));
    min-height: 92px;
    display: flex;
    align-items: center;
    padding-left: 66px;
    transition: width 440ms cubic-bezier(.2,.8,.2,1), transform 440ms cubic-bezier(.2,.8,.2,1);
  }

  .lore-medallion {
    position: absolute;
    left: 0;
    z-index: 2;
    width: 84px;
    height: 84px;
    display: grid;
    place-items: center;
    border: 3px double var(--accent);
    border-radius: 50%;
    background: var(--mountain);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,.42);
  }

  .lore-medallion img {
    width: 112%;
    height: 112%;
    object-fit: cover;
    object-position: 50% 28%;
    filter: grayscale(1) contrast(1.2) brightness(.52);
  }

  .theme-fall .lore-medallion img { filter: grayscale(.3) sepia(1) hue-rotate(322deg) saturate(.7) brightness(.48) contrast(1.2); }
  .theme-spring .lore-medallion img { filter: grayscale(.26) sepia(1) hue-rotate(84deg) saturate(.65) brightness(.46) contrast(1.2); }
  .theme-winter .lore-medallion img { filter: grayscale(.2) sepia(.7) hue-rotate(145deg) saturate(.52) brightness(.48) contrast(1.2); }

  .lore-parchment {
    width: 100%;
    min-height: 72px;
    display: flex;
    align-items: center;
    padding: 13px 42px 13px 30px;
    border: 2px solid var(--accent);
    border-left-width: 0;
    background: var(--parchment);
    color: var(--parchment-ink);
    box-shadow: 0 12px 35px rgba(0,0,0,.36);
    clip-path: polygon(0 8%, 97% 0, 100% 12%, 99% 88%, 96% 100%, 0 94%);
    transition: opacity 220ms ease, transform 440ms cubic-bezier(.2,.8,.2,1);
  }

  .lore-parchment p { margin: 0; font-family: Georgia, serif; font-size: 14.9px; line-height: 1.42; }
  .lore-caret { display: inline-block; width: 1px; height: 1em; margin-left: 2px; background: currentColor; vertical-align: -2px; animation: loreBlink 800ms steps(1,end) infinite; }

  .lore-toggle {
    position: absolute;
    right: 13px;
    top: calc(50% - 18px);
    z-index: 3;
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    color: var(--parchment-ink);
    cursor: pointer;
  }

  .spatial-lore-guide.is-collapsed { width: 84px; padding-left: 0; }
  .spatial-lore-guide.is-collapsed .lore-parchment { opacity: 0; transform: translateX(-26px) scaleX(.72); pointer-events: none; }
  .spatial-lore-guide.is-collapsed .lore-toggle { right: -31px; color: var(--accent); }

  .archive-progress {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 25px;
    width: 260px;
    display: grid;
    grid-template-columns: 24px 1fr 28px;
    align-items: center;
    gap: 9px;
    transform: translateX(-50%);
    color: var(--muted);
    font-family: Consolas, monospace;
    font-size: 11.18px;
  }

  .archive-progress div { display: grid; grid-template-columns: repeat(6, 1fr); gap: 3px; }
  .archive-progress i { height: 2px; background: var(--line); transition: background 240ms ease; }
  .archive-progress i.active { background: var(--accent); }
  .archive-progress strong { font-weight: 400; text-align: right; }

  .architecture-dialog-backdrop {
    position: absolute;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    padding: 28px;
    background: rgba(3, 3, 2, .78);
    backdrop-filter: blur(12px);
    animation: dialogFade 220ms ease both;
  }

  .architecture-dialog {
    width: min(1120px, 92vw);
    max-height: 88vh;
    overflow-y: auto;
    border: 1px solid var(--line-strong);
    background: var(--surface-strong);
    color: var(--panel-ink);
    box-shadow: 0 35px 110px rgba(0,0,0,.55);
    animation: dialogEnter 420ms cubic-bezier(.2,.8,.2,1) both;
    scrollbar-color: var(--accent) transparent;
  }

  .architecture-dialog > header { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 16px 20px; border-bottom: 1px solid var(--line); background: var(--surface-strong); }
  .architecture-dialog header p { margin: 0 0 4px; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .architecture-dialog header h2 { margin: 0; font-family: "Arial Narrow", "Segoe UI", sans-serif; font-size: 29.81px; text-transform: uppercase; }

  .dialog-close { flex: 0 0 auto; width: 38px; height: 38px; position: relative; border: 1px solid var(--line); background: transparent; cursor: pointer; }
  .dialog-close span::before,
  .dialog-close span::after { content: ""; position: absolute; left: 9px; right: 9px; top: 18px; height: 1px; background: currentColor; }
  .dialog-close span::before { transform: rotate(45deg); }
  .dialog-close span::after { transform: rotate(-45deg); }

  .architecture-dialog-summary { max-width: 760px; margin: 18px 20px 0; color: var(--panel-muted); font-family: Georgia, serif; font-size: 17.39px; line-height: 1.45; }

  .architecture-case-study {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    margin: 18px 20px 0;
    border: 1px solid var(--line);
    background: var(--line);
  }
  .architecture-case-study div { min-width: 0; padding: 11px 12px; background: var(--surface-strong); }
  .architecture-case-study dt { margin-bottom: 5px; color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .architecture-case-study dd { margin: 0; color: var(--panel-muted); font-size: 11.18px; line-height: 1.42; }

  .architecture-step-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin: 18px 20px; border: 1px solid var(--line); background: var(--line); }
  .architecture-step-grid article { min-width: 0; min-height: 132px; display: grid; grid-template-columns: 25px 1fr; grid-template-rows: auto 1fr; gap: 6px 8px; padding: 13px; background: var(--surface-strong); }
  .architecture-step-grid article > span { grid-row: 1 / span 2; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; }
  .architecture-step-grid h3 { margin: 0; font-size: 13.66px; text-transform: uppercase; }
  .architecture-step-grid p { margin: 0; color: var(--panel-muted); font-size: 12.42px; line-height: 1.42; }

  .architecture-placement,
  .architecture-notes { margin: 0 20px 20px; padding: 14px; border: 1px solid var(--line); }
  .architecture-placement > span { display: block; margin-bottom: 10px; color: var(--accent); font-family: Consolas, monospace; font-size: 11.18px; text-transform: uppercase; }
  .architecture-placement > div { display: flex; flex-wrap: wrap; gap: 8px; }
  .architecture-placement strong { font-size: 12.42px; font-weight: 600; }
  .architecture-notes { display: grid; grid-template-columns: minmax(200px,.6fr) 1.4fr; gap: 16px; }
  .architecture-notes code { align-self: start; padding: 10px; border: 1px solid var(--line); color: var(--accent); font-size: 12.42px; overflow-wrap: anywhere; }
  .architecture-notes ul { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; }
  .architecture-notes li { position: relative; padding-left: 13px; color: var(--panel-muted); font-size: 12.42px; line-height: 1.4; }
  .architecture-notes li::before { content: ""; position: absolute; left: 0; top: 6px; width: 6px; height: 1px; background: var(--accent); }

  .architecture-stack-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; margin: 0 20px 20px; border: 1px solid var(--line); background: var(--line); }
  .architecture-stack-grid div { min-width: 0; padding: 11px; background: var(--surface-strong); }
  .architecture-stack-grid span { display: block; margin-bottom: 6px; color: var(--accent); font-family: Consolas, monospace; font-size: 9.94px; text-transform: uppercase; }
  .architecture-stack-grid p { margin: 0; color: var(--panel-muted); font-size: 9.94px; line-height: 1.4; }

  /* Cinematic, diegetic content surfaces */
  .project-switcher,
  .personal-switcher {
    border: 0;
    background: var(--surface-image) center 54% / cover no-repeat;
    box-shadow: none;
    filter: drop-shadow(0 15px 18px rgba(0,0,0,.24));
  }

  .project-switcher button,
  .personal-switcher button {
    position: relative;
    overflow: hidden;
  }

  .project-switcher button::before,
  .personal-switcher button::before {
    content: "";
    position: absolute;
    inset: auto 10px 5px;
    height: 1px;
    background: var(--accent);
    opacity: 0;
    transform: scaleX(.3);
    transition: opacity 220ms ease, transform 320ms cubic-bezier(.2,.8,.2,1);
  }

  .project-switcher button.active::before,
  .personal-switcher button.active::before { opacity: .8; transform: scaleX(1); }

  .project-spatial-grid {
    position: relative;
    grid-template-columns: minmax(0, 1.14fr) minmax(320px, .86fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 18px;
    overflow: hidden;
  }

  .project-artifact-stage {
    position: relative;
    grid-column: 1;
    grid-row: 1;
    min-height: 0;
    overflow: hidden;
    pointer-events: none;
    isolation: isolate;
    z-index: 3;
  }

  .project-artifact-stage::before {
    content: "";
    position: absolute;
    left: 5%;
    right: 8%;
    bottom: 4%;
    height: 28%;
    z-index: -1;
    background: radial-gradient(ellipse at center, rgba(0,0,0,.82), transparent 68%);
    filter: blur(8px);
    transform: perspective(500px) rotateX(64deg);
  }

  .project-artifact-stage img {
    position: absolute;
    left: 82%;
    top: 3%;
    width: min(52%, 370px);
    max-height: 29%;
    object-fit: contain;
    transform: translateX(-50%);
    transform-origin: 50% 50%;
    filter: drop-shadow(0 22px 28px rgba(0,0,0,.64));
    animation: artifactArrival 1300ms cubic-bezier(.16,.76,.22,1) both;
  }

  .project-artifact-stage.artifact-plugin img { left: 82%; top: -2%; width: min(34%, 205px); max-height: 40%; }
  .project-artifact-stage.artifact-telemetry img { left: 80%; top: 0; width: min(44%, 270px); max-height: 34%; }
  .project-artifact-stage > span {
    position: absolute;
    right: 18px;
    top: 11px;
    left: auto;
    bottom: auto;
    z-index: 2;
    color: var(--accent);
    font-family: Consolas, monospace;
    font-size: 9.94px;
    text-transform: uppercase;
    text-shadow: 0 2px 8px #000;
  }
  .artifact-orbit { display: none; }

  .project-evidence-panel {
    position: relative;
    grid-column: 1;
    grid-row: 1;
    z-index: 2;
    gap: 7px;
    padding: 14px 24px 15px;
    border: 0;
    clip-path: polygon(1% 0, 98% 0, 100% 4%, 99.3% 96%, 96% 100%, 2% 99%, 0 95%, .5% 4%);
    background: var(--surface-image) 50% 56% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .project-evidence-panel::after {
    display: none;
  }

  .project-evidence-panel h3 { max-width: 52%; }
  .project-evidence-panel > .project-summary { max-width: 65%; }

  .project-evidence-panel > .project-summary {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .project-proof-grid dd {
    display: -webkit-box;
    overflow: hidden;
    font-size: 12.42px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .project-proof-grid,
  .project-action-row { position: relative; z-index: 4; }
  .project-proof-grid { align-self: start; }

  .project-topology-preview {
    position: relative;
    grid-column: 2;
    grid-row: 1 / span 2;
    padding: 22px 22px 19px;
    border: 0;
    clip-path: polygon(3% 0, 99% 1%, 100% 95%, 96% 100%, 1% 99%, 0 5%);
    background: var(--surface-image) 78% 48% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .project-topology-preview::after,
  .timeline-focus-card::after,
  .personal-collection-copy::after {
    display: none;
  }

  .project-proof-grid {
    border: 0;
    background: transparent;
    gap: 10px;
  }

  .project-proof-grid div {
    background: transparent;
    border: 0;
  }

  .theme-winter .project-proof-grid div { background: transparent; }

  .timeline-waypoints { gap: 18px; }

  .timeline-waypoints button {
    border: 0;
    clip-path: polygon(3% 0, 97% 1%, 100% 5%, 99% 96%, 95% 100%, 1% 98%, 0 4%);
    background: var(--surface-image) 68% 48% / cover no-repeat;
    box-shadow: none;
    filter: drop-shadow(0 20px 18px rgba(0,0,0,.34));
  }

  .timeline-waypoints button:nth-child(2) { background-position: center, 88% 50%; }
  .timeline-waypoints button::before {
    inset: 14% auto 18% 50%;
    width: 1px;
    height: auto;
    background: linear-gradient(var(--line-strong), transparent);
    transform: none;
  }
  .timeline-waypoints button:hover { filter: brightness(1.06) drop-shadow(0 24px 20px rgba(0,0,0,.38)); transform: translateY(-5px) scale(1.015); }
  .timeline-waypoints button.active {
    background: var(--surface-image) 82% 48% / cover no-repeat;
    box-shadow: none;
    filter: brightness(1.1) drop-shadow(0 28px 24px rgba(0,0,0,.42));
  }
  .timeline-waypoints button > i {
    position: relative;
    border: 0;
    background:
      radial-gradient(circle at 34% 28%, rgba(255,255,255,.24), transparent 24%),
      radial-gradient(circle, var(--accent), var(--mountain) 68%);
    box-shadow: inset 0 0 0 5px rgba(0,0,0,.32), inset 0 0 0 7px var(--line-strong), 0 10px 22px rgba(0,0,0,.42);
  }
  .timeline-waypoints button > i::after {
    content: "";
    position: absolute;
    inset: 31%;
    border: 1px solid rgba(0,0,0,.48);
    transform: rotate(45deg);
  }

  .timeline-focus-card {
    position: relative;
    padding: 26px 30px;
    border: 0;
    clip-path: polygon(2% 0, 98% 1%, 100% 5%, 99% 95%, 96% 100%, 1% 98%, 0 4%);
    background: var(--surface-image) 91% 44% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .professional-stack-strip {
    border: 0;
    gap: 8px;
    background: transparent;
  }

  .professional-stack-strip div {
    background: var(--surface-image) center / cover no-repeat;
    filter: drop-shadow(0 10px 12px rgba(0,0,0,.24));
  }

  .personal-feature {
    border: 0;
    clip-path: polygon(1% 0, 98% 0, 100% 4%, 99% 97%, 96% 100%, 2% 99%, 0 95%, .5% 4%);
    background: var(--surface-image) center / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .field-note-placeholder {
    isolation: isolate;
    background: #070706;
  }

  .field-note-placeholder::before {
    inset: 0;
    width: auto;
    height: auto;
    z-index: -1;
    border: 0;
    background-image:
      linear-gradient(90deg, rgba(0,0,0,.62), rgba(0,0,0,.05) 56%, rgba(0,0,0,.36)),
      var(--field-image);
    background-position: center, var(--field-position);
    background-size: cover, 150% auto;
    filter: none;
    transform: none;
  }
  .field-note-placeholder::after {
    display: none;
  }
  .field-note-placeholder span,
  .field-note-placeholder i,
  .field-note-placeholder strong,
  .field-note-placeholder small {
    text-shadow: 0 2px 14px #000, 0 1px 2px #000;
  }

  .personal-collection-copy {
    position: relative;
    border: 0;
    clip-path: polygon(3% 0, 99% 1%, 100% 95%, 96% 100%, 1% 99%, 0 5%);
    background: var(--surface-image) 78% 58% / cover no-repeat;
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
  }

  .personal-media-index button {
    border-inline: 0;
    background: rgba(0,0,0,.12);
  }

  .contact-grid {
    border: 0;
    gap: 12px;
    background: transparent;
  }

  .contact-grid a {
    position: relative;
    border: 0;
    clip-path: polygon(3% 0, 98% 1%, 100% 6%, 98% 95%, 94% 100%, 1% 97%, 0 5%);
    background: var(--surface-image) center 58% / cover no-repeat;
    box-shadow: none;
    filter: none;
  }
  .contact-grid a:hover { background: var(--surface-image) center 58% / cover no-repeat; filter: brightness(1.08); }

  .architecture-dialog {
    border: 0;
    clip-path: polygon(2% 0, 98% 0, 100% 3%, 100% 96%, 98% 100%, 2% 100%, 0 97%, 0 3%);
    background: var(--surface-image) center / cover no-repeat;
    box-shadow: none;
    filter: none;
  }

  .architecture-dialog > header,
  .architecture-case-study div,
  .architecture-step-grid article,
  .architecture-stack-grid div { background: transparent; }
  .architecture-dialog > header,
  .architecture-case-study,
  .architecture-step-grid,
  .architecture-notes,
  .architecture-stack-grid { border: 0; }
  .architecture-case-study,
  .architecture-step-grid,
  .architecture-stack-grid { gap: 12px; background: transparent; }

  /* Material-first quality pass */
  .archive-identity strong,
  .intro-chapter-content h1,
  .chapter-heading h2,
  .project-evidence-panel h3,
  .topology-heading strong,
  .timeline-waypoints button strong,
  .timeline-focus-card h3,
  .personal-collection-copy h3,
  .field-note-placeholder strong,
  .contact-email,
  .contact-grid strong,
  .architecture-dialog header h2,
  .architecture-step-grid h3 {
    font-family: var(--font-display);
  }

  .archive-identity small,
  .chapter-rail-list span,
  .chapter-rail-list strong,
  .project-switcher span,
  .personal-switcher span,
  .intro-coordinate,
  .intro-status,
  .chapter-heading p,
  .chapter-heading > span,
  .project-switcher,
  .personal-switcher,
  .project-overline,
  .project-proof-grid dt,
  .topology-heading span,
  .project-topology-preview li span,
  .compact-stack span,
  .timeline-axis,
  .timeline-waypoints button > span,
  .timeline-focus-card > p,
  .professional-stack-strip span,
  .personal-feature-caption span,
  .field-note-placeholder span,
  .personal-collection-copy > p,
  .personal-media-index span,
  .contact-grid span,
  .hud-coordinate span,
  .hud-coordinate small,
  .archive-progress,
  .architecture-dialog header p,
  .architecture-case-study dt,
  .architecture-step-grid article > span,
  .architecture-placement > span,
  .architecture-stack-grid span {
    font-family: var(--font-inscription);
  }

  button,
  .archive-header-actions a,
  .intro-actions a,
  .intro-gate-cta,
  .project-action-row a {
    font-family: var(--font-inscription);
  }

  .archive-header-actions a,
  .intro-actions a,
  .intro-gate-cta,
  .project-action-row a,
  .project-action-row button,
  .dialog-close {
    border: 0;
    clip-path: polygon(4% 0, 96% 1%, 100% 12%, 97% 94%, 91% 100%, 3% 97%, 0 84%, 1% 9%);
    background: var(--surface-image) center / 220% 220% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    filter: drop-shadow(0 10px 11px rgba(0, 0, 0, .34));
    text-shadow: var(--surface-text-shadow);
  }

  .theme-winter .spatial-hud {
    background:
      linear-gradient(rgba(221, 231, 234, .34), rgba(207, 220, 225, .24)),
      var(--surface-image) center / 112% 112% no-repeat;
  }

  .project-evidence-panel,
  .project-topology-preview,
  .timeline-waypoints button,
  .timeline-focus-card,
  .personal-feature,
  .personal-collection-copy,
  .contact-grid a {
    isolation: isolate;
    backface-visibility: hidden;
  }

  .archive-scene.active .project-evidence-panel,
  .archive-scene.active .project-topology-preview,
  .archive-scene.active .timeline-waypoints button,
  .archive-scene.active .timeline-focus-card,
  .archive-scene.active .personal-feature,
  .archive-scene.active .personal-collection-copy,
  .archive-scene.active .contact-grid a {
    filter:
      drop-shadow(0 24px 20px rgba(0, 0, 0, .44))
      drop-shadow(0 5px 4px rgba(0, 0, 0, .34));
  }

  .project-evidence-panel::after,
  .project-topology-preview::after,
  .timeline-waypoints button::after,
  .timeline-focus-card::after,
  .personal-feature::after,
  .personal-collection-copy::after,
  .contact-grid a::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    pointer-events: none;
    background:
      linear-gradient(142deg, rgba(255, 255, 255, .14), transparent 9% 72%, rgba(0, 0, 0, .28)),
      linear-gradient(180deg, transparent 68%, rgba(0, 0, 0, .2));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, .12),
      inset 0 -10px 22px rgba(0, 0, 0, .16);
    opacity: .62;
  }

  .project-evidence-panel > *,
  .project-topology-preview > *,
  .timeline-waypoints button > *,
  .timeline-focus-card > *,
  .personal-feature > *,
  .personal-collection-copy > *,
  .contact-grid a > * {
    position: relative;
    z-index: 2;
  }

  .archive-header-actions .archive-header-primary,
  .intro-gate-cta,
  .project-action-row a {
    border: 0;
    background: var(--surface-image) center / 190% 190% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 12px 13px rgba(0, 0, 0, .38));
  }

  .archive-header-actions a:hover,
  .intro-actions a:hover,
  .intro-gate-cta:hover,
  .project-action-row a:hover,
  .project-action-row button:hover {
    background: var(--surface-image) center / 190% 190% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 14px 14px rgba(0, 0, 0, .4));
  }

  .intro-status {
    width: auto;
    grid-template-columns: auto auto;
    gap: 18px;
    color: var(--muted);
  }

  .intro-status i { display: none; }

  .chapter-rail { width: 124px; }

  .chapter-rail-list {
    gap: 8px;
    border: 0;
    overflow: visible;
  }

  .chapter-rail-list button {
    min-height: 50px;
    border: 0;
    background: var(--surface-image) center / 230% 230% no-repeat;
    color: var(--panel-muted);
    clip-path: polygon(3% 0, 96% 2%, 100% 12%, 98% 91%, 92% 100%, 2% 97%, 0 86%, 1% 8%);
    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, .34));
    text-shadow: var(--surface-text-shadow);
    transition: color 260ms ease, filter 360ms ease, transform 420ms cubic-bezier(.16,.76,.22,1);
  }

  .chapter-rail-list button:hover {
    background: var(--surface-image) center / 215% 215% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.12) drop-shadow(0 13px 12px rgba(0, 0, 0, .4));
    transform: translateX(4px);
  }

  .chapter-rail-list button.active {
    background: var(--surface-image) center / 195% 195% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 15px 14px rgba(0, 0, 0, .46));
    transform: translateX(8px) scale(1.025);
  }

  .chapter-rail-list button.active::after { display: none; }

  .project-switcher,
  .personal-switcher {
    gap: 10px;
    background: transparent;
    filter: none;
  }

  .project-switcher button,
  .personal-switcher button,
  .personal-media-index button {
    border: 0;
    background: var(--surface-image) center / 230% 230% no-repeat;
    color: var(--panel-muted);
    clip-path: polygon(3% 0, 97% 2%, 100% 13%, 97% 94%, 92% 100%, 2% 97%, 0 85%, 1% 8%);
    filter: drop-shadow(0 9px 9px rgba(0, 0, 0, .3));
    text-shadow: var(--surface-text-shadow);
    transition: color 260ms ease, filter 360ms ease, transform 420ms cubic-bezier(.16,.76,.22,1);
  }

  .project-switcher button::before,
  .personal-switcher button::before { display: none; }

  .project-switcher button:hover,
  .personal-switcher button:hover,
  .personal-media-index button:hover {
    background: var(--surface-image) center / 210% 210% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.12) drop-shadow(0 12px 11px rgba(0, 0, 0, .36));
    transform: translateY(-2px);
  }

  .project-switcher button.active,
  .personal-switcher button.active,
  .personal-media-index button.active {
    background: var(--surface-image) center / 190% 190% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 14px 13px rgba(0, 0, 0, .42));
    transform: translateY(-3px) scale(1.012);
  }

  .project-evidence-panel,
  .project-topology-preview,
  .timeline-waypoints button,
  .timeline-focus-card,
  .personal-feature,
  .personal-collection-copy,
  .contact-grid a,
  .architecture-dialog {
    background: var(--surface-image) center / 112% 112% no-repeat;
    color: var(--panel-ink);
    text-shadow: var(--surface-text-shadow);
  }

  .project-evidence-panel {
    gap: 9px;
    padding: clamp(24px, 2.2vw, 34px) clamp(26px, 2.5vw, 38px) clamp(22px, 2vw, 31px);
  }

  .project-action-row {
    position: absolute;
    z-index: 7;
    left: clamp(26px, 2.5vw, 38px);
    bottom: clamp(22px, 2vw, 31px);
    width: max-content;
  }

  .project-overline { max-width: 55%; }
  .project-evidence-panel h3 { max-width: 53%; }
  .project-evidence-panel > .project-summary { max-width: 60%; }

  .project-artifact-stage img {
    left: 79%;
    top: 4%;
    width: min(47%, 340px);
    max-height: 31%;
  }

  .project-artifact-stage.artifact-plugin img { left: 80%; top: 1%; }
  .project-artifact-stage.artifact-telemetry img { left: 79%; top: 2%; }
  .project-artifact-stage > span { display: none; }

  .project-proof-grid {
    gap: 11px 18px;
  }

  .project-proof-grid div { padding: 5px 0; }

  .project-topology-preview {
    padding: clamp(25px, 2.1vw, 34px);
    background-size: 116% 116%;
  }

  .topology-heading,
  .compact-stack {
    border: 0;
  }

  .project-topology-preview ol { gap: 5px; padding-block: 12px; }

  .project-topology-preview li {
    min-height: 29px;
    border: 0;
  }

  .project-topology-preview li span,
  .compact-stack span,
  .project-proof-grid dt { color: var(--accent); }

  .timeline-axis {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .timeline-axis i,
  .timeline-waypoints button::before { display: none; }

  .timeline-waypoints button {
    padding: clamp(38px, 3.2vw, 52px) clamp(20px, 1.8vw, 28px) clamp(48px, 4vw, 64px);
    background-size: 126% 126%;
    transition: color 260ms ease, filter 420ms ease, transform 460ms cubic-bezier(.16,.76,.22,1);
  }

  .timeline-waypoints button:hover {
    background: var(--surface-image) center / 121% 121% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.08) drop-shadow(0 24px 20px rgba(0, 0, 0, .38));
  }

  .timeline-waypoints button.active {
    background: var(--surface-image) center / 116% 116% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 28px 24px rgba(0, 0, 0, .42));
  }

  .timeline-waypoints button strong { font-size: 19.87px; }
  .timeline-waypoints button small { max-width: 94%; margin-bottom: 3px; }

  .timeline-focus-card {
    padding: clamp(29px, 2.6vw, 42px);
    background-size: 112% 112%;
  }

  .professional-stack-strip {
    gap: 9px;
    border: 0;
    background: transparent;
  }

  .professional-stack-strip div {
    padding: 10px 13px;
    background: var(--surface-image) center / 180% 180% no-repeat;
    color: var(--panel-ink);
    text-shadow: var(--surface-text-shadow);
    clip-path: polygon(2% 0, 98% 2%, 100% 91%, 94% 100%, 1% 97%);
  }

  .personal-feature {
    gap: 11px;
    padding: 18px;
    background-size: 108% 108%;
  }

  .personal-feature-art {
    clip-path: polygon(1% 0, 99% 1%, 100% 95%, 97% 100%, 0 98%);
  }

  .personal-feature-caption { padding: 2px 10px 7px; }
  .field-note-placeholder i { display: none; }

  .personal-collection-copy {
    padding: clamp(27px, 2.5vw, 40px);
    background-size: 114% 114%;
  }

  .personal-media-index { gap: 8px; }

  .contact-email { border: 0; }

  .contact-grid {
    gap: 12px;
    border: 0;
    background: transparent;
  }

  .contact-grid a {
    padding: 22px 24px;
    background-size: 145% 145%;
  }

  .spatial-hud {
    width: 360px;
    border: 0;
    clip-path: none;
    border-radius: 5px 9px 4px 7px;
    background: var(--surface-image) center / 112% 112% no-repeat, var(--surface-strong);
    color: var(--panel-ink);
    box-shadow: none;
    filter: none;
    backdrop-filter: none;
    isolation: isolate;
    text-shadow: var(--surface-text-shadow);
  }

  .spatial-hud-content {
    gap: 12px;
    padding: 22px 28px 20px;
  }

  .hud-collapse {
    right: 14px;
    bottom: calc(100% - 7px);
    color: var(--panel-ink);
    text-shadow: var(--surface-text-shadow);
  }

  .spatial-hud.is-collapsed .hud-collapse {
    bottom: 0;
    transform: translateY(-100%);
  }

  .hud-coordinate {
    gap: 4px 12px;
    padding-bottom: 2px;
    border: 0;
  }

  .hud-coordinate span { color: var(--accent); }

  .hud-theme-row { gap: 8px; }

  .hud-theme-row button {
    min-height: 34px;
    border: 0;
    clip-path: polygon(4% 0, 97% 2%, 100% 12%, 97% 95%, 4% 100%, 0 88%, 1% 7%);
    background: var(--surface-image) center / 250% 250% no-repeat;
    color: var(--panel-muted);
    filter: drop-shadow(0 7px 7px rgba(0, 0, 0, .28));
  }

  .hud-theme-row button.active {
    border: 0;
    background: var(--surface-image) center / 195% 195% no-repeat;
    color: var(--panel-ink);
    filter: var(--active-material-filter) drop-shadow(0 9px 9px rgba(0, 0, 0, .34));
  }

  .theme-swatch {
    width: 9px;
    height: 9px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .38);
  }

  .hud-atmosphere-row {
    min-height: 26px;
    padding: 0;
    border: 0;
  }

  .hud-intensity { grid-template-columns: 72px 1fr; }

  .hud-intensity input {
    height: 7px;
    appearance: none;
    border-radius: 7px;
    background: rgba(0, 0, 0, .32);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, .42), 0 1px 0 rgba(255, 255, 255, .12);
  }

  .hud-intensity input::-webkit-slider-thumb {
    width: 17px;
    height: 17px;
    appearance: none;
    border: 0;
    border-radius: 50%;
    background: var(--surface-image) center / 320% 320% no-repeat;
    filter: var(--active-material-filter);
    box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
  }

  .hud-intensity input::-moz-range-thumb {
    width: 17px;
    height: 17px;
    border: 0;
    border-radius: 50%;
    background: var(--surface-image) center / 320% 320% no-repeat;
    filter: var(--active-material-filter);
    box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
  }

  .spatial-lore-guide {
    width: min(530px, calc(100vw - 430px));
    min-height: 102px;
    padding-left: 76px;
  }

  .lore-medallion {
    width: 94px;
    height: 94px;
    padding: 6px;
    border: 0;
    background: var(--surface-image) center / 230% 230% no-repeat;
    box-shadow: none;
    filter: drop-shadow(0 16px 18px rgba(0, 0, 0, .48));
  }

  .lore-medallion img,
  .theme-fall .lore-medallion img,
  .theme-spring .lore-medallion img,
  .theme-winter .lore-medallion img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    filter: none;
  }

  .lore-parchment {
    min-height: 88px;
    padding: 18px 52px 18px 35px;
    border: 0;
    background: var(--surface-image) center / 112% 112% no-repeat, var(--surface-strong);
    color: var(--panel-ink);
    filter: none;
    box-shadow: 0 20px 32px rgba(0, 0, 0, .34);
    clip-path: none;
    border-radius: 3px 8px 4px 6px;
    isolation: isolate;
    backface-visibility: hidden;
    text-shadow: var(--surface-text-shadow);
  }

  .lore-parchment p {
    font-family: var(--font-body);
    font-size: 16.15px;
    line-height: 1.5;
  }

  .lore-caret {
    width: 6px;
    height: 6px;
    margin-left: 7px;
    background: var(--accent);
    transform: rotate(45deg);
    animation: lorePulse 1200ms ease-in-out infinite;
    vertical-align: 1px;
  }

  .lore-toggle { color: var(--panel-ink); }
  .spatial-lore-guide.is-collapsed { width: 94px; }
  .spatial-lore-guide.is-collapsed .lore-toggle { color: var(--accent); }

  .archive-progress {
    width: auto;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .archive-progress > span,
  .archive-progress > strong { display: none; }

  .archive-progress div {
    display: flex;
    gap: 9px;
  }

  .archive-progress i {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .22);
    box-shadow: 0 3px 7px rgba(0, 0, 0, .36);
    transition: background 420ms ease, transform 420ms cubic-bezier(.16,.76,.22,1);
  }

  .archive-progress i.active {
    background: var(--accent);
    transform: scale(1.24);
  }

  .architecture-dialog {
    background-size: 106% 106%;
    text-shadow: var(--surface-text-shadow);
  }

  .architecture-dialog > header,
  .architecture-placement,
  .architecture-notes,
  .architecture-notes code,
  .dialog-close { border: 0; }

  .timeline-focus-card li::before,
  .architecture-notes li::before {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  @keyframes lorePulse {
    0%, 100% { opacity: .34; transform: rotate(45deg) scale(.76); }
    50% { opacity: 1; transform: rotate(45deg) scale(1); }
  }

  /* Weight is applied after component rules so fine print cannot fall back to thin cuts. */
  .archive-app { font-weight: 600; }
  .archive-app :is(p, li, dd, small, span, em, code) { font-weight: 600; }
  .archive-app :is(button, a, dt, label, .chapter-heading > span, .project-summary, .timeline-focus-card > span, .personal-collection-copy > span) { font-weight: 600; }
  .archive-app :is(h1, h2, h3, strong) { font-weight: 700; }

  @keyframes gateNameEmerge {
    0% {
      transform: translate3d(0, 125%, 0);
    }
    72% {
      transform: translate3d(0, -3%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes artifactArrival {
    0% { opacity: 0; filter: blur(8px); transform: translateX(-50%) translate3d(18px, 30px, -80px) rotateY(-7deg) scale(.93); }
    58% { opacity: .92; filter: blur(1px); transform: translateX(-50%) translate3d(-3px, -3px, 8px) rotateY(1deg) scale(1.012); }
    100% { opacity: 1; filter: blur(0); transform: translateX(-50%) translate3d(0, 0, 0) rotateY(0) scale(1); }
  }

  @keyframes headingPhaseIn {
    0% { opacity: 0; filter: blur(5px); transform: translate3d(-24px, 13px, -45px); }
    62% { opacity: .96; filter: blur(.5px); transform: translate3d(2px, -1px, 3px); }
    100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0); }
  }

  @keyframes spatialDockIn {
    0% { opacity: 0; filter: blur(7px); transform: perspective(1100px) translate3d(0, 32px, -92px) rotateX(3deg) scale(.975); }
    58% { opacity: .95; filter: blur(.7px); transform: perspective(1100px) translate3d(0, -2px, 5px) rotateX(-.4deg) scale(1.005); }
    100% { opacity: 1; filter: blur(0); transform: perspective(1100px) translate3d(0, 0, 0) rotateX(0) scale(1); }
  }

  @keyframes chapterMaterialize {
    from { opacity: 0; filter: blur(5px); transform: translateY(14px) scale(.985); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes mediaRelocate {
    0% { opacity: .2; filter: blur(5px); transform: translateX(24px) rotateY(-2deg) scale(.985); }
    100% { opacity: 1; transform: translateX(0) rotateY(0); }
  }

  @keyframes mobileHeadingPhaseIn {
    0% { opacity: 0; transform: translateY(14px); }
    68% { opacity: .96; transform: translateY(-1px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes mobileDockIn {
    0% { opacity: 0; transform: translateY(24px) scale(.985); }
    68% { opacity: .97; transform: translateY(-2px) scale(1.003); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes mobileArtifactArrival {
    0% { opacity: 0; transform: translateX(-50%) translateY(18px) scale(.96); }
    68% { opacity: .96; transform: translateX(-50%) translateY(-2px) scale(1.008); }
    100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  }

  @keyframes mobileMaterialize {
    from { opacity: 0; transform: translateY(12px) scale(.99); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes mobileRelocate {
    from { opacity: .28; transform: translateX(16px) scale(.99); }
    to { opacity: 1; transform: translateX(0) scale(1); }
  }

  @keyframes dialogFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes dialogEnter { from { opacity: 0; transform: translateY(30px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes loreBlink { 50% { opacity: 0; } }

  @media (min-width: 761px) {
    .archive-viewport.rail-expanded .archive-scene { left: 176px; }
    .archive-viewport.rail-collapsed .archive-scene { left: 96px; }
    .archive-viewport.rail-expanded .archive-scene.scene-intro,
    .archive-viewport.rail-collapsed .archive-scene.scene-intro { inset: 0; }
    .archive-scene { transition: left 520ms cubic-bezier(.16,.76,.22,1); }

    .chapter-rail-list span { font-size: 13.66px; }
    .chapter-rail-list strong { font-size: 14.9px; }
    .hud-coordinate span,
    .hud-coordinate small { font-size: 12.42px; }
    .hud-coordinate strong { font-size: 17.39px; }
    .hud-theme-row button span { font-size: 11.18px; }
    .hud-atmosphere-row span { font-size: 11.18px; }
    .hud-atmosphere-row strong,
    .hud-intensity { font-size: 12.42px; }

    .project-evidence-panel {
      grid-template-rows: repeat(5, auto);
      align-content: center;
      gap: 12px;
      padding: clamp(28px, 3.8vh, 42px) clamp(38px, 3.5vw, 56px);
    }
    .project-overline { font-size: 14.9px; }
    .project-evidence-panel h3 { font-size: clamp(37.26px, 2.35vw, 43.47px); }
    .project-summary { font-size: 19.87px; line-height: 1.5; }
    .project-evidence-panel > .project-summary { -webkit-line-clamp: 4; }
    .project-proof-grid { align-content: center; gap: 10px 18px; }
    .project-proof-grid div { padding: 8px 10px; }
    .project-proof-grid dt { font-size: 13.05px; }
    .project-proof-grid dd { font-size: 14.9px; line-height: 1.42; -webkit-line-clamp: 4; }
    .project-action-row a,
    .project-action-row button { min-height: 40px; padding-inline: 18px; font-size: 14.29px; }

    .project-topology-preview { padding: clamp(34px, 3vw, 46px); }
    .topology-heading span { font-size: 13.05px; }
    .topology-heading strong { font-size: 18.63px; }
    .project-topology-preview li span { font-size: 12.42px; }
    .project-topology-preview li strong { font-size: 14.29px; }
    .compact-stack span,
    .compact-stack p { font-size: 11.8px; }

    .timeline-waypoints button {
      align-content: center;
      justify-items: center;
      padding-inline: clamp(28px, 2.6vw, 42px);
      text-align: center;
    }
    .timeline-waypoints button > span { font-size: 15.53px; }
    .timeline-waypoints button strong { font-size: 23.6px; }
    .timeline-waypoints button small { font-size: 14.29px; line-height: 1.38; }
    .timeline-focus-card { padding: clamp(36px, 3.5vw, 54px); }
    .timeline-focus-card > p { font-size: 14.9px; }
    .timeline-focus-card h3 { font-size: clamp(37.26px, 2.3vw, 42.23px); }
    .timeline-focus-card > strong { font-size: 19.87px; }
    .timeline-focus-card > span { font-size: 17.39px; line-height: 1.52; }
    .timeline-focus-card li { font-size: 14.29px; line-height: 1.48; }
    .professional-stack-strip div { padding: 12px 14px; }
    .professional-stack-strip span,
    .professional-stack-strip p { font-size: 11.8px; }

    .personal-feature { padding: 24px; }
    .personal-feature-caption { gap: 18px; padding: 12px 16px 14px; }
    .personal-feature-caption span,
    .personal-feature-caption p { font-size: 14.29px; line-height: 1.45; }
    .personal-collection-copy { padding: clamp(36px, 3.5vw, 54px); }
    .personal-collection-copy > p { font-size: 13.66px; }
    .personal-collection-copy h3 { font-size: 37.26px; }
    .personal-collection-copy > span { font-size: 17.39px; line-height: 1.52; }
    .personal-media-index button { min-height: 40px; padding-inline: 12px; }
    .personal-media-index span,
    .personal-media-index strong { font-size: 13.05px; }

    .contact-grid a { min-height: 116px; align-content: center; padding: 28px 32px; }
    .contact-grid strong { font-size: 19.87px; }
    .contact-grid small { font-size: 13.05px; }
  }

  @media (min-width: 1401px) and (min-height: 821px) {
    .project-evidence-panel {
      padding-bottom: clamp(74px, 6vh, 88px);
    }
  }

  @media (min-width: 1051px) and (max-width: 1250px),
    (max-height: 820px) and (min-width: 1051px) and (max-width: 1650px) {
    .project-spatial-grid { overflow: visible; }
    .project-action-row {
      top: 50%;
      right: auto;
      bottom: auto;
      left: calc(100% + 16px);
      width: 156px;
      flex-direction: column;
      transform: translateY(-50%);
    }
    .project-action-row a,
    .project-action-row button { width: 100%; }
  }

  @media (min-width: 761px) and (max-width: 1250px) {
    .project-spatial-grid {
      grid-template-columns: minmax(0, 1fr);
    }

    .project-topology-preview { display: none; }

    .timeline-waypoints {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .timeline-waypoints button {
      padding: 24px 28px 31px;
    }

    .timeline-waypoints button > i {
      width: 44px;
      height: 44px;
    }
  }

  @media (max-width: 1050px) {
    .archive-scene { inset: 94px 82px 160px 128px; }
    .chapter-rail { left: 14px; width: 100px; }
    .project-spatial-grid { grid-template-columns: minmax(0, 1fr); }
    .personal-spatial-grid { grid-template-columns: minmax(0, 1.18fr) minmax(265px, .82fr); }
    .spatial-lore-guide { left: 16px; width: min(430px, calc(100vw - 390px)); }
    .spatial-hud { right: 16px; width: 326px; }
    .chapter-heading h2 { font-size: 33.53px; }
    .intro-gate-name { --intro-name-size: 56px; }
    .intro-copy-stage {
      top: 23%;
      right: 20px;
      width: min(280px, 27vw);
    }
  }

  @media (min-width: 761px) and (max-width: 900px) {
    .intro-copy-stage {
      top: 22%;
      right: 14px;
      width: 22vw;
    }
    .intro-coordinate { font-size: 10px; }
    .intro-role { font-size: 22px; }
    .intro-summary { font-size: 15px; line-height: 1.4; }
    .intro-actions { flex-direction: column; align-items: flex-end; }
    .intro-status { display: none; }
  }

  @media (max-width: 760px) {
    :root { font-size: 18.63px; }
    .archive-scene.active .chapter-heading { animation: none; }
    .archive-scene.active .project-spatial-grid,
    .archive-scene.active .spatial-timeline,
    .archive-scene.active .personal-spatial-grid,
    .archive-scene.active .contact-transmission { animation: none; }
    .project-artifact-stage img { animation: mobileArtifactArrival 1300ms cubic-bezier(.16,.76,.22,1) both; }
    .timeline-focus-card { animation: mobileMaterialize 1150ms cubic-bezier(.16,.76,.22,1) both; }
    .personal-feature { animation: mobileRelocate 1050ms cubic-bezier(.16,.76,.22,1) both; }
    .archive-header { top: 10px; left: 12px; right: 12px; height: 52px; }
    .archive-identity .profile-avatar { width: 36px; height: 36px; }
    .archive-identity small { display: none; }
    .archive-identity strong { font-size: 16.15px; }
    .archive-header-actions { gap: 4px; }
    .archive-header-actions a { min-height: 30px; padding: 0 10px; font-size: 11.18px; }

    .chapter-rail,
    .chapter-rail.is-collapsed {
      left: 8px;
      right: 8px;
      top: 69px;
      width: auto;
      height: 52px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) 28px;
      align-items: stretch;
      transform: none;
    }

    .chapter-collapse { display: none; }
    .chapter-scroll-arrow {
      display: grid;
      place-items: center;
      border: 0;
      clip-path: polygon(4% 0, 96% 2%, 100% 13%, 97% 94%, 4% 100%, 0 86%);
      background: var(--surface-image) center / 260% 260% no-repeat;
      color: var(--panel-ink);
      filter: drop-shadow(0 7px 7px rgba(0, 0, 0, .32));
    }

    .chapter-rail-list,
    .chapter-rail.is-collapsed .chapter-rail-list {
      display: flex;
      min-width: 0;
      overflow-x: auto;
      overflow-y: hidden;
      opacity: 1;
      transform: none;
      pointer-events: auto;
      scrollbar-width: none;
      scroll-snap-type: x proximity;
    }

    .chapter-rail-list::-webkit-scrollbar { display: none; }
    .chapter-rail-list button { flex: 0 0 116px; min-height: 50px; grid-template-columns: 22px 1fr; scroll-snap-align: start; border: 0; }
    .chapter-rail-list button.active::after { display: none; }

    .archive-scene { inset: 130px 12px 112px; }
    .chapter-heading { align-items: start; gap: 12px; padding-bottom: 8px; }
    .chapter-heading h2 { font-size: 26.08px; line-height: 1.08; }
    .chapter-heading > span { display: none; }
    .chapter-heading p { margin-bottom: 4px; font-size: 9.94px; }

    .intro-chapter-content { width: 100%; height: 100%; padding: 0; }
    .intro-gate-name {
      --intro-name-size: 45px;
      inset: 0;
      width: auto;
      aspect-ratio: auto;
      transform: none;
    }
    .intro-name-word {
      top: 3vh;
      height: 1.12em;
      padding: 0 4px 8px;
      font-size: var(--intro-name-size);
    }
    .intro-name-first {
      right: auto;
      left: 0;
      transform: rotate(-3.6deg);
    }
    .intro-name-last {
      right: 0;
      left: auto;
      transform: rotate(3.6deg);
    }
    .intro-copy-stage {
      top: 33%;
      right: 0;
      width: 94%;
    }
    .intro-coordinate { margin-bottom: 12px; font-size: 9.94px; }
    .intro-role { margin-top: 12px; font-size: 22.36px; }
    .intro-summary { max-width: 92%; min-height: 4.26em; margin-top: 12px; font-size: 16.15px; line-height: 1.42; }
    .intro-actions { flex-wrap: wrap; margin-top: 17px; }
    .intro-actions a,
    .intro-gate-cta { min-height: 38px; padding: 0 12px; font-size: 11.18px; }
    .intro-gate-entry { top: 77.5%; }
    .intro-gate-backlight { height: 132px; }
    .intro-status { display: none; }

    .projects-chapter-content,
    .personal-chapter-content { gap: 8px; }
    .project-switcher,
    .personal-switcher { display: flex; overflow-x: auto; scrollbar-width: none; }
    .scrollable-tab-shell {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) 28px;
      min-width: 0;
    }
    .embedded-tab-arrow {
      display: grid;
      place-items: center;
      min-width: 0;
      border: 0;
      clip-path: polygon(4% 0, 96% 2%, 100% 13%, 97% 94%, 4% 100%, 0 86%);
      background: var(--surface-image) center / 260% 260% no-repeat;
      color: var(--panel-ink);
      filter: drop-shadow(0 7px 7px rgba(0, 0, 0, .3));
      cursor: pointer;
    }
    .project-switcher::-webkit-scrollbar,
    .personal-switcher::-webkit-scrollbar { display: none; }
    .project-switcher button,
    .personal-switcher button { flex: 0 0 150px; min-height: 42px; padding: 6px 8px; }
    .project-spatial-grid,
    .personal-spatial-grid { grid-template-columns: minmax(0, 1fr); gap: 8px; }
    .project-spatial-grid { grid-template-rows: 112px minmax(0, 1fr); }
    .project-artifact-stage { min-height: 112px; overflow: hidden; }
    .project-artifact-stage img { top: auto; right: auto; bottom: -24%; left: 50%; width: min(78%, 430px); max-height: 168%; }
    .project-artifact-stage.artifact-plugin img { top: auto; bottom: -43%; left: 50%; width: min(42%, 210px); max-height: 188%; }
    .project-artifact-stage.artifact-telemetry img { top: auto; bottom: -24%; left: 50%; width: min(58%, 310px); max-height: 158%; }
    .project-artifact-stage > span { left: 4px; bottom: 3px; font-size: 8.69px; }
    .project-topology-preview { display: none; }
    .project-evidence-panel { grid-row: 2; gap: 7px; padding: 20px 19px 18px; clip-path: polygon(0 0, 96% 0, 100% 10%, 100% 100%, 4% 100%, 0 90%); background-size: 110% 110%; }
    .project-evidence-panel h3,
    .project-evidence-panel > .project-summary { max-width: 100%; }
    .project-evidence-panel h3 { font-size: 24.84px; }
    .project-summary { font-size: 13.66px; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .project-proof-grid { grid-template-columns: 1fr 1fr; }
    .project-proof-grid > div:nth-child(n+3) { display: none; }
    .project-proof-grid div { padding: 8px; }
    .project-proof-grid dd { font-size: 11.18px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
    .project-action-row {
      top: 8px;
      right: 8px;
      bottom: auto;
      left: auto;
      width: 128px;
      flex-direction: column;
      transform: none;
    }
    .project-action-row a,
    .project-action-row button { width: 100%; flex: 0 0 auto; padding: 0 7px; font-size: 9.94px; }

    .timeline-chapter-content { gap: 8px; }
    .spatial-timeline { grid-template-columns: 1fr; grid-template-rows: 20px 142px minmax(0, 1fr); gap: 7px; }
    .timeline-axis { grid-column: 1; font-size: 8.69px; }
    .timeline-waypoints { grid-column: 1; grid-row: 2; gap: 7px; }
    .timeline-waypoints button { padding: 9px; grid-template-rows: auto 1fr auto; }
    .timeline-waypoints button > i { width: 34px; height: 34px; }
    .timeline-waypoints button strong { font-size: 14.9px; }
    .timeline-waypoints button small { display: none; }
    .timeline-focus-card { grid-column: 1; grid-row: 3; justify-content: flex-start; padding: 18px 19px; overflow: hidden; background-size: 110% 110%; }
    .timeline-focus-card > p { margin-bottom: 5px; font-size: 9.94px; }
    .timeline-focus-card h3 { font-size: 22.36px; }
    .timeline-focus-card > strong { margin-top: 4px; font-size: 13.66px; }
    .timeline-focus-card > span { margin-top: 7px; font-size: 11.18px; line-height: 1.32; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
    .timeline-focus-card ul { gap: 3px; margin-top: 7px; }
    .timeline-focus-card li { font-size: 9.94px; line-height: 1.3; }
    .timeline-focus-card li:nth-child(n+2) { display: none; }
    .professional-stack-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); max-height: 58px; overflow: hidden; }
    .professional-stack-strip div:nth-child(n+3) { display: none; }

    .personal-feature { min-height: 0; padding: 13px; }
    .personal-spatial-grid { grid-template-rows: minmax(0, 1.05fr) minmax(150px, .95fr); }
    .field-note-placeholder { min-height: 130px; }
    .field-note-placeholder strong { font-size: 22.36px; }
    .personal-feature-caption { grid-template-columns: 78px 1fr; gap: 7px; padding: 8px; }
    .personal-feature-caption span,
    .personal-feature-caption p { font-size: 9.94px; }
    .personal-collection-copy { padding: 19px; justify-content: flex-start; background-size: 110% 110%; }
    .personal-collection-copy h3 { margin-top: 4px; font-size: 21.11px; }
    .personal-collection-copy > span { margin-top: 6px; font-size: 11.18px; line-height: 1.33; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .personal-media-index { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3px; margin-top: 8px; }
    .personal-media-index button { grid-template-columns: 20px 1fr; min-height: 30px; padding: 0 5px; }
    .personal-media-index strong { font-size: 8.69px; }

    .contact-transmission { width: 100%; align-self: start; padding-top: 7vh; }
    .contact-transmission > p { font-size: 17.39px; }
    .contact-email { margin-top: 14px; font-size: 27.32px; }
    .contact-grid { grid-template-columns: 1fr; margin-top: 18px; }
    .contact-grid a { padding: 12px; }

    .spatial-hud { right: 10px; bottom: 14px; width: min(326px, calc(100vw - 20px)); }
    .spatial-lore-guide { left: 10px; bottom: 78px; width: 78px; min-height: 78px; padding-left: 0; }
    .spatial-lore-guide.is-collapsed { width: 78px; height: 78px; min-height: 78px; }
    .spatial-lore-guide .lore-medallion {
      top: 50%;
      left: 0;
      width: 76px;
      height: 76px;
      transform: translateY(-50%);
    }
    .spatial-lore-guide .lore-parchment { position: absolute; left: 58px; width: calc(100vw - 78px); opacity: 0; transform: translateX(-26px); pointer-events: none; }
    .spatial-lore-guide .lore-toggle { right: -28px; color: var(--accent); }
    .spatial-lore-guide:not(.is-collapsed) { bottom: 78px; width: calc(100vw - 20px); padding-left: 58px; }
    .spatial-lore-guide:not(.is-collapsed) .lore-parchment { opacity: 1; transform: none; pointer-events: auto; padding-left: 24px; }
    .spatial-lore-guide:not(.is-collapsed) .lore-toggle { right: 10px; color: var(--parchment-ink); }
    .archive-progress { bottom: 18px; width: 170px; }

    .architecture-dialog-backdrop { padding: 8px; }
    .architecture-dialog { width: 100%; max-height: 96vh; }
    .architecture-dialog > header { padding: 12px; }
    .architecture-dialog header h2 { font-size: 23.6px; }
    .architecture-dialog-summary { margin: 12px 12px 0; font-size: 13.66px; }
    .architecture-case-study { grid-template-columns: 1fr; margin: 12px 12px 0; }
    .architecture-step-grid { grid-template-columns: 1fr; margin: 12px; }
    .architecture-step-grid article { min-height: 0; }
    .architecture-placement,
    .architecture-notes { margin: 0 12px 12px; }
    .architecture-notes { grid-template-columns: 1fr; }
    .architecture-stack-grid { grid-template-columns: 1fr 1fr; margin: 0 12px 12px; }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .archive-viewport.rail-expanded .archive-scene { left: 158px; }
    .archive-viewport.rail-collapsed .archive-scene { left: 76px; }
    .project-spatial-grid {
      padding-right: 150px;
      overflow: hidden;
    }
    .project-action-row {
      top: 50%;
      right: 0;
      bottom: auto;
      left: auto;
      width: 136px;
      flex-direction: column;
      transform: translateY(-50%);
    }
    .project-action-row a,
    .project-action-row button { width: 100%; }
  }

  @media (max-height: 820px) and (min-width: 761px) {
    .archive-scene { top: 84px; bottom: 100px; }
    .spatial-lore-guide,
    .spatial-hud { bottom: 8px; }

    .project-spatial-grid { grid-template-columns: minmax(0, 1fr); }
    .project-topology-preview { display: none; }
    .project-evidence-panel {
      gap: 8px;
      padding: 22px 34px;
    }
    .project-evidence-panel > .project-summary,
    .project-proof-grid dd { -webkit-line-clamp: 2; }
    .project-proof-grid { gap: 6px 14px; }
    .project-proof-grid div { padding: 4px 8px; }

    .timeline-focus-card { padding: 16px 28px; }
    .timeline-focus-card > p { margin-bottom: 4px; }
    .timeline-focus-card > strong { margin-top: 4px; }
    .timeline-focus-card > span {
      display: -webkit-box;
      flex: 0 0 auto;
      margin-top: 7px;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .timeline-focus-card ul { gap: 5px; margin-top: 8px; }
    .professional-stack-strip div { padding: 5px 10px; }
    .personal-collection-copy { padding: 24px 34px; }
    .personal-collection-copy h3 { margin-top: 4px; }
    .personal-collection-copy > span { margin-top: 8px; }
    .personal-media-index { margin-top: 8px; }
  }

  @media (max-height: 680px) and (min-width: 761px) {
    .archive-scene { top: 86px; bottom: 86px; }
    .chapter-heading h2 { font-size: 31.05px; }
    .chapter-heading { padding-bottom: 8px; }
    .intro-copy-stage { top: 20%; width: min(340px, 26vw); }
    .spatial-lore-guide { bottom: 12px; }
    .spatial-hud { bottom: 12px; }
    .archive-progress { bottom: 15px; }
  }

  /* Case studies are staged directly against the systems hall and its foreground table. */
  .project-spatial-grid.project-case-layout {
    position: relative;
    min-width: 0;
    min-height: 0;
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(118px, auto) auto minmax(108px, 1fr);
    gap: clamp(8px, 1.2vh, 12px);
    padding: 0;
    overflow: visible;
    isolation: isolate;
  }

  .project-identity-copy {
    grid-column: 1;
    grid-row: 1;
    align-self: center;
    z-index: 5;
    width: min(48%, 590px);
    padding: 0;
    color: var(--ink);
    text-shadow: 0 3px 16px rgba(0, 0, 0, .82), var(--surface-text-shadow);
    pointer-events: none;
  }

  .project-identity-copy .project-overline {
    max-width: none;
    justify-content: flex-start;
    gap: 13px;
    color: var(--muted);
    font-size: clamp(12.42px, .82vw, 14.9px);
  }

  .project-identity-copy .project-overline span { color: var(--accent); }
  .project-identity-copy .project-overline em {
    overflow: visible;
    text-overflow: clip;
    white-space: normal;
  }

  .project-identity-copy h3 {
    max-width: 100%;
    margin: 8px 0 0;
    color: var(--ink);
    font-size: clamp(34.77px, 2.6vw, 47.2px);
    line-height: .96;
    text-transform: uppercase;
  }

  .project-identity-copy .project-summary {
    max-width: 100%;
    margin-top: 9px;
    color: var(--muted);
    font-size: clamp(16.77px, 1.08vw, 18.63px);
    line-height: 1.34;
  }

  .archive-app.theme-winter .project-identity-copy {
    color: #050505;
    text-shadow:
      0 1px 0 rgba(255, 255, 255, .96),
      0 0 11px rgba(238, 247, 250, .92),
      0 0 26px rgba(229, 241, 246, .64);
  }

  .archive-app.theme-winter .project-identity-copy :is(h3, .project-summary, .project-overline) {
    color: #050505;
  }

  .project-case-layout .project-artifact-stage {
    position: absolute;
    top: -5px;
    right: 174px;
    left: 48%;
    z-index: 3;
    width: auto;
    height: 116px;
    min-height: 0;
    overflow: visible;
    opacity: .92;
  }

  .project-case-layout .project-artifact-stage::before {
    left: 16%;
    right: 16%;
    bottom: -3px;
    height: 25px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .78), transparent 70%);
    filter: blur(7px);
    transform: perspective(420px) rotateX(68deg);
  }

  .project-case-layout .project-artifact-stage img,
  .project-case-layout .project-artifact-stage.artifact-plugin img,
  .project-case-layout .project-artifact-stage.artifact-telemetry img {
    top: 0;
    left: 50%;
    width: min(78%, 290px);
    max-height: 112px;
    opacity: .94;
    object-fit: contain;
  }

  .project-case-layout .project-artifact-stage.artifact-plugin img {
    top: -3px;
    width: min(48%, 174px);
  }

  .project-case-layout .project-artifact-stage.artifact-telemetry img {
    width: min(64%, 224px);
  }

  .project-case-layout .project-action-row {
    position: absolute;
    top: 4px;
    right: 0;
    bottom: auto;
    left: auto;
    z-index: 8;
    width: 158px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    transform: none;
  }

  .project-case-layout .project-action-row a,
  .project-case-layout .project-action-row button {
    width: 100%;
    min-height: 39px;
    padding-inline: 12px;
    font-size: 12.42px;
  }

  .project-case-layout .project-proof-grid {
    position: relative;
    grid-column: 1;
    grid-row: 2;
    z-index: 6;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
    gap: clamp(8px, 1vw, 15px);
    margin: 0;
    padding: 0;
    overflow: visible;
    border: 0;
    background: transparent;
  }

  .project-case-layout .project-proof-grid > div,
  .project-flowchart button {
    position: relative;
    border: 0;
    background: var(--surface-image) var(--slab-position, 50% 50%) / 182% 182% no-repeat;
    color: var(--panel-ink);
    clip-path: polygon(3% 0, 97% 1%, 100% 8%, 98% 94%, 93% 100%, 4% 98%, 0 91%, 1% 6%);
    text-shadow: var(--surface-text-shadow);
    filter: drop-shadow(0 13px 10px rgba(0, 0, 0, .42));
    isolation: isolate;
  }

  .project-case-layout .project-proof-grid > div {
    display: block;
    min-width: 0;
    min-height: 145px;
    padding: clamp(11px, 1vw, 15px) clamp(12px, 1.15vw, 17px);
    overflow: hidden;
    transition: filter 360ms ease, transform 420ms cubic-bezier(.16, .76, .22, 1);
  }

  .project-case-layout .project-proof-grid > div:nth-child(1) { --slab-position: 21% 46%; --proof-rest-transform: rotate(-.18deg); transform: var(--proof-rest-transform); }
  .project-case-layout .project-proof-grid > div:nth-child(2) { --slab-position: 44% 52%; --proof-rest-transform: translateY(2px) rotate(.12deg); transform: var(--proof-rest-transform); }
  .project-case-layout .project-proof-grid > div:nth-child(3) { --slab-position: 68% 48%; --proof-rest-transform: translateY(-1px) rotate(-.1deg); transform: var(--proof-rest-transform); }
  .project-case-layout .project-proof-grid > div:nth-child(4) { --slab-position: 86% 54%; --proof-rest-transform: translateY(2px) rotate(.16deg); transform: var(--proof-rest-transform); }

  .project-case-layout .project-proof-grid > div::before,
  .project-flowchart button::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      linear-gradient(142deg, rgba(255, 255, 255, .17), transparent 11% 70%, rgba(0, 0, 0, .28)),
      linear-gradient(180deg, transparent 62%, rgba(0, 0, 0, .2));
    box-shadow:
      inset 0 2px 1px rgba(255, 255, 255, .13),
      inset 0 -9px 18px rgba(0, 0, 0, .18);
    opacity: .66;
  }

  .project-case-layout .project-proof-grid > div:hover {
    filter: brightness(1.06) drop-shadow(0 17px 13px rgba(0, 0, 0, .48));
    transform: translateY(-4px);
  }

  .project-case-layout .project-proof-grid > div:nth-child(n + 3) { display: block; }

  .project-case-layout .project-proof-grid dt {
    position: relative;
    z-index: 2;
    margin-bottom: 7px;
    color: var(--accent);
    font-size: clamp(12.42px, .72vw, 13.05px);
    letter-spacing: 0;
  }

  .project-case-layout .project-proof-grid dd {
    position: relative;
    z-index: 2;
    display: block;
    overflow: visible;
    margin: 0;
    color: var(--panel-ink);
    font-size: clamp(13.05px, .76vw, 14.29px);
    line-height: 1.28;
    -webkit-box-orient: initial;
    -webkit-line-clamp: initial;
  }

  .project-topology-stage {
    position: relative;
    grid-column: 1;
    grid-row: 3;
    z-index: 4;
    min-width: 0;
    min-height: 0;
    display: grid;
    align-items: end;
    overflow: visible;
    isolation: isolate;
    perspective: 1100px;
  }

  .project-topology-stage::before {
    content: "";
    position: absolute;
    right: 10%;
    bottom: -12px;
    left: 10%;
    height: 78px;
    z-index: -2;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .58), rgba(0, 0, 0, .22) 44%, transparent 72%);
    filter: blur(9px);
    transform: perspective(760px) rotateX(65deg) scaleX(.96);
    transform-origin: 50% 100%;
    pointer-events: none;
  }

  .project-topology-stage .topology-heading {
    position: absolute;
    top: 0;
    left: 1.5%;
    z-index: 5;
    display: grid;
    gap: 2px;
    max-width: 34%;
    padding: 0;
    border: 0;
    color: var(--ink);
    text-shadow: 0 3px 12px rgba(0, 0, 0, .76), var(--surface-text-shadow);
  }

  .project-topology-stage .topology-heading span {
    color: var(--accent);
    font-size: 11.8px;
  }

  .project-topology-stage .topology-heading strong {
    color: var(--ink);
    font-size: 16.15px;
    line-height: 1.05;
  }

  .archive-app.theme-winter .project-topology-stage .topology-heading,
  .archive-app.theme-winter .project-topology-stage .topology-heading :is(span, strong) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .94), 0 0 10px rgba(239, 248, 251, .9);
  }

  .project-topology-stage .compact-stack {
    position: absolute;
    top: 0;
    right: 1.5%;
    z-index: 5;
    width: min(58%, 670px);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    padding: 0;
    border: 0;
    pointer-events: none;
  }

  .project-topology-stage .compact-stack div {
    min-width: 0;
    display: block;
  }

  .project-topology-stage .compact-stack span {
    display: block;
    margin-bottom: 2px;
    color: var(--accent);
    font-size: 9.94px;
  }

  .project-topology-stage .compact-stack p {
    overflow: hidden;
    margin: 0;
    color: var(--muted);
    font-size: 9.94px;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0 2px 8px rgba(0, 0, 0, .78);
  }

  .archive-app.theme-winter .project-topology-stage .compact-stack :is(span, p) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .94), 0 0 9px rgba(239, 248, 251, .86);
  }

  .project-flowchart {
    --flow-gap: clamp(14px, 1.55vw, 25px);
    position: relative;
    align-self: end;
    justify-self: center;
    width: min(79%, 930px);
    min-height: 78px;
    display: grid;
    grid-template-columns: repeat(var(--flow-count), minmax(70px, 1fr));
    gap: var(--flow-gap);
    margin: 0 0 54px;
    padding: 0;
    overflow: visible;
    list-style: none;
    transform: perspective(980px) rotateX(48deg) translateY(10px);
    transform-origin: 50% 100%;
    transform-style: preserve-3d;
  }

  .project-flowchart li {
    position: relative;
    z-index: 2;
    min-width: 0;
    display: flex;
    transform-style: preserve-3d;
    animation: topologyNodeSettle 780ms cubic-bezier(.16, .76, .22, 1) both;
    animation-delay: calc(120ms + var(--flow-index) * 70ms);
  }

  .project-flowchart li::before {
    content: "";
    position: absolute;
    right: 7%;
    bottom: -11px;
    left: 7%;
    height: 22px;
    z-index: -2;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .68), transparent 72%);
    filter: blur(5px);
    transform: translateZ(-10px);
  }

  .project-flowchart li:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% - 2px);
    width: calc(var(--flow-gap) + 5px);
    height: 12px;
    z-index: -1;
    background: linear-gradient(90deg, var(--mountain), var(--accent) 58%, var(--mountain));
    clip-path: polygon(0 35%, 72% 35%, 72% 0, 100% 50%, 72% 100%, 72% 65%, 0 65%);
    filter: drop-shadow(0 4px 3px rgba(0, 0, 0, .56));
    transform: translateY(-50%) translateZ(-4px);
  }

  .project-flowchart button {
    width: 100%;
    min-height: 84px;
    display: grid;
    align-content: center;
    gap: 5px;
    padding: 10px 8px;
    cursor: pointer;
    transform: translateZ(0);
    transform-style: preserve-3d;
    transition: filter 360ms ease, transform 420ms cubic-bezier(.16, .76, .22, 1);
  }

  .project-flowchart li:nth-child(2n) button { --slab-position: 72% 48%; }
  .project-flowchart li:nth-child(3n) button { --slab-position: 32% 62%; }

  .project-flowchart button:hover,
  .project-flowchart button:focus-visible {
    filter: brightness(1.1) drop-shadow(0 18px 12px rgba(0, 0, 0, .5));
    transform: translate3d(0, -5px, 17px);
  }

  .project-flowchart button span,
  .project-flowchart button strong {
    position: relative;
    z-index: 2;
  }

  .project-flowchart button span {
    color: var(--accent);
    font-size: 10.56px;
    line-height: 1;
  }

  .project-flowchart button strong {
    color: var(--panel-ink);
    font-size: clamp(11.18px, .66vw, 12.42px);
    line-height: 1.05;
    text-transform: uppercase;
  }

  @keyframes topologyNodeSettle {
    from { opacity: 0; transform: translate3d(0, 18px, -34px); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @media (min-width: 761px) {
    .archive-viewport .archive-scene.scene-projects {
      right: clamp(20px, 2.4vw, 38px);
    }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .project-spatial-grid.project-case-layout {
      padding-right: 0;
      overflow: visible;
    }

    .project-identity-copy { width: 47%; }
    .project-case-layout .project-artifact-stage { right: 150px; left: 47%; }
    .project-case-layout .project-action-row { width: 140px; }
    .project-case-layout .project-proof-grid dd { font-size: 11.8px; }
    .project-flowchart { width: 84%; }
  }

  @media (min-width: 761px) and (max-width: 900px) {
    .archive-viewport .archive-scene.scene-projects { right: 14px; }
    .project-identity-copy { width: calc(100% - 154px); }
    .project-case-layout .project-artifact-stage { display: none; }
    .project-case-layout .project-proof-grid {
      grid-template-columns: repeat(4, minmax(195px, 1fr));
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }
    .project-case-layout .project-proof-grid::-webkit-scrollbar { display: none; }
    .project-topology-stage { overflow-x: auto; scrollbar-width: none; }
    .project-topology-stage::-webkit-scrollbar { display: none; }
    .project-flowchart { width: 690px; min-width: 690px; justify-self: start; }
    .project-topology-stage .compact-stack { display: none; }
  }

  @media (max-width: 760px) {
    .project-spatial-grid.project-case-layout {
      grid-template-rows: minmax(92px, auto) 132px minmax(92px, 1fr);
      gap: 7px;
      padding: 0;
      overflow: visible;
    }

    .project-identity-copy {
      width: 100%;
      padding-right: 118px;
    }

    .project-identity-copy .project-overline { gap: 7px; font-size: 9.94px; }
    .project-identity-copy h3 { margin-top: 4px; font-size: 24.84px; }
    .project-identity-copy .project-summary {
      display: -webkit-box;
      margin-top: 5px;
      overflow: hidden;
      font-size: 11.8px;
      line-height: 1.24;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .project-case-layout .project-artifact-stage { display: none; }
    .project-case-layout .project-action-row {
      top: 0;
      right: 0;
      width: 110px;
      gap: 5px;
    }
    .project-case-layout .project-action-row a,
    .project-case-layout .project-action-row button {
      min-height: 32px;
      padding: 0 6px;
      font-size: 9.32px;
    }

    .project-case-layout .project-proof-grid {
      width: 100%;
      max-width: 100%;
      grid-template-columns: repeat(4, minmax(210px, 74vw));
      gap: 8px;
      padding: 1px 0 7px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x proximity;
      scroll-padding-inline: 10px;
      scroll-behavior: smooth;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x pinch-zoom;
      cursor: grab;
      scrollbar-width: none;
    }
    .project-case-layout .project-proof-grid:active { cursor: grabbing; }
    .project-case-layout .project-proof-grid::-webkit-scrollbar { display: none; }
    .project-case-layout .project-proof-grid > div,
    .project-case-layout .project-proof-grid > div:nth-child(n + 3) {
      display: block;
      min-height: 122px;
      padding: 10px 11px;
      scroll-snap-align: start;
      transform: none;
    }
    .project-case-layout .project-proof-grid dt { margin-bottom: 4px; font-size: 9.94px; }
    .project-case-layout .project-proof-grid dd { font-size: 10.56px; line-height: 1.22; }

    .project-topology-stage {
      min-height: 92px;
      padding-top: 19px;
      overflow-x: auto;
      overflow-y: hidden;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }
    .project-topology-stage::-webkit-scrollbar { display: none; }
    .project-topology-stage .topology-heading {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 72vw;
    }
    .project-topology-stage .topology-heading span { font-size: 8.69px; }
    .project-topology-stage .topology-heading strong { font-size: 11.18px; }
    .project-topology-stage .compact-stack { display: none; }
    .project-flowchart {
      --flow-gap: 10px;
      width: max(640px, calc(var(--flow-count) * 94px));
      min-width: max(640px, calc(var(--flow-count) * 94px));
      min-height: 62px;
      justify-self: start;
      grid-template-columns: repeat(var(--flow-count), minmax(80px, 1fr));
      margin-bottom: -6px;
      transform: perspective(720px) rotateX(48deg) translateY(6px);
    }
    .project-flowchart button { min-height: 61px; padding: 7px 6px; }
    .project-flowchart button span { font-size: 8.69px; }
    .project-flowchart button strong { font-size: 9.32px; }
  }

  @media (max-height: 680px) and (min-width: 761px) {
    .project-spatial-grid.project-case-layout {
      grid-template-rows: minmax(88px, auto) auto minmax(82px, 1fr);
      gap: 6px;
    }
    .project-identity-copy h3 { font-size: 31.05px; }
    .project-identity-copy .project-summary {
      display: -webkit-box;
      overflow: hidden;
      font-size: 13.66px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .project-case-layout .project-proof-grid > div { min-height: 104px; padding: 8px 10px; }
    .project-case-layout .project-proof-grid dt { margin-bottom: 3px; font-size: 9.94px; }
    .project-case-layout .project-proof-grid dd { font-size: 10.56px; line-height: 1.18; }
    .project-flowchart button { min-height: 58px; }
    .project-topology-stage .compact-stack { display: none; }
  }

  /* The topology shares the systems plate coordinate space, so it stays on the table at every aspect ratio. */
  .cinematic-systems-overlay {
    position: absolute;
    inset: 0;
    z-index: 6;
    overflow: hidden;
    pointer-events: none;
    perspective: 1600px;
  }

  .cinematic-systems-overlay .cinematic-image-stage {
    pointer-events: none;
  }

  .systems-overlay-plate {
    z-index: 1;
    pointer-events: none;
  }

  .archive-viewport.theme-default {
    --topology-rope-dark: #261d13;
    --topology-rope-mid: #756044;
    --topology-rope-light: #c3a370;
  }

  .archive-viewport.theme-fall {
    --topology-rope-dark: #32160f;
    --topology-rope-mid: #8d462b;
    --topology-rope-light: #d28a45;
  }

  .archive-viewport.theme-spring {
    --topology-rope-dark: #142419;
    --topology-rope-mid: #4f7458;
    --topology-rope-light: #a2bd84;
  }

  .archive-viewport.theme-winter {
    --topology-rope-dark: #1e2930;
    --topology-rope-mid: #65757e;
    --topology-rope-light: #d8e0e3;
  }

  .cinematic-systems-overlay .project-topology-stage {
    position: absolute;
    top: 55.1%;
    left: 26.35%;
    width: 47.3%;
    height: 23.7%;
    min-width: 0;
    min-height: 0;
    display: block;
    overflow: visible;
    isolation: isolate;
    perspective: none;
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage::before {
    content: none;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading {
    position: absolute;
    top: 1.5%;
    left: 1.2%;
    z-index: 5;
    max-width: 30%;
    display: grid;
    gap: 2px;
    padding: 0;
    color: var(--ink);
    text-shadow: 0 3px 12px rgba(0, 0, 0, .9), var(--surface-text-shadow);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading span {
    color: var(--accent);
    font-size: clamp(9px, .58vw, 12px);
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading strong {
    color: var(--ink);
    font-size: clamp(11px, .78vw, 16px);
    line-height: 1.08;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack {
    position: absolute;
    top: 105%;
    right: 6%;
    left: 6%;
    z-index: 5;
    width: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(12px, 1.3vw, 24px);
    padding: clamp(5px, .48vw, 9px) clamp(14px, 1.4vw, 26px);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack div {
    min-width: 0;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack span,
  .cinematic-systems-overlay .project-topology-stage .compact-stack p {
    display: block;
    overflow: hidden;
    margin: 0;
    color: var(--ink);
    font-size: clamp(11.5px, .74vw, 14.5px);
    font-weight: 700;
    line-height: 1.12;
    text-overflow: ellipsis;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .96), var(--surface-text-shadow);
    white-space: nowrap;
  }

  .cinematic-systems-overlay .project-topology-stage .compact-stack span {
    margin-bottom: 2px;
    color: var(--accent);
  }

  .cinematic-systems-overlay .project-flowchart {
    --flow-gap: clamp(10px, .86vw, 16px);
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: 0;
    height: 72%;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(var(--flow-count), minmax(0, 1fr));
    align-items: end;
    gap: var(--flow-gap);
    margin: 0;
    padding: 0;
    overflow: visible;
    list-style: none;
    transform: none;
    transform-style: flat;
  }

  .cinematic-systems-overlay .project-flowchart::before {
    content: none;
  }

  .cinematic-systems-overlay .project-flowchart li {
    position: relative;
    z-index: 2;
    min-width: 0;
    height: 100%;
    display: grid;
    align-items: end;
    opacity: 1;
    transform: none;
    transform-style: flat;
    animation: topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
  }

  .cinematic-systems-overlay .project-flowchart li::before {
    content: "";
    position: absolute;
    right: 9%;
    bottom: -5%;
    left: 9%;
    height: 13%;
    z-index: -3;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .78), rgba(0, 0, 0, .28) 48%, transparent 74%);
    filter: blur(4px);
    transform: scaleX(.92);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-flowchart li:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 18%;
    left: 64%;
    width: calc(72% + var(--flow-gap));
    height: clamp(48px, 3.6vw, 66px);
    z-index: 1;
    border: 0;
    border-radius: 0;
    background: var(--topology-rope-image) center / 100% 100% no-repeat;
    box-shadow: none;
    clip-path: none;
    filter: brightness(1.24) drop-shadow(0 4px 3px rgba(0, 0, 0, .72));
    transform: none;
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-flowchart button {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 96%;
    min-height: 0;
    display: grid;
    align-content: center;
    justify-items: center;
    gap: clamp(3px, .32vw, 6px);
    padding: 23% 17% 19%;
    overflow: visible;
    border: 0;
    background: var(--topology-slab-image) center / 100% 100% no-repeat;
    color: #ece5d6;
    clip-path: none;
    cursor: pointer;
    filter: drop-shadow(0 12px 8px rgba(0, 0, 0, .52));
    text-shadow: 0 1px 1px rgba(0, 0, 0, .96);
    transform: translate3d(0, 0, 0);
    transform-style: flat;
    transition: filter 320ms ease, transform 380ms cubic-bezier(.16, .76, .22, 1);
    pointer-events: none;
  }

  .cinematic-systems-overlay .project-topology-stage.is-interactive .project-flowchart button {
    pointer-events: auto;
  }

  .cinematic-systems-overlay .project-flowchart button::before,
  .cinematic-systems-overlay .project-flowchart button::after { content: none; }

  .cinematic-systems-overlay .project-flowchart button:hover,
  .cinematic-systems-overlay .project-flowchart button:focus-visible {
    filter: brightness(1.1) drop-shadow(0 20px 13px rgba(0, 0, 0, .6));
    transform: translate3d(0, -7px, 0) scale(1.045);
  }

  .cinematic-systems-overlay .project-flowchart button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -8px;
  }

  .cinematic-systems-overlay .project-flowchart button span,
  .cinematic-systems-overlay .project-flowchart button strong {
    position: relative;
    z-index: 4;
    max-width: 100%;
    overflow-wrap: anywhere;
    text-align: center;
  }

  .cinematic-systems-overlay .project-flowchart button span {
    color: var(--accent);
    font-size: clamp(9px, .58vw, 11px);
    font-weight: 700;
    line-height: 1;
  }

  .cinematic-systems-overlay .project-flowchart button strong {
    color: #eee7d8;
    font-size: clamp(11px, .72vw, 15px);
    font-weight: 700;
    line-height: 1.06;
    text-transform: uppercase;
  }

  .archive-viewport.theme-winter .cinematic-systems-overlay .project-topology-stage :is(.topology-heading, .topology-heading span, .topology-heading strong, .compact-stack span, .compact-stack p) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .98), 0 0 9px rgba(239, 248, 251, .88);
  }

  .archive-viewport.theme-winter .cinematic-systems-overlay .project-flowchart button {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .96), 0 0 5px rgba(255, 255, 255, .84);
  }

  .archive-viewport.theme-winter .cinematic-systems-overlay .project-flowchart button :is(span, strong) {
    color: #050505;
  }

  @keyframes topologyNodeFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -5px; }
  }

  @media (max-width: 760px) {
    .cinematic-systems-overlay .project-topology-stage {
      top: 54.8%;
      left: 50%;
      width: 100vw;
      height: 24.5%;
      overflow-x: auto;
      overflow-y: visible;
      scroll-snap-type: x proximity;
      scroll-padding-inline: 14px;
      scroll-behavior: smooth;
      overscroll-behavior-x: contain;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x pinch-zoom;
      cursor: grab;
      scrollbar-width: none;
      transform: translateX(-50%);
      pointer-events: auto;
    }

    .cinematic-systems-overlay .project-topology-stage:active { cursor: grabbing; }
    .cinematic-systems-overlay .project-topology-stage::-webkit-scrollbar { display: none; }
    .cinematic-systems-overlay .project-topology-stage .compact-stack { display: none; }
    .cinematic-systems-overlay .project-topology-stage .topology-heading {
      position: sticky;
      left: 16px;
      max-width: 240px;
    }

    .cinematic-systems-overlay .project-flowchart {
      --flow-gap: 8px;
      right: auto;
      width: max(660px, calc(var(--flow-count) * 96px));
      min-width: max(660px, calc(var(--flow-count) * 96px));
      height: 72%;
      grid-template-columns: repeat(var(--flow-count), minmax(84px, 1fr));
      padding-inline: 14px;
    }

    .cinematic-systems-overlay .project-flowchart li {
      scroll-snap-align: center;
      scroll-snap-stop: normal;
    }

    .cinematic-systems-overlay .project-flowchart button {
      padding: 22% 17% 18%;
    }

    .cinematic-systems-overlay .project-flowchart button span { font-size: 8px; }
    .cinematic-systems-overlay .project-flowchart button strong { font-size: 9px; }
  }

  /* Time-driven case-study choreography shared by the scene copy and table topology. */
  .case-type-caret {
    display: inline-block;
    width: .07em;
    height: .82em;
    margin-left: .08em;
    background: currentColor;
    box-shadow: 0 0 7px color-mix(in srgb, currentColor 52%, transparent);
    vertical-align: -.02em;
    animation: caseCaretBlink 720ms steps(1, end) infinite;
  }

  .case-study-heading > div > p,
  .case-study-heading h2,
  .case-study-heading > span,
  .project-identity-copy .project-overline,
  .project-identity-copy h3,
  .project-identity-copy .project-summary,
  .project-topology-stage .topology-heading span,
  .project-topology-stage .topology-heading strong {
    min-height: 1em;
  }

  .projects-chapter-content:not(.is-sequence-active) .case-study-heading,
  .projects-chapter-content:not(.is-sequence-active) .project-switcher-shell {
    visibility: hidden;
  }

  .projects-chapter-content:not(.is-sequence-active) .project-switcher button {
    opacity: 0;
    transform: translate3d(0, 12px, 0) scale(.76);
  }

  .projects-chapter-content.is-sequence-active .project-switcher button {
    animation: caseTabEnter 820ms cubic-bezier(.16, .82, .2, 1) var(--case-tab-enter-delay) backwards;
    transform-origin: 50% 50%;
    will-change: opacity, filter, transform;
  }

  .project-case-layout.case-sequence-idle :is(
    .project-identity-copy,
    .project-artifact-stage,
    .project-action-row,
    .project-proof-grid > div
  ) {
    opacity: 0;
    pointer-events: none;
  }

  .project-case-layout.case-sequence-entering .project-identity-copy,
  .project-case-layout.case-sequence-visible .project-identity-copy,
  .project-case-layout.case-sequence-exiting .project-identity-copy {
    opacity: 1;
  }

  .project-case-layout.case-sequence-entering :is(.project-artifact-stage, .project-action-row) {
    animation: caseIdentitySupportEnter 980ms cubic-bezier(.16, .82, .2, 1) var(--case-artifact-enter-delay) both;
    will-change: opacity, filter, transform;
  }

  .project-case-layout.case-sequence-visible :is(.project-artifact-stage, .project-action-row) {
    opacity: 1;
    filter: none;
    transform: none;
  }

  .project-case-layout.case-sequence-exiting :is(.project-artifact-stage, .project-action-row) {
    animation: caseIdentitySupportExit 720ms cubic-bezier(.5, 0, .84, .18) var(--case-artifact-exit-delay) both;
    pointer-events: none;
    will-change: opacity, filter, transform;
  }

  .scene-projects .project-case-layout .project-proof-grid > div {
    --proof-float-delay: -1.1s;
    translate: 0 0;
    will-change: opacity, filter, transform, translate;
  }

  .scene-projects .project-case-layout .project-proof-grid > div:nth-child(2) { --proof-float-delay: -2.4s; }
  .scene-projects .project-case-layout .project-proof-grid > div:nth-child(3) { --proof-float-delay: -.5s; }
  .scene-projects .project-case-layout .project-proof-grid > div:nth-child(4) { --proof-float-delay: -3.2s; }

  .project-case-layout.case-sequence-idle .project-proof-grid > div {
    transform: translate3d(155px, 12px, 0) scale(.91);
  }

  .project-case-layout.case-sequence-entering .project-proof-grid > div {
    animation:
      caseProofEnter 900ms cubic-bezier(.12, .82, .18, 1) var(--proof-enter-delay) both,
      proofSlabFloat 5.4s ease-in-out var(--proof-float-delay) infinite;
  }

  .project-case-layout.case-sequence-visible .project-proof-grid > div {
    opacity: 1;
    transform: var(--proof-rest-transform);
    animation: proofSlabFloat 5.4s ease-in-out var(--proof-float-delay) infinite;
  }

  .project-case-layout.case-sequence-exiting .project-proof-grid > div {
    animation:
      caseProofExit 760ms cubic-bezier(.52, 0, .88, .22) var(--proof-exit-delay) both,
      proofSlabFloat 5.4s ease-in-out var(--proof-float-delay) infinite;
    pointer-events: none;
  }

  .scene-projects .project-case-layout.case-sequence-visible .project-proof-grid > div:hover {
    scale: 1.025;
    filter: brightness(1.07) drop-shadow(0 17px 13px rgba(0, 0, 0, .48));
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-idle .topology-heading {
    visibility: hidden;
  }

  .cinematic-systems-overlay .project-topology-stage .topology-heading span,
  .cinematic-systems-overlay .project-topology-stage .topology-heading strong {
    display: block;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-idle .project-flowchart li {
    opacity: 0;
    transform: translate3d(-175px, 12px, 0) scale(.9);
    animation: none;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-entering .project-flowchart li {
    animation:
      caseTopologyEnter 1050ms cubic-bezier(.12, .82, .18, 1) var(--case-topology-enter-delay) both,
      topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
    will-change: opacity, filter, transform, translate;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-visible .project-flowchart li {
    opacity: 1;
    transform: none;
    animation: topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-exiting .project-flowchart li {
    animation:
      caseTopologyExit 900ms cubic-bezier(.52, 0, .88, .22) var(--case-topology-exit-delay) both,
      topologyNodeFloat 5s ease-in-out calc(var(--flow-index) * -.43s) infinite;
    pointer-events: none;
    will-change: opacity, filter, transform, translate;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-idle .compact-stack div {
    opacity: 0;
    transform: translate3d(0, 38px, 0) scale(.94);
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-entering .compact-stack div {
    animation: caseStackEnter 720ms cubic-bezier(.12, .82, .18, 1) var(--stack-enter-delay) both;
    will-change: opacity, filter, transform;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-visible .compact-stack div {
    opacity: 1;
    filter: none;
    transform: none;
  }

  .cinematic-systems-overlay .project-topology-stage.case-sequence-exiting .compact-stack div {
    animation: caseStackExit 650ms cubic-bezier(.52, 0, .88, .22) var(--stack-exit-delay) both;
    will-change: opacity, filter, transform;
  }

  @keyframes caseCaretBlink {
    0%, 46% { opacity: 1; }
    47%, 100% { opacity: 0; }
  }

  @keyframes caseTabEnter {
    0% { opacity: 0; filter: blur(8px); transform: translate3d(0, 15px, -70px) scale(.72); }
    64% { opacity: 1; filter: blur(.4px); transform: translate3d(0, -2px, 4px) scale(1.018); }
    100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseIdentitySupportEnter {
    0% { opacity: 0; clip-path: inset(0 50%); filter: blur(9px); transform: translate3d(0, 18px, -85px) scale(.8); }
    66% { opacity: 1; clip-path: inset(0 0); filter: blur(.5px); transform: translate3d(0, -2px, 4px) scale(1.012); }
    100% { opacity: 1; clip-path: inset(0 0); filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseIdentitySupportExit {
    0% { opacity: 1; clip-path: inset(0 0); filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 0; clip-path: inset(0 50%); filter: blur(10px); transform: translate3d(0, -10px, 75px) scale(1.16); }
  }

  @keyframes caseProofEnter {
    0% { opacity: 0; filter: blur(9px) drop-shadow(0 13px 10px rgba(0, 0, 0, .42)); transform: translate3d(175px, 14px, 0) scale(.9) rotate(1.8deg); }
    68% { opacity: 1; filter: blur(.5px) drop-shadow(0 16px 12px rgba(0, 0, 0, .48)); transform: translate3d(-5px, -2px, 0) scale(1.012); }
    100% { opacity: 1; filter: blur(0) drop-shadow(0 13px 10px rgba(0, 0, 0, .42)); transform: var(--proof-rest-transform); }
  }

  @keyframes caseProofExit {
    0% { opacity: 1; filter: blur(0) drop-shadow(0 13px 10px rgba(0, 0, 0, .42)); transform: var(--proof-rest-transform); }
    100% { opacity: 0; filter: blur(9px) drop-shadow(0 9px 7px rgba(0, 0, 0, .3)); transform: translate3d(-175px, -12px, 0) scale(.9) rotate(-1.8deg); }
  }

  @keyframes caseTopologyEnter {
    0% { opacity: 0; filter: blur(9px); transform: translate3d(-185px, 13px, 0) scale(.88); }
    68% { opacity: 1; filter: blur(.5px); transform: translate3d(5px, -2px, 0) scale(1.012); }
    100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseTopologyExit {
    0% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 0; filter: blur(9px); transform: translate3d(185px, -10px, 0) scale(.9); }
  }

  @keyframes caseStackEnter {
    0% { opacity: 0; filter: blur(7px); transform: translate3d(0, 42px, 0) scale(.94); }
    70% { opacity: 1; filter: blur(.4px); transform: translate3d(0, -3px, 0) scale(1.008); }
    100% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
  }

  @keyframes caseStackExit {
    0% { opacity: 1; filter: blur(0); transform: translate3d(0, 0, 0) scale(1); }
    100% { opacity: 0; filter: blur(7px); transform: translate3d(0, -42px, 0) scale(.94); }
  }

  @keyframes proofSlabFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -4px; }
  }

  @media (min-width: 761px) {
    .cinematic-systems-overlay .project-topology-stage .topology-heading {
      top: auto;
      right: auto;
      bottom: 74%;
      left: 50%;
      width: max-content;
      max-width: 88%;
      justify-items: center;
      text-align: center;
      transform: translateX(-50%);
    }

    .archive-scene.scene-projects .projects-chapter-content {
      width: min(100%, 1260px);
      justify-self: center;
    }

    .scene-projects .project-switcher-shell {
      width: min(66%, 650px);
      justify-self: start;
    }

    .scene-projects .project-switcher button {
      grid-template-columns: 24px minmax(0, 1fr);
      min-height: 42px;
      padding-inline: 9px;
    }

    .project-case-layout .project-action-row {
      top: 46px;
    }

    .project-case-layout .project-proof-grid > div {
      min-height: 116px;
      padding: clamp(9px, .78vw, 12px) clamp(11px, .92vw, 14px);
    }
  }

  @media (min-width: 1051px) {
    .archive-viewport.rail-expanded .archive-scene.scene-projects {
      left: clamp(210px, 15vw, 268px);
      right: clamp(72px, 6.5vw, 124px);
    }

    .archive-viewport.rail-collapsed .archive-scene.scene-projects {
      left: clamp(126px, 10vw, 176px);
      right: clamp(72px, 6.5vw, 124px);
    }
  }

  /* Theme-matched physical interface materials. Icon-only collapse controls remain unframed. */
  .archive-viewport :is(
    .archive-header-actions a,
    .intro-actions a,
    .intro-gate-cta,
    .project-action-row a,
    .project-action-row button,
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button,
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close
  ) {
    border: 0;
    border-radius: 0;
    background: var(--control-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 9px 8px rgba(0, 0, 0, .42));
    text-shadow: var(--surface-text-shadow);
    transition:
      color 240ms ease,
      filter 320ms ease,
      transform 420ms cubic-bezier(.16, .76, .22, 1);
  }

  .archive-viewport :is(
    .archive-header-actions a,
    .intro-actions a,
    .intro-gate-cta,
    .project-action-row a,
    .project-action-row button,
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button,
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close
  ):hover {
    background: var(--control-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.1) drop-shadow(0 13px 10px rgba(0, 0, 0, .5));
  }

  .archive-viewport :is(
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button
  ).active {
    background: var(--control-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.2) saturate(1.08) drop-shadow(0 15px 12px rgba(0, 0, 0, .56));
  }

  .archive-viewport.theme-winter :is(
    .archive-header-actions a,
    .intro-actions a,
    .intro-gate-cta,
    .project-action-row a,
    .project-action-row button,
    .chapter-rail-list button,
    .project-switcher button,
    .personal-switcher button,
    .personal-media-index button,
    .hud-theme-row button,
    .chapter-scroll-arrow,
    .embedded-tab-arrow,
    .dialog-close
  ) {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .92), 0 0 3px rgba(255, 255, 255, .78);
  }

  .chapter-rail-list {
    gap: 9px;
    border: 0;
    background: transparent;
    overflow: visible;
  }

  .chapter-rail-list button {
    padding-inline: 11px;
  }

  .project-switcher,
  .personal-switcher {
    gap: clamp(7px, .72vw, 11px);
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .project-switcher button,
  .personal-switcher button {
    padding-inline: clamp(12px, 1vw, 17px);
  }

  .archive-viewport .spatial-hud {
    border: 0;
    border-radius: 0;
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 22px 24px rgba(0, 0, 0, .55));
    backdrop-filter: none;
  }

  .spatial-hud-content {
    gap: 12px;
    padding: 34px 39px 35px;
  }

  .hud-coordinate,
  .hud-atmosphere-row {
    border: 0;
  }

  .hud-theme-row {
    gap: 7px;
  }

  .hud-theme-row button {
    min-height: 36px;
    padding-inline: 8px;
  }

  .archive-viewport .lore-parchment {
    min-height: 158px;
    border: 0;
    border-radius: 0;
    background: var(--lore-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 18px 18px rgba(0, 0, 0, .48));
    text-shadow: var(--surface-text-shadow);
  }

  .archive-viewport.theme-winter .lore-parchment {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .96), 0 0 3px rgba(255, 255, 255, .84);
  }

  .archive-viewport .spatial-lore-guide {
    position: fixed;
  }

  .archive-viewport .lore-toggle:disabled {
    opacity: 0;
    pointer-events: none;
  }

  .archive-viewport .spatial-lore-guide.is-opening .lore-toggle {
    opacity: 0;
    pointer-events: none;
  }

  @media (min-width: 761px) {
    .archive-viewport .spatial-lore-guide {
      --lore-open-width: min(568px, calc(100vw - 430px));
      left: 24px;
      bottom: 22px;
      width: var(--lore-open-width);
      height: 158px;
      min-height: 158px;
      padding-left: 76px;
      transform: translate3d(0, 0, 0);
      transition:
        bottom 760ms cubic-bezier(.16, .76, .22, 1),
        width 720ms cubic-bezier(.16, .76, .22, 1),
        height 720ms cubic-bezier(.16, .76, .22, 1),
        min-height 720ms cubic-bezier(.16, .76, .22, 1),
        padding-left 720ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .spatial-lore-guide .lore-medallion {
      top: 50%;
      transform: translate3d(0, -50%, 0) scale(1);
      transition: transform 720ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .spatial-lore-guide .lore-parchment {
      position: absolute;
      top: 50%;
      left: 76px;
      width: calc(var(--lore-open-width) - 76px);
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, -50%, 0) scaleX(1);
      transform-origin: 0 50%;
      transition:
        opacity 360ms ease 120ms,
        transform 760ms cubic-bezier(.16, .76, .22, 1),
        visibility 0ms linear 0ms;
      will-change: opacity, transform;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed {
      bottom: 22px;
      width: 94px;
      height: 158px;
      min-height: 158px;
      padding-left: 0;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed .lore-medallion {
      transform: translate3d(0, -50%, 0) scale(1);
    }

    .archive-viewport .spatial-lore-guide.is-collapsed .lore-parchment {
      opacity: 0;
      visibility: hidden;
      transform: translate3d(-48px, -50%, 0) scaleX(.04);
      pointer-events: none;
      transition:
        opacity 180ms ease,
        transform 620ms cubic-bezier(.32, 0, .2, 1),
        visibility 0ms linear 620ms;
    }
  }

  @media (min-width: 761px) and (max-width: 1050px) {
    .archive-viewport .spatial-lore-guide {
      --lore-open-width: min(468px, calc(100vw - 390px));
      left: 16px;
    }

    .archive-viewport .spatial-lore-guide.is-collapsed {
      left: 16px;
    }
  }

  @media (min-width: 761px) and (max-height: 820px) {
    .archive-viewport .spatial-lore-guide,
    .archive-viewport .spatial-lore-guide.is-collapsed {
      bottom: 8px;
    }
  }

  .archive-viewport :is(.timeline-waypoints button, .contact-grid a) {
    border: 0;
    border-radius: 0;
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    box-shadow: none;
    clip-path: none;
    filter: drop-shadow(0 17px 15px rgba(0, 0, 0, .46));
    text-shadow: var(--surface-text-shadow);
  }

  .archive-viewport :is(.timeline-waypoints button, .contact-grid a):hover {
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.08) drop-shadow(0 21px 18px rgba(0, 0, 0, .54));
  }

  .archive-viewport .timeline-waypoints button.active {
    background: var(--wayfinder-slab-image) center / 100% 100% no-repeat;
    color: var(--panel-ink);
    filter: brightness(1.16) saturate(1.06) drop-shadow(0 23px 19px rgba(0, 0, 0, .58));
  }

  .archive-viewport.theme-winter :is(.timeline-waypoints button, .contact-grid a),
  .archive-viewport.theme-winter .timeline-waypoints button.active {
    color: #050505;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .94), 0 0 4px rgba(255, 255, 255, .72);
  }

  /* Fine material erosion on display lettering; body copy stays fully solid. */
  .archive-viewport :is(
    .intro-name-word > span,
    .intro-role,
    .chapter-heading h2,
    .project-identity-copy h3,
    .timeline-focus-card h3,
    .personal-collection-copy h3,
    .field-note-placeholder strong,
    .architecture-dialog header h2
  ) {
    -webkit-mask-image: var(--text-distress-mask);
    mask-image: var(--text-distress-mask);
    -webkit-mask-position: 47% 51%;
    mask-position: 47% 51%;
    -webkit-mask-repeat: repeat;
    mask-repeat: repeat;
    -webkit-mask-size: 560px 112px;
    mask-size: 560px 112px;
  }

  .archive-viewport .intro-name-word > span {
    -webkit-mask-position: 43% 49%;
    mask-position: 43% 49%;
    -webkit-mask-size: 760px 152px;
    mask-size: 760px 152px;
  }

  .archive-viewport :is(.intro-role, .field-note-placeholder strong) {
    -webkit-mask-position: 67% 56%;
    mask-position: 67% 56%;
    -webkit-mask-size: 470px 94px;
    mask-size: 470px 94px;
  }

  @media (max-width: 760px) {
    .chapter-rail-list {
      gap: 6px;
      overflow-x: auto;
      overflow-y: hidden;
    }

    .chapter-rail-list button {
      padding-inline: 10px;
    }

    .spatial-hud-content {
      padding: 31px 32px 33px;
    }

    .archive-viewport .lore-parchment {
      min-height: 128px;
      padding: 20px 44px 20px 30px;
    }

    .archive-viewport .spatial-lore-guide {
      transition:
        bottom 620ms cubic-bezier(.16, .76, .22, 1),
        width 620ms cubic-bezier(.16, .76, .22, 1),
        padding-left 620ms cubic-bezier(.16, .76, .22, 1);
    }

    .archive-viewport .timeline-waypoints button {
      padding: 12px 10px;
    }

    .archive-viewport :is(
      .intro-role,
      .chapter-heading h2,
      .project-identity-copy h3,
      .timeline-focus-card h3,
      .personal-collection-copy h3,
      .field-note-placeholder strong,
      .architecture-dialog header h2
    ) {
      -webkit-mask-size: 420px 84px;
      mask-size: 420px 84px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;function dh(e,t){return new Promise(r=>{const n=new Image;n.decoding=t?"sync":"async";const o=async i=>{if(i&&t)try{await n.decode()}catch{}r({image:n,loaded:i})};n.onload=()=>o(!0),n.onerror=()=>o(!1),n.src=e})}async function fh(e,t,r,n=6){const o=new Array(e.length);let i=0,a=0;const l=async()=>{for(;i<e.length;){const s=i;i+=1;const p=e[s],h=await dh(t(p.filename),p.decode);o[s]=p.decode?h.image:null,a+=1,r==null||r(a/e.length,p.filename)}};return await Promise.all(Array.from({length:Math.min(n,e.length)},()=>l())),o}const mh=new Set(Kr.map(e=>e.id)),_s=400;function hh(e,t,r){try{const n=window.localStorage.getItem(e);return t.has(n)?n:r}catch{return r}}function gh(e,t){try{window.localStorage.setItem(e,t)}catch{}}function vh(){const{activeIndex:e,goToChapter:t}=ph(se.length),[r,n]=k.useState(()=>hh("aegis-theme",mh,"default")),[o,i]=k.useState(1),[a,l]=k.useState(!1),[s,p]=k.useState(!1),[h,g]=k.useState(!1),[m,x]=k.useState(!1),[v,w]=k.useState(!1),E=k.useRef(0),d=k.useRef(0),u=k.useRef(0),f=k.useRef([]),y=k.useRef(r);k.useEffect(()=>{gh("aegis-theme",r)},[r]),k.useEffect(()=>{let z=!1;const M=vm(y.current),_=window.setTimeout(()=>x(!0),1500),I=document.getElementById("boot-progress");return u.current=window.setInterval(()=>{const L=Math.min(97,d.current);E.current<L&&(E.current=Math.min(L,E.current+Math.max(1,Math.ceil((L-E.current)*.16)))),I&&(I.textContent=String(E.current).padStart(3,"0"))},80),fh(M,L=>we("/prerak-portfolio/",L),L=>{d.current=Math.max(d.current,Math.round(L*92))}).then(L=>{z||(f.current=L,d.current=94,p(!0))}),()=>{z=!0,window.clearTimeout(_),window.clearInterval(u.current)}},[]),k.useEffect(()=>{if(!a||!s||!h||!m)return;window.clearInterval(u.current);const z=document.getElementById("boot-loader"),M=document.getElementById("boot-progress");d.current=100,E.current=100,M&&(M.textContent="100"),z==null||z.classList.add("is-complete");const _=window.setTimeout(()=>w(!0),760),I=window.setTimeout(()=>z==null?void 0:z.remove(),980);return()=>{window.clearTimeout(_),window.clearTimeout(I)}},[h,s,m,a]);const S=k.useCallback(()=>{d.current=Math.max(d.current,97),l(!0)},[]),b=k.useCallback(()=>{d.current=Math.max(d.current,96),g(!0)},[]),C=100+(se.length-1)*_s;return c.jsxs("div",{className:`archive-app theme-${r}`,children:[c.jsx("style",{children:uh}),c.jsx(ih,{profile:mn,activeIndex:e,goToChapter:t,theme:r,setTheme:n,atmospherePower:o,setAtmospherePower:i,experienceVisible:v,onEnvironmentReady:b,onWorldReady:S}),c.jsx("div",{className:"archive-scroll-track",style:{height:`${C}vh`},"aria-hidden":"true",children:se.map((z,M)=>c.jsx("span",{id:`chapter-${z.id}`,className:"archive-scroll-marker",style:{top:`${M*_s}vh`}},z.id))})]})}Yp(document.getElementById("root")).render(c.jsx(Wu.StrictMode,{children:c.jsx(vh,{})}));
