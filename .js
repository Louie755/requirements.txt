const skaters = REPLACED_SKATERS;
const goalies = REPLACED_GOALIES;

let currentTab = 'skater';
let teamFilter = 'ALL';
let chartInstance = null;

// 🔥 핵심 함수
function getKeyFactors(p) {
    var factors = [];

    if (p.type === 'skater') {
        if ((p.g || 0) / (p.gp || 1) > 0.4) factors.push("High scoring rate");
        if ((p.ppg || 0) > 1.0) factors.push("Elite playmaking");
        if ((p.pm || 0) > 5) factors.push("Positive impact (+/-)");
        if (p.is_hot) factors.push("Hot streak 🔥");

        if (factors.length === 0) factors.push("Consistent performer");
    } else {
        if ((p.sv || 0) > 91) factors.push("Strong save percentage");
        if ((p.gaa || 5) < 2.5) factors.push("Low GAA");
        if ((p.w || 0) > 20) factors.push("Winning impact");
        if ((p.so || 0) > 3) factors.push("Shutout ability");
        if (p.is_hot) factors.push("Hot form 🔥");

        if (factors.length === 0) factors.push("Reliable goalie");
    }

    return factors.slice(0, 3);
}

function switchTab(t) {
    currentTab = t;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + t).classList.add('active');
    teamFilter = 'ALL';
    render();
}

function render() {
    const query = document.getElementById('s').value.toLowerCase();
    const grid = document.getElementById('main-grid');
    const data = currentTab === 'skater' ? skaters : goalies;

    let html = '';

    data.filter(p =>
        (teamFilter === 'ALL' || p.abbr === teamFilter) &&
        p.name.toLowerCase().includes(query)
    ).forEach(p => {

        const mValue = p.type === 'skater' ? p.goal_prob + '%' : p.sv + '%';

        html += '<div class="card" style="--t-color:' + p.color + '" onclick="openModal(\'' + p.id + '\', \'' + p.type + '\')">' +
            '<div class="card-header">' +
            '<img src="https://assets.nhle.com/mugs/nhl/latest/' + p.id + '.png" class="p-thumb">' +
            '<div><h3 style="margin:0;">' + p.name + '</h3><small>' + p.abbr + ' • ' + p.pos + '</small></div>' +
            '<div style="margin-left:auto;"><b>' + (p.type === 'skater' ? p.pts : p.w) + '</b></div>' +
            '</div>' +
            '<div class="predict-box"><b>' + mValue + '</b></div>' +
            '</div>';
    });

    grid.innerHTML = html;
}

function openModal(id, type) {

    var p = skaters[0]; // 아무거나 강제 테스트

    document.getElementById('modal').style.display = 'flex'; // 🔥 중요

    document.getElementById('mInfo').innerHTML =
        "<h1 style='color:red;'>보이면 구조 정상</h1>";
}
