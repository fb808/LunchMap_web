import { makingList } from './makingList.js'

export function recommendList() {
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'https://fb808.github.io/LunchMap_web/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];
let randomNum = [];

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

    randomNum.length = 0;

    for (let i = 0; i < 4; i++){
        const max = Math.floor(list.length);
        const min = Math.ceil(0);
        let randomIndex = Math.floor(Math.random() * (max - min)) + min;
        if (randomNum.indexOf(randomIndex) == -1) {
            randomNum.push(randomIndex);
        } else {
            i--;
        }
    }

    recommend();
}

let indexList = [];

function recommend() {
    const root = document.getElementById('list');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    for (let i = 0; i < randomNum.length; i++){
        let index = randomNum[i];
        indexList.push(index)
        createListItem(root, list[index], index);
    }
}

function createListItem(root, item, index) {
    const listItem = document.createElement('div');
    listItem.setAttribute('id', 'list_item');
    listItem.setAttribute('class', 'recommend');
    listItem.onclick = function () { location.href = `B.html?list=''&recommend=${index}` };
    root.appendChild(listItem);

    const listArea = document.createElement('div');
    listArea.setAttribute('id', 'list_area');
    listArea.setAttribute('class', 'recommend');
    listItem.appendChild(listArea);

    makingList(listArea, item, root);
}
