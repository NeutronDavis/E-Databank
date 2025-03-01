using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.Account;
using EDataBank.Core.Entity.General;
using EDataBank.Core.Entity.Model;
using EDataBank.Core.Views;
using EDataBank.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.EDataBankServices
{
    public class ChangesService : IChangesSevice
    {
        private readonly IRepository<ChangesRequest> _changesRequestRepo;
        private readonly IRepository<Users> _userRepo;
        private readonly IRepository<Ordination> _ordinationRepo;
        private EDataBankDbContext _context;
        public ChangesService(IRepository<ChangesRequest> changesRequestRepo, EDataBankDbContext context, IRepository<Users> userRepo, IRepository<Ordination> ordinationRepo)
        {
            _changesRequestRepo = changesRequestRepo;
            _context = context;
            _userRepo = userRepo;
            _ordinationRepo = ordinationRepo;
        }

     
        public async Task ApproveRequest(int ChangesRequestId)
        {
            try
            {
                var res = await _changesRequestRepo.GetbyIdAsync(ChangesRequestId);
                if (res != null)
                {
                    if (res.ChangesType == Core.Enums.ChangesType.Profile)
                    {
                        var userRes = await _userRepo.FindAsync(u => u.Id == res.UsersId);
                        var fields = res.FieldsModified!.Split(',').ToList<string>();
                        var fieldValues = res.FieldValue!.Split(',').ToList<string>();

                        // Use reflection to set property values dynamically
                        var userResType = userRes!.GetType();
                        for (int i = 0; i < fields.Count; i++)
                        {
                            var propertyName = fields[i];
                            string propertyNameOutput = char.ToUpper(propertyName[0]) + propertyName.Substring(1);
                            var propertyInfo = userResType.GetProperty(propertyNameOutput);

                            if (propertyInfo != null)
                            {
                                // Check the type of the property
                                if (propertyInfo.PropertyType == typeof(int?))
                                {
                                    // Assuming the property is an int, update it with the corresponding int value
                                    if (int.TryParse(fieldValues[i], out int intValue))
                                    {
                                        propertyInfo.SetValue(userRes, intValue);
                                    }

                                }
                                else if (propertyInfo.PropertyType == typeof(string))
                                {
                                    // Assuming the property is a string, update it with the corresponding string value
                                    propertyInfo.SetValue(userRes, fieldValues[i]);
                                }

                            }

                        }

                        // Save the changes to the database (assuming _userRepo.SaveChangesAsync() is available)
                        await _userRepo.SaveChangesAsync();
                    }
                    else if (res.ChangesType == Core.Enums.ChangesType.Ordination)
                    {
                        var ordinationRes = await _ordinationRepo.GetByIdAsync((int)res.OrdinationId!);
                        var fields = res.FieldsModified!.Split(',').ToList<string>();
                        var fieldValues = res.FieldValue!.Split(',').ToList<string>();

                        // Use reflection to set property values dynamically
                        var userResType = ordinationRes!.GetType();
                        for (int i = 0; i < fields.Count; i++)
                        {
                            var propertyName = fields[i];
                            string propertyNameOutput = char.ToUpper(propertyName[0]) + propertyName.Substring(1);
                            var propertyInfo = userResType.GetProperty(propertyNameOutput);

                            if (propertyInfo != null)
                            {
                                // Check the type of the property
                                if (propertyInfo.PropertyType == typeof(int?))
                                {
                                    // Assuming the property is an int, update it with the corresponding int value
                                    if (int.TryParse(fieldValues[i], out int intValue))
                                    {
                                        propertyInfo.SetValue(ordinationRes, intValue);
                                    }

                                }
                                else if (propertyInfo.PropertyType == typeof(string))
                                {
                                    // Assuming the property is a string, update it with the corresponding string value
                                    propertyInfo.SetValue(ordinationRes, fieldValues[i]);
                                }

                            }

                        }

                        // Save the changes to the database (assuming _ordinationRepo.SaveChangesAsync() is available)
                        await _ordinationRepo.SaveChangesAsync();
                    }
                    else
                    {
                        var ordinationRes = new Ordination();
                        var fields = res.FieldsModified!.Split(',').ToList<string>();
                        var fieldValues = res.FieldValue!.Split(',').ToList<string>();

                        // Use reflection to set property values dynamically
                        var userResType = ordinationRes!.GetType();
                        for (int i = 0; i < fields.Count; i++)
                        {
                            var propertyName = fields[i];
                            string propertyNameOutput = char.ToUpper(propertyName[0]) + propertyName.Substring(1);
                            var propertyInfo = userResType.GetProperty(propertyNameOutput);

                            if (propertyInfo != null)
                            {
                                // Check the type of the property
                                if (propertyInfo.PropertyType == typeof(int?))
                                {
                                    // Assuming the property is an int, update it with the corresponding int value
                                    if (int.TryParse(fieldValues[i], out int intValue))
                                    {
                                        propertyInfo.SetValue(ordinationRes, intValue);
                                    }

                                }
                                else if (propertyInfo.PropertyType == typeof(string))
                                {
                                    // Assuming the property is a string, update it with the corresponding string value
                                    propertyInfo.SetValue(ordinationRes, fieldValues[i]);
                                }

                            }

                        }
                        ordinationRes.UsersId = res.UsersId;
                        await _ordinationRepo.AddAsync(ordinationRes);
                    }
                        await _changesRequestRepo.DeleteAsync(res);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task DeleteRequest(int ChangesRequestId)
        {
            try
            {
                var res = await _changesRequestRepo.GetbyIdAsync(ChangesRequestId);
                if (res != null)
                    await _changesRequestRepo.DeleteAsync(res);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ChangesView> GetAllRequest()
        {
            try
            {
                var res = _context.ChangesViews.FromSqlInterpolated($"SELECT * FROM changes_vw").ToList();
                return res ?? new List<ChangesView>();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task SaveChanges(ChangesRequest changesRequest)
        {
            try
            {
                await _changesRequestRepo.AddAsync(changesRequest);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ChangesRequest> GetChangeRequestById(int requestId)
        {
            try
            {
                var res = await _changesRequestRepo.GetbyIdAsync(requestId);
                return res!;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
