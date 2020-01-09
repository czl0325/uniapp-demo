<template>
    <view class="bg-white" style="height: 100vh">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">忘记密码</block>
        </cu-custom>
        <view v-if="enable" class="flex flex-direction padding-lg">
            <block v-if="step == 1">
                <view class="flex align-center solid-bottom">
                    <view class="cuIcon-people text-grey" style="font-size: 44upx"></view>
                    <view class="margin-left-sm">
                        <input v-model="account" placeholder="请输入用户名" maxlength="20"/>
                    </view>
                </view>
            </block>
            <block v-else-if="step == 2">
                <view class="flex align-center solid-bottom">
                    <view class="cuIcon-mobile text-grey" style="font-size: 44upx"></view>
                    <view class="margin-left-sm">
                        <input v-model="tel" placeholder="请输入手机号"/>
                    </view>
                </view>
                <view class="flex margin-top-sm align-center solid-bottom">
                    <view class="cuIcon-lock text-grey" style="font-size: 44upx"></view>
                    <view class="margin-left-sm">
                        <input v-model="smsCode" placeholder="请输入验证码"/>
                    </view>
                    <view v-if="seconds > 60" @tap="sendSmsCode" class="cu-btn block bg-blue df" style="border-radius: 10upx;width: 225upx">
                        发送验证码
                    </view>
                    <view v-else class="text-grey" style="width: 225upx;">
                        重新发送({{seconds}}s)
                    </view>
                </view>
            </block>
            <block v-else-if="step == 3">
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
            </block>
            <view class="margin-top-xl margin-bottom-xl flex justify-center">
                <view @tap="formSubmit" class="cu-btn block bg-blue df" style="border-radius: 10upx;width: 600upx;height: 80upx">
                    <view>确认</view>
                </view>
            </view>
        </view>
        <view v-else class="flex justify-center padding-lg">
            <view class="text-lg text-warning">联系管理员后台开启功能!</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                step: 1,
                tel: "",
                account: '',
                enable: true,
                seconds: 61,
                smsCode: '',
                pwd: '',
                confirmPwd: ''
            }
        },
        methods: {
            formSubmit: function () {
                let that = this;
                if (that.step == 1) {
                    that.step = 2;
                } else if (that.step == 2) {
                    that.step = 3;
                } else if (that.step == 3) {
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
            },
            sendSmsCode: async function () {
                if (this.seconds > 60) {
                    let reg = /^1[0-9]{10,10}$/;
                    if (!reg.test(this.tel)) {
                        uni.showToast({title: "手机号码格式不对", icon: "none"});
                        return;
                    }
                    this.timer = setInterval(() => {
                        this.seconds--;
                        if (this.seconds <= 0) {
                            clearInterval(this.timer);
                            this.timer = null;
                            this.seconds = 61;
                        }
                    }, 1000);
                }
            },
        }
    }
</script>

<style>

</style>