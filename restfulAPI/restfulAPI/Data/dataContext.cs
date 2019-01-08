using Microsoft.EntityFrameworkCore;
using System.IO;
using restfulAPI.Models;
using Microsoft.Extensions.Configuration;

namespace restfulAPI.Data
{
    public class dataContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                                .AddJsonFile("appsettings.json");

            var configuration = builder.Build();
            OptionsBuilder.UseSqlServer(configuration["ConnectionStrings:UserConnection"]);
        }

        public DbSet<dummyModel> People { get; set; }
    }
}
