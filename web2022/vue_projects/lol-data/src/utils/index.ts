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
        },
        {
          name: "2022lplsummer",
          label: "LPL夏季赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_4d63da4fa4f18898b0bad8577e48bd53/0",
        },
        {
          name: "2022final",
          label: "全球总决赛",
          imageUrl:
            "//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_115398908a05a4a0964ae6fdfd79c1de/0",
        },
      ],
    },
    {
      name: "2021",
      label: "2021赛季",
    },
    {
      name: "2020",
      label: "2020赛季",
    },
    {
      name: "2019",
      label: "2019赛季",
    },
    {
      name: "2018",
      label: "2018赛季",
    },
    {
      name: "2017",
      label: "2017赛季",
    },
    {
      name: "2016",
      label: "2016赛季",
    },
  ];
  menuList.forEach((menu) => {
    menu.child?.forEach((mc) => {
      mc.data = allData[mc.name] || [];
    });
  });
  setMenuList(menuList);
};
