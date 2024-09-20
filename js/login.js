const frm = document.frm;
IDCHECK=false;
(function () { 
    $(".signup").on("click", (event)=> {
        event.preventDefault();
        $('.popup').show();
        $('form input').val("");
        $("input[type='submit']").val("가입하기");
    });
    $('#closeBtn').on('click',()=> {
        $('.popup').hide(); 
    });
    $('.popup2').show();
    $('#closeBtn2').on('click',()=> {
        $('.popup2').hide();
    });
    //로그인
    $('.frm').on('submit',(event)=> {
        var myId = frm.userId;
        var myPwd = frm.userPwd;
        if (idMatching(myId.value, myPwd.value)) {
            //
        }
        else {  
            event.preventDefault();
            myId.value = "";
            myPwd.value ="";
        }
    });
    //회원가입 - ID중복확인
    $(".idcheck").on("click", infocheck);
    $('.frm2').on('submit',(event)=> {
        signup(event);
    });
})();

 

function idMatching(idvalue, pwvalue) { 
    if (idvalue=="" || pwvalue=="") {
        alert('값을 입력해주세요.');
        return false;
    }

    for (var i=0; i<userdata.length; i++) {
        let object = userdata[i];

        if (object.id == idvalue) {
            if (object.password == pwvalue) {
                alert(object.name+"님 환영합니다.");
                sessionStorage.setItem('login', JSON.stringify(object));
                return true;
            }
            else {
                alert('로그인 정보가 일치하지 않습니다.');  
                return false;
            }
        }
    }
    alert('해당 아이디가 존재하지 않습니다.'); 
    return false;
}

function infocheck() { 
    let id=$('#signup__id').val();
    
    let userdata = JSON.parse(sessionStorage.getItem('userdata')); 
    if (id=='') {alert("아이디를 입력해주세요.");}
    else if (!(/^[a-zA-Z0-9]+$/.test(id)) ) {
        alert("영문과 숫자만 입력 가능합니다.");
    }
    else if (id.length<5 || id.length>16) {
        alert("5~16자리의 값을 입력해주세요.")
    }
    else if ($.inArray(id, userdata) !== -1) {
        alert("이미 존재하는 아이디입니다.");
    }
    else {
        IDCHECK=true;
        $(".idcheck").prop('disabled', true);
        alert("사용가능한 아이디입니다.");
    } 
}
 
function signup(event) {
    event.preventDefault();
    var id=$('#signup__id').val();
    var pw=$('#signup__pwd').val();
    var pw2=$('#signup__pwd2').val();
    var userClass=$('#user__class').val();
    var userName=$('#user__name').val();
    var userTel=$('#user__tel').val();
    var userPart = $('#user__part').val();
    var stnNum = $('#user__stnum').val();  

    if (pw==''||pw2=='') {alert("모든 항목에 값을 입력해주세요.")}
    else if (userClass==''||userName=='') {alert("모든 항목에 값을 입력해주세요.")}
    else if (userTel==''||userPart=='')  {alert("모든 항목에 값을 입력해주세요.")}
    else if (stnNum==''){alert("모든 항목에 값을 입력해주세요.")}

    else if (IDCHECK==false) {"아이디 중복 확인을 해주세요."}
    else if (pw!=pw2) {alert("비밀번호가 일치하지 않습니다.")}
    else if (stnNum.length!=8||!(/^[0-9]+$/.test(stnNum))) {alert("학번을 올바르게 입력해주세요.")}

    else if (userTel.length!=11||!(/^[0-9]+$/.test(userTel))) {alert("전화번호를 올바르게 입력해주세요.")}
    else { //입력값 올바르면 가입 신청 완료 
        let userqueue = JSON.parse(sessionStorage.getItem('userqueue')); 
        var object = {
            admin:false, 
            id: id,
            password: pw,
            class: userClass,
            name:userName,
            phone:userTel,
            part:userPart,
            stdNum:stnNum
        }
        userqueue.push(object);
        sessionStorage.setItem("userqueue", JSON.stringify(userqueue));
        alert("가입신청되었습니다. 관리자 승인 시 가입이 완료됩니다.");
        $('.popup').hide();
    }



}