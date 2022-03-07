window.addEventListener('DOMContentLoaded',()=>{
    const submitBtn = document.getElementById('form-submit')
    const inputURL = document.getElementById('url')
    const loader = document.getElementById('loader')
    document.getElementById('link-form').addEventListener('submit',async e=>{
        loader.style.display = 'block'
        e.preventDefault()
        inputURL.readOnly = true
        submitBtn.disabled = true
        const form = new FormData(document.getElementById('link-form'))
        const urlParems = new URLSearchParams
        urlParems.set('url',form.get('url'))
        let videoInfo = await fetch(location.pathname,{method:"POST",body:urlParems})
        if(videoInfo.status==200){
            videoInfo = await videoInfo.json()
        }else{
            alert('Invalid URL')
            document.getElementById('link-form').reset()
            loader.removeAttribute('style')
            return
        }
        document.getElementById('yt-title').innerHTML = videoInfo.title
        document.getElementById('yt-description').innerHTML = videoInfo.description
        document.getElementById('yt-thumbnail').src = videoInfo.thumbnail[videoInfo.thumbnail.length-1].url
        const downloadLinksGroup = document.getElementById('download-links')
        videoInfo.links.forEach(l=>{
            const aHref = document.createElement('a')
            aHref.href = l.url
            aHref.innerHTML = `${l.quality.toUpperCase()} ${l.format}`
            downloadLinksGroup.append(aHref)
        })
        loader.removeAttribute('style')
    })
    document.getElementById('link-form').addEventListener('reset',()=>{
        submitBtn.removeAttribute('disabled')
        document.getElementById('yt-title').innerHTML = null
        document.getElementById('yt-description').innerHTML = null
        document.getElementById('yt-thumbnail').removeAttribute('src')
        document.getElementById('download-links').innerHTML=null
        inputURL.removeAttribute('readonly')
    })
})