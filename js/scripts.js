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
        'name': 'Tsukisa (月作)',
        'color': '#00bfff', // 테마 컬러
        'versions': {
            'base': {
                'title': '기본',
                // 'img': 'assets/img/tsukisa_base.png', // 실제 이미지 경로로 변경 필요
                'imgPlaceholder': 'Tsukisa 기본 설정화', // 임시 텍스트
                'desc': '<p>Tsukisa의 기본 모습입니다. 달에서 온 조용한 소년...</p>'
            },
            'boxing': {
                'title': '격투가(킥복싱)',
                'imgPlaceholder': 'Tsukisa 킥복싱 Ver.',
                'desc': '<p>빠른 스피드를 자랑하는 킥복싱 스타일입니다. 링 위에서는 눈빛이 변합니다.</p>'
            },
            'winter': {
                'title': '겨울',
                'imgPlaceholder': 'Tsukisa 겨울 코트 Ver.',
                'desc': '<p>따뜻한 코트를 입은 겨울 모습입니다. 추위를 많이 타는 편입니다.</p>'
            }
        }
    },
    'stella': { // Stella 데이터 예시
        'name': 'Stella (별)',
        'color': '#ff69b4',
        'versions': {
            'base': {
                'title': '기본',
                'imgPlaceholder': 'Stella 기본 설정화',
                'desc': '<p>Stella의 기본 모습입니다. 밝고 명랑한 성격의 소유자.</p>'
            }
            // 필요한 만큼 추가...
        }
    }
};

// 현재 선택된 캐릭터 (기본값: tsukisa)
let activeCharacter = 'tsukisa';


// 2. 이벤트 리스너 설정 (문서가 로드된 후 실행)
$(document).ready(function() {

    // [중요] 동적으로 불러온 요소에 대한 이벤트는 부모에게 위임해야 합니다.
    
    // A. 왼쪽 의상 리스트 클릭 이벤트
    $(document).on('click', '#versionList .list-group-item', function() {
        // 이미 활성화된 탭이면 아무것도 안 함
        if($(this).hasClass('active')) return;

        // 1) 버튼 스타일 활성화 상태 변경
        $('#versionList .list-group-item').removeClass('active');
        $(this).addClass('active');

        // 2) 선택한 데이터 가져오기
        const targetVersion = $(this).data('target');
        const data = charaData[activeCharacter].versions[targetVersion];

        // 3) 이미지와 텍스트를 부드럽게 페이드아웃 -> 내용 변경 -> 페이드인
        const $displayArea = $('#charaDisplayArea');
        const $descArea = $('#charaDescArea');

        // 페이드 아웃 시작
        $displayArea.addClass('fading-out');
        $descArea.addClass('fading-out');

        // 0.3초 후(transition 시간과 동일) 내용 교체 및 페이드 인
        setTimeout(function() {
            // 이미지 영역 업데이트 (실제 이미지가 생기면 주석을 푸세요)
            // $('#charaImage').attr('src', data.img);
            $('.sheet-placeholder p').text(data.imgPlaceholder); // 임시 텍스트 교체

            // 설명 영역 업데이트
            $('#charaDescText').html(data.desc);

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