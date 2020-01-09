<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">版本说明</block>
        </cu-custom>
        <view class="bg-white padding" style="height: 100vh;">
            <view class="flex justify-center align-center">
                <view class="text-center text-black text-bold text-lg">近期主要更新</view>
            </view>
            <view class="margin-top-lg">
                <rich-text class="text-df text-black" :nodes="versionInfo.remark"></rich-text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                versionInfo: {}
            };
        },
        onLoad() {
            let remark = "各部门、中心：\n" +
                "本月为消防安全宣传月，公司将于本周五下午举行消防演练，具体安排如下：\n" +
                "1、集合时间：11月22日16:00\n" +
                "2、集合地点：公司一楼篮球场\n" +
                "3、参加人员：2018年至2019年入职的在司员工、志愿消防队成员\n" +
                "4、项目：消防知识讲解、灭火实战演练、消防水带连接等" +
                " \n请相关人员安排好手头上的工作，务必准时参加并现场签到。";
            this.versionInfo = {
                remark: remark.replace(/\n/g, '<br/>')
            };
        }
    }
</script>

<style>

</style>