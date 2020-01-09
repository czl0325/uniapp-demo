<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">网络不给力</block>
        </cu-custom>
        <view class="flex flex-direction justify-start align-center bg-white" style="height:100vh">
            <view class="flex justify-center margin-top-xl">
                <view class="cu-avatar round bg-white" style="width:350upx;height:350upx;background-image: url('static/commons/images/alertImg/img-cartoon-nowifi.png')"></view>
            </view>
            <view class="margin-top text-center text-bold text-black text-xxl">
                网络不给力
            </view>
            <view class="margin-top-xs text-center text-xl">
                <view @tap="back" class="g-footer flex justify-center">
                    <view class="cu-btn block bg-info df" style="border-radius: 40upx;width: 300upx;height: 70upx">
                        <view>返回</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            back: function () {
                uni.navigateBack();
            }
        }
    }
</script>

<style>

</style>