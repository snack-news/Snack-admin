<template>
  <div class="signin-form">
    <b-form @submit.prevent="onSubmitHandler">
      <b-form-group id="emailId"
                    label="아이디"
                    label-for="emailId">
        <b-form-input id="emailId"
                      v-model="emailId"
                      type="text"
                      required
                      placeholder="아이디를 입력하세요."></b-form-input>
      </b-form-group>
      <b-form-group id="password"
                    label="비밀번호"
                    label-for="password">
        <b-form-input id="password"
                      v-model="password"
                      type="password"
                      required
                      placeholder="비밀번호를 입력하세요."></b-form-input>
      </b-form-group>
      <div class="signin-form__button">
        <b-button block
                  size="lg"
                  type="submit"
                  variant="primary">
          로그인
        </b-button>
      </div>
    </b-form>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class SigninForm extends Vue {
    emailId: string;
    password: string;
    constructor () {
      super();
      this.emailId = '';
      this.password = '';
    }
    onSubmitHandler () {
      const { emailId, password } = this;
      this.$emit('onSubmit', { emailId, password });
    }
  }
</script>
<style lang="scss" scoped>
  .signin-form {
    .signin-form__button {
      margin-top: 30px;
    }
  }
</style>
