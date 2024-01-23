using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dto
{
    public class ProductCreateOrEditInputDto
    {
        public long? ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string UnitOfMeasure { get; set; }
        public int UnitPrice { get; set; }
        public int UnitOfCurrency { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public long CategoryId { get; set; }
    }
}