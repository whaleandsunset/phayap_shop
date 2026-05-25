using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementApp.Data;
using UserManagementApp.Models;

namespace UserManagementApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders.Include(o => o.Product).AsNoTracking().ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Product)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound(new { message = "ไม่พบข้อมูลออเดอร์นี้" });
        return order;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return NotFound(new { message = "ไม่พบสินค้าที่เลือก" });
            if (product.StockQuantity < request.Quantity) return BadRequest(new { message = "สินค้าไม่พอส่ง สต็อกคงเหลือ: " + product.StockQuantity });

            var defaultSender = await _context.SenderProfiles.FirstOrDefaultAsync(s => s.IsDefault);
            if (defaultSender == null) return BadRequest(new { message = "ระบบยังไม่ได้ตั้งค่าที่อยู่ผู้ส่งเริ่มต้น กรุณาตั้งค่าก่อนสร้างออเดอร์" });

            product.StockQuantity -= request.Quantity;

            var newOrder = new Order
            {
                OrderNumber = $"ORD-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString()[..6].ToUpper()}",
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                ShippingFee = request.ShippingFee,
                ReceiverName = request.ReceiverName,
                ReceiverPhone = request.ReceiverPhone,
                ReceiverAddress = request.ReceiverAddress,
                SnapshotSenderName = defaultSender.SenderName,
                SnapshotSenderPhone = defaultSender.SenderPhone,
                SnapshotSenderAddress = defaultSender.SenderAddress,
                Status = "Pending"
            };

            _context.Orders.Add(newOrder);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new { message = "สร้างออเดอร์และตัดสต็อกสำเร็จ", orderNumber = newOrder.OrderNumber });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPut("{id}/update-shipping")]
    public async Task<IActionResult> UpdateShipping(int id, [FromBody] ShippingUpdateRequest request)
    {
        try
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound(new { message = "ไม่พบออเดอร์นี้" });

            order.CourierName = request.CourierName;
            order.TrackingNumber = request.TrackingNumber;
            order.Status = "Shipped";

            await _context.SaveChangesAsync();
            return Ok(new { message = "อัปเดตข้อมูลการจัดส่งเรียบร้อย", orderStatus = order.Status });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดไม่คาดคิดในการอัปเดตข้อมูลจัดส่ง", error = ex.Message });
        }
    }

    public record OrderRequest(
        int ProductId,
        int Quantity,
        decimal ShippingFee,
        string ReceiverName,
        string ReceiverPhone,
        string ReceiverAddress
    );

    public record ShippingUpdateRequest(
        string CourierName,
        string TrackingNumber
    );
}