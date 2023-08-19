/**
 * 收藏假数据模拟(2019.07.17)
 */
export const setFalseCollectionList = callback => {
  callback([
    {
      id: "1",
      imgPath: require("./img/2.jpg"),
      goodTitle: "ST(意法半导体)/STM8S003F3P6TR 编带",
      number: "c52717",
      brand: "ST(意法半导体)",
      specs: "TSSOP-20",
      model: "STM8S003F3P6TR",
      describe:
        "STM8 Series 8-bit 8 KB Flash 1 KB RAM 16 MHz Microc asdasbbbacc",
      typeName: "国际品牌",
      diskType: "2500",
      sale: "113",
      stock: "35598",
      isSelect: false,
      time: new Date(),
      goodsType: 0,
      bgType: 1,
      children: [
        {
          label: "1+:",
          value: "2.12"
        },
        {
          label: "10+:",
          value: "1.53"
        },
        {
          label: "30+:",
          value: "1.42"
        },
        {
          label: "100+:",
          value: "1.32"
        },
        {
          label: "500+:",
          value: "1.25"
        },
        {
          label: "1000+:",
          value: "报价"
        }
      ]
    },
    {
      id: "2",
      imgPath: require("./img/3.jpg"),
      goodTitle: "传感器模块/模拟型温湿度模块",
      number: "C393715",
      brand: "CHTM-02",
      specs: "CYBERSEN(西博臣)",
      model: "40x22mm",
      describe: "CHTM-02 8 KB Flash 1 KB RAM 16 MHz Microc asdasbbbacc",
      typeName: "国内品牌",
      diskType: "10",
      sale: "12",
      stock: "88",
      isSelect: false,
      time: new Date(),
      goodsType: 0,
      bgType: 0,
      children: [
        {
          label: "1+:",
          value: "15.80"
        },
        {
          label: "10+:",
          value: "11.30"
        },
        {
          label: "30+:",
          value: "10.48"
        },
        {
          label: "100+:",
          value: "9.65"
        },
        {
          label: "500+:",
          value: "9.28"
        },
        {
          label: "1000+:",
          value: "9.10"
        }
      ]
    },
    {
      id: "3",
      imgPath: require("./img/4.jpg"),
      goodTitle: "传感器模块/PMS7003M",
      number: "C89094",
      brand: "PMS7003M",
      specs: "攀藤",
      model: "48×37×12MM",
      describe: "数字式通用颗粒物浓度传感器",
      typeName: "国内品牌",
      diskType: "5",
      sale: "39",
      stock: "34",
      isSelect: false,
      time: new Date(),
      goodsType: 0,
      bgType: 0,
      children: [
        {
          label: "1+:",
          value: "98.12"
        },
        {
          label: "10+:",
          value: "95.48"
        }
      ]
    },
    {
      id: "4",
      imgPath: require("./img/5.jpg"),
      goodTitle: "三极管/MMBT2907A",
      number: "C402271",
      brand: "MMBT2907A",
      specs: "LGE(鲁光)",
      model: "SOT-23",
      describe: " PNP",
      typeName: "国际品牌",
      diskType: "3000",
      sale: "0",
      stock: "3000",
      isSelect: false,
      time: new Date(),
      goodsType: 0,
      bgType: 1,
      children: [
        {
          label: "50+:",
          value: "0.073783"
        },
        {
          label: "50+:",
          value: "0.053791"
        },
        {
          label: "1500+:",
          value: "0.050119"
        },
        {
          label: "5000+:",
          value: "0.046447"
        },
        {
          label: "25000+:",
          value: "0.044815"
        },
        {
          label: "50000+:",
          value: "0.044009"
        }
      ]
    },
    {
      id: "5",
      imgPath: require("./img/6.jpg"),
      goodTitle: "MOS(场效应管)/SI2301A-TP",
      number: "C402364",
      brand: "SI2301A-TP",
      specs: "MCC(美微科)",
      model: "SOT-23",
      describe: "SI2301A-TPas kgda wjhhda as sbs  vvbd",
      typeName: "国内品牌",
      diskType: "3000",
      sale: "3210",
      stock: "154244",
      isSelect: false,
      time: new Date(),
      goodsType: 0,
      bgType: 0,
      children: [
        {
          label: "10+:",
          value: "0.244093"
        },
        {
          label: "100+:",
          value: "0.179119"
        },
        {
          label: "300+:",
          value: "0.167185"
        },
        {
          label: "1000+:",
          value: "0.155251"
        }
      ]
    }
  ]);
};

/*
 * 收藏左侧导航数据(2019.01.17)
 */
export const setFalseColleLeftNavList = callback => {
  callback([
    {
      title: "功能模块",
      num: 52,
      isShow: true,
      children: [
        {
          label: "射频开关",
          value: 8
        },
        {
          label: "无线收发芯片",
          value: 28
        },
        {
          label: "PF放大器",
          value: 38
        },
        {
          label: "RF耦合器",
          value: 381
        },
        {
          label: "贴片晶体振荡器",
          value: 18
        },
        {
          label: "贴片晶体谐振器（无源）",
          value: 328
        },
        {
          label: "圆柱体晶振",
          value: 3812
        },
        {
          label: "声表谐振器（SAW）",
          value: 384
        },
        {
          label: "74系列逻辑芯片",
          value: 84
        },
        {
          label: "4000系列逻辑芯片",
          value: 318
        },
        {
          label: "时基集成芯片",
          value: 138
        },
        {
          label: "触发器",
          value: 384
        },
        {
          label: "移位寄存器",
          value: 7
        },
        {
          label: "专用逻辑芯片",
          value: 3
        },
        {
          label: "电池电源管理芯片",
          value: 5
        }
      ]
    },
    {
      title: "免费赠品区",
      num: 2,
      isShow: false,
      children: [
        {
          label: "各类开发板",
          value: 38
        },
        {
          label: "其余赠品",
          value: 38
        }
      ]
    },
    {
      title: "电容/电阻",
      num: 200,
      isShow: false,
      children: [
        {
          label: "贴片电容",
          value: 38
        },
        {
          label: "钽电容",
          value: 38
        },
        {
          label: "贴片电解电容",
          value: 38
        },
        {
          label: "直插电解电容",
          value: 38
        },
        {
          label: "直插瓷片电容",
          value: 38
        },
        {
          label: "直插独石电容",
          value: 38
        },
        {
          label: "安规电容",
          value: 38
        },
        {
          label: "高压电容",
          value: 38
        },
        {
          label: "可调电容",
          value: 38
        },
        {
          label: "涤纶电容",
          value: 38
        },
        {
          label: "CBB电容",
          value: 38
        },
        {
          label: "校正电容",
          value: 38
        },
        {
          label: "固态电解电容",
          value: 38
        },
        {
          label: "超级电容器",
          value: 38
        },
        {
          label: "CL21电容",
          value: 38
        },
        {
          label: "聚酯薄膜电容",
          value: 38
        },
        {
          label: "氧化铌电容",
          value: 38
        },
        {
          label: "电容器网络，阵列",
          value: 38
        }
      ]
    },
    {
      title: "电阻",
      num: 2,
      isShow: false,
      children: [
        {
          label: "贴片电阻",
          value: 38
        },
        {
          label: "贴片高精密、低温漂电阻",
          value: 38
        }
      ]
    },
    {
      title: "处理器及微控制器",
      num: 9,
      isShow: false,
      children: [
        {
          label: "mindmotion(灵动)",
          value: 38
        },
        {
          label: "sinowealth(中颖电子)",
          value: 38
        },
        {
          label: "MICROCHIP(美国微芯)",
          value: 38
        },
        {
          label: "ATMEL(爱特梅尔)/AVR",
          value: 38
        },
        {
          label: "CYPRESS(赛普拉斯)",
          value: 38
        },
        {
          label: "TI(德州仪器)",
          value: 38
        },
        {
          label: "MEGAWIN(笙泉)",
          value: 38
        },
        {
          label: "NUVOTON(新唐",
          value: 38
        },
        {
          label: "SST(超捷)",
          value: 38
        }
      ]
    }
  ]);
};

/**
 * 新闻列表(2019.07.18)
 */
export const setFalseMoreNewsList = callback => {
  callback([
    {
      title: "闲料网喜获A轮2.5亿元融资，由红杉资本、钟鼎资本联合完成",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "连接器看图选型，新体验上线！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "100+爆款低价现货限量抢购！！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "300+低价型号，速来抢购！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "购在7月！限时2折起",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "七月福利丨11大品牌联合送券",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "会员权益体系全新上线！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "你有一张50元无门槛券未领取！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "全球半导体动荡之际，闲料网为何仍敢让利于客户？",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "第四届闲料网电子设计大赛火热开幕！【ST意法半导体冠名】",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "会员分级包邮活动上线，单月最高6次包邮！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "下单送京东E卡，最高单笔3000元！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "客户眼中的闲料网，竟然是这样的……",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "致用户告知函！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "关于江苏仓订单交期延后通知",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "福利丨免费体验GD新一代Cortex®-M23开发板，还能拿大奖",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "关于暂时取消AD与PADS的封装库文件下载的通知",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "<积分商城>改版升级！京东E卡、优惠券免费兑！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "关于提防电话诈骗的温馨提示",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "3分钟了解闲料网智能仓库的运作",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "关于增值税税率调整的通知",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    },
    {
      title: "连艾睿都要跳下去的元器件电商，你应该这么玩！",
      time: "2019-07-15 11:53",
      img: require("./img/tb.png"),
      path: "/home/newsDetails"
    }
  ]);
};

/**
 * 首页假数据模拟
 */
// home-start
export const setHomeData1 = callback => {
  callback({
    title: "品牌推荐",
    titleImg: require("@/falseData/img/index_adv1.png"),
    brandNavList: [
      {
        label: "热门",
        children: [
          {
            name: "FH(风华)",
            imgPath: require("@/assets/tab/1.png")
          },
          {
            name: "ST(意法半导体)",
            imgPath: require("@/assets/tab/2.png")
          },
          {
            name: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/3.png")
          },
          {
            name: "ON(安森美)",
            imgPath: require("@/assets/tab/4.png")
          },
          {
            name: "TI(德州仪器",
            imgPath: require("@/assets/tab/5.png")
          },
          {
            name: "LRC(乐山无线电)",
            imgPath: require("@/assets/tab/6.png")
          },
          {
            name: "SAMSUNG(三星)",
            imgPath: require("@/assets/tab/7.png")
          },
          {
            name: "Infineon(英飞凌)",
            imgPath: require("@/assets/tab/8.png")
          },
          {
            name: "YAGEO(国巨)",
            imgPath: require("@/assets/tab/9.png")
          },
          {
            name: "CJ(长电科技)",
            imgPath: require("@/assets/tab/10.png")
          },
          {
            name: "Walsin(华新科)",
            imgPath: require("@/assets/tab/11.png")
          },
          {
            name: "ST",
            imgPath: require("@/assets/tab/12.png")
          }
        ]
      },
      {
        label: "电阻/电容/电感",
        children: [
          {
            name: "FH(风华)",
            imgPath: require("@/assets/tab/01.png")
          },
          {
            name: "Murata(村田)",
            imgPath: require("@/assets/tab/02.png")
          },
          {
            name: "UniOhm(厚声)",
            imgPath: require("@/assets/tab/03.png")
          },
          {
            name: "SAMSUNG(三星)",
            imgPath: require("@/assets/tab/04.png")
          },
          {
            name: "Sunlord(顺络)",
            imgPath: require("@/assets/tab/05.png")
          },
          {
            name: "YAGEO(国巨)",
            imgPath: require("@/assets/tab/06.png")
          },
          {
            name: "宇阳",
            imgPath: require("@/assets/tab/07.png")
          },
          {
            name: "CHILISIN(奇力新)",
            imgPath: require("@/assets/tab/08.png")
          },
          {
            name: "TDK",
            imgPath: require("@/assets/tab/09.png")
          },
          {
            name: "RALEC(旺诠)",
            imgPath: require("@/assets/tab/010.png")
          },
          {
            name: "Walsin(华新科)",
            imgPath: require("@/assets/tab/011.png")
          },
          {
            name: "丽智",
            imgPath: require("@/assets/tab/012.png")
          }
        ]
      },
      {
        label: "分立器件",
        children: [
          {
            name: "ST(意法半导体)",
            imgPath: require("@/assets/tab/001.png")
          },
          {
            name: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/002.png")
          },
          {
            name: "ON(安森美)",
            imgPath: require("@/assets/tab/003.png")
          },
          {
            name: "FAIRCHILD(飞兆/仙童)",
            imgPath: require("@/assets/tab/004.png")
          },
          {
            name: "TI(德州仪器)",
            imgPath: require("@/assets/tab/005.png")
          },
          {
            name: "RENESAS(瑞萨)",
            imgPath: require("@/assets/tab/006.png")
          },
          {
            name: "AOS",
            imgPath: require("@/assets/tab/007.png")
          },
          {
            name: "LRC(乐山无线电)",
            imgPath: require("@/assets/tab/008.png")
          },
          {
            name: "Infineon(英飞凌)",
            imgPath: require("@/assets/tab/009.png")
          },
          {
            name: "佛山蓝箭",
            imgPath: require("@/assets/tab/0010.png")
          },
          {
            name: "CJ(长电科技)",
            imgPath: require("@/assets/tab/0011.png")
          },
          {
            name: "ST",
            imgPath: require("@/assets/tab/0012.png")
          }
        ]
      },
      {
        label: "逻辑芯片",
        children: [
          {
            name: "TOSHIBA(东芝)",
            imgPath: require("@/assets/tab/0001.png")
          },
          {
            name: "ST(意法半导体)",
            imgPath: require("@/assets/tab/0002.png")
          },
          {
            name: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/0003.png")
          },
          {
            name: "ON(安森美)",
            imgPath: require("@/assets/tab/0004.png")
          },
          {
            name: "FAIRCHILD(飞兆/仙童)",
            imgPath: require("@/assets/tab/0005.png")
          },
          {
            name: "TI(德州仪器)",
            imgPath: require("@/assets/tab/0006.png")
          },
          {
            name: "RENESAS(瑞萨)",
            imgPath: require("@/assets/tab/0007.png")
          },
          {
            name: "AOS",
            imgPath: require("@/assets/tab/0008.png")
          },
          {
            name: "Infineon(英飞凌)",
            imgPath: require("@/assets/tab/0009.png")
          },
          {
            name: "ROHM(罗姆)",
            imgPath: require("@/assets/tab/00010.png")
          }
        ]
      },
      {
        label: "存储器",
        children: [
          {
            name: "TOSHIBA(东芝)",
            imgPath: require("@/assets/tab/00001.png")
          },
          {
            name: "SAMSUNG(三星)",
            imgPath: require("@/assets/tab/00002.png")
          },
          {
            name: "micron(镁光)",
            imgPath: require("@/assets/tab/00003.png")
          },
          {
            name: "CYPRESS(赛普拉斯)",
            imgPath: require("@/assets/tab/00004.png")
          },
          {
            name: "GigaDevice(兆易创新)",
            imgPath: require("@/assets/tab/00005.png")
          },
          {
            name: "MXIC(旺宏)",
            imgPath: require("@/assets/tab/00006.png")
          },
          {
            name: "WINBOND(华邦)",
            imgPath: require("@/assets/tab/00007.png")
          },
          {
            name: "Nanya(南亚)",
            imgPath: require("@/assets/tab/00008.png")
          },
          {
            name: "Nanya(南亚)",
            imgPath: require("@/assets/tab/00009.png")
          }
        ]
      }
    ]
  });
};

export const setHomeData2 = callback => {
  callback({
    title: "电阻/电容/电感",
    titleImg: require("@/falseData/img/index_adv2.png"),
    brandNavList: [
      {
        label: "热门",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "Walsin(华新科)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "Walsin(华新科)",
            imgPath: require("@/assets/tab/s2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "Walsin(华新科)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "Walsin(华新科)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "Walsin(华新科)",
            imgPath: require("@/assets/tab/s5.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "SAMSUNG(三星)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "SAMSUNG(三星)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "SAMSUNG(三星)",
            imgPath: require("@/assets/tab/s3.png")
          }
        ]
      },
      {
        label: "叠层电感",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s4.png")
          }
        ]
      },
      {
        label: "陶瓷电容",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s5.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s4.png")
          }
        ]
      },
      {
        label: "贴片电阻",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "1CJ(长电科技)21",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/s3.png")
          }
        ]
      },
      {
        label: "贴片排阻",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/s1.png")
          }
        ]
      }
    ]
  });
};

export const setHomeData3 = callback => {
  callback({
    title: "分立器件",
    titleImg: require("@/falseData/img/index_adv3.png"),
    brandNavList: [
      {
        label: "热门",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "TI(德州仪器)",
            imgPath: require("@/assets/tab/f1.png")
          }
        ]
      },
      {
        label: "二极管",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "NXP(恩智浦)",
            imgPath: require("@/assets/tab/f2.png")
          }
        ]
      }
    ]
  });
};

export const setHomeData4 = callback => {
  callback({
    title: "逻辑芯片",
    titleImg: require("@/falseData/img/index_adv4.png"),
    brandNavList: [
      {
        label: "热门",
        children: [
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t1.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t2.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t3.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t4.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t5.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t6.png")
          },
          {
            name: Math.random()
              .toString(36)
              .substr(2)
              .toUpperCase(),
            price: Math.random().toFixed(4),
            type: "CJ(长电科技)",
            imgPath: require("@/assets/tab/t7.png")
          }
        ]
      }
    ]
  });
};
// home-end

/**
 * 商城目录列表
 */
export const setCatalogData = callback => {
  callback([
    {
      title: "功能模块 (626)",
      children: [
        {
          name: "传感器模块 (52)"
        },
        {
          name: "通讯模块 (133)"
        },
        {
          name: "WIFI模块 (37)"
        },
        {
          name: "电力线滤波器模块 (4)"
        },
        {
          name: "LCD液晶显示模块 (16)"
        },
        {
          name: "电子墨水屏模块 (12)"
        },
        {
          name: "VFD显示模块 (12)"
        },
        {
          name: "模块 (12)"
        },
        {
          name: "套件 (12)"
        }
      ]
    },
    {
      title: "开发板/方案验证板 (211)",
      children: [
        {
          name: "开发板/开发套件 (78)"
        },
        {
          name: "仿真器 (17)"
        },
        {
          name: "烧录器 (14)"
        },
        {
          name: "方案验证板 (86)"
        },
        {
          name: "万能板 (14)"
        },
        {
          name: "面包板 (2)"
        }
      ]
    },
    {
      title: "电源芯片 (9821)",
      children: [
        {
          name: "线性稳压芯片 (1008)"
        },
        {
          name: "低压差线性稳压(LDO) (2614)"
        },
        {
          name: "开关电源芯片 (654)"
        },
        {
          name: "DC-DC芯片 (2247)"
        },
        {
          name: "专业电源管理 (PMIC) (155)"
        },
        {
          name: "V电压基准芯片 (608)"
        },
        {
          name: "电池电源管理芯片 (602)"
        },
        {
          name: "电源模块DC-DC (912)"
        },
        {
          name: "电池保护芯片 (104)"
        },
        {
          name: "电源监控芯片 (211)"
        },
        {
          name: "功率开关芯片 (416)"
        },
        {
          name: "电源模块AC-DC (288)"
        },
        {
          name: "电源模块-专用 (2)"
        }
      ]
    },
    {
      title: "免费赠品区 (20)",
      children: [
        {
          name: "各类开发板 (12)"
        },
        {
          name: "其余赠品 (8)"
        }
      ]
    },
    {
      title: "处理器及微控制器 (3205)",
      children: [
        {
          name: "mindmotion(灵动) (27)"
        },
        {
          name: "其他处理器及微控制器(MCU) (106)"
        },
        {
          name: "SOC(赛元) (115)"
        },
        {
          name: "sinowealth(中颖电子) (12)"
        },
        {
          name: "MICROCHIP(美国微芯) (1081"
        },
        {
          name: "NXP(恩智浦) (190)"
        },
        {
          name: "ATMEL(爱特梅尔)/AVR (185)"
        },
        {
          name: "ST(意法半导体) (386)"
        },
        {
          name: "CYPRESS(赛普拉斯) (40)"
        },
        {
          name: "TI(德州仪器) (187)"
        },
        {
          name: "MEGAWIN(笙泉) (33)"
        },
        {
          name: "NUVOTON(新唐) (69)"
        },
        {
          name: "STC(宏晶) (350)"
        },
        {
          name: "RENESAS(瑞萨) (11)"
        },
        {
          name: "ADI(亚德诺) (19)"
        },
        {
          name: "SILICON LABS(芯科) (26)"
        },
        {
          name: "HOLTEK(台湾合泰/盛群) (83)"
        },
        {
          name: "GigaDevice(兆易创新) (76)"
        },
        {
          name: "ABOV(现代) (6)"
        },
        {
          name: "EastSoft(东软载波) (14)"
        },
        {
          name: "ELAN(台湾义隆电子) (8)"
        },
        {
          name: "Fortior Technol(峰岹) (4)"
        },
        {
          name: "Infineon(英飞凌) (15)"
        },
        {
          name: "MDT(台湾麦肯) (10)"
        },
        {
          name: "PADAUK(应广) (57)"
        }
      ]
    },
    {
      title: "逻辑芯片 (3117",
      children: [
        {
          name: "74系列逻辑芯片 (2172)"
        },
        {
          name: "4000系列逻辑芯片 (165)"
        },
        {
          name: "时基集成芯片 (125)"
        },
        {
          name: "CPLD/FPGA芯片 (108)"
        },
        {
          name: "触发器 (26)"
        },
        {
          name: "电平转换器,移位器 (89)"
        },
        {
          name: "多频振荡器 (9)"
        },
        {
          name: "锁存器 (7)"
        },
        {
          name: "移位寄存器 (20)"
        },
        {
          name: "计数器,除法器 (15)"
        },
        {
          name: "门极和反相器 (135)"
        },
        {
          name: "信号开关,多路复用器,解码器 (80)"
        },
        {
          name: "缓冲器,驱动器,接收器,收发器 (66)"
        }
      ]
    },
    {
      title: "嵌入式外围芯片 (930)",
      children: [
        { name: "MCU监控芯片 (671)" },
        { name: "端口扩展芯片 (63)" },
        { name: "实时时钟芯片 (114)" },
        { name: "时钟缓冲器,驱动器 (28)" },
        { name: "时钟发生器,PLL,频率合成器 (15)" },
        { name: "字库芯片 (24)" },
        { name: "时钟/计时-专用 (13)" },
        { name: "安全验证（加密）IC (2)" }
      ]
    },
    {
      title: "存储器 (1010)",
      children: [
        { name: "SDRAM存储器 (6)" },
        { name: "FLASH存储器 (292)" },
        { name: "EEPROM存储器 (518)" },
        { name: "SRAM存储器 (76)" },
        { name: "FRAM存储器 (68)" },
        { name: "PROM存储器 (2)" },
        { name: "DDR存储器 (31)" },
        { name: "EPROM存储器 (17)" }
      ]
    },
    {
      title: "模拟芯片 (1455)",
      children: [
        { name: "模数转换芯片 (384)" },
        { name: "数模转换芯片 (253)" },
        { name: "模拟开关芯片 (499)" },
        { name: "电量计芯片 (41)" },
        { name: "数字电位器芯片 (164)" },
        { name: "电流监控芯片 (114)" }
      ]
    },
    {
      title: "射频/无线电 (449)",
      children: [
        { name: "无线收发芯片 (205)" },
        { name: "射频开关 (76)" },
        { name: "射频卡芯片 (54)" },
        { name: "RF 放大器 (31)" },
        { name: "RF 混频器 (34)" },
        { name: "RF 检测器 (14)" },
        { name: "RF 衰减器 (13)" },
        { name: "RF 双工器 (19)" },
        { name: "RF耦合器 (3)" }
      ]
    },
    {
      title: "电阻 (53829)",
      children: [
        { name: "贴片电阻 (39490)" },
        { name: "贴片高精密、低温漂电阻 (3498)" },
        { name: "高功率贴片电阻 (459)" },
        { name: "贴片低阻值采样电阻 (1873)" },
        { name: "直插低阻值采样电阻 (3)" },
        { name: "压敏电阻 (1674)" },
        { name: "贴片排阻 (589)" },
        { name: "直插排阻 (100)" },
        { name: "MELF 电阻 (624)" },
        { name: "NTC 热敏电阻 (658)" },
        { name: "PTC 热敏电阻 (27)" },
        { name: "金属膜电阻 (2249)" },
        { name: "金属氧化膜电阻 (285)" },
        { name: "氧化膜电阻 (2)" },
        { name: "碳膜电阻 (524)" },
        { name: "精密可调电阻 (470)" },
        { name: "可调电阻 (71)" },
        { name: "电位器、其他可调电阻 (166)" },
        { name: "绕线电阻 (471)" },
        { name: "保险电阻 (106)" }
      ]
    }
  ]);
};

/**
 * 搜索页面假数据模拟(2019.07.19)
 */
export const searchTreeData = callback => {
  callback([
    {
      label: "类型",
      children: [
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        }
      ]
    },
    {
      label: "射频系列/标准",
      children: [
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        },
        {
          label: Math.random()
            .toString(36)
            .substr(2)
            .toUpperCase(),
          active: false
        }
      ]
    },
    {
      label: "协议类别",
      children: [
        {
          label: Math.random() * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        },
        {
          label: Math.random().toFixed(4) * 1000000,
          active: false
        }
      ]
    }
  ]);
};

/**
 * 成交记录假数据模拟（2019.08.01）
 */
export const transactionRecordMock = callback => {
  callback({
    data: {
      data: {
        nowOrderCount: 145,
        after3Count: 387,
        after30Count: 1065,
        goodsCount: 154545424,
        orderList: [
          {
            phone: "13654265414",
            orderNo: "2019073116356478",
            payTime: 1564652290000,
            payType: 0,
            endPayMoney: 1245
          },
          {
            phone: "13654265365",
            orderNo: "2019014116356478",
            payTime: 1564452290000,
            payType: 1,
            endPayMoney: 145
          },
          {
            phone: "15654265745",
            orderNo: "2019073116356502",
            payTime: 1564352290000,
            payType: 1,
            endPayMoney: 265
          },
          {
            phone: "13454260981",
            orderNo: "2014073116251512",
            payTime: 1564252290000,
            payType: 1,
            endPayMoney: 4454
          },
          {
            phone: "12154265411",
            orderNo: "894748543512334",
            payTime: 1563952290000,
            payType: 0,
            endPayMoney: 6234
          },
          {
            phone: "14254265641",
            orderNo: "4108754845454412",
            payTime: 1563852290000,
            payType: 1,
            endPayMoney: 8781
          },
          {
            phone: "18554265454",
            orderNo: "8784455215444421",
            payTime: 1563752290000,
            payType: 0,
            endPayMoney: 5522.5
          },
          {
            phone: "16954265742",
            orderNo: "205454875441223",
            payTime: 1563652290000,
            payType: 1,
            endPayMoney: 1245
          },
          {
            phone: "15654265644",
            orderNo: "2019073144441s1",
            payTime: 1563552290000,
            payType: 1,
            endPayMoney: 4878
          }
        ]
      }
    }
  })
}
