let markers_p = [];
let markers = [];
let infos = [];
let id = '';
let address = '';

// 회사 위치
const company = { latitude: 37.50764693316519, longitude: 127.05776158879458 };
let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(company.latitude, company.longitude), // 지도의 중심좌표 (회사)
            level: 1
        };
    // 지도 생성
let map = new kakao.maps.Map(mapContainer, mapOption);

const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
const imageSize = new kakao.maps.Size(30, 45); 
const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
const company_position = new kakao.maps.LatLng(company.latitude, company.longitude);

let bounds = new kakao.maps.LatLngBounds();  

function mMap(listId, listAddress) {

    const cp_marker = new kakao.maps.Marker({
        title: '회사',
        position: company_position,
        image: markerImage
    });
    cp_marker.setMap(map);

    id = listId;
    address = listAddress;
    
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'https://fb808.github.io/LunchMap_web/data.json';
    $.getJSON(requestURL, setInfo);
}

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    markers_p.length = 0;
    for (var i = 0; i < info.length; i++){
        var obj = {
            title: info[i].name,
            address: info[i].address,
            position: new kakao.maps.LatLng(info[i].lon, info[i].lat),
            clickable: true,
            content: `<div class="customoverlay">
                        <a href="${info[i].link}" target="_blank">
                            <span class="title">${info[i].name}</span>
                        </a>
                    </div>`
        };
    
        markers_p.push(obj);
        
        let overlay = new kakao.maps.CustomOverlay({
            position: markers_p[i].position,
            content: markers_p[i].content
        });
        
        let make_markers = new kakao.maps.Marker(obj);
        markers.push(make_markers);
        infos.push(overlay);
    }

    for (let i = 0; i < markers_p.length; i++){
        if (markers_p[i].title == id && markers_p[i].address == address) {
            setMarker(i);
        } else {
            hideMarker(i);
        }
    }
}

function setMarker(i) {
    var moveLatLon = markers_p[i].position;
    markers[i].setMap(map);
    bounds = new kakao.maps.LatLngBounds(company_position, moveLatLon);
    map.setBounds(bounds);
    infos[i].setMap(map);
}

function hideMarker(i) {
    markers[i].setMap(null);
    infos[i].setMap(null);
}

export { mMap };