window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sign-up-form').addEventListener('submit', form => {
        form.preventDefault()
        const formData = new FormData(document.getElementById('sign-up-form'))
        if (formData.get('person-name').length < 5 || formData.get('person-name').trim().split(' ').length<2) {
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Invalid Name'
            document.getElementById('dialog-message').innerHTML = 'Atleast enter first name and last name between space.'
        }else if (formData.get('date-of-birth').trim().length<5){
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Date Of Birth'
            document.getElementById('dialog-message').innerHTML = 'You must enter date of birth.'
        }else if(formData.get('person-gender') ==null){
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Gender missing!'
            document.getElementById('dialog-message').innerHTML = 'You must enter gender.'
        }else if(formData.get('person-phone-number').length<10){
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Invalid Phone Number'
            document.getElementById('dialog-message').innerHTML = 'Please enter valid 10 digit phone number.'
        }else if(formData.get('person-email').length<5){
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Email ID Missing'
            document.getElementById('dialog-message').innerHTML = 'Please enter valid email id.'
        }else if(formData.get('person-password').length<6){
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Password!'
            document.getElementById('dialog-message').innerHTML = 'Enter strongest password.'
        }else if(formData.get('user-agreement')==null){
            document.getElementById('custom-alert').style.display = 'flex'
            document.getElementById('dialog-title').innerHTML = 'Terms And Conditions!'
            document.getElementById('dialog-message').innerHTML = 'You must agree terms and conditions before creating account.'
        }
    })
    document.getElementById('verify-phone-number-form').addEventListener('submit',form=>{
        form.preventDefault()
    })
    document.getElementById('alert-accepted').addEventListener('click', () => {
        document.getElementById('custom-alert').removeAttribute('style')
        document.getElementById('dialog-title').innerHTML =null
        document.getElementById('dialog-message').innerHTML = null
    })
})