var Main = {
    init: function(cid){
        let city = cityData[cid];

        for (var company in city) {
            for (var line in city[company]) {
                let lineObj = city[company][line];
                let url = lineObj.url;

                get(url).then(function(res){
                    let txt = res.slice(res.lastIndexOf('<table'), res.lastIndexOf('</table>'))
                    console.log(txt)
                    console.log(lineObj)
                }, function(error) {
                    console.error("Failed!", error);
                })
            }
        }
    }
}
