window.addEventListener('DOMContentLoaded', () => {
    const INPUT_VALUE = document.getElementById('url')
    const FORM_SUBMIT = document.getElementById('submit')
    const progressBar = document.getElementById('request-progressbar')
    const SHORT_DOMAIN = document.getElementById('shortner-form').dataset.domain
    document.getElementById('shortner-form').addEventListener('submit', async evnt => {
        evnt.preventDefault()
        progressBar.style.display = 'block'
        if (INPUT_VALUE.disabled) {
            window.open(INPUT_VALUE.value)
        } else {
            INPUT_VALUE.disabled = true
            FORM_SUBMIT.disabled = true
            const urlparam = new URLSearchParams
            urlparam.append('OriginalUrl', INPUT_VALUE.value)
            const response = await fetch('/file.json', { method: "GET" }).catch(err => alert(err))
            if (response.status == 200) {
                const shortId = (await response.json()).shortId
                INPUT_VALUE.value = SHORT_DOMAIN +'/' + shortId
                FORM_SUBMIT.value = 'OPEN LINK'
                FORM_SUBMIT.disabled = false
            } else {
                INPUT_VALUE.disabled = false
                FORM_SUBMIT.disabled = false
                alert('Failed')
            }
        }
        progressBar.removeAttribute('style')
    })
})