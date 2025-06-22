;

const form = document.querySelector('form');

const checkbox = document.querySelector('#check');
const checkbox_error= document.querySelector('#consent-checkbox-error-message') 
    
const radiobutton1 = document.querySelector('#general-enquery');
const radiobutton2 = document.querySelector('#support-request');
const radioBorder1 = radiobutton1.closest('.radio-border');
const radioBorder2 = radiobutton2.closest('.radio-border');
const radiobutton_error = document.querySelector('#radio-buttons-error-message');

const submitButton = document.querySelector('.submit-btn');
let errors = 0;
const fields = [
    {
        input: document.querySelector('#first-name'),
        error: document.querySelector('#firstname-error-message')
    },
    {
        input: document.querySelector('#last-name'),
        error: document.querySelector('#lastname-error-message')
    },

    {
        input: document.querySelector('#message'),
        error: document.querySelector('#message-text-error-message')
    },
     {  
        input: document.querySelector('#check'),
        error: document.querySelector('#consent-checkbox-error-message') 
    }
];


form.addEventListener('submit', validate);
submitButton.addEventListener('click', submitForm);

radiobutton1.addEventListener('change', () => {
    if (radiobutton1.checked) {
        radioBorder1.style.background = '#e0f1e8'; 
    } else {
        radioBorder1.style.background = 'white';
    }

    radioBorder2.style.background = radiobutton2.checked ? '#e0f1e8' : 'white';
});
    
radiobutton2.addEventListener('change', () => {
        if (radiobutton2.checked) {
            radioBorder2.style.background = '#e0f1e8';
        } else {
            radioBorder2.style.background = 'white';
        }

        radioBorder1.style.background = radiobutton1.checked ? '#e0f1e8' : 'white';
    });
    


function submitForm(event){
    
    event.preventDefault();
    errors = 0; 
   
    validate(event);
     if (errors < 1 ){
            showToast("<br/>Message Sent! <br/> Thanks for completing the form. We'll be in touch soon! ", successIcon)
       }
       else {
           showToast("Please fill out all required fields correctly.");
       }
}


function emailValidate(){
        const emailField = document.querySelector('#email');
        const emailError = document.querySelector('#email-error-message');
       
    
        const emailValue = emailField.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
         
        let emailErrors = 0;    

        if (emailValue === '') {
            emailError.textContent = 'This field is required';
            
            showErrorMessages(emailError);
             emailField.style.border = '1px solid red';
            emailError.style.color = 'red'; 
            emailErrors++;
            console.log('Email field is empty');
        } else if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            
            showErrorMessages(emailError);
             emailError.style.color = 'red';
            emailField.style.border = '1px solid red'; 
            emailErrors++;
            console.log('Invalid email format');
        } else {
            
            hideErrorMessages(emailError);
             emailField.style.border = '1px solid var(--color-grey-900)'; 
           
        }

        return emailErrors;
    

}

function validate(event){


    errors = 0; 
    errors += emailValidate();    
    fields.forEach(({input, error}) => {
        if (input.value.trim() === '') {
            showErrorMessages(error);
            input.style.border = '1px solid red';
             errors++;
        } else {
            hideErrorMessages(error);
            input.style.border ='1px solid #0C7D69';
       
            
        }
    });
     if (!radiobutton1.checked && !radiobutton2.checked) {
        showErrorMessages(radiobutton_error);
        radiobutton1.style.border = '1px solid red';
        radiobutton2.style.border = '1px solid red';
         errors++;

    } else {
        hideErrorMessages(radiobutton_error);
        radiobutton1.style.border = '1px solid #0C7D69';
        radiobutton2.style.border = '1px solid #0C7D69';
        
    }


    if (!checkbox.checked) {
        showErrorMessages(checkbox_error);
        checkbox.style.border = '1px solid red';
         errors++;
    }
    else {
        hideErrorMessages(checkbox_error);
        checkbox.style.border = '1px solid #0C7D69';
        
    }

     event.preventDefault();

}

function showErrorMessages(element){
    element.classList.remove('hidden')
    element.style.color = 'red';
    
}

function hideErrorMessages(element){
    element.classList.add('hidden')
    element.style.border = 'none';
   
}

const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21"><path fill="#fff" d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"/></svg>`

function showToast(message, icon = null) {
    const toast = document.getElementById('toast');
    toast.innerHTML = icon ? `${icon}<span style="margin-left:0.5rem">${message}</span>` : message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}


   
   