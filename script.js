//buttons ----------------------------
let buttonAdd = document.getElementById('btnAdd');
let buttonSave = document.getElementById('btnSave');
let buttonCancel = document.getElementById('btnCancel');

//paging logic ------
let morePages = document.getElementById('pages');
let buttonPrev = document.getElementById('btnLeft');
let buttonNext = document.getElementById('btnRight');
let actualPage = document.getElementById('actualPage');
let pagenbr = 1;

//forms ------------------------------
let list = document.getElementById('list');
let modal = document.getElementById('modal');
let table = document.getElementById("tbody");

//functions ---------------------------------------------------------

document.addEventListener('DOMContentLoaded' , () =>{
    if(!localStorage.getItem('requests'))
        localStorage.setItem('requests', JSON.stringify([]));

    if(!localStorage.getItem('id'))
        localStorage.setItem('id', '0');

    displayP(JSON.parse(localStorage.getItem('requests')))


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
    if((document.getElementById('fullName').value === '')||(document.getElementById('email').value === '')||(document.getElementById('phone').value === '')||(document.getElementById('reason').value === '')||(document.getElementById('date').value === '')){
        let msg = document.getElementById('message');
        msg.classList.toggle('hidden')
        setTimeout(() => {
            
            msg.classList.remove('-translate-x-full', 'opacity-0');
            msg.classList.add('translate-x-0', 'opacity-100');
        }, 
    );

        setTimeout(() => {
            msg.classList.remove('translate-x-0', 'opacity-100');
            msg.classList.add('-translate-x-full', 'opacity-0');
            setTimeout(() => {  msg.classList.toggle('hidden');    }, 500);
        }, 3000);
        return;
    }
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
    list.classList.toggle('hidden');
    modal.classList.toggle('hidden');
    if((requests.length > 5)&&(morePages.classList.contains('invisible')))
        morePages.classList.remove('invisible')

}

buttonNext.addEventListener('click', () =>{
    let requests = JSON.parse(localStorage.getItem('requests'));
    let totPages = Math.ceil(requests.length/5);
    if(buttonPrev.classList.contains('invisible'))
        buttonPrev.classList.remove('invisible');
    pagenbr++;
    if (pagenbr == totPages)
        buttonNext.classList.add('invisible');
    table.innerHTML = '';
    paginate(requests, pagenbr);  
    actualPage.textContent = pagenbr;
});

buttonPrev.onclick = () =>{
    let requests = JSON.parse(localStorage.getItem('requests'));
    if(buttonNext.classList.contains('invisible'))
        buttonNext.classList.remove('invisible');
    pagenbr--;
    if (pagenbr == 1){
        buttonPrev.classList.add('invisible')
    }
    table.innerHTML = '';
    paginate(requests, pagenbr);  
    actualPage.textContent = pagenbr;
}

function paginate(tab, pageNumber) {
    const itemsPerPage = 5;
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    onePage(tab.slice(start, end));
}

function displayP(reqs){
    table.innerHTML = '';
    let n = reqs.length
    switch(true){
        case n == 0:
            table.innerHTML =  `<tr>
                                <td colspan="7" class="px-6 py-20 text-center">
                                <div class="flex flex-col items-center justify-center space-y-3">
                                    <p class="text-lg font-medium text-[#6DA9A6]">No records found</p>
                                    <p class="text-gray-500">Try adding a new student to see them here.</p>
                                </div>
                                </td>
                            </tr>`
            break;
        case n <= 5:
            onePage(reqs);
            break;
        case n > 5:
            paginate(reqs, pagenbr); 
            if(morePages.classList.contains('invisible'))
                morePages.classList.remove('invisible');
            if(!buttonPrev.classList.contains('invisible')&&(pagenbr == 1))
                buttonPrev.classList.add('invisible');
            break;
    }
}
//apply this function whenever click on left or right + page number modifie

function onePage(tab){
    tab.forEach(el => {
        const tr = document.createElement('tr');
        tr.className = "border-b border-gray-300 hover:bg-[#99D2CF]";
        tr.innerHTML = `<td class="px-6 py-4 align-top">${el.id}</td>
                        <td class="px-6 py-4 align-top">${el.nom}</td>
                        <td class="px-6 py-4 align-top">${el.phone}</td>
                        <td class="px-6 py-4 align-top">${el.email}</td>
                        <td class="px-6 py-4 align-top">${el.reason}</td>
                        <td class="px-6 py-4 align-top">${el.date}</td> 
                        <td  class="text-xl text-center">
                            <button onclick="deleteTr(this)" >
                                <i class="pr-10 fa-solid fa-trash-can text-red-700 transition-all duration-300 hover:scale-[1.2]"></i>
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
    requests = requests.filter(rq => rq.id != indexs[0].textContent);
    localStorage.setItem('requests', JSON.stringify(requests));
    if((requests.length <= 5)&&(!morePages.classList.contains('invisible')))
        morePages.classList.add('invisible')
    displayP(requests);
}