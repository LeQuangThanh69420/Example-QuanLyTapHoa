using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back._iservice;
using back.Dto;

namespace back._service
{
    public class ChartService : IChartService
    {
        public async Task<string> CashChart(List<CashOutputDto> cash)
        {
            string cashArray = "";
            foreach(var item in cash)
            {
                cashArray = cashArray + "{ Month: " + item.Month + ", CashIn: " + item.CashIn + ", CashOut: " + item.CashOut + " },";
            }
            return
                "" + 
                "<!DOCTYPE html>" + 
                "<html lang='en'>" + 
                "<head>" + 
                    "<meta charset='UTF-8'>" + 
                    "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" + 
                    "<title>Cash</title>" + 
                    "<script src='https://cdn.jsdelivr.net/npm/chart.js'></script>" + 
                "</head>" + 
                "<body>" + 
                    "<canvas id='myChart' width='400' height='120'></canvas>" + 
                    "<script>" + 
                        "var cash = [" + cashArray + "];" + 
                        "var Month = cash.map(cash => cash.Month);" + 
                        "var CashIn = cash.map(cash => cash.CashIn);" + 
                        "var CashOut = cash.map(cash => cash.CashOut);" + 
                        "new Chart('myChart', {" + 
                            "type: 'bar'," + 
                            "data: {" +
                                "labels: Month," + 
                                "datasets: [" + 
                                    "{" + 
                                        "label: 'Thu'," + 
                                        "backgroundColor: 'green'," + 
                                        "data: CashIn" + 
                                    "}," + 
                                    "{" + 
                                        "label: 'Chi'," + 
                                        "backgroundColor: 'red'," + 
                                        "data: CashOut" + 
                                    "}" + 
                                "]" + 
                            "}," + 
                            "options: {" +
                                "plugins: {" + 
                                    "legend: {display: true}," + 
                                    "title: {" + 
                                        "display: true," + 
                                        "text: 'Báo cáo thu chi theo Tháng/Năm/Đơn vị tiền tệ'" + 
                                    "}" + 
                                "}" + 
                            "}" +  
                        "});" + 
                    "</script>" + 
                "</body>" + 
                "</html>";
        }
    }
}