import { useMenuStore } from "../stores";
import allData from "./allData";
export const initData = () => {
  const { setMenuList } = useMenuStore();
  const menuList = [
    {
      name: "2022",
      label: "2022赛季",
      child: [
        {
          name: "2022lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_ae6eb11afa5ac24bc6d5ddb159e0106e/0",
          data: [],
        },
        {
          name: "2022msi",
          label: "季中冠军赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_69b82a7c5a9c7a7528f658dc32c42d09/0",
          data: [],
        },
        {
          name: "2022lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_4d63da4fa4f18898b0bad8577e48bd53/0",
          data: [],
        },
        {
          name: "2022final",
          label: "全球总决赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_115398908a05a4a0964ae6fdfd79c1de/0",
          data: [],
        },
      ],
    },
    {
      name: "2021",
      label: "2021赛季",
      child: [
        {
          name: "2021lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_6aaff6be70958c4be854a41d69c4bbc8/0",
          data: [],
        },
        {
          name: "2021lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_2da8649fb768186aab190d508063bda6/0",
          data: [],
        },
        {
          name: "2021final",
          label: "全球总决赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_7d9b666c43c6a74d28f000a45d9655f6/0",
          data: [],
        },
      ],
    },
    {
      name: "2020",
      label: "2020赛季",
      child: [
        {
          name: "2020lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_2a415d31f186f31717abf223c1eeec94/0",
          data: [],
        },
        {
          name: "2020lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_6a4d57a9f889e212746b9709eed69312/0",
          data: [],
        },
      ],
    },
    {
      name: "2019",
      label: "2019赛季",
      child: [
        {
          name: "2019lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_d0a6ca92ec8b9631f001c631016b3532/0",
          data: [],
        },
        {
          name: "2019lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_3e3249da9e9c6d493583fc592feabfe7/0",
          data: [],
        },
      ],
    },
    {
      name: "2018",
      label: "2018赛季",
      child: [
        {
          name: "2018lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_06e8f178df15ba849e6216a610d8d1ac/0",
          data: [],
        },
        {
          name: "2018lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_c847e2671ae097e01a02e016c242e5a2/0",
          data: [],
        },
        {
          name: "2018dmxy",
          label: "德玛西亚杯",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_7f939948e3723a642f1ec17341bb1f08/0",
          data: [],
        },
      ],
    },
    {
      name: "2017",
      label: "2017赛季",
      child: [
        {
          name: "2017lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_dd0d7ff5b7806738d76aad2ed91dd030/0",
          data: [],
        },
        {
          name: "2017lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_efd8ef7bc605f3b0f35f8555900e67fc/0",
          data: [],
        },
        {
          name: "2017lsplspring",
          label: "LSPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_81089946698519b910529300bb78f1c5/0",
          data: [],
        },
        {
          name: "2017lsplsummer",
          label: "LSPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_d1383d336e82a48b4a469a1c57539ffb/0",
          data: [],
        },
        {
          name: "2017dmxychangsha",
          label: "德玛西亚杯长沙站",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_0d762b51ec09b28128215e953e4808d8/0",
          data: [],
        },
        {
          name: "2017dmxyqingdao",
          label: "德玛西亚杯青岛站",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_8c913b32918caa68695b6808c072406b/0",
          data: [],
        },
      ],
    },
    {
      name: "2016",
      label: "2016赛季",
      child: [
        {
          name: "2016lplspring",
          label: "LPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_b10d8dd1fd7295cd7dcf16da86031f9b/0",
          data: [],
        },
        {
          name: "2016lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_00c00c3a78efc4508fbbe2bca3cfc1f1/0",
          data: [],
        },
        {
          name: "2016lsplspring",
          label: "LSPL春季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_e2dd65a679a773b20d1753f6d15a0854/0",
          data: [],
        },
        {
          name: "2016lsplsummer",
          label: "LSPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_7c3067d36195d853053c7e154fba1924/0",
          data: [],
        },
        {
          name: "2016msi",
          label: "季中冠军赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_336511e69fe6fe9d17b75717eb3fe67f/0",
          data: [],
        },
        {
          name: "2016final",
          label: "全球总决赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_a29d4ef5bceb8b165e9a5fac4c385525/0",
          data: [],
        },
      ],
    },
  ];
  menuList.forEach((menu) => {
    menu.child?.forEach((mc) => {
      mc.data = allData[mc.name] || [];
    });
  });
  setMenuList(menuList);
};
