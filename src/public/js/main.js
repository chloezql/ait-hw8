// TODO: add client side code for single page application
function main() {
    const addButton = document.querySelector('#addBtn');
    addButton.addEventListener('click',handleClick);
    const filterButton = document.querySelector('#filterBtn');
    filterButton.addEventListener('click',filterClick);

    const xhr = new XMLHttpRequest();
    const url = '/api/reviews';
    xhr.open('GET',url);

    xhr.addEventListener('load',function(){
        if(xhr.status>=200 && xhr.status <400){
            const reviews = JSON.parse(xhr.responseText);
            for(const rev of reviews){
                const tr = document.createElement('tr');
                document.querySelector('#tbody').appendChild(tr);
                var tdname = document.createElement('td');
                tr.appendChild(tdname);
                tdname.textContent = rev.name;
                var tdsemester = document.createElement('td');
                tr.appendChild(tdsemester);
                tdsemester.textContent = rev.semester;
                var tdyear = document.createElement('td');
                tr.appendChild(tdyear);
                tdyear.textContent = rev.year;
                var tdreview = document.createElement('td');
                tr.appendChild(tdreview);
                tdreview.textContent = rev.review;
                //p.textContent = rev.name +" "+ rev.year + " "+ rev.semester;
            }
        }
    })

    xhr.send();
}

function handleClick(evt){
    evt.preventDefault();
    const name = document.querySelector('#name').value;
    const semester = document.querySelector('#semester').value;
    const year = document.querySelector('#year').value;
    const review = document.querySelector('#review').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST','/api/review/create');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8 ');

    xhr.addEventListener('load',function(){
        const myNode = document.querySelector("#tbody");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        const reviews = JSON.parse(xhr.responseText).result;
        for(const rev of reviews){
            const tr = document.createElement('tr');
            document.querySelector('#tbody').appendChild(tr);
            var tdname = document.createElement('td');
            tr.appendChild(tdname);
            tdname.textContent = rev.name;
            var tdsemester = document.createElement('td');
            tr.appendChild(tdsemester);
            tdsemester.textContent = rev.semester;
            var tdyear = document.createElement('td');
            tr.appendChild(tdyear);
            tdyear.textContent = rev.year;
            var tdreview = document.createElement('td');
            tr.appendChild(tdreview);
            tdreview.textContent = rev.review;
        }
        
        
    });

    xhr.send(`name=${name}&semester=${semester}&year=${year}&review=${review}`);

}

function filterClick(evt){
    evt.preventDefault();
    const fsemester = document.querySelector('#filterSemester').value;
    const fyear = document.querySelector('#filterYear').value;

    const xhr = new XMLHttpRequest();
    //"basicform.php?name="+namevalue+"&age="+agevalue
    xhr.open('GET',"/api/reviews?year="+fyear+"&semester="+fsemester,true);

    xhr.addEventListener('load',function(){
        if(xhr.status>=200 && xhr.status <400){
            const myNode = document.querySelector("#tbody");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            const reviews = JSON.parse(xhr.responseText);
            for(const rev of reviews){
                const tr = document.createElement('tr');
                document.querySelector('#tbody').appendChild(tr);
                var tdname = document.createElement('td');
                tr.appendChild(tdname);
                tdname.textContent = rev.name;
                var tdsemester = document.createElement('td');
                tr.appendChild(tdsemester);
                tdsemester.textContent = rev.semester;
                var tdyear = document.createElement('td');
                tr.appendChild(tdyear);
                tdyear.textContent = rev.year;
                var tdreview = document.createElement('td');
                tr.appendChild(tdreview);
                tdreview.textContent = rev.review;
                //p.textContent = rev.name +" "+ rev.year + " "+ rev.semester;
            }
        }
    })

    xhr.send();
}
document.addEventListener("DOMContentLoaded", main);
