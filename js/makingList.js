export function makingList(root, item, lineroot) {
    const item_area = document.createElement('div');
    item_area.setAttribute('id', 'list_item_area');
    root.appendChild(item_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.setAttribute('class', 'item-title');
    title.innerHTML = `<b>${item.title}<b>`;
    item_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', 'text-warning item-rate');
    rate.innerHTML = `&#11088 ${item.rate.toFixed(1)}`;
    item_area.appendChild(rate);

    const shortcut = document.createElement('button');
        shortcut.setAttribute('id', 'shortcut_button');
        shortcut.setAttribute('class', 'btn btn-light');
        shortcut.innerHTML = `<img src=https://cdn0.iconfinder.com/data/icons/feather/96/591276-arrow-right-512.png>`;
        shortcut.onclick = function (e) {
            e.stopPropagation();
            let searchName = item.area + ' ' +item.title;
            console.log(searchName);
            let win = window.open(item.link);
            win.focus();
        }
    item_area.appendChild(shortcut);

    const address = document.createElement('div');
    address.setAttribute('id', `${item.title}_address`);
    address.setAttribute('class', 'text-secondary item-address');
    address.innerHTML = `${item.address}`;
    root.appendChild(address);

    const distance = document.createElement('span');
    distance.setAttribute('id', `${item.title}_distance`);
    distance.setAttribute('class', 'text-secondary item-distance');
    distance.innerHTML = `${item.distance}m`;
    root.appendChild(distance);

    const cateArea = document.createElement('span');
    cateArea.setAttribute('id', 'cate_area');
    root.appendChild(cateArea);

    const cate = document.createElement('span');
    cate.setAttribute('id', `${item.title}_cate`);
    cate.setAttribute('class', 'item-cate');
    cate.innerHTML = `${item.cate_4}`;
    cateArea.appendChild(cate);

    if (item.tag !== item.cate_4) {
        const tag = document.createElement('span');
        tag.setAttribute('id', `${item.title}_tag`);
        tag.innerHTML = `${item.tag}`;
        cateArea.appendChild(tag);
    }

    const line = document.createElement('hr');
    lineroot.appendChild(line);
}