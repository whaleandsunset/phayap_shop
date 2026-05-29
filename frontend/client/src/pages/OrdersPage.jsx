import { DataPanel, StatusPill, TextArea, TextInput } from "../components/common.jsx";

export default function OrdersPage({
  products,
  orders,
  orderForm,
  setOrderForm,
  defaultSender,
  orderShippingForms,
  setOrderShippingForms,
  emptyShipping,
  onSubmitOrder,
  onUpdateOrderShipping,
}) {
  return (
    <section className="content-grid">
      <DataPanel title="สร้างออเดอร์สินค้า">
        <form className="form-grid" onSubmit={onSubmitOrder}>
          <label className="field">
            <span>สินค้า</span>
            <select value={orderForm.productId} onChange={(event) => setOrderForm({ ...orderForm, productId: event.target.value })} required>
              <option value="">เลือกสินค้า</option>
              {products.map((product) => (
                <option value={product.id} key={product.id}>
                  {product.name} ({product.stockQuantity} ชิ้น)
                </option>
              ))}
            </select>
          </label>
          <TextInput label="จำนวน" type="number" value={orderForm.quantity} onChange={(quantity) => setOrderForm({ ...orderForm, quantity })} required />
          <TextInput label="ค่าส่ง" type="number" value={orderForm.shippingFee} onChange={(shippingFee) => setOrderForm({ ...orderForm, shippingFee })} required />
          <TextInput label="ชื่อผู้รับ" value={orderForm.receiverName} onChange={(receiverName) => setOrderForm({ ...orderForm, receiverName })} required />
          <TextInput label="เบอร์ผู้รับ" value={orderForm.receiverPhone} onChange={(receiverPhone) => setOrderForm({ ...orderForm, receiverPhone })} required />
          <TextArea label="ที่อยู่ผู้รับ" value={orderForm.receiverAddress} onChange={(receiverAddress) => setOrderForm({ ...orderForm, receiverAddress })} required />
          <button className="primary-button" type="submit" disabled={!defaultSender}>สร้างออเดอร์</button>
        </form>
        {!defaultSender && <p className="hint">ต้องมีโปรไฟล์ผู้ส่งเริ่มต้นก่อนสร้างออเดอร์</p>}
      </DataPanel>

      <DataPanel title="รายการออเดอร์" wide>
        <div className="list-stack">
          {orders.map((order) => (
            <article className="record-card" key={order.id}>
              <div className="record-head">
                <div>
                  <strong>{order.orderNumber}</strong>
                  <span>{order.product?.name || `Product #${order.productId}`} x {order.quantity}</span>
                </div>
                <StatusPill tone={order.status === "Shipped" ? "success" : "warning"}>{order.status}</StatusPill>
              </div>
              <p>{order.receiverName} · {order.receiverPhone}</p>
              <div className="inline-form">
                <input
                  placeholder="ขนส่ง"
                  value={orderShippingForms[order.id]?.courierName || ""}
                  onChange={(event) => setOrderShippingForms({
                    ...orderShippingForms,
                    [order.id]: { ...(orderShippingForms[order.id] || emptyShipping), courierName: event.target.value },
                  })}
                />
                <input
                  placeholder="เลขพัสดุ"
                  value={orderShippingForms[order.id]?.trackingNumber || ""}
                  onChange={(event) => setOrderShippingForms({
                    ...orderShippingForms,
                    [order.id]: { ...(orderShippingForms[order.id] || emptyShipping), trackingNumber: event.target.value },
                  })}
                />
                <button className="secondary-button" type="button" onClick={() => onUpdateOrderShipping(order.id)}>
                  บันทึกจัดส่ง
                </button>
              </div>
            </article>
          ))}
        </div>
      </DataPanel>
    </section>
  );
}
