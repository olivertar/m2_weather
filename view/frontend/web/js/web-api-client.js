define([
    'jquery',
    'mage/template',
    'text!./templates/result.html',
    'jquery/ui'
], function ($, mageTemplate, resultTmpl){
    "use strict";

    $.widget('mage.weatherApi', {
        options: {
            resultContainer: "[data-role='result']",
            messagesSelector: '[data-placeholder="messages"]',
            url: '',
            template: resultTmpl
        },

        _create: function () {
            this._search();
        },

        /**
         * Method triggers an AJAX request to make API query
         * @private
         */
        _search: function () {

            var self = this;

            $('body').find(self.options.messagesSelector).empty();
            this.element.find(this.options.resultContainer).empty();

            /*
            This request does not require authentication
            */
            console.log('222222222222222222222a');
            console.log(self.options.url);

            /*let data = '{"cod":"200","message":0,"cnt":40,"list":[{"dt":1595473200,"main":{"temp":15.62,"feels_like":13.31,"temp_min":15.62,"temp_max":16.28,"pressure":1019,"sea_level":1019,"grnd_level":1016,"humidity":60,"temp_kf":-0.66},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"clouds":{"all":23},"wind":{"speed":2.6,"deg":239},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-23 03:00:00"},{"dt":1595484000,"main":{"temp":15.9,"feels_like":13.69,"temp_min":15.9,"temp_max":16.15,"pressure":1018,"sea_level":1018,"grnd_level":1015,"humidity":65,"temp_kf":-0.25},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":36},"wind":{"speed":2.97,"deg":234},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-23 06:00:00"},{"dt":1595494800,"main":{"temp":18.99,"feels_like":16.65,"temp_min":18.99,"temp_max":19.26,"pressure":1017,"sea_level":1017,"grnd_level":1015,"humidity":58,"temp_kf":-0.27},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":95},"wind":{"speed":3.62,"deg":237},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-23 09:00:00"},{"dt":1595505600,"main":{"temp":21.81,"feels_like":18.48,"temp_min":21.81,"temp_max":21.86,"pressure":1016,"sea_level":1016,"grnd_level":1014,"humidity":38,"temp_kf":-0.05},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":100},"wind":{"speed":3.71,"deg":240},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-23 12:00:00"},{"dt":1595516400,"main":{"temp":24.24,"feels_like":19.33,"temp_min":24.24,"temp_max":24.24,"pressure":1015,"sea_level":1015,"grnd_level":1012,"humidity":30,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":81},"wind":{"speed":5.57,"deg":232},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-23 15:00:00"},{"dt":1595527200,"main":{"temp":20.85,"feels_like":17.06,"temp_min":20.85,"temp_max":20.85,"pressure":1014,"sea_level":1014,"grnd_level":1011,"humidity":47,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":91},"wind":{"speed":5.14,"deg":241},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-23 18:00:00"},{"dt":1595538000,"main":{"temp":17.64,"feels_like":15.37,"temp_min":17.64,"temp_max":17.64,"pressure":1014,"sea_level":1014,"grnd_level":1011,"humidity":71,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":4.26,"deg":251},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-23 21:00:00"},{"dt":1595548800,"main":{"temp":16.91,"feels_like":15.21,"temp_min":16.91,"temp_max":16.91,"pressure":1013,"sea_level":1013,"grnd_level":1010,"humidity":80,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":96},"wind":{"speed":3.96,"deg":254},"visibility":10000,"pop":0,"rain":{"3h":0.19},"sys":{"pod":"n"},"dt_txt":"2020-07-24 00:00:00"},{"dt":1595559600,"main":{"temp":16.69,"feels_like":15.59,"temp_min":16.69,"temp_max":16.69,"pressure":1012,"sea_level":1012,"grnd_level":1010,"humidity":83,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":87},"wind":{"speed":3.28,"deg":273},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-24 03:00:00"},{"dt":1595570400,"main":{"temp":16.51,"feels_like":15.84,"temp_min":16.51,"temp_max":16.51,"pressure":1012,"sea_level":1012,"grnd_level":1010,"humidity":82,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":74},"wind":{"speed":2.49,"deg":267},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-24 06:00:00"},{"dt":1595581200,"main":{"temp":20.53,"feels_like":19.06,"temp_min":20.53,"temp_max":20.53,"pressure":1013,"sea_level":1013,"grnd_level":1010,"humidity":61,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":38},"wind":{"speed":3.32,"deg":267},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-24 09:00:00"},{"dt":1595592000,"main":{"temp":21.85,"feels_like":20.31,"temp_min":21.85,"temp_max":21.85,"pressure":1013,"sea_level":1013,"grnd_level":1010,"humidity":55,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":61},"wind":{"speed":3.26,"deg":265},"visibility":10000,"pop":0,"rain":{"3h":0.16},"sys":{"pod":"d"},"dt_txt":"2020-07-24 12:00:00"},{"dt":1595602800,"main":{"temp":24.21,"feels_like":22.65,"temp_min":24.21,"temp_max":24.21,"pressure":1012,"sea_level":1012,"grnd_level":1009,"humidity":47,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":82},"wind":{"speed":3.19,"deg":274},"visibility":10000,"pop":0.41,"sys":{"pod":"d"},"dt_txt":"2020-07-24 15:00:00"},{"dt":1595613600,"main":{"temp":21.87,"feels_like":20.91,"temp_min":21.87,"temp_max":21.87,"pressure":1012,"sea_level":1012,"grnd_level":1009,"humidity":62,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":88},"wind":{"speed":3.3,"deg":253},"visibility":10000,"pop":0.61,"rain":{"3h":1.04},"sys":{"pod":"d"},"dt_txt":"2020-07-24 18:00:00"},{"dt":1595624400,"main":{"temp":20.4,"feels_like":19.63,"temp_min":20.4,"temp_max":20.4,"pressure":1012,"sea_level":1012,"grnd_level":1009,"humidity":69,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":99},"wind":{"speed":3.16,"deg":252},"visibility":10000,"pop":0.38,"rain":{"3h":0.34},"sys":{"pod":"n"},"dt_txt":"2020-07-24 21:00:00"},{"dt":1595635200,"main":{"temp":18.55,"feels_like":17.04,"temp_min":18.55,"temp_max":18.55,"pressure":1011,"sea_level":1011,"grnd_level":1008,"humidity":72,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":100},"wind":{"speed":3.68,"deg":252},"visibility":10000,"pop":0.12,"sys":{"pod":"n"},"dt_txt":"2020-07-25 00:00:00"},{"dt":1595646000,"main":{"temp":17.45,"feels_like":16.13,"temp_min":17.45,"temp_max":17.45,"pressure":1010,"sea_level":1010,"grnd_level":1008,"humidity":76,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"clouds":{"all":97},"wind":{"speed":3.3,"deg":233},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-25 03:00:00"},{"dt":1595656800,"main":{"temp":17.57,"feels_like":15.95,"temp_min":17.57,"temp_max":17.57,"pressure":1010,"sea_level":1010,"grnd_level":1007,"humidity":80,"temp_kf":0},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":{"all":88},"wind":{"speed":4.16,"deg":222},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-25 06:00:00"},{"dt":1595667600,"main":{"temp":18.84,"feels_like":17.99,"temp_min":18.84,"temp_max":18.84,"pressure":1010,"sea_level":1010,"grnd_level":1007,"humidity":81,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":3.78,"deg":213},"visibility":10000,"pop":0.02,"rain":{"3h":0.13},"sys":{"pod":"d"},"dt_txt":"2020-07-25 09:00:00"},{"dt":1595678400,"main":{"temp":21.66,"feels_like":18.38,"temp_min":21.66,"temp_max":21.66,"pressure":1010,"sea_level":1010,"grnd_level":1007,"humidity":59,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":6.16,"deg":208},"visibility":10000,"pop":0.15,"rain":{"3h":0.13},"sys":{"pod":"d"},"dt_txt":"2020-07-25 12:00:00"},{"dt":1595689200,"main":{"temp":21.27,"feels_like":17.79,"temp_min":21.27,"temp_max":21.27,"pressure":1008,"sea_level":1008,"grnd_level":1005,"humidity":66,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":7.1,"deg":217},"visibility":10000,"pop":0.49,"rain":{"3h":0.3},"sys":{"pod":"d"},"dt_txt":"2020-07-25 15:00:00"},{"dt":1595700000,"main":{"temp":19.73,"feels_like":16.9,"temp_min":19.73,"temp_max":19.73,"pressure":1007,"sea_level":1007,"grnd_level":1004,"humidity":72,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":100},"wind":{"speed":6.11,"deg":219},"visibility":10000,"pop":0.9,"rain":{"3h":0.81},"sys":{"pod":"d"},"dt_txt":"2020-07-25 18:00:00"},{"dt":1595710800,"main":{"temp":18.63,"feels_like":16.05,"temp_min":18.63,"temp_max":18.63,"pressure":1006,"sea_level":1006,"grnd_level":1004,"humidity":77,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":100},"wind":{"speed":5.75,"deg":219},"visibility":10000,"pop":0.88,"rain":{"3h":1.06},"sys":{"pod":"n"},"dt_txt":"2020-07-25 21:00:00"},{"dt":1595721600,"main":{"temp":16.69,"feels_like":14.28,"temp_min":16.69,"temp_max":16.69,"pressure":1006,"sea_level":1006,"grnd_level":1003,"humidity":77,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":78},"wind":{"speed":4.61,"deg":249},"visibility":10000,"pop":0.76,"sys":{"pod":"n"},"dt_txt":"2020-07-26 00:00:00"},{"dt":1595732400,"main":{"temp":15.57,"feels_like":13.62,"temp_min":15.57,"temp_max":15.57,"pressure":1006,"sea_level":1006,"grnd_level":1003,"humidity":79,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":8},"wind":{"speed":3.65,"deg":238},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-26 03:00:00"},{"dt":1595743200,"main":{"temp":15.38,"feels_like":12.29,"temp_min":15.38,"temp_max":15.38,"pressure":1007,"sea_level":1007,"grnd_level":1005,"humidity":75,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":12},"wind":{"speed":4.86,"deg":241},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-26 06:00:00"},{"dt":1595754000,"main":{"temp":19.28,"feels_like":15.42,"temp_min":19.28,"temp_max":19.28,"pressure":1009,"sea_level":1009,"grnd_level":1007,"humidity":56,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":3},"wind":{"speed":5.69,"deg":254},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-26 09:00:00"},{"dt":1595764800,"main":{"temp":22.43,"feels_like":18.67,"temp_min":22.43,"temp_max":22.43,"pressure":1010,"sea_level":1010,"grnd_level":1008,"humidity":44,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":13},"wind":{"speed":5.27,"deg":257},"visibility":10000,"pop":0,"sys":{"pod":"d"},"dt_txt":"2020-07-26 12:00:00"},{"dt":1595775600,"main":{"temp":23.99,"feels_like":20.16,"temp_min":23.99,"temp_max":23.99,"pressure":1011,"sea_level":1011,"grnd_level":1008,"humidity":38,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":{"all":43},"wind":{"speed":5.09,"deg":253},"visibility":10000,"pop":0.18,"sys":{"pod":"d"},"dt_txt":"2020-07-26 15:00:00"},{"dt":1595786400,"main":{"temp":20.52,"feels_like":16.99,"temp_min":20.52,"temp_max":20.52,"pressure":1012,"sea_level":1012,"grnd_level":1009,"humidity":56,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":55},"wind":{"speed":5.68,"deg":248},"visibility":10000,"pop":0.47,"rain":{"3h":0.54},"sys":{"pod":"d"},"dt_txt":"2020-07-26 18:00:00"},{"dt":1595797200,"main":{"temp":18.47,"feels_like":15.95,"temp_min":18.47,"temp_max":18.47,"pressure":1013,"sea_level":1013,"grnd_level":1010,"humidity":67,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":25},"wind":{"speed":4.58,"deg":241},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-26 21:00:00"},{"dt":1595808000,"main":{"temp":16.51,"feels_like":14.58,"temp_min":16.51,"temp_max":16.51,"pressure":1013,"sea_level":1013,"grnd_level":1010,"humidity":77,"temp_kf":0},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":45},"wind":{"speed":3.84,"deg":233},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-27 00:00:00"},{"dt":1595818800,"main":{"temp":15.64,"feels_like":13.75,"temp_min":15.64,"temp_max":15.64,"pressure":1013,"sea_level":1013,"grnd_level":1010,"humidity":74,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":74},"wind":{"speed":3.17,"deg":250},"visibility":10000,"pop":0.15,"sys":{"pod":"n"},"dt_txt":"2020-07-27 03:00:00"},{"dt":1595829600,"main":{"temp":16.05,"feels_like":13.81,"temp_min":16.05,"temp_max":16.05,"pressure":1013,"sea_level":1013,"grnd_level":1011,"humidity":67,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":66},"wind":{"speed":3.23,"deg":237},"visibility":10000,"pop":0.1,"sys":{"pod":"d"},"dt_txt":"2020-07-27 06:00:00"},{"dt":1595840400,"main":{"temp":19.27,"feels_like":16.47,"temp_min":19.27,"temp_max":19.27,"pressure":1014,"sea_level":1014,"grnd_level":1012,"humidity":53,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":54},"wind":{"speed":3.86,"deg":255},"visibility":10000,"pop":0.16,"sys":{"pod":"d"},"dt_txt":"2020-07-27 09:00:00"},{"dt":1595851200,"main":{"temp":22.33,"feels_like":18.26,"temp_min":22.33,"temp_max":22.33,"pressure":1015,"sea_level":1015,"grnd_level":1012,"humidity":42,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":35},"wind":{"speed":5.42,"deg":255},"visibility":10000,"pop":0.38,"rain":{"3h":0.11},"sys":{"pod":"d"},"dt_txt":"2020-07-27 12:00:00"},{"dt":1595862000,"main":{"temp":22.46,"feels_like":17.83,"temp_min":22.46,"temp_max":22.46,"pressure":1015,"sea_level":1015,"grnd_level":1013,"humidity":37,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":5.63,"deg":263},"visibility":10000,"pop":0.4,"rain":{"3h":0.13},"sys":{"pod":"d"},"dt_txt":"2020-07-27 15:00:00"},{"dt":1595872800,"main":{"temp":20.47,"feels_like":16.31,"temp_min":20.47,"temp_max":20.47,"pressure":1016,"sea_level":1016,"grnd_level":1013,"humidity":42,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":{"all":79},"wind":{"speed":4.98,"deg":273},"visibility":10000,"pop":0.06,"sys":{"pod":"d"},"dt_txt":"2020-07-27 18:00:00"},{"dt":1595883600,"main":{"temp":18.32,"feels_like":15.15,"temp_min":18.32,"temp_max":18.32,"pressure":1017,"sea_level":1017,"grnd_level":1014,"humidity":50,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":51},"wind":{"speed":3.76,"deg":254},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-27 21:00:00"},{"dt":1595894400,"main":{"temp":17.11,"feels_like":14.35,"temp_min":17.11,"temp_max":17.11,"pressure":1017,"sea_level":1017,"grnd_level":1014,"humidity":66,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":75},"wind":{"speed":4.29,"deg":231},"visibility":10000,"pop":0,"sys":{"pod":"n"},"dt_txt":"2020-07-28 00:00:00"}],"city":{"id":2643743,"name":"London","coord":{"lat":51.5085,"lon":-0.1257},"country":"GB","population":1000000,"timezone":3600,"sunrise":1595477494,"sunset":1595534525}}';

            data = JSON.parse(data);
            console.log(data['list']);
            self._drawResultTable(data);*/

            $.ajax({
                url: self.options.url,
                dataType: 'json',
                context: $('body'),
                showLoader: true
            }).done(function (data) {
                var json = JSON.parse(data);
                if(json.message != 0){
                    var msg = $("<div/>").addClass("message notice").text(json.message);//response.responseJSON.message
                    this.find(self.options.messagesSelector).prepend(msg);
                    showLoader: true
                }else{
                    self._drawResultTable(data);
                }
            }).fail(function (response) {
                console.log(response);
                var msg = $("<div/>").addClass("message notice").text('Esta informacion no esta disponible en este momento');//response.responseJSON.message
                this.find(self.options.messagesSelector).prepend(msg);
            });
        },
        /**
         * Display results
         * @param data
         * @private
         */
        _drawResultTable: function(data){
            data = JSON.parse(data);
            var tmpl = mageTemplate(this.options.template);
            tmpl = tmpl({data: data});
            this.element.find(this.options.resultContainer).append($(tmpl));
        }
    })

    return $.mage.weatherApi;
});
