const name = document.getElementById('name')
const email = document.getElementById('email')
const comment = document.getElementById('comment')


form.addEventListener('submit' , (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs(){
    // get the values from the inputs
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const commentValue = comment.value.trim();

    if(nameValue === ''){
        // show error
        // add error  
        setErrorFor(name, 'Name cannot be blank');
    }else{
        // add success class
        setSuccessFor(name);
    }

    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank');
    }else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
    }else{
        setSuccessFor(email);
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className = 'form-contact error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-contact success';
}

function isEmail(email){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

/* 
let messages = [];
if(name.value === '' || name.value == null){
    messages.push('Name is required');
}
if(email.value === '' || email.value == null){
    messages.push('Please enter an email address')
}
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)){
    {
    }{
        messages.push('Invalid email address');
    }
}
if(messages.length > 0){
    e.preventDefault();
    errorElement.innerText = messages.join(',')
}
*/

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function(e) {
        $('#blah').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  
  $("#imgInp").change(function() {
    readURL(this);
  });

  function preview() {
    frame.src=URL.createObjectURL(event.target.files[0]);
}