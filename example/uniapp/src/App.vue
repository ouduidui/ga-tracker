<script>
    import {CampaignParams} from "../../../dist/ga";

	export default {
		onLaunch: function(options) {
			console.log('App Launch');
            if (options && options.scene) {
                const campaignUrl = CampaignParams.buildFromWxAppScene(options.scene).toUrl();
                this.$gaTracker.setCampaignParamsOnNextHit(campaignUrl);

                // 下一个发送的匹配就会带上微信场景信息
                // this.$gaTracker.send(Hit)
            }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
