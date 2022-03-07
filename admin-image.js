let CURRENT_POSITION, LOADER_BACKGROUND, LOADER_CIRCLE
window.addEventListener('DOMContentLoaded', () => {
    LOADER_BACKGROUND = document.getElementById('main-proccess-window')
    LOADER_CIRCLE = document.getElementById('loader')
    document.getElementById('container-image-uploader').addEventListener('submit', async e => {
        e.preventDefault()
        LOADER_BACKGROUND.style.display = 'flex'
        LOADER_CIRCLE.style.display = 'block'
        const form = new FormData(document.getElementById('container-image-uploader'))
        const URL_SEARCH_PARAEMS = new URLSearchParams
        URL_SEARCH_PARAEMS.set('do','add')
        URL_SEARCH_PARAEMS.set('imageTitle', form.get('imageTitle'))
        URL_SEARCH_PARAEMS.set('imageDescription', form.get('imageDescrition'))
        URL_SEARCH_PARAEMS.set('imageCategory', form.get('imageCategory'))
        URL_SEARCH_PARAEMS.set('orininalImage', form.get('orininalImage'))
        URL_SEARCH_PARAEMS.set('thumbnailImage', form.get('thumbnailImage'))
        let response = await fetch(location.pathname, { method: "POST", body: URL_SEARCH_PARAEMS })
        if (response.status == 200) {
            document.getElementById('container-image-uploader').reset()
        } else {
            window.alert('Failed to add!')
        }
        LOADER_BACKGROUND.removeAttribute('style')
        LOADER_CIRCLE.removeAttribute('style')
        imageGetAll()
    })
    imageGetAll()
    document.getElementById('lists-images').addEventListener('submit', async e => {
        e.preventDefault()
        const form = new FormData(document.getElementById('lists-images'))
        CURRENT_POSITION=0
        if(confirm('Are you sure to delete?')){
            deleteImage(form.getAll('image-id'))
        }
    })
})
async function deleteImage(arrayId) {
    LOADER_BACKGROUND.style.display = 'flex'
    LOADER_CIRCLE.style.display = 'block'
    const parems = new URLSearchParams
    parems.set('imageId', arrayId[CURRENT_POSITION])
    parems.set('do', 'delete')
    const response = await fetch(location.pathname,{method:"POST",body:parems})
    if (response.status == 200) {
        document.getElementById(arrayId[CURRENT_POSITION]).remove()
    } else {
        alert('Faild to delete')
    }
    LOADER_BACKGROUND.removeAttribute('style')
    LOADER_CIRCLE.removeAttribute('style')
    if(CURRENT_POSITION<arrayId.length-1){
        CURRENT_POSITION++
        deleteImage(arrayId)
    }
}
function imageGetAll() {
    const xmlhttprequest = new XMLHttpRequest
    xmlhttprequest.responseType = 'json'
    xmlhttprequest.addEventListener('load', () => {
        document.getElementById('image-content').innerHTML = null
        Object.keys(xmlhttprequest.response).forEach(key => {
            const listContent = document.createElement('div')
            listContent.className = 'list-content'
            listContent.id = key
            const imgPreview = document.createElement('img')
            imgPreview.src = xmlhttprequest.response[key].ImageThumbnail
            listContent.append(imgPreview)
            const listContentDetails = document.createElement('div')
            listContentDetails.className = 'list-content-details'
            const imageTitle = document.createElement('div')
            imageTitle.className = 'list-content-title'
            imageTitle.innerHTML = xmlhttprequest.response[key].ImageTitle
            listContentDetails.append(imageTitle)
            const imageDescription = document.createElement('div')
            imageDescription.className = 'list-content-description'
            imageDescription.innerHTML = xmlhttprequest.response[key].ImageDescription
            listContentDetails.append(imageDescription)
            const imageCategory = document.createElement('div')
            imageCategory.className = 'list-content-category'
            imageCategory.innerHTML = xmlhttprequest.response[key].ImageCategory
            listContentDetails.append(imageCategory)
            const imageli = document.createElement('input')
            imageli.type = 'checkbox'
            imageli.name = 'image-id'
            imageli.value = key
            listContent.append(listContentDetails)
            listContent.append(imageli)
            document.getElementById('image-content').append(listContent)
        })
        document.getElementById('main-proccess-window').removeAttribute('style')
        document.getElementById('loader').removeAttribute('style')
    })
    const form = new URLSearchParams
    form.set('do', 'get')
    xmlhttprequest.addEventListener('error', err => alert(err))
    xmlhttprequest.open('POST', location.pathname)
    xmlhttprequest.send(form)
}