import { mMap } from './map.js'
import { get_query } from './getQuery.js';
import { makingList } from './makingList.js';

let index = [];
let keyword = [];
let refresh_set = 1;

function recommendList(set) {
    index.length = 0;
    keyword.length = 0;
    if (set >= 0) {
        refresh_set = set;
    }

    // 키워드
    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    const keyword_list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', 
        '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아음식', '기타'];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            keyword.push(urlkw[i]);
        }
    }
    
    const urlrc = url_keyword['recommend'].split(',');
    if (urlrc != '') {
        index.push(urlrc);
    }
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    list.length = 0;
    for (var i = 0; i < info.length; i++){
        if (info[i].rate >= 3.7 & info[i].distance <= 500) {
            var obj = {
                title: info[i].name,
                cate_4: info[i].cate_4,
                area: info[i].area,
                address: info[i].address,
                rate: info[i].rate,
                distance: info[i].distance,
                tag: info[i].tag,
                link: info[i].link
            };
        
            list.push(obj);
        }
    }
    recommend();
}

let list_match = [];

function recommend() {
    const max = Math.floor(list.length-1);
    const min = Math.ceil(0);
    const root = document.getElementsByClassName('recommend')[0];
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    if (keyword.length > 0) {
        recommendKeyword();
        if (keyword.length == 0) {
            createMessage(root);
            console.log('dss');
        } else {
            let remax = Math.floor(list_match.length - 1);
            let randomIndex = Math.floor(Math.random() * (remax - min)) + min;
            createListItem(root, list_match[randomIndex]);
        }
    } else if (index.length != 0 && refresh_set != 0) {
        createListItem(root, list[index[0]]);
    } else {
        let randomIndex = Math.floor(Math.random() * (max - min)) + min;
        createListItem(root, list[randomIndex]);
    }
}

function recommendKeyword() {
    list_match.length = 0;
    for (let i = 0; i < list.length; i++){
        for (let j = 0; j < keyword.length; j++){
            if (keyword[j] == list[i].cate_4) {
                list_match.push(list[i]);
                break;
            }
        }
    }
    if (list_match.length == 0) {
        keyword.length = 0;
    }
}

function createListItem(root, item) {
    const listItem = document.createElement('div');
    listItem.setAttribute('id', `list_item`);
    listItem.onclick = function () { mMap(item.title, item.address); };
    root.appendChild(listItem);

    const listArea = document.createElement('div');
    listArea.setAttribute('id', `${item.title}`);
    listItem.appendChild(listArea);
    
    makingList(listItem, item, root);
    
    mMap(item.title, item.address);
}

function createMessage(root) {
    
    document.getElementById('list_list').setAttribute('class', 'no_recommend');

    const listItem = document.createElement('div');
    listItem.setAttribute('id', `no_recommend_message`);
    listItem.innerHTML = '추천이 없습니다.';
    root.appendChild(listItem);
}

export { recommendList };