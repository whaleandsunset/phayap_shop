import { DataPanel, StatusPill, TextInput } from "../components/common.jsx";
import { formatMoney } from "../utils/formatters.js";

export default function ProductsPage({
  products,
  productForm,
  setProductForm,
  onSubmitProduct,
  onDeleteProduct,
}) {
  return (
    <section className="content-grid">
      <DataPanel title="เพิ่มสินค้า">
        <form className="form-grid" onSubmit={onSubmitProduct}>
          <TextInput label="SKU" value={productForm.sku} onChange={(sku) => setProductForm({ ...productForm, sku })} required />
          <TextInput label="ชื่อสินค้า" value={productForm.name} onChange={(name) => setProductForm({ ...productForm, name })} required />
          <TextInput label="ราคา" type="number" value={productForm.price} onChange={(price) => setProductForm({ ...productForm, price })} required />
          <TextInput label="น้ำหนัก" type="number" value={productForm.weight} onChange={(weight) => setProductForm({ ...productForm, weight })} required />
          <TextInput label="จำนวนสต็อก" type="number" value={productForm.stockQuantity} onChange={(stockQuantity) => setProductForm({ ...productForm, stockQuantity })} required />
          <button className="primary-button" type="submit">บันทึกสินค้า</button>
        </form>
      </DataPanel>

      <DataPanel title="รายการสินค้า" wide>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>ชื่อสินค้า</th>
                <th>ราคา</th>
                <th>น้ำหนัก</th>
                <th>สต็อก</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>{formatMoney(product.price)}</td>
                  <td>{product.weight}</td>
                  <td>
                    <StatusPill tone={product.stockQuantity > 0 ? "success" : "danger"}>
                      {product.stockQuantity}
                    </StatusPill>
                  </td>
                  <td>
                    <button className="ghost-button" type="button" onClick={() => onDeleteProduct(product.id)}>
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>
    </section>
  );
}
