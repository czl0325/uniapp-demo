<template>
    <view>
        <tabMain v-if="PageCur=='tabMain'"></tabMain>
        <tabMessage v-if="PageCur=='tabMessage'"></tabMessage>
        <tabMy v-if="PageCur=='tabMy'"></tabMy>
        <view class="cu-bar tabbar bg-white shadow foot padding-top-xs solid-top">
            <view class="action" @click="NavChange" data-cur="tabMain">
                <view class='cuIcon-cu-image'>
                    <image :src="'/static/pages/main/tabMain' + [PageCur=='tabMain'?'_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='tabMain'?'text-primary':'text-gray'">首页</view>
            </view>
            <view class="action" @click="NavChange" data-cur="tabMessage">
                <view class='cuIcon-cu-image'>
                    <image :src="'/static/pages/main/tabMessage' + [PageCur=='tabMessage'?'_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='tabMessage'?'text-primary':'text-gray'">消息</view>
            </view>
            <view class="action text-gray add-action">
                <button @tap="action" class="cu-btn cuIcon-add bg-green shadow actionIcon"></button>
                发布
            </view>
            <view class="action" @click="NavChange" data-cur="tabMy">
                <view class='cuIcon-cu-image'>
                    <image :src="'/static/pages/main/tabMy' + [PageCur=='tabMy'?'_cur':''] + '.png'"></image>
                </view>
                <view :class="PageCur=='tabMy'?'text-primary':'text-gray'">我的</view>
            </view>
        </view>
    </view>
</template>
<script>
    import tabMain from "./tab-main";
    import tabMessage from "./tab-message";
    import tabMy from "./tab-my";
    import Vue from 'vue'
    export default {
        data() {
            return {
                PageCur: 'tabMain'
            }
        },
        onLoad() {
            Vue.component('tabMain',tabMain)
            Vue.component('tabMessage',tabMessage)
            Vue.component('tabMy',tabMy)
        },
        methods: {
            NavChange: function(e) {
                this.PageCur = e.currentTarget.dataset.cur
            },
            action: function () {
                console.log("触发了action")
            }
        }
    }
</script>
<style>
    .action > .cuIcon-cu-image {
        line-height: 0.7;
    }

    .solid-top::after {
        border-top: 2px solid rgba(0, 0, 0, 0.1);
    }

    .cu-bar.tabbar .action.add-action::after {
        box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
    }
</style>