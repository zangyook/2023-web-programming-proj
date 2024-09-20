var userdata = [] ; 
userdata.push({admin:true, id:'admin', password:"0000", class:0, name:"관리자", phone:NaN, part:NaN, stdNum:NaN}); 
userdata.push({admin:false, id:'memberOne', password:"0000", class:14, name:"member", phone:"010", part:"drum", stdNum:"1234"});

var reservationData = [];
reservationData.push({
    date: '2023-08-17',
    time: '12:00~13:30',
    type: '개인',
    예약자: 'memberOne',
    전화번호: '010-1234-5678'
})
reservationData.push({
    date: '2023-08-17',
    time: '14:00~16:30',
    type: '커리',
    예약자: '드럼 파트장',
    전화번호: '010-1234-5678',
    동반자: "커리 수강생들"
})
reservationData.push({
    date: '2023-08-18',
    time: '00:00~01:30',
    type: '합주',
    예약자: 'abc 밴드',
    전화번호: '010-1234-5678',
    동반자: "김씨, 이씨, 장씨"
})
/*======데이터======*/
var noticeData = [];
noticeData.push({
    title: "동아리 운영규정 안내",
    writer: "관리자",
    date: "2022-03-04",
    count: 613, 
    text: "동아리 운영규정은 다음과 같습니다. "
});
noticeData.push({
    title: "15기 임원진 모집 안내(~3/2)",
    writer: "관리자",
    date: "2023-02-14",
    count: 613, 
    text: "15기 SoundClub을 운영할 임원진을 모집합니다. 모집인원은 다음과 같습니다.<br>- 총무 1명<br>- 서기 1명"
});
noticeData.push({
    title: "운영진 구성 안내",
    writer: "관리자",
    date: "2023-03-04",
    count: 613, 
    text: "다음과 같이 임원진이 결정되었습니다. <br>- 총무: 가나<br>- 서기: 다라"
});
noticeData.push({
    title: "4월 결산안",
    writer: "총무",
    date: "2023-05-01",
    count: 613, 
    text: "4월 결산안입니다."
});
noticeData.push({
    title: "5월 결산안",
    writer: "총무",
    date: "2023-06-01",
    count: 613, 
    text: "5월 결산안입니다."
});
userqueue=[];
userqueue.push({
    admin:false, 
    id: "guitar",
    password: "0000",
    class: 15,
    name: "기타파트장",
    phone: "01022223333",
    part: "기타",
    stdNum: "23001234"
});
userqueue.push({
    admin:false, 
    id: "vocal",
    password: "0000",
    class: 15,
    name: "보컬파트장",
    phone: "01024523333",
    part: "보컬",
    stdNum: "23001434"
});


(function ()  {
    //DATA
    if (sessionStorage.getItem("userdata")==null) {
        sessionStorage.setItem('userdata', JSON.stringify(userdata));
    }
    if (sessionStorage.getItem("login")==null) {
        sessionStorage.setItem('login', 0);
    } 
    if (sessionStorage.getItem("reservationData")==null) {
        sessionStorage.setItem('reservationData', JSON.stringify(reservationData));
    }
    if (sessionStorage.getItem('noticeData')==null) {
        sessionStorage.setItem('noticeData', JSON.stringify(noticeData));
    } 
    if (sessionStorage.getItem('userqueue')==null) {
        sessionStorage.setItem('userqueue', JSON.stringify(userqueue));
    } 
    
    if (sessionStorage.getItem("login")!=null && sessionStorage.getItem("login")!=0) {
            // 관리자 기능 보이기 
        isAdmin();
    }

    //LOGIN
    document.querySelector(".navbar__logout").addEventListener('click', () => {
        alert('로그아웃 되었습니다.');
        sessionStorage.setItem('login', 0);
    })
    if (sessionStorage.getItem('login') != 0) {
        UserMode();
    }
    else {
        GuestMode();
    }

})();



function GuestMode() {
    var loginIcon = document.querySelector(".navbar__login");
    var logoutIcon = document.querySelector(".navbar__logout");
    loginIcon.classList.remove('display-none');
    logoutIcon.classList.add('display-none');
}

function UserMode() {
    var loginIcon = document.querySelector(".navbar__login");
    var logoutIcon = document.querySelector(".navbar__logout");
    loginIcon.classList.add('display-none');
    logoutIcon.classList.remove('display-none');
}

function isAdmin() {
    if (JSON.parse(sessionStorage.getItem('login')).admin) {
        $('.navbar-managing').show();
    }
    else {
        $('.navbar-managing').hide();
    }
}

//HOVER
var menuBtn = document.querySelector(".navbar__item__list__wrap").children
for (let i=0; i<menuBtn.length; i++) {
    menuBtn[i].addEventListener('mouseover',()=>{
        menuBtn[i].classList.add("mouseover");
    })
    menuBtn[i].addEventListener('mouseout', () => {
        menuBtn[i].classList.remove("mouseover");
    })
}

//MOBILE
var menutriggerBtn = document.querySelector(".navbar__menutrigger__button");
var menubackBtn = document.querySelector(".navbar__menuback__button");
var navbarItemList = document.querySelector(".navbar__item__list__wrap");
var logo = document.querySelector(".navbar__item__logo");
var navbarItemSign = document.querySelector(".navbar__item__sign");
var main = document.querySelector('main');

menutriggerBtn.addEventListener('click', () => {
    main.setAttribute("class", "display-none")
    
    logo.style.display = "none" ; 
    //main.style.display = "none";
    navbarItemList.style = "height: calc(100dvh - var(--nav-height)); visibility: visible; padding: 0";
    navbarItemList.style.backgroundColor = "var(--nav-background-color)";
    navbarItemSign.style.display="block";
    menutriggerBtn.style.display = "none";
    menubackBtn.style.display = "flex";
})
menubackBtn.addEventListener('click', () => {
    main.removeAttribute('class');
    logo.style.display = "flex";
    //main.style.display = "block";
    navbarItemList.style.visibility = "hidden";
    navbarItemList.style.height = "54px";
    navbarItemSign.style.display="none";
    menutriggerBtn.style.display = "flex";
    menubackBtn.style.display = "none";
})

window.addEventListener('beforeunload', () => {
    if (main.classList) {
        main.removeAttribute('class');
    }
})

//관리자메뉴 보이기 
