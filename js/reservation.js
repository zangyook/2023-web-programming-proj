// function



(function() {
    UserMode();
    var todayObj = new Date();
    currentYear = todayObj.getFullYear();
    currentMonth = todayObj.getMonth();
    
    var todayIdx = todayObj.getDate() +new Date(currentYear,currentMonth,1).getDay()-1;
    var nextBtn = document.querySelector('.nextBtn'); // 다음달로 이동하는 버튼
    var todayBtn = document.querySelector('.todayBtn');  //오늘로 이동하는 버튼
    var timeSelectorDateBox = document.querySelector(".timeSelector__date"); //선택한 날짜
    var rightBtn = document.querySelector('.timeMoveBtn.right');
    var leftBtn = document.querySelector('.timeMoveBtn.left');
    var bkNextBtn = document.querySelector('.bk__btn');
    var checkBtn = document.querySelector("#checkBtn");
    var closeBtn = document.querySelector("#closeBtn");
    form = document.querySelector('form');
    $(".booking__popup").hide();
    calendar(currentYear, currentMonth);  
    makeTimeSelector();
    BoxActive(todayIdx); //오늘 날짜 idx
    timeAvailable(currentYear,currentMonth,todayObj.getDate())
    TimeActive();
    timeSelectorDateBox.innerHTML = (currentMonth+1) + "월" + (todayIdx-1) + "일"; 
    nextBtn.addEventListener('click', function(e){
        calendar(currentYear, ++currentMonth);
        //timeAvailable(currentYear,currentMonth,e.target.val().split('-')[2]);
        TimeActive();
    });
    todayBtn.addEventListener('click', function() {
        currentYear =  todayObj.getFullYear();
        currentMonth = todayObj.getMonth();
        calendar(currentYear, currentMonth);
        BoxActive(todayIdx);
        timeAvailable(currentYear, currentMonth, todayObj.getDate());
        TimeActive();
    })
    rightBtn.addEventListener('click', ()=> btnScroll(300));
    leftBtn.addEventListener('click', ()=> {btnScroll(-300); });



    bkNextBtn.onclick = function() { //시간 선택 후 다음 단계 버튼을 누름 
        if ($('.timeActive').length<1) {
            alert('시간을 선택해주세요');
            return
        }
        bkNextBtn.classList.add("display-none");
        $(".booking__popup").show();
        $("#popup1").show();
        $("#popup2").hide();
    }
    checkBtn.onclick = function() { //안내사항 확인 누르고 
        popupLoading();
        $("#popup1").hide();
        $("#popup2").show();
    }
    closeBtn.onclick = function() {
        $(".booking__popup").hide();
        $('.timeActive').removeClass('timeActive');
        bkNextBtn.classList.remove("display-none");
    }
    // 추가 버튼 클릭 -> 데이터 추가하기
    form.addEventListener('submit', (e)=> {
        var completed = submit(e);
        if (completed) {
            location.reload(true);
        }
    })
    ;
    $('input[name="RT"]').on('click', function() {
        var value = $(this).val();
        var nameInput = $('#addInput');

        if (value === '3' && $(this).prop('checked')) {
            nameInput.prop('disabled', true);
            nameInput.css('background', 'rgb(83, 83, 83)');
        } else {
            nameInput.prop('disabled', false);
            nameInput.css('background', 'rgb(228, 228, 228)');
        }
    });
})();


function makeBlock(rowNum) { // 캘린더 테이블 만들기 
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

function calendar(currentYear, currentMonth) { //캘린더 테이블에 날짜 적기 
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
    var startDay = startInfo.getDay();  
    var today = new Date().getDate() + startDay;
    var lastDate = lastInfo.getDate();

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

    //날짜 적기 
    var timeSelectorDateBox = document.querySelector(".timeSelector__date");
    var clickListener = function(e) {
        
        BoxActive($('.dayBox').index(e.target));
        d = e.target.querySelector('.date').innerText;
        timeAvailable(currentYear,currentMonth,d);
        timeSelectorDateBox.innerHTML = (currentMonth+1) + "월" + (d) + "일";
        var availableTimeBox = document.querySelectorAll('.time_box.available');
        availableTimeBox.forEach((li) => {
            li.classList.remove('timeActive'); 
        })
    }
    if ((currentMonth == new Date().getMonth())){
        for (let i=startDay; i<startDay+lastDate; i++) {
            dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div>";
            if (i>=today-1){
                dayBox[i].classList.add('available');
                dayBox[i].onclick =  clickListener;
            }
        }
    }
    else {
        for (let i=startDay; i<startDay+lastDate; i++) {
            dayBox[i].innerHTML = "<div class='date'>" + (i-startDay+1) + "</div>";
            dayBox[i].classList.add('available');
            dayBox[i].onclick = clickListener;
        }
    }

}



function BoxActive(todayIdx) { //캘린더 날짜 블록 선택 시 활성화되도록 만들기 
    var todayBox = document.querySelectorAll('.dayBox');
    for (var i=0;i<todayBox.length;i++) {
        todayBox[i].classList.remove("boxActive");
    }

    todayBox[todayIdx].classList.add("boxActive");
    //박스에 일자 부여 

    var date = todayIdx - (new Date(currentYear, currentMonth,1).getDay())+1;

    todayBox[todayIdx].setAttribute('value', `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`);
}

function makeTimeSelector() {
    var controller = document.querySelector('.timeSelector__controller').querySelector('ul');
    for (let i=0;i<24*2;i++) {
        controller.innerHTML += "<li><span class='time_txt'>" + String(Math.floor(i/2)).padStart(2,'0') + ":" + (i%2==0? '00': '30')
                        +"</span><div class='time_box'  ></li>";
    }
}

//available 시간대 표시하기 (재조정)
function timeAvailable(year,month,date) { //여기서 month는 0부터 시작함 
    //available 에서 시작 
    $(".time_box").addClass("available");
    var today=new Date();
    //오늘인 경우 
    if (year == today.getFullYear()) {
        if (month == today.getMonth()) {
            if (date == today.getDate()) {
                boxIdx = 2*today.getHours() + Math.ceil(today.getMinutes()/30)-1;
                for (let i=0;i<boxIdx;i++) {
                    $(".time_box").eq(i).removeClass("available");
                    $(".time_box").eq(i).removeClass("timeActive");
                }
                
            }
        }
    } 
    
    //DB와 비교해서 선택된 날짜가 DB 기록과 일치하면 available변경 
    var DB = JSON.parse(sessionStorage.getItem('reservationData'));
    var targetDate = `${year}-${(month+1).toString().padStart(2,'0')}-${date.toString().padStart(2,'0')}`;

    var filteredData = DB.filter(item=> item.date ==targetDate);
    for (i=0; i<filteredData.length;i++) {
        Idx = reverseConvertTime(filteredData[i].time);
        startIdx=Idx[0]; endIdx=Idx[1]; 
        for (let i=startIdx;i<endIdx;i++) {
            $(".time_box").eq(i).removeClass("available");
            $(".time_box").eq(i).removeClass("timeActive");
        }
    }
    TimeActive();
}


//시간대 선택될 때 -> 여러 조건에 따라 처리 
function TimeActive() {
    var availableTimeBox = document.querySelectorAll('.time_box.available');
    availableTimeBox.forEach((li) => {
        li.classList.remove('timeActive');
    })
    console.log(availableTimeBox);
    for (let i=0;i<availableTimeBox.length;i++) {
        availableTimeBox[i].onclick =  ()=> { 
            var TimeBox = document.querySelectorAll('.time_box');
            var nowIdx = $('.time_box').index(availableTimeBox[i]);
            var ActiveQuery = $(".timeActive");
            var activeNum = ActiveQuery.length;
            var boxFirstIdx = $('.time_box').index(ActiveQuery.first());
            var boxRange = nowIdx - boxFirstIdx +1; 



            if (activeNum>0) {
                if (boxRange> availableTimeRange) {
                    alert("최대 이용가능 시간은 2시간입니다.");
                    $('.timeActive').removeClass('timeActive');
                    return
                }
                else if (boxRange>1) { 
                    for (let j=boxFirstIdx+1; j<nowIdx; j++) {
                        if (!TimeBox[j].classList.contains('available')) {
                            continue
                        }

                        TimeBox[j].classList.add('timeActive');
                        TimeBox[j].setAttribute('value', j);
                    }
                }
                else {
                    $('.timeActive').removeClass("timeActive");
                }
            }
            availableTimeBox[i].classList.add('timeActive');
            availableTimeBox[i].setAttribute('value', nowIdx);
        }
    }
}



function btnScroll(x) {
    var ulDiv = document.querySelector('.timeSelector__controller').querySelector('ul');
    ulDiv.scrollBy(x,0);
}

function toggleCheck(targ){
    var obj = document.getElementsByName("RT");
    for(var i=0; i<obj.length; i++){
        if(obj[i] != targ){
            obj[i].checked = false;
        }
    }
}

// 예약 팝업 창 세팅 
function popupLoading() {
    let text = $('.boxActive').attr('value') + " " + convertTime($('.timeActive').first().attr('value')) +"~" + convertTime(Number($('.timeActive').last().attr('value'))+1);
    $('.p2__date').html(text);
}


function convertTime(boxIndex) {
    var H = Math.floor(boxIndex/2);
    var M = (boxIndex%2==0)? '00': '30' ;
    return `${H}:${M}` 
}

function reverseConvertTime(timeText) {
    var timeRange = timeText.split("~");
    var start=timeRange[0];
    var end = timeRange[1];

    startIdx = start.split(":")[0]*2 + Math.ceil(start.split(":")[1]/30);
    endIdx = end.split(":")[0]*2 + Math.ceil(end.split(":")[1]/30);

    return [startIdx, endIdx]
}

function submit(e) {
    e.preventDefault();
    //값이 비어있는지 확인
     if ($('input[name="RT"]:checked').length < 1) {
        alert("내용을 입력해주세요.");
     }
     else if ($('#pName').val()==''||$('#pNumber').val()=='') {
        alert("내용을 입력해주세요.");
     }
     else if ($("#addInput").prop('disabled')==false && $("#addInput").val()==''){
        alert("내용을 입력해주세요.");
     }
     else {
        //데이터 정보 보내기 
        var q =$('.p2__date').text().split(" ");
        var typeBox =$('input[name="RT"]:checked').parent().text();
        var object = {
            date: q[0],
            time: q[1],
            type: typeBox,
            예약자: $('#pName').val(), 
            전화번호:  $('#pNumber').val()
        }
        if (typeBox!='개인'){
            object['동반자'] = $('#addInput').val();
        }
        var DB = JSON.parse(sessionStorage.getItem('reservationData'));
        DB.push(object);
        sessionStorage.setItem('reservationData', JSON.stringify(DB));
        alert("신청되었습니다.");
        return true
     }
     return false
}

function isUser() {
    if (sessionStorage.getItem("login")==0) {
        alert("회원 전용 페이지입니다.");
        location.href = "../index.html";
        return
    }
}

function UserMode() {
    object = JSON.parse(sessionStorage.getItem('login'));
    if (object.admin) {
        availableTimeRange = 48; //관리자는 24시간 모두 예약 가능 
    }
    else {
        availableTimeRange = 4; //사용자의 경우 2시간만 예약 가능 
    }
}