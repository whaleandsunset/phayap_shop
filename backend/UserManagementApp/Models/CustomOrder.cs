using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementApp.Models;

[Table("CustomOrders")]
public class CustomOrder
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(50)]
    public string CustomOrderNumber { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string ItemType { get; set; } = string.Empty;

    [StringLength(255)]
    public string? EngravingText { get; set; }

    public string? AdditionalRequests { get; set; }

    [StringLength(500)]
    public string? ReferenceImageUrl { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal EstimatedPrice { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal DepositAmount { get; set; } = 0.00m;

    [Required]
    [StringLength(255)]
    public string ReceiverName { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string ReceiverPhone { get; set; } = string.Empty;

    [Required]
    public string ReceiverAddress { get; set; } = string.Empty;

    [Required]
    [StringLength(255)]
    public string SnapshotSenderName { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string SnapshotSenderPhone { get; set; } = string.Empty;

    [Required]
    public string SnapshotSenderAddress { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string ShippingMethod { get; set; } = "Courier";

    public DateTime? DeliveryDeadline { get; set; }

    [Required]
    [StringLength(50)]
    public string Status { get; set; } = "Pending";

    [StringLength(100)]
    public string? CourierName { get; set; }

    [StringLength(100)]
    public string? TrackingNumber { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}