using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementApp.Data;
using UserManagementApp.Models;

namespace UserManagementApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomOrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomOrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomOrder>>> GetCustomOrders()
    {
        try
        {
            var customOrders = await _context.CustomOrders
                .AsNoTracking()
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
                
            return Ok(customOrders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูลใบสั่งทำทั้งหมด", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomOrder>> GetCustomOrder(int id)
    {
        try
        {
            var customOrder = await _context.CustomOrders.FindAsync(id);
            if (customOrder == null) return NotFound(new { message = "ไม่พบใบสั่งทำนี้ในระบบ" });
            return Ok(customOrder);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูลใบสั่งทำ", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateCustomOrder([FromBody] CustomOrderCreateRequest request)
    {
        try
        {
            var defaultSender = await _context.SenderProfiles.FirstOrDefaultAsync(s => s.IsDefault);
            if (defaultSender == null)
            {
                return BadRequest(new { message = "ระบบยังไม่ได้ตั้งค่าโปรไฟล์ที่อยู่ผู้ส่งเริ่มต้น กรุณาตั้งค่าก่อนสร้างรายการ" });
            }

            var newCustomOrder = new CustomOrder
            {
                CustomOrderNumber = $"CUST-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString()[..6].ToUpper()}",
                ItemType = request.ItemType,
                EngravingText = request.EngravingText,
                AdditionalRequests = request.AdditionalRequests,
                ReferenceImageUrl = request.ReferenceImageUrl,
                EstimatedPrice = request.EstimatedPrice,
                DepositAmount = request.DepositAmount,
                ReceiverName = request.ReceiverName,
                ReceiverPhone = request.ReceiverPhone,
                ReceiverAddress = request.ReceiverAddress,
                SnapshotSenderName = defaultSender.SenderName,
                SnapshotSenderPhone = defaultSender.SenderPhone,
                SnapshotSenderAddress = defaultSender.SenderAddress,
                ShippingMethod = request.ShippingMethod,
                DeliveryDeadline = request.DeliveryDeadline,
                Status = "Pending" 
            };

            _context.CustomOrders.Add(newCustomOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomOrder), new { id = newCustomOrder.Id }, newCustomOrder);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการสร้างใบสั่งทำ", error = ex.Message });
        }
    }

    [HttpPut("{id}/update-status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusUpdateRequest request)
    {
        try
        {
            var customOrder = await _context.CustomOrders.FindAsync(id);
            if (customOrder == null) return NotFound(new { message = "ไม่พบใบสั่งทำนี้" });

            customOrder.Status = request.Status;

            await _context.SaveChangesAsync();
            return Ok(new { message = $"อัปเดตสถานะใบสั่งทำเป็น {request.Status} เรียบร้อย", currentStatus = customOrder.Status });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการอัปเดตสถานะ", error = ex.Message });
        }
    }

    [HttpPut("{id}/update-shipping")]
    public async Task<IActionResult> UpdateShipping(int id, [FromBody] CustomShippingUpdateRequest request)
    {
        try
        {
            var customOrder = await _context.CustomOrders.FindAsync(id);
            if (customOrder == null) return NotFound(new { message = "ไม่พบใบสั่งทำนี้" });

            customOrder.CourierName = request.CourierName;
            customOrder.TrackingNumber = request.TrackingNumber;
            customOrder.Status = "Shipped"; 
            await _context.SaveChangesAsync();
            return Ok(new { message = "อัปเดตข้อมูลการจัดส่งเรียบร้อย", currentStatus = customOrder.Status });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการบันทึกข้อมูลการจัดส่ง", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomOrder(int id)
    {
        try
        {
            var customOrder = await _context.CustomOrders.FindAsync(id);
            if (customOrder == null) return NotFound(new { message = "ไม่พบข้อมูลที่ต้องการลบ" });

            _context.CustomOrders.Remove(customOrder);
            await _context.SaveChangesAsync();

            return Ok(new { message = "ลบใบสั่งทำออกจากระบบเรียบร้อยแล้ว" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการลบข้อมูล", error = ex.Message });
        }
    }
}


public record CustomOrderCreateRequest(
    string ItemType,
    string? EngravingText,
    string? AdditionalRequests,
    string? ReferenceImageUrl,
    decimal EstimatedPrice,
    decimal DepositAmount,
    string ReceiverName,
    string ReceiverPhone,
    string ReceiverAddress,
    string ShippingMethod,
    DateTime? DeliveryDeadline
);

public record StatusUpdateRequest(string Status);

public record CustomShippingUpdateRequest(string? CourierName, string? TrackingNumber);