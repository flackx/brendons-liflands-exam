<template>
  <Header v-if="auth.is_authenticated"></Header>
  <div id="section-body">
    <Navigation v-if="auth.is_authenticated"></Navigation>
    <router-view class="section-router"></router-view>
  </div>
  <div id="section-player">
    <AudioPlayer v-if="auth.is_authenticated"></AudioPlayer>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
import AudioPlayer from '@/components/AudioPlayerComponent.vue';
import Navigation from '@/components/NavigationComponent.vue'
import { useAuthStore } from './stores/auth';

export default {
  data() {
    const auth = useAuthStore();
    return {
      auth
    }
  },
  components: {
    Header,
    Navigation,
    AudioPlayer
  }
}
</script>
