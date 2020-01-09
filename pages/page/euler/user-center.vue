<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">公众号用户中心</block>
        </cu-custom>
        <view class="bg-white margin-bottom padding-top-lg padding-bottom-sm flex flex-direction justify-center">
            <view class="flex justify-center">
                <view class="cu-avatar xl round" style="background-image: url('static/pages/my/user-man.png')"></view>
            </view>
            <view class="text-center">CG</view>
            <view class="text-center">厦门市局</view>
        </view>
        <view class="cu-list menu-avatar margin-bottom-lg">
            <view class="cu-item" style="height: 100upx">
                <view class="content text-bold text-lg text-blue" style="left: 30upx">
                    采购
                </view>
                <view class="action cuIcon-check text-blue" style="font-size:45upx;width: 50upx"></view>
                <view class="action" style="width: 150upx">
                    <view class="cu-btn line-red">解绑</view>
                </view>
            </view>
            <view class="cu-item" style="height: 100upx">
                <view class="content text-bold text-lg" style="left: 30upx">
                    经理
                </view>
                <view class="action" style="width: 150upx">
                    <view class="cu-btn line-red">解绑</view>
                </view>
            </view>
        </view>
        <view @tap="newBind" class="bg-white flex flex-direction justify-center">
            <view class="text-center padding-sm text-lg text-blue flex justify-center">
                <view class="cuIcon-add">添加绑定账号</view>
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
            newBind: function () {


            }
        }
    }
</script>

<style>

</style>