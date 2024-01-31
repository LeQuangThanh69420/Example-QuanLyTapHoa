using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Entity
{
    public class Product
    {
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string UnitOfMeasure { get; set; }
        public int UnitPrice { get; set; }
        public string UnitOfCurrency { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
        public long CategoryId { get; set; }
    }
}