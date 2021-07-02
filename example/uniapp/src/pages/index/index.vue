<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
    import {HitBuilders}  from "@ouduidui/ga-tracker";

	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onShow() {
            // 设置屏幕名称
            const t = this.$gaTracker.getInstance()
            t.setScreenName('这是我的首屏页');
            // 上报
            t.send(new HitBuilders.ScreenViewBuilder().build());
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
