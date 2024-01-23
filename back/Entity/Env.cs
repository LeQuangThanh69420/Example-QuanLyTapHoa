using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Entity
{
    public class Env
    {
        public static readonly string[] ProductUnitOfMeasure = { "kg(kilogram)", "g(gram)", "m(meter)", "thùng", "hộp", "túi", "bao", "chiếc", "gói", "chai", "lon", };
        public static readonly string[] ProductUnitOfCurrency = { "VND", "USD", "RMB", "KRW", "JPY"};
        public static readonly string[] ProductStatus = { "Nhập", "Xuất" };
    }
}