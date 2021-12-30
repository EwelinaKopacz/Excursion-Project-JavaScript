// I CZEŚĆ: ŁADOWANIE WYCIECZEK

const pickedFile = document.querySelector('.uploader__input');
pickedFile.addEventListener('change', handleFile);
panelExcursions = document.querySelector('.panel__excursions');
excursionsItem = document.querySelector('.excursions__item');

excursionsTitle = document.querySelector('.excursions__title');
excursionsDescription = document.querySelector('.excursions__description');
inputPriceAdult = document.querySelector('input[name="adults"]');
inputPriceChildren = document.querySelector('input[name="children"]');


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
}

function splitDataAsLines(file){ // F-cja: podział tej zawartości na wiersze (wycieczki)
    const lineData = file.split(/[\r\n]+/gm); // - g - Zwracaj wszystkie pasujące fragmenty, a nie tylko pierwszy; - m - Szukaj w tekście złożonym z kilku linii.
    splitDataAsColumns(lineData);
}

function splitDataAsColumns(file){ //F-cja: odział wiersza na poszczególne elementy (id, nazwa itp.)
    const columnData = [];
    const regExp = new RegExp(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
        for (let i=0; i<file.length; i++) {
             let splitLine = file[i].split(regExp);
                const splitItem = [];
                for (let j=0; j<splitLine.length; j++) {
                    splitItem.push(splitLine[j].replace(/^"|"$/g, '')); //Usunięcie quotes na początku i na końcu
                }
                columnData.push(splitItem);
        }
        console.log(columnData);
        createNewExcursion(columnData);
}

function createNewExcursion(columnData){//F-cja: utworzenie odpowiednich elementów HTML i dodanie ich do drzewa DOM
        columnData.forEach(function(element){
            const excursionsItemCopy = excursionsItem.cloneNode(true);
            panelExcursions.appendChild(excursionsItemCopy);
            console.log(excursionsItemCopy);
        });
        excursionsItem.classList.add('hide__prototype');
}


