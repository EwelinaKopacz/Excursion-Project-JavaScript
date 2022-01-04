// I CZEŚĆ: ŁADOWANIE WYCIECZEK

const pickedFile = document.querySelector('.uploader__input');
const panelExcursions = document.querySelector('.panel__excursions');
const excursionsItem = document.querySelector('.excursions__item');

const formElement = excursionsItem.querySelector('.excursions__form');
const getAdultsNumber = excursionsItem.querySelector('input[name="adults"]');
const getChildrenNumber = excursionsItem.querySelector('input[name="children"]');
const errorMessage = document.createElement('p');

pickedFile.addEventListener('change', handleFile);

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

        excursionsItemCopy.querySelector('.excursions__title').innerText = title;
        excursionsItemCopy.querySelector('.excursions__description').innerText = description;
        const priceItems = excursionsItemCopy.querySelectorAll('.excursions__price');
        priceItems[0].innerText = priceAdult;
        priceItems[1].innerText = priceChild;
    }
    excursionsItem.classList.add('hide__prototype');
}

// II CZEŚĆ: DODAWANIE WYCIECZEK DO LISTY ZAMÓWIONYCH:
//1. Sprawdzenie czy wpisana wartość jest liczbą i wyswietlenie blędu
//2. Obsługa inputów przyjmujących ilość osób
//3. Wywołanie zdarzenia po kliknięciu w przycisk "dodaj do zamowienia"
//4. Dodanie do koszyka elementu zawierającego podsumowanie wybranych wycieczek
//5. Aktualizacja ceny za całą wycieczke - zmiana wartości w koszyku
//6. Dodanie działania do usuwania wycieczek

//1. Sprawdzenie czy wpisana wartość jest liczbą i wyswietlenie blędu
formElement.addEventListener('submit',checkData);

function checkData(e){
    e.preventDefault();
    const errorsArray = [];
    if(!checkIfNumber(getAdultsNumber.value)){
        errorsArray.push(getAdultsNumber);
    }
    if(!checkIfNumber(getChildrenNumber.value)){
        errorsArray.push(getChildrenNumber);
    }
    console.log(errorsArray)
    showErrors(errorsArray);
}

function checkIfNumber(item){
    const regExp = /^[0-9]/;
    if(item.match(regExp)){
        return item;
    }
    return false;
}

function showErrors(errors){
    getAdultsNumber.style.color = "black";
    getChildrenNumber.style.color = "black";
    errorMessage.innerText = " ";

    if(errors.length>0){
        errorMessage.innerText = "Wprowadzona wartość musi byc liczbą";
        errorMessage.style.color = "red";
        const firstElForm = document.querySelector('.excursions__field');
        firstElForm.prepend(errorMessage); // method inserts a set of Node objects or DOMString objects before the first child of the Element

        errors.forEach(function(item){
            item.style.color = "red";
        })
    }
    else{
        formElement.submit();
    }
}

//2. Obsługa inputów przyjmujących ilość osób











