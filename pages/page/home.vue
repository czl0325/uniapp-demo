<template>
    <view>
        <cu-custom bgColor="bg-gradual-orange" :isBack="false">
            <block slot="content">页面展示</block>
        </cu-custom>
        <view class="flex margin-bottom-lg bg-white">
            <view class="g-margin0 text-bold text-xxl solid-bottom padding-tb-lg"
                  style="width: 100%; text-align: center">
                以下是页面展示
            </view>
        </view>
        <view class="uni-common-pb">
            <view class="uni-card" v-for="(list,index) in lists" :key="index">
                <view class="uni-list">
                    <view class="uni-list-cell uni-collapse">
                        <view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover"
                              :class="list.open ? 'uni-active' : ''"
                              @click="triggerCollapse(index)">
                            {{list.name}}
                        </view>
                        <view class="uni-list uni-collapse" :class="list.open ? 'uni-active' : ''">
                            <view class="uni-list-cell" hover-class="uni-list-cell-hover"
                                  v-for="(item,key) in list.pages" :key="key" :url="item.url"
                                  @click="goDetailPage(item)">
                                <view class="uni-list-cell-navigate uni-navigate-right"> {{item.name}}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            const list = [{
                id: 'euler-page',
                name: 'euler系统页面',
                open: false,
                pages: [{
                    name: '登录页',
                    prefix: 'euler',
                    url: 'login'
                }, {
                    name: '框架页',
                    prefix: 'euler',
                    url: 'main'
                }, {
                    name: '404',
                    prefix: 'euler',
                    url: '404'
                }, {
                    name: '500',
                    prefix: 'euler',
                    url: '500'
                }, {
                    name: '网络不给力',
                    prefix: 'euler',
                    url: 'net-disconnect'
                }, {
                    name: '企业微信用户错误',
                    prefix: 'euler',
                    url: 'user-not-bind'
                }, {
                    name: '用户绑定',
                    prefix: 'euler',
                    url: 'user-bind'
                }, {
                    name: '公众号用户中心',
                    prefix: 'euler',
                    url: 'user-center'
                }]
            }];
            return {
                lists: list
            }
        },
        methods: {
            triggerCollapse(index) {
                if (!this.lists[index].pages) {
                    this.goDetailPage(this.lists[index]);
                    return;
                }
                for (let i = 0; i < this.lists.length; ++i) {
                    if (index === i) {
                        this.lists[i].open = !this.lists[index].open;
                    } else {
                        this.lists[i].open = false;
                    }
                }
            },
            goDetailPage(item) {
                if (item.url && item.url != '') {
                    let prefix = item.prefix ? item.prefix + "/" : "";
                    let url = '/pages/page/' + prefix + item.url;
                    if (item.param) {
                        url += item.param;
                    }
                    uni.navigateTo({
                        url: url
                    })
                }
            }
        }
    }
</script>

<style>
    .solid-bottom::after {
        border-bottom: 4 upx solid rgba(0, 0, 0, 0.5);
    }
</style>
