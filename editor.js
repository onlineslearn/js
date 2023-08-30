window.addEventListener('DOMContentLoaded',async ()=>{
    richTextEditor.document.designMode = 'on'
    const POST_CSS = document.createElement('link')
    POST_CSS.rel = 'stylesheet'
    POST_CSS.href = 'https://cdn.wcrl.ml/textmate/css/rich-text-editor.css'
    richTextEditor.document.head.append(POST_CSS)
    document.getElementById('action-undo').addEventListener('click',()=>{
        richTextEditor.document.execCommand('undo',false,null)
    })
    document.getElementById('action-redo').addEventListener('click',()=>{
        richTextEditor.document.execCommand('redo',false,null)
    })
    document.getElementById('action-align-left').addEventListener('click',()=>{
        richTextEditor.document.execCommand('justifyLeft',false,null)
    })
    document.getElementById('action-align-center').addEventListener('click',()=>{
        richTextEditor.document.execCommand('justifyCenter',false,null)
    })
    document.getElementById('action-align-right').addEventListener('click',()=>{
        richTextEditor.document.execCommand('justifyRight',false,null)
    })
    document.getElementById('action-align-justify').addEventListener('click',()=>{
        richTextEditor.document.execCommand('justifyFull',false,null)
    })
    document.getElementById('format-bold').addEventListener('click',()=>{
        richTextEditor.document.execCommand('bold',false,null)
    })
    document.getElementById('format-italic').addEventListener('click',()=>{
        richTextEditor.document.execCommand('italic',false,null)
    })
    document.getElementById('format_clear').addEventListener('click',e=>{
        richTextEditor.document.execCommand("removeFormat", false, null)
    })
    document.getElementById('text-color').addEventListener('change',e=>{
        richTextEditor.document.execCommand('foreColor',false,document.getElementById('text-color').value)
    })
    document.getElementById('text-heading').addEventListener('change',e=>{
        richTextEditor.document.execCommand("formatBlock", false, document.getElementById('text-heading').value)
    })
    document.getElementById('font-size').addEventListener('change',e=>{
        richTextEditor.document.execCommand('fontSize',false,parseInt(document.getElementById('font-size').value))
    })
    document.getElementById('format_quote').addEventListener('click',e=>{
        richTextEditor.document.execCommand("formatBlock", false, 'blockquote')
    })
    document.getElementById('insert_link').addEventListener('click',e=>{
        const INSERT_LINK = prompt('Enter Link Here ')
        if(INSERT_LINK!=null && INSERT_LINK!=''){
            richTextEditor.document.execCommand("createLink", false, INSERT_LINK)
        }
    })
    document.getElementById('leak_remove').addEventListener('click',e=>{
        richTextEditor.document.execCommand("unlink", false, null)
    })
    document.getElementById('insert_image').addEventListener('click',e=>{
        const INSERT_LINK = prompt('Enter Image Link')
        if(INSERT_LINK!=null && INSERT_LINK!=''){
            richTextEditor.document.execCommand("insertImage", false, INSERT_LINK)
        }
    })
    document.getElementById('bullet_list').addEventListener('click', () => {
        richTextEditor.document.execCommand("insertUnorderedList", false, null)
    })
    document.getElementById('format_list_numbered').addEventListener('click', () => {
        richTextEditor.document.execCommand("insertOrderedList", false, null)
    })
    document.getElementById('editor-mode').addEventListener('change',e=>{
        if(e.target.checked){
            document.getElementById('richTextEditor').style.display='none'
            document.getElementById('rich-textarea').style.display='block'
            document.getElementById('rich-textarea').value = richTextEditor.document.querySelector('body').innerHTML
            richTextEditor.document.querySelector('body').innerHTML = null
        }else{
            richTextEditor.document.querySelector('body').innerHTML = document.getElementById('rich-textarea').value
            document.getElementById('rich-textarea').value=null
            document.getElementById('richTextEditor').removeAttribute('style')            
            document.getElementById('rich-textarea').removeAttribute('style')
        }
    })
    document.getElementById('content-title').addEventListener('change',i=>{
        i.target.value = i.target.value.toCapitalised()
        document.getElementById('content-url-path').value = i.target.value.toLowerCase().split(' ').join('-')
    })
    document.getElementById('btn-publish').addEventListener('click',async ()=>{
        document.getElementById('request-progressbar').style.display='block'
        richTextEditor.document.designMode='off'
        const ALL_INPUT = document.getElementsByClassName('action-btn')
        Object.keys(ALL_INPUT).forEach(x=>{
            ALL_INPUT[x].disabled = true
        })
        const CONTENT_TITLE = document.getElementById('content-title').value
        const CONTENT_DESCRIPTION = document.getElementById('content-description').value
        const CONTENT_URL = document.getElementById('content-url-path').value
        const CONTENT_THUMBNAIL = document.getElementById('content-thumbnail').value
        const CONTENT_CATEGORY = document.getElementById('content-category').value
        const CONTENT_BODY = richTextEditor.document.querySelector('body').innerHTML
        if(CONTENT_TITLE.trim().length<5 || CONTENT_DESCRIPTION.trim().length<5 || CONTENT_URL.trim().length<5 || CONTENT_BODY.trim().length<5){
            alert('Some field missing!')
            Object.keys(ALL_INPUT).forEach(x=>{
                ALL_INPUT[x].disabled = false
            })
            richTextEditor.document.designMode='on'
            document.getElementById('request-progressbar').removeAttribute('style')
            return false
        }
        const urlparem = new URLSearchParams
        urlparem.set('ContentTitle',CONTENT_TITLE)
        urlparem.set('ContentDescription',CONTENT_DESCRIPTION)
        urlparem.set('ContentURL',CONTENT_URL)
        urlparem.set('ContentBody',CONTENT_BODY)
        urlparem.set('ContentCategory',CONTENT_CATEGORY)
        urlparem.set('PublicVisivility','true')
        urlparem.set('ContentThumbnail',CONTENT_THUMBNAIL)
        const PUBLISH_REQUEST = await fetch(location.pathname,{
            method:"POST",
            body:urlparem,
            credentials:"include"
        }).catch(err=>alert(err))
        if(PUBLISH_REQUEST.status==200){
            history.back()
        }else{
            alert('Failed To Publish')
        }
        Object.keys(ALL_INPUT).forEach(x=>{
            ALL_INPUT[x].disabled = false
        })
        richTextEditor.document.designMode='on'
        document.getElementById('request-progressbar').removeAttribute('style')
    })
    document.getElementById('btn-save-draft').addEventListener('click',async ()=>{
        document.getElementById('request-progressbar').style.display='block'
        richTextEditor.document.designMode='off'
        const ALL_INPUT = document.getElementsByClassName('action-btn')
        Object.keys(ALL_INPUT).forEach(x=>{
            ALL_INPUT[x].disabled = true
        })
        const CONTENT_TITLE = document.getElementById('content-title').value
        const CONTENT_DESCRIPTION = document.getElementById('content-description').value
        const CONTENT_CATEGORY = document.getElementById('content-category').value
        const CONTENT_URL = document.getElementById('content-url-path').value
        const CONTENT_THUMBNAIL = document.getElementById('content-thumbnail').value
        const CONTENT_BODY = richTextEditor.document.querySelector('body').innerHTML
        if(CONTENT_TITLE.trim().length<5 || CONTENT_DESCRIPTION.trim().length<5 || CONTENT_URL.trim().length<5 || CONTENT_BODY.trim().length<5){
            alert('Some field missing!')
            Object.keys(ALL_INPUT).forEach(x=>{
                ALL_INPUT[x].disabled = false
            })
            richTextEditor.document.designMode='on'
            document.getElementById('request-progressbar').removeAttribute('style')
            return false
        }
        const urlparem = new URLSearchParams
        urlparem.set('ContentTitle',CONTENT_TITLE)
        urlparem.set('ContentDescription',CONTENT_DESCRIPTION)
        urlparem.set('ContentURL',CONTENT_URL)
        urlparem.set('ContentBody',CONTENT_BODY)
        urlparem.set('ContentCategory',CONTENT_CATEGORY)
        urlparem.set('PublicVisivility','false')
        urlparem.set('ContentThumbnail',CONTENT_THUMBNAIL)
        const PUBLISH_REQUEST = await fetch(location.pathname,{
            method:"POST",
            body:urlparem,
            credentials:"include"
        }).catch(err=>alert(err))
        if(PUBLISH_REQUEST.status==200){
            history.back()
        }else{
            alert('Failed To Publish')
        }
        Object.keys(ALL_INPUT).forEach(x=>{
            ALL_INPUT[x].disabled = false
        })
        richTextEditor.document.designMode='on'
        document.getElementById('request-progressbar').removeAttribute('style')
    })
    document.getElementById('btn-cancel').addEventListener('click',()=>{
        if(confirm('Are you sure to cancel?')){
            history.back()
        }
    })
})
String.prototype.toCapitalised = function(){
    const TextData = this.split(' ')
    const rawText = new Array
    TextData.forEach(txt=>{
        const CText = txt.split('')
        const CArray = new Array
        CText.forEach((data,index)=>{
            if(index==0){
                CArray.push(data.toUpperCase())
            }else{
                CArray.push(data)
            }
        })
        rawText.push(CArray.join(''))
    })
    return rawText.join(' ')
}