window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('action-form').addEventListener('change', () => {
        const formData = new FormData(document.getElementById('action-form'))
        if (formData.getAll('image').length == 0) {
            document.getElementById('action-btn-delete').disabled = true
        } else {
            document.getElementById('action-btn-delete').disabled = false
        }
    })
    document.getElementById('add-image').addEventListener('click',()=>{
        document.getElementById('custom-alert-dialog-background').style.display='flex'
        document.getElementById('dialog-add-image').style.display='block'
    })
    document.getElementById('add-image-cancel').addEventListener('click',()=>{
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-add-image').removeAttribute('style')
    })
    document.getElementById('delete-cancel').addEventListener('click',()=>{
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-action-btn').removeAttribute('style')
    })
    document.getElementById('action-bgn-add-image').addEventListener('click', async () => {
        const body = new URLSearchParams
        body.set('action', 'add-image')
        body.set('url', document.getElementById('add-image-input').value)
        if (body.get('url').length < 1) {
            return
        }
        document.getElementById('add-image-progressbar').style.display = 'block'
        const request = await fetch(location.pathname, {
            method: "PUT",
            body: body,
            credentials: "include"
        })
        if (request.status != 200) {
            alert('Failed To Add')
        } else {
            location.reload()
        }
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-add-image').removeAttribute('style')
        document.getElementById('add-image-progressbar').removeAttribute('style')
    })
    document.getElementById('action-btn-delete').addEventListener('click',()=>{
        document.getElementById('custom-alert-dialog-background').style.display='flex'
        document.getElementById('dialog-delete').style.display='block'
    })
    document.getElementById('action-btn-delete-confirm').addEventListener('click',()=>{
        document.getElementById('action-form').submit()
    })
})