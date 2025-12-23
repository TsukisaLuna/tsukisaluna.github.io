/*!
* Start Bootstrap - The Big Picture v5.0.6 (https://startbootstrap.com/template/the-big-picture)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-the-big-picture/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function acyncMovePage(url){
        // ajax option
        var ajaxOption = {
                url : url,
                async : true,
                type : "GET",
                dataType : "text",
                cache : false
        };
        
        $.ajax(ajaxOption).done(function(data){
            // Contents 영역 삭제
            $("#main").children().remove();
            // Contents 영역 교체
            $("#main").html(data);
        });
    }




    
// =========================================
// 캐릭터 데이터 및 인터랙션 스크립트
// =========================================

// 1. 캐릭터 데이터 정의 (나중에 내용을 채워주세요)
const charaData = {
    'tsukisa': {
        'name': 'Tsukisa Luna',
        'color': '#00bfff', // 테마 컬러
        'versions': {
            'default': {
                'title': '기본',
                'thumb': 'assets/thumb/tsu_default.jpg',
                'img': 'assets/sheets/tsu_default.jpg', // 실제 이미지 경로로 변경 필요
                'imgPlaceholder': 'Tsukisa 기본 설정화', // 임시 텍스트
                'desc': '<p>밝고 명량하고 활발한 늑대소년</p>'
            },
            'boxing': {
                'title': '격투가(킥복싱)',
                'thumb': 'assets/thumb/tsu_boxing.jpg',
                'img': 'assets/sheets/tsu_boxing1.jpg', // 실제 이미지 경로로 변경 필요
                'imgPlaceholder': 'Tsukisa 킥복싱 Ver.',
                'desc': '<p>폭력과 어울리지 않아 보이는 아이지만 격투기에도 도전!<br>경기 때마다 귀여운 얼굴이 매번 망가지지만 강한 의지로 매번 승리를 쟁취하고 있다.</p>'
            },
            'winter': {
                'title': '겨울',
                'thumb': 'assets/thumb/tsu_winter.jpg',
                'img': 'assets/sheets/tsu_winter.jpg', // 실제 이미지 경로로 변경 필요
                'imgPlaceholder': 'Tsukisa 겨울 코트 Ver.',
                'desc': '<p></p>'
            }
        }
    },
    'stella': { // Stella 데이터 예시
        'name': 'Stella Maris',
        'color': '#ff69b4',
        'versions': {
            'default': {
                'title': '기본',
                'thumb': 'assets/thumb/ste_default.jpg', // 실제 이미지 경로로 변경 필요
                'img': 'assets/sheets/ste_default.jpg', // 실제 이미지 경로로 변경 필요
                'imgPlaceholder': 'Stella 기본 설정화',
                'desc': '<p>사고뭉치 순수악의 롭이어소년<br></p>'
            }
        }
    }
};

// 현재 선택된 캐릭터 (기본값: tsukisa)
let activeCharacter = 'tsukisa';


// 2. 이벤트 리스너 설정 (문서가 로드된 후 실행)
$(document).ready(function() {

    $(document).on('click', '#versionList .list-group-item', function() {

        if($(this).hasClass('active')) return;
        $('#versionList .list-group-item').removeClass('active');
        $(this).addClass('active');

        const targetVersion = $(this).data('target');
        const data = charaData[activeCharacter].versions[targetVersion];

        const $displayArea = $('#charaDisplayArea');
        const $descArea = $('#charaDescArea');

        // 페이드 아웃 시작
        $displayArea.addClass('fading-out');
        $descArea.addClass('fading-out');

        // 0.3초 후(transition 시간과 동일) 내용 교체 및 페이드 인
        setTimeout(function() {
            // 이미지 영역 업데이트 (실제 이미지가 생기면 주석을 푸세요)
            $('#charaSheet').attr('src', data.img);
            $('.sheet-placeholder p').text(data.imgPlaceholder); // 임시 텍스트 교체

            // 설명 영역 업데이트
            $('#charaDescArea').html(data.desc);

            // 페이드 인 시작
            $displayArea.removeClass('fading-out');
            $descArea.removeClass('fading-out');
        }, 300);
    });


    // B. 하단 캐릭터 탭 클릭 이벤트 (Tsukisa <-> Stella)
    $(document).on('click', '.chara-selector', function(e) {
        e.preventDefault(); // a 태그 기본 이동 동작 막기
        const targetChara = $(this).data('chara');
        
        // 없는 캐릭터거나 현재 캐릭터랑 같으면 무시
        if(!targetChara || targetChara === activeCharacter) return;
        if(!charaData[targetChara]) {
             alert("아직 준비중인 캐릭터입니다!");
             return;
        }
        
        // 캐릭터 변경 시작!
        activeCharacter = targetChara;
        const newCharaData = charaData[activeCharacter];

        // 1) 탭 활성화 스타일 변경
        $('.chara-selector').removeClass('active').css('color', '#999');
        $(this).addClass('active').css('color', newCharaData.color);
        $('.chara-sidebar .list-group-item.active').css('border-left-color', newCharaData.color);


        // 2) 왼쪽 버전 리스트 새로 만들기
        let listHtml = '';
        let isFirst = true;
        for (const [key, value] of Object.entries(newCharaData.versions)) {
            listHtml += `<li class="list-group-item ${isFirst ? 'active' : ''}" data-target="${key}">${value.title}</li>`;
            isFirst = false;
        }
        $('#versionList').html(listHtml).css('opacity', 0).animate({opacity: 1}, 300);
        
        // 3) 첫 번째 버전으로 내용 초기화 (클릭 이벤트 트리거)
        $('#versionList .list-group-item').first().trigger('click');
        $('#charaNameTitle').text(newCharaData.name); // 오른쪽 상단 이름 변경
    });
});