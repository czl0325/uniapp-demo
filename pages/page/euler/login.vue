<template>
    <view class="g-page bg-white">
        <!--  #ifdef  APP-PLUS -->
        <view class="g-status-bar">
            <view class="g-status-place"></view>
        </view>
        <!--  #endif -->
        <view class="g-content">
            <view @tap="setting" class="cuIcon-settings"
                  style="position: absolute;right: 1rem; top:1rem;font-size: 40upx">
            </view>
            <view class="flex justify-center" style="padding-top: 2rem;padding-bottom: 1.5rem">
                <image style="width: 92px !important;height: 125px !important;max-height: 150px !important;"
                       mode="aspectFit" src="/static/pages/login/logo-euler.png"></image>
            </view>
            <view class="margin-bottom-lg">
                <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem"
                                       styleType="button" activeColor="#007aff"></uni-segmented-control>
            </view>
            <view class="flex flex-direction" style="margin: 0 70upx">
                <block v-if="!isTelLogin">
                    <view class="flex align-center solid-bottom">
                        <view class="cuIcon-people text-grey" style="font-size: 44upx"></view>
                        <view class="margin-left-sm">
                            <input v-model="username" placeholder="请输入用户名" maxlength="20"/>
                        </view>
                    </view>
                    <view class="flex margin-top-sm align-center solid-bottom">
                        <view class="cuIcon-lock text-grey" style="font-size: 44upx"></view>
                        <view class="margin-left-sm">
                            <input v-model="pwd" password placeholder="请输入密码" maxlength="20"/>
                        </view>
                    </view>
                    <view class="flex margin-top-sm align-center solid-bottom">
                        <input placeholder="请输入右侧验证码" maxlength="20" style="width: 500upx"/>
                        <image :src="verifyCode" mode="widthFix" style="max-width:250upx"></image>
                    </view>
                </block>
                <block v-else>
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
            </view>
            <view class="margin-top-xl margin-bottom-xl flex justify-center">
                <view @tap="login" class="cu-btn block bg-blue df" style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>登录</view>
                </view>
            </view>
            <view class="flex justify-between" style="padding:0 70upx">
                <view @tap="forgetPwd" class="text-blue text-bold text-lg">忘记密码？</view>
                <view @tap="switchTelLogin" class="text-blue text-bold text-lg">{{telText}}</view>
            </view>
        </view>
        <view class="g-footer bg-footer flex flex-direction justify-center">
            <view class="text-center text-lg text-content">
                技术支持：中软海晟信息技术有限公司
            </view>
        </view>
        <!--弹窗-->
        <view class="cu-modal" :class="bannerShow ? 'show' : ''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">修改服务器地址：</view>
                    <view class="action" @tap="address">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl flex justify-center">
                    <input v-model="url" class="padding-xs" style="border: 1px solid #aaaaaa;border-radius:10upx;width: 500upx;height:70upx" placeholder="修改服务器地址" maxlength="150"/>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action">
                        <button class="cu-btn bg-green margin-left" @tap="address">确定</button>
                    </view>
                </view>
            </view>
        </view>
        <!--点击登录，当用户存在兼职时，选择相应单位进入-->
        <view class="cu-modal bottom-modal" :class="selectUser ?'show':''">
            <view class="cu-dialog">
                <view class="flex flex-direction">
                    <view class="bg-gray text-bold flex align-center justify-center" style="width:750upx;height:80upx">
                        <view>请选择需要进入的单位</view>
                    </view>
                    <view @tap="selectUserToLogin(item)" class="selectUserItem flex align-center justify-center" style="width:750upx;height:80upx" v-for="(item,index) in multiUsers" :key="index">
                        <view>{{item.orgName}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import uniSegmentedControl from 'components/uni/uni-segmented-control';
    import resources from 'commons/resources.js'

    export default {
        data() {
            return {
                items: ["系统用户", "扩展用户"],
                personType: ['DEFAULT', 'EXTEND_USER'],
                current: 0,
                isTelLogin: false,
                bannerShow: false,
                url: "http://localhost:8080",
                telText: "短信验证码登录",
                seconds: 61,
                tel: '',
                username: '',
                pwd: '',
                smsCode: '',
                selectUser: false,
                multiUsers: [
                    {id: "1", orgName: '海沧区'},
                    {id: "2", orgName: '湖里区'},
                    {id: "3", orgName: '思明区'}
                ],
                verifyCode: resources.login.verifyCode,
            }
        },
        components: {uniSegmentedControl},
        watch: {
            isTelLogin(curVal, oldVal) {
                if (curVal) {
                    this.telText = "用户名密码登录";
                } else {
                    this.telText = "短信验证码登录";
                }
            }
        },
        methods: {
            onClickItem(index) {
                if (this.current !== index) {
                    this.current = index;
                }
            },
            address: function () {
                this.bannerShow = false;
            },
            setting: function () {
                console.log("setting");
                this.bannerShow = true;
            },
            switchTelLogin: function() {
                this.isTelLogin = !this.isTelLogin;
            },
            forgetPwd: function () {
                uni.navigateTo({
                    url: "./forget-pwd"
                });
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
            login: function () {
                this.selectUser = true;
            },
            selectUserToLogin: function (item) {
                this.selectUser = false;
            }
        }
    }
</script>
<style>
    .solid-bottom::after {
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    }
    .cu-modal {
        z-index: 99999;
    }
    .selectUserItem {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>