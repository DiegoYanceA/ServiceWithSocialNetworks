const axios = require("axios")
exports.channel =  async (req, res, next) => {
    var url = "https://www.googleapis.com/youtube/v3/channels?id=UCH5RD3yCZhuDf8V51rC1R7g&key=AIzaSyDqPr5eNbQGWRFlxXIO8TJWFvAxpp19Myk&part=snippet,contentDetails,statistics,status";

    var response = await axios.get(url);
    if(!response) {
        return res.json({
            msg: "El sistema no puede realizar la petición."
        });
    }

    if(!response.data) {
        return res.json({
            msg: "El sistema no puede acceder a los datos."
        });
    }

    var data = response.data.items[0];
    var channelName = data.snippet.title;
    var channelPhoto = data.snippet.thumbnails.medium;
    var statistics = data.statistics;

    var channel = {
        statistics: statistics,
        channelName: channelName,
        channelPhoto: channelPhoto
    }
    return res.json({
        channel: channel
    });

};