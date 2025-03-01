using EDataBank.Core.Entity.StudentEntitiy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EDataBank.Application.Interfaces
{
    public interface IStudentService
    {
        Task<List<Student>> GetAllStudentAsync();
        Task<List<Student>> CreateStudentsAsync(Student student);
    }
}
