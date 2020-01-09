<template>
    <view>
        <!--  #ifdef  APP-PLUS -->
        <view class="g-status-bar">
            <view class="g-status-place"></view>
        </view>
        <!--  #endif -->
        <hm-search :click-to-search-page="true">
            <view @tap="scan" class="cuIcon-scan" style="font-size: 50upx"></view>
        </hm-search>
        <view class="flex justify-center bg-white padding-top-xs padding-bottom-xs">
            <image style="width: 700upx;"
                   mode="widthFix" src="/static/pages/main/banner.png"></image>
        </view>
        <view>
            <hm-notice></hm-notice>
        </view>
        <view class="margin-top-sm">
            <hm-menu v-if="menu" :layout="1" parent-idcode="1"
                     :colorType="2" :showGroupTitle="false"></hm-menu>
        </view>
        <view class="cu-tabbar-height"></view>
    </view>
</template>
<script>
    import hmSearch from 'components/hm/hm-search';
    import hmMenu from 'components/hm/hm-menu';
    import hmNotice from 'components/hm/hm-notice';
    export default {
        data() {
            return {
                menu: true
            }
        },
        components: {hmSearch, hmMenu, hmNotice},
        methods: {
            scan: function () {
                let that = this;
                uni.scanCode({
                    success: function (res) {
                        let url = res.result;
                        if (url.startsWith("http://") || url.startsWith("https://")) {
                            url = that.rebuildUrl(res.result)
                            //#ifdef H5
                            window.location.href = url;
                            //#endif
                            //#ifndef H5
                            uni.navigateTo({
                                url: "/euler/pages/third?url=" + encodeURIComponent(url) + "&navigator=true"
                            });
                            //#endif
                        }
                    }
                });
            },
        }
    }
</script>
<style></style>