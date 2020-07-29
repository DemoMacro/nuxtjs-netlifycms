<template>
  <div v-html="blogPost.default"></div>
</template>

<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload };
    else
      return {
        blogPost: await require(`~/assets/content/blog/README.md`)
      };
  }
};
</script>
