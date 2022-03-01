$('window').on('DOMContentLoaded', () => {
    $('mobile-menu-background').on('click',()=>{
        if(location.hash=='#menu'){
            history.back()
        }
    })
})
function $(id) {
    const self = {
        element: () => {
            if (id != 'window') {
                return document.getElementById(id)
            }
        },
        on: (type, callback) => {
            if (id === 'window') {
                return window.addEventListener(type, callback)
            } else {
                return self.element().addEventListener(type, callback)
            }

        },
        show: (displayType) => {
            if (typeof (displayType) != 'undefined') {
                return self.element().style.display = displayType
            } else {
                return self.element().style.display = 'block'
            }
        },
        hide: () => {
            return self.element().removeAttribute('style')
        }
    }
    return self
}