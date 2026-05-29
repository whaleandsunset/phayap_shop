import { useCallback, useEffect, useMemo, useState } from "react";
import CustomOrdersPage from "./pages/CustomOrdersPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import SenderProfilesPage from "./pages/SenderProfilesPage.jsx";
import { API_BASE_URL, apiRequest } from "./services/api.js";

const emptyProduct = {
  sku: "",
  name: "",
  price: "",
  weight: "",
  stockQuantity: "",
};

const emptySender = {
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  isDefault: false,
};

const emptyOrder = {
  productId: "",
  quantity: 1,
  shippingFee: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
};

const emptyCustomOrder = {
  itemType: "",
  engravingText: "",
  additionalRequests: "",
  referenceImageUrl: "",
  estimatedPrice: "",
  depositAmount: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  shippingMethod: "Courier",
  deliveryDeadline: "",
};

const emptyShipping = {
  courierName: "",
  trackingNumber: "",
};

const customStatuses = ["Pending", "InProgress", "Completed", "Shipped", "Cancelled"];

const navigationItems = [
  { key: "products", label: "สินค้า" },
  { key: "orders", label: "ออเดอร์" },
  { key: "customOrders", label: "ใบสั่งทำ" },
  { key: "senders", label: "ผู้ส่ง" },
];

function App() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [senders, setSenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [productForm, setProductForm] = useState(emptyProduct);
  const [senderForm, setSenderForm] = useState(emptySender);
  const [orderForm, setOrderForm] = useState(emptyOrder);
  const [customOrderForm, setCustomOrderForm] = useState(emptyCustomOrder);
  const [orderShippingForms, setOrderShippingForms] = useState({});
  const [customShippingForms, setCustomShippingForms] = useState({});

  const defaultSender = useMemo(
    () => senders.find((sender) => sender.isDefault),
    [senders],
  );

  const stats = useMemo(() => {
    const stockUnits = products.reduce((sum, product) => sum + Number(product.stockQuantity || 0), 0);
    const pendingOrders = orders.filter((order) => order.status === "Pending").length;
    const customPending = customOrders.filter((order) => order.status === "Pending").length;

    return [
      { label: "สินค้า", value: products.length },
      { label: "สต็อกทั้งหมด", value: stockUnits },
      { label: "ออเดอร์รอส่ง", value: pendingOrders },
      { label: "งานสั่งทำรอดำเนินการ", value: customPending },
    ];
  }, [products, orders, customOrders]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [productData, orderData, customOrderData, senderData] = await Promise.all([
        apiRequest("/api/Products"),
        apiRequest("/api/Orders"),
        apiRequest("/api/CustomOrders"),
        apiRequest("/api/SenderProfiles"),
      ]);

      setProducts(productData || []);
      setOrders(orderData || []);
      setCustomOrders(customOrderData || []);
      setSenders(senderData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(loadAll);
  }, [loadAll]);

  const showSuccess = (message) => {
    setNotice(message);
    setError("");
  };

  const runAction = async (action, successMessage) => {
    try {
      const message = await action();
      showSuccess(message || successMessage);
      await loadAll();
    } catch (err) {
      setError(err.message);
      setNotice("");
    }
  };

  const submitProduct = (event) => {
    event.preventDefault();
    const payload = {
      sku: productForm.sku.trim(),
      name: productForm.name.trim(),
      price: Number(productForm.price || 0),
      weight: Number(productForm.weight || 0),
      stockQuantity: Number(productForm.stockQuantity || 0),
    };

    runAction(async () => {
      await apiRequest("/api/Products", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setProductForm(emptyProduct);
    }, "เพิ่มสินค้าเรียบร้อยแล้ว");
  };

  const deleteProduct = (id) => {
    if (!window.confirm("ยืนยันการลบสินค้านี้หรือไม่?")) {
      return;
    }

    runAction(
      () => apiRequest(`/api/Products/${id}`, { method: "DELETE" }),
      "ลบสินค้าเรียบร้อยแล้ว",
    );
  };

  const submitSender = (event) => {
    event.preventDefault();
    const payload = {
      senderName: senderForm.senderName.trim(),
      senderPhone: senderForm.senderPhone.trim(),
      senderAddress: senderForm.senderAddress.trim(),
      isDefault: senderForm.isDefault,
    };

    runAction(async () => {
      await apiRequest("/api/SenderProfiles", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setSenderForm(emptySender);
    }, "เพิ่มโปรไฟล์ผู้ส่งเรียบร้อยแล้ว");
  };

  const setDefaultSender = (sender) => {
    runAction(
      () =>
        apiRequest(`/api/SenderProfiles/${sender.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...sender, isDefault: true }),
        }),
      "ตั้งค่าโปรไฟล์ผู้ส่งเริ่มต้นแล้ว",
    );
  };

  const deleteSender = (id) => {
    if (!window.confirm("ยืนยันการลบโปรไฟล์ผู้ส่งนี้หรือไม่?")) {
      return;
    }

    runAction(
      () => apiRequest(`/api/SenderProfiles/${id}`, { method: "DELETE" }),
      "ลบโปรไฟล์ผู้ส่งเรียบร้อยแล้ว",
    );
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const payload = {
      productId: Number(orderForm.productId),
      quantity: Number(orderForm.quantity || 1),
      shippingFee: Number(orderForm.shippingFee || 0),
      receiverName: orderForm.receiverName.trim(),
      receiverPhone: orderForm.receiverPhone.trim(),
      receiverAddress: orderForm.receiverAddress.trim(),
    };

    runAction(async () => {
      const created = await apiRequest("/api/Orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setOrderForm(emptyOrder);
      return `สร้างออเดอร์ ${created?.orderNumber || ""} สำเร็จ`;
    }, "สร้างออเดอร์สำเร็จ");
  };

  const updateOrderShipping = (id) => {
    const payload = orderShippingForms[id] || emptyShipping;

    runAction(
      () =>
        apiRequest(`/api/Orders/${id}/update-shipping`, {
          method: "PUT",
          body: JSON.stringify(payload),
        }),
      "อัปเดตการจัดส่งออเดอร์เรียบร้อยแล้ว",
    );
  };

  const submitCustomOrder = (event) => {
    event.preventDefault();
    const payload = {
      ...customOrderForm,
      estimatedPrice: Number(customOrderForm.estimatedPrice || 0),
      depositAmount: Number(customOrderForm.depositAmount || 0),
      deliveryDeadline: customOrderForm.deliveryDeadline || null,
    };

    runAction(async () => {
      await apiRequest("/api/CustomOrders", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setCustomOrderForm(emptyCustomOrder);
    }, "สร้างใบสั่งทำเรียบร้อยแล้ว");
  };

  const updateCustomStatus = (id, status) => {
    runAction(
      () =>
        apiRequest(`/api/CustomOrders/${id}/update-status`, {
          method: "PUT",
          body: JSON.stringify({ status }),
        }),
      "อัปเดตสถานะใบสั่งทำเรียบร้อยแล้ว",
    );
  };

  const updateCustomShipping = (id) => {
    const payload = customShippingForms[id] || emptyShipping;

    runAction(
      () =>
        apiRequest(`/api/CustomOrders/${id}/update-shipping`, {
          method: "PUT",
          body: JSON.stringify(payload),
        }),
      "อัปเดตการจัดส่งใบสั่งทำเรียบร้อยแล้ว",
    );
  };

  const deleteCustomOrder = (id) => {
    if (!window.confirm("ยืนยันการลบใบสั่งทำนี้หรือไม่?")) {
      return;
    }

    runAction(
      () => apiRequest(`/api/CustomOrders/${id}`, { method: "DELETE" }),
      "ลบใบสั่งทำเรียบร้อยแล้ว",
    );
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Backend API: {API_BASE_URL}</p>
          <h1>ระบบจัดการสินค้าและออเดอร์</h1>
          <p className="hero-copy">
            หน้า frontend นี้เรียกข้อมูลจาก .NET backend โดยตรง ครอบคลุมสินค้า ออเดอร์ โปรไฟล์ผู้ส่ง และใบสั่งทำ
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={loadAll}>
          โหลดข้อมูลใหม่
        </button>
      </section>

      <section className="stats-grid" aria-label="ภาพรวมระบบ">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      {(notice || error) && (
        <section className={`message ${error ? "message-error" : "message-success"}`}>
          {error || notice}
        </section>
      )}

      <nav className="tabs" aria-label="เลือกข้อมูล">
        {navigationItems.map((item) => (
          <button
            className={activeTab === item.key ? "tab-active" : ""}
            key={item.key}
            type="button"
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {loading ? (
        <section className="loading-panel">กำลังโหลดข้อมูลจาก backend...</section>
      ) : (
        <ActivePage
          activeTab={activeTab}
          products={products}
          productForm={productForm}
          setProductForm={setProductForm}
          orders={orders}
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          customOrders={customOrders}
          customOrderForm={customOrderForm}
          setCustomOrderForm={setCustomOrderForm}
          senders={senders}
          senderForm={senderForm}
          setSenderForm={setSenderForm}
          defaultSender={defaultSender}
          orderShippingForms={orderShippingForms}
          setOrderShippingForms={setOrderShippingForms}
          customShippingForms={customShippingForms}
          setCustomShippingForms={setCustomShippingForms}
          onSubmitProduct={submitProduct}
          onDeleteProduct={deleteProduct}
          onSubmitOrder={submitOrder}
          onUpdateOrderShipping={updateOrderShipping}
          onSubmitCustomOrder={submitCustomOrder}
          onUpdateCustomStatus={updateCustomStatus}
          onUpdateCustomShipping={updateCustomShipping}
          onDeleteCustomOrder={deleteCustomOrder}
          onSubmitSender={submitSender}
          onSetDefaultSender={setDefaultSender}
          onDeleteSender={deleteSender}
        />
      )}
    </main>
  );
}

function ActivePage(props) {
  if (props.activeTab === "orders") {
    return <OrdersPage {...props} emptyShipping={emptyShipping} />;
  }

  if (props.activeTab === "customOrders") {
    return <CustomOrdersPage {...props} customStatuses={customStatuses} emptyShipping={emptyShipping} />;
  }

  if (props.activeTab === "senders") {
    return <SenderProfilesPage {...props} />;
  }

  return <ProductsPage {...props} />;
}

export default App;
