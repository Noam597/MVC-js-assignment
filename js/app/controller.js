import * as Model from "../app/model.js";
import * as View from "../app/view.js";


var beep = new Audio("audio/button.wav");
var err = new Audio("audio/error.wav");
var success = new Audio("audio/success.wav");
var alarm = new Audio("audio/alarm.wav");
var buzzer = new Audio("audio/buzzer.wav");
var userName = "";
var numPassword = "";
var timer = null;
var timer2 = null;
var countDown = 3
var errCounter = 0;


function init() {
  View.firstLogin();
  $("#loginButton").click(secondLogin)
}


async function secondLogin() {
  var userNameInput = document.getElementById("loginInput")
  var res = await Model.loginCheck(userNameInput.value);
  //result from Model
  console.log(res)
  if (res.success == true){
    View.secondLogin();
    console.log(res.data.role);
    userName = res.data.userName;
    passwordController()
  }
  else{
    View.errorHandler(res.error);
  }
}


function passwordController() {
  numPassword = ""
  $(".keys").on("click",mouseClick);
  document.addEventListener("keydown",keyBoard);
  stopTimer()
}


  

  function mouseClick(e){
    e.stopImmediatePropagation();
    beep.play()
    numPassword +=this.innerText
    $(this).css("background-color","#5e5b5b");
    console.log(numPassword);
    if(numPassword.length== 4){
      passwordAuthenticator(numPassword);
    }
    resetKeyPadTimer()
    
}




function keyBoard(e) {
  var x = e.key;
  var keys = document.querySelectorAll(".keys");
  for (let i = 0; i < keys.length; i++) {
            if(x==keys[i].id){
              beep.play()
          numPassword += x;
    keys[i].style.backgroundColor="#5e5b5b";
    console.log(numPassword);
    if(numPassword.length== 4){
      passwordAuthenticator(numPassword);
    }
       } 
       resetKeyPadTimer();
  };
  
}



function resetKeyPadTimer() {
  stopTimer();
   timer = setInterval(function(){
      $(".keys").off("click",mouseClick);
      $(".keys").on("click",mouseClick);
      document.removeEventListener("keydown",keyBoard);
      document.addEventListener("keydown",keyBoard);
      countDown --;
      console.log(countDown);
      if(countDown == 0){
        buzzer.play()      
      stopTimer() ;
      numPassword ="";
       $(".keys").css("background-color","#857e7e");
  buzzer.play()
}
},1000)
} ;
  



function stopTimer() {
  clearInterval(timer);
  countDown=3;
}


  function passwordAuthenticator(x) {
          buzzer.muted=true
          clearTimeout(timer2)
          passwordCheck(x);
          numPassword = "";
        }



async function passwordCheck(pass) {
  var res = await Model.passwordCheck(userName, pass);
          if(res.Table.length == 1 ){
            success.play()
            stopTimer();
            if (res.Table[0].role=='1:1'){
            admin(res.Table[0].id);
          }
          else if(res.Table[0].role=='2:2'){
            managerContent(res.Table[0].id);
          }
          else{
            employeeContent(res.Table[0].id);
          }
          }
          else{
            alert("code not found",err.play());
            errCounter++;
             $(".keys").css("background-color","#857e7e");
            if(errCounter == 3){
              alarm.play()
              alert("THE POLICE ARE ON THEIR WAY.....unless our Hitmen get you first")
              init();
            }
            console.log("error number" + errCounter);
          }
}



function createAccount() {
  document.getElementById("form").addEventListener("submit",async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if(await Model.createAccount(this)){
       admin();
  }
  })
}



function createEmployeeAccount() {
  document.getElementById("form").addEventListener("submit",async function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if(await Model.createAccount(this)){
      managerContent();
  }
  })
}


async function admin(id) {
  var list = await Model.employeeList();
    View.table(list) ;
    userClearance(id);
    $("#register").click(createAccount);
      $('.delete-button').click(deleteButton);
      edit();

}


async function managerContent(id) {
  var list = await Model.employeeList();
    View.table(list);
    managerClearance();
    userClearance(id);
    $('#two').hide();
    $('#two').attr('disabled','disabled');
    $("#register").click(createEmployeeAccount);
      $('.delete-button').click(deleteButton);
      edit();
}


async function employeeContent(id) {
  var list = await Model.employeeList();
    View.table(list);
    employeeClearance();
    userClearance(id);
    edit();
}

  
 async function deleteButton() {
  var id = $(this).closest("td").prev('td').prev('td').html();
   console.log(id);
   await Model.deleteEmployee(id);
  $(this).closest('tr').fadeOut(500,function(){$(this).remove()})
}


function editButtonDisplay() {
  $(this).closest('tr').find(".editable").attr("contenteditable",true);
    $(this).hide();
    $(this).next().show();
}


async function finishEdit() {
  var tr = $(this).closest('tr').find(".editable");
console.log(tr);
  await Model.editInfo(tr);
  // editable content for the api function
  $(this).closest('tr').find(".editable").attr("contenteditable",false);
  $(this).hide();
  $(this).prev().show();
}


function edit() {
  $(".edit-button").click(editButtonDisplay);
  $(".double-check").click(finishEdit);
}


 function managerClearance() {
  $('.role').each((i,role)=>{
    console.log("this is role number " +role.innerText);
   if(role.innerText!=="3:3"){
    $(role).closest('tr').find(".edit-button").hide();
    $(role).closest('tr').find(".edit-button").attr('disabled', true);
     $(role).closest('tr').find('.delete-button').hide();
     $(role).closest('tr').find('.delete-button').attr('disabled', true);
     $(role).closest('tr').find(".double-check").attr('disabled', true);
   }
 })
}


function userClearance(userId) {
  $(".id").each((i,id)=>{
console.log(id.innerText);
if(id.innerText == userId){
    $(id).closest('tr').find(".edit-button").show();
    $(id).closest('tr').find('.delete-button').hide();
     $(id).closest('tr').find('.delete-button').attr('disabled', true);
    $(id).closest('tr').find(".edit-button").attr('disabled', false);
     
  }
  
})
}
 
function employeeClearance() {
  $(".edit-button").hide()
  $(".edit-button").attr('disabled', true);
  $(".delete-button").hide();
   $(".delete-button").attr('disabled', true);
   $(".addTable").hide();
   $('input[type="submit"]').attr('disabled','disabled');
}


export {init};


