using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dto
{
    public class CategoryCreateOrEditInputDto
    {
        public long? CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}