import { recommendList } from "./recommend.js";
import { aKeyword as keyword } from './makingButton.js';

recommendArea();
searchArea();

function recommendArea() {

    // 새로고침 버튼
    const refresh = document.getElementById('refresh_button');
    refresh.onclick = function() { recommendList() };

    recommendList();
}

function searchArea() {

    // 검색 버튼
    const refresh = document.getElementById('search_button');
    refresh.onclick = function () {
        location.href = `B.html?list=${keyword_list}&recommend=`;
    };

    let keyword_list = keyword();
}
