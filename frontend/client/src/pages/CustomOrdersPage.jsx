import { DataPanel, StatusPill, TextArea, TextInput } from "../components/common.jsx";
import { formatMoney } from "../utils/formatters.js";

export default function CustomOrdersPage({
  customOrders,
  customOrderForm,
  setCustomOrderForm,
  customStatuses,
  defaultSender,
  customShippingForms,
  setCustomShippingForms,
  emptyShipping,
  onSubmitCustomOrder,
  onUpdateCustomStatus,
  onUpdateCustomShipping,
  onDeleteCustomOrder,
}) {
  return (
    <section className="content-grid">
      <DataPanel title="สร้างใบสั่งทำ">
        <form className="form-grid" onSubmit={onSubmitCustomOrder}>
          <TextInput label="ประเภทสินค้า" value={customOrderForm.itemType} onChange={(itemType) => setCustomOrderForm({ ...customOrderForm, itemType })} required />
          <TextInput label="ข้อความแกะสลัก" value={customOrderForm.engravingText} onChange={(engravingText) => setCustomOrderForm({ ...customOrderForm, engravingText })} />
          <TextInput label="รูปอ้างอิง URL" value={customOrderForm.referenceImageUrl} onChange={(referenceImageUrl) => setCustomOrderForm({ ...customOrderForm, referenceImageUrl })} />
          <TextInput label="ราคาประเมิน" type="number" value={customOrderForm.estimatedPrice} onChange={(estimatedPrice) => setCustomOrderForm({ ...customOrderForm, estimatedPrice })} required />
          <TextInput label="เงินมัดจำ" type="number" value={customOrderForm.depositAmount} onChange={(depositAmount) => setCustomOrderForm({ ...customOrderForm, depositAmount })} />
          <TextInput label="ชื่อผู้รับ" value={customOrderForm.receiverName} onChange={(receiverName) => setCustomOrderForm({ ...customOrderForm, receiverName })} required />
          <TextInput label="เบอร์ผู้รับ" value={customOrderForm.receiverPhone} onChange={(receiverPhone) => setCustomOrderForm({ ...customOrderForm, receiverPhone })} required />
          <TextInput label="วิธีจัดส่ง" value={customOrderForm.shippingMethod} onChange={(shippingMethod) => setCustomOrderForm({ ...customOrderForm, shippingMethod })} required />
          <TextInput label="วันกำหนดส่ง" type="date" value={customOrderForm.deliveryDeadline} onChange={(deliveryDeadline) => setCustomOrderForm({ ...customOrderForm, deliveryDeadline })} />
          <TextArea label="คำขอเพิ่มเติม" value={customOrderForm.additionalRequests} onChange={(additionalRequests) => setCustomOrderForm({ ...customOrderForm, additionalRequests })} />
          <TextArea label="ที่อยู่ผู้รับ" value={customOrderForm.receiverAddress} onChange={(receiverAddress) => setCustomOrderForm({ ...customOrderForm, receiverAddress })} required />
          <button className="primary-button" type="submit" disabled={!defaultSender}>สร้างใบสั่งทำ</button>
        </form>
      </DataPanel>

      <DataPanel title="รายการใบสั่งทำ" wide>
        <div className="list-stack">
          {customOrders.map((order) => (
            <article className="record-card" key={order.id}>
              <div className="record-head">
                <div>
                  <strong>{order.customOrderNumber}</strong>
                  <span>{order.itemType} · {formatMoney(order.estimatedPrice)}</span>
                </div>
                <StatusPill tone={order.status === "Shipped" || order.status === "Completed" ? "success" : "warning"}>{order.status}</StatusPill>
              </div>
              <p>{order.receiverName} · {order.shippingMethod}</p>
              <div className="inline-form">
                <select value={order.status} onChange={(event) => onUpdateCustomStatus(order.id, event.target.value)}>
                  {customStatuses.map((status) => <option value={status} key={status}>{status}</option>)}
                </select>
                <input
                  placeholder="ขนส่ง"
                  value={customShippingForms[order.id]?.courierName || ""}
                  onChange={(event) => setCustomShippingForms({
                    ...customShippingForms,
                    [order.id]: { ...(customShippingForms[order.id] || emptyShipping), courierName: event.target.value },
                  })}
                />
                <input
                  placeholder="เลขพัสดุ"
                  value={customShippingForms[order.id]?.trackingNumber || ""}
                  onChange={(event) => setCustomShippingForms({
                    ...customShippingForms,
                    [order.id]: { ...(customShippingForms[order.id] || emptyShipping), trackingNumber: event.target.value },
                  })}
                />
                <button className="secondary-button" type="button" onClick={() => onUpdateCustomShipping(order.id)}>บันทึกจัดส่ง</button>
                <button className="ghost-button" type="button" onClick={() => onDeleteCustomOrder(order.id)}>ลบ</button>
              </div>
            </article>
          ))}
        </div>
      </DataPanel>
    </section>
  );
}
