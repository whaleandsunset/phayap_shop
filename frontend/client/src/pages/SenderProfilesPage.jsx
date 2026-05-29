import { DataPanel, StatusPill, TextArea, TextInput } from "../components/common.jsx";

export default function SenderProfilesPage({
  senders,
  senderForm,
  setSenderForm,
  onSubmitSender,
  onSetDefaultSender,
  onDeleteSender,
}) {
  return (
    <section className="content-grid">
      <DataPanel title="เพิ่มโปรไฟล์ผู้ส่ง">
        <form className="form-grid" onSubmit={onSubmitSender}>
          <TextInput label="ชื่อผู้ส่ง" value={senderForm.senderName} onChange={(senderName) => setSenderForm({ ...senderForm, senderName })} required />
          <TextInput label="เบอร์โทร" value={senderForm.senderPhone} onChange={(senderPhone) => setSenderForm({ ...senderForm, senderPhone })} required />
          <TextArea label="ที่อยู่" value={senderForm.senderAddress} onChange={(senderAddress) => setSenderForm({ ...senderForm, senderAddress })} required />
          <label className="checkbox-field">
            <input type="checkbox" checked={senderForm.isDefault} onChange={(event) => setSenderForm({ ...senderForm, isDefault: event.target.checked })} />
            <span>ตั้งเป็นผู้ส่งเริ่มต้น</span>
          </label>
          <button className="primary-button" type="submit">บันทึกผู้ส่ง</button>
        </form>
      </DataPanel>

      <DataPanel title="โปรไฟล์ผู้ส่ง" wide>
        <div className="sender-grid">
          {senders.map((sender) => (
            <article className="record-card" key={sender.id}>
              <div className="record-head">
                <div>
                  <strong>{sender.senderName}</strong>
                  <span>{sender.senderPhone}</span>
                </div>
                {sender.isDefault && <StatusPill tone="success">Default</StatusPill>}
              </div>
              <p>{sender.senderAddress}</p>
              <div className="button-row">
                {!sender.isDefault && (
                  <button className="secondary-button" type="button" onClick={() => onSetDefaultSender(sender)}>
                    ตั้งเป็นค่าเริ่มต้น
                  </button>
                )}
                <button className="ghost-button" type="button" onClick={() => onDeleteSender(sender.id)}>ลบ</button>
              </div>
            </article>
          ))}
        </div>
      </DataPanel>
    </section>
  );
}
