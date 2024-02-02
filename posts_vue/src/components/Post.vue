<template>
    <h2 class="font-medium text-2xl" v-if="!singular">
        {{ trimWords(post.title, 5) }}
    </h2>
    <h1 class="font-medium text-3xl green mb-4" v-else>
        {{ post.title }}
    </h1>
    <div class="post-body">
        <p>
            {{ !singular ? trimWords(post.body, 10) : post.body }}
        </p>
    </div>
    <p class="text-gray-500 text-sm text-right">
        <span v-if="user.name">
            {{ user.name }}
        </span>
        <span v-else>
            Ładowanie użytkownika...
        </span>
    </p>
</template>
<script>

import { RouterLink } from 'vue-router'
export default {
    props: {
        post: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        singular: {
            type: Boolean,
            default: false
        }
    },
    components: {
        RouterLink
    },
    methods: {
        trimWords(text, numberOfWords = 5) {
            if (text) {
                const words = text.split(' ')
                const trimmedText = words.slice(0, numberOfWords).join(' ')
                if (words.length > numberOfWords) {
                    return trimmedText + '...'
                }
                return trimmedText
            }
            return ''
        },
    }
}
</script>