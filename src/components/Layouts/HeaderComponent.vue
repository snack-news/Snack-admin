<template>
  <header class="header">
    <div class="header__wrap">
      <h1 class="header__logo">
        <img src="../../assets/logo.png" />
      </h1>
      <div class="header__profile">
        <span class="header__profile--photo">
          <img :src="photoURL" />
        </span>
        <div class="header__profile--name">
          <strong @click="onClickMenuHandler">{{ displayName }}</strong>
          <ul v-if="shownMenu">
            <li>
              <button type="button" @click="onClickSignoutHandler">로그아웃</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { State, Action } from "vuex-class";

  @Component({
    name: 'HeaderComponent',
  })
  export default class HeaderComponent extends Vue {
    shownMenu: boolean;
    constructor () {
      super();
      this.shownMenu = false;
    }

    @State(state => state.auth.displayName) displayName!: string;
    @State(state => state.auth.photoURL) photoURL!: string;
    @Action('auth/signout') signout!: () => Promise<void>;

    onClickMenuHandler (): void {
      this.shownMenu = !this.shownMenu;
    }
    async onClickSignoutHandler (): Promise<void> {
      await this.signout();
      this.$router.replace({ name: "Signin" });
    }
  }
</script>

<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    padding: 15px 0;
    border-bottom: 1px solid #ececec;
    background-color: white;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    .header__wrap {
      width: 1280px;
      margin: 0 auto;
    }
    .header__logo {
      float: left;
      height: 33px;
      img {
        width: auto;
        height: 100%;
      }
    }
    .header__profile {
      position: relative;
      float: right;
      .header__profile--photo {
        float: left;
        width: 32px;
        height: 32px;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .header__profile--name {
        float: left;
        strong {
          display: inline-block;
          line-height: 32px;
        }
        ul {
          position: absolute;
          top: 56px;
          left: 0;
          width: 120px;
          border: 1px solid #ececec;
          li {
            button {
              box-sizing: border-box;
              width: 100%;
              padding: 10px;
              font-size: 14px;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>
