var main = document.getElementById("main");
var currentEmployee="" 







function firstLogin(){
  main.innerHTML = `<div class="firstInput">
  <input type="text" class="input" id="loginInput">
  <br />
  <button class="loginButton" id="loginButton">Login</button>
  </div>`
}


function secondLogin() {
  main.innerHTML = `  <div class="keypad">
  <div class="keys" id="1"><span class="numbers">1</span></div>
  <div class="keys" id="2"><span class="numbers">2</span></div>
  <div class="keys" id="3"><span class="numbers">3</span></div>
  <div class="keys" id="4"><span class="numbers">4</span></div>
  <div class="keys" id="5"><span class="numbers">5</span></div>
  <div class="keys" id="6"><span class="numbers">6</span></div>
  <div class="keys" id="7"><span class="numbers">7</span></div>
  <div class="keys" id="8"><span class="numbers">8</span></div>
  <div class="keys" id="9"><span class="numbers">9</span></div>
  <div class="keys" id="0"><span class="numbers">0</span></div>
</div>`;
}



function errorHandler(err) {
 alert("wrong information")
}
 

function table(list){
  var listData = list.data
  console.log(listData);
   currentEmployee =  `
  <div class="infoTable">
    <div class="addTable">
     <form id="form">
     <div class="form-css">
    <label for="fName">First Name</label><br/>
    <input required class="info" id="fName" type="text" name="fName" placeholder="enter first name">
    </div>
    <div class="form-css">
    <label for="lName">last Name</label><br/>
    <input required class="info" id="lName" type="text" name="lName" placeholder="enter last name">
    </div>
    <div class="form-css">
    <label for="email">Email</label><br/>
    <input required class="info" id="email" type="text" name="email" placeholder="enter your email">
    </div>
    <div class="form-css">
    <label for="password">Password</label><br/>
    <input required class="info" id="password" type="password" name="password" placeholder="enter password">
    </div>
    <div class="form-css">
    <label for="userName">userName</label><br/>
    <input required class="info" id="username" type="text" name="userName" placeholder="enter user name">
    </div>
    <div class="form-css">
    <label for="role">Role:</label><select name="role" id="role">
    <option value="3">3</option>
    <option id="two" value="2">2</option>
   </select>
   </div>
   <div>
   <br/>
    <input type="submit" name="mySubmit" id="register" >
    </div>
    </form>
  </div>
  <div>
  <h1>Employee List</h1>
   <table>
   <thead>
  <tr>
   <th class="th">First Name</th>
   <th class="th">Last Name</th>
   <th class="th">Email</th>
   <th class="th">password</th>
   <th class="th">userName</th>
   <th class="th">role</th>
   <th class="th" style="display:none">ID</th>
   <th class="th"></th>
   <th class="th"></th>
   </tr>
  </thead>
 <tbody>
  `;



 listData.forEach(function (person,i){
   currentEmployee += `
  <tr>
  <td class="editable fName" contenteditable = false>${person.fName}</td>
  <td class="editable lName"  contenteditable = false>${person.lName}</td>
  <td class="editable email"  contenteditable = false>${person.email}</td>
  <td class="editable password"  contenteditable = false type="password">${person.password}</td>
  <td class="editable userName"  contenteditable = false>${person.userName}</td>
  <td class="role">${person.role}</td>
  <td class="editable id" style="display:none">${person.id}</td>
  <td class ="edit"><button class="edit-button" id="edit" ><i class="fas fa-pen-square" style="color:white"></i></button><button id="double-check" class="double-check"><i class="fas fa-check-double" style="color:green"></i></button></td>
  <td><button class="delete-button" id="delete" ><i class="fas fa-trash-alt" style="color:white"></i></button></td>
  </tr>
  
   </div>
   `
   console.log(person);
 }) 
 
 
  
main.innerHTML = currentEmployee

 
}





export {firstLogin,  secondLogin, table, errorHandler };
