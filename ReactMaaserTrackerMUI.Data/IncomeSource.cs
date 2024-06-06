namespace ReactMaaserTrackerMUI.Data
{
    public class IncomeSource
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<IncomePayment> IncomePayments { get; set; }
    }
}