<!--
props:
height:对应css的height属性，默认100%。指定列表容器高度，要自带单位如px、upx
-->
<template>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" :style="'height:' + height" @scrolltoupper="upper" @scrolltolower="lower"
                 @scroll="scroll">
        <view class="cu-list menu-avatar">
            <view @tap="todo(item)" v-for="(item, index) in todoList" :key="index" class="cu-item padding" style="height: 300upx">
                <view class="content" style="left: 30upx">
                    <view class="margin-bottom-sm">
                        <view class="text-cut text-xl text-black text-bold">{{item.bizTitle}}</view>
                        <view v-if="item.state == 0" class="cu-tag round bg-white text-primary border-primary"
                              style="font-size: 25upx;margin-left: 20upx;padding:8upx 12upx">
                            待审核
                        </view>
                        <view v-if="item.state == 1" class="cu-tag round  bg-white text-success border-success"
                              style="font-size: 25upx;margin-left: 20upx;padding:8upx 12upx">
                            已完成
                        </view>
                        <view v-if="item.state == 2" class="cu-tag round  bg-white text-warning border-warning"
                              style="font-size: 25upx;margin-left: 20upx;padding:8upx 12upx">
                            被撤回
                        </view>
                        <view v-if="item.state == 3" class="cu-tag round  bg-white text-danger border-danger"
                              style="font-size: 25upx;margin-left: 20upx;padding:8upx 12upx">
                            被驳回
                        </view>
                        <view v-if="item.state == 4" class="cu-tag round  bg-white text-danger border-danger"
                              style="font-size: 25upx;margin-left: 20upx;padding:8upx 12upx">
                            已结束
                        </view>
                    </view>
                    <view class="text-black text-sm flex flex-direction">
                        <view class="text-cut padding-xs">
                            流程：{{item.procDefName}}
                        </view>
                        <view class="text-cut padding-xs">
                            流程创建：{{item.procInstCreateTime}}
                        </view>
                        <view class="text-cut flex padding-xs">
                            <view>单位名称：{{item.bizOrgName}}</view>
                            <view class="margin-left-lg">发起人：{{item.bizCreatorName}}</view>
                        </view>
                    </view>
                </view>
                <view class="action" style="width: auto; height: 100%">
                    <view class="text-grey text-df">{{item.taskCreateTime}}</view>
                </view>
                <view class="action" style="width: 50upx">
                    <view class="cuIcon-right text-gray"></view>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        name: 'hm-todo',
        props: {
            height: {
                type: String,
                default() {
                    return '100%';
                }
            }
        },
        data() {
            return {
                todoList: [],
                pageNo: 1,
                scrollTop: 0,
                old: {
                    scrollTop: 0
                },
                pageSize: 25,
                refresh: false
            }
        },
        async mounted() {
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
            initData: async function () {
                let that = this;
                setTimeout(async function () {
                    that.todoList = [
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "0", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "1", procDefName: "请假流程", appMenuUrl: ""
                        },
                        /*{
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "2", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "3", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "4", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "3", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "4", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "3", procDefName: "请假流程", appMenuUrl: ""
                        },
                        {
                            bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                            bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                            taskCreateTime: "2017-08-08 09:30", state: "4", procDefName: "请假流程", appMenuUrl: ""
                        }*/
                    ];
                    that.todoList = that.todoList.slice(0, that.pageSize);
                    uni.stopPullDownRefresh();
                }, 300);
                that.pageNo = 2;
            },
            async moreData() {
                let that = this;
                for (let i = 0; i < that.pageSize; i++) {
                    that.todoList.push({
                        bizTitle: "请假单", taskId: "1", bizOrgName: "厦门市局",
                        bizCreatorName: "张三", procInstCreateTime: "2017-08-08 09:30",
                        taskCreateTime: "2017-08-08 09:30", state: "4", procDefName: "请假流程", appMenuUrl: ""
                    });
                }
                that.refresh = false;
            },
            todo: function (item) {
                /*uni.navigateTo({
                    url: item.appMenuUrl + "?taskId=" + item.taskId + "&state=" + item.state
                });*/
            }
        }
    }
</script>

<style>

</style>
