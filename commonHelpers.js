import{S as y,i}from"./assets/vendor-0fc460d7.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function g(r,n=1,s=15){const t="https://pixabay.com/api/",e="45098523-0f66f1bf08e0be6a1e71621a5";try{const o=await fetch(`${t}?key=${e}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${perPage}`);if(!o.ok)throw new Error(o.status);return await o.json()}catch(o){throw new Error(`Failed to fetch images: ${o.message}`)}}const h="../img/icon.svg";function p(r,n=!1){const s=document.querySelector(".gallery");n||(s.innerHTML=""),r.forEach(t=>{const e=document.createElement("a");e.href=t.largeImageURL,e.classList.add("image-card"),e.innerHTML=`
      <img src="${t.webformatURL}" alt="${t.tags}" title="${t.tags}" />
      <div class="info">
        <p><strong>Likes:</strong> ${t.likes}</p>
        <p><strong>Views:</strong> ${t.views}</p>
        <p><strong>Comments:</strong> ${t.comments}</p>
        <p><strong>Downloads:</strong> ${t.downloads}</p>
      </div>
    `,s.appendChild(e)}),window.lightbox?window.lightbox.refresh():window.lightbox=new y(".gallery a",{})}function f(r){const n=document.getElementById("loader");n.style.display="none",i.error({title:"",message:`Failed to fetch images: ${r.message}`,iconUrl:`${h}#icon-Group-1`,position:"topRight",backgroundColor:"red"})}const l="/goit-js-hw-12/assets/icon-8c59a331.svg",m=document.querySelector(".form-inline"),w=document.querySelector(".image-container"),a=document.querySelector(".loader"),u=document.querySelector(".load-more");let b="",d=1;m.addEventListener("submit",L);u.addEventListener("click",$);async function L(r){r.preventDefault();const s=r.currentTarget.elements.query.value.trim().toLowerCase();if(s===""){i.warning({title:"",message:"Search query cannot be empty.",position:"topRight",backgroundColor:"red",icon:"",iconUrl:`${l}#icon-Group-1`});return}d=1,w.innerHTML="",u.style.display="none",a.style.display="block";try{const t=await g(s);t.hits.length>0?p(t.hits):i.warning({title:"",backgroundColor:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",iconUrl:`${l}#icon-Group-1`})}catch(t){f(t)}finally{a.style.display="none",m.reset()}}async function $(){d+=1,a.style.display="block";try{const r=await g(b,d);r.hits.length>0?p(r.hits,!0):(i.warning({title:"",backgroundColor:"red",message:"No more images to load.",position:"topRight",iconUrl:`${l}#icon-Group-1`}),u.style.display="none")}catch(r){f(r)}finally{a.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
