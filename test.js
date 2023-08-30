window.addEventListener('DOMContentLoaded',()=>{
    const ancherAll = document.getElementsByClassName('terget-link')
    Object.keys(ancherAll).forEach(u=>{
        ancherAll[u].addEventListener('click',k=>{
            k.preventDefault()
            history.pushState({
                path:u
            },'google',ancherAll[u].href)
            // eventedPushState({path:location.pathname},null,ancherAll[u].href)
        })
    })
})
window.addEventListener('popstate',p=>{
    LoadEventHandler(history.state,location.href)
})
window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
      LoadEventHandler(argArray[0],argArray[2])
      return target.apply(thisArg, argArray);
    },
  })
  function LoadEventHandler(state,url){
    console.log(state||'root')
    console.log(url)
  }