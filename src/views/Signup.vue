<template>
  <div class="signup">
    <div class="signup__wrapper">
      <h1>회원가입</h1>
      <p>스낵 뉴스 어드민은 스낵 뉴스의 뉴스를 관리하기 위한 플랫폼입니다. <br />회원 가입 후, <strong>관리자의 승인 이후 사용이 가능</strong>합니다.</p>
      <signup-form @onSubmit="onSubmitHandler"/>
      <div class="signup__wrapper--go-to-signin">
        <router-link :to="{ name: 'Signin' }">혹시 회원이신가요?</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { signupWithEmail } from "@/api/auth";
  import SignupForm from "@/components/SignupForm/SignupForm.vue";

  @Component({
    components: {
      SignupForm
    }
  })
  export default class Signup extends Vue {
    constructor () {
      super();
    }
    async onSubmitHandler (payload: { emailId: string; password: string; }): Promise<void>{
      const response = await signupWithEmail(payload);
      if (response.isSuccess) {
        this.$snotify.success("회원가입이 완료되었습니다.");
        this.$router.push({ name: "Signin" });
      } else {
        this.$snotify.error(response.message);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .signup {
    display: flex;
    justify-content: center;
    align-content: center;
    .signup__wrapper {
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
      .signup__wrapper--go-to-signin {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
</style>
