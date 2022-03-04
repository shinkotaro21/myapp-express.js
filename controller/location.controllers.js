const { provinces, regencies } = require('../data/location')

exports.getCities = (req, res) => {
    console.log("query", req.query)
    let provinceId = ''
    for (const data of provinces) {
        const provinceName = data.name.toLowerCase();
        if (provinceName.includes(req.query.provinceName.toLowerCase())) {
            provinceId = data.id
        }
    }
    const cities = regencies.filter(result => result.province_id == provinceId)
    res.json(cities.map(result => result))
}

exports.getCitiesNameByWordCount = (req, res) => {
    console.log("req n-word", req.query);
    const result = []
    for (const data of regencies) {
        const wordCountRegency = data.name.split(" ").length
        if (req.query.count == wordCountRegency) {
            result.push(data.name)
        }
    }
    res.json(result);
}

exports.getProvinceByCityName = (req, res) => {
    console.log("n-word 100%", req.query)
    let province = []
    for (const data of regencies) {
        const Name = data.name.toLowerCase();
        if (Name.split(" ").includes(req.query.Name.toLowerCase())) {
            province = data.province_id
            break
        }
    }

    const provinceResult = provinces.filter(result => result.id == province)
    res.json(provinceResult.map(result => result))
}