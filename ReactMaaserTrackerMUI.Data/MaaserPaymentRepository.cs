using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserPaymentRepository
    {
        private readonly string _connectionString;

        public MaaserPaymentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(MaaserPayment payment)
        {
            using var context = new MaaserTrackerContext(_connectionString);
            context.MaaserPayments.Add(payment);
            context.SaveChanges();
        }

        public List<MaaserPayment> GetAll()
        {
            using var context = new MaaserTrackerContext(_connectionString);
            return context.MaaserPayments.ToList();
        }

        public decimal GetTotalMaaser()
        {
            using var context = new MaaserTrackerContext(_connectionString);
            return context.MaaserPayments.Sum(i => i.Amount);
        }
    }
}
