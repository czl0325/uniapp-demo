<template>
	<view>
		<basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<sys-components v-if="PageCur=='sysComponent'"></sys-components>
		<page v-if="PageCur=='page'"></page>
		<other v-if="PageCur=='other'"></other>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'component'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view>
			<view class="action" @click="NavChange" data-cur="sysComponent">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/sysComponent' + [PageCur == 'sysComponent'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='sysComponent'?'text-green':'text-gray'">系统组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="page">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/page' + [PageCur == 'page'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='page'?'text-green':'text-gray'">页面</view>
			</view>
			<view class="action" @click="NavChange" data-cur="other">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/other' + [PageCur == 'other'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='other'?'text-green':'text-gray'">其他</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'basics'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>
	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.5);
	}
	.cu-bar .action [class*="cuIcon-cu-image"] {
		line-height: 0.8;
	}
</style>
