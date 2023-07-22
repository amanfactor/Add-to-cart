import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove}  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const app={
    databaseURL:"https://realtime-database-ea7e7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const appSettings=initializeApp(app);
const database=getDatabase(appSettings);
const itemsInDB=ref(database,"itemsInCart");
const inputEl=document.getElementById('input-field');
const buttonEL=document.getElementById('add-button');
const ulEl=document.getElementById('shopping-list');
//console.log(ulEl.innerHTML);
buttonEL.addEventListener("click",function(){
    push(itemsInDB,inputEl.value);
    let inputvalue=inputEl.value;
    //console.log(`${inputEl.value} has been pushed to DB`);
    // const newListItem=document.createElement("li");
    // newListItem.textContent=inputEl.value;
    // ulEl.appendChild(newListItem);
   
    nullingTheInput();
    //addingListItem(inputvalue);
})
onValue(itemsInDB,function(snapshot){
    if(snapshot.exists()){
    let itemsInCartArray=Object.entries(snapshot.val());
    //console.log(snapshot.val());//Object return hoga

toClearTheListHTMLbeforeUpdate();
for(let i=0;i<itemsInCartArray.length;i++){
    //console.log(itemsInCartArray[i]);
    
    addingListItem(itemsInCartArray[i]);
}
}
else{ 
    const blankList=document.createElement("li");
    //console.log(blankList);
    blankList.textContent="No content to display here... yet";
    console.log(blankList);
    ulEl.innerHTML=blankList.textContent;
    console.log(ulEl)
}

}

)
 
function toClearTheListHTMLbeforeUpdate(){
    ulEl.innerHTML="";
}

function nullingTheInput(){
    inputEl.value="";
}

function addingListItem(items){
    //ulEl.innerHTML +=`<li>${value}</li>`;
    const itemID=items[0];
    const itemValue=items[1];
        const newListItem=document.createElement("li");
        newListItem.textContent=itemValue;
        ulEl.append(newListItem);
        newListItem.addEventListener('dblclick',function(){

            let exactLocationOfItemInDB=ref(database,`itemsInCart/${itemID}`);
            remove(exactLocationOfItemInDB);
        })
}
