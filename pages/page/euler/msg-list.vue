<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">消息列表</block>
        </cu-custom>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" :style="'height:' + height" @scrolltoupper="upper"
                     @scrolltolower="lower"
                     @scroll="scroll">
            <view class="cu-list menu-avatar" v-if="msgList && msgList.length > 0">
                <view @tap="content(item)" class="cu-item" style="height: 200upx;max-height: 500upx" v-for="(item,index) in msgList" :key="index">
                    <view class="content flex flex-direction margin-left-sm" style="left:30upx;width: 650upx">
                        <view class="flex justify-between align-center margin-bottom-xs">
                            <view class="flex align-center">
                                <view v-if="item.status == '1'" class="margin-right-xs cu-tag round bg-red lg"></view>
                                <view class="text-bold text-lg">{{item.title}}</view>
                            </view>
                            <view class="text-grey">{{item.createTime}}</view>
                        </view>
                        <view class="g-line-clamp" v-for="(subItem, i) in item.resume" :key="i">{{subItem}}</view>
                    </view>
                    <view class="action" style="width: 30upx">
                        <view class="cuIcon-right text-gray"></view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                height: '100%',
                msgList: [],
                tmsgDefId: '',
                cmsgId: '',
                readMode: '',
                readNum: 0,
                pageNo: 2,
                scrollTop: 0,
                old: {
                    scrollTop: 0
                },
                pageSize: 25,
                refresh: false
            };
        },
        onLoad: function (options) {
        },
        onShow() {
            this.initData();
        },
        methods: {
            upper: function (e) {
            },
            lower: function (e) {
                if (!this.refresh) {
                    this.refresh = true;
                    this.moreData();
                }
            },
            scroll: function (e) {
                this.old.scrollTop = e.detail.scrollTop
            },
            initData: function () {
                let that = this;
                setTimeout(async function () {
                    that.msgList = [
                        {status: "1", createTime: "2019-11-29 15:15", resume: "关于举行消\n防演练\n的通知", title: "消防演练"},
                        {createTime: "2019-11-29 15:15", resume: "关于安全知识考试的通知", title: "安全知识考试"},
                        {createTime: "2019-11-29 15:15", resume: "关于\n放假期间\n中国电信\n运营商宽带网络维护通知", title: "宽带维护"}
                    ];
                    for (let item of that.msgList) {
                        let resume = [];
                        // item.resume;
                        let index = item.resume.indexOf('\n');
                        if (index != -1) {
                            while (index != -1) {
                                resume.push(item.resume.substring(0, index));
                                if (index + 1 < item.resume.length) {
                                    item.resume = item.resume.substring(index + 1);
                                } else {
                                    item.resume = "";
                                }
                                index = item.resume.indexOf('\n');
                                if (index == -1 && item.resume != '') {
                                    resume.push(item.resume);
                                }
                            }
                        } else {
                            resume.push(item.resume);
                        }
                        item.resume = resume;
                    }
                    uni.stopPullDownRefresh();
                }, 300);
                this.pageNo = 2;
            },
            async moreData() {
                this.refresh = false;
            },
            content: function (item) {
                uni.navigateTo({
                    url: './msg-content'
                });
            }
        }
    }
</script>

<style>
    .cu-list.menu-avatar > .cu-item:after {
        border-bottom: 1px solid #ddd;
    }
    .g-line-clamp {
        -webkit-line-clamp: 1;
    }
    view {
        line-height: 1.2;
    }
</style>