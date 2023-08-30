window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('action-form').addEventListener('change',()=>{
        const formData = new FormData(document.getElementById('action-form'))
        if(formData.getAll('post').length==0){
            document.getElementById('action-btn-edit').disabled = true
            document.getElementById('action-btn-delete').disabled = true
            document.getElementById('action-btn-draft').disabled = true
            document.getElementById('action-btn-publish').disabled = true
        }else if(formData.getAll('post').length>1){
            document.getElementById('action-btn-delete').disabled = false
            document.getElementById('action-btn-draft').disabled = false
            document.getElementById('action-btn-publish').disabled = false
            document.getElementById('action-btn-edit').disabled = true
        }else{
            document.getElementById('action-btn-edit').disabled = false
            document.getElementById('action-btn-delete').disabled = false
            document.getElementById('action-btn-draft').disabled = false
            document.getElementById('action-btn-publish').disabled = false
        }
    })
    document.getElementById('action-btn-edit').addEventListener('click',()=>{
        const formData = new FormData(document.getElementById('action-form'))
        window.location=`/admin/post/edit?post=${window.btoa(formData.get('post'))}`
    })
    document.getElementById('action-btn-delete').addEventListener('click',()=>{
        document.getElementById('custom-alert-dialog-background').style.display='flex'
        document.getElementById('dialog-delete').style.display='block'
    })
    document.getElementById('action-btn-delete-confirm').addEventListener('click',()=>{
        document.getElementById('action-setup').value='delete'
        document.getElementById('action-form').submit()
    })
    document.getElementById('delete-cancel').addEventListener('click',()=>{
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-action-btn').removeAttribute('style')
    })
    document.getElementById('action-btn-publish').addEventListener('click',()=>{
        document.getElementById('action-setup').value='publish'
        document.getElementById('action-form').submit()
    })
    document.getElementById('action-btn-draft').addEventListener('click',()=>{
        document.getElementById('action-setup').value='draft'
        document.getElementById('action-form').submit()
    })
})