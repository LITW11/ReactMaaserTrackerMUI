using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserTrackerContextFactory : IDesignTimeDbContextFactory<MaaserTrackerContext>
    {
        public MaaserTrackerContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactMaaserTrackerMUI.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new MaaserTrackerContext(config.GetConnectionString("ConStr"));
        }
    }
}