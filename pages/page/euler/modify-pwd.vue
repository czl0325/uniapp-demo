<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">修改密码</block>
        </cu-custom>
        <view v-if="enable" class="flex flex-direction padding-lg bg-white" style="height:100vh">
            <view class="flex margin-top-sm align-center solid-bottom">
                <view class="cuIcon-lock text-grey" style="font-size: 44upx"></view>
                <view class="margin-left-sm">
                    <input v-model="pwd" password placeholder="新密码" maxlength="20"/>
                </view>
            </view>
            <view class="flex margin-top-sm align-center solid-bottom">
                <view class="cuIcon-lock text-grey" style="font-size: 44upx"></view>
                <view class="margin-left-sm">
                    <input v-model="confirmPwd" password placeholder="确认密码" maxlength="20"/>
                </view>
            </view>
            <view class="text-black margin-top-sm">
                密码不能小于6位。
            </view>
            <view class="margin-top-xl margin-bottom-xl flex justify-center">
                <view @tap="formSubmit" class="cu-btn block bg-blue df"
                      style="border-radius: 10upx;width: 600upx;height: 80upx">
                    <view>确认</view>
                </view>
            </view>
        </view>
        <view v-else class="flex justify-center align-center padding">
            <view class="text-center text-orange">
                联系管理员后台开启功能!
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                enable: true,
                pwd: "",
                confirmPwd: ""
            }
        },
        methods: {
            formSubmit: function () {
                let that = this;
                if (that.pwd.length < 6) {
                    uni.showToast({
                        title: "新密码不能小于6位",
                        icon: 'none'
                    });
                    return;
                }
                if (that.pwd != that.confirmPwd) {
                    uni.showToast({
                        title: "两次输入的密码不一样",
                        icon: 'none'
                    });
                    return;
                }
                uni.navigateBack();
            }
        }
    }
</script>

<style>

</style>