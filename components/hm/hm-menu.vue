<!--
1.props项：
parentIdcode:'', //必填，父级idcode
layout:1, // 1：九宫格平铺 2：九宫格横向切页 3：九宫格平铺隐藏更多 4：列表平铺
height:265px, //推荐使用单位rpx，当layout为2时需要，切页无法自适应高度，该值指定切页的高度
border:false, // 是否有边框，layout为1、2、3有效
showGroupTitle:true, //分组标题是否显示。layout为1、4有效
colNum:4, //列数，默认为4，针对layout=4无效。
rowNum:4, //行数，layout为2和3有效
shape:1, //1：圆形 2：圆角方形
colorType:1, //1:前景色，2：底色 3：第一行底色，后续为前景色 4：第一行为前景色，后续为背景色。layout为4时，只有1、2有效
xtype: "MOBILE", // 菜单类型，默认值为"MOBILE"， 值有COMMON、MODEL、MOBILE、WECHAT
customGroups: 自定义菜单列表，如果有值，就不使用服务器配置，结构如下
    [
        {title: '分组1', "idcode": "11",
        menus: [{
            icon: 'hm-icon-form',
            image: '',
            color: 'info',
            url: "/euler/pages/third?url=" + encodeURIComponent('http://www.baidu.com') + "&title=菜单"
            title: '菜单1',
            msgNum: 0,
        }]}
     ]
2.菜单（groups的menus）配置说明：
icon：图标的css样式
image: 图片的url
color：图标的颜色，根据colorType决定前景色还是底色。值有:
    silver、muted、primary、success、info、warning、danger、white、dark、
    red、pink、purple、deeppurple、indigo、blue、lightblue、cyan、teal、
    green、lightgreen、lime、yellow、amber、orange、deeporange、brown、
    grey、bluegrey
code: appMenuId的值，如果没有，不设置
url：跳转的页面，不能为空
title：菜单名称，不能为空
msgNum：消息数量，如果自定义，可以不需要设置这个属性
3.菜单(menus每个menu）从props继承下来的属性：
shape:1, //1：圆形 2：圆角方形
colorType:1, //1:前景色，2：底色 3：第一行底色，后续为前景色 4：第一行为前景色，后续为背景色。
-->
<template>
    <view v-if="layout == 1 || layout == 3">
        <block v-for="(group,i) in groups" :key="i">
            <view v-if="showGroupTitle && group.title" class="g-caption">{{group.title}}</view>

            <block v-if="group.menus.length && group.menus.length > 0">
                <view class="cu-list grid" :class="['col-' + colNum,border?'':'no-border']">
                    <view @tap="clickMenu(item)" class="cu-item flex align-center" v-for="(item,index) in group.menus" :key="index">
                        <view :class="[(item.icon && item.icon != '') ? item.icon : '', (item.image && item.image != '') ?'bg-img':'',
                            (colorType == 1  || (colorType == 3 && index >= colNum) || (colorType == 4 && index < colNum) ? 'text-' : 'bg-' ) + item.color]"
                              style="margin-top:24upx;width:85upx;height:85upx"
                              :style="(shape == 1 ? 'border-radius: 50%;' : 'border-radius: 10%;') + ((item.image && item.image != '') ? 'background-image: url(' + item.image + ');position: relative;' : '')">
                            <view class="cu-tag badge" v-if="item.msgNum && item.msgNum!=0">
                                <block>{{item.msgNum>99?'99+':item.msgNum}}</block>
                            </view>
                        </view>
                        <text>{{item.title}}</text>
                    </view>
                </view>
            </block>

        </block>
    </view>
    <view v-else-if="layout == 2 && groups">
        <swiper indicator-dots="true" circular="true" :style="'height:' + height + ';'" class="bg-white">
            <swiper-item v-for="(group,i) in groups" :key="i">

                <block v-if="group.menus.length && group.menus.length > 0">
                    <view class="cu-list grid" :class="['col-' + colNum,border?'':'no-border']">
                        <view @tap="clickMenu(item)" class="cu-item flex align-center" v-for="(item,index) in group.menus" :key="index">
                            <view :class="[(item.icon && item.icon != '') ? item.icon : '', (item.image && item.image != '') ?'bg-img':'',
                        (colorType == 1  || (colorType == 3 && index >= colNum) || (colorType == 4 && index < colNum) ? 'text-' : 'bg-' ) + item.color]"
                                  style="margin-top:24upx;width:85upx;height:85upx"
                                  :style="(shape == 1 ? 'border-radius: 50%;' : 'border-radius: 10%;') + ((item.image && item.image != '') ? 'background-image: url(' + item.image + ');position: relative;' : '')">
                                <view class="cu-tag badge" v-if="item.msgNum && item.msgNum!=0">
                                    <block>{{item.msgNum>99?'99+':item.msgNum}}</block>
                                </view>
                            </view>
                            <text>{{item.title}}</text>
                        </view>
                    </view>
                </block>

            </swiper-item>
        </swiper>
    </view>
    <view v-else-if="layout == 4">
        <block v-for="(group,i) in groups" :key="i">
            <view v-if="showGroupTitle && group.title" class="g-caption">{{group.title}}</view>
            <block v-if="group.menus.length && group.menus.length > 0">
                <view class="cu-list menu-avatar">
                    <view @tap="clickMenu(item)" class="cu-item" v-for="(item,index) in group.menus" :key="index">
                        <view class="cu-avatar lg "
                              :class="[(item.icon && item.icon != '') ? item.icon : '', (item.image && item.image != '') ?'bg-img':'',
                                (colorType == 1  ? 'text-' : 'bg-' ) + item.color]"
                            :style="(shape == 1 ? 'border-radius: 50%;' : 'border-radius: 10%;') + ((item.image && item.image != '') ? 'background-image: url(' + item.image + ');' : '')"></view>
                        <view class="content" >
                            {{item.title}}
                        </view>
                        <view class="action" v-if="item.msgNum && item.msgNum!=0">
                            <view class="cu-tag round bg-red lg" style="width: 40upx;height:40upx">{{item.msgNum>99?'99+':item.msgNum}}</view>
                        </view>
                        <view class="action" style="width: 30upx">
                            <view class="cuIcon-right text-gray"></view>
                        </view>
                    </view>
                </view>
            </block>
        </block>
    </view>
    <view v-else>
        <text class="text-xl text-danger">无效的布局(layout={{layout}})</text>
    </view>
</template>
<script>
    export default {
        name: 'hm-menu',
        props: {
            parentIdcode: {
                type: String
            },
            layout: {
                type: Number,
                default() {
                    return 1;
                }
            },
            height: {
                type: String,
                default() {
                    return '265px';
                }
            },
            border: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            showGroupTitle: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            colNum: {
                type: Number,
                default() {
                    return 4;
                }
            },
            rowNum: {
                type: Number,
                default() {
                    return 4;
                }
            },
            shape: {
                type: Number,
                default() {
                    return 1;
                }
            },
            colorType: {
                type: Number,
                default() {
                    return 1;
                }
            },
            customGroups: {
                type: Array,
                default() {
                    return [];
                }
            },
            xtype: {
                type: String,
                default() {
                    return "MOBILE";
                }
            }
        },
        data() {
            return {
                groups: [],
            }
        },
        mounted: async function () {
            await this.fetchGroups(this.parentIdcode);
        },
        methods: {
            clickMenu(item) {
                if (item.url.startsWith("http://") || item.url.startsWith("https://")) {
                    //#ifdef H5
                    window.location.href = item.url;
                    //#endif
                    //#ifndef H5
                    uni.navigateTo({
                        url: "/pages/third?url=" + encodeURIComponent(item.url) + "&navigator=" + item.target,
                    });
                    //#endif
                } else {
                    uni.navigateTo({
                        url: item.url
                    });
                }
            },
            async fetchGroups(idcode) {
                let groups = null;
                if (this.customGroups && this.customGroups.length > 0) {
                    groups = this.customGroups;
                } else {
                    let allGroups = uni.getStorageSync('es_allGroups');
                    outer:
                        for (let allGroup of allGroups) {
                            if (idcode == allGroup.idcode) {
                                groups = allGroup.groups;
                                break outer;
                            }
                            for (let group of allGroup.groups) {
                                if (idcode == group.idcode) {
                                    groups = [];
                                    groups.push(group);
                                    break outer;
                                }
                            }
                        }
                    if (groups == null) {
                        uni.showModal({
                            title: '菜单加载失败',
                            content: '请联系管理员修改菜单配置',
                            showCancel: false,
                            success: res => {
                            }
                        });
                        return;
                    }
                }
                if (this.layout == 2) {
                    let newGroups = [{menus: []}];
                    let curIndex = 0;
                    let count = 0;
                    let swiperItemTotal = this.rowNum * this.colNum;
                    for (let group of groups) {
                        for (let menu of group.menus) {
                            newGroups[curIndex].menus.push(menu);
                            count++;
                            if (count == swiperItemTotal) {
                                count = 0;
                                curIndex++;
                                newGroups.push({menus: []});
                            }
                        }
                    }
                    groups = newGroups;
                } else if (this.layout == 3) {
                    let newGroups = [{menus: []}];
                    let allowTotal = this.rowNum * this.colNum;
                    let count = 0;
                    outer:
                        for (let group of groups) {
                            for (let menu of group.menus) {
                                count++;
                                if (count < allowTotal) {
                                    newGroups[0].menus.push(menu);
                                }
                            }
                        }
                    if (count >= allowTotal) {
                        newGroups[0].menus.push({
                            icon: 'cuIcon-more',
                            color: 'info',
                            title: '更多',
                            msgNum: 0,
                            code: '',
                            image: '',
                            url: "/components/hm/more-menu?idcode=" + this.parentIdcode +
                                "&colorType=" + this.colorType +
                                "&shape=" + this.shape
                        });
                    }
                    groups = newGroups;
                }
                this.groups = groups;
            }
        }
    }
</script>

<style>
    .cu-list.menu-avatar > .cu-item:after {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        border-bottom: 2px solid #ddd;
        border-radius: inherit;
        content: " ";
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        pointer-events: none;
    }
    .cu-avatar {
        background-color: #ffffff;
    }
</style>
