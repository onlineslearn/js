var DESIGN_MODE = true
window.addEventListener('DOMContentLoaded', () => {
    const POST_CSS = document.createElement('link')
    POST_CSS.rel = 'stylesheet'
    POST_CSS.href = 'https://cdn.worldclouds.ml/css/post-style.css'
    editText.document.head.append(POST_CSS)
    editText.document.designMode = 'on'
    document.getElementById('save-draft').addEventListener('click', () => {
        console.log('Working')
    })
    document.getElementById('undo').addEventListener('click', () => {
        editText.document.execCommand("undo", false, null)
    })
    document.getElementById('redo').addEventListener('click', () => {
        editText.document.execCommand("redo", false, null)
    })
    document.getElementById('format_bold').addEventListener('click', () => {
        editText.document.execCommand("bold", false, null)
    })
    document.getElementById('format_italic').addEventListener('click', () => {
        editText.document.execCommand("italic", false, null)
    })
    document.getElementById('format_underlined').addEventListener('click', () => {
        editText.document.execCommand("underline", false, null)
    })
    document.getElementById('format_strikethrough').addEventListener('click', () => {
        editText.document.execCommand("strikeThrough", false, null)
    })
    document.getElementById('superscript').addEventListener('click', () => {
        editText.document.execCommand("superscript", false, null)
    })
    document.getElementById('subscript').addEventListener('click', () => {
        editText.document.execCommand("subscript", false, null)
    })
    document.getElementById('format-article').addEventListener('click', () => {
        editText.document.execCommand("formatBlock", false, 'p')
    })
    document.getElementById('format_align_left').addEventListener('click', () => {
        editText.document.execCommand("justifyLeft", false, null)
    })
    document.getElementById('format_align_center').addEventListener('click', () => {
        editText.document.execCommand("justifyCenter", false, null)
    })
    document.getElementById('format_align_right').addEventListener('click', () => {
        editText.document.execCommand("justifyRight", false, null)
    })
    document.getElementById('format_align_justify').addEventListener('click', () => {
        editText.document.execCommand("justifyFull", false, null)
    })
    document.getElementById('content_copy').addEventListener('click', () => {
        editText.document.execCommand("copy", false, null)
    })
    document.getElementById('content_paste').addEventListener('click', () => {
        navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
            if (result.state == 'granted' || result.state == 'prompt') {
                navigator.clipboard.readText().then(e => {
                    editText.document.execCommand("insertText", false, e)

                }).catch(err => console.log(err))
            }
        })
    })
    document.getElementById('content_cut').addEventListener('click', () => {
        editText.document.execCommand("cut", false, null)
    })
    document.getElementById('delete').addEventListener('click', () => {
        editText.document.execCommand("delete", false, null)
    })
    document.getElementById('bullet_list').addEventListener('click', () => {
        editText.document.execCommand("insertUnorderedList", false, null)
    })
    document.getElementById('format_list_numbered').addEventListener('click', () => {
        editText.document.execCommand("insertOrderedList", false, null)
    })
    document.getElementById('format_indent_increase').addEventListener('click', () => {
        editText.document.execCommand("indent", false, null)
    })
    document.getElementById('format_indent_decrease').addEventListener('click', () => {
        editText.document.execCommand("outdent", false, null)
    })
    document.getElementById('font-size').addEventListener('change',e=>{
        editText.document.execCommand('fontSize',false,parseInt(document.getElementById('font-size').value))
    })
    document.getElementById('text-font').addEventListener('change',e=>{
        editText.document.execCommand('fontName',false,document.getElementById('text-font').value)
    })
    document.getElementById('text-heading').addEventListener('change',e=>{
        editText.document.execCommand("formatBlock", false, document.getElementById('text-heading').value)
    })
    document.getElementById('format_quote').addEventListener('click',e=>{
        editText.document.execCommand("formatBlock", false, 'blockquote')
    })
    document.getElementById('insert_link').addEventListener('click',e=>{
        const INSERT_LINK = prompt('Enter Link Here ')
        if(INSERT_LINK!=null && INSERT_LINK!=''){
            editText.document.execCommand("createLink", false, INSERT_LINK)
        }
        
    })
    document.getElementById('leak_remove').addEventListener('click',e=>{
        editText.document.execCommand("unlink", false, null)
    })
    document.getElementById('insert_image').addEventListener('click',e=>{
        const INSERT_LINK = prompt('Enter Image Link')
        if(INSERT_LINK!=null && INSERT_LINK!=''){
            editText.document.execCommand("insertImage", false, INSERT_LINK)
        }
        
    })
    document.getElementById('format_clear').addEventListener('click',e=>{
        editText.document.execCommand("removeFormat", false, null)
    })
    document.getElementById('text-color').addEventListener('change',e=>{
        editText.document.execCommand('foreColor',false,document.getElementById('text-color').value)
    })
    document.getElementById('back-color').addEventListener('change',e=>{
        editText.document.execCommand('backColor',false,document.getElementById('back-color').value)
    })
    document.getElementById('code-edit').addEventListener('click',e=>{
        if(DESIGN_MODE){
            editText.document.getElementsByTagName('body')[0].innerText = editText.document.getElementsByTagName('body')[0].innerHTML
            editText.document.designMode = 'off'
            DESIGN_MODE = false
        }else{
            editText.document.getElementsByTagName('body')[0].innerHTML = editText.document.getElementsByTagName('body')[0].innerText
            editText.document.designMode = 'on'
            DESIGN_MODE = true
        }
    })
    document.getElementById('editor').addEventListener('submit',e=>{
        e.preventDefault()
        document.getElementById('progressbar-background').style.display = 'block'
        const formdata = new FormData(document.getElementById('editor'))
        const urlSearchParems = new URLSearchParams
        urlSearchParems.set('postTitle',formdata.get('post-title'))
        urlSearchParems.set('postDescription',formdata.get('post-description'))
        urlSearchParems.set('postContent',editText.document.getElementsByTagName('body')[0].innerHTML)
        fetch(location.pathname,{method:'POST',body:urlSearchParems}).then(response=>{
            if(response.status==200){
                window.location.pathname='/admin/page'
            }else{
                alert(response.statusText)
            }
            document.getElementById('progressbar-background').removeAttribute('style')
        }).catch(err=>{
            console.log(err)
            document.getElementById('progressbar-background').removeAttribute('style')
        })
    })
})