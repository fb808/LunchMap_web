import { get_query } from './getQuery.js';
import { makingList } from './makingList.js';
import { mMap } from './map.js';

let keyword = [];
let root = document.getElementsByClassName('list')[0];
const select = document.querySelector(`#select_box`);
const option = select.querySelector('ul');
const opts = option.querySelectorAll('li');
opts[0].addEventListener('click', function () { sortList(0) });
opts[1].addEventListener('click', function () { sortList(1) });

function mainList() {
    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    const keyword_list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', 
        '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아음식', '기타'];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            keyword.push(urlkw[i]);
        }
    }
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];
let list_match = [];

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    list.length = 0;
    for (let i = 0; i < info.length; i++){
        let obj = {
            title: info[i].name,
            cate_4: info[i].cate_4,
            area: info[i].area,
            address: info[i].address,
            lating: new kakao.maps.LatLng(info[i].lon, info[i].lat),
            rate: info[i].rate,
            distance: info[i].distance,
            tag: info[i].tag,
            link: info[i].link
        };
    
        list.push(obj);
    }
    
    sortList();
}

function sortList(index) {
    let ele = opts[index];
    let text = '';
    if(ele != null){
        text = ele.innerText;
    }
    if (text == '별점') {
        list = list.sort(function (a, b) {
            return b.rate - a.rate;
        });
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        listMatch();
    } else {
        list = list.sort(function (a, b) {
            return a.distance - b.distance;
        });
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        listMatch();
    }
}

function listMatch() {
    if (keyword.length == 0) {
        createListItem(list);
    } else {
        list_match.length = 0;
        for (let i = 0; i < list.length; i++){
            for (let j = 0; j < keyword.length; j++){
                if (keyword[j] == list[i].cate_4) {
                    list_match.push(list[i]);
                    break;
                }
            }
        }
        createListItem(list_match);
    }
}

function createListItem(item) {
    for (let i = 0; i < item.length; i++){
        const listItem = document.createElement('div');
        listItem.setAttribute('id', 'list_item');
        listItem.onclick = function () { mMap(item[i].title, item[i].address) };
        root.appendChild(listItem);
        
        const listArea = document.createElement('div');
        listArea.setAttribute('id', `${item[i].title}`);
        listItem.appendChild(listArea);

        makingList(listArea, item[i], root);
        
    }
}

export { mainList };