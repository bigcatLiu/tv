<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="../assets/img/tv-logo.png" alt="logo" />
      </div>
      <div class="title">DAFTAR LOWONGAN KERJA</div>
      <div class="date">{{nowDate}} WIB</div>
    </div>
    <div class="main" v-if="sData.length > 0">
      <div v-for="i in countInPage" :key="i" class="wrap">
        <div
          :key="i + curPage"
          class="box"
          :class="{ 'isFirstShow': isFirstShow }"
          :style="{ 'animation-delay': 0.17 * i + 's' }"
        >
          <div v-if="renderDate.front && renderDate.front[i-1]"
          :class="['front', (renderDate.front[i - 1].jobVacancy && renderDate.front[i - 1].jobVacancy === 0) ? 'gray': '']">
            <span class="num">{{renderDate.front[i - 1].index}}</span>
            <p class="job">ID Lowongan-{{ renderDate.front[i - 1].userJobId }}</p>
            <div class="center">
              <div class="company-logo" v-if="renderDate.front[i - 1].companyLogo">
                <img
                :src="renderDate.front[i - 1].companyLogo"/>
              </div>
              <div v-else>
              <img  src="../assets/img/logo.png" />
              </div>
              <div class="company-des">
                <p>{{ subName(renderDate.front[i - 1].jobTitle,18) }}</p>
                <p>{{ subName(renderDate.front[i - 1].companyName,20) }}</p>
              </div>
            </div>
             <div class="salary">
              <img src="../assets/img/tv-icon-salary.png" />
              <span>{{ renderDate.front[i - 1].unitName }}{{ renderDate.front[i - 1].salaryFormat }}/{{
                renderDate.front[i - 1].salaryUnitName }}</span>
            </div>
           <p class="address">
              <img src="../assets/img/tv-icon-address.png" />
              <span>
                {{ renderDate.front[i - 1].workFromHome === 1 ? 'Kerja Dari Rumah' :( renderDate.front[i - 1].countyName ? renderDate.front[i - 1].countyName :'-' )}}
              </span>
            </p>
            <div class="bot jobRed" v-if="renderDate.front[i - 1].jobVacancy && renderDate.front[i - 1].jobVacancy === 1">
              <img src="../assets/img/icon-red.png" />
              <span
                >Dibutuhkan {{ renderDate.front[i - 1].jobVacancy }} orang</span
              >
            </div>
            <div class="bot" v-else>
              <img src="../assets/img/tv-icon-bot.png" />
              <span
                >Dibutuhkan {{ renderDate.front[i - 1].jobVacancy }} orang</span
              >
            </div>
          </div>
          <div v-else class="front no-date">no Date</div>
          <div v-if="renderDate.back && renderDate.back[i-1]"
          :class="['back',(renderDate.back[i - 1].jobVacancy && renderDate.back[i - 1].jobVacancy === 0) ? 'gray': '']">
             <span class="num">{{renderDate.back[i -1].index}}</span>
           <p class="job">ID Lowongan-{{ renderDate.back[i - 1].userJobId }}</p>
            <div class="center">
              <div class="company-logo" v-if="renderDate.back[i - 1].companyLogo">
                <img
                :src="renderDate.back[i - 1].companyLogo"/>
              </div>
              <div v-else>
              <img  src="../assets/img/logo.png" />
              </div>
              <div class="company-des">
                <p>{{ subName(renderDate.back[i - 1].jobTitle,18) }}</p>
                <p>{{ subName(renderDate.back[i - 1].companyName,20) }}</p>
              </div>
            </div>
             <div class="salary">
              <img src="../assets/img/tv-icon-salary.png" />
              <span>{{ renderDate.back[i - 1].unitName }}{{ renderDate.back[i - 1].salaryFormat }}/{{
                renderDate.back[i - 1].salaryUnitName }}</span>
            </div>
           <p class="address">
              <img src="../assets/img/tv-icon-address.png" />
              <span>
              {{ renderDate.back[i - 1].workFromHome === 1 ? 'Kerja Dari Rumah' :( renderDate.back[i - 1].countyName ? renderDate.back[i - 1].countyName :'-' )}}
              </span>
            </p>
            <div class="bot jobRed" v-if="renderDate.back[i - 1].jobVacancy && renderDate.back[i - 1].jobVacancy === 1">
              <img src="../assets/img/icon-red.png" />
              <span
                >Dibutuhkan {{ renderDate.back[i - 1].jobVacancy }} orang</span
              >
            </div>
            <div class="bot" v-else>
              <img src="../assets/img/tv-icon-bot.png" />
              <span
                >Dibutuhkan {{ renderDate.back[i - 1].jobVacancy }} orang</span
              >
            </div>
          </div>
          <div v-else class="back no-date">no Date</div>
        </div>
      </div>
    </div>
    <div class="no-date" v-else>
      <div>
      <img src="../assets/img/icon-nodate.png" />
      <p>Semua posisi sudah penuh, silakan download aplikasi KUPU untuk melihat posisi lainnya.</p>
      </div>
    </div>
    <div  class="current-page">
      <div class="page" v-if="totalPages">
        <span
        v-for="i in totalPages"
        :key="i"
        :class="{ cur: i === curPage +1 }"/>
      </div>
      <p class="copyRgiht">www.kupu.id | PT Dalligent Solusi Indonesia</p>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      nowDate:'',
      sData: [], // 此处应该用真实的数据源
      curPage: 0, // 当前是第几页
      countInPage: 15, // 每页有几张图片
      timer: null,
      dateTimer:null,
      totalPages: 0, //  数据总页面,底部页数切换
      delay: 0, // 延迟多少秒
      isFirstShow: true // 是否是第一次显示
    };
  },
  computed: {
    renderDate() {
      const { curPage, countInPage, sData, totalPages } = this;
      const obj = {};
      if (curPage > 0) { // 从0跳到1，不是第一次显示
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isFirstShow = false
      }
      if (sData.length > 0) {
        let p1f, p1t, p2f, p2t;
        if (!curPage) { // 第0页
          p1f = (totalPages -1) * countInPage;
          p1t = p1f + countInPage;
          p2f = 0;
          p2t = p2f + countInPage;
          if (this.isFirstShow) { // 第一次显示，翻页前与翻页后显示同样的数据
            p1f = p2f;
            p1t = p2t;
          }
        } else if (curPage < totalPages) { // 中间页
          p1f = (curPage - 1) * countInPage;
          p1t = p1f + countInPage;
          p2f = p1t;
          p2t = p2f + countInPage;
        }/* else { // 最后1页
          p1f = (curPage - 1) * countInPage;
          p1t = p1f + countInPage;
          p2f = 0;
          p2t = p2f + countInPage;
        }*/
        obj.front = sData.slice(p1f, p1t);
        obj.back = sData.slice(p2f, p2t);
        // console.log('obj',obj)
        // console.log("curPage: ", totalPages, curPage, ', p1: ', p1f, p1t, ', p2: ', p2f, p2t, ' --> p1: ', obj.front, obj.back);
      }
      return obj;
    },
  },
  watch: {
  },
  created() {
    this.getDate();
    this.currentTime()
  },
  mounted() {
    this.changePage();
  },
  destroyed(){
    if(this.timer) {this.timer = null }
    if(this.dateTimer) {this.dateTimer = null}
  },
  methods: {
    subName(str,num){
      return str.length > 18 ? str.substr(0,num)+'...':str
    },
    currentTime(){
      setInterval(()=>{
        this.formatDate(),60000
      })
    },
    formatDate(){
      const monthLang = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      let date = new Date()
      let day = date.getDate()
      let month = date.getMonth()
      let year = date.getFullYear()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      month = monthLang[month]
      hours = hours < 10 ? '0'+ hours : hours
      minutes = minutes < 10 ? '0'+ minutes :minutes
      this.nowDate = day+ ' ' + month+' ' + year + ', '+ hours +':'+ minutes
    },
    getQueryStringByName(name) {
      var result = document.location.search.match(
        new RegExp("[?&]" + name + "=([^&]+)", "i")
      );
      if (result == null || result.length < 1) {
        return "";
      }
      return result[1];
    },
    async getDate() {
      const { countInPage } = this;
      const params = {
        pageNum: 1,
        pageSize: 1000,
        siteId: this.getQueryStringByName("siteId") || 15,
      };
      const url = 'https://pre-api.kupu.id/position/position/getSiteJobById'
      const res = await axios.get(url,{ params: params ,headers:{'Accept-Language': 'idl'}});
      this.sData = res.data.body.records
      this.sData.forEach((item,index)=>{
        item['index']= index < 10 ? '00'+(index+1) : '0' + (index+1)
        // this.delay = item.space
      })
      this.delay = this.sData.length ? this.sData[0].space*1000 : this.delay
      this.totalPages = Math.ceil(this.sData.length/ countInPage);
      if(this.isFirstShow){
        this.timer = setTimeout(this.changePage, this.delay);
      }
    },
    changePage() {
      const {isFirstShow, sData, countInPage, delay}  = this;
      this.curPage++;
      if (this.curPage >= Math.ceil(sData.length / countInPage)) {
        this.curPage = 0;
        if(this.curPage === 0 && !isFirstShow){
          this.getDate()
        }
      }
      if(this.delay !== 0){
        this.timer = setTimeout(this.changePage, delay+1000);
      }
      
    }
  },
};
</script>
<style lang="scss" scoped>
@keyframes flipX {
  0% {
    transform: rotateX(0deg) scale3d(1, 1, 1);
  }
  50% {
    transform: rotateX(90deg) scale3d(1, 1, 1);
  }
  100% {
    transform: rotateX(180deg) scale(1);
  }
}

.container {
  font-family: Lato-Bold, Lato;
  overflow: hidden;
  & {
    background-color:#000000;
    width: 100vw;
    margin: 0 auto;
    height: 100%;
  }
  .header {
    width: 100%;
    margin:20px 0px 20px 0px ;
    padding: 0px 60px 0px 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      width: 235px;
      height: 50px;
      flex-grow: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
      line-height: 27px;
      flex-grow: 1;
      text-align: center;
    }
    .date {
      min-width: 280px;
      font-size: 25px;
      font-weight: bold;
      color: #ffffff;
      line-height: 30px;
      flex-grow: 0;
    }
  }
  .main {
    font-size: 0px;
    // height: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .no-date{
    width: 100%;
    height: 85vh;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items: center;
    img{
      display: inline-block;
      width: 200px;
      height: 200px;
    }
    p{
      height: 29px;
      font-size: 24px;
      font-family: Lato-BoldItalic, Lato;
      font-weight: normal;
      color: #E4E4E4;
      line-height: 29px;
      margin-top: 60px;
    }
  }

  .wrap {
    width: 19.6vw;
    margin: 0 0 0.5vw 0;
    height: 296px;
    display: inline-block;
    perspective-origin: center center;
    .box {
      width: 100%;
      height: 296px;
      transform-style: preserve-3d;
      position: relative;
      transform-origin: center;
      transform: rotateX(0deg);
      animation: flipX 1.1s ease-in-out 1 forwards;
      &.isFirstShow{ // 第一次显示，不翻转，没有动画效果
        animation: none;
      }
      .front,
      .back {
        // overflow: hidden;
        width: 100%;
        height: 100%;
        padding: 20px;
        position: absolute;
        left: 0px;
        top: 0px;
        background: #ffffff;
        backface-visibility: hidden;
        border-radius: 10px;
        font-size: 12px;
        z-index: 1;
        box-sizing: border-box;
        &.no-date {
          background: #000000;
        }
        .job {
          font-family: Lato-Bold, Lato;
          font-size: 18px;
          font-weight: bold;
          color: #101010;
          line-height: 22px;
        }

        .center {
          display: flex;
          flex-direction: row;
          margin-top: 26px;
          height: 65px;
          overflow: hidden;
          padding-bottom: 15px;
          margin-bottom: 15px;
          img {
            width: 64px;
            height: 64px;
            border: 1px solid #d8d8d8;
            border-radius: 8px;
            display: inline-block;
          }
          .company-des {
            margin-left: 10px;
            p {
              font-family: Lato-Bold, Lato;
              font-size: 21px;
              font-weight: bold;
              color: #101010;
            }
            p:last-child {
              font-family: Lato-Regular, Lato;
              font-size: 18px;
              font-weight: 400;
              color: #007580;
            }
          }
        }
        .bot {
          &.jobRed{
            color:#F10353;
          }
          display: flex;
          align-items: center;
          border-top: 1px solid #979797;
          padding: 18px 10px 3px 0px;
          margin-top: 22px;
          border-radius: 0px;
          overflow: hidden;
          font-family: Lato-Regular, Lato;
          box-sizing: border-box;
          span {
            display: block;
            height: 24px;
            line-height: 24px;
            font-size: 18px;
            font-family: Lato-Regular, Lato;
            // color: #101010;
            margin-left: 6px;
          }
          img {
          width: 24px;
          height: 24px;
          margin-right: 6px;
        }
        }
        .salary {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: Lato-Black, Lato;
          height: 30px;
          font-size: 25px;
          // font-family: Helvetica;
          color: #007580;
          line-height: 30px;
          font-weight: 900;
          margin-bottom: 10px;
          span{
            font-family: Lato-Black, Lato;
          }
        }
        .address {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: Lato-Regular, Lato;
          height: 24px;
          font-size: 18px;
          font-weight: 400;
          color: #101010;
          line-height: 24px;
          span{
          font-family: Lato-Regular, Lato;
          }
        }
        img {
          width: 24px;
          height: 24px;
          margin-right: 6px;
          // display: inline-block;
          // vertical-align: middle;
        }
        .num {
          font-family: Lato-Bold, Lato;
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 30px;
          font-weight: bold;
          line-height: 36px;
        }
        &.gray{
          background-color:#E5E5E5 ;
          color:  #808080;
          .company-des{
            p{
                color:  #808080;
                &:last-child{
                  color:  #808080;
                }
            }
          }
          p{
            color: inherit;
          }
        }
      }
      .back {
        width: 99.999%;
        height: 100%;
        padding: 20px;
        background: #ffffff;
        backface-visibility: hidden;
        border-radius: 10px;
        font-size: 12px;
        position: absolute;
        left: 0px;
        top: 0px;
        -webkit-transform: rotateX(-180deg);
        -ms-transform: rotateX(-180deg);
        -moz-transform: rotateX(-180deg);
        transform: rotateX(-180deg);
        z-index: 2;
        // -webkit-transform-origin: top top;
        // -ms-transform-origin: top top;
        // -moz-transform-origin: top top;
        // transform-origin: top top;
        // -webkit-transform-style: preserve-3d;
        // -ms-transform-style: preserve-3d;
        // -moz-transform-style: preserve-3d;
        // transform-style: preserve-3d;
        // box-sizing: border-box;
        // transform: translateY(180px) rotateX(-180deg);
      }
    }

    // .back{
    //   width: 100%;
    //   height: 100%;
    //   padding: 20px;
    //   position: absolute;
    //   left: 0px;
    //   top: 0px;
    //   background: #FFFFFF;
    //   transform: rotateX(180deg);
    //   backface-visibility: hidden;
    // }
  }
}
.current-page {
  width: 100%;
  position: fixed;
  bottom: 35px;
  height: 42px;
  line-height: 42px;
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  .copyRgiht{
    position: absolute;
    right: 60px;
    top:20px;
    text-align: right;
    font-size: 25px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 30px;
  }
  span {
    margin-top: 30px;
    display: inline-block;
    width: 18px;
    height: 7px;
    background: #c7c7c7;
    margin-right: 7px;
    border-radius: 7.5px;
    &.cur {
      width: 32px;
      background: #007580;
    }
  }
}
</style>

