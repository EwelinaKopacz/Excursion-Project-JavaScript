const pickedFile = document.querySelector('.uploader__input');
const panelExcursions = document.querySelector('.panel__excursions');
const excursionsItem = document.querySelector('.excursions__item');
const panelSummary = document.querySelector('.panel__summary');
const orderForm = document.querySelector('.order');
const orderTotalPrice = orderForm.querySelector('.order__total-price');
let errorMessage = document.createElement('ul');

pickedFile.addEventListener('change', handleFile);
panelExcursions.addEventListener('submit',getDataExcursion);
panelSummary.addEventListener('click', removeExcursion);
orderForm.addEventListener('submit', checkOrderForm);

function handleFile(e){
    const file = e.target.files[0];
    handleText(file);
}

function handleText(file){
    if(file){
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = handleLoad;
    }
    else{
        alert('Plik nie został wybrany');
    }
}

function handleLoad(e){
    const resultData= e.target.result;
    splitDataAsLines(resultData);
    splitDataAsColumns(lineData);
}

function splitDataAsLines(file){
    return lineData = file.split(/[\r\n]+/gm);
}

function splitDataAsColumns(file){
    const columnData = [];
    const regExp = new RegExp(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
    for (let i=0; i<file.length; i++) {
        const splitLine = file[i].split(regExp);
        const splitItem = [];
            for (let j=0; j<splitLine.length; j++) {
                splitItem.push(splitLine[j].replace(/^"|"$/g, ''));
                }
        columnData.push(splitItem);
    }
    createNewExcursion(columnData);
}

function createNewExcursion(columnData){
    for(let i=0; i<columnData.length; i++){
        const excursionsItemCopy = excursionsItem.cloneNode(true);
        panelExcursions.appendChild(excursionsItemCopy);

        const item  = columnData[i];

        const id = item[0];
        const title = item[1];
        const description = item[2];
        const priceAdult = item[3];
        const priceChild = item[4];

        excursionsItemCopy.setAttribute('data-id-excursion', id);
        excursionsItemCopy.querySelector('.excursions__title').innerText = title;
        excursionsItemCopy.querySelector('.excursions__description').innerText = description;
        const priceItems = excursionsItemCopy.querySelectorAll('.excursions__price');
        priceItems[0].innerText = priceAdult;
        priceItems[1].innerText = priceChild;
    }
    excursionsItem.classList.add('hide__prototype');
}

function getDataExcursion(e){
    e.preventDefault();
    const pickedExcursion = e.target.parentElement;
    const basket = [];
    const excursionForm = pickedExcursion.querySelector('.excursions__form');
    const excursionPrices = excursionForm.querySelectorAll('.excursions__price');

    const id = pickedExcursion.getAttribute('data-id-excursion');
    const title = pickedExcursion.querySelector('.excursions__title').innerText;
    const adultNumber= excursionForm.elements.adults.value;
    const adultPrice = excursionPrices[0].innerText;
    const childNumber= excursionForm.elements.children.value;
    const childPrice = excursionPrices[1].innerText;

    const errors =[];
    if(!checkIfNumber(adultNumber) || !checkIfNumber(childNumber)){
        errors.push('Błędne dane, wpisz liczbę.');
        alert(errors);
        clearInputValue(excursionForm.elements.adults);
        clearInputValue(excursionForm.elements.children);
    }
    else {
        basket.push({id:id, title:title, adultNumber:adultNumber,adultPrice:adultPrice,childNumber:childNumber,childPrice:childPrice});
        showDataExcursion(basket);
        clearInputValue(excursionForm.elements.adults);
        clearInputValue(excursionForm.elements.children);
    }
}

function checkIfNumber(value){
    const regExp = /^[0-9]*$/;
    if(value.match(regExp)){
        return value;
    }
    return false;
}

function clearInputValue(input){
    return input.value = '';
}

function showDataExcursion(excursionDetails){
    const summaryPanel = document.querySelector('.panel__summary');
    const summaryItemCopy = summaryPanel.firstElementChild.cloneNode(true);
    summaryItemCopy.classList.remove('summary__item--prototype');
    summaryPanel.appendChild(summaryItemCopy);

    const countPrice = (excursionDetails[0]['adultNumber'] * excursionDetails[0]['adultPrice'] + excursionDetails[0]['childNumber'] * excursionDetails[0]['childPrice']);

    summaryItemCopy.querySelector('.summary__name').innerText = excursionDetails[0]['title'] + ':';
    summaryItemCopy.querySelector('.summary__total-price').innerText = countPrice + ' PLN';
    summaryItemCopy.querySelector('.summary__prices').innerText = "dorośli: " + excursionDetails[0]['adultNumber'] + " x " + excursionDetails[0]['adultPrice'] +  " PLN, " + " dzieci: " + excursionDetails[0]['childNumber'] + " x " + excursionDetails[0]['childPrice'] + " PLN ";
    getSumPrice();
}

function getSumPrice(){
    const summaryPanel = document.querySelector('.panel__summary');
    const allPrices = summaryPanel.querySelectorAll('.summary__total-price');
    const arrayCost= [];
    allPrices.forEach(function(item){
        const priceExcursions = parseInt(item.innerText);
        arrayCost.push(priceExcursions);
    });

    let orderSum = 0;
    for(let i=1;i<arrayCost.length;i++){
        orderSum +=arrayCost[i];
    }
    document.querySelector('.order__total-price-value').innerText = orderSum + " PLN ";
    return orderSum;
}

function removeExcursion(e){
    e.preventDefault();
    if(e.target.classList.contains('summary__btn-remove')){
        const btnClickParent = e.target.parentElement.parentElement;
        btnClickParent.remove();
        getSumPrice();
    }
}

function checkOrderForm(e){
    e.preventDefault();
    let errors = [];

    const takePersonalData = e.target.elements.name.value;
    if(!checkPersonData(takePersonalData)){
        errors.push('Wpisz poprawne imie i nazwisko (tylko litery)');
    };
    const takeEmail = e.target.elements.email.value;
    if(!checkEmail(takeEmail)){
        errors.push('Wpisz poprawny adres email');
    };
    showErrors(errors,takeEmail);
}

function checkPersonData(dataPerson){
    const regExp = /^[a-zA-Z]{2,30}/;
    if(dataPerson.match(regExp)){
        return dataPerson;
    }
    return false;
}

function checkEmail(dataEmail){
    const regExp = /^[-\w\.]+@([-\w]+\.)+[a-z]+$/i;
    if(dataEmail.match(regExp)){
        return dataEmail;
    }
    return false;
}

function showErrors(errorsArray,userEmail){
    if(errorsArray.length>0){
        errorMessage = orderForm.insertBefore(errorMessage,orderTotalPrice)
        errorMessage.innerHTML = '';
        errorsArray.forEach(function(item){
            const errorInfoLi = document.createElement('li');
            errorInfoLi.innerText = item;
            errorInfoLi.style.color = 'red';
            errorMessage.appendChild(errorInfoLi);
        });
    }
    else {
        const totalCostToShowUser = getSumPrice();
        orderForm.submit(alert('Dziękujemy za złożenie zamówienia o wartości: ' + totalCostToShowUser + ' PLN. Szczegóły zamówienia zostały wysłane na adres e-mail: ' + userEmail));
    }
}
