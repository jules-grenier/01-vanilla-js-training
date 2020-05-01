const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_visibility_trigger = document.getElementById('action');
const field_list = [ username, email, password ];
const required_field_list = [ username, email, password ];

function togglePasswordVisibility() {
  if (password_visibility_trigger.className === 'far fa-eye') {
    password_visibility_trigger.className = 'far fa-eye-slash';
    password.type = 'text';
  } else {
    password_visibility_trigger.className = 'far fa-eye';
    password.type = 'password';
  }
}

function resetPasswordVisibility() {
  password_visibility_trigger.className = 'far fa-eye';
  password.type = 'password';
}

function getFieldName(field) {
  const name = field.id;

  return name.replace(name.charAt(0), name.charAt(0).toUpperCase());
}

function showError(field, message) {
  const form_control = field.closest('.form-control');
  const message_holder = form_control.querySelector('.message-holder');

  form_control.classList.add('error');
  message_holder.innerText = message;
}

function hideError(field) {
  const form_control = field.closest('.form-control');

  form_control.classList.remove('error');
}

function checkRequiredFields(fields) {
  const validations = Array(fields.length).fill(false);

  for(let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    const field_name = getFieldName(field);
    let error_message = `${field_name} is required`;

    if (field.value.trim() === '') {
      showError(field, error_message);
    } else {
      hideError(field);
      validations[i] = true;
    }
  }
  console.log(validations)

  return !validations.includes(false);
}

function checkEmail(field) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(field.value).trim())) {
    showError(field, 'Email address is invalid');

    return false;
  } else {
    hideError(field);

    return true;
  }
}

function checkLength(field, min, max) {
  if (field.value.length < min || field.value.length > max) {
    const field_name = getFieldName(field);

    showError(field, `${field_name} must be between ${min} and ${max} characters`);

    return false;
  }

  return true;
}

password_visibility_trigger.addEventListener('click', (e) => {
  togglePasswordVisibility();
});

field_list.forEach((field) => {
  field.addEventListener('change', (e) => {
    hideError(field);
  })
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  resetPasswordVisibility();

  if (!checkRequiredFields(required_field_list)) return;
  if (!checkLength(username, 3, 20)) return;
  if (!checkLength(password, 8, 32)) return;
  if (!checkEmail(email)) return;

  // post

});
