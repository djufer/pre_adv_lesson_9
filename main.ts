const inputLogin = document.getElementById('input-login') as HTMLInputElement;
const inputPassword = document.getElementById('input-password') as HTMLInputElement;
const inputEmail = document.getElementById('input-email') as HTMLInputElement;
const btnAddUser = document.getElementById('btnAddUser') as HTMLButtonElement;
const tableBody = document.getElementById('tableBody') as HTMLElement;
let baseUsers: Array<User> = [];

if (localStorage.getItem('baseUsers')) {
    baseUsers = JSON.parse(localStorage.getItem('baseUsers'))
    render();
}

btnAddUser.addEventListener('click', getInputValues)

class User{
    id: string;
    constructor(public login: string, public password: string, public email: string ) {} 
}

function addUser(login: string, password: string, email: string) {
    const action = btnAddUser.getAttribute('data-action');
    if (action === 'addUser') {
         // пушимо нового юзера у baseUsers
        baseUsers.push(new User(login, password, email));
        // додаємо всю базу baseUsers в LocalStorage
        localStorage.setItem('baseUsers', JSON.stringify(baseUsers))
        // Очищуємо поля інпутів
        clearInputs(); 
    } else if (action === 'editUser') {
        const rowEdit = btnAddUser.getAttribute('data-rowEdit');


        btnAddUser.setAttribute('data-action', 'addUser'); 

        editUser(+rowEdit);
        localStorage.setItem('baseUsers', JSON.stringify(baseUsers))
        render();
        btnAddUser.textContent = 'Add user';
        clearInputs(); 
    }
    
}
// ++++ Функція яка видаляє клас wrongInput при фокусі. Якщо такий раніше був доданий
function defaultInput(elem: HTMLInputElement) {
    elem.addEventListener('focus', () => {
        elem.classList.remove('wrongInput')
        // elem.value = '';
    })
};
defaultInput(inputLogin);
defaultInput(inputPassword);
defaultInput(inputEmail);


function getInputValues(event: any) {
    event.preventDefault();
    // валідація полів
    if (checkLogUnput(inputLogin.value) &&
        checkPassUnput(inputPassword.value) &&
        checkEmailUnput(inputEmail.value)) {
            
        
            addUser(inputLogin.value, inputPassword.value, inputEmail.value);
            tableBody.textContent = '';
            // запуск ф-ції неповнення таблиці
            render();
    } else {
        // якщо якесь із полів не пройшло валідацію, то додаємо клас wrongInput
        if (!checkLogUnput(inputLogin.value)) {
            inputLogin.classList.add('wrongInput')
        }
        if (!checkPassUnput(inputPassword.value)) {
            inputPassword.classList.add('wrongInput')
        }
        if (!checkEmailUnput(inputEmail.value)) {
            inputEmail.classList.add('wrongInput')
        }
    }
  
}
function render() {   // створення і наповнення таблиці
     for (let i = 0; i < baseUsers.length; i++){
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
        tdEdit.appendChild(buttonEdit)

        let tdDelete = document.createElement('td');
        let buttonDelete = document.createElement('button');
        buttonDelete.textContent = "Delete";
        buttonDelete.classList.add('btnDelete')
        tdDelete.appendChild(buttonDelete)

        tr.appendChild(tdID)
        tr.appendChild(tdLog)
        tr.appendChild(tdPassw)
        tr.appendChild(tdEmail)
        tr.appendChild(tdEdit)
        tr.appendChild(tdDelete)
        tableBody.appendChild(tr);
    }
}
    // ф-ції валідації інпутів
function checkLogUnput(inputed: string): boolean {
    let inpPegex = /^\w{3,16}$/;
    if (inpPegex.test(inputed)) {
        return true
    }
    else {
        return false;
    }
}
function checkPassUnput(inputed: string): boolean {
    let inpPegexp = /^\w{3,16}$/;
    if (inpPegexp.test(inputed)) {
        return true
    }
    else {
        return false;
    }
}
function checkEmailUnput(inputed: string): boolean {
    let inpPegexp = /^\w{2,16}@\w{2,6}.\w{2,5}$/;
    if (inpPegexp.test(inputed)) {
        return true
    }
    else {
        return false;
    }
}

// ----Ф-ція, що при кліку на кнопку Edit/Delete редагує/видаляє відповідний рядок-----
tableBody.addEventListener('click', function (event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('btnDelete')) {
        let row = target.closest('tr');
        let rowIndexDelete = Array.from(tableBody.children).indexOf(row);
        baseUsers.splice(rowIndexDelete, 1);
        localStorage.setItem('baseUsers', JSON.stringify(baseUsers))
        tableBody.textContent = '';
        render();
    }
    if (target.classList.contains('btnEdit')) {
        
        let row = target.closest('tr');
        let rowIndexEdit = Array.from(tableBody.children).indexOf(row);
        
        btnAddUser.setAttribute('data-rowEdit', rowIndexEdit.toString());
        
        // міняємо значення кнопки і атрибут дії
        btnAddUser.setAttribute('data-action', 'editUser'); 
        btnAddUser.setAttribute('data-rowEdit', rowIndexEdit.toString()); 
        btnAddUser.textContent = 'Edit user';

        // заносиму стару інфу в інпути
        inputLogin.value = baseUsers[rowIndexEdit].login;
        inputPassword.value = baseUsers[rowIndexEdit].password;
        inputEmail.value = baseUsers[rowIndexEdit].email;

        btnAddUser.value = 'Edit user'
    }
})

function editUser(rowIndexEdit: number): void {
    baseUsers[rowIndexEdit].login = inputLogin.value
    baseUsers[rowIndexEdit].password = inputPassword.value
    baseUsers[rowIndexEdit].email = inputEmail.value
}

function clearInputs() {
    inputLogin.value = '';
    inputPassword.value = ''
    inputEmail.value = ''
}












