const dashboard = document.getElementById('dashboard');
const timeframeBtns = document.querySelectorAll('.time-list button');

const previousLabels = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month'
}

let allData = [];
let selectedTimeFrame = 'weekly';

async function fetchData() {
    const response = await fetch('data.json');
    allData = await response.json();

    displayCards(allData, selectedTimeFrame);
}
fetchData();

function displayCards(data, timeframe) {
    document.querySelectorAll('.card').forEach(card => card.remove());

    data.forEach((activity) => {
        const current = activity.timeframes[timeframe].current;
        const previous = activity.timeframes[timeframe].previous;
        const label = previousLabels[timeframe];

        const card = document.createElement('div');
        const cssClass = activity.title.toLowerCase().replaceAll(' ', '-');
        card.classList.add('card', `${cssClass}-card`);

        card.innerHTML = `
            <div class="card-top"></div>
            <div class="card-bottom">
                <div class="card-header">
                    <p class="title">${activity.title}</p>
                    <img class="menu-btn" src="images/icon-ellipsis.svg" alt="">
                </div>
                <div class="time">
                    <p class="current-hours">${current}hrs</p>
                    <p class="previous-hours">${label} - ${previous}hrs</p>
                </div>
            </div>
        `;

        dashboard.appendChild(card);
    });
}

timeframeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        selectedTimeFrame = btn.id;

        timeframeBtns.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        displayCards(allData, selectedTimeFrame);
    });
});