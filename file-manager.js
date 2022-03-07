let LOADER, CURRENT_DELETE_POITION, OPERATION_PATH
window.addEventListener('DOMContentLoaded', () => {
    LOADER = document.getElementById('main-proccess-window')
    document.getElementById('element-select-all').addEventListener('click', () => {
        document.querySelectorAll('.element-checkbox').forEach(x => {
            x.checked = true
        })
    })
    document.getElementById('element-deselect').addEventListener('click', () => {
        document.querySelectorAll('.element-checkbox').forEach(x => {
            x.checked = false
        })
    })
    document.getElementById('element-delete').addEventListener('click', () => {
        const form = new FormData(document.getElementById('file-form'))
        if (form.getAll('elementID').length == 0) {
            return
        }
        CURRENT_DELETE_POITION = 0
        if (confirm('Are you sure to delete?')) {
            deleteFiles(form.getAll('elementID'))
        }
    })
    document.getElementById('element-upload').addEventListener('click', () => {
        document.getElementById('file-upload').style.display = 'flex'
    })
    document.getElementById('remote-upload-cancel').addEventListener('click', () => {
        document.getElementById('file-upload').removeAttribute('style')
        document.getElementById('file').removeAttribute('disabled')
    })
    document.getElementById('file-uploader').addEventListener('submit', async e => {
        e.preventDefault()
        const upload_file = document.getElementById('file')
        document.getElementById('form-submit-btn').disabled = true
        const progressBar = document.getElementById('upload-progressbar')
        progressBar.style.display = 'block'
        upload_file.disabled = true
        if(location.pathname.split('/').length==3){
            OPERATION_PATH = ''
        }else{
            OPERATION_PATH = location.pathname.replace('/admin/files/', '') + '/'
        }
        const child_ref = OPERATION_PATH + upload_file.files[0].name.toLowerCase().split(' ').join('-')
        const storageRef = firebase.storage().ref()
        const uploadTask = storageRef.child(child_ref).put(upload_file.files[0])
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                document.getElementById('upload-progress').style.width = `${progress}%`
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                alert(error.message)
                console.log(error)
                progressBar.removeAttribute('style')
                document.getElementById('file-upload').removeAttribute('style')
                document.getElementById('file').removeAttribute('disabled')
                document.getElementById('form-submit-btn').removeAttribute('disabled')
            },
            () => {
                progressBar.removeAttribute('style')
                document.getElementById('file-upload').removeAttribute('style')
                document.getElementById('file').removeAttribute('disabled')
                document.getElementById('form-submit-btn').removeAttribute('disabled')
                document.getElementById('file-uploader').reset()
                loadFiles()
            }
        )
        document.getElementById('remote-upload-cancel').addEventListener('click', () => {
            uploadTask.cancel()
            document.getElementById('file').removeAttribute('disabled')
            document.getElementById('form-submit-btn').removeAttribute('disabled')
        })
    })
    document.getElementById('file-container').addEventListener('change', () => {
        const form = new FormData(document.getElementById('file-form'))
        if (form.getAll('elementID').length == 1) {
            document.getElementById('element-download').removeAttribute('disabled')
        } else {
            document.getElementById('element-download').disabled = true
        }
    })
    document.getElementById('element-download').addEventListener('click', () => {
        const form = new FormData(document.getElementById('file-form'))
        if (form.getAll('elementID').length == 1 && document.getElementById(form.get('elementID')).dataset.type != 'folder') {
            if (form.get('elementID').split('/').length < 3) {
                location.href = `https://firebasestorage.googleapis.com/v0/b/world-clouds.appspot.com/o${form.get('elementID')}?alt=media`
            } else {
                location.href = `https://firebasestorage.googleapis.com/v0/b/world-clouds.appspot.com/o/${form.get('elementID').replace('/', '').split('/').join('%2F')}?alt=media`
            }
        }
    })
    document.getElementById('element-copy-link').addEventListener('click', () => {
        const form = new FormData(document.getElementById('file-form'))
        if (form.getAll('elementID').length == 1 && document.getElementById(form.get('elementID')).dataset.type != 'folder') {
            if (form.get('elementID').split('/').length < 3) {
                navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
                    if (result.state == 'granted' || result.state == 'prompt') {
                        navigator.clipboard.writeText(`https://firebasestorage.googleapis.com/v0/b/world-clouds.appspot.com/o${form.get('elementID')}?alt=media`).then(e => {
                            alert('Copy Success')
                        }).catch(err => console.log(err))
                    }
                })
            } else {
                navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
                    if (result.state == 'granted' || result.state == 'prompt') {
                        navigator.clipboard.writeText(`https://firebasestorage.googleapis.com/v0/b/world-clouds.appspot.com/o/${form.get('elementID').replace('/', '').split('/').join('%2F')}?alt=media`).then(e => {
                            alert('Copy Success')
                        }).catch(err => console.log(err))
                    }
                })
            }
        }
    })
    document.getElementById('element-new-folder').addEventListener('click', () => {
        document.getElementById('create-new-folder').style.display = 'flex'
    })
    document.getElementById('folder-create-cancel').addEventListener('click', () => {
        document.getElementById('create-new-folder').removeAttribute('style')
    })
    document.getElementById('new-folder-creator').addEventListener('submit', e => {
        e.preventDefault()
        const folder_name = document.getElementById('folder-name').value
        document.getElementById('folder-name').value = null
        const fileElement = document.createElement('div')
        fileElement.className = 'file-element'
        fileElement.id = document.getElementById('currentPath').value.replace('Home') + '/' + folder_name
        fileElement.dataset.path = '/' + folder_name
        fileElement.dataset.type = 'folder'
        const CHECKBOX = document.createElement('input')
        CHECKBOX.type = 'checkbox'
        CHECKBOX.name = 'elementID'
        CHECKBOX.value = '/' + folder_name
        CHECKBOX.className = 'element-checkbox'
        fileElement.append(CHECKBOX)
        const ICON = document.createElement('label')
        ICON.className = 'material-icons element-icon'
        ICON.innerHTML = 'folder'
        fileElement.append(ICON)
        const ELEMENT_DETAILS = document.createElement('div')
        ELEMENT_DETAILS.className = 'element-details'
        const ELEMENT_TITLE = document.createElement('div')
        ELEMENT_TITLE.className = 'element-title'
        ELEMENT_TITLE.innerHTML = folder_name
        ELEMENT_DETAILS.append(ELEMENT_TITLE)
        const ELEMENT_PATH = document.createElement('div')
        ELEMENT_PATH.className = 'element-path'
        ELEMENT_PATH.innerHTML = '/' + folder_name
        ELEMENT_DETAILS.append(ELEMENT_PATH)
        fileElement.append(ELEMENT_DETAILS)
        document.getElementById('file-container').append(fileElement)
        document.getElementById('create-new-folder').removeAttribute('style')
        document.getElementById(document.getElementById('currentPath').value.replace('Home') + '/' + folder_name).addEventListener('dblclick', () => {
            history.pushState(null, null, location.pathname + document.getElementById(document.getElementById('currentPath').value.replace('Home') + '/' + folder_name).dataset.path)
            loadFiles()
        })
    })
    loadFiles()
})
window.addEventListener('popstate', data => {
    loadFiles()
})
async function loadFiles() {
    LOADER.style.display = 'flex'
    const PATH = location.pathname.replace(document.getElementById('file-form').dataset.root, '')
    document.getElementById('currentPath').value = 'Home' + PATH
    let FILE_INFO = await fetch(location.pathname, { method: 'PATCH' })
    if (FILE_INFO.status == 200) {
        FILE_INFO = await FILE_INFO.json()
    } else {
        document.querySelector('.file-container').innerHTML = 'Not found'
        LOADER.removeAttribute('style')
        return
    }
    document.getElementById('file-container').innerHTML = null
    FILE_INFO.forEach(j => {
        const fileElement = document.createElement('div')
        fileElement.className = 'file-element'
        fileElement.id = j.path
        fileElement.dataset.path = j.path
        fileElement.dataset.type = j.icon
        const CHECKBOX = document.createElement('input')
        CHECKBOX.type = 'checkbox'
        CHECKBOX.name = 'elementID'
        CHECKBOX.value = j.path
        CHECKBOX.className = 'element-checkbox'
        fileElement.append(CHECKBOX)
        const ICON = document.createElement('label')
        ICON.className = 'material-icons element-icon'
        ICON.innerHTML = j.icon
        fileElement.append(ICON)
        const ELEMENT_DETAILS = document.createElement('div')
        ELEMENT_DETAILS.className = 'element-details'
        const ELEMENT_TITLE = document.createElement('div')
        ELEMENT_TITLE.className = 'element-title'
        ELEMENT_TITLE.innerHTML = j.name
        ELEMENT_DETAILS.append(ELEMENT_TITLE)
        const ELEMENT_PATH = document.createElement('div')
        ELEMENT_PATH.className = 'element-path'
        ELEMENT_PATH.innerHTML = j.path
        ELEMENT_DETAILS.append(ELEMENT_PATH)
        fileElement.append(ELEMENT_DETAILS)
        document.getElementById('file-container').append(fileElement)
    })
    document.querySelectorAll('.file-element').forEach(d => {
        if (d.dataset.type == 'folder') {
            d.addEventListener('dblclick', () => {
                history.pushState(null, null, location.pathname + d.dataset.path)
                loadFiles()
            })
        }
    })
    LOADER.removeAttribute('style')
}
async function deleteFiles(array) {
    if (document.getElementById(array[CURRENT_DELETE_POITION]).dataset.type != 'folder') {
        LOADER.style.display = 'flex'
        if (array.length > 0) {
            const REQUEST_DELETE = await fetch('/admin/files/' + array[CURRENT_DELETE_POITION], { method: "DELETE" })
            if (REQUEST_DELETE.status == 200) {
                document.getElementById(array[CURRENT_DELETE_POITION]).remove()
                if (array.length > CURRENT_DELETE_POITION + 1) {
                    CURRENT_DELETE_POITION++
                    deleteFiles(array)
                } else {
                    LOADER.removeAttribute('style')
                }
            } else {
                alert('Delete failed')
                LOADER.removeAttribute('style')
            }
        } else {
            LOADER.removeAttribute('style')
        }
    } else {
        if (array.length > CURRENT_DELETE_POITION + 1) {
            CURRENT_DELETE_POITION++
            deleteFiles(array)
        } else {
            LOADER.removeAttribute('style')
        }
    }
}