$(document).ready(function () {
  let setting = {
    url: "https://restcountries.eu/rest/v2/all",
    method: "GET",
  };

  $.ajax(setting).done(function (res) {
    res.forEach((data) => {
      $(".select-country").append(`
                        <option class="country-item" value="${data.alpha3Code}">${data.name}
                        </option>
                `);
    });
    $(".country").change(function (e) {
      $.ajax({
        url: `https://restcountries.eu/rest/v2/alpha/${$(this).val()}`,
        method: "GET",
      }).done(function (response) {
        $("#info").html(`
                <div class="pl-3 country-info">
                    <h2>Name: ${response.name}</h2>
                    <p>Native Name: ${response.nativeName}</p>
                    <p>Capital: ${response.capital}</p>
                    <p>Region: ${response.region}</p>
                    <p>Population: ${response.population}</p>
                    <p>Language: ${response.languages[0].name}</p>
                    <p>Timezone: ${response.timezones}</p>
                </div>
                
                `);

        $("#call-code").html(`
                    <div class="per-center">
                        <h5>Country Code :   </h5>
                        <h1>${response.callingCodes}</h1>
                    </div>
                `);

        $("#flag").html(`
                    <div>
                        <img src="${response.flag}" style="width:285px;height:327px"/>
                    </div>
                `);

        $("#weather-report").html(`
                    <span>${response.capital} Weather Report</span>
                `);

        $.ajax({
          url: `http://api.openweathermap.org/data/2.5/weather?q=${response.capital}&appid=44b1fe8a6c0207544cdd674445971577`,
          method: "GET",
        }).done(function (response) {
          map(response.coord.lat, response.coord.lon);
          console.log(response);
          $("#weather").html(`
                    <img src="http://openweathermap.org/img/wn/${
                      response.weather[0].icon
                    }@2x.png">
                      <p>wind speed:${response.wind.speed}</p>
                      <p>temperature: ${Math.round(
                        response.main.temp - 273.15
                      )}°C</p>
                      <p>humadity: ${response.main.humidity}%</p>
                      <p>visibility: ${response.visibility}</p>
                    `);
        });

        $(".weather").css("background-color", "aliceblue");
        $(".weamap").css(
          "box-shadow",
          "10px 10px 23px -7px rgba(0, 0, 0, 0.41)"
        );
        $("#weather-report").css("border-bottom", "2px dashed black");
      });

      document.querySelector(".datalist").classList.remove("active");
      document.querySelector(".datalist-input").value = this.value;
    });
  });
});

function map(lat, lon) {
  document.getElementById("app").innerHTML = "";

  var app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: lat,
        lng: lon,
      },
      zoom: 6,
    },
    apiKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY1ZDM0NjJlOGRkOWI2NzBlMmZhZWIyYzMzM2FlMWRmMmIwNzg5YWU2MzE0MmNhMDY1ZTAxNmFmNWVjOTkzNmNmNmYzOTE1Mjk0NjEzMGE5In0.eyJhdWQiOiIxNDIxOCIsImp0aSI6IjY1ZDM0NjJlOGRkOWI2NzBlMmZhZWIyYzMzM2FlMWRmMmIwNzg5YWU2MzE0MmNhMDY1ZTAxNmFmNWVjOTkzNmNmNmYzOTE1Mjk0NjEzMGE5IiwiaWF0IjoxNjIyNjM2MTU0LCJuYmYiOjE2MjI2MzYxNTQsImV4cCI6MTYyNTIyODE1NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.h-swhQlaebNTQk3ASbBqdCsZGtGdEGheOobTk09oZArbViJYUxLi9zc_zLp_tPFaOo6Ys1JuHLMhdbTKSwSZsFVi-PYId6tRBIhSXZr4CRoBAml_wHvTzytNLyGo6E4GJqr69XAb7JaZPpaX2j-gNGxe8jxy-HhLT9aqP57I-WHS9-mpQirLUV2NeGCbSdTbUV5iiJCx6G71BECFF0uGTP2PNEq75YZB4sWF6Pw0BoLZvzPSdnIaAwPXPWpEFCE-HD_sO3EWwrX-V2WVS0-xkxcdX3OY0ukulzGuMEIT_xSKeWOEk7UH6eZoUojjodgbi_PllT_L7gRJNVbYlBnSgQ",
  });

  app.addLayers();
}
