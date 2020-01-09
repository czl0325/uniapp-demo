<template>
    <view class="cu-list menu-avatar" v-if="noticeList.length > 0">
        <view @tap="list" class="cu-item">
            <view class="cu-avatar round lg cuIcon-notification bg-orange"></view>
            <view class="content">
                <view v-for="(item, index) in noticeList" :key="index" class="text-sm flex" style="max-width: 500upx">
                    <view class="text-cut" style="max-width: 320upx">
                        {{item.title}}
                    </view>
                    <view class="text-grey text-df">{{item.during}}</view>
                </view>
            </view>
            <view class="action" style="width:50upx">
                <view class="cu-tag round bg-red lg" style="width: 48upx">5</view>
            </view>
            <view class="action" style="width:50upx">
                <view class="cuIcon-right text-gray"></view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        name: 'hm-notice',
        props: {},
        data() {
            return {
                noticeList: []
            }
        },
        created() {
            let that = this;
            that.noticeList = [
                {title: 'uni-app行业峰会频频亮相，开发者反响热烈', id: "id1", during: "15小时前"},
                {title: 'DCloud完成B2轮融资，uni-app震撼发布', id: "id2", during: "15小时前"}
            ];
        },
        methods: {
            list: function () {
                uni.navigateTo({
                    url : "/pages/sys-component/notice-list"
                });
            }
        }
    }
</script>

<style>
</style>
