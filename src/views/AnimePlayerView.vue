<template>
  <div>
    <video ref="videoPlayer" controls>
      <source :src="videoUrl" type="video/mp4">
      Ваш браузер не поддерживает тег video.
    </video>
  </div>
</template>

<script>
export default {
  name: 'AnimePlayerView',
  data() {
    return {
      filename: '',
      videoUrl: '',
    };
  },
  created() {
    this.filename = this.$route.params.filename;
    this.videoUrl = `http://localhost:5000/files/get/${this.filename}`
  }
};
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