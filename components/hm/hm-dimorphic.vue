<!--
二态编辑器
1) @change：值改变事件处理函数</view>
2) checked：类型Boolean，默认false，默认是否选中</view>
3) checkedValue：类型String，默认空，选中的值</view>
4) uncheckedValue：类型String，默认空，未选中的值</view>
-->
<template>
    <view>
        <checkbox-group class="block" @change="checkboxChange">
            <view class="flex">
                <checkbox class='round margin-right' :class="isChecked?'checked':''" :checked="isChecked?true:false"></checkbox>
                <slot></slot>
            </view>
        </checkbox-group>
    </view>
</template>

<script>
    export default {
        props: {
            checkedValue: String,
            uncheckedValue: String,
            checked: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                value: null,
            }
        },
        mounted() {
            if (this.checked) {
                this.value = this.checkedValue;
            } else {
                this.value = this.uncheckedValue;
            }
        },
        computed: {
            isChecked() {
                return this.value === this.checkedValue;
            }
        },
        methods: {
            checkboxChange(e) {
                let values = e.detail.value;
                if (values && values.length > 0) {
                    this.value = this.checkedValue;
                    this.$emit('change', this.checkedValue);
                } else {
                    this.value = this.uncheckedValue;
                    this.$emit('change', this.uncheckedValue);
                }
            }
        }
    }
</script>

<style>

</style>
