using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementApp.Models; 

[Table("Orders")]
public class Order
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public required string OrderNumber { get; set; }

    [Required]
    public int ProductId { get; set; }

    public int Quantity { get; set; } = 1;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal ShippingFee { get; set; }

    [Required]
    [StringLength(255)]
    public required string ReceiverName { get; set; }

    [Required]
    [StringLength(20)]
    public required string ReceiverPhone { get; set; }

    [Required]
    public required string ReceiverAddress { get; set; }

    [Required]
    [StringLength(255)]
    public required string SnapshotSenderName { get; set; }

    [Required]
    [StringLength(20)]
    public required string SnapshotSenderPhone { get; set; }

    [Required]
    public required string SnapshotSenderAddress { get; set; }

    [StringLength(100)]
    public string? CourierName { get; set; }

    [StringLength(100)]
    public string? TrackingNumber { get; set; }

    [Required]
    [StringLength(50)]
    public string Status { get; set; } = "Pending"; 

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation Property สำหรับทำ Relation ใน Entity Framework
    [ForeignKey(nameof(ProductId))]
    public virtual Products? Product { get; set; }
}