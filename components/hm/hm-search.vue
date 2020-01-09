<!--支持双模式，一种是点击跳转到搜索页面，一种是当前页面使用搜索组件
clickToSearchPage属性：
是否搜索框跳到搜索页面,是的话可以自定义搜索页面，修改searchPage值
支持在搜索框后面添加自己的组件，如：
<hm-search v-bind:click-to-search-page="true">
    <view class="hm-icon hm-icon-scan hm-icon-lg hm-margin-left-sm"></view>
</hm-search>-->
<template>
    <view>
        <view class="cu-bar bg-white search">
            <view class="search-form round">
                <text class="cuIcon-search"></text>
                <input @focus="inputFocus" @tap="inputClick" type="text" v-model="text" placeholder="搜索菜单..." confirm-type="search" maxlength="15"></input>
                <view v-if="text && text != ''" @tap="clear" class="cuIcon-roundclosefill" style="font-size:40upx"></view>
            </view>
            <view class="margin-right">
                <view @tap="search(text)" v-if="!clickToSearchPage" class="margin-right text-primary" style="font-size:30upx">搜索</view>
                <slot></slot>
            </view>
        </view>
        <view v-show="!clickToSearchPage && showHistory && history.length > 0" class="bg-white">
            <view class="solid-top solid-bottom flex justify-between padding">
                <view class="text-lg text-bold">搜索历史</view>
                <view @tap="clearHistory" class="cuIcon-deletefill" style="font-size: 32upx"></view>
            </view>
            <view class="flex justify-between flex-wrap padding">
                <view @tap="search(item, true)" v-for="(item, index) in history" :key="index" class="cu-btn bg-grey sm round margin-bottom-xs" style="width: 300upx;font-size: 30upx">{{item}}</view>
            </view>
        </view>
        <block v-if="menus && menus.length > 0">
            <view class="cu-list menu-avatar">
                <view @tap="clickMenu(item)" class="cu-item" v-for="(item,index) in menus" :key="index">
                    <view class="cu-avatar lg text-primary bg-white"
                          :class="[(item.icon && item.icon != '') ? item.icon : '', (item.image && item.image != '') ?'bg-img':'']"
                          :style="(item.image && item.image != '') ? 'background-image: url(' + item.image + ');' : ''"></view>
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
    </view>
</template>

<script>
    export default {
        name: 'hm-search',
        props: {
            // 是否搜索框跳到搜索页面,是的话可以自定义搜索页面，修改searchPage值
            clickToSearchPage: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            searchPage: {
                type: String,
                default() {
                    return "/pages/search-page";
                }
            }
        },
        data() {
            return {
                text: '',
                menus: null,
                showHistory: false,
                history:[]
            }
        },
        mounted() {
            let history = uni.getStorageSync("es_searchHistory");
            if (history != null && history != '') {
                let item = history.pop();
                while (item != null) {
                    this.history.push(item);
                    item = history.pop();
                }
            }
        },
        methods: {
            search: function (text, fromHistory) {
                if (text == null || text.trim() == '') {
                    return;
                }
                this.text = text;
                this.searchHistory(text, fromHistory);
                let menus = uni.getStorageSync("es_allMenus");
                this.menus = [];
                for (let menu of menus) {
                    if (menu.title.indexOf(text) != -1) {
                        this.menus.push(menu);
                    }
                }
                // 菜单消息数量
                /*let todoData = await this.$rop.post({
                    method: "msg.num.todo.get",
                    data:{xtype: "MOBILE"}});
                if (todoData.message > 0) {
                    let rows = todoData.todoList;
                    if (rows && rows.length > 0) {
                        outer:
                        for (let row of rows) {
                            for (let menu of this.menus) {
                                if (menu.appMenuId == row.appMenuId) {
                                    menu.msgNum = row.todoNum;
                                    continue outer;
                                }
                            }
                        }
                    }
                }*/
            },
            searchHistory: function(text, fromHistory) {
                this.showHistory = false;
                let history = uni.getStorageSync("es_searchHistory");
                if (!fromHistory) {
                    if (history == null || history == '') {
                        history = [];
                    }
                    history.push(text);
                    if (history.length > 4) {
                        history.splice(0, 1);
                    }
                    uni.setStorageSync("es_searchHistory", history);
                }
                this.history = [];
                let item = history.pop();
                while (item != null) {
                    this.history.push(item);
                    item = history.pop();
                }
            },
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
            clear: function () {
                this.text = '';
            },
            inputClick: function () {
                if (this.clickToSearchPage) {
                    uni.navigateTo({
                        url: this.searchPage
                    });
                }
            },
            inputFocus: function () {
                this.showHistory = true;
            },
            clearHistory: function () {
                uni.setStorageSync("es_searchHistory", []);
                this.history = [];
            }
        }
    }
</script>

<style>
</style>