using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace UserManagementApp.Models; 

[Table("Products")]
public class Products
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public required string SKU { get; set; }

    [Required]
    [StringLength(255)]
    public required string Name { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Weight { get; set; }

    public int StockQuantity { get; set; }

    // Navigation Property สำหรับเชื่อมความสัมพันธ์ไปหาตาราง Orders (1 Product มีได้หลาย Orders)
    [JsonIgnore] 

     public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    
}