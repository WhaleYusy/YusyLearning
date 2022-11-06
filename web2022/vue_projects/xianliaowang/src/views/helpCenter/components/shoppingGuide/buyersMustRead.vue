<template>
  <div>
    <div v-for="(t,i) in contList" :key="i" class="buyersMustRead_cont">
      <p class="buyersMustRead_cont_title">{{t.pTitle}}</p>
      <div v-for="(te,ind) in t.children" :key="ind">
        {{te.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      contList:[
        {pTitle:'如何订购商品？',children:[
          {name:'您可以首先浏览我们的网站了解商品。看到您满意的商品您可以直接在我们的网站上添加到购物车，然后下订单即可'}
        ]},
        {pTitle:'请告诉我在这里购物的理由好吗？',children:[
          {name:'我们只从原厂或者代理商正规渠道进货，保证原装正品。'},
          {name:'我们明码实价。所有商品售价都在网站页面上如实公开，不讲价。销售价格随着进货价格变化系统自动计算，价格更透明和合理。'},
          {name:'我们有海量现货。目前拥有1万多平方米仓库，共有10万多种元器件。'},
          {name:'我们提供订货和代购服务。如现货库存不足，我们提供订货服务。如我商城没有商品，我们提供代购服务。'},
          {name:'我们支持零售。解决样片采购难题，一块钱起卖，为您提供一站式采购服务。'}
        ]},
        {pTitle:'你们的商品我都非常喜欢，已经购买了很多，但是有些怎么一直没货？会不会订不到？',children:[
          {name:'由于网站顾客购买量比较大，商品随时可能断货，您可以选择您需要的商品，我商城提供代购和代购服务。'},
          {name:'订货服务，是指我商城上有该商品记录，但库存不足，闲料网提供订货服务，详情请点击《订货服务》。'}
        ]},
        {pTitle:'所有的产品都能只能在网站上购买?',children:[
          {name:'目前网站查找的所有商品都是可以购买的，如果是现货，我们基本当天能发货。如果没有现货，我们可以帮忙订货。如果您需要的商品我们商城没有，我们可以帮忙代购。'}
        ]},
        {pTitle:'为什么要注册会员？',children:[
          {name:'只有注册用户才可以在网上进行订购，享受优惠的价格。'},
          {name:'只有注册用户才可以登录"会员中心"，使用更多的会员购物功能,管理自己的资料。'},
          {name:'只有注册用户才有可能获取我们赠品或者现金券。'}
        ]},
        {pTitle:'忘记了密码怎么办？',children:[
          {name:'当您忘记密码时，请登录注册页面，点击"忘记密码"，系统会自动将您的密码通过email告诉您，您可以登录"会员中心"去更改密码，以确保您的利益。'}
        ]},
        {pTitle:'积分是怎么回事？有什么作用？',children:[
          {name:'积分的高低只反映您对我们的关注和支持程度。我们的积分是通过订购商品产生的。对于高积分的客户我们会有一定的奖励，以此回馈广大顾客。'}
        ]}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.buyersMustRead_cont{
  font-size:14px;
  line-height: 2;
  color: #444444;
  .buyersMustRead_cont_title{
    margin-top: 20px;
    font-weight: bolder;
  }
}
</style>

