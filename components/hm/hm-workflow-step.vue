<!--
props:
bizId:业务id
procInstId:对应流程实例id
两个属性不能都为空
-->
<template>
    <view class="cu-timeline">
        <block v-for="(item,index) in tasks" :key="index">
            <block v-if="index != tasks.length - 1">
                <block v-if="item.state == 1">
                    <view v-if="end && index == 0" class="cu-item text-success">
                        <view class="content bg-gray shadow-blur">
                            <view class="flex justify-between">
                                <view class="text-lg">{{item.bizOrgName + ' ' + item.assignee}}</view>
                                <view>{{item.taskEndTime}}</view>
                            </view>
                            <view>{{item.message}}</view>
                        </view>
                    </view>
                    <view v-else class="cu-item text-success cuIcon-check">
                        <view class="content bg-gray shadow-blur">
                            <view class="flex justify-between">
                                <view class="text-lg">{{item.bizOrgName + ' ' + item.assignee}}</view>
                                <view>{{item.taskEndTime}}</view>
                            </view>
                            <view>{{item.message}}</view>
                        </view>
                    </view>
                </block>
                <block v-else-if="item.state == 0">
                    <view class="cu-item text-primary cuIcon-timefill">
                        <view class="content bg-gray shadow-blur">
                            <view>审批中...</view>
                            <view class="text-red">已等待：{{item.during}}</view>
                        </view>
                    </view>
                </block>
                <block v-else-if="item.state == 2">
                    <view class="cu-item text-danger cuIcon-close">
                        <view class="content bg-gray shadow-blur">
                            <view class="flex justify-between">
                                <view class="text-lg">{{item.bizOrgName + ' ' + item.assignee}}</view>
                                <view>{{item.taskEndTime}}</view>
                            </view>
                            <view>{{item.message}}</view>
                        </view>
                    </view>
                </block>
                <block v-else-if="item.state == 3">
                    <view class="cu-item text-danger cuIcon-repeal">
                        <view class="content bg-gray shadow-blur">
                            <view class="flex justify-between">
                                <view class="text-lg">{{item.bizOrgName + ' ' + item.assignee}}</view>
                                <view>{{item.taskEndTime}}</view>
                            </view>
                            <view>{{item.message}}</view>
                        </view>
                    </view>
                </block>
                <block v-else-if="item.state == 4">
                    <view class="cu-item text-danger cuIcon-deletefill">
                        <view class="content bg-gray shadow-blur">
                            <view class="flex justify-between">
                                <view class="text-lg">{{item.bizOrgName + ' ' + item.assignee}}</view>
                                <view>{{item.taskEndTime}}</view>
                            </view>
                            <view>{{item.message}}</view>
                        </view>
                    </view>
                </block>
            </block>
            <block v-else>
                <view class="cu-item text-primary">
                    <view class="content bg-gray shadow-blur">
                        <view class="flex justify-between">
                            <view class="text-lg">{{item.bizOrgName + ' ' + item.assignee}}</view>
                            <view>{{item.taskEndTime}}</view>
                        </view>
                        <view>{{item.message}}</view>
                    </view>
                </view>
            </block>
        </block>
    </view>
</template>

<script>
    export default {
        props: {
            bizId: {
                type: String,
                default() {
                    return null;
                }
            },
            procInstId: {
                type: String,
                default() {
                    return null;
                }
            }
        },
        data: function () {
            return {
                end: true,
                tasks: [{
                    message: "通过",
                    complete: true,
                    assignee: "王五",
                    taskEndTime: "2019-8-8 10:10:10",
                    state: "1",
                    bizOrgName: "总裁"
                }, {
                    message: "合格，不错",
                    complete: false,
                    assignee: "李四",
                    taskEndTime: "2019-8-8 10:10:10",
                    state: "1",
                    during: "12小时",
                    bizOrgName: "主管"
                }, {
                    message: "拟定",
                    complete: true,
                    assignee: "张三",
                    taskEndTime: "2019-8-8 10:10:10",
                    state: "1",
                    bizOrgName: "技管部"
                }]
            };
        },
        /*async mounted() {
            let that = this;
            let tasks = [];
            let data = null;
            if (that.procInstId) {
                data = await that.$rop.post({
                    method: "fw2.workflow.procinst.list",
                    data: {piId: that.procInstId}
                });
            } else {
                if (that.bizId) {
                    data = await that.$rop.post({
                        method: "fw2.workflow.procinst.list",
                        data: {bizId: that.bizId}
                    });
                }
            }
            if (data) {
                let result = data.rows[0];
                if (result.procInstEndTime != null || result.procInstEndTime != '') {
                    that.end = true;
                }
                let procInstId = result.procInstId;
                tasks = await that.$rop.post({
                    method: "euler.workflow.procinst.task.list",
                    data: {id: procInstId},
                });
                that.tasks = tasks.reverse();
            } else {
                uni.showModal({
                    title: '无法获取流程流转',
                    content: '请设置正确的bizId属性或procInstId属性',
                    showCancel: false
                });
            }
        }*/
    }
</script>

<style>

</style>
