<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block><block slot="content">唤醒的页面</block>
        </cu-custom>
        参数为：{{params}}
    </view>
</template>

<script>
    export default {
        data() {
            return {
                params: ''
            }
        },
        onLoad(options) {
            this.params = JSON.stringify(options);
        }
    }
</script>