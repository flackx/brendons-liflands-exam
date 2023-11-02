import { defineStore } from 'pinia'
import router from "../router"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      name: "Brendons",
      surname: "Liflands",
      code: "I21009",
      liked_songs: localStorage.liked_songs ? localStorage.liked_songs.split(",") : []
    },
    authenticated: localStorage.authenticated ?? false
  }),
  getters: {
    is_authenticated() {
      return this.authenticated;
    },
    getFavoriteSongs() {
      return this.user.liked_songs;
    }
  },
  actions: {
    setUserData(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },
    authenticate(email, password) {
      if (email === "test@test.com" && password === "123456") {
        localStorage.authenticated = true;
        this.authenticated = true;
        router.push("/").then(r => console.log(r) );
      }
    },
    logout() {
      localStorage.clear();
      this.authenticated = false;
      router.push("/login").then(r => console.log(r) );
    },
    toggleFavorite(songID) {
      console.log(this.user.liked_songs);
      const song_index = this.user.liked_songs.indexOf(songID);

      if (song_index < 0) {
        this.user.liked_songs.push(songID);
      } else {
        this.user.liked_songs.splice(song_index, 1);
      }
      localStorage.liked_songs = this.user.liked_songs;
    },
  },


})