using System.Text.Json.Serialization;

namespace ReactMaaserTrackerMUI.Data
{
    public class IncomePayment
    {
        public int Id { get; set; }
        public int IncomeSourceId { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }

        public IncomeSource IncomeSource { get; set; }
    }
}