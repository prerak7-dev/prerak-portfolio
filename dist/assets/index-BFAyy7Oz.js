(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function id(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var _s={exports:{}},Ni={},Ls={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var br=Symbol.for("react.element"),od=Symbol.for("react.portal"),ad=Symbol.for("react.fragment"),ld=Symbol.for("react.strict_mode"),sd=Symbol.for("react.profiler"),cd=Symbol.for("react.provider"),ud=Symbol.for("react.context"),dd=Symbol.for("react.forward_ref"),pd=Symbol.for("react.suspense"),fd=Symbol.for("react.memo"),md=Symbol.for("react.lazy"),fl=Symbol.iterator;function gd(e){return e===null||typeof e!="object"?null:(e=fl&&e[fl]||e["@@iterator"],typeof e=="function"?e:null)}var Ms={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Rs=Object.assign,Ds={};function Tn(e,t,n){this.props=e,this.context=t,this.refs=Ds,this.updater=n||Ms}Tn.prototype.isReactComponent={};Tn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Tn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function As(){}As.prototype=Tn.prototype;function ga(e,t,n){this.props=e,this.context=t,this.refs=Ds,this.updater=n||Ms}var ha=ga.prototype=new As;ha.constructor=ga;Rs(ha,Tn.prototype);ha.isPureReactComponent=!0;var ml=Array.isArray,$s=Object.prototype.hasOwnProperty,va={current:null},Os={key:!0,ref:!0,__self:!0,__source:!0};function Is(e,t,n){var r,i={},o=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(o=""+t.key),t)$s.call(t,r)&&!Os.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var s=Array(l),f=0;f<l;f++)s[f]=arguments[f+2];i.children=s}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:br,type:e,key:o,ref:a,props:i,_owner:va.current}}function hd(e,t){return{$$typeof:br,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function xa(e){return typeof e=="object"&&e!==null&&e.$$typeof===br}function vd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var gl=/\/+/g;function Ki(e,t){return typeof e=="object"&&e!==null&&e.key!=null?vd(""+e.key):t.toString(36)}function Wr(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case br:case od:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Ki(a,0):r,ml(i)?(n="",e!=null&&(n=e.replace(gl,"$&/")+"/"),Wr(i,t,n,"",function(f){return f})):i!=null&&(xa(i)&&(i=hd(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(gl,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",ml(e))for(var l=0;l<e.length;l++){o=e[l];var s=r+Ki(o,l);a+=Wr(o,t,n,s,i)}else if(s=gd(e),typeof s=="function")for(e=s.call(e),l=0;!(o=e.next()).done;)o=o.value,s=r+Ki(o,l++),a+=Wr(o,t,n,s,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function Pr(e,t,n){if(e==null)return e;var r=[],i=0;return Wr(e,r,"","",function(o){return t.call(n,o,i++)}),r}function xd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var je={current:null},Qr={transition:null},yd={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:Qr,ReactCurrentOwner:va};function Fs(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:Pr,forEach:function(e,t,n){Pr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Pr(e,function(){t++}),t},toArray:function(e){return Pr(e,function(t){return t})||[]},only:function(e){if(!xa(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Tn;U.Fragment=ad;U.Profiler=sd;U.PureComponent=ga;U.StrictMode=ld;U.Suspense=pd;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yd;U.act=Fs;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Rs({},e.props),i=e.key,o=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,a=va.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(s in t)$s.call(t,s)&&!Os.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&l!==void 0?l[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){l=Array(s);for(var f=0;f<s;f++)l[f]=arguments[f+2];r.children=l}return{$$typeof:br,type:e.type,key:i,ref:o,props:r,_owner:a}};U.createContext=function(e){return e={$$typeof:ud,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:cd,_context:e},e.Consumer=e};U.createElement=Is;U.createFactory=function(e){var t=Is.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:dd,render:e}};U.isValidElement=xa;U.lazy=function(e){return{$$typeof:md,_payload:{_status:-1,_result:e},_init:xd}};U.memo=function(e,t){return{$$typeof:fd,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=Qr.transition;Qr.transition={};try{e()}finally{Qr.transition=t}};U.unstable_act=Fs;U.useCallback=function(e,t){return je.current.useCallback(e,t)};U.useContext=function(e){return je.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return je.current.useDeferredValue(e)};U.useEffect=function(e,t){return je.current.useEffect(e,t)};U.useId=function(){return je.current.useId()};U.useImperativeHandle=function(e,t,n){return je.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return je.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return je.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return je.current.useMemo(e,t)};U.useReducer=function(e,t,n){return je.current.useReducer(e,t,n)};U.useRef=function(e){return je.current.useRef(e)};U.useState=function(e){return je.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return je.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return je.current.useTransition()};U.version="18.3.1";Ls.exports=U;var T=Ls.exports;const wd=id(T);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bd=T,kd=Symbol.for("react.element"),Sd=Symbol.for("react.fragment"),jd=Object.prototype.hasOwnProperty,Ed=bd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Cd={key:!0,ref:!0,__self:!0,__source:!0};function Us(e,t,n){var r,i={},o=null,a=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)jd.call(t,r)&&!Cd.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:kd,type:e,key:o,ref:a,props:i,_owner:Ed.current}}Ni.Fragment=Sd;Ni.jsx=Us;Ni.jsxs=Us;_s.exports=Ni;var c=_s.exports,Bs={exports:{}},$e={},Vs={exports:{}},Hs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(E,_){var M=E.length;E.push(_);e:for(;0<M;){var B=M-1>>>1,Z=E[B];if(0<i(Z,_))E[B]=_,E[M]=Z,M=B;else break e}}function n(E){return E.length===0?null:E[0]}function r(E){if(E.length===0)return null;var _=E[0],M=E.pop();if(M!==_){E[0]=M;e:for(var B=0,Z=E.length,N=Z>>>1;B<N;){var L=2*(B+1)-1,F=E[L],D=L+1,$=E[D];if(0>i(F,M))D<Z&&0>i($,F)?(E[B]=$,E[D]=M,B=D):(E[B]=F,E[L]=M,B=L);else if(D<Z&&0>i($,M))E[B]=$,E[D]=M,B=D;else break e}}return _}function i(E,_){var M=E.sortIndex-_.sortIndex;return M!==0?M:E.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var s=[],f=[],h=1,v=null,m=3,y=!1,p=!1,k=!1,A=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,u=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(E){for(var _=n(f);_!==null;){if(_.callback===null)r(f);else if(_.startTime<=E)r(f),_.sortIndex=_.expirationTime,t(s,_);else break;_=n(f)}}function x(E){if(k=!1,g(E),!p)if(n(s)!==null)p=!0,be(b);else{var _=n(f);_!==null&&Qe(x,_.startTime-E)}}function b(E,_){p=!1,k&&(k=!1,d(j),j=-1),y=!0;var M=m;try{for(g(_),v=n(s);v!==null&&(!(v.expirationTime>_)||E&&!pe());){var B=v.callback;if(typeof B=="function"){v.callback=null,m=v.priorityLevel;var Z=B(v.expirationTime<=_);_=e.unstable_now(),typeof Z=="function"?v.callback=Z:v===n(s)&&r(s),g(_)}else r(s);v=n(s)}if(v!==null)var N=!0;else{var L=n(f);L!==null&&Qe(x,L.startTime-_),N=!1}return N}finally{v=null,m=M,y=!1}}var S=!1,P=null,j=-1,Q=5,O=-1;function pe(){return!(e.unstable_now()-O<Q)}function tt(){if(P!==null){var E=e.unstable_now();O=E;var _=!0;try{_=P(!0,E)}finally{_?Ie():(S=!1,P=null)}}else S=!1}var Ie;if(typeof u=="function")Ie=function(){u(tt)};else if(typeof MessageChannel<"u"){var tn=new MessageChannel,nt=tn.port2;tn.port1.onmessage=tt,Ie=function(){nt.postMessage(null)}}else Ie=function(){A(tt,0)};function be(E){P=E,S||(S=!0,Ie())}function Qe(E,_){j=A(function(){E(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(E){E.callback=null},e.unstable_continueExecution=function(){p||y||(p=!0,be(b))},e.unstable_forceFrameRate=function(E){0>E||125<E?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<E?Math.floor(1e3/E):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(s)},e.unstable_next=function(E){switch(m){case 1:case 2:case 3:var _=3;break;default:_=m}var M=m;m=_;try{return E()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(E,_){switch(E){case 1:case 2:case 3:case 4:case 5:break;default:E=3}var M=m;m=E;try{return _()}finally{m=M}},e.unstable_scheduleCallback=function(E,_,M){var B=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?B+M:B):M=B,E){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=M+Z,E={id:h++,callback:_,priorityLevel:E,startTime:M,expirationTime:Z,sortIndex:-1},M>B?(E.sortIndex=M,t(f,E),n(s)===null&&E===n(f)&&(k?(d(j),j=-1):k=!0,Qe(x,M-B))):(E.sortIndex=Z,t(s,E),p||y||(p=!0,be(b))),E},e.unstable_shouldYield=pe,e.unstable_wrapCallback=function(E){var _=m;return function(){var M=m;m=_;try{return E.apply(this,arguments)}finally{m=M}}}})(Hs);Vs.exports=Hs;var zd=Vs.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pd=T,Ae=zd;function w(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ws=new Set,rr={};function qt(e,t){Sn(e,t),Sn(e+"Capture",t)}function Sn(e,t){for(rr[e]=t,e=0;e<t.length;e++)Ws.add(t[e])}var mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wo=Object.prototype.hasOwnProperty,Nd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,hl={},vl={};function Td(e){return wo.call(vl,e)?!0:wo.call(hl,e)?!1:Nd.test(e)?vl[e]=!0:(hl[e]=!0,!1)}function _d(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ld(e,t,n,r){if(t===null||typeof t>"u"||_d(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ee(e,t,n,r,i,o,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=a}var ge={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ge[e]=new Ee(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ge[t]=new Ee(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ge[e]=new Ee(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ge[e]=new Ee(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ge[e]=new Ee(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ge[e]=new Ee(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ge[e]=new Ee(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ge[e]=new Ee(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ge[e]=new Ee(e,5,!1,e.toLowerCase(),null,!1,!1)});var ya=/[\-:]([a-z])/g;function wa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ya,wa);ge[t]=new Ee(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ya,wa);ge[t]=new Ee(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ya,wa);ge[t]=new Ee(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ge[e]=new Ee(e,1,!1,e.toLowerCase(),null,!1,!1)});ge.xlinkHref=new Ee("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ge[e]=new Ee(e,1,!1,e.toLowerCase(),null,!0,!0)});function ba(e,t,n,r){var i=ge.hasOwnProperty(t)?ge[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ld(t,n,i,r)&&(n=null),r||i===null?Td(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var xt=Pd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Nr=Symbol.for("react.element"),on=Symbol.for("react.portal"),an=Symbol.for("react.fragment"),ka=Symbol.for("react.strict_mode"),bo=Symbol.for("react.profiler"),Qs=Symbol.for("react.provider"),Ks=Symbol.for("react.context"),Sa=Symbol.for("react.forward_ref"),ko=Symbol.for("react.suspense"),So=Symbol.for("react.suspense_list"),ja=Symbol.for("react.memo"),bt=Symbol.for("react.lazy"),Ys=Symbol.for("react.offscreen"),xl=Symbol.iterator;function Mn(e){return e===null||typeof e!="object"?null:(e=xl&&e[xl]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Object.assign,Yi;function Un(e){if(Yi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Yi=t&&t[1]||""}return`
`+Yi+e}var Xi=!1;function Gi(e,t){if(!e||Xi)return"";Xi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(f){var r=f}Reflect.construct(e,[],t)}else{try{t.call()}catch(f){r=f}e.call(t.prototype)}else{try{throw Error()}catch(f){r=f}e()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var i=f.stack.split(`
`),o=r.stack.split(`
`),a=i.length-1,l=o.length-1;1<=a&&0<=l&&i[a]!==o[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==o[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==o[l]){var s=`
`+i[a].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=a&&0<=l);break}}}finally{Xi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Un(e):""}function Md(e){switch(e.tag){case 5:return Un(e.type);case 16:return Un("Lazy");case 13:return Un("Suspense");case 19:return Un("SuspenseList");case 0:case 2:case 15:return e=Gi(e.type,!1),e;case 11:return e=Gi(e.type.render,!1),e;case 1:return e=Gi(e.type,!0),e;default:return""}}function jo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case an:return"Fragment";case on:return"Portal";case bo:return"Profiler";case ka:return"StrictMode";case ko:return"Suspense";case So:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ks:return(e.displayName||"Context")+".Consumer";case Qs:return(e._context.displayName||"Context")+".Provider";case Sa:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ja:return t=e.displayName||null,t!==null?t:jo(e.type)||"Memo";case bt:t=e._payload,e=e._init;try{return jo(e(t))}catch{}}return null}function Rd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jo(t);case 8:return t===ka?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function At(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xs(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Dd(e){var t=Xs(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,o.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Tr(e){e._valueTracker||(e._valueTracker=Dd(e))}function Gs(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Xs(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function oi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Eo(e,t){var n=t.checked;return ee({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function yl(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=At(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Zs(e,t){t=t.checked,t!=null&&ba(e,"checked",t,!1)}function Co(e,t){Zs(e,t);var n=At(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?zo(e,t.type,n):t.hasOwnProperty("defaultValue")&&zo(e,t.type,At(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function wl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function zo(e,t,n){(t!=="number"||oi(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Bn=Array.isArray;function vn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+At(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Po(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(w(91));return ee({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function bl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(w(92));if(Bn(n)){if(1<n.length)throw Error(w(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:At(n)}}function Js(e,t){var n=At(t.value),r=At(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function kl(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function qs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function No(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?qs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _r,ec=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_r=_r||document.createElement("div"),_r.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_r.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function ir(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Qn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ad=["Webkit","ms","Moz","O"];Object.keys(Qn).forEach(function(e){Ad.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Qn[t]=Qn[e]})});function tc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Qn.hasOwnProperty(e)&&Qn[e]?(""+t).trim():t+"px"}function nc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=tc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var $d=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function To(e,t){if(t){if($d[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(w(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(w(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(w(61))}if(t.style!=null&&typeof t.style!="object")throw Error(w(62))}}function _o(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lo=null;function Ea(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Mo=null,xn=null,yn=null;function Sl(e){if(e=jr(e)){if(typeof Mo!="function")throw Error(w(280));var t=e.stateNode;t&&(t=Ri(t),Mo(e.stateNode,e.type,t))}}function rc(e){xn?yn?yn.push(e):yn=[e]:xn=e}function ic(){if(xn){var e=xn,t=yn;if(yn=xn=null,Sl(e),t)for(e=0;e<t.length;e++)Sl(t[e])}}function oc(e,t){return e(t)}function ac(){}var Zi=!1;function lc(e,t,n){if(Zi)return e(t,n);Zi=!0;try{return oc(e,t,n)}finally{Zi=!1,(xn!==null||yn!==null)&&(ac(),ic())}}function or(e,t){var n=e.stateNode;if(n===null)return null;var r=Ri(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(w(231,t,typeof n));return n}var Ro=!1;if(mt)try{var Rn={};Object.defineProperty(Rn,"passive",{get:function(){Ro=!0}}),window.addEventListener("test",Rn,Rn),window.removeEventListener("test",Rn,Rn)}catch{Ro=!1}function Od(e,t,n,r,i,o,a,l,s){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(h){this.onError(h)}}var Kn=!1,ai=null,li=!1,Do=null,Id={onError:function(e){Kn=!0,ai=e}};function Fd(e,t,n,r,i,o,a,l,s){Kn=!1,ai=null,Od.apply(Id,arguments)}function Ud(e,t,n,r,i,o,a,l,s){if(Fd.apply(this,arguments),Kn){if(Kn){var f=ai;Kn=!1,ai=null}else throw Error(w(198));li||(li=!0,Do=f)}}function en(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function sc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function jl(e){if(en(e)!==e)throw Error(w(188))}function Bd(e){var t=e.alternate;if(!t){if(t=en(e),t===null)throw Error(w(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return jl(i),e;if(o===r)return jl(i),t;o=o.sibling}throw Error(w(188))}if(n.return!==r.return)n=i,r=o;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=o;break}if(l===r){a=!0,r=i,n=o;break}l=l.sibling}if(!a){for(l=o.child;l;){if(l===n){a=!0,n=o,r=i;break}if(l===r){a=!0,r=o,n=i;break}l=l.sibling}if(!a)throw Error(w(189))}}if(n.alternate!==r)throw Error(w(190))}if(n.tag!==3)throw Error(w(188));return n.stateNode.current===n?e:t}function cc(e){return e=Bd(e),e!==null?uc(e):null}function uc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=uc(e);if(t!==null)return t;e=e.sibling}return null}var dc=Ae.unstable_scheduleCallback,El=Ae.unstable_cancelCallback,Vd=Ae.unstable_shouldYield,Hd=Ae.unstable_requestPaint,ie=Ae.unstable_now,Wd=Ae.unstable_getCurrentPriorityLevel,Ca=Ae.unstable_ImmediatePriority,pc=Ae.unstable_UserBlockingPriority,si=Ae.unstable_NormalPriority,Qd=Ae.unstable_LowPriority,fc=Ae.unstable_IdlePriority,Ti=null,at=null;function Kd(e){if(at&&typeof at.onCommitFiberRoot=="function")try{at.onCommitFiberRoot(Ti,e,void 0,(e.current.flags&128)===128)}catch{}}var Ze=Math.clz32?Math.clz32:Gd,Yd=Math.log,Xd=Math.LN2;function Gd(e){return e>>>=0,e===0?32:31-(Yd(e)/Xd|0)|0}var Lr=64,Mr=4194304;function Vn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ci(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=Vn(l):(o&=a,o!==0&&(r=Vn(o)))}else a=n&~i,a!==0?r=Vn(a):o!==0&&(r=Vn(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ze(t),i=1<<n,r|=e[n],t&=~i;return r}function Zd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var a=31-Ze(o),l=1<<a,s=i[a];s===-1?(!(l&n)||l&r)&&(i[a]=Zd(l,t)):s<=t&&(e.expiredLanes|=l),o&=~l}}function Ao(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function mc(){var e=Lr;return Lr<<=1,!(Lr&4194240)&&(Lr=64),e}function Ji(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function kr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ze(t),e[t]=n}function qd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Ze(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function za(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ze(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var W=0;function gc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var hc,Pa,vc,xc,yc,$o=!1,Rr=[],zt=null,Pt=null,Nt=null,ar=new Map,lr=new Map,St=[],ep="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cl(e,t){switch(e){case"focusin":case"focusout":zt=null;break;case"dragenter":case"dragleave":Pt=null;break;case"mouseover":case"mouseout":Nt=null;break;case"pointerover":case"pointerout":ar.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":lr.delete(t.pointerId)}}function Dn(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=jr(t),t!==null&&Pa(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function tp(e,t,n,r,i){switch(t){case"focusin":return zt=Dn(zt,e,t,n,r,i),!0;case"dragenter":return Pt=Dn(Pt,e,t,n,r,i),!0;case"mouseover":return Nt=Dn(Nt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return ar.set(o,Dn(ar.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,lr.set(o,Dn(lr.get(o)||null,e,t,n,r,i)),!0}return!1}function wc(e){var t=Vt(e.target);if(t!==null){var n=en(t);if(n!==null){if(t=n.tag,t===13){if(t=sc(n),t!==null){e.blockedOn=t,yc(e.priority,function(){vc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Kr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Oo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Lo=r,n.target.dispatchEvent(r),Lo=null}else return t=jr(n),t!==null&&Pa(t),e.blockedOn=n,!1;t.shift()}return!0}function zl(e,t,n){Kr(e)&&n.delete(t)}function np(){$o=!1,zt!==null&&Kr(zt)&&(zt=null),Pt!==null&&Kr(Pt)&&(Pt=null),Nt!==null&&Kr(Nt)&&(Nt=null),ar.forEach(zl),lr.forEach(zl)}function An(e,t){e.blockedOn===t&&(e.blockedOn=null,$o||($o=!0,Ae.unstable_scheduleCallback(Ae.unstable_NormalPriority,np)))}function sr(e){function t(i){return An(i,e)}if(0<Rr.length){An(Rr[0],e);for(var n=1;n<Rr.length;n++){var r=Rr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(zt!==null&&An(zt,e),Pt!==null&&An(Pt,e),Nt!==null&&An(Nt,e),ar.forEach(t),lr.forEach(t),n=0;n<St.length;n++)r=St[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<St.length&&(n=St[0],n.blockedOn===null);)wc(n),n.blockedOn===null&&St.shift()}var wn=xt.ReactCurrentBatchConfig,ui=!0;function rp(e,t,n,r){var i=W,o=wn.transition;wn.transition=null;try{W=1,Na(e,t,n,r)}finally{W=i,wn.transition=o}}function ip(e,t,n,r){var i=W,o=wn.transition;wn.transition=null;try{W=4,Na(e,t,n,r)}finally{W=i,wn.transition=o}}function Na(e,t,n,r){if(ui){var i=Oo(e,t,n,r);if(i===null)so(e,t,r,di,n),Cl(e,r);else if(tp(i,e,t,n,r))r.stopPropagation();else if(Cl(e,r),t&4&&-1<ep.indexOf(e)){for(;i!==null;){var o=jr(i);if(o!==null&&hc(o),o=Oo(e,t,n,r),o===null&&so(e,t,r,di,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else so(e,t,r,null,n)}}var di=null;function Oo(e,t,n,r){if(di=null,e=Ea(r),e=Vt(e),e!==null)if(t=en(e),t===null)e=null;else if(n=t.tag,n===13){if(e=sc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return di=e,null}function bc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Wd()){case Ca:return 1;case pc:return 4;case si:case Qd:return 16;case fc:return 536870912;default:return 16}default:return 16}}var Et=null,Ta=null,Yr=null;function kc(){if(Yr)return Yr;var e,t=Ta,n=t.length,r,i="value"in Et?Et.value:Et.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[o-r];r++);return Yr=i.slice(e,1<r?1-r:void 0)}function Xr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Dr(){return!0}function Pl(){return!1}function Oe(e){function t(n,r,i,o,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Dr:Pl,this.isPropagationStopped=Pl,this}return ee(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Dr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Dr)},persist:function(){},isPersistent:Dr}),t}var _n={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},_a=Oe(_n),Sr=ee({},_n,{view:0,detail:0}),op=Oe(Sr),qi,eo,$n,_i=ee({},Sr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:La,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==$n&&($n&&e.type==="mousemove"?(qi=e.screenX-$n.screenX,eo=e.screenY-$n.screenY):eo=qi=0,$n=e),qi)},movementY:function(e){return"movementY"in e?e.movementY:eo}}),Nl=Oe(_i),ap=ee({},_i,{dataTransfer:0}),lp=Oe(ap),sp=ee({},Sr,{relatedTarget:0}),to=Oe(sp),cp=ee({},_n,{animationName:0,elapsedTime:0,pseudoElement:0}),up=Oe(cp),dp=ee({},_n,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),pp=Oe(dp),fp=ee({},_n,{data:0}),Tl=Oe(fp),mp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},hp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=hp[e])?!!t[e]:!1}function La(){return vp}var xp=ee({},Sr,{key:function(e){if(e.key){var t=mp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Xr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:La,charCode:function(e){return e.type==="keypress"?Xr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Xr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),yp=Oe(xp),wp=ee({},_i,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_l=Oe(wp),bp=ee({},Sr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:La}),kp=Oe(bp),Sp=ee({},_n,{propertyName:0,elapsedTime:0,pseudoElement:0}),jp=Oe(Sp),Ep=ee({},_i,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Cp=Oe(Ep),zp=[9,13,27,32],Ma=mt&&"CompositionEvent"in window,Yn=null;mt&&"documentMode"in document&&(Yn=document.documentMode);var Pp=mt&&"TextEvent"in window&&!Yn,Sc=mt&&(!Ma||Yn&&8<Yn&&11>=Yn),Ll=" ",Ml=!1;function jc(e,t){switch(e){case"keyup":return zp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ec(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ln=!1;function Np(e,t){switch(e){case"compositionend":return Ec(t);case"keypress":return t.which!==32?null:(Ml=!0,Ll);case"textInput":return e=t.data,e===Ll&&Ml?null:e;default:return null}}function Tp(e,t){if(ln)return e==="compositionend"||!Ma&&jc(e,t)?(e=kc(),Yr=Ta=Et=null,ln=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Sc&&t.locale!=="ko"?null:t.data;default:return null}}var _p={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!_p[e.type]:t==="textarea"}function Cc(e,t,n,r){rc(r),t=pi(t,"onChange"),0<t.length&&(n=new _a("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Xn=null,cr=null;function Lp(e){$c(e,0)}function Li(e){var t=un(e);if(Gs(t))return e}function Mp(e,t){if(e==="change")return t}var zc=!1;if(mt){var no;if(mt){var ro="oninput"in document;if(!ro){var Dl=document.createElement("div");Dl.setAttribute("oninput","return;"),ro=typeof Dl.oninput=="function"}no=ro}else no=!1;zc=no&&(!document.documentMode||9<document.documentMode)}function Al(){Xn&&(Xn.detachEvent("onpropertychange",Pc),cr=Xn=null)}function Pc(e){if(e.propertyName==="value"&&Li(cr)){var t=[];Cc(t,cr,e,Ea(e)),lc(Lp,t)}}function Rp(e,t,n){e==="focusin"?(Al(),Xn=t,cr=n,Xn.attachEvent("onpropertychange",Pc)):e==="focusout"&&Al()}function Dp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Li(cr)}function Ap(e,t){if(e==="click")return Li(t)}function $p(e,t){if(e==="input"||e==="change")return Li(t)}function Op(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var et=typeof Object.is=="function"?Object.is:Op;function ur(e,t){if(et(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!wo.call(t,i)||!et(e[i],t[i]))return!1}return!0}function $l(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ol(e,t){var n=$l(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$l(n)}}function Nc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Tc(){for(var e=window,t=oi();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=oi(e.document)}return t}function Ra(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ip(e){var t=Tc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Nc(n.ownerDocument.documentElement,n)){if(r!==null&&Ra(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Ol(n,o);var a=Ol(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Fp=mt&&"documentMode"in document&&11>=document.documentMode,sn=null,Io=null,Gn=null,Fo=!1;function Il(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fo||sn==null||sn!==oi(r)||(r=sn,"selectionStart"in r&&Ra(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Gn&&ur(Gn,r)||(Gn=r,r=pi(Io,"onSelect"),0<r.length&&(t=new _a("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=sn)))}function Ar(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var cn={animationend:Ar("Animation","AnimationEnd"),animationiteration:Ar("Animation","AnimationIteration"),animationstart:Ar("Animation","AnimationStart"),transitionend:Ar("Transition","TransitionEnd")},io={},_c={};mt&&(_c=document.createElement("div").style,"AnimationEvent"in window||(delete cn.animationend.animation,delete cn.animationiteration.animation,delete cn.animationstart.animation),"TransitionEvent"in window||delete cn.transitionend.transition);function Mi(e){if(io[e])return io[e];if(!cn[e])return e;var t=cn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in _c)return io[e]=t[n];return e}var Lc=Mi("animationend"),Mc=Mi("animationiteration"),Rc=Mi("animationstart"),Dc=Mi("transitionend"),Ac=new Map,Fl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ot(e,t){Ac.set(e,t),qt(t,[e])}for(var oo=0;oo<Fl.length;oo++){var ao=Fl[oo],Up=ao.toLowerCase(),Bp=ao[0].toUpperCase()+ao.slice(1);Ot(Up,"on"+Bp)}Ot(Lc,"onAnimationEnd");Ot(Mc,"onAnimationIteration");Ot(Rc,"onAnimationStart");Ot("dblclick","onDoubleClick");Ot("focusin","onFocus");Ot("focusout","onBlur");Ot(Dc,"onTransitionEnd");Sn("onMouseEnter",["mouseout","mouseover"]);Sn("onMouseLeave",["mouseout","mouseover"]);Sn("onPointerEnter",["pointerout","pointerover"]);Sn("onPointerLeave",["pointerout","pointerover"]);qt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qt("onBeforeInput",["compositionend","keypress","textInput","paste"]);qt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vp=new Set("cancel close invalid load scroll toggle".split(" ").concat(Hn));function Ul(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Ud(r,t,void 0,e),e.currentTarget=null}function $c(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],s=l.instance,f=l.currentTarget;if(l=l.listener,s!==o&&i.isPropagationStopped())break e;Ul(i,l,f),o=s}else for(a=0;a<r.length;a++){if(l=r[a],s=l.instance,f=l.currentTarget,l=l.listener,s!==o&&i.isPropagationStopped())break e;Ul(i,l,f),o=s}}}if(li)throw e=Do,li=!1,Do=null,e}function Y(e,t){var n=t[Wo];n===void 0&&(n=t[Wo]=new Set);var r=e+"__bubble";n.has(r)||(Oc(t,e,2,!1),n.add(r))}function lo(e,t,n){var r=0;t&&(r|=4),Oc(n,e,r,t)}var $r="_reactListening"+Math.random().toString(36).slice(2);function dr(e){if(!e[$r]){e[$r]=!0,Ws.forEach(function(n){n!=="selectionchange"&&(Vp.has(n)||lo(n,!1,e),lo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[$r]||(t[$r]=!0,lo("selectionchange",!1,t))}}function Oc(e,t,n,r){switch(bc(t)){case 1:var i=rp;break;case 4:i=ip;break;default:i=Na}n=i.bind(null,t,n,e),i=void 0,!Ro||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function so(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var s=a.tag;if((s===3||s===4)&&(s=a.stateNode.containerInfo,s===i||s.nodeType===8&&s.parentNode===i))return;a=a.return}for(;l!==null;){if(a=Vt(l),a===null)return;if(s=a.tag,s===5||s===6){r=o=a;continue e}l=l.parentNode}}r=r.return}lc(function(){var f=o,h=Ea(n),v=[];e:{var m=Ac.get(e);if(m!==void 0){var y=_a,p=e;switch(e){case"keypress":if(Xr(n)===0)break e;case"keydown":case"keyup":y=yp;break;case"focusin":p="focus",y=to;break;case"focusout":p="blur",y=to;break;case"beforeblur":case"afterblur":y=to;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Nl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=lp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=kp;break;case Lc:case Mc:case Rc:y=up;break;case Dc:y=jp;break;case"scroll":y=op;break;case"wheel":y=Cp;break;case"copy":case"cut":case"paste":y=pp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=_l}var k=(t&4)!==0,A=!k&&e==="scroll",d=k?m!==null?m+"Capture":null:m;k=[];for(var u=f,g;u!==null;){g=u;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,d!==null&&(x=or(u,d),x!=null&&k.push(pr(u,x,g)))),A)break;u=u.return}0<k.length&&(m=new y(m,p,null,n,h),v.push({event:m,listeners:k}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",m&&n!==Lo&&(p=n.relatedTarget||n.fromElement)&&(Vt(p)||p[gt]))break e;if((y||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,y?(p=n.relatedTarget||n.toElement,y=f,p=p?Vt(p):null,p!==null&&(A=en(p),p!==A||p.tag!==5&&p.tag!==6)&&(p=null)):(y=null,p=f),y!==p)){if(k=Nl,x="onMouseLeave",d="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(k=_l,x="onPointerLeave",d="onPointerEnter",u="pointer"),A=y==null?m:un(y),g=p==null?m:un(p),m=new k(x,u+"leave",y,n,h),m.target=A,m.relatedTarget=g,x=null,Vt(h)===f&&(k=new k(d,u+"enter",p,n,h),k.target=g,k.relatedTarget=A,x=k),A=x,y&&p)t:{for(k=y,d=p,u=0,g=k;g;g=rn(g))u++;for(g=0,x=d;x;x=rn(x))g++;for(;0<u-g;)k=rn(k),u--;for(;0<g-u;)d=rn(d),g--;for(;u--;){if(k===d||d!==null&&k===d.alternate)break t;k=rn(k),d=rn(d)}k=null}else k=null;y!==null&&Bl(v,m,y,k,!1),p!==null&&A!==null&&Bl(v,A,p,k,!0)}}e:{if(m=f?un(f):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var b=Mp;else if(Rl(m))if(zc)b=$p;else{b=Dp;var S=Rp}else(y=m.nodeName)&&y.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(b=Ap);if(b&&(b=b(e,f))){Cc(v,b,n,h);break e}S&&S(e,m,f),e==="focusout"&&(S=m._wrapperState)&&S.controlled&&m.type==="number"&&zo(m,"number",m.value)}switch(S=f?un(f):window,e){case"focusin":(Rl(S)||S.contentEditable==="true")&&(sn=S,Io=f,Gn=null);break;case"focusout":Gn=Io=sn=null;break;case"mousedown":Fo=!0;break;case"contextmenu":case"mouseup":case"dragend":Fo=!1,Il(v,n,h);break;case"selectionchange":if(Fp)break;case"keydown":case"keyup":Il(v,n,h)}var P;if(Ma)e:{switch(e){case"compositionstart":var j="onCompositionStart";break e;case"compositionend":j="onCompositionEnd";break e;case"compositionupdate":j="onCompositionUpdate";break e}j=void 0}else ln?jc(e,n)&&(j="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(j="onCompositionStart");j&&(Sc&&n.locale!=="ko"&&(ln||j!=="onCompositionStart"?j==="onCompositionEnd"&&ln&&(P=kc()):(Et=h,Ta="value"in Et?Et.value:Et.textContent,ln=!0)),S=pi(f,j),0<S.length&&(j=new Tl(j,e,null,n,h),v.push({event:j,listeners:S}),P?j.data=P:(P=Ec(n),P!==null&&(j.data=P)))),(P=Pp?Np(e,n):Tp(e,n))&&(f=pi(f,"onBeforeInput"),0<f.length&&(h=new Tl("onBeforeInput","beforeinput",null,n,h),v.push({event:h,listeners:f}),h.data=P))}$c(v,t)})}function pr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function pi(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=or(e,n),o!=null&&r.unshift(pr(e,o,i)),o=or(e,t),o!=null&&r.push(pr(e,o,i))),e=e.return}return r}function rn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Bl(e,t,n,r,i){for(var o=t._reactName,a=[];n!==null&&n!==r;){var l=n,s=l.alternate,f=l.stateNode;if(s!==null&&s===r)break;l.tag===5&&f!==null&&(l=f,i?(s=or(n,o),s!=null&&a.unshift(pr(n,s,l))):i||(s=or(n,o),s!=null&&a.push(pr(n,s,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Hp=/\r\n?/g,Wp=/\u0000|\uFFFD/g;function Vl(e){return(typeof e=="string"?e:""+e).replace(Hp,`
`).replace(Wp,"")}function Or(e,t,n){if(t=Vl(t),Vl(e)!==t&&n)throw Error(w(425))}function fi(){}var Uo=null,Bo=null;function Vo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ho=typeof setTimeout=="function"?setTimeout:void 0,Qp=typeof clearTimeout=="function"?clearTimeout:void 0,Hl=typeof Promise=="function"?Promise:void 0,Kp=typeof queueMicrotask=="function"?queueMicrotask:typeof Hl<"u"?function(e){return Hl.resolve(null).then(e).catch(Yp)}:Ho;function Yp(e){setTimeout(function(){throw e})}function co(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),sr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);sr(t)}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Wl(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ln=Math.random().toString(36).slice(2),ot="__reactFiber$"+Ln,fr="__reactProps$"+Ln,gt="__reactContainer$"+Ln,Wo="__reactEvents$"+Ln,Xp="__reactListeners$"+Ln,Gp="__reactHandles$"+Ln;function Vt(e){var t=e[ot];if(t)return t;for(var n=e.parentNode;n;){if(t=n[gt]||n[ot]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Wl(e);e!==null;){if(n=e[ot])return n;e=Wl(e)}return t}e=n,n=e.parentNode}return null}function jr(e){return e=e[ot]||e[gt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(w(33))}function Ri(e){return e[fr]||null}var Qo=[],dn=-1;function It(e){return{current:e}}function X(e){0>dn||(e.current=Qo[dn],Qo[dn]=null,dn--)}function K(e,t){dn++,Qo[dn]=e.current,e.current=t}var $t={},we=It($t),Ne=It(!1),Yt=$t;function jn(e,t){var n=e.type.contextTypes;if(!n)return $t;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Te(e){return e=e.childContextTypes,e!=null}function mi(){X(Ne),X(we)}function Ql(e,t,n){if(we.current!==$t)throw Error(w(168));K(we,t),K(Ne,n)}function Ic(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(w(108,Rd(e)||"Unknown",i));return ee({},n,r)}function gi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$t,Yt=we.current,K(we,e),K(Ne,Ne.current),!0}function Kl(e,t,n){var r=e.stateNode;if(!r)throw Error(w(169));n?(e=Ic(e,t,Yt),r.__reactInternalMemoizedMergedChildContext=e,X(Ne),X(we),K(we,e)):X(Ne),K(Ne,n)}var ut=null,Di=!1,uo=!1;function Fc(e){ut===null?ut=[e]:ut.push(e)}function Zp(e){Di=!0,Fc(e)}function Ft(){if(!uo&&ut!==null){uo=!0;var e=0,t=W;try{var n=ut;for(W=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ut=null,Di=!1}catch(i){throw ut!==null&&(ut=ut.slice(e+1)),dc(Ca,Ft),i}finally{W=t,uo=!1}}return null}var pn=[],fn=0,hi=null,vi=0,Fe=[],Ue=0,Xt=null,dt=1,pt="";function Ut(e,t){pn[fn++]=vi,pn[fn++]=hi,hi=e,vi=t}function Uc(e,t,n){Fe[Ue++]=dt,Fe[Ue++]=pt,Fe[Ue++]=Xt,Xt=e;var r=dt;e=pt;var i=32-Ze(r)-1;r&=~(1<<i),n+=1;var o=32-Ze(t)+i;if(30<o){var a=i-i%5;o=(r&(1<<a)-1).toString(32),r>>=a,i-=a,dt=1<<32-Ze(t)+i|n<<i|r,pt=o+e}else dt=1<<o|n<<i|r,pt=e}function Da(e){e.return!==null&&(Ut(e,1),Uc(e,1,0))}function Aa(e){for(;e===hi;)hi=pn[--fn],pn[fn]=null,vi=pn[--fn],pn[fn]=null;for(;e===Xt;)Xt=Fe[--Ue],Fe[Ue]=null,pt=Fe[--Ue],Fe[Ue]=null,dt=Fe[--Ue],Fe[Ue]=null}var De=null,Re=null,G=!1,Ge=null;function Bc(e,t){var n=Be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Yl(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,De=e,Re=Tt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,De=e,Re=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Xt!==null?{id:dt,overflow:pt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,De=e,Re=null,!0):!1;default:return!1}}function Ko(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Yo(e){if(G){var t=Re;if(t){var n=t;if(!Yl(e,t)){if(Ko(e))throw Error(w(418));t=Tt(n.nextSibling);var r=De;t&&Yl(e,t)?Bc(r,n):(e.flags=e.flags&-4097|2,G=!1,De=e)}}else{if(Ko(e))throw Error(w(418));e.flags=e.flags&-4097|2,G=!1,De=e}}}function Xl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Ir(e){if(e!==De)return!1;if(!G)return Xl(e),G=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Vo(e.type,e.memoizedProps)),t&&(t=Re)){if(Ko(e))throw Vc(),Error(w(418));for(;t;)Bc(e,t),t=Tt(t.nextSibling)}if(Xl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(w(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Re=Tt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Re=null}}else Re=De?Tt(e.stateNode.nextSibling):null;return!0}function Vc(){for(var e=Re;e;)e=Tt(e.nextSibling)}function En(){Re=De=null,G=!1}function $a(e){Ge===null?Ge=[e]:Ge.push(e)}var Jp=xt.ReactCurrentBatchConfig;function On(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(w(309));var r=n.stateNode}if(!r)throw Error(w(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(a){var l=i.refs;a===null?delete l[o]:l[o]=a},t._stringRef=o,t)}if(typeof e!="string")throw Error(w(284));if(!n._owner)throw Error(w(290,e))}return e}function Fr(e,t){throw e=Object.prototype.toString.call(t),Error(w(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Gl(e){var t=e._init;return t(e._payload)}function Hc(e){function t(d,u){if(e){var g=d.deletions;g===null?(d.deletions=[u],d.flags|=16):g.push(u)}}function n(d,u){if(!e)return null;for(;u!==null;)t(d,u),u=u.sibling;return null}function r(d,u){for(d=new Map;u!==null;)u.key!==null?d.set(u.key,u):d.set(u.index,u),u=u.sibling;return d}function i(d,u){return d=Rt(d,u),d.index=0,d.sibling=null,d}function o(d,u,g){return d.index=g,e?(g=d.alternate,g!==null?(g=g.index,g<u?(d.flags|=2,u):g):(d.flags|=2,u)):(d.flags|=1048576,u)}function a(d){return e&&d.alternate===null&&(d.flags|=2),d}function l(d,u,g,x){return u===null||u.tag!==6?(u=xo(g,d.mode,x),u.return=d,u):(u=i(u,g),u.return=d,u)}function s(d,u,g,x){var b=g.type;return b===an?h(d,u,g.props.children,x,g.key):u!==null&&(u.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===bt&&Gl(b)===u.type)?(x=i(u,g.props),x.ref=On(d,u,g),x.return=d,x):(x=ni(g.type,g.key,g.props,null,d.mode,x),x.ref=On(d,u,g),x.return=d,x)}function f(d,u,g,x){return u===null||u.tag!==4||u.stateNode.containerInfo!==g.containerInfo||u.stateNode.implementation!==g.implementation?(u=yo(g,d.mode,x),u.return=d,u):(u=i(u,g.children||[]),u.return=d,u)}function h(d,u,g,x,b){return u===null||u.tag!==7?(u=Kt(g,d.mode,x,b),u.return=d,u):(u=i(u,g),u.return=d,u)}function v(d,u,g){if(typeof u=="string"&&u!==""||typeof u=="number")return u=xo(""+u,d.mode,g),u.return=d,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Nr:return g=ni(u.type,u.key,u.props,null,d.mode,g),g.ref=On(d,null,u),g.return=d,g;case on:return u=yo(u,d.mode,g),u.return=d,u;case bt:var x=u._init;return v(d,x(u._payload),g)}if(Bn(u)||Mn(u))return u=Kt(u,d.mode,g,null),u.return=d,u;Fr(d,u)}return null}function m(d,u,g,x){var b=u!==null?u.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return b!==null?null:l(d,u,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Nr:return g.key===b?s(d,u,g,x):null;case on:return g.key===b?f(d,u,g,x):null;case bt:return b=g._init,m(d,u,b(g._payload),x)}if(Bn(g)||Mn(g))return b!==null?null:h(d,u,g,x,null);Fr(d,g)}return null}function y(d,u,g,x,b){if(typeof x=="string"&&x!==""||typeof x=="number")return d=d.get(g)||null,l(u,d,""+x,b);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Nr:return d=d.get(x.key===null?g:x.key)||null,s(u,d,x,b);case on:return d=d.get(x.key===null?g:x.key)||null,f(u,d,x,b);case bt:var S=x._init;return y(d,u,g,S(x._payload),b)}if(Bn(x)||Mn(x))return d=d.get(g)||null,h(u,d,x,b,null);Fr(u,x)}return null}function p(d,u,g,x){for(var b=null,S=null,P=u,j=u=0,Q=null;P!==null&&j<g.length;j++){P.index>j?(Q=P,P=null):Q=P.sibling;var O=m(d,P,g[j],x);if(O===null){P===null&&(P=Q);break}e&&P&&O.alternate===null&&t(d,P),u=o(O,u,j),S===null?b=O:S.sibling=O,S=O,P=Q}if(j===g.length)return n(d,P),G&&Ut(d,j),b;if(P===null){for(;j<g.length;j++)P=v(d,g[j],x),P!==null&&(u=o(P,u,j),S===null?b=P:S.sibling=P,S=P);return G&&Ut(d,j),b}for(P=r(d,P);j<g.length;j++)Q=y(P,d,j,g[j],x),Q!==null&&(e&&Q.alternate!==null&&P.delete(Q.key===null?j:Q.key),u=o(Q,u,j),S===null?b=Q:S.sibling=Q,S=Q);return e&&P.forEach(function(pe){return t(d,pe)}),G&&Ut(d,j),b}function k(d,u,g,x){var b=Mn(g);if(typeof b!="function")throw Error(w(150));if(g=b.call(g),g==null)throw Error(w(151));for(var S=b=null,P=u,j=u=0,Q=null,O=g.next();P!==null&&!O.done;j++,O=g.next()){P.index>j?(Q=P,P=null):Q=P.sibling;var pe=m(d,P,O.value,x);if(pe===null){P===null&&(P=Q);break}e&&P&&pe.alternate===null&&t(d,P),u=o(pe,u,j),S===null?b=pe:S.sibling=pe,S=pe,P=Q}if(O.done)return n(d,P),G&&Ut(d,j),b;if(P===null){for(;!O.done;j++,O=g.next())O=v(d,O.value,x),O!==null&&(u=o(O,u,j),S===null?b=O:S.sibling=O,S=O);return G&&Ut(d,j),b}for(P=r(d,P);!O.done;j++,O=g.next())O=y(P,d,j,O.value,x),O!==null&&(e&&O.alternate!==null&&P.delete(O.key===null?j:O.key),u=o(O,u,j),S===null?b=O:S.sibling=O,S=O);return e&&P.forEach(function(tt){return t(d,tt)}),G&&Ut(d,j),b}function A(d,u,g,x){if(typeof g=="object"&&g!==null&&g.type===an&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Nr:e:{for(var b=g.key,S=u;S!==null;){if(S.key===b){if(b=g.type,b===an){if(S.tag===7){n(d,S.sibling),u=i(S,g.props.children),u.return=d,d=u;break e}}else if(S.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===bt&&Gl(b)===S.type){n(d,S.sibling),u=i(S,g.props),u.ref=On(d,S,g),u.return=d,d=u;break e}n(d,S);break}else t(d,S);S=S.sibling}g.type===an?(u=Kt(g.props.children,d.mode,x,g.key),u.return=d,d=u):(x=ni(g.type,g.key,g.props,null,d.mode,x),x.ref=On(d,u,g),x.return=d,d=x)}return a(d);case on:e:{for(S=g.key;u!==null;){if(u.key===S)if(u.tag===4&&u.stateNode.containerInfo===g.containerInfo&&u.stateNode.implementation===g.implementation){n(d,u.sibling),u=i(u,g.children||[]),u.return=d,d=u;break e}else{n(d,u);break}else t(d,u);u=u.sibling}u=yo(g,d.mode,x),u.return=d,d=u}return a(d);case bt:return S=g._init,A(d,u,S(g._payload),x)}if(Bn(g))return p(d,u,g,x);if(Mn(g))return k(d,u,g,x);Fr(d,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,u!==null&&u.tag===6?(n(d,u.sibling),u=i(u,g),u.return=d,d=u):(n(d,u),u=xo(g,d.mode,x),u.return=d,d=u),a(d)):n(d,u)}return A}var Cn=Hc(!0),Wc=Hc(!1),xi=It(null),yi=null,mn=null,Oa=null;function Ia(){Oa=mn=yi=null}function Fa(e){var t=xi.current;X(xi),e._currentValue=t}function Xo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function bn(e,t){yi=e,Oa=mn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Pe=!0),e.firstContext=null)}function He(e){var t=e._currentValue;if(Oa!==e)if(e={context:e,memoizedValue:t,next:null},mn===null){if(yi===null)throw Error(w(308));mn=e,yi.dependencies={lanes:0,firstContext:e}}else mn=mn.next=e;return t}var Ht=null;function Ua(e){Ht===null?Ht=[e]:Ht.push(e)}function Qc(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Ua(t)):(n.next=i.next,i.next=n),t.interleaved=n,ht(e,r)}function ht(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var kt=!1;function Ba(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Kc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ft(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function _t(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,V&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,ht(e,n)}return i=r.interleaved,i===null?(t.next=t,Ua(r)):(t.next=i.next,i.next=t),r.interleaved=t,ht(e,n)}function Gr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,za(e,n)}}function Zl(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=a:o=o.next=a,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function wi(e,t,n,r){var i=e.updateQueue;kt=!1;var o=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var s=l,f=s.next;s.next=null,a===null?o=f:a.next=f,a=s;var h=e.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==a&&(l===null?h.firstBaseUpdate=f:l.next=f,h.lastBaseUpdate=s))}if(o!==null){var v=i.baseState;a=0,h=f=s=null,l=o;do{var m=l.lane,y=l.eventTime;if((r&m)===m){h!==null&&(h=h.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var p=e,k=l;switch(m=t,y=n,k.tag){case 1:if(p=k.payload,typeof p=="function"){v=p.call(y,v,m);break e}v=p;break e;case 3:p.flags=p.flags&-65537|128;case 0:if(p=k.payload,m=typeof p=="function"?p.call(y,v,m):p,m==null)break e;v=ee({},v,m);break e;case 2:kt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[l]:m.push(l))}else y={eventTime:y,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(f=h=y,s=v):h=h.next=y,a|=m;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;m=l,l=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(h===null&&(s=v),i.baseState=s,i.firstBaseUpdate=f,i.lastBaseUpdate=h,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);Zt|=a,e.lanes=a,e.memoizedState=v}}function Jl(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(w(191,i));i.call(r)}}}var Er={},lt=It(Er),mr=It(Er),gr=It(Er);function Wt(e){if(e===Er)throw Error(w(174));return e}function Va(e,t){switch(K(gr,t),K(mr,e),K(lt,Er),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:No(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=No(t,e)}X(lt),K(lt,t)}function zn(){X(lt),X(mr),X(gr)}function Yc(e){Wt(gr.current);var t=Wt(lt.current),n=No(t,e.type);t!==n&&(K(mr,e),K(lt,n))}function Ha(e){mr.current===e&&(X(lt),X(mr))}var J=It(0);function bi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var po=[];function Wa(){for(var e=0;e<po.length;e++)po[e]._workInProgressVersionPrimary=null;po.length=0}var Zr=xt.ReactCurrentDispatcher,fo=xt.ReactCurrentBatchConfig,Gt=0,q=null,se=null,ue=null,ki=!1,Zn=!1,hr=0,qp=0;function ve(){throw Error(w(321))}function Qa(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!et(e[n],t[n]))return!1;return!0}function Ka(e,t,n,r,i,o){if(Gt=o,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Zr.current=e===null||e.memoizedState===null?rf:of,e=n(r,i),Zn){o=0;do{if(Zn=!1,hr=0,25<=o)throw Error(w(301));o+=1,ue=se=null,t.updateQueue=null,Zr.current=af,e=n(r,i)}while(Zn)}if(Zr.current=Si,t=se!==null&&se.next!==null,Gt=0,ue=se=q=null,ki=!1,t)throw Error(w(300));return e}function Ya(){var e=hr!==0;return hr=0,e}function it(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?q.memoizedState=ue=e:ue=ue.next=e,ue}function We(){if(se===null){var e=q.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=ue===null?q.memoizedState:ue.next;if(t!==null)ue=t,se=e;else{if(e===null)throw Error(w(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},ue===null?q.memoizedState=ue=e:ue=ue.next=e}return ue}function vr(e,t){return typeof t=="function"?t(e):t}function mo(e){var t=We(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=se,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var a=i.next;i.next=o.next,o.next=a}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=a=null,s=null,f=o;do{var h=f.lane;if((Gt&h)===h)s!==null&&(s=s.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:e(r,f.action);else{var v={lane:h,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};s===null?(l=s=v,a=r):s=s.next=v,q.lanes|=h,Zt|=h}f=f.next}while(f!==null&&f!==o);s===null?a=r:s.next=l,et(r,t.memoizedState)||(Pe=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,q.lanes|=o,Zt|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function go(e){var t=We(),n=t.queue;if(n===null)throw Error(w(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do o=e(o,a.action),a=a.next;while(a!==i);et(o,t.memoizedState)||(Pe=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Xc(){}function Gc(e,t){var n=q,r=We(),i=t(),o=!et(r.memoizedState,i);if(o&&(r.memoizedState=i,Pe=!0),r=r.queue,Xa(qc.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ue!==null&&ue.memoizedState.tag&1){if(n.flags|=2048,xr(9,Jc.bind(null,n,r,i,t),void 0,null),de===null)throw Error(w(349));Gt&30||Zc(n,t,i)}return i}function Zc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Jc(e,t,n,r){t.value=n,t.getSnapshot=r,eu(t)&&tu(e)}function qc(e,t,n){return n(function(){eu(t)&&tu(e)})}function eu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!et(e,n)}catch{return!0}}function tu(e){var t=ht(e,1);t!==null&&Je(t,e,1,-1)}function ql(e){var t=it();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:vr,lastRenderedState:e},t.queue=e,e=e.dispatch=nf.bind(null,q,e),[t.memoizedState,e]}function xr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=q.updateQueue,t===null?(t={lastEffect:null,stores:null},q.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function nu(){return We().memoizedState}function Jr(e,t,n,r){var i=it();q.flags|=e,i.memoizedState=xr(1|t,n,void 0,r===void 0?null:r)}function Ai(e,t,n,r){var i=We();r=r===void 0?null:r;var o=void 0;if(se!==null){var a=se.memoizedState;if(o=a.destroy,r!==null&&Qa(r,a.deps)){i.memoizedState=xr(t,n,o,r);return}}q.flags|=e,i.memoizedState=xr(1|t,n,o,r)}function es(e,t){return Jr(8390656,8,e,t)}function Xa(e,t){return Ai(2048,8,e,t)}function ru(e,t){return Ai(4,2,e,t)}function iu(e,t){return Ai(4,4,e,t)}function ou(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function au(e,t,n){return n=n!=null?n.concat([e]):null,Ai(4,4,ou.bind(null,t,e),n)}function Ga(){}function lu(e,t){var n=We();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Qa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function su(e,t){var n=We();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Qa(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function cu(e,t,n){return Gt&21?(et(n,t)||(n=mc(),q.lanes|=n,Zt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Pe=!0),e.memoizedState=n)}function ef(e,t){var n=W;W=n!==0&&4>n?n:4,e(!0);var r=fo.transition;fo.transition={};try{e(!1),t()}finally{W=n,fo.transition=r}}function uu(){return We().memoizedState}function tf(e,t,n){var r=Mt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},du(e))pu(t,n);else if(n=Qc(e,t,n,r),n!==null){var i=Se();Je(n,e,r,i),fu(n,t,r)}}function nf(e,t,n){var r=Mt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(du(e))pu(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var a=t.lastRenderedState,l=o(a,n);if(i.hasEagerState=!0,i.eagerState=l,et(l,a)){var s=t.interleaved;s===null?(i.next=i,Ua(t)):(i.next=s.next,s.next=i),t.interleaved=i;return}}catch{}finally{}n=Qc(e,t,i,r),n!==null&&(i=Se(),Je(n,e,r,i),fu(n,t,r))}}function du(e){var t=e.alternate;return e===q||t!==null&&t===q}function pu(e,t){Zn=ki=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,za(e,n)}}var Si={readContext:He,useCallback:ve,useContext:ve,useEffect:ve,useImperativeHandle:ve,useInsertionEffect:ve,useLayoutEffect:ve,useMemo:ve,useReducer:ve,useRef:ve,useState:ve,useDebugValue:ve,useDeferredValue:ve,useTransition:ve,useMutableSource:ve,useSyncExternalStore:ve,useId:ve,unstable_isNewReconciler:!1},rf={readContext:He,useCallback:function(e,t){return it().memoizedState=[e,t===void 0?null:t],e},useContext:He,useEffect:es,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Jr(4194308,4,ou.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jr(4,2,e,t)},useMemo:function(e,t){var n=it();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=it();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=tf.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var t=it();return e={current:e},t.memoizedState=e},useState:ql,useDebugValue:Ga,useDeferredValue:function(e){return it().memoizedState=e},useTransition:function(){var e=ql(!1),t=e[0];return e=ef.bind(null,e[1]),it().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=q,i=it();if(G){if(n===void 0)throw Error(w(407));n=n()}else{if(n=t(),de===null)throw Error(w(349));Gt&30||Zc(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,es(qc.bind(null,r,o,e),[e]),r.flags|=2048,xr(9,Jc.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=it(),t=de.identifierPrefix;if(G){var n=pt,r=dt;n=(r&~(1<<32-Ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=hr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=qp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},of={readContext:He,useCallback:lu,useContext:He,useEffect:Xa,useImperativeHandle:au,useInsertionEffect:ru,useLayoutEffect:iu,useMemo:su,useReducer:mo,useRef:nu,useState:function(){return mo(vr)},useDebugValue:Ga,useDeferredValue:function(e){var t=We();return cu(t,se.memoizedState,e)},useTransition:function(){var e=mo(vr)[0],t=We().memoizedState;return[e,t]},useMutableSource:Xc,useSyncExternalStore:Gc,useId:uu,unstable_isNewReconciler:!1},af={readContext:He,useCallback:lu,useContext:He,useEffect:Xa,useImperativeHandle:au,useInsertionEffect:ru,useLayoutEffect:iu,useMemo:su,useReducer:go,useRef:nu,useState:function(){return go(vr)},useDebugValue:Ga,useDeferredValue:function(e){var t=We();return se===null?t.memoizedState=e:cu(t,se.memoizedState,e)},useTransition:function(){var e=go(vr)[0],t=We().memoizedState;return[e,t]},useMutableSource:Xc,useSyncExternalStore:Gc,useId:uu,unstable_isNewReconciler:!1};function Ye(e,t){if(e&&e.defaultProps){t=ee({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Go(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ee({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var $i={isMounted:function(e){return(e=e._reactInternals)?en(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Se(),i=Mt(e),o=ft(r,i);o.payload=t,n!=null&&(o.callback=n),t=_t(e,o,i),t!==null&&(Je(t,e,i,r),Gr(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Se(),i=Mt(e),o=ft(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=_t(e,o,i),t!==null&&(Je(t,e,i,r),Gr(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Se(),r=Mt(e),i=ft(n,r);i.tag=2,t!=null&&(i.callback=t),t=_t(e,i,r),t!==null&&(Je(t,e,r,n),Gr(t,e,r))}};function ts(e,t,n,r,i,o,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,a):t.prototype&&t.prototype.isPureReactComponent?!ur(n,r)||!ur(i,o):!0}function mu(e,t,n){var r=!1,i=$t,o=t.contextType;return typeof o=="object"&&o!==null?o=He(o):(i=Te(t)?Yt:we.current,r=t.contextTypes,o=(r=r!=null)?jn(e,i):$t),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=$i,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function ns(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&$i.enqueueReplaceState(t,t.state,null)}function Zo(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Ba(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=He(o):(o=Te(t)?Yt:we.current,i.context=jn(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Go(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&$i.enqueueReplaceState(i,i.state,null),wi(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Pn(e,t){try{var n="",r=t;do n+=Md(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function ho(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Jo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var lf=typeof WeakMap=="function"?WeakMap:Map;function gu(e,t,n){n=ft(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ei||(Ei=!0,sa=r),Jo(e,t)},n}function hu(e,t,n){n=ft(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Jo(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Jo(e,t),typeof r!="function"&&(Lt===null?Lt=new Set([this]):Lt.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function rs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new lf;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=bf.bind(null,e,t,n),t.then(e,e))}function is(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function os(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ft(-1,1),t.tag=2,_t(n,t,1))),n.lanes|=1),e)}var sf=xt.ReactCurrentOwner,Pe=!1;function ke(e,t,n,r){t.child=e===null?Wc(t,null,n,r):Cn(t,e.child,n,r)}function as(e,t,n,r,i){n=n.render;var o=t.ref;return bn(t,i),r=Ka(e,t,n,r,o,i),n=Ya(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,vt(e,t,i)):(G&&n&&Da(t),t.flags|=1,ke(e,t,r,i),t.child)}function ls(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!il(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,vu(e,t,o,r,i)):(e=ni(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var a=o.memoizedProps;if(n=n.compare,n=n!==null?n:ur,n(a,r)&&e.ref===t.ref)return vt(e,t,i)}return t.flags|=1,e=Rt(o,r),e.ref=t.ref,e.return=t,t.child=e}function vu(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(ur(o,r)&&e.ref===t.ref)if(Pe=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(Pe=!0);else return t.lanes=e.lanes,vt(e,t,i)}return qo(e,t,n,r,i)}function xu(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},K(hn,Me),Me|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,K(hn,Me),Me|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,K(hn,Me),Me|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,K(hn,Me),Me|=r;return ke(e,t,i,n),t.child}function yu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function qo(e,t,n,r,i){var o=Te(n)?Yt:we.current;return o=jn(t,o),bn(t,i),n=Ka(e,t,n,r,o,i),r=Ya(),e!==null&&!Pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,vt(e,t,i)):(G&&r&&Da(t),t.flags|=1,ke(e,t,n,i),t.child)}function ss(e,t,n,r,i){if(Te(n)){var o=!0;gi(t)}else o=!1;if(bn(t,i),t.stateNode===null)qr(e,t),mu(t,n,r),Zo(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var s=a.context,f=n.contextType;typeof f=="object"&&f!==null?f=He(f):(f=Te(n)?Yt:we.current,f=jn(t,f));var h=n.getDerivedStateFromProps,v=typeof h=="function"||typeof a.getSnapshotBeforeUpdate=="function";v||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||s!==f)&&ns(t,a,r,f),kt=!1;var m=t.memoizedState;a.state=m,wi(t,r,a,i),s=t.memoizedState,l!==r||m!==s||Ne.current||kt?(typeof h=="function"&&(Go(t,n,h,r),s=t.memoizedState),(l=kt||ts(t,n,l,r,m,s,f))?(v||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),a.props=r,a.state=s,a.context=f,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Kc(e,t),l=t.memoizedProps,f=t.type===t.elementType?l:Ye(t.type,l),a.props=f,v=t.pendingProps,m=a.context,s=n.contextType,typeof s=="object"&&s!==null?s=He(s):(s=Te(n)?Yt:we.current,s=jn(t,s));var y=n.getDerivedStateFromProps;(h=typeof y=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==v||m!==s)&&ns(t,a,r,s),kt=!1,m=t.memoizedState,a.state=m,wi(t,r,a,i);var p=t.memoizedState;l!==v||m!==p||Ne.current||kt?(typeof y=="function"&&(Go(t,n,y,r),p=t.memoizedState),(f=kt||ts(t,n,f,r,m,p,s)||!1)?(h||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,p,s),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,p,s)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=s,r=f):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return ea(e,t,n,r,o,i)}function ea(e,t,n,r,i,o){yu(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&Kl(t,n,!1),vt(e,t,o);r=t.stateNode,sf.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=Cn(t,e.child,null,o),t.child=Cn(t,null,l,o)):ke(e,t,l,o),t.memoizedState=r.state,i&&Kl(t,n,!0),t.child}function wu(e){var t=e.stateNode;t.pendingContext?Ql(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ql(e,t.context,!1),Va(e,t.containerInfo)}function cs(e,t,n,r,i){return En(),$a(i),t.flags|=256,ke(e,t,n,r),t.child}var ta={dehydrated:null,treeContext:null,retryLane:0};function na(e){return{baseLanes:e,cachePool:null,transitions:null}}function bu(e,t,n){var r=t.pendingProps,i=J.current,o=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),K(J,i&1),e===null)return Yo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,o?(r=t.mode,o=t.child,a={mode:"hidden",children:a},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=a):o=Fi(a,r,0,null),e=Kt(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=na(n),t.memoizedState=ta,e):Za(t,a));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return cf(e,t,a,r,l,i,n);if(o){o=r.fallback,a=t.mode,i=e.child,l=i.sibling;var s={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Rt(i,s),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=Rt(l,o):(o=Kt(o,a,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,a=e.child.memoizedState,a=a===null?na(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=e.childLanes&~n,t.memoizedState=ta,r}return o=e.child,e=o.sibling,r=Rt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Za(e,t){return t=Fi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ur(e,t,n,r){return r!==null&&$a(r),Cn(t,e.child,null,n),e=Za(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cf(e,t,n,r,i,o,a){if(n)return t.flags&256?(t.flags&=-257,r=ho(Error(w(422))),Ur(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Fi({mode:"visible",children:r.children},i,0,null),o=Kt(o,i,a,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Cn(t,e.child,null,a),t.child.memoizedState=na(a),t.memoizedState=ta,o);if(!(t.mode&1))return Ur(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(w(419)),r=ho(o,r,void 0),Ur(e,t,a,r)}if(l=(a&e.childLanes)!==0,Pe||l){if(r=de,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,ht(e,i),Je(r,e,i,-1))}return rl(),r=ho(Error(w(421))),Ur(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=kf.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Re=Tt(i.nextSibling),De=t,G=!0,Ge=null,e!==null&&(Fe[Ue++]=dt,Fe[Ue++]=pt,Fe[Ue++]=Xt,dt=e.id,pt=e.overflow,Xt=t),t=Za(t,r.children),t.flags|=4096,t)}function us(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Xo(e.return,t,n)}function vo(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function ku(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(ke(e,t,r.children,n),r=J.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&us(e,n,t);else if(e.tag===19)us(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(K(J,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&bi(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),vo(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&bi(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}vo(t,!0,n,null,o);break;case"together":vo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function qr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function vt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Zt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(w(153));if(t.child!==null){for(e=t.child,n=Rt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Rt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function uf(e,t,n){switch(t.tag){case 3:wu(t),En();break;case 5:Yc(t);break;case 1:Te(t.type)&&gi(t);break;case 4:Va(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;K(xi,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(K(J,J.current&1),t.flags|=128,null):n&t.child.childLanes?bu(e,t,n):(K(J,J.current&1),e=vt(e,t,n),e!==null?e.sibling:null);K(J,J.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return ku(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),K(J,J.current),r)break;return null;case 22:case 23:return t.lanes=0,xu(e,t,n)}return vt(e,t,n)}var Su,ra,ju,Eu;Su=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ra=function(){};ju=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Wt(lt.current);var o=null;switch(n){case"input":i=Eo(e,i),r=Eo(e,r),o=[];break;case"select":i=ee({},i,{value:void 0}),r=ee({},r,{value:void 0}),o=[];break;case"textarea":i=Po(e,i),r=Po(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=fi)}To(n,r);var a;n=null;for(f in i)if(!r.hasOwnProperty(f)&&i.hasOwnProperty(f)&&i[f]!=null)if(f==="style"){var l=i[f];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(rr.hasOwnProperty(f)?o||(o=[]):(o=o||[]).push(f,null));for(f in r){var s=r[f];if(l=i!=null?i[f]:void 0,r.hasOwnProperty(f)&&s!==l&&(s!=null||l!=null))if(f==="style")if(l){for(a in l)!l.hasOwnProperty(a)||s&&s.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in s)s.hasOwnProperty(a)&&l[a]!==s[a]&&(n||(n={}),n[a]=s[a])}else n||(o||(o=[]),o.push(f,n)),n=s;else f==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,l=l?l.__html:void 0,s!=null&&l!==s&&(o=o||[]).push(f,s)):f==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(f,""+s):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(rr.hasOwnProperty(f)?(s!=null&&f==="onScroll"&&Y("scroll",e),o||l===s||(o=[])):(o=o||[]).push(f,s))}n&&(o=o||[]).push("style",n);var f=o;(t.updateQueue=f)&&(t.flags|=4)}};Eu=function(e,t,n,r){n!==r&&(t.flags|=4)};function In(e,t){if(!G)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function df(e,t,n){var r=t.pendingProps;switch(Aa(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return Te(t.type)&&mi(),xe(t),null;case 3:return r=t.stateNode,zn(),X(Ne),X(we),Wa(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ir(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ge!==null&&(da(Ge),Ge=null))),ra(e,t),xe(t),null;case 5:Ha(t);var i=Wt(gr.current);if(n=t.type,e!==null&&t.stateNode!=null)ju(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(w(166));return xe(t),null}if(e=Wt(lt.current),Ir(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[ot]=t,r[fr]=o,e=(t.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(i=0;i<Hn.length;i++)Y(Hn[i],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":yl(r,o),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Y("invalid",r);break;case"textarea":bl(r,o),Y("invalid",r)}To(n,o),i=null;for(var a in o)if(o.hasOwnProperty(a)){var l=o[a];a==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&Or(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Or(r.textContent,l,e),i=["children",""+l]):rr.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&Y("scroll",r)}switch(n){case"input":Tr(r),wl(r,o,!0);break;case"textarea":Tr(r),kl(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=fi)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=qs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[ot]=t,e[fr]=r,Su(e,t,!1,!1),t.stateNode=e;e:{switch(a=_o(n,r),n){case"dialog":Y("cancel",e),Y("close",e),i=r;break;case"iframe":case"object":case"embed":Y("load",e),i=r;break;case"video":case"audio":for(i=0;i<Hn.length;i++)Y(Hn[i],e);i=r;break;case"source":Y("error",e),i=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),i=r;break;case"details":Y("toggle",e),i=r;break;case"input":yl(e,r),i=Eo(e,r),Y("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ee({},r,{value:void 0}),Y("invalid",e);break;case"textarea":bl(e,r),i=Po(e,r),Y("invalid",e);break;default:i=r}To(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var s=l[o];o==="style"?nc(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&ec(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&ir(e,s):typeof s=="number"&&ir(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(rr.hasOwnProperty(o)?s!=null&&o==="onScroll"&&Y("scroll",e):s!=null&&ba(e,o,s,a))}switch(n){case"input":Tr(e),wl(e,r,!1);break;case"textarea":Tr(e),kl(e);break;case"option":r.value!=null&&e.setAttribute("value",""+At(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?vn(e,!!r.multiple,o,!1):r.defaultValue!=null&&vn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=fi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return xe(t),null;case 6:if(e&&t.stateNode!=null)Eu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(w(166));if(n=Wt(gr.current),Wt(lt.current),Ir(t)){if(r=t.stateNode,n=t.memoizedProps,r[ot]=t,(o=r.nodeValue!==n)&&(e=De,e!==null))switch(e.tag){case 3:Or(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Or(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ot]=t,t.stateNode=r}return xe(t),null;case 13:if(X(J),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&Re!==null&&t.mode&1&&!(t.flags&128))Vc(),En(),t.flags|=98560,o=!1;else if(o=Ir(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(w(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(w(317));o[ot]=t}else En(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;xe(t),o=!1}else Ge!==null&&(da(Ge),Ge=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||J.current&1?ce===0&&(ce=3):rl())),t.updateQueue!==null&&(t.flags|=4),xe(t),null);case 4:return zn(),ra(e,t),e===null&&dr(t.stateNode.containerInfo),xe(t),null;case 10:return Fa(t.type._context),xe(t),null;case 17:return Te(t.type)&&mi(),xe(t),null;case 19:if(X(J),o=t.memoizedState,o===null)return xe(t),null;if(r=(t.flags&128)!==0,a=o.rendering,a===null)if(r)In(o,!1);else{if(ce!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=bi(e),a!==null){for(t.flags|=128,In(o,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,e=a.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return K(J,J.current&1|2),t.child}e=e.sibling}o.tail!==null&&ie()>Nn&&(t.flags|=128,r=!0,In(o,!1),t.lanes=4194304)}else{if(!r)if(e=bi(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),In(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!G)return xe(t),null}else 2*ie()-o.renderingStartTime>Nn&&n!==1073741824&&(t.flags|=128,r=!0,In(o,!1),t.lanes=4194304);o.isBackwards?(a.sibling=t.child,t.child=a):(n=o.last,n!==null?n.sibling=a:t.child=a,o.last=a)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ie(),t.sibling=null,n=J.current,K(J,r?n&1|2:n&1),t):(xe(t),null);case 22:case 23:return nl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Me&1073741824&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),null;case 24:return null;case 25:return null}throw Error(w(156,t.tag))}function pf(e,t){switch(Aa(t),t.tag){case 1:return Te(t.type)&&mi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return zn(),X(Ne),X(we),Wa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ha(t),null;case 13:if(X(J),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(w(340));En()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return X(J),null;case 4:return zn(),null;case 10:return Fa(t.type._context),null;case 22:case 23:return nl(),null;case 24:return null;default:return null}}var Br=!1,ye=!1,ff=typeof WeakSet=="function"?WeakSet:Set,z=null;function gn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ne(e,t,r)}else n.current=null}function ia(e,t,n){try{n()}catch(r){ne(e,t,r)}}var ds=!1;function mf(e,t){if(Uo=ui,e=Tc(),Ra(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var a=0,l=-1,s=-1,f=0,h=0,v=e,m=null;t:for(;;){for(var y;v!==n||i!==0&&v.nodeType!==3||(l=a+i),v!==o||r!==0&&v.nodeType!==3||(s=a+r),v.nodeType===3&&(a+=v.nodeValue.length),(y=v.firstChild)!==null;)m=v,v=y;for(;;){if(v===e)break t;if(m===n&&++f===i&&(l=a),m===o&&++h===r&&(s=a),(y=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=y}n=l===-1||s===-1?null:{start:l,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Bo={focusedElem:e,selectionRange:n},ui=!1,z=t;z!==null;)if(t=z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z=e;else for(;z!==null;){t=z;try{var p=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(p!==null){var k=p.memoizedProps,A=p.memoizedState,d=t.stateNode,u=d.getSnapshotBeforeUpdate(t.elementType===t.type?k:Ye(t.type,k),A);d.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(w(163))}}catch(x){ne(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,z=e;break}z=t.return}return p=ds,ds=!1,p}function Jn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&ia(t,n,o)}i=i.next}while(i!==r)}}function Oi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function oa(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Cu(e){var t=e.alternate;t!==null&&(e.alternate=null,Cu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ot],delete t[fr],delete t[Wo],delete t[Xp],delete t[Gp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function zu(e){return e.tag===5||e.tag===3||e.tag===4}function ps(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||zu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function aa(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fi));else if(r!==4&&(e=e.child,e!==null))for(aa(e,t,n),e=e.sibling;e!==null;)aa(e,t,n),e=e.sibling}function la(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(la(e,t,n),e=e.sibling;e!==null;)la(e,t,n),e=e.sibling}var fe=null,Xe=!1;function yt(e,t,n){for(n=n.child;n!==null;)Pu(e,t,n),n=n.sibling}function Pu(e,t,n){if(at&&typeof at.onCommitFiberUnmount=="function")try{at.onCommitFiberUnmount(Ti,n)}catch{}switch(n.tag){case 5:ye||gn(n,t);case 6:var r=fe,i=Xe;fe=null,yt(e,t,n),fe=r,Xe=i,fe!==null&&(Xe?(e=fe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):fe.removeChild(n.stateNode));break;case 18:fe!==null&&(Xe?(e=fe,n=n.stateNode,e.nodeType===8?co(e.parentNode,n):e.nodeType===1&&co(e,n),sr(e)):co(fe,n.stateNode));break;case 4:r=fe,i=Xe,fe=n.stateNode.containerInfo,Xe=!0,yt(e,t,n),fe=r,Xe=i;break;case 0:case 11:case 14:case 15:if(!ye&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,a=o.destroy;o=o.tag,a!==void 0&&(o&2||o&4)&&ia(n,t,a),i=i.next}while(i!==r)}yt(e,t,n);break;case 1:if(!ye&&(gn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ne(n,t,l)}yt(e,t,n);break;case 21:yt(e,t,n);break;case 22:n.mode&1?(ye=(r=ye)||n.memoizedState!==null,yt(e,t,n),ye=r):yt(e,t,n);break;default:yt(e,t,n)}}function fs(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ff),t.forEach(function(r){var i=Sf.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Ke(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:fe=l.stateNode,Xe=!1;break e;case 3:fe=l.stateNode.containerInfo,Xe=!0;break e;case 4:fe=l.stateNode.containerInfo,Xe=!0;break e}l=l.return}if(fe===null)throw Error(w(160));Pu(o,a,i),fe=null,Xe=!1;var s=i.alternate;s!==null&&(s.return=null),i.return=null}catch(f){ne(i,t,f)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Nu(t,e),t=t.sibling}function Nu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ke(t,e),rt(e),r&4){try{Jn(3,e,e.return),Oi(3,e)}catch(k){ne(e,e.return,k)}try{Jn(5,e,e.return)}catch(k){ne(e,e.return,k)}}break;case 1:Ke(t,e),rt(e),r&512&&n!==null&&gn(n,n.return);break;case 5:if(Ke(t,e),rt(e),r&512&&n!==null&&gn(n,n.return),e.flags&32){var i=e.stateNode;try{ir(i,"")}catch(k){ne(e,e.return,k)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,a=n!==null?n.memoizedProps:o,l=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&Zs(i,o),_o(l,a);var f=_o(l,o);for(a=0;a<s.length;a+=2){var h=s[a],v=s[a+1];h==="style"?nc(i,v):h==="dangerouslySetInnerHTML"?ec(i,v):h==="children"?ir(i,v):ba(i,h,v,f)}switch(l){case"input":Co(i,o);break;case"textarea":Js(i,o);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var y=o.value;y!=null?vn(i,!!o.multiple,y,!1):m!==!!o.multiple&&(o.defaultValue!=null?vn(i,!!o.multiple,o.defaultValue,!0):vn(i,!!o.multiple,o.multiple?[]:"",!1))}i[fr]=o}catch(k){ne(e,e.return,k)}}break;case 6:if(Ke(t,e),rt(e),r&4){if(e.stateNode===null)throw Error(w(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(k){ne(e,e.return,k)}}break;case 3:if(Ke(t,e),rt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{sr(t.containerInfo)}catch(k){ne(e,e.return,k)}break;case 4:Ke(t,e),rt(e);break;case 13:Ke(t,e),rt(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||(el=ie())),r&4&&fs(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(ye=(f=ye)||h,Ke(t,e),ye=f):Ke(t,e),rt(e),r&8192){if(f=e.memoizedState!==null,(e.stateNode.isHidden=f)&&!h&&e.mode&1)for(z=e,h=e.child;h!==null;){for(v=z=h;z!==null;){switch(m=z,y=m.child,m.tag){case 0:case 11:case 14:case 15:Jn(4,m,m.return);break;case 1:gn(m,m.return);var p=m.stateNode;if(typeof p.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,p.props=t.memoizedProps,p.state=t.memoizedState,p.componentWillUnmount()}catch(k){ne(r,n,k)}}break;case 5:gn(m,m.return);break;case 22:if(m.memoizedState!==null){gs(v);continue}}y!==null?(y.return=m,z=y):gs(v)}h=h.sibling}e:for(h=null,v=e;;){if(v.tag===5){if(h===null){h=v;try{i=v.stateNode,f?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=v.stateNode,s=v.memoizedProps.style,a=s!=null&&s.hasOwnProperty("display")?s.display:null,l.style.display=tc("display",a))}catch(k){ne(e,e.return,k)}}}else if(v.tag===6){if(h===null)try{v.stateNode.nodeValue=f?"":v.memoizedProps}catch(k){ne(e,e.return,k)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;h===v&&(h=null),v=v.return}h===v&&(h=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:Ke(t,e),rt(e),r&4&&fs(e);break;case 21:break;default:Ke(t,e),rt(e)}}function rt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(zu(n)){var r=n;break e}n=n.return}throw Error(w(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(ir(i,""),r.flags&=-33);var o=ps(e);la(e,o,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=ps(e);aa(e,l,a);break;default:throw Error(w(161))}}catch(s){ne(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gf(e,t,n){z=e,Tu(e)}function Tu(e,t,n){for(var r=(e.mode&1)!==0;z!==null;){var i=z,o=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||Br;if(!a){var l=i.alternate,s=l!==null&&l.memoizedState!==null||ye;l=Br;var f=ye;if(Br=a,(ye=s)&&!f)for(z=i;z!==null;)a=z,s=a.child,a.tag===22&&a.memoizedState!==null?hs(i):s!==null?(s.return=a,z=s):hs(i);for(;o!==null;)z=o,Tu(o),o=o.sibling;z=i,Br=l,ye=f}ms(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,z=o):ms(e)}}function ms(e){for(;z!==null;){var t=z;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ye||Oi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ye)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Ye(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Jl(t,o,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Jl(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var f=t.alternate;if(f!==null){var h=f.memoizedState;if(h!==null){var v=h.dehydrated;v!==null&&sr(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(w(163))}ye||t.flags&512&&oa(t)}catch(m){ne(t,t.return,m)}}if(t===e){z=null;break}if(n=t.sibling,n!==null){n.return=t.return,z=n;break}z=t.return}}function gs(e){for(;z!==null;){var t=z;if(t===e){z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,z=n;break}z=t.return}}function hs(e){for(;z!==null;){var t=z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Oi(4,t)}catch(s){ne(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(s){ne(t,i,s)}}var o=t.return;try{oa(t)}catch(s){ne(t,o,s)}break;case 5:var a=t.return;try{oa(t)}catch(s){ne(t,a,s)}}}catch(s){ne(t,t.return,s)}if(t===e){z=null;break}var l=t.sibling;if(l!==null){l.return=t.return,z=l;break}z=t.return}}var hf=Math.ceil,ji=xt.ReactCurrentDispatcher,Ja=xt.ReactCurrentOwner,Ve=xt.ReactCurrentBatchConfig,V=0,de=null,ae=null,me=0,Me=0,hn=It(0),ce=0,yr=null,Zt=0,Ii=0,qa=0,qn=null,ze=null,el=0,Nn=1/0,ct=null,Ei=!1,sa=null,Lt=null,Vr=!1,Ct=null,Ci=0,er=0,ca=null,ei=-1,ti=0;function Se(){return V&6?ie():ei!==-1?ei:ei=ie()}function Mt(e){return e.mode&1?V&2&&me!==0?me&-me:Jp.transition!==null?(ti===0&&(ti=mc()),ti):(e=W,e!==0||(e=window.event,e=e===void 0?16:bc(e.type)),e):1}function Je(e,t,n,r){if(50<er)throw er=0,ca=null,Error(w(185));kr(e,n,r),(!(V&2)||e!==de)&&(e===de&&(!(V&2)&&(Ii|=n),ce===4&&jt(e,me)),_e(e,r),n===1&&V===0&&!(t.mode&1)&&(Nn=ie()+500,Di&&Ft()))}function _e(e,t){var n=e.callbackNode;Jd(e,t);var r=ci(e,e===de?me:0);if(r===0)n!==null&&El(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&El(n),t===1)e.tag===0?Zp(vs.bind(null,e)):Fc(vs.bind(null,e)),Kp(function(){!(V&6)&&Ft()}),n=null;else{switch(gc(r)){case 1:n=Ca;break;case 4:n=pc;break;case 16:n=si;break;case 536870912:n=fc;break;default:n=si}n=Ou(n,_u.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function _u(e,t){if(ei=-1,ti=0,V&6)throw Error(w(327));var n=e.callbackNode;if(kn()&&e.callbackNode!==n)return null;var r=ci(e,e===de?me:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=zi(e,r);else{t=r;var i=V;V|=2;var o=Mu();(de!==e||me!==t)&&(ct=null,Nn=ie()+500,Qt(e,t));do try{yf();break}catch(l){Lu(e,l)}while(!0);Ia(),ji.current=o,V=i,ae!==null?t=0:(de=null,me=0,t=ce)}if(t!==0){if(t===2&&(i=Ao(e),i!==0&&(r=i,t=ua(e,i))),t===1)throw n=yr,Qt(e,0),jt(e,r),_e(e,ie()),n;if(t===6)jt(e,r);else{if(i=e.current.alternate,!(r&30)&&!vf(i)&&(t=zi(e,r),t===2&&(o=Ao(e),o!==0&&(r=o,t=ua(e,o))),t===1))throw n=yr,Qt(e,0),jt(e,r),_e(e,ie()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(w(345));case 2:Bt(e,ze,ct);break;case 3:if(jt(e,r),(r&130023424)===r&&(t=el+500-ie(),10<t)){if(ci(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Se(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ho(Bt.bind(null,e,ze,ct),t);break}Bt(e,ze,ct);break;case 4:if(jt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-Ze(r);o=1<<a,a=t[a],a>i&&(i=a),r&=~o}if(r=i,r=ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*hf(r/1960))-r,10<r){e.timeoutHandle=Ho(Bt.bind(null,e,ze,ct),r);break}Bt(e,ze,ct);break;case 5:Bt(e,ze,ct);break;default:throw Error(w(329))}}}return _e(e,ie()),e.callbackNode===n?_u.bind(null,e):null}function ua(e,t){var n=qn;return e.current.memoizedState.isDehydrated&&(Qt(e,t).flags|=256),e=zi(e,t),e!==2&&(t=ze,ze=n,t!==null&&da(t)),e}function da(e){ze===null?ze=e:ze.push.apply(ze,e)}function vf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!et(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function jt(e,t){for(t&=~qa,t&=~Ii,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ze(t),r=1<<n;e[n]=-1,t&=~r}}function vs(e){if(V&6)throw Error(w(327));kn();var t=ci(e,0);if(!(t&1))return _e(e,ie()),null;var n=zi(e,t);if(e.tag!==0&&n===2){var r=Ao(e);r!==0&&(t=r,n=ua(e,r))}if(n===1)throw n=yr,Qt(e,0),jt(e,t),_e(e,ie()),n;if(n===6)throw Error(w(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Bt(e,ze,ct),_e(e,ie()),null}function tl(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Nn=ie()+500,Di&&Ft())}}function Jt(e){Ct!==null&&Ct.tag===0&&!(V&6)&&kn();var t=V;V|=1;var n=Ve.transition,r=W;try{if(Ve.transition=null,W=1,e)return e()}finally{W=r,Ve.transition=n,V=t,!(V&6)&&Ft()}}function nl(){Me=hn.current,X(hn)}function Qt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Qp(n)),ae!==null)for(n=ae.return;n!==null;){var r=n;switch(Aa(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&mi();break;case 3:zn(),X(Ne),X(we),Wa();break;case 5:Ha(r);break;case 4:zn();break;case 13:X(J);break;case 19:X(J);break;case 10:Fa(r.type._context);break;case 22:case 23:nl()}n=n.return}if(de=e,ae=e=Rt(e.current,null),me=Me=t,ce=0,yr=null,qa=Ii=Zt=0,ze=qn=null,Ht!==null){for(t=0;t<Ht.length;t++)if(n=Ht[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var a=o.next;o.next=i,r.next=a}n.pending=r}Ht=null}return e}function Lu(e,t){do{var n=ae;try{if(Ia(),Zr.current=Si,ki){for(var r=q.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ki=!1}if(Gt=0,ue=se=q=null,Zn=!1,hr=0,Ja.current=null,n===null||n.return===null){ce=1,yr=t,ae=null;break}e:{var o=e,a=n.return,l=n,s=t;if(t=me,l.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var f=s,h=l,v=h.tag;if(!(h.mode&1)&&(v===0||v===11||v===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var y=is(a);if(y!==null){y.flags&=-257,os(y,a,l,o,t),y.mode&1&&rs(o,f,t),t=y,s=f;var p=t.updateQueue;if(p===null){var k=new Set;k.add(s),t.updateQueue=k}else p.add(s);break e}else{if(!(t&1)){rs(o,f,t),rl();break e}s=Error(w(426))}}else if(G&&l.mode&1){var A=is(a);if(A!==null){!(A.flags&65536)&&(A.flags|=256),os(A,a,l,o,t),$a(Pn(s,l));break e}}o=s=Pn(s,l),ce!==4&&(ce=2),qn===null?qn=[o]:qn.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=gu(o,s,t);Zl(o,d);break e;case 1:l=s;var u=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof u.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Lt===null||!Lt.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=hu(o,l,t);Zl(o,x);break e}}o=o.return}while(o!==null)}Du(n)}catch(b){t=b,ae===n&&n!==null&&(ae=n=n.return);continue}break}while(!0)}function Mu(){var e=ji.current;return ji.current=Si,e===null?Si:e}function rl(){(ce===0||ce===3||ce===2)&&(ce=4),de===null||!(Zt&268435455)&&!(Ii&268435455)||jt(de,me)}function zi(e,t){var n=V;V|=2;var r=Mu();(de!==e||me!==t)&&(ct=null,Qt(e,t));do try{xf();break}catch(i){Lu(e,i)}while(!0);if(Ia(),V=n,ji.current=r,ae!==null)throw Error(w(261));return de=null,me=0,ce}function xf(){for(;ae!==null;)Ru(ae)}function yf(){for(;ae!==null&&!Vd();)Ru(ae)}function Ru(e){var t=$u(e.alternate,e,Me);e.memoizedProps=e.pendingProps,t===null?Du(e):ae=t,Ja.current=null}function Du(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=pf(n,t),n!==null){n.flags&=32767,ae=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ce=6,ae=null;return}}else if(n=df(n,t,Me),n!==null){ae=n;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);ce===0&&(ce=5)}function Bt(e,t,n){var r=W,i=Ve.transition;try{Ve.transition=null,W=1,wf(e,t,n,r)}finally{Ve.transition=i,W=r}return null}function wf(e,t,n,r){do kn();while(Ct!==null);if(V&6)throw Error(w(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(w(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(qd(e,o),e===de&&(ae=de=null,me=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Vr||(Vr=!0,Ou(si,function(){return kn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ve.transition,Ve.transition=null;var a=W;W=1;var l=V;V|=4,Ja.current=null,mf(e,n),Nu(n,e),Ip(Bo),ui=!!Uo,Bo=Uo=null,e.current=n,gf(n),Hd(),V=l,W=a,Ve.transition=o}else e.current=n;if(Vr&&(Vr=!1,Ct=e,Ci=i),o=e.pendingLanes,o===0&&(Lt=null),Kd(n.stateNode),_e(e,ie()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Ei)throw Ei=!1,e=sa,sa=null,e;return Ci&1&&e.tag!==0&&kn(),o=e.pendingLanes,o&1?e===ca?er++:(er=0,ca=e):er=0,Ft(),null}function kn(){if(Ct!==null){var e=gc(Ci),t=Ve.transition,n=W;try{if(Ve.transition=null,W=16>e?16:e,Ct===null)var r=!1;else{if(e=Ct,Ct=null,Ci=0,V&6)throw Error(w(331));var i=V;for(V|=4,z=e.current;z!==null;){var o=z,a=o.child;if(z.flags&16){var l=o.deletions;if(l!==null){for(var s=0;s<l.length;s++){var f=l[s];for(z=f;z!==null;){var h=z;switch(h.tag){case 0:case 11:case 15:Jn(8,h,o)}var v=h.child;if(v!==null)v.return=h,z=v;else for(;z!==null;){h=z;var m=h.sibling,y=h.return;if(Cu(h),h===f){z=null;break}if(m!==null){m.return=y,z=m;break}z=y}}}var p=o.alternate;if(p!==null){var k=p.child;if(k!==null){p.child=null;do{var A=k.sibling;k.sibling=null,k=A}while(k!==null)}}z=o}}if(o.subtreeFlags&2064&&a!==null)a.return=o,z=a;else e:for(;z!==null;){if(o=z,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Jn(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,z=d;break e}z=o.return}}var u=e.current;for(z=u;z!==null;){a=z;var g=a.child;if(a.subtreeFlags&2064&&g!==null)g.return=a,z=g;else e:for(a=u;z!==null;){if(l=z,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Oi(9,l)}}catch(b){ne(l,l.return,b)}if(l===a){z=null;break e}var x=l.sibling;if(x!==null){x.return=l.return,z=x;break e}z=l.return}}if(V=i,Ft(),at&&typeof at.onPostCommitFiberRoot=="function")try{at.onPostCommitFiberRoot(Ti,e)}catch{}r=!0}return r}finally{W=n,Ve.transition=t}}return!1}function xs(e,t,n){t=Pn(n,t),t=gu(e,t,1),e=_t(e,t,1),t=Se(),e!==null&&(kr(e,1,t),_e(e,t))}function ne(e,t,n){if(e.tag===3)xs(e,e,n);else for(;t!==null;){if(t.tag===3){xs(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Lt===null||!Lt.has(r))){e=Pn(n,e),e=hu(t,e,1),t=_t(t,e,1),e=Se(),t!==null&&(kr(t,1,e),_e(t,e));break}}t=t.return}}function bf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Se(),e.pingedLanes|=e.suspendedLanes&n,de===e&&(me&n)===n&&(ce===4||ce===3&&(me&130023424)===me&&500>ie()-el?Qt(e,0):qa|=n),_e(e,t)}function Au(e,t){t===0&&(e.mode&1?(t=Mr,Mr<<=1,!(Mr&130023424)&&(Mr=4194304)):t=1);var n=Se();e=ht(e,t),e!==null&&(kr(e,t,n),_e(e,n))}function kf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Au(e,n)}function Sf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(w(314))}r!==null&&r.delete(t),Au(e,n)}var $u;$u=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ne.current)Pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Pe=!1,uf(e,t,n);Pe=!!(e.flags&131072)}else Pe=!1,G&&t.flags&1048576&&Uc(t,vi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;qr(e,t),e=t.pendingProps;var i=jn(t,we.current);bn(t,n),i=Ka(null,t,r,e,i,n);var o=Ya();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Te(r)?(o=!0,gi(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Ba(t),i.updater=$i,t.stateNode=i,i._reactInternals=t,Zo(t,r,e,n),t=ea(null,t,r,!0,o,n)):(t.tag=0,G&&o&&Da(t),ke(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(qr(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Ef(r),e=Ye(r,e),i){case 0:t=qo(null,t,r,e,n);break e;case 1:t=ss(null,t,r,e,n);break e;case 11:t=as(null,t,r,e,n);break e;case 14:t=ls(null,t,r,Ye(r.type,e),n);break e}throw Error(w(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ye(r,i),qo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ye(r,i),ss(e,t,r,i,n);case 3:e:{if(wu(t),e===null)throw Error(w(387));r=t.pendingProps,o=t.memoizedState,i=o.element,Kc(e,t),wi(t,r,null,n);var a=t.memoizedState;if(r=a.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=Pn(Error(w(423)),t),t=cs(e,t,r,n,i);break e}else if(r!==i){i=Pn(Error(w(424)),t),t=cs(e,t,r,n,i);break e}else for(Re=Tt(t.stateNode.containerInfo.firstChild),De=t,G=!0,Ge=null,n=Wc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(En(),r===i){t=vt(e,t,n);break e}ke(e,t,r,n)}t=t.child}return t;case 5:return Yc(t),e===null&&Yo(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,a=i.children,Vo(r,i)?a=null:o!==null&&Vo(r,o)&&(t.flags|=32),yu(e,t),ke(e,t,a,n),t.child;case 6:return e===null&&Yo(t),null;case 13:return bu(e,t,n);case 4:return Va(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Cn(t,null,r,n):ke(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ye(r,i),as(e,t,r,i,n);case 7:return ke(e,t,t.pendingProps,n),t.child;case 8:return ke(e,t,t.pendingProps.children,n),t.child;case 12:return ke(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,a=i.value,K(xi,r._currentValue),r._currentValue=a,o!==null)if(et(o.value,a)){if(o.children===i.children&&!Ne.current){t=vt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){a=o.child;for(var s=l.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=ft(-1,n&-n),s.tag=2;var f=o.updateQueue;if(f!==null){f=f.shared;var h=f.pending;h===null?s.next=s:(s.next=h.next,h.next=s),f.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),Xo(o.return,n,t),l.lanes|=n;break}s=s.next}}else if(o.tag===10)a=o.type===t.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(w(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Xo(a,n,t),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===t){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}ke(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,bn(t,n),i=He(i),r=r(i),t.flags|=1,ke(e,t,r,n),t.child;case 14:return r=t.type,i=Ye(r,t.pendingProps),i=Ye(r.type,i),ls(e,t,r,i,n);case 15:return vu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Ye(r,i),qr(e,t),t.tag=1,Te(r)?(e=!0,gi(t)):e=!1,bn(t,n),mu(t,r,i),Zo(t,r,i,n),ea(null,t,r,!0,e,n);case 19:return ku(e,t,n);case 22:return xu(e,t,n)}throw Error(w(156,t.tag))};function Ou(e,t){return dc(e,t)}function jf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Be(e,t,n,r){return new jf(e,t,n,r)}function il(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ef(e){if(typeof e=="function")return il(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Sa)return 11;if(e===ja)return 14}return 2}function Rt(e,t){var n=e.alternate;return n===null?(n=Be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ni(e,t,n,r,i,o){var a=2;if(r=e,typeof e=="function")il(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case an:return Kt(n.children,i,o,t);case ka:a=8,i|=8;break;case bo:return e=Be(12,n,t,i|2),e.elementType=bo,e.lanes=o,e;case ko:return e=Be(13,n,t,i),e.elementType=ko,e.lanes=o,e;case So:return e=Be(19,n,t,i),e.elementType=So,e.lanes=o,e;case Ys:return Fi(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Qs:a=10;break e;case Ks:a=9;break e;case Sa:a=11;break e;case ja:a=14;break e;case bt:a=16,r=null;break e}throw Error(w(130,e==null?e:typeof e,""))}return t=Be(a,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function Kt(e,t,n,r){return e=Be(7,e,r,t),e.lanes=n,e}function Fi(e,t,n,r){return e=Be(22,e,r,t),e.elementType=Ys,e.lanes=n,e.stateNode={isHidden:!1},e}function xo(e,t,n){return e=Be(6,e,null,t),e.lanes=n,e}function yo(e,t,n){return t=Be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Cf(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ji(0),this.expirationTimes=Ji(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ji(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function ol(e,t,n,r,i,o,a,l,s){return e=new Cf(e,t,n,l,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Be(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ba(o),e}function zf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:on,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Iu(e){if(!e)return $t;e=e._reactInternals;e:{if(en(e)!==e||e.tag!==1)throw Error(w(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Te(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(w(171))}if(e.tag===1){var n=e.type;if(Te(n))return Ic(e,n,t)}return t}function Fu(e,t,n,r,i,o,a,l,s){return e=ol(n,r,!0,e,i,o,a,l,s),e.context=Iu(null),n=e.current,r=Se(),i=Mt(n),o=ft(r,i),o.callback=t??null,_t(n,o,i),e.current.lanes=i,kr(e,i,r),_e(e,r),e}function Ui(e,t,n,r){var i=t.current,o=Se(),a=Mt(i);return n=Iu(n),t.context===null?t.context=n:t.pendingContext=n,t=ft(o,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=_t(i,t,a),e!==null&&(Je(e,i,a,o),Gr(e,i,a)),a}function Pi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function ys(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function al(e,t){ys(e,t),(e=e.alternate)&&ys(e,t)}function Pf(){return null}var Uu=typeof reportError=="function"?reportError:function(e){console.error(e)};function ll(e){this._internalRoot=e}Bi.prototype.render=ll.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(w(409));Ui(e,t,null,null)};Bi.prototype.unmount=ll.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Jt(function(){Ui(null,e,null,null)}),t[gt]=null}};function Bi(e){this._internalRoot=e}Bi.prototype.unstable_scheduleHydration=function(e){if(e){var t=xc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<St.length&&t!==0&&t<St[n].priority;n++);St.splice(n,0,e),n===0&&wc(e)}};function sl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Vi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ws(){}function Nf(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var f=Pi(a);o.call(f)}}var a=Fu(t,r,e,0,null,!1,!1,"",ws);return e._reactRootContainer=a,e[gt]=a.current,dr(e.nodeType===8?e.parentNode:e),Jt(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var f=Pi(s);l.call(f)}}var s=ol(e,0,!1,null,null,!1,!1,"",ws);return e._reactRootContainer=s,e[gt]=s.current,dr(e.nodeType===8?e.parentNode:e),Jt(function(){Ui(t,s,n,r)}),s}function Hi(e,t,n,r,i){var o=n._reactRootContainer;if(o){var a=o;if(typeof i=="function"){var l=i;i=function(){var s=Pi(a);l.call(s)}}Ui(t,a,e,i)}else a=Nf(n,t,e,i,r);return Pi(a)}hc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Vn(t.pendingLanes);n!==0&&(za(t,n|1),_e(t,ie()),!(V&6)&&(Nn=ie()+500,Ft()))}break;case 13:Jt(function(){var r=ht(e,1);if(r!==null){var i=Se();Je(r,e,1,i)}}),al(e,1)}};Pa=function(e){if(e.tag===13){var t=ht(e,134217728);if(t!==null){var n=Se();Je(t,e,134217728,n)}al(e,134217728)}};vc=function(e){if(e.tag===13){var t=Mt(e),n=ht(e,t);if(n!==null){var r=Se();Je(n,e,t,r)}al(e,t)}};xc=function(){return W};yc=function(e,t){var n=W;try{return W=e,t()}finally{W=n}};Mo=function(e,t,n){switch(t){case"input":if(Co(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Ri(r);if(!i)throw Error(w(90));Gs(r),Co(r,i)}}}break;case"textarea":Js(e,n);break;case"select":t=n.value,t!=null&&vn(e,!!n.multiple,t,!1)}};oc=tl;ac=Jt;var Tf={usingClientEntryPoint:!1,Events:[jr,un,Ri,rc,ic,tl]},Fn={findFiberByHostInstance:Vt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_f={bundleType:Fn.bundleType,version:Fn.version,rendererPackageName:Fn.rendererPackageName,rendererConfig:Fn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=cc(e),e===null?null:e.stateNode},findFiberByHostInstance:Fn.findFiberByHostInstance||Pf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Hr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Hr.isDisabled&&Hr.supportsFiber)try{Ti=Hr.inject(_f),at=Hr}catch{}}$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Tf;$e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!sl(t))throw Error(w(200));return zf(e,t,null,n)};$e.createRoot=function(e,t){if(!sl(e))throw Error(w(299));var n=!1,r="",i=Uu;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=ol(e,1,!1,null,null,n,!1,r,i),e[gt]=t.current,dr(e.nodeType===8?e.parentNode:e),new ll(t)};$e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(w(188)):(e=Object.keys(e).join(","),Error(w(268,e)));return e=cc(t),e=e===null?null:e.stateNode,e};$e.flushSync=function(e){return Jt(e)};$e.hydrate=function(e,t,n){if(!Vi(t))throw Error(w(200));return Hi(null,e,t,!0,n)};$e.hydrateRoot=function(e,t,n){if(!sl(e))throw Error(w(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",a=Uu;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Fu(t,null,e,1,n??null,i,!1,o,a),e[gt]=t.current,dr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Bi(t)};$e.render=function(e,t,n){if(!Vi(t))throw Error(w(200));return Hi(null,e,t,!1,n)};$e.unmountComponentAtNode=function(e){if(!Vi(e))throw Error(w(40));return e._reactRootContainer?(Jt(function(){Hi(null,null,e,!1,function(){e._reactRootContainer=null,e[gt]=null})}),!0):!1};$e.unstable_batchedUpdates=tl;$e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Vi(n))throw Error(w(200));if(e==null||e._reactInternals===void 0)throw Error(w(38));return Hi(e,t,n,!1,r)};$e.version="18.3.1-next-f1338f8080-20240426";function Bu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Bu)}catch(e){console.error(e)}}Bu(),Bs.exports=$e;var pa=Bs.exports,Vu,bs=pa;Vu=bs.createRoot,bs.hydrateRoot;const Lf="/prerak-portfolio/assets/background-portrait-Bd3BrFc_.jpg",Mf=new Set(["github.com","www.github.com","linkedin.com","www.linkedin.com"]);function Hu(e,t=new WeakSet){return!e||typeof e!="object"||t.has(e)||(t.add(e),Object.freeze(e),Object.values(e).forEach(n=>Hu(n,t))),e}function Wi(e){return String(e??"").replace(/[\u0000-\u001F\u007F]/g,"").trim()}function ks(e,t){const n=String(e).replace(/\/?$/,"/"),r=Wi(t).replace(/^\/+/,"");if(!/^[\w./-]+$/.test(r)||r.includes(".."))throw new Error(`Unsafe asset path: ${t}`);return`${n}${r}`}function ri(e){const t=new URL(e);if(t.protocol!=="https:"||!Mf.has(t.hostname.toLowerCase()))throw new Error(`External URL is not allowlisted: ${e}`);return t.toString()}function Wu(e){const t=Wi(e);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))throw new Error(`Invalid email address: ${e}`);return`mailto:${t}`}function ii(e){const t=Wi(e),n=/^https:\/\//i.test(t);if(n&&ri(t),/^\s*javascript:/i.test(t))throw new Error("Unsafe javascript: link blocked");return n?{target:"_blank",rel:"noreferrer noopener"}:{}}function Rf({profile:e,projects:t,personalProjects:n}){ri(e.github),ri(e.linkedin),Wu(e.email),t.forEach(r=>{var i;(i=r.actions)==null||i.forEach(o=>{if(/^https:\/\//i.test(o.href)&&ri(o.href),/^\s*javascript:/i.test(o.href))throw new Error(`Unsafe project action link: ${o.label}`)})}),n.forEach(r=>{var i;(i=r.media)==null||i.forEach(o=>{["src","poster"].forEach(a=>{if(o[a]&&/^\s*javascript:/i.test(o[a]))throw new Error(`Unsafe media ${a} in ${r.meta}`)})})})}const Ss="/prerak-portfolio/",le={name:"Prerak Pandey",title:"Backend / Full-Stack Engineer",tagline:"building game-technology systems",location:"Chicago, IL · Open to Amsterdam / relocation",email:"prerak.pandey7@gmail.com",github:"https://github.com/prerak7-dev",linkedin:"https://www.linkedin.com/in/prerak-pandey",resume:ks(Ss,"Prerak_Pandey_Resume.pdf"),photo:ks(Ss,"profile-photo.png")},qe=[{id:"hero",label:"Intro",title:"Backend + Game Tech",note:"positioning"},{id:"tab-content",label:"Content",title:"Tabbed Portfolio",note:"selected view"},{id:"contact",label:"Contact",title:"Next Step",note:"links"}],tr=[{number:"01",title:"Aegis Animation Pipeline",eyebrow:"Java / Spring Boot / Redis / Kafka",architectureKey:"pipeline",summary:"Designed an asynchronous processing system that decouples motion-data ingestion, transformation, job state, validation, and Unreal export.",tags:["Java","Spring Boot","Kafka","Redis","JSON","Validation"],flow:["mocap","ingest","kafka","redis","json","unreal"],caseStudy:[["Problem","Motion data work can become brittle when ingestion, processing, retries, and export concerns live in the same path."],["Role","Designed the service boundaries, job-state model, validation flow, and Unreal-facing output contract."],["Architecture","Spring Boot services communicate across Kafka topics while Redis tracks progress, metadata, retries, and failure state."],["Decision","Kept async boundaries explicit so processing can fail, retry, or be inspected without blocking ingest or export."],["Evidence","Repository includes the pipeline source, service structure, JSON overlay contract, and validation-oriented implementation."],["Result","A traceable path from uploaded motion data to Unreal-importable procedural animation overlays."]],bullets:["Kafka-separated ingestion, processing, validation, and publishing flow.","Redis-backed job state for progress tracking, retries, and fault isolation.","JSON overlay output designed for Unreal procedural-animation import.","Clear async boundaries between service responsibilities and Unreal-facing artifacts."],actions:[{label:"View repository",href:"https://github.com/prerak7-dev/AegisMotionSandbox"},{label:"See architecture",href:"#pipeline-architecture"}]},{number:"02",title:"Aegis Motion Plugin",eyebrow:"Unreal Engine C++ / Editor Tooling",architectureKey:"plugin",summary:"A curve-driven Unreal Engine plugin for procedural animation authoring, runtime pose driving, data-asset workflows, and debug visualization.",tags:["Unreal C++","Data Assets","Editor Tools","Animation Curves","Blueprint API"],flow:["data asset","curves","driver","blueprint","debug","runtime"],caseStudy:[["Problem","Procedural animation tools need authorable data, runtime controls, and editor visibility to be useful during iteration."],["Role","Built the Unreal-side tool surface: data assets, runtime driver behavior, debug overlays, and Blueprint-facing integration."],["Architecture","Animation curves and data assets drive runtime pose behavior while editor tooling keeps iteration inspectable."],["Decision","Favored explicit authored assets over hidden runtime assumptions so designers and engineers can reason about motion changes."],["Evidence","Repository contains the Unreal sandbox and plugin work that connects generated motion data to in-engine workflows."],["Result","A practical bridge from backend-generated animation data into Unreal authoring and runtime experimentation."]],bullets:["Procedural motion driver using authored data assets and animation curves.","Runtime smoothing, action playback, debug overlays, and editor-first iteration.","Designed to connect backend-generated animation data to Unreal workflows.","Exposes motion behavior through practical editor and Blueprint-facing surfaces."],actions:[{label:"View repository",href:"https://github.com/prerak7-dev/AegisMotionSandbox"},{label:"See architecture",href:"#plugin-architecture"}]},{number:"03",title:"Aegis Telemetry Analytics Tool",eyebrow:"Analytics / Telemetry / Tooling",architectureKey:"telemetry",summary:"A telemetry analytics project for turning event streams and gameplay/system signals into inspectable trends, operational questions, and engineering feedback.",tags:["Telemetry","Analytics","Data Modeling","Dashboards","Developer Tools"],flow:["events","ingest","model","query","signals","insight"],caseStudy:[["Problem","Raw telemetry is difficult to use when events are not shaped into clear questions, trends, and decisions."],["Role","Built the project as a separate analytics-focused proof point to show data workflow, product thinking, and engineering range beyond the animation pipeline."],["Architecture","Synthetic traffic flows into a FastAPI collector, through Redpanda topics, into a realtime processor, then into ClickHouse tables that power the Streamlit dashboard."],["Decision","Keeps the analytics surface separate from the animation pipeline so the work shows a different production-adjacent context."],["Evidence","Repository provides the implementation space for telemetry modeling, analysis views, and documentation as the tool evolves."],["Result","Adds a distinct data-platform project beside the Aegis game-tech systems and broadens the technical evidence set."]],bullets:["Frames telemetry as product and engineering evidence, not just raw event logging.","Separates event shape, analysis questions, and presentation concerns.","Adds a third project context beyond animation pipeline and Unreal plugin work.","Designed to grow into dashboards, test fixtures, sample events, and benchmark notes."],actions:[{label:"View repository",href:"https://github.com/prerak7-dev/AegisTelemetryAnalyticTool"},{label:"See architecture",href:"#telemetry-architecture"}]}],Df=[["Data Sources","Mocap · BVH · JSON · client/CMS data"],["Ingest Service","Validation, normalization, job creation"],["Kafka Topics","Async message boundaries between services"],["Processors","Curve generation and overlay shaping"],["Redis State","Progress, metadata, retry/fault isolation"],["JSON Overlays","Unreal-ready procedural animation output"],["Unreal Import","Data assets, curves, runtime driver"]],Qu=[["Data Sources","Motion files, JSON payloads, or client data enter the system as source records."],["Ingest Service","The Spring Boot service validates the request, normalizes the payload, and creates a trackable job."],["Kafka Topics","Each major step publishes or consumes messages so slow processing does not block ingestion."],["Processors","Worker services transform the source data into curve and overlay data for procedural animation."],["Redis State","Redis stores job progress, metadata, retry state, and failure details that the API can report."],["JSON Overlays","The pipeline writes Unreal-facing JSON that describes the generated procedural motion output."],["Unreal Import","The Unreal side can turn the exported data into assets, curves, and runtime driver inputs."]],Ku=[["Attach Component","Add UAegisProceduralActionComponent to the character that owns procedural action state."],["Action Asset","Create or import a UAegisProceduralActionAsset that defines timing, curves, and affected channels."],["Gameplay Trigger","In the Character Blueprint, call StartAction when input or gameplay state should trigger the action."],["Anim Driver","Place the Aegis procedural motion driver after the base locomotion pose in the Anim Blueprint."],["State Binding","Point the driver at the character/component state so runtime playback can read active action data."],["Runtime Inspect","Play in editor and use debug tools to inspect timing, curves, and applied transforms."]],fa=["Locomotion State Machine","Cached Base Pose","Aegis Procedural Motion Driver","Output Pose"],Yu=["Confirm that the character owns an AegisProceduralActionComponent.","Confirm that StartAction is called with a valid action asset.","Confirm that normalized time moves from 0 to 1.","Confirm that expected curve channels have keys.","Confirm that the affected bone names match the active skeleton.","Confirm that debug scrub mode is disabled during normal runtime playback."],Xu=[["Simulator","A synthetic gameplay/server/network generator produces local demo traffic for normal load, physics spikes, login surges, replication overload, and weekend-event meltdowns."],["FastAPI Collector","Collector endpoints receive telemetry events, accept supported source profiles, validate request shape, and expose health and metrics endpoints."],["Redpanda Topics","Kafka-compatible topics decouple event collection from processing and model the partitioned stream used by a live-service backend."],["Realtime Processor","Python processors consume events, run rolling-window aggregation, score incidents, and attach evidence for recommendations."],["ClickHouse Storage","ClickHouse stores raw events, aggregates, quality failures, incidents, snapshots, and optional production tables for realtime OLAP queries."],["Streamlit Dashboard","The dashboard reads ClickHouse data for command-center views, incident drilldowns, data quality, scaling readiness, rules, timelines, and analyst tooling."]],Gu=["Use regional collectors and partitioned Kafka-compatible streams when traffic grows beyond one local collector.","Keep hot realtime aggregates in ClickHouse and move older or cheaper data to warm/cold storage paths.","Apply backpressure and adaptive sampling so collector overload does not hide the most important telemetry.","Use recommendation rules, evidence, confidence, owners, validation plans, and guardrail metrics to make incidents actionable.","Production path: Kubernetes, Flink or Kafka Streams, ClickHouse clusters, object storage, OpenAPI contracts, Prometheus, Grafana, and SLO dashboards."],Zu=[["Backend & Services",["Java","Spring Boot","C#",".NET","Node.js","REST APIs","GraphQL"]],["Cloud & Delivery",["AWS","S3","Cognito","IAM","Lambda","Docker","Git","CI/CD"]],["Game Tech",["Unreal Engine C++","Anim Blueprints","Mocap","Data Assets","Editor Tools"]],["Data & DevOps",["Kafka","Redis","SQL/PostgreSQL","MySQL","Logging","Monitoring"]]],Ju={pipeline:[["Backend Runtime",["Java","Spring Boot","REST APIs","Validation","Service Boundaries"]],["Async Processing",["Kafka","Topic Design","Workers","Retries","Fault Isolation"]],["State & Output",["Redis","Job Progress","JSON Overlays","Unreal Import Contract"]],["Developer Evidence",["Repository Structure","Pipeline Docs","Sample Payloads","Implementation Notes"]]],plugin:[["Unreal Runtime",["Unreal Engine C++","Actor Components","Anim Blueprint Nodes","Runtime Pose Flow"]],["Authoring Model",["Data Assets","Animation Curves","Blueprint API","StartAction Trigger"]],["Debugging",["Console Variables","Driver Logs","Debug Visualization","Normalized Time Checks"]],["Integration Surface",["Locomotion Additive Layer","Skeleton/Bone Mapping","Editor Iteration"]]],telemetry:[["Collection & Stream",["FastAPI","Redpanda","Kafka-Compatible Topics","Source Profiles"]],["Processing & Storage",["Python Processors","Rolling Windows","ClickHouse","Raw + Aggregate Tables"]],["Analysis Surface",["Streamlit","Incident Drilldowns","Data Quality","Scaling Readiness"]],["Production Readiness",["OpenAPI","Prometheus","Grafana","Load Tests","Recommendation Rules"]]]},qu=[{meta:"Jul 2021 - Apr 2024 / Des Plaines, IL",title:"Web Application Developer",subtitle:"Americaneagle.com",body:"Built and maintained enterprise Sitecore and headless web applications for insurance, nonprofit, medical/scientific, and data-sector clients across CMS integrations, cloud services, CI/CD deployments, reporting tools, and client delivery.",bullets:["Worked across backend services, frontend integration, QA cycles, deployments, and stakeholder-facing delivery.","Translated ambiguous client requirements into maintainable implementation plans and production releases."]},{meta:"Dec 2017 - May 2021 / Mahwah, NJ",title:"Student Data Analyst",subtitle:"Ramapo College of New Jersey",body:"Analyzed academic and non-academic data to support advising allocation, reporting, and student-success planning while automating recurring reporting workflows.",bullets:["Built a practical foundation in data cleaning, analysis, reporting, and operational communication.","Turned institutional data into recommendations that could be used by advising and planning teams."]}],ed=[{meta:"2017 - 2021 / Mahwah, NJ",title:"Ramapo College of New Jersey",subtitle:"Applied computing, analytics, and systems foundation",body:"Developed the academic base for software engineering, data analysis, reporting workflows, and technical communication while working in a student data role.",bullets:["Combined coursework with hands-on institutional data analysis and recurring reporting responsibilities.","Built the habits that now show up in backend design: clarity, traceability, and practical delivery."]},{meta:"Ongoing",title:"Independent Technical Study",subtitle:"Backend systems, game technology, and production tooling",body:"Continues building systems around async services, cloud delivery, Unreal tooling, procedural animation, and content pipeline architecture.",bullets:["Connects service architecture with game-production workflows through hands-on systems work.","Focuses on production-adjacent systems that are visible, explainable, and extensible."]}],nr=[{meta:"Photography",title:"Visual Field Notes",subtitle:"Composition, light, cities, landscapes",body:"A personal practice for noticing detail, framing atmosphere, and building a sharper eye for environments and visual storytelling.",bullets:["Street, travel, portrait, and landscape-oriented collections.","Useful creative muscle for game worlds, mood, and presentation."],media:[{type:"photo",src:"",alt:"City light and architectural framing study",meta:"Photo / Urban study",caption:"A placeholder slot for a city, street, or architecture frame with notes about light, texture, and composition."},{type:"photo",src:"",alt:"Landscape atmosphere and depth study",meta:"Photo / Landscape",caption:"A place to collect outdoor compositions, weather, mountain silhouettes, skyline layers, or wide environmental shots."},{type:"video",src:"",poster:"",alt:"Short motion study from a photo walk",meta:"Video / Motion note",caption:"A short clip slot for movement, ambient detail, camera tests, or environmental reference gathered during a walk."}]},{meta:"Writing",title:"Essays, Notes, and Narrative Sketches",subtitle:"Reflection, technical storytelling, creative work",body:"Writing as a way to clarify ideas, document experiences, and shape technical or personal material into something readable and memorable.",bullets:["Short-form reflective writing and project narratives.","A bridge between engineering detail and human context."],media:[{type:"photo",src:"",alt:"Writing desk, draft, or notebook image",meta:"Photo / Draft context",caption:"A visual cover slot for an essay, notebook scan, workspace image, or thematic reference connected to a piece of writing."},{type:"photo",src:"",alt:"Narrative sketch or essay cover image",meta:"Photo / Essay cover",caption:"A caption space for the idea behind a personal essay, technical reflection, project narrative, or creative sketch."},{type:"video",src:"",poster:"",alt:"Reading, voice note, or process clip",meta:"Video / Process",caption:"A video slot for a reading excerpt, process note, recorded thought, or short context clip around a written piece."}]},{meta:"Travel / Adventure",title:"Experience-Led Exploration",subtitle:"Places, movement, and perspective",body:"Travel and adventure experiences feed the portfolio world-building sensibility: routes, weather, terrain, culture, and the feeling of moving through a place.",bullets:["Designed to expand into location-specific stories, galleries, or field logs.","Pairs naturally with photography and writing sections."],media:[{type:"photo",src:"",alt:"Route, trail, or destination field image",meta:"Photo / Field log",caption:"A slot for travel memories, trail references, city routes, or the first image in a location-specific adventure note."},{type:"video",src:"",poster:"",alt:"Adventure movement or travel atmosphere clip",meta:"Video / Movement",caption:"A clip slot for road movement, weather, terrain, arrival moments, or ambient details from a trip."},{type:"photo",src:"",alt:"Culture, food, people, or place detail",meta:"Photo / Place detail",caption:"A caption area for the small details that make a place memorable: textures, signs, rituals, meals, or quiet moments."}]}],Wn=[{id:"portfolio",label:"Engineering Case Studies",kicker:"01 / Systems",summary:"Selected technical work with direct repositories, architecture decisions, implementation evidence, and Unreal-facing game-technology context.",blocks:[{type:"projects"}]},{id:"professional",label:"Professional Timeline",kicker:"02 / Work",summary:"A detailed professional track from data analysis into production web engineering and client-facing delivery.",blocks:[{type:"timeline",eyebrow:"Professional timeline",title:"Production web engineering plus data-analysis roots.",items:qu},{type:"stack"}]},{id:"education",label:"Education Timeline",kicker:"03 / Learning",summary:"Academic foundation and ongoing technical study behind the engineering, data, and game-technology work.",blocks:[{type:"timeline",eyebrow:"Education timeline",title:"Academic foundation, self-directed study, and technical growth.",items:ed}]},{id:"personal",label:"Personal Projects",kicker:"04 / Outside Work",summary:"Creative and exploratory projects that shape the visual, narrative, and experiential side of the portfolio.",blocks:[{type:"personal",eyebrow:"Personal projects",title:"Photography, writing, travel, and adventure experiences."}]}],td={0:["Clear","clear"],1:["Mainly clear","clear"],2:["Partly cloudy","cloud"],3:["Overcast","cloud"],45:["Fog","fog"],48:["Rime fog","fog"],51:["Light drizzle","drizzle"],53:["Drizzle","drizzle"],55:["Dense drizzle","rain"],56:["Freezing drizzle","snow"],57:["Dense freezing drizzle","snow"],61:["Slight rain","rain"],63:["Rain","rain"],65:["Heavy rain","heavy-rain"],66:["Freezing rain","snow"],67:["Heavy freezing rain","snow"],71:["Slight snow","snow"],73:["Snow","snow"],75:["Heavy snow","heavy-snow"],77:["Snow grains","snow"],80:["Rain showers","rain"],81:["Rain showers","rain"],82:["Violent rain showers","heavy-rain"],85:["Snow showers","snow"],86:["Heavy snow showers","heavy-snow"],95:["Thunderstorm","storm"],96:["Thunderstorm with hail","storm"],99:["Heavy thunderstorm with hail","storm"]},ma={clear:"Clear glow",cloud:"Cloud cover",fog:"Fog",drizzle:"Drizzle",rain:"Rain","heavy-rain":"Heavy rain",storm:"Lightning",snow:"Snow","heavy-snow":"Heavy snow"},wt=["snow","rain","storm","cloud","clear"];Rf({profile:le,projects:tr,personalProjects:nr});[le,qe,tr,Df,Qu,Ku,fa,Yu,Xu,Gu,Zu,Ju,qu,ed,nr,Wn,td,ma,wt].forEach(e=>Hu(e));const Af="/prerak-portfolio/assets/lore-guide-persona-B54Kk0ne.png";function cl({direction:e="right"}){return c.jsxs("svg",{className:`sketch-pointer ${e}`,viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[c.jsx("path",{className:"sketch-pointer-shadow",d:"M4.7 3.4c.9-.8 2.2-.7 3.1.1l8 7.5c.7.7.7 1.8 0 2.5l-8 7.1c-.9.8-2.3.8-3.1-.1-.8-.9-.7-2.2.2-3l6-5.3-6.1-5.7c-.9-.8-1-2.2-.1-3.1Zm-1.2 6.8c.7-.6 1.7-.6 2.3 0l2.1 1.9-2.1 1.9c-.7.6-1.7.6-2.3 0-.6-.7-.6-1.7.1-2.3l.2-.2-.2-.2c-.7-.6-.7-1.6-.1-2.3Z"}),c.jsx("path",{d:"M4 2.7c.9-.8 2.2-.7 3.1.1l8.6 8c.8.7.8 1.9 0 2.6l-8.6 7.7c-.9.8-2.3.7-3.1-.2-.8-.9-.7-2.2.2-3l6.5-5.8-6.5-6.1c-.9-.8-.9-2.2-.2-3.1Zm-1.3 6.8c.7-.6 1.7-.6 2.4 0l2.7 2.4-2.7 2.4c-.7.6-1.8.5-2.4-.2-.6-.7-.5-1.8.2-2.4l.3-.2-.3-.3c-.7-.6-.8-1.7-.2-2.4Z"})]})}function js(){return c.jsx("img",{src:le.photo,alt:le.name,className:"profile-avatar"})}function ul({children:e}){return c.jsx("span",{className:"chip",children:e})}const $f={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};function Es(e,t=!1){const n=String(e||"").trim();if(!n||/ongoing|present|current/i.test(n))return null;const r=n.match(/^([A-Za-z]{3,})\s+(\d{4})$/);if(r){const o=$f[r[1].slice(0,3).toLowerCase()]??0;return new Date(Number(r[2]),o+(t?1:0),t?0:1)}const i=n.match(/^(\d{4})$/);return i?new Date(Number(i[1]),t?11:0,t?31:1):null}function Of(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function If(e){return e.toLocaleDateString(void 0,{month:"short",year:"numeric"})}function Ff(e){let t=null;const n=["#ef4444","#0891b2","#f97316","#a3e635","#f8c84e","#9ca3af"];return e.map((r,i)=>{const o=String(r.meta||"").split("/")[0].trim(),a=/ongoing|present|current/i.test(o),[l,s]=o.includes(" - ")?o.split(" - "):[o,o],f=t?Of(t,1):new Date(new Date().getFullYear(),0,1),h=Es(l)||f,v=a?new Date:Es(s,!0)||h;return t=v,{...r,sourceIndex:i,startDate:h,endDate:v,rangeLabel:a?`${If(h)} - Present`:o,shortStart:h.getFullYear(),icon:Uf(r),color:n[i%n.length]}}).sort((r,i)=>r.startDate-i.startDate)}function Uf(e){const t=`${e.title} ${e.subtitle}`.toLowerCase();return t.includes("data")||t.includes("analyst")||t.includes("analytics")?"analytics":t.includes("college")||t.includes("education")||t.includes("academic")?"school":t.includes("study")||t.includes("learning")?"menu_book":t.includes("developer")||t.includes("application")||t.includes("software")?"code":t.includes("tool")||t.includes("backend")||t.includes("system")?"extension":"work"}function Bf(e){const t=new Date(Math.min(...e.map(r=>r.startDate.getTime()))),n=new Date(Math.max(...e.map(r=>r.endDate.getTime())));return t.setMonth(0,1),n.setMonth(11,31),{start:t,end:n,startLabel:String(t.getFullYear()),endLabel:n.getFullYear()===new Date().getFullYear()?"Present":String(n.getFullYear())}}function Cs(e,t){const n=t.end.getTime()-t.start.getTime();return n<=0?0:Math.max(0,Math.min(100,(e.getTime()-t.start.getTime())/n*100))}function Vf({weather:e,setWeather:t,weatherPower:n,setWeatherPower:r,activeSector:i,liveWeather:o,timeProfile:a,weatherStatus:l,weatherError:s,onUseLiveWeather:f,onInteract:h,fallTheme:v,setFallTheme:m,springTheme:y,setSpringTheme:p,winterTheme:k,setWinterTheme:A}){var P;const[d,u]=T.useState(!1),g=(o==null?void 0:o.condition)||`Manual ${ma[e]||e}`,x=()=>{h==null||h();const j=wt.indexOf(e);t(wt[((j===-1?0:j)+1)%wt.length])},b=()=>{h==null||h();const j=wt.indexOf(e);t(wt[((j===-1?0:j)-1+wt.length)%wt.length])},S=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});return c.jsxs("aside",{className:`floating-hud ${d?"collapsed":""}`,"aria-label":"Exploration controls",children:[c.jsx("button",{type:"button",className:"overlay-collapse-button hud-collapse-button","aria-label":d?"Expand explorer HUD":"Collapse explorer HUD","aria-expanded":!d,onClick:()=>u(j=>!j),children:c.jsx(cl,{direction:d?"up":"down"})}),c.jsxs("div",{className:"hud-content","aria-hidden":d,children:[c.jsxs("div",{className:"hud-status",children:[c.jsx("span",{children:"Explorer HUD"}),c.jsxs("strong",{children:[((P=qe[i])==null?void 0:P.label)||"Intro"," sector"]}),c.jsxs("small",{children:[a.label," · ",g]})]}),c.jsxs("div",{className:"hud-row",children:[c.jsx("button",{className:v?"active fall-weather-button":"fall-weather-button",onClick:()=>{h==null||h(),m(j=>!j),p(!1),A(!1)},children:"Fall"}),c.jsx("button",{className:y?"active spring-weather-button":"spring-weather-button",onClick:()=>{h==null||h(),p(j=>!j),m(!1),A(!1)},children:"Spring"}),c.jsx("button",{className:k?"active winter-weather-button":"winter-weather-button",onClick:()=>{h==null||h(),A(j=>!j),m(!1),p(!1)},children:"Winter"})]}),c.jsxs("div",{className:"hud-row particle-cycle-row","aria-label":"Weather particle selector",children:[c.jsx("button",{type:"button",className:"particle-arrow","aria-label":"Previous weather particle",onClick:b,children:"<"}),c.jsx("button",{type:"button",className:"particle-label","aria-label":"Current weather particle",onClick:x,children:ma[e]||e}),c.jsx("button",{type:"button",className:"particle-arrow","aria-label":"Next weather particle",onClick:x,children:">"})]}),c.jsx("div",{className:"hud-row",children:c.jsx("button",{onClick:()=>{h==null||h(),f()},children:l==="loading"?"Syncing…":"Live local weather"})}),c.jsxs("label",{className:"intensity-control",children:[c.jsx("span",{children:"Atmosphere"}),c.jsx("input",{type:"range",min:"0.35",max:"1.7",step:"0.05",value:n,onChange:j=>{h==null||h(),r(Number(j.target.value))}})]}),c.jsx("small",{className:"hud-note",children:o?`${Math.round(o.temp)}° · wind ${Math.round(o.wind)} km/h · ${o.location}`:s||`${S} local browser time · weather optional`})]})]})}function Hf({activeSector:e,activeContentTab:t,hudInteracted:n}){var g;const[r,i]=T.useState(!1),o=((g=qe[e])==null?void 0:g.id)||"hero",a=(t==null?void 0:t.id)||"portfolio",l=T.useMemo(()=>n?o==="hero"?{lines:["Use Start exploring to jump into the tabbed lore, or use the left Explore panel to move between Intro, Content, and Contact."]}:o==="contact"?{lines:["You are in the contact zone now. Use the links here when you want the practical exits: resume, GitHub, LinkedIn, or email."]}:a==="portfolio"?{lines:["Use the project subtabs to switch case studies. Scan each one for problem, role, architecture, evidence, and repository links."]}:a==="professional"?{lines:["Click a timeline card to zoom it forward. Click outside the timeline to settle it back into place."]}:a==="education"?{lines:["Use the same card-click behavior to inspect each academic milestone without leaving the timeline."]}:a==="personal"?{lines:["Switch between Photography, Writing, and Travel. Pick a side media card to swap it into the main display."]}:{lines:["Use the tabs, timeline cards, media swaps, and side navigation to move through the lore at your own pace."]}:{lines:["I see you have stumbled upon my lore! I am not an AI here to assist you, but just a mere persona of myself to give you some tips on navigating my lore.","Start with the Explorer HUD on the bottom right. Try a season button, cycle the particle arrows, or move the Atmosphere slider."]},[o,n,a]),[s,f]=T.useState(l),[h,v]=T.useState("entering"),[m,y]=T.useState(0),p=l.lines.join("|"),k=s.lines.join("|"),A=s.lines.join(`
`),d=T.useMemo(()=>{let x=m;return s.lines.map(b=>{const S=Math.max(0,Math.min(b.length,x));return x-=b.length+1,b.slice(0,S)})},[s.lines,m]),u=T.useMemo(()=>{let x=0;for(let b=0;b<s.lines.length;b+=1){const S=x+s.lines[b].length;if(m<=S)return b;x=S+1}return Math.max(0,s.lines.length-1)},[s.lines,m]);return T.useEffect(()=>{if(p===k)return;v("exiting");const x=window.setTimeout(()=>{f(l),v("entering")},210);return()=>window.clearTimeout(x)},[k,l,p]),T.useEffect(()=>{y(0);const x=A.length,b=window.setInterval(()=>{y(S=>S>=x?(window.clearInterval(b),S):S+1)},18);return()=>window.clearInterval(b)},[k,A]),c.jsxs("aside",{className:`lore-guide ${r?"collapsed":""}`,"aria-label":"Lore navigation guide",children:[c.jsx("button",{type:"button",className:"lore-guide-toggle","aria-label":r?"Expand lore guide":"Collapse lore guide","aria-expanded":!r,onClick:()=>i(x=>!x),children:c.jsx(cl,{direction:r?"right":"left"})}),c.jsx("div",{className:"lore-guide-face","aria-hidden":"true",children:c.jsx("img",{src:Af,alt:""})}),c.jsx("div",{className:`lore-guide-copy ${h}`,children:d.map((x,b)=>c.jsxs("p",{children:[x,b===u&&c.jsx("span",{className:"lore-type-caret","aria-hidden":"true"})]},`${s.lines[b]}-${b}`))},k)]})}function Wf({activeSector:e,activeContentTab:t}){const[n,r]=T.useState(!1),i=qe.map(o=>o.id==="tab-content"?{...o,label:t.label,title:t.label,note:t.kicker}:o);return c.jsxs("aside",{className:`mission-map ${n?"collapsed":""}`,"aria-label":"Portfolio sector map",children:[c.jsx("button",{type:"button",className:"overlay-collapse-button map-collapse-button","aria-label":n?"Expand side navigation":"Collapse side navigation","aria-expanded":!n,onClick:()=>r(o=>!o),children:c.jsx(cl,{direction:n?"right":"left"})}),c.jsxs("div",{className:"mission-map-content","aria-hidden":n,children:[c.jsx("strong",{children:"Explore"}),i.map((o,a)=>c.jsxs("a",{href:`#${o.id}`,className:e===a?"active":"",children:[c.jsx("span",{children:String(a+1).padStart(2,"0")}),c.jsx("em",{children:o.label})]},o.id))]})]})}function Dt({eyebrow:e,title:t,children:n}){return c.jsxs("div",{className:"section-heading split",children:[c.jsxs("div",{children:[c.jsx("p",{className:"eyebrow",children:e}),c.jsx("h2",{children:t})]}),n&&c.jsx("p",{children:n})]})}function Qf({project:e}){const t=e.flow||["mocap","ingest","kafka","redis","json","unreal"];return c.jsxs("article",{className:"project-card panel-card","data-tilt":!0,children:[c.jsx("div",{className:"card-glow"}),c.jsxs("div",{className:"project-topline",children:[c.jsx("span",{children:e.number}),c.jsx("em",{children:e.eyebrow})]}),c.jsx("div",{className:"project-visual","aria-hidden":"true",children:t.map((n,r)=>c.jsxs("div",{className:"flow-node",children:[c.jsx("span",{children:n}),r<t.length-1&&c.jsx("em",{children:"→"})]},n))}),c.jsx("h3",{children:e.title}),c.jsx("p",{children:e.summary}),c.jsx("div",{className:"chip-row",children:e.tags.map(n=>c.jsx(ul,{children:n},n))}),e.caseStudy&&c.jsx("dl",{className:"project-case-study",children:e.caseStudy.map(([n,r])=>c.jsxs("div",{children:[c.jsx("dt",{children:n}),c.jsx("dd",{children:r})]},n))}),c.jsx("ul",{children:e.bullets.map(n=>c.jsx("li",{children:n},n))}),e.actions&&c.jsx("div",{className:"project-actions","aria-label":`${e.title} actions`,children:e.actions.map(n=>c.jsx("a",{href:n.href,...ii(n.href),children:n.label},n.label))})]})}function Kf(){const[e,t]=T.useState(0),n=tr[e]||tr[0];return c.jsxs("div",{className:"project-detail-tabs",children:[c.jsx("div",{className:"project-detail-list",role:"tablist","aria-label":"Project case studies",children:tr.map((r,i)=>c.jsxs("button",{type:"button",id:`project-tab-${i}`,role:"tab","aria-selected":e===i,"aria-controls":"project-detail-panel",className:e===i?"active":"",onClick:()=>t(i),children:[c.jsx("span",{children:r.number}),c.jsx("strong",{children:r.title}),c.jsx("em",{children:r.eyebrow})]},r.title))}),c.jsxs("div",{id:"project-detail-panel",className:"project-detail-panel",role:"tabpanel","aria-labelledby":`project-tab-${e}`,children:[c.jsx(Qf,{project:n}),c.jsx(nd,{project:n}),c.jsx(Yf,{project:n})]})]})}function Yf({project:e}){const t=Ju[e==null?void 0:e.architectureKey]||[];return t.length?c.jsxs("section",{className:"tabbed-subsection project-stack-section",children:[c.jsx(Dt,{eyebrow:`${e.title} stack`,title:"Technology used in this project.",children:"This stack is scoped to the selected project, so the architecture and implementation tools stay connected."}),c.jsx("div",{className:"stack-grid project-stack-grid",children:t.map(([n,r])=>c.jsxs("article",{className:"panel-card","data-tilt":!0,children:[c.jsx("h3",{children:n}),c.jsx("div",{children:r.map(i=>c.jsx(ul,{children:i},i))})]},n))})]}):null}function Xf({tabs:e,activeTabId:t,onTabChange:n}){const r=e.find(i=>i.id===t)||e[0];return c.jsx("section",{className:"profile-tabs","aria-label":"Portfolio content tabs",children:c.jsx("div",{className:"profile-tab-list",role:"tablist","aria-label":"Portfolio content categories",children:e.map(i=>c.jsxs("button",{type:"button",id:`profile-tab-${i.id}`,role:"tab","aria-selected":r.id===i.id,"aria-controls":"tab-content",className:r.id===i.id?"active":"",onClick:()=>n(i.id),children:[c.jsx("span",{children:i.kicker}),c.jsx("strong",{children:i.label})]},i.id))})})}function Gf({items:e}){const t=T.useMemo(()=>Ff(e),[e]),[n,r]=T.useState(null),i=T.useRef(null),o=T.useMemo(()=>Bf(t),[t]);return T.useEffect(()=>{r(a=>a==null?null:Math.min(a,Math.max(0,t.length-1)))},[t.length]),T.useEffect(()=>{if(n==null)return;const a=l=>{var s;(s=i.current)!=null&&s.contains(l.target)||r(null)};return document.addEventListener("pointerdown",a),()=>document.removeEventListener("pointerdown",a)},[n]),t.length?c.jsx("div",{ref:i,className:"date-timeline-system",children:c.jsxs("div",{className:"date-timeline-rail","aria-label":"Interactive date timeline infographic",children:[c.jsx("div",{className:"date-timeline-trunk","aria-hidden":"true"}),c.jsx("span",{className:"date-timeline-boundary start",children:o.startLabel}),c.jsx("span",{className:"date-timeline-boundary end",children:o.endLabel}),t.map((a,l)=>{var m;const s=Cs(a.startDate,o),f=Cs(a.endDate,o),h=Math.min(86,Math.max(14,(s+f)/2)),v=l%2===0?"left":"right";return c.jsxs("button",{type:"button",className:`date-timeline-node ${v} ${l===n?"active":""}`,style:{"--timeline-y":`${h}%`,"--node-color":a.color},"aria-label":`Zoom details for ${a.title}, ${a.rangeLabel}`,"aria-pressed":l===n,onClick:()=>r(l),children:[c.jsx("span",{className:"date-timeline-branch","aria-hidden":"true"}),c.jsxs("span",{className:"date-timeline-orb",children:[c.jsx("em",{children:a.shortStart}),c.jsx("strong",{children:a.title}),c.jsx("small",{children:a.subtitle})]}),c.jsx("span",{className:"date-timeline-icon",children:c.jsx(Zf,{name:a.icon})}),c.jsxs("span",{className:"date-timeline-detail-copy",children:[c.jsx("span",{className:"date-timeline-detail-meta",children:a.rangeLabel}),c.jsx("span",{className:"date-timeline-detail-body",children:a.body}),((m=a.bullets)==null?void 0:m.length)>0&&c.jsx("span",{className:"date-timeline-detail-list",children:a.bullets.map(y=>c.jsx("span",{children:y},y))})]})]},`${a.meta}-${a.title}`)})]})}):null}function Zf({name:e}){const t={work:"M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2Zm-6 0h-4V4h4v2Z",analytics:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM8 17H6v-7h2v7Zm5 0h-2V7h2v10Zm5 0h-2v-4h2v4Z",code:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z",school:"M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13.5L5 12.69V16c0 1.1 3.13 3 7 3s7-1.9 7-3v-3.31l-7 3.81Z",menu_book:"M21 4.5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5C10.55 4.4 8.45 4 6.5 4S2.45 4.4 1 5.5v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 19.95 5.05 19.5 6.5 19.5c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V5.5c-.6-.45-1.25-.75-2-1Z",extension:"M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-2 .9-2 2v3.8h1.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11Z"};return c.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:c.jsx("path",{d:t[e]||t.work})})}function Jf(){const[e,t]=T.useState(0),[n,r]=T.useState(0),i=nr[e]||nr[0],o=i.media||[],a=o[n]||o[0];return T.useEffect(()=>{r(0)},[e]),c.jsxs("div",{className:"personal-subtabs",children:[c.jsx("div",{className:"personal-subtab-list",role:"tablist","aria-label":"Personal project categories",children:nr.map((l,s)=>c.jsxs("button",{type:"button",role:"tab","aria-selected":s===e,className:s===e?"active":"",onClick:()=>t(s),children:[c.jsx("span",{children:String(s+1).padStart(2,"0")}),c.jsx("strong",{children:l.meta})]},l.meta))}),c.jsxs("article",{className:"personal-subtab-panel panel-card","data-tilt":!0,children:[c.jsxs("div",{className:"personal-subtab-heading",children:[c.jsx("p",{children:i.meta}),c.jsx("h3",{children:i.title}),c.jsx("span",{children:i.subtitle})]}),c.jsx("p",{className:"personal-subtab-body",children:i.body}),c.jsx(qf,{project:i,mediaItems:o,activeMedia:a,activeMediaIndex:n,onSelect:r})]})]})}function qf({project:e,mediaItems:t,activeMedia:n,activeMediaIndex:r,onSelect:i}){const o=e.meta.toLowerCase().replace(/[^a-z0-9]+/g,"-"),a=T.useRef(null),l=T.useRef(new Map),s=t.map((v,m)=>({item:v,index:m})).filter(({index:v})=>v!==r),f=v=>{if(v===r)return;const m=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(m){i(v);return}if(typeof document<"u"&&document.startViewTransition&&!m){document.startViewTransition(()=>{pa.flushSync(()=>i(v))});return}h(v)},h=v=>{const m=r,y=a.current,p=l.current.get(v);if(!y||!p||typeof document>"u"){i(v);return}const k=y.getBoundingClientRect(),A=p.getBoundingClientRect(),d=zs(y,k),u=zs(p,A);pa.flushSync(()=>i(v)),requestAnimationFrame(()=>{var b,S;const g=(b=a.current)==null?void 0:b.getBoundingClientRect(),x=(S=l.current.get(m))==null?void 0:S.getBoundingClientRect();Ps(u,A,g),Ps(d,k,x||A)})};return n?c.jsxs("div",{className:"personal-media-experience","aria-label":`${e.meta} media and captions`,children:[c.jsxs("figure",{ref:a,className:"personal-featured-media",style:{viewTransitionName:`personal-media-${o}-${r}`},children:[c.jsx(Ns,{item:n,index:r,featured:!0}),c.jsxs("figcaption",{children:[c.jsx("span",{children:n.meta}),c.jsx("strong",{children:n.alt}),c.jsx("p",{children:n.caption})]})]}),c.jsx("div",{className:"personal-media-feed",role:"list","aria-label":`${e.meta} selectable media`,children:s.map(({item:v,index:m})=>c.jsxs("button",{ref:y=>{y?l.current.set(m,y):l.current.delete(m)},style:{viewTransitionName:`personal-media-${o}-${m}`},type:"button",role:"listitem",className:"personal-media-card","aria-pressed":"false",onClick:()=>f(m),children:[c.jsx("span",{className:"personal-media-index",children:String(m+1).padStart(2,"0")}),c.jsx("span",{className:"personal-media-thumb","aria-hidden":"true",children:c.jsx(Ns,{item:v,index:m,compact:!0})}),c.jsxs("span",{className:"personal-media-copy",children:[c.jsx("em",{children:v.meta}),c.jsx("strong",{children:v.alt}),c.jsx("span",{children:v.caption})]})]},`${e.meta}-${v.meta}-${m}`))})]}):null}function zs(e,t){const n=e.cloneNode(!0);return n.classList.add("personal-swap-clone"),Object.assign(n.style,{position:"fixed",left:`${t.left}px`,top:`${t.top}px`,width:`${t.width}px`,height:`${t.height}px`,margin:"0",pointerEvents:"none",transformOrigin:"top left",viewTransitionName:"none"}),document.body.appendChild(n),n}function Ps(e,t,n){if(!e||!n){e==null||e.remove();return}const r=640,i=n.left-t.left,o=n.top-t.top,a=n.width/Math.max(t.width,1),l=n.height/Math.max(t.height,1);e.animate([{opacity:1,transform:"translate(0, 0) scale(1, 1)"},{opacity:.98,transform:`translate(${i}px, ${o}px) scale(${a}, ${l})`}],{duration:r,easing:"cubic-bezier(.2,.78,.16,1)",fill:"forwards"}),window.setTimeout(()=>{e.remove()},r+80)}function Ns({item:e,index:t,compact:n=!1,featured:r=!1}){const i=e.type==="video";return e.src?i?c.jsx("video",{src:e.src,poster:e.poster||void 0,controls:r,muted:n,preload:"metadata","aria-label":e.alt}):c.jsx("img",{src:e.src,alt:n?"":e.alt,loading:"lazy"}):c.jsxs("span",{className:`personal-media-placeholder ${n?"compact":""}`,"aria-label":n?void 0:e.alt,children:[c.jsxs("span",{children:[i?"Video":"Photo"," ",String(t+1).padStart(2,"0")]}),c.jsx("strong",{children:n?e.type:e.alt})]})}function nd({project:e=null}){const t=(e==null?void 0:e.architectureKey)||"all",n=t==="all"||t==="pipeline",r=t==="all"||t==="plugin",i=t==="all"||t==="telemetry";return c.jsxs("section",{id:"architecture",className:"tabbed-subsection architecture-system",children:[n&&c.jsxs("article",{id:"pipeline-architecture",className:"architecture-panel panel-card","data-tilt":!0,children:[c.jsx(Dt,{eyebrow:"Pipeline architecture",title:"From motion data to Unreal-ready procedural animation JSON.",children:"The backend pipeline separates ingestion, asynchronous processing, job state, validation, and Unreal-facing export artifacts."}),c.jsx("div",{className:"pipeline",children:Qu.map(([o,a],l)=>c.jsxs("article",{children:[c.jsx("span",{children:String(l+1).padStart(2,"0")}),c.jsx("h3",{children:o}),c.jsx("p",{children:a})]},o))})]}),r&&c.jsxs("article",{id:"plugin-architecture",className:"architecture-panel plugin-architecture-panel panel-card","data-tilt":!0,children:[c.jsx(Dt,{eyebrow:"Plugin runtime architecture",title:"Procedural action playback layered after locomotion.",children:"The Unreal plugin keeps base movement separate from short-lived procedural action layers, making runtime behavior easier to trigger, inspect, and reason about."}),c.jsx("div",{className:"pipeline plugin-workflow",children:Ku.map(([o,a],l)=>c.jsxs("article",{children:[c.jsx("span",{children:String(l+1).padStart(2,"0")}),c.jsx("h3",{children:o}),c.jsx("p",{children:a})]},o))}),c.jsxs("div",{className:"plugin-architecture-details",children:[c.jsxs("article",{className:"plugin-placement-card",children:[c.jsx("span",{children:"Recommended Anim Blueprint placement"}),c.jsx("div",{className:"plugin-placement-flow","aria-label":"Recommended Anim Blueprint placement",children:fa.map((o,a)=>c.jsxs("div",{children:[c.jsx("strong",{children:o}),a<fa.length-1&&c.jsx("em",{children:"↓"})]},o))}),c.jsx("p",{children:"This placement keeps the system additive: base locomotion remains responsible for normal movement, while Aegis contributes short-lived procedural action layers."})]}),c.jsxs("article",{className:"plugin-debug-card",children:[c.jsx("span",{children:"Debugging"}),c.jsx("code",{children:"aegis.Motion.DebugProceduralDriver 0"}),c.jsx("p",{children:"Common values: 0 = off, 1 = log procedural driver state, 2 = draw debug visualization."}),c.jsx("ul",{children:Yu.map(o=>c.jsx("li",{children:o},o))})]})]})]}),i&&c.jsxs("article",{id:"telemetry-architecture",className:"architecture-panel telemetry-architecture-panel panel-card","data-tilt":!0,children:[c.jsx(Dt,{eyebrow:"Telemetry architecture",title:"Realtime gameplay performance intelligence.",children:"The telemetry tool follows the README flow: generate gameplay/server events, collect them through FastAPI, stream them through Redpanda, process rolling windows, store raw and aggregate data in ClickHouse, then inspect incidents and recommendations in Streamlit."}),c.jsx("div",{className:"pipeline telemetry-workflow",children:Xu.map(([o,a],l)=>c.jsxs("article",{children:[c.jsx("span",{children:String(l+1).padStart(2,"0")}),c.jsx("h3",{children:o}),c.jsx("p",{children:a})]},o))}),c.jsxs("div",{className:"telemetry-architecture-details",children:[c.jsxs("article",{className:"telemetry-scaling-card",children:[c.jsx("span",{children:"Developer flow"}),c.jsx("p",{children:"Run the Docker stack, generate scenario traffic from the simulator, then use the dashboard to inspect regions, servers, time windows, hot zones, incident evidence, data quality, and scaling readiness."})]}),c.jsxs("article",{className:"telemetry-scaling-card",children:[c.jsx("span",{children:"Production scaling story"}),c.jsx("ul",{children:Gu.map(o=>c.jsx("li",{children:o},o))})]})]})]})]})}function em(){return c.jsxs("section",{className:"tabbed-subsection stack-section",children:[c.jsx(Dt,{eyebrow:"Professional technical stack",title:"Backend reliability, cloud delivery, game tooling, and data workflows.",children:"A broader view of the tools and domains used across production work, portfolio systems, and ongoing technical study."}),c.jsx("div",{className:"stack-grid",children:Zu.map(([e,t])=>c.jsxs("article",{className:"panel-card","data-tilt":!0,children:[c.jsx("h3",{children:e}),c.jsx("div",{children:t.map(n=>c.jsx(ul,{children:n},n))})]},e))})]})}function tm({block:e,tab:t}){return e.type==="projects"?c.jsxs("section",{className:"tabbed-subsection",children:[c.jsx(Dt,{eyebrow:"Engineering case studies",title:"Projects with proof attached.",children:"Problem, role, architecture, decisions, implementation evidence, and direct repository links for each project."}),c.jsx(Kf,{})]}):e.type==="architecture"?c.jsx(nd,{}):e.type==="stack"?c.jsx(em,{}):e.type==="timeline"?c.jsxs("section",{className:"tabbed-subsection",children:[c.jsx(Dt,{eyebrow:e.eyebrow,title:e.title,children:t.summary}),c.jsx(Gf,{items:e.items})]}):e.type==="personal"?c.jsxs("section",{className:"tabbed-subsection",children:[c.jsx(Dt,{eyebrow:e.eyebrow,title:e.title,children:t.summary}),c.jsx(Jf,{})]}):null}function nm({tab:e}){return c.jsxs("div",{className:"tab-pane","data-active-tab":e.id,children:[c.jsxs("div",{className:"tab-pane-header",children:[c.jsxs("div",{children:[c.jsx("p",{children:e.kicker}),c.jsx("h2",{children:e.label})]}),c.jsx("span",{children:e.summary})]}),c.jsx("div",{className:"tab-pane-body",children:e.blocks.map((t,n)=>c.jsx(tm,{block:t,tab:e},`${e.id}-${t.type}-${n}`))})]})}async function rm(e,t,n){const r=Number(e),i=Number(t),o=Number.isFinite(r)&&Number.isFinite(i)?`${r.toFixed(2)}, ${i.toFixed(2)}`:"Approximate location";try{if(!Number.isFinite(r)||!Number.isFinite(i))throw new Error("Invalid coordinates");const a=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(r)}&longitude=${encodeURIComponent(i)}&localityLanguage=en`,l=await fetch(a);if(!l.ok)throw new Error("Location lookup failed");const s=await l.json(),f=s.locality||s.city||s.principalSubdivision,h=s.principalSubdivisionCode||s.principalSubdivision,v=s.countryCode||s.countryName;return[f,h,v].map(Wi).filter(Boolean).filter((m,y,p)=>p.indexOf(m)===y).join(", ")||o}catch{return o}}function Ts(e=new Date){const t=e.getHours()+e.getMinutes()/60;return t>=5&&t<9?{key:"dawn",label:"Dawn"}:t>=9&&t<17?{key:"day",label:"Day"}:t>=17&&t<20.5?{key:"dusk",label:"Dusk"}:{key:"night",label:"Night"}}function wr(e,t,n){return Math.min(n,Math.max(t,e))}function im({mode:e,weather:t,weatherPower:n,activeSector:r,scrollProgress:i,timeProfile:o,fallTheme:a,springTheme:l,winterTheme:s}){const f=T.useRef(null),h=T.useRef({x:.55,y:.45,down:!1}),v=T.useRef(new Set),m=T.useRef({mode:e,weather:t,weatherPower:n,activeSector:r,scrollProgress:i,timeProfile:o,fallTheme:a,springTheme:l,winterTheme:s});return T.useEffect(()=>{m.current={mode:e,weather:t,weatherPower:n,activeSector:r,scrollProgress:i,timeProfile:o,fallTheme:a,springTheme:l,winterTheme:s}},[e,t,n,r,i,o,a,l,s]),T.useEffect(()=>{const y=f.current,p=y.getContext("2d"),k=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let A=0,d=window.innerWidth,u=window.innerHeight,g=1;const x=[],b=[];let S="";const P={dawn:["#020202","#181818","#f7f7f7"],day:["#050505","#222222","#ffffff"],dusk:["#010101","#121212","#eeeeee"],night:["#000000","#0c0c0c","#ffffff"]};function j(){d=window.innerWidth,u=window.innerHeight,g=Math.min(window.devicePixelRatio||1,2),y.width=Math.floor(d*g),y.height=Math.floor(u*g),y.style.width=`${d}px`,y.style.height=`${u}px`,p.setTransform(g,0,0,g,0,0),b.length=0,pe(!0);for(let N=0;N<120;N+=1)b.push({x:Math.random()*d,y:Math.random()*u*.72,r:Math.random()*1.6+.2,a:Math.random()*.72+.12})}function Q(){return`${m.current.weather}:${Math.round(m.current.weatherPower*20)}`}function O(){const N=m.current.weather,L=N==="fog"||N==="cloud"?.6:N==="heavy-rain"||N==="heavy-snow"||N==="storm"?1.35:1;return Math.floor((k?50:160)*m.current.weatherPower*L)}function pe(N=!1){x.length=0,S=Q();const L=O();for(let F=0;F<L;F+=1)x.push(tt(Math.random()*d,N?Math.random()*u:-28))}function tt(N=Math.random()*d,L=-30){const F=m.current.weather,D=F==="snow"||F==="heavy-snow",$=F==="heavy-rain"||F==="heavy-snow"||F==="storm",R=F==="fog"||F==="cloud",I=F==="clear";return{x:N,y:L,r:R?Math.random()*34+18:I?Math.random()*1.8+.4:D?Math.random()*($?2.7:2)+.8:Math.random()*($?1.9:1.3)+.5,vx:R?Math.random()*.46-.23:I?Math.random()*.5-.25:D?Math.random()*1.1-.55:Math.random()*($?4.6:3.1)-($?2.3:1.55),vy:R?Math.random()*.18+.02:I?Math.random()*.35+.08:D?Math.random()*($?2.1:1.5)+.6:Math.random()*($?6.4:4.6)+(F==="drizzle"?2.2:3.4),life:Math.random()*100,a:R?Math.random()*.08+(F==="fog"?.08:.045):I?Math.random()*.22+.08:D?Math.random()*.48+.22:Math.random()*($?.56:.42)+.16,pulse:Math.random()*Math.PI*2}}function Ie(N){const L=m.current.fallTheme,F=m.current.springTheme,D=m.current.winterTheme,[$,R,I]=D?["#f8fdff","#bdeeff","#ffffff"]:F?["#edfdf7","#70c9e8","#0b6b4f"]:L?["#f7d39d","#f08a2e","#ffe36f"]:P[m.current.timeProfile.key]||P.night,Le=h.current,oe=p.createLinearGradient(0,0,0,u);oe.addColorStop(0,$),oe.addColorStop(.54,R),oe.addColorStop(1,D?"#e8f7ff":F?"#0b3028":L?"#421321":"#000000"),p.fillStyle=oe,p.fillRect(0,0,d,u);const C=d*(.68+(Le.x-.5)*.07),te=u*(.25+(Le.y-.5)*.05),he=p.createRadialGradient(C,te,0,C,te,d*.48);he.addColorStop(0,D?"rgba(90,150,184,.82)":F||L?`${I}4b`:"rgba(255,255,255,.86)"),he.addColorStop(.18,D?"rgba(90,150,184,.5)":F?"rgba(5,92,65,.28)":L?"rgba(73,19,35,.38)":"rgba(255,255,255,.64)"),he.addColorStop(.44,D?"rgba(90,150,184,.28)":F?"rgba(5,92,65,.12)":L?"rgba(73,19,35,.2)":"rgba(255,255,255,.36)"),he.addColorStop(1,D?"rgba(90,150,184,0)":F?"rgba(5,92,65,0)":L?"rgba(73,19,35,0)":"rgba(255,255,255,0)"),p.fillStyle=he,p.fillRect(0,0,d,u),p.save();const H=m.current.timeProfile.key==="day"?.23:1;b.forEach(Ce=>{p.beginPath(),p.fillStyle=D?`rgba(255,255,255,${Ce.a*.42})`:F?`rgba(246,255,255,${Ce.a*H})`:L?`rgba(255,242,178,${Ce.a*H})`:`rgba(255,255,255,${Ce.a*H})`,p.arc(Ce.x+(Le.x-.5)*22,Ce.y,Ce.r,0,Math.PI*2),p.fill()}),p.restore(),tn(C,te,N),Qe(N)}function tn(N,L,F){const D=m.current.fallTheme,$=m.current.springTheme,R=m.current.winterTheme;p.save(),p.translate(N,L),p.rotate(F*13e-5),p.shadowColor=R?"rgba(90,150,184,.98)":$?"rgba(3,92,60,.76)":D?"rgba(73,19,35,.82)":"rgba(255,255,255,1)",p.shadowBlur=R?42:$?18:D?16:104;for(let I=0;I<5;I+=1)p.beginPath(),p.strokeStyle=R?`rgba(90,150,184,${.9-I*.065})`:$?`rgba(3,92,60,${.56-I*.06})`:D?`rgba(73,19,35,${.62-I*.064})`:`rgba(255,255,255,${1-I*.032})`,p.lineWidth=D||$||R?1.65:3.9,p.arc(0,0,90+I*48,Math.PI*.08,Math.PI*(1.65-I*.05)),p.stroke();for(let I=0;I<16;I+=1)p.rotate(Math.PI/8),p.beginPath(),p.moveTo(132,0),p.lineTo(170,0),p.strokeStyle=R?"rgba(90,150,184,.86)":$?"rgba(2,71,49,.46)":D?"rgba(43,12,24,.5)":"rgba(255,255,255,1)",p.lineWidth=D||$||R?1.45:2.8,p.stroke();p.restore()}function nt(){const N=m.current.fallTheme,L=m.current.springTheme,F=m.current.winterTheme,D=d*.82,$=u*.22,R=p.createRadialGradient(D,$,0,D,$,Math.max(d,u)*.46);F?(R.addColorStop(0,"rgba(248,253,255,.68)"),R.addColorStop(.42,"rgba(189,238,255,.34)"),R.addColorStop(.78,"rgba(255,255,255,.1)")):L?(R.addColorStop(0,"rgba(237,253,247,.64)"),R.addColorStop(.42,"rgba(112,201,232,.34)"),R.addColorStop(.78,"rgba(17,119,86,.1)")):N?(R.addColorStop(0,"rgba(247,211,157,.72)"),R.addColorStop(.42,"rgba(247,211,157,.42)"),R.addColorStop(.78,"rgba(247,211,157,.12)")):(R.addColorStop(0,"rgba(0,0,0,.98)"),R.addColorStop(.5,"rgba(0,0,0,.88)"),R.addColorStop(.8,"rgba(10,10,10,.46)")),R.addColorStop(1,"rgba(2,7,13,0)"),p.save(),p.globalCompositeOperation="source-over",p.fillStyle=R,p.fillRect(0,0,d,u),p.restore()}function be(N){const L=h.current;(m.current.winterTheme?[[u*.48,130,"#dff7ff",.48,.5],[u*.58,96,"#9ed8f2",.7,1.1],[u*.67,72,"#5a96b8",.9,1.7]]:m.current.springTheme?[[u*.48,130,"#70c9e8",.46,.5],[u*.58,96,"#2fb986",.68,1.1],[u*.67,72,"#0b5948",.92,1.7]]:m.current.fallTheme?[[u*.48,130,"#f47c23",.58,.5],[u*.58,96,"#a33a31",.76,1.1],[u*.67,72,"#491323",.96,1.7]]:[[u*.48,130,"#4a4a4a",.58,.5],[u*.58,96,"#2a2a2a",.78,1.1],[u*.67,72,"#080808",.95,1.7]]).forEach(([D,$,R,I,Le])=>{p.beginPath(),p.moveTo(-120,u);for(let oe=-120;oe<=d+140;oe+=90){const C=oe+(L.x-.5)*42*Le,te=D-Math.abs(Math.sin((oe+N*.018)*.006))*$;p.lineTo(C,te),p.lineTo(C+48,D+Math.sin(oe*.04)*7)}p.lineTo(d+140,u),p.closePath(),p.globalAlpha=I,p.fillStyle=R,p.fill(),p.globalAlpha=1})}function Qe(N){const L=u*.18,F=d*.13,D=d*.87;p.save();const $=m.current.fallTheme,R=m.current.springTheme,I=m.current.winterTheme;p.globalAlpha=R||$||I?.55:1,p.strokeStyle=I?"rgba(90,150,184,.68)":R?"rgba(3,92,60,.42)":$?"rgba(73,19,35,.42)":"rgba(255,255,255,.94)",p.lineWidth=R||$||I?2.2:3.8,p.setLineDash([9,18]),p.beginPath(),p.moveTo(F,L),p.bezierCurveTo(d*.28,L-40,d*.44,L+44,d*.55,L+5),p.bezierCurveTo(d*.7,L-42,d*.8,L+52,D,L+8),p.stroke(),p.setLineDash([]),qe.forEach((Le,oe)=>{const C=qe.length===1?0:oe/(qe.length-1),te=F+(D-F)*C,he=L+Math.sin(C*Math.PI*3+N*8e-4)*22,H=oe===m.current.activeSector;p.beginPath(),p.fillStyle=H?I?"rgba(90,150,184,1)":R?"rgba(3,92,60,.94)":$?"rgba(73,19,35,.94)":"rgba(255,255,255,1)":I?"rgba(90,150,184,.68)":R?"rgba(3,92,60,.42)":$?"rgba(73,19,35,.38)":"rgba(255,255,255,.94)",!R&&!$&&!I&&(p.fillStyle=H?"rgba(255,255,255,1)":"rgba(255,255,255,.94)"),p.arc(te,he,!R&&!$&&!I?H?10.5:7:H?8.5:5.5,0,Math.PI*2),p.fill(),p.beginPath(),p.strokeStyle=H?I?"rgba(90,150,184,.84)":R?"rgba(3,92,60,.58)":$?"rgba(73,19,35,.56)":"rgba(255,255,255,.72)":I?"rgba(90,150,184,.42)":R?"rgba(3,92,60,.25)":$?"rgba(73,19,35,.22)":"rgba(255,255,255,.56)",!R&&!$&&!I&&(p.strokeStyle=H?"rgba(255,255,255,1)":"rgba(255,255,255,.76)",p.lineWidth=H?3.2:2.2),p.arc(te,he,!R&&!$&&!I?H?42+Math.sin(N*.004)*5:24:H?34+Math.sin(N*.004)*4:19,0,Math.PI*2),p.stroke()}),p.restore()}function E(){const N=m.current.weather,L=N==="snow"||N==="heavy-snow",F=N==="rain"||N==="heavy-rain"||N==="storm"||N==="drizzle",D=N==="fog"||N==="cloud",$=N==="clear",R=N==="heavy-rain"||N==="heavy-snow"||N==="storm",I=m.current.fallTheme,Le=m.current.springTheme,oe=m.current.winterTheme;if(p.save(),p.globalCompositeOperation=D?"source-over":"lighter",N==="storm"){const C=performance.now(),te=Math.max(0,Math.sin(C*.006)-.91)*6.8+Math.max(0,Math.sin(C*.017+1.8)-.965)*8;if(te>0){const he=oe?"90,150,184":Le?"184,245,95":I?"255,238,72":"255,255,255";p.fillStyle=oe?`rgba(255,255,255,${te*.16})`:Le?`rgba(236,255,247,${te*.14})`:I?`rgba(255,230,132,${te*.14})`:`rgba(255,255,255,${te*.18})`,p.fillRect(0,0,d,u);const H=Math.floor(C/720),Ce=d*(.28+H*37%46/100),dl=Math.sin(H*12.9898)*34,st=[{x:Ce+dl,y:-20}],pl=8;for(let re=1;re<=pl;re+=1){const nn=Math.sin(H*4.7+re*1.94)*48+Math.cos(C*.001+re)*12;st.push({x:Ce+dl*.4+nn,y:u*.62*re/pl})}const Qi=(re,nn,Cr)=>{p.save(),p.shadowColor=`rgba(${he},${re})`,p.shadowBlur=Cr,p.strokeStyle=`rgba(${he},${re})`,p.lineWidth=nn,p.lineJoin="miter",p.lineCap="round",p.beginPath(),st.forEach((zr,rd)=>{rd===0?p.moveTo(zr.x,zr.y):p.lineTo(zr.x,zr.y)}),p.stroke(),p.restore()};Qi(Math.min(1,te*.56),9,34),Qi(Math.min(1,te*.86),4.2,18),Qi(1,1.35,4);for(let re=2;re<st.length-1;re+=2){const nn=st[re].x+(re%4===0?-1:1)*(46+re*8),Cr=st[re].y+42+Math.sin(H+re)*18;p.save(),p.shadowColor=`rgba(${he},${Math.min(1,te*.7)})`,p.shadowBlur=14,p.strokeStyle=`rgba(${he},${Math.min(1,te*.72)})`,p.lineWidth=1.4,p.beginPath(),p.moveTo(st[re].x,st[re].y),p.lineTo((st[re].x+nn)*.5+Math.sin(re)*16,(st[re].y+Cr)*.5),p.lineTo(nn,Cr),p.stroke(),p.restore()}}}x.forEach(C=>{const te=h.current,he=te.down?1.55:.86;if(C.life+=.03,C.x+=C.vx*he+(te.x-.5)*(D?.45:L?1.1:F?3.4:.8),C.y+=C.vy*he,L&&(C.x+=Math.sin(C.life+C.y*.02)*.75),D&&(C.x+=Math.sin(C.life*.7+C.y*.004)*.25),$&&(C.y+=Math.sin(C.life+C.x*.02)*.05),(C.y>u+26||C.x<-90||C.x>d+90)&&Object.assign(C,tt(Math.random()*d,-28)),D){const H=C.a*(N==="cloud"?.72:1),Ce=p.createRadialGradient(C.x,C.y,0,C.x,C.y,C.r);Ce.addColorStop(0,oe?`rgba(255,255,255,${H})`:Le?`rgba(236,255,247,${H})`:I?`rgba(255,228,180,${H})`:`rgba(210,230,238,${H})`),Ce.addColorStop(1,"rgba(210,230,238,0)"),p.fillStyle=Ce,p.beginPath(),p.ellipse(C.x,C.y,C.r*1.9,C.r*.58,Math.sin(C.pulse)*.25,0,Math.PI*2),p.fill()}else if($){const H=C.a*(.45+Math.sin(C.life*2+C.pulse)*.25);p.beginPath(),p.fillStyle=oe?`rgba(90,150,184,${H})`:Le?`rgba(184,245,95,${H})`:I?`rgba(255,232,96,${H})`:`rgba(103,232,249,${H})`,p.arc(C.x,C.y,C.r,0,Math.PI*2),p.fill()}else if(L)p.beginPath(),p.fillStyle=oe?`rgba(255,255,255,${C.a})`:Le?`rgba(246,255,255,${C.a})`:I?`rgba(232,211,168,${C.a})`:`rgba(226,251,255,${C.a})`,p.arc(C.x,C.y,C.r,0,Math.PI*2),p.fill();else{p.strokeStyle=oe?`rgba(90,150,184,${C.a})`:Le?`rgba(80,210,238,${C.a})`:I?`rgba(198,132,67,${C.a})`:`rgba(255,255,255,${C.a})`,p.lineWidth=N==="drizzle"?Math.max(.7,C.r*.7):C.r,p.beginPath(),p.moveTo(C.x,C.y);const H=N==="drizzle"?18:R?48:32;p.lineTo(C.x-18-(te.x-.5)*18,C.y-H),p.stroke()}}),p.restore()}function _(N){S!==Q()&&pe(!0);const L=N;Ie(L),be(L),nt(),E(),A=window.requestAnimationFrame(_)}function M(N){h.current.x=wr(N.clientX/d,0,1),h.current.y=wr(N.clientY/u,0,1)}function B(N){v.current.add(N.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(N.code)&&N.preventDefault()}function Z(N){v.current.delete(N.code)}return j(),window.addEventListener("resize",j),window.addEventListener("pointermove",M,{passive:!0}),window.addEventListener("pointerdown",()=>{h.current.down=!0}),window.addEventListener("pointerup",()=>{h.current.down=!1}),window.addEventListener("keydown",B),window.addEventListener("keyup",Z),A=window.requestAnimationFrame(_),()=>{window.cancelAnimationFrame(A),window.removeEventListener("resize",j),window.removeEventListener("pointermove",M),window.removeEventListener("keydown",B),window.removeEventListener("keyup",Z)}},[]),c.jsx("canvas",{ref:f,className:"world-backdrop","aria-hidden":"true"})}function om(){const[e,t]=T.useState(()=>new Date);return T.useEffect(()=>{const n=window.setInterval(()=>t(new Date),3e4);return()=>window.clearInterval(n)},[]),e}function am(){const[e,t]=T.useState(0);return T.useEffect(()=>{const n=()=>{const r=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);t(wr(window.scrollY/r,0,1))};return n(),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),()=>{window.removeEventListener("scroll",n),window.removeEventListener("resize",n)}},[]),e}function lm(){T.useEffect(()=>{var n,r;const e=()=>{const i=window.visualViewport||window,o=i.width||window.innerWidth,a=i.height||window.innerHeight,l=18,s=document.querySelector(".floating-hud"),f=document.querySelector(".mission-map"),h=s?Math.min(1,(o-l*2)/s.offsetWidth,(a-l*2)/s.offsetHeight):1,v=f?Math.min(.9,(o-l*2)/f.offsetWidth,(a-l*2)/f.offsetHeight):.9;document.documentElement.style.setProperty("--hud-fit-scale",String(wr(h,.42,1))),document.documentElement.style.setProperty("--map-fit-scale",String(wr(v,.42,.9)))};e(),window.addEventListener("resize",e),window.addEventListener("orientationchange",e),(n=window.visualViewport)==null||n.addEventListener("resize",e),(r=window.visualViewport)==null||r.addEventListener("scroll",e);const t=window.setInterval(e,400);return()=>{var i,o;window.removeEventListener("resize",e),window.removeEventListener("orientationchange",e),(i=window.visualViewport)==null||i.removeEventListener("resize",e),(o=window.visualViewport)==null||o.removeEventListener("scroll",e),window.clearInterval(t)}},[])}function sm(){const[e,t]=T.useState(0);return T.useEffect(()=>{const n=()=>{const r=window.innerHeight*.44;let i=0;qe.forEach((o,a)=>{const l=document.getElementById(o.id);if(!l)return;l.getBoundingClientRect().top<=r&&(i=a)}),t(i)};return n(),window.addEventListener("scroll",n,{passive:!0}),window.addEventListener("resize",n),()=>{window.removeEventListener("scroll",n),window.removeEventListener("resize",n)}},[]),e}function cm(){T.useEffect(()=>{const t=Array.from(document.querySelectorAll("[data-tilt]")).map(n=>{const r=o=>{const a=n.getBoundingClientRect(),l=(o.clientX-a.left)/a.width-.5,s=(o.clientY-a.top)/a.height-.5;n.style.setProperty("--rx",`${(-s*4).toFixed(2)}deg`),n.style.setProperty("--ry",`${(l*5).toFixed(2)}deg`),n.style.setProperty("--mx",`${o.clientX-a.left}px`),n.style.setProperty("--my",`${o.clientY-a.top}px`)},i=()=>{n.style.setProperty("--rx","0deg"),n.style.setProperty("--ry","0deg")};return n.addEventListener("pointermove",r),n.addEventListener("pointerleave",i),()=>{n.removeEventListener("pointermove",r),n.removeEventListener("pointerleave",i)}});return()=>t.forEach(n=>n())},[])}function um(e,t,n,r){e==="snow"||e==="heavy-snow"?(t("snowboard"),n(e),r(e==="heavy-snow"?1.62:1.28)):e==="rain"||e==="heavy-rain"||e==="drizzle"||e==="storm"?(t("soccer"),n(e),r(e==="storm"?1.75:e==="heavy-rain"?1.58:e==="drizzle"?.92:1.2)):e==="fog"||e==="cloud"?(t("soccer"),n(e),r(e==="fog"?1.35:.98)):(t("soccer"),n("clear"),r(.72))}const dm=`
:root{color-scheme:dark;font-size:92%;--bg:#02070d;--panel:rgba(5,13,22,.76);--line:rgba(133,239,255,.18);--cyan:#22d3ee;--cyan2:#67e8f9;--gold:#fbbf24;--text:#f8fafc;--muted:#9fb0c7;--radius:32px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--bg);color:var(--text)}a{color:inherit;text-decoration:none}button,input{font:inherit}button{cursor:pointer}.site{position:relative;min-height:92vh;overflow:hidden;background:#02070d}.world-backdrop{position:fixed;inset:0;z-index:0;display:block;background:#02070d}.world-foreground{position:fixed;inset:0;z-index:18;display:block;pointer-events:none;filter:drop-shadow(0 0 18px rgba(34,211,238,.22))}.foreground-fade{position:fixed;left:0;right:0;bottom:0;height:17vh;z-index:17;pointer-events:none;background:linear-gradient(to bottom,rgba(2,7,13,0) 0%,rgba(2,7,13,.08) 42%,rgba(2,7,13,.34) 74%,rgba(2,7,13,.9) 100%);backdrop-filter:blur(.7px);mask-image:linear-gradient(to bottom,transparent 0,#000 42%,#000 100%)}.ambient-grid{pointer-events:none;position:fixed;inset:0;z-index:2;opacity:.78;background:linear-gradient(rgba(34,211,238,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.035) 1px,transparent 1px),radial-gradient(circle at 80% 20%,rgba(34,211,238,.14),transparent 28rem);background-size:72px 72px,72px 72px,auto;mask-image:linear-gradient(to bottom,#000 0%,#000 84%,transparent 100%)}.site:after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,rgba(2,7,13,.92) 0%,rgba(2,7,13,.46) 42%,rgba(2,7,13,.2) 100%),linear-gradient(to bottom,rgba(2,7,13,.28),rgba(2,7,13,.05) 42%,rgba(2,7,13,.92))}.nav-shell{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:50;display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(1240px,calc(100% - 28px));padding:12px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(0,0,0,.6);backdrop-filter:blur(22px);box-shadow:0 24px 90px rgba(0,0,0,.42)}.brand{display:flex;align-items:center;gap:12px;min-width:max-content}.brand strong{display:block;letter-spacing:.18em;text-transform:uppercase;font-size:.82rem}.brand small{display:block;margin-top:2px;color:var(--muted);font-size:.62rem;letter-spacing:.18em;text-transform:uppercase}.nav-shell nav{display:flex;gap:clamp(12px,2.4vw,30px);color:#dbeafe;font-size:.92rem}.nav-shell nav a{opacity:.84;transition:.2s}.nav-shell nav a:hover{color:var(--cyan);opacity:1}.nav-cta{border:1px solid rgba(251,191,36,.36);background:rgba(251,191,36,.1);color:#fde68a;padding:11px 18px;border-radius:999px;font-weight:900;white-space:nowrap}.mark{position:relative;width:38px;height:42px;filter:drop-shadow(0 0 15px rgba(34,211,238,.65));flex:0 0 auto}.mark i{position:absolute;bottom:2px;left:50%;width:4px;height:40px;border-radius:999px;background:linear-gradient(#fef3c7,#22d3ee);transform:translateX(-50%)}.mark i:nth-child(2){left:28%;height:32px;transform:rotate(-25deg)}.mark i:nth-child(3){left:72%;height:32px;transform:rotate(25deg)}.panel-card{position:relative;border:1px solid var(--line);background:linear-gradient(145deg,rgba(7,17,27,.82),rgba(3,8,14,.68));border-radius:var(--radius);box-shadow:0 28px 90px rgba(0,0,0,.38);backdrop-filter:blur(22px);overflow:hidden;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .16s ease,border-color .2s ease,opacity .28s ease;will-change:transform,opacity}.panel-card:before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(34,211,238,.16),transparent 42%);opacity:.78;pointer-events:none}.sector,.shortcut-rail{position:relative;z-index:8;width:min(1080px,calc(100% - 120px));margin:0 auto}.hero-sector{min-height:100vh;display:grid;grid-template-columns:minmax(0,.96fr) minmax(260px,.48fr);gap:20px;align-items:end;padding:118px 0 58px}.hero-copy{padding:clamp(22px,4vw,42px)}.eyebrow{margin:0 0 16px;color:var(--cyan);font-size:.78rem;font-weight:1000;letter-spacing:.22em;text-transform:uppercase}.hero-copy h1{margin:0;font-size:clamp(3.6rem,8.4vw,7.4rem);line-height:.82;letter-spacing:-.09em;text-transform:uppercase;text-shadow:0 0 28px rgba(103,232,249,.12)}.hero-copy h2{margin:26px 0 0;max-width:780px;font-size:clamp(1.45rem,2.6vw,2.55rem);line-height:1.05;letter-spacing:-.055em}.hero-copy h2 span,.footer-shell h2{color:var(--gold)}.hero-lede{margin:24px 0 0;max-width:720px;color:#d8e4f5;font-size:1.06rem;line-height:1.78}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.hero-actions a{border:1px solid rgba(133,239,255,.24);background:rgba(8,20,31,.78);padding:14px 18px;border-radius:17px;font-weight:1000}.hero-actions .primary-action{border:0;background:linear-gradient(135deg,#67e8f9,#22d3ee);color:#021018;box-shadow:0 0 38px rgba(34,211,238,.28)}.metrics-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:28px}.metrics-row span{border:1px solid rgba(133,239,255,.16);background:rgba(0,0,0,.28);border-radius:18px;padding:14px}.metrics-row strong{display:block}.metrics-row small{display:block;margin-top:4px;color:var(--muted)}.exploration-note{align-self:end;padding:24px}.exploration-note strong{display:block;color:#fde68a;font-size:1.25rem}.exploration-note p,.exploration-note small{display:block;color:#cbd5e1;line-height:1.65;margin:10px 0 0}.floating-hud{position:fixed;right:18px;bottom:18px;z-index:45;width:min(280px,calc(100% - 36px));border:1px solid rgba(133,239,255,.2);border-radius:24px;background:rgba(0,0,0,.5);backdrop-filter:blur(22px);box-shadow:0 22px 80px rgba(0,0,0,.46);padding:14px}.hud-status span{display:block;color:var(--cyan2);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;font-weight:1000}.hud-status strong{display:block;margin-top:5px}.hud-status small,.hud-note{display:block;color:#cbd5e1;line-height:1.45}.hud-row{display:flex;gap:8px;margin-top:10px}.hud-row button{flex:1;border:1px solid rgba(133,239,255,.2);border-radius:999px;background:rgba(6,15,24,.82);color:#e0f7ff;padding:9px 10px;font-weight:900}.hud-row button.active{border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);box-shadow:0 0 18px rgba(34,211,238,.2)}.intensity-control{display:flex;align-items:center;gap:10px;margin-top:12px;color:#dbeafe;font-weight:900}.intensity-control input{width:100%;accent-color:var(--cyan)}.hud-note{margin-top:10px}.mission-map{position:fixed;left:12px;top:50%;transform:translateY(-50%) scale(.9);transform-origin:left center;z-index:44;display:grid;gap:8px;padding:11px;border:1px solid rgba(133,239,255,.18);border-radius:26px;background:rgba(0,0,0,.42);backdrop-filter:blur(18px)}.mission-map strong{display:block;justify-self:start;color:#fde68a;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;padding:0 4px 4px}.mission-map a{display:grid;grid-template-columns:34px auto;align-items:center;gap:8px;min-width:128px;padding:6px;border:1px solid rgba(133,239,255,.12);border-radius:14px;background:rgba(4,12,20,.7);position:relative}.mission-map a span{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(133,239,255,.16);border-radius:50%;font-size:.75rem;font-weight:1000}.mission-map a em{font-style:normal;white-space:nowrap;color:#dffbff;opacity:.88}.mission-map a.active{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.35)}.mission-map a.active span{border-color:rgba(251,191,36,.4);color:#fde68a}.mission-map a.active em{color:#fde68a}.profile-avatar{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(133,239,255,.4);box-shadow:0 0 0 2px rgba(4,12,20,.8),0 0 18px rgba(34,211,238,.18);flex:0 0 auto}.shortcut-rail{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-top:-20px;margin-bottom:42px}.shortcut-card{padding:18px;min-height:128px}.shortcut-card span{display:block;color:var(--cyan);font-size:.72rem;text-transform:uppercase;letter-spacing:.16em;font-weight:1000}.shortcut-card strong{display:block;margin-top:10px;font-size:1.1rem;line-height:1.2}.shortcut-card em{display:block;margin-top:14px;color:#fde68a;font-style:normal;font-weight:1000}.section-wrap{padding:62px 0;scroll-margin-top:120px}.section-heading{margin-bottom:28px}.section-heading.split{display:grid;grid-template-columns:1fr minmax(280px,440px);gap:30px;align-items:end}.section-heading h2{margin:0;font-size:clamp(1.8rem,3.3vw,3.15rem);line-height:.96;letter-spacing:-.06em}.section-heading p:not(.eyebrow){margin:0;color:#cbd5e1;line-height:1.72}.project-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.project-card{padding:24px}.card-glow{position:absolute;inset:auto -20% -40% auto;width:60%;height:70%;background:radial-gradient(circle,rgba(34,211,238,.18),transparent 60%);pointer-events:none}.project-topline{display:flex;align-items:center;gap:12px}.project-topline span{display:grid;place-items:center;width:48px;height:48px;border:1px solid rgba(251,191,36,.36);border-radius:16px;color:#fde68a;font-weight:1000}.project-topline em{color:var(--cyan);font-style:normal;text-transform:uppercase;letter-spacing:.12em;font-size:.76rem;font-weight:1000}.project-visual{margin:20px 0;min-height:155px;border:1px solid rgba(133,239,255,.14);border-radius:26px;background:radial-gradient(circle at 50% 40%,rgba(34,211,238,.15),transparent 55%),rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:18px}.flow-node{display:flex;align-items:center;gap:8px}.flow-node span{display:grid;place-items:center;min-width:72px;min-height:54px;border:1px solid rgba(133,239,255,.22);border-radius:16px;color:#dffbff;text-transform:uppercase;font-weight:1000;font-size:.72rem}.flow-node em{color:var(--cyan);font-style:normal}.project-card h3{margin:0;font-size:clamp(1.45rem,2.1vw,2.05rem);letter-spacing:-.04em}.project-card p{color:#d4e3f3;line-height:1.7}.chip-row{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.chip{display:inline-flex;align-items:center;border:1px solid rgba(133,239,255,.17);border-radius:999px;background:rgba(3,10,17,.74);color:#e6fbff;padding:8px 11px;font-size:.82rem;font-weight:850}.project-card ul{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:10px;color:#cbd5e1}.project-card li:before{content:"✓";color:var(--cyan);margin-right:8px}.architecture-panel{padding:38px;border-radius:38px}.pipeline{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:10px}.pipeline article{position:relative;border:1px solid rgba(133,239,255,.15);background:rgba(0,0,0,.28);border-radius:24px;padding:18px;min-height:190px}.pipeline article:not(:last-child):after{content:"→";position:absolute;right:-13px;top:50%;transform:translateY(-50%);color:var(--cyan);font-weight:1000;z-index:3}.pipeline span{color:var(--gold);font-weight:1000}.pipeline h3{font-size:1rem}.pipeline p{color:#afc2d7;line-height:1.5;font-size:.9rem}.experience-grid,.stack-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.experience-card,.stack-grid article{padding:24px}.experience-card>p:first-child{margin:0;color:var(--gold);font-weight:900}.experience-card h3{margin:14px 0 4px;font-size:1.7rem}.experience-card h4{margin:0;color:var(--cyan)}.experience-card p:last-child{color:#cbd5e1;line-height:1.72}.stack-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.stack-grid h3{margin:0 0 16px;color:#dffbff}.stack-grid div{display:flex;flex-wrap:wrap;gap:8px}.footer-shell{z-index:8;display:flex;align-items:flex-start;justify-content:space-between;gap:26px;margin:62px auto 20px;padding:32px}.footer-shell>div:first-child{display:grid;justify-items:start;gap:10px}.footer-shell h2{margin:4px 0 0;font-size:clamp(1.8rem,3vw,3rem);letter-spacing:-.045em}.footer-shell p{color:#cbd5e1}.scroll-finish-spacer{position:relative;z-index:3;height:min(42vh,420px)}.contact-links{display:grid;gap:10px;min-width:min(420px,100%)}.contact-links a{border:1px solid rgba(133,239,255,.17);background:rgba(0,0,0,.28);border-radius:18px;padding:14px 16px}@media (max-width:1180px){.mission-map{display:none}.sector,.shortcut-rail{width:min(100% - 44px,1040px)}.hero-sector{grid-template-columns:1fr}.shortcut-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.project-grid,.experience-grid{grid-template-columns:1fr}.stack-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline{grid-template-columns:repeat(2,minmax(0,1fr))}.pipeline article:not(:last-child):after{display:none}}@media (max-width:760px){:root{font-size:85%}.world-foreground{z-index:7;opacity:.65}.nav-shell{align-items:flex-start;border-radius:28px}.nav-shell nav{display:none}.nav-cta{display:none}.sector,.shortcut-rail{width:min(100% - 22px,1240px)}.hero-sector{padding-top:120px}.hero-copy{padding:28px 20px}.hero-copy h1{font-size:clamp(3.4rem,18vw,6rem)}.metrics-row,.stack-grid,.section-heading.split,.shortcut-rail{grid-template-columns:1fr}.floating-hud{position:relative;right:auto;bottom:auto;width:min(100% - 22px,1240px);height:auto;margin:0 auto 30px;z-index:22;border-radius:28px}.floating-hud .hud-status strong,.floating-hud .hud-status small,.floating-hud .hud-row,.floating-hud .intensity-control,.floating-hud .hud-note{opacity:1;visibility:visible;max-height:220px}.footer-shell{display:block}.contact-links{margin-top:20px}.project-card{padding:18px}.project-visual{justify-content:flex-start}.flow-node span{min-width:62px}}:is(.panel-card,.nav-shell,.nav-cta,.hero-actions a,.metrics-row span,.floating-hud,.hud-row button,.mission-map,.mission-map a,.mission-map a span,.profile-avatar,.shortcut-card,.project-card,.project-topline span,.project-visual,.flow-node span,.chip,.architecture-panel,.pipeline article,.experience-card,.stack-grid article,.footer-shell,.contact-links a){border-radius:0!important;clip-path:polygon(0 0,calc(100% - var(--fold,18px)) 0,100% var(--fold,18px),100% 100%,0 100%)}.profile-avatar{object-fit:cover}.mark i{border-radius:0!important}.nav-shell{--fold:22px}.panel-card,.floating-hud,.mission-map{--fold:24px}.hud-row button,.chip,.nav-cta,.hero-actions a,.contact-links a{--fold:12px}`,pm=`
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
`,fm=`
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
  --lore-avatar-filter:sepia(.18) saturate(1.04) contrast(1.12) brightness(.76);
  --lore-avatar-tint:#2a1710;
  --lore-avatar-tint-strength:.28;
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
  --lore-avatar-filter:grayscale(1) contrast(1.22) brightness(.72);
  --lore-avatar-tint:#080808;
  --lore-avatar-tint-strength:.32;
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
  --lore-avatar-filter:sepia(.42) saturate(1.18) hue-rotate(-18deg) contrast(1.14) brightness(.74);
  --lore-avatar-tint:#491323;
  --lore-avatar-tint-strength:.38;
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
.site.fall-theme .panel-card:before{
  background:
    radial-gradient(420px circle at var(--mx,50%) var(--my,10%),rgba(198,132,67,.2),rgba(73,19,35,.12) 34%,transparent 46%);
}
.site.fall-theme .card-glow{
  background:radial-gradient(circle,rgba(198,132,67,.22),rgba(73,19,35,.1) 46%,transparent 64%);
}
.site.fall-theme :is(.project-visual,.pipeline article,.flow-node span,.project-case-study div,.project-actions a,.plugin-placement-card,.plugin-debug-card,.telemetry-scaling-card,.plugin-placement-flow strong,.plugin-debug-card code){
  border-color:rgba(232,211,168,.18);
  background:rgba(73,19,35,.22);
}
.site.fall-theme .project-visual{
  background:
    radial-gradient(circle at 50% 40%,rgba(198,132,67,.18),rgba(73,19,35,.08) 54%,transparent 68%),
    rgba(73,19,35,.22);
}
.site.fall-theme :is(.flow-node span,.project-actions a,.plugin-placement-flow strong){
  color:#fff1d2;
}
.site.fall-theme .project-detail-list{
  border-color:rgba(232,211,168,.18);
  background:rgba(73,19,35,.24);
}
.site.fall-theme .project-detail-list button{
  border-right-color:rgba(232,211,168,.14);
  background:rgba(55,24,25,.2);
}
.site.fall-theme .project-detail-list button:hover{
  background:rgba(198,132,67,.12);
}
.site.fall-theme .project-detail-list button.active{
  background:
    linear-gradient(180deg,rgba(216,154,69,.18),rgba(73,19,35,.1)),
    rgba(55,24,25,.36);
  box-shadow:inset 0 3px 0 #d89a45;
}
.site.fall-theme .project-detail-list button span{
  border-color:rgba(232,211,168,.24);
}
.site.fall-theme .project-detail-list button strong{
  color:#fff5df;
}
.site.fall-theme :is(.project-case-study dd,.plugin-placement-card p,.plugin-debug-card p,.telemetry-scaling-card p,.plugin-debug-card li,.telemetry-scaling-card li){
  color:#eadfc8;
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
  --lore-avatar-filter:sepia(.34) saturate(1.14) hue-rotate(78deg) contrast(1.12) brightness(.74);
  --lore-avatar-tint:#0b5948;
  --lore-avatar-tint-strength:.36;
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
  --lore-avatar-filter:sepia(.2) saturate(1.02) hue-rotate(164deg) contrast(1.12) brightness(.78);
  --lore-avatar-tint:#5a96b8;
  --lore-avatar-tint-strength:.36;
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
`,mm=`
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
.site.fall-theme :is(.panel-card,.nav-shell,.floating-hud,.mission-map,.project-card,.project-visual,.architecture-panel,.experience-card,.stack-grid article,.footer-shell)::after{
  background:linear-gradient(135deg,rgba(240,214,164,.32),rgba(198,132,67,.2) 42%,rgba(73,19,35,.62) 100%);
  border-left:1px solid rgba(232,211,168,.24);
  border-bottom:1px solid rgba(198,132,67,.2);
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
`,gm=`
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
  transition:opacity .34s ease,transform .34s cubic-bezier(.2,.78,.16,1),width .34s cubic-bezier(.2,.78,.16,1),padding .34s cubic-bezier(.2,.78,.16,1)!important;
}
.lore-guide-toggle{
  position:absolute!important;
  top:50%!important;
  right:52px!important;
  display:grid!important;
  place-items:center!important;
  width:34px!important;
  height:34px!important;
  border:0!important;
  background:transparent!important;
  color:var(--lore-accent)!important;
  padding:0!important;
  z-index:4!important;
  transform:translateY(-50%)!important;
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
.lore-guide-face:before{
  content:"";
  position:absolute;
  inset:0;
  z-index:2;
  background:var(--lore-avatar-tint);
  mix-blend-mode:color;
  opacity:var(--lore-avatar-tint-strength);
  pointer-events:none;
}
.lore-guide-face:after{
  content:"";
  position:absolute;
  inset:0;
  z-index:3;
  background:
    radial-gradient(circle at 28% 22%,color-mix(in srgb,var(--lore-ring) 26%,transparent),transparent 34%),
    linear-gradient(135deg,rgba(255,255,255,.18),transparent 32%),
    repeating-linear-gradient(-10deg,color-mix(in srgb,var(--lore-ring) 14%,transparent) 0 1px,transparent 1px 9px);
  mix-blend-mode:screen;
  opacity:.5;
  pointer-events:none;
}
.lore-guide-face img{
  position:relative;
  z-index:1;
  width:116%;
  height:116%;
  object-fit:cover;
  object-position:50% 34%;
  transform:translate(-6%,-5%) scale(1.06);
  filter:var(--lore-avatar-filter);
}
.lore-guide-copy{
  display:grid;
  gap:5px;
  min-width:0;
  min-height:92px;
  padding:14px 60px 14px 42px;
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
  opacity:0!important;
  pointer-events:none!important;
  transform:translateX(-10px) scale(.92)!important;
}
.lore-guide.collapsed .lore-guide-toggle{
  inset:6px!important;
  width:36px!important;
  height:36px!important;
  color:var(--text)!important;
  transform:none!important;
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
    padding:11px 48px 11px 32px;
  }
  .lore-guide-toggle{
    right:38px!important;
    width:30px!important;
    height:30px!important;
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
`,hm=`
.overlay-collapse-button{
  position:absolute;
  z-index:12;
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border:0;
  border-radius:0;
  background:transparent;
  color:var(--cyan2);
  font-weight:1000;
  line-height:1;
  box-shadow:none;
  clip-path:none!important;
  transition:transform .34s cubic-bezier(.2,.78,.16,1),color .22s ease,filter .22s ease,opacity .22s ease;
}
.overlay-collapse-button::after{
  content:none!important;
}
.overlay-collapse-button:hover{
  color:color-mix(in srgb,var(--cyan2) 84%,white);
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 40%,transparent));
}
.sketch-pointer{
  width:22px;
  height:22px;
  overflow:visible;
  fill:currentColor;
  stroke:none;
  transform-origin:50% 50%;
  filter:drop-shadow(1px 1.5px 0 rgba(0,0,0,.28));
  transition:transform .38s cubic-bezier(.2,.78,.16,1);
}
.sketch-pointer path{
  vector-effect:non-scaling-stroke;
}
.sketch-pointer-shadow{
  fill:rgba(0,0,0,.24);
  transform:translate(1.1px,1.3px);
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
  top:8px;
  right:8px;
}
.map-collapse-button{
  top:8px;
  right:-17px;
}
.hud-content{
  padding-right:0;
  opacity:1;
  transform:translateY(0) scale(1);
  transform-origin:right bottom;
  max-height:360px;
  overflow:hidden;
  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.16,1),max-height .34s cubic-bezier(.2,.78,.16,1);
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
  opacity:1;
  transform:translateX(0) scale(1);
  transform-origin:left center;
  max-width:180px;
  max-height:240px;
  overflow:hidden;
  transition:opacity .28s ease,transform .34s cubic-bezier(.2,.78,.16,1),max-width .34s cubic-bezier(.2,.78,.16,1),max-height .34s cubic-bezier(.2,.78,.16,1);
}
.floating-hud,
.mission-map{
  transition:width .34s cubic-bezier(.2,.78,.16,1),min-width .34s cubic-bezier(.2,.78,.16,1),height .34s cubic-bezier(.2,.78,.16,1),min-height .34s cubic-bezier(.2,.78,.16,1),padding .34s cubic-bezier(.2,.78,.16,1),transform .34s cubic-bezier(.2,.78,.16,1),opacity .28s ease,background .28s ease,border-color .28s ease,box-shadow .28s ease;
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
  opacity:0!important;
  transform:translateY(10px) scale(.92)!important;
  max-height:0!important;
  pointer-events:none!important;
}
.floating-hud.collapsed .hud-collapse-button{
  top:6px!important;
  right:6px!important;
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
  opacity:0!important;
  transform:translateX(-10px) scale(.92)!important;
  max-width:0!important;
  max-height:0!important;
  pointer-events:none!important;
}
.mission-map.collapsed .map-collapse-button{
  top:6px!important;
  right:6px!important;
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
.mission-map.collapsed .sketch-pointer,
.lore-guide.collapsed .sketch-pointer{
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
.tab-content .project-grid{
  grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));
}
.project-detail-tabs{
  display:grid;
  gap:0;
}
.project-detail-list{
  position:relative;
  z-index:3;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));
  align-items:stretch;
  border:1px solid rgba(255,255,255,.16);
  border-bottom:0;
  background:rgba(0,0,0,.24);
}
.project-detail-list button{
  display:grid;
  grid-template-columns:auto minmax(0,1fr);
  grid-template-areas:"num title" "num meta";
  gap:4px 10px;
  align-items:center;
  min-height:74px;
  padding:14px 16px;
  border:0;
  border-right:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.025);
  color:var(--text);
  text-align:left;
  clip-path:none!important;
}
.project-detail-list button:last-child{
  border-right:0;
}
.project-detail-list button:hover{
  background:rgba(255,255,255,.06);
}
.project-detail-list button.active{
  background:
    linear-gradient(180deg,color-mix(in srgb,var(--cyan) 14%,rgba(255,255,255,.06)),rgba(255,255,255,.025)),
    rgba(0,0,0,.2);
  box-shadow:inset 0 3px 0 var(--gold);
}
.project-detail-list button span{
  grid-area:num;
  display:grid;
  place-items:center;
  width:34px;
  height:34px;
  border:1px solid rgba(133,239,255,.22);
  color:var(--gold);
  font-weight:1000;
}
.project-detail-list button strong{
  grid-area:title;
  min-width:0;
  color:#f2fbf8;
  font-size:.86rem;
  line-height:1.1;
  text-transform:uppercase;
}
.project-detail-list button em{
  grid-area:meta;
  min-width:0;
  color:var(--muted);
  font-size:.66rem;
  font-style:normal;
  line-height:1.25;
}
.project-detail-panel{
  display:grid;
  padding-top:0;
}
.project-detail-panel .project-card{
  border-top-color:rgba(255,255,255,.16);
}
.tab-content .project-card,
.tab-content .experience-card,
.tab-content .stack-grid article{
  padding:32px;
}
.project-stack-section{
  gap:24px;
}
.project-stack-grid{
  grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));
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
.project-case-study{
  display:grid;
  gap:10px;
  margin:24px 0 0;
}
.project-case-study div{
  display:grid;
  grid-template-columns:minmax(76px,.28fr) minmax(0,1fr);
  gap:12px;
  padding:11px 12px;
  border:1px solid rgba(133,239,255,.14);
  background:rgba(0,0,0,.2);
}
.project-case-study dt{
  color:var(--gold);
  font-size:.67rem;
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.project-case-study dd{
  margin:0;
  color:#d4e3f3;
  font-size:.84rem;
  line-height:1.48;
}
.project-actions{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:24px;
}
.project-actions a{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:38px;
  padding:10px 13px;
  border:1px solid rgba(133,239,255,.22);
  background:rgba(4,12,20,.7);
  color:#e6fbff;
  font-size:.78rem;
  font-weight:900;
  letter-spacing:.05em;
  text-transform:uppercase;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);
}
.project-actions a:hover{
  border-color:color-mix(in srgb,var(--cyan2) 72%,white);
  color:var(--cyan2);
  filter:drop-shadow(0 0 8px color-mix(in srgb,var(--cyan) 30%,transparent));
}
.tab-content .architecture-panel{
  padding:44px;
  scroll-margin-top:132px;
}
.tab-content .architecture-panel{
  margin-top:0;
}
.architecture-system{
  scroll-margin-top:132px;
}
.plugin-architecture-panel,
.telemetry-architecture-panel{
  display:grid;
  gap:30px;
}
.plugin-workflow,
.telemetry-workflow{
  grid-template-columns:repeat(6,minmax(0,1fr));
}
.plugin-architecture-details,
.telemetry-architecture-details{
  display:grid;
  grid-template-columns:minmax(260px,.9fr) minmax(280px,1.1fr);
  gap:18px;
}
.plugin-placement-card,
.plugin-debug-card,
.telemetry-scaling-card{
  border:1px solid rgba(133,239,255,.15);
  background:rgba(0,0,0,.24);
  padding:22px;
  color:#d4e3f3;
}
.plugin-placement-card > span,
.plugin-debug-card > span,
.telemetry-scaling-card > span{
  display:block;
  color:var(--gold);
  font-size:.72rem;
  font-weight:1000;
  letter-spacing:.08em;
  text-transform:uppercase;
}
.plugin-placement-flow{
  display:grid;
  gap:8px;
  margin:18px 0;
}
.plugin-placement-flow div{
  display:grid;
  gap:8px;
}
.plugin-placement-flow strong{
  display:block;
  border:1px solid rgba(133,239,255,.18);
  background:rgba(4,12,20,.68);
  color:#e6fbff;
  padding:12px 14px;
  text-align:center;
  text-transform:uppercase;
  font-size:.78rem;
}
.plugin-placement-flow em{
  color:var(--cyan);
  font-style:normal;
  font-weight:1000;
  text-align:center;
}
.plugin-placement-card p,
.plugin-debug-card p,
.telemetry-scaling-card p{
  margin:12px 0 0;
  color:#cbd5e1;
  line-height:1.6;
}
.plugin-debug-card code{
  display:block;
  margin-top:16px;
  padding:12px 14px;
  border:1px solid rgba(133,239,255,.18);
  background:rgba(0,0,0,.36);
  color:var(--cyan2);
  white-space:normal;
}
.plugin-debug-card ul,
.telemetry-scaling-card ul{
  display:grid;
  gap:9px;
  margin:18px 0 0;
  padding:0;
  list-style:none;
}
.plugin-debug-card li,
.telemetry-scaling-card li{
  color:#cbd5e1;
  line-height:1.45;
}
.plugin-debug-card li:before,
.telemetry-scaling-card li:before{
  content:"/";
  color:var(--cyan);
  margin-right:8px;
  font-weight:1000;
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
.site.winter-theme .project-case-study dd,
.site.winter-theme .project-actions a,
.site.winter-theme .project-detail-list button,
.site.winter-theme .project-detail-list button strong,
.site.winter-theme .project-detail-list button em,
.site.winter-theme .plugin-placement-card,
.site.winter-theme .plugin-debug-card,
.site.winter-theme .telemetry-scaling-card,
.site.winter-theme .plugin-placement-card p,
.site.winter-theme .plugin-debug-card p,
.site.winter-theme .plugin-debug-card li,
.site.winter-theme .telemetry-scaling-card p,
.site.winter-theme .telemetry-scaling-card li,
.site.winter-theme .plugin-placement-flow strong,
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
.site.winter-theme .project-case-study div,
.site.winter-theme .project-actions a{
  border-color:rgba(5,5,5,.18);
  background:rgba(255,255,255,.44);
}
.site.winter-theme .project-detail-list{
  border-color:rgba(5,5,5,.18);
  background:rgba(255,255,255,.34);
}
.site.winter-theme .project-detail-list button{
  border-color:rgba(5,5,5,.14);
  background:rgba(255,255,255,.28);
}
.site.winter-theme .project-detail-list button.active{
  background:rgba(255,255,255,.58);
}
.site.winter-theme .plugin-placement-card,
.site.winter-theme .plugin-debug-card,
.site.winter-theme .telemetry-scaling-card,
.site.winter-theme .plugin-placement-flow strong,
.site.winter-theme .plugin-debug-card code{
  border-color:rgba(5,5,5,.18);
  background:rgba(255,255,255,.44);
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
    max-width:100%;
    min-width:0;
    overflow:visible;
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
    min-width:0;
  }
  .project-detail-tabs,
  .project-detail-panel,
  .project-detail-panel .project-card,
  .tab-content .project-card,
  .tab-content .experience-card,
  .tab-content .stack-grid article,
  .tab-content .architecture-panel,
  .project-case-study,
  .plugin-architecture-details,
  .telemetry-architecture-details{
    max-width:100%;
    min-width:0;
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
  .project-detail-list{
    grid-template-columns:none;
    grid-auto-flow:column;
    grid-auto-columns:minmax(190px,72vw);
    overflow-x:auto;
    overflow-y:hidden;
    scroll-snap-type:x proximity;
    scroll-padding-inline:40px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  .project-detail-list::-webkit-scrollbar{
    display:none;
  }
  .project-detail-list button{
    scroll-snap-align:start;
    min-width:0;
    overflow-wrap:anywhere;
  }
  .project-case-study div,
  .plugin-architecture-details,
  .telemetry-architecture-details{
    grid-template-columns:1fr;
  }
  .project-actions a,
  .chip,
  .flow-node span,
  .plugin-placement-flow strong,
  .plugin-debug-card code{
    white-space:normal;
    overflow-wrap:anywhere;
    word-break:break-word;
  }
  .date-timeline-rail{
    min-height:1120px;
    overflow:hidden;
    padding-inline:8px;
  }
  .date-timeline-node{
    left:50% !important;
    right:auto !important;
    width:min(78vw,300px);
    max-width:calc(100% - 22px);
    text-align:center !important;
    transform:translate(-50%,-50%);
  }
  .date-timeline-node.left,
  .date-timeline-node.right{
    left:50% !important;
    right:auto !important;
  }
  .date-timeline-node.active{
    transform:translate(-50%,-50%);
  }
  .date-timeline-branch{
    display:none;
  }
  .date-timeline-detail-copy{
    position:relative;
    top:auto;
    left:auto !important;
    right:auto !important;
    width:min(72vw,280px);
    margin:14px auto 0;
    padding:13px;
    font-size:.8rem;
    text-align:left !important;
    transform:none !important;
    overflow-wrap:anywhere;
  }
  .date-timeline-detail-copy:before{
    display:none;
  }
  .date-timeline-node.left.active .date-timeline-detail-copy,
  .date-timeline-node.right.active .date-timeline-detail-copy{
    transform:scale(1.08) !important;
    transform-origin:center top;
  }
  .date-timeline-detail-body{
    font-size:.78rem;
    line-height:1.38;
  }
  .date-timeline-detail-list{
    display:grid;
  }
  .date-timeline-orb{
    width:132px;
    max-width:132px;
    padding:18px;
    margin-inline:auto;
  }
  .date-timeline-orb em{
    font-size:1.45rem;
  }
  .date-timeline-orb strong{
    font-size:.68rem;
  }
  .date-timeline-icon{
    position:relative;
    right:auto;
    left:auto !important;
    bottom:auto;
    width:48px;
    height:48px;
    margin:-24px auto 0;
    transform:rotate(3deg) !important;
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
  .plugin-workflow,
  .telemetry-workflow{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .plugin-architecture-details,
  .telemetry-architecture-details{
    grid-template-columns:1fr;
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
  .project-detail-tabs,
  .profile-tabs,
  .personal-subtabs{
    position:relative;
    max-width:100%;
    min-width:0;
  }
  .project-detail-tabs:before,
  .project-detail-tabs:after,
  .profile-tabs:before,
  .profile-tabs:after,
  .personal-subtabs:before,
  .personal-subtabs:after{
    position:absolute;
    top:18px;
    z-index:8;
    display:grid;
    place-items:center;
    width:34px;
    height:44px;
    border:1px solid color-mix(in srgb,var(--gold) 40%,rgba(255,255,255,.18));
    background:
      linear-gradient(180deg,color-mix(in srgb,var(--panel) 88%,transparent),rgba(0,0,0,.28)),
      color-mix(in srgb,var(--bg) 70%,transparent);
    color:var(--gold);
    font-size:1.55rem;
    font-weight:1000;
    line-height:1;
    pointer-events:none;
    box-shadow:0 12px 32px rgba(0,0,0,.28);
  }
  .project-detail-tabs:before,
  .profile-tabs:before,
  .personal-subtabs:before{
    content:"‹";
    left:0;
    clip-path:polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%);
  }
  .project-detail-tabs:after,
  .profile-tabs:after,
  .personal-subtabs:after{
    content:"›";
    right:0;
    clip-path:polygon(10px 0,100% 0,100% 100%,0 100%);
  }
  .profile-tabs{
    margin:0;
    padding:0;
  }
  .plugin-workflow,
  .telemetry-workflow{
    grid-template-columns:1fr;
  }
  .plugin-placement-card,
  .plugin-debug-card,
  .telemetry-scaling-card{
    padding:18px;
  }
  .profile-tab-list{
    grid-template-columns:none;
    grid-auto-flow:column;
    grid-auto-columns:minmax(168px,64vw);
    overflow-x:auto;
    overflow-y:hidden;
    scroll-snap-type:x proximity;
    scroll-padding-inline:40px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  .profile-tab-list::-webkit-scrollbar{
    display:none;
  }
  .profile-tab-list button{
    scroll-snap-align:start;
    min-width:0;
    overflow-wrap:anywhere;
  }
  .profile-tab-items{
    grid-template-columns:1fr;
  }
  .personal-subtabs{
    grid-template-columns:1fr;
  }
  .personal-subtab-list{
    grid-template-columns:none;
    grid-auto-flow:column;
    grid-auto-columns:minmax(170px,64vw);
    overflow-x:auto;
    overflow-y:hidden;
    scroll-snap-type:x proximity;
    scroll-padding-inline:40px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
  }
  .personal-subtab-list::-webkit-scrollbar{
    display:none;
  }
  .personal-subtab-list button{
    scroll-snap-align:start;
    min-width:0;
    overflow-wrap:anywhere;
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
`;function vm(){const e=om(),t=T.useMemo(()=>Ts(e),[e]),[n,r]=T.useState(null),i=n||t,o=am(),a=sm(),[l,s]=T.useState("snowboard"),[f,h]=T.useState("snow"),[v,m]=T.useState(1),[y,p]=T.useState(!1),[k,A]=T.useState(!1),[d,u]=T.useState(!1),[g,x]=T.useState(!1),[b,S]=T.useState("idle"),[P,j]=T.useState(""),[Q,O]=T.useState(null),[pe,tt]=T.useState(Wn[0].id),Ie=Wn.find(nt=>nt.id===pe)||Wn[0];cm(),lm(),T.useEffect(()=>{const nt=be=>{var Qe,E;if(be.altKey){if(be.key==="ArrowDown"){be.preventDefault();const _=qe[Math.min(qe.length-1,a+1)];(Qe=document.getElementById(_.id))==null||Qe.scrollIntoView({behavior:"smooth"})}if(be.key==="ArrowUp"){be.preventDefault();const _=qe[Math.max(0,a-1)];(E=document.getElementById(_.id))==null||E.scrollIntoView({behavior:"smooth"})}}};return window.addEventListener("keydown",nt),()=>window.removeEventListener("keydown",nt)},[a]);async function tn(){if(!("geolocation"in navigator)){j("Live weather needs browser geolocation support."),S("error");return}S("loading"),j(""),navigator.geolocation.getCurrentPosition(async nt=>{try{const{latitude:be,longitude:Qe}=nt.coords,E=`https://api.open-meteo.com/v1/forecast?latitude=${be}&longitude=${Qe}&current=temperature_2m,weather_code,wind_speed_10m,precipitation,rain,snowfall,cloud_cover,is_day&timezone=auto`,_=await fetch(E);if(!_.ok)throw new Error("Weather request failed");const M=await _.json(),B=M.current||{},[Z,N]=td[B.weather_code]||["Current weather","clear"],L=await rm(be,Qe,M.timezone),F={condition:Z,kind:N,temp:B.temperature_2m??0,wind:B.wind_speed_10m??0,location:L,code:B.weather_code},D=B.time?Ts(new Date(B.time)):null;r(D||(B.is_day===0?{key:"night",label:"Night"}:B.is_day===1?{key:"day",label:"Day"}:null)),O(F),S("synced"),um(N,s,h,m)}catch{S("error"),j("Live weather could not be loaded. The scene still uses local time.")}},()=>{S("error"),j("Location permission was not granted. Manual ambience remains active.")},{enableHighAccuracy:!1,timeout:1e4,maximumAge:30*60*1e3})}return c.jsxs("main",{className:`site ${l} ${i.key} ${y?"fall-theme":""} ${k?"spring-theme":""} ${d?"winter-theme":""}`,children:[c.jsx("style",{children:dm}),c.jsx("style",{children:pm}),c.jsx("style",{children:fm}),c.jsx("style",{children:mm}),c.jsx("style",{children:gm}),c.jsx("style",{children:hm}),c.jsx(im,{mode:l,weather:f,weatherPower:v,activeSector:a,scrollProgress:o,timeProfile:i,fallTheme:y,springTheme:k,winterTheme:d}),c.jsx("div",{className:"portrait-background","aria-hidden":"true",children:c.jsx("img",{src:Lf,alt:""})}),c.jsx("div",{className:"ambient-grid","aria-hidden":"true"}),c.jsxs("header",{className:"nav-shell",children:[c.jsxs("a",{className:"brand",href:"#hero",children:[c.jsx(js,{}),c.jsxs("span",{children:[c.jsx("strong",{children:le.name}),c.jsx("small",{children:"Engineer · Builder · Problem Solver"})]})]}),c.jsx("a",{className:"nav-cta",href:le.resume,download:!0,children:"Download CV"})]}),c.jsx(Wf,{activeSector:a,activeContentTab:Ie}),c.jsx(Vf,{weather:f,setWeather:h,weatherPower:v,setWeatherPower:m,activeSector:a,liveWeather:Q,timeProfile:i,weatherStatus:b,weatherError:P,onUseLiveWeather:tn,onInteract:()=>x(!0),fallTheme:y,setFallTheme:p,springTheme:k,setSpringTheme:A,winterTheme:d,setWinterTheme:u}),c.jsx(Hf,{activeSector:a,activeContentTab:Ie,hudInteracted:g}),c.jsx("section",{id:"hero",className:"sector hero-sector",children:c.jsxs("div",{className:"hero-copy",children:[c.jsx("p",{className:"eyebrow",children:"// Backend · Game Tech · Data Systems"}),c.jsx("h1",{children:le.name}),c.jsxs("h2",{children:[c.jsx("span",{children:le.title})," ",le.tagline]}),c.jsx("p",{className:"hero-lede",children:"I build reliable backend services, content pipelines, and developer-facing tools that connect cloud-native engineering with game-production workflows."}),c.jsxs("div",{className:"hero-actions",children:[c.jsx("a",{className:"primary-action",href:"#tab-content",children:"Start exploring →"}),c.jsx("a",{href:le.resume,download:!0,children:"Download Resume"}),c.jsx("a",{href:le.github,...ii(le.github),children:"GitHub"})]})]})}),c.jsxs("section",{id:"tab-content",className:"sector section-wrap tab-content",role:"tabpanel","aria-labelledby":`profile-tab-${Ie.id}`,children:[c.jsx(Xf,{tabs:Wn,activeTabId:pe,onTabChange:tt}),c.jsx(nm,{tab:Ie})]}),c.jsxs("footer",{id:"contact",className:"sector footer-shell panel-card","data-tilt":!0,children:[c.jsxs("div",{children:[c.jsx(js,{}),c.jsx("h2",{children:"Let’s build online systems and game technology that scale."}),c.jsx("p",{children:le.location})]}),c.jsxs("div",{className:"contact-links",children:[c.jsx("a",{href:Wu(le.email),children:le.email}),c.jsx("a",{href:le.linkedin,...ii(le.linkedin),children:"LinkedIn"}),c.jsx("a",{href:le.github,...ii(le.github),children:"GitHub"})]})]}),c.jsx("div",{className:"scroll-finish-spacer","aria-hidden":"true"})]})}Vu(document.getElementById("root")).render(c.jsx(wd.StrictMode,{children:c.jsx(vm,{})}));
