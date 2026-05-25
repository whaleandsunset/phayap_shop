using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementApp.Data;
using UserManagementApp.Models;

namespace UserManagementApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SenderProfilesController(AppDbContext context) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SenderProfile>>> GetSenders()
    {
        try
        {
            var senders = await context.SenderProfiles.AsNoTracking().ToListAsync();
            return Ok(senders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์ผู้ส่งทั้งหมด", error = ex.Message });
        }
    }

    [HttpGet("default")]
    public async Task<ActionResult<SenderProfile>> GetDefaultSender()
    {
        try
        {
            var defaultSender = await context.SenderProfiles
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.IsDefault);

            if (defaultSender == null) 
                return NotFound(new { message = "ระบบยังไม่ได้ตั้งค่าโปรไฟล์ผู้ส่งเริ่มต้น" });

            return Ok(defaultSender);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ส่งเริ่มต้น", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<SenderProfile>> CreateSender([FromBody] SenderProfileCreateRequest request)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            if (request.IsDefault)
            {
                await context.SenderProfiles.ExecuteUpdateAsync(s => s.SetProperty(p => p.IsDefault, false));
                context.ChangeTracker.Clear();
            }

            var newSender = new SenderProfile
            {
                SenderName = request.SenderName,
                SenderPhone = request.SenderPhone,
                SenderAddress = request.SenderAddress,
                IsDefault = request.IsDefault
            };

            context.SenderProfiles.Add(newSender);
            await context.SaveChangesAsync();
            
            await transaction.CommitAsync();

            return Ok(newSender);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการเพิ่มโปรไฟล์ผู้ส่ง", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSender(int id, [FromBody] SenderProfileUpdateRequest request)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            var sender = await context.SenderProfiles.FindAsync(id);
            if (sender == null) return NotFound(new { message = "ไม่พบโปรไฟล์ผู้ส่งที่ต้องการแก้ไข" });

            if (request.IsDefault)
            {
                await context.SenderProfiles.ExecuteUpdateAsync(s => s.SetProperty(p => p.IsDefault, false));
                context.ChangeTracker.Clear();
                
                sender = await context.SenderProfiles.FindAsync(id);
            }
            else
            {
                if (sender != null && sender.IsDefault)
                {
                    return BadRequest(new { message = "ไม่สามารถปลดที่อยู่เริ่มต้นได้ดื้อๆ กรุณาไปเลือกตั้งค่าที่อยู่อื่นให้เป็นค่าเริ่มต้นแทน" });
                }
            }

            if (sender == null) return NotFound(new { message = "เกิดข้อผิดพลาดในการโหลดข้อมูลหลังล้างแคช" });

            sender.SenderName = request.SenderName;
            sender.SenderPhone = request.SenderPhone;
            sender.SenderAddress = request.SenderAddress;
            sender.IsDefault = request.IsDefault;

            await context.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new { message = "อัปเดตข้อมูลผู้ส่งเรียบร้อยแล้ว", data = sender });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการอัปเดตข้อมูล", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSender(int id)
    {
        try
        {
            var sender = await context.SenderProfiles.FindAsync(id);
            if (sender == null) return NotFound(new { message = "ไม่พบโปรไฟล์ผู้ส่งที่ต้องการลบ" });

            if (sender.IsDefault)
            {
                return BadRequest(new { message = "ไม่สามารถลบที่อยู่เริ่มต้นได้ กรุณาไปตั้งที่อยู่อื่นให้เป็นค่าเริ่มต้นหลักแทนก่อนทำการลบ" });
            }

            context.SenderProfiles.Remove(sender);
            await context.SaveChangesAsync();

            return Ok(new { message = "ลบโปรไฟล์ผู้ส่งเรียบร้อยแล้ว" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการลบข้อมูล", error = ex.Message });
        }
    }
}


public record SenderProfileCreateRequest(
    string SenderName,
    string SenderPhone,
    string SenderAddress,
    bool IsDefault
);

public record SenderProfileUpdateRequest(
    string SenderName,
    string SenderPhone,
    string SenderAddress,
    bool IsDefault
);