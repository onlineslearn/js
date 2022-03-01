window.addEventListener('DOMContentLoaded', (req, res) => {
    document.getElementById('mobile-menu-background').addEventListener('click', () => {
        if (location.hash == '#menu') {
            history.back()
        }
    })
    document.getElementById('post-form').addEventListener('submit', e => {
        e.preventDefault()
        const FORM = new FormData(document.getElementById('post-form'))
        if (FORM.getAll('element-id').length > 0 && confirm('Are you sure to delete?')) {
            FORM.getAll('element-id').forEach(x => {
                document.getElementById('progressbar-background').style.display = 'block'
                const urlparams = new URLSearchParams
                urlparams.set('deleteInfo', x)
                fetch(location.pathname, { method: "POST", body: urlparams }).then(response => {
                    if (response.status==200) {
                        document.getElementById('progressbar-background').removeAttribute('style')
                        document.getElementById(x).remove()
                    } else {
                        document.getElementById('progressbar-background').removeAttribute('style')
                    }
                }).catch(err => {
                    console.log(err)
                    document.getElementById('progressbar-background').removeAttribute('style')
                })
            })
        }
    })
})