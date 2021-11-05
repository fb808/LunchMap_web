import { recommendList } from "./recommendB.js";
import { mainList } from "./list.js";
import { bKeyword as keyword, popupWindow } from "./makingButton.js";
import { selects, hideSelect } from "./sortBox.js";

// 뒤로가기
const back = document.getElementById('back_button');
back.onclick = function () {
    location.href = 'index.html';
};

popupWindow();

keyword();

const refresh = document.getElementById('refresh_button');
refresh.onclick = function () { recommendList(0) };
recommendList();

mainList();

const selectBox = document.getElementById('select_box');
const body = document.getElementById('root');
selectBox.addEventListener('click', selects);
body.addEventListener('click', hideSelect);