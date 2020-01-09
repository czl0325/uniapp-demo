<template>
    <view class="g-page bg-white">
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">消息内容</block>
        </cu-custom>
        <view class="g-content text-sm flex flex-direction bg-white padding flex-sub">
            <view class="text-bold text-xl text-black">
                {{title}}
            </view>
            <view class="text-grey text-df">
                {{createTime}}
            </view>
            <rich-text class="text-df text-black" :nodes="content"></rich-text>
        </view>
        <view @tap="to" v-if="url && url != ''" class="g-footer flex justify-center">
            <view class="cu-btn block bg-blue df" style="border-radius: 40upx;width: 600upx;height: 80upx">
                <view>处理</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data: function () {
            return {
                id: null,
                title: null,
                content:null,
                url: null,
                createTime: null
            };
        },
        onLoad: function () {
            let that = this;
            that.title = '消防演练';
            that.createTime = '2019-11-29 15:15'
            that.content = "各部门、中心：\n" +
                "本月为消防安全宣传月，公司将于本周五下午举行消防演练，具体安排如下：\n" +
                "1、集合时间：11月22日16:00\n" +
                "2、集合地点：公司一楼篮球场\n" +
                "3、参加人员：2018年至2019年入职的在司员工、志愿消防队成员\n" +
                "4、项目：消防知识讲解、灭火实战演练、消防水带连接等" +
                " \n请相关人员安排好手头上的工作，务必准时参加并现场签到。";
            if (that.content.indexOf('\n') != -1) {
                that.content = that.content.replace(/\n/g, '<br/>');
            }
            that.url = "http://www.baidu.com";
        },
        methods: {
            to: function () {
                console.log("对url[" + this.url + "]进行跳转处理");
            }
        }
    }
</script>

<style>

</style>
