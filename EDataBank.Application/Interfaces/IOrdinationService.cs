using EDataBank.Core.Entity.Model;
using EDataBank.Core.Entity.Report;
using EDataBank.Core.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IOrdinationService
    {
        Task<Ordination> SaveOrdination(Ordination ordination);
        Task<int> SaveBulkOrdination(List<Ordination> ordinations);
        Task UpdateOrdination(Ordination ordination);
        Task RemoveOrdination(int ordinationId);
        List<OrdinationView> GetMemberOrdination(string userId);
        List<OrdinationReport> MemberOrdinationReport(int branchId, string gender);
        List<MemberReport> MemberReport(int branchId, string gender);
        List<OrdinationReport> PrivincialMemberOrdinationReport(int provinceId, string gender);
        List<MemberReport> ProvincialMemberReport(int provinceId, string gender);
        List<GeneralReportModel> ProvincialMemberReport(int provinceId, int professionId);
        List<GeneralReportModel> MemberReport(int branchId, int professionId);
        List<GeneralReportModel> MemberReportByRankAndYear(string rank, int year);
        List<OrdinationProgressionView> MemberOrdinationProgessionReport(int provinceId, int branchId, string rank, int year);
        List<General_Report_Model2> MemberProvincialReport(int provinceId);
        List<OrdinationReport> MemberOrdinationReport(int branchId, int professionId);
        Task AddUploadInfo(UploadInfo uploadInfo);
        Task RemoveMemberUploadedRecords(int branchId);
        List<UploadInfoView> GetUploadInfo();
    }
}
