using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Database;
using EDataBank.Web.Api.Infrastructure;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Net.Mail;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//Get Connection string fron appsetting.json
var connectionString = builder.Configuration.GetValue<string>("ConnectionStrings:Db");
var hangFireConString = builder.Configuration.GetValue<string>("ConnectionStrings:Hangfier");
var JwtSecret = builder.Configuration.GetValue<string>("Jwt:JWT_SECRET");
var corsUrls = builder.Configuration.GetValue<string>("Cors:ALLOWED_URL").Split(",") ?? new string[] { "" };
//SMTP
var smtpHost = builder.Configuration.GetValue<string>("SMTP:SMTP_HOST");
var smtpFrom = builder.Configuration.GetValue<string>("SMTP:SMTP_FROM");
var smtpPort = builder.Configuration.GetValue<int>("SMTP:SMTP_PORT");
var smtpPwd = builder.Configuration.GetValue<string>("SMTP:SMTP_PASSWORD");
var smtpAlias = builder.Configuration.GetValue<string>("SMTP:SMTP_ALIAS");
var smtpRequiressl = builder.Configuration.GetValue<bool>("SMTP:SMTP_REQUIRESSL");
var smtpRequiretls = builder.Configuration.GetValue<bool>("SMTP:SMTP_REQUIRETLS");
var smtpAuth = builder.Configuration.GetValue<string>("SMTP:SMTP_REQUIRE_AUTHENTICATION");


//connect to the Daatabase
builder.Services.AddDbContext<EDataBankDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});


//////////////////////////////////////Email service/////////////////////////////////////////
///
#if DEBUG
var smtpClient = new SmtpClient(smtpHost.Trim(), smtpPort)
{
    EnableSsl = smtpRequiressl,
    UseDefaultCredentials = false,

    DeliveryMethod = SmtpDeliveryMethod.Network,


};
#else
var smtpClient = new SmtpClient(smtpHost.Trim(), smtpPort)
{
    EnableSsl = smtpRequiressl,
    UseDefaultCredentials = false,

    DeliveryMethod = SmtpDeliveryMethod.Network,
    Credentials = new NetworkCredential(smtpFrom, smtpPwd),
};


#endif

builder.Services.AddFluentEmail(smtpFrom.Trim()).AddSmtpSender(smtpClient).AddRazorRenderer();





var sqlServerStorage = new SqlServerStorage(
    hangFireConString,
    new SqlServerStorageOptions
    {
        QueuePollInterval = TimeSpan.FromSeconds(10),
        JobExpirationCheckInterval = TimeSpan.FromHours(1),
        CountersAggregateInterval = TimeSpan.FromMinutes(5),
        PrepareSchemaIfNecessary = true,
        DashboardJobListLimit = 25000,
        TransactionTimeout = TimeSpan.FromMinutes(1)
    });

builder.Services.AddHangfire(configuration =>
{
    configuration
        .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
        .UseSimpleAssemblyNameTypeSerializer()
        .UseRecommendedSerializerSettings()
        .UseStorage(
            sqlServerStorage
        );
    JobStorage.Current = sqlServerStorage;
});


builder.Services.AddHangfireServer(options => options.WorkerCount = 1);


///////


builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});

builder.Services.RegisterServices();

//JWT Authetication


var key = Encoding.ASCII.GetBytes(JwtSecret);
builder.Services.AddIdentity<Users, Permission>().AddEntityFrameworkStores<EDataBankDbContext>().AddDefaultTokenProviders();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = async (context) =>
        {
            var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
            var userId = context?.Principal?.Identity?.Name;
            var user = await userService.FindUserByIdAsync(userId!);
            if (user == null)
            {
                // return unauthorized if user no longer exists
                context?.Fail("Unauthorized");
            }

        }
    };
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

/////End JWT Configuration here


builder.Services.AddControllers();
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddRazorPages();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var origins = new List<string>() { "http://esocs.org.ng:80", "http://esocs.org.ng:80/", "http://localhost:3000", "http://localhost:3000/", "https://esocs.org.ng:443", "https://esocs.org.ng:433/" };
builder.Services.AddCors(p => p.AddPolicy(MyAllowSpecificOrigins, build =>
{
    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    //app.UseSwaggerUI();
}
app.UseHttpsRedirection();




app.UseStaticFiles();




app.UseRouting();
app.UseAuthorization();
app.UseCors(MyAllowSpecificOrigins);

app.UseCookiePolicy();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;
//RecurringJob.AddOrUpdate<UpgradeMemberRank>(d => d.ChangeMemberCrentRankEvery12month(), Cron.Daily(22, 58));
app.Run();
