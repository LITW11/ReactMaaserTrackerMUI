using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI.Web.ViewModels;

namespace ReactMaaserTrackerMUI.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserPaymentsController : ControllerBase
    {
        private readonly string _connectionString;

        public MaaserPaymentsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("add")]
        public void Add(MaaserPayment payment)
        {
            var repo = new MaaserPaymentRepository(_connectionString);
            repo.Add(payment);
        }

        [HttpGet]
        [Route("getall")]
        public List<MaaserPayment> GetAll()
        {
            var repo = new MaaserPaymentRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpGet]
        [Route("getoverview")]
        public OverviewViewModel GetOverview()
        {
            var incomeRepo = new IncomePaymentRepository(_connectionString);
            var maaserRepo = new MaaserPaymentRepository(_connectionString);

            var vm = new OverviewViewModel
            {
                TotalIncome = incomeRepo.GetTotalIncome(),
                TotalMaaser = maaserRepo.GetTotalMaaser()
            };

            var amountRequiredToGive = vm.TotalIncome * .10m;
            vm.ObligatedAmount = amountRequiredToGive;
            vm.RemainingObligation = amountRequiredToGive - vm.TotalMaaser;
            return vm;
        }

    }
}
