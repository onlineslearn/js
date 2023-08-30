let contextValue = null
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('more-action').addEventListener('click', () => {
        document.getElementById('file-menu').style.display = 'block'
    })
    document.getElementById('post-content').addEventListener('click', () => {
        if (document.getElementById('file-menu').style.display == 'block') {
            document.getElementById('file-menu').removeAttribute('style')
        }
    })
    document.getElementById('menu-upload').addEventListener('click', () => {
        document.getElementById('file-menu').removeAttribute('style')
        document.getElementById('custom-alert-dialog-background').style.display = 'flex'
        document.getElementById('dialog-upload').style.display = 'block'
    })
    document.getElementById('upload-cancel').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-upload').removeAttribute('style')
    })
    document.getElementById('menu-new-folder').addEventListener('click', () => {
        document.getElementById('file-menu').removeAttribute('style')
        document.getElementById('custom-alert-dialog-background').style.display = 'flex'
        document.getElementById('dialog-new-folder').style.display = 'block'
    })
    document.getElementById('new-folder-cancel').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-new-folder').removeAttribute('style')
    })
    document.getElementById('action-rename').addEventListener('click', () => {
        document.getElementById('custom-context-menu').removeAttribute('style')
        document.getElementById('custom-alert-dialog-background').style.display = 'flex'
        document.getElementById('dialog-rename').style.display = 'block'
        document.getElementById('rename-input').value = window.atob(contextValue)
    })
    document.getElementById('action-download').addEventListener('click', () => {
        document.getElementById('custom-context-menu').removeAttribute('style')
        const folderPath = document.getElementById('absolute-path').value
        if (document.getElementById(contextValue).dataset.type != 'folder') {
            window.open(folderPath + '/' + window.atob(contextValue))
        }
    })
    document.getElementById('action-copy-link').addEventListener('click', () => {
        document.getElementById('custom-context-menu').removeAttribute('style')
        const folderPath = document.getElementById('absolute-path').value
        if (document.getElementById(contextValue).dataset.type != 'folder') {
            navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
                if (result.state == 'granted' || result.state == 'prompt') {
                    navigator.clipboard.writeText(location.origin+folderPath + '/' + window.atob(contextValue)).then(e => {
                        
                    }).catch(err => console.log(err))
                }
            })
        }
    })
    document.getElementById('rename-cancel').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-rename').removeAttribute('style')
    })
    document.getElementById('action-delete').addEventListener('click', () => {
        document.getElementById('custom-context-menu').removeAttribute('style')
        document.getElementById('custom-alert-dialog-background').style.display = 'flex'
        document.getElementById('dialog-delete').style.display = 'block'
    })
    document.getElementById('delete-cancel').addEventListener('click', () => {
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-delete').removeAttribute('style')
    })
    // document.getElementById('menu-delete-all').addEventListener('click', () => {
    //     let checkboxSelected = 0
    //     document.getElementsByName('item').forEach(x => {
    //         if (x.checked) {
    //             checkboxSelected += 1
    //         }
    //     })
    //     if (checkboxSelected < 1) {
    //         return
    //     }
    //     document.getElementById('file-menu').removeAttribute('style')
    //     document.getElementById('custom-alert-dialog-background').style.display = 'flex'
    //     document.getElementById('dialog-delete-all').style.display = 'block'
    // })
    // document.getElementById('delete-cancel-all').addEventListener('click', () => {
    //     document.getElementById('custom-alert-dialog-background').removeAttribute('style')
    //     document.getElementById('dialog-delete-all').removeAttribute('style')
    // })
    document.getElementById('action-open').addEventListener('click', () => {
        document.getElementById('custom-context-menu').removeAttribute('style')
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        const folderPath = document.getElementById('absolute-path').value
        if (document.getElementById(contextValue).dataset.type == 'folder') {
            loadDir(folderPath + '/' + window.atob(contextValue))
            document.getElementById('absolute-path').value += '/' + window.atob(contextValue)
        }else{
            window.open(folderPath + '/' + window.atob(contextValue))
        }
    })
    document.getElementById('action-back').addEventListener('click', () => {
        const newPath = new Array
        document.getElementById('absolute-path').value.split('/').forEach((data, index) => {
            if (index < document.getElementById('absolute-path').value.split('/').length - 1 && data != '') {
                newPath.push(data)
            }
        })
        if (newPath.length > 0) {
            document.getElementById('absolute-path').value = '/' + newPath.join('/')
            loadDir(newPath.join('/'))
        } else {
            loadDir('root')
            document.getElementById('absolute-path').value = null
        }
    })
    document.getElementById('menu-reload').addEventListener('click', () => {
        document.getElementById('file-menu').removeAttribute('style')
        if (document.getElementById('absolute-path').value != null) {
            loadDir(document.getElementById('absolute-path').value)
        } else {
            loadDir('root')
        }
    })
    document.getElementById('action-rename-request').addEventListener('click', async () => {
        document.getElementById('rename-progressbar').style.display = 'block'
        const body = new URLSearchParams
        body.set('oldName', window.atob(contextValue))
        body.set('newName', document.getElementById('rename-input').value)
        body.set('action', 'rename')
        body.set('path', document.getElementById('absolute-path').value)
        const request = await fetch(location.pathname, {
            method: "PUT",
            body: body,
            credentials: "include"
        })
        if (request.status != 200) {
            alert('Failed To Rename')
        } else {
            document.getElementById('file-menu').removeAttribute('style')
            if (document.getElementById('absolute-path').value != null) {
                loadDir(document.getElementById('absolute-path').value)
            } else {
                loadDir('root')
            }
        }
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-rename').removeAttribute('style')
        document.getElementById('rename-progressbar').removeAttribute('style')
    })
    document.getElementById('new-folder-create').addEventListener('click', async () => {
        const body = new URLSearchParams
        body.set('action', 'create-folder')
        body.set('folderName', document.getElementById('create-folder-input').value)
        if (body.get('folderName').length < 1) {
            return
        }
        document.getElementById('folder-progressbar').style.display = 'block'
        body.set('path', document.getElementById('absolute-path').value)
        const request = await fetch(location.pathname, {
            method: "PUT",
            body: body,
            credentials: "include"
        })
        if (request.status != 200) {
            alert('Failed To Create')
        } else {
            if (document.getElementById('absolute-path').value != null) {
                loadDir(document.getElementById('absolute-path').value)
            } else {
                loadDir('root')
            }
        }
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-new-folder').removeAttribute('style')
        document.getElementById('folder-progressbar').removeAttribute('style')
    })
    document.getElementById('action-btn-delete').addEventListener('click', async () => {
        const body = new URLSearchParams
        body.set('action', 'delete')
        body.set('deleteName', window.atob(contextValue))
        document.getElementById('delete-progressbar').style.display = 'block'
        body.set('path', document.getElementById('absolute-path').value)
        const request = await fetch(location.pathname, {
            method: "PUT",
            body: body,
            credentials: "include"
        })
        if (request.status != 200) {
            alert('Failed To Delete')
        } else {
            if (document.getElementById('absolute-path').value != null) {
                loadDir(document.getElementById('absolute-path').value)
            } else {
                loadDir('root')
            }
        }
        document.getElementById('custom-alert-dialog-background').removeAttribute('style')
        document.getElementById('dialog-delete').removeAttribute('style')
        document.getElementById('delete-progressbar').removeAttribute('style')
    })
    document.getElementById('action-btn-upload').addEventListener('click', async () => {
        const body = new FormData
        body.set('action', 'upload')
        if (document.getElementById('upload-file-selector').files.length < 1) {
            return
        }
        body.set('file', document.getElementById('upload-file-selector').files[0])
        body.set('path', document.getElementById('absolute-path').value)
        const fileUploader = new XMLHttpRequest
        fileUploader.open('POST', location.pathname)
        const UploadBar = document.getElementById('upload-bar')
        UploadBar.style.display = 'block'
        fileUploader.upload.addEventListener('progress', p => {
            UploadBar.style.width = `${(p.loaded / p.total) * 100}%`
        })
        fileUploader.addEventListener('load', response => {
            if (fileUploader.status == 200) {
                document.getElementById('custom-alert-dialog-background').removeAttribute('style')
                document.getElementById('dialog-upload').removeAttribute('style')
                if (document.getElementById('absolute-path').value != null) {
                    loadDir(document.getElementById('absolute-path').value)
                } else {
                    loadDir('root')
                }
            } else {
                alert('Failed To Upload')
            }
            UploadBar.removeAttribute('style')
        })
        fileUploader.send(body)
        document.getElementById('upload-cancel').addEventListener('click', () => {
            fileUploader.abort()
        })
    })
    loadDir('root')
})
document.addEventListener('click', k => {
    const customContextMenu = document.getElementById('custom-context-menu')
    if (k.target.className != 'custom-context-bottom' && k.target.className != '') {
        if (customContextMenu.style.display == 'block') {
            k.preventDefault()
            customContextMenu.removeAttribute('style')
        }
    }
})
async function loadDir(path) {
    document.getElementById('loading-folder').style.display = 'block'
    document.getElementById('post-content').style.display = 'none'
    const postBody = new URLSearchParams
    postBody.set('path', path)
    const request = await fetch(location.pathname, { method: "PATCH", body: postBody, credentials: "include" })
    if (request.status != 200) {
        document.getElementById('post-content').removeAttribute('style')
        return
    }
    document.getElementById('post-content').innerHTML = null
    const FolderData = await request.json()
    FolderData.forEach(fileInfo => {
        const listItem = document.createElement('div')
        listItem.className = 'list-item'
        listItem.dataset.value = window.btoa(fileInfo.name)
        const img = document.createElement('img')
        img.src = '/icons/' + fileInfo.icon
        listItem.append(img)
        const details = document.createElement('div')
        details.className = 'details'
        const fileTitle = document.createElement('div')
        fileTitle.className = 'file-title'
        fileTitle.innerHTML = fileInfo.name
        details.append(fileTitle)
        const fileType = document.createElement('div')
        fileType.className = 'file-type'
        fileType.innerHTML = fileInfo.type
        details.append(fileType)
        listItem.append(details)
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'item'
        checkbox.id = window.btoa(fileInfo.name)
        checkbox.value = window.btoa(fileInfo.name)
        checkbox.dataset.type = fileInfo.type
        listItem.append(checkbox)
        document.getElementById('post-content').append(listItem)
    })
    ACTION_SETUP()
    document.getElementById('post-content').removeAttribute('style')
    document.getElementById('loading-folder').removeAttribute('style')
}
function ACTION_SETUP() {
    const IMAGE_ITEMS = document.getElementsByClassName('list-item')
    Object.keys(IMAGE_ITEMS).forEach(k => {
        IMAGE_ITEMS[k].addEventListener('contextmenu', e => {
            e.preventDefault()
            contextValue = IMAGE_ITEMS[k].dataset.value
            LINK_INFO = {
                url: IMAGE_ITEMS[k].href,
                originalUrl: IMAGE_ITEMS[k].dataset['url']
            }
            const customContextMenu = document.getElementById('custom-context-menu')
            customContextMenu.removeAttribute('style')
            customContextMenu.style.display = 'block'
            if (window.innerWidth - e.clientX > 200) {
                customContextMenu.style.left = `${e.clientX}px`
            } else {
                customContextMenu.style.left = `${e.clientX - 200}px`
            }
            if (document.querySelector('body').scrollHeight - e.pageY > 210) {
                customContextMenu.style.top = `${e.pageY}px`
            } else {
                customContextMenu.style.top = `${document.querySelector('body').scrollHeight - 210}px`
            }
        })
        IMAGE_ITEMS[k].addEventListener('click', () => {
            const folderPath = document.getElementById('absolute-path').value.replace('Home:/', '').replace('Home:', '')
            if (document.getElementById(IMAGE_ITEMS[k].dataset.value).dataset.type == 'folder') {
                loadDir(folderPath + '/' + window.atob(IMAGE_ITEMS[k].dataset.value))
                document.getElementById('absolute-path').value += '/' + window.atob(IMAGE_ITEMS[k].dataset.value)
            }
        })
    })
}