<template>
  <div class="orderCreate van-safe-area-top overflow_a" :class="[7].includes(BuyOrderDetail.status) ? 'overflow_a' : ''">
    <!-- <nav-bar :mode="processActive == 4 ? 'white' : 'transparent'" @click-left="onClickLeft" /> -->
    <!-- <nav-bar mode="white" /> -->

    <van-nav-bar class="processActive" title="" left-arrow @click-left="onClickLeft"
      :class="processActive == 4 ? 'processActive' : ''" />
    <div class="top_wrop" v-if="seller && !SellOrder && processActive != 4 && ![7].includes(BuyOrderDetail.status)"
      :class="[2, 4, 5, 9, 10].includes(BuyOrderDetail.status) ? 'back_white' : ''">
      <div class="top_orderNum">
        挂单编号
        <span>{{ SellOrderNum }}</span>
      </div>
      <div class="top_orderAmount">
        挂单金额
        <span>{{ SellOrderAmount }}</span>
        GDB
        <span :class="SellOrderIs_split == 1 ? 'green_f' : 'red_f'" class="right">
          {{ SellOrderIs_split == 1 ? '可拆分' : '不可拆分' }}
        </span>
      </div>
    </div>
    <div class="titleProcess" :class="seller ? 'top_margin20' : ''" v-if="![2, 4, 5, 8, 9, 10].includes(BuyOrderDetail.status) && processActive !== 4 && !SellOrder
      ">
      <van-row justify="space-between">
        <van-col span="8" class="process" :class="processActive == 1 ? 'processActive' : ''" @click="Goprocess(1)">
          <div class="Onode flex_s">
            <div class="Pbg">
              {{ processActive == 1 ? '1' : '' }}
              <van-icon name="success" v-if="processActive > 1" />
            </div>
            <div class="point"><span v-for="e in Array(6)"></span></div>
          </div>
          <p>订单已生成</p>
        </van-col>
        <van-col span="8" class="process" :class="processActive == 2 ? 'processActive' : ''" @click="Goprocess(2)">
          <div class="Onode flex_s">
            <div class="Pbg">
              {{ processActive == 2 ? '2' : '' }}
              <van-icon name="success" v-if="processActive > 2" />
            </div>
            <div class="point"><span v-for="e in Array(6)"></span></div>
          </div>
          <p>{{ seller ? '等待买家付款' : '向卖家付款' }}</p>
        </van-col>
        <van-col span="8" class="process" :class="processActive == 3 ? 'processActive' : ''" @click="Goprocess(3)">
          <div class="Onode flex_s">
            <div class="Pbg">3</div>
          </div>
          <p>等待放行</p>
        </van-col>
      </van-row>
    </div>

    <!-- 评分 -->
    <div class="Ocomplete" v-else-if="!SellOrder && processActive == 4">
      <div class="Cpic">
        <van-icon name="checked" />
        <p class="text">交易完成！</p>
      </div>
      <div class="Camount">
        您已{{ seller ? '出售' : '获得' }}：
        <span>
          {{
            (+BuyOrderDetail.buy_num).toTruncFixed(2) ||
            (+BuyOrderDetail.remaining_num).toTruncFixed(2)
          }}
          GDB
        </span>
      </div>
      <!-- 评分交易 -->
      <div class="O_orderInfo pingfen">
        <div class="O_num">
          {{ SellOrder ? '挂单编号' : '订单编号' }}
          <span class="O_nums">{{ BuyOrderDetail.order_id }}</span>
        </div>
        <div class="O_num" :class="SellOrder ? 'm_SellOrder' : ''">
          {{ SellOrder ? '挂单金额' : seller ? '出售数量' : '购买数量' }}
          <span class="O_nums">
            {{
              (BuyOrderDetail.buy_num && (+BuyOrderDetail.buy_num).toTruncFixed(2)) ||
              (+BuyOrderDetail.sell_num).toTruncFixed(2)
            }}
            GDB
          </span>
        </div>
        <div v-if="!SellOrder" :class="!seller ? 'O_amount' : 'O_count'">
          {{ seller ? '获得金额' : '付款金额' }}
          <span class="O_nums bigtxt">
            ￥{{ BuyOrderDetail.buy_num || BuyOrderDetail.remaining_num }}
            <!-- <van-icon name="label-o" class="copy" size="16" 
              @click="copy(BuyOrderDetail.buy_num || BuyOrderDetail.remaining_num)" /> -->
          </span>
        </div>
        <div class="O_amount" v-if="!SellOrder && seller">
          {{ '额外奖励' }}
          <span class="O_nums1">
            {{ BuyOrderDetail.sell_gift && (+BuyOrderDetail.sell_gift).toTruncFixed(2) }} GDB
          </span>
        </div>

        <div class="O_amount" v-if="SellOrder">
          是否可拆分
          <span class="O_nums" :class="BuyOrderDetail.is_split == 1 ? 'green_f' : 'red_f'">
            {{ BuyOrderDetail.is_split == 1 ? '可拆分' : '不可拆分' }}
          </span>
        </div>
      </div>
      <p class="Ctips" :class="seller ? 'S_Ctips' : ''">
        请为{{ seller ? '买家' : '卖家' }}进行评分
      </p>
      <div class="integral">
        <div class="left">
          <van-image lazy-load class="Oavatar" :src="BuyOrderDetail.sell_info &&
            BuyOrderDetail.sell_info.headimg &&
            imgserver_url + (seller ? BuyOrderDetail.headimg : BuyOrderDetail.sell_info?.headimg)
            " />
          <span class="OuserName van-ellipsis">
            {{ seller ? BuyOrderDetail.nickname : BuyOrderDetail.sell_info?.nickname }}
          </span>
        </div>
        <div class="left flex_sz height100">
          <div>
            <van-rate v-model="integral" :disabled="!(
                (seller && !!!BuyOrderDetail.seller_star) ||
                (!seller && !!!BuyOrderDetail.buyer_star)
              )
              " :size="20" color="#ffd21e" />
            <span>{{ integral }}星</span>
          </div>
        </div>
      </div>
    </div>

    <div class="Fcontent van-safe-area-bottom">
      <div v-if="processActive !== 4" class="clearfix">
        <!-- 上方标题 -->
        <div v-if="!SellOrder">
          <div class="O_title" v-if="[2, 4, 5].includes(BuyOrderDetail.status)">
            订单已取消
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 1">
            {{ SellOrder ? '挂单已生成' : '订单已生成' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 3">
            {{ seller ? '等待买家付款' : '向卖家付款' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 6">
            {{ seller ? '买家已付款' : '等待卖家放行' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 7">
            {{ seller ? '买家已付款' : '等待卖家放行' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 8">
            交易完成
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 9">
            订单已取消
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 10">
            交易完成
          </div>

          <!-- 下方小文字提示 -->
          <div class="O_tips" v-if="BuyOrderDetail.status === 1">
            {{ seller ? '在' : '等待卖家确认交易，' }}
            <span class="O_red">{{ secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }}</span>
            后交易将取消
          </div>

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 2">
            {{ seller ? '卖家' : '卖家' }}取消交易
          </div>

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 3 && seller">
            在
            <span class="O_red">{{ secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }}</span>
            后交易将取消
          </div>

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 3 && !seller">
            请在
            <span class="O_red">{{ secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }}</span>
            内付款给卖家
            <br />
            请使用本人账号进行付款
          </div>

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 4">
            {{ seller ? '买家付款超时' : '买家付款超时' }}
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 5">
            {{ seller ? '买家' : '买家' }}取消交易
          </div>
          <!-- <div class='O_tips' v-else-if="BuyOrderDetail.status === 6">{{ seller ? '买家' : '买家' }}已付</div> -->

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 6 && seller">
            <span class="O_red">为避免损失，请确认到账后再进行放行，放行后将划转您的GD币</span>
            <br />
            <span class="O_red">{{ secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }}</span>
            后可发起申诉
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 6 && !seller">
            <span class="O_red">{{ secondsToMinutesWithSeconds(BuyOrderDetail.time_second) }}</span>
            后可发起申诉
          </div>

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 7">
            {{ SellOrder ? '取消卖出' : seller ? `请` : '确认超时您可以提交申诉材料进行申诉' }}
            <span v-if="!SellOrder && seller" class="O_red">
              确认到账
            </span>
            {{ !SellOrder && seller ? '后，进行放行！' : '' }}
            <br />
            {{ !SellOrder && seller ? '确认超时时您可以提交申诉材料进行申诉' : '' }}
          </div>
          <!-- <div class='O_tips' v-if="BuyOrderDetail.status === 7 && !seller && !SellOrder">确认超时时您可以提交申诉材料进行申诉</div> -->

          <div class="O_tips" v-else-if="BuyOrderDetail.status === 8">
            已完成
          </div>
          <div class="O_tips O_red big_tit" v-else-if="BuyOrderDetail.status === 9">
            申诉强制取消
          </div>
          <div class="O_tips O_red big_tit" v-else-if="BuyOrderDetail.status === 10">
            申诉强制成功
          </div>
        </div>

        <!-- 挂单时的页面 -->
        <div v-else>
          <div class="O_title" v-if="[2, 4, 5, 9, 10].includes(BuyOrderDetail.status)">
            订单已取消
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 1">
            {{ SellOrder ? '挂单已生成' : '订单已生成' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 3">
            {{ seller ? '等待买家付款' : '向卖家付款' }}
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 6">
            全部完成
          </div>
          <div class="O_title" v-else-if="BuyOrderDetail.status == 7">
            取消挂单
          </div>

          <!-- 挂单时的页面下方小文字提示 -->
          <div class="O_tips" v-if="BuyOrderDetail.status === 1">
            挂单中
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 2">
            确认交易中
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 3">
            等待买家付款
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 4">
            确认收款中
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 5">
            挂起待确认
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 6">
            全部完成
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 7">
            取消卖出
          </div>
          <div class="O_tips" v-else-if="BuyOrderDetail.status === 8">
            部分完成
          </div>
        </div>

        <!-- 头像和提醒 -->
        <div class="O_username flex_s" v-if="!SellOrder">
          <van-image lazy-load class="Oavatar" :src="t_pic" />
          <span class="OuserName van-ellipsis">
            {{ seller ? BuyOrderDetail.nickname : BuyOrderDetail.sell_info?.nickname }}
          </span>
          <van-button v-if="![2, 4, 5, 8, 9, 10].includes(BuyOrderDetail.status)" type="primary" :disabled="tixin > 0"
            @click="
              Reminders({ buy_order_id: BuyOrderDetail.order_id }).then(data => {
                if (data instanceof Array && data.length == 0 && (data as any).code != 0) return
                showToast({ message: '提醒成功', icon: success })
                tixin = 60
              })
              " class="contactSeller">
            <van-icon name="chat-o" />
            {{ tixin > 0 ? tixin : '交易提醒' }}
          </van-button>
        </div>

        <!-- 支付方式信息 -->
        <div class="O_orderInfo O_pay clearfix" v-if="(!SellOrder && !seller && [3, 6, 7, 8, 9, 10].includes(BuyOrderDetail.status)) ||
          (!SellOrder && seller && [6, 7, 8, 9, 10].includes(BuyOrderDetail.status))
          ">
          <div v-if="BuyOrderDetail.coin_protocol == 'BANK'">
            <van-image class="payImg" lazy-load :src="requireImg('common/credit.png')" />
            <span class="payTitle">银行卡支付</span>
          </div>
          <div v-if="BuyOrderDetail.coin_protocol == 'ALIPAY'">
            <van-image class="payImg" lazy-load :src="requireImg('common/alipay.png')" />
            <span class="payTitle">支付宝支付</span>
          </div>
          <div v-if="BuyOrderDetail.coin_protocol == 'WXPAY'">
            <van-image class="payImg" lazy-load :src="requireImg('common/WeChatPay.png')" />
            <span class="payTitle">微信支付</span>
          </div>
          <div class="O_count">
            姓名
            <span class="O_nums">
              {{
                seller ? BuyOrderDetail.pay_realname : BuyOrderDetail.sell_info?.collection_realname
              }}
              <van-icon name="label-o" class="copy" size="16" @click="
              copy(
                seller
                  ? BuyOrderDetail.pay_realname
                  : BuyOrderDetail.sell_info?.collection_realname
              )
                " />
            </span>
          </div>
          <div class="O_count">
            {{
              seller ? BuyOrderDetail.pay_bankname : BuyOrderDetail.sell_info?.collection_bankname
            }}账号
            <span class="O_nums">
              {{ seller ? BuyOrderDetail.pay_cardid : BuyOrderDetail.sell_info?.collection_cardid }}

              <van-icon name="label-o" size="16" class="copy" @click="
                copy(
                  seller ? BuyOrderDetail.pay_cardid : BuyOrderDetail.sell_info?.collection_cardid
                )
                " />
            </span>
          </div>
          <div class="O_amount clearfix" v-if="!seller && pay_pic">
            付款码
            <div class="O_nums">
              <van-image class="payImg1" lazy-load @click="showImagePreview([pay_pic])" :src="pay_pic" />
            </div>
          </div>
        </div>

        <!-- 交易信息 -->
        <div class="O_orderInfo">
          <div class="O_num">
            {{ SellOrder ? '挂单编号' : '订单编号' }}
            <span class="O_nums">{{ BuyOrderDetail.order_id }}</span>
          </div>
          <div class="O_num" :class="SellOrder ? 'm_SellOrder' : ''">
            {{ SellOrder ? '挂单金额' : seller ? '出售数量' : '购买数量' }}
            <span class="O_nums">
              {{
                (BuyOrderDetail.buy_num && (+BuyOrderDetail.buy_num).toTruncFixed(2)) ||
                (+BuyOrderDetail.sell_num).toTruncFixed(2)
              }}
              GDB
            </span>
          </div>
          <div v-if="!SellOrder" :class="!seller ? 'O_amount' : 'O_count'">
            {{ seller ? '获得金额' : '付款金额' }}
            <span class="O_nums">
              ￥ {{ BuyOrderDetail.buy_num || BuyOrderDetail.remaining_num }}
              <!-- <van-icon name="label-o" class="copy" size="16" 
                @click="copy(BuyOrderDetail.buy_num || BuyOrderDetail.remaining_num)" /> -->
            </span>
          </div>
          <div class="O_amount" v-if="!SellOrder && seller">
            {{ '额外奖励' }}
            <span class="O_nums1">
              {{ BuyOrderDetail.sell_gift && (+BuyOrderDetail.sell_gift).toTruncFixed(2) }} GDB
            </span>
          </div>

          <div class="O_amount" v-if="SellOrder">
            是否可拆分
            <span class="O_nums" :class="BuyOrderDetail.is_split == 1 ? 'green_f' : 'red_f'">
              {{ BuyOrderDetail.is_split == 1 ? '可拆分' : '不可拆分' }}
            </span>
          </div>
        </div>

        <div class="paymate clearfix" v-if="SellOrder">
          <div class="left">付款方式</div>
          <div class="right">
            <van-image v-if="payMateActive.includes('BANK')" class="payImg" lazy-load
              :src="requireImg('common/credit.png')" />
            <van-image v-if="payMateActive.includes('ALIPAY')" class="payImg" lazy-load
              :src="requireImg('common/alipay.png')" />
            <van-image v-if="payMateActive.includes('WXPAY')" class="payImg" lazy-load
              :src="requireImg('common/WeChatPay.png')" />
          </div>
        </div>

        <van-button color="#0b75ff" type="primary" class="orderOperation" v-if="SellOrder" @click="router.push('/')">
          确认
        </van-button>
      </div>

      <!-- 按钮 -->
      <div class="orderButton flex_z" :class="processActive == 2 ||
          processActive == 1 ||
          (processActive == 1 && !seller && confirm) ||
          processActive == 3 ||
          processActive == 4
          ? [7].includes(BuyOrderDetail.status)
            ? 'appeal_up processActive'
            : 'appeal_up processActive'
          : ''
        ">
        <div class="" v-if="SellOrder && [1].includes(BuyOrderDetail.status)"></div>
        <!-- <van-button type="primary" class="orderOperation" v-if="SellOrder && [1].includes(BuyOrderDetail.status)"
          @click="goSellCancel">
          取消挂单
        </van-button> -->

        <van-button type="primary" class="orderOperation" @click="dialog.order_cancel_show = true" v-else-if="![2, 4, 5, 8, 9, 10].includes(BuyOrderDetail.status) &&
          (!seller ||
            (seller && !confirm) ||
            (processActive == 2 && !seller) ||
            (processActive == 3 && !seller))
          ">
          取消订单
        </van-button>
        <van-button type="primary" v-if="processActive == 1 && !seller && confirm" class="orderOperation">
          去付款
        </van-button>
        <van-button type="primary" v-if="!SellOrder && [1].includes(BuyOrderDetail.status) && seller && !confirm"
          class="orderOperation" @click="SellerCheckBuyStatus({ buy_order_id: BuyOrderDetail.order_id, status: 1 })">
          确认交易
        </van-button>
        <van-button type="primary"
          v-if="![2, 4, 5, 9, 10].includes(BuyOrderDetail.status) && processActive == 2 && !seller" class="orderOperation"
          @click="BuyerUpdateTransInfo({ buy_order_id: BuyOrderDetail.order_id })">
          我已付款，通知卖家
        </van-button>
        <van-button type="primary" v-if="!SellOrder &&
          processActive == 3 &&
          seller &&
          ![7, 8, 9, 10].includes(BuyOrderDetail.status)
          " class="orderOperation fangxin" @click="
    authStore.userInfo.is_set_paypassword
      ? (dialog.show = true)
      : showToast('请先设置好支付密码')
    ">
          放行
        </van-button>

        <van-button type="primary"
          v-if="!SellOrder && processActive == 3 && seller && [7].includes(BuyOrderDetail.status)" class="orderOperation"
          @click="
            authStore.userInfo.is_set_paypassword
              ? (dialog.show = true)
              : showToast('请先设置好支付密码')
            ">
          放行
        </van-button>
        <van-button type="primary" v-if="!SellOrder && processActive == 3 && [7].includes(BuyOrderDetail.status)"
          class="orderOperation" @click="showAppeal = true">
          交易申诉
        </van-button>

        <van-button type="primary" v-if="[8].includes(BuyOrderDetail.status) &&
          processActive == 3 &&
          !SellOrder &&
          ((seller && !!!BuyOrderDetail.seller_star) || (!seller && !!!BuyOrderDetail.buyer_star))
          " class="orderOperation fangxin proActive" @click="processActive = 4">
          去评分
        </van-button>
        <van-button type="primary" v-if="processActive == 4" @click="
                    ; (seller && !!!BuyOrderDetail.seller_star) || (!seller && !!!BuyOrderDetail.buyer_star)
          ? confirmDeal()
          : router.push('/')
          " class="orderOperation fangxin">
          {{
            (seller && !!!BuyOrderDetail.seller_star) || (!seller && !!!BuyOrderDetail.buyer_star)
            ? '确认'
            : '已评分返回'
          }}
        </van-button>
      </div>

      <!-- 交易申诉 -->
      <div class="appeal_c" v-if="viewCoinsellcommentlist.length &&
          !SellOrder &&
          processActive == 3 &&
          [7, 9, 10].includes(BuyOrderDetail.status)
          ">
        <div class="appealTitle">交易申诉</div>
        <!-- <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
        <div class="commen" v-for="item in viewCoinsellcommentlist" :key="item.uuid">
          <div class="topPic clearfix">
            <div class="left">
              <van-image lazy-load class="Oavatar" fit="cover" :src="imgserver_url + item.face" />
              <span class="OuserName van-ellipsis">{{ item.nickname }}</span>
              <!-- 1买家 2卖家 3客服 4系统 -->
              <span class="judeg" :class="item.user_type == 1
                  ? 'buyer_blue'
                  : item.user_type == 3
                    ? 'f_kefu'
                    : item.user_type == 4
                      ? 'f_kefu'
                      : ''
                ">
                {{
                  item.user_type == 1
                  ? '买家'
                  : item.user_type == 2
                    ? '卖家'
                    : item.user_type == 3
                      ? '客服'
                      : item.user_type == 4
                        ? '系统'
                        : '买家'
                }}
              </span>
            </div>
            <div class="right">
              <span>{{ item.addtime }}</span>
            </div>
          </div>
          <div class="rwop">
            <span class="text_c">{{ item.msg }}</span>
          </div>

          <van-image lazy-load class="pic_commen" v-if="item.img" fit="cover"
            @click="showImagePreview([imgserver_url + item.img])" :src="imgserver_url + item.img" />
        </div>
        <!-- </van-list> -->
      </div>
    </div>
    <van-dialog v-model:show="showKeyboard" title="请输入支付密码" class="passwordInput" :showConfirmButton="false">
      <van-password-input :value="passwdValue" :focused="showKeyboard" :error-info="errorInfo"
        @focus="showKeyboard = true" />
    </van-dialog>
    <!-- 数字键盘 -->
    <van-number-keyboard v-model="passwdValue" :show="showKeyboard" @blur="showKeyboard = false" />

    <!-- 申诉 -->
    <van-dialog v-model:show="showAppeal" title="" class="showAppeal" :showConfirmButton="false">
      <div class="O_title">申诉描述</div>
      <van-field v-model="message" rows="2" autosize type="textarea" class="O_textarea" maxlength="200"
        placeholder="不超过200字" />
      <div class="titleUp">上传图片</div>
      <van-uploader v-model="fileList" :after-read="afterRead" :before-read="beforeRead" :max-count="1"
        class="O_uploader" />
      <div class="flex_z">
        <van-button type="primary" color="#828282" class="margr20" @click="showAppeal = false">
          取消
        </van-button>
        <van-button type="primary" color="#0b75ff" class="marg0" @click="confirmAppeal">
          提交
        </van-button>
      </div>
      <p class="appeal">
        请勿发送与交易无关的内容，如有发现有广告，淫秽等内容，会进行封号处理，后果自负。
      </p>
    </van-dialog>

    <!-- 申诉确认弹窗 -->
    <van-dialog v-model:show="dialog.show" theme="round-button" className="dialog-global-info" :title="dialog.data.title">
      <i class="icon-close block close-dark" @click="dialog.show = false"></i>
      <div>
        <!-- <div class="title">{{ dialog.data.title }}</div> -->
        <div class="content red_f">{{ dialog.data.content }}</div>
        <div class="content red_f">任何未到帐要求您放行的都属于欺诈行为</div>
      </div>

      <template #footer>
        <div class="flex_z">
          <div class="btn-confirm flex items-center justify-center" @click="onConfirm">
            {{ dialog.data.confirmButtonText }}
          </div>
          <div class="btn-confirm backcc flex items-center justify-center" @click="dialog.show = false">
            未到账
          </div>
        </div>
      </template>
    </van-dialog>
    <!-- 取消订单弹窗 -->
    <van-dialog v-model:show="dialog.order_cancel_show" theme="round-button"
      className="dialog-global-info order_cancel_show">
      <i class="icon-close block close-dark" @click="dialog.order_cancel_show = false"></i>
      <div>
        <div class="content1">是否取消订单</div>
      </div>
      <template #footer>
        <div class="flex_z">
          <div class="btn-confirm flex items-center justify-center" @click="onCancelOrderConfirm">
            是
          </div>
          <div class="btn-confirm backcc flex items-center justify-center" @click="dialog.order_cancel_show = false">
            否
          </div>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import clipboard3 from 'vue-clipboard3'
import { requireImg, secondsToMinutesWithSeconds } from '@/utils/tools'
import { useRouter, useRoute } from 'vue-router'
import {
  uploadimgBat,
  SellOrderDetail,
  Reminders,
  SetStar,
  BuyOrderDetail as apiBuyOrderDetail,
  SellCancel,
  SellerCheckBuyStatus,
  BuyCancel,
  sellerCheckTransStatus,
  BuyerUpdateTransInfo,
  Appeal,
  coinsellcommentadd,
  coinsellcommentlist
} from '@/apis/buySellCoin'
import { resBuyOrderDetail } from '@/store/types/buySellCoin'
import verified from '@/assets/images/common/verified.png'
import { uploadImgApi } from '@/apis/common'
import { useEntryStore } from '@/store/modules/entry'

import { useAuthStore } from '@/store/modules/auth'
import { useCoinBuySellStore } from '@/store/modules/coinBuySell'
import { storeToRefs } from 'pinia'
import { onUnmounted, watch, ref, toRef, onMounted, computed, reactive } from 'vue'
import { UploaderFileListItem, showToast, showImagePreview, showNotify } from 'vant'
import mitt from '@/utils/mitt'
// import socket from '@/utils/WSUtil'
// socket.send('start');
import success from '@/assets/images/common/success.png'
const dialog = reactive({
  order_cancel_show: false,
  show: false,
  data: {
    title: '温馨提示',
    content: `请你再次确认是否已经收到款项， `,
    confirmButtonText: '确认到账',
    confirmAction: () => { }
  }
})

const EntryStore = useEntryStore()
const { config } = storeToRefs(EntryStore)
const imgserver_url = computed(() => {
  // console.log('(imgserver_url',(config.value.Web_Set_DefaultInfo?.imgserver_url as any)?.v);
  return (config.value.Web_Set_DefaultInfo?.imgserver_url as any).v || ''
})
const tixin = ref(0)
const router = useRouter()
watch(tixin, newVal => {
  setTimeout(() => {
    if (newVal > 0) {
      tixin.value -= 1
    }
  }, 1000)
})

const { toClipboard } = clipboard3()
const copy = async (text: any) => {
  try {
    await toClipboard(text)
    // showToast('复制成功');
    showToast({
      message: '复制成功',
      icon: verified
    })
  } catch (error) {
    // showToast('复制失败!!');
    showToast({
      message: '复制失败!!',
      icon: verified
    })
  }
}
const authStore = useAuthStore()
const coin = useCoinBuySellStore()
const { getInfo } = coin
const { token } = storeToRefs(authStore)
const { userInfo } = storeToRefs(coin)

const processActive = ref(1)
// const seller = ref(0);
const confirm = ref(1) //卖家是否确认开始交易
const integral = ref(3) //几颗星

let BuyOrderDetail = ref({} as resBuyOrderDetail)
const route = useRoute()
const { query } = route
let SellOrder = ref()
let SellOrderNum = ref('')
let SellOrderAmount = ref('')
let SellOrderIs_split = ref()

const getSellOrderDetail = () => {
  SellOrderDetail({ order_id: query.order_id as string }).then(data => {
    if (!data.order_id) return console.log('Selldata数据异常')
    BuyOrderDetail.value = data
    if (data.buy_orders[0]?.order_id) {
      // console.log('data.buy_orders?.order_id', data.buy_orders[0].order_id);
      return getBuyOrderDetail(data.buy_orders[0].order_id)
    }
  })
}

const getBuyOrderDetail = (order_id: string) => {
  // console.log('query.order_id', order_id, query.order_id);
  SellOrder.value = false
  // setTimeout(() => {
  apiBuyOrderDetail({ order_id: order_id || (query.order_id as string) }).then(data => {
    if (!data.order_id) return console.log('数据异常')
    // console.log('apiBuyOrderDetail-------------', data.order_id)
    BuyOrderDetail.value = data

    SellOrderNum.value = data.sell_info.order_id
    SellOrderAmount.value = (+data.sell_info.sell_num).toTruncFixed(2)
    SellOrderIs_split.value = data.sell_info.is_split
  })
  // }, 400)
}

const t_pic = ref('')
const pay_pic = ref('')
const seller = computed(() => {
  //判断是否是卖家
  if (userInfo.value.uuid) {
    let v = BuyOrderDetail.value.uuid == userInfo.value.uuid ? 0 : 1
    integral.value = v
      ? !!!BuyOrderDetail.value.seller_star
        ? 3
        : BuyOrderDetail.value.seller_star
      : !!!BuyOrderDetail.value.buyer_star
        ? 3
        : BuyOrderDetail.value.buyer_star
    t_pic.value =
      BuyOrderDetail.value.sell_info &&
      BuyOrderDetail.value.sell_info.headimg &&
      imgserver_url.value +
      (v ? BuyOrderDetail.value.headimg : BuyOrderDetail.value.sell_info?.headimg)
    pay_pic.value =
      BuyOrderDetail.value.sell_info &&
      BuyOrderDetail.value.sell_info.collection_cardimg &&
      imgserver_url.value +
      (v
        ? BuyOrderDetail.value.sell_info?.collection_cardimg
        : BuyOrderDetail.value.sell_info?.collection_cardimg)
    // console.log('pay_pic',pay_pic.value);
    return v
  } else {
    getInfo().then(() => {
      let v = BuyOrderDetail.value.uuid == userInfo.value.uuid ? 0 : 1
      // console.log('userInfouuid', userInfo.value.uuid);
      integral.value = v
        ? !!!BuyOrderDetail.value.seller_star
          ? 3
          : BuyOrderDetail.value.seller_star
        : !!!BuyOrderDetail.value.buyer_star
          ? 3
          : BuyOrderDetail.value.buyer_star
      t_pic.value =
        BuyOrderDetail.value.sell_info &&
        BuyOrderDetail.value.sell_info.headimg &&
        imgserver_url.value +
        (v ? BuyOrderDetail.value.headimg : BuyOrderDetail.value.sell_info?.headimg)
      pay_pic.value =
        BuyOrderDetail.value.sell_info &&
        BuyOrderDetail.value.sell_info.collection_cardimg &&
        imgserver_url.value +
        (v
          ? BuyOrderDetail.value.sell_info?.collection_cardimg
          : BuyOrderDetail.value.sell_info?.collection_cardimg)
      return v
    })
  }
})

const payMateActive = ref('')
// console.log('route', query.order_id);

setTimeout(() => {
  SellOrder.value = query.sell == 'true' ? true : false
  query && SellOrder.value ? getSellOrderDetail() : getBuyOrderDetail(query.order_id as string)

  payMateActive.value = (query.payMateActive as string) || ''
  // console.log('payMateActive.value',payMateActive.value);

  let sellsumData = (query.sellsumData && JSON.parse(query.sellsumData as string)) || {}
  // console.log('sellsumData',sellsumData);
  SellOrderNum.value = sellsumData.order_id
  SellOrderAmount.value = sellsumData.sell_num
  SellOrderIs_split.value = sellsumData.is_split
}, 10)

const viewCoinsellcommentlist = ref<any>([])

const onConfirm = () => {
  dialog.show = false
  showKeyboard.value = true
}
const onCancelOrderConfirm = () => {
  dialog.order_cancel_show = false
  seller.value
    ? SellerCheckBuyStatus({ buy_order_id: BuyOrderDetail.value.order_id, status: 2 }).then(() => {
      getBuyOrderDetail(BuyOrderDetail.value.order_id)
    })
    : BuyCancel({ buy_order_id: BuyOrderDetail.value.order_id }).then(() => {
      getBuyOrderDetail(BuyOrderDetail.value.order_id)
    })
}

watch(
  BuyOrderDetail,
  newVal => {
    processActive.value = [8].includes(BuyOrderDetail.value.status)
      ? 3
      : [1, 2].includes(BuyOrderDetail.value.status)
        ? 1
        : [3, 4, 5].includes(BuyOrderDetail.value.status)
          ? 2
          : 3
    confirm.value = BuyOrderDetail.value.status > 2 ? 1 : 0
    setTimeout(() => {
      if (newVal.time_second > 0) {
        newVal.time_second -= 1
        newVal.time_second == 0 &&
          (query.order_id as string).includes('B') &&
          getBuyOrderDetail(query.order_id as string)
        // newVal.time_second==0&&getBuyOrderDetail(false);
      }
    }, 1000)
    if ([7, 8, 9, 10].includes(newVal.status) && SellOrder.value == false) {
      get_coinsellcommentlist(newVal.order_id)
    }
  },
  {
    deep: true
    // immediate:true
  }
)

onMounted(() => {
  mitt.on('update_buy_f', (data: any) => {
    console.log('推送买币订单状态 data2', route.path, query.order_id)
    setTimeout(() => {
      route.path == '/orderCreate' &&
        (query.order_id as string).includes('B') &&
        getBuyOrderDetail(BuyOrderDetail.value.order_id)
    }, 300)
  })
  mitt.on('update_sell_f', (data: any) => {
    console.log('推送卖币订单状态 data2', data)
    setTimeout(() => {
      SellOrder.value
        ? !(query.order_id as string).includes('B')
          ? getSellOrderDetail()
          : getBuyOrderDetail(BuyOrderDetail.value.order_id)
        : getBuyOrderDetail(BuyOrderDetail.value.order_id)
    }, 200)
  })
})

onUnmounted(() => {
  mitt.off('update_buy_f')
  mitt.off('update_sell_f')
  // mitt.off('push_reminders_buy')
  // mitt.off('push_reminders_sell')
})

const goSellCancel = () => {
  SellCancel({ sell_order_id: query.order_id as string })
}

const passwdValue = ref('')
const showKeyboard = ref(false)
const errorInfo = ref('')

watch(passwdValue, async newVal => {
  if (newVal.length == 6) {
    // console.log('passwdValue.value', passwdValue.value);
    await sellerCheckTransStatus({
      buy_order_id: BuyOrderDetail.value.order_id,
      passwd: passwdValue.value
    })
      .then(order_id => {
        console.log('data', order_id.buy_order)
        passwdValue.value = ''
        if (!!!order_id.buy_order) return
        showKeyboard.value = false
        // processActive.value = 4;
      })
      .catch(err => {
        passwdValue.value = ''
        errorInfo.value = '密码错误'
        console.log('err错误', err)
      })
  } else {
    errorInfo.value = ''
  }
})

const showAppeal = ref(false)
const message = ref('')

const fileList = ref<any[]>([])
const beforeRead = (file: any) => {
  // console.log('file.type', file.type);
  if (!file.type.startsWith('image/')) {
    showToast('请上传 jpg 格式图片')
    return false
  }
  return true
}
const onOversize = (file: any) => {
  console.log(file)
  showToast('文件大小不能超过 50m')
}

const afterRead = async (event: any) => {
  // console.log('event',event);
  if (!event.file) return
  const res = await uploadImg(event.file)
  // console.log('res',res);
  if (!!!res.img) return showToast('上传失败，请稍后重试')

  let obj = {
    status: 'uploading',
    message: '上传中...',
    UploadURL: res.img,
    url: imgserver_url.value + res.img
  }

  fileList.value[fileList.value.length - 1] = obj
  setTimeout(() => {
    fileList.value[fileList.value.length - 1].status = 'done'
    fileList.value[fileList.value.length - 1].message = '上传成功'
  }, 500)
  console.log('fileList.value', fileList.value)
}

const uploadImg = async (file: string): Promise<any> => {
  try {
    const res = await uploadImgApi({
      file,
      type: 'appeal'
    })

    return res
  } catch (e) {
    console.log(e)
  }
}

const get_coinsellcommentlist = (order_id: string) => {
  coinsellcommentlist({ orderid: order_id, ctype: '1' }).then(data => {
    console.log('data', data)
    if (data instanceof Array && data.length == 0 && (data as any).code != 0)
      return showToast('申诉列表获取异常')
    viewCoinsellcommentlist.value = data
  })
}

const confirmAppeal = () => {
  let appealParm = {
    buy_order_id: BuyOrderDetail.value.order_id, //	是	string	订单号
    comment: message.value, //	是	string	申诉内容
    img: fileList.value //	是	array	图片
  }
  if (!!!message.value) return showToast('申诉内容不能为空')
  // console.log('appealParm', appealParm);

  // Appeal(appealParm).then((data) => {
  //   // console.log('data', data);
  //   if (data instanceof Array && data.length == 0 && (data as any).code != 0) return;
  //   showToast('提交成功！');
  //   showAppeal.value = false;
  // })

  coinsellcommentadd({
    orderid: BuyOrderDetail.value.order_id,
    ctype: '1',
    msg: message.value,
    img: fileList.value[0]?.UploadURL || ''
  }).then(data => {
    if (data instanceof Array && data.length == 0 && (data as any).code != 0)
      return showToast('上传申诉失败！')
    showToast({ message: '成功！', icon: success })
    showAppeal.value = false
    message.value = ''
    fileList.value = []
    get_coinsellcommentlist(BuyOrderDetail.value.order_id)
  })
}
mitt.on('update_appeal_f', () => {
  get_coinsellcommentlist(BuyOrderDetail.value.order_id)
})
const confirmDeal = () => {
  if (integral.value <= 0) return showToast('请选择评分数量！！')
  if (
    !(
      (seller.value && !!!BuyOrderDetail.value.seller_star) ||
      (!seller.value && !!!BuyOrderDetail.value.buyer_star)
    )
  )
    return (processActive.value = 3)
  SetStar({ buy_order_id: BuyOrderDetail.value.order_id, star: Number(integral.value) }).then(
    (data: any) => {
      console.log('data', (data as any).code)
      if (data instanceof Array && data.length == 0 && (data as any).code != 0) return
      showToast('评分成功')
      setTimeout(() => {
        getBuyOrderDetail(BuyOrderDetail.value.order_id)
      }, 500)
      processActive.value = 3
      // history.go(-1);
    }
  )
}

const onClickLeft = () => {
  history.go(-1)
}
const Goprocess = (active: any) => {
  // processActive.value = active
}
</script>

<style lang="scss" src="./orderCreate.scss" scoped />
<style lang="scss" scoped>
$spriteHome: '@/assets/images/sprites-home.png';
$sprite-computed-factor: 0.7;
$sprite-home-background-size: calc(108px * 7 / 10) calc(730px * 7 / 10);

.copy {
  background: url($spriteHome) calc(-0px * $sprite-computed-factor) calc(-616px * $sprite-computed-factor) no-repeat;
  width: calc(35px * $sprite-computed-factor);
  height: calc(35px * $sprite-computed-factor);
  background-size: $sprite-home-background-size;
}

.copy:before {
  display: none;
}
</style>
