var formatDate = function (item) {
  if (item) {
    return item.substring(0, 10)
  } else {
    return ''
  }
}
var formatNickname = function (item) {
  if (item.length > 0) {
    return "*****" + item.substring(item.length - 1, item.length);
  }
}
var formatProxyBrandStr = function (item) {
  if(item==null||item==""||item==undefined){
    return []
  }else if (item.length > 0) {
    return item.split(',')
  }else{
    return []
  } 
}
var isFacilitatorTypeId = function(idnex) {
  var txt = "";
  switch (parseInt(idnex)) {
    case 1:
      txt = "开发公众号";
      break;
    case 2:
      txt = "开发小程序";
      break;
    case 3:
      txt = "教育培训";
      break;
    case 4:
      txt = "财务记账";
      break;
    case 5:
      txt = "旅游";
      break;
    case 6:
      txt = "调户口";
      break;
    case 7:
      txt = "团队拓展";
      break;
    case 8:
      txt = "高新认证";
      break;
    case 9:
      txt = "打快板";
      break;
    case 10:
      txt = "产品认证";
      break;
    case 11:
      txt = "库存处理";
      break;
    case 12:
      txt = "3D打印";
      break;
    case 13:
      txt = "机票酒店";
      break;
    case 14:
      txt = "商务法律";
      break;
    case 15:
      txt = "民事法律";
      break;
  }
  return txt;
}

var toFixed = function (num,decimal) {
  decimal = decimal || 0;
  if(!num){
    return '0.0';
  }
  return parseFloat(num).toFixed(decimal);
}

var getTypeName=function (type) {
    switch (type) {
      case 0:
        return "打赏需求";
        break;
      case 1:
        return "打赏补偿";
        break;
      case 2:
        return  "团队打赏分润";
        break;
      case 3:
        return "团队被打赏分润";
        break;
      case 4:
        return "粉丝充值奖励";
        break;
      case 5:
        return "转让";
        break;
      case 6:
        return "提现扣除";
        break;
      case 7:
        return "VIP充值";
        break;
      case 8:
        return "打赏不满意退还";
        break;
      case 9:
        return "粉丝关注";
        break;
      case 10:
        return "发布需求";
        break;
      case 11:
        return "普通充值";
        break;
      case 12:
        return "满意好评奖励";
        break;
      case 13:
        return "全面统计";
        break;
      case 14:
        return "打赏赠送";
        break;
      case 15:
        return "旅游打赏分润";
        break;
      case 16:
        return "充值奖励";
        break;
      case 17:
        return "团队充值奖励";
        break;
      case 18:
        return "商城购物";
        break;
      case 19:
        return "旅游消费";
        break;
      case 20:
        return "旅游奖励";
        break;
      case 21:
        return "退款用户";
        break;
      case 22:
        return "旅游打款服务商";
        break;
      case 23:
        return "提现不通过返还";
        break;
      case 24:
        return "添加圈友消费";
        break;
      case 25:
        return "通过圈友奖励";
        break;
      case 26:
        return "满10人好评奖励";
        break;
      case 31:
        return "PCB消费";
        break;
      case 32:
        return "PCB收款";
        break;
      case 33:
        return "PCB退款";
        break;
      case 34:
        return "PCB强制放款";
        break;
      default: return '默认'
    }
    return txt;
  }

var purchaseListFd = function(arr){ //供应商列表的开始时间startTume，结束时间endTime
  for(let a=0;a<arr.length;a++){
    arr[a].startTime = arr[a].startTime.substring(0, 10);
    arr[a].endTime = arr[a].endTime.substring(0, 10);
  }
  return arr;
}
// var supplierListFd = function(arr){
//   for(let a=0;a<arr.length;a++){
    
//   }
//   return arr;
// }
var supplierInfoListFd = function(arr){ //供应商列表的距离distance
  for(let a=0;a<arr.length;a++){
    if(arr[a].distance!=null&&arr[a].distance>=0){
      if(arr[a].distance<=1){
        arr[a].distance2 = this.toFixed(arr[a].distance * 1000,0)
      }else if(arr[a].distance<=3){
        arr[a].distance2 = this.toFixed(arr[a].distance,1)
      }else{
        arr[a].distance2 = arr[a].distance
      }
    }else{
      arr[a].distance2 = arr[a].distance
    }
  }
  return arr;
}
var messageListFd = function(arr){ //供应商列表的距离distance
  for(let a=0;a<arr.length;a++){
      arr[a].nickName = this.formatNickname(arr[a].nickName)
  }
  return arr;
}


var getTypeNameFd =  function(arr){ //我的账单类型type
  for(let a=0;a<arr.length;a++){
      arr[a].type = this.getTypeName(arr[a].type)
  }
  return arr;
}
/*
 * 导出
 */
module.exports = {
  formatDate: formatDate,
  formatNickname: formatNickname,
  isFacilitatorTypeId: isFacilitatorTypeId,
  formatProxyBrandStr:formatProxyBrandStr,
  toFixed:toFixed,
  purchaseListFd:purchaseListFd,
  //supplierListFd:supplierListFd,
  supplierInfoListFd:supplierInfoListFd,
  messageListFd:messageListFd,
  getTypeName:getTypeName,
  getTypeNameFd:getTypeNameFd
}