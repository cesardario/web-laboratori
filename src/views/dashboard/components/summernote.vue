<template>
<div>
    <textarea ref="summernote" id="summernote" />
</div>
</template>

<script>
export default {
    computed: {
        summernote() {
            return $(this.$refs.summernote);
        }
    },
    mounted() {
        $(this.$refs.summernote).summernote({
            height: 100
        });
    },

    created() {
        this.summernote.summernote({
            heigh: 300
        })
    },
    methods: {
        getVal() {
            var data = $(this.$refs.summernote).summernote('code');
            return data;
        },
        run(code, value) {
            if (value == undefined) {
                $(this.$refs.summernote).summernote(code)
            } else {
                $(this.$refs.summernote).summernote(code, value)
            }
        }
    }
}
</script>
