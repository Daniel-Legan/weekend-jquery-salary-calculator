console.log('in script.js');

let employees = [];
let sum = 0;
let globalTotalMonthly = 0;

$(document).ready(readyNow);

function readyNow(){
    console.log('the DOM is loaded!');

    $('#employeeForm').on('submit', addEmployee);
    $('#tableBody').on('click', '.deleteButton', deletePress);
}

function addEmployee(event){

    event.preventDefault();

    console.log('in addEmployee');

    let employee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        Id: $('#idInput').val(),
        title: $('#titleInput').val(),
        annualSalary: Number($('#annualSalaryInput').val())
    }
    console.log('employee is', employee);

    employees.push(employee);

    console.log('employees is', employees);

    render();
}

function render(){
    $('#tableBody').empty();

    for(let employee of employees){
        $('#tableBody').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.Id}</td>
                <td>${employee.title}</td>
                <td>${employee.annualSalary}</td>
                <td><button class="deleteButton">Delete Button</button></td>
            </tr>
        `);
    }

    $('#totalMonthly').text(`
        Total Monthly: ${(totalMonthly(employees))/12}
    `)

    globalTotalMonthly = totalMonthly(employees)/12;
}

function deletePress() {
    console.log('in deletePress', $(this));
    console.log(globalTotalMonthly);
    console.log("$(this).parent().parent():nth-child(5)");

    $(this).parent().parent().remove();

    // $('#totalMonthly').text(`
    // Total Monthly: ${globalTotalMonthly - $(this).parent().parent()}
    // `)

    $('#totalMonthly').text(`
    Total Monthly: ${globalTotalMonthly - $(this).parent().parent()}
    `)
}

function totalMonthly(arr){
    sum = 0;
    console.log(sum);
    for(let employee of arr){
        sum += employee.annualSalary;
    }
    return sum;
}

