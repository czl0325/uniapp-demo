<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="content">消息中心</block></cu-custom>
        <view class="cu-list menu-avatar" v-if="cmsgList && cmsgList.length > 0">
            <view @tap="msgList(item)" class="cu-item" style="height: 160upx" v-for="(item,index) in cmsgList" :key="index">
                <view class="cu-avatar lg text-primary bg-white"
                      :class="[(item.msgBizIcon && item.msgBizIcon != '') ? item.msgBizIcon : '',
                        (item.iconBgColor && item.iconBgColor != '') ? 'bg-' + item.iconBgColor: '']"
                        style="border-radius: 10upx">
                    <view class="cu-tag round bg-red lg" style="width: 40upx;height:40upx;position:absolute;top:-20upx;right:-20upx" >
                        {{item.num>99?'99+':item.num}}
                    </view>
                </view>
                <view class="content flex flex-direction margin-left-sm">
                    <view class="flex justify-between align-center">
                        <view class="text-bold text-lg">{{item.title}}</view>
                        <view class="text-grey">{{item.updateTime}}</view>
                    </view>
                    <view class="g-line-clamp margin-top-xs">{{item.message}}</view>
                </view>
                <view class="action" style="width: 30upx">
                    <view class="cuIcon-right text-gray"></view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                cmsgList: [
                    {num: 3, msgBizIcon: "cuIcon-message", iconBgColor: "success", updateTime: "2019-11-29 15:15", title: "新闻消息", message: "各部门、中心：\n" +
                            "本月为消防安全宣传月，公司将于本周五下午举行消防演练，具体安排如下：\n" +
                            "1、集合时间：11月22日16:00\n" +
                            "2、集合地点：公司一楼篮球场\n" +
                            "3、参加人员：2018年至2019年入职的在司员工、志愿消防队成员\n" +
                            "4、项目：消防知识讲解、灭火实战演练、消防水带连接等\n" +
                            " \n" +
                            "请相关人员安排好手头上的工作，务必准时参加并现场签到。"},
                    {num: 2, msgBizIcon: "cuIcon-edit", iconBgColor: "warning", title: "审批"}]
            }
        },
        onShow() {

        },
        methods: {
            msgList(item) {
                uni.navigateTo({
                    url: './msg-list?tmsgDefId='+item.tmsgDefId
                        + '&readMode=' + item.readMode + '&readNum=' + item.num
                });
            }
        }
    }
</script>
<style>
    .cu-list.menu-avatar > .cu-item:after {
        border-bottom: 1px solid #ddd;
    }
</style>