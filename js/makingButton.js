import { get_query } from "./getQuery.js";

const keyword_list = ['한식', '국/탕', '국수', '육류/고기', '곱창/막창/순대', '치킨',
    '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아음식', '기타'];

const modal = document.getElementsByClassName('modal')[0];
    
function aKeyword() {
    let list = [];
    const root = document.getElementById('keyword');

    for (let i = 0; i < keyword_list.length; i++){
        const tagButton = document.createElement('button');
        tagButton.setAttribute('type', 'button');
        tagButton.setAttribute('class', 'btn btn-outline-success tag-button');
        tagButton.setAttribute('id', keyword_list[i]);
        tagButton.onclick = function () {
            let index = list.indexOf(this.id);
            if (index < 0) {
                list.push(this.id)
                document.getElementById(keyword_list[i]).classList.replace('tag-button', 'tag-button-on');
                console.log(list);
                return false;
            } else {
                list.splice(index, 1);
                document.getElementById(keyword_list[i]).classList.replace('tag-button-on', 'tag-button');
            }
            console.log(list);
        };
        tagButton.innerHTML = keyword_list[i];
        root.appendChild(tagButton);
    }

    return list;
}

function bKeyword() {

    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    let keyword = [];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            keyword.push(urlkw[i]);
        }
    }

    const root = document.getElementById('keyword_word_area');

    if (keyword.length === 0) {
        root.setAttribute('id', 'no_keyword_area');

        const noKeyword = document.createElement('span');
        noKeyword.setAttribute('id', 'no_keyword');
        noKeyword.innerHTML = '키워드가 없습니다. ';
        root.appendChild(noKeyword);

        const list = document.getElementById('list_list');
        list.setAttribute('class', 'no_keyword');

    } else {
        for (let i = 0; i < keyword.length; i++){
            const keywordButton = document.createElement('span');
            keywordButton.setAttribute('id', `${keyword[i]}_area`);
            keywordButton.setAttribute('class', 'keyword_span')
            root.appendChild(keywordButton);

            const keywordText = document.createElement('span');
            keywordText.setAttribute('id', `${keyword[i]}_text`);
            keywordButton.setAttribute('class', 'btn btn-outline-dark');
            keywordText.innerHTML = keyword[i];
            keywordButton.appendChild(keywordText);

            const kindText = document.createElement('span');
            kindText.setAttribute('id', `kind`);
            kindText.innerHTML = '&nbsp&nbsp';
            keywordButton.appendChild(kindText);
            
            const keywordDelete = document.createElement('button');
            keywordDelete.setAttribute('id', keyword[i]);
            keywordDelete.setAttribute('class', 'keyword-button');
            keywordDelete.onclick = function () {
                let index = keyword.indexOf(this.id);
                keyword.splice(index, 1);
                document.getElementById(`${this.id}_area`).remove();
                const stateObj = keyword;
                history.replaceState(stateObj, '', `B.html?list=${stateObj}&recommend=`);
                location.reload();
            };
            keywordDelete.innerHTML = '&#10005';
            keywordButton.appendChild(keywordDelete);

        }
    }

    const plusButton = document.createElement('span');
    plusButton.setAttribute('id', 'plus_button');
    plusButton.setAttribute('class', 'btn btn-outline-success');
    plusButton.setAttribute('data-bs-toggle', 'modal');
    plusButton.setAttribute('data-bs-target', '#plusModal');
    plusButton.innerHTML = '추가';
    root.appendChild(plusButton);

}

function popupWindow() {

    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    let kw = [];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            kw.push(urlkw[i]);
        }
    }

    const root = document.getElementsByClassName('modal-body')[0];

    const line = document.createElement('hr');
    line.setAttribute('class', 'text-dark');
    line.setAttribute('id', 'hr');
    root.appendChild(line);

    const bodyDiv = document.createElement('div');
    bodyDiv.setAttribute('id', 'button_area');
    root.appendChild(bodyDiv);

    let list = kw;
    let count = 0;

    for (let i = 0; i < keyword_list.length; i++){
        if (!kw.includes(keyword_list[i])) {
            count++;
            const keywordButton = document.createElement('button');
            keywordButton.setAttribute('class', 'btn btn-outline-success tag-button');
            keywordButton.setAttribute('id', keyword_list[i]);
            keywordButton.onclick = function () {
                let index = list.indexOf(this.id);
                if (index < 0) {
                    list.push(this.id);
                    document.getElementById(keyword_list[i]).classList.replace('tag-button', 'tag-button-on');
                    console.log(list);
                    return false;
                } else {
                    list.splice(index, 1);
                    document.getElementById(keyword_list[i]).classList.replace('tag-button-on', 'tag-button');
                }
                console.log(list);
            };
            keywordButton.innerHTML = keyword_list[i];
            bodyDiv.appendChild(keywordButton);
        }
    }

    if (count == 0) {
        const noKeyword = document.createElement('span');
        noKeyword.setAttribute('id', 'no_keyword_message');
        noKeyword.innerHTML = '추가 가능한 키워드가 없습니다. ';
        bodyDiv.appendChild(noKeyword);
    }

    const close = document.getElementsByClassName('btn-close')[0];
    close.addEventListener('click', function () {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        popupWindow();
    });

    const backdrop = document.getElementById('plusModal');
    backdrop.addEventListener('click', function () {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        popupWindow();
    });

    const content = document.getElementsByClassName('modal-content')[0];
    content.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    const ok = document.getElementById('ok_button');
    ok.onclick = function () {
        history.replaceState(list, '', `B.html?list=${list}&recommend=`);
        location.reload();
    };
}

export { aKeyword, bKeyword, popupWindow };