<template>
    <view>
        <cu-custom bgColor="bg-gradual-pink" :isBack="false"><block slot="content">系统组件</block></cu-custom>
        <view class="cu-bar bg-white solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                load组件
            </view>
        </view>
        <view class="padding ">
            <hm-loading :show="true"></hm-loading>
        </view>
        <view class="padding bg-white solid-top">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明：</view>
                <view class="">1) show：类型Boolean，默认true，是否显示</view>
            </view>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                公告组件
            </view>
        </view>
        <view>
            <hm-notice></hm-notice>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                待办列表
            </view>
        </view>
        <view>
            <hmTodoList></hmTodoList>
        </view>
        <view class="padding bg-white solid-top">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明：</view>
                <view class="">1) height：类型String，默认100%，对应css的height属性</view>
            </view>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                流程流转
            </view>
        </view>
        <view>
            <hmWorkflowStep></hmWorkflowStep>
        </view>
        <view class="padding bg-white solid-top">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明（属性二选一必填）：</view>
                <view class="">1) bizId：类型String，默认空，流程业务id</view>
                <view class="">2) procInstId：类型String，默认空，流程id</view>
            </view>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                图片上传：单图
            </view>
        </view>
        <view>
            <hm-image></hm-image>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                图片上传：多图
            </view>
        </view>
        <view>
            <hm-image :multiple="true"></hm-image>
        </view>
        <view class="padding bg-white solid-top">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明：</view>
                <view class="">1) multiple：类型Boolean，默认false，是否多图</view>
                <view class="">2) fileId：类型String，默认空，图片服务器的fileId</view>
                <view class="">3) config：类型Object，默认详见组件，属性如下：</view>
                <view class="">appCode：服务器对应appCode</view>
                <view class="">confirm：文件上传后，是否设置为已决状态</view>
                <view class="">sizeType：original原图，compressed压缩图</view>
                <view class="">sourceType：album从相册选图，camera使用相机</view>
            </view>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                二态编辑器
            </view>
        </view>
        <view class="padding">
            <hmDimorphic @change="checkChange" :checked="true"
                         checkedValue="1" uncheckedValue="0">
                <view class="text-lg">请选择</view>
            </hmDimorphic>
        </view>
        <view class="padding bg-white solid-top">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明（属性二选一必填）：</view>
                <view class="">1) @change：值改变事件处理函数</view>
                <view class="">2) checked：类型Boolean，默认false，默认是否选中</view>
                <view class="">3) checkedValue：类型String，默认空，选中的值</view>
                <view class="">4) uncheckedValue：类型String，默认空，未选中的值</view>
            </view>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                菜单组件
            </view>
        </view>
        <view class="padding bg-white">
            <navigator class="flex justify-between" url="/pages/sys-component/menu">
                <view>篇幅较大，点击查看</view>
                <view class="cuIcon-right text-gray" style="width:30upx;"></view>
            </navigator>
        </view>

        <view class="cu-bar bg-white  margin-top solid-bottom margin-bottom-xs">
            <view class="action">
                <text class="cuIcon-title text-blue"></text>
                搜索组件
            </view>
        </view>
        <view class="bg-white">
            <hm-search :click-to-search-page="true"><view class="cuIcon-scan" style="font-size: 50upx"></view></hm-search>
        </view>
        <view class="padding bg-white solid-top">
            <view class="flex flex-wrap flex-direction">
                <view class="">组件属性说明：</view>
                <rich-text class="text-df" :nodes="searchDesc"></rich-text>
            </view>
        </view>
        <view class="cu-tabbar-height"></view>
    </view>
</template>

<script>
    import hmLoading from 'components/hm/hm-loading'
    import hmNotice from 'components/hm/hm-notice'
    import hmTodoList from 'components/hm/hm-todo-list'
    import hmWorkflowStep from 'components/hm/hm-workflow-step'
    import hmImage from 'components/hm/hm-image'
    import hmDimorphic from 'components/hm/hm-dimorphic'
    import hmSearch from 'components/hm/hm-search'

    export default {
        data() {
            return {
                searchDesc: "支持双模式，一种是点击跳转到搜索页面，一种是当前页面使用搜索组件<br/>" +
                    "clickToSearchPage属性：<br/>" +
                    "是否搜索框跳到搜索页面,是的话可以自定义搜索页面，修改searchPage值<br/>" +
                    "支持在搜索框后面添加自己的组件，如：<br/>" +
                    "<hm-search v-bind:click-to-search-page=\"true\"><br/>" +
                    "    <view class=\"hm-icon hm-icon-scan hm-icon-lg hm-margin-left-sm\"></view><br/>" +
                    "</hm-search>"
            }
        },
        components: {
            hmLoading, hmNotice, hmTodoList, hmWorkflowStep, hmImage, hmDimorphic, hmSearch
        },
        methods: {
            checkChange(value) {
                uni.showModal({
                    title: '复选框当前值',
                    content: value,
                    showCancel: false,
                });
            }
        }
    }
</script>
<style>
    .cu-list.menu-avatar > .cu-item:after {
        content: "";
        width: 0;
        height: 0
    }
</style>
