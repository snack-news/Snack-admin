<template>
  <div class="signin">
    <div class="signin__wrapper">
      <h1>로그인</h1>
      <p>스낵 뉴스 어드민은 스낵 뉴스의 뉴스를 관리하기 위한 플랫폼입니다.</p>
      <signin-form @onSubmit="onSubmitHandler"/>
      <button class="btn btn-secondary btn-lg btn-block" @click="onClickGoogleAuthHandler">구글로 로그인하기</button>
      <div class="signin__wrapper--go-to-signup">
        <router-link class="signin__wrapper__go-to-signup" :to="{ name: 'Signup' }">아직 회원이 아니신가요?</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SigninForm from '@/components/SigninForm/SigninForm.vue'
  import { checkPermission, emailAuth, googleAuth } from "@/api/auth";

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
    async onClickGoogleAuthHandler (): Promise<void> {
      const response = await googleAuth();
      if (response.isSuccess) {
        this.$snotify.success(`${response.data.displayName} 님, 환영합니다.`);
        this.$router.replace({ name: "ArticleList" });
      } else {
        this.$snotify.error(response.message);
      }
    }
    async onSubmitHandler (payload: { emailId: string; password: string; }): Promise<void> {
      const response = await emailAuth(payload);
      if (response.isSuccess) {
        const hasPermission = await checkPermission(response.data.uid);
        if (hasPermission) {
          this.$snotify.success(`${response.data.displayName} 님, 환영합니다.`);
        } else {
          this.$snotify.error("관리자의 승인 요청 중입니다.");
        }
      } else {
        this.$snotify.error(response.message);
      }
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
      .signin__wrapper--go-to-signup {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
</style>
