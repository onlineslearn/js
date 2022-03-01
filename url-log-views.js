window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('progressbar-background').style.display = 'block'
    const LOG_ID = document.getElementById('url-id').innerText
    fetch(`https://world-clouds-default-rtdb.asia-southeast1.firebasedatabase.app/shortUrl/${LOG_ID}/log.json`).then(data => data.json()).then(jsonOBJ => {
        Object.keys(jsonOBJ).forEach(docKey => {
            const jsonChild = jsonOBJ[docKey]
            const contentChild = document.createElement('div')
            contentChild.id = docKey
            contentChild.className = 'content-child'
            const accessTime = document.createElement('div')
            accessTime.className = 'access-time'
            const logTime = document.createElement('div')
            logTime.className = 'time'
            logTime.innerHTML = 'Time:' + new Date(parseInt(docKey))
            const childCheckbox = document.createElement('input')
            childCheckbox.type = 'checkbox'
            childCheckbox.name = 'log-id'
            childCheckbox.value = docKey.toString()
            const clientIpAddress = document.createElement('div')
            clientIpAddress.className = 'client-ip-address'
            clientIpAddress.innerHTML = 'IP Address:' + jsonChild.clientIP
            const osInfo = document.createElement('div')
            osInfo.className = 'os-info'
            osInfo.innerHTML = `Device Type: ${jsonChild.clientDeviceType} And Operating System: ${jsonChild.clientOSName} ${jsonChild.clientOSVersion}`
            const browserInfo = document.createElement('div')
            browserInfo.className = 'browser-info'
            browserInfo.innerHTML = `Browser: ${jsonChild.clientBrowserName} Version: ${jsonChild.clientBrowserVersion}`
            const deviceInfo = document.createElement('div')
            deviceInfo.className = 'device-info'
            deviceInfo.innerHTML = `Device: ${jsonChild.clientDeviceBrand} ${jsonChild.clientDeviceModel}`
            accessTime.append(logTime)
            accessTime.append(childCheckbox)
            contentChild.append(accessTime)
            contentChild.append(clientIpAddress)
            contentChild.append(osInfo)
            contentChild.append(browserInfo)
            contentChild.append(deviceInfo)
            document.getElementById('log-contents').prepend(contentChild)
        })
        document.getElementById('progressbar-background').removeAttribute('style')
    })
    document.getElementById('form-log').addEventListener('submit',form=>{
        if(!confirm('Are you sure to delete all?')){
            form.preventDefault()
        }
    })
    document.getElementById('action-delete').addEventListener('click', () => {
        const formdata = new FormData(document.getElementById('form-log'))
        if (formdata.getAll('log-id').length < 1) {
            return
        }
        if (confirm('Are you sure to delete')) {
            formdata.getAll('log-id').forEach(key => {
                document.getElementById('progressbar-background').style.display = 'block'
                fetch(`https://world-clouds-default-rtdb.asia-southeast1.firebasedatabase.app/shortUrl/${LOG_ID}/log/${key}.json`, { method: 'DELETE' }).then(response => {
                    if (response.status == 200) {
                        document.getElementById(key).remove()
                        document.getElementById('progressbar-background').removeAttribute('style')
                    }
                }).catch(err => {
                    document.getElementById('progressbar-background').removeAttribute('style')
                    console.log(err)
                })
            })
        }

    })
})