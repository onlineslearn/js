var LINK_INFO
const ORIGIN = location.origin
const FIREBASE_REALTIME_DATABASE = 'https://cdntwit-default-rtdb.asia-southeast1.firebasedatabase.app'
window.addEventListener('DOMContentLoaded', async () => {
    const customContextMenu = document.getElementById('custom-context-menu')
    const NEW_INDEX_INPUT = document.getElementsByClassName('index-form-input')
    const DELETE_REQUEST_DIALOG = document.getElementById('delete-confirm-dialog')
    document.getElementById('index-request-form').addEventListener('submit', async e => {
        e.preventDefault()
        const formData = new FormData(document.getElementById('index-request-form'))
        if(formData.get('public-url').split('/').length>1){
            alert('Invalid Public URL!')
            return
        }
        document.getElementById('new-index-request').style.display = 'block'
        Object.keys(NEW_INDEX_INPUT).forEach(k => {
            NEW_INDEX_INPUT[k].disabled = true
        })
        const REQUEST = await fetch(`${FIREBASE_REALTIME_DATABASE}/image/${formData.get('public-url').split('.').join('D4D')}.json`, {
            method: "PATCH",
            body:JSON.stringify({originalUrl: formData.get('original-url')})
        }).catch(err => {
            alert(err)
            return
        })
        if (REQUEST.status == 200) {
            document.getElementById('index-request-form').reset()
            document.getElementById('navigationbar').checked=false
            LINK_FETCH()
        }
        Object.keys(NEW_INDEX_INPUT).forEach(k => {
            NEW_INDEX_INPUT[k].removeAttribute('disabled')
        })
        document.getElementById('new-index-request').removeAttribute('style')
    })
    document.addEventListener('click', k => {
        if (k.target.className != 'custom-context-bottom') {
            if (customContextMenu.style.display == 'block') {
                k.preventDefault()
                customContextMenu.removeAttribute('style')
            }
        }
    })
    document.getElementById('open-link').addEventListener('click', () => {
        window.open(LINK_INFO.originalUrl)
    })
    document.getElementById('copy-link').addEventListener('click', () => {
        navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
            if (result.state == 'granted' || result.state == 'prompt') {
                navigator.clipboard.writeText(LINK_INFO.url).then(e => {
                    customContextMenu.removeAttribute('style')
                }).catch(err => console.log(err))
            }
        })
    })
    document.getElementById('delete-link').addEventListener('click',()=>{
        customContextMenu.removeAttribute('style')
        DELETE_REQUEST_DIALOG.style.display='flex'
        const CLICKED_ID = LINK_INFO.url.replace(`${ORIGIN}/image/`,'').split('.').join('D4D')
        document.getElementById('delete-request-cancel').addEventListener('click',()=>{
            DELETE_REQUEST_DIALOG.removeAttribute('style')
        })
        document.getElementById('delete-confirmed').addEventListener('click',async ()=>{
            document.getElementById('delete-progressbar').style.display='block'
            document.getElementById('delete-request-cancel').disabled='true'
            document.getElementById('delete-confirmed').disabled='true'
            const deleteRequest = await fetch(`${FIREBASE_REALTIME_DATABASE}/image/${CLICKED_ID}.json`,{method:"DELETE"}).catch(err=>alert(err))
            if(deleteRequest.status==200){
                DELETE_REQUEST_DIALOG.removeAttribute('style')
                document.getElementById('delete-progressbar').removeAttribute('style')
                LINK_FETCH()
            }else{
                document.getElementById('delete-progressbar').removeAttribute('style')
            }
            document.getElementById('delete-request-cancel').removeAttribute('disabled')
            document.getElementById('delete-confirmed').removeAttribute('disabled')
        })
    })
    LINK_FETCH()
})
async function LINK_FETCH() {
    document.getElementById('index-delete-request').style.display='block'
    const FETCH_LINK = await fetch(`${FIREBASE_REALTIME_DATABASE}/image.json`).catch(err => alert(err))
    const INDEX_LIST_GROUP = document.querySelector('.index-list-group')
    if (FETCH_LINK.status == 200) {
        INDEX_LIST_GROUP.innerHTML=null
        const lINK_OBJECT = await FETCH_LINK.json()
        if(lINK_OBJECT !=null){
            Object.keys(lINK_OBJECT).forEach(x => {
                const ancher = document.createElement('a')
                ancher.href = `${ORIGIN}/image/${x.split('D4D').join('.')}`
                ancher.target='_blank'
                ancher.className = 'image-card-item'
                ancher.dataset['url'] = lINK_OBJECT[x].originalUrl
                ancher.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                <path
                    d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z" />
            </svg>`
                const ITEM_DETAILS = document.createElement('div')
                ITEM_DETAILS.className = 'item-detail'
                const IMG_URL = document.createElement('label')
                IMG_URL.className = 'public-path'
                IMG_URL.innerHTML = `${ORIGIN}/image/${x.split('D4D').join('.')}`
                const ORIGINAL_URL = document.createElement('label')
                ORIGINAL_URL.className = 'public-path'
                ORIGINAL_URL.innerHTML = lINK_OBJECT[x].originalUrl
                ITEM_DETAILS.append(IMG_URL)
                ITEM_DETAILS.append(ORIGINAL_URL)
                ancher.append(ITEM_DETAILS)
                INDEX_LIST_GROUP.append(ancher)
            })
        }
        document.getElementById('index-delete-request').removeAttribute('style')
        ACTION_SETUP()
    }
    document.getElementById('refresh-link').addEventListener('click',()=>{
        LINK_FETCH()
        document.getElementById('custom-context-menu').removeAttribute('style')
    })
}
function ACTION_SETUP(){
    const IMAGE_ITEMS = document.getElementsByClassName('image-card-item')
    Object.keys(IMAGE_ITEMS).forEach(k => {
        IMAGE_ITEMS[k].addEventListener('contextmenu', e => {
            e.preventDefault()
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
            if (document.querySelector('body').scrollHeight - e.clientY > 100) {
                customContextMenu.style.top = `${e.clientY}px`
            } else {
                customContextMenu.style.top = `${e.clientY - 100}px`
            }
        })
    })
}