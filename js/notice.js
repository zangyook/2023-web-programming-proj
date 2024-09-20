/*======데이터======*/
 
if (sessionStorage.getItem('login')!=null) {
    if (JSON.parse(sessionStorage.getItem('login')).admin) {
        $('#addBtn').show();
    }
}

/*=============메인=================*/
(function() {
    titlePerPg = 2; //페이지 당 보여줄 게시물 개수
    DB = JSON.parse(sessionStorage.getItem('noticeData'));
    var pageNum = Math.ceil(DB.length/2);
    makePageBtn(pageNum);
    displayRows(DB);
    popupHandler(); // 해당 페이지에 만들어지고 난 후에 이벤트 바인딩

    buttonHandler();
    $('#frmSearch').on('submit', (e)=> {
        e.preventDefault();
        searching(e);
    })
    $('#addBtn').on('click', ()=> {
        $('.addPopup').show();
    })
    $('#closeBtn2').on('click',()=> {
        $('.addPopup').hide();
    })
    $('#addForm').on('submit',(e)=> {
        e.preventDefault();
        postHandler(e);
    })

})();

function postHandler(e) {
    console.log(e.target[0].value);
    if (e.target[0].value==""||e.target[1].value=="") {
        alert('값을 입력해주세요.');
        return
    }
    var today = new Date();
    var object = {
        title: e.target[0].value,
        writer: JSON.parse(sessionStorage.getItem('login')).name,
        date: `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
        count: 0, 
        text: e.target[1].value
    }
    DB.push(object);
    sessionStorage.setItem("noticeData", JSON.stringify(DB));
    alert("게시되었습니다.");
    $('.addPopup').hide();
}

function popupHandler() {
    $('.tbody .title').on('click', (e)=> PopDetail(e));
    $('#closeBtn').on('click', (e)=> {
        $('.popup').hide();
    })
}

function buttonHandler() {
    $('.page').on('click', (e)=> { //페이지 이동 버튼 
        $('.page.on').removeClass('on');
        $(e.target).addClass('on');
        displayRows(DB);
        popupHandler();
    })
    $('.prevBtn').on('click', (e)=> { //왼쪽으로 
        var idx = $('.page.on').html();
        if (idx==1) {
            return
        }
        $('.page.on').removeClass('on');
        $('.page').eq(idx-2).addClass('on');
        displayRows(DB);
        popupHandler();
    })
    $('.nextBtn').on('click', (e)=> { //오른쪽으로 
        var idx = $('.page.on').html();
        if (idx==$('.page').length) {
            return
        }
        $('.page.on').removeClass('on');
        $('.page').eq(idx).addClass('on');
        displayRows(DB);
        popupHandler();
    })
}

function makePageBtn(pageNum) {
    var text = `<button class="prevBtn"><</button>`;
    for(let i=1;i<=pageNum;i++) {
        text += `<button class="page">${i}</button>`;
    }
    text += `<button class="nextBtn">></button>`;
    $('.pageSelect').html(text);
    $('.page').first().addClass('on');
}

//게시물에 따라 나열하기 
function displayRows(DB) { 
    $('.tbody__wrap').html("");
    var nowPgNum = $('.page.on').html();
    var startIdx = DB.length-nowPgNum*titlePerPg;
    for (let i=startIdx+titlePerPg-1; i>=startIdx;i--) {
        try {
            var tempDb = DB[i];
            var text = `<div class="tbody"><div class="num">${i+1}</div><div class="title">`
                    +`${tempDb.title}</div><div class="writer">${tempDb.writer}</div><div class="date">`
                    +`${tempDb.date}</div><div class="count">${tempDb.count}</div></div>`;
            $('.tbody__wrap').append(text);
        }catch(error) {
            break
        }

    }

    
}

//게시물 팝업 띄우기 
function PopDetail(e) {
    var clickedTitle = $(e.target).html();
    
    var filteredData = DB.filter(item=> item.title ==clickedTitle);
    var text = "<div id='title'>" +filteredData[0].title 
                +"</div><div id='writer'>"+ filteredData[0].writer + "</div><div id='date'>"
                + filteredData[0].date + "</div><div id='text'>"
                + filteredData[0].text + "</div>";
    $('.popup__text').html(text);
    $('.popup').show();
}

//검색어 찾기
function searching(e) {
    var form = document.querySelector('#frmSearch');
    var option = form[0].value;
    var keyword = form[1].value;
    if (option==1) { //제목으로 검색
        var filteredData = DB.filter(item=>item.title.includes(keyword));
    }
    else if (option==2) { // 2인 경우, 작성자로 검색
        var filteredData = DB.filter(item=>item.writer.includes(keyword));
    }
    else { //3인 경우 내용으로 검색
        var filteredData = DB.filter(item=>item.text.includes(keyword));
    }
    
    var pageNum = Math.ceil(filteredData.length/2);
    makePageBtn(pageNum);
    displayRows(filteredData);
    popupHandler();
    buttonHandler();
}