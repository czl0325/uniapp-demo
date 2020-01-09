<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">菜单搜索</block>
        </cu-custom>
        <hm-search></hm-search>
    </view>
</template>

<script>
    import hmSearch from 'components/hm/hm-search'
    export default {
        data: function() {
            return {

            };
        },
        onLoad: function(options) {
        },
        components: {
            hmSearch
        }
    }
</script>

<style>

</style>
