console.log('in script.js');

let employees = [];
let sum = 0;
const notToExceedTotalMonthly = 20000;
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


$(document).ready(readyNow);

function readyNow(){
    console.log('the DOM is loaded!');

    $('#employeeForm').on('submit', addEmployee);
    $('#tableBody').on('click', '.deleteButton', deletePress);
}

function addEmployee(event){
    console.log('in addEmployee');

    event.preventDefault();

    if(
        $('#firstNameInput').val() === '' ||
        $('#lastNameInput').val() === '' ||
        $('#idInput').val() === '' ||
        $('#titleInput').val() === ''||
        $('#annualSalaryInput').val() === ''
        ){
            alert('Missing Values');
            return;
        }

    let employee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        Id: $('#idInput').val(),
        title: $('#titleInput').val(),
        annualSalary: Number($('#annualSalaryInput').val()),
        uniqueID: Math.random()
    }

    console.log('employee is', employee);

    employees.push(employee);

    console.log('employees is', employees);

    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idInput').val('');
    $('#titleInput').val('');
    $('#annualSalaryInput').val('');

    render();
}

function render(){
    $('#tableBody').empty();

    for(let employee of employees){
        $('#tableBody').append(`
            <tr id='${employee.uniqueID}'>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.Id}</td>
                <td>${employee.title}</td>
                <td>${formatter.format(employee.annualSalary)}</td>
                <td>
                    <button class="deleteButton">Delete</button>
                </td>
            </tr>
        `);
        console.log('employee unique id', employee.uniqueID);
    }

    $('#totalMonthly').text(`
        Total Monthly: ${formatter.format(totalMonthly(employees))}
    `)
    
    doNotExceedColor();
}

function deletePress() {
    console.log('in deletePress', $(this));
    console.log($(this).parent().parent()[0].id);
    employeeToRemove = 0;

    //find in the array the object with the unique id
    for(let employee of employees){
        if(employee.uniqueID === Number($(this).parent().parent()[0].id)){
            console.log('found');
            employeeToRemove = employee;
            console.log('the employee to remove', employeeToRemove);
        }
    }
    //splice out the specific object
    //what index?
    console.log(employees.indexOf(employeeToRemove));

    employees.splice(employees.indexOf(employeeToRemove), 1);
    console.log('employees array', employees);

    render();
}

function totalMonthly(arr){
    sum = 0;

    for(let employee of arr){
        sum += employee.annualSalary;
    }

    console.log('total sum', sum);

    return sum/12;
}

function doNotExceedColor(){
    console.log('in doNotExceed');
    if(totalMonthly(employees) > notToExceedTotalMonthly){
        $('#totalMonthly').css('background-color', 'red');
    } else {
        if(totalMonthly(employees) <= notToExceedTotalMonthly){
            $('#totalMonthly').css('background-color', 'white');
        }
    }
}