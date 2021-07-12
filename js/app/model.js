import { errorHandler } from "../handlers/error.js"





async function loginCheck(userName) {
  var result = {};
  await $.get(`https://wbnoam-466b4b.appdrag.site/api/firstLogin?userName=${userName}`) // only return id
    .done((res) => {
      if (res.Table.length > 0) {
        result.data = res.Table[0];
      
        result.success = true
      }
      else {
        alert("wrong");
        result.error = "ERROR";
        result.success = false;
        console.log(res.Table[0])
      }
    })
    .fail((err) => {
      alert("wrong");
      result.error = "ERROR";
      result.success = false;
    });
  return result
}



async function passwordCheck(x, y) {
  var result = {};

console.log(x + " " + y)
  var settings = {
    url: `https://wbnoam-466b4b.appdrag.site/api/secondLogin`,
    method: "POST",
    async: true,
    data: {
      "username": x,
      "password": y,
    }
  }
  await $.ajax(settings).done(res => {
    result = res
    console.log(result);
  })
  return result
}


async function createAccount(x) {
  var result = {}
  result.success = false
  var formData = new FormData(x)
  var obj={}
  for(const item of formData.entries()){
    obj[item[0]]=item[1];
  }
  result.fName = obj.fName;
  result.lName = obj.lName;
  result.email = obj.email;
  result.password = obj.password;
  result.userName = obj.userName
  result.role = obj.role;

  var settings = {
    url:`https://wbnoam-466b4b.appdrag.site/api/createAccount`,
    method:"POST",
    async: true,
    data: obj,
    "crossDomain": true,
    "processData": true
  }
    await $.ajax(settings).done(res=>{
      console.log(res)
      //var response = JSON.parse(res);
      if(res.status == "OK" && res.affectedRows > 0){
      result.success = true
    }
    });
  return result;
}



async function employeeList() {
    var result = {};
    await $.get(
      //This $ it belongs to jquery and he takes all the tests we did before and he knows how to do them himself // If I need a '$.post' then I will write it instead of the '&.get'
      `https://wbnoam-466b4b.appdrag.site/api/employees list/employeeList`
    )
      .done((list) => {
        console.log(list);
  
        if (list.Table.length > 0) {
          result.data = list.Table;
          result.success = true;
        } else {
          alert("wrong")
          result.error = "ERROR:";
          result.success = false;
          console.log(list.Table);
        }
      })
      .fail((err) => {
        
        result.error = "ERROR:";
        result.success = false;
        console.log(err);
      });
    console.log(result.success);
  
    return result
  }




 async function deleteEmployee(id){
   var result = {}
  // var id = document.getElementsByTagName("td")[6].innerHTML
  var settings = {
    url: "https://wbnoam-466b4b.appdrag.site/api/removeEmployee/removeEmployee",
    data: {
        "id" : id
    },
    method: "POST",
    async: true,
    "crossDomain": true,
    "processData": true
};
await $.ajax(settings).done(res=> {
  result = res
    console.log(res); // TODO: Do something with the result
});
    return result
  }


  async function editInfo(tr) {
    console.log(tr);
    var settings = {
      "url": "https://wbnoam-466b4b.appdrag.site/api/updateList/updateList",
      "data": {
          "fName" : `${tr[0].innerText}`,
          "lName" : `${tr[1].innerText}`,
          "email" : `${tr[2].innerText}`,
          "password" : `${tr[3].innerText}`,
          "userName" : `${tr[4].innerText}`,
          "id" : `${tr[5].innerText}`
      },
      "method": "POST",
      "async": true,
      "crossDomain": true,
      "processData": true
  };
  $.ajax(settings).done(function (response) {
      console.log(response); // TODO: Do something with the result
  });}


export { loginCheck,
   passwordCheck ,
   createAccount,
   employeeList,
   deleteEmployee,
   editInfo
   }