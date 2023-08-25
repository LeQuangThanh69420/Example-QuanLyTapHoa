using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back.Entity
{
    public class SanPham
    {
        [Key]public long IdSanPham { get; set; }
        public string TenSanPham { get; set; }
        public DateTime NgayNhap { get; set; }
        public DateTime NgayXuat { get; set; }
        public int SoLuongSanPham { get; set; }
        public long IdDonVi { get; set; }
        public long CategoryId { get; set; }
    }
}