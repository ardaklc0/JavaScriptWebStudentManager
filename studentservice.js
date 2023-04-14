function submitStudent(){
    isValid = validate();
    if (isValid) {

        let name = document.getElementById('studentName');
        let surname = document.getElementById('studentSurname');
        let id = document.getElementById('studentId');
        let nameValue = name.value;
        let surnameValue = surname.value;
        let idValue = id.value;
        let studentJSON = {
            'name':name.value,
            'surname':surname.value,
            'id':id.value
        };
        if (name.value != '' && surname.value != '' && id.value != '') {
            clearInput(name, surname, id);
        }
        addStudent(studentJSON);
        return true;
    }
    else{
        return false;
    }
}

function clearInput(name, surname, id){
    name.value = '';
    surname.value = '';
    id.value = '';
}

function validate(){
    var requiredInputs = document.getElementsByClassName('required');
    let isValid = true;
    for (let index = 0; index < requiredInputs.length; index++) {
        const element = requiredInputs[index];
        isValid = isRequired(element) && isValid;
    }
    return isValid;
}

function isRequired(element){
    let isAvailable = true;
    let value = element.value;
    if (value === '') {
        let message = element.getAttribute('data-req-message');
        let span = element.getAttribute('data-target');
        element.addEventListener('change', function(){
            document.getElementById(span).innerText = '';
        });
        document.getElementById(span).innerText = message;   
        isAvailable = false;         
    }
    return isAvailable;
}

let students = [];

function addStudent(studentJSON){
    students.push(studentJSON);
    document.getElementById('studentList')
    showStudentInList(students);
}   

function showStudentInList(students){
    i = 0;
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    students.forEach(item => {
        i += 1;
        let buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('id', 'deleteEdit');
        let deleteButton = buttonCreator('deleteButton', 'button', 'btn btn-danger', 'Delete', 'deleteStudentFromStudentsList(event)');
        buttonDiv.append(deleteButton);
        let editButton = buttonCreator('editButton', 'button', 'btn btn-warning', 'Edit', 'editStudentFromStudentsList(event)');
        buttonDiv.append(editButton);
        
        let tr = document.createElement('tr');
        tr.className = 'rowItems';
        tr.id = 'rowItems' + i;
        let tdName = document.createElement('td');
        tdName.className = 'studentInfo';
        tdName.id = 'studentName' + i;
        let tdSurname = document.createElement('td');
        tdSurname.className = 'studentInfo';
        tdSurname.id = 'studentSurname' + i;
        let tdId = document.createElement('td');
        tdId.className = 'studentInfo';
        tdId.id = 'studentId' + i;
        let tdAction = document.createElement('td');
        tdName.innerText = item['name'];
        tdSurname.innerText = item['surname'];
        tdId.innerText = item['id'];
        tdAction.append(buttonDiv);

        tr.append(tdName);
        tr.append(tdSurname);
        tr.append(tdId);
        tr.append(tdAction);
        tbody.append(tr); 
    });
    console.log(tbody);
}

function buttonCreator(id, type, classname, innerText, functionName){
    let button = document.createElement('button');
    button.setAttribute('type', type);
    button.className = classname;
    button.innerText = innerText;
    button.id = id + i;
    button.setAttribute('onclick', functionName);
    return button;
}

function studentIdFinder(event){
    let parentRow = event.target.closest('tr');
    let thirdCell = parentRow.querySelector('td:nth-child(3)').innerHTML;
    let studentIndex = -1;
    students.forEach((student, index) => {
        if (student['id'] === thirdCell) {
        studentIndex = index; 
        return;
        }
    });
    return studentIndex;
}

function deleteStudentFromStudentsList(event) {
    let studentIndex = studentIdFinder(event);
    students.splice(studentIndex, 1);
    showStudentInList(students);
}

function editStudentFromStudentsList(event){
    formTextToInput(event);


}

function formTextToInput(event){
    let parentRow = event.target.closest('tr');

    const name = parentRow.querySelectorAll('td')[0].innerText;
    const surname = parentRow.querySelectorAll('td')[1].innerText;
    const id = parentRow.querySelectorAll('td')[2].innerText;

    let nameInput = document.createElement('input');
    nameInput.value = name;
    let surnameInput = document.createElement('input');
    surnameInput.value = surname;
    let idInput = document.createElement('input');
    idInput.value = id;

    parentRow.querySelectorAll('td')[0].innerHTML = '';
    parentRow.querySelectorAll('td')[0].appendChild(nameInput);

    parentRow.querySelectorAll('td')[1].innerHTML = '';
    parentRow.querySelectorAll('td')[1].appendChild(surnameInput);

    parentRow.querySelectorAll('td')[2].innerHTML = '';
    parentRow.querySelectorAll('td')[2].appendChild(idInput);


    let deleteEditDiv = document.getElementById('deleteEdit');
    let okButton = document.createElement('button');
    okButton.setAttribute('type', 'button');
    okButton.className = 'btn btn-success';
    okButton.innerText = 'OK';
    deleteEditDiv.append(okButton);
}