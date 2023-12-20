const priceFix = 250;

function price(){
  document.getElementById('cost').innerText = priceFix+"р.";
}

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('element-show');
    }
  });
}

let options = {
  threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');


for (let elm of elements) {
  observer.observe(elm);
}

function init() {
  let map = new ymaps.Map('map', {
    center: [54.99161474025256,73.3682940573892],
    zoom: 13,
    controls: ['routePanelControl']
  });

  let control = map.controls.get('routePanelControl');

  let multiRoutePromise = control.routePanel.getRouteAsync();

  multiRoutePromise.then(function(multiRoute) {
    // Подписка на событие обновления мультимаршрута.
    multiRoute.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        var activeRoute = multiRoute.getActiveRoute();
        // Когда панель добавляется на карту, она
        // создает маршрут с изначально пустой геометрией. 
        // Только когда пользователь выберет начальную и конечную точки,
        // маршрут будет перестроен с непустой геометрией.
        // Поэтому для избежания ошибки нужно добавить проверку,
        // что маршрут не пустой.
        if (activeRoute) {
            console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
            console.log(activeRoute.properties.get("distance").text);

            let dist = activeRoute.properties.get("distance").text;

            dist = dist.split(/\s+/).join('');
            dist = parseFloat(dist.replace(/,/, '.')); 
          
            document.getElementById('lengthRoute').innerText = dist+" км";

            let cost = dist * priceFix;
            document.getElementById('price').innerText = cost+"р.";
        }
    });
}, function (err) {
  console.log(err); 
});  
}

ymaps.ready(init);