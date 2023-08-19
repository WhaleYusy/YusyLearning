export default [
  {
    label: "队员",
    prop: "playerName",
    sortable: false,
    minWidth: "180",
    fixed: "left",
    cType: "per",
    cTypeName: "teamName",
  },
  {
    label: "位置",
    prop: "playerLocation",
    sortable: false,
    minWidth: "60",
    fixed: "left",
  },
  {
    label: "出场次数",
    prop: "matchCount",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "MVP次数",
    prop: "mvpCount",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "总击杀(场均)", // killPerGame
    prop: "totalKills",
    sortable: true,
    cType: "per",
    cTypeName: "killPerGame",
    minWidth: "160",
  },
  {
    label: "总助攻(场均)", // assistPerGame
    prop: "totalAssists",
    sortable: true,
    cType: "per",
    cTypeName: "assistPerGame",
    minWidth: "160",
  },
  {
    label: "总死亡(场均)", // deathPerGame
    prop: "totalDeath",
    sortable: true,
    cType: "per",
    cTypeName: "deathPerGame",
    minWidth: "160",
  },
  {
    label: "KDA",
    prop: "kda",
    sortable: true,
  },
  {
    label: "场均金钱",
    prop: "goldPerGame",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "场均补刀",
    prop: "creepScorePerGame",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "场均插眼",
    prop: "wardPlacedPerGame",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "场均排眼",
    prop: "wardKilledPerGame",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "场均参团率",
    prop: "killParticipantPercent",
    sortable: true,
    minWidth: "130",
  },
  {
    label: "场均对位经济差",
    prop: "goldGapPerGame",
    sortable: true,
    minWidth: "150",
  },
  {
    label: "伤害占比",
    prop: "damagePercent",
    sortable: true,
    minWidth: "110",
  },
  {
    label: "经济占比",
    prop: "goldPercent",
    sortable: true,
    minWidth: "110",
  },
];
