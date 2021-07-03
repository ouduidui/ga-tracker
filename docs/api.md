# API参考

所有接口直接参考Google Analytics SDK for Android，可以直接查看对应API文档。

> [参数参考](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cd)

----

## GoogleAnalytics

### `GoogleAnalytics.getInstance(app)`

获取`GoogleAnalytics`实例，在`app`上始终得到同一个实例。


| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `app` | Object | empty Object | 建议使用App对象 |

> **返回** `GoogleAnalytics` 实例

### 实例方法

#### `setAppName(appName)`

设置应用名称

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `appName` | String | "unknown" | 应用名称 |

> **返回** `GoogleAnalytics`

#### `setAppVersion(appVersion)`

设置应用版本

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `appVersion` | String | "unknown" | 小程序版本号 |

> **返回** `GoogleAnalytics`

#### `newTracker(trackingID)`

创建一个`Tracker`实例

| 参数 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `trackingID` | String | 无 | Google Analytics的媒体资源跟踪ID，一般是`UA-XXXX-X`的形式。 |

> **返回** `Tracker`实例

----

## Tracker

跟踪器用来收集数据并发送给谷歌统计服务器。跟踪器跟谷歌统计的媒体资源相对应，你可以创建多个跟踪器分别对应不同的媒体资源。

### 实例方法

#### `setTrackerServer(server)`

设置自定义的跟踪服务器地址

| 参数     | 类型   | 默认                               | 说明                         |
| -------- | ------ | ---------------------------------- | ---------------------------- |
| `server` | String | "https://www.google-analytics.com" | 微信小程序需使用自己合法域名 |

> **返回** `Track`

#### `setAnonymizeIp(anonymize)`

对 IP 地址进行匿名处理

| 参数     | 类型    | 默认 | 说明           |
| -------- | ------- | ---- | -------------- |
| `server` | Boolean | 无   | 匿名处理IP地址 |

> **返回** `Track`

#### `setAppInstallerId(appInstallerId)`

设置应用安装程序ID，用于区分应用安装市场。

| 参数             | 类型   | 默认 | 说明                          |
| ---------------- | ------ | ---- | ----------------------------- |
| `appInstallerId` | String | 无   | 适用于使用`uniapp`的`app`开发 |

> **返回** `Track`

#### `setAppName(appName)`

设置应用名称

| 参数      | 类型   | 默认      | 说明     |
| --------- | ------ | --------- | -------- |
| `appName` | String | "unknown" | 应用名称 |

> **返回** `Track`

#### `setAppVersion(appVersion)`

设置应用版本

| 参数         | 类型   | 默认      | 说明         |
| ------------ | ------ | --------- | ------------ |
| `appVersion` | String | "unknown" | 小程序版本号 |

> **返回** `Track`

#### `setClientId(clientId)`

设置客户端ID

| 参数       | 类型   | 默认                | 说明     |
| ---------- | ------ | ------------------- | -------- |
| `clientId` | String | 自动生成一个新的cid | 客户端ID |

> **返回** `Track`

#### `setUserId(userId)`

设置用户ID

| 参数     | 类型   | 默认 | 说明   |
| -------- | ------ | ---- | ------ |
| `userId` | String | 无   | 用户ID |

> **返回** `Track`

#### `setEncoding(encoding)`

设置文档编码

| 参数       | 类型   | 默认    | 说明     |
| ---------- | ------ | ------- | -------- |
| `encoding` | String | "UTF-8" | 文档编码 |

> **返回** `Track`

#### `setLanguage(language)`

设置用户语言

| 参数       | 类型   | 默认         | 说明     |
| ---------- | ------ | ------------ | -------- |
| `language` | String | 默认系统语言 | 用户语言 |

> **返回** `Track`

#### `setLocation(loacation)`

地理位置替换

| 参数        | 类型   | 默认       | 说明     |
| ----------- | ------ | ---------- | -------- |
| `loacation` | String | 默认IP位置 | 地理位置 |

> **返回** `Track`

#### `setScreenColors(screenColors)`

设置屏幕颜色

| 参数           | 类型   | 默认     | 说明     |
| -------------- | ------ | -------- | -------- |
| `screenColors` | String | "24-bit" | 屏幕颜色 |

> **返回** `Track`

#### `setScreenName(screenName)`

设置屏幕名称，用于`screenView`上报。

| 参数         | 类型   | 默认 | 说明     |
| ------------ | ------ | ---- | -------- |
| `screenName` | String | 无   | 屏幕名称 |

> **返回** `Track`

#### `setViewportSize(viewportSize)`

设置视口大小。

| 参数           | 类型   | 默认         | 说明     |
| -------------- | ------ | ------------ | -------- |
| `viewportSize` | String | 默认系统获取 | 视口大小 |

> **返回** `Track`

#### `send(hit)`

发送请求。

| 参数  | 类型   | 默认 | 说明                         |
| ----- | ------ | ---- | ---------------------------- |
| `hit` | Object | 无   | HitBuidler匹配构建的参数对象 |

> **返回** `Track`

----

## HitBuilder

用来构建一次匹配所需要的所有参数，`HitBuilder` 提供了所有匹配类型都需要的一些公共方法。

一般不需要直接使用 `HitBuilder` , 请根据实际匹配类型使用下面的 `ScreenViewBuilder`, `EventBuilder`, `ExceptionBuilder`, `TimingBuilder`，`SocialBudier`，这些类均为继承`HitBuilder`类，因此`HitBuilder`的实例方法，上述类都有。

### 实例方法

#### `addImpression(product, impressionList)`

添加列表商品，适用于增强型电子商务实现。

| 参数           | 类型   | 默认 | 说明        |
| -------------- | ------ | ---- | ----------- |
| `product`      | Object | 无   | Product实例 |
| impressionList | String | 无   | 列表名称    |

> **返回** `HitBuilder`

#### `addProduct(product)`

添加商品，适用于增强型电子商务实现。

| 参数      | 类型   | 默认 | 说明        |
| --------- | ------ | ---- | ----------- |
| `product` | Object | 无   | Product实例 |

> **返回** `HitBuilder`

#### `addPromotion(promotion)`

添加促销活动，适用于增强型电子商务实现。

| 参数        | 类型   | 默认 | 说明          |
| ----------- | ------ | ---- | ------------- |
| `promotion` | Object | 无   | Promotion实例 |

> **返回** `HitBuilder`

#### `setProductAction(productAction)`

添加产品操作，适用于增强型电子商务实现。

| 参数     | 类型   | 默认 | 说明                                                         |
| -------- | ------ | ---- | ------------------------------------------------------------ |
| `productAction` | Object | 无   | ProductAction实例 |

> **返回** `HitBuilder`

#### `setPromotionAction(action)`

添加促销活动操作，适用于增强型电子商务实现。

| 参数     | 类型   | 默认 | 说明                                                         |
| -------- | ------ | ---- | ------------------------------------------------------------ |
| `action` | String | 无   | 促销活动操作，`click`或`view`；通常用`Promotion`的静态属性赋值 |

> **返回** `HitBuilder`

#### `setCampaignParamsFromUrl(url)`

设置渠道，用于广告系列和渠道来源归因。

| 参数  | 类型   | 默认 | 说明 |
| ----- | ------ | ---- | ---- |
| `url` | String | 无   | 链接 |

> **返回** `HitBuilder`

#### `setCustomDimension(index, dimension)`

设置自定义维度。

| 参数        | 类型   | 默认 | 说明           |
| ----------- | ------ | ---- | -------------- |
| `index`     | Number | 无   | 自定义维度序号 |
| `dimension` | String | 无   | 自定义维度值   |

> **返回** `HitBuilder`

#### `setCustomMetric(index, metric)`

设置自定义指标。

| 参数     | 类型   | 默认 | 说明           |
| -------- | ------ | ---- | -------------- |
| `index`  | Number | 无   | 自定义指标序号 |
| `metric` | String | 无   | 自定义指标值   |

> **返回** `HitBuilder`

#### `setNewSession()`

新开一个会话。

> **返回** `HitBuilder`

#### `setEndSession()`

结束会话。

> **返回** `HitBuilder`

#### `setNonInteraction(nonInteraction)`

设置非互动匹配。

| 参数             | 类型    | 默认 | 说明       |
| ---------------- | ------- | ---- | ---------- |
| `nonInteraction` | Boolean | 无   | 非互动匹配 |

> **返回** `HitBuilder`

#### `build()`

构建该次匹配所需要的所有参数，返回`hit`对象为`Tracker`实例方法`send`的参数。

> **返回** `hit`

----

## ScreenViewBuilder

用来构建屏幕浏览所需要的所有参数，继承`HitBuilder` 所有方法。

----

## EventBuilder

用来构建事件上报所需要的所有参数，继承`HitBuilder` 所有方法。

### 实例方法

#### `setCategory(category)`

设置事件类别。

| 参数       | 类型   | 默认 | 说明     |
| ---------- | ------ | ---- | -------- |
| `category` | String | 无   | 事件类别 |

> **返回** `EventBuilder`

#### `setAction(action)`

设置事件动作。

| 参数     | 类型   | 默认 | 说明     |
| -------- | ------ | ---- | -------- |
| `action` | String | 无   | 事件动作 |

> **返回** `EventBuilder`

#### setLabel(label)`

设置事件标签。

| 参数    | 类型   | 默认 | 说明     |
| ------- | ------ | ---- | -------- |
| `label` | String | 无   | 事件标签 |

> **返回** `EventBuilder`

#### setValue(value)`

设置事件价值。

| 参数    | 类型   | 默认 | 说明                   |
| ------- | ------ | ---- | ---------------------- |
| `value` | Number | 无   | 事件价值，值不得为负数 |

> **返回** `EventBuilder`

----

## ExceptionBuilder

用来构建统计捕获到的异常信息所需要的所有参数，继承`HitBuilder` 所有方法。

### 实例方法

#### `setDescription(description)`

设置异常说明。

| 参数          | 类型   | 默认 | 说明     |
| ------------- | ------ | ---- | -------- |
| `description` | String | 无   | 异常说明 |

> **返回** `ExceptionBuilder`

#### `setFatal(fatal)`

设置异常是否严重。

| 参数    | 类型    | 默认 | 说明         |
| ------- | ------- | ---- | ------------ |
| `fatal` | Boolean | true | 异常是否严重 |

> **返回** `ExceptionBuilder`

----

## TimingBuilder

用来构建用户计时所需要的所有参数，继承`HitBuilder` 所有方法。

### 实例方法

#### `setCategory(category)`

设置用户计时类别。

| 参数       | 类型   | 默认 | 说明         |
| ---------- | ------ | ---- | ------------ |
| `category` | String | 无   | 用户计时类别 |

> **返回** `TimingBuilder`

#### `setVariable(variable)`

设置用户计时变量名称。

| 参数       | 类型   | 默认 | 说明             |
| ---------- | ------ | ---- | ---------------- |
| `variable` | String | 无   | 用户计时变量名称 |

> **返回** `TimingBuilder`

#### setLabel(label)`

设置用户计时标签。

| 参数    | 类型   | 默认 | 说明         |
| ------- | ------ | ---- | ------------ |
| `label` | String | 无   | 用户计时标签 |

> **返回** `TimingBuilder`

#### setValue(value)`

设置用户计时时间(毫秒)。

| 参数    | 类型   | 默认 | 说明               |
| ------- | ------ | ---- | ------------------ |
| `value` | Number | 无   | 用户计时时间(毫秒) |

> **返回** `TimingBuilder`

----

## SocialBuilder

用来构建社交互动所需要的所有参数，继承`HitBuilder` 所有方法。

### 实例方法

#### `setNetWork(network)`

设置社交网络。

| 参数      | 类型   | 默认 | 说明     |
| --------- | ------ | ---- | -------- |
| `network` | String | 无   | 社交网络 |

> **返回** `SocialBuilder`

#### `setAction(action)`

设置社交操作。

| 参数     | 类型   | 默认 | 说明     |
| -------- | ------ | ---- | -------- |
| `action` | String | 无   | 社交操作 |

> **返回** `SocialBuilder`

#### setTarget(target)

设置社交目标。

| 参数     | 类型   | 默认 | 说明     |
| -------- | ------ | ---- | -------- |
| `target` | String | 无   | 社交目标 |

> **返回** `SocialBuilder`

----

## Product

`Product`类是用于增强型电子商务模块，主要是用来初始化商品信息。

### 实例方法

#### setId(id)

设置产品SKU。

| 参数 | 类型   | 默认 | 说明    |
| ---- | ------ | ---- | ------- |
| `id` | String | 无   | 产品sku |

> **返回** `Product`

#### setBrand(brand)

设置产品品牌。

| 参数    | 类型   | 默认 | 说明     |
| ------- | ------ | ---- | -------- |
| `brand` | String | 无   | 产品品牌 |

> **返回** `Product`

#### setName(name)

设置产品名称。

| 参数   | 类型   | 默认 | 说明     |
| ------ | ------ | ---- | -------- |
| `name` | String | 无   | 产品名称 |

> **返回** `Product`

#### setCategory(category)

设置产品分类。

| 参数       | 类型   | 默认 | 说明     |
| ---------- | ------ | ---- | -------- |
| `category` | String | 无   | 产品分类 |

> **返回** `Product`

#### setPrice(price)

设置产品价格。

| 参数    | 类型   | 默认 | 说明     |
| ------- | ------ | ---- | -------- |
| `price` | Number | 无   | 产品价格 |

> **返回** `Product`

#### setQuantity(quantity)

设置产品数量。

| 参数       | 类型   | 默认 | 说明     |
| ---------- | ------ | ---- | -------- |
| `quantity` | Number | 无   | 产品数量 |

> **返回** `Product`

#### setPosition(postition)

设置产品在列表中的位置。

| 参数        | 类型   | 默认 | 说明              |
| ----------- | ------ | ---- | ----------------- |
| `postition` | Number | 无   | 产品位置（1~200） |

> **返回** `Product`

#### setVariant(variant)

设置产品款式。

| 参数      | 类型   | 默认 | 说明     |
| --------- | ------ | ---- | -------- |
| `variant` | String | 无   | 产品款式 |

> **返回** `Product`

#### setCustomDimension(index, value)

设置产品自定义维度。

| 参数    | 类型   | 默认 | 说明           |
| ------- | ------ | ---- | -------------- |
| `index` | Number | 无   | 自定义维度序号 |
| `value` | String | 无   | 自定义维度值   |

> **返回** `Product`

#### setCustomMetric(index, value)

设置产品自定义指标。

| 参数    | 类型   | 默认 | 说明           |
| ------- | ------ | ---- | -------------- |
| `index` | Number | 无   | 自定义指标序号 |
| `value` | String | 无   | 自定义指标值   |

> **返回** `Product`

----

## ProductAction

`ProductAction`类是用于增强型电子商务模块，主要是用来初始化商品动作。

### 构造函数参数

创建实例时需传入对应的商品动作，分别有加购、结算、结算选项、点击、查看详情、交易、退款、从购物车移除。

我们可以使用对应的静态属性作为参数。

```javascript
new ProductAction(ProductAction.ACTION_CLICK)
```

### 静态属性

| 参数值                                 | 说明                                       |
| -------------------------------------- | ------------------------------------------ |
| `ProductAction.ACTION_ADD`             | 把商品加入购物车                           |
| `ProductAction.ACTION_CHECKOUT`        | 描述结算流程，可以分几步进行               |
| `ProductAction.ACTION_CHECKOUT_OPTION` | 结算选项，比如选择支付方式，选择快递方式等 |
| `ProductAction.ACTION_CLICK`           | 商品点击操作                               |
| `ProductAction.ACTION_DETAIL`          | 查看商品详情                               |
| `ProductAction.ACTION_PURCHASE`        | 交易，订单支付完成                         |
| `ProductAction.ACTION_REFUND`          | 退款                                       |
| `ProductAction.ACTION_REMOVE`          | 商品从购物车移除                           |

### 实例方法

#### setCheckoutStep(step)

设置结账步骤。

| 参数   | 类型   | 默认 | 说明     |
| ------ | ------ | ---- | -------- |
| `step` | Number | 无   | 结账步骤 |

> **返回** `ProductAction`

#### setCheckoutOptions(option)

设置结账步骤选项。

| 参数     | 类型   | 默认 | 说明         |
| -------- | ------ | ---- | ------------ |
| `option` | String | 无   | 结账步骤选项 |

> **返回** `ProductAction`

#### setProductActionList(productActionList)

设置产品操作所处的列表。

发生产品操作的列表或集合名称，这是一个可以在“产品操作”设置为“detail”或“click”时发送的附加参数。

| 参数                | 类型   | 默认 | 说明               |
| ------------------- | ------ | ---- | ------------------ |
| `productActionList` | String | 无   | 产品操作所处的列表 |

> **返回** `ProductAction`

#### setProductListSource(productListSource)

设置产品列表来源。

| 参数                | 类型   | 默认 | 说明           |
| ------------------- | ------ | ---- | -------------- |
| `productListSource` | Number | 无   | 自定义指标序号 |

> **返回** `ProductAction`

#### setTransactionCouponCode(transactionCouponCode)

设置交易使用的优惠券代码。

| 参数                    | 类型   | 默认 | 说明       |
| ----------------------- | ------ | ---- | ---------- |
| `transactionCouponCode` | String | 无   | 优惠券代码 |

> **返回** `ProductAction`

#### setTransactionId(transactionId)

设置交易id。

| 参数            | 类型   | 默认 | 说明   |
| --------------- | ------ | ---- | ------ |
| `transactionId` | String | 无   | 交易id |

> **返回** `ProductAction`

#### setTransactionAffiliation(transactionAffiliation)

设置交易关联公司。

| 参数                     | 类型   | 默认 | 说明         |
| ------------------------ | ------ | ---- | ------------ |
| `transactionAffiliation` | String | 无   | 交易关联公司 |

> **返回** `ProductAction`

#### setTransactionRevenue(revenue)

设置交易收入，此值应包含所有运费或税费。

| 参数      | 类型   | 默认 | 说明       |
| --------- | ------ | ---- | ---------- |
| `revenue` | Number | 无   | 交易总收入 |

> **返回** `ProductAction`

#### setTransactionTax(tax)

设置交易税费。

| 参数  | 类型   | 默认 | 说明     |
| ----- | ------ | ---- | -------- |
| `tax` | Number | 无   | 交易税费 |

> **返回** `ProductAction`

#### setTransactionShipping(shipping)

设置交易运费。

| 参数       | 类型   | 默认 | 说明     |
| ---------- | ------ | ---- | -------- |
| `shipping` | Number | 无   | 交易运费 |

> **返回** `ProductAction`



----

## Promotion

`Promotion`类是用于增强型电子商务模块，主要是用来初始化活动促销。

### 静态属性

作为设置促销操作`setPromotionAction`的参数。

| 参数值                   | 说明         |
| ------------------------ | ------------ |
| `Promotion.ACTION_CLICK` | 促销点击动作 |
| `Promotion.ACTION_VIEW`  | 促销浏览动作 |

### 实例方法

#### setId(id)

设置促销ID。

| 参数 | 类型   | 默认 | 说明   |
| ---- | ------ | ---- | ------ |
| `id` | String | 无   | 促销ID |

> **返回** `Promotion`

#### setName(name)

设置促销名称。

| 参数   | 类型   | 默认 | 说明     |
| ------ | ------ | ---- | -------- |
| `name` | String | 无   | 促销名称 |

> **返回** `Promotion`

#### setCreative(creative)

设置促销素材。

| 参数       | 类型   | 默认 | 说明     |
| ---------- | ------ | ---- | -------- |
| `creative` | String | 无   | 促销素材 |

> **返回** `Promotion`

#### setPosition(position)

设置促销位置。

| 参数       | 类型   | 默认 | 说明     |
| ---------- | ------ | ---- | -------- |
| `position` | String | 无   | 促销位置 |

> **返回** `Promotion`

----

## CampaignParams

`CampaignParams`用来设置广告系列和流量来源归因。

### 静态方法

#### parseFromPageOptions(options, map)

通过页面参数解析并设置广告系列和流量来源归因。

| 参数      | 类型   | 默认 | 说明     |
| --------- | ------ | ---- | -------- |
| `options` | Object | {}   | 页面参数 |
| `map`     | Object | {}   | 映射表   |

> **返回** `CampaignParams`

#### parseFromUrl(url)

通过`url`解析并设置广告系列和流量来源归因。

| 参数  | 类型   | 默认 | 说明 |
| ----- | ------ | ---- | ---- |
| `url` | String | 无   | 链接 |

> **返回** `CampaignParams`

#### buildFromWxAppScene(scene)

解析微信小程序场景值。

| 参数    | 类型   | 默认 | 说明   |
| ------- | ------ | ---- | ------ |
| `scene` | String | 无   | 场景值 |

> **返回** `CampaignParams`

### 实例方法

#### set(paramName, paramValue)

设置广告系列和流量来源的参数。`paramName`仅支持广告来源——`utm_source`、广告媒介——`utm_medium`、广告关键字——`utm_term`、广告内容——`utm_content`、广告名称——`utm_campaign`、Google Ads ID——`gclid`和Google 展示广告 ID——`dclid`。

| 参数         | 类型   | 默认 | 说明   |
| ------------ | ------ | ---- | ------ |
| `paramName`  | String | 无   | 参数名 |
| `paramValue` | String | 无   | 参数值 |

> **返回** `CampaignParams`

#### toUrl(url, otherQuery)

设转换成广告推广链接，形式： https://example.com?utm_XXXX=xxxx&utm_YYYY=yyyy。

| 参数         | 类型   | 默认 | 说明         |
| ------------ | ------ | ---- | ------------ |
| `url`        | String | 无   | 域名         |
| `otherQuery` | Object | {}   | 页面其他参数 |

> **返回** `CampaignParams`

