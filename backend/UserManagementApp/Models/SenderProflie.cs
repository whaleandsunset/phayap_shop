using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementApp.Models; 

[Table("SenderProfiles")]
public class SenderProfile
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public required string SenderName { get; set; }

    [Required]
    [StringLength(20)]
    public required string SenderPhone { get; set; }

    [Required]
    public required string SenderAddress { get; set; }

    // ใน MySQL จะแปลงเป็น TINYINT(1) อัตโนมัติสำหรับ bool
    public bool IsDefault { get; set; } 
}