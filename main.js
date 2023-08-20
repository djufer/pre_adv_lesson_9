const inputLogin = document.getElementById('input-login');
const inputPassword = document.getElementById('input-password');
const inputEmail = document.getElementById('input-email');
const btnAddUser = document.getElementById('btnAddUser');
const tableBody = document.getElementById('tableBody');
let baseUsers = [];
if (localStorage.getItem('baseUsers')) {
    baseUsers = JSON.parse(localStorage.getItem('baseUsers'));
    render();
}
btnAddUser.addEventListener('click', getInputValues);
class User {
    login;
    password;
    email;
    id;
    constructor(login, password, email) {
        this.login = login;
        this.password = password;
        this.email = email;
    }
}
function addUser(login, password, email) {
    const action = btnAddUser.getAttribute('data-action');
    if (action === 'addUser') {
        baseUsers.push(new User(login, password, email));
        localStorage.setItem('baseUsers', JSON.stringify(baseUsers));
        clearInputs();
    }
    else if (action === 'editUser') {
        const rowEdit = btnAddUser.getAttribute('data-rowEdit');
        btnAddUser.setAttribute('data-action', 'addUser');
        editUser(+rowEdit);
        localStorage.setItem('baseUsers', JSON.stringify(baseUsers));
        render();
        btnAddUser.textContent = 'Add user';
        clearInputs();
    }
}
function defaultInput(elem) {
    elem.addEventListener('focus', () => {
        elem.classList.remove('wrongInput');
    });
}
;
defaultInput(inputLogin);
defaultInput(inputPassword);
defaultInput(inputEmail);
function getInputValues(event) {
    event.preventDefault();
    if (checkLogUnput(inputLogin.value) &&
        checkPassUnput(inputPassword.value) &&
        checkEmailUnput(inputEmail.value)) {
        addUser(inputLogin.value, inputPassword.value, inputEmail.value);
        tableBody.textContent = '';
        render();
    }
    else {
        if (!checkLogUnput(inputLogin.value)) {
            inputLogin.classList.add('wrongInput');
        }
        if (!checkPassUnput(inputPassword.value)) {
            inputPassword.classList.add('wrongInput');
        }
        if (!checkEmailUnput(inputEmail.value)) {
            inputEmail.classList.add('wrongInput');
        }
    }
}
function render() {
    for (let i = 0; i < baseUsers.length; i++) {
        let tr = document.createElement('tr');
        let tdID = document.createElement('td');
        tdID.textContent = (i + 1).toString();
        let tdLog = document.createElement('td');
        tdLog.textContent = baseUsers[i].login;
        let tdPassw = document.createElement('td');
        tdPassw.textContent = baseUsers[i].password;
        let tdEmail = document.createElement('td');
        tdEmail.textContent = baseUsers[i].email;
        let tdEdit = document.createElement('td');
        let buttonEdit = document.createElement('button');
        buttonEdit.textContent = 'Edit';
        buttonEdit.classList.add('btnEdit');
        tdEdit.appendChild(buttonEdit);
        let tdDelete = document.createElement('td');
        let buttonDelete = document.createElement('button');
        buttonDelete.textContent = "Delete";
        buttonDelete.classList.add('btnDelete');
        tdDelete.appendChild(buttonDelete);
        tr.appendChild(tdID);
        tr.appendChild(tdLog);
        tr.appendChild(tdPassw);
        tr.appendChild(tdEmail);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);
        tableBody.appendChild(tr);
    }
}
function checkLogUnput(inputed) {
    let inpPegex = /^\w{3,16}$/;
    if (inpPegex.test(inputed)) {
        return true;
    }
    else {
        return false;
    }
}
function checkPassUnput(inputed) {
    let inpPegexp = /^\w{3,16}$/;
    if (inpPegexp.test(inputed)) {
        return true;
    }
    else {
        return false;
    }
}
function checkEmailUnput(inputed) {
    let inpPegexp = /^\w{2,16}@\w{2,6}.\w{2,5}$/;
    if (inpPegexp.test(inputed)) {
        return true;
    }
    else {
        return false;
    }
}
tableBody.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('btnDelete')) {
        let row = target.closest('tr');
        let rowIndexDelete = Array.from(tableBody.children).indexOf(row);
        baseUsers.splice(rowIndexDelete, 1);
        localStorage.setItem('baseUsers', JSON.stringify(baseUsers));
        tableBody.textContent = '';
        render();
    }
    if (target.classList.contains('btnEdit')) {
        let row = target.closest('tr');
        let rowIndexEdit = Array.from(tableBody.children).indexOf(row);
        btnAddUser.setAttribute('data-rowEdit', rowIndexEdit.toString());
        btnAddUser.setAttribute('data-action', 'editUser');
        btnAddUser.setAttribute('data-rowEdit', rowIndexEdit.toString());
        btnAddUser.textContent = 'Edit user';
        inputLogin.value = baseUsers[rowIndexEdit].login;
        inputPassword.value = baseUsers[rowIndexEdit].password;
        inputEmail.value = baseUsers[rowIndexEdit].email;
        btnAddUser.value = 'Edit user';
    }
});
function editUser(rowIndexEdit) {
    baseUsers[rowIndexEdit].login = inputLogin.value;
    baseUsers[rowIndexEdit].password = inputPassword.value;
    baseUsers[rowIndexEdit].email = inputEmail.value;
}
function clearInputs() {
    inputLogin.value = '';
    inputPassword.value = '';
    inputEmail.value = '';
}
