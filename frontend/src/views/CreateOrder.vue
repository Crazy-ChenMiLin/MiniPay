<template>
  <div class="container">
    <div class="pay-card">
      <!-- 顶部金额区域 -->
      <div class="amount-section">
        <span class="yen">¥</span>
        <input
          v-model.number="form.amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          :disabled="loading"
          class="amount-input"
        />
        <span v-if="errors.amount" class="error-tip">{{ errors.amount }}</span>
        <span class="amount-label">订单金额（元）</span>
      </div>

      <div class="divider"></div>

      <!-- 商户ID行 -->
      <div class="info-row">
        <div class="row-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <span class="row-label">商户ID</span>
        <input
          v-model.number="form.memberId"
          type="number"
          min="1"
          placeholder="请输入商户ID"
          :disabled="loading"
          class="row-input"
        />
        <span v-if="errors.memberId" class="error-tip">{{ errors.memberId }}</span>
      </div>

      <!-- 订单描述行 -->
      <div class="info-row">
        <div class="row-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <span class="row-label">订单描述</span>
        <input
          v-model="form.description"
          type="text"
          placeholder="请输入订单描述（可选）"
          :disabled="loading"
          class="row-input"
        />
      </div>

      <!-- 底部按钮 -->
      <button @click="handleSubmit" :disabled="loading" class="confirm-btn">
        <span v-if="loading" class="loading"></span>
        {{ loading ? '创建中...' : '创建订单' }}
      </button>
    </div>

    <!-- 创建成功弹窗 -->
    <div v-if="successMessage" class="result-card success">
      <div class="result-icon">✓</div>
      <p class="result-title">订单创建成功</p>
      <p class="result-order">订单号：{{ createdOrderId }}</p>
      <button @click="goToPay" class="go-pay-btn">立即支付 →</button>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="result-card error">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { createOrder } from '../api'

export default {
  name: 'CreateOrder',
  setup() {
    const form = reactive({
      amount: '',
      memberId: '',
      description: ''
    })
    
    const errors = reactive({})
    const loading = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')
    const createdOrderId = ref('')

    const validate = () => {
      errors.amount = ''
      errors.memberId = ''
      
      if (!form.amount || form.amount <= 0) {
        errors.amount = '请输入有效的金额'
      }
      if (!form.memberId || form.memberId <= 0) {
        errors.memberId = '请输入有效的商户ID'
      }
      
      return !errors.amount && !errors.memberId
    }

    const handleSubmit = async () => {
      errorMessage.value = ''
      successMessage.value = ''
      
      if (!validate()) return

      loading.value = true
      
      try {
        const response = await createOrder({
          amount: form.amount,
          memberId: form.memberId,
          description: form.description
        })
        
        if (response.data && response.data.code === 200) {
          createdOrderId.value = response.data.data.orderId
          successMessage.value = `订单创建成功！订单号：${createdOrderId.value}`
          form.amount = ''
          form.memberId = ''
          form.description = ''
        } else {
          errorMessage.value = response.data?.message || '订单创建失败'
        }
      } catch (err) {
        errorMessage.value = err.response?.data?.message || '网络错误，请稍后重试'
      } finally {
        loading.value = false
      }
    }

    const goToPay = () => {
      if (createdOrderId.value) {
        window.location.href = `/pay/${createdOrderId.value}`
      }
    }

    return {
      form,
      errors,
      loading,
      successMessage,
      errorMessage,
      handleSubmit,
      goToPay
    }
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
  max-width: 480px;
  margin: 0 auto;
}

.pay-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

/* ---- 金额区域 ---- */
.amount-section {
  display: flex;
  align-items: baseline;
  padding: 2.5rem 2rem 1.5rem;
  position: relative;
  flex-wrap: wrap;
}

.yen {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-right: 0.25rem;
}

.amount-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  background: transparent;
  min-width: 0;
}

.amount-input::placeholder {
  color: #ccc;
}

.amount-input::-webkit-outer-spin-button,
.amount-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.amount-input[type="number"] { -moz-appearance: textfield; }

.error-tip {
  width: 100%;
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.amount-label {
  width: 100%;
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.5rem;
}

/* ---- 分割线 ---- */
.divider {
  height: 1px;
  background: #f0f0f0;
  margin: 0 2rem;
}

/* ---- 信息行 ---- */
.info-row {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 0.75rem;
  border-bottom: 1px solid #f5f5f5;
}

.row-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #FFF8E1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFB800;
  flex-shrink: 0;
}

.row-label {
  font-size: 0.95rem;
  color: #666;
  white-space: nowrap;
  min-width: 5em;
}

.row-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #333;
  text-align: right;
  background: transparent;
  min-width: 0;
}

.row-input::placeholder {
  color: #bbb;
}

.row-input::-webkit-outer-spin-button,
.row-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.row-input[type="number"] { -moz-appearance: textfield; }

/* ---- 确认按钮 ---- */
.confirm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: calc(100% - 3rem);
  margin: 1.5rem auto 2rem;
  padding: 0.9rem;
  border: none;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #FFB800 0%, #FF69B4 100%);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.confirm-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.35);
}

.confirm-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading {
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ---- 结果卡片 ---- */
.result-card {
  margin-top: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.result-card.success {
  background: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

.result-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFB800, #FF69B4);
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
}

.result-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.result-order {
  font-size: 0.8rem;
  color: #999;
  word-break: break-all;
  margin-bottom: 1rem;
}

.go-pay-btn {
  padding: 0.7rem 2.5rem;
  border: none;
  border-radius: 24px;
  background: linear-gradient(135deg, #FF69B4 0%, #FF85C8 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.go-pay-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 105, 180, 0.35);
}

.result-card.error {
  background: #fff5f5;
  border: 1px solid #f5c6cb;
}

.result-card.error p {
  color: #c0392b;
  margin: 0;
}
</style>