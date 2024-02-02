<template>
    <div class="comment-name">
        <p class="font-medium text-lg">
            {{ comment.name }}
        </p>
    </div>
    <div class="comment-body">
        <p class="text-gray-500 text-sm mb-2 pl-2">
            {{ comment.body }}
        </p>
    </div>
</template>
<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    }
}
</script>