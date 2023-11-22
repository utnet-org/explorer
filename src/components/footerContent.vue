<script setup lang="ts">
</script>
<template>
  <div class="footer_content">
    <div class="footer_top">
      <div class="top_left">
        <div class="icon_title">
          <div class="bg"><img src="../assets/images/logo.png" alt="" /></div>
          <div class="title">Utility 公链提供支持</div>
        </div>
        <!--        <div class="text">-->
        <!--          UtilityScan is a Blockchain explorer and analytics platform for-->
        <!--          Utility Chain.-->
        <!--        </div>-->
      </div>
      <div class="top_right">
        <div class="right_left">
          <div class="Company">联系我们</div>
          <div style="display: flex; align-items: center">
            <img src="../assets/images/twitter.png" alt=""
                 style="width: 15px;height: 15px; margin-right: 5px" />Twitter
          </div>
          <div style="display: flex; align-items: center">
            <img src="../assets/images/telegram.png" alt=""
                 style="width: 15px;height: 15px; margin-right: 5px" />Telegram
          </div>
          <div style="display: flex; align-items: center">
            <img src="../assets/images/email.png" alt=""
                 style="width: 15px;height: 15px; margin-right: 5px" />邮箱
          </div>
        </div>
        <div class="right_center">
          <div class="Company">社区</div>
          <div>白皮书</div>
          <div>API文档</div>
          <div>开发指南</div>
        </div>
        <div class="right_right">
          <div class="Company">产品服务</div>
          <div><span>官网</span></div>
          <div><span>App移动端</span></div>
          <div><span>浏览器钱包</span></div>
        </div>
      </div>
    </div>
    <div class="footer_bottom">
      <div class="father_bottom">
        <!--        <div class="bottom_left">-->
        <!--          -->
        <!--          <img src="../assets//images/twitter.png" alt="" />-->
        <!--          <img src="../assets/images/telegram.png" alt="" />-->
        <!--        </div>-->
        <div class="bottom_right">@ 2023 Utility All Rights Reserved</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.footer_content {
  width: 100%;
  background: var(
      --9-bded-6,
      linear-gradient(180deg, rgba(155, 222, 214, 0.72) 0%, #9bded6 100%)
  );
  backdrop-filter: blur(5px);
  
  .footer_top {
    .top_left {
      .icon_title {
        padding-top: 20px;
        margin-bottom: 17px;
        margin-left: 32px;
        display: flex;
        align-items: center;
        
        .bg {
          width: 55px;
          height: 55px;
          background-color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        img {
          width: 32px;
          height: 37px;
        }
        
        .title {
          margin-left: 8px;
          font-size: 20px;
          font-weight: 600;
          color: #191919;
        }
      }
      
      .text {
        margin-left: 32px;
        font-size: 14px;
        font-weight: 600;
        color: #191919;
      }
    }
    
    .top_right {
      display: flex;
      
      .right_left,
      .right_center,
      .right_right {
        display: flex;
        flex-direction: column;
        
        .Company {
          font-size: 16px;
          font-weight: 600;
          color: #191919;
          margin-bottom: 8px;
        }
        
        div {
          margin-top: 4px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(25, 25, 25, 0.8);
        }
      }
      
      .right_center {
        margin: 0 70px;
      }
      
      .right_right {
        span:hover {
          cursor: pointer; //鼠标移上去变成小手
          border-bottom: 1px solid #0facb6;
          color: #0facb6;
        }
      }
    }
  }
  
  .footer_bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    align-items: center;
    
    .father_bottom {
      display: flex;
      justify-content: end;
      border-top: 0.5px solid rgba(25, 25, 25, 0.3);
      width: 100%;
      margin: 0 16px;
      height: 100%;
      align-items: center;
    }
    
    .bottom_left {
      display: flex;
      margin-left: 9px;
      
      img {
        width: 18px;
        height: 18px;
        margin-right: 14px;
      }
    }
    
    .bottom_right {
      margin-right: 8px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(25, 25, 25, 0.6);
    }
  }
}

@media (min-width: 1440px) {
  .footer_content {
    height: 238px;
  }
  .footer_top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 197px;
  }
  .footer_bottom {
    height: 41px;
  }
  .top_right {
    margin-top: 78px;
  }
  .right_right {
    margin-right: 54px;
  }
}

@media (min-width: 834px) and (max-width: 1439px) {
  .footer_content {
    height: 377px;
    
    .footer_top {
      width: 100%;
      height: 332px;
    }
    
    .top_right {
      display: flex;
      justify-content: end;
      margin-top: 71px;
    }
  }
  .footer_bottom {
    height: 45px;
  }
  .right_right {
    margin-right: 29px;
  }
}

@media (max-width: 833px) {
  .footer_content {
    height: 335px;
    
    .footer_top {
      width: 100%;
      height: 298px;
    }
    
    .top_right {
      display: flex !important;
      justify-content: end !important;
      margin-top: 50px !important;
    }
  }
  .footer_bottom {
    height: 37px;
  }
  .right_center {
    margin: 0 14px !important;
  }
  .bg {
    width: 44px !important;
    height: 44px !important;
    
    img {
      width: 25px !important;
      height: 29px !important;
    }
  }
  .title {
    font-size: 15px !important;
  }
  .text {
    font-size: 12px !important;
    margin-right: 110px;
  }
  .top_right {
    .right_left,
    .right_center,
    .right_right {
      .Company {
        font-size: 12px !important;
        margin-bottom: 3px !important;
      }
      
      //div {
      //  margin-top: 0px !important;
      //  font-size: 1px !important;
      //}
    }
  }
  .right_right {
    margin-right: 10px;
  }
  
  .bottom_right {
    font-size: 10px !important;
  }
}
</style>
