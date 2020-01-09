<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="false">
            <block slot="content">其他功能</block>
        </cu-custom>
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                唤醒原生APP
            </view>
        </view>
        <view class="padding ">
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="awakeApp" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>唤醒应用</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="awakeSelf" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>接收唤醒参数(唤醒自己)</view>
                </view>
            </view>
        </view>
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                sqlLite
            </view>
        </view>
        <view class="padding ">
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="openDb" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>打开数据库test.db</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="createTable" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>创建表</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="sqlInsert" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>插入一条数据</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="sqlQuery" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>当前数据</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="sqlDel" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>删除数据</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="sqlUpdate" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>更新数据</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="dropTable" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>删除表</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="closeDb" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>关闭数据库</view>
                </view>
            </view>
            <view class="margin-bottom-xs flex justify-center">
                <view @tap="isDbOpen" class="cu-btn block bg-blue df"
                      style="border-radius: 40upx;width: 600upx;height: 80upx">
                    <view>是否打开数据库</view>
                </view>
            </view>
        </view>
        <view class="cu-tabbar-height"></view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                schemes : {
                    weixin: {
                        name: '微信',
                        pname: 'com.tencent.mm',
                        scheme: 'weixin://'
                    },
                    alipy: {
                        name: '支付宝',
                        pname: 'com.eg.android.AlipayGphone',
                        scheme: 'alipay://'
                    },
                    taobao: {
                        name: '淘宝',
                        pname: 'com.taobao.taobao',
                        scheme: 'taobao://'
                    },
                    qq: {
                        name: 'QQ',
                        pname: 'com.tencent.mobileqq',
                        scheme: 'mqq://'
                    },
                    jd: {
                        name: '京东',
                        pname: 'com.jingdong.app.mall',
                        scheme: 'openApp.jdMobile://'
                    },
                    sinaweibo: {
                        name: '新浪微博',
                        pname: 'com.sina.weibo',
                        scheme: 'sinaweibo://'
                    },
                    youku: {
                        name: '优酷',
                        pname: 'com.youku.phone',
                        scheme: 'youku://'
                    }
                }
            }
        },
        onLoad(options) {
            console.log("load options:" + JSON.stringify(options));
        },
        onShow(options) {
            console.log("show options:" + JSON.stringify(options));
        },
        methods: {
            awakeApp: function () {
                console.log("唤醒微信，在app应用中有效");
                let that = this;
                // #ifdef APP-PLUS
                if (plus.os.name == 'Android') {
                    plus.nativeUI.actionSheet({
                            title: "选择要唤醒应用", cancel: "取消",
                            buttons: [{title: "微信"}, {title: "支付宝"}, {title: "淘宝"}, {title: "京东"}, {title: "应用带参数"}]
                        },
                        function (e) {
                            switch (e.index) {
                                case 1:
                                    plus.runtime.launchApplication({pname: that.schemes.weixin.pname},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 2:
                                    plus.runtime.launchApplication({pname: that.schemes.alipy.pname},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 3:
                                    plus.runtime.launchApplication({pname: that.schemes.taobao.pname},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 4:
                                    plus.runtime.launchApplication({pname: that.schemes.jd.pname},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 5:
                                    plus.runtime.openURL("market://details?id=io.dcloud.HelloH5",
                                        function(res) {console.log(res);});
                                    break;
                            }
                        })
                } else if (plus.os.name == 'iOS') {
                    plus.nativeUI.actionSheet({
                            title: "选择要唤醒应用", cancel: "取消",
                            buttons: [{title: "微信"}, {title: "支付宝"}, {title: "淘宝"}, {title: "京东"}, {title: "应用带参数"}]
                        },
                        function (e) {
                            switch (e.index) {
                                case 1:
                                    plus.runtime.launchApplication({pname: that.schemes.weixin.scheme},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 2:
                                    plus.runtime.launchApplication({pname: that.schemes.alipy.scheme},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 3:
                                    plus.runtime.launchApplication({pname: that.schemes.taobao.scheme},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 4:
                                    plus.runtime.launchApplication({pname: that.schemes.jd.scheme},
                                        function (e) {console.log('Open system default browser failed: ' + e.message);});
                                    break;
                                case 5:
                                    plus.runtime.openURL("itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8",
                                        function(res) {console.log(res);});
                                    break;
                            }
                        });
                }
                // #endif
            },
            awakeSelf: function () {
                console.log("android在manifest.json里app-plus -> distribute -> android -> schemes 配置当前应用唤醒的地址");
                console.log("ios在manifest.json里app-plus -> distribute -> ios -> urltypes 配置当前应用唤醒的地址");
                console.log("唤醒参数在App.vue的onShow里可以直接获取");
                console.log("如果是调试模式，uni-app自带的唤醒地址为hbuilder://...,不启用manifest.json里面的配置")
                // #ifdef APP-PLUS
                // 如果是调试模式，uni-app自带的唤醒地址为hbuilder://...,不启用manifest.json里面的配置
                plus.runtime.openURL("hbuilder://pages/other/awake?param1=1&param2=2", function(res) {
                    console.log(res);
                });
                // #endif
            },
            openDb: function () {
                // #ifdef APP-PLUS
                plus.sqlite.openDatabase({
                    name: 'first',
                    path: '_doc/test.db',
                    success: function(e) {
                        plus.nativeUI.alert('打开数据库test.db成功 ');
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('打开数据库test.db失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            createTable: function () {
                // #ifdef APP-PLUS
                plus.sqlite.executeSql({
                    name: 'first',
                    sql: 'create table if not exists myTable("name" CHAR(110),"sex" CHAR(10),"age" INT(11))',
                    success: function(e) {
                        plus.nativeUI.alert('创建表myTable成功: ' + JSON.stringify(e));
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('创建表myTable失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            sqlInsert: function () {
                // #ifdef APP-PLUS
                plus.sqlite.executeSql({
                    name: 'first',
                    sql: "insert into myTable values('彦','女','7000')",
                    success: function(e) {
                        plus.nativeUI.alert('插入数据成功: ' + JSON.stringify(e));
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('插入数据失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            sqlQuery: function () {
                // #ifdef APP-PLUS
                plus.sqlite.selectSql({
                    name: 'first',
                    sql: 'select * from myTable',
                    success: function(e) {
                        plus.nativeUI.alert('查询SQL语句成功: ' + JSON.stringify(e));
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            sqlDel: function () {
                // #ifdef APP-PLUS
                plus.sqlite.executeSql({
                    name: 'first',
                    sql: "DELETE FROM myTable where age=7000",
                    success: function(e) {
                        plus.nativeUI.alert('删除数据成功: ' + JSON.stringify(e));
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('删除数据失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            sqlUpdate: function () {
                // #ifdef APP-PLUS
                plus.sqlite.executeSql({
                    name: 'first',
                    sql: "UPDATE myTable SET age=5000 where age=7000",
                    success: function(e) {
                        plus.nativeUI.alert('插入数据成功: ' + JSON.stringify(e));
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('插入数据失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            dropTable: function () {
                // #ifdef APP-PLUS
                plus.sqlite.executeSql({
                    name: 'first',
                    sql: 'drop table myTable',
                    success: function(e) {
                        plus.nativeUI.alert('删除表myTable成功');
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('删除表myTable失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            closeDb: function () {
                // #ifdef APP-PLUS
                plus.sqlite.closeDatabase({
                    name: 'first',
                    success: function(e) {
                        plus.nativeUI.alert('关闭数据库成功：' + JSON.stringify(e));
                    },
                    fail: function(e) {
                        plus.nativeUI.alert('关闭数据库失败: ' + JSON.stringify(e));
                    }
                });
                // #endif
            },
            isDbOpen: function () {
                // #ifdef APP-PLUS
                if (
                    plus.sqlite.isOpenDatabase({
                        name: 'first',
                        path: '_doc/test.db'
                    })
                ) {
                    plus.nativeUI.alert('Opened!');
                } else {
                    plus.nativeUI.alert('Unopened!');
                }
                // #endif
            }
        }
    }
</script>

<style>

</style>