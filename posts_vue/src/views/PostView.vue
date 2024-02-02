<template>
    <div class="post-page">
        <div class="back-button mb-4">
            <router-link to="/"
                class="back-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded clear">
                Wróć
            </router-link>
        </div>
        <div class="post" v-if="post">
            <Post :post="post" :user="user" :singular="true" />
            <div class="comments">
                <h2 class="font-medium text-2xl green mb-4">
                    Komentarze
                </h2>
                <div v-if="comments && !commentsLoading">
                    <div class="comment border-l-2 border-gray-700 p-2 mb-2" v-for="comment in comments" :key="comment.id">
                        <Comment :comment="comment" />
                    </div>
                </div>
                <div v-else-if="commentsLoading">
                    <p>
                        Ładowanie komentarzy...
                    </p>
                </div>
                <div v-else>
                    <p>
                        Brak komentarzy
                    </p>
                </div>
            </div>
        </div>
        <div class="error" v-else-if="error">
            <h1 class="font-medium text-3xl">
                Error
            </h1>
            <p>
                {{ errorMessage }}
            </p>
        </div>
        <div class="post" v-else-if="loading">
            <p>
                Ładowanie postu...
            </p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
import Comment from '../components/Comment.vue'
import Post from '../components/Post.vue'
export default {
    name: 'PostView',
    components: {
        RouterLink,
        Comment,
        Post,
    },
    data() {
        return {
            post: {},
            loading: true,
            error: false,
            errorMessage: '',
            user: {},
            userLoading: true,
            comments: [],
            commentsLoading: true,
            id: this.$route.params.id,
        }
    },
    methods: {
        getPost() {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
                .then(response => {
                    this.post = response.data
                    this.loading = false
                    this.getUser(this.post.userId)
                    this.getComments()

                })
                .catch(error => {
                    this.error = true
                    this.errorMessage = error.message
                    console.log(error)
                })
        },
        getUser(id) {
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => {
                    this.user = response.data
                    this.userLoading = false
                })
                .catch(error => {
                    this.error = true
                    this.errorMessage = error.message
                    console.log(error)
                })
        },
        getComments() {
            axios.get(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`)
                .then(response => {
                    this.comments = response.data
                    this.commentsLoading = false
                })
                .catch(error => {
                    this.error = true
                    this.errorMessage = error.message
                    console.log(error)
                })
        }
    },
    mounted() {
        this.getPost()
    }
}
</script>
