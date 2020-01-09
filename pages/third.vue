<template>
    <view>
        <cu-custom v-if="navigator" bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block><block slot="content">{{title}}</block>
        </cu-custom>
        <!--  #ifndef  APP-PLUS -->
        <web-view :src="url" @message="handleMessage"></web-view>
        <!--  #endif -->
    </view>
</template>

<script>
    export default {
        data: function () {
            return {
                url: "",
                navigator: true,
                title: '第三方组件'
            };
        },
        onReady() {
            //#ifdef APP-PLUS
            let all = plus.webview.all();
            let top = plus.navigator.getStatusbarHeight();
            if (this.navigator) top = top + 50;
            all[all.length - 1].append(plus.webview.create(this.url, "", {top: top + 'px'}));
            //#endif
        },
        onLoad: function (options) {
            if (options.navigator == false || options.navigator == 'false') {
                this.navigator = false;
            }
            // #ifdef H5 || MP-WEIXIN
            this.navigator = false;
            // #endif
            if (options.title && options.title != '') {
                this.title = options.title;
            }
            this.url = decodeURIComponent(options.url);
            if (this.url.indexOf("?") != -1 && this.url.indexOf("appKey=") != -1) {
                this.url += "&appKey=" + this.$store.state.rop.appKey + "&appSecret=" + that.$store.state.rop.appSecret;
            }
        },
        methods: {
            handleMessage(evt) {
                console.log('接收到的消息：' + JSON.stringify(evt.detail.data));
            }
        }
    }
</script>

<style>

</style>
