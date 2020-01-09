<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">企业微信用户错误</block>
        </cu-custom>
        <view class="flex flex-direction justify-start align-center bg-white" style="height:100vh">
            <view class="flex justify-center margin-top-xl">
                <view class="cu-avatar round bg-white" style="width:350upx;height:350upx;background-image: url('static/commons/images/alertImg/img-cartoon-loading.png')"></view>
            </view>
            <block v-if="code == null || code == 'USER_NOT_FOUND'">
                <view class="margin-top text-center text-bold text-black text-xxl">
                    用户未同步
                </view>
                <view class="margin-top-xs text-center text-xl">
                    请联系管理员同步到系统用户
                </view>
            </block>
            <block v-if="code == 'USER_LOCKED'">
                <view class="margin-top text-center text-bold text-black text-xxl">
                    用户被锁定
                </view>
                <view class="margin-top-xs text-center text-xl">
                    请联系管理员解锁用户
                </view>
            </block>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                code: null
            }
        },
        onLoad: function(options) {
            this.code = options.code;
            // this.code = 'USER_LOCKED';
        },
    }
</script>

<style>

</style>