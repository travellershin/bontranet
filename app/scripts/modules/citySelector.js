var citySelector = Vue.extend({
    template: '#city-selector',
    data: function(){
        return {
            cityNameKo: "뉴욕",
            cityNameEn: "NEW YORK"
        }
    },
    methods: {
        changeCity: function(){
            this.cityNameKo = "오사카"
        }
    }
});

export default citySelector;