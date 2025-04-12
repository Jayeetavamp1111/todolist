//function myFunction() {
// var dots = document.getElementById("dots");
// var moreText = document.getElementById("more");
// var btnText = document.getElementById("myBtn");
// if (dots.style.display === "none") {
// dots.style.display = "inline";
// btnText.className = "fas fa-chevron-down";
// moreText.style.display = "none";
//} else {
//dots.style.display = "none";
// btnText.className = "fas fa-chevron-up";
// moreText.style.display = "inline";
// }
//}
var globalDB = [];
var allRecords = [];

function initializedDB(){
    loaddata();

}

function toggleArrowUp(event){

    console.log("Hello");
    $(event).removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(event).parent().next().hide();
    $(event).attr('onclick','toggleArrowDown(this)');
}

function toggleArrowDown(event){

    console.log("Hello");
    $(event).removeClass('fa-chevron-down').addClass('fa-chevron-up');
    $(event).parent().next().show();
    $(event).attr('onclick','toggleArrowUp(this)');
}

function textCount(event, totalCharacters){
    console.log("Checking");
    var remaining = totalCharacters-$(event).val().length;
    $(event).nextAll()[1].innerHTML = remaining + ' / ' +totalCharacters + 'Character left';
}

function adddata(event){
    var chooseDate = $(event).prevAll()[16].value;
    var eventName =  $(event).prevAll()[13].value;
    var startdate = $(event).prevAll()[9].value;
    var enddate = $(event).prevAll()[6].value;
    var description = $(event).prevAll()[3].value;

    if(enddate<=startdate){
        alert('Select correct start and end time');
        return;
    }
    
    var singleRecord = [];
    singleRecord.push(chooseDate);
    singleRecord.push(eventName);
    singleRecord.push(startdate);
    singleRecord.push(enddate);
    singleRecord.push(description);

globalDB.push(singleRecord); 

var allRecord = [];
try{
    var prevRecord = sessionStorage.getItem('record').split(',');
    allRecord.push(prevRecord);
}
catch(err){

}
allRecord.push(singleRecord);
sessionStorage.setItem("record", allRecord);

loaddata();
}

function loaddata(){
    var x = sessionStorage.getItem('record').split(',');
    if(x.length % 5 !=0)
    x.splice(0,1);
    if(x.length==0)
    {
        $('#boxContainer').html('No records found');
        return;
    }
    allRecords=[];
    
    for(let i=0; i<x.length; i+=5){
        allRecords.push(x.slice(i, i+5))
    }
    console.log(allRecords);

    var boxValue = '';
    for(let i=0; i<allRecords.length; i++){
        var eventDate = allRecords[i][0];
        var eventName = allRecords[i][1];
        var startdate = allRecords[i][2];
        var enddate = allRecords[i][3];
        var description = allRecords[i][4];

        boxValue += '<div class="box" id="box1"><div class="event-header"><span class="event-time"> &#9733; '+
        eventDate + ' | ' + startdate + ' - ' + enddate
         +' </span><span class="trash-btn" onclick="deleteCard('+i+')"><i class="fa-solid fa-trash"></i></span></div><div class="event-desc">'+eventName +'</div><div class="dropdown-btn"><p class="downarrow"><i class="fa-solid fa-chevron-up" style="font-size: 24px;"onclick="toggleArrowUp(this)"></i></p><p class="description">'+
        description
        +'</p></div></div>';
        console.log(boxValue);

        
        $('#boxContainer').html(boxValue);
    }

}

function deleteCard(index){
   allRecords.splice(index,1);
   $('#boxContainer').html('');
   sessionStorage.setItem("record", allRecords);
   if(allRecords.length!=0)
     loaddata();
    else
    $('#boxContainer').html('No records found');
}

function dateFilter(dates){
    let filteredRecords = allRecords.filter(record => record[0] === dates);

    $('#boxContainer').html('');

    if(filteredRecords.length === 0){
        $('#boxContainer').html('No records found');
        return;
    }

    let boxValue = '';
    for(let i=0; i<filteredRecords.length; i++){
        let eventDate = filteredRecords[i][0];
        let eventName = filteredRecords[i][1];
        let startdate = filteredRecords[i][2];
        let enddate = filteredRecords[i][3];
        let description = filteredRecords[i][4];

        boxValue += '<div class="box" id="box1"><div class="event-header"><span class="event-time"> &#9733; '+
        eventDate + ' | ' + startdate + ' - ' + enddate
        +'</span><span class="trash-btn" onclick="deleteCard('+i+')"><i class="fa-solid fa-trash"></i></span></div><div class="event-desc">'+eventName+'</div><div class="dropdown-btn"><p class="downarrow"><i class="fa-solid fa-chevron-up" style="font-size: 24px;" onclick="toggleArrowUp(this)"></i></p><p class="description">'+
        description
        +'</p></div></div>';
    }

    $('#boxContainer').html(boxValue);

}
