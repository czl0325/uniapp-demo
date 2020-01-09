<!--属性：
show: 是否显示loading
-->
<template>
    <view v-if="show" class="cu-load loading"></view>
</template>
<script>
    export default {
        name: 'hm-loading',
        props: {
            show: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style>

</style>
