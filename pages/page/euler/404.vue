<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">404</block>
        </cu-custom>
        <view class="flex flex-direction justify-start align-center bg-white" style="height:100vh">
            <view class="flex justify-center margin-top-xl">
                <view class="cu-avatar round bg-white" style="width:350upx;height:350upx;background-image: url('static/commons/images/alertImg/img-cartoon-loading.png')"></view>
            </view>
            <view class="margin-top text-center text-bold text-black text-xxl">
                页面找不到
            </view>
            <view class="margin-top-xs text-center text-xl">
                请检查页面配置
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style>

</style>