using EDataBank.Application.Interfaces;
using EDataBank.Core.Entity.StudentEntitiy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.EDataBankServices
{
    public class StudentService:IStudentService
    {
        private readonly IRepository<Student>   _studentRepo;
        public StudentService(IRepository<Student> studentRepo)
        {
            _studentRepo = studentRepo;
        }

        public async Task<List<Student>> CreateStudentsAsync(Student student)
        {
            await _studentRepo.AddAsync(student);

            return await _studentRepo.GetAllAsync();
        }

        public async Task<List<Student>> GetAllStudentAsync()
        {
            return await _studentRepo.GetAllAsync();
        }
       
    }


}
