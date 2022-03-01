window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('file').addEventListener('submit', async e => {
        e.preventDefault()
        getBase64(document.getElementById('file-content').files[0])
    })
})
var TOTAL_SPLITS, CURRENT_UPLOAD_POSITION
function getBase64(file) {
    const BUFFER_LENGTH = 50000
    let CURRENT_POSITION = 0
    const base64Array = new Array
    var reader = new FileReader();
    CURRENT_UPLOAD_POSITION = 0
    reader.readAsDataURL(file)
    reader.onload = function () {
        const base64data = reader.result.split(';base64,').pop()
        TOTAL_SPLITS = Math.ceil(reader.result.length / BUFFER_LENGTH)
        document.getElementById('progressbar').max = TOTAL_SPLITS.toString()
        for (let i = 0; i < TOTAL_SPLITS; i++) {
            base64Array.push(base64data.slice(CURRENT_POSITION, CURRENT_POSITION + BUFFER_LENGTH))
            CURRENT_POSITION = CURRENT_POSITION + BUFFER_LENGTH
        }
        splitFileUpload(base64Array,file.name.toLowerCase().split(' ').join('-'))
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
async function splitFileUpload(data,filename) {
    const FORM_DATA = new URLSearchParams
    FORM_DATA.set('base64data', data[CURRENT_UPLOAD_POSITION])
    FORM_DATA.set('totalSplit', TOTAL_SPLITS-1 .toString())
    FORM_DATA.set('currentSplit', CURRENT_UPLOAD_POSITION.toString())
    FORM_DATA.set('fileName',filename)
    const fetch_api = await fetch(location.href,{method:'POST',body:FORM_DATA})
    if(fetch_api.status==200){
        if(CURRENT_UPLOAD_POSITION<TOTAL_SPLITS){
            splitFileUpload(data,filename)
            CURRENT_UPLOAD_POSITION++
        }
        document.getElementById('progressbar').value = CURRENT_UPLOAD_POSITION
    }else{
        window.alert('Upload Failed')
    }
}