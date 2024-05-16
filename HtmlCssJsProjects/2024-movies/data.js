const data = [
  {
    name: `肖申克的救赎`,
    nameOther: `The Shawshank Redemption`,
    year: 1994,
    releaseDate: `1994-09-10`,
    imgUrl:
      '//bkimg.cdn.bcebos.com/pic/e7cd7b899e510fb30f24e313f578df95d143ad4ba656?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxNTA=,g_7,xp_5,yp_5/format,f_auto'
  },
  {
    name: `霸王别姬`,
    nameOther: `Farewell My Concubine`,
    year: 1993,
    releaseDate: `1993-01-01`
  },
  {
    name: `阿甘正传`,
    nameOther: `Forrest Gump`,
    year: 1994,
    releaseDate: `1994-06-23`
  },
  {
    name: `泰坦尼克号`,
    nameOther: `Titanic`,
    year: 1997,
    releaseDate: `1997-11-01`
  },
  {
    name: `这个杀手不太冷`,
    nameOther: `Léon`,
    year: 1994,
    releaseDate: `1994-09-14`
  },
  {
    name: `千与千寻`,
    nameOther: `千と千尋の神隠し`,
    year: 2001,
    releaseDate: `2001-07-20`
  },
  {
    name: `美丽人生`,
    nameOther: `La vita è bella`,
    year: 1997,
    releaseDate: `1997-12-20`
  },
  {
    name: `辛德勒的名单`,
    nameOther: `Schindler's List`,
    year: 1993,
    releaseDate: `1993-11-30`
  },
  {
    name: `星际穿越`,
    nameOther: `Interstellar`,
    year: 2014,
    releaseDate: `2014-11-07`
  },
  {
    name: `盗梦空间`,
    nameOther: `Inception`,
    year: 2010,
    releaseDate: `2010-07-16`
  },
  {
    name: `楚门的世界`,
    nameOther: `The Truman Show`,
    year: 1998,
    releaseDate: `1998-06-05`
  },
  {
    name: `三傻大闹宝莱坞`,
    nameOther: `3 Idiots`,
    year: 2009,
    releaseDate: `2009-12-25`
  },
  {
    name: `无名之辈`,
    nameOther: ``,
    year: 2018,
    releaseDate: `2018-11-16`
  },
  {
    name: `名侦探柯南：黑铁的鱼影`,
    nameOther: `名探偵コナン 黒鉄の魚影`,
    year: 2023,
    releaseDate: `2023-04-14`
  },
  {
    name: `从你的全世界路过`,
    nameOther: ``,
    year: 2016,
    releaseDate: `2016-09-29`
  },
  {
    name: `无间道`,
    nameOther: `無間道`,
    year: 2002,
    releaseDate: `2002-12-12`
  },
  {
    name: `无间道2`,
    nameOther: `無間道II`,
    year: 2003,
    releaseDate: `2003-10-01`
  },
  {
    name: `剑雨`,
    nameOther: ``,
    year: 2010,
    releaseDate: `2010-09-03`
  },
  {
    name: `四大名捕`,
    nameOther: ``,
    year: 2012,
    releaseDate: `2012-07-12`
  },
  {
    name: `四大名捕2`,
    nameOther: ``,
    year: 2013,
    releaseDate: `2013-12-06`
  },
  {
    name: `四大名捕大结局`,
    nameOther: ``,
    year: 2014,
    releaseDate: `2014-08-22`
  },
  {
    name: `疯狂动物城`,
    nameOther: `Zootopia`,
    year: 2016,
    releaseDate: `2016-03-04`
  },
  {
    name: `大话西游之月光宝盒`,
    nameOther: `西遊記第壹佰零壹回之月光寶盒`,
    year: 1995,
    releaseDate: `1995-01-21`
  },
  {
    name: `大话西游之大圣娶亲`,
    nameOther: `西遊記大結局之仙履奇緣`,
    year: 1995,
    releaseDate: `1995-02-04`
  },
  {
    name: `黄飞鸿之英雄有梦`,
    nameOther: ``,
    year: 2014,
    releaseDate: `2014-11-21`
  },
  {
    name: `我不是药神`,
    nameOther: ``,
    year: 2018,
    releaseDate: `2018-07-05`
  },
  {
    name: `让子弹飞`,
    nameOther: ``,
    year: 2010,
    releaseDate: `2010-12-16`
  },
  {
    name: `孤注一掷`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-08-08`
  },
  {
    name: `人生大事`,
    nameOther: ``,
    year: 2022,
    releaseDate: `2022-06-24`
  },
  {
    name: `功夫`,
    nameOther: ``,
    year: 2004,
    releaseDate: `2004-12-23`
  },
  {
    name: `喜剧之王`,
    nameOther: `喜劇之王`,
    year: 1999,
    releaseDate: `1999-02-13`
  },
  {
    name: `唐伯虎点秋香`,
    nameOther: `唐伯虎點秋香`,
    year: 1993,
    releaseDate: `1993-07-01`
  },
  {
    name: `超能陆战队`,
    nameOther: `Big Hero 6`,
    year: 2014,
    releaseDate: `2014-10-23`
  },
  {
    name: `倩女幽魂`,
    nameOther: ``,
    year: 1987,
    releaseDate: `1987-07-18`
  },
  {
    name: `釜山行`,
    nameOther: `부산행`,
    year: 2016,
    releaseDate: `2016-05-13`
  },
  {
    name: `射雕英雄传之东成西就`,
    nameOther: `射鵰英雄傳之東成西就`,
    year: 1993,
    releaseDate: `1993-02-05`
  },
  {
    name: `头号玩家`,
    nameOther: `Ready Player One`,
    year: 2018,
    releaseDate: `2018-03-29`
  },
  {
    name: `色，戒`,
    nameOther: ``,
    year: 2007,
    releaseDate: `2007-09-24`
  },
  {
    name: `碟中谍7：致命清算（上）`,
    nameOther: `Mission: Impossible – Dead Reckoning Part One`,
    year: 2023,
    releaseDate: `2023-06-19`
  },
  {
    name: `封神第一部：朝歌风云`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-07-20`
  },
  {
    name: `第八个嫌疑人`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-09-09`
  },
  {
    name: `消失的她`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-06-22`
  },
  {
    name: `无名`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-01-22`
  },
  {
    name: `居家男人`,
    nameOther: `The Family Man`,
    year: 2000,
    releaseDate: `2000-12-22`
  },
  {
    name: `速度与激情9`,
    nameOther: `F9: The Fast Saga`,
    year: 2021,
    releaseDate: `2021-05-21`
  },
  {
    name: `西游记女儿国`,
    nameOther: ``,
    year: 2018,
    releaseDate: `2018-02-16`
  },
  {
    name: `西游记之孙悟空三打白骨精`,
    nameOther: ``,
    year: 2016,
    releaseDate: `2016-02-08`
  },
  {
    name: `西游伏妖篇`,
    nameOther: ``,
    year: 2017,
    releaseDate: `2017-01-28`
  },
  {
    name: `寒战`,
    nameOther: `寒戰`,
    year: 2012,
    releaseDate: `2012-11-08`
  },
  {
    name: `寒战2`,
    nameOther: `寒戰II`,
    year: 2016,
    releaseDate: `2016-07-08`
  },
  {
    name: `黑社会`,
    nameOther: `黑社會`,
    year: 2005,
    releaseDate: `2005-10-20`
  },
  {
    name: `黑社会2：以和为贵`,
    nameOther: `黑社會以和為貴`,
    year: 2006,
    releaseDate: `2006-04-27`
  },
  {
    name: `赤道`,
    nameOther: ``,
    year: 2015,
    releaseDate: `2015-04-30`
  },
  {
    name: `金鸡SSS`,
    nameOther: `黑金雞SSS`,
    year: 2014,
    releaseDate: `2014-01-30`
  },
  {
    name: `扫毒`,
    nameOther: `掃毒`,
    year: 2013,
    releaseDate: `2013-11-29`
  },
  {
    name: `追击8月15`,
    nameOther: ``,
    year: 2004,
    releaseDate: `2004-08-19`
  },
  {
    name: `金手指`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-12-30`
  },
  {
    name: `第二十条`,
    nameOther: ``,
    year: 2024,
    releaseDate: `2024-02-10`
  },
  {
    name: `三大队`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-12-15`
  },
  {
    name: `八角笼中`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-07-06`
  },
  {
    name: `敢死队4：最终章`,
    nameOther: `Expend4bles`,
    year: 2023,
    releaseDate: `2023-09-15`
  },
  {
    name: `动物园里有什么？`,
    nameOther: ``,
    year: 2024,
    releaseDate: `2024-01-12`
  },
  {
    name: `开国将帅授衔1955`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-11-24`
  },
  {
    name: `93国际列车大劫案：莫斯科行动`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-09-29`
  },
  {
    name: `周处除三害`,
    nameOther: `周處除三害`,
    year: 2024,
    releaseDate: `2024-03-01`
  },
  {
    name: `拯救嫌疑人`,
    nameOther: ``,
    year: 2023,
    releaseDate: `2023-11-01`
  },
  {
    name: `第二十条`,
    nameOther: ``,
    year: 2024,
    releaseDate: `2024-02-10`
  },
  {
    name: `机动部队—警例`,
    nameOther: ``,
    year: 2008,
    releaseDate: `2008-10-13`
  },
  {
    name: `机动部队 PTU`,
    nameOther: ``,
    year: 2003,
    releaseDate: `2003-04-17`
  },
  {
    name: `机动部队—绝路`,
    nameOther: ``,
    year: 2008,
    releaseDate: `2008`
  }
]

data.sort((a, b) => (a.name.length > b.name.length ? 1 : -1)).forEach(item => console.log(item.name))
