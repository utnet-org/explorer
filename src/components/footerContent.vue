<script setup lang="ts">
</script>
<template>
  <div class="footer_content">
    <div class="footer-header">
      <div class="icon_title">
        <div class="bg">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="black-text-15-600">Utility 公链提供支持</div>
      </div>
      <div class="black-text-14">
        UNCSCAN是公用事业链的区块链浏览器和分析平台。
      </div>
    </div>
    <div class="link-content">
      <div>
        <div class="black-text-14-600">
          <p>联系我们</p>
        </div>
        <div class="black-text-12">
          <div class="contact-item">
            <img src="../assets/images/twitter.png" alt="" />
            <p style="margin: 0">Twitter</p>
          </div>
          <div class="contact-item">
            <img src="../assets/images/telegram.png" alt="" />
            <p>Telegram</p>
          </div>
          <div class="contact-item">
            <img src="../assets/images/email.png" alt="" />
            <p style="margin: 0">邮箱</p>
          </div>
        </div>
      </div>
      <div>
        <div class="black-text-14-600">
          <p>社区</p>
        </div>
        <div class="black-text-12">
          <p>白皮书</p>
          <p>API文档</p>
          <p>开发指南</p>
        </div>
      </div>
      <div>
        <div class="black-text-14-600">
          <p>产品服务</p>
        </div>
        <div class="black-text-12">
          <p>官网</p>
          <p>App移动端</p>
          <p>浏览器钱包</p>
        </div>
      </div>
    </div>
    <div class="father_bottom">
      <div class="grey-text-10">@ 2023 Utility All Rights Reserved</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@media screen {
  .footer_content {
    width: 100%;
    background: var(
        --9-bded-6,
        linear-gradient(180deg, rgba(155, 222, 214, 0.72) 0%, #9bded6 100%)
    );
    backdrop-filter: blur(5px);
  }
  
  .footer-header {
    height: 150px;
    padding: 32px 32px;
  }
  
  .icon_title {
    padding: 0 0 10px 0;
    display: flex;
    align-items: center;
    
    .bg {
      width: 44px;
      height: 44px;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
      
      img {
        width: 25px;
        height: 29px;
      }
    }
  }
  
  .link-content {
    width: 65%;
    max-width: 800px;
    padding: 0 32px 20px 32px;
    display: flex;
    justify-content: space-between;
    margin-left: auto
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    
    img {
      margin-right: 5px;
    }
  }
  
  p:hover {
    cursor: pointer;
    //border-bottom: 1px solid #0facb6;
    color: #0facb6;
  }
  
  
  .father_bottom {
    height: 37px;
    display: flex;
    justify-content: end;
    align-items: center;
    border-top: 0.5px solid rgba(25, 25, 25, 0.3);
    margin: 0 16px;
  }
}
//@media (min-width: 1024px) {
//  .footer_content {
//    width: 100%;
//    background: var(
//        --9-bded-6,
//        linear-gradient(180deg, rgba(155, 222, 214, 0.72) 0%, #9bded6 100%)
//    );
//    backdrop-filter: blur(5px);
//
//    .footer_top {
//      .top_left {
//        .icon_title {
//          padding-top: 20px;
//          margin-bottom: 17px;
//          margin-left: 32px;
//          display: flex;
//          align-items: center;
//
//          .bg {
//            width: 55px;
//            height: 55px;
//            background-color: #fff;
//            border-radius: 50%;
//            display: flex;
//            justify-content: center;
//            align-items: center;
//          }
//
//          img {
//            width: 32px;
//            height: 37px;
//          }
//
//          .title {
//            margin-left: 8px;
//            font-size: 20px;
//            font-weight: 600;
//            color: #191919;
//          }
//        }
//
//        .text {
//          margin-left: 32px;
//          font-size: 14px;
//          font-weight: 600;
//          color: #191919;
//        }
//      }
//
//      .top_right {
//        display: flex;
//
//        .right_left,
//        .right_center,
//        .right_right {
//          display: flex;
//          flex-direction: column;
//
//          div {
//            margin-top: 4px;
//            font-size: 12px;
//            font-weight: 500;
//            color: rgba(25, 25, 25, 0.8);
//          }
//        }
//
//        .right_center {
//          margin: 0 70px;
//        }
//
//        .right_right {
//          span:hover {
//            cursor: pointer; //鼠标移上去变成小手
//            border-bottom: 1px solid #0facb6;
//            color: #0facb6;
//          }
//        }
//      }
//    }
//
//    .footer_bottom {
//      display: flex;
//      justify-content: space-between;
//      width: 100%;
//      align-items: center;
//
//      .father_bottom {
//        display: flex;
//        justify-content: end;
//        border-top: 0.5px solid rgba(25, 25, 25, 0.3);
//        width: 100%;
//        margin: 0 16px;
//        height: 100%;
//        align-items: center;
//      }
//
//      .bottom_left {
//        display: flex;
//        margin-left: 9px;
//
//        img {
//          width: 18px;
//          height: 18px;
//          margin-right: 14px;
//        }
//      }
//
//      .bottom_right {
//        margin-right: 8px;
//        font-size: 14px;
//        font-weight: 400;
//        color: rgba(25, 25, 25, 0.6);
//      }
//    }
//  }
//  .footer_content {
//    height: 238px;
//  }
//  .footer_top {
//    display: flex;
//    justify-content: space-between;
//    width: 100%;
//    height: 197px;
//  }
//  .footer_bottom {
//    height: 41px;
//  }
//  .top_right {
//    margin-top: 78px;
//  }
//  .right_right {
//    margin-right: 54px;
//  }
//}
</style>
