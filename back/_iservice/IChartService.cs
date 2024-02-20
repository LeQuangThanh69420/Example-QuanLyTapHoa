using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back.Dto;

namespace back._iservice
{
    public interface IChartService
    {
        public Task<string> CashChart(List<CashOutputDto> cash);
    }
}