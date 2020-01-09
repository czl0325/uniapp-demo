<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">更多菜单</block>
        </cu-custom>
        <block v-for="(group,i) in groups" :key="i">
            <view v-if="group.title" class="g-caption">{{group.title}}</view>
            <block v-if="group.menus.length && group.menus.length > 0">
                <view class="cu-list menu-avatar">
                    <view @tap="clickMenu(item)" class="cu-item" v-for="(item,index) in group.menus" :key="index">
                        <view class="cu-avatar lg "
                              :class="[(item.icon && item.icon != '') ? item.icon : '', (item.image && item.image != '') ?'bg-img':'',
                                (colorType == 1  ? 'text-' : 'bg-' ) + item.color]"
                              :style="(shape == 1 ? 'border-radius: 50%;' : 'border-radius: 10%;') + ((item.image && item.image != '') ? 'background-image: url(' + item.image + ');' : '')"></view>
                        <view class="content">
                            {{item.title}}
                        </view>
                        <view class="action" v-if="item.msgNum && item.msgNum!=0">
                            <view class="cu-tag round bg-red lg" style="width: 40upx;height:40upx">
                                {{item.msgNum>99?'99+':item.msgNum}}
                            </view>
                        </view>
                        <view class="action" style="width: 30upx">
                            <view class="cuIcon-right text-gray"></view>
                        </view>
                    </view>
                </view>
            </block>
        </block>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                colorType: 1,
                shape: 1,
                idcode: null,
                groups: null
            }
        },
        mounted() {
            this.fetchGroups();
        },
        onLoad: function (options) {
            this.colorType = options.colorType ? parseInt(options.colorType) : 1;
            this.shape = options.shape ? parseInt(options.shape) : 1;
            this.idcode = options.idcode;
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
            async fetchGroups() {
                let allGroups = uni.getStorageSync('es_allGroups');
                outer:
                    for (let allGroup of allGroups) {
                        if (this.idcode == allGroup.idcode) {
                            this.groups = allGroup.groups;
                            break outer;
                        }
                        for (let group of allGroup.groups) {
                            if (this.idcode == group.idcode) {
                                this.groups = [];
                                this.groups.push(group);
                                break outer;
                            }
                        }
                    }
            }
        },
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
