using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back._iservice;
using back.datacontext;
using back.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers
{
    public class StatController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IChartService _chartService;
        public StatController(DataContext context, IChartService chartService)
        {
            _context = context;
            _chartService = chartService;
        }

        [HttpGet("getCashFlow")]
        public async Task<List<CashOutputDto>> getCashFlow([FromQuery]CashInputDto inputDto)
        {
            var cashIn = await _context.Product
                .Where(p => p.Date.Year == inputDto.Year && p.UnitOfCurrency == inputDto.UnitOfCurrency && p.Status == "Xuất")
                .GroupBy(p => p.Date.Month)
                .Select(g => new CashOutputDto
                {
                    Month = g.Key,
                    CashIn = g.Sum(p => p.UnitPrice * p.Quantity)
                })
                .ToListAsync();
            for (int month = 1; month <= 12; month++)
            {
                if (!cashIn.Any(c => c.Month == month))
                {
                    cashIn.Add(new CashOutputDto
                    {
                        Month = month,
                        CashIn = 0
                    });
                }
            }
            cashIn = cashIn.OrderBy(c => c.Month).ToList();

            var cashOut = await _context.Product
                .Where(p => p.Date.Year == inputDto.Year && p.UnitOfCurrency == inputDto.UnitOfCurrency && p.Status == "Nhập")
                .GroupBy(p => p.Date.Month)
                .Select(g => new CashOutputDto
                {
                    Month = g.Key,
                    CashOut = g.Sum(p => p.UnitPrice * p.Quantity)
                })
                .ToListAsync();
            for (int month = 1; month <= 12; month++)
            {
                if (!cashOut.Any(c => c.Month == month))
                {
                    cashOut.Add(new CashOutputDto
                    {
                        Month = month,
                        CashOut = 0
                    });
                }
            }
            cashOut = cashOut.OrderBy(c => c.Month).ToList();

            List<CashOutputDto> cash = new List<CashOutputDto>(12);
            for(int i = 0; i < 12; i++) {
                cash.Add(new CashOutputDto());
                cash[i].Month = i + 1;
                cash[i].CashIn = cashIn[i].CashIn;
                cash[i].CashOut = cashOut[i].CashOut;
            }
            return cash.OrderBy(c => c.Month).ToList();
        }

        [HttpGet("getCashChart")]
        public async Task<ActionResult> getCashChart([FromQuery]CashInputDto inputDto) 
        {
            return Content(await _chartService.CashChart(await getCashFlow(inputDto)), "text/html");
        }

    }
}