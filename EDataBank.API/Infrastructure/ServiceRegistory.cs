using System.Reflection;
using EDataBank.Application;
using EDataBank.Application.EDataBankServices;
using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.StudentEntitiy;
using EDataBank.Core.Entity.Account;
using EDataBank.Database;

using Microsoft.EntityFrameworkCore;
using EDataBank.Core.Entity.General;
using EDataBank.Core.Views;
using EDataBank.Core.Entity.Model;
using Microsoft.Extensions.DependencyInjection.Extensions;
using EDataBank.Core.Entity.Report;
using EDataBank.Core.Entity.Error;

namespace EDataBank.Web.Api.Infrastructure;

public static class ServiceRegistory
{
  public static IServiceCollection RegisterServices(this IServiceCollection services)
  {
    services.AddScoped<DbContext, EDataBankDbContext>();


    //Repositories
        services.AddScoped<IRepository<Users>, Repository<Users>>();
        services.AddScoped<IRepository<Student>, Repository<Student>>();
        services.AddScoped<IRepository<Feedback>, Repository<Feedback>>(); 
        services.AddScoped<IRepository<UserGroup>, Repository<UserGroup>>();
        services.AddScoped<IRepository<MenuView>, Repository<MenuView>>();
        services.AddScoped<IRepository<Group>, Repository<Group>>();
        services.AddScoped<IRepository<Permission>, Repository<Permission>>();
        services.AddScoped<IRepository<Band>, Repository<Band>>();
        services.AddScoped<IRepository<Branch>, Repository<Branch>>();
        services.AddScoped<IRepository<Cathedral>, Repository<Cathedral>>();
        services.AddScoped<IRepository<Cmc>, Repository<Cmc>>();
        services.AddScoped<IRepository<District>,Repository<District>>();
        services.AddScoped<IRepository<Ordination>, Repository<Ordination>>();
        services.AddScoped<IRepository<PrincipalBand>, Repository<PrincipalBand>>();
        services.AddScoped<IRepository<Priority>, Repository<Priority>>();
        services.AddScoped<IRepository<Profession>, Repository<Profession>>();
        services.AddScoped<IRepository<Province>, Repository<Province>>();
        services.AddScoped<IRepository<Qualification>,Repository<Qualification>>();
        services.AddScoped<IRepository<Rank>, Repository<Rank>>();
        services.AddScoped<IRepository<ChangesRequest>, Repository<ChangesRequest>>();
        services.AddScoped<IRepository<Nationality>, Repository<Nationality>>();
        services.AddScoped<IRepository<UploadInfo>, Repository<UploadInfo>>();
        services.AddScoped<IRepository<ErrorLog>,Repository<ErrorLog>>();

        //Register Services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<IFeedbackService, FeedbackService>();
        services.AddScoped<IMenuService, MenuService>();
        services.AddScoped<IModelService, ModelServices>();
        services.AddScoped<IOrdinationService, OrdinationService>();
        services.AddScoped<IDashboardService, DashboardService>();
        services.AddScoped<IChangesSevice, ChangesService>();
        services.AddScoped<IErrorLogService, ErrorLogService>();

        return services;
  }
}
