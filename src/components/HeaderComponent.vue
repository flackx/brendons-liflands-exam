
<template>
  <div id="main-header" class="active">
    <div class="wrapper-logo">
      <img src="@/assets/logo.svg"  alt="logo"/>
      <h2>KRAKEN.FM</h2>
    </div>
    <div class="wrapper-profile">
      <div class="section-user">
        <span class="avatar"></span>
        <h3>{{ full_name }}</h3>
      </div>
      <button @click="auth.logout()">LOGOUT</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    const auth = useAuthStore();
    return {
      auth
    }
  },
  computed: {
    full_name() {
      return `${this.auth.user.name} ${this.auth.user.surname}`;
    }
  }
}
</script>
