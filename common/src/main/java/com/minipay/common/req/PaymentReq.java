package com.minipay.common.req;

public class PaymentReq {
    private String orderId;
    private Long amount;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "PaymentReq{" +
                "orderId='" + orderId + '\'' +
                ", amount=" + amount +
                '}';
    }
}