const model = require('../model')

function searchFace(imagePath) {
  // TODO: API尚未實作
  // return await model.request({
  //   method: 'POST',
  //   url: `${process.env.RECOGNITION_URL}/search`,
  //   headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
  //   formData: {image: fs.createReadStream(imagePath)}
  // })
  // TODO: 把mock data拿掉
  return [[
    {
      imageUrl: "https://menelect.imgix.net/wp-content/uploads/2019/07/%E3%80%90%E6%89%8B%E8%A1%93%E6%88%90%E5%8A%9F%E3%80%91%E4%BC%91%E9%A4%8A%E4%B8%80%E5%B9%B4%E9%87%8D%E6%96%B0%E5%87%BA%E9%81%93%EF%BC%81%E6%B7%B1%E7%94%B0%E8%A9%A0%E7%BE%8E%E7%82%BA%E4%BD%95%E8%83%BD%E5%A4%A0%E6%89%93%E6%95%97%E4%B8%89%E4%B8%8A%E6%82%A0%E4%BA%9E%EF%BC%9F-03.jpg",
      name: "橋本有菜",
      recognitionPercentage: '100%',
      description: 'hihi'
    },
    {
      imageUrl: "https://menelect.imgix.net/wp-content/uploads/2019/07/%E3%80%90%E6%89%8B%E8%A1%93%E6%88%90%E5%8A%9F%E3%80%91%E4%BC%91%E9%A4%8A%E4%B8%80%E5%B9%B4%E9%87%8D%E6%96%B0%E5%87%BA%E9%81%93%EF%BC%81%E6%B7%B1%E7%94%B0%E8%A9%A0%E7%BE%8E%E7%82%BA%E4%BD%95%E8%83%BD%E5%A4%A0%E6%89%93%E6%95%97%E4%B8%89%E4%B8%8A%E6%82%A0%E4%BA%9E%EF%BC%9F-03.jpg",
      name: "橋本有菜",
      recognitionPercentage: '100%',
      description: 'hihi'
    },{
      imageUrl: "https://menelect.imgix.net/wp-content/uploads/2019/07/%E3%80%90%E6%89%8B%E8%A1%93%E6%88%90%E5%8A%9F%E3%80%91%E4%BC%91%E9%A4%8A%E4%B8%80%E5%B9%B4%E9%87%8D%E6%96%B0%E5%87%BA%E9%81%93%EF%BC%81%E6%B7%B1%E7%94%B0%E8%A9%A0%E7%BE%8E%E7%82%BA%E4%BD%95%E8%83%BD%E5%A4%A0%E6%89%93%E6%95%97%E4%B8%89%E4%B8%8A%E6%82%A0%E4%BA%9E%EF%BC%9F-03.jpg",
      name: "橋本有菜",
      recognitionPercentage: '100%',
      description: 'hihi'
    }
  ], null]
}

function randomFace() {
  // TODO: API尚未實作
  // TODO: 把mock data拿掉
  return [[
    {
      imageUrl: "https://menelect.imgix.net/wp-content/uploads/2019/07/%E3%80%90%E6%89%8B%E8%A1%93%E6%88%90%E5%8A%9F%E3%80%91%E4%BC%91%E9%A4%8A%E4%B8%80%E5%B9%B4%E9%87%8D%E6%96%B0%E5%87%BA%E9%81%93%EF%BC%81%E6%B7%B1%E7%94%B0%E8%A9%A0%E7%BE%8E%E7%82%BA%E4%BD%95%E8%83%BD%E5%A4%A0%E6%89%93%E6%95%97%E4%B8%89%E4%B8%8A%E6%82%A0%E4%BA%9E%EF%BC%9F-03.jpg",
      name: "橋本有菜",
      description: 'hihi'
    }
  ], null]
}

module.exports = {
  searchFace,
  randomFace
}