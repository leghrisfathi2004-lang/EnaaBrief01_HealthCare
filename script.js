//buttons -------------
let buttonAdd = document.getElementById('addRequest');
let buttonSave = document.getElementById('btnSave');
let buttonCancel = document.getElementById('btnCancel');

//forms ------------------
let list = document.getElementById('list');
let addRequest = getElementById('addrequest')
let table = document.getElementById("tbody")

// inputs ---------------------
let name = document.getElementById('fullname');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let reason = document.getElementById('reason')
let date = document.getElementById('date')

//functions ---------------------------












buttonCancel.addEventListener('click', function() {
    list.toggleAttribute('hidden');
    addRequest.toggleAttribute('hidden');

});