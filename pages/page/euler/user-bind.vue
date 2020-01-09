<template>
    <view class="g-page bg-white">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">用户绑定</block>
        </cu-custom>
        <view class="g-content">
            <view class="flex justify-center" style="padding-top: 2rem;padding-bottom: 1.5rem">
                <view class="text-bold text-xxl">添加绑定账号</view>
            </view>
            <view class="margin-bottom-lg">
                <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem"
                                       styleType="button" activeColor="#007aff"></uni-segmented-control>
            </view>
            <view class="flex flex-direction" style="margin: 0 70upx">
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
            </view>
            <view class="margin-top-xl margin-bottom-xl flex justify-center">
                <view class="cu-btn block bg-blue df" style="border-radius: 10upx;width: 600upx;height: 80upx">
                    <view class="text-lg">绑定</view>
                </view>
            </view>
        </view>
        <view class="g-footer bg-footer flex flex-direction justify-center">
            <view class="text-center text-lg text-content">
                技术支持：中软海晟信息技术有限公司
            </view>
        </view>
    </view>
</template>

<script>
    import uniSegmentedControl from 'components/uni/uni-segmented-control';
    export default {
        data() {
            return {
                items: ["系统用户", "扩展用户"],
                personType: ['DEFAULT', 'EXTEND_USER'],
                current: 0,
                username: '',
                pwd: '',
            }
        },
        components: {uniSegmentedControl},
        methods: {
            onClickItem(index) {
                if (this.current !== index) {
                    this.current = index;
                }
            },
        }
    }
</script>

<style>

</style>