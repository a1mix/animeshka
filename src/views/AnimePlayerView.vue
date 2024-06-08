<template>
    <div>
      <video ref="videoPlayer" :src="videoUrl" controls></video>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AnimePlayerView',
    data() {
      return {
        videoUrl: '',
        currentTime: 0,
        videoDuration: 0
      };
    },
    mounted() {
      console.log(this.$route.params)
      this.videoUrl = require('@/assets/videos/' + this.$route.params.id)
      this.$refs.videoPlayer.addEventListener('loadedmetadata', () => {
        this.videoDuration = this.$refs.videoPlayer.duration;
      });
    },
    methods: {
      startVideo() {
        this.$refs.videoPlayer.play();
      },
      stopVideo() {
        this.$refs.videoPlayer.pause();
      },
      seekVideo() {
        this.$refs.videoPlayer.currentTime = this.currentTime;
      },
      toggleFullScreen() {
        if (this.$refs.videoPlayer.requestFullscreen) {
          this.$refs.videoPlayer.requestFullscreen();
        } else if (this.$refs.videoPlayer.mozRequestFullScreen) {
          this.$refs.videoPlayer.mozRequestFullScreen();
        } else if (this.$refs.videoPlayer.webkitRequestFullscreen) {
          this.$refs.videoPlayer.webkitRequestFullscreen();
        } else if (this.$refs.videoPlayer.msRequestFullscreen) {
          this.$refs.videoPlayer.msRequestFullscreen();
        }
      }
    }
  }) 
  </script>

<style scoped>
video {
    width: 70%;
    border: 1px solid #ccc; /* Добавляем рамку */
    border-radius: 8px; /* Закругляем углы */
    margin: 40px;
}

input[type="range"] {
    width: 60%;
    margin-top: 10px;
}
</style>