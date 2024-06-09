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
    this.videoUrl = `http://localhost:5000/files/get/${this.filename}`;
  },
  mounted() {
    this.$refs.videoPlayer.addEventListener('error', (event) => {
      console.error('Video error:', event.target.error);
    });
  },
};
</script>

<style scoped>
video {
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 40px;
}
</style>
