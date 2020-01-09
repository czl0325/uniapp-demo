<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">公告列表</block></cu-custom>
        <scroll-view :scroll-top="scrollTop" scroll-y="true" :style="'height:' + height" @scrolltoupper="upper"
                     @scrolltolower="lower"
                     @scroll="scroll">
            <view class="cu-list menu-avatar">
                <view @tap="content(item)" v-for="(item, index) in noticeList" :key="index" class="cu-item padding" style="justify-content:flex-start;height: 100%">
                    <view class="text-sm flex flex-direction">
                        <view class="text-bold text-xl">
                            {{item.title}}
                        </view>
                        <view class="text-grey text-df">
                            {{item.issueTime}}
                        </view>
                        <rich-text class="text-df" :nodes="item.content"></rich-text>
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
    export default {
        data: function () {
            return {
                height: '100%',
                noticeList: [],
                pageNo: 2,
                scrollTop: 0,
                old: {
                    scrollTop: 0
                },
                pageSize: 25,
                refresh: false
            };
        },
        onLoad: function (options) {},
        onShow() {
            this.initData();
        },
        methods: {
            upper: function (e) {
            },
            lower: function (e) {
                if (!this.refresh) {
                    this.refresh = true;
                    console.log("more data");
                    this.moreData();
                }
            },
            scroll: function (e) {
                this.old.scrollTop = e.detail.scrollTop
            },
            initData: function () {
                let that = this;
                setTimeout(async function () {
                    let list = [{"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"},
                        {"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"},
                        {"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"},
                        {"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"},
                        {"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"},
                        {"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"},
                        {"id": "1", "title":"公告测试", "content":"<p>色温若<br/>翁绕弯儿无</p>", "issueTime":"2019-10-10 14:32"}];
                    that.noticeList = list;
                    uni.stopPullDownRefresh();
                }, 300);
                this.pageNo = 2;
            },
            async moreData() {
                let that = this;
                that.pageNo++;
                let list = [{"id": "1", "title":"另一个公告", "content":"<p>水电费水<br/>电费水电费</p>", "issueTime":"2019-10-10 14:32"},
                    {"id": "1", "title":"另一个公告", "content":"<p>水电费水<br/>电费水电费</p>", "issueTime":"2019-10-10 14:32"},
                    {"id": "1", "title":"另一个公告", "content":"<p>水电费水<br/>电费水电费</p>", "issueTime":"2019-10-10 14:32"},
                    {"id": "1", "title":"另一个公告", "content":"<p>水电费水<br/>电费水电费</p>", "issueTime":"2019-10-10 14:32"},
                    {"id": "1", "title":"另一个公告", "content":"<p>水电费水<br/>电费水电费</p>", "issueTime":"2019-10-10 14:32"}];;
                that.noticeList = that.noticeList.concat(list);
                that.refresh = false;
            },
            content: function (item) {
                uni.navigateTo({
                    url : "/pages/sys-component/notice-content"
                });
            }
        }
    }
</script>

<style>

</style>
