var userDB = [] 
var queueDB = []
if (sessionStorage.getItem("userdata")!=null) {
    userDB = JSON.parse(sessionStorage.getItem('userdata'));
}
if (sessionStorage.getItem("userdata")!=null) {
    queueDB = JSON.parse(sessionStorage.getItem('userqueue'));
}





(function() {
    //대기열 보이기 
    var queueTable = document.querySelector(".queue__info");
    queueTable.innerHTML="";
    for(let i=0; i<queueDB.length;i++) {
        queueTable.innerHTML +=  `<tr><td><input type="checkbox" name="checkBox" value=${i}></td>  <td>${queueDB[i].class}</td>` 
            +`<td>${queueDB[i].name}</td><td>${queueDB[i].part}</td><td>${queueDB[i].stdNum}</td>`;
    }
    $('form').on('submit', (e)=>{ e.preventDefault();}) 


    $('.approval').on('click', ()=> {
        var userDB = [] 
        var queueDB = []
        if (sessionStorage.getItem("userdata")!=null) {
            userDB = JSON.parse(sessionStorage.getItem('userdata'));
        }
        if (sessionStorage.getItem("userqueue")!=null) {
            queueDB = JSON.parse(sessionStorage.getItem('userqueue'));
        }

        var td = $(".queue__info td"); 
        for (let i=td.length-1;i>=0;i--) { 
            
            if (td.eq(i).find('input').is(":checked")){ //선택한 row인덱스 
                let idx = td.eq(i).find('input').val(); 
                userDB.push(queueDB[idx]); 
                queueDB.splice(idx,1);
                console.log(queueDB[idx]);
            }
        } 
        sessionStorage.setItem("userdata", JSON.stringify(userDB));
        sessionStorage.setItem("userqueue", JSON.stringify(queueDB));
        location.reload(true);
    })
    $('.reject').on('click', ()=> { 
        var queueDB = [] 
        if (sessionStorage.getItem("userqueue")!=null) {
            queueDB = JSON.parse(sessionStorage.getItem('userqueue'));
        } 
        var td = $(".queue__info td"); 
        for (let i=td.length-1;i>=0;i--) { 
            console.log(i);
            if (td.eq(i).find('input').is(":checked")){ //선택한 row인덱스  
                let idx = td.eq(i).find('input').val(); 
                queueDB.splice(idx,1);//그냥 삭제 
            }
        } 
        sessionStorage.setItem("userqueue", JSON.stringify(queueDB));
        location.reload(true);
    })


    //유저 정보 보기 
    var userTable = document.querySelector(".user__info");
    userTable.innerHTML="";
    for(let i=0; i<userDB.length;i++) {
        userTable.innerHTML +=  `<tr><td><input type="checkbox" name="checkBox" value=${i}></td>  <td>${userDB[i].admin}</td>` 
            +`<td>${userDB[i].class}</td><td>${userDB[i].name}</td><td>${userDB[i].part}</td>`
            +`<td>${userDB[i].stdNum}</td><td>${userDB[i].phone}</td>`;
    }
    $('.adminO').on('click', ()=> {
        var userDB = []  
        if (sessionStorage.getItem("userdata")!=null) {
            userDB = JSON.parse(sessionStorage.getItem('userdata'));
        } 

        var td = $(".user__info td"); 
        for (let i=0;i<td.length;i++) { 
            if (td.eq(i).find('input').is(":checked")){ //선택한 row인덱스 
                let idx = td.eq(i).find('input').val(); 
                userDB[idx].admin = true;
            }
        } 
        sessionStorage.setItem("userdata", JSON.stringify(userDB));
        location.reload(true);
    })
    $('.adminX').on('click', ()=> {
        var userDB = []  
        if (sessionStorage.getItem("userdata")!=null) {
            userDB = JSON.parse(sessionStorage.getItem('userdata'));
        } 

        var td = $(".user__info td"); 
        for (let i=0;i<td.length;i++) { 
            if (td.eq(i).find('input').is(":checked")){ //선택한 row인덱스 
                let idx = td.eq(i).find('input').val(); 
                userDB[idx].admin = false;
            }
        } 
        sessionStorage.setItem("userdata", JSON.stringify(userDB));
        location.reload(true);
    })
})();