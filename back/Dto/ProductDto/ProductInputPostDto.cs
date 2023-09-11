using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dto.ProductDto
{
    public class ProductInputPostDto
    {
        public long? ProductId { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public bool Status { get; set; }
        [Required]
        public DateTime DateIn { get; set; }
        [Required]
        public DateTime DateOut { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public long CategoryId { get; set; }
    }
}