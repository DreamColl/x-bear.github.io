var Settings = {
  pickUpServ5: [''],
  pickUpServ4: [''],
  pickUpServ3: [''],
  serv5: ['002', '008', '037', '052', '059', '060', '062', '065', '075', '076', '084', '085', '097', '113', '118', '143'],
  serv4: ['006', '010', '011', '014', '018', '029', '030', '041', '046', '047', '048', '058', '066', '074', '082', '087', '089', '094', '100', '101', '109', '120', '121', '140', '145', '146'],
  serv3: ['007', '009', '013', '015', '017', '020', '022', '023', '026', '027', '028', '031', '035', '042', '049', '055', '056', '063', '064', '071', '072', '079', '080', '081', '095', '104', '105', '110', '117', '124', '125'],
  pickUpCft5: [''],
  pickUpCft4: [''],
  pickUpCft3: [''],
  craft5: ['031', '032', '033', '034', '035', '040', '048', '057', '058', '067', '075', '097', '175', '185', '188', '263', '400'],
  craft4: ['021', '022', '023', '024', '025', '026', '027', '028', '029', '030', '038', '039', '047', '056', '066', '073', '074', '098', '176', '182', '183', '184', '186', '264', '401'],
  craft3: ['089', '090', '091', '092', '093', '094', '095', '096', '243', '244', '245', '246', '247', '265', '331', '332', '333', '402'],
  img: '',
  title: '',
}

// 
var up001 = {
  title: 'Fate/Grand Order：圣晶石召唤～限时卡池～nga游系风推荐召唤～Pick Up召唤！',
  img: './img/nga001.jpg',
  settings: [
    ['d002', 'd003', 'd004'], // 五星从者up
    ['d005', '116', '145', '164'], // 四星从者up // 145 C闪 116 茨木童子 164 Passionlip
    [], // 三星从者up
    ['048', '034', '040', '067'], // 五星礼装up // 34万华镜 40棱镜 48黑杯 67 2030
    [], // 四星礼装up
    []  // 三星礼装up
  ]
}

/**
   * @description up和常驻去重
   */
function deduplication () {
  var settingUP = ['pickUpServ5', 'pickUpServ4', 'pickUpServ3', 'pickUpCft5', 'pickUpCft4', 'pickUpCft3']
  var setting = ['serv5', 'serv4', 'serv3', 'craft5', 'craft4', 'craft3']
  for (var k in settingUP) {
    for (var i in Settings[settingUP[k]]) {
      Settings[setting[k]].find(function () {
        var num = Settings[setting[k]].indexOf(Settings[settingUP[k]][i])
        num != -1 ? Settings[setting[k]].splice(num, 1) : null
      })
    }
  }
}

/**
   * @description 获取search
   * @returns Object
   */
function getSearch () {
  var searchUrl = location.search || '?key=001'
  var searchObj = {}
  searchUrl = searchUrl.slice(1)
  var searchArr = searchUrl.split('&')
  searchArr.forEach(function (e) {
    var key = e.split('=')[0]
    var value = e.split('=')[1]
    searchObj[key] = value
  })
  return searchObj
}

/**
   * @description 卡池up设定
   * @param pickUpServ5 
   * @param pickUpServ4 
   * @param pickUpServ3 
   * @param pickUpCft5 
   * @param pickUpCft4 
   * @param pickUpCft3 
   */
function setUp ([pickUpServ5, pickUpServ4, pickUpServ3, pickUpCft5, pickUpCft4, pickUpCft3], img, title) {
  Settings.pickUpCft3 = pickUpCft3
  Settings.pickUpCft4 = pickUpCft4
  Settings.pickUpCft5 = pickUpCft5

  Settings.pickUpServ3 = pickUpServ3
  Settings.pickUpServ4 = pickUpServ4
  Settings.pickUpServ5 = pickUpServ5

  Settings.img = img
  Settings.title = title
  deduplication()
}
var search = getSearch()
switch (search.key) {
case '001':
  setUp(up001.settings, up001.img, up001.title)
  break

default:
  document.getElementById('banner').src = Settings.img
  document.title = Settings.title
  document.getElementById('title').innerText = Settings.title
}