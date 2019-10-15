<template>
  <div class="signin">
    <div class="signin__wrapper">
      <h1>회원가입</h1>
      <p>스낵 뉴스 어드민은 스낵 뉴스의 뉴스를 관리하기 위한 플랫폼입니다.</p>
      <signin-form @onSubmit="onSubmitHandler"/>
      <button class="btn btn-secondary btn-lg btn-block" @click="onClickGoogleAuthHandler">구글로 로그인하기</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SigninForm from '@/components/SigninForm/SigninForm.vue'
  import { googleAuth } from "@/api/auth";

  @Component({
    components: {
      SigninForm
    }
  })
  export default class Signin extends Vue {
    output: string;
    constructor () {
      super();
      this.output = '';
    }
    onClickGoogleAuthHandler (): void {
      googleAuth().then(res => {
        if (res.isSuccess) {
          this.$snotify.success(`${res.data.displayName} 님, 환영합니다.`);
          this.$router.replace({ name: "ArticleList" });
        } else {
          this.$snotify.error(res.message);
        }
      })
    }
    onSubmitHandler (payload: { userId: string; password: string; }): void {
      alert("이메일을 통한 로그인은 현재 지원하지 않습니다.")
    }
  }
</script>
<style lang="scss" scoped>
  .signin {
    display: flex;
    justify-content: center;
    align-content: center;
    .signin__wrapper {
      box-sizing: border-box;
      width: 560px;
      padding: 40px 30px;
      background-color: white;
      border-radius: 5px;
      h1 {
        margin-bottom: 16px;
        font-size: 36px;
      }
      p {
        margin-bottom: 20px;
      }
      /deep/ .btn{
        margin-top: 20px;
      }
    }
  }
</style>
