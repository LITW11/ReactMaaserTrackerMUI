using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;

namespace ReactMaaserTrackerMUI.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomePaymentsController : ControllerBase
    {
        private readonly string _connectionString;

        public IncomePaymentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("add")]
        [HttpPost]
        public void Add(IncomePayment incomePayment)
        {
            var repo = new IncomePaymentRepository(_connectionString);
            repo.Add(incomePayment);
        }

        [Route("getall")]
        [HttpGet]
        public List<IncomePayment> GetAll()
        {
            var repo = new IncomePaymentRepository(_connectionString);
            return repo.GetAll();
        }
    }
}
