window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('link-shortner-form').addEventListener('submit',form=>{
        form.preventDefault()
        document.getElementById('progressbar-background').style.display='block'
        const formdata = new FormData(document.getElementById('link-shortner-form'))
        document.getElementById('url').readOnly = true
        const postFormObject = new URLSearchParams()
        postFormObject.append('url',formdata.get('url'))
        fetch(location.pathname,{method:"POST",body:postFormObject}).then(temp=>temp.json()).then(sUrlObject=>{
            if(sUrlObject.status==200){
                document.getElementById('url').value = sUrlObject.url
                document.getElementById('form-submit-btn').style.display='none'
                document.getElementById('form-url-copy').style.display='block'
                document.getElementById('progressbar-background').removeAttribute('style')
            }else{
                document.getElementById('url').removeAttribute('readonly')
                document.getElementById('progressbar-background').removeAttribute('style')
                alert(sUrlObject.message)
            }
        }).catch(err=>{
            document.getElementById('url').removeAttribute('readonly')
            alert('Something want wrong!')
            document.getElementById('progressbar-background').removeAttribute('style')
        })
    })
    document.getElementById('link-shortner-form').addEventListener('reset',()=>{
        document.getElementById('url').removeAttribute('readonly')
        document.getElementById('progressbar-background').removeAttribute('style')
        document.getElementById('form-submit-btn').removeAttribute('style')
        document.getElementById('form-url-copy').removeAttribute('style')
    })
    document.getElementById('form-url-copy').addEventListener('click',()=>{
        navigator.permissions.query({ name: 'clipboard-write' }).then(result => { if (result.state == 'granted' || result.state == 'prompt') {
            navigator.clipboard.writeText(document.getElementById('url').value).then(e=>{
                alert('Copy Success')
            }).catch(err=>console.log(err))
        } })
    })
})