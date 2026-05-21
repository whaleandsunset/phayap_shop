using Microsoft.AspNetCore.Mvc;
using UserManagementApp.Data;
using UserManagementApp.Models;
using Microsoft.EntityFrameworkCore;

namespace UserManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _context.Users
                    .FromSql($"CALL GetAllUsers()")
                    .ToListAsync();

                return Ok(users);
            }
            catch (Exception err)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูล", error = err.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = (await _context.Users
                    .FromSql($"CALL GetUserById({id})")
                    .ToListAsync())
                    .FirstOrDefault();

                if (user == null)
                {
                    return NotFound(new { message = $"ไม่พบผู้ใช้งาน" });
                }

                return Ok(user);
            }
            catch (Exception err)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูล", error = err.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            catch (Exception err)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการบันทึกข้อมูล", error = err.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedData)
        {
            try
            {
                var result = await _context.Database.ExecuteSqlAsync($@"
            CALL UpdateUserProcedure(
                {id}, 
                {updatedData.fname}, 
                {updatedData.lname}, 
                {updatedData.BirthDate}, 
                {updatedData.Address}
            )");

                if (result == 0)
                {
                    return NotFound(new { message = $"ไม่พบผู้ใช้งานที่ต้องการอัปเดต" });
                }

                var updatedUser = (await _context.Users
                    .FromSql($"CALL GetUserById({id})")
                    .ToListAsync())
                    .FirstOrDefault();

                return Ok(updatedUser);
            }
            catch (Exception err)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการอัปเดต", error = err.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var result = await _context.Database.ExecuteSqlAsync($"CALL DeleteUserProcedure({id})");

                if (result == 0)
                {
                    return NotFound(new { message = $"ไม่พบผู้ใช้งานที่ต้องการลบ" });
                }

                return Ok(new { message = $"ลบข้อมูลแล้ว" });
            }
            catch (Exception err)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการลบข้อมูล", error = err.Message });
            }
        }
    }
}