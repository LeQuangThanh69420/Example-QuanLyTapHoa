using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dto
{
    public class ProductSearchInputDto
    {
        public string? ProductName { get; set; }
        public int? QuantityFrom { get; set; }
        public int? QuantityTo { get; set; }
        public string? UnitOfMeasure { get; set; }
        public string? Status { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public long? CategoryId { get; set; }
    }
}