using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class SourcesRepository
    {
        private readonly string _connectionString;

        public SourcesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<IncomeSource> GetSources()
        {
            using var context = new MaaserTrackerContext(_connectionString);
            return context.IncomeSources.ToList();
        }

        public void Add(string name)
        {
            using var context = new MaaserTrackerContext(_connectionString);
            context.IncomeSources.Add(new IncomeSource
            {
                Name = name
            });
            context.SaveChanges();
        }

        public void Update(IncomeSource incomeSource)
        {
            using var context = new MaaserTrackerContext(_connectionString);
            context.IncomeSources.Attach(incomeSource);
            context.Entry(incomeSource).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(int incomeSourceId)
        {
            using var context = new MaaserTrackerContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM IncomePayments WHERE IncomeSourceId = {incomeSourceId}");
            context.Database.ExecuteSqlInterpolated($"DELETE FROM IncomeSources WHERE Id = {incomeSourceId}");
        }

        public bool HasIncome(int sourceId)
        {
            using var context = new MaaserTrackerContext(_connectionString);
            return context.IncomePayments.Any(i => i.IncomeSourceId == sourceId);
        }
    }
}
