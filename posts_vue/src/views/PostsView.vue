<template>
    <div class="posts-page" v-if="!error">
        <h1 class="font-medium text-3xl">
            Posty
        </h1>

        <div class="error" v-if="error">
            <h1 class="font-medium text-3xl">
                Error
            </h1>
            <p>
                {{ errorMessage }}
            </p>
        </div>
        <div class="posts" v-else-if="postsLoading">
            <p>
                Ładowanie postów...
            </p>
        </div>
        <div class="posts" v-else-if="posts.length > 0">
            <div v-for="post in paginatedPosts" :key="post.id"
                class="post rounded-lg shadow-lg mb-4 p-0 mt-4 border border-gray-800 shadow-md">
                <router-link :to="`/post/${post.id}`" class="clear block m-0 p-4">
                    <h2 class="font-medium text-2xl">
                        {{ trimWords(post.title, 4) }}
                    </h2>
                    <p v-if="users.length > 0 && users[post.userId]">
                        {{ users[post.userId].name }}
                    </p>
                    <p v-else>
                        Ładowanie użytkownika...
                    </p>
                    <div class="post-body">
                        <p>
                            {{ trimWords(post.body, 7) }}
                        </p>
                    </div>
                </router-link>
            </div>
            <div class="pagination flex justify-between items-center" v-if="pageCount > 1">
                <button class="pagination-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                    Poprzednia strona
                </button>
                <span class="pagination-current-page">
                    {{ currentPage }}/ {{ pageCount }}
                </span>
                <button class="pagination-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    :disabled="currentPage === pageCount" @click="changePage(currentPage + 1)">
                    Następna strona
                </button>
            </div>
        </div>
    </div>
    <div class="posts" v-else>
        <p>
            Brak postów
        </p>
    </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
    name: 'PostsView',
    components: {
        RouterLink
    },
    data() {
        return {
            posts: [],
            postsLoading: true,
            error: false,
            errorMessage: '',
            users: [],
            postsPerPage: 4,
            currentPage: this.$route.query.page || 1,
            pageCount: 0
        }
    },
    computed: {
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.postsPerPage
            const end = start + this.postsPerPage
            return this.posts.slice(start, end)
        }
    },
    methods: {
        /**
         * Fetches posts from the API and populates the 'posts' data property.
         * Calls the 'getUsersForPosts' method after successfully fetching the posts.
         * Sets the 'error' flag and 'errorMessage' if an error occurs.
         */
        trimWords(text, numberOfWords = 5) {
            const words = text.split(' ')
            const trimmedText = words.slice(0, numberOfWords).join(' ')
            if (words.length > numberOfWords) {
                return trimmedText + '...'
            }
            return trimmedText
        },
        countWords(text) {
            return text.split(' ').length
        },
        getPosts() {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    this.posts = response.data
                    this.pageCount = Math.ceil(this.posts.length / this.postsPerPage)
                    this.getUsersForPosts()
                    this.postsLoading = false
                    if (this.currentPage > this.pageCount) {
                        this.changePage(this.pageCount)
                    }
                })
                .catch(error => {
                    this.error = true
                    this.errorMessage = error.message
                    console.log(error)
                })
        },

        /**
         * Iterates over the 'posts' array and calls the 'getUser' method for each post.
         */
        getUsersForPosts() {
            this.posts.forEach(post => {
                this.getUser(post.userId)
            })
        },

        /**
         * Fetches user data from the API based on the provided user ID and adds it to the 'users' array.
         * Logs an error message if an error occurs.
         * 
         * @param {number} id - The ID of the user to fetch.
         */
        getUser(id) {
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => {
                    this.users.push(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        /**
         * Changes the current page and updates the URL query parameter.
         * 
         * @param {number} page - The new page number.
         */
        changePage(page) {
            if (page < 1) {
                page = 1
            } else if (page > this.pageCount) {
                page = this.pageCount
            }
            this.currentPage = page
            this.$router.push({ query: { page: this.currentPage } })
        }
    },
    mounted() {
        this.getPosts()
    }
}
</script>
