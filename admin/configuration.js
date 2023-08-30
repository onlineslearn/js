window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('edit-mode').addEventListener('click', () => {
        if (document.getElementById('edit-mode').value == 'Enable Edit') {
            document.getElementById('custom-alert-dialog-background').style.display = 'flex'
            document.getElementById('dialog-edit-mode').style.display = 'block'
        } else {
            document.querySelectorAll('input[type="text"]').forEach(x => {
                x.readOnly = true
                document.getElementById('update-submit').disabled = true
                document.getElementById('edit-mode').value = 'Enable Edit'
            })
        }
    })
    document.getElementById('dialog-edit-mode-cancel').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-edit-mode').removeAttribute('style')
    })
    document.getElementById('btn-edit-mode').addEventListener('click', () => {
        document.querySelectorAll('input[type="text"]').forEach(x => {
            x.readOnly = false
        })
        document.getElementById('update-submit').disabled = false
        document.getElementById('edit-mode').value = 'Disable Edit'
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-edit-mode').removeAttribute('style')
    })
    document.getElementById('update-submit').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').style.display = 'flex'
        document.getElementById('dialog-form-submit').style.display = 'block'
    })
    document.getElementById('dialog-form-submit-cancel').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-form-submit').removeAttribute('style')
    })
    document.getElementById('btn-form-submit').addEventListener('click',()=>{
        const formData = new FormData(document.getElementById('config-form'))
        if(formData.get('site-title').length<2){
            return
        }else if(formData.get('site-description').length<2){
            return
        }else if(formData.get('site-thumbnail').length<2){
            return
        }else if(formData.get('site-server-domain').length<2){
            return
        }else if(formData.get('site-cdn-domain').length<2){
            return
        }else{
            document.getElementById('config-form').submit()
        }
    })
})