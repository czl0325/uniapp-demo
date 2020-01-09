<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">版本升级</block>
        </cu-custom>
        <view class="bg-white" style="height: 100vh">
            <view class="flex justify-center align-center">
                <view class="text-center padding text-black">版本号1.0.0</view>
            </view>
            <view class="cu-list menu-avatar margin-bottom-lg">
                <view @tap="versionDesc" class="cu-item" style="height: 100upx">
                    <view class="content" style="left: 30upx">
                        <view class="margin-left-lg" style="font-size: 30upx;color: #000000">版本说明</view>
                    </view>
                    <view class="action cuIcon-right text-grey" style="width: 30upx"></view>
                </view>
                <view @tap="update" class="cu-item" style="height: 100upx">
                    <view class="content" style="left: 30upx">
                        <view class="margin-left-lg" style="font-size: 30upx;color: #000000">版本更新</view>
                    </view>
                    <view class="action cuIcon-right text-grey" style="width: 30upx"></view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            async update() {
                uni.showToast({title: "当前是最新版", icon: "none"});
            },
            versionDesc() {
                uni.navigateTo({
                    url: '/pages/page/euler/upgrade-info'
                });
            }
        }
    }
</script>

<style>

</style>