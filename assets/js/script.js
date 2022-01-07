// I CZEŚĆ: ŁADOWANIE WYCIECZEK

const pickedFile = document.querySelector('.uploader__input');
const panelExcursions = document.querySelector('.panel__excursions');
const excursionsItem = document.querySelector('.excursions__item');
const panelSummary = document.querySelector('.panel__summary');
const orderForm = document.querySelector('.order');
const errorMessage = document.createElement('ul');


pickedFile.addEventListener('change', handleFile);

panelExcursions.addEventListener('submit',function(e){ // 1.Dodanie zdarzenia submit i pobranie wybranej wycieczki;
    e.preventDefault();
    const targetEl = e.target;
    const pickedExcursion = targetEl.parentElement;
    getDataExcursion(pickedExcursion);
});

panelSummary.addEventListener('click', removeExcursion);

orderForm.addEventListener('submit', checkOrderForm);

function handleFile(e){ // F-cja: obsługa wybierania pliku przez użytkownika
    const file = e.target.files[0];
    handleText(file);
}

function handleText(file){ // F-cja pobrany plik czytaj: readAsText
    if(file){
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = handleLoad;
    }
    else{
        alert('Plik nie został wybrany');
    }
}

function handleLoad(e){ // F-cja: pobranie zawartości pliku
    const resultData= e.target.result;
    splitDataAsLines(resultData);
    splitDataAsColumns(lineData);
}

function splitDataAsLines(file){ // F-cja: podział tej zawartości na wiersze (wycieczki)
    return lineData = file.split(/[\r\n]+/gm); // - g - Zwracaj wszystkie pasujące fragmenty, a nie tylko pierwszy; - m - Szukaj w tekście złożonym z kilku linii.
}

function splitDataAsColumns(file){ //F-cja: odział wiersza na poszczególne elementy (id, nazwa itp.)
    const columnData = [];
    const regExp = new RegExp(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))"); // Podzial danych
    for (let i=0; i<file.length; i++) {
        const splitLine = file[i].split(regExp);
        const splitItem = [];
            for (let j=0; j<splitLine.length; j++) {
                splitItem.push(splitLine[j].replace(/^"|"$/g, '')); //Usunięcie quotes na początku i na końcu
                }
        columnData.push(splitItem);
    }
    createNewExcursion(columnData);
}

function createNewExcursion(columnData){ //F-cja: utworzenie i odpowiednich elementów HTML, dodanie innerText z tablicy i dodanie ich do drzewa DOM
    for(let i=0; i<columnData.length; i++){
        const excursionsItemCopy = excursionsItem.cloneNode(true);
        panelExcursions.appendChild(excursionsItemCopy);

        const item  = columnData[i]; // do zmiennej przypisujemy tablice po kolei tablica z index 0, potem 1
        // console.log(item);

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

// II CZEŚĆ: DODAWANIE WYCIECZEK DO LISTY ZAMÓWIONYCH:

function getDataExcursion(pickedExcursion){ // 1.Pobranie szczegołow danej wycieczki, ilosc doroslych
    const basket = [];
    console.log(pickedExcursion);
    const excursionForm = pickedExcursion.querySelector('.excursions__form');
    const excursionPrices = excursionForm.querySelectorAll('.excursions__price');

    const id = pickedExcursion.getAttribute('data-id-excursion');
    const title = pickedExcursion.querySelector('.excursions__title').innerText;
    const adultNumber= excursionForm.elements.adults.value;
    const adultPrice = excursionPrices[0].innerText;
    const childNumber= excursionForm.elements.children.value;
    const childPrice = excursionPrices[1].innerText;

    // const checkValue =[adultNumber,childNumber];
    basket.push({id:id, title:title, adultNumber:adultNumber,adultPrice:adultPrice,childNumber:childNumber,childPrice:childPrice}); //Utworzenie obiektu w tablicy;
    showDataExcursion(basket);
}

function showDataExcursion(excursionDetails){ // 2.Wyswietlenie szczegółów danej wycieczki;
    const summaryPanel = document.querySelector('.panel__summary');
    const summaryItemCopy = summaryPanel.firstElementChild.cloneNode(true);
    summaryItemCopy.classList.remove('summary__item--prototype');
    summaryPanel.appendChild(summaryItemCopy);

    const countPrice = (excursionDetails[0]['adultNumber'] * excursionDetails[0]['adultPrice'] + excursionDetails[0]['childNumber'] * excursionDetails[0]['childPrice']);

    summaryItemCopy.querySelector('.summary__name').innerText = excursionDetails[0]['title'];
    summaryItemCopy.querySelector('.summary__total-price').innerText = countPrice + ' PLN';
    summaryItemCopy.querySelector('.summary__prices').innerText = "dorośli: " + excursionDetails[0]['adultNumber'] + " x " + excursionDetails[0]['adultPrice'] +  " PLN, " + " dzieci: " + excursionDetails[0]['childNumber'] + " x " + excursionDetails[0]['childPrice'] + " PLN ";
    getSumPrice();
}

function getSumPrice(){ // 3.Aktualizacja ceny za całą wycieczke - zmiana wartości w koszyku
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

function removeExcursion(e){ // 4.Usuwanie wycieczek
    e.preventDefault();
    if(e.target.classList.contains('summary__btn-remove')){
        const btnClicked = e.target;
        const btnParent = btnClicked.parentElement;
        while (btnParent.hasChildNodes()) {
            btnParent.removeChild(btnParent.firstChild);
        }
    btnParent.nextElementSibling.classList.add('hide__prototype');
    }
}

// 3. OBSŁUGA FORMULARZA ZAMOWIENIA

function checkOrderForm(e){
    e.preventDefault();
    let errors = [];
    console.log(e.target.elements.name);

    const takePersonalData = e.target.elements.name.value;
    if(!checkPersonData(takePersonalData)){
        errors.push('Wpisz poprawne imie i nazwisko (tylko litery)');
    };
    const takeEmail = e.target.elements.email.value;
    if(!checkEmail(takeEmail)){
        errors.push('Wpisz poprawny adres email');
    };
    showErrors(errors);
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

function showErrors(errorsArray){
    if(errorsArray.length>0){
        orderForm.appendChild(errorMessage);
        errorMessage.innerHTML = '';
        errorsArray.forEach(function(item){
            const errorInfoLi = document.createElement('li');
            errorInfoLi.innerText = item;
            errorInfoLi.style.color = 'red';
            errorMessage.appendChild(errorInfoLi);
        });
    }
    else {
        orderForm.submit(alert('Wiadomość została wysłana'));
    }
}

// BRAKUJE
// 1. SPR czy podana wartosc jest liczba , wyswietlenie bledow + czyszczenie inputów
// 2. Zmniejszanie wartosic w koszyku - calej sumy
// 3. Alert o wyslaniu, brkuje info z kwota i adres email na jaki została wyslana informacja