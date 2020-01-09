<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">菜单组件</block></cu-custom>
        <view>

            <view class="cu-bar bg-white solid-bottom margin-bottom-xs">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    默认
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    九宫格切页
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" height="760upx"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    九宫格平铺隐藏更多
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="3"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    列表平铺
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="4"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    有边框
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :border="true" height="820upx"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    不显示标题
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="1" :showGroupTitle="false"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    3列4行
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :colNum="3" height="760upx"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    3行3列
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :colNum="3" :row-num="3" height="600upx"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    底色
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :colorType="2" height="760upx"> </hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    第一行底色
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :colorType="3" height="760upx"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    第一行前景色
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :colorType="4" height="760upx"></hm-menu>
            </view>

            <view class="cu-bar bg-white solid-bottom margin-top-lg">
                <view class="action">
                    <text class="cuIcon-title text-blue"></text>
                    圆角方形
                </view>
            </view>
            <view class=" ">
                <hm-menu parent-idcode="1" :layout="2" :colorType="4" :shape="2" height="760upx"></hm-menu>
            </view>
        </view>
        <view class="padding bg-white solid-top margin-top-sm">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明：</view>
                <rich-text class="text-df text-black" :nodes="content"></rich-text>
            </view>
        </view>
    </view>
</template>

<script>
    import hmMenu from 'components/hm/hm-menu'
    export default {
        data() {
            return {
                content: "1.props项：<br/>" +
                    "parentIdcode:'', //必填，父级idcode<br/>" +
                    "layout:1, // 1：九宫格平铺 2：九宫格横向切页 3：九宫格平铺隐藏更多 4：列表平铺<br/>" +
                    "height:265px, //推荐使用单位rpx，当layout为2时需要，切页无法自适应高度，该值指定切页的高度<br/>" +
                    "border:false, // 是否有边框，layout为1、2、3有效<br/>" +
                    "showGroupTitle:true, //分组标题是否显示。layout为1、4有效<br/>" +
                    "colNum:4, //列数，默认为4，针对layout=4无效。<br/>" +
                    "rowNum:4, //行数，layout为2和3有效<br/>" +
                    "shape:1, //1：圆形 2：圆角方形<br/>" +
                    "colorType:1, //1:前景色，2：底色 3：第一行底色，后续为前景色 4：第一行为前景色，后续为背景色。layout为4时，只有1、2有效<br/>" +
                    "xtype: \"MOBILE\", // 菜单类型，默认值为\"MOBILE\"， 值有COMMON、MODEL、MOBILE、WECHAT<br/>" +
                    "customGroups: 自定义菜单列表，如果有值，就不使用服务器配置，结构如下<br/>" +
                    "    [<br/>" +
                    "        {title: '分组1', \"idcode\": \"11\",<br/>" +
                    "        menus: [{<br/>" +
                    "            icon: 'hm-icon-form',<br/>" +
                    "            image: '',<br/>" +
                    "            color: 'info',<br/>" +
                    "            url: \"/euler/pages/third?url=\" + encodeURIComponent('http://www.baidu.com') + \"&title=菜单\"<br/>" +
                    "            title: '菜单1',<br/>" +
                    "            msgNum: 0,<br/>" +
                    "        }]}<br/>" +
                    "     ]<br/>" +
                    "2.菜单（groups的menus）配置说明：<br/>" +
                    "icon：图标的css样式<br/>" +
                    "image: 图片的url<br/>" +
                    "color：图标的颜色，根据colorType决定前景色还是底色。值有:<br/>" +
                    "    silver、muted、primary、success、info、warning、danger、white、dark、<br/>" +
                    "    red、pink、purple、deeppurple、indigo、blue、lightblue、cyan、teal、<br/>" +
                    "    green、lightgreen、lime、yellow、amber、orange、deeporange、brown、<br/>" +
                    "    grey、bluegrey<br/>" +
                    "code: appMenuId的值，如果没有，不设置<br/>" +
                    "url：跳转的页面，不能为空<br/>" +
                    "title：菜单名称，不能为空<br/>" +
                    "msgNum：消息数量，如果自定义，可以不需要设置这个属性<br/>" +
                    "3.菜单(menus每个menu）从props继承下来的属性：<br/>" +
                    "shape:1, //1：圆形 2：圆角方形<br/>" +
                    "colorType:1, //1:前景色，2：底色 3：第一行底色，后续为前景色 4：第一行为前景色，后续为背景色。"
            }
        },
        components: {
            hmMenu
        },
        methods: {

        }
    }
</script>

<style>
    .page {
        height: 100vh;
    }
</style>
