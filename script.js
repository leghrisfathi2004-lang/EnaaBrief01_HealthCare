//buttons -------------
let buttonAdd = document.getElementById('btnAdd');
let buttonSave = document.getElementById('btnSave');
let buttonCancel = document.getElementById('btnCancel');

//forms --------------------
let list = document.getElementById('list');
let modal = document.getElementById('modal');
let table = document.getElementById("tbody");

// inputs ----------------------


//functions ---------------------------

document.addEventListener('DOMContentLoaded' , () =>{
    if(!localStorage.getItem('requests'))
        localStorage.setItem('requests', JSON.stringify([]));

    if(!localStorage.getItem('id'))
        localStorage.setItem('id', '0');
    displayP(JSON.parse(localStorage.getItem('requests')))
    if(!localStorage.getItem('id'))
        localStorage.setItem('id', '0')
})

buttonCancel.addEventListener('click', () => {
    list.classList.toggle('hidden');
    modal.classList.toggle('hidden');
});

buttonAdd.onclick = () => {
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('reason').value = '';
    document.getElementById('date').value = '';
    list.classList.toggle('hidden');
    modal.classList.toggle('hidden');
}

buttonSave.onclick = () =>{
    let requests = JSON.parse(localStorage.getItem('requests'));
    let Id = idcount();
    requests.push({
        id: Id,
        nom: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        reason: document.getElementById('reason').value,
        date: document.getElementById('date').value
    })
    displayP(requests);
    localStorage.setItem('requests' ,JSON.stringify(requests));
    console.log('saveeeed')
    list.classList.toggle('hidden');
    modal.classList.toggle('hidden');
}

function displayP(personnes){
    table.innerHTML = '';
    personnes.forEach(el => {
        const tr = document.createElement('tr');
        tr.className = "border-b border-gray-300 hover:bg-[#99D2CF]";
        tr.innerHTML = `<td class="px-6 py-4 align-top">${el.id}</td>
                        <td class="px-6 py-4 align-top">${el.nom}</td>
                        <td class="px-6 py-4 align-top">${el.phone}</td>
                        <td class="px-6 py-4 align-top">${el.email}</td>
                        <td class="px-6 py-4 align-top">${el.reason}</td>
                        <td class="px-6 py-4 align-top">${el.date}</td> 
                        <td  class="text-xl text-center">
                            <button>
                                <i class="pr-10 fa-solid fa-trash-can transition-all duration-300 hover:scale-[1.5]"></i>
                            </button>
                            <button>
                                <i class="fa-solid fa-pen-to-square transition-all duration-300 hover:scale-[1.5]"></i>
                            </button>
                        </td>`;
        table.appendChild(tr);
    });
}

function idcount(){
    let ID = JSON.parse(localStorage.getItem('id'));
    ID++;  
    localStorage.setItem('id', JSON.stringify(ID));
    return ID;
}

function deleteTr(btn){
    let requests = JSON.parse(localStorage.getItem('requests'));
    const tr = btn.closest("tr")
    const indexs = tr.querySelectorAll("td");

}