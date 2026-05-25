-- 1. สร้างตารางข้อมูลสินค้า (Products)
CREATE TABLE Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    SKU VARCHAR(50) NOT NULL UNIQUE,          -- รหัสสินค้า ห้ามซ้ำ
    Name VARCHAR(255) NOT NULL,               -- ชื่อสินค้า
    Price DECIMAL(18, 2) NOT NULL DEFAULT 0.00, -- ราคาสินค้า
    Weight DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- น้ำหนักสินค้า (เช่น เป็นกรัม หรือ กิโลกรัม)
    StockQuantity INT NOT NULL DEFAULT 0       -- จำนวนสินค้าคงเหลือในคลัง
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. สร้างตารางโปรไฟล์ผู้จัดส่ง (SenderProfiles)
CREATE TABLE SenderProfiles (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    SenderName VARCHAR(255) NOT NULL,          -- ชื่อผู้จัดส่ง
    SenderPhone VARCHAR(20) NOT NULL,          -- เบอร์โทรผู้จัดส่ง
    SenderAddress TEXT NOT NULL,               -- ที่อยู่ผู้จัดส่ง
    IsDefault TINYINT(1) NOT NULL DEFAULT 0    -- 1 = เป็นค่า Default, 0 = ทั่วไป
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. สร้างตารางคำสั่งซื้อและการจัดส่ง (Orders)
CREATE TABLE Orders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    OrderNumber VARCHAR(50) NOT NULL UNIQUE,   -- เลขที่ใบสั่งซื้อ (ระบบเจนขึ้นมา)
    ProductId INT NOT NULL,                    -- สินค้าที่สั่งซื้อ
    Quantity INT NOT NULL DEFAULT 1,           -- จำนวนที่สั่ง
    ShippingFee DECIMAL(18, 2) NOT NULL DEFAULT 0.00, -- ค่าจัดส่งของออเดอร์นี้
    
    -- ข้อมูลผู้รับ
    ReceiverName VARCHAR(255) NOT NULL,
    ReceiverPhone VARCHAR(20) NOT NULL,
    ReceiverAddress TEXT NOT NULL,
    
    -- ข้อมูลผู้ส่ง (ใช้ Snapshot ข้อมูล ณ วันที่ส่ง เพื่อไม่ให้ประวัติเปลี่ยนตาม Default ในอนาคต)
    SnapshotSenderName VARCHAR(255) NOT NULL,
    SnapshotSenderPhone VARCHAR(20) NOT NULL,
    SnapshotSenderAddress TEXT NOT NULL,
    
    -- ข้อมูลขนส่ง
    CourierName VARCHAR(100) NULL,             -- ขนส่ง เช่น ไปรษณีย์ไทย, Flash (ใส่ NULL ได้ถ้ารอระบุ)
    TrackingNumber VARCHAR(100) NULL,          -- รหัสส่งสินค้า / เลขพัสดุ
    
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- สถานะ: Pending, Packed, Shipped, Delivered
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- วันที่สร้างรายการ
    
    -- สร้างความสัมพันธ์ Foreign Key ล็อกไว้ว่า ProductId ต้องมีอยู่จริงในตาราง Products
    CONSTRAINT FK_Orders_Products FOREIGN KEY (ProductId) REFERENCES Products(Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CustomOrders (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CustomOrderNumber VARCHAR(50) NOT NULL UNIQUE, -- เลขที่ใบสั่งทำ เช่น CUST-20260525-XXXX
    
    -- รายละเอียดงานแกะสลัก
    ItemType VARCHAR(100) NOT NULL,               -- ประเภทชิ้นงาน (เช่น กำไล, แหวน, พระพุทธรูป, ป้ายชื่อ)
    EngravingText VARCHAR(255) NULL,               -- ข้อความที่ต้องการให้สลัก
    AdditionalRequests TEXT NULL,                  -- รายละเอียดเพิ่มเติม/รูปทรง/ขนาด
    ReferenceImageUrl VARCHAR(500) NULL,           -- ลิงก์รูปภาพตัวอย่างที่ลูกค้าแนบมา
    
    -- ข้อมูลราคาและการเงิน
    EstimatedPrice DECIMAL(18, 2) NOT NULL,        -- ราคาประเมิน
    DepositAmount DECIMAL(18, 2) DEFAULT 0.00,     -- เงินมัดจำที่จ่ายแล้ว
    
    -- ข้อมูลผู้รับ-ผู้ส่ง (Snapshot)
    ReceiverName VARCHAR(255) NOT NULL,
    ReceiverPhone VARCHAR(20) NOT NULL,
    ReceiverAddress TEXT NOT NULL,
    SnapshotSenderName VARCHAR(255) NOT NULL,
    SnapshotSenderPhone VARCHAR(20) NOT NULL,
    SnapshotSenderAddress TEXT NOT NULL,
    ShippingMethod VARCHAR(100) NOT NULL DEFAULT 'Courier', -- รูปแบบการส่ง: 'Courier' (ขนส่ง), 'SelfDelivery' (ร้านส่งเอง), 'PickUp' (ลูกค้ารับเอง)
    DeliveryDeadline DATETIME NULL,               -- วัน/เวลา กำหนดส่งงานแกะสลัก (Deadline)
    
    -- สถานะของงานแกะสลัก
    Status VARCHAR(50) NOT NULL DEFAULT 'Pending', 
    
    -- ข้อมูลขนส่ง (หาก ShippingMethod = 'SelfDelivery' หรือ 'PickUp' ฟิลด์พวกนี้ปล่อยเป็น NULL ได้เลย)
    CourierName VARCHAR(100) NULL,
    TrackingNumber VARCHAR(100) NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;