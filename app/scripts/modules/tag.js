let Tag = {
    init: function(data){
        let tagObj = {};
        let tagRankArray = [];

        for (var sid in data) {
            if(data[sid].tag){
                let tags = data[sid].tag;

                for (var i = 0; i < tags.length; i++) {
                    if(tagObj[tags[i]]){
                        tagObj[tags[i]].score++;
                        tagObj[tags[i]].spot.push(data[sid].name.ko)
                    }else{
                        tagObj[tags[i]] = {
                            score: 1,
                            spot: [data[sid].name.ko]
                        }
                    }
                }
            }
        }

        for (var tag in tagObj) {
            tagRankArray.push({
                name:tag,
                score:tagObj[tag].score,
                spot:tagObj[tag].spot
            })
        }
        tagRankArray.sort(function(a, b){
            return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
        })
    }
}

export default Tag;
