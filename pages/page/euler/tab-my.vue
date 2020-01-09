<template>
    <view>
        <view class="bg-white margin-bottom-xs padding-top-sm padding-bottom-sm flex justify-start">
            <view class="padding flex flex-direction justify-center">
                <view class="cu-avatar xl round" style="background-image: url('static/pages/my/user-man.png')"></view>
            </view>
            <view class="flex flex-direction">
                <view class="text-bold text-xl text-black">LD</view>
                <view class="text-gray">厦门市 录单员</view>
                <view class="text-gray">手机：1141242422</view>
                <view class="text-gray">邮箱：abc2@163.com</view>
            </view>
        </view>
        <view class="cu-list menu-avatar margin-bottom-lg">
            <view @tap="update" class="cu-item" style="height: 100upx">
                <view class="content" style="left: 30upx">
                    <view class="flex justify-start align-center">
                        <view class="cuIcon-refresh text-blue" style="font-size: 45upx"></view>
                        <view class="margin-left-lg" style="font-size: 30upx;color: #000000">版本更新</view>
                    </view>
                </view>
                <view class="action cuIcon-right text-grey" style="width: 30upx"></view>
            </view>
            <view @tap="modifyPwd" class="cu-item" style="height: 100upx">
                <view class="content" style="left: 30upx">
                    <view class="flex justify-start align-center">
                        <view class="cuIcon-lock text-red" style="font-size: 45upx"></view>
                        <view class="margin-left-lg" style="font-size: 30upx;color: #000000">修改密码</view>
                    </view>
                </view>
                <view class="action cuIcon-right text-grey" style="width: 30upx"></view>
            </view>
        </view>
        <view @tap="logout" class="bg-white flex flex-direction justify-center">
            <view class="text-center padding-sm text-bold text-lg text-black">退出登录</view>
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
            logout() {
                console.log("退出登录!");
            },
            update: function () {
                uni.navigateTo({
                    url: "/pages/page/euler/upgrade"
                })
            },
            modifyPwd: function () {
                uni.navigateTo({
                    url: "/pages/page/euler/modify-pwd"
                })
            }
        }
    }
</script>
<style>
</style>