<template>
  <div id="about-view">
    <div class="wrapper-header">
      <h1>ABOUT ME</h1>
      <div class="settings">
        <button id="btn-edit" :class="{ active: edit_form }" @click="edit_form = !edit_form">{{ edit_form ? "Cancel" : "Edit Form" }}</button>
        <button id="btn-save" v-if="edit_form" class="submit" @click="saveForm()">Save Form</button>
      </div>
    </div>
    <form>
      <div class="wrapper-input">
        <label>NAME</label>
        <input id="input-name" v-if="edit_form" v-model="user_form.name" />
        <p id="txt-name" v-else>{{ auth.user.name.toLocaleUpperCase() }}</p>
      </div>
      <div class="wrapper-input">
        <label>SURNAME</label>
        <input id="input-surname" v-if="edit_form" v-model="user_form.surname" />
        <p id="txt-surname" v-else>{{ auth.user.surname.toLocaleUpperCase() }}</p>
      </div>
      <div class="wrapper-input">
        <label>STUDENT CODE</label>
        <input id="input-code" v-if="edit_form" v-model="user_form.code" />
        <p id="txt-code" v-else>{{ auth.user.code.toLocaleUpperCase() }}</p>
      </div>
      <div class="wrapper-songs">
        <label>FAVORITE SONGS</label>
        <ul v-if="favorite_songs.length > 0">
          <li v-for="song in favorite_songs">
            <img id="img-album" :src="song.album.images[1].url" />
            <div class="song-info">
              <p id="txt-song" class="song-name">{{ song.name }}</p>
              <p id="txt-artist" class="song-artists">{{ getArtists(song.artists) }}</p>
            </div>
          </li>
        </ul>
        <div id="txt-empty" v-else class="empty">NO SONGS FOUND</div>
      </div>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import songsAPI from '../data/songs'
import IconEdit from '../components/icons/IconEdit.vue'

export default {
  components: { IconEdit },
  data() {
    const auth = useAuthStore();
    return {
      auth,
      edit_form: false,
      user_form: {
        name   : auth.user.name,
        surname: auth.user.surname,
        code   : auth.user.code
      }
    }
  },
  methods: {
    getArtists(artists) {
      return artists.map(artist => artist.name).join(", ");
    },
    saveForm() {
      this.auth.setUserData(this.user_form.name, this.user_form.surname, this.user_form.code);
      this.edit_form = false;
    }
  },
  computed: {
    favorite_songs() {
      return this.auth.getFavoriteSongs.map(songID => {
        return songsAPI.find(song => song.id === songID);
      });
    }
  }
}
</script>