using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI.Web.ViewModels;

namespace ReactMaaserTrackerMUI.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SourcesController : ControllerBase
    {
        private readonly string _connectionString;

        public SourcesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        [HttpGet]
        public List<IncomeSource> GetAll()
        {
            var repo = new SourcesRepository(_connectionString);
            return repo.GetSources();
        }

        [HttpPost]
        [Route("add")]
        public void Add(AddSourceRequest request)
        {
            var repo = new SourcesRepository(_connectionString);
            repo.Add(request.Name);
        }

        [HttpPost]
        [Route("update")]
        public void Update(IncomeSource incomeSource)
        {
            var repo = new SourcesRepository(_connectionString);
            repo.Update(incomeSource);
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(DeleteRequest deleteRequest)
        {
            var repo = new SourcesRepository(_connectionString);
            repo.Delete(deleteRequest.Id);
        }

        [HttpGet("HasIncome")]
        public object HasIncome(int sourceId)
        {
            var repo = new SourcesRepository(_connectionString);
            return new { hasIncome = repo.HasIncome(sourceId) };
        }
    }
}
