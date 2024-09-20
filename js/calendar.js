//data section
var TodoData = []
TodoData.push({
    date: '2023-08-12', 
    time: 19, 
    title: '연합공연', 
    detail: '시간: 19시-21시<br>장소: 홍대FF'
});
TodoData.push({
    date: '2023-08-17', 
    time: -1, 
    title: '프로젝트 발표', 
    detail: '동영상 제출' 
});
TodoData.push({
    date: '2023-09-05', 
    time: 18, 
    title: '개강 버스킹', 
    detail: '시간: 18시-20시<br>장소: 붕어방' 
});
if (sessionStorage.getItem("TodoData") == null) {
    sessionStorage.setItem("TodoData", JSON.stringify(TodoData));
}



/*===================================페이지 로딩 시=================================== */
(function() {

    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    var todayIdx = new Date().getDate() +new Date(currentYear,currentMonth,1).getDay()-1;
    saveBtn = document.querySelector('#fineBtn');
    submit = document.querySelector("#submit");
    //elements
    board = document.querySelector(".calendar__board");
    boardContents = document.querySelector(".board__contents");
    inputDates = document.querySelector("select[name='datetime']");
    popup = document.querySelector('.calendar__popup');
    
    //BTN
    prevBtn = document.querySelector('.prevBtn');
    nextBtn = document.querySelector('.nextBtn');
    todayBtn = document.querySelector('.todayBtn');
    modifyBtn = document.querySelector('.modifyBtn');
    doneBtn = document.querySelector('.doneBtn');
    submitBtn = document.querySelector('.submitBtn');
    backBtn = document.querySelector('.backBtn');
    borderBackBtn = document.querySelector('.board__nav>button');
    form = document.getElementById('form');
    timeCheck = document.querySelector("input[type=checkbox]");
    deleteBtn = document.querySelector("#deleteBtn");
    

    if (sessionStorage.getItem("login") != 0) {
        if (JSON.parse(sessionStorage.getItem("login")).admin == true) { 
            modifyBtn.classList.remove("display-none");
        }
    }

    calendar(currentYear, currentMonth); 
    BoxActive(todayIdx); 

    prevBtn.addEventListener('click', function(){
        calendar(currentYear, --currentMonth);
        board.classList.add('display-none');
        var todoDiv = document.querySelectorAll(".tododata");
        for(let i=0;i< todoDiv.length;i++) {
            todoDiv[i].addEventListener('click', popBoard);
        }
        if (currentYear==new Date().getFullYear() & currentMonth==new Date().getMonth()){
            BoxActive(todayIdx); 
        }
    });
    nextBtn.addEventListener('click', function(){
        calendar(currentYear, ++currentMonth);
        board.classList.add('display-none');
        var todoDiv = document.querySelectorAll(".tododata");
        for(let i=0;i< todoDiv.length;i++) {
            todoDiv[i].addEventListener('click', popBoard);
        }
        if (currentYear==new Date().getFullYear() & currentMonth==new Date().getMonth()){
            BoxActive(todayIdx); 
        }
    });
    todayBtn.addEventListener('click', function() {
        currentYear = new Date().getFullYear();
        currentMonth = new Date().getMonth();
        calendar(currentYear, currentMonth);
        BoxActive(todayIdx); 
        board.classList.add('display-none');
        var todoDiv = document.querySelectorAll(".tododata");
        for(let i=0;i< todoDiv.length;i++) {
            todoDiv[i].addEventListener('click', popBoard);
        }
    })
    modifyBtn.addEventListener('click', function() {
        modifyBtn.classList.add("display-none");
        doneBtn.classList.remove("display-none");
        modify();
        board.classList.add('display-none');
    })
    borderBackBtn.addEventListener('click', function() {
        board.classList.add("display-none");
    })
    var todoDiv = document.querySelectorAll(".tododata");
    for(let i=0;i< todoDiv.length;i++) {
        todoDiv[i].addEventListener('click', popBoard);
    }
})();

/*===================================기본 캘린더 틀=================================== */
//캘린더 블록 구조 만들기 
function makeBlock(rowNum) {
    week = ['일','월', '화','수','목','금','토'];
    var header = document.querySelector(".calendar__header");
    var contents = document.querySelector(".calendar__contents");
    header.innerHTML = ""; 
    contents.innerHTML = "";
    //weekRow 박스 작성
    for (let i =0 ; i < rowNum;i++) {
        contents.innerHTML += "<div role='row' class='weekRow'>";
        var weekRow = document.querySelectorAll(".weekRow")[i];
        for (let j=0;j<7; j++) {  
            if (i==0){
                header.innerHTML += "<div>" + week[j] + "</div>"; 
            }
            weekRow.innerHTML += "<div class='dayBox'></div>";
        }
        contents.innerHTML += "</div>"; 
    }
}

//캘린더 구조에 날짜 및 데이터 입력 
function calendar(currentYear, currentMonth) {
    if (currentMonth<1) {
        currentYear += Math.floor(currentMonth/12);
        currentMonth += -12*Math.floor(currentMonth/12);
    }
    else if (currentMonth>11) {
        currentYear += parseInt(currentMonth/11);
        currentMonth %= 12;
    }
    
    var startInfo = new Date(currentYear, currentMonth, 1); //현재 달 시작 일  
    var lastInfo = new Date(currentYear, currentMonth+1,0); //현재 달 마지막 일
    var preInfo = new Date(currentYear, currentMonth, 0); // 이전 달 마지막 일 
    var startDay = startInfo.getDay();  
    var todayIdx = new Date().getDate() + startDay;
    var lastDate = lastInfo.getDate();
    var preDate = preInfo.getDate();

    //박스 제작. . 
    if (startDay+lastDate>35){
        makeBlock(6);
    }
    else {
        makeBlock(5);
    }

    var titleCaption = document.querySelector(".cal__title"); 
    var dayBox = document.querySelectorAll(".dayBox");

    titleCaption.innerHTML = currentYear + "년" + (currentMonth+1) + "월" ; 

    
    for (let i=0; i<startDay; i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (preDate-startDay+i+1) + "</div> <div role='presentation' class='todo'></div>";
        dayBox[i].classList.remove("available");
        dayBox[i].classList.remove("today");
    }

    for (let i=startDay; i<startDay+lastDate; i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div> <div role='presentation' class='todo'></div>";
        dayBox[i].classList.add("available");
        dayBox[i].classList.remove("today");
        dayBox[i].value = i-startDay;
    }
    lastDate += startDay;
    for (let i=lastDate; i<35;i++) {
        dayBox[i].innerHTML = "<div class='date'>" + (i-lastDate+1) +"</div><div role='presentation' class='todo'></div>";
        dayBox[i].classList.remove("available");
        dayBox[i].classList.remove("today");
    }
    dayBox[todayIdx].classList.add("today");
    TodoData = JSON.parse(sessionStorage.getItem("TodoData"));
    insertData(currentYear, currentMonth, TodoData); //캘린더 날짜 입력할 때 todo 데이터도 입력 
}



//캘린더 날짜 블록 선택 시 활성화되도록 만들기 
function BoxActive(todayIdx) {
    var todayBox = document.querySelectorAll('.dayBox');
    todayBox[todayIdx].classList.add("boxActive");
}


//일정 데이터 입력하는 함수 
function insertData(year, month, Data){
    
    for (let i =0; i<Data.length; i++) {
        let data = Data[i].date.split("-");
        var startDay = new Date(year,month,1);
        var todoIdx = Number(startDay.getDay()) + Number(data[2]) - 1;
        var todoBox = document.querySelectorAll(".todo")[todoIdx];
        //todoBox.innerHTML = "";
        if (year == data[0]) {
            if ((month+1) == data[1]) {
                todoBox.innerHTML += `<div class='tododata' value='${JSON.stringify(Data[i])}'> ${Data[i].title}</div>`;

            }
        }
    }
}

//상세 정보 표시 
function popBoard(event) {
    var object = JSON.parse(event.target.getAttribute('value')); 
    let rect = event.currentTarget.getBoundingClientRect();
    //board.style.marginLeft = rect.right+"px";
    //board.style.marginTop =  rect.top +"px"; 
    board.classList.remove("display-none");

    if (object.time>-1) {
        boardContents.innerHTML = `<div class='board__title'>${object.title}</div><div class='board__dsate'>${object.date} ${object.time}시</div><div class='board__detail'>${object.detail}</div>`;
    }
    else {
        boardContents.innerHTML = `<div class='board__title'>${object.title}</div><div class='board__date'>${object.date}</div><div class='board__detail'>${object.detail}</div>`;
    }

    
}

/*===================================관리자 기능===================================*/
// 관리자 수정 모드 눌렀을 때 
function modify() {
    var dayBox = document.querySelectorAll(".dayBox.available");
    nextBtn.classList.add('display-none');
    prevBtn.classList.add('display-none');
    todayBtn.classList.add("display-none");

    var tododiv = document.querySelectorAll(".tododata");
    var cancelBtn = document.querySelector(".dismissBtn");
    var tempData = [] //JSON.parse(sessionStorage.getItem("TodoData")) || [];

    //일정 수정 
    for (let i=0;i<tododiv.length;i++) {
        tododiv[i].classList.add("modify");
        tododiv[i].addEventListener('click', modifyPopup);
        tododiv[i].removeEventListener('click', popBoard);
    }
    //박스 클릭시 일정 추가 팝업 띄우기  
    for (let i=0;i<dayBox.length; i++) {
        dayBox[i].addEventListener('click', popupHandler);
    }
        
    for (let i =0;i<24;i++) {
        inputDates.innerHTML += "<option value=" + i + ">" +i+"시 </option>";
    }
    
    timeCheck.addEventListener('change', function() {
        if (timeCheck.checked) {
            inputDates.disabled = true;
        }
        else {
            inputDates.disabled = false;
        }
    })
    // 추가 버튼 클릭 -> 데이터 추가하기
    form.onsubmit = function(e) {
        e.preventDefault();
        if (form[0]['value']=="") {
            popup.classList.add('display-none');
            alert('제목을 입력하세요.');
            return
        }
        if (form[3].checked) {
            var object = {
                date: form[1]['value'], 
                time:-1, 
                title: form[0]['value'], 
                detail: form[4]['value']};
        }
        else {
            var object = {
                date: form[1]['value'], 
                time:form[2]['value'], 
                title: form[0]['value'], 
                detail: form[4]['value']};
        }
        
        tempData.push(object);
        console.log(object);
        insertData(currentYear, currentMonth, [object]);
        popup.classList.add('display-none');

        //새로 쓴 tododata div에 이벤트리스너 연결
        let tododiv = document.querySelectorAll(".tododata");
        for (let i=0;i<tododiv.length;i++) {
            tododiv[i].classList.add("modify");
            tododiv[i].addEventListener('click', modifyPopup);
        }
    }

    submitBtn.addEventListener('click', function() {
        modifyBtn.classList.remove("display-none");
        doneBtn.classList.add("display-none");
        var arr = []; //현재 달은 블록에 있는 것들로 교체, 다른 달 일정은 그대로 유지할 것임 
        var tododata = document.querySelectorAll('.tododata');
        
        var filteredList = JSON.parse(sessionStorage.getItem('TodoData')).filter(function(item) {
            let date = item.date.split('-');
            let y = parseInt(date[0]);
            let m = parseInt(date[1])-1; 
            return (y!=currentYear || m!=currentMonth);
        })
        for (let i =0; i<tododata.length;i++) {
            arr.push(JSON.parse(tododata[i].getAttribute('value')));
        }
        arr = arr.concat(filteredList);

        sessionStorage.setItem("TodoData", JSON.stringify(arr));
        ChangePopup();
        //location.reload(true);
    })
    backBtn.addEventListener('click', function() {
        modifyBtn.classList.remove("display-none");
        doneBtn.classList.add("display-none");
        ChangePopup();
        location.reload(true);
    })
    cancelBtn.addEventListener('click', ()=> {
        popup.classList.add('display-none');
    })
    
}

//박스클릭 시  
function popupHandler(event)  {
    let rect = event.currentTarget.getBoundingClientRect();
    var i = event.target.value;
    //form 입력란 초기화 
    form[0].value="";
    form[2].value =0;
    form[2].disabled = false;
    form[3].checked = false;
    form[4].value="";

    submit.classList.remove("display-none");
    saveBtn.classList.add("display-none");
    deleteBtn.classList.add("display-none");

    popup.style.marginLeft = (rect.right-450)+"px";
    popup.style.marginTop =  rect.top +"px"; 
    popup.classList.remove("display-none");


    $('input[name="dates"]').daterangepicker({ 
        singleDatePicker: true,
        lang:'ko',
        minDate: new Date(currentYear, currentMonth,1),
        maxDate: new Date(currentYear, currentMonth+1,0),
        startDate: `${currentYear}-${currentMonth+1}-${i+1}`,
        locale: {
            format: 'YYYY-MM-DD'
          }        
    });
}

// 존재하는 일정 수정하려고 할 때 
function modifyPopup(event) {

    var object = JSON.parse(event.target.getAttribute('value')); // 객체가 텍스트 형태로 저장되어있다고 가정 
    let rect = event.currentTarget.getBoundingClientRect();
    submit.classList.add("display-none"); //추가 버튼 
    saveBtn.classList.remove("display-none"); //수정 버튼 
    deleteBtn.classList.remove("display-none"); //삭제 버튼 

    popup.style.marginLeft = (rect.right-450)+"px";
    popup.style.marginTop =  (rect.top) +"px"; 
    popup.classList.remove("display-none");

    form[0]['value'] = object.title;
    form[1]['value'] = object.date;

    if (object.time==-1){
        form[3].checked = true;
        inputDates.disabled = true;
    }
    else {
        form[3].checked = false;
        inputDates.disabled = false;
        form[2]['value'] = object.time;
    }
    form[4]['value'] = object.detail;
    event.target.classList.add('modify');

    saveBtn.onclick =  (e) => {
        var tempObj = {
            title: form[0]['value'], 
            date: form[1]['value'],
            time: form[3].check? -1: form[2]['value'],
            detail: form[4]['value']
        } 
        event.target.setAttribute('value', JSON.stringify(tempObj));
        event.target.innerHTML = tempObj.title;
        popup.classList.add("display-none");
    }
    deleteBtn.onclick =  () => {
        popup.classList.add("display-none");
        event.target.remove();
    }

    event.stopPropagation(); //외부 블럭의 이벤트 발생 시 


}

// 수정 완료 눌렀을 때 
function ChangePopup() {
    var popup = document.querySelector('.calendar__popup');
    var dayBox = document.querySelectorAll(".dayBox.available");
    var tododiv = document.querySelectorAll(".tododata");
    for (let i=0;i<dayBox.length; i++) {
        dayBox[i].removeEventListener('click', popupHandler);
    }
    for (let i=0;i<tododiv.length; i++) {
        tododiv[i].removeEventListener('click', modifyPopup);
    }
    popup.classList.add('display-none');

    for (let i=0;i<tododiv.length;i++) {
        tododiv[i].addEventListener('click', popBoard);
    }
    nextBtn.classList.remove('display-none');
    prevBtn.classList.remove('display-none');
    todayBtn.classList.remove("display-none");
}


/*===================================배경=================================== */
/*
var $img = $('i');
var cast = []; 
$banner_height = $('main').css('height');
function setInst(num){
    	var x = Math.floor(Math.random() * (500 - 10) + 10),
		y = Math.floor(Math.random() * (400 - 120) + 120),
		size = Math.floor(Math.random() * (200 - 100) + 100),
		angle = Math.floor(Math.random() * (360 - 0) + 0),
		speed = Math.random() * (2 - 0) + 0;

	cast[num] = {
	    x: x,			// x좌표
	    y: -y,			// y좌표
	    size: size,		// 사이즈
	    angle: angle,	// angle
	    speed: speed	// speed
	};		
}

function ball_init(){
	$img.each(function(i){
		// 풍선 객체들의 속성 초기화
		setInst(i);
		$img.eq(i)
			.css('left', '-9999px')	// 풍선의 x 좌표
	    	.css('top', '-9999px');	// 풍선의 y 좌표
	});
}
// 풍선 애니메이션 함수
function animate_balloon(){
 	$img.each(function(i){
 		// 벌룬 속성 변경
 		$img.eq(i)
 			.css('left', cast[i].x + 'px')	// x 좌표
	 		.css('top', cast[i].y + 'px')	// y 좌표
	 		.css('transform', 'rotate(' + cast[i].angle + 'deg)');	// 회전

	 	// 벌룬이 화면 안에 있으면
	    if(cast[i].y < parseInt($banner_height)){
	      cast[i].y += 1 + cast[i].speed;
	      cast[i].angle += cast[i].speed;
	    } else{	// 벌룬이 밑으로 나가면 
	    	setInst(i);
	    }	 		
 	});	// end each()
}	// end move_balloon()

//메인
ball_init();
setInterval(function(){ animate_balloon(); }, 1000/30);	 
*/