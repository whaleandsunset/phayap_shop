using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementApp.Data;
using UserManagementApp.Models;

namespace UserManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController(AppDbContext context) : ControllerBase
    {
        // 1. GET ALL PRODUCTS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            try
            {
                return await context.Products.AsNoTracking().ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า", error = ex.Message });
            }
        }

        // 2. GET PRODUCT BY ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            try
            {
                var product = await context.Products.FindAsync(id);
                if (product == null) return NotFound(new { message = "ไม่พบสินค้าชิ้นนี้" });
                return product;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าชิ้นนี้", error = ex.Message });
            }
        }

        // 3. CREATE PRODUCT
        [HttpPost]
        public async Task<ActionResult<Products>> CreateProduct(Products product)
        {
            try
            {
                context.Products.Add(product);
                await context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการเพิ่มสินค้าใหม่", error = ex.Message });
            }
        }

        // 4. UPDATE PRODUCT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Products updatedProduct)
        {
            try
            {
                if (id != updatedProduct.Id)
                {
                    return BadRequest(new { message = "ID ของ URL และข้อมูลสินค้าไม่ตรงกัน" });
                }

                var product = await context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound(new { message = "ไม่พบสินค้าชิ้นนี้ในระบบ" });
                }

                product.SKU = updatedProduct.SKU;
                product.Name = updatedProduct.Name;
                product.Price = updatedProduct.Price;
                product.Weight = updatedProduct.Weight;
                product.StockQuantity = updatedProduct.StockQuantity;

                await context.SaveChangesAsync();
                return Ok(new { message = "อัปเดตข้อมูลสินค้าสำเร็จ", data = product });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!context.Products.Any(e => e.Id == id))
                {
                    return NotFound(new { message = "ไม่พบสินค้าชิ้นนี้ในระบบแล้ว" });
                }
                throw;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "เกิดข้อผิดพลาดในการอัปเดตข้อมูลสินค้า", error = ex.Message });
            }
        }

        // 5. DELETE PRODUCT 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var product = await context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound(new { message = "ไม่พบสินค้าชิ้นนี้ในระบบ ไม่สามารถลบได้" });
                }

                context.Products.Remove(product);
                
                await context.SaveChangesAsync();

                return Ok(new { message = "ลบสินค้าออกจากระบบเรียบร้อยแล้ว" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "ไม่สามารถลบสินค้าได้ เนื่องจากข้อมูลอาจมีการเชื่อมโยงกับตารางอื่น", error = ex.Message });
            }
        }
    }
}